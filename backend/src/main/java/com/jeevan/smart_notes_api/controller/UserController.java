package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.entity.Notification;
import com.jeevan.smart_notes_api.entity.UserSettings;
import com.jeevan.smart_notes_api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/profile/name")
    public ResponseEntity<Map<String, String>> updateProfileName(
            Authentication authentication,
            @RequestBody Map<String, String> request) {
        String email = authentication.getName();
        String newName = request.get("name");
        userService.updateProfileName(email, newName);
        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
    }

    @GetMapping("/settings")
    public ResponseEntity<UserSettings> getSettings(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getSettings(email));
    }

    @PutMapping("/settings")
    public ResponseEntity<UserSettings> updateSettings(
            Authentication authentication,
            @RequestBody UserSettings settings) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.updateSettings(email, settings));
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotifications(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getNotifications(email));
    }

    @PutMapping("/notifications/read")
    public ResponseEntity<Map<String, String>> markNotificationsAsRead(Authentication authentication) {
        String email = authentication.getName();
        userService.markAllNotificationsAsRead(email);
        return ResponseEntity.ok(Map.of("message", "Notifications marked as read"));
    }
}
