package com.jeevan.smart_notes_api.dto;

import java.time.LocalDateTime;

public class ImageDto {
    private Long id;
    private String prompt;
    private String imageUrl;
    private LocalDateTime createdAt;

    public ImageDto() {}

    public ImageDto(Long id, String prompt, String imageUrl, LocalDateTime createdAt) {
        this.id = id;
        this.prompt = prompt;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
