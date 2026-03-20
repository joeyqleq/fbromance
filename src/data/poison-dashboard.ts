import rawSiteData from "../../phase2_outputs/site/poison_site_data.json";

type RawSiteData = typeof rawSiteData;

export type PoisonOverview = RawSiteData["overview"];
export type PoisonSpikeMonth = RawSiteData["spike_months"][number];
export type PoisonEventTimelineItem = RawSiteData["event_timeline"][number];
export type PoisonReviewQueueItem = RawSiteData["review_queue"][number];
export type PoisonDenseThread = RawSiteData["dense_threads"][number];
export type PoisonInteraction = RawSiteData["top_interactions"][number];
export type PoisonFlairBreakdown = RawSiteData["flair_breakdown"][number];
export type PoisonKeywordSeriesItem = RawSiteData["keyword_series"][number];
export type PoisonHebrewActivityItem = RawSiteData["hebrew_activity"][number];
export type PoisonTopAuthor = RawSiteData["top_authors"][number];
export type PoisonMonthlyTopAuthor = RawSiteData["monthly_top_authors"][number];
export type PoisonUserHistorySummary = RawSiteData["user_history_summary"][number];
export type PoisonHebrewHighlight = RawSiteData["hebrew_highlights"][number];
export type PoisonSourceInventoryItem = RawSiteData["source_inventory"][number];
export type PoisonSourceSummaryRow = RawSiteData["source_summaries"]["by_type"][number];
export type PoisonMajorEvent = RawSiteData["major_events"][number];
export type PoisonCeasefireEvent = RawSiteData["ceasefire_events"][number];
export type PoisonEventMonthRollup = RawSiteData["event_month_rollup"][number];
export type PoisonWatchlistItem = RawSiteData["watchlist"][number];
export type PoisonCrossReference = RawSiteData["cross_reference"];
export type PoisonEvidenceLedgerItem = RawSiteData["evidence_ledger"][number];

export const poisonOverview = rawSiteData.overview;
export const poisonSpikeMonths = rawSiteData.spike_months;
export const poisonEventTimeline = rawSiteData.event_timeline;
export const poisonReviewQueue = rawSiteData.review_queue;
export const poisonDenseThreads = rawSiteData.dense_threads;
export const poisonTopInteractions = rawSiteData.top_interactions;
export const poisonFlairBreakdown = rawSiteData.flair_breakdown;
export const poisonKeywordSeries = rawSiteData.keyword_series;
export const poisonHebrewActivity = rawSiteData.hebrew_activity;
export const poisonTopAuthors = rawSiteData.top_authors;
export const poisonMonthlyTopAuthors = rawSiteData.monthly_top_authors;
export const poisonUserHistorySummary = rawSiteData.user_history_summary;
export const poisonHebrewHighlights = rawSiteData.hebrew_highlights;
export const poisonSourceInventory = rawSiteData.source_inventory;
export const poisonSourceSummaries = rawSiteData.source_summaries;
export const poisonMajorEvents = rawSiteData.major_events;
export const poisonCeasefireEvents = rawSiteData.ceasefire_events;
export const poisonEventMonthRollup = rawSiteData.event_month_rollup;
export const poisonWatchlist = rawSiteData.watchlist;
export const poisonCrossReference = rawSiteData.cross_reference;
export const poisonRhetoricWatchwords = rawSiteData.rhetoric_watchwords;
export const poisonEvidenceLedger = rawSiteData.evidence_ledger;

export const poisonNavigationSections = [
  "overview",
  "timeline",
  "narratives",
  "users",
  "events",
  "hebrew",
  "sources",
  "rhetoric",
  "evidence",
] as const;

export type PoisonSection = (typeof poisonNavigationSections)[number];

export const poisonNarrativeCards = [
  {
    id: "anti-hezbollah",
    label: "Anti-Hezbollah Pressure",
    description:
      "Tracks how spikes and comments cluster around anti-Hezbollah framing, state-failure blame, and sectarian pressure.",
  },
  {
    id: "christian-militias",
    label: "Christian Militia Memory",
    description:
      "Surfaces posts that revive militia nostalgia, historical cooperation narratives, and identity-coded reassurance patterns.",
  },
  {
    id: "normalization",
    label: "Normalization Theater",
    description:
      "Examines peace-branding, affective softening, and the rhetorical gap between conciliatory tone and coercive event timing.",
  },
] as const;

export function getPoisonSection(section?: string): PoisonSection {
  if (!section) return "overview";
  return poisonNavigationSections.includes(section as PoisonSection)
    ? (section as PoisonSection)
    : "overview";
}
