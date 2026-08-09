"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { generateAndDownloadPdf } from '@/lib/pdf.service';
import { updateSessionPdf, editDocumentWithAi } from '@/lib/chat.service';
import { Send, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the MDX Editor since it uses browser APIs
const MdxEditorComponent = dynamic(
  () => import('./MdxEditorComponent'),
  { ssr: false, loading: () => <div className="p-8 text-center text-gray-500 font-medium">Loading Document Studio...</div> }
);

function EditPdfViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("Document");
  const [content, setContent] = useState("");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAiEditing, setIsAiEditing] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from session storage and URL query params
    const storedContent = sessionStorage.getItem('lumina_edit_pdf_content') || '';
    const storedTitle = sessionStorage.getItem('lumina_edit_pdf_title') || 'Document';
    const paramSession = searchParams.get('session');
    const storedSessionId = paramSession 
      ? Number(paramSession) 
      : (sessionStorage.getItem('lumina_edit_pdf_session_id') ? Number(sessionStorage.getItem('lumina_edit_pdf_session_id')) : null);

    setContent(storedContent);
    setTitle(storedTitle);
    if (storedSessionId) {
      setSessionId(storedSessionId);
      sessionStorage.setItem('lumina_edit_pdf_session_id', String(storedSessionId));
    }
    setIsLoaded(true);
  }, [searchParams]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await generateAndDownloadPdf(content, title);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Immediate and Permanent Save to SessionStorage, Database & Active State
  const handleSaveAndReturn = async (latestMarkdown?: string) => {
    const finalContent = (typeof latestMarkdown === 'string' && latestMarkdown.trim()) ? latestMarkdown : content;
    
    // 1. Save to session storage
    sessionStorage.setItem('lumina_edit_pdf_content', finalContent);
    sessionStorage.setItem('lumina_edit_pdf_title', title);

    // 2. Persist update directly into the database
    const activeSessionId = sessionId || (typeof window !== 'undefined' ? Number(sessionStorage.getItem('lumina_edit_pdf_session_id')) : null);

    if (activeSessionId) {
      try {
        await updateSessionPdf(activeSessionId, title, finalContent);
        console.log("[Lumina Studio] Successfully saved document to database for session:", activeSessionId);
      } catch (err) {
        console.warn("[Lumina Studio] Database update error (saved locally):", err);
      }
    }

    // 3. Dispatch global event so chat cards in memory update immediately
    window.dispatchEvent(new CustomEvent("lumina:pdf_saved", {
      detail: { content: finalContent, title, sessionId: activeSessionId }
    }));

    // 4. Return to chat dashboard preserving session ID
    if (activeSessionId) {
      router.push(`/dashboard?session=${activeSessionId}`);
    } else {
      router.push('/dashboard');
    }
  };

  // In-place AI Co-Pilot editing right inside Document Studio
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPrompt.trim() || isAiEditing) return;
    
    const promptToApply = editPrompt.trim();
    setEditPrompt("");
    setIsAiEditing(true);
    setAiSuccessMessage(null);

    try {
      const updatedMarkdown = await editDocumentWithAi(content, promptToApply);
      
      if (updatedMarkdown && updatedMarkdown.trim()) {
        setContent(updatedMarkdown);
        sessionStorage.setItem('lumina_edit_pdf_content', updatedMarkdown);
        sessionStorage.setItem('lumina_edit_pdf_title', title);
        
        // Sync with database
        const activeSessionId = sessionId || (typeof window !== 'undefined' ? Number(sessionStorage.getItem('lumina_edit_pdf_session_id')) : null);
        if (activeSessionId) {
          updateSessionPdf(activeSessionId, title, updatedMarkdown).catch(() => {});
        }

        window.dispatchEvent(new CustomEvent("lumina:pdf_saved", {
          detail: { content: updatedMarkdown, title, sessionId: activeSessionId }
        }));

        setAiSuccessMessage(`AI applied: "${promptToApply.length > 40 ? promptToApply.substring(0, 37) + '...' : promptToApply}"`);
        setTimeout(() => setAiSuccessMessage(null), 4000);
      }
    } catch (err: any) {
      console.error("AI Edit error:", err);
      alert(err?.response?.data?.message || "Failed to apply AI edit. Please try again.");
    } finally {
      setIsAiEditing(false);
    }
  };

  const handleBack = (latestMarkdown?: string) => {
    handleSaveAndReturn(latestMarkdown);
  };

  if (!isLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F3F4F6]">
        <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] relative overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full flex flex-col items-center relative z-10">
        <MdxEditorComponent 
          key={`mdx-editor-${title}-${sessionId || 'draft'}`}
          markdown={content} 
          onChange={(newMarkdown) => {
            setContent(newMarkdown);
            sessionStorage.setItem('lumina_edit_pdf_content', newMarkdown);
            sessionStorage.setItem('lumina_edit_pdf_title', title);
            window.dispatchEvent(new CustomEvent("lumina:pdf_saved", {
              detail: { content: newMarkdown, title, sessionId }
            }));
          }} 
          title={title}
          onBack={handleBack}
          onCopy={handleCopy}
          isCopied={isCopied}
          onDownload={handleDownload}
          isDownloading={isDownloading}
          onSaveAndReturn={handleSaveAndReturn}
        />
      </div>

      {/* Floating AI Input Box with In-Place Execution */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-30 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 overflow-hidden pointer-events-auto transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.16)]">
          
          <div className="px-4 py-1.5 bg-gray-50/80 text-xs font-medium text-gray-500 border-b border-gray-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              {isAiEditing ? "AI is rewriting document..." : (aiSuccessMessage || "Tell AI what to change in the document...")}
            </span>
            {aiSuccessMessage ? (
              <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Updated
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-wider text-purple-600 font-bold bg-purple-100/80 px-2.5 py-0.5 rounded-full">
                AI Co-pilot
              </span>
            )}
          </div>

          <form onSubmit={handleSubmitEdit} className="p-2 flex items-center gap-2">
            <input
              type="text"
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              disabled={isAiEditing}
              placeholder={isAiEditing ? "Applying AI edits in-place..." : "e.g. 'Add a section on Conclusion' or 'Make 2nd paragraph concise'"}
              className="flex-1 bg-transparent border-none text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-0 px-3 py-1.5 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!editPrompt.trim() || isAiEditing}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-transform active:scale-95 disabled:opacity-40 disabled:bg-gray-400 cursor-pointer shrink-0 shadow-sm"
              title="Apply AI Edits"
            >
              {isAiEditing ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Send className="w-4 h-4 ml-0.5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function EditPdfView() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-[#F3F4F6]">
        <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
      </div>
    }>
      <EditPdfViewContent />
    </Suspense>
  );
}
