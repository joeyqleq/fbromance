# fbromance / poi5on.m3 Handoff

This file is the authoritative handoff for continuing the project in Antigravity with Gemini 3.1 Pro.

Open this project in Antigravity at:
- `/Users/joeyq/Desktop/bromance`

Do **not** open the nested `luro-ai` folder as the main project. Keep `luro-ai` only as a salvage/reference source until the new root app is stable.

## 1. Mission
Build a public-facing investigative web application that tests the hypothesis that `r/ForbiddenBromance` shows patterns consistent with coordinated influence / propaganda / identity performance rather than organic cross-border dialogue.

The site must not overclaim proof. It must be evidence-led, method-heavy, visually striking, and analytically granular.

## 2. Why this project exists
The user is Lebanese and approaches this as a combined:
- data-analysis exercise
- portfolio project
- public case study
- attempt to surface whether the subreddit behaves like a psychological-operation environment

The user's working theory is broader than the subreddit itself:
- sectarian tension amplification in Lebanon
- anti-Hezbollah / anti-Shia framing
- positive reinforcement of Christian militia narratives
- normalization / peace-branding rhetoric
- suppression or avoidance of Palestine discussion
- possible synchronization with real-world conflict events, leaflet drops, raids, assassinations, border escalations, and propaganda operations

Treat these as hypotheses to test, not facts to assume.

## 3. Evidence posture
Non-negotiable:
- Do not claim proof you do not have.
- Do not flatten everything into one ideological story.
- Separate evidence tiers clearly:
  - raw artifacts
  - cleaned data
  - derived signals
  - hypotheses
  - speculation
- The strongest public site should feel rigorous enough that a hostile reader cannot dismiss it as random ranting.

## 4. Current research/data state
The local project already contains substantial work.

### Core subreddit data
At project root:
- `/Users/joeyq/Desktop/bromance/r_ForbiddenBromance_posts.json`
- `/Users/joeyq/Desktop/bromance/r_ForbiddenBromance_comments.json`
- cleaned forms:
  - `/Users/joeyq/Desktop/bromance/r_ForbiddenBromance_posts.cleaned.ndjson`
  - `/Users/joeyq/Desktop/bromance/r_ForbiddenBromance_comments.cleaned.ndjson`
- schema note:
  - `/Users/joeyq/Desktop/bromance/cleaned_archive_schema.md`
- cleaning summary:
  - `/Users/joeyq/Desktop/bromance/cleaning_summary.json`

### User-history acquisition
- Arctic Shift user-history acquisition was done for 28 target users.
- Raw histories live under:
  - `/Users/joeyq/Desktop/bromance/raw/user_histories`
- Derived outputs include:
  - `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/user_history_summary.csv`
  - `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/identity_review_queue.csv`

