import { cn } from "@/functions";
import type { ReactNode } from "react";
import { CircuitTrace } from "@/components/poison/layout/circuit-trace";

interface PoisonShellProps {
  children: ReactNode;
  className?: string;
}

export function PoisonShell({ children, className }: PoisonShellProps) {
  return (
    <div className={cn("poison-shell relative min-h-screen overflow-hidden", className)}>
      <CircuitTrace className="opacity-[0.22]" />
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-25" />
      <div className="pointer-events-none absolute inset-0 noise-mask" />
      <div className="pointer-events-none absolute -left-24 top-20 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(183,255,95,0.18),transparent_62%)] blur-3xl animate-spectral-drift" />
      <div className="pointer-events-none absolute right-[-8rem] top-[-2rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(97,245,255,0.18),transparent_58%)] blur-3xl animate-spectral-drift" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
