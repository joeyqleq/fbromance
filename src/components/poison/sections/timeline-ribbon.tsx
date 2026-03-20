"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { poisonSpikeMonths } from "@/data/poison-dashboard";

const chartData = poisonSpikeMonths.slice(0, 8).map((item, index) => ({
  month: item.month.slice(2),
  comments: item.comments,
  color:
    index === 0
      ? "#ff2cb8"
      : index === 1
        ? "#61f5ff"
        : index === 2
          ? "#b7ff5f"
          : "#285cff",
}));

export function TimelineRibbonSection() {
  return (
    <section id="timeline" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="panel-chassis panel-glow overflow-hidden p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-4">
            <div className="signal-label">timeline ribbon</div>
            <h2 className="font-display text-4xl font-black tracking-[-0.07em] text-foreground sm:text-5xl">
              Spikes don’t just happen. They cluster around event windows.
            </h2>
            <p className="data-caption">
              The homepage starts with the strongest monthly surges so the reader sees the signal before any deeper
              interpretation. This is not the full model. It is the first pressure map.
            </p>
            <div className="rounded-[1.4rem] border border-white/10 bg-black/30 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primaryLight/80">caption</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Comment activity peaks most sharply in late-2024 windows. The relationship does not prove coordination,
                but it defines the exact windows where correlation work and manual review become most valuable.
              </p>
            </div>
          </div>
          <div className="panel-chassis h-[22rem] p-4 sm:p-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "rgba(246,247,251,0.6)", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(10,13,20,0.92)",
                    color: "#f6f7fb",
                  }}
                />
                <Bar dataKey="comments" radius={[14, 14, 6, 6]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.month} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
