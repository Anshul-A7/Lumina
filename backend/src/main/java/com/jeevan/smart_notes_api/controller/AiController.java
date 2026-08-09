package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.service.AiService;
import com.jeevan.smart_notes_api.util.FileExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/ai")
public class AiController {

    @Autowired
    private AiService service;

    @PostMapping("/summarize")
    public String summarize(
            @RequestBody String text, Authentication auth) {

        return service.summarize(text, auth.getName());
    }

    @PostMapping("/title")
    public String generateTitle(
            @RequestBody String text, Authentication auth) {

        return service.generateTitle(text, auth.getName());
    }

    @PostMapping(
            value = "/file-summary",
            consumes = "multipart/form-data"
    )
    public String summarizeFile(
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("prompt") String prompt, Authentication auth) {

        try {
            return service.summarizeWithFiles(files, prompt, auth.getName());
        } catch (Exception e) {
            if (e instanceof com.jeevan.smart_notes_api.exception.RateLimitExceededException) {
                throw e;
            }
            throw new RuntimeException(
                    "File summarization failed", e
            );
        }
    }

    @PostMapping(
            value = "/file-title",
            consumes = "multipart/form-data"
    )
    public String generateFileTitle(
            @RequestParam("file") MultipartFile file, Authentication auth) {

        try {

            String text =
                    FileExtractor.extractText(file);

            return service.generateTitle(text, auth.getName());

        } catch (Exception e) {
            if (e instanceof com.jeevan.smart_notes_api.exception.RateLimitExceededException) {
                throw e;
            }
            throw new RuntimeException(
                    "File title generation failed"
            );
        }
    }

    @PostMapping("/chat")
    public String chat(
            @RequestBody String history, Authentication auth) {
        return service.chat(history, auth.getName());
    }

    @PostMapping("/edit-document")
    public java.util.Map<String, String> editDocument(
            @RequestBody java.util.Map<String, String> body,
            Authentication auth) {

        String content = body.get("content");
        String instruction = body.get("instruction");
        String email = (auth != null) ? auth.getName() : null;

        String updated = service.editDocument(content, instruction, email);
        java.util.Map<String, String> response = new java.util.HashMap<>();
        response.put("content", updated);
        return response;
    }
}