### Deep local analysis outputs
Relevant outputs under:
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/site`

Key files:
- `/Users/joeyq/Desktop/bromance/phase2_deep_report.md`
- `/Users/joeyq/Desktop/bromance/phase2_correlation_brief.md`
- `/Users/joeyq/Desktop/bromance/phase2_event_correlation_report.md`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/dashboard_data.json`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/hebrew_priority_review.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/hebrew_subset.ndjson`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/monthly_spikes.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/monthly_flair_breakdown.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/monthly_top_authors.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/dense_threads.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/interaction_edges.csv`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/deep/event_timeline.json`
- `/Users/joeyq/Desktop/bromance/phase2_outputs/site/poison_site_data.json`

### External research imports
External research outputs from ChatGPT, Gemini, and Perplexity are staged at:
- `/Users/joeyq/Desktop/bromance/external_research`
- raw vendor files under:
  - `/Users/joeyq/Desktop/bromance/external_research/raw`

These include:
- source inventories
- major event timelines
- post-ceasefire violation logs
- obscure watchlists
- cross-reference rules
- methodology notes

## 5. What has already been learned
The current local analysis established a decent base, but the user wants a much more aggressive and granular second pass.

Already-known signals include:
- major activity spikes around `2024-06`, `2024-09`, `2024-10`, `2025-03`, `2026-03`
- Hebrew-bearing content exists and clusters in specific windows
- self-reported flair is useful but not proof of identity
- some users need contradiction-style review rather than generic activity counts
- same-window reactions to real-world propaganda / leaflet / security events are visible in the subreddit

The user is specifically dissatisfied with analysis that is merely descriptive.
The next pass must be inferential and contradiction-oriented.

## 6. Critical analysis direction for the next model
This is the single most important analytical pivot.

Do **not** stop at reporting counts.
Use the data to answer: what does behavior that looks coordinated, staged, identity-managed, or propagandistic actually look like in this specific subreddit?

### Core analytical mandate
The redesign must work **backwards** from the core question:
- `What specific evidence pattern would materially strengthen or weaken the hypothesis that r/ForbiddenBromance behaves like a psyop or influence operation?`

That means the next model must not accept the current dashboards as the final shape of the analysis. It should re-open the data from scratch and redesign the data studio around decision-oriented questions, not around generic reporting.

The right approach is:
- identify the key claims/hypotheses
- identify what observable behavior would count as evidence for or against each claim
- reshape the data model and derived datasets around those evidentiary tests
- build visualizations that answer those tests directly

Examples of the kinds of questions the data studio should answer:
- Which users show the strongest contradiction between claimed identity and cross-subreddit behavior?
- Which users materially change tone, candor, or ideology between Hebrew and English contexts?
- Which narratives spike in tight sync with real-world propaganda, security, or battlefield events?
- Which threads look more like staged amplification or role-playing than ordinary disagreement?
- Which entities, obscure names, villages, or operations surface in the subreddit unusually quickly after local reporting?
- Which relationships between users are unusually dense, repetitive, or rhetorically synchronized?

The user explicitly wants the next model to mine the data to answer those questions, not merely visualize what was already counted.

### The user wants granular analysis of:
1. **Cross-subreddit persona consistency**
- Compare the same account across:
  - `r/ForbiddenBromance`
  - `r/Israel`
  - `r/lebanon`
  - any other relevant subreddit in the user's history
- Compare tone, ideology, rhetoric, certainty, hostility, and identity claims across contexts.
- Ask whether the person sounds like the same person everywhere.

2. **Hebrew vs English vs claimed identity**
- If a user posts in Hebrew elsewhere, compare that to how they present in English in `r/ForbiddenBromance`.
- Look for:
  - differences in aggression
  - changes in confidence or candor
  - topic shifts
  - admissions, dog whistles, or rhetoric that would be revealing cross-lingually
- Treat Hebrew not as magic evidence, but as one more signal to test.

3. **Transliterated Lebanese Arabic heuristics**
The user explicitly believes transliteration can reveal fake Lebanese identity performance.
Examples given by the user are heuristic only, not dogma:
- `-eh` / `-e` endings vs `-a`
- `ou` vs `u`
- `ch` vs `sh`
- `ei/ey` vs `ay/ai`
- `el` vs `al`
- Arabizi / number usage nuances
- absence of Egyptian-style `g`

Do not overclaim from one spelling choice. Use transliteration as part of a stacked contradiction model.

4. **Hostility / fight-thread extraction**
Isolate arguments, bitter exchanges, insults, passive-aggressive chains, identity challenges, and sectarian fights.
Log:
- users involved
- date
- language
- flair
- thread topic
- whether the conflict aligns with a real-world event window

5. **Narrative currents that matter**
The user explicitly wants these tracked and visualized:
- anti-Hezbollah / anti-Shia framing
- Christian militia nostalgia / historical cooperation framing
- normalization / peace-branding
- Palestine avoidance or suppression
- anti-Iran framing
- anti-Lebanese-state / blame-Lebanon framing
- annexation / buffer-zone / Litani rhetoric
- leaflet / QR / psychological-warfare reactions

6. **Real-world joins**
Continue correlating subreddit activity with:
- Lebanon-Israel conflict events since `2023-10-07`
- daily ceasefire violations from `2024-11-27` onward
- Lebanese local Arabic/French/English reporting
- obscure names, villages, neighborhoods, and security incidents

## 7. Current app state
There is an existing Next.js app in:
- `/Users/joeyq/Desktop/bromance/luro-ai`

Important:
- This app contains useful plumbing, data adapters, tests, metadata, and screenshots.
- It also contains unwanted visual/design inheritance from the older `luro-ai` shell.
- The user does **not** want the next phase to continue from the current visual direction.

Treat the current app as a **salvage/reference source**, not as the final design direction.

### Useful things to salvage
- Next.js/Tailwind app plumbing
- dependency set from `package.json`
- existing SEO/metadata scaffolding
- existing tests under:
  - `/Users/joeyq/Desktop/bromance/luro-ai/tests`
- existing site-data builder:
  - `/Users/joeyq/Desktop/bromance/scripts/build_poison_site_data.py`
- existing merged site dataset:
  - `/Users/joeyq/Desktop/bromance/phase2_outputs/site/poison_site_data.json`
- existing Playwright screenshot outputs under:
  - `/Users/joeyq/Desktop/bromance/luro-ai/output/chrome-checks`

### What to discard visually
- anything that reads like old `Luro AI`
- generic SaaS marketing shapes
- clean glass dashboard as the primary design language
- normal hero/about/pricing-style page structure

## 8. Required product structure
The site should not feel like a typical website.
It should drop the user directly into the investigation.

### Desired high-level structure
- homepage/entry = immediate thesis + method + evidence posture
- not a soft landing page
- not a generic product homepage
- more like a live dossier / evidence console / investigation engine

### Working shape
A strong recommendation for the new model:
- `direct dossier` at `/`
- integrated workbench, not a separate app-feeling silo
- still allow deep drill-down routes for:
  - timeline
  - narratives
  - users
  - Hebrew
  - events
  - sources
  - rhetoric
  - evidence

Every major chart or visualization should have science-magazine-style explainer captions.

## 9. Visual direction
The user wants a full pivot.

### Primary design language
- heavy ASCII / textmode / terminal / hacker / cyberpunk
- not neo-brutalist
- not smooth generic glass SaaS
- not old `Luro`

### Core references to use
Use these as primary visual references:
- `https://react-ascii-ui-docs.vercel.app/`
- `https://textmode.art/`
- `https://p5.textmode.art/`

