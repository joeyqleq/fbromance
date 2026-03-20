import Link from "next/link";
import { ArrowRightIcon, ShieldAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { poisonEventTimeline, poisonOverview, poisonSpikeMonths } from "@/data/poison-dashboard";
import { PoisonHeroWordmark } from "@/components/poison/layout/poison-hero-wordmark";

export function PoisonHeroSection() {
  const hottestMonth = poisonSpikeMonths[0];
  const latestEvent = poisonEventTimeline[poisonEventTimeline.length - 1];

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:pt-20">
      <div className="flex flex-col gap-7">
        <div className="signal-label">public evidence dossier</div>
        <div className="flex flex-col gap-5">
          <h1 className="max-w-4xl font-display text-[clamp(2.9rem,8vw,7.2rem)] font-black leading-[0.9] tracking-[-0.08em] text-foreground sm:text-[clamp(3.4rem,8vw,7.2rem)]">
            Border rhetoric, timeline spikes, and identity performance under one hostile lens.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
            <span className="spectral-text font-semibold">poi5on.m3</span> investigates{" "}
            <span className="text-foreground">r/ForbiddenBromance</span> across{" "}
            <span className="text-foreground">4,895 posts</span> and{" "}
            <span className="text-foreground">{poisonOverview.comments.toLocaleString()} comments</span>,
            mapping subreddit behavior against regional events, rhetorical clusters, and anomalous user patterns.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild className="w-full sm:w-auto rounded-full bg-primary text-primary-foreground hover:opacity-90">
            <Link href="/app">
              Open the workbench
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="tertiary" asChild className="w-full sm:w-auto rounded-full">
            <Link href="#methodology">Read the method</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="panel-chassis hover-lift p-4">
            <div className="signal-label">peak month</div>
            <div className="mt-3 font-display text-4xl font-black tracking-[-0.08em]">{hottestMonth.month}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              {hottestMonth.comments.toLocaleString()} comments, z-score {hottestMonth.comment_zscore.toFixed(2)}.
            </p>
          </div>
          <div className="panel-chassis hover-lift p-4">
            <div className="signal-label">hebrew subset</div>
            <div className="mt-3 font-display text-4xl font-black tracking-[-0.08em]">
              {(poisonOverview.hebrew_posts + poisonOverview.hebrew_comments).toLocaleString()}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Posts and comments preserved for tone-shift and cross-language review.
            </p>
          </div>
          <div className="panel-chassis hover-lift p-4">
            <div className="signal-label">latest linked event</div>
            <div className="mt-3 flex items-start gap-3">
              <ShieldAlertIcon className="mt-1 h-5 w-5 text-accent" />
              <div className="space-y-2">
                <div className="font-display text-2xl font-black tracking-[-0.05em]">{latestEvent.window_month}</div>
                <p className="text-sm text-muted-foreground">{latestEvent.label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PoisonHeroWordmark className="animate-float-slow" />
    </section>
  );
}
