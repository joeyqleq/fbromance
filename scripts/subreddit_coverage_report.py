#!/usr/bin/env python3
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
RAW_ROOT = ROOT / "raw" / "subreddits"
JSON_OUTPUT = RAW_ROOT / "coverage_summary.json"
MARKDOWN_OUTPUT = RAW_ROOT / "coverage_summary.md"


def isoformat_utc(timestamp: int | None) -> str | None:
    if timestamp is None:
        return None
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).isoformat()


def inspect_jsonl(path: Path) -> dict[str, Any]:
    rows = 0
    first_created = None
    last_created = None
    bad_line = None

    with path.open(encoding="utf-8") as handle:
        for index, line in enumerate(handle, 1):
            if not line.strip():
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError as exc:
                bad_line = {"line": index, "error": str(exc)}
                break
            rows += 1
            created = obj.get("created_utc")
            if isinstance(created, int):
                if first_created is None:
                    first_created = created
                last_created = created

    return {
        "path": str(path),
        "rows": rows,
        "size_bytes": path.stat().st_size,
        "first_created_utc": first_created,
        "first_created_iso": isoformat_utc(first_created),
        "last_created_utc": last_created,
        "last_created_iso": isoformat_utc(last_created),
        "bad_line": bad_line,
        "status": "broken_tail" if bad_line else "clean",
    }


def collect_rows() -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for path in sorted(RAW_ROOT.glob("*/*/*.jsonl")):
        relative = path.relative_to(RAW_ROOT)
        subreddit = relative.parts[0]
        label = relative.parts[1]
        kind = path.stem
        row = inspect_jsonl(path)
        row.update(
            {
                "subreddit": subreddit,
                "label": label,
                "kind": kind,
            }
        )
        rows.append(row)
    return rows


def write_markdown(rows: list[dict[str, Any]]) -> None:
    lines = [
        "# Subreddit Coverage Summary",
        "",
        f"Generated: {datetime.now(tz=timezone.utc).isoformat()}",
        "",
        "| Subreddit | Label | Kind | Rows | Last UTC | Status | Path |",
        "| --- | --- | --- | ---: | --- | --- | --- |",
    ]
    for row in rows:
        lines.append(
            "| {subreddit} | {label} | {kind} | {rows} | {last} | {status} | `{path}` |".format(
                subreddit=row["subreddit"],
                label=row["label"],
                kind=row["kind"],
                rows=row["rows"],
                last=row["last_created_iso"] or "",
                status=row["status"],
                path=row["path"],
            )
        )
    MARKDOWN_OUTPUT.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    rows = collect_rows()
    JSON_OUTPUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    write_markdown(rows)
    print(f"Wrote {JSON_OUTPUT}")
    print(f"Wrote {MARKDOWN_OUTPUT}")


if __name__ == "__main__":
    main()
