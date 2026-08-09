'use client'

import React, { useMemo, useState, useRef } from 'react';
import { 
  MDXEditor, 
  MDXEditorMethods,
  headingsPlugin, 
  listsPlugin, 
  quotePlugin, 
  thematicBreakPlugin, 
  markdownShortcutPlugin, 
  toolbarPlugin, 
  tablePlugin, 
  linkPlugin, 
  linkDialogPlugin, 
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  UndoRedo, 
  BoldItalicUnderlineToggles, 
  StrikeThroughSupSubToggles, 
  CodeToggle, 
  InsertTable, 
  InsertThematicBreak, 
  InsertCodeBlock,
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
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Indent, 
  Outdent, 
  Save
} from 'lucide-react';

interface MdxEditorComponentProps {
  markdown: string;
  onChange: (markdown: string) => void;
  title: string;
  onBack: (latestMarkdown?: string) => void;
  onCopy: () => void;
  isCopied: boolean;
  onDownload: () => void;
  isDownloading: boolean;
  onSaveAndReturn: (latestMarkdown?: string) => void;
}

const HIGHLIGHT_COLORS = [
  { name: 'Yellow', value: '#FEF08A' },
  { name: 'Emerald', value: '#A7F3D0' },
  { name: 'Cyan', value: '#A5F3FC' },
  { name: 'Pink', value: '#FBCFE8' },
  { name: 'Orange', value: '#FED7AA' }
];

