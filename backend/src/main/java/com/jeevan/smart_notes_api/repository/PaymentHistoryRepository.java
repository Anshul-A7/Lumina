package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, Long> {
    Optional<PaymentHistory> findByRazorpayPaymentId(String razorpayPaymentId);
}
