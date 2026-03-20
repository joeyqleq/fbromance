import { Metadata } from "next";
import { WorkbenchScreen } from "@/components/poison/workbench/workbench-screen";
import { generateMetadata as buildMetadata } from "@/functions";

interface PageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata: Metadata = buildMetadata({
  title: "Workbench Overview",
  description:
    "Analyst workbench for poi5on.m3: spike windows, flair shifts, dense threads, interaction patterns, and cross-referenced evidence around r/ForbiddenBromance.",
  canonical: "https://poi5on.me/app",
  keywords: [
    "poi5on.m3 workbench",
    "ForbiddenBromance dashboard",
    "Reddit evidence atlas",
    "interaction graph",
    "timeline analysis",
  ],
});

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  return <WorkbenchScreen section="overview" searchParams={resolvedSearchParams} />;
};

export default Page;
