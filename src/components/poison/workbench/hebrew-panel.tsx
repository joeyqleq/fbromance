"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartFrame } from "@/components/poison/workbench/chart-frame";
import type {
  PoisonHebrewActivityItem,
  PoisonHebrewHighlight,
  PoisonMonthlyTopAuthor,
} from "@/data/poison-dashboard";

interface HebrewPanelProps {
  activity: PoisonHebrewActivityItem[];
  highlights: PoisonHebrewHighlight[];
  monthlyAuthors: PoisonMonthlyTopAuthor[];
  activeMonth?: string;
}

export function HebrewPanel({
  activity,
  highlights,
  monthlyAuthors,
  activeMonth = "all",
}: HebrewPanelProps) {
  const chartData = activity.slice(-24).map((row) => ({
    month: row.month,
    hebrewPosts: row.hebrew_posts,
    hebrewComments: row.hebrew_comments,
    total: row.hebrew_posts + row.hebrew_comments,
  }));
  const visibleHighlights =
    activeMonth === "all"
      ? highlights.slice(0, 8)
      : highlights.filter((item) => item.month === activeMonth).slice(0, 8);
  const visibleAuthors =
    activeMonth === "all"
      ? monthlyAuthors.slice(0, 8)
      : monthlyAuthors.filter((item) => item.month === activeMonth).slice(0, 8);

  return (
    <div className="grid gap-6">
      <ChartFrame
        id="hebrew-activity"
        eyebrow="hebrew activity"
        title="Hebrew does not dominate the archive, but it concentrates in specific stress windows."
        caption="This lens is not here to inflate the Hebrew subset. It exists because small, high-signal language shifts can matter disproportionately when they cluster around hostility, identity challenges, or operational talk."
        exportData={chartData}
      >
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="h-[22rem]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="hebrewCommentsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff2cb8" stopOpacity={0.76} />
                    <stop offset="95%" stopColor="#ff2cb8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="hebrewPostsFill" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="hebrewPosts" stroke="#61f5ff" fill="url(#hebrewPostsFill)" />
                <Area type="monotone" dataKey="hebrewComments" stroke="#ff2cb8" fill="url(#hebrewCommentsFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-3">
            {visibleAuthors.map((author) => (
              <div key={`${author.month}-${author.author}`} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-display text-xl font-black tracking-[-0.04em]">{author.author}</div>
                  <div className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{author.month}</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {author.items.toLocaleString()} items · {author.hebrew_items.toLocaleString()} Hebrew-bearing items · {author.top_flair || "unknown flair"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ChartFrame>

      <ChartFrame
        id="hebrew-highlights"
        eyebrow="annotated highlights"
        title="High-signal Hebrew items rendered with gloss, tone, and why they matter."
        caption="These excerpts are intentionally annotated rather than machine-summarized into vague sentiment. The point is to preserve the specific language shift, the tone, and the reason the item was queued for review."
        exportData={visibleHighlights}
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {visibleHighlights.map((item) => (
            <article key={item.id} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-primaryLight">{item.author}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {item.month} · {item.language_mode}
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {item.title ? <h3 className="font-display text-xl font-black tracking-[-0.04em]">{item.title}</h3> : null}
                <p className="rounded-[1rem] border border-primaryLight/10 bg-primaryLight/5 p-4 font-mono text-sm leading-7 text-foreground/90">
                  {item.text}
                </p>
                <p className="text-sm leading-7 text-muted-foreground">
                  <span className="font-mono uppercase tracking-[0.22em] text-primaryLight">gloss</span>
                  <br />
                  {item.english_gloss}
                </p>
                <p className="text-sm leading-7 text-muted-foreground">
                  <span className="font-mono uppercase tracking-[0.22em] text-primaryLight">why it matters</span>
                  <br />
                  {item.investigation_note}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.signal_tags.map((tag) => (
                    <span
                      key={`${item.id}-${tag}`}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primaryLight/85"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </ChartFrame>
    </div>
  );
}
