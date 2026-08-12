package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.dto.request.WorkspaceDocumentRequest;
import com.jeevan.smart_notes_api.dto.request.WorkspaceInviteRequest;
import com.jeevan.smart_notes_api.dto.request.WorkspaceRequest;
import com.jeevan.smart_notes_api.dto.request.WorkspaceRoleRequest;
import com.jeevan.smart_notes_api.dto.response.WorkspaceDocumentResponse;
import com.jeevan.smart_notes_api.dto.response.WorkspaceInviteResponse;
import com.jeevan.smart_notes_api.dto.response.WorkspaceResponse;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.security.UserDetails.UserPrincipal;
import com.jeevan.smart_notes_api.service.WorkspaceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/workspaces")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    // --- Workspace CRUD ---

    @PostMapping
    public ResponseEntity<WorkspaceResponse> createWorkspace(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody WorkspaceRequest request) {
        User user = userPrincipal.getUser();
        WorkspaceResponse response = workspaceService.createWorkspace(user.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<WorkspaceResponse>> getUserWorkspaces(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userPrincipal.getUser();
        List<WorkspaceResponse> workspaces = workspaceService.getUserWorkspaces(user.getId());
        return ResponseEntity.ok(workspaces);
    }

    @GetMapping("/{workspaceId}")
    public ResponseEntity<WorkspaceResponse> getWorkspace(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long workspaceId) {
        User user = userPrincipal.getUser();
        WorkspaceResponse response = workspaceService.getWorkspace(workspaceId, user.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{workspaceId}")
    public ResponseEntity<WorkspaceResponse> updateWorkspace(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long workspaceId,
            @Valid @RequestBody WorkspaceRequest request) {
        User user = userPrincipal.getUser();
        WorkspaceResponse response = workspaceService.updateWorkspace(workspaceId, user.getId(), request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{workspaceId}")
    public ResponseEntity<Void> deleteWorkspace(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long workspaceId) {
        User user = userPrincipal.getUser();
        workspaceService.deleteWorkspace(workspaceId, user.getId());
        return ResponseEntity.noContent().build();
    }

    // --- Membership & Invites ---

    @PostMapping("/{workspaceId}/invites")
    public ResponseEntity<Map<String, String>> inviteMember(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long workspaceId,
            @Valid @RequestBody WorkspaceInviteRequest request) {
        User user = userPrincipal.getUser();
        workspaceService.inviteMember(workspaceId, user.getId(), request);
        return ResponseEntity.ok(Map.of("message", "Invite sent successfully"));
    }

    @PostMapping("/invites/{token}/accept")
    public ResponseEntity<Map<String, String>> acceptInvite(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String token) {
        User user = userPrincipal.getUser();
        workspaceService.acceptInvite(token, user.getId());
        return ResponseEntity.ok(Map.of("message", "Invite accepted successfully"));
    }

    @PostMapping("/invites/{token}/reject")
    public ResponseEntity<Map<String, String>> rejectInvite(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String token) {
        User user = userPrincipal.getUser();
        workspaceService.rejectInvite(token, user.getId());
        return ResponseEntity.ok(Map.of("message", "Invite rejected successfully"));
    }

    @GetMapping("/invites/pending")
    public ResponseEntity<List<WorkspaceInviteResponse>> getPendingInvites(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userPrincipal.getUser();
        List<WorkspaceInviteResponse> invites = workspaceService.getPendingInvites(user.getId());
        return ResponseEntity.ok(invites);
    }

    @PutMapping("/{workspaceId}/members/{memberUserId}/role")
    public ResponseEntity<Map<String, String>> updateMemberRole(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long workspaceId,
            @PathVariable Long memberUserId,
            @Valid @RequestBody WorkspaceRoleRequest request) {
        User user = userPrincipal.getUser();
        workspaceService.updateMemberRole(workspaceId, memberUserId, user.getId(), request);
        return ResponseEntity.ok(Map.of("message", "Member role updated successfully"));
    }

    @DeleteMapping("/{workspaceId}/members/{memberId}")
    public ResponseEntity<Void> removeMember(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long workspaceId,
            @PathVariable Long memberId) {
        User user = userPrincipal.getUser();
        workspaceService.removeMember(workspaceId, memberId, user.getId());
        return ResponseEntity.noContent().build();
    }

    // --- Documents ---

    @PostMapping("/{workspaceId}/documents")
    public ResponseEntity<WorkspaceDocumentResponse> createDocument(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long workspaceId,
            @Valid @RequestBody WorkspaceDocumentRequest request) {
        User user = userPrincipal.getUser();
        WorkspaceDocumentResponse response = workspaceService.createDocument(workspaceId, user.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{workspaceId}/documents/{documentId}")
    public ResponseEntity<WorkspaceDocumentResponse> getDocument(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long workspaceId,
            @PathVariable Long documentId) {
        User user = userPrincipal.getUser();
        WorkspaceDocumentResponse response = workspaceService.getDocument(workspaceId, documentId, user.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{workspaceId}/documents/{documentId}")
    public ResponseEntity<WorkspaceDocumentResponse> updateDocument(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long workspaceId,
            @PathVariable Long documentId,
            @Valid @RequestBody WorkspaceDocumentRequest request) {
        User user = userPrincipal.getUser();
        WorkspaceDocumentResponse response = workspaceService.updateDocument(workspaceId, documentId, user.getId(), request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{workspaceId}/documents/{documentId}")
    public ResponseEntity<Void> deleteDocument(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long workspaceId,
            @PathVariable Long documentId) {
        User user = userPrincipal.getUser();
        workspaceService.deleteDocument(workspaceId, documentId, user.getId());
        return ResponseEntity.noContent().build();
    }
}
