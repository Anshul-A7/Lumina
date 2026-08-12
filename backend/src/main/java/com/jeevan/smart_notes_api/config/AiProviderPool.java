package com.jeevan.smart_notes_api.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Consumer;
import java.util.function.Function;

/**
 * ════════════════════════════════════════════════════════════════════════
 * AI PROVIDER POOL — Thread-Safe Multi-Key Failover Engine
 * ════════════════════════════════════════════════════════════════════════
 *
 * Manages multiple AI provider slots (Gemini keys, Groq keys, OpenAI keys).
 * When a request fails due to rate-limiting or quota exhaustion on one key,
 * the pool automatically rotates to the next available key/provider.
 *
 * KEY DESIGN PRINCIPLES:
 * - Thread-safe for concurrent multi-user access via ConcurrentHashMap
 * - Per-key rate limit tracking with configurable cooldown
 * - Round-robin load distribution across healthy keys
 * - Automatic recovery: rate-limited keys become available after cooldown
 * - Graceful exhaustion: only returns error when ALL keys are exhausted
 *
 * SUPPORTED ERROR PATTERNS DETECTED AS RATE LIMITS:
 * - HTTP 429 (Too Many Requests)
 * - "quota" / "rate limit" / "rate_limit" / "exceeded" in error messages
 * - "resource_exhausted" / "RESOURCE_EXHAUSTED" gRPC error codes
 * - "capacity" / "overloaded" / "503" service unavailable patterns
 */
public class AiProviderPool {

    private static final Logger log = LoggerFactory.getLogger(AiProviderPool.class);

    /**
     * Represents a single AI provider slot (one API key for one provider).
     */
    public static class ProviderSlot {
        private final String providerName;
        private final String apiKey;
        private final String maskedKey;
        private final ChatModel chatModel;
        private final ChatClient chatClient;
        private volatile boolean rateLimited = false;
        private volatile long rateLimitExpiresAt = 0;
        private final AtomicInteger successCount = new AtomicInteger(0);
        private final AtomicInteger failureCount = new AtomicInteger(0);

        public ProviderSlot(String providerName, String apiKey, ChatModel chatModel) {
            this.providerName = providerName;
            this.apiKey = apiKey;
            this.maskedKey = apiKey.length() > 8
                    ? apiKey.substring(0, 4) + "****" + apiKey.substring(apiKey.length() - 4)
                    : "****";
            this.chatModel = chatModel;
            this.chatClient = ChatClient.builder(chatModel).build();
        }

        public String getProviderName() { return providerName; }
        public String getMaskedKey() { return maskedKey; }
        public ChatModel getChatModel() { return chatModel; }
        public ChatClient getChatClient() { return chatClient; }

        public boolean isAvailable() {
            if (!rateLimited) return true;
            if (System.currentTimeMillis() > rateLimitExpiresAt) {
                rateLimited = false;
                log.info("🔄 Provider slot recovered: {} [{}]", providerName, maskedKey);
                return true;
            }
            return false;
        }

        public void markRateLimited(long cooldownMs) {
            this.rateLimited = true;
            this.rateLimitExpiresAt = System.currentTimeMillis() + cooldownMs;
            this.failureCount.incrementAndGet();
            log.warn("⚠️ Rate-limited: {} [{}] — cooldown {}s", providerName, maskedKey, cooldownMs / 1000);
        }

        public void markSuccess() {
            this.successCount.incrementAndGet();
        }

