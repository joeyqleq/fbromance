#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path('/Users/joeyq/Desktop/bromance')

POSTS_IN = ROOT / 'r_ForbiddenBromance_posts.json'
COMMENTS_IN = ROOT / 'r_ForbiddenBromance_comments.json'
POSTS_OUT = ROOT / 'r_ForbiddenBromance_posts.cleaned.ndjson'
COMMENTS_OUT = ROOT / 'r_ForbiddenBromance_comments.cleaned.ndjson'
SUMMARY_OUT = ROOT / 'cleaning_summary.json'
README_OUT = ROOT / 'cleaned_archive_schema.md'
PROMPT_OUT = ROOT / 'perplexity_phase2_prompt.md'

POST_FIELDS = [
    'id', 'name', 'author', 'author_flair_text', 'created_utc', 'title', 'selftext',
    'score', 'num_comments', 'permalink', 'subreddit',
]

COMMENT_FIELDS = [
    'id', 'author', 'author_flair_text', 'created_utc', 'body', 'score', 'parent_id', 'link_id',
]


def clean_file(input_path: Path, output_path: Path, fields: list[str]) -> dict:
    row_count = 0
    valid_json_rows = 0
    samples = []

    with input_path.open('r', encoding='utf-8') as src, output_path.open('w', encoding='utf-8') as dst:
        for line in src:
            line = line.strip()
            if not line:
                continue
            row_count += 1
            obj = json.loads(line)
            cleaned = {field: obj.get(field) for field in fields}
            dst.write(json.dumps(cleaned, ensure_ascii=False, separators=(',', ':')))
            dst.write('\n')
            valid_json_rows += 1
            if len(samples) < 3:
                samples.append(cleaned)

    return {
        'input_path': str(input_path),
        'output_path': str(output_path),
        'rows': row_count,
        'valid_rows_written': valid_json_rows,
        'size_bytes': output_path.stat().st_size,
        'size_mb': round(output_path.stat().st_size / 1024 / 1024, 2),
        'fields': fields,
        'samples': samples,
    }


def load_ids(path: Path, key: str) -> set[str]:
    ids: set[str] = set()
    with path.open('r', encoding='utf-8') as fh:
        for line in fh:
            if not line.strip():
                continue
            obj = json.loads(line)
            value = obj.get(key)
            if value is not None:
                ids.add(value)
    return ids


def validate_ndjson(path: Path) -> dict:
    count = 0
    with path.open('r', encoding='utf-8') as fh:
        for line in fh:
            if not line.strip():
                continue
            json.loads(line)
            count += 1
    return {'path': str(path), 'rows': count}


def write_readme() -> None:
    content = '''# Cleaned Reddit Archive Schema

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

## How to join data
- Join comments to posts with `comments.link_id = posts.name`.
- Rebuild reply chains with `comments.parent_id`.
- Use `author_flair_text` as a self-presented identity signal, not as verified ground truth.

## What was removed
Removed fields include Reddit metadata that is not necessary for your analysis report or upload target:
- award and gilding metadata
- flair internals and template metadata other than the visible flair label itself
- moderation and reporting metadata
- premium, patreon, profile, and avatar metadata
- media, preview, embed, gallery, and poll structures
- duplicate vote fields such as `ups`, `downs`, and related flags
- retrieval bookkeeping such as `retrieved_on` and `retrieved_utc`
- subreddit display duplicates and archive flags not needed for content analysis
'''
    README_OUT.write_text(content, encoding='utf-8')


