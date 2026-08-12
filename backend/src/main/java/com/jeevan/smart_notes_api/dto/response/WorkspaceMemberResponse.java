package com.jeevan.smart_notes_api.dto.response;

import java.time.LocalDateTime;

public class WorkspaceMemberResponse {
    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String role;
    private String inviteStatus;
    private LocalDateTime joinedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getInviteStatus() { return inviteStatus; }
    public void setInviteStatus(String inviteStatus) { this.inviteStatus = inviteStatus; }
    public LocalDateTime getJoinedAt() { return joinedAt; }
    public void setJoinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; }
}
