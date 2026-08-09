package com.jeevan.smart_notes_api.service;

import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Text;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.jeevan.smart_notes_api.entity.ChatSession;
import com.jeevan.smart_notes_api.entity.GeneratedPdf;
import com.jeevan.smart_notes_api.entity.User;
import com.jeevan.smart_notes_api.exception.ResourceNotFoundException;
import com.jeevan.smart_notes_api.repository.ChatSessionRepository;
import com.jeevan.smart_notes_api.repository.GeneratedPdfRepository;
import com.jeevan.smart_notes_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PdfService {

    @Autowired
    private GeneratedPdfRepository pdfRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatSessionRepository sessionRepository;

    @Autowired
    private AiService aiService;

    // ── Color Palette ───────────────────────────────────────────────────
    private static final DeviceRgb COLOR_PRIMARY = new DeviceRgb(10, 10, 10);
    private static final DeviceRgb COLOR_HEADING = new DeviceRgb(20, 20, 20);
    private static final DeviceRgb COLOR_SUBHEADING = new DeviceRgb(40, 40, 40);
    private static final DeviceRgb COLOR_BODY = new DeviceRgb(50, 50, 50);
    private static final DeviceRgb COLOR_MUTED = new DeviceRgb(120, 120, 120);
    private static final DeviceRgb COLOR_CODE_BG = new DeviceRgb(245, 245, 245);
    private static final DeviceRgb COLOR_BLOCKQUOTE_BORDER = new DeviceRgb(85, 51, 255);
    private static final DeviceRgb COLOR_TABLE_HEADER = new DeviceRgb(30, 30, 30);
    private static final DeviceRgb COLOR_TABLE_HEADER_TEXT = new DeviceRgb(255, 255, 255);
    private static final DeviceRgb COLOR_TABLE_ALT_ROW = new DeviceRgb(248, 248, 248);

    // ════════════════════════════════════════════════════════════════════════
    // GENERATE PDF — Convert markdown AI response to styled PDF
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Generate a professionally formatted PDF from AI-generated markdown content.
     *
     * Flow:
     * 1. AI reformats the content for PDF (clean structure, page-break hints)
     * 2. Markdown is parsed and rendered using iText7 with custom styles
     * 3. PDF is saved to database and bytes returned
     */
    @Transactional
    public byte[] generatePdf(String content, String title, String email, Long sessionId) {
        User user = findUserByEmail(email);

        // Protect any Mermaid diagrams from AI reformatting alterations
        List<String> mermaidBlocks = new java.util.ArrayList<>();
        Pattern mermaidPattern = Pattern.compile("(?s)```(?:mermaid)?\\s*(?:(?:flowchart|graph|sequenceDiagram|stateDiagram|classDiagram|erDiagram|journey|gantt|pie|mindmap)[^`]*|[^`]*-->[^`]*)```");
        Matcher matcher = mermaidPattern.matcher(content != null ? content : "");
        StringBuilder protectedContent = new StringBuilder();
        int placeholderIndex = 0;
        while (matcher.find()) {
            mermaidBlocks.add(matcher.group());
            matcher.appendReplacement(protectedContent, "___MERMAID_DIAGRAM_PLACEHOLDER_" + placeholderIndex + "___");
            placeholderIndex++;
        }
        matcher.appendTail(protectedContent);

        // AI-reformat content for clean PDF output
        String formattedContent;
        try {
            formattedContent = aiService.formatForPdf(protectedContent.toString(), title);
        } catch (Exception e) {
            // Fallback to raw content if AI reformatting fails
            formattedContent = protectedContent.toString();
        }

        // Restore protected Mermaid diagrams
        if (formattedContent != null) {
            for (int i = 0; i < mermaidBlocks.size(); i++) {
                formattedContent = formattedContent.replace("___MERMAID_DIAGRAM_PLACEHOLDER_" + i + "___", "\n\n" + mermaidBlocks.get(i) + "\n\n");
            }
        } else {
            formattedContent = content;
        }

        // Generate PDF bytes with visual diagram embedding
        byte[] pdfBytes = renderMarkdownToPdf(formattedContent, title);

        // Look up session (optional — might be null for standalone PDFs)
        ChatSession session = null;
        if (sessionId != null) {
            session = sessionRepository.findByIdAndUserEmail(sessionId, email).orElse(null);
        }

        // Save to database
        GeneratedPdf generatedPdf = new GeneratedPdf(user, session, title, pdfBytes);
        pdfRepository.save(generatedPdf);

        return pdfBytes;
    }

    /**
     * List all generated PDFs for the user's account page.
     */
    public List<Map<String, Object>> getUserPdfs(String email) {
        List<GeneratedPdf> pdfs = pdfRepository.findByUserEmailOrderByCreatedAtDesc(email);
        return pdfs.stream().map(pdf -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", pdf.getId());
            map.put("title", pdf.getTitle());
            map.put("fileSizeBytes", pdf.getFileSizeBytes());
            map.put("createdAt", pdf.getCreatedAt());
            return map;
        }).toList();
    }

    /**
     * Download a specific PDF by ID.
     */
    public byte[] downloadPdf(Long pdfId, String email) {
        GeneratedPdf pdf = pdfRepository.findByIdAndUserEmail(pdfId, email)
                .orElseThrow(() -> new ResourceNotFoundException("PDF not found"));
        return pdf.getPdfData();
    }

    /**
     * Get PDF metadata (title) for download headers.
     */
    public String getPdfTitle(Long pdfId, String email) {
        GeneratedPdf pdf = pdfRepository.findByIdAndUserEmail(pdfId, email)
                .orElseThrow(() -> new ResourceNotFoundException("PDF not found"));
        return pdf.getTitle();
    }

    /**
     * Delete a specific PDF.
     */
    @Transactional
    public void deletePdf(Long pdfId, String email) {
        GeneratedPdf pdf = pdfRepository.findByIdAndUserEmail(pdfId, email)
                .orElseThrow(() -> new ResourceNotFoundException("PDF not found"));
        pdfRepository.delete(pdf);
    }

    // ════════════════════════════════════════════════════════════════════════
    // MARKDOWN → PDF RENDERER (iText7)
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Parse markdown content and render it as a styled PDF document using iText7.
     * Handles: headings, paragraphs, bold/italic, code blocks, blockquotes, tables,
     * horizontal rules (page-break hints), and bullet/numbered lists.
     */
    private byte[] renderMarkdownToPdf(String markdown, String documentTitle) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document doc = new Document(pdfDoc, PageSize.A4);
            doc.setMargins(50, 50, 50, 50);

            PdfFont fontRegular = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            PdfFont fontBold = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
            PdfFont fontItalic = PdfFontFactory.createFont(StandardFonts.HELVETICA_OBLIQUE);
            PdfFont fontBoldItalic = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLDOBLIQUE);
            PdfFont fontMono = PdfFontFactory.createFont(StandardFonts.COURIER);

            // Document Title
            if (documentTitle != null && !documentTitle.isBlank()) {
                Paragraph titleParagraph = new Paragraph(documentTitle)
                        .setFont(fontBold)
                        .setFontSize(22)
                        .setFontColor(COLOR_PRIMARY)
                        .setTextAlignment(TextAlignment.LEFT)
                        .setMarginBottom(20);
                doc.add(titleParagraph);
            }

            String[] lines = markdown.split("\n");
            boolean inCodeBlock = false;
            String codeBlockLang = "";
            StringBuilder codeContent = new StringBuilder();
            boolean inTable = false;
            List<String[]> tableRows = new java.util.ArrayList<>();

            for (int i = 0; i < lines.length; i++) {
                String line = lines[i];

                // ── Code Block Detection ────────────────────────────────
                if (line.trim().startsWith("```")) {
                    if (inCodeBlock) {
                        // End code block — render it
                        String rawCode = codeContent.toString().trim();
                        if ("mermaid".equalsIgnoreCase(codeBlockLang) || isMermaidSyntax(rawCode)) {
                            byte[] diagramBytes = renderMermaidToImage(rawCode);
                            if (diagramBytes != null && diagramBytes.length > 0) {
                                try {
                                    ImageData imgData = ImageDataFactory.create(diagramBytes);
                                    Image diagramImg = new Image(imgData);
                                    diagramImg.setHorizontalAlignment(HorizontalAlignment.CENTER);
                                    diagramImg.setMaxWidth(UnitValue.createPercentValue(100));
                                    diagramImg.setAutoScale(true);
                                    diagramImg.setMarginTop(8);
                                    diagramImg.setMarginBottom(14);
                                    doc.add(diagramImg);
                                } catch (Exception imgEx) {
                                    Paragraph codeBlock = new Paragraph(rawCode)
                                            .setFont(fontMono)
                                            .setFontSize(9)
                                            .setFontColor(COLOR_BODY)
                                            .setBackgroundColor(COLOR_CODE_BG)
                                            .setPaddings(12, 14, 12, 14)
                                            .setMarginBottom(12)
                                            .setMarginTop(4);
                                    doc.add(codeBlock);
                                }
                            } else {
                                Paragraph codeBlock = new Paragraph(rawCode)
                                        .setFont(fontMono)
                                        .setFontSize(9)
                                        .setFontColor(COLOR_BODY)
                                        .setBackgroundColor(COLOR_CODE_BG)
                                        .setPaddings(12, 14, 12, 14)
                                        .setMarginBottom(12)
                                        .setMarginTop(4);
                                doc.add(codeBlock);
                            }
                        } else {
                            Paragraph codeBlock = new Paragraph(rawCode)
                                    .setFont(fontMono)
                                    .setFontSize(9)
                                    .setFontColor(COLOR_BODY)
                                    .setBackgroundColor(COLOR_CODE_BG)
                                    .setPaddings(12, 14, 12, 14)
                                    .setMarginBottom(12)
                                    .setMarginTop(4);
                            doc.add(codeBlock);
                        }
                        codeContent.setLength(0);
                        codeBlockLang = "";
                        inCodeBlock = false;
                    } else {
                        inCodeBlock = true;
                        codeBlockLang = line.trim().replace("`", "").trim().toLowerCase();
                    }
                    continue;
                }

                if (inCodeBlock) {
                    codeContent.append(line).append("\n");
                    continue;
                }

                // ── Horizontal Rule / Page Break Hint ───────────────────
                if (line.trim().matches("^-{3,}$") || line.trim().matches("^\\*{3,}$")) {
                    // Flush any pending table
                    if (inTable && !tableRows.isEmpty()) {
                        doc.add(renderTable(tableRows, fontBold, fontRegular));
                        tableRows.clear();
                        inTable = false;
                    }
                    
                    // Check if there is any meaningful content left after this page break
                    boolean hasMoreContent = false;
                    for (int j = i + 1; j < lines.length; j++) {
                        String remainingLine = lines[j].trim();
                        if (!remainingLine.isEmpty() && !remainingLine.matches("^-{3,}$") && !remainingLine.matches("^\\*{3,}$")) {
                            hasMoreContent = true;
                            break;
                        }
                    }
                    
                    if (hasMoreContent) {
                        pdfDoc.addNewPage();
                    }
                    continue;
                }

                // ── Table Detection ─────────────────────────────────────
                if (line.trim().contains("|") && line.trim().startsWith("|")) {
                    // Skip separator rows like |---|---|---|
                    if (line.trim().matches("^\\|[\\s\\-:|]+\\|$")) {
                        continue;
                    }
                    inTable = true;
                    String[] cells = line.trim().split("\\|");
                    List<String> cleanCells = new java.util.ArrayList<>();
                    for (String cell : cells) {
                        String trimmed = cell.trim();
                        if (!trimmed.isEmpty()) {
                            cleanCells.add(trimmed);
                        }
                    }
                    if (!cleanCells.isEmpty()) {
                        tableRows.add(cleanCells.toArray(new String[0]));
                    }
                    continue;
                } else if (inTable) {
                    // End of table — render it
                    if (!tableRows.isEmpty()) {
                        doc.add(renderTable(tableRows, fontBold, fontRegular));
                        tableRows.clear();
                    }
                    inTable = false;
                }

                // ── Empty Line ──────────────────────────────────────────
                if (line.trim().isEmpty()) {
                    doc.add(new Paragraph("").setMarginBottom(6));
                    continue;
                }

                // ── Headings ────────────────────────────────────────────
                if (line.startsWith("#### ")) {
                    doc.add(new Paragraph(stripMarkdownFormatting(line.substring(5)))
                            .setFont(fontBold).setFontSize(11).setFontColor(COLOR_SUBHEADING)
                            .setMarginTop(10).setMarginBottom(4));
                    continue;
                }
                if (line.startsWith("### ")) {
                    doc.add(new Paragraph(stripMarkdownFormatting(line.substring(4)))
                            .setFont(fontBold).setFontSize(13).setFontColor(COLOR_SUBHEADING)
                            .setMarginTop(14).setMarginBottom(6));
                    continue;
                }
                if (line.startsWith("## ")) {
                    doc.add(new Paragraph(stripMarkdownFormatting(line.substring(3)))
                            .setFont(fontBold).setFontSize(16).setFontColor(COLOR_HEADING)
                            .setMarginTop(18).setMarginBottom(8));
                    continue;
                }
                if (line.startsWith("# ")) {
                    doc.add(new Paragraph(stripMarkdownFormatting(line.substring(2)))
                            .setFont(fontBold).setFontSize(20).setFontColor(COLOR_PRIMARY)
                            .setMarginTop(22).setMarginBottom(10));
                    continue;
                }

                // ── Blockquote ──────────────────────────────────────────
                if (line.startsWith("> ")) {
                    String quoteText = stripMarkdownFormatting(line.substring(2));
                    Paragraph quote = new Paragraph(quoteText)
                            .setFont(fontItalic)
                            .setFontSize(10.5f)
                            .setFontColor(COLOR_BODY)
                            .setPaddingLeft(14)
                            .setBorderLeft(new SolidBorder(COLOR_BLOCKQUOTE_BORDER, 3))
                            .setMarginBottom(8)
                            .setMarginTop(4);
                    doc.add(quote);
                    continue;
                }

                // ── Bullet Points ───────────────────────────────────────
                if (line.matches("^\\s*[-*]\\s+.*")) {
                    int indent = 0;
                    for (char c : line.toCharArray()) {
                        if (c == ' ') indent++;
                        else break;
                    }
                    String bulletText = line.replaceFirst("^\\s*[-*]\\s+", "");
                    Text bulletChar = new Text(indent > 0 ? "◦  " : "•  ")
                            .setFont(fontRegular)
                            .setFontColor(COLOR_MUTED);
                    Paragraph bullet = createFormattedParagraph(bulletText, bulletChar, fontRegular, fontBold, fontItalic, fontBoldItalic, fontMono)
                            .setFontSize(10.5f)
                            .setFontColor(COLOR_BODY)
                            .setMarginLeft(16 + (indent / 2) * 12)
                            .setMarginBottom(3);

                    doc.add(bullet);
                    continue;
                }

                // ── Numbered Lists ──────────────────────────────────────
                if (line.matches("^\\s*\\d+\\.\\s+.*")) {
                    String listText = line.replaceFirst("^\\s*\\d+\\.\\s+", "");
                    String number = line.trim().split("\\.")[0] + ".  ";
                    Text numText = new Text(number)
                            .setFont(fontBold)
                            .setFontColor(COLOR_MUTED);
                    Paragraph listItem = createFormattedParagraph(listText, numText, fontRegular, fontBold, fontItalic, fontBoldItalic, fontMono)
                            .setFontSize(10.5f)
                            .setFontColor(COLOR_BODY)
                            .setMarginLeft(16)
                            .setMarginBottom(3);
                    doc.add(listItem);
                    continue;
                }

                // ── Regular Paragraph ───────────────────────────────────
                Paragraph paragraph = createFormattedParagraph(line, null, fontRegular, fontBold, fontItalic, fontBoldItalic, fontMono)
                        .setFontSize(10.5f)
                        .setFontColor(COLOR_BODY)
                        .setMarginBottom(6);
                doc.add(paragraph);
            }

            // Flush any remaining table
            if (inTable && !tableRows.isEmpty()) {
                doc.add(renderTable(tableRows, fontBold, fontRegular));
            }

            doc.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed: " + e.getMessage(), e);
        }
    }

    /**
     * Create a Paragraph with inline formatting: **bold**, *italic*, ***bold italic***, `code`.
     */
    private Paragraph createFormattedParagraph(String text, Text prefix, PdfFont regular, PdfFont bold,
                                               PdfFont italic, PdfFont boldItalic, PdfFont mono) {
        Paragraph p = new Paragraph();
        if (prefix != null) {
            p.add(prefix);
        }
        p.setFont(regular);

        // Pattern to match: ***bold italic***, **bold**, *italic*, `code`
        Pattern pattern = Pattern.compile(
                "(\\*{3})(.*?)\\1" +       // ***bold italic***
                "|(\\*{2})(.*?)\\3" +       // **bold**
                "|(\\*)(.*?)\\5" +          // *italic*
                "|(`)(.*?)\\7"              // `code`
        );

        Matcher matcher = pattern.matcher(text);
        int lastEnd = 0;

        while (matcher.find()) {
            // Add text before match
            if (matcher.start() > lastEnd) {
                p.add(new Text(text.substring(lastEnd, matcher.start())).setFont(regular));
            }

            if (matcher.group(1) != null) {
                // ***bold italic***
                p.add(new Text(matcher.group(2)).setFont(boldItalic));
            } else if (matcher.group(3) != null) {
                // **bold**
                p.add(new Text(matcher.group(4)).setFont(bold));
            } else if (matcher.group(5) != null) {
                // *italic*
                p.add(new Text(matcher.group(6)).setFont(italic));
            } else if (matcher.group(7) != null) {
                // `code`
                p.add(new Text(matcher.group(8))
                        .setFont(mono)
                        .setFontSize(9)
                        .setBackgroundColor(COLOR_CODE_BG));
            }

            lastEnd = matcher.end();
        }

        // Add remaining text
        if (lastEnd < text.length()) {
            p.add(new Text(text.substring(lastEnd)).setFont(regular));
        }

        return p;
    }

    /**
     * Render a markdown table as an iText7 Table element.
     */
    private Table renderTable(List<String[]> rows, PdfFont headerFont, PdfFont bodyFont) {
        if (rows.isEmpty()) return new Table(1);

        int cols = rows.get(0).length;
        Table table = new Table(UnitValue.createPercentArray(cols))
                .useAllAvailableWidth()
                .setMarginTop(8)
                .setMarginBottom(12);

        // Header row
        String[] header = rows.get(0);
        for (String h : header) {
            Cell cell = new Cell()
                    .add(new Paragraph(stripMarkdownFormatting(h)).setFont(headerFont).setFontSize(9.5f).setFontColor(COLOR_TABLE_HEADER_TEXT))
                    .setBackgroundColor(COLOR_TABLE_HEADER)
                    .setPaddings(6, 8, 6, 8);
            table.addHeaderCell(cell);
        }

        // Data rows
        for (int r = 1; r < rows.size(); r++) {
            String[] row = rows.get(r);
            DeviceRgb bgColor = (r % 2 == 0) ? COLOR_TABLE_ALT_ROW : null;
            for (int c = 0; c < cols; c++) {
                String cellText = c < row.length ? row[c] : "";
                Cell cell = new Cell()
                        .add(new Paragraph(stripMarkdownFormatting(cellText)).setFont(bodyFont).setFontSize(9.5f).setFontColor(COLOR_BODY))
                        .setPaddings(5, 8, 5, 8)
                        .setBorder(new SolidBorder(new DeviceRgb(230, 230, 230), 0.5f));
                if (bgColor != null) cell.setBackgroundColor(bgColor);
                table.addCell(cell);
            }
        }

        return table;
    }

    /**
     * Strip basic markdown formatting characters from text for plain-text rendering.
     */
    private String stripMarkdownFormatting(String text) {
        if (text == null) return "";
        return text
                .replaceAll("\\*{3}(.*?)\\*{3}", "$1")
                .replaceAll("\\*{2}(.*?)\\*{2}", "$1")
                .replaceAll("\\*(.*?)\\*", "$1")
                .replaceAll("`(.*?)`", "$1")
                .replaceAll("~~(.*?)~~", "$1")
                .trim();
    }

    // ════════════════════════════════════════════════════════════════════════
    // MERMAID DIAGRAM RENDERER — High-resolution dark canvas rendering for PDF
    // ════════════════════════════════════════════════════════════════════════

    private static final HttpClient HTTP_CLIENT = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(12))
            .build();

    private boolean isMermaidSyntax(String text) {
        if (text == null || text.isBlank()) return false;
        String trimmed = text.trim().toLowerCase();
        return trimmed.startsWith("flowchart") ||
               trimmed.startsWith("graph") ||
               trimmed.startsWith("sequencediagram") ||
               trimmed.startsWith("statediagram") ||
               trimmed.startsWith("classdiagram") ||
               trimmed.startsWith("erdiagram") ||
               trimmed.startsWith("pie") ||
               trimmed.startsWith("mindmap") ||
               trimmed.startsWith("gantt") ||
               trimmed.contains("-->") ||
               trimmed.contains("---|") ||
               trimmed.contains("==>");
    }

    private byte[] renderMermaidToImage(String rawMermaid) {
        String sanitized = sanitizeMermaid(rawMermaid);
        if (sanitized == null || sanitized.isBlank()) return null;

        // Attempt 1: mermaid.ink with dark theme JSON and standard Base64
        try {
            String jsonPayload = "{\"code\":" + escapeJsonString(sanitized) + ",\"mermaid\":{\"theme\":\"dark\",\"darkMode\":true,\"background\":\"#000000\",\"themeVariables\":{\"background\":\"#000000\",\"mainBkg\":\"#0c0c0e\",\"nodeTextColor\":\"#ffffff\",\"textColor\":\"#ffffff\",\"primaryColor\":\"#7c3aed\",\"lineColor\":\"#a855f7\"}}}";
            String base64Payload = Base64.getEncoder().encodeToString(jsonPayload.getBytes(StandardCharsets.UTF_8));
            String url = "https://mermaid.ink/img/" + base64Payload;

            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(12))
                    .header("User-Agent", "Mozilla/5.0 (SmartNotes-PDF-Engine/1.0)")
                    .GET()
                    .build();

            HttpResponse<byte[]> resp = HTTP_CLIENT.send(req, HttpResponse.BodyHandlers.ofByteArray());
            if (resp.statusCode() == 200 && resp.body() != null && resp.body().length > 200) {
                return resp.body();
            }
        } catch (Exception e) {
            System.err.println("Error rendering Mermaid diagram image via mermaid.ink: " + e.getMessage());
        }

        return null;
    }

    private String sanitizeMermaid(String rawChart) {
        if (rawChart == null || rawChart.isBlank()) return "";
        
        String chart = rawChart.trim()
                .replaceAll("(?i)^```mermaid\\s*", "")
                .replaceAll("^```\\s*", "")
                .replaceAll("\\s*```$", "")
                .trim();

        // 1. Convert pipe edge labels to dashed string labels: -->|Label| -> -- "Label" -->
        chart = chart.replaceAll("(-->|---|-.->|==>)\\s*\\|([^|\\n]+)\\|\\s*>?", "-- \"$2\" --> ");

        // 2. Fix subgraphs with spaces: subgraph Kernel Space -> subgraph Kernel_Space ["Kernel Space"]
        Pattern subgraphPattern = Pattern.compile("subgraph\\s+([^\\n\"\\[]+)");
        Matcher subgraphMatcher = subgraphPattern.matcher(chart);
        StringBuilder sbSub = new StringBuilder();
        while (subgraphMatcher.find()) {
            String name = subgraphMatcher.group(1).trim();
            if (name.contains(" ")) {
                subgraphMatcher.appendReplacement(sbSub, Matcher.quoteReplacement("subgraph " + name.replaceAll("\\s+", "_") + " [\"" + name + "\"]"));
            } else {
                subgraphMatcher.appendReplacement(sbSub, Matcher.quoteReplacement("subgraph " + name));
            }
        }
        subgraphMatcher.appendTail(sbSub);
        chart = sbSub.toString();

        // 3. Convert graph LR/TD to flowchart LR/TD
        if (chart.toLowerCase().startsWith("graph ")) {
            chart = chart.replaceFirst("(?i)^graph\\s+", "flowchart ");
        }

        String[] lines = chart.split("\n");
        StringBuilder sanitized = new StringBuilder();
        boolean hasHeader = false;

        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.isEmpty() || trimmed.startsWith("%%")) {
                sanitized.append(line).append("\n");
                continue;
            }

            String lower = trimmed.toLowerCase();
            if (lower.startsWith("flowchart") || lower.startsWith("graph") || lower.startsWith("sequencediagram") ||
                lower.startsWith("statediagram") || lower.startsWith("classdiagram") || lower.startsWith("erdiagram") ||
                lower.startsWith("journey") || lower.startsWith("gantt") || lower.startsWith("pie") || lower.startsWith("mindmap")) {
                hasHeader = true;
            }

            // Auto-quote unquoted square bracket node labels
            line = line.replaceAll("([a-zA-Z0-9_-]+)\\[\\s*([a-zA-Z0-9_\\s\\(\\)\\/\\-\\:\\,\\.]+)\\s*\\]", "$1[\"$2\"]");
            line = line.replaceAll("\\[\\s*\"+", "[\"").replaceAll("\"+\\s*\\]", "\"]");

            sanitized.append(line).append("\n");
        }

        String result = sanitized.toString().trim();
        if (!hasHeader) {
            result = "flowchart TD\n" + result;
        }
        return result;
    }

    private String escapeJsonString(String str) {
        if (str == null) return "\"\"";
        StringBuilder sb = new StringBuilder("\"");
        for (char c : str.toCharArray()) {
            switch (c) {
                case '"' -> sb.append("\\\"");
                case '\\' -> sb.append("\\\\");
                case '\b' -> sb.append("\\b");
                case '\f' -> sb.append("\\f");
                case '\n' -> sb.append("\\n");
                case '\r' -> sb.append("\\r");
                case '\t' -> sb.append("\\t");
                default -> {
                    if (c < ' ') {
                        String hex = "000" + Integer.toHexString(c);
                        sb.append("\\u").append(hex.substring(hex.length() - 4));
                    } else {
                        sb.append(c);
                    }
                }
            }
        }
        sb.append("\"");
        return sb.toString();
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
