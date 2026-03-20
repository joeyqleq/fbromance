#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
import sys
import time
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path

ROOT = Path("/Users/joeyq/Desktop/bromance")
FETCH_SCRIPT = ROOT / "scripts" / "fetch_subreddit_windows.py"


@dataclass(frozen=True)
class Window:
    start: date
    end_exclusive: date
    label: str


def parse_iso_date(value: str) -> date:
    return datetime.strptime(value, "%Y-%m-%d").date()


def next_month_start(day: date) -> date:
    if day.month == 12:
        return date(day.year + 1, 1, 1)
    return date(day.year, day.month + 1, 1)


def build_windows(start: date, end_exclusive: date) -> list[Window]:
    if start >= end_exclusive:
        raise ValueError("start date must be earlier than end date")

    windows: list[Window] = []
    current = start
    while current < end_exclusive:
        boundary = min(next_month_start(current), end_exclusive)
        label = f"{current.year:04d}-{current.month:02d}"
        if current.day != 1:
            label = f"{label}_partial"
        windows.append(Window(start=current, end_exclusive=boundary, label=label))
        current = boundary
    return windows


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Fetch month-sharded subreddit windows via fetch_subreddit_windows.py.")
    parser.add_argument("--subreddit", required=True)
    parser.add_argument("--start-date", required=True, help="Inclusive YYYY-MM-DD")
    parser.add_argument("--end-date", required=True, help="Exclusive YYYY-MM-DD")
    parser.add_argument("--kind", choices=["posts", "comments", "both"], default="both")
    parser.add_argument("--limit", type=int, default=100)
    parser.add_argument("--retries", type=int, default=5)
    parser.add_argument("--retry-delay", type=float, default=2.0)
    parser.add_argument("--python-bin", default=sys.executable or "python3")
    return parser.parse_args()


def run_window(
    *,
    python_bin: str,
    subreddit: str,
    window: Window,
    kind: str,
    limit: int,
    retries: int,
    retry_delay: float,
) -> None:
    cmd = [
        python_bin,
        str(FETCH_SCRIPT),
        "--subreddit",
        subreddit,
        "--start-date",
        window.start.isoformat(),
        "--end-date",
        window.end_exclusive.isoformat(),
        "--label",
        window.label,
        "--kind",
        kind,
        "--limit",
        str(limit),
    ]

    for attempt in range(1, retries + 1):
        print(
            f"[run] subreddit={subreddit} label={window.label} kind={kind} attempt={attempt}/{retries}",
            flush=True,
        )
        result = subprocess.run(cmd, cwd=ROOT)
        if result.returncode == 0:
            return
        if attempt == retries:
            raise SystemExit(
                f"failed after {retries} attempts: subreddit={subreddit} label={window.label} kind={kind}"
            )
        time.sleep(retry_delay * attempt)


def main() -> None:
    args = parse_args()
    start = parse_iso_date(args.start_date)
    end_exclusive = parse_iso_date(args.end_date)
    kinds = ["posts", "comments"] if args.kind == "both" else [args.kind]

    windows = build_windows(start, end_exclusive)
    print(
        f"[plan] subreddit={args.subreddit} windows={len(windows)} kinds={','.join(kinds)} "
        f"start={args.start_date} end_exclusive={args.end_date}",
        flush=True,
    )

    for window in windows:
        print(
            f"[window] subreddit={args.subreddit} label={window.label} "
            f"start={window.start.isoformat()} end_exclusive={window.end_exclusive.isoformat()}",
            flush=True,
        )
        for kind in kinds:
            run_window(
                python_bin=args.python_bin,
                subreddit=args.subreddit,
                window=window,
                kind=kind,
                limit=args.limit,
                retries=args.retries,
                retry_delay=args.retry_delay,
            )

    print(f"[done] subreddit={args.subreddit}", flush=True)


if __name__ == "__main__":
    main()
