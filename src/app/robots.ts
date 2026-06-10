import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://zi0psy0p.tech/sitemap.xml",
    host: "https://zi0psy0p.tech",
  };
}
