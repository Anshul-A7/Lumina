package com.jeevan.smart_notes_api.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_settings")
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false)
    private String theme = "system"; // "system", "light", "dark"

    @Column(nullable = false)
    private String defaultModel = "gpt-4o";

    @Column(nullable = false)
    private boolean autoTitle = true;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public UserSettings() {}

    public UserSettings(Long userId) {
        this.userId = userId;
        this.theme = "system";
        this.defaultModel = "gpt-4o";
        this.autoTitle = true;
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    @PreUpdate
    protected void onSave() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }

    public String getDefaultModel() { return defaultModel; }
    public void setDefaultModel(String defaultModel) { this.defaultModel = defaultModel; }

    public boolean isAutoTitle() { return autoTitle; }
    public void setAutoTitle(boolean autoTitle) { this.autoTitle = autoTitle; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
