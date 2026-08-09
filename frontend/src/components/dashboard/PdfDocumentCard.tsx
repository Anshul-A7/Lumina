"use client";

import React, { useState, useEffect } from 'react';
import { Edit3, Download, Maximize, Minimize, Copy, Check, Eye, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { generateAndDownloadPdf, deletePdf } from '@/lib/pdf.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Mermaid } from '@/components/chat/Mermaid';

interface PdfDocumentCardProps {
  title: string;
  initialContent: string;
  sessionId?: number;
}

export default function PdfDocumentCard({ title, initialContent, sessionId }: PdfDocumentCardProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Sync state if initialContent changes from parent
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  // Synchronize immediately with any auto-saved or saved changes from Studio / Edit view
  useEffect(() => {
    const syncSavedContent = (e?: any) => {
      if (e?.detail?.content) {
        setContent(e.detail.content);
        return;
      }
      const storedContent = sessionStorage.getItem('lumina_edit_pdf_content');
      if (storedContent) {
        setContent(storedContent);
      }
    };

    window.addEventListener('lumina:pdf_saved', syncSavedContent);
    return () => window.removeEventListener('lumina:pdf_saved', syncSavedContent);
  }, []);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await generateAndDownloadPdf(content, title);
      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("Failed to generate PDF", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleOpenPreview = () => {
    setIsPreviewing(true);
  };

  const handleOpenEdit = () => {
    sessionStorage.setItem('lumina_edit_pdf_content', content);
    sessionStorage.setItem('lumina_edit_pdf_title', title);
    if (sessionId) {
      sessionStorage.setItem('lumina_edit_pdf_session_id', String(sessionId));
      router.push(`/dashboard?tab=edit-pdf&session=${sessionId}`);
    } else {
      router.push('/dashboard?tab=edit-pdf');
    }
  };

  // The artifact-style view for previewing
  const DocumentView = (
    <div className={`flex flex-col overflow-hidden transition-all duration-300 bg-[#F3F4F6] ${isMaximized ? 'w-full h-full rounded-none' : 'w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl border border-black/10'}`}>
      
      {/* Dark Toolbar Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1C1C1C] text-white shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setIsPreviewing(false);
              setIsMaximized(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Minimize to Chat"
          >
            <Minimize className="w-3.5 h-3.5" />
            <span>Minimize</span>
          </button>
          <div className="w-px h-4 bg-white/10 mx-1"></div>
          <button 
            onClick={handleOpenEdit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-sm cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Open Studio</span>
          </button>
        </div>
        
        <div className="flex items-center gap-1.5">
          <button 
            onClick={handleCopy}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Copy Content"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors text-xs font-semibold shadow-sm disabled:opacity-50 cursor-pointer"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? "Saving..." : "Download PDF"}</span>
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title={isMaximized ? "Restore down" : "Maximize Full Screen"}
          >
            {isMaximized ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMaximized ? "Restore" : "Maximize"}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col bg-[#F3F4F6]">
        <div className="flex-1 overflow-y-auto w-full flex flex-col items-center">
          <div className="w-full h-full p-4 sm:p-8 flex flex-col items-center">
            <div className="prose prose-sm sm:prose-base max-w-3xl w-full bg-white shadow-md border border-gray-200 rounded-xl p-8 sm:p-14 min-h-[1056px] shrink-0 mb-8">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({node, inline, className, children, ...props}: any) {
                    const match = /language-(\w+)/.exec(className || '')
                    const isMermaid = match && match[1] === 'mermaid'
                    if (!inline && isMermaid) {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} />
                    }
                    return !inline && match ? (
                      <div className="bg-[#000000] text-white text-sm rounded-xl p-4 my-3 overflow-x-auto font-mono border border-zinc-800 shadow-md">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </div>
                    ) : (
                      <code className="bg-black/5 rounded px-1.5 py-0.5 text-sm font-mono text-pink-600" {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* The compact card shown in the chat stream */}
      <div className="w-full max-w-2xl bg-white border border-black/[0.08] rounded-2xl overflow-hidden shadow-sm my-2 transition-all hover:shadow-md">
        <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FDFBF7]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-black">{title}</h3>
              <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Document Ready • Auto-synced
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={handleOpenPreview}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-black/70 hover:bg-black/[0.06] hover:text-black transition-colors cursor-pointer border border-black/[0.08]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button 
              onClick={handleOpenEdit}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-sm cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-black hover:bg-black/80 transition-colors disabled:opacity-50 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? "Saving..." : "Download"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* The modal showing the updated document when previewing */}
      {isPreviewing && (
        <div className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center animate-in fade-in zoom-in-95 duration-200 ${isMaximized ? 'p-0' : 'p-4 sm:p-6'}`}>
          {DocumentView}
        </div>
      )}
    </>
  );
}
