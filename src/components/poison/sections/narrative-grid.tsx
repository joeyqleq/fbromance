import { poisonNarrativeCards } from "@/data/poison-dashboard";

const accentColors = ["text-primary", "text-primaryLight", "text-accent"];

export function NarrativeGridSection() {
  return (
    <section id="narratives" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-3">
        <div className="signal-label">narrative modules</div>
        <h2 className="font-display text-4xl font-black tracking-[-0.07em] text-foreground sm:text-5xl">
          The public surface should show the themes before it shows the suspects.
        </h2>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
          These narrative modules act like magazine spreads: one strong idea, one chart-adjacent explanation, and a
          path into the deeper workbench for verification.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {poisonNarrativeCards.map((card, index) => (
          <article key={card.id} className="panel-chassis panel-glow hover-lift relative overflow-hidden p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="signal-label">{card.label}</div>
            <div className={`mt-5 font-display text-3xl font-black tracking-[-0.06em] ${accentColors[index]}`}>
              0{index + 1}
            </div>
            <p className="mt-4 text-lg leading-8 text-foreground">{card.description}</p>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Explainer captions on the final site will show what each cluster measures, why it matters, and what the
              current evidence still cannot prove.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
