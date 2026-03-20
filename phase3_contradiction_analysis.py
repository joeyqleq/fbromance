#!/usr/bin/env python3
from __future__ import annotations

import csv
import json
import math
import re
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

ROOT = Path("/Users/joeyq/Desktop/bromance")
POSTS = ROOT / "r_ForbiddenBromance_posts.cleaned.ndjson"
COMMENTS = ROOT / "r_ForbiddenBromance_comments.cleaned.ndjson"
USER_HISTORIES = ROOT / "raw" / "user_histories"
PHASE2_USER_SUMMARY = ROOT / "phase2_outputs" / "deep" / "user_history_summary.csv"
PHASE2_REVIEW_QUEUE = ROOT / "phase2_outputs" / "deep" / "identity_review_queue.csv"
RAW_COVERAGE = ROOT / "raw" / "subreddits" / "coverage_summary.json"
OUTDIR = ROOT / "phase3_outputs" / "contradiction"

HEBREW_RE = re.compile(r"[\u0590-\u05FF]")
TOKEN_RE = re.compile(r"[a-z\u0590-\u05FF']+", re.IGNORECASE)

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

PEACE_TERMS = {
    "peace",
    "coexist",
    "coexistence",
    "friendship",
    "friendships",
    "friends",
    "bro",
    "bros",
    "brother",
    "brothers",
    "shared",
    "together",
    "love",
    "neighbor",
    "neighbors",
    "neighbour",
    "neighbours",
    "normalization",
    "normalisation",
}
SECURITY_TERMS = {
    "idf",
    "army",
    "strike",
    "strikes",
    "rocket",
    "rockets",
    "missile",
    "missiles",
    "drone",
    "drones",
    "raid",
    "raids",
    "operation",
    "operations",
    "buffer",
    "litani",
    "border",
    "security",
    "military",
    "terror",
    "terrorist",
    "terrorists",
    "opsec",
}
HOSTILITY_TERMS = {
    "idiot",
    "stupid",
    "dumb",
    "traitor",
    "fuck",
    "fucking",
    "moron",
    "bitch",
    "asshole",
    "psycho",
    "psychopath",
    "delusional",
    "liar",
    "racist",
    "hate",
    "hateful",
}
ANTI_HEZBOLLAH_TERMS = {
    "hezbollah",
    "hizbollah",
    "nasrallah",
    "iran",
    "iranian",
    "proxy",
    "shia",
    "shiite",
    "militia",
    "militias",
}
PALESTINE_TERMS = {
    "palestine",
    "palestinian",
    "palestinians",
    "gaza",
    "hamas",
    "occupation",
    "zionist",
    "zionists",
}
IDENTITY_CHALLENGE_PHRASES = [
    "are you really",
    "if you are israeli",
    "if you are lebanese",
    "fake lebanese",
    "fake israeli",
    "not lebanese",
    "not israeli",
    "hasbara",
    "psyop",
    "bot",
    "troll",
]
LEBANESE_TRANSLIT_TOKENS = {
    "ya3ne",
    "yaane",
    "shu",
    "kif",
    "mish",
    "mesh",
    "khaye",
    "hayda",
    "hal2ad",
    "3anjad",
    "sa7",
    "ma3",
    "3am",
}
CATEGORY_ORDER = ["hostility", "peace", "security", "palestine", "anti_hezbollah"]
CATEGORY_LABELS = {
    "hebrew": "Hebrew",
    "arabizi": "Arabizi",
    "lebanese_translit": "Lebanese translit",
    "hostility": "Hostility",
    "peace": "Peace",
    "security": "Security",
    "palestine": "Palestine",
    "anti_hezbollah": "Anti-Hezbollah",
}


def iter_jsonl(path: Path) -> Iterable[dict[str, Any]]:
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            yield json.loads(line)


def load_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        return list(reader)


def write_csv(path: Path, rows: list[dict[str, Any]], fieldnames: list[str]) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def excerpt(text: str, limit: int = 180) -> str:
    value = " ".join(text.split())
    if len(value) <= limit:
        return value
    return value[: limit - 3] + "..."


def month_from_utc(timestamp: int | None) -> str:
    if not timestamp:
        return ""
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).strftime("%Y-%m")


def normalize_subreddit(name: str | None) -> str:
    return (name or "").strip()


