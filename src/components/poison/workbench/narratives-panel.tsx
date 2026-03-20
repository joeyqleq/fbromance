"use client";

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartFrame } from "@/components/poison/workbench/chart-frame";
import type { PoisonCrossReference, PoisonFlairBreakdown, PoisonKeywordSeriesItem, PoisonSpikeMonth } from "@/data/poison-dashboard";

interface NarrativesPanelProps {
  spikes: PoisonSpikeMonth[];
  flairRows: PoisonFlairBreakdown[];
  keywords: PoisonKeywordSeriesItem[];
  crossReference: PoisonCrossReference;
}

export function NarrativesPanel({ spikes, flairRows, keywords, crossReference }: NarrativesPanelProps) {
  const strongest = spikes.slice(0, 3);
  const keywordData = keywords.slice(-18).map((row) => ({
    month: row.month,
    hezbollah: row.hezbollah,
    sectarian: row.sectarian,
    peace: row.peace,
    gaza: row.gaza_palestine,
    identity: row.identity,
  }));

  return (
    <div className="grid gap-6">
      <ChartFrame
        id="narrative-pressure"
        eyebrow="narratives"
        title="Three pressure zones for reading the archive."
        caption="Narratives are treated here as reading lenses. They are meant to focus manual investigation, not to reduce the subreddit to a single motive."
        exportData={strongest}
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {[
            {
              title: "Anti-Hezbollah pressure",
              text: "Spike windows and captions should foreground when anti-Hezbollah framing absorbs state-failure blame and sectarian affect into one stream.",
            },
            {
              title: "Christian militia memory",
              text: "Historical cooperation and militia nostalgia matter because they can soften extreme current claims by placing them inside a familiar memory frame.",
            },
            {
              title: "Normalization theater",
              text: "Peace-branding posts need to be compared against the timing of coercive events, leaflet operations, and expansionist rhetoric.",
            },
          ].map((item, index) => (
            <div key={item.title} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
              <div className="signal-label">0{index + 1}</div>
              <div className="mt-4 font-display text-2xl font-black tracking-[-0.04em]">{item.title}</div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.24em] text-primaryLight">
                strongest month: {strongest[index]?.month ?? "n/a"}
              </p>
            </div>
          ))}
        </div>
      </ChartFrame>

      <ChartFrame
        id="narrative-keywords"
        eyebrow="keyword currents"
        title="Keyword currents reveal when different rhetorical lanes are moving together or diverging."
        caption="This is the science-magazine view of the rhetoric layer: anti-Hezbollah, sectarian, peace-branding, Gaza, and identity signals plotted together so the user can see which narratives rise in tandem."
        exportData={keywordData}
      >
        <div className="h-[22rem]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={keywordData}>
              <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(246,247,251,0.62)", fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip
                cursor={{ stroke: "rgba(255,255,255,0.15)" }}
                contentStyle={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,13,20,0.92)" }}
              />
              <Line type="monotone" dataKey="hezbollah" stroke="#ff2cb8" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="sectarian" stroke="#b7ff5f" strokeWidth={2.2} dot={false} />
              <Line type="monotone" dataKey="peace" stroke="#61f5ff" strokeWidth={2.2} dot={false} />
              <Line type="monotone" dataKey="gaza" stroke="#ffae57" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="identity" stroke="#285cff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartFrame>

      <ChartFrame
        id="narrative-flair-context"
        eyebrow="flair context"
        title="Flair rows for the selected month."
        caption="Flair is only a self-presented signal, but it still matters because the subreddit makes identity visible as part of the stagecraft."
        exportData={flairRows}
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {flairRows.slice(0, 9).map((row) => (
            <div key={`${row.month}-${row.flair}`} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{row.flair}</div>
              <div className="mt-3 font-display text-3xl font-black tracking-[-0.04em]">{row.total}</div>
              <p className="mt-2 text-sm text-muted-foreground">{row.month}</p>
            </div>
          ))}
        </div>
      </ChartFrame>

      <ChartFrame
        id="narrative-priority-windows"
        eyebrow="priority windows"
        title="Narrative reading should start where multiple research passes already agree the archive is hottest."
        caption="These windows act as guided entry points for deeper reading. They compress the timing hypotheses into a shortlist instead of leaving the reader to hunt blindly across the whole archive."
        exportData={crossReference.priority_windows}
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {crossReference.priority_windows.slice(0, 8).map((window) => (
            <div key={`${window.window_month}-${window.label}`} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-display text-xl font-black tracking-[-0.04em]">{window.window_month}</div>
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primaryLight">{window.priority || "review"}</div>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{window.why}</p>
            </div>
          ))}
        </div>
      </ChartFrame>
    </div>
  );
}
