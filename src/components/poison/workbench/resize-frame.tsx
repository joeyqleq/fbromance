import type { ReactNode } from "react";
import { cn } from "@/functions";

interface ResizeFrameProps {
  children: ReactNode;
  className?: string;
}

export function ResizeFrame({ children, className }: ResizeFrameProps) {
  return (
    <div
      className={cn("overflow-auto rounded-[1.5rem] border border-white/10 bg-black/20", className)}
      style={{ resize: "vertical" }}
    >
      {children}
    </div>
  );
}
