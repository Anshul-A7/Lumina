package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.dto.response.AuthResponse;
import com.jeevan.smart_notes_api.dto.response.UserResponse;
import com.jeevan.smart_notes_api.dto.request.LoginRequest;
import com.jeevan.smart_notes_api.dto.request.RegisterRequest;
import com.jeevan.smart_notes_api.entity.EmailVerificationToken;
import com.jeevan.smart_notes_api.entity.PasswordResetToken;
import com.jeevan.smart_notes_api.entity.RefreshToken;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.repository.EmailVerificationTokenRepository;
import com.jeevan.smart_notes_api.repository.NoteRepository;
import com.jeevan.smart_notes_api.repository.PasswordResetTokenRepository;
import com.jeevan.smart_notes_api.entity.Notification;
import com.jeevan.smart_notes_api.entity.UserSettings;
import com.jeevan.smart_notes_api.repository.NotificationRepository;
import com.jeevan.smart_notes_api.repository.UserSettingsRepository;
import com.jeevan.smart_notes_api.repository.UserRepository;
import com.jeevan.smart_notes_api.security.jwt.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;


@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository repository;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Autowired
    private EmailVerificationTokenRepository emailVerificationTokenRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private GoogleTokenVerifier googleTokenVerifier;

    private BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder(12);

    /**
     * Register a new user with email and password, then send OTP email.
     */
    @Transactional
    public String register(RegisterRequest request) {

        if (repository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("An account with this email already exists");
        }

        // Generate a unique username if one already exists
        String username = request.getUsername();
        if (repository.existsByUsername(username)) {
            username = username + "_" + System.currentTimeMillis() % 10000;
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");
        user.setAuthProvider(User.AuthProvider.LOCAL);
        user.setEmailVerified(false);

        User savedUser = repository.save(user);

        log.info("[AuthService] New user registered: {} ({})", savedUser.getUsername(), savedUser.getEmail());

        // Generate 6 digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));
        
        EmailVerificationToken verificationToken = new EmailVerificationToken(
                otp,
                savedUser.getEmail(),
                LocalDateTime.now().plusMinutes(15)
        );
        emailVerificationTokenRepository.save(verificationToken);

        // Initialize user settings
        UserSettings settings = new UserSettings(savedUser.getId());
        userSettingsRepository.save(settings);

        // Create welcome notification
        Notification welcomeNotification = new Notification(
                savedUser.getId(),
                "Welcome to Lumina!",
                "We're excited to have you here. Start by exploring the workspace.",
                "system"
        );
        notificationRepository.save(welcomeNotification);

        // Send verification email
        try {
            emailService.sendVerificationEmail(savedUser.getEmail(), otp);
        } catch (Exception e) {
            log.warn("[AuthService] Failed to send verification email to {}: {}", savedUser.getEmail(), e.getMessage());
        }

        return "Registration successful. Please verify your email with the OTP sent to you.";
    }

    /**
     * Verify email with OTP.
     */
    @Transactional
    public AuthResponse verifyEmail(String email, String otp) {
        EmailVerificationToken token = emailVerificationTokenRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Verification token not found or already verified"));

        if (!token.getToken().equals(otp)) {
            throw new RuntimeException("Invalid OTP code");
        }

        if (token.isExpired()) {
            emailVerificationTokenRepository.delete(token);
            throw new RuntimeException("OTP code has expired. Please register again or request a new code.");
        }

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmailVerified(true);
        user = repository.save(user);
        
        emailVerificationTokenRepository.delete(token);
        
        log.info("[AuthService] User email verified: {}", email);

        // Auto-login: generate tokens
        String accessToken = jwtService.generateToken(user.getEmail());
        String refreshToken = refreshTokenService.createRefreshToken(user.getEmail()).getToken();
        
        // Send welcome email asynchronously (best effort)
        try {
            emailService.sendWelcomeEmail(user.getEmail(), user.getUsername());
        } catch (Exception e) {
            log.warn("[AuthService] Failed to send welcome email to {}: {}", user.getEmail(), e.getMessage());
        }

        return AuthResponse.of(accessToken, refreshToken, user);
    }

    /**
     * Authenticate a user with email and password.
     */
    public AuthResponse verify(LoginRequest request) {

        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getEmail(),
                                    request.getPassword()
                            )
                    );

            if (authentication.isAuthenticated()) {

                User user = repository.findByEmail(request.getEmail())
                        .orElseThrow(() -> new RuntimeException("User not found"));

                if (!user.isEmailVerified()) {
                    throw new RuntimeException("EMAIL_NOT_VERIFIED");
                }

                String accessToken = jwtService.generateToken(request.getEmail());
                String refreshToken = refreshTokenService.createRefreshToken(request.getEmail()).getToken();

                log.info("[AuthService] User logged in: {}", request.getEmail());

                return AuthResponse.of(accessToken, refreshToken, user);
            }
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password");
        }

        throw new RuntimeException("Invalid email or password");
    }

    /**
     * Authenticate via Google OAuth. Creates the user if first-time login.
     */
    public AuthResponse googleLogin(String credential) {

        GoogleTokenVerifier.GoogleUserInfo googleUser = googleTokenVerifier.verify(credential);

        // Check if user already exists
        User user = repository.findByEmail(googleUser.getEmail()).orElse(null);

        if (user == null) {
            // First-time Google sign-in: create the user
            user = new User();
            user.setEmail(googleUser.getEmail());
            user.setUsername(generateUsernameFromEmail(googleUser.getEmail(), googleUser.getName()));
            user.setPassword(null); // Google users have no password
            user.setRole("ROLE_USER");
            user.setAuthProvider(User.AuthProvider.GOOGLE);
            user.setEmailVerified(true); // Google emails are verified
            user.setProfileImageUrl(googleUser.getPictureUrl());

            user = repository.save(user);

            log.info("[AuthService] New Google user created: {} ({})", user.getUsername(), user.getEmail());

            // Send welcome email
            try {
                emailService.sendWelcomeEmail(user.getEmail(), user.getUsername());
            } catch (Exception e) {
                log.warn("[AuthService] Failed to send welcome email to {}: {}", user.getEmail(), e.getMessage());
            }

            // Initialize user settings
            UserSettings settings = new UserSettings(user.getId());
            userSettingsRepository.save(settings);

            // Create welcome notification
            Notification welcomeNotification = new Notification(
                    user.getId(),
                    "Welcome to Lumina!",
                    "We're excited to have you here. Start by exploring the workspace.",
                    "system"
            );
            notificationRepository.save(welcomeNotification);
        } else {
            // Existing user: update profile image if changed
            if (googleUser.getPictureUrl() != null && !googleUser.getPictureUrl().equals(user.getProfileImageUrl())) {
                user.setProfileImageUrl(googleUser.getPictureUrl());
                user = repository.save(user);
            }

            log.info("[AuthService] Google user logged in: {}", user.getEmail());
        }

        String accessToken = jwtService.generateToken(user.getEmail());
        String refreshToken = refreshTokenService.createRefreshToken(user.getEmail()).getToken();

        return AuthResponse.of(accessToken, refreshToken, user);
    }

    /**
     * Refresh an expired access token using a valid refresh token.
     */
    public AuthResponse refreshToken(String requestToken) {

        RefreshToken refreshToken =
                refreshTokenService.verifyRefreshToken(requestToken);

        User user = repository.findByEmail(refreshToken.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String accessToken = jwtService.generateToken(refreshToken.getEmail());

        return AuthResponse.of(accessToken, refreshToken.getToken(), user);
    }

    /**
     * Logout: delete the refresh token.
     */
    public String logout(String refreshToken) {

        refreshTokenService.deleteByToken(refreshToken);

        return "Logged out successfully";
    }

    /**
     * Initiate forgot-password flow: generate reset token and send email.
     */
    @Transactional
    public void forgotPassword(String email) {

        User user = repository.findByEmail(email).orElse(null);

        if (user == null) {
            // Don't reveal whether an email exists — always return success
            log.info("[AuthService] Forgot password requested for non-existent email: {}", email);
            return;
        }

        if (user.getAuthProvider() == User.AuthProvider.GOOGLE) {
            // Google users don't have passwords to reset
            log.info("[AuthService] Forgot password requested for Google-auth user: {}", email);
            // Still return success to not reveal auth provider
            return;
        }

        // Delete any existing reset tokens for this email
        passwordResetTokenRepository.deleteByEmail(email);

        // Generate a new reset token (valid for 15 minutes)
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(
                token,
                email,
                LocalDateTime.now().plusMinutes(15)
        );
        passwordResetTokenRepository.save(resetToken);

        log.info("[AuthService] Password reset token generated for: {}", email);

        // Send the reset email
        emailService.sendPasswordResetEmail(email, token);
    }

    /**
     * Reset password using a valid reset token.
     */
    @Transactional
    public void resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired reset token"));

        if (resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken);
            throw new RuntimeException("Reset token has expired. Please request a new one.");
        }

        User user = repository.findByEmail(resetToken.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(encoder.encode(newPassword));
        repository.save(user);

        // Clean up the used token
        passwordResetTokenRepository.deleteByEmail(resetToken.getEmail());

        log.info("[AuthService] Password reset successful for: {}", user.getEmail());
    }

    /**
     * Change password for an authenticated user.
     */
    public void changePassword(String email, String currentPassword, String newPassword) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getAuthProvider() == User.AuthProvider.GOOGLE) {
            throw new RuntimeException("Google-authenticated users cannot change their password here");
        }

        if (!encoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(encoder.encode(newPassword));
        repository.save(user);

        log.info("[AuthService] Password changed for: {}", email);
    }

    /**
     * Get the currently authenticated user's profile.
     */
    public UserResponse getCurrentUser(String email) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserResponse.from(user);
    }

    /**
     * Delete a user account and all associated data (notes, tokens).
     */
    @Transactional
    public void deleteAccount(String email) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Delete all user's notes
        noteRepository.deleteByUserId(user.getId());

        // Delete all refresh tokens
        refreshTokenService.deleteByEmail(email);

        // Delete any password reset tokens
        passwordResetTokenRepository.deleteByEmail(email);

        // Delete the user
        repository.delete(user);

        log.info("[AuthService] Account deleted for: {}", email);
    }

    /**
     * Generate a unique username from email/name for Google OAuth users.
     */
    private String generateUsernameFromEmail(String email, String name) {
        if (name != null && !name.isBlank()) {
            String baseUsername = name.toLowerCase().replaceAll("[^a-z0-9]", "");
            if (!baseUsername.isBlank() && !repository.existsByUsername(baseUsername)) {
                return baseUsername;
            }
            // Add random suffix if username taken
            String candidate = baseUsername + "_" + (System.currentTimeMillis() % 10000);
            if (!repository.existsByUsername(candidate)) {
                return candidate;
            }
        }

        // Fallback: use email prefix
        String prefix = email.split("@")[0].toLowerCase().replaceAll("[^a-z0-9]", "");
        if (!repository.existsByUsername(prefix)) {
            return prefix;
        }
        return prefix + "_" + (System.currentTimeMillis() % 10000);
    }
}