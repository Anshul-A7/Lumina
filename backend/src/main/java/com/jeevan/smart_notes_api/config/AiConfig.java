package com.jeevan.smart_notes_api.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * ════════════════════════════════════════════════════════════════════════
 * Multi-Provider AI Configuration for Lumina / Note-XZ
 * ════════════════════════════════════════════════════════════════════════
 *
 * Supports MULTIPLE API keys per provider via comma-separated env vars:
 *   GEMINI_API_KEYS=key1,key2,key3
 *   GROQ_API_KEYS=key1,key2
 *
 * Falls back to single-key vars (GEMINI_API_KEY, GROQ_API_KEY) for
 * backward compatibility.
 *
 * All keys are pooled into an AiProviderPool that handles:
 *   - Round-robin load distribution
 *   - Automatic failover on rate-limit errors
 *   - Per-key cooldown tracking
 *   - Thread-safe concurrent access
 */
@Configuration
public class AiConfig {

    private static final Logger log = LoggerFactory.getLogger(AiConfig.class);

    // ── Multi-Key Properties (comma-separated) ──
    @Value("${gemini.api-keys:${GEMINI_API_KEYS:}}")
    private String geminiApiKeys;

    @Value("${groq.api-keys:${GROQ_API_KEYS:}}")
    private String groqApiKeys;

    // ── Single-Key Fallbacks (backward compatibility) ──
    @Value("${gemini.api-key:${GEMINI_API_KEY:}}")
    private String geminiApiKeySingle;

    @Value("${groq.api-key:${GROQ_API_KEY:}}")
    private String groqApiKeySingle;

    @Value("${openai.api-key:${OPENAI_API_KEY:}}")
    private String openAiApiKey;

    // ── Provider URLs ──
    @Value("${gemini.base-url:${GEMINI_BASE_URL:https://generativelanguage.googleapis.com/v1beta/openai}}")
    private String geminiBaseUrl;

    @Value("${groq.base-url:${GROQ_BASE_URL:https://api.groq.com/openai}}")
    private String groqBaseUrl;

    @Value("${openai.base-url:${OPENAI_BASE_URL:https://api.openai.com}}")
    private String openAiBaseUrl;

    // ── Model Names ──
    @Value("${gemini.model:${GEMINI_MODEL:gemini-2.5-flash}}")
    private String geminiModel;

    @Value("${groq.model:${GROQ_MODEL:llama-3.3-70b-versatile}}")
    private String groqModel;

    @Value("${openai.model:${OPENAI_MODEL:gpt-4o-mini}}")
    private String openAiModel;

    /**
     * Parse a comma-separated key string into a deduplicated list of non-blank keys.
     */
    private List<String> parseKeys(String multiKeys, String singleKey) {
        List<String> keys = new ArrayList<>();

        // Parse comma-separated keys
        if (multiKeys != null && !multiKeys.isBlank()) {
            keys.addAll(
                Arrays.stream(multiKeys.split(","))
                    .map(String::trim)
                    .filter(k -> !k.isBlank())
                    .collect(Collectors.toList())
            );
        }

        // Fallback: add single key if not already in the list
        if (singleKey != null && !singleKey.isBlank() && !keys.contains(singleKey.trim())) {
            keys.add(singleKey.trim());
        }

        return keys;
    }

    /**
     * Create a ChatModel (OpenAI-compatible) for a given provider + key.
     */
    private ChatModel createChatModel(String providerName, String apiKey, String baseUrl, String model) {
        OpenAiApi.Builder builder = OpenAiApi.builder()
                .apiKey(apiKey)
                .baseUrl(baseUrl);

        if ("GEMINI".equalsIgnoreCase(providerName)) {
            builder.completionsPath("/chat/completions");
        }

        OpenAiApi api = builder.build();

        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .model(model)
                .temperature(0.7)
                .build();

        return OpenAiChatModel.builder()
                .openAiApi(api)
                .defaultOptions(options)
                .build();
    }

    /**
     * Build the AiProviderPool with all configured API keys across all providers.
     * This is the primary bean used by AiService for all AI operations.
     */
    @Bean
    public AiProviderPool aiProviderPool() {
        List<AiProviderPool.ProviderSlot> slots = new ArrayList<>();

        // ── Add Gemini slots ──
        List<String> geminiKeys = parseKeys(geminiApiKeys, geminiApiKeySingle);
        for (String key : geminiKeys) {
            try {
                ChatModel model = createChatModel("GEMINI", key, geminiBaseUrl, geminiModel);
                slots.add(new AiProviderPool.ProviderSlot("GEMINI", key, model));
                log.info("✅ Added Gemini slot [{}...{}]", key.substring(0, Math.min(4, key.length())),
                        key.length() > 4 ? key.substring(key.length() - 4) : "");
            } catch (Exception e) {
                log.error("❌ Failed to initialize Gemini slot: {}", e.getMessage());
            }
        }

        // ── Add Groq slots ──
        List<String> groqKeys = parseKeys(groqApiKeys, groqApiKeySingle);
        for (String key : groqKeys) {
            try {
                ChatModel model = createChatModel("GROQ", key, groqBaseUrl, groqModel);
                slots.add(new AiProviderPool.ProviderSlot("GROQ", key, model));
                log.info("✅ Added Groq slot [{}...{}]", key.substring(0, Math.min(4, key.length())),
                        key.length() > 4 ? key.substring(key.length() - 4) : "");
            } catch (Exception e) {
                log.error("❌ Failed to initialize Groq slot: {}", e.getMessage());
            }
        }

        // ── Add OpenAI slot (if configured) ──
        if (openAiApiKey != null && !openAiApiKey.isBlank()) {
            try {
                ChatModel model = createChatModel("OPENAI", openAiApiKey, openAiBaseUrl, openAiModel);
                slots.add(new AiProviderPool.ProviderSlot("OPENAI", openAiApiKey, model));
                log.info("✅ Added OpenAI slot");
            } catch (Exception e) {
                log.error("❌ Failed to initialize OpenAI slot: {}", e.getMessage());
            }
        }

        if (slots.isEmpty()) {
            log.error("🚨 NO AI PROVIDERS CONFIGURED! Add GEMINI_API_KEYS or GROQ_API_KEYS to .env");
        }

        return new AiProviderPool(slots);
    }

    /**
     * Primary ChatModel bean — uses the first available slot from the pool.
     * Kept for backward compatibility with Spring AI auto-configuration.
     */
    @Bean
    @Primary
    public ChatModel chatModel(AiProviderPool pool) {
        List<AiProviderPool.ProviderSlot> slots = pool.getSlots();
        if (!slots.isEmpty()) {
            return slots.get(0).getChatModel();
        }
        // Fallback dummy model to prevent Spring context failure
        log.warn("⚠️ Using dummy ChatModel — no API keys configured");
        OpenAiApi api = OpenAiApi.builder()
                .apiKey("dummy-key")
                .baseUrl("https://api.groq.com/openai")
                .build();
        return OpenAiChatModel.builder()
                .openAiApi(api)
                .defaultOptions(OpenAiChatOptions.builder().model("llama-3.3-70b-versatile").build())
                .build();
    }

    /**
     * Primary ChatClient.Builder bean for backward compatibility.
     */
    @Bean
    @Primary
    public ChatClient.Builder chatClientBuilder(ChatModel chatModel) {
        return ChatClient.builder(chatModel);
    }
}
