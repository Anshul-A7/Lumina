'use client'

import React, { useMemo, useState, useRef, useEffect } from 'react';
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
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertCodeBlock
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
  Save, 
  Code2,
  Link as LinkIcon,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Type,
  Sparkles
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
  onSelectSnippet?: (snippet: string) => void;
}

const HIGHLIGHT_COLORS = [
  { name: 'Yellow', value: '#FEF08A' },
  { name: 'Emerald', value: '#A7F3D0' },
  { name: 'Cyan', value: '#A5F3FC' },
  { name: 'Pink', value: '#FBCFE8' },
  { name: 'Orange', value: '#FED7AA' },
  { name: 'Purple', value: '#E9D5FF' }
];

const TEXT_COLORS = [
  { name: 'Crimson', value: '#DC2626' },
  { name: 'Royal Blue', value: '#2563EB' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Purple', value: '#7C3AED' },
  { name: 'Amber', value: '#D97706' },
  { name: 'Dark Slate', value: '#1E293B' },
  { name: 'Hot Pink', value: '#DB2777' }
];

const BLOCK_TYPES = [
  { label: 'Paragraph', value: 'p', prefix: '' },
  { label: 'Heading 1', value: 'h1', prefix: '# ' },
  { label: 'Heading 2', value: 'h2', prefix: '## ' },
  { label: 'Heading 3', value: 'h3', prefix: '### ' },
  { label: 'Heading 4', value: 'h4', prefix: '#### ' },
  { label: 'Quote', value: 'quote', prefix: '> ' }
];

import { sanitizeMdx } from '@/lib/sanitizeMdx';

export default function MdxEditorComponent({ 
  markdown, 
  onChange, 
  title, 
  onBack, 
  onCopy, 
  isCopied, 
  onDownload, 
  isDownloading,
  onSaveAndReturn,
  onSelectSnippet
}: MdxEditorComponentProps) {

  const editorRef = useRef<MDXEditorMethods>(null);
  const cleanMarkdown = useMemo(() => sanitizeMdx(markdown), [markdown]);

  // Color picker popover states
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [activeHighlightColor, setActiveHighlightColor] = useState('#FEF08A');
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [activeTextColor, setActiveTextColor] = useState('#DC2626');

  // Floating AI action tooltip on selection
  const [floatingBubble, setFloatingBubble] = useState<{ top: number; left: number } | null>(null);
  const [selectedTextSnippet, setSelectedTextSnippet] = useState<string>('');

  useEffect(() => {
    const handleSelectionUpdate = () => {
      if (typeof window === 'undefined') return;
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setFloatingBubble(null);
        setSelectedTextSnippet('');
        return;
      }

      const text = selection.toString().trim();
      if (!text || text.length < 2) {
        setFloatingBubble(null);
        setSelectedTextSnippet('');
        return;
      }

      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setFloatingBubble({
            top: rect.top,
            left: rect.left + rect.width / 2
          });
          setSelectedTextSnippet(text);
        }
      } catch (err) {
        setFloatingBubble(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Support Alt+A or Alt+K to trigger AI on selection
      if (e.altKey && (e.key === 'a' || e.key === 'A' || e.key === 'k' || e.key === 'K')) {
        const selection = window.getSelection();
        const text = selection ? selection.toString().trim() : '';
        if (text && onSelectSnippet) {
          e.preventDefault();
          onSelectSnippet(text);
          setFloatingBubble(null);
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionUpdate);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionUpdate);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSelectSnippet]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setShowHighlightPicker(false);
      setShowTextColorPicker(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Synchronize editor content when external markdown prop changes (e.g. via AI in-place edits)
  useEffect(() => {
    if (editorRef.current) {
      try {
        const currentEditorContent = editorRef.current.getMarkdown();
        if (currentEditorContent !== cleanMarkdown) {
          editorRef.current.setMarkdown(cleanMarkdown);
        }
      } catch (err) {
        console.warn("[MdxEditorComponent] Could not sync markdown externally:", err);
      }
    }
  }, [cleanMarkdown]);

  // Auto-save whenever markdown changes
  const handleEditorChange = (newMarkdown: string) => {
    const safeMarkdown = sanitizeMdx(newMarkdown);
    onChange(safeMarkdown);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('lumina_edit_pdf_content', safeMarkdown);
      sessionStorage.setItem('lumina_edit_pdf_title', title);
      window.dispatchEvent(new CustomEvent('lumina:pdf_saved', { detail: { content: safeMarkdown, title } }));
    }
  };

  // Compute live word & character stats
  const stats = useMemo(() => {
    const text = (markdown || '').trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;
    const readTime = Math.max(1, Math.ceil(words / 200));
    return { words, chars, readTime };
  }, [markdown]);

  // Core Selection-Preserving Formatter
  const formatSelection = (transform: (selected: string) => string) => {
    let selected = '';
    
    // MDXEditor doesn't expose getSelectionMarkdown directly in the Ref methods safely
    if (typeof window !== 'undefined') {
      const winSel = window.getSelection();
      if (winSel && !winSel.isCollapsed) {
        selected = winSel.toString();
      }
    }

    const transformed = transform(selected);
    editorRef.current?.insertMarkdown(transformed);
    editorRef.current?.focus();
  };

  // 1. Font Size applied directly to the SELECTED text
  const handleFontSizeChange = (size: string) => {
    formatSelection((selected) => {
      const text = selected.trim() ? selected : 'Selected Text';
      return `<span style="font-size: ${size};">${text}</span>`;
    });
  };

  // 2. Font Family applied directly to the SELECTED text
  const handleFontFamilyChange = (font: string) => {
    formatSelection((selected) => {
      const text = selected.trim() ? selected : 'Selected Text';
      const cleanFont = font.replace(/["']/g, '').trim();
      return `<span style="font-family: ${cleanFont};">${text}</span>`;
    });
  };

  // 3. Highlight Color applied to SELECTED text
  const applyHighlight = (color: string) => {
    formatSelection((selected) => {
      const text = selected.trim() ? selected : 'Highlighted Text';
      return `<mark style="background-color: ${color}; color: #000; padding: 2px 6px; border-radius: 4px;">${text}</mark>`;
    });
    setActiveHighlightColor(color);
    setShowHighlightPicker(false);
  };

  // 4. Text Color applied to SELECTED text
  const applyTextColor = (color: string) => {
    formatSelection((selected) => {
      const text = selected.trim() ? selected : 'Colored Text';
      return `<span style="color: ${color}; font-weight: 600;">${text}</span>`;
    });
    setActiveTextColor(color);
    setShowTextColorPicker(false);
  };

  // 5. Text Alignment applied to selection
  const applyAlignment = (align: 'left' | 'center' | 'right' | 'justify') => {
    formatSelection((selected) => {
      const text = selected.trim() ? selected : 'Aligned paragraph text';
      return `\n\n<div align="${align}">\n\n${text}\n\n</div>\n\n`;
    });
  };

  // 6. Indent & Outdent applied to selection
  const applyIndent = () => {
    formatSelection((selected) => {
      if (selected.trim()) {
        return selected.split('\n').map(line => `> ${line}`).join('\n');
      }
      return `\n\n> Indented block\n\n`;
    });
  };

  const applyOutdent = () => {
    formatSelection((selected) => {
      if (selected.trim()) {
        return selected.split('\n').map(line => line.replace(/^(\s{2,4}|>\s?)/, '')).join('\n');
      }
      return '';
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-background select-text">
      <MDXEditor
        ref={editorRef}
        markdown={cleanMarkdown}
        onChange={handleEditorChange}
        className="w-full flex-1 flex flex-col font-sans"
        contentEditableClassName="prose prose-sm sm:prose-base max-w-none px-4 py-8 sm:!px-28 sm:!py-20 min-h-[1056px] focus:outline-none bg-background shadow-lg border border-border mt-3 sm:mt-6 mb-36 mx-auto w-full max-w-[850px] rounded-2xl transition-all"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          tablePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'javascript' }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: 'JavaScript',
              javascript: 'JavaScript',
              ts: 'TypeScript',
              typescript: 'TypeScript',
              py: 'Python',
              python: 'Python',
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
              <div className="w-full bg-background border-b border-border shadow-sm sticky top-0 z-50 overflow-visible">
                
                {/* 1. TOP TITLE & ACTION BAR */}
                <div className="w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-primary text-primary-foreground border-b border-primary">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => onBack(editorRef.current?.getMarkdown() || markdown)} 
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background/20 transition-colors text-primary-foreground cursor-pointer shrink-0"
                      title="Back to Chat / Workspace"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center text-[11px] font-bold text-primary-foreground shadow-inner shrink-0">
                        ✦
                      </div>
                      <span className="text-xs font-semibold tracking-wide text-primary-foreground shrink-0 hidden sm:inline">Lumina Studio</span>
                      <span className="text-primary-foreground/40 text-xs hidden sm:inline">|</span>
                      <span className="text-xs text-primary-foreground/90 font-medium truncate max-w-[120px] sm:max-w-md">{title || "Document"}</span>
                    </div>
                  </div>

                  {/* Header Metrics & Main Action Buttons */}
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    {/* Live Stats */}
                    <div className="hidden md:flex items-center gap-3 text-xs text-zinc-300 font-medium bg-black/30 px-3.5 py-1 rounded-full border border-white/10">
                      <span>{stats.words} words</span>
                      <span className="text-primary-foreground/20">•</span>
                      <span>{stats.readTime} min read</span>
                      <span className="text-primary-foreground/20">•</span>
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Auto-saved
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button 
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={onCopy} 
                        className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-background/10 hover:bg-background/20 text-primary-foreground transition-colors text-xs font-semibold border border-white/20 cursor-pointer shadow-2xs"
                        title="Copy Markdown to clipboard"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">Copy</span>
                      </button>

                      {/* Prominent Curved Save & Return to Chat button */}
                      <button 
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onSaveAndReturn(editorRef.current?.getMarkdown() || markdown)} 
                        className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-primary-foreground transition-all text-xs font-bold shadow-md hover:shadow-lg cursor-pointer transform active:scale-95"
                        title="Save changes and return to chat session"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span className="hidden xs:inline">Save & Return</span>
                        <span className="xs:hidden">Save</span>
                      </button>

                      {/* Curved Download PDF button */}
                      <button 
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={onDownload} 
                        disabled={isDownloading} 
                        className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-primary-foreground transition-colors text-xs font-semibold shadow-sm disabled:opacity-50 cursor-pointer"
                        title="Compile and Download formatted PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isDownloading ? "..." : "PDF"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. LUMINA STUDIO FORMATTING TOOLBAR */}
                <DiffSourceToggleWrapper>
                  <div className="w-full bg-secondary px-3 sm:px-4 py-2.5 border-b border-border flex items-stretch gap-4 min-h-[96px] overflow-x-auto overflow-y-visible scrollbar-none relative z-40">
                    
                    {/* GROUP 1: FONT & TYPOGRAPHY */}
                    <div className="flex flex-col justify-between border-r border-border pr-4 shrink-0 overflow-visible">
                      <div className="flex flex-col gap-1.5 overflow-visible">
                        {/* Font Family & Size applied to SELECTED text */}
                        <div className="flex items-center gap-1.5">
                          <div className="relative">
                            <select 
                              onChange={(e) => {
                                handleFontFamilyChange(e.target.value);
                                e.target.value = "Font";
                              }}
                              defaultValue="Font"
                              className="border border-border rounded-xl bg-background text-xs px-3 py-1 w-36 h-7 font-medium text-foreground outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 shadow-2xs cursor-pointer"
                              title="Apply Font Family to selected text"
                            >
                              <option value="Font" disabled>Font Family</option>
                              <option value="Inter, sans-serif">Inter</option>
                              <option value="Calibri, Arial, sans-serif">Calibri</option>
                              <option value="Times New Roman, Times, serif">Times New Roman</option>
                              <option value="Arial, Helvetica, sans-serif">Arial</option>
                              <option value="Georgia, serif">Georgia</option>
                              <option value="Courier New, Courier, monospace">Courier New</option>
                              <option value="JetBrains Mono, monospace">JetBrains Mono</option>
                            </select>
                          </div>
                          <div className="relative">
                            <select 
                              onChange={(e) => {
                                handleFontSizeChange(e.target.value);
                                e.target.value = "Size";
                              }}
                              defaultValue="Size"
                              className="border border-border rounded-xl bg-background text-xs px-2 py-1 w-16 h-7 font-medium text-foreground outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 shadow-2xs cursor-pointer"
                              title="Apply Font Size to selected text"
                            >
                              <option value="Size" disabled>Size</option>
                              <option value="12px">12</option>
                              <option value="14px">14</option>
                              <option value="16px">16</option>
                              <option value="18px">18</option>
                              <option value="20px">20</option>
                              <option value="24px">24</option>
                              <option value="28px">28</option>
                              <option value="32px">32</option>
                            </select>
                          </div>
                        </div>

                        {/* Font Formatting Buttons with Highlight & Text Color Popovers */}
                        <div className="flex items-center gap-1 bg-background border border-border rounded-xl px-2 py-0.5 w-fit shadow-2xs relative overflow-visible">
                          <BoldItalicUnderlineToggles />
                          <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                          <StrikeThroughSupSubToggles />
                          <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                          <CodeToggle />
                          <div className="w-px h-4 bg-gray-300 mx-0.5"></div>
                          
                          {/* Real Highlight Color Picker */}
                          <div className="relative overflow-visible">
                            <button 
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowHighlightPicker(!showHighlightPicker);
                                setShowTextColorPicker(false);
                              }}
                              className="p-1 hover:bg-accent rounded-lg flex flex-col items-center justify-center h-6 w-6 transition-colors cursor-pointer" 
                              title="Highlight Selected Text"
                            >
                              <Highlighter className="w-3.5 h-3.5 text-foreground" />
                              <div className="w-3 h-0.5 mt-0.5 rounded-full" style={{ backgroundColor: activeHighlightColor }}></div>
                            </button>

                            {showHighlightPicker && (
                              <div 
                                onClick={(e) => e.stopPropagation()} 
                                className="absolute top-9 left-0 z-[100] bg-background border border-border rounded-2xl p-2.5 shadow-2xl flex items-center gap-2 min-w-[170px]"
                              >
                                {HIGHLIGHT_COLORS.map((col) => (
                                  <button
                                    key={col.name}
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => applyHighlight(col.value)}
                                    className="w-6 h-6 rounded-full border border-border hover:scale-125 transition-transform cursor-pointer shadow-sm"
                                    style={{ backgroundColor: col.value }}
                                    title={col.name}
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Real Font Color Picker */}
                          <div className="relative overflow-visible">
                            <button 
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowTextColorPicker(!showTextColorPicker);
                                setShowHighlightPicker(false);
                              }}
                              className="p-1 hover:bg-accent rounded-lg flex flex-col items-center justify-center h-6 w-6 transition-colors cursor-pointer" 
                              title="Change Selected Text Color"
                            >
                              <Baseline className="w-3.5 h-3.5 text-foreground font-bold" />
                              <div className="w-3 h-0.5 mt-0.5 rounded-full" style={{ backgroundColor: activeTextColor }}></div>
                            </button>

                            {showTextColorPicker && (
                              <div 
                                onClick={(e) => e.stopPropagation()} 
                                className="absolute top-9 left-0 z-[100] bg-background border border-border rounded-2xl p-2.5 shadow-2xl flex items-center gap-2 min-w-[190px]"
                              >
                                {TEXT_COLORS.map((col) => (
                                  <button
                                    key={col.name}
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => applyTextColor(col.value)}
                                    className="w-6 h-6 rounded-full border border-border hover:scale-125 transition-transform cursor-pointer shadow-sm"
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
                    <div className="flex flex-col justify-between border-r border-border pr-4 shrink-0 overflow-visible">
                      <div className="flex flex-col gap-1.5 overflow-visible">
                        <div className="flex items-center gap-1.5 overflow-visible">
                          
                          {/* Native MDXEditor Block Type Dropdown */}
                          <div className="bg-background border border-border rounded-xl shadow-2xs h-7 flex items-center [&>button]:px-2.5 [&>button]:py-1 [&>button]:text-xs [&>button]:font-semibold [&>button]:text-foreground [&>button]:h-full [&>button]:flex [&>button]:items-center min-w-[110px]">
                            <BlockTypeSelect />
                          </div>

                          {/* Undo / Redo */}
                          <div className="bg-background border border-border rounded-xl px-1.5 py-0.5 shadow-2xs h-7 flex items-center">
                            <UndoRedo />
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {/* Lists Toggle */}
                          <div className="flex items-center bg-background border border-border rounded-xl px-2 py-0.5 shadow-2xs h-7">
                            <ListsToggle />
                          </div>
                          {/* Real Text Alignment Controls */}
                          <div className="flex items-center bg-background border border-border rounded-xl px-1.5 py-0.5 shadow-2xs h-7 text-muted-foreground">
                            <button 
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => applyAlignment('left')}
                              className="p-1 hover:bg-accent rounded-lg text-foreground hover:text-foreground transition-colors cursor-pointer" 
                              title="Align Left"
                            >
                              <AlignLeft className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => applyAlignment('center')}
                              className="p-1 hover:bg-accent rounded-lg text-foreground hover:text-foreground transition-colors cursor-pointer" 
                              title="Align Center"
                            >
                              <AlignCenter className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => applyAlignment('right')}
                              className="p-1 hover:bg-accent rounded-lg text-foreground hover:text-foreground transition-colors cursor-pointer" 
                              title="Align Right"
                            >
                              <AlignRight className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => applyAlignment('justify')}
                              className="p-1 hover:bg-accent rounded-lg text-foreground hover:text-foreground transition-colors cursor-pointer" 
                              title="Justify Text"
                            >
                              <AlignJustify className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {/* Real Indent & Outdent Controls */}
                          <div className="flex items-center bg-background border border-border rounded-xl px-1.5 py-0.5 shadow-2xs h-7 text-muted-foreground">
                            <button 
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={applyOutdent}
                              className="p-1 hover:bg-accent rounded-lg text-foreground hover:text-foreground transition-colors cursor-pointer" 
                              title="Decrease Indent / Remove Quote"
                            >
                              <Outdent className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={applyIndent}
                              className="p-1 hover:bg-accent rounded-lg text-foreground hover:text-foreground transition-colors cursor-pointer" 
                              title="Increase Indent / Add Quote Block"
                            >
                              <Indent className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-gray-500 text-center mt-1 w-full block tracking-wide">Paragraph</span>
                    </div>

                    {/* GROUP 3: TABLE, CODE & INSERT */}
                    <div className="flex flex-col justify-between border-r border-border pr-4 shrink-0">
                      <div className="flex items-center gap-2">
                        {/* Native Table Insertion */}
                        <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-background border border-border hover:border-purple-500 hover:bg-purple-50/50 transition-all cursor-pointer shadow-2xs group min-w-[60px] h-[50px] [&>button]:w-full [&>button]:h-full [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button>svg]:w-5 [&>button>svg]:h-5 [&>button>svg]:text-purple-600">
                          <InsertTable />
                        </div>

                        {/* Native Code Box Button */}
                        <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-background border border-border hover:border-purple-500 hover:bg-purple-50/50 transition-all cursor-pointer shadow-2xs group min-w-[60px] h-[50px] [&>button]:w-full [&>button]:h-full [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button>svg]:w-5 [&>button>svg]:h-5 [&>button>svg]:text-purple-600">
                          <InsertCodeBlock />
                        </div>

                        {/* Real Link & Thematic Break */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1 bg-background border border-border rounded-xl px-1.5 py-0.5 shadow-2xs h-7 [&>button]:p-1 [&>button]:rounded-lg [&>button:hover]:bg-gray-100 [&>button]:text-foreground [&>button>svg]:w-3.5 [&>button>svg]:h-3.5">
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
                        <div className="flex items-center gap-2.5 bg-background border border-emerald-200 rounded-2xl px-3.5 py-1.5 shadow-2xs">
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

      {/* Floating Inline Selection AI Bubble */}
      {floatingBubble && selectedTextSnippet && onSelectSnippet && (
        <div 
          style={{ 
            top: `${Math.max(10, floatingBubble.top - 48)}px`, 
            left: `${floatingBubble.left}px`,
            position: 'fixed'
          }}
          className="z-50 -translate-x-1/2 flex items-center gap-1.5 bg-primary/95 text-primary-foreground px-3 py-1.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.3)] border border-gray-700/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 select-none cursor-pointer hover:bg-black hover:scale-105 active:scale-95 transition-all"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelectSnippet(selectedTextSnippet);
            setFloatingBubble(null);
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wide">Edit with AI</span>
          <span className="text-[9px] bg-gray-800 text-gray-400 font-mono px-1.5 py-0.5 rounded border border-gray-700 ml-0.5">Alt+A</span>
        </div>
      )}
    </div>
  )
}
