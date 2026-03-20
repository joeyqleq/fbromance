import { cn } from "@/functions";
import { CircuitTrace } from "@/components/poison/layout/circuit-trace";

interface PoisonHeroWordmarkProps {
  className?: string;
}

export function PoisonHeroWordmark({ className }: PoisonHeroWordmarkProps) {
  return (
    <div
      className={cn(
        "panel-chassis panel-glow relative overflow-hidden rounded-[2rem] px-6 py-6 sm:px-8 sm:py-8",
        className,
      )}
    >
      <CircuitTrace className="opacity-[0.18]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(97,245,255,0.12),transparent_28%,rgba(255,44,184,0.12)_60%,transparent_78%,rgba(183,255,95,0.12))]" />
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-r from-accent/10 via-transparent to-primaryLight/10" />
      <div className="signal-surface relative flex flex-col gap-4 rounded-[1.6rem] border border-white/10 bg-black/10 px-4 py-4 sm:px-5">
        <div className="signal-label">forensic signal engine</div>
        <div className="flex flex-wrap items-end gap-x-3 gap-y-2 font-display text-[clamp(3rem,10vw,8rem)] font-black tracking-[-0.08em] leading-none">
          <span className="text-foreground eyeburn-text">poi</span>
          <span className="text-primary eyeburn-text">5</span>
          <span className="text-foreground eyeburn-text">on.m</span>
          <span className="text-primaryLight eyeburn-text">3</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.34em] text-muted-foreground">
          <span className="rounded-full border border-white/10 px-3 py-1">archive</span>
          <span className="rounded-full border border-white/10 px-3 py-1">timeline</span>
          <span className="rounded-full border border-white/10 px-3 py-1">rhetoric</span>
          <span className="rounded-full border border-white/10 px-3 py-1">identity</span>
        </div>
      </div>
    </div>
  );
}
