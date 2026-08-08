package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    void deleteByEmail(String email);

    void deleteAllByExpiryDateBefore(LocalDateTime dateTime);
}