def classify_related_subreddit(name: str | None) -> tuple[bool, bool]:
    lowered = normalize_subreddit(name).lower()
    if not lowered:
        return False, False
    is_israel_related = lowered in ISRAEL_RELATED or "israel" in lowered or lowered.startswith("jew")
    is_lebanon_related = lowered in LEBANON_RELATED or "leban" in lowered or "beirut" in lowered
    return is_israel_related, is_lebanon_related


def classify_context(name: str | None) -> str:
    lowered = normalize_subreddit(name)
    if lowered == "ForbiddenBromance":
        return "fb"
    if lowered == "Israel":
        return "israel"
    if lowered == "lebanon":
        return "lebanon"
    return "other"


def tokenize(text: str) -> set[str]:
    return {token.lower() for token in TOKEN_RE.findall(text)}


def has_any_token(text: str, vocabulary: set[str]) -> bool:
    return bool(tokenize(text) & vocabulary)


def has_any_phrase(text: str, phrases: list[str]) -> bool:
    lowered = text.lower()
    return any(phrase in lowered for phrase in phrases)


def detect_lebanese_translit(text: str) -> bool:
    lowered = text.lower()
    token_hits = tokenize(lowered) & LEBANESE_TRANSLIT_TOKENS
    return bool(token_hits)


def detect_arabizi(text: str) -> bool:
    lowered = text.lower()
    explicit_patterns = [
        r"\bya?3ne\b",
        r"\bnshalla\b",
        r"\binshalla?h?\b",
        r"\byel3an\b",
        r"\b3anjad\b",
        r"\bsa7\b",
        r"\bhal2ad\b",
        r"\b3am\b",
    ]
    return any(re.search(pattern, lowered) for pattern in explicit_patterns)


def analyze_text(text: str) -> dict[str, int]:
    return {
        "hebrew": int(bool(HEBREW_RE.search(text))),
        "arabizi": int(detect_arabizi(text)),
        "lebanese_translit": int(detect_lebanese_translit(text)),
        "hostility": int(has_any_token(text, HOSTILITY_TERMS)),
        "peace": int(has_any_token(text, PEACE_TERMS)),
        "security": int(has_any_token(text, SECURITY_TERMS)),
        "palestine": int(has_any_token(text, PALESTINE_TERMS)),
        "anti_hezbollah": int(has_any_token(text, ANTI_HEZBOLLAH_TERMS)),
        "identity_challenge": int(has_any_phrase(text, IDENTITY_CHALLENGE_PHRASES)),
    }


@dataclass
class ContextStats:
    posts: int = 0
    comments: int = 0
    total: int = 0
    hebrew: int = 0
    arabizi: int = 0
    lebanese_translit: int = 0
    hostility: int = 0
    peace: int = 0
    security: int = 0
    palestine: int = 0
    anti_hezbollah: int = 0
    subreddits: Counter[str] = field(default_factory=Counter)

    def add(self, *, subreddit: str, kind: str, flags: dict[str, int]) -> None:
        if kind == "post":
            self.posts += 1
        else:
            self.comments += 1
        self.total += 1
        self.hebrew += flags["hebrew"]
        self.arabizi += flags["arabizi"]
        self.lebanese_translit += flags["lebanese_translit"]
        self.hostility += flags["hostility"]
        self.peace += flags["peace"]
        self.security += flags["security"]
        self.palestine += flags["palestine"]
        self.anti_hezbollah += flags["anti_hezbollah"]
        if subreddit:
            self.subreddits[subreddit] += 1

    def rate(self, key: str) -> float:
        return getattr(self, key) / self.total if self.total else 0.0


def vector_from_stats(stats: ContextStats) -> list[float]:
    if stats.total == 0:
        return [0.0 for _ in CATEGORY_ORDER]
    return [stats.rate(category) for category in CATEGORY_ORDER]


def vector_distance(a: ContextStats, b: ContextStats) -> float:
    av = vector_from_stats(a)
    bv = vector_from_stats(b)
    if not a.total or not b.total:
        return 0.0
    return sum(abs(x - y) for x, y in zip(av, bv)) / len(av)


