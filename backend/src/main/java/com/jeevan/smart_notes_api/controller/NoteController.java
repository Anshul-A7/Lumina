package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.dto.request.NoteRequest;
import com.jeevan.smart_notes_api.dto.response.NoteResponse;
import com.jeevan.smart_notes_api.entity.Note;
import com.jeevan.smart_notes_api.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteService service;

    @PostMapping
    public Note create(@Valid
                           @RequestBody NoteRequest request, Authentication authentication) {
        return service.create(
                request,
                authentication.getName()
        );
    }

    @GetMapping
    public List<NoteResponse> getAll(
            Authentication authentication) {

        return service.getAll(
                authentication.getName()
        );
    }
    @PutMapping("/{id}")
    public Note update(
            @PathVariable Long id,
            @Valid @RequestBody NoteRequest request,
            Authentication authentication) {

        return service.update(
                id,
                request,
                authentication.getName()
        );
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id,
            Authentication authentication) {

        service.delete(
                id,
                authentication.getName()
        );
    }

    @GetMapping("/{id}")
    public NoteResponse getById(
            @PathVariable Long id,
            Authentication authentication) {

        return service.getById(
                id,
                authentication.getName()
        );
    }
    @GetMapping("/search/{title}")
    public List<NoteResponse> search(
            @PathVariable String title,
            Authentication authentication
    ) {

        return service.search(
                title,
                authentication.getName()
        );
    }

    @GetMapping("/sort")
    public List<NoteResponse> sort(
            @RequestParam String field,
            Authentication authentication) {

        return service.sort(
                field,
                authentication.getName()
        );
    }
    @GetMapping("/pagination")
    public Page<NoteResponse> getNotes(
            @RequestParam int page,
            @RequestParam int size,
            Authentication authentication) {

        return service.getNotes(
                page,
                size,
                authentication.getName()
        );
    }
    @GetMapping("/pagination/sort")
    public Page<NoteResponse> paginationSort(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String field,
            Authentication authentication) {

        return service.paginationSort(
                page,
                size,
                field,
                authentication.getName()
        );
    }
    @GetMapping("/filter")
    public List<NoteResponse> filter(
            @RequestParam String keyword,
            Authentication authentication) {

        return service.filter(
                keyword,
                authentication.getName()
        );
    }
    @GetMapping("/latest")
    public List<NoteResponse> latestNotes(
            Authentication authentication) {

        return service.latestNotes(
                authentication.getName()
        );
    }
    @GetMapping("/my-notes")
    public List<NoteResponse> myNotes(Authentication authentication){
        return service.myNotes(authentication.getName());
    }
    @PostMapping(
            value = "/upload",
            consumes = "multipart/form-data"
    )
    public String uploadFile(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        return service.uploadAndSummarize(
                file,
                authentication.getName()
        );
    }
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadPdf(
            @PathVariable Long id,
            Authentication authentication) {

        byte[] pdf = service.generateNotePdf(
                id,
                authentication.getName()
        );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=note_" + id + ".pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}