Important correction:
- if using p5-based ASCII rendering, prefer `p5.asciify`
- do **not** pivot the implementation around a supposed `textmode.js` package

The user also wants a Morph-like feel for motion and stacking behavior:
- animated card stacks
- dot-matrix typography
- moody black/green/gray or neon cyberpunk palette
- but grounded in the React ASCII UI design language

The user explicitly wants Gemini to use its own image-generation capability where available (described by the user as Nano Banana 2) to generate custom ASCII-styled cyberpunk art rather than relying only on static decoration.

### Component sourcing hierarchy
Use this order:
1. `React ASCII UI` as the main component language
2. `ReactBits` / `Magic UI` / `Aceternity UI` for gaps
3. custom components built in the same ASCII/cyberpunk grammar

### Important visual motifs
The user provided references that imply:
- ASCII band separators
- ASCII eye sigil / evidence seal
- ASCII glyph watermarks
- circuit-routing / motherboard / CPU-like connector lines between major surfaces
- bounded internal card animations rather than generic full-page shader blobs
- dot-matrix fonts used intentionally and heavily
- 1980s terminal silhouettes and panel shapes

The all-seeing eye is the primary mascot / emblem of the site.
Use it for:
- hero art direction
- evidence seals
- favicon / app icon (from a non-ASCII eye source)
- ASCII hero reinterpretations and animated variants

### Motion
- low-burn ambient motion, not chaos
- subtle scanlines / drift / cursor-reactive glow
- bounded animated backgrounds inside cards/buttons/panels
- tasteful glitch, not glitch spam
- website background itself should also be animated in ASCII, but remain subordinate to readability

Use the referenced ASCII HTML animations as inspiration and, where practical, direct bounded assets for:
- card interiors
- bento modules
- panel backgrounds
- selected decorative surfaces
not just the full-page background.

## 10. Charts and interaction
Charts are central and must be much stronger than the current pass.

Requirements:
- highly interactive
- filterable
- hover-reactive
- exportable as image / CSV where useful
- responsive with **mobile-specific render strategies**, not just scaled-down desktop charts
- accompanied by interpretation text / captions

The user explicitly referenced:
- React ASCII UI chart demos
- Apache/Recharts-style React charts for anything missing

Interpretation:
- use ASCII-native charting where possible
- use `recharts` or custom SVG only where ASCII-native components are insufficient
- whenever feasible, convert charts, labels, ticks, and markers into ASCII-styled rendering instead of plain modern SVG aesthetics

## 11. Mobile quality bar
This is non-negotiable.
The user explicitly wants sophisticated mobile behavior.

Meaning:
- not simply resizing desktop layouts
- dedicated small-screen rendering for charts, bars, matrices, and timelines
- centered, visually intentional compositions
- mobile should feel like its own designed system
- all visual QA must include desktop + mobile breakpoints