def describe_shift(a: ContextStats, b: ContextStats, limit: int = 3) -> str:
    diffs = []
    for category in CATEGORY_ORDER:
        diff = b.rate(category) - a.rate(category)
        if abs(diff) < 0.03:
            continue
        diffs.append((abs(diff), diff, CATEGORY_LABELS[category]))
    diffs.sort(reverse=True)
    if not diffs:
        return "No strong category shift"
    parts = []
    for _, diff, label in diffs[:limit]:
        direction = "up" if diff > 0 else "down"
        parts.append(f"{label} {direction} {abs(diff) * 100:.1f}pp")
    return "; ".join(parts)


def load_phase2_summaries() -> dict[str, dict[str, str]]:
    return {row["author"]: row for row in load_csv(PHASE2_USER_SUMMARY)}


def build_fb_author_profiles(posts: list[dict[str, Any]], comments: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    flair_counts: dict[str, Counter[str]] = defaultdict(Counter)
    totals: dict[str, Counter[str]] = defaultdict(Counter)
    hebrew_counts: Counter[str] = Counter()

    for row in posts:
        author = row.get("author") or "[unknown]"
        totals[author]["posts"] += 1
        flair_counts[author][row.get("author_flair_text") or "Unflaired/Unknown"] += 1
        if HEBREW_RE.search("\n".join(filter(None, [row.get("title"), row.get("selftext")]))):
            hebrew_counts[author] += 1

    for row in comments:
        author = row.get("author") or "[unknown]"
        totals[author]["comments"] += 1
        flair_counts[author][row.get("author_flair_text") or "Unflaired/Unknown"] += 1
        if HEBREW_RE.search(row.get("body") or ""):
            hebrew_counts[author] += 1

    profiles = {}
    for author, counter in totals.items():
        top_flair = flair_counts[author].most_common(1)[0][0] if flair_counts[author] else "Unflaired/Unknown"
        profiles[author] = {
            "fb_posts": counter["posts"],
            "fb_comments": counter["comments"],
            "fb_total": counter["posts"] + counter["comments"],
            "fb_top_flair": top_flair,
            "fb_hebrew_items": hebrew_counts[author],
        }
    return profiles


def build_fight_threads(
    posts: list[dict[str, Any]],
    comments: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    posts_by_name = {row["name"]: row for row in posts}
    thread_rows: dict[str, dict[str, Any]] = {}

    for row in comments:
        link_id = row["link_id"]
        post = posts_by_name.get(link_id, {})
        text = row.get("body") or ""
        flags = analyze_text(text)
        info = thread_rows.setdefault(
            link_id,
            {
                "link_id": link_id,
                "post_id": post.get("id", ""),
                "month": month_from_utc(post.get("created_utc")),
                "title": post.get("title", ""),
                "permalink": post.get("permalink", ""),
                "post_author": post.get("author", ""),
                "post_flair": post.get("author_flair_text") or "Unflaired/Unknown",
                "comments": 0,
                "reply_comments": 0,
                "hebrew_comments": 0,
                "hostility_comments": 0,
                "identity_challenge_comments": 0,
                "palestine_comments": 0,
                "security_comments": 0,
                "unique_authors": set(),
            },
        )
        info["comments"] += 1
        info["reply_comments"] += int((row.get("parent_id") or "").startswith("t1_"))
        info["hebrew_comments"] += flags["hebrew"]
        info["hostility_comments"] += flags["hostility"]
        info["identity_challenge_comments"] += flags["identity_challenge"]
        info["palestine_comments"] += flags["palestine"]
        info["security_comments"] += flags["security"]
        info["unique_authors"].add(row.get("author") or "[unknown]")

    rows = []
    for info in thread_rows.values():
        unique_authors = len(info["unique_authors"])
        comments = info["comments"] or 1
        reply_ratio = info["reply_comments"] / comments
        comments_per_author = comments / max(unique_authors, 1)
        fight_score = round(
            info["hostility_comments"] * 4
            + info["identity_challenge_comments"] * 3
            + reply_ratio * 20
            + comments_per_author * 2
            + info["hebrew_comments"] * 0.5,
            3,
        )
        rows.append(
            {
                "link_id": info["link_id"],
                "post_id": info["post_id"],
                "month": info["month"],
                "title": info["title"],
                "permalink": info["permalink"],
                "post_author": info["post_author"],
                "post_flair": info["post_flair"],
                "comments": info["comments"],
                "unique_authors": unique_authors,
                "reply_comments": info["reply_comments"],
                "reply_ratio": round(reply_ratio, 3),
                "comments_per_author": round(comments_per_author, 3),
                "hebrew_comments": info["hebrew_comments"],
                "hostility_comments": info["hostility_comments"],
                "identity_challenge_comments": info["identity_challenge_comments"],
                "palestine_comments": info["palestine_comments"],
                "security_comments": info["security_comments"],
                "fight_score": fight_score,
            }
        )
    rows.sort(key=lambda row: (row["fight_score"], row["comments"]), reverse=True)
    return rows


def collect_transliteration_samples(
    posts: list[dict[str, Any]],
    comments: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    samples: list[dict[str, Any]] = []

    def maybe_add(row: dict[str, Any], *, kind: str, text: str, title: str = "") -> None:
        flair = row.get("author_flair_text") or "Unflaired/Unknown"
        if "Lebanese" not in flair:
            return
        flags = analyze_text(text)
        if not flags["arabizi"] and not flags["lebanese_translit"]:
            return
        samples.append(
            {
                "kind": kind,
                "id": row.get("id", ""),
                "author": row.get("author", ""),
                "author_flair_text": flair,
                "month": month_from_utc(row.get("created_utc")),
                "score": row.get("score", 0),
                "pattern": "arabizi+translit"
                if flags["arabizi"] and flags["lebanese_translit"]
                else "arabizi"
                if flags["arabizi"]
                else "lebanese_translit",
                "title": title,
                "excerpt": excerpt(text),
            }
        )

    for row in posts:
        text = "\n".join(filter(None, [row.get("title"), row.get("selftext")]))
        maybe_add(row, kind="post", text=text, title=row.get("title", ""))
    for row in comments:
        maybe_add(row, kind="comment", text=row.get("body") or "")

    samples.sort(key=lambda row: (row["month"], row["score"]), reverse=True)
    return samples


def build_persona_rows(
    fb_profiles: dict[str, dict[str, Any]],
    phase2_rows: dict[str, dict[str, str]],
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    persona_rows: list[dict[str, Any]] = []
    compared_users = 0
    lebanese_reviewed = 0
    lebanese_more_israel_than_lebanon = 0
    lebanese_hebrew_heavy = 0
    softening_candidates: list[dict[str, Any]] = []

    for author_dir in sorted(USER_HISTORIES.iterdir()):
        if not author_dir.is_dir():
            continue
        author = author_dir.name
        fb = fb_profiles.get(author)
        if not fb or fb["fb_total"] == 0:
            continue

        contexts = {
            "fb": ContextStats(),
            "israel": ContextStats(),
            "lebanon": ContextStats(),
            "other": ContextStats(),
        }

        for path, kind in ((author_dir / "posts.jsonl", "post"), (author_dir / "comments.jsonl", "comment")):
            if not path.exists():
                continue
            for row in iter_jsonl(path):
                subreddit = normalize_subreddit(row.get("subreddit"))
                context = classify_context(subreddit)
                text = row.get("body") if kind == "comment" else "\n".join(filter(None, [row.get("title"), row.get("selftext")]))
                flags = analyze_text(text)
                contexts[context].add(subreddit=subreddit, kind=kind, flags=flags)

        phase2 = phase2_rows.get(author, {})
        fb_vs_israel = vector_distance(contexts["fb"], contexts["israel"])
        fb_vs_lebanon = vector_distance(contexts["fb"], contexts["lebanon"])
        if min(contexts["fb"].total, contexts["israel"].total) < 25:
            fb_vs_israel = 0.0
        if min(contexts["fb"].total, contexts["lebanon"].total) < 25:
            fb_vs_lebanon = 0.0
        strongest_comparison = "fb_vs_israel" if fb_vs_israel >= fb_vs_lebanon else "fb_vs_lebanon"
        strongest_context = "Israel-related" if strongest_comparison == "fb_vs_israel" else "Lebanon-related"
        stronger_stats = contexts["israel"] if strongest_comparison == "fb_vs_israel" else contexts["lebanon"]
        strongest_shift = max(fb_vs_israel, fb_vs_lebanon)

        compared_total = min(contexts["fb"].total, stronger_stats.total)
        confidence = min(1.0, math.sqrt(compared_total / 40.0)) if compared_total else 0.0
        context_shift_score = round(strongest_shift * confidence * 100, 2)

        row = {
            "author": author,
            "fb_top_flair": fb["fb_top_flair"],
            "fb_total": fb["fb_total"],
            "manual_review_score": int(float(phase2.get("manual_review_score") or 0)),
            "outside_israel_related_comments": int(float(phase2.get("outside_israel_related_comments") or 0)),
            "outside_lebanon_related_comments": int(float(phase2.get("outside_lebanon_related_comments") or 0)),
            "outside_hebrew_items": int(float(phase2.get("outside_hebrew_items") or 0)),
            "fb_hebrew_items": fb["fb_hebrew_items"],
            "fb_context_total": contexts["fb"].total,
            "israel_context_total": contexts["israel"].total,
            "lebanon_context_total": contexts["lebanon"].total,
            "other_context_total": contexts["other"].total,
            "fb_vs_israel_distance": round(fb_vs_israel, 4),
            "fb_vs_lebanon_distance": round(fb_vs_lebanon, 4),
            "strongest_shift_context": strongest_context,
            "context_shift_score": context_shift_score,
            "strongest_shift_note": describe_shift(contexts["fb"], stronger_stats),
            "fb_peace_rate": round(contexts["fb"].rate("peace"), 4),
            "fb_security_rate": round(contexts["fb"].rate("security"), 4),
            "fb_hostility_rate": round(contexts["fb"].rate("hostility"), 4),
            "israel_peace_rate": round(contexts["israel"].rate("peace"), 4),
            "israel_security_rate": round(contexts["israel"].rate("security"), 4),
            "israel_hostility_rate": round(contexts["israel"].rate("hostility"), 4),
            "lebanon_peace_rate": round(contexts["lebanon"].rate("peace"), 4),
            "lebanon_security_rate": round(contexts["lebanon"].rate("security"), 4),
            "lebanon_hostility_rate": round(contexts["lebanon"].rate("hostility"), 4),
            "fb_hebrew_rate": round(contexts["fb"].rate("hebrew"), 4),
            "israel_hebrew_rate": round(contexts["israel"].rate("hebrew"), 4),
            "lebanon_hebrew_rate": round(contexts["lebanon"].rate("hebrew"), 4),
            "fb_top_subreddits": "; ".join(f"{name}:{count}" for name, count in contexts["fb"].subreddits.most_common(4)),
            "israel_top_subreddits": "; ".join(f"{name}:{count}" for name, count in contexts["israel"].subreddits.most_common(4)),
            "lebanon_top_subreddits": "; ".join(f"{name}:{count}" for name, count in contexts["lebanon"].subreddits.most_common(4)),
        }
        persona_rows.append(row)
        compared_users += 1

        flair = fb["fb_top_flair"]
        if "Lebanese" in flair:
            lebanese_reviewed += 1
            if row["outside_israel_related_comments"] > row["outside_lebanon_related_comments"]:
                lebanese_more_israel_than_lebanon += 1
            if row["outside_hebrew_items"] >= 25:
                lebanese_hebrew_heavy += 1

        if (
            contexts["fb"].total >= 50
            and contexts["israel"].total >= 50
            and contexts["fb"].rate("peace") > contexts["israel"].rate("peace") * 1.5
            and contexts["israel"].rate("security") > contexts["fb"].rate("security") * 1.5
        ):
            softening_candidates.append(row)

    persona_rows.sort(key=lambda row: (row["context_shift_score"], row["manual_review_score"], row["fb_total"]), reverse=True)
    softening_candidates.sort(key=lambda row: (row["context_shift_score"], row["fb_total"]), reverse=True)
    summary = {
        "compared_users": compared_users,
        "lebanese_reviewed": lebanese_reviewed,
        "lebanese_more_israel_than_lebanon": lebanese_more_israel_than_lebanon,
        "lebanese_hebrew_heavy": lebanese_hebrew_heavy,
        "softening_candidates": softening_candidates[:10],
    }
    return persona_rows, summary


def load_raw_coverage() -> list[dict[str, Any]]:
    if not RAW_COVERAGE.exists():
        return []
    return json.loads(RAW_COVERAGE.read_text(encoding="utf-8"))


def format_coverage_rows(coverage_rows: list[dict[str, Any]]) -> list[str]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for row in coverage_rows:
        grouped[row["subreddit"]].append(row)
    lines = []
    for subreddit in sorted(grouped):
        total_rows = sum(int(row.get("rows") or 0) for row in grouped[subreddit] if row.get("status") == "clean")
        broken = [row for row in grouped[subreddit] if row.get("status") != "clean"]
        last = max((row.get("last_created_iso") or "" for row in grouped[subreddit]), default="")
        status = "clean" if not broken else f"{len(broken)} broken shard(s)"
        lines.append(f"- {subreddit}: {total_rows} clean rows across {len(grouped[subreddit])} shards; latest `{last}`; status `{status}`")
    return lines


def build_report(
    *,
    persona_rows: list[dict[str, Any]],
    persona_summary: dict[str, Any],
    fight_threads: list[dict[str, Any]],
    translit_samples: list[dict[str, Any]],
    coverage_rows: list[dict[str, Any]],
) -> str:
    top_persona = persona_rows[:8]
    top_fights = fight_threads[:8]
    softening = persona_summary["softening_candidates"][:5]

    lines = [
        "# Phase 3 Contradiction-Oriented Synthesis",
        "",
        f"Generated: {datetime.now(tz=timezone.utc).isoformat()}",
        "",
        "## Intake Snapshot",
        "",
    ]
    coverage_lines = format_coverage_rows(coverage_rows)
    if coverage_lines:
        lines.extend(coverage_lines)
    else:
        lines.append("- No raw coverage summary was available when this report ran.")

    lines.extend(
        [
            "",
            "## What Strengthens The Case",
            "",
            "- The strongest user-level signal in the tracked 28-account sample is not a clean fake-identity catch. It is context switching: several high-volume participants use different rhetorical mixes in `r/ForbiddenBromance` than they do in exact `r/Israel` or `r/lebanon` posting contexts.",
            "- The most defensible cross-context contrast in the current sample is language / audience switching plus selective softening by some users inside the bromance frame. That is stronger than any direct proof of fake Lebanese identity.",
            "- Dense fight threads are highly reply-heavy and cluster around identity challenge language, moderation boundary disputes, and hostility rather than ordinary one-off disagreement.",
            "- Hebrew is a useful context signal, but mostly for rhetorical mode and audience shift. It is not sufficient by itself as proof of fake identity.",
            "",
            "## What Weakens Or Limits The Case",
            "",
            f"- In this tracked review sample, `{persona_summary['lebanese_reviewed']}` users carry a dominant `Lebanese` or `Diaspora Lebanese` flair inside `r/ForbiddenBromance`. `{persona_summary['lebanese_more_israel_than_lebanon']}` of them comment more in Israel-related subreddits than in Lebanon-related ones outside the bromance sub.",
            f"- Only `{persona_summary['lebanese_hebrew_heavy']}` tracked Lebanese-flair users show heavy outside Hebrew activity (`>=25` items). That is weaker than the user’s strongest suspicion would predict.",
            f"- Transliteration evidence is sparse: only `{len(translit_samples)}` Lebanese-flair archive items matched the current high-confidence Arabizi / Lebanese transliteration heuristics. This is not enough to make a strong public identity claim yet.",
            "",
            "## Top Context-Shift Users",
            "",
        ]
    )

    for row in top_persona:
        lines.append(
            f"- `{row['author']}` | flair `{row['fb_top_flair']}` | shift score `{row['context_shift_score']}` | strongest comparison `{row['strongest_shift_context']}` | {row['strongest_shift_note']}"
        )

    lines.extend(["", "## Softening-Inside-FB Candidates", ""])
    if softening:
        for row in softening:
            lines.append(
                f"- `{row['author']}` | flair `{row['fb_top_flair']}` | FB peace `{row['fb_peace_rate']}` vs Israel peace `{row['israel_peace_rate']}` | FB security `{row['fb_security_rate']}` vs Israel security `{row['israel_security_rate']}`"
            )
    else:
        lines.append("- No users crossed the current softening threshold.")

    lines.extend(["", "## Highest-Conflict Threads", ""])
    for row in top_fights:
        lines.append(
            f"- `{row['month']}` | fight score `{row['fight_score']}` | comments `{row['comments']}` | hostility `{row['hostility_comments']}` | identity challenges `{row['identity_challenge_comments']}` | `{row['title']}`"
        )

    lines.extend(
        [
            "",
            "## Transliteration Heuristic Read",
            "",
            "- The current transliteration pass should be treated as weak evidence only.",
            "- It is useful for building a review queue, but the archive does not yet give a dense enough Lebanese-Arabizi sample to use this as a headline public claim.",
            "",
        ]
    )
    if translit_samples:
        for row in translit_samples[:5]:
            lines.append(
                f"- `{row['month']}` | `{row['author']}` | `{row['pattern']}` | {row['excerpt']}"
            )
    else:
        lines.append("- No high-confidence Lebanese-flair transliteration samples were found.")

    lines.extend(
        [
            "",
            "## Recommended Public Framing",
            "",
            "- Lead with rhetorical mode-switching, event synchronization, and dense interaction structures. Those are stronger and more defensible than direct fake-identity accusations.",
            "- Present Lebanese-flair contradiction review honestly: the tracked sample does not currently prove systematic fake-Lebanese roleplay.",
            "- Use transliteration as a secondary review heuristic, not a main thesis.",
            "- The public site should distinguish clearly between: `coordinated-looking behavior`, `identity-performance cues`, and `claims that remain unproven`.",
        ]
    )
    return "\n".join(lines) + "\n"


def main() -> None:
    OUTDIR.mkdir(parents=True, exist_ok=True)

    posts = list(iter_jsonl(POSTS))
    comments = list(iter_jsonl(COMMENTS))
    phase2_rows = load_phase2_summaries()
    fb_profiles = build_fb_author_profiles(posts, comments)
    persona_rows, persona_summary = build_persona_rows(fb_profiles, phase2_rows)
    fight_threads = build_fight_threads(posts, comments)
    translit_samples = collect_transliteration_samples(posts, comments)
    coverage_rows = load_raw_coverage()

    write_csv(
        OUTDIR / "persona_context_scores.csv",
        persona_rows,
        [
            "author",
            "fb_top_flair",
            "fb_total",
            "manual_review_score",
            "outside_israel_related_comments",
            "outside_lebanon_related_comments",
            "outside_hebrew_items",
            "fb_hebrew_items",
            "fb_context_total",
            "israel_context_total",
            "lebanon_context_total",
            "other_context_total",
            "fb_vs_israel_distance",
            "fb_vs_lebanon_distance",
            "strongest_shift_context",
            "context_shift_score",
            "strongest_shift_note",
            "fb_peace_rate",
            "fb_security_rate",
            "fb_hostility_rate",
            "israel_peace_rate",
            "israel_security_rate",
            "israel_hostility_rate",
            "lebanon_peace_rate",
            "lebanon_security_rate",
            "lebanon_hostility_rate",
            "fb_hebrew_rate",
            "israel_hebrew_rate",
            "lebanon_hebrew_rate",
            "fb_top_subreddits",
            "israel_top_subreddits",
            "lebanon_top_subreddits",
        ],
    )
    write_csv(
        OUTDIR / "fight_threads.csv",
        fight_threads[:200],
        [
            "link_id",
            "post_id",
            "month",
            "title",
            "permalink",
            "post_author",
            "post_flair",
            "comments",
            "unique_authors",
            "reply_comments",
            "reply_ratio",
            "comments_per_author",
            "hebrew_comments",
            "hostility_comments",
            "identity_challenge_comments",
            "palestine_comments",
            "security_comments",
            "fight_score",
        ],
    )
    write_csv(
        OUTDIR / "transliteration_signals.csv",
        translit_samples,
        ["kind", "id", "author", "author_flair_text", "month", "score", "pattern", "title", "excerpt"],
    )

    report = build_report(
        persona_rows=persona_rows,
        persona_summary=persona_summary,
        fight_threads=fight_threads,
        translit_samples=translit_samples,
        coverage_rows=coverage_rows,
    )
    (ROOT / "phase3_contradiction_synthesis.md").write_text(report, encoding="utf-8")

    print(f"Wrote {OUTDIR / 'persona_context_scores.csv'}")
    print(f"Wrote {OUTDIR / 'fight_threads.csv'}")
    print(f"Wrote {OUTDIR / 'transliteration_signals.csv'}")
    print(f"Wrote {ROOT / 'phase3_contradiction_synthesis.md'}")


if __name__ == "__main__":
    main()
