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

## Source of truth
- These cleaned files are rebuilt from the month-sharded raw pulls under `raw/subreddits/ForbiddenBromance/*`.
- They are the compact analysis inputs used by the phase 2 and phase 3 analyzers.
