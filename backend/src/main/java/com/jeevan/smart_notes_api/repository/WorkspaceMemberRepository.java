package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.WorkspaceMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMember, Long> {
    List<WorkspaceMember> findByWorkspaceId(Long workspaceId);
    List<WorkspaceMember> findByUserId(Long userId);
    List<WorkspaceMember> findByInviteEmailAndInviteStatus(String email, WorkspaceMember.InviteStatus status);
    Optional<WorkspaceMember> findByInviteToken(String token);
    List<WorkspaceMember> findByWorkspaceIdAndUserId(Long workspaceId, Long userId);
}
