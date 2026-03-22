#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"

REDDIT_SUBREDDITS = ("ForbiddenBromance", "Israel", "lebanon")


def default_start_date() -> str:
    today = datetime.now(tz=timezone.utc).date()
    return today.replace(day=1).isoformat()


def default_end_date() -> str:
    today = datetime.now(tz=timezone.utc).date()
    return (today + timedelta(days=1)).isoformat()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Refresh the local Reddit-backed dataset and rebuild all downstream analysis/site outputs. "
            "The external web/news CSV layer remains curated separately."
        )
    )
    parser.add_argument("--start-date", default=default_start_date(), help="Inclusive YYYY-MM-DD for Reddit refresh.")
    parser.add_argument(
        "--end-date",
        default=default_end_date(),
        help="Exclusive YYYY-MM-DD for Reddit refresh. Default is tomorrow UTC so today's data is included.",
    )
    parser.add_argument("--python-bin", default=sys.executable or "python3")
    parser.add_argument("--skip-reddit", action="store_true", help="Skip Reddit fetches and only rebuild downstream outputs.")
    return parser.parse_args()


def run(cmd: list[str]) -> None:
    print(f"[run] {' '.join(cmd)}", flush=True)
    subprocess.run(cmd, cwd=ROOT, check=True)


def refresh_reddit(*, python_bin: str, start_date: str, end_date: str) -> None:
    batch_script = SCRIPTS / "batch_fetch_subreddit_windows.py"
    for subreddit in REDDIT_SUBREDDITS:
        run(
            [
                python_bin,
                str(batch_script),
                "--subreddit",
                subreddit,
                "--start-date",
                start_date,
                "--end-date",
                end_date,
                "--kind",
                "both",
            ]
        )


def rebuild_outputs(*, python_bin: str) -> None:
    commands = [
        [python_bin, str(SCRIPTS / "rebuild_forbiddenbromance_cleaned_from_shards.py")],
        [python_bin, str(ROOT / "phase2_deep_analysis.py")],
        [python_bin, str(SCRIPTS / "subreddit_coverage_report.py")],
        [python_bin, str(ROOT / "phase3_contradiction_analysis.py")],
        [python_bin, str(SCRIPTS / "build_poison_site_data.py")],
    ]
    for cmd in commands:
        run(cmd)


def main() -> None:
    args = parse_args()
    print(
        f"[plan] start_date={args.start_date} end_date_exclusive={args.end_date} "
        f"skip_reddit={args.skip_reddit}",
        flush=True,
    )
    if not args.skip_reddit:
        refresh_reddit(
            python_bin=args.python_bin,
            start_date=args.start_date,
            end_date=args.end_date,
        )
    rebuild_outputs(python_bin=args.python_bin)
    print(
        "[done] local Reddit refresh complete. External web/news research files under "
        "external_research/raw still require a separate curated or LLM-assisted update path.",
        flush=True,
    )


if __name__ == "__main__":
    main()
