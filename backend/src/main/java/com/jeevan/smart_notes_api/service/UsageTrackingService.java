package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.entity.Subscription;
import com.jeevan.smart_notes_api.entity.UsageTracker;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.exception.SubscriptionLimitException;
import com.jeevan.smart_notes_api.repository.SubscriptionRepository;
import com.jeevan.smart_notes_api.repository.UsageTrackerRepository;
import com.jeevan.smart_notes_api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class UsageTrackingService {

    private final UsageTrackerRepository usageTrackerRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public UsageTrackingService(UsageTrackerRepository usageTrackerRepository,
                                SubscriptionRepository subscriptionRepository,
                                UserRepository userRepository,
                                NotificationService notificationService) {
        this.usageTrackerRepository = usageTrackerRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    private UsageTracker getOrCreateTracker(Long userId) {
        LocalDate today = LocalDate.now();
        return usageTrackerRepository.findByUserIdAndUsageDate(userId, today)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));
                    UsageTracker tracker = new UsageTracker(user, today);
                    return usageTrackerRepository.save(tracker);
                });
    }

    private Subscription getSubscription(Long userId) {
        return subscriptionRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
    }

    private void handleLimitExceeded(Long userId, String title, String message) {
        notificationService.createNotification(userId, title, message, "limit");
        throw new SubscriptionLimitException(message);
    }

    @Transactional
    public void checkAndIncrementPdfGeneration(Long userId) {
        Subscription sub = getSubscription(userId);
        UsageTracker tracker = getOrCreateTracker(userId);

        if (tracker.getPdfsGenerated() >= sub.getDailyPdfGenerationLimit()) {
            String message = switch (sub.getPlan()) {
                case FREE -> "You've reached your limit of 5 PDF generations today. Upgrade to Plus for 25/day or Pro for 100/day.";
                case PLUS -> "You've reached your limit of 25 PDF generations today. Your limit will reset at midnight.";
                case PRO -> "You've hit the maximum 100 PDF generations for today. Your limit will reset at midnight.";
            };
            handleLimitExceeded(userId, "PDF Generation Limit Reached", message);
        }

        tracker.setPdfsGenerated(tracker.getPdfsGenerated() + 1);
        usageTrackerRepository.save(tracker);
    }

    @Transactional
    public void checkAndIncrementImageGeneration(Long userId) {
        Subscription sub = getSubscription(userId);
        UsageTracker tracker = getOrCreateTracker(userId);

        if (tracker.getImagesGenerated() >= sub.getDailyImageGenerationLimit()) {
            String message = switch (sub.getPlan()) {
                case FREE -> "You've generated 10 images today, reaching your Free limit. Upgrade to Plus to generate 50 daily.";
                case PLUS -> "You've reached your 50 image limit for today. Your limit will reset at midnight.";
                case PRO -> "You've reached your maximum of 100 image generations for today. The limit resets at midnight.";
            };
            handleLimitExceeded(userId, "Image Generation Limit Reached", message);
        }

        tracker.setImagesGenerated(tracker.getImagesGenerated() + 1);
        usageTrackerRepository.save(tracker);
    }

    @Transactional
    public void checkAndIncrementPdfAttachment(Long userId, int count) {
        Subscription sub = getSubscription(userId);
        UsageTracker tracker = getOrCreateTracker(userId);

        if (tracker.getPdfsAttached() + count > sub.getDailyPdfAttachmentLimit()) {
            String message = switch (sub.getPlan()) {
                case FREE -> "You've attached your maximum of 10 PDFs today. Upgrade to Plus for unlimited attachments.";
                default -> "You've reached your PDF attachment limit.";
            };
            handleLimitExceeded(userId, "PDF Attachment Limit Reached", message);
        }

        tracker.setPdfsAttached(tracker.getPdfsAttached() + count);
        usageTrackerRepository.save(tracker);
    }

    @Transactional
    public void checkAndIncrementImageAttachment(Long userId, int count) {
        Subscription sub = getSubscription(userId);
        UsageTracker tracker = getOrCreateTracker(userId);

        if (tracker.getImagesAttached() + count > sub.getDailyImageAttachmentLimit()) {
            String message = switch (sub.getPlan()) {
                case FREE -> "You've attached your maximum of 15 images today. Upgrade to Plus for unlimited attachments.";
                default -> "You've reached your Image attachment limit.";
            };
            handleLimitExceeded(userId, "Image Attachment Limit Reached", message);
        }

        tracker.setImagesAttached(tracker.getImagesAttached() + count);
        usageTrackerRepository.save(tracker);
    }

    @Transactional
    public void checkAndIncrementAiRequest(Long userId) {
        Subscription sub = getSubscription(userId);
        UsageTracker tracker = getOrCreateTracker(userId);

        if (tracker.getAiRequests() >= sub.getDailyAiRequestLimit()) {
            String message = switch (sub.getPlan()) {
                case FREE -> "You've reached your limit of 50 AI requests today. Upgrade to Plus to continue chatting.";
                case PLUS -> "You've reached your daily limit of 500 AI requests. Your limit will reset at midnight.";
                case PRO -> "You've reached your maximum AI requests limit for today.";
            };
            handleLimitExceeded(userId, "AI Request Limit Reached", message);
        }

        tracker.setAiRequests(tracker.getAiRequests() + 1);
        usageTrackerRepository.save(tracker);
    }

    @Transactional(readOnly = true)
    public void checkWorkspaceLimit(Long userId, int currentWorkspaceCount) {
        Subscription sub = getSubscription(userId);

        if (currentWorkspaceCount >= sub.getMaxWorkspaces()) {
            String message = switch (sub.getPlan()) {
                case FREE -> "Workspace Creation Disabled: Workspaces are a premium feature. Please upgrade to the Plus plan to collaborate with teams.";
                case PLUS -> "Workspace Limit Reached: Your Plus plan allows up to 3 workspaces. Please delete an existing workspace to create a new one.";
                case PRO -> "You've reached your maximum workspaces limit.";
            };
            handleLimitExceeded(userId, "Workspace Limit Reached", message);
        }
    }

    @Transactional(readOnly = true)
    public void checkWorkspaceMemberLimit(Long userId, int currentMemberCount) {
        Subscription sub = getSubscription(userId);

        if (currentMemberCount >= sub.getMaxWorkspaceMembers()) {
            String message = switch (sub.getPlan()) {
                case FREE -> "Workspace Creation Disabled: Workspaces are a premium feature.";
                case PLUS -> "Invitation Limit Reached: Your Plus plan allows a maximum of 5 members per workspace.";
                case PRO -> "You've reached your maximum workspace member limit.";
            };
            handleLimitExceeded(userId, "Workspace Member Limit Reached", message);
        }
    }
}
