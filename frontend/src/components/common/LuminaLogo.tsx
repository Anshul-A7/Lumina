'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LuminaLogoProps {
  size?: number;
  variant?: 'full' | 'compact' | 'icon-only';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  subtitle?: string;
  badge?: string;
}

export function LuminaIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Crisp High-Contrast Container (Zero Blurry Glow) */}
      <div 
        className="relative w-full h-full rounded-2xl bg-[#000000] border border-black/[0.1] shadow-md flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105"
      >
        {/* Crisp Geometric Lumina Star SVG */}
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-[60%] h-[60%] text-white"
        >
          {/* 4-Point Prismatic Diamond Star */}
          <path 
            d="M16 3 C16.5 10 19 12.5 26 13 C19 13.5 16.5 16 16 23 C15.5 16 13 13.5 6 13 C13 12.5 15.5 10 16 3 Z" 
            fill="#FFFFFF"
          />

          {/* Accent Spark Node */}
          <circle cx="23.5" cy="8.5" r="1.75" fill="#FFFFFF" />

          {/* Micro Accent Satellite */}
          <circle cx="8.5" cy="23.5" r="1.25" fill="#FFFFFF" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}

export default function LuminaLogo({
  size = 32,
  variant = 'compact',
  theme = 'auto',
  className = '',
  subtitle,
  badge
}: LuminaLogoProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-3 group cursor-pointer select-none ${className}`}
    >
      <LuminaIcon size={size} />

      {variant !== 'icon-only' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-bold tracking-tight text-base font-heading ${theme === 'light' ? 'text-white' : 'text-black'}`}>
              Lumina
            </span>
            {badge && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-black/[0.06] text-black/70 border border-black/[0.08]">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <span className={`text-[9px] tracking-wider uppercase font-mono mt-0.5 ${theme === 'light' ? 'text-white/60' : 'text-black/40'}`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
