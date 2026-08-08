package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.dto.request.*;
import com.jeevan.smart_notes_api.dto.response.AuthResponse;
import com.jeevan.smart_notes_api.dto.response.UserResponse;
import com.jeevan.smart_notes_api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    /**
     * Register a new user with email and password.
     * Returns success message.
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterRequest request) {
        String message = service.register(request);
        return ResponseEntity.ok(Map.of("message", message));
    }

    /**
     * Verify email with OTP.
     * Returns JWT tokens + user profile.
     */
    @PostMapping("/verify-email")
    public ResponseEntity<AuthResponse> verifyEmail(@Valid @RequestBody VerifyEmailRequest request) {
        AuthResponse response = service.verifyEmail(request.getEmail(), request.getOtp());
        return ResponseEntity.ok(response);
    }

    /**
     * Authenticate with email and password.
     * Returns JWT tokens + user profile.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = service.verify(request);
        return ResponseEntity.ok(response);
    }

    /**
     * Authenticate with Google OAuth credential.
     * Creates user if first-time, returns JWT tokens + user profile.
     */
    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@Valid @RequestBody GoogleLoginRequest request) {
        AuthResponse response = service.googleLogin(request.getCredential());
        return ResponseEntity.ok(response);
    }

    /**
     * Refresh an expired access token using a valid refresh token.
     */
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse response = service.refreshToken(request.getRefreshToken());
        return ResponseEntity.ok(response);
    }

    /**
     * Logout: invalidate the refresh token.
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@RequestBody RefreshTokenRequest request) {
        String message = service.logout(request.getRefreshToken());
        return ResponseEntity.ok(Map.of("message", message));
    }

    /**
     * Initiate forgot-password flow. Sends reset email if account exists.
     * Always returns success (to prevent email enumeration).
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {
        service.forgotPassword(request.getEmail());
        return ResponseEntity.ok(Map.of(
                "message", "If an account exists with this email, a password reset link has been sent."
        ));
    }

    /**
     * Reset password using a valid reset token from email.
     */
    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        service.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok(Map.of(
                "message", "Password reset successful. You can now log in with your new password."
        ));
    }

    /**
     * Get the currently authenticated user's profile.
     * Requires valid JWT in Authorization header.
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        UserResponse user = service.getCurrentUser(email);
        return ResponseEntity.ok(user);
    }

    /**
     * Change password for authenticated user.
     * Requires valid JWT in Authorization header.
     */
    @PostMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {
        String email = authentication.getName();
        service.changePassword(email, request.getCurrentPassword(), request.getNewPassword());
        return ResponseEntity.ok(Map.of(
                "message", "Password changed successfully"
        ));
    }

    /**
     * Delete the authenticated user's account and all associated data.
     * Requires valid JWT in Authorization header.
     */
    @DeleteMapping("/account")
    public ResponseEntity<Map<String, String>> deleteAccount(Authentication authentication) {
        String email = authentication.getName();
        service.deleteAccount(email);
        return ResponseEntity.ok(Map.of(
                "message", "Account deleted successfully"
        ));
    }
}