"use client";

import React, { useState, useEffect } from 'react';
import { generateAndDownloadPdf } from '@/lib/pdf.service';
import { updateSessionPdf, editDocumentWithAi } from '@/lib/chat.service';
import { Send, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the MDX Editor since it uses browser APIs
const MdxEditorComponent = dynamic(
  () => import('./MdxEditorComponent'),
  { ssr: false, loading: () => <div className="p-8 text-center text-gray-500 font-medium">Loading Document Studio...</div> }
);

export default function EditPdfView() {
  const router = useRouter();
  const [title, setTitle] = useState("Editing Document");
  const [content, setContent] = useState("");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAiEditing, setIsAiEditing] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load from session storage
    const storedContent = sessionStorage.getItem('lumina_edit_pdf_content');
    const storedTitle = sessionStorage.getItem('lumina_edit_pdf_title');
    const storedSessionId = sessionStorage.getItem('lumina_edit_pdf_session_id');

    if (storedContent) setContent(storedContent);
    if (storedTitle) setTitle(storedTitle);
    if (storedSessionId) setSessionId(Number(storedSessionId));
  }, []);

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

  const handleSaveAndReturn = async () => {
    // 1. Save to session storage
    sessionStorage.setItem('lumina_edit_pdf_content', content);
    sessionStorage.setItem('lumina_edit_pdf_title', title);

    // 2. If part of an active chat session, persist update to backend database
    if (sessionId) {
      try {
        await updateSessionPdf(sessionId, title, content);
      } catch (err) {
        console.warn("Could not sync PDF update with backend session, saved locally:", err);
      }
    }

    // 3. Dispatch global event so chat cards update immediately
    window.dispatchEvent(new CustomEvent("lumina:pdf_saved", {
      detail: { content, title, sessionId }
    }));

    // 4. Return to chat dashboard
    router.push('/dashboard');
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
      // Call AI to edit the markdown text in-place
      const updatedMarkdown = await editDocumentWithAi(content, promptToApply);
      
      if (updatedMarkdown && updatedMarkdown.trim()) {
        setContent(updatedMarkdown);
        sessionStorage.setItem('lumina_edit_pdf_content', updatedMarkdown);
        sessionStorage.setItem('lumina_edit_pdf_title', title);
        
        // Sync with backend session if available
        if (sessionId) {
          updateSessionPdf(sessionId, title, updatedMarkdown).catch(() => {});
        }

        window.dispatchEvent(new CustomEvent("lumina:pdf_saved", {
          detail: { content: updatedMarkdown, title, sessionId }
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

  const handleBack = () => {
    handleSaveAndReturn();
  };

  if (!isClient) return null;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] relative overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full flex flex-col items-center relative z-10">
        <MdxEditorComponent 
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
