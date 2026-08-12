package com.jeevan.smart_notes_api.dto.response;

import java.time.LocalDateTime;

public class WorkspaceInviteResponse {
    private Long workspaceId;
    private String workspaceName;
    private String role;
    private String inviteToken;
    private LocalDateTime invitedAt;
    private String inviterName;
    private String inviterEmail;

    public WorkspaceInviteResponse() {}

    public WorkspaceInviteResponse(Long workspaceId, String workspaceName, String role, String inviteToken, LocalDateTime invitedAt, String inviterName, String inviterEmail) {
        this.workspaceId = workspaceId;
        this.workspaceName = workspaceName;
        this.role = role;
        this.inviteToken = inviteToken;
        this.invitedAt = invitedAt;
        this.inviterName = inviterName;
        this.inviterEmail = inviterEmail;
    }

    public Long getWorkspaceId() { return workspaceId; }
    public void setWorkspaceId(Long workspaceId) { this.workspaceId = workspaceId; }

    public String getWorkspaceName() { return workspaceName; }
    public void setWorkspaceName(String workspaceName) { this.workspaceName = workspaceName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getInviteToken() { return inviteToken; }
    public void setInviteToken(String inviteToken) { this.inviteToken = inviteToken; }

    public LocalDateTime getInvitedAt() { return invitedAt; }
    public void setInvitedAt(LocalDateTime invitedAt) { this.invitedAt = invitedAt; }

    public String getInviterName() { return inviterName; }
    public void setInviterName(String inviterName) { this.inviterName = inviterName; }

    public String getInviterEmail() { return inviterEmail; }
    public void setInviterEmail(String inviterEmail) { this.inviterEmail = inviterEmail; }
}
