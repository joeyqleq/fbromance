# Phase 2 Deep Analysis Report

## Scope
This report extends the first-pass archive summary with deeper local evidence: spike scoring, flair segmentation, Hebrew subset extraction, reply-network patterns, dense-thread detection, and a user-history review queue based on downloaded Arctic Shift histories.

## Guardrails
- `author_flair_text` is a self-presented label, not verified identity.
- Cross-subreddit history can justify closer review, but it does not prove deception, coordination, or state affiliation.
- Hebrew usage is treated as one signal among many, not a standalone smoking gun.

## Strongest local signals
- 2024-09: 6634 comments, 293 posts, comment z-score 4.547
- 2024-10: 6509 comments, 197 posts, comment z-score 4.444
- 2024-06: 3893 comments, 134 posts, comment z-score 2.281
- 2024-11: 3032 comments, 99 posts, comment z-score 1.568
- 2023-11: 2975 comments, 130 posts, comment z-score 1.521
- 2024-08: 2910 comments, 125 posts, comment z-score 1.468

## Hebrew subset
- Hebrew-bearing items in the subreddit archive: 78 posts and 1205 comments
- The extracted subset is saved at `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/hebrew_subset.ndjson` for closer manual reading and translation work.

## Dense conversation threads
- 2019-12 | Lebanon 60 years ago | 40 comments from 2 authors | comments/author 20.0
- 2020-01 | Arab and Israeli duet (in Arabic and Hebrew) | 70 comments from 6 authors | comments/author 11.667
- 2021-09 | Ban speedrun attempt number 1 | 195 comments from 17 authors | comments/author 11.471
- 2020-10 | Is it legal to talk to someone living in Europe who has Lebanese passport? | 43 comments from 5 authors | comments/author 8.6
- 2024-09 | This sub aware of Maronite’s spreading blood libel throughout the region  | 51 comments from 6 authors | comments/author 8.5
- 2025-11 | Salam: My generation and I made mistakes in the past. | 91 comments from 11 authors | comments/author 8.273

## Recurrent reply pairs
- victoryismind → [deleted]: 189 replies
- [deleted] → victoryismind: 112 replies
- ForbiddenBromance-ModTeam → [deleted]: 106 replies
- Tamtumtam → [deleted]: 86 replies
- cha3bghachim → [deleted]: 71 replies
- FriendlyJewThrowaway → KimoZ_2006: 68 replies
- DaDerpyDude → [deleted]: 65 replies
- KimoZ_2006 → FriendlyJewThrowaway: 65 replies
- [deleted] → DaDerpyDude: 62 replies
- [deleted] → Small_Watch: 62 replies

## User-history review queue
These are manual-review priorities, not identity verdicts.
- EmperorChaos | flair `Diaspora Lebanese` | FB total 962 | review score 60 | claimed Lebanese flair merits closer consistency review; heavy outside activity in Israel-related subreddits; high-volume presence inside ForbiddenBromance; large outside Reddit history available for comparison
- victoryismind | flair `Lebanese` | FB total 3137 | review score 35 | claimed Lebanese flair merits closer consistency review; high-volume presence inside ForbiddenBromance; large outside Reddit history available for comparison
- cha3bghachim | flair `Lebanese` | FB total 1124 | review score 35 | claimed Lebanese flair merits closer consistency review; high-volume presence inside ForbiddenBromance; large outside Reddit history available for comparison
- IbnEzra613 | flair `Diaspora Jew` | FB total 903 | review score 30 | high Hebrew activity cluster; high-volume presence inside ForbiddenBromance; large outside Reddit history available for comparison
- Tamtumtam | flair `Israeli` | FB total 465 | review score 30 | high Hebrew activity cluster; high-volume presence inside ForbiddenBromance; large outside Reddit history available for comparison
- DaDerpyDude | flair `Israeli` | FB total 452 | review score 30 | high Hebrew activity cluster; high-volume presence inside ForbiddenBromance; large outside Reddit history available for comparison
- levnon14 | flair `Diaspora Lebanese` | FB total 982 | review score 25 | claimed Lebanese flair merits closer consistency review; high-volume presence inside ForbiddenBromance
- Glad-Difference-3238 | flair `Lebanese` | FB total 474 | review score 25 | claimed Lebanese flair merits closer consistency review; high-volume presence inside ForbiddenBromance

## Output files
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/monthly_spikes.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/monthly_flair_breakdown.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/window_top_authors.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/monthly_top_authors.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/interaction_edges.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/dense_threads.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/hebrew_subset.ndjson`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/hebrew_priority_review.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/user_history_summary.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/identity_review_queue.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/event_timeline.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/event_timeline.json`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/dashboard_data.json`
