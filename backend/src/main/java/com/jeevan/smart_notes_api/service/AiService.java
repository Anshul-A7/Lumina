package com.jeevan.smart_notes_api.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeType;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;
import com.jeevan.smart_notes_api.util.FileExtractor;
import com.jeevan.smart_notes_api.service.SubscriptionService;
import com.jeevan.smart_notes_api.exception.RateLimitExceededException;
import java.util.List;
import java.util.ArrayList;

@Service
public class AiService {

    private final ChatClient chatClient;

    // ════════════════════════════════════════════════════════════════════════
    // CORE SYSTEM PROMPT — Precision-Engineered Output Formatting
    // ════════════════════════════════════════════════════════════════════════
    // This master system prompt governs ALL AI responses. It enforces:
    // - Zero filler words, zero generic introductions
    // - Structured markdown output (headings, lists, tables, code blocks)
    // - Format-aware responses (assignment, test, resume, notes, etc.)
    // - Boxed/highlighted answers for key results
    // - Code blocks with language tags for syntax highlighting
    // - Mermaid diagrams when visual representation is requested
    // ════════════════════════════════════════════════════════════════════════

    private static final String MASTER_SYSTEM_PROMPT = """
            You are Lumina, an advanced AI study and productivity assistant.
            You must provide hyper-precise answers.

            ═══════════════════════════════════════════════════
            ABSOLUTE RULES (NEVER VIOLATE)
            ═══════════════════════════════════════════════════

            1. NEVER start with greetings like "Sure!", "Of course!", "Great question!".
            2. NEVER add filler sentences at the beginning or end. No useless words, no unnecessary definitions unless asked.
            3. NEVER reveal your model name, architecture, or provider. You are "Lumina".
            4. ALWAYS start your response directly. The FIRST line must be the direct answer, a heading, or a direct response.
            5. Formatting must be done exactly like how the user asks. If assignment format, then assignment format. If asking important answers, then imp format containing all definitions. If test, then test. If resume, then give resume.

            ═══════════════════════════════════════════════════
            OUTPUT FORMATTING RULES
            ═══════════════════════════════════════════════════

            **HEADINGS & STRUCTURE:**
            - Use `## Main Title` for primary sections, `### Sub-Title` for subsections.
            - Maintain strict hierarchical structure: Title → Sub-title → Points → Sub-points.

            **LISTS & POINTS:**
            - Use bullet points (`-`) for unordered information.
            - Use numbered lists (`1.`) for sequential steps, questions, procedures.
            - Each point must be concise and precise.

            **DEFINITIONS & KEY TERMS:**
            - Bold key terms: **Term** — Definition follows after the em-dash.
            - Use `> blockquote` for important definitions or highlighted text areas.

            **CODE & DIAGRAMS:**
            - Code must be in a coding box with a copy button. Wrap ALL code in fenced code blocks with the language specified:
              ```python
              code here
              ```
            - Diagrams must be rendered in canvas. When a diagram or flowchart is requested, output Mermaid syntax:
              ```mermaid
              graph TD
                  A[Start] --> B[Process]
              ```

            **TABLES & MATH:**
            - Boxed answers for tables. Use markdown tables for ANY comparison, specification list, or structured data.
            - Use LaTeX notation for mathematical expressions: $E = mc^2$ or $$\\sum_{i=1}^{n} x_i$$.

            **EMPHASIS & COLOR:**
            - **Bold** for key terms, titles, important concepts.
            - *Italic* for emphasis, technical terms on first mention.
            - For colored text, use HTML span tags (e.g., <span style="color: red">important</span>).

            ═══════════════════════════════════════════════════
            FORMAT-AWARE RESPONSE DETECTION
            ═══════════════════════════════════════════════════

            **SUMMARY (WITH OR WITHOUT PDF):**
            - Provide a summary with absolute preciseness.
            - Hierarchical bullet points with main topics and sub-points.
            - No useless words. Pure structured notes.

            **IMPORTANT TOPICS AND TITLES:**
            - Numbered list of topics with brief descriptions.
            - Priority markers: 🔴 Most Important, 🟡 Important, 🟢 Good to Know.

            **ASSIGNMENT FORMAT:**
            - Formal academic structure: Introduction → Body → Conclusion. Proper headings and subheadings with numbering.

            **TEST/EXAM QUESTIONS:**
            - Clear question numbering: Q1, Q2, Q3... Separate sections for MCQ, Short Answer, Long Answer.

            **RESUME:**
            - Professional sections: Contact → Summary → Experience → Education → Skills. Action verbs at start of each bullet.

            **PDF GENERATION REQUESTS (CRITICAL SYSTEM FUNCTION):**
            When the user asks to "generate pdf", "make a pdf", or "create a pdf", they are invoking a system feature.
            You MUST NOT write Python code, HTML, or scripts to generate a PDF.
            Instead, you MUST use our internal XML tag `<pdf_document>` to trigger the system's PDF generator.
            
            When requested, you MUST do BOTH of the following:
            1. Write a short, highly precise summary in the normal chat area.
            2. Include the FULL, detailed, beautifully formatted document content inside the XML tag at the VERY END of your response.
            
            Format exactly like this (do NOT wrap the xml in markdown blocks):
            Here is a short summary of the important topics...
            - Point 1
            - Point 2
            
            <pdf_document title="Appropriate Document Title">
            # Full Detailed Content
            ## ...
            </pdf_document>
            """;

