import { poisonOverview } from "@/data/poison-dashboard";

const items = [
  "Archive cleaned from the raw Reddit export while preserving thread linkage, flair, and time structure.",
  "External-event registry built separately so subreddit spikes can be compared against real-world timing.",
  "Captions explain what each chart measures, why it matters, and what remains uncertain.",
  "The current release is evidence-first: it presents patterns, not final accusations.",
];

export function MethodologyStripSection() {
  return (
    <section id="methodology" className="mx-auto max-w-7xl px-4 py-8 pb-20 sm:px-6">
      <div className="panel-chassis panel-glow p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <div className="signal-label">methodology</div>
            <h2 className="font-display text-4xl font-black tracking-[-0.07em] text-foreground sm:text-5xl">
              Science-magazine annotations, not slogan graphics.
            </h2>
            <p className="data-caption">
              {poisonOverview.downloaded_user_histories} user histories, spike windows, dense threads, and external
              timelines are combined here as a public-facing research surface. The strong aesthetic is intentional, but
              it stays subordinate to evidence and sourceability.
            </p>
          </div>
          <div className="grid gap-4">
            {items.map((item, index) => (
              <div key={item} className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-primaryLight/70">
                  0{index + 1}
                </div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
