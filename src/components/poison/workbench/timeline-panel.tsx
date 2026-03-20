"use client";

import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartFrame } from "@/components/poison/workbench/chart-frame";
import type { PoisonEventMonthRollup, PoisonEventTimelineItem, PoisonSpikeMonth } from "@/data/poison-dashboard";

interface TimelinePanelProps {
  spikes: PoisonSpikeMonth[];
  events: PoisonEventTimelineItem[];
  eventRollup: PoisonEventMonthRollup[];
  activeMonth?: string;
}

export function TimelinePanel({ spikes, events, eventRollup, activeMonth = "all" }: TimelinePanelProps) {
  const rollupByMonth = new Map(eventRollup.map((row) => [row.month, row]));
  const chartData = spikes.slice(0, 12).map((row) => {
    const eventRow = rollupByMonth.get(row.month);
    return {
      month: row.month,
      comments: row.comments,
      posts: row.posts,
      majorEvents: eventRow?.major_events ?? 0,
      ceasefireEvents: eventRow?.ceasefire_events ?? 0,
      highRelevanceEvents: eventRow?.high_relevance_events ?? 0,
    };
  });
  const focusMonths =
    activeMonth !== "all"
      ? chartData
          .filter((item) => item.month === activeMonth)
          .concat(chartData.filter((item) => item.month !== activeMonth))
          .slice(0, 4)
      : chartData.slice(0, 4);

  return (
    <div className="grid gap-6">
      <ChartFrame
        id="timeline-correlation"
        eyebrow="timeline"
        title="Spike windows and event density share the same plotting surface instead of living on separate islands."
        caption="Comments and posts remain the core activity signals, but the high-relevance event line makes it easier to see when the archive is moving alongside a denser external window rather than in isolation."
        exportData={chartData}
      >
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
            {focusMonths.map((row) => (
              <div key={row.month} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-primaryLight">{row.month}</div>
                <div className="mt-3 font-display text-3xl font-black tracking-[-0.05em]">
                  {row.comments.toLocaleString()}
                </div>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {row.posts.toLocaleString()} posts in the same window.
                  {row.month === activeMonth ? " Selected filter window." : ""}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:hidden">
            <div className="-mx-1 overflow-x-auto pb-1">
              <div className="h-[17rem] min-w-[34rem] pr-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="timelineCommentsMobile" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff2cb8" stopOpacity={0.82} />
                        <stop offset="95%" stopColor="#ff2cb8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="timelinePostsMobile" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#61f5ff" stopOpacity={0.74} />
                        <stop offset="95%" stopColor="#61f5ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "rgba(246,247,251,0.58)", fontSize: 10 }}
                      tickFormatter={(value: string) => value.slice(2)}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ stroke: "rgba(255,255,255,0.15)" }}
                      contentStyle={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,13,20,0.92)" }}
                    />
                    <Area type="monotone" dataKey="posts" stroke="#61f5ff" fill="url(#timelinePostsMobile)" />
                    <Area type="monotone" dataKey="comments" stroke="#ff2cb8" fill="url(#timelineCommentsMobile)" />
                    <Line type="monotone" dataKey="highRelevanceEvents" stroke="#b7ff5f" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="hidden lg:block h-[24rem]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="timelineComments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff2cb8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff2cb8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="timelinePosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#61f5ff" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#61f5ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "rgba(246,247,251,0.62)", fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ stroke: "rgba(255,255,255,0.15)" }}
                  contentStyle={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,13,20,0.92)" }}
                />
                <Area type="monotone" dataKey="posts" stroke="#61f5ff" fill="url(#timelinePosts)" />
                <Area type="monotone" dataKey="comments" stroke="#ff2cb8" fill="url(#timelineComments)" />
                <Line type="monotone" dataKey="highRelevanceEvents" stroke="#b7ff5f" strokeWidth={2.2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ChartFrame>

      <ChartFrame
        id="timeline-window-summary"
        eyebrow="window summary"
        title="Selected windows translated into operational counts."
        caption="This companion view makes the event side legible without sacrificing the archive chart. It shows how many major, ceasefire, and high-relevance external events sit under each month."
        exportData={focusMonths}
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {focusMonths.map((row) => (
            <div key={row.month} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{row.month}</div>
              <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between gap-3">
                  <span>comments</span>
                  <span className="font-display text-xl font-black tracking-[-0.04em] text-foreground">{row.comments.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>major events</span>
                  <span className="font-display text-xl font-black tracking-[-0.04em] text-cyan-200">{row.majorEvents}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>ceasefire events</span>
                  <span className="font-display text-xl font-black tracking-[-0.04em] text-primaryLight">{row.ceasefireEvents}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>high relevance</span>
                  <span className="font-display text-xl font-black tracking-[-0.04em] text-accent">{row.highRelevanceEvents}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartFrame>

      <ChartFrame
        id="event-ledger"
        eyebrow="linked events"
        title="Event ledger for the currently selected window."
        caption="These cards keep the timeline grounded in named incidents rather than abstract geopolitics. They are intended to be cross-referenced against the subreddit spikes, not read as free-floating context."
        exportData={events}
      >
        <div className="grid gap-3">
          {events.map((event) => (
            <div key={`${event.window_month}-${event.event_date}-${event.label}`} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{event.event_date}</div>
                <div className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {event.window_month}
                </div>
              </div>
              <div className="mt-3 font-display text-2xl font-black tracking-[-0.04em]">{event.label}</div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{event.description}</p>
              <a href={event.source_url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-primaryLight">
                {event.source_title}
              </a>
            </div>
          ))}
        </div>
      </ChartFrame>
    </div>
  );
}
