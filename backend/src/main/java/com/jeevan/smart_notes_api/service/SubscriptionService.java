package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.entity.Subscription;
import com.jeevan.smart_notes_api.entity.UsageTracker;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.exception.ResourceNotFoundException;
import com.jeevan.smart_notes_api.repository.SubscriptionRepository;
import com.jeevan.smart_notes_api.repository.UsageTrackerRepository;
import com.jeevan.smart_notes_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UsageTrackerRepository usageTrackerRepository;

    @Autowired
    private UserRepository userRepository;

    // ════════════════════════════════════════════════════════════════════════
    // SUBSCRIPTION MANAGEMENT
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Get the current subscription for a user.
     * If no subscription exists, creates a default FREE subscription.
     */
    public Subscription getSubscription(String email) {
        return subscriptionRepository.findByUserEmail(email)
                .orElseGet(() -> createDefaultSubscription(email));
    }

    /**
     * Get subscription details as a structured map for API response.
     */
    public Map<String, Object> getSubscriptionDetails(String email) {
        Subscription sub = getSubscription(email);
        UsageTracker usage = getOrCreateTodayUsage(email);

        Map<String, Object> details = new HashMap<>();
        details.put("plan", sub.getPlan().name());
        details.put("billingCycle", sub.getBillingCycle().name());
        details.put("active", sub.isActive());
        details.put("startDate", sub.getStartDate());
        details.put("endDate", sub.getEndDate());
        details.put("monthlyPriceInr", sub.getMonthlyPriceInr());

        // Limits
        Map<String, Object> limits = new HashMap<>();
        limits.put("pdfGeneration", sub.getDailyPdfGenerationLimit());
        limits.put("imageGeneration", sub.getDailyImageGenerationLimit());
        limits.put("pdfAttachment", sub.getDailyPdfAttachmentLimit());
        limits.put("imageAttachment", sub.getDailyImageAttachmentLimit());
        details.put("limits", limits);

        // Today's usage
        Map<String, Object> todayUsage = new HashMap<>();
        todayUsage.put("pdfsGenerated", usage.getPdfsGenerated());
        todayUsage.put("imagesGenerated", usage.getImagesGenerated());
        todayUsage.put("pdfsAttached", usage.getPdfsAttached());
        todayUsage.put("imagesAttached", usage.getImagesAttached());
        todayUsage.put("aiRequests", usage.getAiRequests());
        details.put("usage", todayUsage);

        // Remaining
        Map<String, Object> remaining = new HashMap<>();
        remaining.put("pdfGeneration", Math.max(0, sub.getDailyPdfGenerationLimit() - usage.getPdfsGenerated()));
        remaining.put("imageGeneration", Math.max(0, sub.getDailyImageGenerationLimit() - usage.getImagesGenerated()));
        remaining.put("pdfAttachment", sub.getDailyPdfAttachmentLimit() == Integer.MAX_VALUE
                ? "unlimited"
                : Math.max(0, sub.getDailyPdfAttachmentLimit() - usage.getPdfsAttached()));
        remaining.put("imageAttachment", sub.getDailyImageAttachmentLimit() == Integer.MAX_VALUE
                ? "unlimited"
                : Math.max(0, sub.getDailyImageAttachmentLimit() - usage.getImagesAttached()));
        details.put("remaining", remaining);

        return details;
    }

    /**
     * Purchase/upgrade a subscription plan.
     * For now, this directly changes the plan without real payment integration.
     * Payment gateway (Razorpay) will be added in a future phase.
     */
    @Transactional
    public Subscription purchasePlan(String email, String planName, String cycleName) {
        User user = findUserByEmail(email);
        Subscription.Plan plan = Subscription.Plan.valueOf(planName.toUpperCase());
        Subscription.BillingCycle cycle = Subscription.BillingCycle.valueOf(cycleName.toUpperCase());

        Subscription sub = subscriptionRepository.findByUserEmail(email)
                .orElse(null);

        if (sub == null) {
            sub = new Subscription(user, plan, cycle);
        } else {
            sub.setPlan(plan);
            sub.setBillingCycle(cycle);
            sub.setStartDate(LocalDateTime.now());
            sub.setActive(true);

            if (plan != Subscription.Plan.FREE) {
                if (cycle == Subscription.BillingCycle.MONTHLY) {
                    sub.setEndDate(LocalDateTime.now().plusMonths(1));
                } else {
                    sub.setEndDate(LocalDateTime.now().plusYears(1));
                }
            } else {
                sub.setEndDate(null);
            }
        }

        // Sync plan to User entity for quick lookups
        user.setSubscriptionPlan(User.SubscriptionPlan.valueOf(plan.name()));
        userRepository.save(user);

        return subscriptionRepository.save(sub);
    }

    /**
     * Cancel subscription — downgrades to FREE plan.
     */
    @Transactional
    public Subscription cancelSubscription(String email) {
        return purchasePlan(email, "FREE", "MONTHLY");
    }

    // ════════════════════════════════════════════════════════════════════════
    // USAGE TRACKING & RATE LIMITING
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Check if the user can perform a specific action based on their plan limits.
     * Returns true if within limits, false if quota exceeded.
     */
    public boolean canPerformAction(String email, String action) {
        Subscription sub = getSubscription(email);
        UsageTracker usage = getOrCreateTodayUsage(email);

        return switch (action.toLowerCase()) {
            case "pdf_generate" -> usage.getPdfsGenerated() < sub.getDailyPdfGenerationLimit();
            case "image_generate" -> usage.getImagesGenerated() < sub.getDailyImageGenerationLimit();
            case "pdf_attach" -> usage.getPdfsAttached() < sub.getDailyPdfAttachmentLimit();
            case "image_attach" -> usage.getImagesAttached() < sub.getDailyImageAttachmentLimit();
            default -> true;
        };
    }

    /**
     * Get remaining quota for a specific action.
     */
    public int getRemainingQuota(String email, String action) {
        Subscription sub = getSubscription(email);
        UsageTracker usage = getOrCreateTodayUsage(email);

        return switch (action.toLowerCase()) {
            case "pdf_generate" -> Math.max(0, sub.getDailyPdfGenerationLimit() - usage.getPdfsGenerated());
            case "image_generate" -> Math.max(0, sub.getDailyImageGenerationLimit() - usage.getImagesGenerated());
            case "pdf_attach" -> sub.getDailyPdfAttachmentLimit() == Integer.MAX_VALUE
                    ? Integer.MAX_VALUE
                    : Math.max(0, sub.getDailyPdfAttachmentLimit() - usage.getPdfsAttached());
            case "image_attach" -> sub.getDailyImageAttachmentLimit() == Integer.MAX_VALUE
                    ? Integer.MAX_VALUE
                    : Math.max(0, sub.getDailyImageAttachmentLimit() - usage.getImagesAttached());
            default -> Integer.MAX_VALUE;
        };
    }

    /**
     * Increment usage counter for a specific action.
     * Call this AFTER successfully performing the action.
     */
    @Transactional
    public void incrementUsage(String email, String action) {
        UsageTracker usage = getOrCreateTodayUsage(email);

        switch (action.toLowerCase()) {
            case "pdf_generate" -> usage.setPdfsGenerated(usage.getPdfsGenerated() + 1);
            case "image_generate" -> usage.setImagesGenerated(usage.getImagesGenerated() + 1);
            case "pdf_attach" -> usage.setPdfsAttached(usage.getPdfsAttached() + 1);
            case "image_attach" -> usage.setImagesAttached(usage.getImagesAttached() + 1);
            case "ai_request" -> usage.setAiRequests(usage.getAiRequests() + 1);
        }

        usageTrackerRepository.save(usage);
    }

    /**
     * Increment usage for multiple attachments at once (e.g., 3 PDFs uploaded).
     */
    @Transactional
    public void incrementUsageBulk(String email, String action, int count) {
        UsageTracker usage = getOrCreateTodayUsage(email);

        switch (action.toLowerCase()) {
            case "pdf_attach" -> usage.setPdfsAttached(usage.getPdfsAttached() + count);
            case "image_attach" -> usage.setImagesAttached(usage.getImagesAttached() + count);
        }

        usageTrackerRepository.save(usage);
    }

    /**
     * Get today's usage statistics for the API response.
     */
    public Map<String, Object> getUsageStats(String email) {
        Subscription sub = getSubscription(email);
        UsageTracker usage = getOrCreateTodayUsage(email);

        Map<String, Object> stats = new HashMap<>();
        stats.put("plan", sub.getPlan().name());
        stats.put("date", usage.getUsageDate().toString());

        stats.put("pdfsGenerated", usage.getPdfsGenerated());
        stats.put("pdfsGeneratedLimit", sub.getDailyPdfGenerationLimit());
        stats.put("pdfsGeneratedRemaining", Math.max(0, sub.getDailyPdfGenerationLimit() - usage.getPdfsGenerated()));

        stats.put("imagesGenerated", usage.getImagesGenerated());
        stats.put("imagesGeneratedLimit", sub.getDailyImageGenerationLimit());
        stats.put("imagesGeneratedRemaining", Math.max(0, sub.getDailyImageGenerationLimit() - usage.getImagesGenerated()));

        stats.put("pdfsAttached", usage.getPdfsAttached());
        stats.put("pdfsAttachedLimit", sub.getDailyPdfAttachmentLimit() == Integer.MAX_VALUE ? "unlimited" : sub.getDailyPdfAttachmentLimit());

        stats.put("imagesAttached", usage.getImagesAttached());
        stats.put("imagesAttachedLimit", sub.getDailyImageAttachmentLimit() == Integer.MAX_VALUE ? "unlimited" : sub.getDailyImageAttachmentLimit());

        stats.put("aiRequests", usage.getAiRequests());

        return stats;
    }

    // ════════════════════════════════════════════════════════════════════════
    // INTERNAL HELPERS
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Get or create today's usage record for the user.
     */
    private UsageTracker getOrCreateTodayUsage(String email) {
        LocalDate today = LocalDate.now();
        return usageTrackerRepository.findByUserEmailAndUsageDate(email, today)
                .orElseGet(() -> {
                    User user = findUserByEmail(email);
                    UsageTracker tracker = new UsageTracker(user, today);
                    return usageTrackerRepository.save(tracker);
                });
    }

    /**
     * Create a default FREE subscription for a new user.
     */
    private Subscription createDefaultSubscription(String email) {
        User user = findUserByEmail(email);
        Subscription sub = new Subscription(user, Subscription.Plan.FREE, Subscription.BillingCycle.MONTHLY);
        return subscriptionRepository.save(sub);
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
