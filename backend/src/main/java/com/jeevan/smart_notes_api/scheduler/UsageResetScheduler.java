package com.jeevan.smart_notes_api.scheduler;

import com.jeevan.smart_notes_api.repository.UsageTrackerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

/**
 * Scheduled task that runs daily at midnight (00:00:00) to clean up old usage records.
 *
 * Usage tracking works by creating a new UsageTracker row for each user per day.
 * When a new day starts, the counters are effectively "reset" because a new row
 * is created with zero values. This scheduler cleans up records older than 30 days
 * to prevent table bloat.
 */
@Component
public class UsageResetScheduler {

    @Autowired
    private UsageTrackerRepository usageTrackerRepository;

    /**
     * Runs at midnight every day (00:00:00).
     * Deletes usage records older than 30 days to keep the table clean.
     * Current-day records are automatically fresh (new rows with zero counts).
     */
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void cleanupOldUsageRecords() {
        LocalDate cutoffDate = LocalDate.now().minusDays(30);
        usageTrackerRepository.deleteOlderThan(cutoffDate);
    }
}
