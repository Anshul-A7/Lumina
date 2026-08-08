package com.jeevan.smart_notes_api.util;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.canvas.parser.PdfTextExtractor;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public class FileExtractor {

    public static String extractText(MultipartFile file) {

        try {

            InputStream inputStream =
                    file.getInputStream();

            PdfReader reader =
                    new PdfReader(inputStream);

            PdfDocument pdfDocument =
                    new PdfDocument(reader);

            StringBuilder text =
                    new StringBuilder();

            for (int i = 1;
                 i <= pdfDocument.getNumberOfPages();
                 i++) {

                text.append(
                        PdfTextExtractor.getTextFromPage(
                                pdfDocument.getPage(i)
                        )
                );
            }

            pdfDocument.close();

            return text.toString();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to extract text from PDF"
            );
        }
    }
}