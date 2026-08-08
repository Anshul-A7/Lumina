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
     * POST /subscription/purchase — Purchase or upgrade a plan.
     * Body: { "plan": "PLUS", "billingCycle": "MONTHLY" }
     */
    @PostMapping("/purchase")
    public ResponseEntity<Map<String, Object>> purchasePlan(
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
            Subscription sub = subscriptionService.purchasePlan(email, plan, cycle);

            Map<String, Object> result = new HashMap<>();
            result.put("message", "Subscription updated successfully");
            result.put("plan", sub.getPlan().name());
            result.put("billingCycle", sub.getBillingCycle().name());
            result.put("active", sub.isActive());
            result.put("startDate", sub.getStartDate());
            result.put("endDate", sub.getEndDate());
            result.put("monthlyPriceInr", sub.getMonthlyPriceInr());
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Invalid plan or billing cycle. Valid plans: FREE, PLUS, PRO. Valid cycles: MONTHLY, YEARLY");
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * POST /subscription/cancel — Cancel subscription (downgrade to FREE).
     */
    @PostMapping("/cancel")
    public ResponseEntity<Map<String, String>> cancelSubscription(Authentication auth) {
        String email = auth.getName();
        subscriptionService.cancelSubscription(email);

        Map<String, String> result = new HashMap<>();
        result.put("message", "Subscription cancelled. You are now on the Free plan.");
        return ResponseEntity.ok(result);
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