const TEXT_COLORS = [
  { name: 'Crimson', value: '#DC2626' },
  { name: 'Royal Blue', value: '#2563EB' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Purple', value: '#7C3AED' },
  { name: 'Amber', value: '#D97706' },
  { name: 'Dark Slate', value: '#1E293B' }
];

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

  const editorRef = useRef<MDXEditorMethods>(null);

  // Real, active typography customization states
  const [fontFamily, setFontFamily] = useState('Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif');
  const [fontSize, setFontSize] = useState('16px');
  
  // Color picker popover states
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [activeHighlightColor, setActiveHighlightColor] = useState('#FEF08A');
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [activeTextColor, setActiveTextColor] = useState('#DC2626');

  // Auto-save whenever markdown changes
  const handleEditorChange = (newMarkdown: string) => {
    onChange(newMarkdown);
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

  // Real Text Highlighter Function
  const applyHighlight = (color: string) => {
    setActiveHighlightColor(color);
    setShowHighlightPicker(false);
    
    const selected = editorRef.current?.getSelectionMarkdown() || window.getSelection()?.toString() || '';
    if (selected.trim()) {
      const highlighted = `<mark style="background-color: ${color}; padding: 2px 5px; border-radius: 4px;">${selected}</mark>`;
      editorRef.current?.insertMarkdown(highlighted);
    } else {
      editorRef.current?.insertMarkdown(`<mark style="background-color: ${color}; padding: 2px 5px; border-radius: 4px;">Highlighted text</mark>`);
    }
    editorRef.current?.focus();
  };

  // Real Text Color Function
  const applyTextColor = (color: string) => {
    setActiveTextColor(color);
    setShowTextColorPicker(false);

    const selected = editorRef.current?.getSelectionMarkdown() || window.getSelection()?.toString() || '';
    if (selected.trim()) {
      const colored = `<span style="color: ${color}; font-weight: 600;">${selected}</span>`;
      editorRef.current?.insertMarkdown(colored);
    } else {
      editorRef.current?.insertMarkdown(`<span style="color: ${color}; font-weight: 600;">Colored text</span>`);
    }
    editorRef.current?.focus();
  };

  // Real Alignment Functions (Left, Center, Right, Justify)
  const applyAlignment = (align: 'left' | 'center' | 'right' | 'justify') => {
    const selected = editorRef.current?.getSelectionMarkdown() || window.getSelection()?.toString() || '';
    const textToAlign = selected.trim() ? selected : 'Aligned paragraph content';
    const alignedMarkdown = `\n\n<div align="${align}">\n\n${textToAlign}\n\n</div>\n\n`;
    editorRef.current?.insertMarkdown(alignedMarkdown);
    editorRef.current?.focus();
  };

  // Real Indent / Outdent Functions
  const applyIndent = () => {
    const selected = editorRef.current?.getSelectionMarkdown() || window.getSelection()?.toString() || '';
    if (selected.trim()) {
      const indented = selected.split('\n').map(line => `> ${line}`).join('\n');
      editorRef.current?.insertMarkdown(`\n\n${indented}\n\n`);
    } else {
      editorRef.current?.insertMarkdown(`\n\n> Indented quote block\n\n`);
    }
    editorRef.current?.focus();
  };

  const applyOutdent = () => {
    const selected = editorRef.current?.getSelectionMarkdown() || window.getSelection()?.toString() || '';
    if (selected.trim()) {
      const outdented = selected.split('\n').map(line => line.replace(/^(\s{2,4}|>\s?)/, '')).join('\n');
      editorRef.current?.insertMarkdown(`\n\n${outdented}\n\n`);
    }
    editorRef.current?.focus();
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#F3F4F6] select-text">
      <MDXEditor
        ref={editorRef}
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
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: 'JavaScript',
              ts: 'TypeScript',
              py: 'Python',
              java: 'Java',
              sql: 'SQL',
              html: 'HTML',
              css: 'CSS',
              json: 'JSON',
              bash: 'Bash',
              markdown: 'Markdown'
            }
          }),
          diffSourcePlugin({ viewMode: 'rich-text' }),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="w-full bg-white border-b border-gray-300 shadow-sm sticky top-0 z-40">
                
                {/* 1. TOP TITLE & QUICK ACTION BAR (Edge-to-Edge with Curved Buttons) */}
                <div className="w-full flex items-center justify-between px-4 py-2 bg-[#1E293B] text-white border-b border-[#0F172A]">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => onBack(editorRef.current?.getMarkdown() || markdown)} 
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

                  {/* Header Metrics & Main Action Buttons */}
                  <div className="flex items-center gap-4">
                    {/* Live Stats */}
                    <div className="hidden md:flex items-center gap-3 text-xs text-zinc-300 font-medium bg-black/30 px-3.5 py-1 rounded-full border border-white/10">
                      <span>{stats.words} words</span>
                      <span className="text-white/20">•</span>
                      <span>{stats.readTime} min read</span>
                      <span className="text-white/20">•</span>
                      <span className="flex items-center gap-1.5 text-emerald-400">
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
                        onClick={() => onSaveAndReturn(editorRef.current?.getMarkdown() || markdown)} 
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

                {/* 2. LUMINA STUDIO FORMATTING TOOLBAR (All Controls 100% Real & Active) */}
                <DiffSourceToggleWrapper>
                  <div className="w-full bg-[#F8FAFC] px-4 py-2.5 border-b border-gray-300 overflow-x-auto flex items-stretch gap-4 min-h-[96px]">
                    
                    {/* GROUP 1: FONT & TYPOGRAPHY */}
                    <div className="flex flex-col justify-between border-r border-gray-300 pr-4 shrink-0">
                      <div className="flex flex-col gap-1.5">
                        {/* Real Font Family & Size Controls */}
                        <div className="flex items-center gap-1.5">
                          <div className="relative">
                            <select 
                              value={fontFamily}
                              onChange={(e) => setFontFamily(e.target.value)}
                              className="border border-gray-300 rounded-xl bg-white text-xs px-3 py-1 w-36 h-7 font-medium text-gray-700 outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 shadow-2xs cursor-pointer"
                              title="Change Document Font Family"
                            >
                              <option value='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'>Inter (Default)</option>
                              <option value='Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif'>Calibri</option>
                              <option value='"Times New Roman", Times, Georgia, serif'>Times New Roman</option>
                              <option value='Arial, Helvetica, sans-serif'>Arial</option>
                              <option value='Georgia, serif'>Georgia</option>
                              <option value='"Courier New", Courier, monospace'>Courier New</option>
                              <option value='"JetBrains Mono", Menlo, Monaco, Consolas, monospace'>JetBrains Mono</option>
                            </select>
                          </div>
                          <div className="relative">
                            <select 
                              value={fontSize}
                              onChange={(e) => setFontSize(e.target.value)}
                              className="border border-gray-300 rounded-xl bg-white text-xs px-2.5 py-1 w-14 h-7 font-medium text-gray-700 outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 shadow-2xs cursor-pointer"
                              title="Change Document Base Font Size"
                            >
                              <option value="12px">12</option>
                              <option value="14px">14</option>
                              <option value="16px">16</option>
                              <option value="18px">18</option>
                              <option value="20px">20</option>
                              <option value="24px">24</option>
                            </select>
                          </div>
                        </div>

                        {/* Real Font Formatting Buttons with Highlight & Text Color Popovers */}
                        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-2 py-0.5 w-fit shadow-2xs relative">
                          <BoldItalicUnderlineToggles />
                          <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                          <StrikeThroughSupSubToggles />
                          <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                          <CodeToggle />
                          <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                          
                          {/* Real Highlight Color Picker */}
                          <div className="relative">
                            <button 
                              type="button"
                              onClick={() => {
                                setShowHighlightPicker(!showHighlightPicker);
                                setShowTextColorPicker(false);
                              }}
                              className="p-1 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center h-6 w-6 transition-colors cursor-pointer" 
                              title="Highlight Text with Color"
                            >
                              <Highlighter className="w-3.5 h-3.5 text-gray-700" />
                              <div className="w-3 h-0.5 mt-0.5 rounded-full" style={{ backgroundColor: activeHighlightColor }}></div>
                            </button>

                            {showHighlightPicker && (
                              <div className="absolute top-8 left-0 z-50 bg-white border border-gray-200 rounded-xl p-2 shadow-xl flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                                {HIGHLIGHT_COLORS.map((col) => (
                                  <button
                                    key={col.name}
                                    type="button"
                                    onClick={() => applyHighlight(col.value)}
                                    className="w-5 h-5 rounded-full border border-gray-300 hover:scale-110 transition-transform cursor-pointer shadow-2xs"
                                    style={{ backgroundColor: col.value }}
                                    title={col.name}
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Real Font Color Picker */}
                          <div className="relative">
                            <button 
                              type="button"
                              onClick={() => {
                                setShowTextColorPicker(!showTextColorPicker);
                                setShowHighlightPicker(false);
                              }}
                              className="p-1 hover:bg-gray-100 rounded-lg flex flex-col items-center justify-center h-6 w-6 transition-colors cursor-pointer" 
                              title="Change Text Color"
                            >
                              <Baseline className="w-3.5 h-3.5 text-gray-700 font-bold" />
                              <div className="w-3 h-0.5 mt-0.5 rounded-full" style={{ backgroundColor: activeTextColor }}></div>
                            </button>

                            {showTextColorPicker && (
                              <div className="absolute top-8 left-0 z-50 bg-white border border-gray-200 rounded-xl p-2 shadow-xl flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                                {TEXT_COLORS.map((col) => (
                                  <button
                                    key={col.name}
                                    type="button"
                                    onClick={() => applyTextColor(col.value)}
                                    className="w-5 h-5 rounded-full border border-gray-300 hover:scale-110 transition-transform cursor-pointer shadow-2xs"
                                    style={{ backgroundColor: col.value }}
                                    title={col.name}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
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
                          {/* Real Text Alignment Controls */}
                          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-1.5 py-0.5 shadow-2xs h-7 text-gray-600">
                            <button 
                              type="button"
                              onClick={() => applyAlignment('left')}
                              className="p-1 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer" 
                              title="Align Left"
                            >
                              <AlignLeft className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              type="button"
                              onClick={() => applyAlignment('center')}
                              className="p-1 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer" 
                              title="Align Center"
                            >
                              <AlignCenter className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              type="button"
                              onClick={() => applyAlignment('right')}
                              className="p-1 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer" 
                              title="Align Right"
                            >
                              <AlignRight className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              type="button"
                              onClick={() => applyAlignment('justify')}
                              className="p-1 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer" 
                              title="Justify Text"
                            >
                              <AlignJustify className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {/* Real Indent & Outdent Controls */}
                          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-1.5 py-0.5 shadow-2xs h-7 text-gray-600">
                            <button 
                              type="button"
                              onClick={applyOutdent}
                              className="p-1 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer" 
                              title="Decrease Indent / Remove Quote"
                            >
                              <Outdent className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              type="button"
                              onClick={applyIndent}
                              className="p-1 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-black transition-colors cursor-pointer" 
                              title="Increase Indent / Add Quote Block"
                            >
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
                        {/* Real Table Insertion Box */}
                        <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-gray-300 hover:border-purple-500 hover:bg-purple-50/50 transition-all cursor-pointer shadow-2xs group min-w-[70px]">
                          <div className="flex items-center justify-center text-purple-600 mb-0.5 group-hover:scale-105 transition-transform">
                            <InsertTable />
                          </div>
                          <span className="text-[11px] font-bold text-gray-700 group-hover:text-purple-700">Table</span>
                        </div>

                        {/* Real Code Block Insertion Box */}
                        <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-gray-300 hover:border-purple-500 hover:bg-purple-50/50 transition-all cursor-pointer shadow-2xs group min-w-[70px]">
                          <div className="flex items-center justify-center text-purple-600 mb-0.5 group-hover:scale-105 transition-transform">
                            <InsertCodeBlock />
                          </div>
                          <span className="text-[11px] font-bold text-gray-700 group-hover:text-purple-700">Code</span>
                        </div>

                        {/* Additional Real Insert Tools */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-2 py-0.5 shadow-2xs h-7">
                            <CreateLink />
                            <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                            <InsertThematicBreak />
                          </div>
                          <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1 px-1 font-medium">
                            <span>Link & Line</span>
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
                </DiffSourceToggleWrapper>
              </div>
            )
          })
        ]}
      />

      {/* Dynamic Styling Injection to apply Font Family & Font Size seamlessly to the editor canvas */}
      <style jsx global>{`
        .mdxeditor-root-contenteditable {
          font-family: ${fontFamily} !important;
          font-size: ${fontSize} !important;
        }
      `}</style>
    </div>
  )
}
