package com.jeevan.smart_notes_api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions", indexes = {
    @Index(name = "idx_subscription_user", columnList = "user_id", unique = true)
})
public class Subscription {

    public enum Plan {
        FREE, PLUS, PRO
    }

    public enum BillingCycle {
        MONTHLY, YEARLY
    }

    public enum SubscriptionStatus {
        CREATED, ACTIVE, CANCELLATION_SCHEDULED, CANCELLED, HALTED, PENDING, COMPLETED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Plan plan = Plan.FREE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private BillingCycle billingCycle = BillingCycle.MONTHLY;

    @Column(nullable = false)
    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Column(name = "current_period_start")
    private LocalDateTime currentPeriodStart;

    @Column(name = "current_period_end")
    private LocalDateTime currentPeriodEnd;

    @Column(name = "razorpay_subscription_id", unique = true)
    private String razorpaySubscriptionId;

    @Column(name = "razorpay_plan_id")
    private String razorpayPlanId;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private SubscriptionStatus status = SubscriptionStatus.ACTIVE;

    @Column(name = "cancel_at_cycle_end")
    private boolean cancelAtCycleEnd = false;

    @Column(nullable = false)
    private boolean active = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public Subscription() {
    }

    public Subscription(User user, Plan plan, BillingCycle billingCycle) {
        this.user = user;
        this.plan = plan;
        this.billingCycle = billingCycle;
        this.startDate = LocalDateTime.now();
        this.active = true;

        if (plan != Plan.FREE) {
            if (billingCycle == BillingCycle.MONTHLY) {
                this.endDate = this.startDate.plusMonths(1);
            } else {
                this.endDate = this.startDate.plusYears(1);
            }
        }
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.startDate == null) {
            this.startDate = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // ── Plan Limit Constants ────────────────────────────────────────────
    // All limits reset daily at midnight (handled by UsageResetScheduler)

    public int getDailyPdfGenerationLimit() {
        return switch (plan) {
            case FREE -> 5;
            case PLUS -> 25;
            case PRO -> 100;
        };
    }

    public int getDailyImageGenerationLimit() {
        return switch (plan) {
            case FREE -> 10;
            case PLUS -> 50;
            case PRO -> 100;
        };
    }

    public int getDailyPdfAttachmentLimit() {
        return switch (plan) {
            case FREE -> 10;
            case PLUS -> Integer.MAX_VALUE;
            case PRO -> Integer.MAX_VALUE;
        };
    }

    public int getDailyImageAttachmentLimit() {
        return switch (plan) {
            case FREE -> 15;
            case PLUS -> Integer.MAX_VALUE;
            case PRO -> Integer.MAX_VALUE;
        };
    }

    public int getDailyAiRequestLimit() {
        return switch (plan) {
            case FREE -> 50;
            case PLUS -> 500;
            case PRO -> Integer.MAX_VALUE;
        };
    }

    public int getDailyChatSessionLimit() {
        return switch (plan) {
            case FREE -> 10;
            case PLUS -> 100;
            case PRO -> Integer.MAX_VALUE;
        };
    }

    public int getMaxWorkspaces() {
        return switch (plan) {
            case FREE -> 0;
            case PLUS -> 3;
            case PRO -> Integer.MAX_VALUE;
        };
    }

    public int getMaxWorkspaceMembers() {
        return switch (plan) {
            case FREE -> 0;
            case PLUS -> 5;
            case PRO -> Integer.MAX_VALUE;
        };
    }

    public int getMonthlyPriceInr() {
        return switch (plan) {
            case FREE -> 0;
            case PLUS -> billingCycle == BillingCycle.YEARLY ? 80 : 100;
            case PRO -> billingCycle == BillingCycle.YEARLY ? 399 : 499;
        };
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

    public Plan getPlan() {
        return plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public BillingCycle getBillingCycle() {
        return billingCycle;
    }

    public void setBillingCycle(BillingCycle billingCycle) {
        this.billingCycle = billingCycle;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCurrentPeriodStart() {
        return currentPeriodStart;
    }

    public void setCurrentPeriodStart(LocalDateTime currentPeriodStart) {
        this.currentPeriodStart = currentPeriodStart;
    }

    public LocalDateTime getCurrentPeriodEnd() {
        return currentPeriodEnd;
    }

    public void setCurrentPeriodEnd(LocalDateTime currentPeriodEnd) {
        this.currentPeriodEnd = currentPeriodEnd;
    }

    public String getRazorpaySubscriptionId() {
        return razorpaySubscriptionId;
    }

    public void setRazorpaySubscriptionId(String razorpaySubscriptionId) {
        this.razorpaySubscriptionId = razorpaySubscriptionId;
    }

    public String getRazorpayPlanId() {
        return razorpayPlanId;
    }

    public void setRazorpayPlanId(String razorpayPlanId) {
        this.razorpayPlanId = razorpayPlanId;
    }

    public SubscriptionStatus getStatus() {
        return status;
    }

    public void setStatus(SubscriptionStatus status) {
        this.status = status;
    }

    public boolean isCancelAtCycleEnd() {
        return cancelAtCycleEnd;
    }

    public void setCancelAtCycleEnd(boolean cancelAtCycleEnd) {
        this.cancelAtCycleEnd = cancelAtCycleEnd;
    }
}
