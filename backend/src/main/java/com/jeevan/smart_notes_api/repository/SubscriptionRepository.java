package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Optional<Subscription> findByUserEmail(String email);

    Optional<Subscription> findByUserId(Long userId);

    Optional<Subscription> findByRazorpaySubscriptionId(String razorpaySubscriptionId);

    boolean existsByUserEmail(String email);
}
