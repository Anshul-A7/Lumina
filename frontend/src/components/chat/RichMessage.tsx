"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download, Sparkles, Copy, Share, RefreshCcw, MoreHorizontal, FileText, Check } from "lucide-react";
import { Mermaid } from "./Mermaid";
import PdfDocumentCard from "../dashboard/PdfDocumentCard";
import toast from "react-hot-toast";

interface RichMessageProps {
  content: string;
  isUser: boolean;
  animate?: boolean;
  onRequestGeneratePdf?: () => void;
  sessionId?: number;
  isPdfDisabled?: boolean;
}

export function RichMessage({ content, isUser, animate = false, onRequestGeneratePdf, sessionId, isPdfDisabled = false }: RichMessageProps) {
  const [displayedContent, setDisplayedContent] = useState(animate ? "" : content);
  const [isTyping, setIsTyping] = useState(animate);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!animate) {
      setDisplayedContent(content);
      setIsTyping(false);
      return;
    }

    setDisplayedContent(content);
    setIsTyping(false);
  }, [content, animate]);

  const handleGeneratePdf = async () => {
    if (onRequestGeneratePdf) {
      onRequestGeneratePdf();
    } else {
      // Fallback
      try {
        const PdfService = await import("@/lib/pdf.service");
        await PdfService.generateAndDownloadPdf(content, "ai-response");
        toast.success("PDF generated successfully!");
      } catch (err) {
        console.error("Failed to generate PDF", err);
        toast.error("Failed to generate PDF. Please try again.");
      }
    }
  };

  if (isUser) {
    return (
      <div className="flex w-full justify-end">
        <div className="max-w-[85%] sm:max-w-[75%] rounded-3xl px-5 py-3.5 text-[15px] leading-relaxed shadow-sm bg-secondary text-foreground border border-foreground/[0.02]">
          {content.split("\n").map((line, i) => (
            <p key={i} className="mb-1.5 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // AI Message with Markdown
  let preText = displayedContent;
  let pdfTitle = "Generated Document";
  let pdfContent = "";
  let hasPdf = false;

  const pdfMatch = displayedContent.match(/([\s\S]*?)<pdf_document(?:\s+title="([^"]+)")?>([\s\S]*?)(?:<\/pdf_document>|$)/i);

  if (pdfMatch) {
    hasPdf = true;
    preText = pdfMatch[1].trim();
    if (pdfMatch[2]) {
      pdfTitle = pdfMatch[2];
    }
    pdfContent = pdfMatch[3].trim();
  }

  // Do not render empty assistant messages while waiting for initial tokens
  if ((!preText || preText.trim().length === 0) && !hasPdf && !isTyping) {
    return null;
  }

  return (
    <div className="flex w-full justify-start relative group">
      <div className="w-full max-w-full lg:max-w-[90%] xl:max-w-[85%]">
        <div 
          ref={contentRef}
          className="text-[15px] leading-relaxed text-black"
        >
          {preText && (
            <div className="markdown-content mb-3">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}: any) {
                    const match = /language-(\w+)/.exec(className || '')
                    const isMermaid = match && match[1] === 'mermaid'
                    if (!inline && isMermaid) {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} />
                    }
                    return !inline && match ? (
                      <div className="bg-primary text-primary-foreground text-sm rounded-lg p-4 my-2 overflow-x-auto font-mono">
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
                {preText}
              </ReactMarkdown>
            </div>
          )}
          
          {hasPdf && (
            <PdfDocumentCard title={pdfTitle} initialContent={pdfContent} sessionId={sessionId} />
          )}

          {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-black animate-pulse" />}
        </div>

        {/* Footer Actions (Only visible after typing and when content is non-empty) */}
        {!isTyping && (displayedContent.trim().length > 0 || hasPdf) && (
          <div className="mt-4 flex items-center gap-2 text-black/40">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(content);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/[0.04] hover:text-black transition-colors cursor-pointer" 
              title="Copy"
            >
              {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/[0.04] hover:text-black transition-colors cursor-pointer" title="Share">
              <Share className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/[0.04] hover:text-black transition-colors cursor-pointer" title="Regenerate">
              <RefreshCcw className="w-4 h-4" />
            </button>
            
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/[0.04] hover:text-black transition-colors cursor-pointer ${showMoreMenu ? 'bg-black/[0.04] text-black' : ''}`}
                title="More"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {/* More Dropdown Menu */}
              {showMoreMenu && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-primary rounded-2xl shadow-xl py-2 z-50 text-primary-foreground/90 text-[14px]">
                  <div className="px-3 py-1.5 text-xs text-white/50 mb-1">
                    Options
                  </div>
                  <button 
                    onClick={() => {
                      if (isPdfDisabled) return;
                      setShowMoreMenu(false);
                      handleGeneratePdf();
                    }}
                    disabled={isPdfDisabled}
                    title={isPdfDisabled ? "Daily PDF limit reached. Upgrade to generate more." : "Generate PDF"}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${isPdfDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10 cursor-pointer"}`}
                  >
                    <FileText className="w-4 h-4" />
                    Generate PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
