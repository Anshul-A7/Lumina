package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.entity.Notification;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.entity.UserSettings;
import com.jeevan.smart_notes_api.repository.NotificationRepository;
import com.jeevan.smart_notes_api.repository.UserRepository;
import com.jeevan.smart_notes_api.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public void updateProfileName(String email, String newName) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(newName);
        userRepository.save(user);
    }

    public UserSettings getSettings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return userSettingsRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    UserSettings settings = new UserSettings(user.getId());
                    return userSettingsRepository.save(settings);
                });
    }

    public UserSettings updateSettings(String email, UserSettings newSettings) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        UserSettings settings = userSettingsRepository.findByUserId(user.getId())
                .orElse(new UserSettings(user.getId()));
                
        settings.setTheme(newSettings.getTheme());
        settings.setDefaultModel(newSettings.getDefaultModel());
        settings.setAutoTitle(newSettings.isAutoTitle());
        
        return userSettingsRepository.save(settings);
    }

    public List<Notification> getNotifications(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        return notificationRepository.findUnreadByUserId(user.getId());
    }

    public void markAllNotificationsAsRead(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        List<Notification> unread = notificationRepository.findUnreadByUserId(user.getId());
        for (Notification n : unread) {
            n.setRead(true);
        }
        notificationRepository.saveAll(unread);
    }
}
