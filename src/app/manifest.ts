import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ziopsyop.tech",
    short_name: "ziopsyop.tech",
    description:
      "Public evidence dossier and analyst workbench for the ForbiddenBromance investigation.",
    start_url: "/",
    display: "standalone",
    background_color: "#050608",
    theme_color: "#050608",
    icons: [
      {
        src: "/images/brand/secondary_ascii_logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
