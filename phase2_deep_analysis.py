#!/usr/bin/env python3
import csv
import json
import math
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path("/Users/joeyq/Desktop/bromance")
POSTS = ROOT / "r_ForbiddenBromance_posts.cleaned.ndjson"
COMMENTS = ROOT / "r_ForbiddenBromance_comments.cleaned.ndjson"
USER_HISTORIES = ROOT / "raw" / "user_histories"
OUTDIR = ROOT / "phase2_outputs" / "deep"
OUTDIR.mkdir(parents=True, exist_ok=True)

HEBREW_RE = re.compile(r"[\u0590-\u05FF]")
ISRAEL_RELATED = {
    "ani_bm",
    "ani_bm2",
    "idf",
    "israel",
    "israelpalestine",
    "judaism",
    "jewish",
    "telaviv",
}
LEBANON_RELATED = {
    "arab",
    "arabs",
    "beirut",
    "lebanese",
    "lebanon",
    "lebanonmemes",
    "middleeast",
}
EVENT_TIMELINE = [
    {
        "window_month": "2020-08",
        "event_date": "2020-08-04",
        "label": "Beirut port explosion",
        "description": "Massive explosion in Beirut created a regional shock window that the subreddit then discussed alongside sympathy, aid, and normalization themes.",
        "source_title": "AP / Massive explosion tears through Lebanese capital Beirut",
        "source_url": "https://www.ap.org/news-highlights/best-of-the-week/2020/massive-explosion-tears-through-lebanese-capital-beirut/",
    },
    {
        "window_month": "2020-08",
        "event_date": "2020-08-06",
        "label": "Israeli aid offer after Beirut blast",
        "description": "Israel publicly offered aid after the Beirut blast, creating a politically charged opening for discussion about humanitarian help and normalization.",
        "source_title": "Washington Post / After days of tension, Israel offers aid for devastated Beirut",
        "source_url": "https://www.washingtonpost.com/world/middle_east/after-days-of-tension-israel-offers-aid-for-devastated-beirut/2020/08/06/585cddd2-d7b8-11ea-a788-2ce86ce81129_story.html",
    },
    {
        "window_month": "2021-05",
        "event_date": "2021-05-13",
        "label": "Rockets fired from southern Lebanon during Gaza war spillover",
        "description": "The 2021 Gaza war spilled toward the northern front, with rockets fired from southern Lebanon and the conflict entering Lebanon-Israel discourse directly.",
        "source_title": "AP mirror / Several rockets fired from south Lebanon toward Israel",
        "source_url": "https://www.wmdt.com/i/lebanese-security-officials-say-several-rockets-fired-from-south-lebanon-toward-israel/",
    },
    {
        "window_month": "2023-10",
        "event_date": "2023-10-08",
        "label": "Hezbollah opens northern front after Oct. 7",
        "description": "Hezbollah attacks on October 8, 2023 linked the subreddit directly to the regional war cycle and a harder anti-Hezbollah and atrocity-driven discourse.",
        "source_title": "AP / Hezbollah attacks on Oct. 8, 2023",
        "source_url": "https://apnews.com/article/cd7b26f890bf4cae32491721506ec0a1",
    },
    {
        "window_month": "2024-06",
        "event_date": "2024-06-11",
        "label": "Taleb Abdullah killed in Israeli strike",
        "description": "The killing of senior Hezbollah commander Taleb Abdullah triggered one of the strongest 2024 escalation windows on the Lebanon-Israel border.",
        "source_title": "AP / Killing of senior Hezbollah commander Taleb Abdullah",
        "source_url": "https://apnews.com/article/a404a607c3f96850d0dde1a5cc70c41b",
    },
    {
        "window_month": "2024-09",
        "event_date": "2024-09-17",
        "label": "Pager and walkie-talkie attack fallout",
        "description": "The exploding devices attack created a major escalation window and preceded the subreddit’s highest activity peak.",
        "source_title": "AP / Background on the exploding devices attack",
        "source_url": "https://apnews.com/article/b8506471525e3848023b1d6a863827e8",
    },
    {
        "window_month": "2024-09",
        "event_date": "2024-09-23",
        "label": "Deadliest day for Lebanon since 2006",
        "description": "September 23, 2024 was described by AP as the deadliest day for Lebanon since the 2006 war, aligning with the subreddit’s largest volume spike.",
        "source_title": "AP / Sept. 23, 2024 deadliest day for Lebanon since 2006",
        "source_url": "https://apnews.com/article/e3ca9c83642056f962fdf76319e3b8de",
    },
    {
        "window_month": "2024-09",
        "event_date": "2024-09-27",
        "label": "Nasrallah targeted in Beirut strike",
        "description": "Israel targeted Hassan Nasrallah in Beirut on September 27, 2024, intensifying both volume and tone inside the subreddit.",
        "source_title": "AP / Nasrallah targeted in Beirut strike on Sept. 27, 2024",
        "source_url": "https://apnews.com/article/617575d9c5d7c711bc02e7b81d2ba4ad",
    },
    {
        "window_month": "2024-09",
        "event_date": "2024-09-28",
        "label": "Hezbollah confirms Nasrallah killed",
        "description": "Hezbollah confirmed Nasrallah’s death on September 28, 2024, extending the same high-intensity narrative window into October.",
        "source_title": "AP / Hezbollah confirms Nasrallah killed on Sept. 28, 2024",
        "source_url": "https://apnews.com/article/c4751957433ff944c4eb06027885a973",
    },
    {
        "window_month": "2025-03",
        "event_date": "2025-03-11",
        "label": "US announces Lebanon-Israel border talks",
        "description": "The White House announced border and dispute talks, marking a diplomacy-heavy window distinct from the pure battlefield spikes.",
        "source_title": "Al Arabiya / US announces Lebanon-Israel talks to resolve border demarcation and other disputes",
        "source_url": "https://english.alarabiya.net/News/middle-east/2025/03/11/us-announces-lebanon-israel-talks-to-resolve-border-demarcation-other-disputes",
    },
    {
        "window_month": "2025-03",
        "event_date": "2025-03-28",
        "label": "First Beirut strike since ceasefire",
        "description": "Israel struck Beirut on March 28, 2025 in the first such strike since the ceasefire, blending diplomacy discourse with renewed escalation.",
        "source_title": "AP / First Beirut strike since ceasefire",
        "source_url": "https://apnews.com/article/1652bc0f69f2c635980432abc7671a41",
    },
    {
        "window_month": "2026-03",
        "event_date": "2026-03-05",
        "label": "Renewed Beirut strikes after Hezbollah resumed attacks",
        "description": "Renewed Beirut strikes in March 2026 intersect with a partial-month spike in the archive and a discourse mix focused on regional war and Lebanese state action.",
        "source_title": "AP / Beirut strikes after Hezbollah resumed attacks",
        "source_url": "https://apnews.com/article/55b660c3e8cc071078533d8d2a8f93a2",
    },
    {
        "window_month": "2026-03",
        "event_date": "2026-03-04",
        "label": "Lebanese army arrest campaign targeting non-state actors",
        "description": "The Lebanese army launched an arrest campaign targeting non-state actors including Hezbollah, adding an internal-state dimension to the same discussion period.",
        "source_title": "The National / Lebanese army conducts arrest campaign targeting non-state actors including Hezbollah",
        "source_url": "https://www.thenationalnews.com/news/mena/2026/03/04/lebanese-army-conducts-arrest-campaign-targeting-non-state-actors-including-hezbollah/",
    },
]


