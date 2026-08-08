import { apiClient } from '../lib/api';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isArchived?: boolean;
  wordCount?: number;
  readingTimeMinutes?: number;
  linkedNoteIds?: string[];
  pinned?: boolean;
}

export interface NoteFilter {
  query?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}

const STORAGE_KEY = 'lumina_notes_v4';

function getLocalNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalNotes(notes: Note[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('[NotesService] Error saving local notes:', err);
  }
}

export class NotesService {
  static async getNotes(filter?: NoteFilter): Promise<Note[]> {
    try {
      const response = await apiClient.get<Note[]>('/notes', { params: filter, timeout: 1000 });
      if (response.data && response.data.length > 0) {
        saveLocalNotes(response.data);
        return response.data;
      }
    } catch {
      // Fallback seamlessly to local notes
    }

    let notes = getLocalNotes();

    if (filter?.query) {
      const q = filter.query.toLowerCase();
      notes = notes.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.content.toLowerCase().includes(q) ||
        n.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filter?.tags && filter.tags.length > 0) {
      notes = notes.filter(n => filter.tags!.some(t => n.tags.includes(t)));
    }

    return notes;
  }

  static async getNoteById(id: string): Promise<Note> {
    try {
      const response = await apiClient.get<Note>(`/notes/${id}`, { timeout: 1000 });
      if (response.data) return response.data;
    } catch {
      // Fallback
    }

    const notes = getLocalNotes();
    const found = notes.find(n => n.id === id);
    if (!found) throw new Error(`Note ${id} not found`);
    return found;
  }

  static async createNote(payload: Partial<Note>): Promise<Note> {
    const wordCount = payload.content ? payload.content.trim().split(/\s+/).filter(Boolean).length : 0;
    const newNote: Note = {
      id: "note-" + Date.now(),
      title: payload.title || "Untitled Note",
      content: payload.content || "# Untitled Note\n\nStart writing here...",
      tags: payload.tags || ["#ideas"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wordCount,
      readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
      pinned: payload.pinned || false,
      linkedNoteIds: payload.linkedNoteIds || []
    };

    const notes = [newNote, ...getLocalNotes()];
    saveLocalNotes(notes);

    try {
      apiClient.post<Note>('/notes', newNote).catch(() => {});
    } catch {}

    return newNote;
  }

  static async updateNote(id: string, payload: Partial<Note>): Promise<Note> {
    const notes = getLocalNotes();
    const idx = notes.findIndex(n => n.id === id);
    if (idx === -1) throw new Error(`Note ${id} not found`);

    const wordCount = payload.content !== undefined 
      ? payload.content.trim().split(/\s+/).filter(Boolean).length 
      : notes[idx].wordCount;

    const updated: Note = {
      ...notes[idx],
      ...payload,
      wordCount,
      readingTimeMinutes: Math.max(1, Math.ceil((wordCount || 1) / 200)),
      updatedAt: new Date().toISOString()
    };

    notes[idx] = updated;
    saveLocalNotes(notes);

    try {
      apiClient.put<Note>(`/notes/${id}`, updated).catch(() => {});
    } catch {}

    return updated;
  }

  static async deleteNote(id: string): Promise<void> {
    const notes = getLocalNotes().filter(n => n.id !== id);
    saveLocalNotes(notes);

    try {
      apiClient.delete(`/notes/${id}`).catch(() => {});
    } catch {}
  }

  static async askAI(history: string): Promise<string> {
    try {
      const response = await apiClient.post<string>('/ai/chat', history, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      return response.data;
    } catch (err) {
      console.error('[NotesService] AI chat failed:', err);
      return "I'm sorry, I'm having trouble connecting to the AI server right now.";
    }
  }

  static async askAIWithFile(files: File[], prompt: string): Promise<string> {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      formData.append('prompt', prompt);

      const response = await apiClient.post<string>('/ai/file-summary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 60000 // 60 seconds timeout for file processing
      });
      return response.data;
    } catch (err) {
      console.error('[NotesService] AI file processing failed:', err);
      return "I'm sorry, I couldn't process the file. Please ensure it's a valid PDF or Image and the server is running.";
    }
  }
}
