#!/usr/bin/env python3
from __future__ import annotations

import json
from collections.abc import Iterable
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
RAW_ROOT = ROOT / "raw" / "subreddits" / "ForbiddenBromance"
POSTS_MONOLITH = ROOT / "r_ForbiddenBromance_posts.json"
COMMENTS_MONOLITH = ROOT / "r_ForbiddenBromance_comments.json"

POSTS_OUT = ROOT / "r_ForbiddenBromance_posts.cleaned.ndjson"
COMMENTS_OUT = ROOT / "r_ForbiddenBromance_comments.cleaned.ndjson"
SUMMARY_OUT = ROOT / "cleaning_summary.json"
README_OUT = ROOT / "cleaned_archive_schema.md"

POST_FIELDS = [
    "id",
    "name",
    "author",
    "author_flair_text",
    "created_utc",
    "title",
    "selftext",
    "score",
    "num_comments",
    "permalink",
    "subreddit",
]

COMMENT_FIELDS = [
    "id",
    "author",
    "author_flair_text",
    "created_utc",
    "body",
    "score",
    "parent_id",
    "link_id",
]


def iter_jsonl(path: Path) -> Iterable[dict[str, Any]]:
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            yield json.loads(line)


def collect_rows(kind: str) -> list[dict[str, Any]]:
    rows_by_id: dict[str, dict[str, Any]] = {}

    monolith_path = POSTS_MONOLITH if kind == "posts" else COMMENTS_MONOLITH
    if monolith_path.exists():
        for row in iter_jsonl(monolith_path):
            row_id = row.get("id")
            if row_id:
                rows_by_id[str(row_id)] = row

    for path in sorted(RAW_ROOT.glob("*/" + f"{kind}.jsonl")):
        for row in iter_jsonl(path):
            row_id = row.get("id")
            if row_id:
                rows_by_id[str(row_id)] = row

    rows = list(rows_by_id.values())
    rows.sort(key=lambda row: (int(row.get("created_utc") or 0), row.get("id") or ""))
    return rows


def write_cleaned(rows: list[dict[str, Any]], fields: list[str], output_path: Path) -> dict[str, Any]:
    with output_path.open("w", encoding="utf-8") as handle:
        for row in rows:
            cleaned = {field: row.get(field) for field in fields}
            handle.write(json.dumps(cleaned, ensure_ascii=False, separators=(",", ":")))
            handle.write("\n")
    sample = [
        {field: row.get(field) for field in fields}
        for row in rows[:3]
    ]
    return {
        "output_path": str(output_path),
        "rows": len(rows),
        "size_bytes": output_path.stat().st_size,
        "size_mb": round(output_path.stat().st_size / 1024 / 1024, 2),
        "fields": fields,
        "samples": sample,
        "latest_created_utc": rows[-1].get("created_utc") if rows else None,
    }


def write_schema() -> None:
    content = """# Cleaned Reddit Archive Schema

These cleaned files are NDJSON (newline-delimited JSON). Each line is one JSON object.

## Files
- `r_ForbiddenBromance_posts.cleaned.ndjson`
- `r_ForbiddenBromance_comments.cleaned.ndjson`

## Posts fields
- `id`: Reddit post ID without prefix.
- `name`: Full Reddit thing ID for the post, usually `t3_<id>`.
- `author`: Username shown on the post at export time.
- `author_flair_text`: Visible user flair label captured in the archive, for example `Lebanese`, `Diaspora Lebanese`, `Israeli`, or `Diaspora Israeli` when present.
- `created_utc`: Unix timestamp in UTC.
- `title`: Post title.
- `selftext`: Post body text.
- `score`: Net score captured in the archive.
- `num_comments`: Comment count captured in the archive.
- `permalink`: Relative Reddit permalink.
- `subreddit`: Subreddit name.

## Comments fields
- `id`: Reddit comment ID without prefix.
- `author`: Username shown on the comment at export time.
- `author_flair_text`: Visible user flair label captured in the archive when present.
- `created_utc`: Unix timestamp in UTC.
- `body`: Comment text.
- `score`: Net score captured in the archive.
- `parent_id`: Immediate parent thing ID. `t3_*` means reply to a post, `t1_*` means reply to another comment.
- `link_id`: The root post thing ID, always pointing to the post the comment belongs to.

## Source of truth
- These cleaned files are rebuilt from the month-sharded raw pulls under `raw/subreddits/ForbiddenBromance/*`.
- They are the compact analysis inputs used by the phase 2 and phase 3 analyzers.
"""
    README_OUT.write_text(content, encoding="utf-8")


def main() -> None:
    posts_rows = collect_rows("posts")
    comments_rows = collect_rows("comments")

    posts_summary = write_cleaned(posts_rows, POST_FIELDS, POSTS_OUT)
    comments_summary = write_cleaned(comments_rows, COMMENT_FIELDS, COMMENTS_OUT)
    write_schema()

    summary = {
        "source": "r_ForbiddenBromance monolith + raw/subreddits/ForbiddenBromance month shards",
        "posts": posts_summary,
        "comments": comments_summary,
    }
    SUMMARY_OUT.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps(
        {
            "posts_rows": posts_summary["rows"],
            "comments_rows": comments_summary["rows"],
            "posts_latest_created_utc": posts_summary["latest_created_utc"],
            "comments_latest_created_utc": comments_summary["latest_created_utc"],
        },
        ensure_ascii=False,
    ))


if __name__ == "__main__":
    main()
