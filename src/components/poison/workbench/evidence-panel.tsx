"use client";

import {
  poisonCeasefireEvents,
  poisonEvidenceLedger,
  poisonHebrewHighlights,
  poisonMajorEvents,
  poisonOverview,
  poisonSourceInventory,
  poisonWatchlist,
} from "@/data/poison-dashboard";
import { ChartFrame } from "@/components/poison/workbench/chart-frame";

const counts = [
  { label: "posts", value: poisonOverview.posts },
  { label: "comments", value: poisonOverview.comments },
  { label: "hebrew comments", value: poisonOverview.hebrew_comments },
  { label: "downloaded histories", value: poisonOverview.downloaded_user_histories },
  { label: "sources", value: poisonSourceInventory.length },
  { label: "major events", value: poisonMajorEvents.length },
  { label: "ceasefire events", value: poisonCeasefireEvents.length },
  { label: "watchlist entities", value: poisonWatchlist.length },
  { label: "hebrew highlights", value: poisonHebrewHighlights.length },
];

export function EvidencePanel() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <ChartFrame
          id="evidence-ledger"
          eyebrow="evidence"
          title="Artifact ledger for the public-facing build."
          caption="The site should make it obvious which layers are raw exports, which are cleaned views, and which are derived interpretations. That boundary is what keeps the project defensible."
          exportData={poisonEvidenceLedger}
        >
          <div className="grid gap-3">
            {poisonEvidenceLedger.map((row) => (
              <div key={row.artifact} className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
                <div>
                  <div className="font-display text-xl font-black tracking-[-0.04em]">{row.artifact}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{row.note}</div>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-primaryLight">
                  {row.status}
                </div>
              </div>
            ))}
          </div>
        </ChartFrame>

        <ChartFrame
          id="evidence-counts"
          eyebrow="counts"
          title="Current public surface scale."
          caption="This is the public accounting layer: archive volume, language review, source registry size, and the depth of the normalized event ledger."
          exportData={counts}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {counts.map((row) => (
              <div key={row.label} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                <div className="signal-label">{row.label}</div>
                <div className="mt-3 font-display text-4xl font-black tracking-[-0.04em]">{Number(row.value).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </ChartFrame>
      </div>

      <ChartFrame
        id="evidence-boundary"
        eyebrow="method boundary"
        title="The site keeps raw material, cleaned material, and interpretation in distinct lanes."
        caption="This is the project’s main integrity rule. A public-facing reader should be able to tell where direct archive facts stop and where the investigative synthesis begins."
        exportData={[
          { lane: "raw intake", description: "Original subreddit exports, user-history downloads, and vendor research files." },
          { lane: "cleaned evidence", description: "Normalized NDJSON, merged event registries, Hebrew review queue, and source inventory." },
          { lane: "derived interpretation", description: "Spike correlation, narrative clustering, contradiction scoring, and rhetoric watchlists." },
        ]}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              lane: "raw intake",
              description: "Original subreddit exports, user-history downloads, and vendor research files.",
            },
            {
              lane: "cleaned evidence",
              description: "Normalized NDJSON, merged event registries, Hebrew review queue, and source inventory.",
            },
            {
              lane: "derived interpretation",
              description: "Spike correlation, narrative clustering, contradiction scoring, and rhetoric watchlists.",
            },
          ].map((row, index) => (
            <article key={row.lane} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
              <div className="signal-label">0{index + 1}</div>
              <div className="mt-4 font-display text-2xl font-black tracking-[-0.04em]">{row.lane}</div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{row.description}</p>
            </article>
          ))}
        </div>
      </ChartFrame>
    </div>
  );
}