def month_from_utc(ts: int) -> str:
    return datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%Y-%m")


def detect_hebrew(text: str | None) -> bool:
    return bool(text and HEBREW_RE.search(text))


def safe_ratio(numerator: int | float, denominator: int | float) -> float:
    if not denominator:
        return 0.0
    return numerator / denominator


def resolve_target_author(
    parent_id: str | None,
    comments_by_name: dict[str, dict[str, Any]],
    posts_by_name: dict[str, dict[str, Any]],
) -> str | None:
    if not parent_id:
        return None
    if parent_id.startswith("t1_"):
        parent = comments_by_name.get(parent_id)
        return parent.get("author") if parent else None
    if parent_id.startswith("t3_"):
        parent = posts_by_name.get(parent_id)
        return parent.get("author") if parent else None
    return None


def compute_spike_scores(month_counts: dict[str, int]) -> list[dict[str, Any]]:
    if not month_counts:
        return []
    months = sorted(month_counts)
    values = [month_counts[m] for m in months]
    mean = sum(values) / len(values)
    variance = sum((v - mean) ** 2 for v in values) / len(values)
    stddev = math.sqrt(variance)
    rows = []
    for month in months:
        value = month_counts[month]
        zscore = (value - mean) / stddev if stddev else 0.0
        rows.append({
            "month": month,
            "count": value,
            "mean": round(mean, 2),
            "stddev": round(stddev, 2),
            "zscore": round(zscore, 3),
        })
    rows.sort(key=lambda row: (row["zscore"], row["count"]), reverse=True)
    return rows


