"use client";

import { usePathname, useRouter } from "next/navigation";

interface FilterBarProps {
  months: string[];
  flairs: string[];
  currentMonth: string;
  currentFlair: string;
}

export function FilterBar({ months, flairs, currentMonth, currentFlair }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams();
    if (currentMonth && currentMonth !== "all") params.set("month", currentMonth);
    if (currentFlair && currentFlair !== "all") params.set("flair", currentFlair);
    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="panel-chassis mb-6 flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-1">
        <div className="signal-label">cross-reference filters</div>
        <p className="text-sm leading-6 text-muted-foreground">
          Narrow the current section by spike month and flair without losing the route context.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Month
          <select
            className="rounded-full border border-white/10 bg-black/25 px-4 py-3 text-sm uppercase tracking-[0.18em] text-foreground outline-none"
            value={currentMonth}
            onChange={(event) => updateParam("month", event.target.value)}
          >
            <option value="all">All months</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Flair
          <select
            className="rounded-full border border-white/10 bg-black/25 px-4 py-3 text-sm uppercase tracking-[0.18em] text-foreground outline-none"
            value={currentFlair}
            onChange={(event) => updateParam("flair", event.target.value)}
          >
            <option value="all">All flairs</option>
            {flairs.map((flair) => (
              <option key={flair} value={flair}>
                {flair}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
