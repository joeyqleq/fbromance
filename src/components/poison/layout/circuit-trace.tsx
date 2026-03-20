import { cn } from "@/functions";

interface CircuitTraceProps {
  className?: string;
}

export function CircuitTrace({ className }: CircuitTraceProps) {
  return (
    <svg
      viewBox="0 0 1440 900"
      className={cn("circuit-trace pointer-events-none absolute inset-0 h-full w-full", className)}
      fill="none"
      aria-hidden="true"
    >
      <path d="M32 124H462C514 124 556 166 556 218V316C556 368 598 410 650 410H1004C1062 410 1108 364 1108 306V118C1108 88 1132 64 1162 64H1408" />
      <path d="M268 232H504C544 232 576 264 576 304V370C576 408 606 438 644 438H962C1014 438 1056 480 1056 532V716C1056 770 1100 814 1154 814H1408" />
      <path d="M82 512H296C358 512 408 562 408 624V702C408 754 450 796 502 796H760C822 796 872 746 872 684V514C872 452 922 402 984 402H1292" />
      <path d="M742 36V246C742 300 786 344 840 344H1080C1130 344 1170 304 1170 254V168" />
      <path d="M742 458V864" />
      <path d="M288 118V178" />
      <path d="M1184 262V334" />
      <path d="M1222 564V654" />
      <path d="M564 778V866" />

      <circle cx="32" cy="124" r="10" />
      <circle cx="1408" cy="64" r="10" />
      <circle cx="1408" cy="814" r="10" />
      <circle cx="82" cy="512" r="10" />
      <circle cx="742" cy="36" r="10" />
      <circle cx="742" cy="864" r="10" />
      <circle cx="288" cy="178" r="10" />
      <circle cx="1184" cy="334" r="10" />
      <circle cx="1222" cy="654" r="10" />
      <circle cx="564" cy="866" r="10" />
    </svg>
  );
}