def write_phase2_prompt(summary: dict) -> None:
    content = f'''# Perplexity Phase 2 Prompt

You are analyzing a cleaned Reddit archive for `r/ForbiddenBromance` covering posts and comments from 2019 onward.

## Why this analysis is being done
The requestor is Lebanese and sees this subreddit as potentially more than a casual peace forum. Their working hypothesis is that it may function as an influence environment that blends peace rhetoric, identity performance, and sectarian framing in ways that could shape Lebanese perceptions over time. This is not a fact to assume. It is the central hypothesis to test, stress, and if necessary falsify.

The requestor's lived context matters here:
- Lebanon and Israel are neighboring states with a long history of war, occupation, coercion, and propaganda efforts.
- Under Lebanese law, direct contact with Israelis is highly sensitive and in many settings illegal.
- The user believes the subreddit may specifically pressure identity boundaries by foregrounding who is `Lebanese` versus `Israeli`, including through visible user flair.
- The user is especially interested in whether the space amplifies sectarian tension, particularly anti-Shia or anti-Muslim framing, while presenting itself as dialogue or coexistence.

Treat all of that as contextual motivation and a set of search cues, not as proof.

## Files provided
- `r_ForbiddenBromance_posts.cleaned.ndjson`
- `r_ForbiddenBromance_comments.cleaned.ndjson`
- `cleaned_archive_schema.md`

## Dataset shape
- Posts rows: {summary['posts']['rows']}
- Comments rows: {summary['comments']['rows']}
- Posts file size: {summary['posts']['size_mb']} MB
- Comments file size: {summary['comments']['size_mb']} MB

## Field definitions
Posts:
- `id`, `name`, `author`, `author_flair_text`, `created_utc`, `title`, `selftext`, `score`, `num_comments`, `permalink`, `subreddit`

Comments:
- `id`, `author`, `author_flair_text`, `created_utc`, `body`, `score`, `parent_id`, `link_id`

Use `comments.link_id = posts.name` to connect comments to posts.
Use `parent_id` to reconstruct reply chains.
Use `author_flair_text` as a self-presented identity label that may be meaningful but is not automatically truthful.

## Analytical priorities
Produce a deep report on behavioral, linguistic, temporal, and event-driven patterns in this subreddit.

Focus on:
1. Topic evolution over time.
2. Activity spikes by date, week, month, and major regional event windows.
3. Correlations between subreddit discussion patterns and real-world Lebanon, Israel, and broader regional political or military events.
4. Recurrent narratives, framing patterns, and talking-point clusters.
5. Signs of coordination or inauthentic conversational structure, if supported by evidence.
6. User-level concentration patterns such as top posters, top commenters, dominant accounts, and unusual persistence around certain themes.
7. Reply-structure patterns, including whether discussions appear organic or unusually scripted.
8. Hebrew-language content and whether it materially differs in tone, candor, or topic from English-language content.
9. Flair analysis: how often accounts present as `Lebanese`, `Diaspora Lebanese`, `Israeli`, or `Diaspora Israeli`, and whether behavior differs by claimed identity.
10. Identity-claim consistency: whether language use, timing, vocabulary, rhetorical style, or cultural references create reasons for manual review of self-presented identity claims.
11. Tension-driving themes involving sectarian framing, anti-Shia framing, anti-Muslim framing, anti-Arab framing, or exclusionary rhetoric, but do not overclaim beyond what the evidence supports.
12. Specific date ranges, threads, and accounts that deserve deeper manual follow-up.

## Red flags to test rather than assume
- High-volume accounts dominating multiple spikes
- Small clusters of users replying heavily to one another across many threads
- Large event-driven topic shifts that line up unusually closely with real-world escalation windows
- Claimed Lebanese identity paired with weak Lebanese linguistic or cultural signals
- Hebrew comments or posts that are more candid, strategic, or hostile than the public-facing English discussion
- Flair usage that appears to steer discussion or to separate in-group from out-group participation
- Repeated rhetoric that frames coexistence in ethnic or sectarian rather than civic terms

## Method requirements
- Ground claims in the provided data and external sources.
- For external correlations, search the web and build a timeline of major Lebanon-Israel and broader regional events from 2019 to the present.
- Explicitly separate observed facts, statistical correlations, and speculative inferences.
- Provide source links for external events used in the timeline.
- Flag weak evidence instead of forcing a conclusion.
- Do not treat a user's flair or claimed identity as verified truth.
- Do not assume coordinated state action unless the evidence supports that level of confidence.
- Where useful, propose additional follow-up datasets that would strengthen or falsify the working hypothesis.

## Deliverables
1. Executive summary.
2. Timeline of subreddit activity versus major external events.
3. Topic and narrative analysis.
4. User, flair, and interaction analysis.
5. Evidence for or against coordinated behavior.
6. Ranked list of the strongest coincidences or correlations with exact dates.
7. Ranked list of threads or users for manual review.
8. Recommended next datasets to collect, including user-level expansion candidates.
9. Suggestions for charts and an eventual public-facing investigative dashboard.

## Important framing
This is an exploratory intelligence-style analysis of public data. Do not present unsupported accusations as proven fact. Use cautious, evidence-based language and distinguish clearly between:
- what the data directly shows
- what outside sources confirm
- what remains hypothesis or suspicion
'''
    PROMPT_OUT.write_text(content, encoding='utf-8')


def main() -> None:
    posts = clean_file(POSTS_IN, POSTS_OUT, POST_FIELDS)
    comments = clean_file(COMMENTS_IN, COMMENTS_OUT, COMMENT_FIELDS)

    posts_validation = validate_ndjson(POSTS_OUT)
    comments_validation = validate_ndjson(COMMENTS_OUT)

    post_names = load_ids(POSTS_OUT, 'name')
    comment_link_ids = load_ids(COMMENTS_OUT, 'link_id')

    sample_reply_chain_ok = False
    sample_post_join_ok = False
    sample_join = None
    sample_reply = None

    with COMMENTS_OUT.open('r', encoding='utf-8') as fh:
        for line in fh:
            if not line.strip():
                continue
            obj = json.loads(line)
            if not sample_post_join_ok and obj.get('link_id') in post_names:
                sample_post_join_ok = True
                sample_join = {
                    'comment_id': obj['id'],
                    'link_id': obj['link_id'],
                }
            if not sample_reply_chain_ok and isinstance(obj.get('parent_id'), str) and obj['parent_id'].startswith('t1_'):
                sample_reply_chain_ok = True
                sample_reply = {
                    'comment_id': obj['id'],
                    'parent_id': obj['parent_id'],
                }
            if sample_post_join_ok and sample_reply_chain_ok:
                break

    summary = {
        'posts': posts,
        'comments': comments,
        'validation': {
            'posts_ndjson': posts_validation,
            'comments_ndjson': comments_validation,
            'comments_under_50_mb': comments['size_mb'] < 50,
            'post_row_count_preserved': posts['rows'] == posts_validation['rows'],
            'comment_row_count_preserved': comments['rows'] == comments_validation['rows'],
            'all_comment_link_ids_present_in_posts': comment_link_ids.issubset(post_names),
            'sample_post_join_ok': sample_post_join_ok,
            'sample_post_join': sample_join,
            'sample_reply_chain_ok': sample_reply_chain_ok,
            'sample_reply_chain': sample_reply,
        },
    }

    SUMMARY_OUT.write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding='utf-8')
    write_readme()
    write_phase2_prompt(summary)


if __name__ == '__main__':
    main()