    // ════════════════════════════════════════════════════════════════════════
    // FILE ANALYSIS SYSTEM PROMPT — For document processing
    // ════════════════════════════════════════════════════════════════════════

    private static final String FILE_ANALYSIS_PROMPT = """
            You are Lumina, an advanced document analysis AI.

            ABSOLUTE RULES:
            1. NEVER start with greetings or filler phrases.
            2. NEVER mention your model name or architecture.
            3. Start immediately with the answer content.
            4. Follow ALL formatting rules from the master prompt.

            DOCUMENT ANALYSIS CAPABILITIES:
            - Detect document type: textbook, research paper, assignment, syllabus, notes, report, legal document, code file
            - Extract and structure: definitions, theorems, formulas, key concepts, important dates, names, processes
            - Maintain hierarchical structure from the source document
            - Preserve technical accuracy while simplifying language for students

            WHEN SUMMARIZING:
            - Extract ONLY essential information — no padding
            - Group by topic/chapter/section
            - Bold all key terms on first occurrence
            - Include ALL formulas and equations in LaTeX notation
            - List important definitions with > blockquote formatting
            - Note any diagrams or figures referenced with brief descriptions

            WHEN ANSWERING QUESTIONS ABOUT THE DOCUMENT:
            - Reference specific sections/pages when possible
            - Quote relevant passages using > blockquote
            - Cross-reference multiple sections if the answer spans them
            - If the document doesn't contain the answer, state that explicitly
            
            **PDF GENERATION REQUESTS (CRITICAL SYSTEM FUNCTION):**
            When the user asks to "generate pdf", "make a pdf", or "create a pdf", they are invoking a system feature.
            You MUST NOT write Python code, HTML, or scripts to generate a PDF.
            Instead, you MUST use our internal XML tag `<pdf_document>` to trigger the system's PDF generator.
            
            When requested, you MUST do BOTH of the following:
            1. Write a short, highly precise summary in the normal chat area.
            2. Include the FULL, detailed, beautifully formatted document content inside the XML tag at the VERY END of your response.
            
            Format exactly like this (do NOT wrap the xml in markdown blocks):
            Here is a short summary of the important topics...
            - Point 1
            - Point 2
            
            <pdf_document title="Appropriate Document Title">
            # Full Detailed Content
            ## ...
            </pdf_document>
            """;

    // ════════════════════════════════════════════════════════════════════════
    // SESSION TITLE GENERATION PROMPT
    // ════════════════════════════════════════════════════════════════════════

    private static final String TITLE_GENERATION_PROMPT = """
            Generate a concise, descriptive title for a chat session based on the user's first message.

            RULES:
            - Maximum 6 words
            - No quotes, no punctuation at the end
            - Descriptive and specific to the topic
            - If about a file/document, include the subject area
            - Use title case
            - Return ONLY the title text, nothing else

            Examples:
            - User: "What is photosynthesis?" → "Photosynthesis Process Explained"
            - User: "Help me write a resume" → "Resume Writing Assistance"
            - User: "Explain binary search algorithm" → "Binary Search Algorithm Guide"
            - User: "Summarize this PDF about machine learning" → "Machine Learning PDF Summary"
            - User: "Give me important topics for physics exam" → "Physics Exam Key Topics"
            """;

