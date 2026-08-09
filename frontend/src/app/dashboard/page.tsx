"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Trash2, 
  Pin, 
  MoreVertical,
  Edit2,
  Paperclip,
  ArrowUp,
  Sparkles,
  MessageSquare,
  FileText,
  FileCheck2,
  Settings,
  LogOut,
  Image as ImageIcon,
  MonitorUp,
  FolderArchive,
  Globe,
  BarChart3,
  MessageSquarePlus,
  X,
  Download
} from "lucide-react";
import { AuthService } from "@/services/auth.service";
import * as ChatService from "@/lib/chat.service";
import * as SubscriptionService from "@/lib/subscription.service";
import * as PdfService from "@/lib/pdf.service";
import { NotesService, Note } from "@/services/notes.service";
import { ChatSession, ChatMessage } from "@/lib/chat.service";
import { RichMessage } from "@/components/chat/RichMessage";
import AccountView from "@/components/dashboard/AccountView";
import SettingsView from "@/components/dashboard/SettingsView";
import GetPlusView from "@/components/dashboard/GetPlusView";
import WorkspaceView from "@/components/dashboard/WorkspaceView";
import EditPdfView from "@/components/dashboard/EditPdfView";
import { LuminaIcon } from "@/components/common/LuminaLogo";
import toast from "react-hot-toast";

// Extend Window interface for Google APIs
declare global {
  interface Window {
    gapi: any;
  }
}



const SERIF = "'Playfair Display', Georgia, serif";

function DashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");
  const router = useRouter();

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pdfsGeneratedRemaining, setPdfsGeneratedRemaining] = useState<number | null>(null);
  
  // Chat state
  const [draftContent, setDraftContent] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  
  // Selected File States
  const [attachments, setAttachments] = useState<{file: File, preview: string | null}[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Menu states
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [isTypingAllowed, setIsTypingAllowed] = useState(false);

  const [userName, setUserName] = useState("Account");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  // Snippet selector state
  const [showSnippetMenu, setShowSnippetMenu] = useState(false);
  const [availableNotes, setAvailableNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [snippetSearchQuery, setSnippetSearchQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Search modal state (Feature 3)
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchModalQuery, setSearchModalQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ChatService.SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load initial notes and sessions
  const loadSessions = async () => {
    try {
      const data = await ChatService.getSessions();
      setSessions(data);
      const sessionParam = searchParams.get("session");
      if (sessionParam) {
        const id = Number(sessionParam);
        if (!isNaN(id)) {
          setActiveSessionId(id);
        }
      }
    } catch (err) {
      console.error("[Dashboard] Error loading sessions:", err);
    }
  };

  const loadUsageStats = async () => {
    try {
      const stats = await SubscriptionService.getUsageStats();
      setPdfsGeneratedRemaining(stats.pdfsGeneratedRemaining);
    } catch (err) {
      console.error("[Dashboard] Error loading usage stats:", err);
    }
  };

  useEffect(() => {
    const sessionParam = searchParams.get("session");
    if (sessionParam) {
      const id = Number(sessionParam);
      if (!isNaN(id)) {
        setActiveSessionId(id);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    loadSessions();
    loadUsageStats();
    NotesService.getNotes().then(notes => {
      setAvailableNotes(notes);
      setFilteredNotes(notes);
    }).catch(console.error);

    const handleSidebarToggle = (e: any) => {
      if (e.detail !== undefined) setSidebarOpen(e.detail);
    };

    const handleNewSessionEvent = () => {
      setActiveSessionId(null);
      setDraftContent("");
      setIsTypingAllowed(false);
    };

    window.addEventListener("lumina:toggle_sidebar", handleSidebarToggle);
    window.addEventListener("lumina:new_session", handleNewSessionEvent);
    
    // Load User Profile
    setUserName(localStorage.getItem("lumina_user_name") || "Account");
    setUserEmail(localStorage.getItem("lumina_user_email") || "");
    setUserAvatar(localStorage.getItem("lumina_user_avatar") || "");
    
    // Load Google API Scripts for Picker
    const loadScript = (src: string, id: string, onLoad: () => void) => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        // Script exists, check if loaded
        const checkReady = setInterval(() => {
          if (id === 'google-gapi-script' && window.gapi) {
            clearInterval(checkReady);
            onLoad();
          } else if (id === 'google-gsi-script' && window.google?.accounts) {
            clearInterval(checkReady);
            onLoad();
          }
        }, 100);
        return;
      }
      
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Wait a tiny bit for the global to be registered
        setTimeout(onLoad, 50);
      };
      document.body.appendChild(script);
    };

    loadScript('https://apis.google.com/js/api.js', 'google-gapi-script', () => {
      if (window.gapi) {
        window.gapi.load('picker', () => {
          console.log('[Dashboard] Google Picker API loaded');
        });
      }
    });

    loadScript('https://accounts.google.com/gsi/client', 'google-gsi-script', () => {
      console.log('[Dashboard] Google GIS loaded');
    });

    return () => {
      window.removeEventListener("lumina:toggle_sidebar", handleSidebarToggle);
      window.removeEventListener("lumina:new_session", handleNewSessionEvent);
    };
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClick = () => setActiveMenuId(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Cmd+K keyboard shortcut for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
        setSearchModalQuery("");
        setSearchResults([]);
      }
      if (e.key === "Escape" && showSearchModal) {
        setShowSearchModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSearchModal]);

  // Auto-focus search input when modal opens
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearchModal]);

  // Search handler with debounce
  useEffect(() => {
    if (!searchModalQuery || searchModalQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await ChatService.searchMessages(searchModalQuery.trim());
        setSearchResults(results);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchModalQuery]);

  // Export session handler
  const handleExportSession = async (sessionId: number, format: 'html' | 'txt') => {
    try {
      const blob = await ChatService.exportSession(sessionId, format);
      const session = sessions.find(s => s.id === sessionId);
      const filename = (session?.title || 'chat') + '.' + format;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to export session.");
    }
  };

  const activeSession = useMemo(() => {
    return sessions.find((s) => s.id === activeSessionId) || null;
  }, [sessions, activeSessionId]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages, activeSessionId]);

  // Load session messages when activeSession changes and has no messages
  useEffect(() => {
    if (activeSessionId && activeSession && !activeSession.messages) {
      ChatService.getSession(activeSessionId)
        .then(fullSession => {
          setSessions(prev => prev.map(s => s.id === fullSession.id ? fullSession : s));
        })
        .catch(err => {
          console.error("Failed to load session messages", err);
        });
    }
  }, [activeSessionId, activeSession]);

  const selectSession = (session: ChatSession) => {
    setActiveSessionId(session.id);
    setIsTypingAllowed(false);
    if (activeTab) {
      router.push("/dashboard");
    }
  };

  const handleCreateNewSession = async (initialText?: string, files?: File[]) => {
    const text = typeof initialText === "string" ? initialText : "";
    
    // Determine title
    let title = "New Session";
    if (files && files.length > 0) {
      title = files[0].name;
    } else if (text.length > 0) {
      title = text.length > 20 ? text.substring(0, 20) + "..." : text;
    }

    const newSession = await ChatService.createSession(title);
    newSession.messages = []; // initialize empty array
    setSessions([newSession, ...sessions]);
    selectSession(newSession);

    if ((files && files.length > 0) || text.trim()) {
      setIsThinking(true);
      setIsTypingAllowed(true);
      try {
        await ChatService.sendMessage(newSession.id, text, files);
        const updatedSession = await ChatService.getSession(newSession.id);
        setSessions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));
      } catch (err: any) {
        console.error("AI Error:", err);
        const errMsg = err?.response?.data?.message || "Failed to get AI response. Please try again.";
        alert(errMsg);
      } finally {
        setIsThinking(false);
      }
    }
  };

  // Upload Logic
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    
    const validFiles = files.filter(f => f.type === "application/pdf" || f.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      alert("Only PDF and image files are supported currently.");
    }

    if (attachments.length + validFiles.length > 3) {
      alert("can't attach more. Max 3 pdf or images.");
    }

    const newAttachments = validFiles.slice(0, 3 - attachments.length).map(file => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
    
    setActiveMenuId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDriveUpload = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!clientId || !apiKey) {
      alert("Google Client ID or API Key is missing in environment variables.");
      return;
    }

    setActiveMenuId(null);

    if (!googleToken) {
      const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        callback: (response: any) => {
          if (response.error !== undefined) {
            console.error('Google Auth Error:', response);
            return;
          }
          setGoogleToken(response.access_token);
          openGooglePicker(response.access_token, apiKey);
        },
      });
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      openGooglePicker(googleToken, apiKey);
    }
  };

  const openGooglePicker = (accessToken: string, apiKey: string) => {
    if (typeof window === "undefined" || !(window as any).gapi || !(window as any).google) return;

    const view = new (window as any).google.picker.DocsView((window as any).google.picker.ViewId.DOCS);
    view.setMimeTypes('application/pdf,image/png,image/jpeg,image/jpg,image/webp'); // Allow PDF and Images

    const picker = new (window as any).google.picker.PickerBuilder()
      .developerKey(apiKey)
      .setOAuthToken(accessToken)
      .addView(view)
      .enableFeature((window as any).google.picker.Feature.MULTISELECT_ENABLED)
      .setCallback(pickerCallback)
      .build();
    
    picker.setVisible(true);
  };

  const pickerCallback = async (data: any) => {
    if (data.action === (window as any).google.picker.Action.PICKED) {
      setUploadProgress(true);
      try {
        if (attachments.length + data.docs.length > 3) {
          alert("can't attach more. Max 3 pdf or images.");
        }

        const newAttachments: {file: File, preview: string | null}[] = [];
        for (const doc of data.docs) {
          if (attachments.length + newAttachments.length >= 3) break;
          const response = await fetch(`https://www.googleapis.com/drive/v3/files/${doc.id}?alt=media`, {
            headers: { Authorization: `Bearer ${googleToken}` }
          });

          if (!response.ok) throw new Error("Failed to download file from Drive");

          const blob = await response.blob();
          const file = new File([blob], doc.name, { type: blob.type });

          newAttachments.push({
            file,
            preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
          });
        }

        setAttachments(prev => [...prev, ...newAttachments]);
      } catch (err) {
        console.error(err);
        alert("Failed to process Google Drive file.");
      } finally {
        setUploadProgress(false);
      }
    }
  };

  // Chat Submit
  const handleChatSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() && attachments.length === 0) return;

    const userInput = chatInput.trim();
    const currentFiles = attachments.map(a => a.file);
    
    setChatInput("");
    setAttachments([]);

    if (activeSession) {
      // Optimistically prepare user message
      const tempUserMessage: ChatMessage = {
        id: Date.now(),
        role: 'USER',
        content: userInput,
        attachmentNames: currentFiles.length > 0 ? currentFiles.map(f => f.name).join(", ") : null,
        createdAt: new Date().toISOString()
      };

      setIsThinking(true);
      setIsTypingAllowed(true);

      // Use SSE streaming for text-only messages, multipart for file uploads
      if (currentFiles.length === 0) {
        // ── SSE Streaming Path ──
        const streamingMsgId = Date.now() + 1;
        const tempAssistantMessage: ChatMessage = {
          id: streamingMsgId,
          role: 'ASSISTANT',
          content: '',
          attachmentNames: null,
          createdAt: new Date().toISOString()
        };

        // Append user message AND empty assistant message that will be filled by streaming tokens
        setSessions(prev => prev.map(s => {
          if (s.id !== activeSession.id) return s;
          return { ...s, messages: [...(s.messages || []), tempUserMessage, tempAssistantMessage] };
        }));

        try {
          await ChatService.sendMessageStream(activeSession.id, userInput, {
            onToken: (token: string) => {
              setSessions(prev => prev.map(s => {
                if (s.id !== activeSession.id) return s;
                const msgs = [...(s.messages || [])];
                const lastMsg = msgs[msgs.length - 1];
                if (lastMsg && lastMsg.role === 'ASSISTANT') {
                  msgs[msgs.length - 1] = { ...lastMsg, content: lastMsg.content + token };
                }
                return { ...s, messages: msgs };
              }));
            },
            onDone: (finalMsg) => {
              // Replace streaming message with final saved message from server
              setSessions(prev => prev.map(s => {
                if (s.id !== activeSession.id) return s;
                const msgs = [...(s.messages || [])];
                if (msgs.length > 0 && msgs[msgs.length - 1].role === 'ASSISTANT') {
                  msgs[msgs.length - 1] = {
                    id: finalMsg.id,
                    role: 'ASSISTANT',
                    content: finalMsg.content,
                    attachmentNames: null,
                    createdAt: finalMsg.createdAt
                  };
                }
                // Update session title if returned
                const newTitle = (finalMsg as any).sessionTitle;
                return { ...s, messages: msgs, ...(newTitle ? { title: newTitle } : {}) };
              }));
              setIsThinking(false);
            },
            onError: (error: string) => {
              toast.error(error);
              setIsThinking(false);
              // Refresh session to get clean state
              ChatService.getSession(activeSession.id).then(updated => {
                setSessions(prev => prev.map(s => s.id === updated.id ? updated : s));
              }).catch(console.error);
            }
          });
        } catch (err: any) {
          console.error("Stream Error:", err);
          toast.error("Failed to stream response. Falling back...");
        } finally {
          setIsThinking(false);
        }
      } else {
        // ── Multipart Upload Path (files attached) ──
        setSessions(prev => prev.map(s => {
          if (s.id !== activeSession.id) return s;
          return { ...s, messages: [...(s.messages || []), tempUserMessage] };
        }));
        try {
          await ChatService.sendMessage(activeSession.id, userInput, currentFiles);
          const updatedSession = await ChatService.getSession(activeSession.id);
          setSessions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));
        } catch (err: any) {
          console.error("AI Error:", err);
          const errMsg = err?.response?.data?.message || err?.response?.data?.error || "Failed to send message. Please try again.";
          toast.error(errMsg);
          const originalSession = await ChatService.getSession(activeSession.id);
          setSessions(prev => prev.map(s => s.id === originalSession.id ? originalSession : s));
        } finally {
          setIsThinking(false);
        }
      }
    } else {
      handleCreateNewSession(userInput, currentFiles.length > 0 ? currentFiles : undefined);
    }
  };

  const handleGeneratePdfFromMessage = async (content: string) => {
    if (!activeSession) return;

    const userDisplayText = "Generate PDF";
    const prompt = `Please format and compile the following exact response into a publication-grade PDF document enclosed in <pdf_document title="Document"> tags:\n\n${content}`;
    
    const tempUserMessage: ChatMessage = {
      id: Date.now(),
      role: 'USER',
      content: userDisplayText,
      attachmentNames: null,
      createdAt: new Date().toISOString()
    };
    
    const updatedSessionOptimistic = {
      ...activeSession,
      messages: [...(activeSession.messages || []), tempUserMessage]
    };
    setSessions(prev => prev.map(s => s.id === activeSession.id ? updatedSessionOptimistic : s));

    setIsThinking(true);
    setIsTypingAllowed(true);
    try {
      await ChatService.sendMessage(activeSession.id, prompt, []);
      const updatedSession = await ChatService.getSession(activeSession.id);
      setSessions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));
      if (pdfsGeneratedRemaining !== null) {
        setPdfsGeneratedRemaining(prev => (prev !== null && prev > 0 ? prev - 1 : prev));
      }
    } catch (err: any) {
      console.error("AI Error:", err);
      const errMsg = err?.response?.data?.message || err?.response?.data?.error || "Failed to generate PDF. Please try again.";
      toast.error(errMsg);
      const originalSession = await ChatService.getSession(activeSession.id);
      setSessions(prev => prev.map(s => s.id === originalSession.id ? originalSession : s));
    } finally {
      setIsThinking(false);
    }
  };

  const handleEditPdf = async (content: string, instruction: string) => {
    const prompt = `Please edit the following PDF content:\n\n${content}\n\nInstruction: ${instruction}\n\nApply the edit and output the COMPLETE updated PDF content inside a <pdf_document> tag. Keep all unedited parts the same.`;
    
    if (activeSession) {
      const tempUserMessage: ChatMessage = {
        id: Date.now(),
        role: 'USER',
        content: prompt,
        attachmentNames: null,
        createdAt: new Date().toISOString()
      };
      
      const updatedSessionOptimistic = {
        ...activeSession,
        messages: [...(activeSession.messages || []), tempUserMessage]
      };
      setSessions(prev => prev.map(s => s.id === activeSession.id ? updatedSessionOptimistic : s));

      setIsThinking(true);
      setIsTypingAllowed(true);
      try {
        await ChatService.sendMessage(activeSession.id, prompt, []);
        const updatedSession = await ChatService.getSession(activeSession.id);
        setSessions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));
      } catch (err: any) {
        console.error("AI Error:", err);
        const errMsg = err?.response?.data?.message || "Failed to edit PDF. Please try again.";
        alert(errMsg);
        const originalSession = await ChatService.getSession(activeSession.id);
        setSessions(prev => prev.map(s => s.id === originalSession.id ? originalSession : s));
      } finally {
        setIsThinking(false);
      }
    }
  };

  useEffect(() => {
    const listener = (e: any) => {
      const { content, instruction } = e.detail;
      handleEditPdf(content, instruction);
    };
    window.addEventListener("lumina:edit_pdf", listener);
    return () => window.removeEventListener("lumina:edit_pdf", listener);
  }, [activeSession]);

  // Synchronize chat messages in active session whenever PDF is saved/edited
  useEffect(() => {
    const handlePdfSaved = (e: any) => {
      const { content, title, sessionId } = e.detail || {};
      if (!content) return;

      const targetId = sessionId || activeSessionId;

      setSessions(prev => prev.map(s => {
        if (targetId && s.id !== targetId) return s;
        const updatedMessages = s.messages?.map(msg => {
          if (msg.role === 'ASSISTANT' && msg.content.includes('<pdf_document')) {
            const docTitle = title || 'Document';
            const rep = `<pdf_document title="${docTitle}">\n${content}\n</pdf_document>`;
            return {
              ...msg,
              content: msg.content.replace(/<pdf_document[^>]*>[\s\S]*?<\/pdf_document>/i, rep)
            };
          }
          return msg;
        });
        return { ...s, messages: updatedMessages };
      }));
    };

    window.addEventListener("lumina:pdf_saved", handlePdfSaved);
    return () => window.removeEventListener("lumina:pdf_saved", handlePdfSaved);
  }, [activeSessionId]);

  const handleRenameSubmit = async (id: number) => {
    if (!editingTitle.trim()) {
      setEditingId(null);
      return;
    }
    const updated = await ChatService.renameSession(id, editingTitle);
    
    // Keep messages intact when updating title
    setSessions(prev => prev.map(s => s.id === updated.id ? { ...s, title: updated.title, updatedAt: updated.updatedAt } : s));
    setEditingId(null);
  };

  const handleDeleteSession = async (id: number) => {
    if (confirm("Delete this session?")) {
      await ChatService.deleteSession(id);
      const remaining = sessions.filter((s) => s.id !== id);
      setSessions(remaining);
      if (activeSessionId === id) {
        setActiveSessionId(null);
      }
    }
  };

  const handlePinSession = async (session: ChatSession) => {
    const updated = await ChatService.togglePinSession(session.id);
    setSessions(prev => prev.map(s => s.id === updated.id ? { ...s, pinned: updated.pinned, updatedAt: updated.updatedAt } : s));
  };

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      return !searchQuery || 
        s.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [sessions, searchQuery]);

  const pinnedSessions = filteredSessions.filter(s => s.pinned);
  const unpinnedSessions = filteredSessions.filter(s => !s.pinned);

  // Swipe-to-open handlers
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchEndX - touchStartX;
    const isSwipeRight = distance > 60;
    
    // Only open if swiped from the left edge (e.g. < 40px)
    if (isSwipeRight && !sidebarOpen && touchStartX < 40) {
      setSidebarOpen(true);
      window.dispatchEvent(new CustomEvent("lumina:toggle_sidebar", { detail: true }));
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  return (
    <div 
      className="flex-1 flex w-full h-full bg-background text-foreground overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* ───────────────────────────────────────────────────────────────────────
          SIDEBAR
          ─────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSidebarOpen(false);
                window.dispatchEvent(new CustomEvent("lumina:toggle_sidebar", { detail: false }));
              }}
              className="absolute inset-0 bg-black/40 z-30 md:hidden"
            />
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card border-r border-foreground/[0.06] flex flex-col shrink-0 overflow-hidden select-none max-md:absolute max-md:top-0 max-md:bottom-0 max-md:left-0 z-40 md:relative md:z-20"
            >
            {/* New Session Button & Search */}
            <div className="p-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setActiveSessionId(null);
                  setDraftContent("");
                }}
                className="w-full h-10 rounded-xl bg-black text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Session</span>
              </button>
              
              <div className="relative">
                <Search className="w-[18px] h-[18px] text-foreground/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sessions..."
                  className="w-full h-10 pl-10 pr-3 text-[13px] font-medium bg-background rounded-xl border border-foreground/[0.08] focus:border-foreground/30 outline-none text-foreground placeholder:text-foreground/40 transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-5">
              
              {pinnedSessions.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-sans uppercase tracking-wider font-bold text-foreground/50 mb-1 flex items-center gap-2">
                    <Pin className="w-3.5 h-3.5" /> Pinned
                  </div>
                  <div className="space-y-0.5">
                    {pinnedSessions.map((session) => renderSessionItem(session))}
                  </div>
                </div>
              )}

              <div>
                <div className="px-3 py-1.5 text-[11px] font-sans uppercase tracking-wider font-bold text-foreground/50 mb-1 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" /> All Sessions
                </div>
                <div className="space-y-0.5">
                  {unpinnedSessions.length === 0 && pinnedSessions.length === 0 ? (
                    <div className="px-2 py-4 text-xs text-foreground/40 text-center font-light">
                      No sessions found.
                    </div>
                  ) : (
                    unpinnedSessions.map((session) => renderSessionItem(session))
                  )}
                </div>
              </div>
            </div>

            {/* Account Profile Bottom */}
            <div className="p-4 mt-auto border-t border-foreground/[0.04] flex flex-col gap-1">
              <Link href="/dashboard?tab=account"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-foreground/[0.05] transition-colors text-left cursor-pointer"
              >
                {userAvatar ? (
                  <img src={userAvatar} alt="Avatar" className="w-[26px] h-[26px] rounded-full object-cover shadow-sm shrink-0" />
                ) : (
                  <div className="w-[26px] h-[26px] rounded-full bg-primary text-primary-foreground font-bold text-[11px] flex items-center justify-center shadow-sm shrink-0">
                    {userName ? userName.charAt(0).toUpperCase() : "N"}
                  </div>
                )}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[13px] font-semibold text-foreground truncate leading-tight">{userName}</span>
                  {userEmail && <span className="text-[11px] text-foreground/50 truncate leading-tight">{userEmail}</span>}
                </div>
              </Link>
              
              <Link href="/dashboard?tab=settings"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-foreground/[0.05] transition-colors text-left cursor-pointer"
              >
                <Settings className="w-[18px] h-[18px] text-foreground/60 shrink-0" />
                <span className="text-[13px] font-semibold text-foreground">Settings</span>
              </Link>
              
              <button
                onClick={() => {
                  AuthService.logout();
                  window.location.href = "/login";
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-left cursor-pointer group"
              >
                <LogOut className="w-[18px] h-[18px] text-red-500 shrink-0" />
                <span className="text-[13px] font-semibold text-red-500">Log out</span>
              </button>
            </div>
          </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────────────────
          MAIN CHAT AREA (Center)
          ─────────────────────────────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col min-w-0 bg-background relative">
          {activeTab === "account" ? (
            <AccountView />
          ) : activeTab === "settings" ? (
            <SettingsView />
          ) : activeTab === "get-plus" ? (
            <GetPlusView />
          ) : activeTab === "workspace" ? (
            <WorkspaceView />
          ) : activeTab === "edit-pdf" ? (
            <EditPdfView />
          ) : (
            <>
              {/* Chat Header for Get Plus and New Chat */}
        <div className="w-full flex items-start justify-between p-3 absolute top-0 left-0 right-0 z-10 pointer-events-none bg-gradient-to-b from-background via-background/95 to-transparent pb-8">
          <Link 
            href="/dashboard?tab=get-plus"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-muted text-foreground text-[12px] font-bold rounded-full transition-colors cursor-pointer pointer-events-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Get Plus
          </Link>
          
          <button
            onClick={() => {
              setActiveSessionId(null);
              setDraftContent("");
              if (activeTab) {
                router.push("/dashboard");
              }
            }}
            title="New Chat"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-foreground/[0.04] transition-colors cursor-pointer pointer-events-auto"
          >
            <MessageSquarePlus className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Chat History / Empty State */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden w-full flex flex-col items-center min-w-0">
          <div className="w-full max-w-3xl flex-1 flex flex-col pt-16 pb-32 px-4 sm:px-6 min-w-0 overflow-x-hidden">
            
            {(!activeSession) ? (
              // Empty State - Center Screen
              <div className="flex-1 flex flex-col items-center justify-center text-center mt-[-10vh]">
                <div className="mb-6">
                  <LuminaIcon size={64} />
                </div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3" style={{ fontFamily: SERIF }}>
                  Upload or Ask
                </h1>
                <p className="text-sm text-foreground/50 max-w-sm">
                  Start a new session by asking a question, uploading a document, or typing an idea.
                </p>
              </div>
            ) : (
              // Chat History
              <div className="w-full flex flex-col gap-6 min-w-0 max-w-full overflow-x-hidden">
                {activeSession.messages?.map((msg, idx) => {
                  const isLastMessage = idx === activeSession.messages!.length - 1;
                  const isPdfPrompt = msg.role === 'USER' && (
                    msg.content.startsWith('Please generate a formatted PDF') ||
                    msg.content.startsWith('Generate a PDF of the following') ||
                    msg.content.startsWith('Please generate a PDF document') ||
                    msg.content.startsWith('Generate a PDF for the response') ||
                    msg.content.startsWith('Generate PDF')
                  );
                  const cleanText = isPdfPrompt ? 'Generate PDF' : msg.content;
                  const displayContent = msg.attachmentNames 
                    ? `${cleanText}\n\n*(Attached: ${msg.attachmentNames})*` 
                    : cleanText;
                    
                  return (
                    <RichMessage 
                      key={msg.id || idx} 
                      content={displayContent} 
                      isUser={msg.role === 'USER'} 
                      animate={msg.role !== 'USER' && isLastMessage && isTypingAllowed} 
                      onRequestGeneratePdf={() => handleGeneratePdfFromMessage(msg.content)}
                      sessionId={activeSession.id}
                      isPdfDisabled={pdfsGeneratedRemaining !== null && pdfsGeneratedRemaining <= 0}
                    />
                  );
                })}
                
                {/* Thinking Indicator */}
                {isThinking && (
                  <div className="flex w-full justify-start relative group mt-2 mb-4">
                    <div className="flex items-center gap-2 px-2 text-sm text-foreground/50 font-medium italic">
                      <span>Thinking...</span>
                      <div className="flex gap-1 items-center mt-1">
                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────────────
            FIXED BOTTOM INPUT (Like ChatGPT)
            ─────────────────────────────────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4 flex justify-center">
          <div className="w-full max-w-3xl relative">
            <form 
              onSubmit={handleChatSubmit}
              className="relative flex items-end w-full bg-secondary border border-foreground/[0.05] rounded-3xl focus-within:ring-2 focus-within:ring-foreground/20 focus-within:bg-background transition-all shadow-sm"
            >
              {/* Attachment Button */}
              <div className="absolute left-3 bottom-2">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveMenuId(activeMenuId === "attach" ? null : "attach");
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-foreground/40 hover:bg-foreground/[0.05] hover:text-foreground transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {activeMenuId === "attach" && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0, y: 15, scale: 0.95 },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          transition: { 
                            duration: 0.2, 
                            ease: [0.16, 1, 0.3, 1],
                            staggerChildren: 0.03
                          } 
                        }
                      }}
                      className="absolute bottom-14 left-0 w-[420px] bg-background rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-foreground/[0.08] p-1.5 z-50 text-foreground flex flex-col"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {[
                        { id: "local", icon: MonitorUp, title: "Upload PDF or Image", sub: "From your computer", action: () => fileInputRef.current?.click() },
                        { id: "drive", icon: FolderArchive, title: "Add from Google Drive", sub: "Select PDF or Image from your drive", action: handleDriveUpload },
                      ].map((item, i) => (
                        <motion.button 
                          key={i}
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
                          }}
                          type="button"
                          onClick={item.action}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-foreground/[0.04] text-left cursor-pointer transition-colors group"
                        >
                          <item.icon className="w-[18px] h-[18px] text-foreground/50 group-hover:text-foreground transition-colors shrink-0" />
                          <div className="flex items-baseline gap-2 flex-1 min-w-0">
                            <span className="text-[14px] font-medium text-foreground whitespace-nowrap">{item.title}</span>
                            <span className="text-[12px] text-foreground/40 truncate">{item.sub}</span>
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  accept="application/pdf,image/png,image/jpeg,image/webp"
                  multiple
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </div>

              {/* Input Area */}
              <div className="flex flex-col w-full pl-14 pr-14 pt-2">
                {attachments.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 px-2 mb-2 mt-2">
                    {attachments.map((att, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-2.5 py-1.5 bg-foreground/[0.04] border border-foreground/5 rounded-xl w-fit relative group transition-all hover:bg-foreground/[0.06]">
                        {att.preview ? (
                          <img src={att.preview} alt="Preview" className="w-6 h-6 rounded-md object-cover shadow-sm" />
                        ) : (
                          <div className="w-6 h-6 rounded-md bg-red-100 flex items-center justify-center text-red-600 shadow-sm shrink-0">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className="flex flex-col pr-3 overflow-hidden">
                          <span className="text-[11px] font-semibold text-foreground max-w-[100px] truncate leading-tight">{att.file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setAttachments(prev => prev.filter((_, i) => i !== idx));
                          }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-background border border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-red-50 hover:border-red-200 hover:text-red-600 rounded-full flex items-center justify-center shadow-sm cursor-pointer transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Snippet Menu */}
                <AnimatePresence>
                  {showSnippetMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-14 mb-2 w-64 max-h-60 overflow-y-auto bg-background rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-foreground/[0.08] p-1.5 z-50 flex flex-col"
                    >
                      <div className="px-2 py-1.5 text-[11px] font-medium text-foreground/40 uppercase tracking-wider">
                        Insert Snippet
                      </div>
                      {filteredNotes.length === 0 ? (
                        <div className="px-2 py-3 text-[13px] text-foreground/40 text-center">No snippets found</div>
                      ) : (
                        filteredNotes.map(note => (
                          <button
                            key={note.id}
                            type="button"
                            onClick={() => {
                              const lastAt = chatInput.lastIndexOf('@');
                              if (lastAt !== -1) {
                                const beforeAt = chatInput.substring(0, lastAt);
                                setChatInput(beforeAt + "\n```" + note.title + "\n" + note.content + "\n```\n");
                              }
                              setShowSnippetMenu(false);
                              textareaRef.current?.focus();
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-foreground/[0.04] transition-colors flex flex-col"
                          >
                            <span className="text-[13px] font-semibold text-foreground truncate">{note.title}</span>
                            <span className="text-[11px] text-foreground/50 truncate mt-0.5">{note.content.substring(0, 40)}...</span>
                          </button>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <textarea
                  ref={textareaRef}
                  value={chatInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setChatInput(val);
                    
                    const lastAt = val.lastIndexOf('@');
                    if (lastAt !== -1) {
                      const afterAt = val.substring(lastAt + 1);
                      if (!afterAt.includes(' ')) {
                        setShowSnippetMenu(true);
                        setSnippetSearchQuery(afterAt.toLowerCase());
                        setFilteredNotes(availableNotes.filter(n => n.title.toLowerCase().includes(afterAt.toLowerCase())));
                        return;
                      }
                    }
                    setShowSnippetMenu(false);
                  }}
                  onKeyDown={(e) => {
                    if (showSnippetMenu && e.key === 'Escape') {
                      setShowSnippetMenu(false);
                      e.preventDefault();
                      return;
                    }
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (!uploadProgress && !isThinking) handleChatSubmit();
                    }
                  }}
                  placeholder={uploadProgress ? "Uploading file..." : "Ask anything... (type @ to insert snippet)"}
                  disabled={uploadProgress}
                  className="w-full max-h-48 min-h-[36px] py-[8px] mb-2 bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-foreground/40 disabled:opacity-50"
                  rows={1}
                  style={{ height: "auto" }}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={(!chatInput.trim() && attachments.length === 0) || uploadProgress || isThinking}
                className="absolute right-3 bottom-2 w-9 h-9 rounded-full flex items-center justify-center bg-black text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </form>
            <div className="text-center mt-2 text-[11px] text-foreground/40 font-light">
              Lumina can make mistakes. Verify important information.
            </div>
          </div>
        </div>
              </>
          )}

          {/* Search Modal */}
          <AnimatePresence>
            {showSearchModal && (
              <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowSearchModal(false)}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  onClick={e => e.stopPropagation()}
                  className="w-full max-w-2xl bg-background rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-foreground/10 overflow-hidden flex flex-col"
                >
                  <div className="flex items-center px-4 py-3 border-b border-foreground/[0.06]">
                    <Search className="w-5 h-5 text-foreground/40 mr-3 shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchModalQuery}
                      onChange={e => setSearchModalQuery(e.target.value)}
                      placeholder="Search messages across all sessions..."
                      className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-foreground placeholder:text-foreground/40"
                    />
                    <div className="text-[10px] font-bold tracking-wider text-foreground/30 uppercase ml-3 shrink-0 px-2 py-1 bg-foreground/5 rounded">Esc</div>
                  </div>
                  
                  <div className="max-h-[60vh] overflow-y-auto">
                    {isSearching ? (
                      <div className="px-6 py-10 text-center text-[13px] text-foreground/40 flex items-center justify-center gap-2">
                        <div className="w-3 h-3 border-2 border-foreground/20 border-t-black rounded-full animate-spin"></div>
                        Searching...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="p-2 space-y-1">
                        {searchResults.map((result, idx) => (
                          <div 
                            key={idx}
                            onClick={() => {
                              setShowSearchModal(false);
                              const session = sessions.find(s => s.id === result.sessionId);
                              if (session) selectSession(session);
                            }}
                            className="p-3 hover:bg-foreground/[0.03] rounded-xl cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[12px] font-semibold text-foreground">{result.sessionTitle || "Untitled Session"}</span>
                              <span className="text-[11px] text-foreground/40">• {new Date(result.createdAt).toLocaleDateString()}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${result.role === 'USER' ? 'bg-foreground/5 text-foreground/60' : 'bg-primary/10 text-primary'}`}>
                                {result.role === 'USER' ? 'You' : 'Lumina'}
                              </span>
                            </div>
                            <div className="text-[13px] text-foreground/70 leading-relaxed font-light">
                              {result.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : searchModalQuery.length >= 2 ? (
                      <div className="px-6 py-10 text-center text-[13px] text-foreground/40">
                        No results found for "{searchModalQuery}"
                      </div>
                    ) : (
                      <div className="px-6 py-8 flex flex-col items-center justify-center text-center">
                        <MessageSquare className="w-8 h-8 text-foreground/10 mb-3" />
                        <span className="text-[13px] text-foreground/40 font-medium">Type at least 2 characters to search across all your chats</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
  );

  // Helper for Sidebar Items
  function renderSessionItem(session: ChatSession) {
    const isSelected = activeSession?.id === session.id;
    const isEditing = editingId === session.id.toString(); // assuming editingId is still string in state
    const isMenuOpen = activeMenuId === session.id.toString();

    return (
      <div
        key={session.id}
        className={`relative px-3 py-2.5 rounded-xl transition-all flex items-center justify-between group ${
          isSelected
            ? "bg-black text-white shadow-sm"
            : "hover:bg-foreground/[0.04] text-foreground cursor-pointer"
        }`}
        onClick={() => {
          if (!isEditing) selectSession(session);
        }}
      >
        <div className="flex-1 min-w-0 pr-4">
          {isEditing ? (
            <input
              type="text"
              autoFocus
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onBlur={() => handleRenameSubmit(session.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameSubmit(session.id);
                if (e.key === "Escape") setEditingId(null);
              }}
              className="w-full bg-background text-foreground text-[13px] font-semibold px-2 py-1 rounded outline-none border border-foreground/20"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className={`text-[13px] font-semibold truncate ${isSelected ? "text-white" : "text-foreground/80"}`}>
              {session.title || "Untitled Session"}
            </p>
          )}
        </div>
        
        {/* 3 Dots Menu Button */}
        <div className={`absolute right-2 flex items-center ${isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity ${isSelected ? "text-white" : "text-foreground/40"}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenuId(isMenuOpen ? null : session.id.toString());
            }}
            className={`p-1 rounded transition-colors cursor-pointer ${isSelected ? "hover:bg-background/20" : "hover:bg-foreground/10"}`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute right-8 top-8 w-32 bg-background rounded-lg shadow-xl border border-foreground/[0.08] py-1 z-50 text-foreground flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => {
                  setEditingId(session.id.toString());
                  setEditingTitle(session.title);
                  setActiveMenuId(null);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-foreground/[0.04] text-left cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-foreground/60" /> Rename
              </button>
              <button 
                onClick={() => {
                  selectSession(session);
                  setActiveMenuId(null);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-foreground/[0.04] text-left cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-foreground/60" /> Edit Session
              </button>
              <button 
                onClick={() => {
                  handlePinSession(session);
                  setActiveMenuId(null);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-foreground/[0.04] text-left cursor-pointer"
              >
                <Pin className="w-3.5 h-3.5 text-foreground/60" /> {session.pinned ? "Unpin" : "Pin"}
              </button>

              <div className="h-px w-full bg-foreground/[0.06] my-1" />

              <button 
                onClick={() => {
                  handleExportSession(session.id, 'txt');
                  setActiveMenuId(null);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-foreground/[0.04] text-left cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-foreground/60" /> Export as TXT
              </button>
              <button 
                onClick={() => {
                  handleExportSession(session.id, 'html');
                  setActiveMenuId(null);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-foreground/[0.04] text-left cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-foreground/60" /> Export as HTML
              </button>

              <div className="h-px w-full bg-foreground/[0.06] my-1" />
              <button 
                onClick={() => {
                  handleDeleteSession(session.id);
                  setActiveMenuId(null);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 text-left cursor-pointer font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-background">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
