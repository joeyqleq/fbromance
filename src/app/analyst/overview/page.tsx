import React from 'react';
import { getOverview, getTopAuthors } from '@/lib/data';
import { TerminalBarChart } from '@/components/charts/TerminalBarChart';

export default function AnalystOverview() {
  const overview = getOverview();
  const topAuthors = getTopAuthors().slice(0, 10); // get top 10 rows for display

  return (
    <div className="space-y-6 animate-fade-in text-[#00ff41]">
      <h1 className="text-2xl font-bold font-heading text-white border-b border-[#111111] pb-4 mb-8">
        OVERVIEW DASHBOARD
      </h1>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a0a0a] border border-[#111] p-4 hover:border-[#00ff41]/50 transition-colors">
          <div className="text-[10px] text-[#888] font-mono mb-2">TOTAL POSTS</div>
          <div className="text-3xl font-mono text-white">{overview.posts.toLocaleString()}</div>
        </div>
        <div className="bg-[#0a0a0a] border border-[#111] p-4 hover:border-[#00ff41]/50 transition-colors">
          <div className="text-[10px] text-[#888] font-mono mb-2">TOTAL COMMENTS</div>
          <div className="text-3xl font-mono text-white">{overview.comments.toLocaleString()}</div>
        </div>
        <div className="bg-[#0a0a0a] border border-[#111] p-4 hover:border-[#00ff41]/50 transition-colors">
          <div className="text-[10px] text-[#888] font-mono mb-2">HEBREW ARTIFACTS</div>
          <div className="text-3xl font-mono text-white">{(overview.hebrew_posts + overview.hebrew_comments).toLocaleString()}</div>
        </div>
        <div className="bg-[#0a0a0a] border border-[#ff0080]/30 p-4 shadow-[0_0_10px_rgba(255,0,128,0.1)]">
          <div className="text-[10px] text-[#ff0080] font-mono mb-2">TRACKED PROFILES</div>
          <div className="text-3xl font-mono text-[#ff0080]">{overview.downloaded_user_histories}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Left Column: Top Authors table */}
        <div className="lg:col-span-1 bg-[#0a0a0a] border border-[#111] p-0 flex flex-col">
          <div className="p-4 border-b border-[#111] text-xs font-mono text-[#888] bg-[#050505]">
            HIGH-VOLUME ACTORS (SAMPLE)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px]">
              <thead className="text-[#888] bg-[#111]">
                <tr>
                  <th className="font-normal px-4 py-2">ACTOR</th>
                  <th className="font-normal px-4 py-2">FLAIR</th>
                  <th className="font-normal px-4 py-2 text-right">VOL</th>
                </tr>
              </thead>
              <tbody>
                {topAuthors.map((row, i) => (
                  <tr key={i} className="border-b border-[#111] hover:bg-[#111] transition-colors">
                    <td className="px-4 py-3 text-white truncate max-w-[120px]" title={row.author}>{row.author}</td>
                    <td className="px-4 py-3 text-[#888] truncate max-w-[80px]" title={row.flair}>{row.flair}</td>
                    <td className="px-4 py-3 text-right text-[#00b4ff]">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Console output simulation */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-[#111] flex flex-col h-full font-mono text-xs">
           <div className="p-4 border-b border-[#111] text-[#888] bg-[#050505] flex justify-between">
              <span>SYSTEM EVENT LOG</span>
              <span className="text-[#00ff41] animate-pulse">● LIVE</span>
           </div>
           <div className="p-4 space-y-2 overflow-auto max-h-[400px]">
              <div className="text-[#444]">&gt; Querying corpus metadata...</div>
              <div className="text-[#00ff41]">&gt; Loaded {overview.posts} posts and {overview.comments} comments.</div>
              <div className="text-[#444]">&gt; Initializing timeline index...</div>
              <div className="text-[#00ff41]">&gt; Index complete. Range: 2019-09 to 2024-11.</div>
              <div className="text-[#444]">&gt; Checking integrity of identity matrix...</div>
              <div className="text-[#ff0080]">&gt; WARNING: High volume of single-issue actors detected.</div>
              <div className="text-[#444]">&gt; Mounting external context profiles...</div>
              <div className="text-[#00ff41]">&gt; {overview.downloaded_user_histories} outside comment histories loaded.</div>
              <div className="text-[#444]">&gt; Dashboard ready. Select module from sidebar.</div>
           </div>
        </div>

      </div>
    </div>
  );
}
