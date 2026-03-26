import React from 'react';
import { getSpikeMonths, getEventTimeline } from '@/lib/data';
import { TerminalBarChart } from '@/components/charts/TerminalBarChart';

export default function AnalystTimeline() {
  const spikeData = getSpikeMonths();
  const events = getEventTimeline();

  return (
    <div className="space-y-6 animate-fade-in text-[#00ff41]">
      <h1 className="text-2xl font-bold font-heading text-white border-b border-[#111111] pb-4 mb-4 flex justify-between items-center">
        <span>TIMELINE ANALYSIS</span>
        <button className="text-xs font-mono bg-[#111111] hover:bg-[#ff0080]/20 text-[#888888] hover:text-[#ff0080] border border-[#ff0080]/30 px-3 py-1 transition-colors">
          EXPORT JSON
        </button>
      </h1>
      
      <div className="text-xs font-mono text-[#888888] mb-8 max-w-3xl">
        Monthly activity overlay containing event timeline and Z-score anomaly detection.
        Selecting individual spikes reveals the correlated actor activity for the selected window.
      </div>

      <div className="bg-[#0a0a0a] border border-[#111111] p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-mono text-sm tracking-widest text-[#00ff41] uppercase">Activity Volume vs. World Events</h3>
           <div className="flex gap-4">
             <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#ff0080]" /> <span className="text-[10px] font-mono text-[#888]">ANOMALY &gt; 3.0σ</span></div>
             <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#111111] border border-[#00ff41]" /> <span className="text-[10px] font-mono text-[#888]">BASELINE</span></div>
           </div>
        </div>
        <TerminalBarChart 
          data={spikeData} 
          xKey="month" 
          yKey="total" 
          events={events}
          highlightCondition={(p) => p.post_zscore > 3.0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-[#111111] flex flex-col h-[400px]">
           <div className="p-4 border-b border-[#111111] font-mono text-xs text-[#00b4ff] bg-[#050505] tracking-widest">
             ANOMALOUS MONTHS LOG
           </div>
           <div className="overflow-y-auto p-0">
             <table className="w-full text-left font-mono text-[11px] text-[#888888]">
                <thead className="bg-[#111111] sticky top-0">
                  <tr>
                    <th className="font-normal px-4 py-2">MONTH</th>
                    <th className="font-normal px-4 py-2 text-right">VOLUME</th>
                    <th className="font-normal px-4 py-2 text-right">Z-SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  {spikeData.filter(d => d.post_zscore > 2.0).sort((a,b)=>b.post_zscore - a.post_zscore).map((row, i) => (
                    <tr key={i} className="border-b border-[#111111] hover:bg-[#111111] transition-colors cursor-pointer group">
                      <td className="px-4 py-3 text-white">{row.month}</td>
                      <td className="px-4 py-3 text-right">{row.total}</td>
                      <td className="px-4 py-3 text-right text-[#ff0080] group-hover:text-white transition-colors">+{row.post_zscore.toFixed(2)}σ</td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#111111] flex flex-col h-[400px]">
           <div className="p-4 border-b border-[#111111] font-mono text-xs text-white bg-[#050505] tracking-widest">
             CORRELATION DETAILS
           </div>
           <div className="flex-1 p-6 flex items-center justify-center text-center">
              <span className="text-[#444444] font-mono text-xs">
                 SELECT A MONTH FROM THE ANOMALY LOG<br/>TO VIEW EVENT CORRELATION.
              </span>
           </div>
        </div>
      </div>
    </div>
  );
}
