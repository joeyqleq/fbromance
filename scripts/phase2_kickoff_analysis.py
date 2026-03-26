#!/usr/bin/env python3
import csv
import json
import math
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path('/Users/joeyq/Desktop/bromance')
POSTS = ROOT / 'r_ForbiddenBromance_posts.cleaned.ndjson'
COMMENTS = ROOT / 'r_ForbiddenBromance_comments.cleaned.ndjson'
OUTDIR = ROOT / 'phase2_outputs'
OUTDIR.mkdir(exist_ok=True)

monthly_csv = OUTDIR / 'monthly_activity.csv'
authors_csv = OUTDIR / 'top_authors.csv'
hebrew_csv = OUTDIR / 'hebrew_activity.csv'
keyword_csv = OUTDIR / 'keyword_time_series.csv'
flair_csv = OUTDIR / 'flair_summary.csv'
report_md = ROOT / 'phase2_preliminary_report.md'

KEYWORDS = {
    'hezbollah': ['hezbollah'],
    'iran': ['iran', 'iranian'],
    'peace': ['peace', 'coexistence', 'normalization', 'normalisation'],
    'sectarian': ['shia', 'shiite', 'shiism', 'muslim', 'christian', 'sectarian', 'civil war'],
    'gaza_palestine': ['gaza', 'hamas', 'palestine', 'palestinian'],
    'identity': ['lebanese', 'israeli', 'arab', 'jewish', 'jews', 'israelis'],
}
HEBREW_RE = re.compile(r'[\u0590-\u05FF]')
WORD_RE = re.compile(r"[A-Za-z']+")
STOP = {
    'the','and','that','this','with','for','you','are','was','but','have','not','they','from','your','all','just','about','what','would',
    'there','their','them','will','like','one','our','can','has','get','out','who','how','why','when','more','than','his','her','she',
    'him','its','also','had','did','don','does','isn','wasn','were','been','into','because','then','too','very','still','some','any',
    'much','many','these','those','should','could','would','i','we','he','it','to','of','in','on','at','a','an','is','am','be','or',
    'as','if','by','so','do','no','yes','my','me','us','im','ive','ill','cant','dont','thats','theyre','youre','https'
}


def month(ts: int) -> str:
    return datetime.fromtimestamp(ts, tz=timezone.utc).strftime('%Y-%m')


posts_by_name = {}
post_month = Counter()
comment_month = Counter()
post_authors = Counter()
comment_authors = Counter()
hebrew_posts_by_month = Counter()
hebrew_comments_by_month = Counter()
hebrew_authors = Counter()
reply_depth = Counter()
keyword_month = defaultdict(Counter)
word_counts = Counter()
comment_scores = []
post_scores = []
first_seen = {}
last_seen = {}
post_flairs = Counter()
comment_flairs = Counter()
author_flairs = defaultdict(Counter)

for line in POSTS.open('r', encoding='utf-8'):
    if not line.strip():
        continue
    o = json.loads(line)
    m = month(o['created_utc'])
    post_month[m] += 1
    post_authors[o['author']] += 1
    post_scores.append(o.get('score', 0) or 0)
    posts_by_name[o['name']] = o
    flair = o.get('author_flair_text') or 'Unflaired/Unknown'
    post_flairs[flair] += 1
    author_flairs[o['author']][flair] += 1
    for user in [o['author']]:
        first_seen[user] = min(first_seen.get(user, o['created_utc']), o['created_utc']) if user in first_seen else o['created_utc']
        last_seen[user] = max(last_seen.get(user, o['created_utc']), o['created_utc'])
    text = ((o.get('title') or '') + '\n' + (o.get('selftext') or ''))
    if HEBREW_RE.search(text):
        hebrew_posts_by_month[m] += 1
        hebrew_authors[o['author']] += 1
    low = text.lower()
    for label, variants in KEYWORDS.items():
        if any(v in low for v in variants):
            keyword_month[label][m] += 1
    for w in WORD_RE.findall(low):
        if len(w) >= 4 and w not in STOP:
            word_counts[w] += 1

