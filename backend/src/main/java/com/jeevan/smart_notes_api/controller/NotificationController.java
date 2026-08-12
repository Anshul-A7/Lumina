package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.entity.Notification;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.security.UserDetails.UserPrincipal;
import com.jeevan.smart_notes_api.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/user/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getUserNotifications(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userPrincipal.getUser();
        List<Notification> notifications = notificationService.getUserNotifications(user.getId());
        return ResponseEntity.ok(notifications);
    }

    @PostMapping("/seed-demo")
    public ResponseEntity<Void> seedDemoNotifications(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userPrincipal.getUser();
        Long userId = user.getId();
        
        List<String[]> msgs = Arrays.asList(
            new String[]{"PDF Generation Limit", "You've reached your limit of 5 PDF generations today. Upgrade to Plus for 25/day or Pro for 100/day."},
            new String[]{"Image Generation Limit", "You've generated 10 images today, reaching your Free limit. Upgrade to Plus to generate 50 daily."},
            new String[]{"PDF Attachment Limit", "You've attached your maximum of 10 PDFs today. Upgrade to Plus for unlimited attachments."},
            new String[]{"Image Attachment Limit", "You've attached your maximum of 15 images today. Upgrade to Plus for unlimited attachments."},
            new String[]{"AI Request Limit", "You've reached your limit of 50 AI requests today. Upgrade to Plus to continue chatting."},
            new String[]{"Workspace Limit Reached", "Workspace Creation Disabled: Workspaces are a premium feature. Please upgrade to the Plus plan to collaborate with teams."},
            new String[]{"Invitation Limit Reached", "Workspace Creation Disabled: Workspaces are a premium feature."},
            new String[]{"PDF Generation Limit", "You've reached your limit of 25 PDF generations today. Your limit will reset at midnight."},
            new String[]{"Image Generation Limit", "You've reached your 50 image limit for today. Your limit will reset at midnight."},
            new String[]{"PDF Attachment Limit", "You've reached your PDF attachment limit."},
            new String[]{"Image Attachment Limit", "You've reached your Image attachment limit."},
            new String[]{"AI Request Limit", "You've reached your daily limit of 500 AI requests. Your limit will reset at midnight."},
            new String[]{"Workspace Limit Reached", "Workspace Limit Reached: Your Plus plan allows up to 3 workspaces. Please delete an existing workspace to create a new one."},
            new String[]{"Invitation Limit Reached", "Invitation Limit Reached: Your Plus plan allows a maximum of 5 members per workspace."},
            new String[]{"PDF Generation Limit", "You've hit the maximum 100 PDF generations for today. Your limit will reset at midnight."},
            new String[]{"Image Generation Limit", "You've reached your maximum of 100 image generations for today. The limit resets at midnight."},
            new String[]{"AI Request Limit", "You've reached your maximum AI requests limit for today."},
            new String[]{"Workspace Limit Reached", "You've reached your maximum workspaces limit."},
            new String[]{"Invitation Limit Reached", "You've reached your maximum workspace member limit."},
            new String[]{"Pro Feature Alert", "Access advanced models with the Pro plan."},
            new String[]{"Free Tier Notice", "You are currently on the Free tier. Upgrade for more benefits."},
            new String[]{"Security Alert", "New login detected on a Windows device."},
            new String[]{"System Update", "Lumina has been updated to version 2.1 with faster response times."},
            new String[]{"Workspace Activity", "A new document was added to your shared workspace."},
            new String[]{"Welcome to Lumina", "Thank you for joining Lumina! Enjoy your AI assistant."},
            new String[]{"Tips & Tricks", "Did you know you can use the @ symbol to reference past snippets?"},
            new String[]{"Account Notice", "Your Plus subscription will renew in 3 days."},
            new String[]{"Storage Limit", "You've used 80% of your Free tier storage limit. Consider upgrading."},
            new String[]{"New Feature Available", "You can now export sessions to HTML directly from the dropdown menu."},
            new String[]{"Document Processed", "Your PDF 'Annual_Report.pdf' has been successfully parsed and is ready for queries."}
        );

        for (String[] m : msgs) {
            notificationService.createNotification(userId, m[0], m[1], "system");
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userPrincipal.getUser();
        List<Notification> notifications = notificationService.getUnreadNotifications(user.getId());
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable Long id) {
        User user = userPrincipal.getUser();
        notificationService.markAsRead(id, user.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/read")
    public ResponseEntity<Void> markAllAsRead(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        User user = userPrincipal.getUser();
        notificationService.markAllAsRead(user.getId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable Long id) {
        User user = userPrincipal.getUser();
        notificationService.deleteNotification(id, user.getId());
        return ResponseEntity.noContent().build();
    }
}
