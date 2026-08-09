import { apiClient } from './api';

// ============================================================================
// PDF SERVICE — Generate, list, download, and delete PDFs
// ============================================================================

export interface PdfMetadata {
  id: number;
  title: string;
  fileSizeBytes: number;
  createdAt: string;
}

// ── PDF Operations ──────────────────────────────────────────────────────

export async function generatePdf(
  content: string,
  title: string,
  sessionId?: number
): Promise<Blob> {
  try {
    const { data } = await apiClient.post(
      '/pdf/generate',
      { content, title, sessionId: sessionId || null },
      { responseType: 'blob', timeout: 90000 }
    );
    return data;
  } catch (error: any) {
    if (error.response && error.response.data instanceof Blob) {
      try {
        const text = await error.response.data.text();
        const json = JSON.parse(text);
        throw new Error(json.error || json.message || text);
      } catch (jsonErr: any) {
        if (jsonErr.message && !jsonErr.message.includes('JSON')) throw jsonErr;
      }
    }
    throw error;
  }
}

export async function listPdfs(): Promise<PdfMetadata[]> {
  const { data } = await apiClient.get('/pdf/list');
  return data;
}

export async function downloadPdf(pdfId: number): Promise<Blob> {
  try {
    const { data } = await apiClient.get(`/pdf/download/${pdfId}`, {
      responseType: 'blob',
    });
    return data;
  } catch (error: any) {
    if (error.response && error.response.data instanceof Blob) {
      try {
        const text = await error.response.data.text();
        const json = JSON.parse(text);
        throw new Error(json.error || json.message || text);
      } catch (jsonErr: any) {
        if (jsonErr.message && !jsonErr.message.includes('JSON')) throw jsonErr;
      }
    }
    throw error;
  }
}

export async function deletePdf(pdfId: number): Promise<void> {
  await apiClient.delete(`/pdf/${pdfId}`);
}

// ── Utility ─────────────────────────────────────────────────────────────

/**
 * Trigger a browser download of a Blob with the given filename.
 */
export function downloadBlobAsFile(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Generate PDF and immediately trigger download.
 */
export async function generateAndDownloadPdf(
  content: string,
  title: string,
  sessionId?: number
): Promise<void> {
  const blob = await generatePdf(content, title, sessionId);
  downloadBlobAsFile(blob, title);
}

/**
 * Format file size in human-readable format.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