## 12. Browser testing / before-after workflow
The user explicitly wants browser-led visual accuracy.

For Antigravity, use the built-in browser as the primary inspection and screenshot tool:
- before screenshots
- after screenshots
- desktop and mobile
- browser inspection as part of creative iteration, not just QA

Do not treat Playwright as required for the Antigravity phase unless the built-in browser becomes insufficient.

## 13. Root migration requirement
The user wants the active website root to be:
- `/Users/joeyq/Desktop/bromance`

Not nested under:
- `/Users/joeyq/Desktop/bromance/luro-ai`

### Migration intent
The next model should:
- promote the active web app to the project root
- preserve needed dependencies / config / tests / SEO plumbing
- avoid carrying forward old branding and old layout assumptions
- archive or remove `luro-ai` once the new root app is stable

### Practical recommendation
Do this safely:
1. create the new root app structure in `/Users/joeyq/Desktop/bromance`
2. copy only the plumbing and data assets you actually need
3. get the new root app booting and passing tests
4. only then archive/delete the old `luro-ai` directory

Do **not** blindly drag the entire old app upward and keep all the old assumptions.

## 14. Git / repo requirement
The user created a new GitHub repo:
- `https://github.com/joeyqleq/fbromance`

The next model should:
- use this as the canonical remote for the rebuilt root project
- not preserve the old `luro-ai` remote as the public identity of the project

## 15. Additional design-specific directives
- headings should use a strong dot-matrix / terminal display style similar to the Morph reference
- buttons, cards, tabs, and separators should read like old terminal / industrial console hardware
- use the non-ASCII eye logo as favicon / app icon source
- preserve SEO work in the rebuild
- re-integrate Tianji and Matomo analytics in the new root app
- use wireframe / line-heavy SVG decoration as a source for ASCII conversions and foreground/background ornament

## 16. Local art and animation references
Use these local files as concrete references or source material during the redesign:
- `/Users/joeyq/Desktop/joe-maari-interactive-cv/public/ascii_animations/ascii_animation_1.html`
- `/Users/joeyq/Desktop/joe-maari-interactive-cv/public/ascii_animations/ascii_animation_2.html`
- `/Users/joeyq/Desktop/joe-maari-interactive-cv/public/ascii_animations/ascii_animation_3.html`
- `/Users/joeyq/Desktop/joe-maari-interactive-cv/public/ascii_animations/ascii_animation_4.html`
- `/Users/joeyq/Desktop/main logo.svg`
- `/Users/joeyq/Desktop/eye.png`
- `/Users/joeyq/Desktop/decor_third_eye 1.svg`

A previously referenced file path was not found during handoff generation:
- `/Users/joeyq/Desktop/10410822.svg`
If the user later restores it, inspect and use it too.

## 17. Expected first implementation sequence in Antigravity
Recommended order:
1. finish environment parity (MCPs + skills)
2. inventory and preserve current data artifacts
3. build a clean root-level Next.js app skeleton at `/Users/joeyq/Desktop/bromance`
4. wire the merged dataset into a new, investigation-first IA
5. build the ASCII/textmode visual system
6. implement primary dossier sections
7. deepen analysis logic for contradiction/persona/fight-thread/cross-subreddit views
8. run Playwright before/after visual checks for desktop and mobile
9. only then consider archiving/removing `luro-ai`

## 18. Quality bar
The user wants a result that feels like:
- an A+++ portfolio piece
- highly creative
- highly polished
- analytically rich
- visually distinct
- deeply responsive
- clearly beyond a generic dashboard or generic story site

## 19. Important warning
Do not confuse data volume with analytical quality.
The user is dissatisfied with descriptive dashboards that merely restate counts.
The next model must push into:
- stacked-contradiction scoring
- persona consistency analysis
- multilingual identity/performance comparison
- event-triggered behavioral analysis
- thread-level hostility extraction
- evidence-led visual storytelling

## 20. Immediate next action for Antigravity
After MCP/skill parity:
- read this handoff file
- inspect the key artifacts listed in `ARTIFACT_MANIFEST.md`
- decide what to salvage from `luro-ai`
- start the root migration and redesign from scratch
- keep the existing research/data, throw away the old visual language
- before designing charts, restate the analytical question in terms of evidence tests and redesign the data studio around those tests
