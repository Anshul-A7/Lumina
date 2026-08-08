package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByEmail(String email);

    void deleteByToken(String token);

    void deleteByEmail(String email);
}