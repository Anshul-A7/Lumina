package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.WebhookEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WebhookEventRepository extends JpaRepository<WebhookEvent, Long> {
    Optional<WebhookEvent> findByRazorpayEventId(String razorpayEventId);
}