def normalize_subreddit(name: str | None) -> str:
    return (name or "").strip()


def classify_related_subreddit(name: str | None) -> tuple[bool, bool]:
    lowered = normalize_subreddit(name).lower()
    if not lowered:
        return False, False
    is_israel_related = lowered in ISRAEL_RELATED or "israel" in lowered or lowered.startswith("jew")
    is_lebanon_related = lowered in LEBANON_RELATED or "leban" in lowered or "beirut" in lowered
    return is_israel_related, is_lebanon_related


def compute_manual_review_score(profile: dict[str, Any]) -> tuple[int, list[str]]:
    score = 0
    reasons: list[str] = []
    flair = (profile.get("fb_top_flair") or "").strip()
    fb_hebrew = int(profile.get("fb_hebrew_items") or 0)
    outside_israel_comments = int(profile.get("outside_israel_related_comments") or 0)
    outside_lebanon_comments = int(profile.get("outside_lebanon_related_comments") or 0)
    outside_hebrew = int(profile.get("outside_hebrew_items") or 0)
    outside_total = int(profile.get("outside_forbidden_bromance_comments") or 0)
    fb_total = int(profile.get("fb_comments") or 0) + int(profile.get("fb_posts") or 0)

    if "Lebanese" in flair:
        score += 15
        reasons.append("claimed Lebanese flair merits closer consistency review")
        if outside_israel_comments >= 200:
            score += 25
            reasons.append("heavy outside activity in Israel-related subreddits")
        if outside_israel_comments and safe_ratio(outside_israel_comments, max(outside_total, 1)) >= 0.5:
            score += 15
            reasons.append("Israel-related subreddits dominate outside activity")
        if outside_lebanon_comments <= 10:
            score += 10
            reasons.append("very little outside activity in Lebanon-related subreddits")
        if fb_hebrew >= 5 or outside_hebrew >= 25:
            score += 15
            reasons.append("Hebrew activity present alongside claimed Lebanese flair")
    elif "Diaspora Lebanese" in flair:
        score += 10
        reasons.append("claimed diaspora Lebanese flair merits closer consistency review")
        if outside_israel_comments >= 200:
            score += 20
            reasons.append("heavy outside activity in Israel-related subreddits")
        if fb_hebrew >= 5 or outside_hebrew >= 25:
            score += 10
            reasons.append("Hebrew activity present alongside claimed diaspora Lebanese flair")
    else:
        if fb_hebrew >= 15 and outside_hebrew >= 50:
            score += 10
            reasons.append("high Hebrew activity cluster")

    if fb_total >= 250:
        score += 10
        reasons.append("high-volume presence inside ForbiddenBromance")
    if outside_total >= 1000:
        score += 10
        reasons.append("large outside Reddit history available for comparison")

    return min(score, 100), reasons


