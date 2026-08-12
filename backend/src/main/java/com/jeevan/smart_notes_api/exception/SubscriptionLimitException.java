package com.jeevan.smart_notes_api.exception;

public class SubscriptionLimitException extends RuntimeException {
    public SubscriptionLimitException(String message) {
        super(message);
    }
}
