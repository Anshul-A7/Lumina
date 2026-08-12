package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.WorkspaceDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkspaceDocumentRepository extends JpaRepository<WorkspaceDocument, Long> {
    List<WorkspaceDocument> findByWorkspaceId(Long workspaceId);
}
