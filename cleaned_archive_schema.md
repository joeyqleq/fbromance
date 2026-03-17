# Cleaned Reddit Archive Schema

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
