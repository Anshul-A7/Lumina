package com.jeevan.smart_notes_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import com.jeevan.smart_notes_api.exception.SubscriptionLimitException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(
            ResourceNotFoundException ex) {

        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleBadCredentials(
            BadCredentialsException ex) {

        return buildErrorResponse("Invalid email or password", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now().toString());
        error.put("status", HttpStatus.BAD_REQUEST.value());

        // Collect all field validation errors
        StringBuilder message = new StringBuilder();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            if (message.length() > 0) message.append(". ");
            message.append(fieldError.getDefaultMessage());
        }
        error.put("message", message.toString());

        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        error.put("errors", fieldErrors);

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SubscriptionLimitException.class)
    public ResponseEntity<Map<String, Object>> handleSubscriptionLimitException(
            SubscriptionLimitException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(RateLimitExceededException.class)
    public ResponseEntity<Map<String, Object>> handleRateLimitExceeded(
            RateLimitExceededException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.TOO_MANY_REQUESTS);
    }

    @ExceptionHandler(org.springframework.ai.retry.NonTransientAiException.class)
    public ResponseEntity<Map<String, Object>> handleNonTransientAiException(
            org.springframework.ai.retry.NonTransientAiException ex) {
        String msg = ex.getMessage();
        if (msg != null && (msg.contains("429") || msg.contains("Quota exceeded") || msg.contains("RESOURCE_EXHAUSTED"))) {
            return buildErrorResponse("Gemini API rate limit exceeded. Please wait a minute before sending another request.", HttpStatus.TOO_MANY_REQUESTS);
        }
        return buildErrorResponse("AI Service Error: " + (msg != null ? msg : "Unable to process request"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(org.springframework.ai.retry.TransientAiException.class)
    public ResponseEntity<Map<String, Object>> handleTransientAiException(
            org.springframework.ai.retry.TransientAiException ex) {
        return buildErrorResponse("AI Service is temporarily busy. Please try again in a few seconds.", HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(
            RuntimeException ex) {
        ex.printStackTrace();
        return buildErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneral(
            Exception ex) {
        
        ex.printStackTrace();

        return buildErrorResponse(
                "An unexpected error occurred. Please try again.",
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    private ResponseEntity<Map<String, Object>> buildErrorResponse(String message, HttpStatus status) {
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now().toString());
        error.put("status", status.value());
        error.put("message", message);
        return new ResponseEntity<>(error, status);
    }
}