package com.jeevan.smart_notes_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class WorkspaceDocumentRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must be less than 200 characters")
    private String title;

    private String content;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
