# Phase 2 Preliminary Report

## Scope
This is a first-pass analysis of the cleaned Reddit archive for `r/ForbiddenBromance` using the upload-ready NDJSON files. It is intentionally evidence-first: it identifies measurable patterns, flags areas for manual review, and avoids treating suspicion as proof.

## Dataset
- Posts: 4895
- Comments: 88094
- Date range: 2019-09 to 2026-03
- Reply structure: 59217 replies to comments, 28877 direct replies to posts

## Immediate Quantitative Signals
- Highest post month: 2024-09 with 293 posts
- Highest comment month: 2024-09 with 6634 comments
- Top 10 commenters produced 15.81% of all comments
- Top 20 commenters produced 20.44% of all comments
- Top 10 posters produced 27.8% of all posts
- Hebrew content is present but not dominant: 77 posts and 1192 comments contain Hebrew characters
- Most common visible flairs in posts: Unflaired/Unknown (3122), Israeli (729), Lebanese (517), Diaspora Jew (167)
- Most common visible flairs in comments: Unflaired/Unknown (51841), Israeli (16847), Lebanese (8675), Diaspora Lebanese (3965)

## Spike Months Worth Correlating With External Events
- 2024-09: 293 posts, 6634 comments
- 2024-10: 197 posts, 6509 comments
- 2024-06: 134 posts, 3893 comments
- 2023-10: 129 posts, 2361 comments
- 2023-11: 130 posts, 2975 comments
- 2021-05: 133 posts, 1937 comments
- 2020-08: 125 posts, 1420 comments
- 2025-03: 77 posts, 2172 comments
- 2026-03: 36 posts, 1043 comments (partial month in the archive)

## Content Themes To Test More Deeply
These are frequency-based starting points, not conclusions.
- High-salience terms: israel, lebanon, people, lebanese, it's, think, israeli, don't, hezbollah, even, peace, know, want, other, only, jews, which, here, most, country, israelis, really, right, being, palestinians
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
