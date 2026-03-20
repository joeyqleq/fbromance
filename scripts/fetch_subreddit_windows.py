#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path("/Users/joeyq/Desktop/bromance")
OUT_ROOT = ROOT / "raw" / "subreddits"
MANIFEST_PATH = OUT_ROOT / "manifest.json"
API_BASE = "https://arctic-shift.photon-reddit.com"
USER_AGENT = "codex-subreddit-window-downloader/1.0"


def iso_to_ms(date_str: str) -> int:
    return int(datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc).timestamp() * 1000)


def http_json(url: str, retries: int = 5, backoff_seconds: float = 1.5) -> dict[str, Any]:
    last_error: Exception | None = None
    for attempt in range(1, retries + 1):
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        try:
            with urllib.request.urlopen(req, timeout=120) as response:
                return json.load(response)
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError) as exc:
            last_error = exc
            if attempt == retries:
                break
            time.sleep(backoff_seconds * attempt)
    raise RuntimeError(f"request failed after {retries} attempts: {url}") from last_error


def build_search_url(kind: str, subreddit: str, after_ms: int, before_ms: int, limit: int) -> str:
    params = {
        "subreddit": subreddit,
        "limit": str(limit),
        "sort": "asc",
        "after": str(after_ms),
        "before": str(before_ms),
        "meta-app": "subreddit-window-download",
    }
    return f"{API_BASE}/api/{kind}/search?{urllib.parse.urlencode(params)}"


def compute_next_after_ms(current_after_ms: int, last_created_utc: int, wrote_new_rows: bool) -> int:
    base_after_ms = last_created_utc * 1000
    if not wrote_new_rows or base_after_ms == current_after_ms:
        return base_after_ms + 1000
    return base_after_ms


def ensure_parent(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def read_manifest() -> list[dict[str, Any]]:
    if not MANIFEST_PATH.exists():
        return []
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def write_manifest(rows: list[dict[str, Any]]) -> None:
    ensure_parent(MANIFEST_PATH)
    MANIFEST_PATH.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")


def upsert_manifest(entry: dict[str, Any]) -> None:
    rows = read_manifest()
    filtered = [
        row
        for row in rows
        if not (
            row.get("subreddit") == entry["subreddit"]
            and row.get("kind") == entry["kind"]
            and row.get("label") == entry["label"]
        )
    ]
    filtered.append(entry)
    filtered.sort(key=lambda row: (row.get("subreddit", ""), row.get("label", ""), row.get("kind", "")))
    write_manifest(filtered)


def existing_last_created_utc(path: Path) -> int | None:
    if not path.exists():
        return None
    last_created = None
    last_good_end = 0
    with path.open("r+", encoding="utf-8") as handle:
        while True:
            line = handle.readline()
            if line == "":
                break
            line_end = handle.tell()
            if not line.strip():
                last_good_end = line_end
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                # Interrupted downloads can leave a partial JSON object at the end.
                # Truncate back to the last complete line and resume safely.
                handle.seek(last_good_end)
                handle.truncate()
                break
            created = obj.get("created_utc")
            if isinstance(created, int):
                last_created = created
            last_good_end = line_end
    return last_created


def stream_download(
    subreddit: str,
    kind: str,
    start_ms: int,
    before_ms: int,
    output_path: Path,
    limit: int = 100,
    sleep_seconds: float = 0.08,
) -> dict[str, Any]:
    ensure_parent(output_path)

    resume_after = existing_last_created_utc(output_path)
    current_ms = max(start_ms, (resume_after * 1000) + 1000 if resume_after else start_ms)

    rows_written = 0
    pages = 0
    min_created = None
    max_created = resume_after

    mode = "a" if output_path.exists() and output_path.stat().st_size > 0 else "w"
    with output_path.open(mode, encoding="utf-8") as handle:
        while True:
            url = build_search_url(kind, subreddit, current_ms, before_ms, limit)
            payload = http_json(url)
            data = payload.get("data") or []
            pages += 1
            if not data:
                break

            wrote_new_rows = False
            for item in data:
                created = item.get("created_utc")
                if not isinstance(created, int):
                    continue
                if resume_after and created <= resume_after:
                    continue
                handle.write(json.dumps(item, ensure_ascii=False))
                handle.write("\n")
                rows_written += 1
                wrote_new_rows = True
                min_created = created if min_created is None else min(min_created, created)
                max_created = created if max_created is None else max(max_created, created)

            last_created = data[-1].get("created_utc")
            if not isinstance(last_created, int):
                break
            current_ms = compute_next_after_ms(current_ms, last_created, wrote_new_rows)
            time.sleep(sleep_seconds)

    return {
        "rows_written_this_run": rows_written,
        "pages": pages,
        "min_created_utc": min_created,
        "max_created_utc": max_created,
        "output_path": str(output_path),
        "resumed_from_created_utc": resume_after,
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Download subreddit windows from Arctic Shift.")
    parser.add_argument("--subreddit", required=True)
    parser.add_argument("--start-date", required=True, help="Inclusive YYYY-MM-DD")
    parser.add_argument("--end-date", required=True, help="Exclusive YYYY-MM-DD")
    parser.add_argument("--label", required=True, help="Folder label under raw/subreddits/<subreddit>/")
    parser.add_argument("--kind", choices=["posts", "comments", "both"], default="both")
    parser.add_argument("--limit", type=int, default=100)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    kinds = ["posts", "comments"] if args.kind == "both" else [args.kind]
    start_ms = iso_to_ms(args.start_date)
    before_ms = iso_to_ms(args.end_date)
    target_dir = OUT_ROOT / args.subreddit / args.label

    for kind in kinds:
        output_path = target_dir / f"{kind}.jsonl"
        print(f"Downloading {args.subreddit} {kind} -> {output_path}", flush=True)
        result = stream_download(
            subreddit=args.subreddit,
            kind=kind,
            start_ms=start_ms,
            before_ms=before_ms,
            output_path=output_path,
            limit=args.limit,
        )
        result.update(
            {
                "subreddit": args.subreddit,
                "kind": kind,
                "start_date": args.start_date,
                "end_date_exclusive": args.end_date,
                "label": args.label,
            }
        )
        upsert_manifest(result)
        print(
            json.dumps(
                {
                    "subreddit": args.subreddit,
                    "kind": kind,
                    "rows_written_this_run": result["rows_written_this_run"],
                    "pages": result["pages"],
                    "max_created_utc": result["max_created_utc"],
                    "output_path": result["output_path"],
                },
                ensure_ascii=False,
            ),
            flush=True,
        )


if __name__ == "__main__":
    main()
