# poi5on.m3 Frontend Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the visible `luro-ai` product surface with a polished `poi5on.m3` dossier homepage and evidence-atlas workbench, using the existing Next.js app only as the technical host.

**Architecture:** Keep the current App Router project, but introduce a new `poison` design system, a route-aware homepage/workbench information architecture, and data-driven chart/evidence modules backed by `phase2_outputs/deep/dashboard_data.json`. The implementation should be componentized so the homepage and workbench feel like one coherent instrument panel rather than two unrelated skins.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, Recharts, existing UI primitives, generated favicon/OG assets, Next metadata APIs, `next/script`, Playwright browser verification.

---

## File Map

### Create

- `src/data/poison-dashboard.ts` — typed adapter for `phase2_outputs/deep/dashboard_data.json`
- `src/components/poison/theme.ts` — shared theme constants and palette helpers
- `src/components/poison/layout/poison-shell.tsx` — reusable background, scanline, and frame shell
- `src/components/poison/layout/poison-hero-wordmark.tsx` — illustrated `poi5on.m3` wordmark object
- `src/components/poison/layout/poison-top-nav.tsx` — homepage nav
- `src/components/poison/layout/poison-sidebar.tsx` — workbench left rail
- `src/components/poison/sections/hero.tsx`
- `src/components/poison/sections/timeline-ribbon.tsx`
- `src/components/poison/sections/narrative-grid.tsx`
- `src/components/poison/sections/user-preview.tsx`
- `src/components/poison/sections/methodology-strip.tsx`
- `src/components/poison/workbench/section-header.tsx`
- `src/components/poison/workbench/chart-frame.tsx`
- `src/components/poison/workbench/filter-bar.tsx`
- `src/components/poison/workbench/export-actions.tsx`
- `src/components/poison/workbench/overview-panel.tsx`
- `src/components/poison/workbench/timeline-panel.tsx`
- `src/components/poison/workbench/narratives-panel.tsx`
- `src/components/poison/workbench/users-panel.tsx`
- `src/components/poison/workbench/events-panel.tsx`
- `src/components/poison/workbench/rhetoric-panel.tsx`
- `src/components/poison/workbench/evidence-panel.tsx`
- `src/components/poison/workbench/network-panel.tsx`
- `src/components/poison/workbench/resize-frame.tsx`
- `src/components/poison/analytics.tsx` — Tianji + Matomo integration
- `src/app/icon.tsx` — generated icon
- `src/app/opengraph-image.tsx` — OG image
- `src/app/twitter-image.tsx` — Twitter/X image
- `src/app/manifest.ts` — PWA-style icon metadata
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/(main)/app/[section]/page.tsx` — section-aware workbench route

### Modify

- `src/app/layout.tsx` — metadata, theme body classes, analytics injection
- `src/functions/metadata.ts` — route-aware SEO for `poi5on.me`
- `src/constants/fonts.ts` — replace generic font pairing with more distinctive local stack where possible
- `src/styles/globals.css` — poison theme tokens, ambient motion, utility classes
- `tailwind.config.ts` — animation/keyframe/token support for new gradients and panel effects
- `src/app/(marketing)/layout.tsx` — new public shell wrapper
- `src/app/(marketing)/page.tsx` — replace old landing page with dossier homepage
- `src/app/(main)/app/layout.tsx` — replace old dashboard chrome
- `src/app/(main)/app/page.tsx` — workbench overview route
- `src/constants/links.ts` — replace sidebar/nav links with evidence-atlas sections
- `package.json` — add any missing small dependencies only if implementation actually needs them

### Verify / Test

- `npm run build`
- targeted lint/type checks if available
- Playwright headed screenshots for homepage and workbench

## Chunk 1: Theme, Data Adapter, and SEO Foundation

**Files:**
- Create: `src/data/poison-dashboard.ts`
- Create: `src/components/poison/theme.ts`
- Create: `src/components/poison/analytics.tsx`
- Create: `src/app/icon.tsx`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/twitter-image.tsx`
- Create: `src/app/manifest.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/functions/metadata.ts`
- Modify: `src/constants/fonts.ts`
- Modify: `src/styles/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Write a failing data-shape smoke test**

Create `tests/poison-dashboard-shape.test.py` or a small TS runtime smoke script if no JS test harness exists, asserting the adapter returns the required keys:

```python
required = {"overview", "spikeMonths", "eventTimeline", "reviewQueue", "denseThreads", "topInteractions", "flairBreakdown"}
assert required.issubset(load_dashboard_contract())
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `python3 tests/poison-dashboard-shape.test.py`

Expected: fail because adapter file does not exist yet.

- [ ] **Step 3: Implement the typed dashboard adapter**

Read `phase2_outputs/deep/dashboard_data.json`, normalize key names for frontend use, and export helper accessors:

- overview counts
- spike month rows
- event timeline rows
- review queue rows
- dense thread rows
- interaction rows
- flair breakdown rows

- [ ] **Step 4: Re-run the data smoke test**

Run: `python3 tests/poison-dashboard-shape.test.py`

Expected: pass.

- [ ] **Step 5: Replace the theme foundation**

Update fonts, tokens, gradients, ambient motion, panel glow, scanlines, and chart colors in CSS/Tailwind. Ensure the theme supports:

- black/charcoal chassis
- acid-lime/magenta/cyan/cobalt energy colors
- dot-matrix text helpers
- spectral glow utilities
- hover border gradients
- slow ambient motion classes

- [ ] **Step 6: Integrate SEO, social, favicon, and analytics**

Implement:

- `generateMetadata()` defaults for `poi5on.me`
- canonical metadata
- Open Graph/Twitter image routes
- app icon/manifest
- robots and sitemap
- Tianji script
- Matomo init translated into a client-safe component or `next/script`

