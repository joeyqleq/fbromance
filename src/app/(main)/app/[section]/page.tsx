import { Metadata } from "next";
import { WorkbenchScreen } from "@/components/poison/workbench/workbench-screen";
import { generateMetadata as buildMetadata } from "@/functions";

const SECTION_METADATA = {
  timeline: {
    title: "Event Timeline",
    description:
      "Cross-reference spike windows in r/ForbiddenBromance with regional events, ceasefire violations, and named triggers.",
  },
  narratives: {
    title: "Narrative Clusters",
    description:
      "Inspect recurring frames: anti-Hezbollah rhetoric, normalization, Christian militia nostalgia, Palestine avoidance, and hostility.",
  },
  users: {
    title: "User Signals",
    description:
      "Review high-signal accounts, outside-subreddit behavior, identity-performance cues, and contradiction flags.",
  },
  events: {
    title: "External Events",
    description:
      "Track the external event ledger, source provenance, and incident labels that feed the investigation timeline.",
  },
  hebrew: {
    title: "Hebrew Review",
    description:
      "Inspect Hebrew-bearing archive items with glosses, tone notes, timing, and cross-language investigation cues.",
  },
  sources: {
    title: "Source Provenance",
    description:
      "Review the multilingual source registry, watchlist entities, and cross-reference logic behind the external-event dataset.",
  },
  rhetoric: {
    title: "Rhetoric Artifacts",
    description:
      "Catalog psychological-warfare artifacts, annexation rhetoric, and same-window amplification patterns.",
  },
  evidence: {
    title: "Evidence Archive",
    description:
      "Browse thread excerpts, dense conversations, exported tables, and source-backed evidence used in the dossier.",
  },
} as const;

type SectionKey = keyof typeof SECTION_METADATA;

interface PageProps {
  params: Promise<{
    section: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: Pick<PageProps, "params">): Promise<Metadata> {
  const { section } = await params;
  const config = SECTION_METADATA[section as SectionKey] ?? {
    title: "Evidence Atlas",
    description:
      "Investigate timeline, users, narratives, rhetoric, and evidence views inside the poi5on.m3 analyst workbench.",
  };

  return buildMetadata({
    title: config.title,
    description: config.description,
    canonical: `https://poi5on.me/app/${section}`,
    keywords: [
      `poi5on.m3 ${section}`,
      `ForbiddenBromance ${section}`,
      "evidence atlas",
      "open source investigation",
    ],
  });
}

const SectionPage = async ({ params, searchParams }: PageProps) => {
  const { section } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  return <WorkbenchScreen section={section} searchParams={resolvedSearchParams} />;
};

export default SectionPage;
