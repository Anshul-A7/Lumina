package com.jeevan.smart_notes_api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "usage_tracker", indexes = {
    @Index(name = "idx_usage_user_date", columnList = "user_id, usageDate", unique = true)
})
public class UsageTracker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate usageDate;

    @Column(nullable = false)
    private int pdfsGenerated = 0;

    @Column(nullable = false)
    private int imagesGenerated = 0;

    @Column(nullable = false)
    private int pdfsAttached = 0;

    @Column(nullable = false)
    private int imagesAttached = 0;

    @Column(nullable = false)
    private int aiRequests = 0;

    public UsageTracker() {
    }

    public UsageTracker(User user, LocalDate usageDate) {
        this.user = user;
        this.usageDate = usageDate;
    }

    // ── Getters & Setters ───────────────────────────────────────────────

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getUsageDate() {
        return usageDate;
    }

    public void setUsageDate(LocalDate usageDate) {
        this.usageDate = usageDate;
    }

    public int getPdfsGenerated() {
        return pdfsGenerated;
    }

    public void setPdfsGenerated(int pdfsGenerated) {
        this.pdfsGenerated = pdfsGenerated;
    }

    public int getImagesGenerated() {
        return imagesGenerated;
    }

    public void setImagesGenerated(int imagesGenerated) {
        this.imagesGenerated = imagesGenerated;
    }

    public int getPdfsAttached() {
        return pdfsAttached;
    }

    public void setPdfsAttached(int pdfsAttached) {
        this.pdfsAttached = pdfsAttached;
    }

    public int getImagesAttached() {
        return imagesAttached;
    }

    public void setImagesAttached(int imagesAttached) {
        this.imagesAttached = imagesAttached;
    }

    public int getAiRequests() {
        return aiRequests;
    }

    public void setAiRequests(int aiRequests) {
        this.aiRequests = aiRequests;
    }
}
