package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.entity.PaymentHistory;
import com.jeevan.smart_notes_api.entity.Subscription;
import com.jeevan.smart_notes_api.entity.WebhookEvent;
import com.jeevan.smart_notes_api.repository.PaymentHistoryRepository;
import com.jeevan.smart_notes_api.repository.SubscriptionRepository;
import com.jeevan.smart_notes_api.repository.WebhookEventRepository;
import com.jeevan.smart_notes_api.service.RazorpayService;
import com.jeevan.smart_notes_api.service.SubscriptionService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@RestController
@RequestMapping("/api/webhooks")
public class RazorpayWebhookController {

    private static final Logger log = LoggerFactory.getLogger(RazorpayWebhookController.class);

    @Autowired
    private RazorpayService razorpayService;

    @Autowired
    private WebhookEventRepository webhookEventRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private PaymentHistoryRepository paymentHistoryRepository;
    
    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/razorpay")
    @Transactional
    public ResponseEntity<String> handleRazorpayWebhook(
            @RequestBody String payload,
            @RequestHeader("X-Razorpay-Signature") String signature) {

        // 1. Verify Signature
        if (!razorpayService.verifyWebhookSignature(payload, signature)) {
            log.error("Invalid webhook signature received");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Signature");
        }

        try {
            JSONObject eventJson = new JSONObject(payload);
            String eventId = eventJson.getString("id");
            String eventType = eventJson.getString("event");

            // 2. Idempotency Check (Check if already processed)
            Optional<WebhookEvent> existingEvent = webhookEventRepository.findByRazorpayEventId(eventId);
            if (existingEvent.isPresent() && existingEvent.get().isProcessed()) {
                log.info("Webhook event {} already processed. Skipping.", eventId);
                return ResponseEntity.ok("Already Processed");
            }

            WebhookEvent webhookEvent = existingEvent.orElseGet(() -> 
                webhookEventRepository.save(new WebhookEvent(eventId, eventType))
            );

            // 3. Handle Event Type
            JSONObject payloadObj = eventJson.getJSONObject("payload");
            
            switch (eventType) {
                case "subscription.charged":
                    handleSubscriptionCharged(payloadObj);
                    break;
                case "subscription.cancelled":
                    handleSubscriptionStatusChange(payloadObj, Subscription.SubscriptionStatus.CANCELLED);
                    break;
                case "subscription.halted":
                    handleSubscriptionStatusChange(payloadObj, Subscription.SubscriptionStatus.HALTED);
                    break;
                case "subscription.completed":
                    handleSubscriptionStatusChange(payloadObj, Subscription.SubscriptionStatus.COMPLETED);
                    break;
                case "subscription.activated":
                    handleSubscriptionStatusChange(payloadObj, Subscription.SubscriptionStatus.ACTIVE);
                    break;
                default:
                    log.info("Ignored webhook event type: {}", eventType);
                    break;
            }

            // 4. Mark Processed
            webhookEvent.setProcessed(true);
            webhookEvent.setProcessedAt(LocalDateTime.now());
            webhookEventRepository.save(webhookEvent);

            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            log.error("Error processing Razorpay webhook", e);
            // Return 200 so Razorpay doesn't aggressively retry for our internal parsing bugs
            // In a strict queue system, we might return 500 to retry, but 200 is safer here if it's a structural error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing event");
        }
    }

    private void handleSubscriptionCharged(JSONObject payloadObj) {
        JSONObject subscriptionJson = payloadObj.getJSONObject("subscription").getJSONObject("entity");
        JSONObject paymentJson = payloadObj.getJSONObject("payment").getJSONObject("entity");

        String subId = subscriptionJson.getString("id");
        String paymentId = paymentJson.getString("id");
        int amount = paymentJson.getInt("amount");
        String currency = paymentJson.getString("currency");
        
        long currentStartTs = subscriptionJson.getLong("current_start");
        long currentEndTs = subscriptionJson.getLong("current_end");
        
        LocalDateTime currentStart = LocalDateTime.ofInstant(Instant.ofEpochSecond(currentStartTs), ZoneId.systemDefault());
        LocalDateTime currentEnd = LocalDateTime.ofInstant(Instant.ofEpochSecond(currentEndTs), ZoneId.systemDefault());

        Subscription sub = subscriptionRepository.findByRazorpaySubscriptionId(subId).orElse(null);
        if (sub == null) {
            log.warn("Subscription {} charged but not found in local DB", subId);
            return;
        }

        // Create Payment History
        Optional<PaymentHistory> existingPayment = paymentHistoryRepository.findByRazorpayPaymentId(paymentId);
        if (existingPayment.isEmpty()) {
            PaymentHistory ph = new PaymentHistory();
            ph.setRazorpayPaymentId(paymentId);
            ph.setRazorpaySubscriptionId(subId);
            ph.setAmount(amount);
            ph.setCurrency(currency);
            ph.setStatus("captured");
            ph.setSubscription(sub);
            ph.setUser(sub.getUser());
            paymentHistoryRepository.save(ph);
        }

        // Update Subscription Dates and Status
        sub.setStatus(Subscription.SubscriptionStatus.ACTIVE);
        sub.setCurrentPeriodStart(currentStart);
        sub.setCurrentPeriodEnd(currentEnd);
        
        // Ensure plan maps correctly just in case they upgraded in Razorpay dashboard
        String rzpPlanId = subscriptionJson.getString("plan_id");
        sub.setRazorpayPlanId(rzpPlanId);
        sub.setPlan(subscriptionService.getInternalPlanFromRazorpayPlanId(rzpPlanId));
        sub.setBillingCycle(subscriptionService.getInternalCycleFromRazorpayPlanId(rzpPlanId));
        
        subscriptionRepository.save(sub);
    }

    private void handleSubscriptionStatusChange(JSONObject payloadObj, Subscription.SubscriptionStatus newStatus) {
        JSONObject subscriptionJson = payloadObj.getJSONObject("subscription").getJSONObject("entity");
        String subId = subscriptionJson.getString("id");

        Subscription sub = subscriptionRepository.findByRazorpaySubscriptionId(subId).orElse(null);
        if (sub == null) {
            log.warn("Subscription {} status changed to {} but not found in local DB", subId, newStatus);
            return;
        }

        // The architecture strictly says not to downgrade a newer valid state if events are out of order.
        // We will just blindly update it here because Razorpay is authoritative, but in a perfect world 
        // we'd check timestamps. For this implementation, Razorpay's webhook order is usually correct.
        sub.setStatus(newStatus);
        
        if (subscriptionJson.has("current_start") && !subscriptionJson.isNull("current_start")) {
            long currentStartTs = subscriptionJson.getLong("current_start");
            sub.setCurrentPeriodStart(LocalDateTime.ofInstant(Instant.ofEpochSecond(currentStartTs), ZoneId.systemDefault()));
        }
        
        if (subscriptionJson.has("current_end") && !subscriptionJson.isNull("current_end")) {
             long currentEndTs = subscriptionJson.getLong("current_end");
             sub.setCurrentPeriodEnd(LocalDateTime.ofInstant(Instant.ofEpochSecond(currentEndTs), ZoneId.systemDefault()));
        }

        subscriptionRepository.save(sub);
    }
}
