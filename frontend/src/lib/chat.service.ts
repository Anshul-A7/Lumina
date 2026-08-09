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
