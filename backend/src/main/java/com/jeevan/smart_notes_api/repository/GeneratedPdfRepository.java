package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.GeneratedPdf;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GeneratedPdfRepository extends JpaRepository<GeneratedPdf, Long> {

    List<GeneratedPdf> findByUserEmailOrderByCreatedAtDesc(String email);

    Optional<GeneratedPdf> findByIdAndUserEmail(Long id, String email);

    long countByUserEmail(String email);

    void deleteByIdAndUserEmail(Long id, String email);
}
