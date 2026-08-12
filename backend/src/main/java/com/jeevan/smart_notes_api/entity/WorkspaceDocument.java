package com.jeevan.smart_notes_api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Represents a document within a collaboration workspace.
 * Tracks content, version, and the last editor.
 */
@Entity
@Table(name = "workspace_documents", indexes = {
    @Index(name = "idx_workspace_document_ws", columnList = "workspace_id")
})
public class WorkspaceDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @Column(nullable = false, length = 200)
    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_edited_by_id")
    private User lastEditedBy;

    @Column(nullable = false)
    private Integer version = 1;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public WorkspaceDocument() {
    }

    public WorkspaceDocument(Workspace workspace, String title, String content, User createdBy) {
        this.workspace = workspace;
        this.title = title;
        this.content = content;
        this.lastEditedBy = createdBy;
        this.version = 1;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getLastEditedBy() {
        return lastEditedBy;
    }

    public void setLastEditedBy(User lastEditedBy) {
        this.lastEditedBy = lastEditedBy;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
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