    // ════════════════════════════════════════════════════════════════════════
    // PDF FORMATTING PROMPT
    // ════════════════════════════════════════════════════════════════════════

    private static final String PDF_FORMAT_PROMPT = """
            You are a document formatting specialist. Take the provided content and reformat it for clean PDF generation.

            RULES:
            1. Use clear heading hierarchy: # Title, ## Section, ### Subsection
            2. Ensure every section has enough content to fill at least half a page — never leave a heading orphaned at the bottom of a page
            3. Add page-break hints by inserting a horizontal rule (---) between major sections
            4. Tables must be complete — never split a table across implied page boundaries
            5. Code blocks must be complete — never split a code block
            6. Lists must be complete — never split a list between pages
            7. Add proper spacing between sections (blank lines)
            8. Remove any conversational elements (You:/AI: prefixes)
            9. Structure as a professional document with Title at the top
            10. Return ONLY the reformatted content in clean markdown
            """;

    private final SubscriptionService subscriptionService;

    public AiService(ChatClient.Builder builder, SubscriptionService subscriptionService) {
        this.chatClient = builder
                .defaultSystem(MASTER_SYSTEM_PROMPT)
                .build();
        this.subscriptionService = subscriptionService;
    }

    // ════════════════════════════════════════════════════════════════════════
    // CHAT — Main conversational endpoint
    // ════════════════════════════════════════════════════════════════════════

    public String chat(String history, String email) {
        checkAiRequestLimit(email);
        boolean isPdfRequest = history.toLowerCase().contains("generate a pdf") || 
                               history.toLowerCase().contains("make a pdf") || 
                               history.toLowerCase().contains("create a pdf") ||
                               history.toLowerCase().contains("generate pdf");
        
        if (isPdfRequest) {
            if (!subscriptionService.canPerformAction(email, "pdf_generate")) {
                throw new RateLimitExceededException("Daily PDF generation limit reached. Please upgrade your plan.");
            }
        }

        String response = chatClient.prompt()
                .user("""
                        The following is the conversation so far. Respond to the latest message from the user.
                        If the user is sending a casual greeting or a simple question, respond naturally and concisely.
                        If they are asking for detailed information, study notes, or analysis, detect their intent and apply the appropriate structured formatting rules.
                        
                        CONVERSATION:
                        %s
                        """.formatted(history))
                .call()
                .content();

        subscriptionService.incrementUsage(email, "ai_request");
        if (isPdfRequest && response != null && response.contains("<pdf_document")) {
            subscriptionService.incrementUsage(email, "pdf_generate");
        }
        return response;
    }

    // ════════════════════════════════════════════════════════════════════════
    // SUMMARIZE — Quick note summarization
    // ════════════════════════════════════════════════════════════════════════

    public String summarize(String text, String email) {
        checkAiRequestLimit(email);
        boolean isPdfRequest = text.toLowerCase().contains("generate a pdf") || 
                               text.toLowerCase().contains("make a pdf") || 
                               text.toLowerCase().contains("create a pdf") ||
                               text.toLowerCase().contains("generate pdf");
        
        if (isPdfRequest) {
            if (!subscriptionService.canPerformAction(email, "pdf_generate")) {
                throw new RateLimitExceededException("Daily PDF generation limit reached. Please upgrade your plan.");
            }
        }

        String response = chatClient.prompt()
                .user("""
                        Create structured study notes from the following content.

                        OUTPUT FORMAT:
                        - Use ## for main topics
                        - Use bullet points with **bold key terms**
                        - Include > blockquotes for critical definitions
                        - Include formulas in LaTeX notation if present
                        - Comparisons -> Markdown Tables
                        - Flowcharts -> Mermaid Blocks
    
                        ## 4. PDF GENERATION REQUESTS (CRITICAL SYSTEM FUNCTION)
                        When the user asks to "generate pdf", "make a pdf", or "create a pdf", they are invoking a system feature.
                        You MUST NOT write Python code, HTML, or scripts to generate a PDF.
                        Instead, you MUST use our internal XML tag `<pdf_document>` to trigger the system's PDF generator.
                        
                        When requested, you MUST do BOTH of the following:
                        1. Write a short, highly precise summary in the normal chat area.
                        2. Include the FULL, detailed, beautifully formatted document content inside the XML tag at the VERY END of your response.
                        
                        Format exactly like this (do NOT wrap the xml in markdown blocks):
                        Here is a short summary of the important topics...
                        - Point 1
                        - Point 2
                        
                        <pdf_document title="Appropriate Document Title">
                        # Full Detailed Content
                        ## ...
                        </pdf_document>
    
                        ## 5. TONE & STYLE
                        - Direct, concise, hyper-precise. No conversational filler.

                        CONTENT:
                        %s
                        """.formatted(text))
                .call()
                .content();

        subscriptionService.incrementUsage(email, "ai_request");
        if (isPdfRequest && response != null && response.contains("<pdf_document")) {
            subscriptionService.incrementUsage(email, "pdf_generate");
        }
        return response;
    }

