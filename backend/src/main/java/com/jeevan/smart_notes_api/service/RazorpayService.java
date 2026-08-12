package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.entity.User;
import com.razorpay.Customer;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Subscription;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RazorpayService {

    private static final Logger log = LoggerFactory.getLogger(RazorpayService.class);

    private final RazorpayClient razorpayClient;

    @Value("${RAZORPAY_WEBHOOK_SECRET:}")
    private String webhookSecret;

    public RazorpayService(RazorpayClient razorpayClient) {
        this.razorpayClient = razorpayClient;
    }

    /**
     * Creates or retrieves a Razorpay Customer for the given User.
     */
    public String getOrCreateCustomer(User user) {
        if (user.getRazorpayCustomerId() != null && !user.getRazorpayCustomerId().isEmpty()) {
            return user.getRazorpayCustomerId();
        }

        try {
            JSONObject customerRequest = new JSONObject();
            customerRequest.put("name", user.getUsername());
            
            // To bypass Razorpay's strict "Customer already exists" constraint on emails
            // especially after database resets, we append +userId to the email handle.
            // For example: anshulrathod76+1@gmail.com. This acts as a unique email to Razorpay
            // but still routes to the user's real inbox (supported by Gmail, Outlook, etc).
            String[] emailParts = user.getEmail().split("@");
            String uniqueEmail = emailParts[0] + "+" + user.getId() + "@" + emailParts[1];
            customerRequest.put("email", uniqueEmail);

            customerRequest.put("fail_existing", 0);

            Customer customer = razorpayClient.customers.create(customerRequest);
            return customer.get("id");
        } catch (RazorpayException e) {
            log.error("Failed to create Razorpay customer for user {}", user.getId(), e);
            throw new RuntimeException("Failed to create Razorpay customer", e);
        }
    }

    /**
     * Creates a subscription for the customer with the given plan ID.
     */
    public Subscription createSubscription(String razorpayCustomerId, String planId) {
        try {
            JSONObject request = new JSONObject();
            request.put("plan_id", planId);
            request.put("customer_id", razorpayCustomerId);
            request.put("total_count", 1200); // effectively infinite for recurring until cancelled
            // The customer receives an invoice and must complete checkout
            request.put("customer_notify", 1); 

            return razorpayClient.subscriptions.create(request);
        } catch (RazorpayException e) {
            log.error("Failed to create Razorpay subscription for customer {} and plan {}", razorpayCustomerId, planId, e);
            throw new RuntimeException("Failed to create Razorpay subscription", e);
        }
    }

    /**
     * Cancels a subscription at the end of the current billing cycle.
     */
    public Subscription cancelSubscriptionAtCycleEnd(String razorpaySubscriptionId) {
        try {
            JSONObject request = new JSONObject();
            request.put("cancel_at_cycle_end", true);

            return razorpayClient.subscriptions.cancel(razorpaySubscriptionId, request);
        } catch (RazorpayException e) {
            log.error("Failed to cancel Razorpay subscription {}", razorpaySubscriptionId, e);
            throw new RuntimeException("Failed to cancel Razorpay subscription", e);
        }
    }

    /**
     * Verifies the Razorpay webhook signature.
     */
    public boolean verifyWebhookSignature(String payload, String signature) {
        if (webhookSecret == null || webhookSecret.isBlank()) {
            log.error("Webhook secret is not configured!");
            return false;
        }

        try {
            return Utils.verifyWebhookSignature(payload, signature, webhookSecret);
        } catch (RazorpayException e) {
            log.error("Failed to verify webhook signature", e);
            return false;
        }
    }
}
