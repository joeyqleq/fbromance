import type { ReactNode } from "react";
import { ExportActions } from "@/components/poison/workbench/export-actions";

interface ChartFrameProps {
  id: string;
  title: string;
  eyebrow: string;
  caption: string;
  note?: string;
  children: ReactNode;
  exportData?: Array<Record<string, unknown>>;
}

export function ChartFrame({ id, title, eyebrow, caption, note, children, exportData }: ChartFrameProps) {
  return (
    <section className="panel-chassis panel-glow p-5 sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="signal-label">{eyebrow}</div>
            <h3 className="font-display text-2xl font-black tracking-[-0.06em] text-foreground sm:text-3xl">{title}</h3>
          </div>
          <ExportActions filename={id} data={exportData} targetId={id} />
        </div>
        <div id={id} className="signal-surface rounded-[1.4rem] border border-white/10 bg-black/25 p-3 sm:p-4">
          {children}
        </div>
        <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primaryLight/80">caption</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{caption}</p>
          {note ? <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted-foreground/70">{note}</p> : null}
        </div>
      </div>
    </section>
  );
}
