package com.jeevan.smart_notes_api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Represents a member of a collaboration workspace.
 * Handles role-based access and invitation flows.
 */
@Entity
@Table(name = "workspace_members", indexes = {
    @Index(name = "idx_workspace_member_ws", columnList = "workspace_id"),
    @Index(name = "idx_workspace_member_user", columnList = "user_id"),
    @Index(name = "idx_workspace_member_email", columnList = "invite_email")
})
public class WorkspaceMember {

    public enum Role {
        VIEWER, EDITOR, ADMIN
    }

    public enum InviteStatus {
        PENDING, ACCEPTED, REJECTED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // Nullable if invite is pending

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private Role role;

    @Column(name = "invite_email")
    private String inviteEmail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private InviteStatus inviteStatus;

    @Column(name = "invite_token", unique = true)
    private String inviteToken;

    private LocalDateTime joinedAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public WorkspaceMember() {
    }

    public WorkspaceMember(Workspace workspace, User user, Role role, String inviteEmail, InviteStatus inviteStatus, String inviteToken) {
        this.workspace = workspace;
        this.user = user;
        this.role = role;
        this.inviteEmail = inviteEmail;
        this.inviteStatus = inviteStatus;
        this.inviteToken = inviteToken;
        if (inviteStatus == InviteStatus.ACCEPTED) {
            this.joinedAt = LocalDateTime.now();
        }
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // ── Getters & Setters ───────────────────────────────────────────────

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getInviteEmail() {
        return inviteEmail;
    }

    public void setInviteEmail(String inviteEmail) {
        this.inviteEmail = inviteEmail;
    }

    public InviteStatus getInviteStatus() {
        return inviteStatus;
    }

    public void setInviteStatus(InviteStatus inviteStatus) {
        this.inviteStatus = inviteStatus;
    }

    public String getInviteToken() {
        return inviteToken;
    }

    public void setInviteToken(String inviteToken) {
        this.inviteToken = inviteToken;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
