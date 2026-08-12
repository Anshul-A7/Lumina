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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private static final Logger log = LoggerFactory.getLogger(ChatService.class);

    @Autowired
    private ChatSessionRepository sessionRepository;

    @Autowired
    private ChatMessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AiService aiService;

    @Autowired
    private ImageService imageService;

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
     * Get all messages for a session in chronological order.
     */
    public List<ChatMessage> getSessionMessages(Long sessionId) {
        return messageRepository.findBySessionIdOrderByCreatedAtAsc(sessionId);
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
            log.error("AI processing error: ", e);
            aiResponseText = e.getMessage() != null ? e.getMessage() : "Something went wrong, Please try again.";
        }

        // Extract and save any generated images
        extractAndSaveImages(aiResponseText, email);

        // Sanitize: If the AI mentions the tag in conversational text (e.g., `<pdf_document>`), strip it to avoid frontend parsing errors
        aiResponseText = aiResponseText.replaceAll("`<pdf_document[^>]*>`", "PDF format");
        aiResponseText = aiResponseText.replaceAll("`</pdf_document>`", "end of PDF format");

        // Fallback: If user explicitly asked for a PDF, but AI forgot the <pdf_document> tags, we inject them manually
        if (aiService.isPdfGenerationRequest(content) && !aiResponseText.contains("<pdf_document")) {
            aiResponseText = "<pdf_document title=\"Generated Document\">\n" + aiResponseText + "\n</pdf_document>";
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
     * SSE streaming variant of sendMessage. Streams AI tokens via tokenConsumer,
     * saves the final accumulated response as an assistant message.
     */
    @Transactional
    public ChatMessage sendMessageStreaming(Long sessionId, String email, String content,
                                           java.util.function.Consumer<String> tokenConsumer) {

        ChatSession session = getSessionById(sessionId, email);

        // Save user message
        ChatMessage userMessage = new ChatMessage(session, ChatMessage.Role.USER, content, null);
        messageRepository.save(userMessage);

        // Build conversation history for AI context
        List<ChatMessage> allMessages = messageRepository.findBySessionIdOrderByCreatedAtAsc(sessionId);
        String conversationHistory = buildConversationHistory(allMessages);

        // Stream AI response
        String aiResponseText;
        try {
            aiResponseText = aiService.streamChat(conversationHistory, email, tokenConsumer);
        } catch (Exception e) {
            log.error("AI streaming error: ", e);
            aiResponseText = e.getMessage() != null ? e.getMessage() : "Something went wrong, Please try again.";
        }

        // Extract and save any generated images
        extractAndSaveImages(aiResponseText, email);

        // Save AI response
        ChatMessage aiMessage = new ChatMessage(session, ChatMessage.Role.ASSISTANT, aiResponseText, null);
        messageRepository.save(aiMessage);

        // Touch session updatedAt
        session.setUpdatedAt(java.time.LocalDateTime.now());
        sessionRepository.save(session);

        // Auto-generate title after first exchange
        if ("New Session".equals(session.getTitle()) || session.getTitle().startsWith("New Session")) {
            try {
                String dynamicTitle = aiService.generateSessionTitle(content);
                if (dynamicTitle != null && !dynamicTitle.isBlank()) {
                    session.setTitle(dynamicTitle);
                    sessionRepository.save(session);
                }
            } catch (Exception ignored) {}
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
            log.error("AI regeneration error: ", e);
            newResponse = e.getMessage() != null ? e.getMessage() : "Something went wrong, Please try again.";
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

    /**
     * Update the latest PDF document in a chat session with manually edited content.
     */
    @Transactional
    public ChatMessage updateLatestPdfContent(Long sessionId, String email, String title, String newPdfContent) {
        getSessionById(sessionId, email);
        List<ChatMessage> messages = messageRepository.findBySessionIdOrderByCreatedAtAsc(sessionId);

        // 1. Search for assistant message containing <pdf_document
        for (int i = messages.size() - 1; i >= 0; i--) {
            ChatMessage msg = messages.get(i);
            if (msg.getRole() == ChatMessage.Role.ASSISTANT && msg.getContent() != null && msg.getContent().toLowerCase().contains("<pdf_document")) {
                String replacement = String.format("<pdf_document title=\"%s\">\n%s\n</pdf_document>", title != null ? title : "Document", newPdfContent);
                String updatedContent = msg.getContent().replaceAll("(?is)<pdf_document[^>]*>.*?</pdf_document>", java.util.regex.Matcher.quoteReplacement(replacement));
                msg.setContent(updatedContent);
                return messageRepository.save(msg);
            }
        }

        // 2. Fallback: If no message had <pdf_document tag, update the latest ASSISTANT message
        for (int i = messages.size() - 1; i >= 0; i--) {
            ChatMessage msg = messages.get(i);
            if (msg.getRole() == ChatMessage.Role.ASSISTANT) {
                String replacement = String.format("<pdf_document title=\"%s\">\n%s\n</pdf_document>", title != null ? title : "Document", newPdfContent);
                msg.setContent(replacement);
                return messageRepository.save(msg);
            }
        }

        return null;
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
        for (int i = 0; i < messages.size(); i++) {
            ChatMessage msg = messages.get(i);
            if (msg.getRole() == ChatMessage.Role.USER) {
                String content = msg.getContent() != null ? msg.getContent().trim() : "";
                boolean isPdfCommand = content.equalsIgnoreCase("Generate PDF")
                        || content.equalsIgnoreCase("generate a pdf")
                        || content.equalsIgnoreCase("Generate PDF for the response above")
                        || content.toLowerCase().startsWith("generate a pdf")
                        || content.toLowerCase().startsWith("please generate a formatted pdf");

                if (isPdfCommand && i > 0) {
                    history.append("**You:**\n").append("Generate a PDF. Please compile and expand the immediately preceding response into a massive, exhaustive, publication-grade study/research document enclosed inside a <pdf_document title=\"...\"> tag. The document MUST be extremely detailed and long, like a comprehensive textbook chapter. Include all concepts, sections, formulas, and diagrams with complete fidelity. CRITICAL: Provide ONLY a very brief 1-sentence summary in your chat response. DO NOT duplicate the full explanation in the chat, place the full explanation exclusively inside the <pdf_document> tag.");
                } else {
                    history.append("**You:**\n").append(content);
                }

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

    /**
     * Search messages across all sessions for a user.
     * Returns matching messages with their session context.
     */
    public List<java.util.Map<String, Object>> searchMessages(String email, String query) {
        if (query == null || query.trim().length() < 2) {
            return java.util.Collections.emptyList();
        }

        List<ChatMessage> results = messageRepository.searchByContent(email, query.trim());

        // Limit to 50 results max
        return results.stream()
                .limit(50)
                .map(msg -> {
                    java.util.Map<String, Object> result = new java.util.HashMap<>();
                    result.put("sessionId", msg.getSession().getId());
                    result.put("sessionTitle", msg.getSession().getTitle());
                    result.put("messageId", msg.getId());
                    result.put("role", msg.getRole().name());
                    // Return snippet around match (max 200 chars)
                    String content = msg.getContent();
                    int idx = content.toLowerCase().indexOf(query.toLowerCase());
                    if (idx >= 0) {
                        int start = Math.max(0, idx - 60);
                        int end = Math.min(content.length(), idx + query.length() + 140);
                        String snippet = (start > 0 ? "..." : "") + content.substring(start, end) + (end < content.length() ? "..." : "");
                        result.put("content", snippet);
                    } else {
                        result.put("content", content.length() > 200 ? content.substring(0, 200) + "..." : content);
                    }
                    result.put("createdAt", msg.getCreatedAt());
                    return result;
                })
                .collect(Collectors.toList());
    }

    private void extractAndSaveImages(String responseText, String email) {
        if (responseText == null || !responseText.contains("GENERATE_IMAGE:")) return;

        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(
            "!\\[([^\\]]*)\\]\\(GENERATE_IMAGE:([^)]+)\\)"
        );
        java.util.regex.Matcher matcher = pattern.matcher(responseText);

        while (matcher.find()) {
            String prompt = matcher.group(2).trim();
            String encodedPrompt = java.net.URLEncoder.encode(prompt, java.nio.charset.StandardCharsets.UTF_8);
            String imageUrl = "https://image.pollinations.ai/prompt/" + encodedPrompt + "?width=1024&height=1024&nologo=true";
            
            try {
                imageService.saveImage(email, prompt, imageUrl);
            } catch (Exception e) {
                log.error("Failed to save generated image to workspace: {}", e.getMessage());
            }
        }
    }
}
