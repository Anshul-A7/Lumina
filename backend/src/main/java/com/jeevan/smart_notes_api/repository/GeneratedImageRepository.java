package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.GeneratedImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeneratedImageRepository extends JpaRepository<GeneratedImage, Long> {
    List<GeneratedImage> findByUserEmailOrderByCreatedAtDesc(String email);
}
