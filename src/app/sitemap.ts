import type { MetadataRoute } from "next";
import { poisonNavigationSections } from "@/data/poison-dashboard";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://poi5on.me";
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/app`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...poisonNavigationSections
      .filter((section) => section !== "overview")
      .map((section) => ({
        url: `${base}/app/${section}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
  ];
}
