package com.jeevan.smart_notes_api.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

/**
 * Email delivery service using Spring Mail and Gmail SMTP.
 */
@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Value("${mail.from-name:Lumina}")
    private String fromName;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Sends a password reset email with a clickable link containing the reset token.
     */
    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        String resetLink = frontendUrl + "/reset-password?token=" + resetToken;
        String subject = "Reset Your Lumina Password";
        String htmlBody = buildPasswordResetHtml(resetLink);
        sendEmail(toEmail, subject, htmlBody);
    }

    /**
     * Sends a welcome email after successful registration.
     */
    public void sendWelcomeEmail(String toEmail, String username) {
        String subject = "Welcome to Lumina — Your Workspace Awaits";
        String htmlBody = buildWelcomeHtml(username);
        sendEmail(toEmail, subject, htmlBody);
    }

    /**
     * Sends an email verification OTP.
     */
    public void sendVerificationEmail(String toEmail, String otp) {
        String subject = "Verify Your Lumina Account";
        String htmlBody = buildVerificationHtml(otp);
        sendEmail(toEmail, subject, htmlBody);
    }

    /**
     * Sends a simple text message.
     */
    public void sendSimpleMessage(String to, String subject, String text) {
        sendEmail(to, subject, text.replace("\n", "<br>"));
    }

    /**
     * Core email sending method using Spring Mail (JavaMailSender).
     * Gracefully degrades if email is not configured.
     */
    private void sendEmail(String to, String subject, String htmlBody) {
        if (fromEmail == null || fromEmail.isBlank()) {
            log.warn("[EmailService] spring.mail.username is not configured. Skipping email to '{}'. Subject: '{}'", to, subject);
            log.info("[EmailService] To enable email delivery, set GMAIL_USERNAME and GMAIL_APP_PASSWORD.");
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, fromName);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // true indicates HTML content

            mailSender.send(message);
            log.info("[EmailService] Email sent successfully to '{}'. Subject: '{}'.", to, subject);
        } catch (MessagingException | UnsupportedEncodingException e) {
            log.error("[EmailService] Exception while sending email to '{}': {}", to, e.getMessage(), e);
        }
    }

    /**
     * Builds the HTML email body for password reset.
     */
    private String buildPasswordResetHtml(String resetLink) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0;padding:0;background-color:#FDFBF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                    <div style="max-width:560px;margin:40px auto;background:#FFFFFF;border-radius:16px;border:1px solid rgba(0,0,0,0.08);overflow:hidden;">
                        <div style="background:#0A0A0A;padding:32px 40px;">
                            <h1 style="margin:0;color:#FFFFFF;font-size:20px;font-weight:700;letter-spacing:-0.02em;">Lumina</h1>
                        </div>
                        <div style="padding:40px;">
                            <h2 style="margin:0 0 8px;color:#0A0A0A;font-size:24px;font-weight:600;letter-spacing:-0.02em;">Reset Your Password</h2>
                            <p style="margin:0 0 24px;color:#666660;font-size:14px;line-height:1.6;">
                                We received a request to reset your password. Click the button below to choose a new one. This link expires in 15 minutes.
                            </p>
                            <a href=\"""" + resetLink + """
                            " style="display:inline-block;background:#0A0A0A;color:#FFFFFF;text-decoration:none;padding:12px 32px;border-radius:10px;font-size:14px;font-weight:600;letter-spacing:0.01em;">
                                Reset Password
                            </a>
                            <p style="margin:24px 0 0;color:#999;font-size:12px;line-height:1.5;">
                                If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
                            </p>
                            <hr style="margin:32px 0 16px;border:none;border-top:1px solid rgba(0,0,0,0.06);">
                            <p style="margin:0;color:#BBB;font-size:11px;">
                                This email was sent by Lumina. If the button doesn't work, copy and paste this link into your browser:<br>
                                <span style="color:#666;">""" + resetLink + """
                                </span>
                            </p>
                        </div>
                    </div>
                </body>
                </html>
                """;
    }

    /**
     * Builds the HTML email body for welcome emails.
     */
    private String buildWelcomeHtml(String username) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0;padding:0;background-color:#FDFBF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                    <div style="max-width:560px;margin:40px auto;background:#FFFFFF;border-radius:16px;border:1px solid rgba(0,0,0,0.08);overflow:hidden;">
                        <div style="background:#0A0A0A;padding:32px 40px;">
                            <h1 style="margin:0;color:#FFFFFF;font-size:20px;font-weight:700;letter-spacing:-0.02em;">Lumina</h1>
                        </div>
                        <div style="padding:40px;">
                            <h2 style="margin:0 0 8px;color:#0A0A0A;font-size:24px;font-weight:600;letter-spacing:-0.02em;">Welcome, """ + username + """
                            !</h2>
                            <p style="margin:0 0 24px;color:#666660;font-size:14px;line-height:1.6;">
                                Your Lumina workspace is ready. Start organizing your thoughts, research, and ideas in a distraction-free environment designed for deep work.
                            </p>
                            <a href=\"""" + frontendUrl + """
                            /dashboard" style="display:inline-block;background:#0A0A0A;color:#FFFFFF;text-decoration:none;padding:12px 32px;border-radius:10px;font-size:14px;font-weight:600;">
                                Open Your Workspace
                            </a>
                            <hr style="margin:32px 0 16px;border:none;border-top:1px solid rgba(0,0,0,0.06);">
                            <p style="margin:0;color:#BBB;font-size:11px;">
                                You're receiving this because you created a Lumina account. If this wasn't you, please contact support.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
                """;
    }

    /**
     * Builds the HTML email body for email verification.
     */
    private String buildVerificationHtml(String otp) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0;padding:0;background-color:#FDFBF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                    <div style="max-width:560px;margin:40px auto;background:#FFFFFF;border-radius:16px;border:1px solid rgba(0,0,0,0.08);overflow:hidden;">
                        <div style="background:#0A0A0A;padding:32px 40px;">
                            <h1 style="margin:0;color:#FFFFFF;font-size:20px;font-weight:700;letter-spacing:-0.02em;">Lumina</h1>
                        </div>
                        <div style="padding:40px;">
                            <h2 style="margin:0 0 8px;color:#0A0A0A;font-size:24px;font-weight:600;letter-spacing:-0.02em;">Verify Your Email</h2>
                            <p style="margin:0 0 24px;color:#666660;font-size:14px;line-height:1.6;">
                                Please use the verification code below to verify your email address and complete your registration. This code expires in 15 minutes.
                            </p>
                            <div style="display:inline-block;background:#F9F9F9;padding:16px 32px;border-radius:12px;border:1px solid rgba(0,0,0,0.05);">
                                <h3 style="margin:0;color:#0A0A0A;font-size:32px;font-weight:700;letter-spacing:0.2em;">""" + otp + """
                                </h3>
                            </div>
                            <p style="margin:24px 0 0;color:#999;font-size:12px;line-height:1.5;">
                                If you didn't create an account, you can safely ignore this email.
                            </p>
                            <hr style="margin:32px 0 16px;border:none;border-top:1px solid rgba(0,0,0,0.06);">
                            <p style="margin:0;color:#BBB;font-size:11px;">
                                This email was sent by Lumina.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
                """;
    }
}
