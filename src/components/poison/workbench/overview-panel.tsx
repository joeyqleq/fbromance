"use client";

import { ChartFrame } from "@/components/poison/workbench/chart-frame";
import { NetworkPanel } from "@/components/poison/workbench/network-panel";
import type {
  PoisonDenseThread,
  PoisonEventMonthRollup,
  PoisonFlairBreakdown,
  PoisonInteraction,
  PoisonOverview,
  PoisonSpikeMonth,
} from "@/data/poison-dashboard";

interface OverviewPanelProps {
  overview: PoisonOverview;
  spikes: PoisonSpikeMonth[];
  threads: PoisonDenseThread[];
  flairRows: PoisonFlairBreakdown[];
  interactions: PoisonInteraction[];
  eventRollup: PoisonEventMonthRollup[];
}

export function OverviewPanel({ overview, spikes, threads, flairRows, interactions, eventRollup }: OverviewPanelProps) {
  const topThreads = threads.slice(0, 4);
  const topFlairs = flairRows.slice(0, 4);
  const hotEventMonths = eventRollup
    .slice()
    .sort((a, b) => b.high_relevance_events - a.high_relevance_events)
    .slice(0, 4);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {[
          ["posts", overview.posts],
          ["comments", overview.comments],
          ["hebrew posts", overview.hebrew_posts],
          ["histories", overview.downloaded_user_histories],
        ].map(([label, value], index) => (
          <div key={label} className="panel-chassis hover-lift p-5">
            <div className="signal-label">0{index + 1}</div>
            <div className="mt-4 font-display text-4xl font-black tracking-[-0.06em]">{Number(value).toLocaleString()}</div>
            <p className="mt-2 text-sm uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <ChartFrame
        id="overview-heat"
        eyebrow="event heat"
        title="The archive now sits on top of a richer external-event spine."
        caption="These cards show which months are hottest once major events, post-ceasefire violations, and high-relevance incident density are counted together."
        exportData={hotEventMonths}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {hotEventMonths.map((row) => (
            <div key={row.month} className="rounded-[1.4rem] border border-white/10 bg-black/25 p-4">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{row.month}</div>
              <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between gap-3">
                  <span>major</span>
                  <span className="font-display text-xl font-black tracking-[-0.04em] text-foreground">{row.major_events}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>ceasefire</span>
                  <span className="font-display text-xl font-black tracking-[-0.04em] text-primaryLight">{row.ceasefire_events}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>high relevance</span>
                  <span className="font-display text-xl font-black tracking-[-0.04em] text-accent">{row.high_relevance_events}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartFrame>

      <ChartFrame
        id="overview-spikes"
        eyebrow="overview"
        title="The atlas starts from the months that broke the baseline hardest."
        caption="This quick table gives the reader the operational center of gravity before they branch into specific narratives or users."
        exportData={spikes.slice(0, 8)}
      >
        <div className="-mx-1 flex snap-x gap-4 overflow-x-auto pb-2 md:mx-0 md:grid md:overflow-visible md:pb-0 xl:grid-cols-4">
          {spikes.slice(0, 8).map((row) => (
            <div key={row.month} className="min-w-[14rem] snap-start rounded-[1.4rem] border border-white/10 bg-black/25 p-4 md:min-w-0">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{row.month}</div>
              <div className="mt-3 font-display text-3xl font-black tracking-[-0.05em]">{row.comments.toLocaleString()}</div>
              <p className="mt-2 text-sm text-muted-foreground">comments · z {row.comment_zscore.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </ChartFrame>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <ChartFrame
          id="dense-threads"
          eyebrow="dense threads"
          title="Threads with enough replies and unique authors to matter."
          caption="Dense threads are useful because they combine volume and engagement shape. They are the easiest place to inspect tone, escalation, and unusually repetitive interaction."
          exportData={topThreads}
        >
          <div className="grid gap-3">
            {topThreads.map((thread) => (
              <div key={thread.link_id} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                <div className="font-display text-xl font-black tracking-[-0.04em]">{thread.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {thread.month} · {thread.comments} comments · {thread.unique_authors} authors · reply ratio {thread.reply_ratio.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </ChartFrame>

        <ChartFrame
          id="flair-overview"
          eyebrow="flair mix"
          title="Selected month flair mix."
          caption="Self-presented flair is not identity proof, but it is still a useful public-facing signal for how the subreddit organizes performance."
          exportData={topFlairs}
        >
          <div className="grid gap-3">
            {topFlairs.map((row) => (
              <div key={`${row.month}-${row.flair}`} className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{row.flair}</div>
                  <div className="text-sm text-muted-foreground">{row.month}</div>
                </div>
                <div className="font-display text-2xl font-black tracking-[-0.04em]">{row.total}</div>
              </div>
            ))}
          </div>
        </ChartFrame>
      </div>

      <NetworkPanel data={interactions} />
    </div>
  );
}
