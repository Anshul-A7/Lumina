package com.jeevan.smart_notes_api.config;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RazorpayConfig {

    @Value("${razorpay.key.id:${RAZORPAY_KEY_ID:}}")
    private String keyId;

    @Value("${razorpay.key.secret:${RAZORPAY_KEY_SECRET:}}")
    private String keySecret;

    @Bean
    public RazorpayClient razorpayClient() throws RazorpayException {
        if (keyId == null || keyId.isBlank() || keySecret == null || keySecret.isBlank()) {
            throw new IllegalArgumentException("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be configured.");
        }
        return new RazorpayClient(keyId, keySecret);
    }
}
