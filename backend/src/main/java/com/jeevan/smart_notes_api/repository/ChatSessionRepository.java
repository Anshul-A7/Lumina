package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {

    List<ChatSession> findByUserEmailOrderByUpdatedAtDesc(String email);

    Optional<ChatSession> findByIdAndUserEmail(Long id, String email);

    @Query("SELECT s FROM ChatSession s WHERE s.user.email = :email AND s.pinned = true ORDER BY s.updatedAt DESC")
    List<ChatSession> findPinnedByUserEmail(@Param("email") String email);

    long countByUserEmail(String email);

    void deleteByIdAndUserEmail(Long id, String email);
}
