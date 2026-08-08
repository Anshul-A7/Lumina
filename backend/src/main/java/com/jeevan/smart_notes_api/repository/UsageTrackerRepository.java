package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.UsageTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface UsageTrackerRepository extends JpaRepository<UsageTracker, Long> {

    Optional<UsageTracker> findByUserEmailAndUsageDate(String email, LocalDate usageDate);

    Optional<UsageTracker> findByUserIdAndUsageDate(Long userId, LocalDate usageDate);

    @Modifying
    @Query("DELETE FROM UsageTracker u WHERE u.usageDate < :date")
    void deleteOlderThan(@Param("date") LocalDate date);
}
