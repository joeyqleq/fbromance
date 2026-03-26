import { getOverview, getSpikeMonths, getEventTimeline } from "@/lib/data";

export const poisonOverview = getOverview();
export const poisonSpikeMonths = getSpikeMonths();

export const poisonNavigationSections = [
  {
    title: 'Executive Summary',
    href: '/method/summary',
    items: [],
  },
  {
    title: 'Timeline Analysis',
    href: '/method/timeline',
    items: [],
  },
  {
    title: 'Contradiction Analysis',
    href: '/method/contradiction',
    items: [],
  },
];
