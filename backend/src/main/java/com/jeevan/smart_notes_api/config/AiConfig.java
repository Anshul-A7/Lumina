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

/**
 * Multi-Provider AI Configuration for Lumina / Note-XZ.
 * Seamlessly supports GROQ, GEMINI, and OPENAI.
 */
@Configuration
public class AiConfig {

    private static final Logger log = LoggerFactory.getLogger(AiConfig.class);

    @Value("${ai.provider:GROQ}")
    private String aiProvider;

    // Groq
    @Value("${groq.api-key:${GROQ_API_KEY:}}")
    private String groqApiKey;

    @Value("${groq.base-url:${GROQ_BASE_URL:https://api.groq.com/openai}}")
    private String groqBaseUrl;

    @Value("${groq.model:${GROQ_MODEL:llama-3.3-70b-versatile}}")
    private String groqModel;

    // Gemini
    @Value("${gemini.api-key:${GEMINI_API_KEY:}}")
    private String geminiApiKey;

    @Value("${gemini.base-url:${GEMINI_BASE_URL:https://generativelanguage.googleapis.com/v1beta/openai}}")
    private String geminiBaseUrl;

    @Value("${gemini.model:${GEMINI_MODEL:gemini-1.5-flash}}")
    private String geminiModel;

    // OpenAI
    @Value("${openai.api-key:${OPENAI_API_KEY:}}")
    private String openAiApiKey;

    @Value("${openai.base-url:${OPENAI_BASE_URL:https://api.openai.com}}")
    private String openAiBaseUrl;

    @Value("${openai.model:${OPENAI_MODEL:gpt-4o-mini}}")
    private String openAiModel;

    @Bean
    @Primary
    public ChatModel chatModel() {
        String provider = aiProvider != null ? aiProvider.trim().toUpperCase() : "GROQ";
        String apiKey;
        String baseUrl;
        String modelName;

        switch (provider) {
            case "GEMINI":
                log.info("🤖 Initializing AI Model with Provider: GEMINI (Model: {})", geminiModel);
                apiKey = (geminiApiKey != null && !geminiApiKey.isBlank()) ? geminiApiKey : openAiApiKey;
                baseUrl = geminiBaseUrl;
                modelName = geminiModel;
                break;

            case "OPENAI":
                log.info("🤖 Initializing AI Model with Provider: OPENAI (Model: {})", openAiModel);
                apiKey = openAiApiKey;
                baseUrl = openAiBaseUrl;
                modelName = openAiModel;
                break;

            case "GROQ":
            default:
                log.info("🤖 Initializing AI Model with Provider: GROQ (Model: {})", groqModel);
                apiKey = (groqApiKey != null && !groqApiKey.isBlank()) ? groqApiKey : openAiApiKey;
                baseUrl = groqBaseUrl;
                modelName = groqModel;
                break;
        }

        if (apiKey == null || apiKey.isBlank()) {
            log.warn("⚠️ No API Key configured for AI Provider: {}. AI requests may fail.", provider);
            apiKey = "dummy-key-for-init";
        }

        OpenAiApi.Builder builder = OpenAiApi.builder()
                .apiKey(apiKey)
                .baseUrl(baseUrl);

        if ("GEMINI".equals(provider)) {
            builder.completionsPath("/chat/completions");
        }

        OpenAiApi openAiApi = builder.build();

        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .model(modelName)
                .temperature(0.7)
                .build();

        return OpenAiChatModel.builder()
                .openAiApi(openAiApi)
                .defaultOptions(options)
                .build();
    }

    @Bean
    @Primary
    public ChatClient.Builder chatClientBuilder(ChatModel chatModel) {
        return ChatClient.builder(chatModel);
    }
}
