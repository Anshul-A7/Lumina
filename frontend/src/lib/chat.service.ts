import { apiClient } from './api';

// ============================================================================
// CHAT SERVICE — Backend-first session & message management
// ============================================================================

export interface ChatSession {
  id: number;
  title: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  messages?: ChatMessage[];
}

export interface ChatMessage {
  id: number;
  role: 'USER' | 'ASSISTANT';
  content: string;
  attachmentNames: string | null;
  createdAt: string;
}

export interface SendMessageResponse extends ChatMessage {
  sessionTitle?: string;
}

// ── Session Operations ──────────────────────────────────────────────────

export async function createSession(title?: string): Promise<ChatSession> {
  const { data } = await apiClient.post('/chat/sessions', title ? { title } : {});
  return data;
}

export async function getSessions(): Promise<ChatSession[]> {
  const { data } = await apiClient.get('/chat/sessions');
  return data;
}

export async function getSession(sessionId: number): Promise<ChatSession & { messages: ChatMessage[] }> {
  const { data } = await apiClient.get(`/chat/sessions/${sessionId}`);
  return data;
}

export async function renameSession(sessionId: number, title: string): Promise<ChatSession> {
  const { data } = await apiClient.put(`/chat/sessions/${sessionId}/rename`, { title });
  return data;
}

export async function togglePinSession(sessionId: number): Promise<ChatSession> {
  const { data } = await apiClient.put(`/chat/sessions/${sessionId}/pin`);
  return data;
}

export async function deleteSession(sessionId: number): Promise<void> {
  await apiClient.delete(`/chat/sessions/${sessionId}`);
}

// ── Message Operations ──────────────────────────────────────────────────

export async function sendMessage(
  sessionId: number,
  content: string,
  files?: File[]
): Promise<SendMessageResponse> {
  if (files && files.length > 0) {
    const formData = new FormData();
    formData.append('content', content);
    files.forEach(file => formData.append('files', file));

    const { data } = await apiClient.post(
      `/chat/sessions/${sessionId}/messages`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 120000 }
    );
    return data;
  } else {
    const { data } = await apiClient.post(`/chat/sessions/${sessionId}/messages/text`, { content });
    return data;
  }
}

export async function regenerateResponse(sessionId: number): Promise<ChatMessage> {
  const { data } = await apiClient.post(`/chat/sessions/${sessionId}/regenerate`);
  return data;
}

export async function updateSessionPdf(
  sessionId: number,
  title: string,
  content: string
): Promise<any> {
  const { data } = await apiClient.put(`/chat/sessions/${sessionId}/update-pdf`, { title, content });
  return data;
}

export async function editDocumentWithAi(
  content: string,
  instruction: string,
  selectedText?: string
): Promise<string> {
  const { data } = await apiClient.post('/ai/edit-document', { 
    content, 
    instruction, 
    selectedText: selectedText || undefined 
  });
  return data.content || content;
}

// ── SSE Streaming ───────────────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface StreamCallbacks {
  onToken: (token: string) => void;
  onDone: (message: SendMessageResponse) => void;
  onError: (error: string) => void;
}

/**
 * Send a text message with SSE streaming response.
 * Tokens arrive one-by-one via onToken callback.
 * When complete, onDone fires with the final saved message.
 */
export async function sendMessageStream(
  sessionId: number,
  content: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem('lumina_access_token') 
    : null;

  try {
    const response = await fetch(`${API_BASE_URL}/chat/sessions/${sessionId}/messages/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      callbacks.onError(errorText || `Request failed with status ${response.status}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      callbacks.onError('No response body');
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Parse SSE events from buffer
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      let eventName = '';
      let dataLines: string[] = [];

      for (const line of lines) {
        // Strip trailing CR if present (\r\n)
        const cleanLine = line.endsWith('\r') ? line.slice(0, -1) : line;

        if (cleanLine.startsWith('event:')) {
          eventName = cleanLine.slice(6).trim();
        } else if (cleanLine.startsWith('data:')) {
          // In SSE, strip single optional leading space after "data:"
          const dataContent = cleanLine.startsWith('data: ') ? cleanLine.slice(6) : cleanLine.slice(5);
          dataLines.push(dataContent);
        } else if (cleanLine === '') {
          // Empty line signals end of SSE event
          if (dataLines.length > 0) {
            const eventData = dataLines.join('\n');
            if (eventName === 'token') {
              callbacks.onToken(eventData);
            } else if (eventName === 'done') {
              try {
                const finalMsg = JSON.parse(eventData);
                callbacks.onDone(finalMsg);
              } catch {
                callbacks.onDone({ id: 0, role: 'ASSISTANT', content: eventData, attachmentNames: null, createdAt: new Date().toISOString() });
              }
            } else if (eventName === 'error') {
              try {
                const errObj = JSON.parse(eventData);
                callbacks.onError(errObj.error || 'Unknown error');
              } catch {
                callbacks.onError(eventData);
              }
            }
          }
          eventName = '';
          dataLines = [];
        }
      }
    }
  } catch (err: any) {
    callbacks.onError(err.message || 'Stream connection failed');
  }
}

// ── Chat Search ─────────────────────────────────────────────────────────

export interface SearchResult {
  sessionId: number;
  sessionTitle: string;
  messageId: number;
  role: string;
  content: string;
  createdAt: string;
}

export async function searchMessages(query: string): Promise<SearchResult[]> {
  const { data } = await apiClient.get(`/chat/search`, { params: { q: query } });
  return data;
}

// ── Export Session ───────────────────────────────────────────────────────

export async function exportSession(
  sessionId: number, 
  format: 'html' | 'txt' | 'pdf'
): Promise<Blob> {
  const { data } = await apiClient.post(
    `/chat/export`,
    { sessionId, format },
    { responseType: 'blob' }
  );
  return data;
}
