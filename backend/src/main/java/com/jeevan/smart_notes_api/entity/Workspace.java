package com.jeevan.smart_notes_api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a collaboration workspace where multiple users can share and edit documents.
 * Each workspace has an owner (the creator) and can have multiple members with different roles.
 */
@Entity
@Table(name = "workspaces", indexes = {
    @Index(name = "idx_workspace_owner", columnList = "owner_id")
})
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @JsonIgnore
    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkspaceMember> members = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkspaceDocument> documents = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public Workspace() {
    }

    public Workspace(String name, String description, User owner) {
        this.name = name;
        this.description = description;
        this.owner = owner;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<WorkspaceMember> getMembers() {
        return members;
    }

    public void setMembers(List<WorkspaceMember> members) {
        this.members = members;
    }

    public List<WorkspaceDocument> getDocuments() {
        return documents;
    }

    public void setDocuments(List<WorkspaceDocument> documents) {
        this.documents = documents;
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
