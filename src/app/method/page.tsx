import React from 'react';
import { BackgroundDecorations } from '@/components/BackgroundDecorations';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology // poi5on.m3',
  description: 'Data collection, processing, and analysis pipeline methodology.',
};

export default function MethodPage() {
  return (
    <main className="min-h-screen bg-black text-[#f0f0f0] pt-24 pb-32">
      <BackgroundDecorations />
      
      <div className="max-w-3xl mx-auto px-6 relative z-10 font-mono">
        
        <div className="border border-[#00ff41] p-8 bg-[#050505] shadow-[0_0_20px_rgba(0,255,65,0.1)] glow-green-box">
          <div className="flex justify-between items-start mb-8 border-b border-[#00ff41]/30 pb-4">
             <div>
               <h1 className="text-2xl text-[#00ff41] font-bold tracking-widest uppercase">METHODOLOGY RECORD</h1>
               <div className="text-xs text-[#888888] mt-1">DOC.REF: M3-2026-A1</div>
             </div>
             <div className="text-right text-[10px] text-[#ff0080]">
               CLASSIFICATION: PUBLIC<br/>
               LAST UPDATED: 2026-03-24
             </div>
          </div>

          <div className="space-y-8 text-sm leading-relaxed text-[#00ff41]/90">
             
             <section>
               <h2 className="text-lg text-white mb-2 bg-[#111111] inline-block px-2 py-1">1. DATA ACQUISITION</h2>
               <p className="mb-2">
                 The primary corpus consists of all available posts and comments from r/ForbiddenBromance 
                 archived via the PullPush API, capturing data from subreddit inception (2019) through 
                 data lock on March 19, 2026.
               </p>
               <ul className="list-disc list-inside space-y-1 ml-4 text-xs text-[#888]">
                 <li>Total Posts: 4,895</li>
                 <li>Total Comments: 88,094</li>
                 <li>Sanitization: PII stripped, deleted/removed artifacts logged but preserved.</li>
               </ul>
             </section>

             <section>
               <h2 className="text-lg text-white mb-2 bg-[#111111] inline-block px-2 py-1">2. CONTEXTUAL RECONSTRUCTION (PHASE 2)</h2>
               <p className="mb-2">
                 To move beyond isolated subreddit analysis, an agentic crawler deployed targeted historical 
                 retrievals on the top percentiles of participant accounts (N=28). User-level histories were 
                 downloaded across the broader Reddit ecosystem to establish baseline contextual modes.
               </p>
               <div className="border-l-2 border-[#ff0080] pl-4 mt-2 text-[#ff0080] text-xs">
                 *NOTE: Account deletion rates spiked significantly across the tracked cohort during 
                 late 2024. Partial historical gaps exist where data was purged prior to archive.*
               </div>
             </section>

             <section>
               <h2 className="text-lg text-white mb-2 bg-[#111111] inline-block px-2 py-1">3. NLP & CLASSIFICATION (PHASE 3)</h2>
               <p className="mb-2">
                 Processing was conducted using a custom Python/R pipeline.
               </p>
               <ul className="list-disc list-inside space-y-1 ml-4 text-xs text-[#888]">
                 <li><strong>BERTopic:</strong> Deployed to cluster "Fight Threads" and track evolving narrative vectors during wartime spikes.</li>
                 <li><strong>VADER & Custom Lexicons:</strong> Utilized for hostility scoring, context-shift delta calculation, and rhetorical stance classification (Peace vs Security).</li>
                 <li><strong>Heuristics:</strong> Transliteration authenticity metrics (e.g., Lebanese vs Israeli Arabic Romanization patterns) applied to suspect linguistic anomalies.</li>
               </ul>
             </section>

             <section>
               <h2 className="text-lg text-white mb-2 bg-[#111111] inline-block px-2 py-1">4. ANALYTICAL LIMITS</h2>
               <p className="mb-2">
                 This analysis operates exclusively on public metadata and linguistic outputs.
                 It <span className="text-white font-bold border-b border-[#00ff41]">cannot</span> prove administrative state direction (Rung 5 attribution). 
                 It can only prove behavioral coordination, structural dominance, and recurrent 
                 cultural patterns (Rung 3 attribution).
               </p>
               <p>
                 Readers are encouraged to download the CSV artifacts via the Analyst Console 
                 and verify the mathematics independently.
               </p>
             </section>
             
             <div className="pt-8 border-t border-[#00ff41]/30 text-center text-[10px] text-[#888] tracking-widest">
               [ END OF RECORD ]
             </div>

          </div>
        </div>

      </div>
    </main>
  );
}
