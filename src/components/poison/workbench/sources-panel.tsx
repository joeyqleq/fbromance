"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ResizeFrame } from "@/components/poison/workbench/resize-frame";
import { ChartFrame } from "@/components/poison/workbench/chart-frame";
import type {
  PoisonCrossReference,
  PoisonSourceInventoryItem,
  PoisonSourceSummaryRow,
  PoisonWatchlistItem,
} from "@/data/poison-dashboard";

interface SourcesPanelProps {
  sources: PoisonSourceInventoryItem[];
  sourceTypeSummary: PoisonSourceSummaryRow[];
  sourceLanguageSummary: PoisonSourceSummaryRow[];
  watchlist: PoisonWatchlistItem[];
  crossReference: PoisonCrossReference;
}

export function SourcesPanel({
  sources,
  sourceTypeSummary,
  sourceLanguageSummary,
  watchlist,
  crossReference,
}: SourcesPanelProps) {
  const priorityWindows = crossReference.priority_windows.slice(0, 8);
  const triggerMap = crossReference.event_trigger_map.slice(0, 8);

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <ChartFrame
          id="source-types"
          eyebrow="source topology"
          title="Local Arabic and Lebanese source classes stay visible as first-class evidence inputs."
          caption="The source layer should never disappear behind the charts. This breakdown makes it explicit which kinds of outlets the external-event registry actually depends on."
          exportData={sourceTypeSummary}
        >
          <div className="h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceTypeSummary}>
                <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "rgba(246,247,251,0.58)", fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,13,20,0.92)" }}
                />
                <Bar dataKey="count" radius={[18, 18, 10, 10]} fill="#61f5ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartFrame>

        <ChartFrame
          id="source-languages"
          eyebrow="language mix"
          title="The registry is deliberately multilingual because micro-incidents often do not survive translation into wire coverage."
          caption="Language coverage is not cosmetic here. Arabic, French, and English layers have different likelihoods of surfacing obscure names, local villages, and daily ceasefire-violation details."
          exportData={sourceLanguageSummary}
        >
          <div className="grid gap-3">
            {sourceLanguageSummary.map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
                <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{row.label}</div>
                <div className="font-display text-2xl font-black tracking-[-0.04em]">{row.count.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </ChartFrame>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <ChartFrame
          id="priority-windows"
          eyebrow="cross-reference"
          title="Priority windows define where timing analysis is most likely to pay off."
          caption="These windows are merged from multiple vendor research passes. They are not proof zones; they are where the archive should be pressured hardest against external reality."
          exportData={priorityWindows}
        >
          <div className="grid gap-3">
            {priorityWindows.map((window) => (
              <div key={`${window.window_month}-${window.label}`} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-display text-xl font-black tracking-[-0.04em]">{window.window_month}</div>
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primaryLight">
                    {window.priority || "review"}
                  </span>
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {window.start} → {window.end}
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{window.why}</p>
              </div>
            ))}
          </div>
        </ChartFrame>

        <ChartFrame
          id="watchlist"
          eyebrow="obscure watchlist"
          title="Watchlist entities are the names and places most worth matching back into the archive."
          caption="This is where obscure villages, figures, roads, and organizations become operational join keys rather than background trivia."
          exportData={watchlist.slice(0, 20)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {watchlist.slice(0, 12).map((item) => (
              <article key={item.watch_id} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-display text-lg font-black tracking-[-0.04em]">{item.name_or_place}</div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primaryLight">{item.type}</div>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.why_it_is_notable}</p>
              </article>
            ))}
          </div>
        </ChartFrame>
      </div>

      <ChartFrame
        id="source-registry"
        eyebrow="registry"
        title="Source registry with coverage strength, bias notes, and vendor overlap."
        caption="This table keeps provenance explicit. If a future claim depends on a source class, the user should be able to see that dependence rather than infer it from narrative prose."
        exportData={sources}
      >
        <ResizeFrame className="max-h-[34rem] min-h-[24rem]">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr_0.6fr] gap-4 border-b border-white/10 px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span>source</span>
              <span>type</span>
              <span>language</span>
              <span>coverage</span>
              <span>vendors</span>
            </div>
            {sources.map((source) => (
              <div
                key={source.source_id}
                className="grid grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr_0.6fr] gap-4 border-b border-white/5 px-4 py-4 text-sm"
              >
                <div className="space-y-1">
                  <div className="font-display text-lg font-black tracking-[-0.04em]">{source.source_name}</div>
                  <div className="text-xs text-muted-foreground">{source.country_or_region}</div>
                </div>
                <div className="text-muted-foreground">{source.source_type}</div>
                <div className="text-muted-foreground">{source.language}</div>
                <div className="text-muted-foreground">{source.likely_coverage_strength}</div>
                <div className="font-display text-xl font-black tracking-[-0.04em]">{source.vendor_count}</div>
              </div>
            ))}
          </div>
        </ResizeFrame>
      </ChartFrame>

      <ChartFrame
        id="event-trigger-map"
        eyebrow="trigger map"
        title="Trigger heuristics tie event classes back to likely subreddit responses."
        caption="This is the bridge between event logging and investigation. It says which kinds of incidents are most likely to map onto celebration, hostility, normalization, or state-failure rhetoric inside the archive."
        exportData={triggerMap}
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {triggerMap.map((trigger) => (
            <article key={`${trigger.event_type}-${trigger.tier}`} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primaryLight">{trigger.tier}</div>
              <div className="mt-3 font-display text-lg font-black tracking-[-0.04em]">{trigger.event_type}</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{trigger.why}</p>
            </article>
          ))}
        </div>
      </ChartFrame>
    </div>
  );
}