    // ════════════════════════════════════════════════════════════════════════
    // GENERATE TITLE — For notes
    // ════════════════════════════════════════════════════════════════════════

    public String generateTitle(String text, String email) {
        checkAiRequestLimit(email);
        String response = chatClient.prompt()
                .user("""
                        Generate 5 professional titles for the following content.

                        RULES:
                        - Return only titles, one per line
                        - No numbering, no bullet points
                        - Maximum 6 words each
                        - Descriptive and specific
                        - Title case

                        CONTENT:
                        %s
                        """.formatted(text))
                .call()
                .content();
        subscriptionService.incrementUsage(email, "ai_request");
        return response;
    }

    // ════════════════════════════════════════════════════════════════════════
    // SUMMARIZE WITH PROMPT — File content + user instruction
    // ════════════════════════════════════════════════════════════════════════

    public String summarizeWithPrompt(String text, String userPrompt) {
        return chatClient.prompt()
                .system(FILE_ANALYSIS_PROMPT)
                .user("""
                        USER REQUEST:
                        %s

                        DOCUMENT CONTENT:
                        %s
                        """.formatted(userPrompt, text))
                .call()
                .content();
    }

    // ════════════════════════════════════════════════════════════════════════
    // SUMMARIZE WITH IMAGE — Multimodal image analysis
    // ════════════════════════════════════════════════════════════════════════

    public String summarizeWithImage(byte[] imageBytes, String mimeType, String userPrompt) {
        return chatClient.prompt()
                .system(FILE_ANALYSIS_PROMPT)
                .user(u -> u.text("""
                        USER REQUEST:
                        %s

                        Analyze the attached image and respond according to the user's request.
                        Apply all formatting rules.
                        """.formatted(userPrompt))
                        .media(MimeType.valueOf(mimeType), new ByteArrayResource(imageBytes)))
                .call()
                .content();
    }

    // ════════════════════════════════════════════════════════════════════════
    // SUMMARIZE WITH FILES — Multi-file processing (PDFs + Images)
    // ════════════════════════════════════════════════════════════════════════

