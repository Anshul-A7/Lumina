package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.entity.Subscription;
import com.jeevan.smart_notes_api.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/subscription")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    /**
     * GET /subscription — Get current subscription details with usage and limits.
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getSubscription(Authentication auth) {
        String email = auth.getName();
        Map<String, Object> details = subscriptionService.getSubscriptionDetails(email);
        return ResponseEntity.ok(details);
    }

    /**
     * POST /subscription/checkout — Initialize Razorpay Checkout Session
     * Body: { "plan": "PLUS", "billingCycle": "MONTHLY" }
     */
    @PostMapping("/checkout")
    public ResponseEntity<Map<String, Object>> createCheckoutSession(
            @RequestBody Map<String, String> body,
            Authentication auth) {

        String email = auth.getName();
        String plan = body.get("plan");
        String cycle = body.getOrDefault("billingCycle", "MONTHLY");

        if (plan == null || plan.isBlank()) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Plan is required. Valid values: FREE, PLUS, PRO");
            return ResponseEntity.badRequest().body(error);
        }

        try {
            String subscriptionId = subscriptionService.createCheckoutSession(email, plan, cycle);

            Map<String, Object> result = new HashMap<>();
            result.put("message", "Checkout session initialized");
            result.put("subscription_id", subscriptionId);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException | IllegalStateException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * POST /subscription/cancel — Cancel subscription (downgrade to FREE).
     */
    @PostMapping("/cancel")
    public ResponseEntity<Map<String, String>> cancelSubscription(Authentication auth) {
        String email = auth.getName();
        try {
            subscriptionService.cancelSubscription(email);
            Map<String, String> result = new HashMap<>();
            result.put("message", "Your subscription has been scheduled for cancellation at the end of the current billing cycle.");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * GET /subscription/usage — Get today's usage statistics.
     */
    @GetMapping("/usage")
    public ResponseEntity<Map<String, Object>> getUsage(Authentication auth) {
        String email = auth.getName();
        Map<String, Object> stats = subscriptionService.getUsageStats(email);
        return ResponseEntity.ok(stats);
    }
}
