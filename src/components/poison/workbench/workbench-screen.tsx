"use client";

import { PoisonSidebar } from "@/components/poison/layout/poison-sidebar";
import { FilterBar } from "@/components/poison/workbench/filter-bar";
import { SectionHeader } from "@/components/poison/workbench/section-header";
import { OverviewPanel } from "@/components/poison/workbench/overview-panel";
import { TimelinePanel } from "@/components/poison/workbench/timeline-panel";
import { NarrativesPanel } from "@/components/poison/workbench/narratives-panel";
import { UsersPanel } from "@/components/poison/workbench/users-panel";
import { EventsPanel } from "@/components/poison/workbench/events-panel";
import { HebrewPanel } from "@/components/poison/workbench/hebrew-panel";
import { SourcesPanel } from "@/components/poison/workbench/sources-panel";
import { RhetoricPanel } from "@/components/poison/workbench/rhetoric-panel";
import { EvidencePanel } from "@/components/poison/workbench/evidence-panel";
import {
  getPoisonSection,
  poisonCeasefireEvents,
  poisonCrossReference,
  poisonDenseThreads,
  poisonEventTimeline,
  poisonEventMonthRollup,
  poisonFlairBreakdown,
  poisonHebrewActivity,
  poisonHebrewHighlights,
  poisonKeywordSeries,
  poisonMajorEvents,
  poisonMonthlyTopAuthors,
  poisonOverview,
  poisonReviewQueue,
  poisonRhetoricWatchwords,
  poisonSourceInventory,
  poisonSourceSummaries,
  poisonSpikeMonths,
  poisonTopInteractions,
  poisonUserHistorySummary,
  poisonWatchlist,
  type PoisonSection,
} from "@/data/poison-dashboard";
import { poisonTheme } from "@/components/poison/theme";

const sectionCopy: Record<PoisonSection, { eyebrow: string; title: string; description: string }> = {
  overview: {
    eyebrow: "overview",
    title: "The evidence atlas reduces the archive to the views most worth reading first.",
    description:
      "This route compresses counts, dense threads, flair context, and recurring reply pairs into one operational overview before deeper narrative or user-level inspection.",
  },
  timeline: {
    eyebrow: "timeline",
    title: "Monthly spikes become useful only when pinned against named event windows.",
    description:
      "The timeline lens keeps the archive honest by forcing every spike chart back into dated, sourced external events rather than vibes or slogans.",
  },
  narratives: {
    eyebrow: "narratives",
    title: "Narrative lenses show how persuasion and hostility can coexist in the same archive.",
    description:
      "This lens frames the main recurring themes that should guide close reading: anti-Hezbollah pressure, Christian militia memory, and normalization theater.",
  },
  users: {
    eyebrow: "users",
    title: "User review should start from contradictions, not just gut suspicion.",
    description:
      "The user lens prioritizes which accounts deserve manual reading based on activity, overlap, timing, and self-presented flair signals.",
  },
  events: {
    eyebrow: "events",
    title: "The outside world stays in scope as a structured registry, not a vague backdrop.",
    description:
      "This panel keeps the external timeline normalized so later passes can test whether event types and subject matter map onto subreddit behavior.",
  },
  hebrew: {
    eyebrow: "hebrew",
    title: "Hebrew review needs gloss, tone, and timing, not a raw text dump.",
    description:
      "This lens keeps the Hebrew subset legible by showing when it spikes, who drives it, and why specific excerpts were promoted into close review.",
  },
  sources: {
    eyebrow: "sources",
    title: "Source provenance must stay inspectable if the investigation is going to remain defensible.",
    description:
      "This route exposes which outlets, watchlist entities, and cross-reference heuristics the external-event registry actually rests on.",
  },
  rhetoric: {
    eyebrow: "rhetoric",
    title: "Rhetoric artifacts belong in their own lane so the case stays legible.",
    description:
      "Watchwords, thread titles, and event-linked phrases should be logged as rhetoric cues without collapsing them into premature conclusions.",
  },
  evidence: {
    eyebrow: "evidence",
    title: "The project needs a visible boundary between raw material and derived interpretation.",
    description:
      "This route makes the ledger explicit: what is cleaned archive, what is user intake, what is external-event context, and what is still pending.",
  },
};

interface WorkbenchScreenProps {
  section?: string;
  searchParams?: Record<string, string | string[] | undefined>;
}

