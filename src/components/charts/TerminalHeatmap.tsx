"use client";

import React, { useEffect, useState, useRef } from 'react';
import type { PersonaScore } from '@/lib/data';

interface TerminalHeatmapProps {
  data: PersonaScore[];
}

export function TerminalHeatmap({ data }: TerminalHeatmapProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Show top 8 users sorted by shift_score magnitude (absolute value) or raw score.
  // We'll trust the data is already sorted, but let's take top 8 anyway.
  const displayData = data.slice(0, 8);

  const formatDelta = (fb: number, out: number) => {
    const delta = fb - out;
    const sign = delta > 0 ? '+' : '';
    // Color coding: green = softened inside FB (e.g. anti-hezb dropped, so delta is negative)
    // red = hardened inside FB (e.g. security spiked, delta is positive)
    // Wait, the prompt says "green = softened inside FB, red = hardened inside FB".
    // We'll use green for negative shift, red for positive shift.
    const colorClass = delta < -5 ? 'text-[#00ff41]' : delta > 5 ? 'text-[#ff0080]' : 'text-[#888888]';
    return <span className={\`\${colorClass} font-mono text-[11px]\`}>{sign}{delta.toFixed(1)}pp</span>;
  };

  return (
    <div 
      ref={ref}
      className={\`w-full overflow-x-auto transition-opacity duration-1000 \${isVisible ? 'opacity-100' : 'opacity-0'}\`}
    >
      <div className="min-w-[800px] grid grid-cols-[1.5fr_1fr_2fr_2fr_1fr] bg-[#0a0a0a] border border-[#00ff41]/30 p-1 gap-[1px]">
        {/* Header */}
        <div className="bg-[#111111] p-3 text-xs font-mono text-[#888888] tracking-widest">USERNAME</div>
        <div className="bg-[#111111] p-3 text-xs font-mono text-[#888888] tracking-widest">FLAIR</div>
        <div className="bg-[#111111] p-3 text-xs font-mono text-[#888888] tracking-widest text-center">INSIDE r/FB (P / S / AH / PAL)</div>
        <div className="bg-[#111111] p-3 text-xs font-mono text-[#888888] tracking-widest text-center">OUTSIDE (P / S / AH / PAL)</div>
        <div className="bg-[#111111] p-3 text-xs font-mono text-[#888888] tracking-widest text-right">SHIFT</div>

        {/* Rows */}
        {displayData.map((row, i) => (
          <React.Fragment key={i}>
            <div className="bg-black p-3 font-mono text-xs text-[#00ff41] border-l-2 border-transparent hover:border-[#ff0080] transition-colors flex items-center">
              {row.actor}
            </div>
            <div className="bg-black p-3 font-mono text-xs text-[#888888] truncate flex items-center">
              {row.flair}
            </div>
            <div className="bg-black p-3 flex justify-center items-center gap-2">
              <span className="text-white text-[11px] font-mono">{row.peace_fb?.toFixed(1) || 0}%</span>
              <span className="text-[#444]">/</span>
              <span className="text-white text-[11px] font-mono">{row.security_fb?.toFixed(1) || 0}%</span>
              <span className="text-[#444]">/</span>
              <span className="text-white text-[11px] font-mono">{row.anti_hezb_fb?.toFixed(1) || 0}%</span>
              <span className="text-[#444]">/</span>
              <span className="text-white text-[11px] font-mono">{row.palestine_fb?.toFixed(1) || 0}%</span>
            </div>
            <div className="bg-black p-3 flex justify-center items-center gap-2">
              <span className="text-[#888] text-[11px] font-mono">{row.peace_out?.toFixed(1) || 0}%</span>
              <span className="text-[#444]">/</span>
              <span className="text-[#888] text-[11px] font-mono">{row.security_out?.toFixed(1) || 0}%</span>
              <span className="text-[#444]">/</span>
              <span className="text-[#888] text-[11px] font-mono">{row.anti_hezb_out?.toFixed(1) || 0}%</span>
              <span className="text-[#444]">/</span>
              <span className="text-[#888] text-[11px] font-mono">{row.palestine_out?.toFixed(1) || 0}%</span>
            </div>
            <div className="bg-black p-3 flex flex-col items-end justify-center gap-1">
              {formatDelta(row.peace_fb || 0, row.peace_out || 0)}
              {formatDelta(row.anti_hezb_fb || 0, row.anti_hezb_out || 0)}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