- [ ] **Step 7: Run build verification for the foundation**

Run: `npm run build`

Expected: build succeeds with the new metadata and image routes.

## Chunk 2: Public Dossier Homepage

**Files:**
- Create: `src/components/poison/layout/poison-shell.tsx`
- Create: `src/components/poison/layout/poison-top-nav.tsx`
- Create: `src/components/poison/layout/poison-hero-wordmark.tsx`
- Create: `src/components/poison/sections/hero.tsx`
- Create: `src/components/poison/sections/timeline-ribbon.tsx`
- Create: `src/components/poison/sections/narrative-grid.tsx`
- Create: `src/components/poison/sections/user-preview.tsx`
- Create: `src/components/poison/sections/methodology-strip.tsx`
- Modify: `src/app/(marketing)/layout.tsx`
- Modify: `src/app/(marketing)/page.tsx`

- [ ] **Step 1: Write a failing route assertion**

Create a simple smoke script that fetches `/` during local run and checks for:

- `poi5on.m3`
- `r/ForbiddenBromance`
- at least one chart caption block

- [ ] **Step 2: Run the route assertion and verify failure**

Expected: fail because the old landing page does not contain these elements.

- [ ] **Step 3: Build the homepage shell**

Implement:

- cinematic hero with wordmark object
- immediate factual subheadline naming the subreddit and archive span
- timeline ribbon based on spike months
- narrative module grid with science-magazine captions
- user anomaly preview cards from review queue
- methodology and evidence posture strip

- [ ] **Step 4: Add low-burn ambient interactions**

Apply restrained motion:

- spectral drift
- scanline overlay
- hover-responsive glow
- panel parallax where appropriate

- [ ] **Step 5: Re-run the homepage route assertion**

Expected: pass.

- [ ] **Step 6: Run build verification**

Run: `npm run build`

Expected: pass.

## Chunk 3: Evidence Atlas Workbench

**Files:**
- Create: `src/components/poison/layout/poison-sidebar.tsx`
- Create: `src/components/poison/workbench/section-header.tsx`
- Create: `src/components/poison/workbench/filter-bar.tsx`
- Create: `src/components/poison/workbench/chart-frame.tsx`
- Create: `src/components/poison/workbench/export-actions.tsx`
- Create: `src/components/poison/workbench/resize-frame.tsx`
- Create: `src/components/poison/workbench/overview-panel.tsx`
- Create: `src/components/poison/workbench/timeline-panel.tsx`
- Create: `src/components/poison/workbench/narratives-panel.tsx`
- Create: `src/components/poison/workbench/users-panel.tsx`
- Create: `src/components/poison/workbench/events-panel.tsx`
- Create: `src/components/poison/workbench/rhetoric-panel.tsx`
- Create: `src/components/poison/workbench/evidence-panel.tsx`
- Create: `src/components/poison/workbench/network-panel.tsx`
- Create: `src/app/(main)/app/[section]/page.tsx`
- Modify: `src/app/(main)/app/layout.tsx`
- Modify: `src/app/(main)/app/page.tsx`
- Modify: `src/constants/links.ts`

- [ ] **Step 1: Write a failing section-route smoke test**

Assert these routes render and return section labels:

- `/app`
- `/app/timeline`
- `/app/narratives`
- `/app/users`
- `/app/events`
- `/app/rhetoric`
- `/app/evidence`

- [ ] **Step 2: Run the section-route test and verify failure**

Expected: fail because those routes/pages do not exist yet.

- [ ] **Step 3: Build the new left-rail workbench shell**

Replace the generic dashboard with:

- persistent rail
- section-aware headers
- consistent panel framing
- shared filter bar

- [ ] **Step 4: Implement the overview and timeline panels**

Use real data for:

- archive overview stats
- spike months
- event ribbon / window matching
- flair evolution

Every chart includes:

- caption
- interpretation
- limit note

- [ ] **Step 5: Implement narratives, users, events, rhetoric, and evidence panels**

Use:

- review queue
- dense threads
- event timeline
- top interactions
- flair breakdown

Add targeted tables/cards where charts are the wrong tool.

- [ ] **Step 6: Add export and resize affordances**

At minimum:

- CSV export for underlying chart data
- image export for rendered chart card
- resizable frame for at least one dense panel where comparison benefits from it

- [ ] **Step 7: Re-run route smoke tests**

Expected: pass.

- [ ] **Step 8: Run build verification**

Run: `npm run build`

Expected: pass.

## Chunk 4: Frontend QA and Browser Validation

**Files:**
- Create: `output/playwright/` artifacts as needed
- Modify: implementation files above only if QA finds issues

- [ ] **Step 1: Start the app locally**

Run: `npm run dev`

- [ ] **Step 2: Verify homepage in a real browser**

Use Playwright to check:

- hero loads
- homepage sections render in order
- major charts appear
- visual hierarchy reads correctly on desktop

- [ ] **Step 3: Verify workbench routes**

Check:

- left rail
- section switching
- chart interactions
- export controls visible

- [ ] **Step 4: Verify mobile behavior**

Check:

- homepage remains legible and visually intentional
- workbench degrades into a usable mobile navigation pattern

- [ ] **Step 5: Fix any surfaced UI bugs**

Iterate until browser checks pass.

- [ ] **Step 6: Run final verification**

Run:

```bash
npm run build
```

If lint is configured and stable, also run:

```bash
npm run lint
```

Expected: no build failures; lint only if the existing project supports it cleanly.

## Notes

- Do not preserve the existing `luro-ai` aesthetic.
- Reuse only technically useful primitives from the current codebase.
- Do not introduce a chatbot UI in this pass.
- If a reference asset file is unavailable locally, continue with the approved visual direction rather than blocking.
