package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.dto.ImageDto;
import com.jeevan.smart_notes_api.entity.GeneratedImage;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.repository.GeneratedImageRepository;
import com.jeevan.smart_notes_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {

    private final GeneratedImageRepository imageRepository;
    private final UserRepository userRepository;

    public ImageService(GeneratedImageRepository imageRepository, UserRepository userRepository) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
    }

    public List<ImageDto> getUserImages(String email) {
        return imageRepository.findByUserEmailOrderByCreatedAtDesc(email).stream()
                .map(img -> new ImageDto(img.getId(), img.getPrompt(), img.getImageUrl(), img.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public void saveImage(String email, String prompt, String imageUrl) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        GeneratedImage image = new GeneratedImage(prompt, imageUrl, user);
        imageRepository.save(image);
    }

    public void deleteImage(Long imageId, String email) {
        GeneratedImage image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));
        
        if (!image.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }
        
        imageRepository.delete(image);
    }
}
