package com.jeevan.smart_notes_api.service;

import com.jeevan.smart_notes_api.dto.request.NoteRequest;
import com.jeevan.smart_notes_api.dto.response.NoteResponse;
import com.jeevan.smart_notes_api.entity.Note;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.exception.ResourceNotFoundException;
import com.jeevan.smart_notes_api.repository.NoteRepository;
import com.jeevan.smart_notes_api.repository.UserRepository;
import com.jeevan.smart_notes_api.util.FileExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.kernel.pdf.PdfDocument;

@Service
public class NoteService {

    @Autowired
    private NoteRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AiService aiService;

    public Note create(NoteRequest request,
                       String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Note note = new Note();

        note.setTitle(request.getTitle());

        note.setContent(request.getContent());

        note.setUser(user);

        return repository.save(note);
    }

    public List<NoteResponse> getAll(String email) {

        return repository.findByUserEmail(email)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public Note update(
            Long id,
            NoteRequest newNote,
            String email) {

        Note note = repository
                .findByIdAndUserEmail(
                        id,
                        email
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Note not found"
                        ));

        note.setTitle(
                newNote.getTitle()
        );

        note.setContent(
                newNote.getContent()
        );

        return repository.save(note);
    }

    public void delete(
            Long id,
            String email) {

        Note note = repository
                .findByIdAndUserEmail(
                        id,
                        email
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Note not found"
                        ));

        repository.delete(note);
    }

    public NoteResponse getById(
            Long id,
            String email) {

        Note note = repository
                .findByIdAndUserEmail(
                        id,
                        email
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Note not found"
                        ));

        return mapToResponse(note);
    }

    public List<NoteResponse> search(
            String title,
            String email
    ) {

        return repository
                .findByUserEmail(email)
                .stream()
                .filter(note ->
                        note.getTitle()
                                .toLowerCase()
                                .contains(title.toLowerCase()))
                .map(this::mapToResponse)
                .toList();
    }


    public Page<NoteResponse> getNotes(
            int page,
            int size,
            String email) {

        return repository
                .findByUserEmail(
                        email,
                        PageRequest.of(page, size)
                )
                .map(this::mapToResponse);
    }

    public List<NoteResponse> sort(
            String field,
            String email) {
        List<String> allowedFields =
                List.of(
                        "id",
                        "title",
                        "createdAt"
                );

        if (!allowedFields.contains(field)) {
            throw new RuntimeException(
                    "Invalid sort field"
            );
        }
        return repository
                .findByUserEmail(
                        email,
                        Sort.by(field)
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public Page<NoteResponse> paginationSort(
            int page,
            int size,
            String field,
            String email) {
        List<String> allowedFields =
                List.of(
                        "id",
                        "title",
                        "createdAt"
                );

        if (!allowedFields.contains(field)) {
            throw new RuntimeException(
                    "Invalid sort field"
            );
        }
        return repository
                .findByUserEmail(
                        email,
                        PageRequest.of(
                                page,
                                size,
                                Sort.by(field)
                        )
                )
                .map(this::mapToResponse);
    }

    public List<NoteResponse> filter(
            String keyword,
            String email) {

        return repository.findByUserEmail(email)
                .stream()
                .filter(note ->
                        note.getTitle()
                                .toLowerCase()
                                .contains(keyword.toLowerCase()))
                .map(this::mapToResponse)
                .toList();
    }
    public List<NoteResponse> latestNotes(
            String email) {

        return repository.findByUserEmail(email)
                .stream()
                .sorted((a, b) ->
                        b.getCreatedAt()
                                .compareTo(a.getCreatedAt()))
                .map(this::mapToResponse)
                .toList();
    }

    public List<NoteResponse> myNotes(
            String email) {

        return repository.findByUserEmail(email)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public String uploadAndSummarize(MultipartFile file, String email) {
        try {
            String uploadDir = "uploads/";
            Files.createDirectories(Paths.get(uploadDir));
            String fileName = file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            String text = FileExtractor.extractText(file);
            String summary = aiService.summarize(text, email);

            Note note = new Note();
            note.setTitle("Summary: " + fileName);
            note.setContent(summary);
            User user = userRepository
                    .findByEmail(email)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "User not found"
                            ));

            note.setUser(user);
            repository.save(note);

            return summary;
        } catch (Exception e) {
            throw new RuntimeException("File upload or summary failed");
        }
    }

    public byte[] generateNotePdf(Long noteId, String email) {
        Note note = repository.findByIdAndUserEmail(noteId, email)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found"));

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            document.add(new Paragraph("Title: " + note.getTitle()));
            document.add(new Paragraph("Content: " + note.getContent()));

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed");
        }
    }
    private NoteResponse mapToResponse(Note note) {

        NoteResponse response = new NoteResponse();

        response.setId(note.getId());
        response.setTitle(note.getTitle());
        response.setContent(note.getContent());
        response.setCreatedAt(note.getCreatedAt());

        return response;
    }
}
