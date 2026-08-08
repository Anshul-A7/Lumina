package com.jeevan.smart_notes_api.repository;

import com.jeevan.smart_notes_api.entity.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {


    Optional<Note> findByIdAndUserEmail(Long id, String email);

    List<Note> findByUserEmail(String email);

    Page<Note> findByUserEmail(
            String email,
            Pageable pageable
    );

    List<Note> findByUserEmail(
            String email,
            Sort sort
    );

    void deleteByUserId(Long userId);
}