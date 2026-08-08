"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Trash2, 
  ArrowUpDown,
  X,
  Maximize,
  Minimize
} from 'lucide-react';
import { listPdfs, downloadPdf, deletePdf, formatFileSize, PdfMetadata } from '@/lib/pdf.service';

export default function WorkspaceView() {
  const [pdfs, setPdfs] = useState<PdfMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [sortField, setSortField] = useState<keyof PdfMetadata>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Preview Modal States
  const [previewPdfId, setPreviewPdfId] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      setIsLoading(true);
      const data = await listPdfs();
      setPdfs(data);
    } catch (error) {
      console.error("Failed to fetch PDFs", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;
    try {
      await deletePdf(id);
      setPdfs(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Failed to delete PDF", error);
      alert("Failed to delete PDF.");
    }
  };

  const handleDownload = async (id: number, title: string) => {
    try {
      const blob = await downloadPdf(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF", error);
      alert("Failed to download PDF.");
    }
  };

  const handlePreview = async (id: number) => {
    try {
      setPreviewPdfId(id);
      setIsPreviewLoading(true);
      const blob = await downloadPdf(id);
      const url = window.URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (error) {
      console.error("Failed to preview PDF", error);
      alert("Failed to load PDF preview.");
      setPreviewPdfId(null);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const closePreview = () => {
    setPreviewPdfId(null);
    if (previewUrl) {
      window.URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setIsMaximized(false);
  };

  const toggleSort = (field: keyof PdfMetadata) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // default to descending for new field
    }
  };

  const filteredAndSortedPdfs = useMemo(() => {
    let result = pdfs.filter(pdf => 
      pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pdf.id.toString().includes(searchQuery)
    );

    result = result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [pdfs, searchQuery, sortField, sortDirection]);

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full max-w-6xl mx-auto flex flex-col pt-12 pb-24 px-4 sm:px-8">
        {/* Header section */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              My Notes Workspace
            </h1>
            <p className="text-black/50 mt-1 text-sm">
              Manage, preview, and download your AI-generated PDF documents.
            </p>
          </div>
          
          {/* Search & Filters */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by title or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 text-[13px] font-medium bg-white rounded-xl border border-black/[0.1] focus:border-black/30 outline-none text-black placeholder:text-black/40 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-black">
              <thead className="bg-[#FDFBF7] border-b border-black/[0.08] text-xs uppercase font-bold text-black/50 select-none">
                <tr>
                  <th className="px-6 py-4 cursor-pointer hover:bg-black/[0.02] transition-colors" onClick={() => toggleSort('id')}>
                    <div className="flex items-center gap-1.5">
                      ID <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-black/[0.02] transition-colors" onClick={() => toggleSort('title')}>
                    <div className="flex items-center gap-1.5">
                      Title <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-black/[0.02] transition-colors" onClick={() => toggleSort('createdAt')}>
                    <div className="flex items-center gap-1.5">
                      Date Created <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-black/[0.02] transition-colors" onClick={() => toggleSort('fileSizeBytes')}>
                    <div className="flex items-center gap-1.5">
                      File Size <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-black/40 font-medium">
                      Loading your workspace...
                    </td>
                  </tr>
                ) : filteredAndSortedPdfs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-black/40 font-medium">
                      {searchQuery ? "No PDFs match your search." : "Your workspace is empty. Generate some PDFs in the chat!"}
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedPdfs.map(pdf => (
                    <tr key={pdf.id} className="hover:bg-[#FAFAFA] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-black/60">
                        #{pdf.id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-black flex items-center gap-2">
                        <FileText className="w-4 h-4 text-red-500 shrink-0" />
                        <span className="truncate max-w-[200px] sm:max-w-xs">{pdf.title}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black/70">
                        {new Date(pdf.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', month: 'short', day: 'numeric', 
                          hour: '2-digit', minute: '2-digit' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black/70">
                        {formatFileSize(pdf.fileSizeBytes)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handlePreview(pdf.id)}
                            className="p-1.5 rounded-md hover:bg-black/5 text-black/60 hover:text-black transition-colors"
                            title="Preview PDF"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDownload(pdf.id, pdf.title)}
                            className="p-1.5 rounded-md hover:bg-black/5 text-black/60 hover:text-black transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(pdf.id)}
                            className="p-1.5 rounded-md hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                            title="Delete PDF"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {previewPdfId && (
          <div className={`fixed inset-0 z-[100] bg-black/60 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200 ${isMaximized ? 'p-0' : 'p-4 sm:p-6'}`}>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 bg-[#F3F4F6] ${isMaximized ? 'w-full h-full rounded-none' : 'w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl'}`}>
              
              {/* Dark Toolbar Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#1C1C1C] text-white shrink-0">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={closePreview}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#2A2A2A] text-zinc-300 hover:text-white transition-colors"
                    title="Close Preview"
                  >
                    <X className="w-4 h-4" />
                    Close
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const pdf = pdfs.find(p => p.id === previewPdfId);
                      if (pdf) handleDownload(pdf.id, pdf.title);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#2A2A2A] text-zinc-300 hover:text-white transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#2A2A2A] text-zinc-300 hover:text-white transition-colors"
                    title={isMaximized ? "Restore down" : "Maximize Full Screen"}
                  >
                    {isMaximized ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isMaximized ? "Restore" : "Maximize"}</span>
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 relative overflow-hidden bg-[#525659]">
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white font-medium">Loading PDF...</div>
                  </div>
                )}
                {previewUrl && (
                  <iframe 
                    src={previewUrl} 
                    className="w-full h-full border-none"
                    title="PDF Preview"
                    onLoad={() => setIsPreviewLoading(false)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
