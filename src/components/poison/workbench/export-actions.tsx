"use client";

import { DownloadIcon, ImageIcon, MailIcon, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportActionsProps {
  data?: Array<Record<string, unknown>>;
  filename: string;
  targetId?: string;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function toCsv(data: Array<Record<string, unknown>>) {
  if (!data.length) return "";
  const headers = Array.from(new Set(data.flatMap((row) => Object.keys(row))));
  const rows = data.map((row) =>
    headers
      .map((header) => JSON.stringify(row[header] ?? ""))
      .join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}

export function ExportActions({ data = [], filename, targetId }: ExportActionsProps) {
  const handleCsv = () => {
    const csv = toCsv(data);
    if (!csv) return;
    downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), `${filename}.csv`);
  };

  const handleImage = async () => {
    if (!targetId) return;
    const container = document.getElementById(targetId);
    const svg = container?.querySelector("svg");
    if (!svg) return;

    const serialized = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width || 1600;
      canvas.height = img.height || 900;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#050608";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        downloadBlob(blob, `${filename}.png`);
      });
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const handleShare = async () => {
    const href = typeof window !== "undefined" ? window.location.href : "";
    const shareUrl = targetId ? `${href.split("#")[0]}#${targetId}` : href;
    const title = `poi5on.m3 · ${filename}`;
    const text = `Investigative panel: ${filename.replaceAll("-", " ")}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        // fall through to email
      }
    }

    window.open(
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="tertiary" size="sm" className="rounded-full" onClick={handleShare}>
        <Share2Icon className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Button type="button" variant="tertiary" size="sm" className="rounded-full" onClick={handleCsv}>
        <DownloadIcon className="mr-2 h-4 w-4" />
        CSV
      </Button>
      <Button type="button" variant="tertiary" size="sm" className="rounded-full" onClick={handleImage}>
        <ImageIcon className="mr-2 h-4 w-4" />
        Image
      </Button>
      <Button
        type="button"
        variant="tertiary"
        size="sm"
        className="rounded-full"
        onClick={() =>
          window.open(
            `mailto:?subject=${encodeURIComponent(`poi5on.m3 · ${filename}`)}&body=${encodeURIComponent(
              `${typeof window !== "undefined" ? window.location.href : ""}${targetId ? `#${targetId}` : ""}`,
            )}`,
            "_blank",
            "noopener,noreferrer",
          )
        }
      >
        <MailIcon className="mr-2 h-4 w-4" />
        Email
      </Button>
    </div>
  );
}