for line in COMMENTS.open('r', encoding='utf-8'):
    if not line.strip():
        continue
    o = json.loads(line)
    m = month(o['created_utc'])
    comment_month[m] += 1
    comment_authors[o['author']] += 1
    comment_scores.append(o.get('score', 0) or 0)
    flair = o.get('author_flair_text') or 'Unflaired/Unknown'
    comment_flairs[flair] += 1
    author_flairs[o['author']][flair] += 1
    user = o['author']
    first_seen[user] = min(first_seen.get(user, o['created_utc']), o['created_utc']) if user in first_seen else o['created_utc']
    last_seen[user] = max(last_seen.get(user, o['created_utc']), o['created_utc'])
    parent = o.get('parent_id') or ''
    if parent.startswith('t1_'):
        reply_depth['reply_to_comment'] += 1
    elif parent.startswith('t3_'):
        reply_depth['reply_to_post'] += 1
    text = o.get('body') or ''
    if HEBREW_RE.search(text):
        hebrew_comments_by_month[m] += 1
        hebrew_authors[user] += 1
    low = text.lower()
    for label, variants in KEYWORDS.items():
        if any(v in low for v in variants):
            keyword_month[label][m] += 1
    for w in WORD_RE.findall(low):
        if len(w) >= 4 and w not in STOP:
            word_counts[w] += 1

all_months = sorted(set(post_month) | set(comment_month))
with monthly_csv.open('w', newline='', encoding='utf-8') as fh:
    writer = csv.writer(fh)
    writer.writerow(['month', 'posts', 'comments', 'hebrew_posts', 'hebrew_comments'])
    for m in all_months:
        writer.writerow([m, post_month[m], comment_month[m], hebrew_posts_by_month[m], hebrew_comments_by_month[m]])

all_authors = set(post_authors) | set(comment_authors)
with authors_csv.open('w', newline='', encoding='utf-8') as fh:
    writer = csv.writer(fh)
    writer.writerow(['author', 'posts', 'comments', 'total', 'first_seen_utc', 'last_seen_utc', 'hebrew_items', 'top_flair'])
    for author in sorted(all_authors, key=lambda a: (post_authors[a] + comment_authors[a]), reverse=True):
        top_flair = author_flairs[author].most_common(1)[0][0] if author_flairs[author] else 'Unflaired/Unknown'
        writer.writerow([
            author,
            post_authors[author],
            comment_authors[author],
            post_authors[author] + comment_authors[author],
            first_seen.get(author),
            last_seen.get(author),
            hebrew_authors[author],
            top_flair,
        ])

with hebrew_csv.open('w', newline='', encoding='utf-8') as fh:
    writer = csv.writer(fh)
    writer.writerow(['month', 'hebrew_posts', 'hebrew_comments'])
    for m in all_months:
        writer.writerow([m, hebrew_posts_by_month[m], hebrew_comments_by_month[m]])

with keyword_csv.open('w', newline='', encoding='utf-8') as fh:
    writer = csv.writer(fh)
    writer.writerow(['month'] + list(KEYWORDS.keys()))
    for m in all_months:
        writer.writerow([m] + [keyword_month[label][m] for label in KEYWORDS])

with flair_csv.open('w', newline='', encoding='utf-8') as fh:
    writer = csv.writer(fh)
    writer.writerow(['flair', 'posts', 'comments', 'total', 'distinct_authors'])
    all_flairs = sorted(set(post_flairs) | set(comment_flairs), key=lambda f: (post_flairs[f] + comment_flairs[f]), reverse=True)
    for flair in all_flairs:
        distinct_authors = sum(1 for counter in author_flairs.values() if counter.get(flair, 0) > 0)
        writer.writerow([flair, post_flairs[flair], comment_flairs[flair], post_flairs[flair] + comment_flairs[flair], distinct_authors])


def top_share(counter: Counter, top_n: int, total: int) -> float:
    return round(sum(v for _, v in counter.most_common(top_n)) / total * 100, 2)

