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
  Minimize,
  Image as ImageIcon,
  Filter
} from 'lucide-react';
import { listPdfs, downloadPdf, deletePdf, formatFileSize } from '@/lib/pdf.service';
import { imageService, GeneratedImage } from '@/services/image.service';

type ItemType = 'pdf' | 'image';

interface WorkspaceItem {
  id: string; // 'pdf-1' or 'image-1'
  originalId: number;
  type: ItemType;
  title: string;
  createdAt: string;
  fileSizeBytes?: number;
  imageUrl?: string;
}

export default function WorkspaceView() {
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pdf' | 'image'>('all');
  
  const [sortField, setSortField] = useState<keyof WorkspaceItem>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Preview Modal States
  const [previewItem, setPreviewItem] = useState<WorkspaceItem | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      
      const [pdfs, images] = await Promise.all([
        listPdfs(),
        imageService.getUserImages()
      ]);

      const mappedPdfs: WorkspaceItem[] = pdfs.map(p => ({
        id: `pdf-${p.id}`,
        originalId: p.id,
        type: 'pdf',
        title: p.title,
        createdAt: p.createdAt,
        fileSizeBytes: p.fileSizeBytes
      }));

      const mappedImages: WorkspaceItem[] = images.map(img => ({
        id: `image-${img.id}`,
        originalId: img.id,
        type: 'image',
        title: img.prompt.length > 50 ? img.prompt.substring(0, 50) + '...' : img.prompt,
        createdAt: img.createdAt,
        imageUrl: img.imageUrl
      }));

      setItems([...mappedPdfs, ...mappedImages]);
    } catch (error) {
      console.error("Failed to fetch workspace items", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item: WorkspaceItem) => {
    if (!window.confirm(`Are you sure you want to delete this ${item.type}?`)) return;
    try {
      if (item.type === 'pdf') {
        await deletePdf(item.originalId);
      } else {
        await imageService.deleteImage(item.originalId);
      }
      setItems(prev => prev.filter(p => p.id !== item.id));
    } catch (error) {
      console.error(`Failed to delete ${item.type}`, error);
      alert(`Failed to delete ${item.type}.`);
    }
  };

  const handleDownload = async (item: WorkspaceItem) => {
    try {
      if (item.type === 'pdf') {
        const blob = await downloadPdf(item.originalId);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${item.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else if (item.imageUrl) {
        const response = await fetch(item.imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Generated_Image_${item.originalId}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Failed to download", error);
      alert("Failed to download.");
    }
  };

  const handlePreview = async (item: WorkspaceItem) => {
    try {
      setPreviewItem(item);
      setIsPreviewLoading(true);
      
      if (item.type === 'pdf') {
        const blob = await downloadPdf(item.originalId);
        const url = window.URL.createObjectURL(blob);
        setPreviewUrl(url);
      } else {
        // Image type
        setPreviewUrl(item.imageUrl || null);
      }
    } catch (error) {
      console.error("Failed to preview item", error);
      alert("Failed to load preview.");
      setPreviewItem(null);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const closePreview = () => {
    if (previewUrl && previewItem?.type === 'pdf') {
      window.URL.revokeObjectURL(previewUrl);
    }
    setPreviewItem(null);
    setPreviewUrl(null);
    setIsMaximized(false);
  };

  const toggleSort = (field: keyof WorkspaceItem) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // default to descending for new field
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let result = items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.originalId.toString().includes(searchQuery);
      const matchesType = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesType;
    });

    result = result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (aVal === undefined && bVal === undefined) return 0;
      if (aVal === undefined) return 1;
      if (bVal === undefined) return -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [items, searchQuery, filterType, sortField, sortDirection]);

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
              Manage, preview, and download your AI-generated documents and images.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            {/* Filter Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl items-center shadow-inner">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${filterType === 'all' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('pdf')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${filterType === 'pdf' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                PDFs
              </button>
              <button
                onClick={() => setFilterType('image')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${filterType === 'image' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                Images
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-56 shrink-0">
              <Search className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 text-[13px] font-medium bg-white rounded-xl border border-black/[0.1] focus:border-black/30 outline-none text-black placeholder:text-black/40 transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-black">
              <thead className="bg-background border-b border-black/[0.08] text-xs uppercase font-bold text-black/50 select-none">
                <tr>
                  <th className="px-6 py-4 cursor-pointer hover:bg-black/[0.02] transition-colors" onClick={() => toggleSort('originalId')}>
                    <div className="flex items-center gap-1.5">
                      Type/ID <ArrowUpDown className="w-3 h-3" />
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
                ) : filteredAndSortedItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-black/40 font-medium">
                      {searchQuery || filterType !== 'all' ? "No items match your criteria." : "Your workspace is empty."}
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedItems.map(item => (
                    <tr key={item.id} className="hover:bg-[#FAFAFA] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-black/60 flex items-center gap-2">
                        {item.type === 'pdf' ? (
                           <span className="bg-red-100 text-red-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded">PDF</span>
                        ) : (
                           <span className="bg-purple-100 text-purple-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded">IMG</span>
                        )}
                        <span className="text-black/40 text-xs">#{item.originalId}</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-black">
                        <div className="flex items-center gap-2">
                          {item.type === 'pdf' ? (
                            <FileText className="w-4 h-4 text-red-500 shrink-0" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-purple-500 shrink-0" />
                          )}
                          <span className="truncate max-w-[200px] sm:max-w-xs">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black/70">
                        {new Date(item.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', month: 'short', day: 'numeric', 
                          hour: '2-digit', minute: '2-digit' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-black/70">
                        {item.fileSizeBytes ? formatFileSize(item.fileSizeBytes) : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handlePreview(item)}
                            className="p-1.5 rounded-md hover:bg-black/5 text-black/60 hover:text-black transition-colors"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDownload(item)}
                            className="p-1.5 rounded-md hover:bg-black/5 text-black/60 hover:text-black transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item)}
                            className="p-1.5 rounded-md hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                            title="Delete"
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

      {/* Preview Modal */}
      <AnimatePresence>
        {previewItem && (
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
                  <span className="font-semibold text-sm truncate max-w-xs">{previewItem.title}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDownload(previewItem)}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#2A2A2A] text-zinc-300 hover:text-white transition-colors"
                    title="Download"
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

              {/* Viewer */}
              <div className="flex-1 relative overflow-hidden bg-[#525659] flex items-center justify-center">
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white font-medium">Loading preview...</div>
                  </div>
                )}
                {previewUrl && previewItem.type === 'pdf' && (
                  <iframe 
                    src={previewUrl} 
                    className="w-full h-full border-none"
                    title="PDF Preview"
                    onLoad={() => setIsPreviewLoading(false)}
                  />
                )}
                {previewUrl && previewItem.type === 'image' && (
                  <div className="w-full h-full p-8 flex items-center justify-center overflow-auto">
                     <img 
                       src={previewUrl} 
                       alt={previewItem.title}
                       className="max-w-full max-h-full object-contain shadow-2xl rounded-xl"
                       onLoad={() => setIsPreviewLoading(false)}
                     />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