export function WorkbenchScreen({ section, searchParams = {} }: WorkbenchScreenProps) {
  const selectedSection = getPoisonSection(section);
  const months = poisonSpikeMonths.map((item) => item.month);
  const flairs = Array.from(new Set(poisonFlairBreakdown.map((row) => row.flair))).slice(0, 12);
  const selectedMonth =
    typeof searchParams.month === "string" ? searchParams.month : months[0];
  const selectedFlair =
    typeof searchParams.flair === "string" ? searchParams.flair : "all";

  const filteredSpikes = poisonSpikeMonths.filter((row) => row.month === selectedMonth || selectedMonth === "all");
  const filteredEvents = poisonEventTimeline.filter((row) => row.window_month === selectedMonth || selectedMonth === "all");
  const filteredThreads = poisonDenseThreads.filter((row) => row.month === selectedMonth || selectedMonth === "all");
  const filteredFlairs = poisonFlairBreakdown.filter(
    (row) =>
      (row.month === selectedMonth || selectedMonth === "all") &&
      (selectedFlair === "all" || row.flair === selectedFlair),
  );
  const filteredUsers = poisonReviewQueue.filter(
    (row) => selectedFlair === "all" || row.fb_top_flair === selectedFlair,
  );
  const filteredHebrewHighlights = poisonHebrewHighlights.filter(
    (row) => row.month === selectedMonth || selectedMonth === "all",
  );
  const filteredMonthlyAuthors = poisonMonthlyTopAuthors.filter(
    (row) => row.month === selectedMonth || selectedMonth === "all",
  );
  const filteredMajorEvents = poisonMajorEvents.filter(
    (row) => row.month === selectedMonth || selectedMonth === "all",
  );
  const filteredCeasefireEvents = poisonCeasefireEvents.filter(
    (row) => row.month === selectedMonth || selectedMonth === "all",
  );

  const dataSpikes = filteredSpikes.length ? filteredSpikes : poisonSpikeMonths.slice(0, 8);
  const dataEvents = filteredEvents.length ? filteredEvents : poisonEventTimeline;
  const dataThreads = filteredThreads.length ? filteredThreads : poisonDenseThreads.slice(0, 8);
  const dataFlairs = filteredFlairs.length ? filteredFlairs : poisonFlairBreakdown.slice(0, 8);
  const dataUsers = filteredUsers.length ? filteredUsers : poisonReviewQueue;
  const dataHebrewHighlights = filteredHebrewHighlights.length ? filteredHebrewHighlights : poisonHebrewHighlights;
  const dataMonthlyAuthors = filteredMonthlyAuthors.length ? filteredMonthlyAuthors : poisonMonthlyTopAuthors.slice(0, 8);
  const dataMajorEvents = filteredMajorEvents.length ? filteredMajorEvents : poisonMajorEvents.slice(0, 12);
  const dataCeasefireEvents = filteredCeasefireEvents.length ? filteredCeasefireEvents : poisonCeasefireEvents.slice(0, 12);

  const content = (() => {
    switch (selectedSection) {
      case "timeline":
        return (
          <TimelinePanel
            spikes={poisonSpikeMonths}
            events={dataEvents}
            eventRollup={poisonEventMonthRollup}
            activeMonth={selectedMonth}
          />
        );
      case "narratives":
        return (
          <NarrativesPanel
            spikes={poisonSpikeMonths}
            flairRows={dataFlairs}
            keywords={poisonKeywordSeries}
            crossReference={poisonCrossReference}
          />
        );
      case "users":
        return <UsersPanel users={dataUsers} summaries={poisonUserHistorySummary} />;
      case "events":
        return (
          <EventsPanel
            events={dataEvents}
            majorEvents={dataMajorEvents}
            ceasefireEvents={dataCeasefireEvents}
            crossReference={poisonCrossReference}
          />
        );
      case "hebrew":
        return (
          <HebrewPanel
            activity={poisonHebrewActivity}
            highlights={dataHebrewHighlights}
            monthlyAuthors={dataMonthlyAuthors}
            activeMonth={selectedMonth}
          />
        );
      case "sources":
        return (
          <SourcesPanel
            sources={poisonSourceInventory}
            sourceTypeSummary={poisonSourceSummaries.by_type}
            sourceLanguageSummary={poisonSourceSummaries.by_language}
            watchlist={poisonWatchlist}
            crossReference={poisonCrossReference}
          />
        );
      case "rhetoric":
        return (
          <RhetoricPanel
            threads={dataThreads}
            events={dataEvents}
            watchwords={poisonRhetoricWatchwords}
            highlights={dataHebrewHighlights}
          />
        );
      case "evidence":
        return <EvidencePanel />;
      case "overview":
      default:
        return (
          <OverviewPanel
            overview={poisonOverview}
            spikes={dataSpikes}
            threads={dataThreads}
            flairRows={dataFlairs}
            interactions={poisonTopInteractions}
            eventRollup={poisonEventMonthRollup}
          />
        );
    }
  })();

  return (
    <div className="min-h-screen px-4 pb-12 pt-6 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-start">
        <PoisonSidebar />
        <div className="min-w-0 flex-1">
          <div className="panel-chassis mb-6 flex flex-col gap-4 px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="signal-label">workbench</div>
                <div className="mt-2 font-display text-3xl font-black tracking-[-0.07em]">
                  poi<span className="text-primary">5</span>on.m<span className="text-primaryLight">3</span>
                </div>
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
                {poisonTheme.sectionLabels[selectedSection]}
              </div>
            </div>
          </div>

          <SectionHeader {...sectionCopy[selectedSection]} />
          <FilterBar months={months} flairs={flairs} currentMonth={selectedMonth} currentFlair={selectedFlair} />
          {content}
        </div>
      </div>
    </div>
  );
}