        public long getTimeUntilRecovery() {
            if (!rateLimited) return 0;
            return Math.max(0, rateLimitExpiresAt - System.currentTimeMillis());
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // POOL STATE
    // ═══════════════════════════════════════════════════════════════════

    private final List<ProviderSlot> slots;
    private final AtomicInteger roundRobinIndex = new AtomicInteger(0);

    /** Default cooldown when rate-limited (60 seconds) */
    private static final long DEFAULT_COOLDOWN_MS = 60_000;

    /** Gemini has stricter per-minute limits, use shorter cooldown for quick recovery */
    private static final long GEMINI_COOLDOWN_MS = 65_000;

    /** Groq has generous per-day limits but strict per-minute */
    private static final long GROQ_COOLDOWN_MS = 60_000;

    /** Maximum wait time before giving up when all providers are rate-limited */
    private static final long MAX_RETRY_WAIT_MS = 10_000;

    public AiProviderPool(List<ProviderSlot> slots) {
        this.slots = Collections.unmodifiableList(new ArrayList<>(slots));
        log.info("═══════════════════════════════════════════════════════════════");
        log.info("🚀 AI Provider Pool initialized with {} total slots:", slots.size());
        for (ProviderSlot slot : slots) {
            log.info("   ├─ {} [{}]", slot.getProviderName(), slot.getMaskedKey());
        }
        log.info("═══════════════════════════════════════════════════════════════");
    }

    public List<ProviderSlot> getSlots() {
        return slots;
    }

    /**
     * Get the next available slot using round-robin across all non-rate-limited slots.
     * Returns null if all slots are currently rate-limited.
     */
    private ProviderSlot getNextAvailableSlot() {
        int totalSlots = slots.size();
        if (totalSlots == 0) return null;

        int startIndex = roundRobinIndex.getAndIncrement() % totalSlots;

        // First pass: find available slot starting from round-robin index
        for (int i = 0; i < totalSlots; i++) {
            int idx = (startIndex + i) % totalSlots;
            ProviderSlot slot = slots.get(idx);
            if (slot.isAvailable()) {
                return slot;
            }
        }

        return null; // All slots rate-limited
    }

    /**
     * Get the slot with the shortest remaining cooldown time.
     * Used for retry-after calculation.
     */
    private ProviderSlot getShortestCooldownSlot() {
        ProviderSlot shortest = null;
        long shortestTime = Long.MAX_VALUE;
        for (ProviderSlot slot : slots) {
            long remaining = slot.getTimeUntilRecovery();
            if (remaining < shortestTime) {
                shortestTime = remaining;
                shortest = slot;
            }
        }
        return shortest;
    }

    /**
     * Determine cooldown duration based on provider type.
     */
    private long getCooldownForProvider(String providerName) {
        return switch (providerName.toUpperCase()) {
            case "GEMINI" -> GEMINI_COOLDOWN_MS;
            case "GROQ" -> GROQ_COOLDOWN_MS;
            default -> DEFAULT_COOLDOWN_MS;
        };
    }

    /**
     * Check if an exception indicates a rate-limit or quota exhaustion error.
     * Covers HTTP 429, gRPC RESOURCE_EXHAUSTED, and common error message patterns
     * from Gemini, Groq, and OpenAI APIs.
     */
    private boolean isRateLimitError(Exception e) {
        String message = e.getMessage() != null ? e.getMessage().toLowerCase() : "";
        String fullTrace = getFullExceptionMessage(e).toLowerCase();

        // Direct HTTP 429 check
        if (message.contains("429") || fullTrace.contains("429")) return true;

        // Quota / rate limit keywords
        if (message.contains("quota") || message.contains("rate limit") || message.contains("rate_limit")) return true;
        if (message.contains("exceeded") || message.contains("exhausted")) return true;
        if (message.contains("resource_exhausted") || message.contains("too many requests")) return true;

        // Service overload / capacity
        if (message.contains("overloaded") || message.contains("capacity")) return true;
        if (message.contains("503") || message.contains("service unavailable")) return true;

        // Gemini-specific patterns
        if (message.contains("quota_exceeded") || message.contains("rate_limit_exceeded")) return true;
        if (message.contains("generativelanguage") && message.contains("limit")) return true;

        // Groq-specific patterns
        if (message.contains("tokens per minute") || message.contains("requests per minute")) return true;
        if (message.contains("requests per day") || message.contains("tokens per day")) return true;

        // Check cause chain
        if (fullTrace.contains("quota") || fullTrace.contains("rate limit") || fullTrace.contains("429")) return true;
        if (fullTrace.contains("resource_exhausted") || fullTrace.contains("too many requests")) return true;

        return false;
    }

    /**
     * Build complete exception message including all cause chain messages.
     */
    private String getFullExceptionMessage(Exception e) {
        StringBuilder sb = new StringBuilder();
        Throwable current = e;
        while (current != null) {
            if (current.getMessage() != null) {
                sb.append(current.getMessage()).append(" | ");
            }
            current = current.getCause();
        }
        return sb.toString();
    }

    // ═══════════════════════════════════════════════════════════════════
    // PUBLIC API: CALL WITH FAILOVER
    // ═══════════════════════════════════════════════════════════════════

    /**
     * Execute an AI call with automatic failover across all configured provider slots.
     *
     * Flow:
     * 1. Get next available slot (round-robin).
     * 2. Execute the function with that slot's ChatClient.
     * 3. On success → return result.
     * 4. On rate-limit error → mark slot as rate-limited, try next slot.
     * 5. On other error → try next slot.
     * 6. If all slots exhausted AND shortest cooldown is within MAX_RETRY_WAIT_MS → wait and retry.
     * 7. If truly all exhausted → throw RuntimeException("Something went wrong, Please try again.")
     *
     * @param operation Function that receives a ChatClient and returns a String response
     * @return AI response string
     * @throws RuntimeException if all providers are exhausted
     */
    public String callWithFailover(Function<ChatClient, String> operation) {
        int totalSlots = slots.size();
        if (totalSlots == 0) {
            throw new RuntimeException("No AI providers configured. Please add API keys.");
        }

        List<String> errors = new ArrayList<>();
        int attempts = 0;

        // Phase 1: Try all available slots
        while (attempts < totalSlots * 2) { // Allow up to 2 full rotations (for recovery)
            ProviderSlot slot = getNextAvailableSlot();

            if (slot == null) {
                // All slots rate-limited — check if any will recover soon
                ProviderSlot shortest = getShortestCooldownSlot();
                if (shortest != null && shortest.getTimeUntilRecovery() <= MAX_RETRY_WAIT_MS) {
                    long waitTime = shortest.getTimeUntilRecovery() + 500; // +500ms buffer
                    log.info("⏳ All providers rate-limited. Waiting {}ms for {} [{}] to recover...",
                            waitTime, shortest.getProviderName(), shortest.getMaskedKey());
                    try {
                        Thread.sleep(waitTime);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                    attempts++;
                    continue; // Retry after wait
                }
                break; // All slots exhausted and cooldowns too long
            }

            try {
                log.debug("🤖 Attempting AI call via {} [{}]...", slot.getProviderName(), slot.getMaskedKey());
                String result = operation.apply(slot.getChatClient());
                slot.markSuccess();
                log.debug("✅ AI call successful via {} [{}]", slot.getProviderName(), slot.getMaskedKey());
                return result;
            } catch (Exception e) {
                attempts++;
                if (isRateLimitError(e)) {
                    long cooldown = getCooldownForProvider(slot.getProviderName());
                    slot.markRateLimited(cooldown);
                    errors.add(slot.getProviderName() + "[" + slot.getMaskedKey() + "]: RATE_LIMITED");
                    log.warn("⚠️ Rate limit hit on {} [{}], rotating to next provider...",
                            slot.getProviderName(), slot.getMaskedKey());
                } else {
                    errors.add(slot.getProviderName() + "[" + slot.getMaskedKey() + "]: " + e.getMessage());
                    log.error("❌ Non-rate-limit error on {} [{}]: {}",
                            slot.getProviderName(), slot.getMaskedKey(), e.getMessage());
                    // For non-rate-limit errors, still try next provider
                }
            }
        }

        // All providers exhausted
        log.error("🚨 ALL AI providers exhausted after {} attempts. Errors: {}", attempts, errors);
        throw new RuntimeException("Something went wrong, Please try again.");
    }

    /**
     * Execute a streaming AI call with automatic failover.
     * Same failover logic as callWithFailover but for streaming operations.
     *
     * @param operation Function that receives a ChatClient and streams tokens via tokenConsumer.
     *                  The outer function should return the complete accumulated response.
     * @return Complete accumulated AI response string
     */
    public String streamWithFailover(Function<ChatClient, String> operation) {
        // Streaming uses the same failover logic
        return callWithFailover(operation);
    }

    /**
     * Get a ChatClient for multimodal operations (image analysis).
     * Prefers Gemini for vision capabilities, falls back to others.
     *
     * @return A ChatClient from an available provider, preferring vision-capable providers
     */
    public ChatClient getMultimodalClient() {
        // Prefer Gemini for multimodal (it has native vision support)
        for (ProviderSlot slot : slots) {
            if (slot.getProviderName().equalsIgnoreCase("GEMINI") && slot.isAvailable()) {
                return slot.getChatClient();
            }
        }
        // Fallback to any available slot
        ProviderSlot slot = getNextAvailableSlot();
        if (slot != null) {
            return slot.getChatClient();
        }
        // Last resort: return first slot regardless of rate limit
        if (!slots.isEmpty()) {
            return slots.get(0).getChatClient();
        }
        throw new RuntimeException("No AI providers available for multimodal processing.");
    }

    /**
     * Execute a multimodal call (image analysis) with failover.
     * Same as callWithFailover but tries vision-capable providers first.
     */
    public String callMultimodalWithFailover(Function<ChatClient, String> operation) {
        // Try Gemini slots first (vision-capable)
        for (ProviderSlot slot : slots) {
            if (slot.getProviderName().equalsIgnoreCase("GEMINI") && slot.isAvailable()) {
                try {
                    String result = operation.apply(slot.getChatClient());
                    slot.markSuccess();
                    return result;
                } catch (Exception e) {
                    if (isRateLimitError(e)) {
                        slot.markRateLimited(getCooldownForProvider(slot.getProviderName()));
                    }
                    log.warn("Gemini multimodal failed, trying other providers: {}", e.getMessage());
                }
            }
        }
        // Fallback to regular failover for non-Gemini
        return callWithFailover(operation);
    }

    /**
     * Get pool health status for monitoring.
     */
    public String getHealthStatus() {
        StringBuilder sb = new StringBuilder("AI Provider Pool Status:\n");
        for (ProviderSlot slot : slots) {
            sb.append(String.format("  %s [%s]: %s (success=%d, fail=%d)\n",
                    slot.getProviderName(),
                    slot.getMaskedKey(),
                    slot.isAvailable() ? "AVAILABLE" : "RATE_LIMITED (" + (slot.getTimeUntilRecovery() / 1000) + "s remaining)",
                    slot.successCount.get(),
                    slot.failureCount.get()));
        }
        return sb.toString();
    }
}
