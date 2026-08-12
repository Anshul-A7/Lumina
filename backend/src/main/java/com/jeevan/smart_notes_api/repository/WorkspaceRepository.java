package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
    List<Workspace> findByOwnerId(Long ownerId);
}