def load_ndjson(path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if line:
                rows.append(json.loads(line))
    return rows


def load_subreddit_archive() -> dict[str, Any]:
    posts = load_ndjson(POSTS)
    comments = load_ndjson(COMMENTS)
    posts_by_name = {row["name"]: row for row in posts}
    comments_by_name = {f"t1_{row['id']}": row for row in comments}
    return {
        "posts": posts,
        "comments": comments,
        "posts_by_name": posts_by_name,
        "comments_by_name": comments_by_name,
    }


def build_subreddit_metrics(archive: dict[str, Any]) -> dict[str, Any]:
    posts = archive["posts"]
    comments = archive["comments"]
    posts_by_name = archive["posts_by_name"]
    comments_by_name = archive["comments_by_name"]

    monthly_posts = Counter()
    monthly_comments = Counter()
    monthly_hebrew_posts = Counter()
    monthly_hebrew_comments = Counter()
    monthly_flair_posts = defaultdict(Counter)
    monthly_flair_comments = defaultdict(Counter)
    author_monthly = defaultdict(Counter)
    author_flairs = defaultdict(Counter)
    author_hebrew = Counter()
    comment_counts_by_post = Counter()
    unique_commenters_by_post = defaultdict(set)
    reply_counts_by_post = Counter()
    pair_counts = Counter()
    pair_counts_by_month = defaultdict(Counter)
    top_targets = Counter()
    hebrew_items: list[dict[str, Any]] = []

    for row in posts:
        month = month_from_utc(row["created_utc"])
        flair = row.get("author_flair_text") or "Unflaired/Unknown"
        monthly_posts[month] += 1
        monthly_flair_posts[month][flair] += 1
        author_monthly[row["author"]][month] += 1
        author_flairs[row["author"]][flair] += 1
        text = "\n".join(filter(None, [row.get("title"), row.get("selftext")]))
        if detect_hebrew(text):
            monthly_hebrew_posts[month] += 1
            author_hebrew[row["author"]] += 1
            hebrew_items.append({
                "kind": "post",
                "id": row["id"],
                "month": month,
                "created_utc": row["created_utc"],
                "author": row["author"],
                "author_flair_text": flair,
                "score": row.get("score", 0),
                "link_id": row["name"],
                "parent_id": None,
                "title": row.get("title"),
                "text": row.get("selftext") or "",
            })

    for row in comments:
        month = month_from_utc(row["created_utc"])
        flair = row.get("author_flair_text") or "Unflaired/Unknown"
        monthly_comments[month] += 1
        monthly_flair_comments[month][flair] += 1
        author_monthly[row["author"]][month] += 1
        author_flairs[row["author"]][flair] += 1
        comment_counts_by_post[row["link_id"]] += 1
        unique_commenters_by_post[row["link_id"]].add(row["author"])
        if row.get("parent_id", "").startswith("t1_"):
            reply_counts_by_post[row["link_id"]] += 1
        target_author = resolve_target_author(row.get("parent_id"), comments_by_name, posts_by_name)
        if target_author and target_author != row["author"]:
            pair = (row["author"], target_author)
            pair_counts[pair] += 1
            pair_counts_by_month[month][pair] += 1
            top_targets[target_author] += 1
        text = row.get("body") or ""
        if detect_hebrew(text):
            monthly_hebrew_comments[month] += 1
            author_hebrew[row["author"]] += 1
            hebrew_items.append({
                "kind": "comment",
                "id": row["id"],
                "month": month,
                "created_utc": row["created_utc"],
                "author": row["author"],
                "author_flair_text": flair,
                "score": row.get("score", 0),
                "link_id": row.get("link_id"),
                "parent_id": row.get("parent_id"),
                "title": None,
                "text": text,
            })

    dense_threads = []
    for link_id, count in comment_counts_by_post.items():
        post = posts_by_name.get(link_id, {})
        unique_authors = len(unique_commenters_by_post[link_id])
        reply_count = reply_counts_by_post[link_id]
        dense_threads.append({
            "link_id": link_id,
            "post_id": post.get("id"),
            "month": month_from_utc(post["created_utc"]) if post else None,
            "title": post.get("title", ""),
            "post_author": post.get("author"),
            "post_flair": post.get("author_flair_text") or "Unflaired/Unknown",
            "comments": count,
            "unique_authors": unique_authors,
            "reply_comments": reply_count,
            "comments_per_author": round(safe_ratio(count, max(unique_authors, 1)), 3),
            "reply_ratio": round(safe_ratio(reply_count, count), 3),
        })
    dense_threads.sort(key=lambda row: (row["comments_per_author"], row["comments"]), reverse=True)

    top_author_rows = []
    all_months = sorted(set(monthly_posts) | set(monthly_comments))
    top_spike_months = [row["month"] for row in compute_spike_scores(monthly_comments)[:8]]
    authors = set(author_monthly) | set(author_flairs)
    for author in authors:
        flair = author_flairs[author].most_common(1)[0][0] if author_flairs[author] else "Unflaired/Unknown"
        total = sum(author_monthly[author].values())
        spike_total = sum(author_monthly[author][month] for month in top_spike_months)
        top_author_rows.append({
            "author": author,
            "top_flair": flair,
            "total_items": total,
            "spike_items": spike_total,
            "spike_share": round(safe_ratio(spike_total, total), 3),
            "hebrew_items": author_hebrew[author],
        })
    top_author_rows.sort(key=lambda row: (row["spike_items"], row["total_items"]), reverse=True)

    return {
        "monthly_posts": monthly_posts,
        "monthly_comments": monthly_comments,
        "monthly_hebrew_posts": monthly_hebrew_posts,
        "monthly_hebrew_comments": monthly_hebrew_comments,
        "monthly_flair_posts": monthly_flair_posts,
        "monthly_flair_comments": monthly_flair_comments,
        "top_author_rows": top_author_rows,
        "dense_threads": dense_threads,
        "pair_counts": pair_counts,
        "pair_counts_by_month": pair_counts_by_month,
        "top_targets": top_targets,
        "hebrew_items": hebrew_items,
        "author_monthly": author_monthly,
        "author_flairs": author_flairs,
        "author_hebrew": author_hebrew,
        "all_months": all_months,
        "top_spike_months": top_spike_months,
    }


def summarize_user_history(
    username: str,
    fb_author_lookup: dict[str, dict[str, Any]],
) -> dict[str, Any]:
    root = USER_HISTORIES / username
    posts_path = root / "posts.jsonl"
    comments_path = root / "comments.jsonl"
    post_count = 0
    comment_count = 0
    hebrew_items = 0
    subreddit_counter = Counter()
    first_seen = None
    last_seen = None
    outside_forbidden_bromance_posts = 0
    outside_forbidden_bromance_comments = 0
    outside_israel_related_comments = 0
    outside_lebanon_related_comments = 0
    outside_hebrew_items = 0

    def ingest_row(row: dict[str, Any], kind: str) -> None:
        nonlocal post_count, comment_count, hebrew_items, first_seen, last_seen
        nonlocal outside_forbidden_bromance_posts, outside_forbidden_bromance_comments
        nonlocal outside_israel_related_comments, outside_lebanon_related_comments, outside_hebrew_items

        subreddit = normalize_subreddit(row.get("subreddit"))
        ts = int(row.get("created_utc") or 0)
        if ts:
            first_seen = min(first_seen, ts) if first_seen is not None else ts
            last_seen = max(last_seen, ts) if last_seen is not None else ts
        if subreddit:
            subreddit_counter[subreddit] += 1
        text = row.get("body") if kind == "comment" else "\n".join(filter(None, [row.get("title"), row.get("selftext")]))
        if detect_hebrew(text):
            hebrew_items += 1
            if subreddit != "ForbiddenBromance":
                outside_hebrew_items += 1
        if kind == "post":
            post_count += 1
            if subreddit != "ForbiddenBromance":
                outside_forbidden_bromance_posts += 1
        else:
            comment_count += 1
            if subreddit != "ForbiddenBromance":
                outside_forbidden_bromance_comments += 1
                is_israel_related, is_lebanon_related = classify_related_subreddit(subreddit)
                if is_israel_related:
                    outside_israel_related_comments += 1
                if is_lebanon_related:
                    outside_lebanon_related_comments += 1

    for path, kind in ((posts_path, "post"), (comments_path, "comment")):
        if not path.exists():
            continue
        with path.open("r", encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                ingest_row(json.loads(line), kind)

    fb_profile = fb_author_lookup.get(username, {})
    summary = {
        "author": username,
        "all_posts": post_count,
        "all_comments": comment_count,
        "all_total": post_count + comment_count,
        "active_subreddits": len(subreddit_counter),
        "top_subreddits": "; ".join(f"{name}:{count}" for name, count in subreddit_counter.most_common(8)),
        "first_seen_utc": first_seen,
        "last_seen_utc": last_seen,
        "fb_posts": int(fb_profile.get("posts", 0) or 0),
        "fb_comments": int(fb_profile.get("comments", 0) or 0),
        "fb_total": int(fb_profile.get("total", 0) or 0),
        "fb_top_flair": fb_profile.get("top_flair") or "Unflaired/Unknown",
        "fb_hebrew_items": int(fb_profile.get("hebrew_items", 0) or 0),
        "outside_forbidden_bromance_posts": outside_forbidden_bromance_posts,
        "outside_forbidden_bromance_comments": outside_forbidden_bromance_comments,
        "outside_israel_related_comments": outside_israel_related_comments,
        "outside_lebanon_related_comments": outside_lebanon_related_comments,
        "outside_hebrew_items": outside_hebrew_items,
    }
    summary["fb_focus_ratio"] = round(safe_ratio(summary["fb_total"], max(summary["all_total"], 1)), 4)
    summary["manual_review_score"], reasons = compute_manual_review_score(summary)
    summary["manual_review_reasons"] = "; ".join(reasons)
    return summary


def write_csv(path: Path, rows: list[dict[str, Any]], fieldnames: list[str]) -> None:
    with path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def write_outputs(metrics: dict[str, Any], user_summaries: list[dict[str, Any]]) -> dict[str, Any]:
    monthly_spikes = []
    post_spikes = {row["month"]: row for row in compute_spike_scores(dict(metrics["monthly_posts"]))}
    comment_spikes = {row["month"]: row for row in compute_spike_scores(dict(metrics["monthly_comments"]))}
    all_months = metrics["all_months"]
    for month in all_months:
        monthly_spikes.append({
            "month": month,
            "posts": metrics["monthly_posts"][month],
            "comments": metrics["monthly_comments"][month],
            "total": metrics["monthly_posts"][month] + metrics["monthly_comments"][month],
            "hebrew_posts": metrics["monthly_hebrew_posts"][month],
            "hebrew_comments": metrics["monthly_hebrew_comments"][month],
            "post_zscore": post_spikes.get(month, {}).get("zscore", 0.0),
            "comment_zscore": comment_spikes.get(month, {}).get("zscore", 0.0),
        })
    write_csv(
        OUTDIR / "monthly_spikes.csv",
        sorted(monthly_spikes, key=lambda row: row["month"]),
        ["month", "posts", "comments", "total", "hebrew_posts", "hebrew_comments", "post_zscore", "comment_zscore"],
    )

    monthly_flair_rows = []
    flairs = sorted(
        set().union(*metrics["monthly_flair_posts"].values(), *metrics["monthly_flair_comments"].values())
    )
    for month in all_months:
        for flair in flairs:
            posts = metrics["monthly_flair_posts"][month][flair]
            comments = metrics["monthly_flair_comments"][month][flair]
            if posts or comments:
                monthly_flair_rows.append({
                    "month": month,
                    "flair": flair,
                    "posts": posts,
                    "comments": comments,
                    "total": posts + comments,
                })
    write_csv(
        OUTDIR / "monthly_flair_breakdown.csv",
        monthly_flair_rows,
        ["month", "flair", "posts", "comments", "total"],
    )

    top_author_rows = []
    top_author_lookup = {}
    for row in metrics["top_author_rows"][:200]:
        top_author_rows.append(row)
        top_author_lookup[row["author"]] = row
    write_csv(
        OUTDIR / "window_top_authors.csv",
        top_author_rows,
        ["author", "top_flair", "total_items", "spike_items", "spike_share", "hebrew_items"],
    )

    monthly_top_authors = []
    for month in all_months:
        ranked = sorted(
            (
                {
                    "month": month,
                    "author": author,
                    "items": counter[month],
                    "top_flair": metrics["author_flairs"][author].most_common(1)[0][0] if metrics["author_flairs"][author] else "Unflaired/Unknown",
                    "hebrew_items": metrics["author_hebrew"][author],
                }
                for author, counter in metrics["author_monthly"].items()
                if counter[month]
            ),
            key=lambda row: (row["items"], row["hebrew_items"]),
            reverse=True,
        )[:20]
        monthly_top_authors.extend(ranked)
    write_csv(
        OUTDIR / "monthly_top_authors.csv",
        monthly_top_authors,
        ["month", "author", "items", "top_flair", "hebrew_items"],
    )

    interaction_rows = []
    for month, counter in metrics["pair_counts_by_month"].items():
        for (source, target), count in counter.most_common(300):
            interaction_rows.append({
                "month": month,
                "source_author": source,
                "target_author": target,
                "count": count,
                "source_top_flair": metrics["author_flairs"][source].most_common(1)[0][0] if metrics["author_flairs"][source] else "Unflaired/Unknown",
                "target_top_flair": metrics["author_flairs"][target].most_common(1)[0][0] if metrics["author_flairs"][target] else "Unflaired/Unknown",
            })
    write_csv(
        OUTDIR / "interaction_edges.csv",
        interaction_rows,
        ["month", "source_author", "target_author", "count", "source_top_flair", "target_top_flair"],
    )

    with (OUTDIR / "hebrew_subset.ndjson").open("w", encoding="utf-8") as fh:
        for row in sorted(metrics["hebrew_items"], key=lambda item: item["created_utc"]):
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")
    hebrew_priority_rows = sorted(
        metrics["hebrew_items"],
        key=lambda row: (
            1 if row["month"] in metrics["top_spike_months"] else 0,
            row.get("score", 0),
            row["created_utc"],
        ),
        reverse=True,
    )[:250]
    write_csv(
        OUTDIR / "hebrew_priority_review.csv",
        hebrew_priority_rows,
        ["kind", "id", "month", "created_utc", "author", "author_flair_text", "score", "link_id", "parent_id", "title", "text"],
    )

    write_csv(
        OUTDIR / "dense_threads.csv",
        metrics["dense_threads"][:250],
        ["link_id", "post_id", "month", "title", "post_author", "post_flair", "comments", "unique_authors", "reply_comments", "comments_per_author", "reply_ratio"],
    )

    user_summaries.sort(key=lambda row: (row["manual_review_score"], row["fb_total"], row["all_total"]), reverse=True)
    write_csv(
        OUTDIR / "user_history_summary.csv",
        user_summaries,
        [
            "author",
            "all_posts",
            "all_comments",
            "all_total",
            "active_subreddits",
            "top_subreddits",
            "first_seen_utc",
            "last_seen_utc",
            "fb_posts",
            "fb_comments",
            "fb_total",
            "fb_top_flair",
            "fb_hebrew_items",
            "outside_forbidden_bromance_posts",
            "outside_forbidden_bromance_comments",
            "outside_israel_related_comments",
            "outside_lebanon_related_comments",
            "outside_hebrew_items",
            "fb_focus_ratio",
            "manual_review_score",
            "manual_review_reasons",
        ],
    )

    identity_review_queue = user_summaries[:20]
    write_csv(
        OUTDIR / "identity_review_queue.csv",
        identity_review_queue,
        [
            "author",
            "fb_top_flair",
            "fb_total",
            "fb_hebrew_items",
            "outside_israel_related_comments",
            "outside_lebanon_related_comments",
            "outside_hebrew_items",
            "manual_review_score",
            "manual_review_reasons",
            "top_subreddits",
        ],
    )

    write_csv(
        OUTDIR / "event_timeline.csv",
        EVENT_TIMELINE,
        ["window_month", "event_date", "label", "description", "source_title", "source_url"],
    )
    (OUTDIR / "event_timeline.json").write_text(
        json.dumps(EVENT_TIMELINE, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    dashboard_data = {
        "overview": {
            "posts": sum(metrics["monthly_posts"].values()),
            "comments": sum(metrics["monthly_comments"].values()),
            "hebrew_posts": sum(metrics["monthly_hebrew_posts"].values()),
            "hebrew_comments": sum(metrics["monthly_hebrew_comments"].values()),
            "downloaded_user_histories": len(user_summaries),
        },
        "spike_months": sorted(monthly_spikes, key=lambda row: row["comment_zscore"], reverse=True)[:12],
        "event_timeline": EVENT_TIMELINE,
        "review_queue": identity_review_queue[:12],
        "dense_threads": metrics["dense_threads"][:20],
        "top_interactions": sorted(
            (
                {"source_author": source, "target_author": target, "count": count}
                for (source, target), count in metrics["pair_counts"].most_common(30)
            ),
            key=lambda row: row["count"],
            reverse=True,
        ),
        "flair_breakdown": monthly_flair_rows,
    }
    (OUTDIR / "dashboard_data.json").write_text(
        json.dumps(dashboard_data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return dashboard_data


def write_report(metrics: dict[str, Any], user_summaries: list[dict[str, Any]], dashboard_data: dict[str, Any]) -> None:
    top_spikes = dashboard_data["spike_months"][:6]
    top_reviews = user_summaries[:10]
    top_dense = metrics["dense_threads"][:10]
    top_pairs = metrics["pair_counts"].most_common(10)
    report = [
        "# Phase 2 Deep Analysis Report",
        "",
        "## Scope",
        "This report extends the first-pass archive summary with deeper local evidence: spike scoring, flair segmentation, Hebrew subset extraction, reply-network patterns, dense-thread detection, and a user-history review queue based on downloaded Arctic Shift histories.",
        "",
        "## Guardrails",
        "- `author_flair_text` is a self-presented label, not verified identity.",
        "- Cross-subreddit history can justify closer review, but it does not prove deception, coordination, or state affiliation.",
        "- Hebrew usage is treated as one signal among many, not a standalone smoking gun.",
        "",
        "## Strongest local signals",
    ]
    for row in top_spikes:
        report.append(
            f"- {row['month']}: {row['comments']} comments, {row['posts']} posts, comment z-score {row['comment_zscore']}"
        )
    report.extend([
        "",
        "## Hebrew subset",
        f"- Hebrew-bearing items in the subreddit archive: {dashboard_data['overview']['hebrew_posts']} posts and {dashboard_data['overview']['hebrew_comments']} comments",
        f"- The extracted subset is saved at `{OUTDIR / 'hebrew_subset.ndjson'}` for closer manual reading and translation work.",
        "",
        "## Dense conversation threads",
    ])
    for row in top_dense[:6]:
        report.append(
            f"- {row['month']} | {row['title'][:120]} | {row['comments']} comments from {row['unique_authors']} authors | comments/author {row['comments_per_author']}"
        )
    report.extend([
        "",
        "## Recurrent reply pairs",
    ])
    for (source, target), count in top_pairs:
        report.append(f"- {source} → {target}: {count} replies")
    report.extend([
        "",
        "## User-history review queue",
        "These are manual-review priorities, not identity verdicts.",
    ])
    for row in top_reviews[:8]:
        report.append(
            f"- {row['author']} | flair `{row['fb_top_flair']}` | FB total {row['fb_total']} | review score {row['manual_review_score']} | {row['manual_review_reasons'] or 'no extra flags'}"
        )
    report.extend([
        "",
        "## Output files",
        f"- `{OUTDIR / 'monthly_spikes.csv'}`",
        f"- `{OUTDIR / 'monthly_flair_breakdown.csv'}`",
        f"- `{OUTDIR / 'window_top_authors.csv'}`",
        f"- `{OUTDIR / 'monthly_top_authors.csv'}`",
        f"- `{OUTDIR / 'interaction_edges.csv'}`",
        f"- `{OUTDIR / 'dense_threads.csv'}`",
        f"- `{OUTDIR / 'hebrew_subset.ndjson'}`",
        f"- `{OUTDIR / 'hebrew_priority_review.csv'}`",
        f"- `{OUTDIR / 'user_history_summary.csv'}`",
        f"- `{OUTDIR / 'identity_review_queue.csv'}`",
        f"- `{OUTDIR / 'event_timeline.csv'}`",
        f"- `{OUTDIR / 'event_timeline.json'}`",
        f"- `{OUTDIR / 'dashboard_data.json'}`",
    ])
    (ROOT / "phase2_deep_report.md").write_text("\n".join(report) + "\n", encoding="utf-8")


def main() -> None:
    archive = load_subreddit_archive()
    metrics = build_subreddit_metrics(archive)

    fb_author_lookup = {}
    top_authors_csv = ROOT / "phase2_outputs" / "top_authors.csv"
    with top_authors_csv.open("r", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            fb_author_lookup[row["author"]] = row

    user_summaries = []
    for root in sorted(USER_HISTORIES.iterdir()):
        if root.is_dir():
            user_summaries.append(summarize_user_history(root.name, fb_author_lookup))

    dashboard_data = write_outputs(metrics, user_summaries)
    write_report(metrics, user_summaries, dashboard_data)
    print(json.dumps({
        "report": str(ROOT / "phase2_deep_report.md"),
        "outdir": str(OUTDIR),
        "spike_months": dashboard_data["spike_months"][:5],
        "review_queue": dashboard_data["review_queue"][:5],
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
