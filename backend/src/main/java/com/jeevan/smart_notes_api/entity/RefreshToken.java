package com.jeevan.smart_notes_api.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private Date expiryDate;

    public RefreshToken() {
    }

    public RefreshToken(Long id, String token, String email, Date expiryDate) {
        this.id = id;
        this.token = token;
        this.email = email;
        this.expiryDate = expiryDate;
    }

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }


    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setToken(String token) {
        this.token = token;
    }


    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}