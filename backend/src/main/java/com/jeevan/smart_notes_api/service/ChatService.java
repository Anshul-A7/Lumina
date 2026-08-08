package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.entity.ChatMessage;
import com.jeevan.smart_notes_api.entity.ChatSession;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.exception.ResourceNotFoundException;
import com.jeevan.smart_notes_api.repository.ChatMessageRepository;
import com.jeevan.smart_notes_api.repository.ChatSessionRepository;
import com.jeevan.smart_notes_api.repository.UserRepository;
import com.jeevan.smart_notes_api.util.FileExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private ChatSessionRepository sessionRepository;

    @Autowired
    private ChatMessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AiService aiService;

    // ════════════════════════════════════════════════════════════════════════
    // SESSION MANAGEMENT
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Create a new chat session for the authenticated user.
     * Initial title defaults to "New Session" and will be dynamically renamed
     * after the first AI response via generateDynamicTitle().
     */
    public ChatSession createSession(String email, String title) {
        User user = findUserByEmail(email);

        ChatSession session = new ChatSession(
                title != null && !title.isBlank() ? title : "New Session",
                user
        );

        return sessionRepository.save(session);
    }

    /**
     * List all sessions for the authenticated user, ordered by most recent first.
     */
    public List<ChatSession> getSessionsByUser(String email) {
        return sessionRepository.findByUserEmailOrderByUpdatedAtDesc(email);
    }

    /**
     * Get a specific session with all its messages.
     */
    public ChatSession getSessionById(Long sessionId, String email) {
        return sessionRepository.findByIdAndUserEmail(sessionId, email)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found"));
    }

    /**
     * Rename a session.
     */
    public ChatSession renameSession(Long sessionId, String newTitle, String email) {
        ChatSession session = getSessionById(sessionId, email);
        session.setTitle(newTitle);
        return sessionRepository.save(session);
    }

    /**
     * Toggle pin status of a session.
     */
    public ChatSession togglePin(Long sessionId, String email) {
        ChatSession session = getSessionById(sessionId, email);
        session.setPinned(!session.isPinned());
        return sessionRepository.save(session);
    }

    /**
     * Delete a session and all its messages (cascaded).
     */
    @Transactional
    public void deleteSession(Long sessionId, String email) {
        ChatSession session = getSessionById(sessionId, email);
        sessionRepository.delete(session);
    }

    // ════════════════════════════════════════════════════════════════════════
    // MESSAGE MANAGEMENT
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Add a user message to the session, get AI response, save both, and return the AI message.
     * This is the primary chat flow:
     * 1. Save user message
     * 2. Build conversation history from all messages in session
     * 3. Call AI with full history
     * 4. Save AI response as assistant message
     * 5. Auto-generate session title after first exchange
     * 6. Return the AI message
     */
    @Transactional
    public ChatMessage sendMessage(Long sessionId, String email, String content,
                                   List<MultipartFile> files) {

        ChatSession session = getSessionById(sessionId, email);

        // Build attachment names string
        String attachmentNames = null;
        if (files != null && !files.isEmpty()) {
            attachmentNames = files.stream()
                    .map(MultipartFile::getOriginalFilename)
                    .collect(Collectors.joining(", "));
        }

        // Save user message
        ChatMessage userMessage = new ChatMessage(
                session,
                ChatMessage.Role.USER,
                content,
                attachmentNames
        );
        messageRepository.save(userMessage);

        // Build conversation history for AI context
        List<ChatMessage> allMessages = messageRepository.findBySessionIdOrderByCreatedAtAsc(sessionId);
        String conversationHistory = buildConversationHistory(allMessages);

        // Get AI response
        String aiResponseText;
        try {
            if (files != null && !files.isEmpty()) {
                aiResponseText = aiService.summarizeWithFiles(files, content, email);
            } else {
                aiResponseText = aiService.chat(conversationHistory, email);
            }
        } catch (Exception e) {
            aiResponseText = "I encountered an issue processing your request. Please try again.";
        }

        // Save AI response
        ChatMessage aiMessage = new ChatMessage(
                session,
                ChatMessage.Role.ASSISTANT,
                aiResponseText,
                null
        );
        messageRepository.save(aiMessage);

        // Touch session updatedAt
        session.setUpdatedAt(java.time.LocalDateTime.now());
        sessionRepository.save(session);

        // Auto-generate title after first exchange (only if still "New Session")
        if ("New Session".equals(session.getTitle()) || session.getTitle().startsWith("New Session")) {
            try {
                String dynamicTitle = aiService.generateSessionTitle(content);
                if (dynamicTitle != null && !dynamicTitle.isBlank()) {
                    session.setTitle(dynamicTitle);
                    sessionRepository.save(session);
                }
            } catch (Exception ignored) {
                // Title generation failure is non-critical
            }
        }

        return aiMessage;
    }

    /**
     * Regenerate the last AI response for a session.
     * Deletes the previous assistant message, calls AI again with full history, saves new response.
     */
    @Transactional
    public ChatMessage regenerateLastResponse(Long sessionId, String email) {
        ChatSession session = getSessionById(sessionId, email);

        // Find and delete last assistant message
        ChatMessage lastAssistant = messageRepository
                .findLastAssistantMessageBySessionId(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("No AI response to regenerate"));

        messageRepository.delete(lastAssistant);

        // Find last user message for context
        ChatMessage lastUserMessage = messageRepository
                .findLastUserMessageBySessionId(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("No user message found"));

        // Build conversation history (excluding the deleted AI message)
        List<ChatMessage> remainingMessages = messageRepository.findBySessionIdOrderByCreatedAtAsc(sessionId);
        String conversationHistory = buildConversationHistory(remainingMessages);

        // Call AI with regeneration prompt
        String newResponse;
        try {
            newResponse = aiService.regenerateResponse(conversationHistory, lastUserMessage.getContent());
        } catch (Exception e) {
            newResponse = "I encountered an issue regenerating the response. Please try again.";
        }

        // Save new AI response
        ChatMessage newAiMessage = new ChatMessage(
                session,
                ChatMessage.Role.ASSISTANT,
                newResponse,
                null
        );
        messageRepository.save(newAiMessage);

        return newAiMessage;
    }

    /**
     * Get all messages for a session in chronological order.
     */
    public List<ChatMessage> getMessages(Long sessionId, String email) {
        // Verify access
        getSessionById(sessionId, email);
        return messageRepository.findBySessionIdOrderByCreatedAtAsc(sessionId);
    }

    // ════════════════════════════════════════════════════════════════════════
    // INTERNAL HELPERS
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Build a formatted conversation history string from a list of messages.
     * Format:
     *   **You:**
     *   user message content
     *
     *   **Lumina:**
     *   assistant response content
     */
    private String buildConversationHistory(List<ChatMessage> messages) {
        StringBuilder history = new StringBuilder();
        for (ChatMessage msg : messages) {
            if (msg.getRole() == ChatMessage.Role.USER) {
                history.append("**You:**\n").append(msg.getContent());
                if (msg.getAttachmentNames() != null && !msg.getAttachmentNames().isBlank()) {
                    history.append("\n*(Attached Files: ").append(msg.getAttachmentNames()).append(")*");
                }
            } else {
                history.append(msg.getContent());
            }
            history.append("\n\n");
        }
        return history.toString().trim();
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
