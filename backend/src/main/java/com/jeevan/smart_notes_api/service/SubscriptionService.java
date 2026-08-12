package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.entity.Subscription;
import com.jeevan.smart_notes_api.entity.UsageTracker;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.exception.ResourceNotFoundException;
import com.jeevan.smart_notes_api.repository.SubscriptionRepository;
import com.jeevan.smart_notes_api.repository.UsageTrackerRepository;
import com.jeevan.smart_notes_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Autowired
    private RazorpayService razorpayService;

    @Value("${RAZORPAY_PLAN_PLUS_MONTHLY:}")
    private String planPlusMonthly;

    @Value("${RAZORPAY_PLAN_PLUS_YEARLY:}")
    private String planPlusYearly;

    @Value("${RAZORPAY_PLAN_PRO_MONTHLY:}")
    private String planProMonthly;

    @Value("${RAZORPAY_PLAN_PRO_YEARLY:}")
    private String planProYearly;

    // ════════════════════════════════════════════════════════════════════════
    // SUBSCRIPTION MANAGEMENT
    // ════════════════════════════════════════════════════════════════════════

    public String getRazorpayPlanId(String planName, String cycleName) {
        String key = planName.toUpperCase() + "_" + cycleName.toUpperCase();
        return switch (key) {
            case "PLUS_MONTHLY" -> planPlusMonthly;
            case "PLUS_YEARLY" -> planPlusYearly;
            case "PRO_MONTHLY" -> planProMonthly;
            case "PRO_YEARLY" -> planProYearly;
            default -> throw new IllegalArgumentException("Invalid plan or billing cycle combination: " + key);
        };
    }

    public Subscription.Plan getInternalPlanFromRazorpayPlanId(String razorpayPlanId) {
        if (razorpayPlanId.equals(planPlusMonthly) || razorpayPlanId.equals(planPlusYearly)) {
            return Subscription.Plan.PLUS;
        } else if (razorpayPlanId.equals(planProMonthly) || razorpayPlanId.equals(planProYearly)) {
            return Subscription.Plan.PRO;
        }
        return Subscription.Plan.FREE;
    }

    public Subscription.BillingCycle getInternalCycleFromRazorpayPlanId(String razorpayPlanId) {
        if (razorpayPlanId.equals(planPlusMonthly) || razorpayPlanId.equals(planProMonthly)) {
            return Subscription.BillingCycle.MONTHLY;
        } else if (razorpayPlanId.equals(planPlusYearly) || razorpayPlanId.equals(planProYearly)) {
            return Subscription.BillingCycle.YEARLY;
        }
        return Subscription.BillingCycle.MONTHLY;
    }

    /**
     * Get the current active subscription for a user.
     * Evaluates expiration and status strictly according to the architecture specification.
     */
    public Subscription getSubscription(String email) {
        Subscription sub = subscriptionRepository.findByUserEmail(email)
                .orElseGet(() -> createDefaultSubscription(email));
        
        // Entitlement Check Rule: 
        // If it's cancelled/halted/completed and past the period end date, it's effectively FREE.
        if (sub.getPlan() != Subscription.Plan.FREE) {
            boolean isExpired = sub.getCurrentPeriodEnd() != null && LocalDateTime.now().isAfter(sub.getCurrentPeriodEnd());
            boolean isCancelledOrHalted = sub.getStatus() == Subscription.SubscriptionStatus.CANCELLED ||
                                          sub.getStatus() == Subscription.SubscriptionStatus.HALTED ||
                                          sub.getStatus() == Subscription.SubscriptionStatus.COMPLETED;
            
            // If they scheduled cancellation, they keep access UNTIL currentPeriodEnd
            if (isCancelledOrHalted || (sub.getStatus() == Subscription.SubscriptionStatus.CANCELLATION_SCHEDULED && isExpired)) {
                // Return a temporary FREE subscription representation for authorization purposes,
                // without deleting their history from the database.
                User user = findUserByEmail(email);
                return new Subscription(user, Subscription.Plan.FREE, Subscription.BillingCycle.MONTHLY);
            }
        }

        return sub;
    }

    public Map<String, Object> getSubscriptionDetails(String email) {
        Subscription effectiveSub = getSubscription(email); // Evaluated for expiry
        Subscription dbSub = subscriptionRepository.findByUserEmail(email).orElse(effectiveSub);

        UsageTracker usage = getOrCreateTodayUsage(email);

        Map<String, Object> details = new HashMap<>();
        details.put("plan", effectiveSub.getPlan().name());
        details.put("billingCycle", effectiveSub.getBillingCycle().name());
        details.put("active", effectiveSub.getPlan() != Subscription.Plan.FREE);
        details.put("status", dbSub.getStatus().name());
        details.put("cancelAtCycleEnd", dbSub.isCancelAtCycleEnd());
        details.put("currentPeriodStart", dbSub.getCurrentPeriodStart());
        details.put("currentPeriodEnd", dbSub.getCurrentPeriodEnd());

        // Limits
        Map<String, Object> limits = new HashMap<>();
        limits.put("pdfGeneration", effectiveSub.getDailyPdfGenerationLimit());
        limits.put("imageGeneration", effectiveSub.getDailyImageGenerationLimit());
        limits.put("pdfAttachment", effectiveSub.getDailyPdfAttachmentLimit());
        limits.put("imageAttachment", effectiveSub.getDailyImageAttachmentLimit());
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
        remaining.put("pdfGeneration", Math.max(0, effectiveSub.getDailyPdfGenerationLimit() - usage.getPdfsGenerated()));
        remaining.put("imageGeneration", Math.max(0, effectiveSub.getDailyImageGenerationLimit() - usage.getImagesGenerated()));
        remaining.put("pdfAttachment", effectiveSub.getDailyPdfAttachmentLimit() == Integer.MAX_VALUE
                ? "unlimited"
                : Math.max(0, effectiveSub.getDailyPdfAttachmentLimit() - usage.getPdfsAttached()));
        remaining.put("imageAttachment", effectiveSub.getDailyImageAttachmentLimit() == Integer.MAX_VALUE
                ? "unlimited"
                : Math.max(0, effectiveSub.getDailyImageAttachmentLimit() - usage.getImagesAttached()));
        details.put("remaining", remaining);

        return details;
    }

    public java.util.Map<String, Object> runDiagnostics(String planName, String cycleName) {
        String razorpayPlanId = getRazorpayPlanId(planName, cycleName);
        return razorpayService.runDiagnostics(razorpayPlanId);
    }

    /**
     * Initializes a checkout by creating a Razorpay Subscription and storing it locally in CREATED state.
     */
    @Transactional
    public String createCheckoutSession(String email, String planName, String cycleName) {
        User user = findUserByEmail(email);
        String razorpayPlanId = getRazorpayPlanId(planName, cycleName);
        
        String razorpayCustomerId = razorpayService.getOrCreateCustomer(user);
        
        // Update user's razorpay customer ID if not set
        if (user.getRazorpayCustomerId() == null) {
            user.setRazorpayCustomerId(razorpayCustomerId);
            userRepository.save(user);
        }

        // Check if user already has an ACTIVE subscription.
        // If they do, they should be routed to an upgrade/downgrade flow instead (Not implemented in this basic checkout)
        Subscription existingSub = subscriptionRepository.findByUserEmail(email).orElse(null);
        if (existingSub != null && existingSub.getStatus() == Subscription.SubscriptionStatus.ACTIVE && existingSub.getPlan() != Subscription.Plan.FREE) {
            throw new IllegalStateException("You already have an active subscription. Please cancel it before starting a new one.");
        }

        com.razorpay.Subscription rzpSub = null;
        try {
            rzpSub = razorpayService.createSubscription(razorpayCustomerId, razorpayPlanId);
        } catch (Exception e) {
            // If the subscription fails, it's highly likely the user regenerated their Razorpay API keys
            // for a new account, meaning the cached customer ID in Postgres is invalid for the new keys.
            // Self-heal by clearing the invalid ID, creating a new one, and retrying.
            user.setRazorpayCustomerId(null);
            razorpayCustomerId = razorpayService.getOrCreateCustomer(user);
            user.setRazorpayCustomerId(razorpayCustomerId);
            userRepository.save(user);
            
            rzpSub = razorpayService.createSubscription(razorpayCustomerId, razorpayPlanId);
        }
        
        Subscription.Plan internalPlan = Subscription.Plan.valueOf(planName.toUpperCase());
        Subscription.BillingCycle internalCycle = Subscription.BillingCycle.valueOf(cycleName.toUpperCase());

        Subscription sub = existingSub;
        if (sub == null) {
            sub = new Subscription(user, internalPlan, internalCycle);
        } else {
            sub.setPlan(internalPlan);
            sub.setBillingCycle(internalCycle);
        }
        
        sub.setRazorpaySubscriptionId(rzpSub.get("id"));
        sub.setRazorpayPlanId(razorpayPlanId);
        sub.setStatus(Subscription.SubscriptionStatus.CREATED);
        sub.setStartDate(LocalDateTime.now());
        sub.setCancelAtCycleEnd(false);

        subscriptionRepository.save(sub);
        
        return rzpSub.get("id");
    }

    /**
     * Cancels subscription securely.
     */
    @Transactional
    public void cancelSubscription(String email) {
        Subscription sub = subscriptionRepository.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("No subscription found"));

        if (sub.getPlan() == Subscription.Plan.FREE || sub.getRazorpaySubscriptionId() == null) {
            throw new IllegalStateException("You do not have an active paid subscription to cancel.");
        }
        
        if (sub.isCancelAtCycleEnd() || sub.getStatus() == Subscription.SubscriptionStatus.CANCELLATION_SCHEDULED) {
            throw new IllegalStateException("Your subscription is already scheduled for cancellation.");
        }

        // Tell Razorpay to cancel at cycle end
        razorpayService.cancelSubscriptionAtCycleEnd(sub.getRazorpaySubscriptionId());
        
        // Update Local State
        sub.setStatus(Subscription.SubscriptionStatus.CANCELLATION_SCHEDULED);
        sub.setCancelAtCycleEnd(true);
        subscriptionRepository.save(sub);
    }

    // ════════════════════════════════════════════════════════════════════════
    // USAGE TRACKING & RATE LIMITING
    // ════════════════════════════════════════════════════════════════════════

    public boolean canPerformAction(String email, String action) {
        Subscription sub = getSubscription(email); // Uses strictly evaluated effective subscription
        UsageTracker usage = getOrCreateTodayUsage(email);

        return switch (action.toLowerCase()) {
            case "pdf_generate" -> usage.getPdfsGenerated() < sub.getDailyPdfGenerationLimit();
            case "image_generate" -> usage.getImagesGenerated() < sub.getDailyImageGenerationLimit();
            case "pdf_attach" -> usage.getPdfsAttached() < sub.getDailyPdfAttachmentLimit();
            case "image_attach" -> usage.getImagesAttached() < sub.getDailyImageAttachmentLimit();
            case "ai_request" -> usage.getAiRequests() < sub.getDailyAiRequestLimit();
            default -> true;
        };
    }

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

    @Transactional
    public void incrementUsageBulk(String email, String action, int count) {
        UsageTracker usage = getOrCreateTodayUsage(email);

        switch (action.toLowerCase()) {
            case "pdf_attach" -> usage.setPdfsAttached(usage.getPdfsAttached() + count);
            case "image_attach" -> usage.setImagesAttached(usage.getImagesAttached() + count);
        }

        usageTrackerRepository.save(usage);
    }

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

    private UsageTracker getOrCreateTodayUsage(String email) {
        LocalDate today = LocalDate.now();
        return usageTrackerRepository.findByUserEmailAndUsageDate(email, today)
                .orElseGet(() -> {
                    User user = findUserByEmail(email);
                    UsageTracker tracker = new UsageTracker(user, today);
                    try {
                        return usageTrackerRepository.save(tracker);
                    } catch (org.springframework.dao.DataIntegrityViolationException e) {
                        return usageTrackerRepository.findByUserEmailAndUsageDate(email, today).get();
                    }
                });
    }

    private Subscription createDefaultSubscription(String email) {
        User user = findUserByEmail(email);
        Subscription sub = new Subscription(user, Subscription.Plan.FREE, Subscription.BillingCycle.MONTHLY);
        try {
            return subscriptionRepository.save(sub);
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            return subscriptionRepository.findByUserEmail(email).get();
        }
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
