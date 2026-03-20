"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartFrame } from "@/components/poison/workbench/chart-frame";
import type { PoisonInteraction } from "@/data/poison-dashboard";

interface NetworkPanelProps {
  data: PoisonInteraction[];
}

export function NetworkPanel({ data }: NetworkPanelProps) {
  const top = data.slice(0, 8).map((item) => ({
    pair: `${item.source_author} -> ${item.target_author}`,
    count: item.count,
  }));
  const maxCount = Math.max(...top.map((item) => item.count), 1);

  return (
    <ChartFrame
      id="interaction-network"
      eyebrow="interaction graph"
      title="Reply pairs that recur often enough to deserve closer reading."
      caption="This view ranks repeated reply dyads. It is useful for identifying dense conversational loops, but repetition alone is not proof of coordination."
      note="counts show reply frequency, not intent"
      exportData={top}
    >
      <div className="space-y-4">
        <div className="grid gap-3 lg:hidden">
          {top.map((item) => (
            <div key={item.pair} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                  <div className="truncate">{item.pair}</div>
                </div>
                <div className="shrink-0 font-display text-2xl font-black tracking-[-0.05em] text-primaryLight">
                  {item.count}
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#61f5ff,#ff2cb8)]"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block h-[22rem]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" hide />
              <YAxis dataKey="pair" type="category" width={170} tick={{ fill: "rgba(246,247,251,0.62)", fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,13,20,0.92)" }}
              />
              <Bar dataKey="count" fill="#61f5ff" radius={[0, 16, 16, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartFrame>
  );
}
