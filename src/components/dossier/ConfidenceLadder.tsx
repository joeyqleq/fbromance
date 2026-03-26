"use client";

import React, { useEffect, useState, useRef } from 'react';

const rungs = [
  {
    level: 5,
    title: "RUNG 5: STATE-DIRECTED",
    description: "Mossad or specific state intelligence service managing operations.",
    status: "NOT IN EVIDENCE — NOT CLAIMED",
    statusColor: "text-red-500",
    indicator: "bg-red-500",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.5)]"
  },
  {
    level: 4,
    title: "RUNG 4: STATE-ADJACENT",
    description: "Accounts receiving direction from state or para-state actors.",
    status: "NOT ESTABLISHED — EVIDENCE INSUFFICIENT",
    statusColor: "text-amber-500",
    indicator: "bg-amber-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.5)]"
  },
  {
    level: 3,
    title: "RUNG 3: ACTOR-ALIGNED",
    description: "Behavioral patterns consistent with hasbara culture as documented in academic and journalistic literature.",
    status: "CONFIRMED BY DATA",
    statusColor: "text-[#00ff41]",
    indicator: "bg-[#00ff41]",
    glow: "shadow-[0_0_15px_rgba(0,255,65,0.5)]"
  },
  {
    level: 2,
    title: "RUNG 2: COORDINATION-LIKE",
    description: "Audience-calibrated rhetoric, event synchronization, recurrent framing patterns across unconnected actors.",
    status: "CONFIRMED BY DATA",
    statusColor: "text-[#00ff41]",
    indicator: "bg-[#00ff41]",
    glow: "shadow-[0_0_15px_rgba(0,255,65,0.5)]"
  },
  {
    level: 1,
    title: "RUNG 1: SUSPICIOUS",
    description: "Wartime activity spikes, heavy participant volume, fight-thread topic clustering. Observable. Documented.",
    status: "CONFIRMED BY DATA",
    statusColor: "text-[#00ff41]",
    indicator: "bg-[#00ff41]",
    glow: "shadow-[0_0_15px_rgba(0,255,65,0.5)]"
  }
];

export function ConfidenceLadder() {
  const [visibleRungs, setVisibleRungs] = useState<number[]>([]);
  const ladderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Animate from bottom to top (which is array indices 4 -> 0)
        [4, 3, 2, 1, 0].forEach((idx, delayMulti) => {
          setTimeout(() => {
            setVisibleRungs(prev => [...prev, idx]);
          }, delayMulti * 600);
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (ladderRef.current) observer.observe(ladderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative pl-8 md:pl-16 py-8" ref={ladderRef}>
      {/* The vertical tracking line */}
      <div className="absolute left-3 md:left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500 via-[#00ff41] to-[#00ff41] opacity-30" />
      
      <div className="flex flex-col gap-12">
        {rungs.map((rung, index) => {
          const isVisible = visibleRungs.includes(index);
          // Rung 3 is where the investigation stops
          const isTargetRung = rung.level === 3;
          
          return (
            <div 
              key={rung.level} 
              className={\`relative transition-all duration-700 ease-out flex flex-col \${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\`}
            >
              {/* Indicator Dot */}
              <div className={\`absolute -left-6 md:-left-[2.2rem] top-2 w-4 h-4 rounded-full border-2 border-black \${rung.indicator} \${isVisible ? rung.glow : ''} z-10 transition-shadow duration-1000\`} />
              
              <div className={\`bg-[#0a0a0a] border \${isTargetRung ? 'border-[#ff0080] glow-pink-box' : 'border-[#111111]'} p-6 relative\`}>
                {isTargetRung && (
                  <div className="absolute -top-3 right-4 bg-[#ff0080] text-white text-[10px] font-mono px-2 py-1 tracking-wider">
                    INVESTIGATION CEILING
                  </div>
                )}
                
                <h3 className="font-heading text-xl md:text-2xl text-white mb-2">{rung.title}</h3>
                <p className="font-default text-[#888888] text-sm md:text-base mb-4 max-w-2xl">{rung.description}</p>
                
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#888888] tracking-widest">STATUS:</span>
                  <span className={\`font-mono text-[11px] tracking-wider font-bold \${rung.statusColor}\`}>
                    [{rung.status}]
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
