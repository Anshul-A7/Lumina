"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Copy, Check, Sparkles } from "lucide-react";
import { sanitizeMermaid } from "@/lib/sanitizeMermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    darkMode: true,
    background: "#000000",
    mainBkg: "#0c0c0e",
    nodeBorder: "#8b5cf6",
    nodeTextColor: "#ffffff",
    textColor: "#ffffff",
    lineColor: "#a855f7",
    primaryColor: "#7c3aed",
    primaryTextColor: "#ffffff",
    primaryBorderColor: "#8b5cf6",
    secondaryColor: "#1e1e2e",
    secondaryTextColor: "#ffffff",
    secondaryBorderColor: "#3b82f6",
    tertiaryColor: "#18181b",
    tertiaryTextColor: "#ffffff",
    tertiaryBorderColor: "#10b981",
    clusterBkg: "#050505",
    clusterBorder: "#27272a",
    edgeLabelBackground: "#18181b",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "14px"
  },
  securityLevel: "loose",
  suppressErrorRendering: true
});

export const Mermaid = ({ chart }: { chart: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const safeChart = sanitizeMermaid(String(chart || ''));
        if (!safeChart) return;
        
        // Validate syntax before rendering to prevent error SVGs from leaking into DOM
        await mermaid.parse(safeChart);
        
        const { svg } = await mermaid.render(id, safeChart);
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.error("Mermaid parsing failed", err);
        
        // Clean up any stray error containers mermaid might have injected into the DOM
        if (typeof document !== 'undefined') {
          const strayNodes = document.querySelectorAll('[id^="dmermaid"]');
          strayNodes.forEach(node => node.remove());
        }

        if (isMounted) {
          const errMsg = err instanceof Error ? err.message.split('\n')[0] : 'Invalid syntax';
          setSvgContent(`<div class="p-4 bg-red-950/80 border border-red-800 text-red-300 rounded-xl text-sm font-mono overflow-x-auto whitespace-pre-wrap">Syntax Error in Mermaid Diagram: ${errMsg}</div>`);
        }
      }
    };

    if (chart && String(chart).trim()) {
      renderChart();
    }

    return () => {
      isMounted = false;
    };
  }, [chart]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(chart);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full my-5 rounded-2xl bg-[#000000] border border-zinc-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all group">
      {/* Pure Black Canvas Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#000000] border-b border-zinc-800/80 text-xs text-zinc-400 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-mono text-zinc-200 font-bold tracking-wider text-[11px] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Diagram Canvas
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-800">
            Mermaid Canvas
          </span>
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Copy Mermaid source"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pure Black Canvas Body */}
      <div className="p-6 bg-[#000000] flex justify-center items-center overflow-x-auto min-h-[160px]">
        <div 
          ref={containerRef} 
          className="mermaid flex justify-center items-center w-full [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] [&_.label]:text-white [&_text]:fill-white" 
          dangerouslySetInnerHTML={{ __html: svgContent }} 
        />
      </div>
    </div>
  );
};
