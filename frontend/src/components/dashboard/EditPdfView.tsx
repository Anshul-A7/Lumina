"use client";

import React, { useState, useEffect } from 'react';
import { generateAndDownloadPdf } from '@/lib/pdf.service';
import { Send, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the MDX Editor since it uses browser APIs
const MdxEditorComponent = dynamic(
  () => import('./MdxEditorComponent'),
  { ssr: false, loading: () => <div className="p-8 text-center text-gray-500 font-medium">Loading Word Editor...</div> }
);

export default function EditPdfView() {
  const router = useRouter();
  const [title, setTitle] = useState("Editing Document");
  const [content, setContent] = useState("");
  const [editPrompt, setEditPrompt] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load from session storage
    const storedContent = sessionStorage.getItem('lumina_edit_pdf_content');
    const storedTitle = sessionStorage.getItem('lumina_edit_pdf_title');
    if (storedContent) setContent(storedContent);
    if (storedTitle) setTitle(storedTitle);
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

  const handleSaveAndReturn = () => {
    sessionStorage.setItem('lumina_edit_pdf_content', content);
    sessionStorage.setItem('lumina_edit_pdf_title', title);
    window.dispatchEvent(new CustomEvent("lumina:pdf_saved", {
      detail: { content, title }
    }));
    router.push('/dashboard');
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPrompt.trim()) return;
    
    // Dispatch custom event to trigger AI edit from dashboard/page.tsx
    const event = new CustomEvent("lumina:edit_pdf", {
      detail: {
        content: content,
        instruction: editPrompt
      }
    });
    window.dispatchEvent(event);
    
    // Save state and return to chat
    sessionStorage.setItem('lumina_edit_pdf_content', content);
    sessionStorage.setItem('lumina_edit_pdf_title', title);
    setEditPrompt("");
    router.push('/dashboard');
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
              detail: { content: newMarkdown, title }
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

      {/* Floating AI Input Box with curved pill design */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-30 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 overflow-hidden pointer-events-auto transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.16)]">
          <div className="px-4 py-1.5 bg-gray-50/80 text-xs font-medium text-gray-500 border-b border-gray-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Tell AI what to change in the document...
            </span>
            <span className="text-[10px] uppercase tracking-wider text-purple-600 font-bold bg-purple-100/80 px-2.5 py-0.5 rounded-full">AI Co-pilot</span>
          </div>
          <form onSubmit={handleSubmitEdit} className="p-2 flex items-center gap-2">
            <input
              type="text"
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              placeholder="e.g. 'Shorten the introduction' or 'Add a table summarizing key metrics'"
              className="flex-1 bg-transparent border-none text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-0 px-3 py-1.5"
            />
            <button
              type="submit"
              disabled={!editPrompt.trim()}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-transform active:scale-95 disabled:opacity-40 disabled:bg-gray-400 cursor-pointer shrink-0 shadow-sm"
              title="Apply AI Edits"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
