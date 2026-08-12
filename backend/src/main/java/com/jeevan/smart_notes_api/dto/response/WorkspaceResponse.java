package com.jeevan.smart_notes_api.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class WorkspaceResponse {
    private Long id;
    private String name;
    private String description;
    private String ownerName;
    private Long ownerId;
    private LocalDateTime createdAt;
    private String currentUserRole;
    private int memberCount;
    private int documentCount;
    private List<WorkspaceMemberResponse> members;
    private List<WorkspaceDocumentResponse> documents;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getCurrentUserRole() { return currentUserRole; }
    public void setCurrentUserRole(String currentUserRole) { this.currentUserRole = currentUserRole; }
    public int getMemberCount() { return memberCount; }
    public void setMemberCount(int memberCount) { this.memberCount = memberCount; }
    public int getDocumentCount() { return documentCount; }
    public void setDocumentCount(int documentCount) { this.documentCount = documentCount; }
    public List<WorkspaceMemberResponse> getMembers() { return members; }
    public void setMembers(List<WorkspaceMemberResponse> members) { this.members = members; }
    public List<WorkspaceDocumentResponse> getDocuments() { return documents; }
    public void setDocuments(List<WorkspaceDocumentResponse> documents) { this.documents = documents; }
}
