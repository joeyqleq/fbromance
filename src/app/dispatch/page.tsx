import React from 'react';
import { BackgroundDecorations } from '@/components/BackgroundDecorations';

function SupportOptions() {
  return (
    <div className="mt-16 border-t border-[#111111] pt-12">
      <h3 className="font-mono text-[10px] tracking-widest text-[#00ff41] mb-6 uppercase text-center">
        SUPPORT THIS INVESTIGATION
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <a href="https://paypal.me/joeyleq" target="_blank" rel="noopener noreferrer" 
           className="bg-[#0a0a0a] border border-[#111111] hover:border-[#00b4ff] p-6 text-center group transition-colors block cursor-pointer">
          <div className="text-xl font-bold font-heading text-white group-hover:text-[#00b4ff] mb-2">PayPal</div>
          <div className="text-xs font-mono text-[#888] group-hover:text-[#444] transition-colors">Direct transfer</div>
        </a>

        <div className="bg-[#0a0a0a] border border-[#111111] p-6 text-center">
          <div className="text-xl font-bold font-heading text-white mb-2">Ko-Fi</div>
          <div className="text-xs font-mono text-[#888]">Setup Pending</div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#111111] p-6 text-center">
          <div className="text-xl font-bold font-heading text-white mb-2">Crypto</div>
          <div className="text-xs font-mono text-[#888]">Setup Pending</div>
        </div>

      </div>
    </div>
  );
}

export default function DispatchPage() {
  return (
    <main className="min-h-screen bg-black text-[#f0f0f0] pt-24 pb-32">
      <BackgroundDecorations />
      
      <div className="max-w-2xl mx-auto px-6 relative z-10">
        
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-12">
          A DISPATCH FROM BEIRUT
        </h1>

        <div className="font-default text-lg leading-relaxed space-y-6 text-[#cccccc]">
          <p>
            I built this site from Beirut during a war.
          </p>
          <p>
            I built it because I was tired of watching words lose their meaning.
            I was tired of watching "peace" be weaponized as a prerequisite for survival,
            and "dialogue" be structured as an interrogation where only one side is permitted to ask the questions.
          </p>
          <p>
            When you live under the drone flights, you learn to track the signals in the noise.
            This project is just tracking signals. But instead of the sky, I watched a subreddit where thousands of people believed they were talking to each other, unaware of the architecture of the room they were standing in.
          </p>
          <p>
            Building independent, data-driven forensics requires time, compute, and coffee.
            If this investigation helped you see the architecture of these spaces more clearly,
            consider supporting the work. It keeps the servers running and the analysis independent.
          </p>
          <p className="text-[#00ff41] font-mono text-sm mt-8">
            — Joey
          </p>
        </div>

        <SupportOptions />

      </div>
    </main>
  );
}
