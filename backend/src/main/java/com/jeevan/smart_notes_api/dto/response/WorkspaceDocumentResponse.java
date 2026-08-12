package com.jeevan.smart_notes_api.dto.response;

import java.time.LocalDateTime;

public class WorkspaceDocumentResponse {
    private Long id;
    private String title;
    private String content; // Depending on endpoint, this might be truncated or omitted for lists
    private String lastEditedByName;
    private Integer version;
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getLastEditedByName() { return lastEditedByName; }
    public void setLastEditedByName(String lastEditedByName) { this.lastEditedByName = lastEditedByName; }
    public Integer getVersion() { return version; }
    public void setVersion(Integer version) { this.version = version; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
