package com.jeevan.smart_notes_api.controller;

import com.jeevan.smart_notes_api.dto.ImageDto;
import com.jeevan.smart_notes_api.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "*")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping
    public ResponseEntity<List<ImageDto>> getUserImages(Principal principal) {
        return ResponseEntity.ok(imageService.getUserImages(principal.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id, Principal principal) {
        imageService.deleteImage(id, principal.getName());
        return ResponseEntity.ok().build();
    }
}
