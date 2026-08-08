package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.service.PdfService;
import com.jeevan.smart_notes_api.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pdf")
public class PdfController {

    @Autowired
    private PdfService pdfService;

    @Autowired
    private SubscriptionService subscriptionService;

    /**
     * POST /pdf/generate — Generate a PDF from AI content.
     * Body: { "content": "markdown content", "title": "Document Title", "sessionId": 1 }
     */
    @PostMapping("/generate")
    public ResponseEntity<?> generatePdf(
            @RequestBody Map<String, Object> body,
            Authentication auth) {

        String email = auth.getName();

        // Check rate limit
        if (!subscriptionService.canPerformAction(email, "pdf_generate")) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Daily PDF generation limit reached. Upgrade your plan for more.");
            error.put("upgradeUrl", "/dashboard/get-plus");
            int remaining = subscriptionService.getRemainingQuota(email, "pdf_generate");
            error.put("remaining", remaining);
            return ResponseEntity.status(429).body(error);
        }

        String content = (String) body.get("content");
        String title = (String) body.getOrDefault("title", "AI Response");
        Long sessionId = body.get("sessionId") != null ? Long.valueOf(body.get("sessionId").toString()) : null;

        if (content == null || content.isBlank()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Content is required for PDF generation.");
            return ResponseEntity.badRequest().body(error);
        }

        byte[] pdfBytes = pdfService.generatePdf(content, title, email, sessionId);

        // Increment usage
        subscriptionService.incrementUsage(email, "pdf_generate");

        // Return PDF as binary download
        String sanitizedTitle = title.replaceAll("[^a-zA-Z0-9\\-_\\s]", "").replaceAll("\\s+", "_");
        if (sanitizedTitle.length() > 50) sanitizedTitle = sanitizedTitle.substring(0, 50);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + sanitizedTitle + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdfBytes.length)
                .body(pdfBytes);
    }

    /**
     * GET /pdf/list — List all generated PDFs for the user.
     */
    @GetMapping("/list")
    public ResponseEntity<List<Map<String, Object>>> listPdfs(Authentication auth) {
        String email = auth.getName();
        List<Map<String, Object>> pdfs = pdfService.getUserPdfs(email);
        return ResponseEntity.ok(pdfs);
    }

    /**
     * GET /pdf/download/{id} — Download a specific PDF.
     */
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadPdf(
            @PathVariable Long id,
            Authentication auth) {

        String email = auth.getName();
        byte[] pdfBytes = pdfService.downloadPdf(id, email);
        String title = pdfService.getPdfTitle(id, email);
        String sanitizedTitle = title.replaceAll("[^a-zA-Z0-9\\-_\\s]", "").replaceAll("\\s+", "_");

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + sanitizedTitle + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdfBytes.length)
                .body(pdfBytes);
    }

    /**
     * DELETE /pdf/{id} — Delete a generated PDF.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePdf(
            @PathVariable Long id,
            Authentication auth) {

        String email = auth.getName();
        pdfService.deletePdf(id, email);

        Map<String, String> result = new HashMap<>();
        result.put("message", "PDF deleted successfully");
        return ResponseEntity.ok(result);
    }
}