    public String summarizeWithFiles(List<MultipartFile> files, String userPrompt, String email) {
        checkAiRequestLimit(email);

        int pdfCount = 0;
        int imageCount = 0;
        for (MultipartFile file : files) {
            String contentType = file.getContentType();
            if (contentType != null && contentType.startsWith("image/")) {
                imageCount++;
            } else {
                pdfCount++;
            }
        }

        if (pdfCount > 0) {
            int remaining = subscriptionService.getRemainingQuota(email, "pdf_attach");
            if (pdfCount > remaining) {
                throw new RateLimitExceededException("Daily PDF attachment limit reached. Please upgrade your plan to attach more PDFs.");
            }
        }
        if (imageCount > 0) {
            int remaining = subscriptionService.getRemainingQuota(email, "image_attach");
            if (imageCount > remaining) {
                throw new RateLimitExceededException("Daily image attachment limit reached. Please upgrade your plan to attach more images.");
            }
        }

        boolean isPdfRequest = userPrompt.toLowerCase().contains("generate a pdf") || 
                               userPrompt.toLowerCase().contains("make a pdf") || 
                               userPrompt.toLowerCase().contains("create a pdf") ||
                               userPrompt.toLowerCase().contains("generate pdf");
        
        if (isPdfRequest) {
            if (!subscriptionService.canPerformAction(email, "pdf_generate")) {
                throw new RateLimitExceededException("Daily PDF generation limit reached. Please upgrade your plan.");
            }
        }

        StringBuilder extractedText = new StringBuilder();
        List<byte[]> imageBytesList = new ArrayList<>();
        List<String> imageMimeTypes = new ArrayList<>();

        for (MultipartFile file : files) {
            String contentType = file.getContentType();
            if (contentType != null && contentType.startsWith("image/")) {
                try {
                    imageBytesList.add(file.getBytes());
                    imageMimeTypes.add(contentType);
                } catch (Exception e) {
                    throw new RuntimeException("Failed to read image file: " + file.getOriginalFilename());
                }
            } else {
                extractedText.append("--- FILE: ").append(file.getOriginalFilename()).append(" ---\n");
                extractedText.append(FileExtractor.extractText(file)).append("\n\n");
            }
        }

        final String documentContent = extractedText.toString();

        String response;
        // If we have images, process the first image with multimodal and include PDF text in prompt
        if (!imageBytesList.isEmpty()) {
            String combinedPrompt = userPrompt;
            if (!documentContent.isBlank()) {
                combinedPrompt = userPrompt + "\n\nDOCUMENT CONTENT:\n" + documentContent;
            }
            final String finalCombinedPrompt = combinedPrompt;
            response = chatClient.prompt()
                .system(FILE_ANALYSIS_PROMPT)
                .user(u -> u.text("""
                        USER REQUEST:
                        %s

                        Analyze the attached image and respond according to the user's request.
                        Apply all formatting rules.
                        """.formatted(finalCombinedPrompt))
                        .media(MimeType.valueOf(imageMimeTypes.get(0)), new ByteArrayResource(imageBytesList.get(0))))
                .call()
                .content();
        } else {
            // Text-only (PDFs)
            response = chatClient.prompt()
                    .system(FILE_ANALYSIS_PROMPT)
                    .user("""
                            USER REQUEST:
                            %s

                            DOCUMENT CONTENT:
                            %s

                            Analyze all provided documents. Respond according to the user's request.
                            Apply all formatting rules strictly.
                            """.formatted(userPrompt, documentContent))
                    .call()
                    .content();
        }

        subscriptionService.incrementUsage(email, "ai_request");
        if (pdfCount > 0) {
            subscriptionService.incrementUsageBulk(email, "pdf_attach", pdfCount);
        }
        if (imageCount > 0) {
            subscriptionService.incrementUsageBulk(email, "image_attach", imageCount);
        }
        if (isPdfRequest && response != null && response.contains("<pdf_document")) {
            subscriptionService.incrementUsage(email, "pdf_generate");
        }

        return response;
    }

    private void checkAiRequestLimit(String email) {
        // Here we could implement a global AI request limit if needed
        // For now, it just tracks usage via incrementUsage("ai_request")
    }

    // ════════════════════════════════════════════════════════════════════════
    // GENERATE SESSION TITLE — AI-powered dynamic session naming
    // ════════════════════════════════════════════════════════════════════════

    public String generateSessionTitle(String firstMessage) {
        try {
            String title = chatClient.prompt()
                    .system(TITLE_GENERATION_PROMPT)
                    .user(firstMessage)
                    .call()
                    .content();

            if (title != null) {
                title = title.trim().replaceAll("^\"|\"$", "").replaceAll("\\.$", "");
                if (title.length() > 50) {
                    title = title.substring(0, 47) + "...";
                }
            }
            return title != null ? title : "New Session";
        } catch (Exception e) {
            return "New Session";
        }
    }

    // ════════════════════════════════════════════════════════════════════════
    // FORMAT FOR PDF — Re-process content for clean PDF generation
    // ════════════════════════════════════════════════════════════════════════

    public String formatForPdf(String content, String title) {
        return chatClient.prompt()
                .system(PDF_FORMAT_PROMPT)
                .user("""
                        DOCUMENT TITLE: %s

                        CONTENT TO REFORMAT:
                        %s
                        """.formatted(title, content))
                .call()
                .content();
    }

    // ════════════════════════════════════════════════════════════════════════
    // REGENERATE — Re-generate the last AI response with variation
    // ════════════════════════════════════════════════════════════════════════

    public String regenerateResponse(String conversationHistory, String lastUserMessage) {
        return chatClient.prompt()
                .user("""
                        The user has requested a regenerated response. Provide a DIFFERENT, improved answer
                        to the same question. Use different examples, different structure, or deeper analysis.
                        Do NOT repeat the previous response verbatim.

                        CONVERSATION CONTEXT:
                        %s

                        USER'S ORIGINAL MESSAGE TO REGENERATE FOR:
                        %s
                        """.formatted(conversationHistory, lastUserMessage))
                .call()
                .content();
    }
}