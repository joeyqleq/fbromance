import React from 'react';
import { getPersonaScores, getTopAuthors } from '@/lib/data';
import { TerminalHeatmap } from '@/components/charts/TerminalHeatmap';

export default function AnalystUsers() {
  const scores = getPersonaScores();
  const topAuthors = getTopAuthors();

  return (
    <div className="space-y-6 animate-fade-in text-[#00ff41]">
      <h1 className="text-2xl font-bold font-heading text-white border-b border-[#111111] pb-4 mb-4">
        ACTORS & IDENTITY TRACKING
      </h1>
      
      <div className="text-xs font-mono text-[#888888] mb-8 max-w-3xl">
        Monitor individual participant behaviors, tracking rhetorical mode-switching
        between r/ForbiddenBromance and external contexts.
      </div>

      <section id="context-shifts" className="mb-12">
        <h3 className="font-mono text-[10px] tracking-widest text-white bg-[#111111] inline-block px-3 py-1 mb-4 uppercase">
           CONTEXT SHIFTS (MODE-SWITCHING)
        </h3>
        <p className="font-default text-sm text-[#888] mb-4 max-w-2xl">
           The table below tracks actors who display the highest variance in framing based on the subreddit they are posting in. Positive DELTA implies rhetorical hardening when entering the target space.
        </p>
        <TerminalHeatmap data={scores} />
      </section>

      <section id="by-flair" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0a0a0a] border border-[#111111]">
           <div className="p-4 border-b border-[#111111] font-mono text-xs text-[#00b4ff] bg-[#050505] tracking-widest uppercase">
             LEBANESE-FLAIR LEADERS
           </div>
           <div className="overflow-x-auto max-h-[300px]">
             <table className="w-full text-left font-mono text-[11px] text-[#888888]">
                <thead className="bg-[#111111] sticky top-0">
                  <tr>
                    <th className="font-normal px-4 py-2">ACTOR</th>
                    <th className="font-normal px-4 py-2 text-right">VOLUME</th>
                  </tr>
                </thead>
                <tbody>
                  {topAuthors.filter(a => a.flair.toLowerCase().includes('leban')).slice(0, 15).map((row, i) => (
                    <tr key={i} className="border-b border-[#111111] hover:bg-[#111111] transition-colors">
                      <td className="px-4 py-3 text-[#00ff41] truncate max-w-[150px]">{row.author}</td>
                      <td className="px-4 py-3 text-right">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#111111]">
           <div className="p-4 border-b border-[#111111] font-mono text-xs text-[#ff0080] bg-[#050505] tracking-widest uppercase">
             ISRAELI-FLAIR LEADERS
           </div>
           <div className="overflow-x-auto max-h-[300px]">
             <table className="w-full text-left font-mono text-[11px] text-[#888888]">
                <thead className="bg-[#111111] sticky top-0">
                  <tr>
                    <th className="font-normal px-4 py-2">ACTOR</th>
                    <th className="font-normal px-4 py-2 text-right">VOLUME</th>
                  </tr>
                </thead>
                <tbody>
                  {topAuthors.filter(a => a.flair.toLowerCase().includes('israel')).slice(0, 15).map((row, i) => (
                    <tr key={i} className="border-b border-[#111111] hover:bg-[#111111] transition-colors">
                      <td className="px-4 py-3 text-white truncate max-w-[150px]">{row.author}</td>
                      <td className="px-4 py-3 text-right">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>
      </section>
    </div>
  );
}
