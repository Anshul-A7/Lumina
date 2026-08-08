"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  fontFamily: "Inter, sans-serif",
  suppressErrorRendering: true
});

export const Mermaid = ({ chart }: { chart: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    
    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const safeChart = String(chart || '').trim();
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
          setSvgContent(`<div class="p-4 bg-red-50 text-red-600 rounded-md text-sm font-mono overflow-x-auto whitespace-pre-wrap">Syntax Error in Mermaid Diagram: ${errMsg}</div>`);
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

  return (
    <div 
      ref={containerRef} 
      className="mermaid flex justify-center my-4 overflow-x-auto" 
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};
