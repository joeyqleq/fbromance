"use client";

import { ChartFrame } from "@/components/poison/workbench/chart-frame";
import type {
  PoisonDenseThread,
  PoisonEventTimelineItem,
  PoisonHebrewHighlight,
} from "@/data/poison-dashboard";

interface RhetoricPanelProps {
  threads: PoisonDenseThread[];
  events: PoisonEventTimelineItem[];
  watchwords: string[];
  highlights: PoisonHebrewHighlight[];
}

export function RhetoricPanel({ threads, events, watchwords, highlights }: RhetoricPanelProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ChartFrame
          id="rhetoric-watchlist"
          eyebrow="watchwords"
          title="Rhetoric artifacts that deserve tagging across future passes."
          caption="This is a live watchlist rather than a verdict layer. It keeps the current strongest terms, motifs, and operational phrases visible so later archive refreshes can test them systematically."
          exportData={watchwords.map((word) => ({ watchword: word }))}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {watchwords.map((word) => (
              <div key={word} className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 font-mono text-sm uppercase tracking-[0.24em] text-primaryLight">
                {word}
              </div>
            ))}
          </div>
        </ChartFrame>

        <ChartFrame
          id="rhetoric-threads"
          eyebrow="thread excerpts"
          title="Dense thread titles to revisit under the rhetoric lens."
          caption="Thread titles and event labels give the rhetoric pass its first hooks. The next stage will tag hostility, annexation rhetoric, leaflet reactions, and identity-performance contradictions more explicitly."
          exportData={threads}
        >
          <div className="grid gap-3">
            {threads.slice(0, 5).map((thread, index) => (
              <div key={thread.link_id} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">thread 0{index + 1}</div>
                <div className="mt-3 font-display text-xl font-black tracking-[-0.04em]">{thread.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {thread.month} · {thread.comments} comments · paired event label: {events[index]?.label ?? "pending"}
                </p>
              </div>
            ))}
          </div>
        </ChartFrame>
      </div>

      <ChartFrame
        id="rhetoric-hebrew-bridge"
        eyebrow="cross-language rhetoric"
        title="Language choice itself becomes part of the rhetoric when the tone hardens or identity performance shifts."
        caption="This bridge panel keeps the Hebrew subset connected to the rest of the rhetoric analysis instead of isolating it into a specialist corner."
        exportData={highlights}
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {highlights.slice(0, 6).map((item) => (
            <article key={item.id} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-display text-lg font-black tracking-[-0.04em]">{item.author}</div>
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primaryLight">{item.month}</div>
              </div>
              <p className="mt-3 font-mono text-sm leading-7 text-foreground/90">{item.text}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.english_gloss}</p>
            </article>
          ))}
        </div>
      </ChartFrame>
    </div>
  );
}
