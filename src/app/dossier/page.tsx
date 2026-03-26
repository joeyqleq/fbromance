import React from 'react';
import { getSpikeMonths, getEventTimeline, getPersonaScores, getFightThreads, getTransliterationSignals } from '@/lib/data';
import { TerminalBarChart } from '@/components/charts/TerminalBarChart';
import { TerminalHeatmap } from '@/components/charts/TerminalHeatmap';
import { ConfidenceLadder } from '@/components/dossier/ConfidenceLadder';
import { BackgroundDecorations } from '@/components/BackgroundDecorations';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dossier // poi5on.m3',
  description: 'The narrative investigation into r/ForbiddenBromance.',
};

function AsciiDivider({ text }: { text: string }) {
  return (
    <div className="w-full my-32 flex justify-center opacity-60">
      <span className="font-mono text-[#00ff41] text-xs md:text-sm tracking-[0.2em] uppercase text-center">
        ━━━ {text} ━━━
      </span>
    </div>
  );
}

export default function DossierPage() {
  const spikeData = getSpikeMonths();
  const events = getEventTimeline();
  const personaData = getPersonaScores();
  const fightThreads = getFightThreads().slice(0, 30);
  const signals = getTransliterationSignals().slice(0, 6);

  return (
    <main className="min-h-screen bg-black text-[#f0f0f0] pt-24 pb-32">
      <BackgroundDecorations />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section 1: Opening Statement */}
        <section className="mt-24 mb-12">
          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-[80px] text-[#ff0080] leading-[0.9] uppercase tracking-tighter mb-12">
            The Peace Forum<br/>That Wasn't
          </h1>
          <div className="font-default text-lg md:text-xl text-[#00ff41] leading-relaxed max-w-2xl space-y-6">
            <p>
              r/ForbiddenBromance was created in 2019 as a space for Israelis and Lebanese
              to talk across the conflict. It has 88,094 comments, 4,895 posts,
              and six years of recorded history.
            </p>
            <p>
              This investigation analyzed all of it.
            </p>
            <p>
              What we found was not a Mossad operation.
              What we found was more interesting — and more disturbing — than that.
            </p>
          </div>
        </section>

        <AsciiDivider text="CHAPTER 01 // WARTIME SIGNALS" />

        {/* Section 2: Wartime Synchronization */}
        <section>
          <h2 className="font-heading font-bold text-3xl md:text-[48px] text-white mb-8">
            THE SPIKES DON'T LIE
          </h2>
          
          <div className="mb-12">
            <TerminalBarChart 
              data={spikeData} 
              xKey="month" 
              yKey="comments" 
              events={events}
              highlightCondition={(payload) => payload.month === '2024-09' || payload.month === '2024-10'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="bg-[#0a0a0a] border border-[#ff0080] p-6 shadow-[0_0_20px_rgba(255,0,128,0.3)] glow-pink-box">
                <div className="font-mono text-[10px] text-[#ff0080] tracking-widest mb-4">CRITICAL ANOMALY</div>
                <div className="font-mono text-3xl text-white mb-2">z=4.611</div>
                <div className="font-mono text-xs text-[#888888] mb-1">SEP 2024 VOLUME</div>
                <div className="font-mono text-sm text-[#00ff41]">6,634 COMMENTS</div>
              </div>
            </div>
            <div className="md:col-span-2 font-default text-lg text-[#f0f0f0] leading-relaxed space-y-6">
              <p>
                The two highest-activity months in this subreddit's entire six-year history
                are September 2024 and October 2024. Their statistical z-scores — 4.611 and 4.507 —
                place them far outside normal variation.
              </p>
              <p>
                These months correspond, to the day, with Israel's assassination of Hassan Nasrallah,
                the pager and walkie-talkie operations against Hezbollah, and the IDF ground incursion
                into South Lebanon.
              </p>
              <p className="border-l-2 border-[#00ff41] pl-4 italic text-[#00ff41]">
                The subreddit did not simply report on these events.
                It processed them — with identifiable, repeating framing patterns.
              </p>
            </div>
          </div>
        </section>

        <AsciiDivider text="CHAPTER 02 // AUDIENCE MANAGEMENT" />

        {/* Section 3: Rhetorical Mode-Switching */}
        <section>
          <h2 className="font-heading font-bold text-3xl md:text-[48px] text-white mb-8">
            DIFFERENT VOICE, DIFFERENT ROOM
          </h2>

          <div className="mb-12">
             <TerminalHeatmap data={personaData} />
          </div>

          <div className="font-default text-lg text-[#f0f0f0] leading-relaxed space-y-6 bg-[#0a0a0a] p-8 border border-[#111111]">
            <p>
              Rhetorical mode-switching is not proof of deception.
              Everyone adjusts their tone for their audience.
            </p>
            <p>
              But the pattern here is directional and consistent.
              Multiple high-volume Israeli and diaspora-Israeli participants
              measurably calibrate their rhetoric when they know Lebanese users are reading.
              The adjustments — toward softer anti-Hezbollah framing,
              toward more security-forward arguments,
              toward Palestinian blame-deflection —
              are not random noise. They are a pattern.
            </p>
            <p className="text-[#00ff41]">
              This is what researchers studying online influence call audience management.
              It does not require a script. It does not require a handler.
              It only requires a shared understanding of what the goal is.
            </p>
          </div>
        </section>

        <AsciiDivider text="CHAPTER 03 // THE ARENA STRUCTURE" />

        {/* Section 4: Fight-Thread Architecture */}
        <section>
          <h2 className="font-heading font-bold text-3xl md:text-[48px] text-white mb-8">
            WHO PUTS WHOM ON TRIAL
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="font-default text-lg text-[#f0f0f0] leading-relaxed space-y-6">
              <p>
                The highest-conflict threads in r/ForbiddenBromance are not randomly distributed
                across topics. They cluster.
              </p>
              <p>
                They cluster around questions that place Lebanese users in the position
                of defendant — required to explain, justify, or denounce Hezbollah
                before any conversation about peace can proceed.
              </p>
              <div className="border border-[#111111] bg-[#0a0a0a] p-6 space-y-4">
                <p className="font-mono text-xs text-[#888]">&gt; "Why do Lebanese people hate Israeli unproprtionally..."</p>
                <p className="font-mono text-xs text-[#888]">&gt; "For the stupid Lebanese that participate in this sub. Please wake up"</p>
                <p className="font-mono text-xs text-[#888]">&gt; "Would the Lebanese be less hostile if they understood Israel doesn't want to conquer Lebanon?"</p>
                <p className="font-mono text-xs text-[#888]">&gt; "Lebanese people can't control Hizbollah, we don't deserve to be hit"</p>
              </div>
              <p className="font-bold text-[#ff0080]">
                This is not balanced dialogue.<br/>
                This is a structured interrogation format wearing the costume of a peace forum.
              </p>
            </div>

            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
              {fightThreads.map((thread, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-[#111111] hover:border-[#00ff41] p-4 transition-colors group cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#111111] group-hover:bg-[#00ff41] transition-colors" />
                  <div className="flex justify-between items-start mb-2 pl-3">
                    <h4 className="font-default text-sm text-white truncate max-w-[80%]">{thread.title}</h4>
                    <span className="font-mono text-[10px] text-[#ff0080] bg-[#ff0080]/10 px-2 py-1">#{i+1}</span>
                  </div>
                  <div className="flex gap-4 pl-3 opacity-60">
                    <span className="font-mono text-[9px]">HOSTILITY: {thread.hostility_count}</span>
                    <span className="font-mono text-[9px]">IDENTITY: {thread.identity_challenge_count}</span>
                    <span className="font-mono text-[9px]">FLAIR: {thread.author_flair}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AsciiDivider text="CHAPTER 04 // THE CULTURE" />

        {/* Section 5: The Hasbara Culture Explanation */}
        <section>
          <h2 className="font-heading font-bold text-3xl md:text-[48px] text-white mb-8">
            NOT A CONSPIRACY. A CULTURE.
          </h2>

          <div className="font-default text-lg text-[#f0f0f0] leading-relaxed space-y-6 mb-12">
            <p>
              The word "hasbara" is Hebrew for "explaining."
              In practice, it has come to describe a diffuse, socially-reproduced orientation
              in Israeli and diaspora-Israeli communities — an instinct to actively shape
              foreign-facing narratives about Israel, especially in wartime.
            </p>
            <p>
              Hasbara culture does not require a government handler.
              It does not require a Mossad officer monitoring Reddit.
              It spreads through media ecosystems, through social reinforcement,
              through the accumulated weight of a society that has been told,
              from childhood, that the world misunderstands it
              and that correcting that misunderstanding is a civic duty.
            </p>
            <p>
              The pattern we documented in r/ForbiddenBromance is consistent
              with hasbara culture operating at scale.
              Heavy participants with deep roots in Israeli-facing online ecosystems
              who activate during military operations,
              calibrate their rhetoric for Lebanese audiences,
              and consistently frame the conversation
              around Lebanese accountability rather than bilateral understanding.
            </p>
            <p className="text-[#00b4ff] italic">
              We are not saying these individuals are agents.
              We are saying the behavioral pattern is recognizable.
              And we are saying the pattern has consequences for the Lebanese participants
              who come to this space looking for actual dialogue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0a0a0a] border border-[#111111] p-8">
              <div className="font-mono text-xs text-[#00ff41] mb-6 tracking-widest uppercase">
                LEFT:<br/>TOP 5 ISRAELI-CONTEXT<br/>HEAVY PARTICIPANTS
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-[#ff0080] mb-2 cursor-pointer hover:underline">IbnEzra613</h4>
                  <ul className="font-mono text-[10px] text-[#888] space-y-1">
                    <li>38,766 outside Reddit comments</li>
                    <li>903 in r/ForbiddenBromance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[#ff0080] mb-2 cursor-pointer hover:underline">Tamtumtam</h4>
                  <ul className="font-mono text-[10px] text-[#888] space-y-1">
                    <li>9,105 Israel-related outside</li>
                    <li>6,598 Hebrew-language items</li>
                    <li>465 in r/ForbiddenBromance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#111111] p-8">
              <div className="font-mono text-xs text-[#00b4ff] mb-6 tracking-widest uppercase">
                RIGHT:<br/>TOP 5 LEBANESE-CONTEXT<br/>HEAVY PARTICIPANTS
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-[#00ff41] mb-2 cursor-pointer hover:underline">victoryismind</h4>
                  <ul className="font-mono text-[10px] text-[#888] space-y-1">
                    <li>3,137 FB comments</li>
                    <li>3,195 outside Lebanon-related</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[#00ff41] mb-2 cursor-pointer hover:underline">cha3bghachim</h4>
                  <ul className="font-mono text-[10px] text-[#888] space-y-1">
                    <li>1,124 FB comments</li>
                    <li>2,011 outside Lebanon-related</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AsciiDivider text="CHAPTER 05 // WHAT WE CANNOT SAY" />

        {/* Section 6: Counterevidence */}
        <section>
          <h2 className="font-heading font-bold text-3xl md:text-[48px] text-[#888888] mb-8">
            THE DATA DOES NOT SHOW EVERYTHING WE SUSPECTED
          </h2>

          <div className="font-default text-lg text-[#f0f0f0] leading-relaxed space-y-6 mb-12">
            <p>
              Intellectual honesty requires stating this plainly.
            </p>
            <p>
              The tracked sample of Lebanese-flair users shows that
              0 of them comment more in Israel-related subreddits than in Lebanon-related ones.
              Their linguistic patterns — dialect-specific Arabizi, Lebanese transliterations —
              are consistent with authentic Lebanese origin.
            </p>
            <p className="font-bold border-l-2 border-[#ff0080] pl-4">
              The fake-Lebanese-identity hypothesis is not currently supported by the data.
            </p>
            <p>
              Some of the most heated fights in this subreddit were started by
              Lebanese-flair users themselves.
              The subreddit does contain genuine voices.
              The subreddit does contain genuine cross-border conversations.
            </p>
            <p>
              The problem this investigation documents is not impersonation.
              It is the architecture of the space itself —
              who dominates it, when they arrive, and what they consistently push.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {signals.map((sig, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#111111] p-4 text-xs font-mono text-[#888]">
                <span className="text-[#00b4ff]">[{sig.actor}]</span>
                <span className="text-white ml-2 block mt-2 border-l border-[#00ff41]/50 pl-3">
                  "{sig.text}"
                </span>
                <div className="mt-3 text-[#ff0080] opacity-80 uppercase text-[9px] tracking-widest">
                  PATTERN: {sig.pattern}
                </div>
              </div>
            ))}
          </div>
        </section>

        <AsciiDivider text="CHAPTER 06 // THE CONFIDENCE LADDER" />

        {/* Section 7: Attribution Boundary */}
        <section className="mb-24">
          <h2 className="font-heading font-bold text-3xl md:text-[48px] text-white mb-8">
            WHERE THE EVIDENCE STOPS
          </h2>
          
          <div className="mb-16">
            <ConfidenceLadder />
          </div>

          <div className="font-default text-lg text-[#f0f0f0] leading-relaxed space-y-6 border-t border-[#111111] pt-12">
            <p>This investigation reaches Rung 3.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
              <div>
                <h4 className="font-mono text-[#ff0080] mb-4">What would be needed to reach Rung 4:</h4>
                <ul className="list-disc list-inside space-y-2 text-[#888] font-default">
                  <li>Account creation date clustering relative to geopolitical events</li>
                  <li>Source/domain ecology showing coordinated link-sharing</li>
                  <li>Verified coordination infrastructure (shared accounts, synchronized posting schedules, recoverable communication)</li>
                  <li>Moderation asymmetry showing agenda enforcement in content removal patterns</li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-red-500 mb-4">What would be needed to reach Rung 5:</h4>
                <ul className="list-disc list-inside space-y-2 text-[#888] font-default">
                  <li>Direct evidence of state direction</li>
                  <li>Something this data cannot provide</li>
                </ul>
              </div>
            </div>

            <p className="text-xl text-[#00ff41] italic font-bold text-center mt-12 mb-32 border border-[#00ff41]/30 p-8 glow-green-box">
              We do not speculate beyond what the evidence shows.<br/>
              The evidence is already significant.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
