# poi5on.m3

Public evidence dossier and analyst workbench for investigating timing, rhetoric, and identity-performance patterns around `r/ForbiddenBromance`.

## App Root

The website now lives at the repository root.

- Next.js app source: `src/`
- Static assets: `public/`
- Contract checks: `tests/`
- App config: `package.json`, `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`

The old nested `luro-ai/` shell has been removed. There is no separate sub-app that needs to reach upward into a parent project anymore.

## Data Layout

The repo is organized as a pipeline:

- `raw/subreddits/`
  Canonical month-sharded raw Reddit pulls. This is the primary raw source layer used for refreshes and auditability.
- `raw/user_histories/`
  Per-user lookup material and supporting raw investigation artifacts.
- `phase2_outputs/site/poison_site_data.json`
  Canonical frontend-ready dataset consumed directly by the site adapter in `src/data/poison-dashboard.ts`.
- `phase3_outputs/`
  Analysis-only outputs, including contradiction-focused review tables and exports.
- `scripts/`
  Fetch, build, and coverage-report tooling for the data pipeline.

A prior monolithic ingest attempt was removed during cleanup. The canonical raw source of truth is the month-sharded structure under `raw/subreddits/`.

## Frontend Data Contract

The frontend reads the generated site bundle from:

- `phase2_outputs/site/poison_site_data.json`

That import now resolves from the real app root, not from a nested salvage directory.

## Development

Install dependencies and run the app from the repository root:

```bash
pnpm install
pnpm run dev
```

Optional analytics environment variables:

```bash
NEXT_PUBLIC_MATOMO_URL=
NEXT_PUBLIC_MATOMO_SITE_ID=
```

## Dataset Refresh

Refresh the Reddit-backed local dataset and rebuild every downstream artifact used by the site:

```bash
python3 scripts/refresh_local_datasets.py
```

Optional window override:

```bash
python3 scripts/refresh_local_datasets.py --start-date 2026-03-01 --end-date 2026-03-23
```

This runner updates:

- `raw/subreddits/*`
- `r_ForbiddenBromance_posts.cleaned.ndjson`
- `r_ForbiddenBromance_comments.cleaned.ndjson`
- `phase2_outputs/deep/*`
- `phase3_outputs/contradiction/*`
- `phase2_outputs/site/poison_site_data.json`

Note: the external web/news layer under `external_research/raw/` is still a curated input set. To automate that side cleanly, add a separate scraper + normalization step before rebuilding the site bundle.
