package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.dto.request.WorkspaceDocumentRequest;
import com.jeevan.smart_notes_api.dto.request.WorkspaceInviteRequest;
import com.jeevan.smart_notes_api.dto.request.WorkspaceRequest;
import com.jeevan.smart_notes_api.dto.request.WorkspaceRoleRequest;
import com.jeevan.smart_notes_api.dto.response.WorkspaceDocumentResponse;
import com.jeevan.smart_notes_api.dto.response.WorkspaceInviteResponse;
import com.jeevan.smart_notes_api.dto.response.WorkspaceMemberResponse;
import com.jeevan.smart_notes_api.dto.response.WorkspaceResponse;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.entity.Workspace;
import com.jeevan.smart_notes_api.entity.WorkspaceDocument;
import com.jeevan.smart_notes_api.entity.WorkspaceMember;
import com.jeevan.smart_notes_api.exception.ResourceNotFoundException;
import com.jeevan.smart_notes_api.repository.UserRepository;
import com.jeevan.smart_notes_api.repository.WorkspaceDocumentRepository;
import com.jeevan.smart_notes_api.repository.WorkspaceMemberRepository;
import com.jeevan.smart_notes_api.repository.WorkspaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository memberRepository;
    private final WorkspaceDocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final UsageTrackingService usageTrackingService;

    public WorkspaceService(WorkspaceRepository workspaceRepository,
                            WorkspaceMemberRepository memberRepository,
                            WorkspaceDocumentRepository documentRepository,
                            UserRepository userRepository,
                            EmailService emailService,
                            UsageTrackingService usageTrackingService) {
        this.workspaceRepository = workspaceRepository;
        this.memberRepository = memberRepository;
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.usageTrackingService = usageTrackingService;
    }

    @Transactional
    public WorkspaceResponse createWorkspace(Long userId, WorkspaceRequest request) {
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        int currentWorkspaces = workspaceRepository.findByOwnerId(userId).size();
        usageTrackingService.checkWorkspaceLimit(userId, currentWorkspaces);

        Workspace workspace = new Workspace(request.getName(), request.getDescription(), owner);
        workspace = workspaceRepository.save(workspace);

        WorkspaceMember ownerMember = new WorkspaceMember(
                workspace, owner, WorkspaceMember.Role.ADMIN, owner.getEmail(),
                WorkspaceMember.InviteStatus.ACCEPTED, null
        );
        memberRepository.save(ownerMember);

        return mapToResponse(workspace, userId);
    }

    @Transactional(readOnly = true)
    public List<WorkspaceResponse> getUserWorkspaces(Long userId) {
        List<WorkspaceMember> memberships = memberRepository.findByUserId(userId);
        return memberships.stream()
                .filter(m -> m.getInviteStatus() == WorkspaceMember.InviteStatus.ACCEPTED)
                .map(m -> mapToResponse(m.getWorkspace(), userId))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WorkspaceResponse getWorkspace(Long workspaceId, Long userId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));

        verifyAccess(workspaceId, userId, WorkspaceMember.Role.VIEWER);
        return mapToResponse(workspace, userId);
    }

    @Transactional
    public WorkspaceResponse updateWorkspace(Long workspaceId, Long userId, WorkspaceRequest request) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));

        verifyAccess(workspaceId, userId, WorkspaceMember.Role.ADMIN);

        workspace.setName(request.getName());
        workspace.setDescription(request.getDescription());
        workspace = workspaceRepository.save(workspace);
        return mapToResponse(workspace, userId);
    }

    @Transactional
    public void deleteWorkspace(Long workspaceId, Long userId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));

        if (workspace.getOwner() != null && !workspace.getOwner().getId().equals(userId)) {
            throw new RuntimeException("Only the workspace owner can delete the workspace");
        } else if (workspace.getOwner() == null) {
            // Allow if owner is null for tests/legacy workspaces, or maybe enforce some other check.
            // But we will allow deletion if it has no owner so the user can clean it up.
        }

        workspaceRepository.delete(workspace);
    }

    // --- Members ---

    @Transactional
    public void inviteMember(Long workspaceId, Long inviterId, WorkspaceInviteRequest request) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));

        verifyAccess(workspaceId, inviterId, WorkspaceMember.Role.ADMIN);

        int currentMembers = memberRepository.findByWorkspaceId(workspaceId).size();
        usageTrackingService.checkWorkspaceMemberLimit(workspace.getOwner().getId(), currentMembers);

        String inviteEmail = request.getEmail().toLowerCase();

        // Check if already a member or pending
        Optional<User> existingUser = userRepository.findByEmail(inviteEmail);
        if (existingUser.isPresent()) {
            Optional<WorkspaceMember> existingMember = getWorkspaceMember(workspaceId, existingUser.get().getId());
            if (existingMember.isPresent()) {
                throw new RuntimeException("User is already a member or has a pending invite");
            }
        }

        // Search by email invite
        List<WorkspaceMember> existingInvites = memberRepository.findByInviteEmailAndInviteStatus(inviteEmail, WorkspaceMember.InviteStatus.PENDING);
        boolean alreadyInvitedToThis = existingInvites.stream().anyMatch(m -> m.getWorkspace().getId().equals(workspaceId));
        if (alreadyInvitedToThis) {
            throw new RuntimeException("An invite is already pending for this email");
        }

        String token = UUID.randomUUID().toString();
        WorkspaceMember newMember = new WorkspaceMember(
                workspace,
                existingUser.orElse(null),
                WorkspaceMember.Role.valueOf(request.getRole().toUpperCase()),
                inviteEmail,
                WorkspaceMember.InviteStatus.PENDING,
                token
        );
        memberRepository.save(newMember);

        // Send email (In real world, generate a proper frontend link)
        String inviteLink = "http://localhost:3000/dashboard?tab=workspace&invite=" + token;
        String subject = "You have been invited to join a workspace: " + workspace.getName();
        String text = "You have been invited to join the workspace '" + workspace.getName() + "'.\n\nClick the link to accept: " + inviteLink;
        emailService.sendSimpleMessage(request.getEmail(), subject, text);
    }

    @Transactional
    public void acceptInvite(String token, Long userId) {
        WorkspaceMember member = memberRepository.findByInviteToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired invite token"));

        if (member.getInviteStatus() != WorkspaceMember.InviteStatus.PENDING) {
            throw new RuntimeException("Invite has already been processed");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        member.setUser(user);
        member.setInviteStatus(WorkspaceMember.InviteStatus.ACCEPTED);
        member.setInviteToken(null);
        memberRepository.save(member);
    }

    public List<WorkspaceInviteResponse> getPendingInvites(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<WorkspaceMember> pendingInvites = memberRepository.findByInviteEmailAndInviteStatus(
                user.getEmail(), WorkspaceMember.InviteStatus.PENDING);

        return pendingInvites.stream()
                .map(invite -> new WorkspaceInviteResponse(
                        invite.getWorkspace().getId(),
                        invite.getWorkspace().getName(),
                        invite.getRole().name(),
                        invite.getInviteToken(),
                        invite.getCreatedAt(),
                        invite.getWorkspace().getOwner() != null ? invite.getWorkspace().getOwner().getUsername() : "Unknown",
                        invite.getWorkspace().getOwner() != null ? invite.getWorkspace().getOwner().getEmail() : "Unknown"
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void rejectInvite(String token, Long userId) {
        WorkspaceMember member = memberRepository.findByInviteToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired invite token"));

        if (member.getInviteStatus() != WorkspaceMember.InviteStatus.PENDING) {
            throw new RuntimeException("Invite has already been processed");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // verify email matches
        if (!member.getInviteEmail().equalsIgnoreCase(user.getEmail())) {
            throw new RuntimeException("This invite was sent to a different email address");
        }

        member.setInviteStatus(WorkspaceMember.InviteStatus.REJECTED);
        member.setInviteToken(null);
        memberRepository.save(member);
    }

    @Transactional
    public void updateMemberRole(Long workspaceId, Long memberUserId, Long requesterId, WorkspaceRoleRequest request) {
        verifyAccess(workspaceId, requesterId, WorkspaceMember.Role.ADMIN);

        WorkspaceMember targetMember = getWorkspaceMember(workspaceId, memberUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found in this workspace"));

        if (targetMember.getWorkspace().getOwner().getId().equals(memberUserId)) {
            throw new RuntimeException("Cannot change the role of the workspace owner");
        }

        targetMember.setRole(WorkspaceMember.Role.valueOf(request.getRole().toUpperCase()));
        memberRepository.save(targetMember);
    }

    @Transactional
    public void removeMember(Long workspaceId, Long memberId, Long requesterId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));

        WorkspaceMember targetMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found in this workspace"));

        if (!targetMember.getWorkspace().getId().equals(workspaceId)) {
            throw new RuntimeException("Member does not belong to this workspace");
        }

        // Only ADMIN can remove others, or user can remove themselves
        if (targetMember.getUser() == null || !requesterId.equals(targetMember.getUser().getId())) {
            verifyAccess(workspaceId, requesterId, WorkspaceMember.Role.ADMIN);
        }

        if (targetMember.getUser() != null && workspace.getOwner() != null && workspace.getOwner().getId().equals(targetMember.getUser().getId())) {
            throw new RuntimeException("Cannot remove the workspace owner. Transfer ownership or delete the workspace.");
        }

        memberRepository.delete(targetMember);
    }

    // --- Documents ---

    @Transactional
    public WorkspaceDocumentResponse createDocument(Long workspaceId, Long userId, WorkspaceDocumentRequest request) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace not found"));

        verifyAccess(workspaceId, userId, WorkspaceMember.Role.EDITOR);
        User user = userRepository.findById(userId).orElseThrow();

        WorkspaceDocument doc = new WorkspaceDocument(workspace, request.getTitle(), request.getContent(), user);
        doc = documentRepository.save(doc);

        return mapDocument(doc);
    }

    @Transactional(readOnly = true)
    public WorkspaceDocumentResponse getDocument(Long workspaceId, Long documentId, Long userId) {
        verifyAccess(workspaceId, userId, WorkspaceMember.Role.VIEWER);
        
        WorkspaceDocument doc = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
                
        if (!doc.getWorkspace().getId().equals(workspaceId)) {
            throw new RuntimeException("Document does not belong to this workspace");
        }
        
        return mapDocument(doc);
    }

    @Transactional
    public WorkspaceDocumentResponse updateDocument(Long workspaceId, Long documentId, Long userId, WorkspaceDocumentRequest request) {
        verifyAccess(workspaceId, userId, WorkspaceMember.Role.EDITOR);
        
        WorkspaceDocument doc = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
                
        if (!doc.getWorkspace().getId().equals(workspaceId)) {
            throw new RuntimeException("Document does not belong to this workspace");
        }
        
        User user = userRepository.findById(userId).orElseThrow();
        
        if (request.getTitle() != null) {
            doc.setTitle(request.getTitle());
        }
        if (request.getContent() != null) {
            doc.setContent(request.getContent());
        }
        
        doc.setLastEditedBy(user);
        doc.setVersion(doc.getVersion() + 1);
        doc = documentRepository.save(doc);
        
        return mapDocument(doc);
    }

    @Transactional
    public void deleteDocument(Long workspaceId, Long documentId, Long userId) {
        verifyAccess(workspaceId, userId, WorkspaceMember.Role.EDITOR);
        
        WorkspaceDocument doc = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
                
        if (!doc.getWorkspace().getId().equals(workspaceId)) {
            throw new RuntimeException("Document does not belong to this workspace");
        }
        
        documentRepository.delete(doc);
    }

    // --- Helpers ---

    private void verifyAccess(Long workspaceId, Long userId, WorkspaceMember.Role requiredRole) {
        WorkspaceMember member = getWorkspaceMember(workspaceId, userId)
                .orElseThrow(() -> new RuntimeException("Access denied: You are not a member of this workspace"));

        if (member.getInviteStatus() != WorkspaceMember.InviteStatus.ACCEPTED) {
            throw new RuntimeException("Access denied: Invite not accepted yet");
        }

        if (requiredRole == WorkspaceMember.Role.ADMIN && member.getRole() != WorkspaceMember.Role.ADMIN) {
            throw new RuntimeException("Access Denied: Only Workspace Admins can invite new members or change settings.");
        }
        
        if (requiredRole == WorkspaceMember.Role.EDITOR && member.getRole() == WorkspaceMember.Role.VIEWER) {
            throw new RuntimeException("Access Denied: Your current role is 'Viewer'. You must be an Editor or Admin to modify this document.");
        }
    }

    private Optional<WorkspaceMember> getWorkspaceMember(Long workspaceId, Long userId) {
        List<WorkspaceMember> members = memberRepository.findByWorkspaceIdAndUserId(workspaceId, userId);
        return members.isEmpty() ? Optional.empty() : Optional.of(members.get(0));
    }

    private WorkspaceResponse mapToResponse(Workspace workspace, Long currentUserId) {
        WorkspaceResponse res = new WorkspaceResponse();
        res.setId(workspace.getId());
        res.setName(workspace.getName());
        res.setDescription(workspace.getDescription());
        
        if (workspace.getOwner() != null) {
            res.setOwnerName(workspace.getOwner().getUsername());
            res.setOwnerId(workspace.getOwner().getId());
        } else {
            res.setOwnerName("Unknown");
            res.setOwnerId(0L);
        }
        
        res.setCreatedAt(workspace.getCreatedAt());

        Optional<WorkspaceMember> currentUserMember = getWorkspaceMember(workspace.getId(), currentUserId);
        currentUserMember.ifPresent(m -> res.setCurrentUserRole(m.getRole() != null ? m.getRole().name() : "VIEWER"));

        List<WorkspaceMember> members = memberRepository.findByWorkspaceId(workspace.getId());
        res.setMemberCount((int) members.stream().filter(m -> m.getInviteStatus() == WorkspaceMember.InviteStatus.ACCEPTED).count());
        
        res.setMembers(members.stream().map(this::mapMember).collect(Collectors.toList()));

        List<WorkspaceDocument> docs = documentRepository.findByWorkspaceId(workspace.getId());
        res.setDocumentCount(docs.size());
        res.setDocuments(docs.stream().map(this::mapDocument).collect(Collectors.toList()));

        return res;
    }

    private WorkspaceMemberResponse mapMember(WorkspaceMember member) {
        WorkspaceMemberResponse res = new WorkspaceMemberResponse();
        res.setId(member.getId());
        if (member.getUser() != null) {
            res.setUserId(member.getUser().getId());
            res.setName(member.getUser().getUsername());
        }
        res.setEmail(member.getInviteEmail());
        res.setRole(member.getRole() != null ? member.getRole().name() : "VIEWER");
        res.setInviteStatus(member.getInviteStatus() != null ? member.getInviteStatus().name() : "PENDING");
        res.setJoinedAt(member.getJoinedAt());
        return res;
    }

    private WorkspaceDocumentResponse mapDocument(WorkspaceDocument doc) {
        WorkspaceDocumentResponse res = new WorkspaceDocumentResponse();
        res.setId(doc.getId());
        res.setTitle(doc.getTitle());
        res.setContent(doc.getContent());
        if (doc.getLastEditedBy() != null) {
            res.setLastEditedByName(doc.getLastEditedBy().getUsername());
        }
        res.setVersion(doc.getVersion());
        res.setUpdatedAt(doc.getUpdatedAt());
        return res;
    }
}
