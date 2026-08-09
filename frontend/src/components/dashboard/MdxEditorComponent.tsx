'use client'

import React, { useMemo, useEffect } from 'react';
import { 
  MDXEditor, 
  headingsPlugin, 
  listsPlugin, 
  quotePlugin, 
  thematicBreakPlugin, 
  markdownShortcutPlugin, 
  toolbarPlugin, 
  tablePlugin, 
  linkPlugin, 
  linkDialogPlugin, 
  UndoRedo, 
  BoldItalicUnderlineToggles, 
  StrikeThroughSupSubToggles, 
  CodeToggle, 
  InsertTable, 
  InsertThematicBreak, 
  CreateLink, 
  BlockTypeSelect, 
  ListsToggle 
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { 
  ArrowLeft, 
  Check, 
  Copy, 
  Download, 
  Baseline, 
  Highlighter, 
  Table as TableIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Indent, 
  Outdent, 
  FileText, 
  Clock, 
  Save, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface MdxEditorComponentProps {
  markdown: string;
  onChange: (markdown: string) => void;
  title: string;
  onBack: () => void;
  onCopy: () => void;
  isCopied: boolean;
  onDownload: () => void;
  isDownloading: boolean;
  onSaveAndReturn: () => void;
}

export default function MdxEditorComponent({ 
  markdown, 
  onChange, 
  title, 
  onBack, 
  onCopy, 
  isCopied, 
  onDownload, 
  isDownloading,
  onSaveAndReturn 
}: MdxEditorComponentProps) {

  // Auto-save whenever markdown changes
  const handleEditorChange = (newMarkdown: string) => {
    onChange(newMarkdown);
    // Instant auto-save to session storage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('lumina_edit_pdf_content', newMarkdown);
      sessionStorage.setItem('lumina_edit_pdf_title', title);
      window.dispatchEvent(new CustomEvent('lumina:pdf_saved', { detail: { content: newMarkdown, title } }));
    }
  };

  // Compute live word & character stats
  const stats = useMemo(() => {
    const text = markdown.trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;
    const readTime = Math.max(1, Math.ceil(words / 200));
    return { words, chars, readTime };
  }, [markdown]);

  return (
    <div className="w-full h-full flex flex-col bg-[#F3F4F6] select-text">
      <MDXEditor
        markdown={markdown}
        onChange={handleEditorChange}
        className="w-full flex-1 flex flex-col font-sans"
        contentEditableClassName="prose prose-sm sm:prose-base max-w-none !px-28 !py-20 min-h-[1056px] focus:outline-none bg-white shadow-lg border border-gray-200 mt-6 mb-36 mx-auto w-full max-w-[850px] rounded-2xl transition-all"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          tablePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="w-full bg-white border-b border-gray-300 shadow-sm sticky top-0 z-40">
                
                {/* 1. TOP TITLE & QUICK ACTION BAR (Edge-to-Edge with Curved Buttons) */}
                <div className="w-full flex items-center justify-between px-4 py-2 bg-[#1E293B] text-white border-b border-[#0F172A]">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={onBack} 
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
                      title="Back to Chat / Workspace"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shadow-inner">
                        ✦
                      </div>
                      <span className="text-xs font-semibold tracking-wide text-white">Lumina Studio</span>
                      <span className="text-white/40 text-xs">|</span>
                      <span className="text-xs text-white/90 font-medium truncate max-w-xs sm:max-w-md">{title || "Document"}</span>
                    </div>
                  </div>

                  {/* Document Stats & Curved Action Buttons */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden md:flex items-center gap-2.5 text-[11px] text-slate-200 bg-[#0F172A] px-3 py-1 rounded-full border border-white/10">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-purple-400" />
                        {stats.words} words
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-400" />
                        {stats.readTime} min read
                      </span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Auto-saved
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={onCopy} 
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-semibold border border-white/20 cursor-pointer shadow-2xs"
                        title="Copy Markdown to clipboard"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>

                      {/* Prominent Curved Save & Return to Chat button */}
                      <button 
                        onClick={onSaveAndReturn} 
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs font-bold shadow-md hover:shadow-lg cursor-pointer transform active:scale-95"
                        title="Save changes and return to chat session"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save & Return</span>
                      </button>

                      {/* Curved Download PDF button */}
                      <button 
                        onClick={onDownload} 
                        disabled={isDownloading} 
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-colors text-xs font-semibold shadow-sm disabled:opacity-50 cursor-pointer"
                        title="Compile and Download formatted PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isDownloading ? "Saving..." : "PDF"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. LUMINA STUDIO FORMATTING TOOLBAR (Curved Controls Throughout) */}
                <div className="w-full bg-[#F8FAFC] px-4 py-2.5 border-b border-gray-300 overflow-x-auto flex items-stretch gap-4 min-h-[96px]">
                  
                  {/* GROUP 1: FONT & TYPOGRAPHY */}
                  <div className="flex flex-col justify-between border-r border-gray-300 pr-4 shrink-0">
                    <div className="flex flex-col gap-1.5">
                      {/* Curved Font Family & Size Controls */}
                      <div className="flex items-center gap-1.5">
                        <div className="relative">
                          <select defaultValue="Inter" className="border border-gray-300 rounded-xl bg-white text-xs px-3 py-1 w-36 h-7 font-medium text-gray-700 outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 shadow-2xs cursor-pointer">
                            <option value="Inter">Inter (Default)</option>
                            <option value="Calibri">Calibri</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Arial">Arial</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Courier New">Courier New</option>
                          </select>
                        </div>
                        <div className="relative">
                          <select defaultValue="12" className="border border-gray-300 rounded-xl bg-white text-xs px-2.5 py-1 w-14 h-7 font-medium text-gray-700 outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 shadow-2xs cursor-pointer">
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="14">14</option>
                            <option value="16">16</option>
                            <option value="18">18</option>
                            <option value="20">20</option>
                            <option value="24">24</option>
                          </select>
                        </div>
                      </div>

                      {/* Curved Font Formatting Buttons */}
                      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-2 py-0.5 w-fit shadow-2xs">
                        <BoldItalicUnderlineToggles />
                        <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                        <StrikeThroughSupSubToggles />
                        <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                        <CodeToggle />
                        <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                        
                        {/* Highlight Color */}
                        <button className="p-1 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center h-6 w-6 transition-colors cursor-pointer" title="Highlight Color">
                          <Highlighter className="w-3.5 h-3.5 text-gray-700" />
                          <div className="w-3 h-0.5 bg-amber-400 mt-0.5 rounded-full"></div>
                        </button>

                        {/* Font Color */}
                        <button className="p-1 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center h-6 w-6 transition-colors cursor-pointer" title="Font Color">
                          <Baseline className="w-3.5 h-3.5 text-gray-700 font-bold" />
                          <div className="w-3 h-0.5 bg-red-600 mt-0.5 rounded-full"></div>
                        </button>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 text-center mt-1 w-full block tracking-wide">Font</span>
                  </div>

                  {/* GROUP 2: PARAGRAPH & HEADINGS */}
                  <div className="flex flex-col justify-between border-r border-gray-300 pr-4 shrink-0">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        {/* Block Type Heading selector */}
                        <div className="bg-white border border-gray-200 rounded-xl px-1.5 py-0.5 shadow-2xs h-7 flex items-center">
                          <BlockTypeSelect />
                        </div>
                        {/* Undo / Redo */}
                        <div className="bg-white border border-gray-200 rounded-xl px-1.5 py-0.5 shadow-2xs h-7 flex items-center">
                          <UndoRedo />
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Lists Toggle */}
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-2 py-0.5 shadow-2xs h-7">
                          <ListsToggle />
                        </div>
                        {/* Text Alignment Curved Controls */}
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-1.5 py-0.5 shadow-2xs h-7 text-gray-600">
                          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-800" title="Align Left">
                            <AlignLeft className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800" title="Align Center">
                            <AlignCenter className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800" title="Align Right">
                            <AlignRight className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800" title="Justify">
                            <AlignJustify className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {/* Indent Controls */}
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-1.5 py-0.5 shadow-2xs h-7 text-gray-600">
                          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800" title="Decrease Indent">
                            <Outdent className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800" title="Increase Indent">
                            <Indent className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 text-center mt-1 w-full block tracking-wide">Paragraph</span>
                  </div>

                  {/* GROUP 3: TABLE & INSERT PROPER */}
                  <div className="flex flex-col justify-between border-r border-gray-300 pr-4 shrink-0">
                    <div className="flex items-center gap-2">
                      {/* Curved Table Insertion Box */}
                      <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-gray-300 hover:border-purple-500 hover:bg-purple-50/50 transition-all cursor-pointer shadow-2xs group min-w-[70px]">
                        <div className="flex items-center justify-center text-purple-600 mb-0.5 group-hover:scale-105 transition-transform">
                          <InsertTable />
                        </div>
                        <span className="text-[11px] font-bold text-gray-700 group-hover:text-purple-700">Table</span>
                      </div>

                      {/* Additional Insert Tools */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-2 py-0.5 shadow-2xs h-7">
                          <CreateLink />
                          <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                          <InsertThematicBreak />
                        </div>
                        <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1 px-1 font-medium">
                          <span>Link & Divider</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 text-center mt-1 w-full block tracking-wide">Insert</span>
                  </div>

                  {/* GROUP 4: LIVE AUTO-SYNC STATUS */}
                  <div className="flex flex-col justify-between pr-2 shrink-0">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2.5 bg-white border border-emerald-200 rounded-2xl px-3.5 py-1.5 shadow-2xs">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-emerald-900 leading-tight">Live Auto-Sync</span>
                          <span className="text-[9px] text-emerald-600 font-medium leading-tight">Saves to Chat & PDF</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 text-center mt-1 w-full block tracking-wide">Status</span>
                  </div>

                </div>
              </div>
            )
          })
        ]}
      />
    </div>
  )
}
