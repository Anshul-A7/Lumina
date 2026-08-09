package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findBySessionIdOrderByCreatedAtAsc(Long sessionId);

    @Query("SELECT m FROM ChatMessage m WHERE m.session.id = :sessionId ORDER BY m.createdAt DESC LIMIT 1")
    Optional<ChatMessage> findLastMessageBySessionId(@Param("sessionId") Long sessionId);

    @Query("SELECT m FROM ChatMessage m WHERE m.session.id = :sessionId AND m.role = 'USER' ORDER BY m.createdAt DESC LIMIT 1")
    Optional<ChatMessage> findLastUserMessageBySessionId(@Param("sessionId") Long sessionId);

    @Query("SELECT m FROM ChatMessage m WHERE m.session.id = :sessionId AND m.role = 'ASSISTANT' ORDER BY m.createdAt DESC LIMIT 1")
    Optional<ChatMessage> findLastAssistantMessageBySessionId(@Param("sessionId") Long sessionId);

    long countBySessionId(Long sessionId);

    void deleteBySessionId(Long sessionId);

    @Query("SELECT m FROM ChatMessage m WHERE m.session.user.email = :email AND LOWER(m.content) LIKE LOWER(CONCAT('%', :query, '%')) ORDER BY m.createdAt DESC")
    List<ChatMessage> searchByContent(@Param("email") String email, @Param("query") String query);
}
