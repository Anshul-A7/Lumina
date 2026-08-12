package com.jeevan.smart_notes_api.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CollaborationController {

    /**
     * DTO for collaborative editing messages.
     */
    public static class DocumentEditMessage {
        private String content;
        private Long documentId;
        private Long userId;
        private String userName;

        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public Long getDocumentId() { return documentId; }
        public void setDocumentId(Long documentId) { this.documentId = documentId; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }
    }

    /**
     * Client sends to `/app/document.edit/{workspaceId}`
     * Message goes to all subscribers of `/topic/workspace/{workspaceId}`
     */
    @MessageMapping("/document.edit/{workspaceId}")
    @SendTo("/topic/workspace/{workspaceId}")
    public DocumentEditMessage handleDocumentEdit(
            @DestinationVariable String workspaceId,
            @Payload DocumentEditMessage message) {
        // In a fully production app, we would validate user's permissions and session here
        // and optionally save a delta to the database or rely on an auto-save endpoint.
        return message;
    }

    /**
     * DTO for cursor position broadcast.
     */
    public static class CursorPositionMessage {
        private Long documentId;
        private Long userId;
        private String userName;
        private int position;

        public Long getDocumentId() { return documentId; }
        public void setDocumentId(Long documentId) { this.documentId = documentId; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }
        public int getPosition() { return position; }
        public void setPosition(int position) { this.position = position; }
    }

    /**
     * Broadcast user's cursor position
     */
    @MessageMapping("/document.cursor/{workspaceId}")
    @SendTo("/topic/workspace/{workspaceId}/cursor")
    public CursorPositionMessage handleCursorMove(
            @DestinationVariable String workspaceId,
            @Payload CursorPositionMessage message) {
        return message;
    }
}
