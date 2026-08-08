package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.entity.RefreshToken;
import com.jeevan.smart_notes_api.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository repository;

    public RefreshToken createRefreshToken(String email) {
        RefreshToken token = repository.findByEmail(email).orElse(new RefreshToken());

        token.setEmail(email);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(
                new Date(System.currentTimeMillis()
                        + 1000L * 60 * 60 * 24 * 7)
        );

        return repository.save(token);
    }

    public boolean isValid(RefreshToken token) {
        return token.getExpiryDate().after(new Date());
    }

    @Transactional
    public void deleteByToken(String token) {
        repository.deleteByToken(token);
    }

    @Transactional
    public void deleteByEmail(String email) {
        repository.deleteByEmail(email);
    }

    public RefreshToken verifyRefreshToken(String token) {

        RefreshToken refreshToken = repository.findByToken(token)
                .orElseThrow(() ->
                        new RuntimeException("Refresh token not found"));

        if (!isValid(refreshToken)) {

            repository.delete(refreshToken);

            throw new RuntimeException("Refresh token expired");
        }

        return refreshToken;
    }
}