package com.jeevan.smart_notes_api.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "generated_images")
public class GeneratedImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String prompt;

    @Column(nullable = false, length = 2000)
    private String imageUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public GeneratedImage() {}

    public GeneratedImage(String prompt, String imageUrl, User user) {
        this.prompt = prompt;
        this.imageUrl = imageUrl;
        this.user = user;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
