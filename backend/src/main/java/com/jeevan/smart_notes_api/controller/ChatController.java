package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.entity.ChatMessage;
import com.jeevan.smart_notes_api.entity.ChatSession;
import com.jeevan.smart_notes_api.service.ChatService;
import com.jeevan.smart_notes_api.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private com.jeevan.smart_notes_api.service.PdfService pdfService;

    // ════════════════════════════════════════════════════════════════════════
    // SESSION ENDPOINTS
    // ════════════════════════════════════════════════════════════════════════

    /**
     * POST /chat/sessions — Create a new chat session.
     * Body: { "title": "optional title" }
     */
    @PostMapping("/sessions")
    public ResponseEntity<Map<String, Object>> createSession(
            @RequestBody(required = false) Map<String, String> body,
            Authentication auth) {

        String email = auth.getName();
        String title = (body != null && body.containsKey("title")) ? body.get("title") : null;

        ChatSession session = chatService.createSession(email, title);
        return ResponseEntity.ok(mapSession(session));
    }

    /**
     * GET /chat/sessions — List all sessions for the authenticated user.
     */
    @GetMapping("/sessions")
    public ResponseEntity<List<Map<String, Object>>> getSessions(Authentication auth) {
        String email = auth.getName();
        List<ChatSession> sessions = chatService.getSessionsByUser(email);
        List<Map<String, Object>> result = sessions.stream().map(this::mapSession).toList();
        return ResponseEntity.ok(result);
    }

    /**
     * GET /chat/sessions/{id} — Get a session with all messages.
     */
    @GetMapping("/sessions/{id}")
    public ResponseEntity<Map<String, Object>> getSession(
            @PathVariable Long id,
            Authentication auth) {

        String email = auth.getName();
        ChatSession session = chatService.getSessionById(id, email);
        List<ChatMessage> messages = chatService.getMessages(id, email);

        Map<String, Object> result = mapSession(session);
        result.put("messages", messages.stream().map(this::mapMessage).toList());
        return ResponseEntity.ok(result);
    }

    /**
     * PUT /chat/sessions/{id}/rename — Rename a session.
     * Body: { "title": "New Title" }
     */
    @PutMapping("/sessions/{id}/rename")
    public ResponseEntity<Map<String, Object>> renameSession(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            Authentication auth) {

        String email = auth.getName();
        String newTitle = body.get("title");
        ChatSession session = chatService.renameSession(id, newTitle, email);
        return ResponseEntity.ok(mapSession(session));
    }

    /**
     * PUT /chat/sessions/{id}/pin — Toggle pin status.
     */
    @PutMapping("/sessions/{id}/pin")
    public ResponseEntity<Map<String, Object>> togglePin(
            @PathVariable Long id,
            Authentication auth) {

        String email = auth.getName();
        ChatSession session = chatService.togglePin(id, email);
        return ResponseEntity.ok(mapSession(session));
    }

    /**
     * DELETE /chat/sessions/{id} — Delete a session and all its messages.
     */
    @DeleteMapping("/sessions/{id}")
    public ResponseEntity<Map<String, String>> deleteSession(
            @PathVariable Long id,
            Authentication auth) {

        String email = auth.getName();
        chatService.deleteSession(id, email);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Session deleted successfully");
        return ResponseEntity.ok(response);
    }

    // ════════════════════════════════════════════════════════════════════════
    // MESSAGE ENDPOINTS
    // ════════════════════════════════════════════════════════════════════════

    /**
     * POST /chat/sessions/{id}/messages — Send a message (with optional file attachments).
     * multipart/form-data with fields: "content" (text), "files" (optional MultipartFile[])
     */
    @PostMapping(value = "/sessions/{id}/messages", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> sendMessage(
            @PathVariable Long id,
            @RequestParam("content") String content,
            @RequestParam(value = "files", required = false) List<MultipartFile> files,
            Authentication auth) {

        String email = auth.getName();

        // Enforce AI request quota
        if (!subscriptionService.canPerformAction(email, "ai_request")) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Daily AI request limit reached. Upgrade your plan for more.");
            error.put("upgradeUrl", "/dashboard/get-plus");
            return ResponseEntity.status(429).body(error);
        }

        // Track AI usage
        subscriptionService.incrementUsage(email, "ai_request");

        // Track file attachments
        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                String contentType = file.getContentType();
                if (contentType != null && contentType.equals("application/pdf")) {
                    if (!subscriptionService.canPerformAction(email, "pdf_attach")) {
                        Map<String, Object> error = new HashMap<>();
                        error.put("error", "Daily PDF attachment limit reached. Upgrade your plan for more.");
                        error.put("upgradeUrl", "/dashboard/get-plus");
                        return ResponseEntity.status(429).body(error);
                    }
                    subscriptionService.incrementUsage(email, "pdf_attach");
                } else if (contentType != null && contentType.startsWith("image/")) {
                    if (!subscriptionService.canPerformAction(email, "image_attach")) {
                        Map<String, Object> error = new HashMap<>();
                        error.put("error", "Daily image attachment limit reached. Upgrade your plan for more.");
                        error.put("upgradeUrl", "/dashboard/get-plus");
                        return ResponseEntity.status(429).body(error);
                    }
                    subscriptionService.incrementUsage(email, "image_attach");
                }
            }
        }

        ChatMessage aiResponse = chatService.sendMessage(id, email, content, files);

        Map<String, Object> result = mapMessage(aiResponse);

        // Also return the (possibly updated) session title
        ChatSession session = chatService.getSessionById(id, email);
        result.put("sessionTitle", session.getTitle());

        return ResponseEntity.ok(result);
    }

    /**
     * POST /chat/sessions/{id}/messages/text — Send a plain text message (no files).
     * Body: { "content": "user message" }
     */
    @PostMapping("/sessions/{id}/messages/text")
    public ResponseEntity<Map<String, Object>> sendTextMessage(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            Authentication auth) {

        String email = auth.getName();
        String content = body.get("content");

        // Enforce AI request quota
        if (!subscriptionService.canPerformAction(email, "ai_request")) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Daily AI request limit reached. Upgrade your plan for more.");
            error.put("upgradeUrl", "/dashboard/get-plus");
            return ResponseEntity.status(429).body(error);
        }

        subscriptionService.incrementUsage(email, "ai_request");

        ChatMessage aiResponse = chatService.sendMessage(id, email, content, null);
        Map<String, Object> result = mapMessage(aiResponse);

        ChatSession session = chatService.getSessionById(id, email);
        result.put("sessionTitle", session.getTitle());

        return ResponseEntity.ok(result);
    }

    /**
     * POST /chat/sessions/{id}/messages/stream — Send a text message with SSE streaming response.
     * Body: { "content": "user message" }
     * Returns text/event-stream with token-by-token AI response.
     */
    @PostMapping(value = "/sessions/{id}/messages/stream", produces = org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE)
    public org.springframework.web.servlet.mvc.method.annotation.SseEmitter streamMessage(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            Authentication auth) {

        String email = auth.getName();
        String content = body.get("content");

        org.springframework.web.servlet.mvc.method.annotation.SseEmitter emitter =
                new org.springframework.web.servlet.mvc.method.annotation.SseEmitter(120_000L);

        // Check quota
        if (!subscriptionService.canPerformAction(email, "ai_request")) {
            try {
                emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event()
                        .name("error")
                        .data("{\"error\":\"Daily AI request limit reached. Upgrade your plan.\"}"));
                emitter.complete();
            } catch (Exception ignored) {}
            return emitter;
        }

        subscriptionService.incrementUsage(email, "ai_request");

        // Run streaming in a separate thread to not block the servlet thread
        java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newSingleThreadExecutor();
        executor.execute(() -> {
            try {
                ChatMessage finalMsg = chatService.sendMessageStreaming(id, email, content, token -> {
                    try {
                        emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event()
                                .name("token")
                                .data(token));
                    } catch (Exception e) {
                        emitter.completeWithError(e);
                    }
                });

                // Send final message with metadata
                Map<String, Object> finalData = new HashMap<>();
                finalData.put("id", finalMsg.getId());
                finalData.put("role", finalMsg.getRole().name());
                finalData.put("content", finalMsg.getContent());
                finalData.put("createdAt", finalMsg.getCreatedAt());

                ChatSession session = chatService.getSessionById(id, email);
                finalData.put("sessionTitle", session.getTitle());

                emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event()
                        .name("done")
                        .data(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(finalData)));
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            } finally {
                executor.shutdown();
            }
        });

        return emitter;
    }

    /**
     * POST /chat/sessions/{id}/regenerate — Regenerate the last AI response.
     */
    @PostMapping("/sessions/{id}/regenerate")
    public ResponseEntity<Map<String, Object>> regenerate(
            @PathVariable Long id,
            Authentication auth) {

        String email = auth.getName();
        ChatMessage newResponse = chatService.regenerateLastResponse(id, email);
        return ResponseEntity.ok(mapMessage(newResponse));
    }

    /**
     * PUT /chat/sessions/{id}/update-pdf — Update latest PDF content in session with manual edits.
     */
    @PutMapping("/sessions/{id}/update-pdf")
    public ResponseEntity<Map<String, Object>> updateSessionPdf(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            Authentication auth) {

        String email = auth.getName();
        String title = body.getOrDefault("title", "Document");
        String content = body.get("content");

        ChatMessage updatedMsg = chatService.updateLatestPdfContent(id, email, title, content);
        Map<String, Object> result = new HashMap<>();
        result.put("message", "PDF updated successfully");
        if (updatedMsg != null) {
            result.put("updatedMessage", mapMessage(updatedMsg));
        }
        return ResponseEntity.ok(result);
    }

    /**
     * POST /chat/generate-pdf — Generate a PDF from a given markdown string.
     * Body: { "content": "markdown", "title": "optional", "sessionId": 123 (optional) }
     */
    @PostMapping("/generate-pdf")
    public ResponseEntity<?> generatePdf(
            @RequestBody Map<String, Object> body,
            Authentication auth) {
        String email = auth.getName();
        
        if (!subscriptionService.canPerformAction(email, "pdf_generate")) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Daily PDF generation limit reached. Upgrade your plan for more.");
            error.put("upgradeUrl", "/dashboard/get-plus");
            return ResponseEntity.status(429).body(error);
        }

        String content = (String) body.get("content");
        String title = (String) body.get("title");
        Long sessionId = null;
        if (body.containsKey("sessionId") && body.get("sessionId") != null) {
            sessionId = Long.valueOf(body.get("sessionId").toString());
        }

        byte[] pdfBytes = pdfService.generatePdf(content, title, email, sessionId);
        
        subscriptionService.incrementUsage(email, "pdf_generate");

        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_PDF);
        String filename = (title != null && !title.isEmpty()) ? title.replaceAll("[^a-zA-Z0-9.-]", "_") + ".pdf" : "document.pdf";
        headers.setContentDispositionFormData("attachment", filename);

        return new ResponseEntity<>(pdfBytes, headers, org.springframework.http.HttpStatus.OK);
    }

    // ════════════════════════════════════════════════════════════════════════
    // SEARCH ENDPOINT
    // ════════════════════════════════════════════════════════════════════════

    /**
     * GET /chat/search?q={query} — Search across all chat messages.
     */
    @GetMapping("/search")
    public ResponseEntity<java.util.List<java.util.Map<String, Object>>> searchMessages(
            @RequestParam("q") String query,
            Authentication auth) {

        String email = auth.getName();
        java.util.List<java.util.Map<String, Object>> results = chatService.searchMessages(email, query);
        return ResponseEntity.ok(results);
    }

    // ════════════════════════════════════════════════════════════════════════
    // EXPORT ENDPOINT
    // ════════════════════════════════════════════════════════════════════════

    /**
     * POST /chat/export — Export a session as HTML or TXT.
     * Body: { "sessionId": 1, "format": "html" | "txt" }
     */
    @PostMapping("/export")
    public ResponseEntity<byte[]> exportSession(
            @RequestBody Map<String, Object> body,
            Authentication auth) {

        String email = auth.getName();
        Long sessionId = Long.valueOf(body.get("sessionId").toString());
        String format = body.getOrDefault("format", "txt").toString().toLowerCase();

        ChatSession session = chatService.getSessionById(sessionId, email);
        java.util.List<ChatMessage> messages = chatService.getSessionMessages(sessionId);

        StringBuilder sb = new StringBuilder();

        if ("html".equals(format)) {
            sb.append("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>")
              .append(session.getTitle())
              .append("</title><style>body{font-family:'Inter',sans-serif;max-width:800px;margin:40px auto;padding:20px;background:#fff;color:#1a1a1a;line-height:1.7}")
              .append(".msg{margin:16px 0;padding:16px;border-radius:12px}.user{background:#f4f4f4;border-left:4px solid #0a0a0a}")
              .append(".assistant{background:#fafafa;border-left:4px solid #5533ff}.role{font-weight:700;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:0.05em}")
              .append("pre{background:#0a0a0a;color:#fff;padding:16px;border-radius:8px;overflow-x:auto}code{font-size:14px}")
              .append("h1,h2,h3{margin-top:1.5em}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px;text-align:left}")
              .append("</style></head><body>");
            sb.append("<h1>").append(session.getTitle()).append("</h1>");

            for (ChatMessage msg : messages) {
                String roleClass = msg.getRole() == ChatMessage.Role.USER ? "user" : "assistant";
                String roleLabel = msg.getRole() == ChatMessage.Role.USER ? "You" : "Lumina";
                sb.append("<div class='msg ").append(roleClass).append("'>")
                  .append("<div class='role'>").append(roleLabel).append("</div>")
                  .append("<div>").append(msg.getContent().replace("\n", "<br/>")).append("</div>")
                  .append("</div>");
            }
            sb.append("</body></html>");

            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.TEXT_HTML);
            String filename = session.getTitle().replaceAll("[^a-zA-Z0-9.-]", "_") + ".html";
            headers.setContentDispositionFormData("attachment", filename);
            return new ResponseEntity<>(sb.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8), headers, org.springframework.http.HttpStatus.OK);

        } else {
            // Plain text export
            sb.append("=== ").append(session.getTitle()).append(" ===\n\n");
            for (ChatMessage msg : messages) {
                String roleLabel = msg.getRole() == ChatMessage.Role.USER ? "You" : "Lumina";
                sb.append("[").append(roleLabel).append("]\n");
                sb.append(msg.getContent()).append("\n\n");
            }

            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.TEXT_PLAIN);
            String filename = session.getTitle().replaceAll("[^a-zA-Z0-9.-]", "_") + ".txt";
            headers.setContentDispositionFormData("attachment", filename);
            return new ResponseEntity<>(sb.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8), headers, org.springframework.http.HttpStatus.OK);
        }
    }

    // ════════════════════════════════════════════════════════════════════════
    // RESPONSE MAPPERS
    // ════════════════════════════════════════════════════════════════════════

    private Map<String, Object> mapSession(ChatSession session) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", session.getId());
        map.put("title", session.getTitle());
        map.put("pinned", session.isPinned());
        map.put("createdAt", session.getCreatedAt());
        map.put("updatedAt", session.getUpdatedAt());
        return map;
    }

    private Map<String, Object> mapMessage(ChatMessage message) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", message.getId());
        map.put("role", message.getRole().name());
        map.put("content", message.getContent());
        map.put("attachmentNames", message.getAttachmentNames());
        map.put("createdAt", message.getCreatedAt());
        return map;
    }
}
