package com.jeevan.smart_notes_api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Base64;
import java.util.Map;

/**
 * Verifies Google ID tokens (JWT credentials) from Google Identity Services.
 * 
 * Uses Google's tokeninfo endpoint to verify the token, then decodes the JWT
 * payload to extract user profile data (email, name, picture).
 * 
 * The credential from Google Identity Services is a standard JWT that can be
 * decoded to get user info after verification.
 */
@Service
public class GoogleTokenVerifier {

    private static final Logger log = LoggerFactory.getLogger(GoogleTokenVerifier.class);

    private static final String GOOGLE_TOKENINFO_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    @Value("${google.client-id:}")
    private String googleClientId;

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public GoogleTokenVerifier() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Verifies a Google ID token and returns the extracted user information.
     *
     * @param credential The JWT credential string from Google Identity Services
     * @return GoogleUserInfo containing email, name, picture, and Google subject ID
     * @throws RuntimeException if verification fails
     */
    public GoogleUserInfo verify(String credential) {
        if (googleClientId == null || googleClientId.isBlank()) {
            throw new RuntimeException("Google OAuth is not configured. Set GOOGLE_CLIENT_ID environment variable.");
        }

        try {
            // Step 1: Verify the token with Google's tokeninfo endpoint
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(GOOGLE_TOKENINFO_URL + credential))
                    .GET()
                    .timeout(Duration.ofSeconds(10))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("[GoogleTokenVerifier] Token verification failed. HTTP {}: {}", response.statusCode(), response.body());
                throw new RuntimeException("Invalid Google credential. Token verification failed.");
            }

            JsonNode tokenInfo = objectMapper.readTree(response.body());

            // Step 2: Verify the audience (client ID) matches our app
            String audience = tokenInfo.has("aud") ? tokenInfo.get("aud").asText() : "";
            if (!googleClientId.equals(audience)) {
                log.error("[GoogleTokenVerifier] Audience mismatch. Expected: '{}', Got: '{}'", googleClientId, audience);
                throw new RuntimeException("Invalid Google credential. Audience mismatch.");
            }

            // Step 3: Check email is verified
            String emailVerified = tokenInfo.has("email_verified") ? tokenInfo.get("email_verified").asText() : "false";
            if (!"true".equals(emailVerified)) {
                throw new RuntimeException("Google account email is not verified.");
            }

            // Step 4: Extract user info
            String email = tokenInfo.has("email") ? tokenInfo.get("email").asText() : null;
            String name = tokenInfo.has("name") ? tokenInfo.get("name").asText() : null;
            String picture = tokenInfo.has("picture") ? tokenInfo.get("picture").asText() : null;
            String sub = tokenInfo.has("sub") ? tokenInfo.get("sub").asText() : null;

            if (email == null || email.isBlank()) {
                throw new RuntimeException("Google token does not contain an email address.");
            }

            log.info("[GoogleTokenVerifier] Successfully verified Google user: {} ({})", name, email);

            return new GoogleUserInfo(email, name, picture, sub);

        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            log.error("[GoogleTokenVerifier] Exception during token verification: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to verify Google credential: " + e.getMessage());
        }
    }

    /**
     * Holds the extracted user information from a verified Google ID token.
     */
    public static class GoogleUserInfo {
        private final String email;
        private final String name;
        private final String pictureUrl;
        private final String googleSubjectId;

        public GoogleUserInfo(String email, String name, String pictureUrl, String googleSubjectId) {
            this.email = email;
            this.name = name;
            this.pictureUrl = pictureUrl;
            this.googleSubjectId = googleSubjectId;
        }

        public String getEmail() { return email; }
        public String getName() { return name; }
        public String getPictureUrl() { return pictureUrl; }
        public String getGoogleSubjectId() { return googleSubjectId; }
    }
}