report = f'''# Phase 2 Preliminary Report

## Scope
This is a first-pass analysis of the cleaned Reddit archive for `r/ForbiddenBromance` using the upload-ready NDJSON files. It is intentionally evidence-first: it identifies measurable patterns, flags areas for manual review, and avoids treating suspicion as proof.

## Dataset
- Posts: {sum(post_month.values())}
- Comments: {sum(comment_month.values())}
- Date range: {all_months[0]} to {all_months[-1]}
- Reply structure: {reply_depth['reply_to_comment']} replies to comments, {reply_depth['reply_to_post']} direct replies to posts

## Immediate Quantitative Signals
- Highest post month: {post_month.most_common(1)[0][0]} with {post_month.most_common(1)[0][1]} posts
- Highest comment month: {comment_month.most_common(1)[0][0]} with {comment_month.most_common(1)[0][1]} comments
- Top 10 commenters produced {top_share(comment_authors, 10, sum(comment_month.values()))}% of all comments
- Top 20 commenters produced {top_share(comment_authors, 20, sum(comment_month.values()))}% of all comments
- Top 10 posters produced {top_share(post_authors, 10, sum(post_month.values()))}% of all posts
- Hebrew content is present but not dominant: {sum(hebrew_posts_by_month.values())} posts and {sum(hebrew_comments_by_month.values())} comments contain Hebrew characters
- Most common visible flairs in posts: {', '.join(f'{flair} ({count})' for flair, count in post_flairs.most_common(4))}
- Most common visible flairs in comments: {', '.join(f'{flair} ({count})' for flair, count in comment_flairs.most_common(4))}

## Spike Months Worth Correlating With External Events
- 2024-09: {post_month['2024-09']} posts, {comment_month['2024-09']} comments
- 2024-10: {post_month['2024-10']} posts, {comment_month['2024-10']} comments
- 2024-06: {post_month['2024-06']} posts, {comment_month['2024-06']} comments
- 2023-10: {post_month['2023-10']} posts, {comment_month['2023-10']} comments
- 2023-11: {post_month['2023-11']} posts, {comment_month['2023-11']} comments
- 2021-05: {post_month['2021-05']} posts, {comment_month['2021-05']} comments
- 2020-08: {post_month['2020-08']} posts, {comment_month['2020-08']} comments
- 2025-03: {post_month['2025-03']} posts, {comment_month['2025-03']} comments
- 2026-03: {post_month['2026-03']} posts, {comment_month['2026-03']} comments (partial month in the archive)

## Content Themes To Test More Deeply
These are frequency-based starting points, not conclusions.
- High-salience terms: {', '.join(w for w, _ in word_counts.most_common(25))}
- Identity and geopolitics dominate the archive lexicon: Israel, Lebanon, Lebanese, Israeli, Hezbollah, Jews, Palestinians, Arab, Gaza, Iran
- This means later manual review should focus on how identity terms are framed, not merely whether they appear

## Flair Signals
- `author_flair_text` is preserved in the cleaned exports and should be treated as a self-presented identity signal rather than verified fact
- Flair concentration can help distinguish who is presenting as Lebanese, Diaspora Lebanese, Israeli, or Diaspora Israeli during spike months
- Later dashboard work should segment timelines, top authors, and interaction clusters by flair label

## Manual-Review Priorities
- Users with sustained high volume across long periods
- Spikes where comment volume grows faster than post volume
- Hebrew-language comments around conflict escalation windows
- Threads where `parent_id` chains create unusually dense back-and-forth between a small number of recurring accounts
- Claims of identity that can be stress-tested through language patterns, timing, and cross-thread consistency

## Output Tables
- `phase2_outputs/monthly_activity.csv`
- `phase2_outputs/top_authors.csv`
- `phase2_outputs/hebrew_activity.csv`
- `phase2_outputs/keyword_time_series.csv`
- `phase2_outputs/flair_summary.csv`
'''
report_md.write_text(report, encoding='utf-8')

print(report)
