# ███ POI5ON.M3 — MASTER BUILD PROMPT ███
# For: Gemini 3.1 Pro inside Anti-gravity
# Prepared by: Claude (Anthropic) — March 2026
# Project root: /Users/joeyq/Desktop/bromance
# Domain: poi5on.me (stylized as poi5on.m3)

---

## ⚠️ READ THIS FIRST — BEFORE TOUCHING ANY FILE

You are the design and engineering agent for `poi5on.m3`. This prompt is your **complete, authoritative brief**. Everything you need is here plus the MCP servers and assets attached. Read every section before writing a single line of code. The human will not be explaining things twice.

**Invoke these Anti-gravity workflows now, before starting:**
- `frontend-design`
- `nextjs-expert`
- `tailwind-design-system`
- `Setup Next.js SEO sitemap robots`
- `Design System Components`
- `brand-guidelines`
- `artifacts-builder`
- `canvas-design`

---

## 1. PROJECT IDENTITY

| Property | Value |
|----------|-------|
| Site name | **poi5on.m3** |
| Domain | `poi5on.me` |
| Stylized display | `POI5ON.M3` (in Doto font) |
| Tagline | `A data-driven investigation into wartime narrative behavior on r/ForbiddenBromance` |
| Sub-tagline / descriptor | `When a peace forum looks like something else entirely.` |
| Project root | `/Users/joeyq/Desktop/bromance` |
| Framework | Next.js 14 (App Router, already scaffolded) |
| Deployment | Vercel (already connected) |
| Repo | `https://github.com/joeyqleq/fbromance` |

---

## 2. CODEBASE SITUATION — WHAT TO DO FIRST

The project root at `/Users/joeyq/Desktop/bromance` contains a **Next.js 14 app that was scaffolded from a GitHub template** and deployed to Vercel as a placeholder. **Nothing from the current visual design, pages, or components should be kept.** It is being completely rebuilt.

### Decision: Keep the scaffolding, delete the content
**Do not** delete the Next.js scaffolding, `node_modules`, `package.json`, `tailwind.config.ts`, `tsconfig.json`, `next.config.mjs`, or `postcss.config.mjs`. The dependency tree is already solid (see below — recharts, framer-motion, radix, etc. are all there).

**DO delete** everything under:
- `src/app/(main)/` — all old pages
- `src/app/(marketing)/` — all old pages
- `src/components/` — all old components
- `src/data/` — all old data files
- `src/constants/` — all old constants (rebuild fresh)
- `src/functions/` — all old functions (rebuild fresh)
- `src/hooks/` — all old hooks
- `src/styles/globals.css` — rebuild from scratch with new design system

**Keep:**
- `src/app/layout.tsx` — update it, don't delete
- `src/app/icon.tsx` — update with new favicon
- `src/app/opengraph-image.tsx` — update
- `src/app/robots.ts`, `sitemap.ts`, `manifest.ts` — update for new sitemap
- All config files at root

### Reorganize the data pipeline files
Move the following from the project root into `/data/` (create this directory):
```
/data/phase2_outputs/  ← move from phase2_outputs/
/data/phase3_outputs/  ← move from phase3_outputs/
/data/external_research/  ← move from external_research/
/data/raw/  ← move from raw/ (do NOT commit this — add to .gitignore)
```

The raw Reddit JSON files in the project root (`r_ForbiddenBromance_*.json`, `*.ndjson`, `*.json_part_*`) — move them to `/data/raw/` and add `/data/raw/` to `.gitignore`.

Python scripts (`*.py`) at root — move to `/scripts/`.

Analysis markdown files (`phase2_*.md`, `phase3_*.md`, `cleaned_archive_schema.md`, etc.) — move to `/docs/analysis/`.

The primary frontend-ready data file lives at:
`/Users/joeyq/Desktop/bromance/phase2_outputs/site/poison_site_data.json`
After reorganization: `/data/phase2_outputs/site/poison_site_data.json`
This is the canonical dataset the frontend reads from.

---

## 3. UPDATED THESIS — THE HASBARA CULTURE FRAME

### What this investigation found

This is **not** an exposé of a Mossad intelligence operation. That framing was considered and rejected — the data does not support it, and overclaiming destroys credibility.

What the data **does** support — and what this site argues — is something more structurally significant:

> **r/ForbiddenBromance does not function as a neutral peace forum. It functions as an asymmetric wartime narrative arena, where the dominant participation patterns, rhetorical behaviors, and event synchronization reflect what researchers and journalists have called "hasbara culture" — a diffuse, socially-reproduced orientation toward shaping foreign-facing narratives about Israel, which operates without central coordination, scales through social reinforcement, and activates with measurable intensity during Israeli military operations.**

### The three pillars of the thesis

**Pillar 1: Wartime synchronization is real and measurable.**
The two highest-activity months in the entire archive — September 2024 (z-score: 4.611) and October 2024 (z-score: 4.507) — coincide precisely with the IDF assassination of Nasrallah (Sept 27), the pager/walkie-talkie operations, and the ground incursion into South Lebanon. Activity does not just increase — it reorients around specific framing patterns.

**Pillar 2: Rhetorical mode-switching is documented across contexts.**
Multiple high-volume Israeli and diaspora-Israeli participants demonstrably use different rhetorical emphasis when addressing Lebanese audiences inside r/ForbiddenBromance vs. their behavior in r/Israel or r/lebanon. Key examples:
- `tFighterPilot` (Israeli): Palestine framing +23.1pp, Anti-Hezbollah +12.9pp when facing Lebanese audience
- `No-Mathematician5020` (Diaspora Israeli): Security +23.3pp, Anti-Hezbollah +21.5pp in Lebanon contexts
- `FriendlyJewThrowaway` (Diaspora Jew): Anti-Hezbollah DOWN 22.1pp inside FB vs. Israel contexts — classic softening/audience-calibration behavior

**Pillar 3: The fight-thread architecture is not random.**
The highest-conflict threads cluster systematically around: Lebanese accountability for Hezbollah, normalization conditionality, anti-Semitism attribution to Lebanese society, and Palestinian blame-deflection onto Arab states. The subreddit's own participants have raised this — one Hebrew-language comment explicitly reads: *"Israelis, stop entering this sub. It is not for us; let the Lebanese there speak."* A thread titled *"this sub is just a bunch of Israelis talking to each other"* exists (2025-01).

### The counter-thesis (must be included)
Lebanese-flair users in the tracked sample post predominantly in Lebanese contexts outside this sub. Their transliteration signals are linguistically authentic. The data does not support a fake-Lebanese-identity claim. This site acknowledges that honestly.

### Attribution level
The evidence reaches: **coordination-like, actor-aligned.** It does not reach state-directed. The site is explicit about this boundary and says so on a dedicated page.

### The hasbara culture explanation
Hasbara culture does not require a handler. It is a socially-reproduced behavioral norm in Israeli and diaspora-Israeli online communities. It scales without coordination. It is deniable. It activates during wartime because those are the stakes. The site documents the pattern — not a conspiracy, but a culture. And a culture is, if anything, a harder problem.

---

## 4. CONTENT — THE WEBSITE COPY

### Voice and tone
- Analytical, precise, forensic
- First-person is used only on the Letter/About page
- Everywhere else: neutral investigator voice — not "we Lebanese," not "the Arabs," not "the enemy"
- Reads like a well-written intelligence brief crossed with a long-form data journalism piece
- Unsentimental but not cold
- Never claims more than the data supports
- Never claims less than it does to seem polite

### Page-by-page copy follows in Section 6.

---

## 5. SITEMAP

```
/                           ← Landing page (ASCII hero, no nav)
/dossier                    ← The narrative investigation (scrollable story)
  /dossier/wartime          ← Wartime synchronization section
  /dossier/rhetoric         ← Rhetorical mode-switching section
  /dossier/arena            ← Fight-thread architecture section
  /dossier/hasbara          ← Hasbara culture explanation section
  /dossier/counterevidence  ← What the data does NOT show
  /dossier/attribution      ← The confidence ladder / what remains unproven
/analyst                    ← The full interactive workbench
  /analyst/overview         ← High-level metrics dashboard
  /analyst/timeline         ← Monthly activity + event overlay
  /analyst/users            ← Actor profiles + cross-context behavior
  /analyst/rhetoric         ← Narrative category tracking
  /analyst/threads          ← Fight-thread catalog
  /analyst/hebrew           ← Hebrew subset analysis
  /analyst/sources          ← Source/domain ecology (if data available)
/dispatch                   ← Letter from the creator + donate
/method                     ← Methodology, data sources, guardrails
```

### Nav structure (appears after scroll from landing)
Boot-up terminal sequence reveals a two-item primary nav:
- `[DOSSIER]` → `/dossier`
- `[ANALYST]` → `/analyst`

Secondary nav items (smaller, right-aligned or in a sub-row):
- `[METHOD]` → `/method`
- `[DISPATCH]` → `/dispatch`

On mobile: collapsible drawer with terminal-style animation.

---

## 6. PAGE-BY-PAGE SPECS

### PAGE: `/` — Landing Hero

#### Structure
Full viewport. No navbar. No scroll indicator. Just the experience.

**Layer 1 (background, z-index: 1):**
The ASCII animation from `/public/images/ascii_landing_react.js`.

Extract only the canvas rendering engine from this file. Strip all demo text (`MATERIAL SYSTEMS`, `DIGITAL GEOGRAPHY`, `exploring the topology`, all hero titles, all panel text). Keep: the canvas-based ASCII character animation, mouse reactivity, the `#00ff41` green color scheme, the `#000000` background, the font rendering logic.

This animation should fill **70vh** of the landing viewport.

**Layer 2 (over Layer 1, z-index: 2):**
The eye logo from `/public/images/brand/logo_and_hero.png` — convert/rasterize it into an ASCII character art representation. Use a character-density-based approach: dark areas → dense characters (`@`, `#`, `W`), mid tones → medium (`+`, `=`, `-`), light areas → sparse (`.`, ` `). The resulting ASCII eye should be:
- Centered horizontally and vertically within the 70vh canvas zone
- Large — occupying roughly 40% of the canvas width
- Rendered in the same `#00ff41` green
- Animated: characters slowly cycle/shimmer/glitch in place, as if the eye is alive
- Layered OVER the ASCII field animation without blending — the eye ASCII art should be visually distinct from the background animation

**Layer 3 (bottom 30vh, z-index: 3):**
A panel zone below the canvas. Black background. Top border: 1px solid `#00ff41`. Three-column grid (2fr 1fr 1fr), identical layout to the original React export's `panel-zone`.

**Left column content:**
```
[mono label] SIGNAL ANALYSIS // OPEN SOURCE
[editorial text]
A researcher encountered r/ForbiddenBromance —
a subreddit where Israelis and Lebanese talk.
What began as curiosity about anomalous patterns
became a structured investigation into whether
a self-described peace forum behaves like one.
This is the data. These are the findings.
Judge for yourself.
```

**Middle column content:**
```
[mono label] STATUS
ACTIVE — DATA LOCKED 2026-03-19

[mono label] ARCHIVE
88,094 COMMENTS
4,895 POSTS
28 ACTOR PROFILES
6+ YEARS OF DATA

[mono label] SUBJECT
r/ForbiddenBromance
```

**Right column content:**
```
[mono label] NAVIGATION
→ [DOSSIER]
→ [ANALYST]
→ [METHOD]
→ [DISPATCH]

[mono label] SYS.TIME
[live UTC clock]
```

**Corner buttons (fixed, like original React export):**
- Top-left: `POI5ON.M3` in Doto font, links to `/`
- Top-right: `[INDEX]` — triggers the nav overlay on click
- Bottom-left / bottom-right: remove the demo text, replace with:
  - Bottom-left: `EST. 2026 // BEIRUT → GITHUB`
  - Bottom-right: `OPEN INVESTIGATION`

#### Geometric decorations
The 7 SVG files from `/public/images/decorations/` (`lines-1.svg` through `lines-10.svg`):
- Place them as background layers behind both canvas and panel zones
- Spread across the full viewport — no two overlapping, tasteful spacing
- Opacity: 8-15% so they don't fight the ASCII animation
- Color: remap all strokes to `#ff0080` (the brand pink) at low opacity
- Animation: Along each thin line of each SVG shape, animate a glowing beam/pulse that travels the path of the line, as if electricity flowing through a circuit. The beam should:
  - Be the same pink `#ff0080` at higher opacity (40-60%)
  - Have a gaussian blur glow effect (~4-8px)
  - Travel at different speeds on different shapes (3s to 8s loop)
  - Use CSS or canvas animation — if using the `anim.js` MCP, use it; otherwise pure CSS keyframe `stroke-dashoffset` animation on SVG paths is the correct approach

#### Scroll transition
When the user scrolls past 100vh (into the second viewport), trigger:
1. The ASCII canvas fades slightly (opacity 0.3)
2. A terminal boot-up sequence plays in the center of the screen:
```
> INITIALIZING POI5ON.M3...
> LOADING DOSSIER MODULES............. OK
> LOADING ANALYST WORKBENCH........... OK
> MOUNTING EVIDENCE STORE............. OK
> SIGNAL READY.
```
3. This resolves into the persistent top navigation bar with: `POI5ON.M3` left-anchored in Doto + `[DOSSIER]` `[ANALYST]` `[METHOD]` `[DISPATCH]` right-anchored.

Use the `@kokonutui/toolbar` component for the toolbar animation. Style it to match the design system.

---

### PAGE: `/dossier` — The Narrative Investigation

This is the story. It scrolls. It uses data visualizations to prove each point. Think of it as a long-form data journalism piece formatted like a movie — cards, charts, callouts, terminal-style reveals, ASCII section dividers.

#### Section 1: The Opening Statement

```
HEADLINE (Doto, massive):
THE PEACE FORUM THAT WASN'T

BODY (Space Grotesk, editorial):
r/ForbiddenBromance was created in 2019 as a space for Israelis and Lebanese 
to talk across the conflict. It has 88,094 comments, 4,895 posts, 
and six years of recorded history.

This investigation analyzed all of it.

What we found was not a Mossad operation.
What we found was more interesting — and more disturbing — than that.
```

ASCII divider: `━━━ CHAPTER 01 // WARTIME SIGNALS ━━━`

#### Section 2: Wartime Synchronization

```
HEADLINE: THE SPIKES DON'T LIE
```

**Visualization A: Monthly Activity Timeline**
Full-width horizontal bar chart (Recharts `BarChart`). X-axis: months from 2019 to 2026. Y-axis: comment count. Bars animated — they rise from zero when scrolled into view, at staggered timing, different rise speeds. Color: dark bars with `#ff0080` glow on spike months.

Vertical event marker lines (dashed `#00ff41`) with labels:
- Oct 2023: `HAMAS ATTACK / GAZA WAR BEGINS`
- Jun 2024: `HEZBOLLAH SOUTHERN FRONT INTENSIFIES`
- Aug 2024: `TARGETED ASSASSINATIONS BEGIN`
- Sep 17-18, 2024: `PAGER/WALKIE-TALKIE OPERATIONS`
- Sep 27, 2024: `NASRALLAH ASSASSINATED`
- Oct 2, 2024: `IDF GROUND INCURSION — S. LEBANON`
- Nov 27, 2024: `LEBANON CEASEFIRE`

Callout box over Sep 2024 bar:
```
z-SCORE: 4.611
STATISTICALLY ANOMALOUS
6,634 COMMENTS IN 30 DAYS
```

**Copy block:**
```
The two highest-activity months in this subreddit's entire six-year history 
are September 2024 and October 2024. Their statistical z-scores — 4.611 and 4.507 — 
place them far outside normal variation.

These months correspond, to the day, with Israel's assassination of Hassan Nasrallah, 
the pager and walkie-talkie operations against Hezbollah, and the IDF ground incursion 
into South Lebanon.

The subreddit did not simply report on these events. 
It processed them — with identifiable, repeating framing patterns.
```

ASCII divider: `━━━ CHAPTER 02 // AUDIENCE MANAGEMENT ━━━`

#### Section 3: Rhetorical Mode-Switching

```
HEADLINE: DIFFERENT VOICE, DIFFERENT ROOM
```

**Visualization B: Context-Shift Heatmap Table**
A styled table/grid — not a boring HTML table but a dark-panel bento-style layout. Columns:
`USERNAME | FLAIR | INSIDE r/FB (Peace% / Security% / Anti-Hezb%) | OUTSIDE (Lebanon context) | SHIFT SCORE`

Show top 8 users from `persona_context_scores.csv`. Color-code delta cells: green = softened inside FB, red = hardened inside FB.

Key users to highlight (with call-outs):
- `tFighterPilot`: "Palestine framing increases +23.1pp when talking to Lebanese"
- `FriendlyJewThrowaway`: "Anti-Hezbollah rhetoric drops 22.1pp inside the bromance space — classic audience softening"
- `No-Mathematician5020`: "Security framing spikes +23.3pp in Lebanon-facing contexts"

**Copy block:**
```
Rhetorical mode-switching is not proof of deception. 
Everyone adjusts their tone for their audience.

But the pattern here is directional and consistent. 
Multiple high-volume Israeli and diaspora-Israeli participants 
measurably calibrate their rhetoric when they know Lebanese users are reading.
The adjustments — toward softer anti-Hezbollah framing, 
toward more security-forward arguments, 
toward Palestinian blame-deflection — 
are not random noise. They are a pattern.

This is what researchers studying online influence call audience management.
It does not require a script. It does not require a handler.
It only requires a shared understanding of what the goal is.
```

ASCII divider: `━━━ CHAPTER 03 // THE ARENA STRUCTURE ━━━`

#### Section 4: Fight-Thread Architecture

```
HEADLINE: WHO PUTS WHOM ON TRIAL
```

**Visualization C: Fight Thread Catalog**
A sortable, scrollable card-stack of the top 30 highest-conflict threads. Each card shows:
- Thread title (truncated)
- Month
- Fight score (displayed as a horizontal mini-bar)
- Hostility count badge
- Identity challenge count badge
- Post author flair

Cards animate in on scroll (staggered reveal). Hover expands card slightly with a glow border.

**Topic cluster visualization:**
A bubble/treemap chart showing that fight threads cluster around these topics:
- Lebanese accountability for Hezbollah (largest cluster)
- Normalization conditionality
- Anti-Semitism attribution
- Palestinian blame-deflection
- Israeli military action justification

**Copy block:**
```
The highest-conflict threads in r/ForbiddenBromance are not randomly distributed 
across topics. They cluster.

They cluster around questions that place Lebanese users in the position 
of defendant — required to explain, justify, or denounce Hezbollah 
before any conversation about peace can proceed.

Threads titled:
"Why do Lebanese people hate Israeli unproprtionally..."
"For the stupid Lebanese that participate in this sub. Please wake up"
"Would the Lebanese be less hostile if they understood Israel doesn't want to conquer Lebanon?"
"Lebanese people can't control Hizbollah, we don't deserve to be hit"

This is not balanced dialogue. 
This is a structured interrogation format 
wearing the costume of a peace forum.
```

ASCII divider: `━━━ CHAPTER 04 // THE CULTURE ━━━`

#### Section 5: The Hasbara Culture Explanation

```
HEADLINE: NOT A CONSPIRACY. A CULTURE.
```

**Copy block:**
```
The word "hasbara" is Hebrew for "explaining." 
In practice, it has come to describe a diffuse, socially-reproduced orientation 
in Israeli and diaspora-Israeli communities — an instinct to actively shape 
foreign-facing narratives about Israel, especially in wartime.

Hasbara culture does not require a government handler.
It does not require a Mossad officer monitoring Reddit.
It spreads through media ecosystems, through social reinforcement, 
through the accumulated weight of a society that has been told, 
from childhood, that the world misunderstands it 
and that correcting that misunderstanding is a civic duty.

The pattern we documented in r/ForbiddenBromance is consistent 
with hasbara culture operating at scale.
Heavy participants with deep roots in Israeli-facing online ecosystems 
who activate during military operations, 
calibrate their rhetoric for Lebanese audiences, 
and consistently frame the conversation 
around Lebanese accountability rather than bilateral understanding.

We are not saying these individuals are agents.
We are saying the behavioral pattern is recognizable.
And we are saying the pattern has consequences for the Lebanese participants 
who come to this space looking for actual dialogue.
```

**Visualization D: Participation Asymmetry**
Two side-by-side stat blocks:
```
LEFT:                              RIGHT:
TOP 5 ISRAELI-CONTEXT              TOP 5 LEBANESE-CONTEXT
HEAVY PARTICIPANTS                 HEAVY PARTICIPANTS

IbnEzra613                         victoryismind
38,766 outside Reddit comments     3,137 FB comments
903 in r/ForbiddenBromance         3,195 outside Lebanon-related

Tamtumtam                          cha3bghachim  
9,105 Israel-related outside       1,124 FB comments
6,598 Hebrew-language items        2,011 outside Lebanon-related
465 in r/ForbiddenBromance
```

ASCII divider: `━━━ CHAPTER 05 // WHAT WE CANNOT SAY ━━━`

#### Section 6: Counterevidence

```
HEADLINE: THE DATA DOES NOT SHOW EVERYTHING WE SUSPECTED
```

**Copy block:**
```
Intellectual honesty requires stating this plainly.

The tracked sample of Lebanese-flair users shows that 
0 of them comment more in Israel-related subreddits than in Lebanon-related ones.
Their linguistic patterns — dialect-specific Arabizi, Lebanese transliterations — 
are consistent with authentic Lebanese origin.

The fake-Lebanese-identity hypothesis is not currently supported by the data.

Some of the most heated fights in this subreddit were started by 
Lebanese-flair users themselves.
The subreddit does contain genuine voices.
The subreddit does contain genuine cross-border conversations.

The problem this investigation documents is not impersonation.
It is the architecture of the space itself — 
who dominates it, when they arrive, and what they consistently push.
```

**Visualization E: Transliteration authenticity samples**
Show 6-8 excerpts from `transliteration_signals.csv` — real Arabizi/Lebanese dialect comments from Lebanese-flair users. Display them as terminal-style quote cards with the linguistic pattern annotated.

ASCII divider: `━━━ CHAPTER 06 // THE CONFIDENCE LADDER ━━━`

#### Section 7: Attribution Boundary

```
HEADLINE: WHERE THE EVIDENCE STOPS
```

**Visualization F: Confidence Ladder**
A vertical timeline/ladder with 5 rungs, animated from bottom to top on scroll:

```
RUNG 1: SUSPICIOUS
Wartime activity spikes, heavy participant volume,
fight-thread topic clustering. Observable. Documented.
[STATUS: CONFIRMED BY DATA] ← green indicator

RUNG 2: COORDINATION-LIKE
Audience-calibrated rhetoric, event synchronization,
recurrent framing patterns across unconnected actors.
[STATUS: CONFIRMED BY DATA] ← green indicator

RUNG 3: ACTOR-ALIGNED
Behavioral patterns consistent with hasbara culture
as documented in academic and journalistic literature.
[STATUS: CONFIRMED BY DATA] ← green indicator

RUNG 4: STATE-ADJACENT
Accounts receiving direction from state or para-state actors.
[STATUS: NOT ESTABLISHED — EVIDENCE INSUFFICIENT] ← amber indicator

RUNG 5: STATE-DIRECTED
Mossad or specific state intelligence service managing operations.
[STATUS: NOT IN EVIDENCE — NOT CLAIMED] ← red indicator
```

**Copy block:**
```
This investigation reaches Rung 3.

What would be needed to reach Rung 4:
— Account creation date clustering relative to geopolitical events
— Source/domain ecology showing coordinated link-sharing
— Verified coordination infrastructure (shared accounts, 
   synchronized posting schedules, recoverable communication)
— Moderation asymmetry showing agenda enforcement in content removal patterns

What would be needed to reach Rung 5:
— Direct evidence of state direction
— Something this data cannot provide

We do not speculate beyond what the evidence shows.
The evidence is already significant.
```

---

### PAGE: `/analyst` — The Interactive Workbench

This is the full data dashboard. Think: a macOS/Linux terminal-style financial intelligence console. Dark. Dense. Interactive. Functional.

#### Layout
- Left sidebar (240px): navigation tree (see below)
- Top bar: search (`@kokonutui/action-search-bar`), filter controls, date range picker (custom-styled in brand theme), export button
- Main content area: changes based on selected module
- All powered by `poison_site_data.json` as the primary data source

#### Left sidebar navigation (use `@kokonutui/toolbar` for animation)
```
POI5ON.M3 [logo]
─────────────────
ANALYST CONSOLE
─────────────────
▸ OVERVIEW
▸ TIMELINE
▸ ACTORS
  ▸ By Flair
  ▸ Context Shifts
  ▸ Identity Review
▸ RHETORIC
  ▸ Narrative Trends
  ▸ Fight Threads
  ▸ Language Patterns
▸ HEBREW SUBSET
▸ EVENTS
  ▸ Conflict Timeline
  ▸ Spike Correlation
▸ SOURCES
─────────────────
← DOSSIER
```

#### Module: OVERVIEW
Stats grid (bento layout):
- Total comments: 88,094
- Total posts: 4,895
- Hebrew-bearing items: 1,269 (77 posts + 1,192 comments)
- Actor profiles reviewed: 28
- Date range: 2019-12 to 2026-03
- Highest spike month: Sep 2024 (z=4.611)
- Dominant fight-thread topic: Lebanese accountability

Plus a mini version of the timeline chart and a top-5 actors leaderboard.

#### Module: TIMELINE
Full-width monthly bar chart with all the event markers described in the Dossier section. Additional controls:
- Toggle: Show/hide Hebrew comment count overlay
- Toggle: Show/hide event markers
- Range selector: year filter
- On hover over any bar: tooltip showing top 3 posts that month, comment count, Hebrew count, z-score

#### Module: ACTORS
Table of all 28 reviewed actors. Columns:
`Username | Flair | FB Comments | Context Shift Score | Outside Israel-Related | Outside Lebanon-Related | Hebrew Items | Review Priority`

Clicking any row opens a detail drawer (`@kokonutui/smooth-drawer`) showing:
- Rhetorical profile radar chart (Peace / Security / Hostility / Anti-Hezbollah / Palestine) — FB context vs. outside contexts side by side
- Top 5 threads they participated in
- Transliteration signals if any
- Cross-subreddit activity breakdown

**Context Shifts sub-module:**
Heatmap grid. Rows = actors. Columns = rhetoric categories. Cell color = delta (shift toward or away from that category when inside FB vs. outside).

#### Module: RHETORIC / FIGHT THREADS
Full catalog of all fight threads from `fight_threads.csv`. Sortable by:
- Fight score
- Hostility count
- Identity challenge count
- Month
- Post author flair

Each row is clickable → opens a detail panel with the permalink, top rhetoric tags, and a mini character breakdown of who participated.

#### Module: HEBREW SUBSET
Table of all annotated Hebrew items from `HEBREW_ANNOTATIONS` in the build script. Shows:
- Comment ID
- English gloss
- Investigation note
- Signal tags (as badges)
- Month

Filter by signal tag: `threat | meta-discourse | identity-performance | opsec | normalization | peace-branding`

#### Module: EVENTS
The `event_timeline.json` data overlaid on the monthly activity chart. Events displayed as a separate scrollable list below the chart, with each event card showing:
- Date
- Event description
- Subreddit activity delta in the surrounding window
- Source

#### Workbench general UX rules
- All date pickers: custom-styled in brand colors, terminal aesthetic
- All dropdowns: `@kokonutui/profile-dropdown` component, restyled
- All search: `@kokonutui/action-search-bar`, restyled
- Export buttons: CSV export for all tables, PNG export for all charts
- All charts animate on load/scroll-into-view
- Tooltips on every data point
- Empty states: styled with ASCII art + "NO SIGNAL DETECTED" message
- Error states: terminal-style error blocks

---

### PAGE: `/method` — Methodology

```
HEADLINE: HOW THIS WAS BUILT
```

Sections:
1. **Data Sources** — Reddit archive via Arctic Shift API, r/ForbiddenBromance (complete pull), user history profiles for 28 actors, external conflict event timeline
2. **What Was Measured** — monthly activity z-scores, flair-segmented rhetoric categorization, cross-context behavioral shift scoring, Hebrew subset extraction, fight-thread scoring algorithm
3. **What Was Not Measured / Limitations** — flair is self-declared, not verified; cross-subreddit history is a signal not a verdict; transliteration evidence is sparse; no moderation asymmetry data recovered
4. **Guardrails** — list of specific claims NOT made, with explanation of why
5. **Code and Data** — link to GitHub repo
6. **Attribution Threshold Definitions** — the 5-rung ladder explained technically

---

### PAGE: `/dispatch` — Letter from the Creator + Support

```
HEADLINE: A NOTE ON WHY THIS EXISTS
```

**Letter (first person, honest but geographically vague):**

```
I built this because something seemed wrong.

Not wrong in a conspiracy-theory way. Wrong in the way that a conversation 
can feel wrong when you realize the person across from you 
is not actually talking to you — they're managing you.

I came across r/ForbiddenBromance during a period of intense violence 
in a country I care about. I expected to find either propaganda or peace. 
I found something more nuanced, and more instructive.

What began as a hunch became a structured investigation. 
I collected data, built an analysis pipeline, mapped behavioral patterns, 
correlated activity to real-world events, and followed the evidence 
wherever it went — including to conclusions that contradicted my initial assumptions.

The result is this website. It is a data investigation, not a polemic. 
It is a portfolio project, not a manifesto. 
It is open to scrutiny, disagreement, and better evidence.

If you found this useful, or if it made you think, 
that's enough.

If you'd like to support continued work like this — 
other experiments at the intersection of open data, conflict, and online behavior — 
there are a few ways to do that below.

— The researcher behind poi5on.m3
```

**Disclaimer block:**
```
DISCLAIMER: This project analyzes publicly available Reddit data 
accessible via Arctic Shift (arcticshift.com). 
No private data was accessed. No individual is accused of a crime. 
No ethnic or national group is targeted. 
Behavioral patterns observed in data are described as patterns, 
not as personal verdicts.

This is an independent research project with no institutional affiliation 
and no political sponsorship.
```

**Support section:**
```
SUPPORT THIS WORK
```

Four options, displayed as terminal-style cards side by side:

1. **PayPal** — button linking to `https://www.paypal.me/joeyq2`
2. **Ko-fi** — image from `/public/images/brand/support_me_on_kofi_blue.png` linking to `https://ko-fi.com/poi5on`
3. **Crypto (Tron/TRX)** — QR code from `/public/images/brand/qr_tron.png` with label "TRON / TRX NETWORK"
4. **Crypto (Polygon/MATIC)** — QR code from `/public/images/brand/qr_polygon.png` with label "POLYGON / MATIC NETWORK"

---

## 7. DESIGN SYSTEM

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#000000` | Page background |
| `--bg-secondary` | `#0a0a0a` | Card/panel backgrounds |
| `--bg-tertiary` | `#111111` | Raised surfaces |
| `--accent-primary` | `#ff0080` | Brand pink — primary CTAs, borders, highlights |
| `--accent-secondary` | `#00ff41` | Matrix green — terminal elements, live indicators, ASCII |
| `--accent-tertiary` | `#00b4ff` | Cyan — secondary data, secondary indicators |
| `--text-primary` | `#f0f0f0` | Body text |
| `--text-secondary` | `#888888` | Muted/secondary text |
| `--text-mono` | `#00ff41` | Terminal/mono text |
| `--border-primary` | `rgba(255,0,128,0.3)` | Default borders |
| `--border-glow` | `rgba(255,0,128,0.8)` | Glowing borders on hover/focus |
| `--glow-pink` | `0 0 20px rgba(255,0,128,0.4)` | Box-shadow glow |
| `--glow-green` | `0 0 20px rgba(0,255,65,0.4)` | Box-shadow glow |

The color mode is **permanently dark**. No light mode. Remove `next-themes` toggle from UI.

### Typography

**Display font: Doto by Google Fonts**
Used for: all page titles, section headings, the logo `POI5ON.M3`, all `H1` and `H2` elements, stat numbers, nav labels.
Load via: `next/font/google` with `subsets: ['latin']`
```
import { Doto } from 'next/font/google'
const doto = Doto({ subsets: ['latin'], weight: ['400', '700', '900'] })
```

**Body font: Space Grotesk by Google Fonts**
Used for: all body copy, labels, captions, table text, descriptions.
```
import { Space_Grotesk } from 'next/font/google'
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
```

**Mono font: IBM Plex Mono** (already in config)
Used for: data values, code, terminal text, timestamps, stat badges, mono labels.

**Typography scale (use this intentionally — mix sizes for hierarchy):**
- `text-[120px]` Doto 900 — hero numbers, massive callouts
- `text-[80px]` Doto 700 — page headlines
- `text-[48px]` Doto 400 — section headlines
- `text-[32px]` Space Grotesk 600 — sub-headlines
- `text-[24px]` Space Grotesk 400 — large body
- `text-[18px]` Space Grotesk 400 — body
- `text-[14px]` Space Grotesk 400 — small body, captions
- `text-[11px]` IBM Plex Mono UPPERCASE — mono labels, data values
- `text-[9px]` IBM Plex Mono — micro labels, metadata

**Matrix text animation for the `poi5on.m3` heading:**
Use `@kokonutui/matrix-text` component. Apply it to the main logo heading in the nav and landing page top-left corner.

### Borders & Surfaces

All card/panel borders: 1px solid `var(--border-primary)` with `box-shadow: var(--glow-pink)` on hover.
Border radius: 0px for terminal/industrial feel on most surfaces. Use `4px` only for small badges and chips.

**Animated border technique for key elements:**
CSS `@keyframes border-travel` — a gradient that sweeps around the border of a card/panel continuously, simulating a signal traveling the perimeter. Apply to: key stat cards, the confidence ladder, the main chart containers.

### Animations (global rules)

1. **Scroll reveal**: All major sections use Intersection Observer to trigger `opacity: 0 → 1` + `transform: translateY(20px) → translateY(0)` with `duration: 600ms, ease: cubic-bezier(0.16, 1, 0.3, 1)`. Stagger child elements.

2. **Chart entrance**: All chart bars/lines/bubbles animate from 0 on first scroll-into-view. Use Recharts `animationBegin` and `animationDuration` props. Different elements animate at slightly different speeds (200ms–800ms range).

3. **Glitch text**: `@elements/loader-glitch-text` — apply to section-transition labels and loading states. Intensity: `medium` for most uses, `heavy` only for the 404 page.

4. **ASCII character shuffle**: On hover over any heading using the `matrix-text` component, trigger a character-scramble effect that resolves back to the correct text over ~800ms.

5. **Cursor**: Custom cursor — a small `+` crosshair in `#ff0080`. CSS only.

6. **Scanline overlay**: A subtle repeating horizontal scanline texture over the entire page (5% opacity, using the existing `scanline` Tailwind animation in the config).

7. **Pixelation / dithering**: On image elements and section transitions, apply a CSS filter-based pixelation effect on hover, resolving to sharp on mouseout.

### Geometric SVG Background System

The 7 SVG files in `/public/images/decorations/` serve as the global background decoration layer.

Implementation:
- Create a `<BackgroundDecorations />` component
- Render all SVGs as absolute-positioned elements within a fixed-position container behind all page content (`z-index: -1`)
- Assign each SVG a fixed position (spread across the viewport grid — no clustering)
- Remap all stroke colors to `#ff0080` at 10% opacity via CSS `filter` or direct SVG manipulation
- Apply the circuit-board beam animation to each SVG:

```css
/* Per SVG path — stagger the animation delay per shape */
@keyframes circuit-beam {
  0% { stroke-dashoffset: 1000; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

.circuit-path {
  stroke: #ff0080;
  stroke-width: 1.5;
  fill: none;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  filter: drop-shadow(0 0 4px #ff0080) drop-shadow(0 0 8px #ff0080);
  animation: circuit-beam 4s linear infinite;
}
```
Give each shape a different `animation-duration` (3s to 9s) and `animation-delay` (0s to 3s).

---

## 8. COMPONENTS TO INSTALL

Run these install commands. **Always adapt each component to the brand design system after installation.**

```bash
# Toolbar for workbench sidebar menu animation
npx shadcn@latest add @kokonutui/toolbar

# Dropdown lists
npx shadcn@latest add @kokonutui/profile-dropdown

# Search bar with dropdown
npx shadcn@latest add @kokonutui/action-search-bar

# Drawer for contact form and sharing modals
npx shadcn@latest add @kokonutui/smooth-drawer

# Matrix text animation for poi5on.m3 heading
npx shadcn@latest add @kokonutui/matrix-text

# Glitch text loader
npx shadcn@latest add @elements/loader-glitch-text
```

**Before creating any component from scratch**, query these three MCP servers in this order:
1. `reactbits` MCP
2. `magicuidesign` MCP
3. `aceternityui` MCP

Search for the component type needed. If a match exists and is customizable to brand, install and adapt it. If not customizable, build from scratch in the same design language.

**Fallback component library:** `shadcn/ui` (MCP: `shadcn-ui`)

**ASCII motion:** Use the `ascii-motion` MCP for any ASCII-specific animation needs.

---

## 9. DATA MAPPING

### Primary data file
`/data/phase2_outputs/site/poison_site_data.json` (after reorganization)

### Create a Next.js data adapter
`/src/lib/data.ts` — exports typed functions:

```typescript
// Key exports needed:
export function getOverview(): OverviewStats
export function getSpikeMonths(): SpikeMonth[]
export function getFlarBreakdown(): FlairMonth[]
export function getTopAuthors(): TopAuthor[]
export function getInteractionEdges(): Edge[]
export function getDenseThreads(): Thread[]
export function getHebrewAnnotations(): HebrewItem[]
export function getEventTimeline(): Event[]
export function getPersonaScores(): PersonaScore[]  // from phase3 CSV
export function getFightThreads(): FightThread[]    // from phase3 CSV
export function getTransliterationSignals(): Signal[] // from phase3 CSV
```

All data is loaded server-side via `fs` in Next.js server components. **No client-side fetching of raw data files.** Pass data as props to client components that handle interactivity.

### CSV files to parse at build/server time:
- `phase2_outputs/deep/monthly_spikes.csv`
- `phase2_outputs/deep/monthly_flair_breakdown.csv`
- `phase2_outputs/deep/monthly_top_authors.csv`
- `phase2_outputs/deep/dense_threads.csv`
- `phase2_outputs/deep/interaction_edges.csv`
- `phase2_outputs/deep/identity_review_queue.csv`
- `phase2_outputs/deep/user_history_summary.csv`
- `phase3_outputs/contradiction/persona_context_scores.csv`
- `phase3_outputs/contradiction/fight_threads.csv`
- `phase3_outputs/contradiction/transliteration_signals.csv`

Use `papaparse` or native `csv-parse` for CSV parsing in server components.

---

## 10. CHARTS & DATA VISUALIZATIONS

Use **Recharts** as the base library (already installed). All charts must be heavily customized — they should look nothing like default Recharts. Every chart must:

1. Have a dark background (`#0a0a0a`)
2. Use grid lines in `rgba(255,0,128,0.1)` (pink at very low opacity)
3. Render axes in IBM Plex Mono, `#888888`
4. Animate entrance (bars rise, lines draw, etc.) when scrolled into view
5. Have custom tooltips styled as terminal popups (dark panel, mono font, pink border)
6. Be responsive — different layouts for mobile vs desktop
7. Have legends using custom colored dot indicators in brand colors

### Custom chart wrappers to build:
- `<TerminalBarChart />` — wraps Recharts `BarChart` with brand styling
- `<TerminalLineChart />` — wraps Recharts `LineChart` + `ComposedChart` for event markers
- `<TerminalRadarChart />` — for actor rhetoric profiles
- `<TerminalHeatmap />` — for context-shift matrix (custom SVG-based, not Recharts)
- `<ConfidenceLadder />` — custom animated component (not Recharts)
- `<BubbleCluster />` — for topic clustering visualization (D3 or custom SVG)

---

## 11. ANALYTICS — BOTH TRACKERS ON ALL PAGES

### Matomo (self-hosted)
Add to `src/app/layout.tsx` using Next.js `Script` component:

```tsx
import Script from 'next/script'

// In the <head> or after <body>:
<Script id="matomo" strategy="afterInteractive">
  {`
    var _paq = window._paq = window._paq || [];
    _paq.push(["setCookieDomain", "*.poi5on.me"]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="//matomo.p5n.lol/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '8']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
  `}
</Script>
```

For page-view tracking in Next.js App Router, add a `usePathname` effect in a client component wrapper that calls `_paq.push(['trackPageView'])` on route change.

### Tianji
```tsx
<Script 
  src="https://tianji.p5n.lol/tracker.js" 
  data-website-id="cmmoe88u400105fe7ozi3wgc2"
  strategy="afterInteractive"
  defer
/>
```

The existing `PoisonAnalytics` component in `src/components/poison/analytics.tsx` should be refactored to include both trackers.

---

## 12. CONTACT FORM

Modal triggered by a `[CONTACT]` link in the footer. Opens with `@kokonutui/smooth-drawer` animation.

Form fields: Name, Email, Message, Submit.

Backend: Next.js API route at `/app/api/contact/route.ts`
- Uses **Resend** SDK
- API key: from `.env.local` as `RESEND_API_KEY` (already set)
- From: `hasbara@poi5on.me`
- To: `p5n@poi5on.me`
- Subject: `[poi5on.m3] Contact: {name}`

Install Resend: `npm install resend`

Add to `.env.local`:
```
RESEND_API_KEY=re_...  # already set
RESEND_FROM=hasbara@poi5on.me
RESEND_TO=p5n@poi5on.me
```

---

## 13. SEO & METADATA

Update `src/app/layout.tsx` metadata:
```typescript
export const metadata: Metadata = {
  title: 'poi5on.m3 — An Open Investigation into r/ForbiddenBromance',
  description: 'A data-driven investigation into wartime narrative behavior, rhetorical mode-switching, and hasbara culture patterns on r/ForbiddenBromance.',
  keywords: ['hasbara', 'reddit investigation', 'ForbiddenBromance', 'data analysis', 'open source intelligence', 'Lebanon Israel'],
  authors: [{ name: 'poi5on.m3' }],
  openGraph: {
    title: 'poi5on.m3 — The Peace Forum That Wasn\'t',
    description: 'Six years of data. One subreddit. A structured investigation.',
    url: 'https://poi5on.me',
    siteName: 'poi5on.m3',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}
```

Update `sitemap.ts` to include all pages in the sitemap.
Update `robots.ts` to allow all crawlers.

---

## 14. FAVICON & APP ICON

Source: `/public/images/brand/logo_and_hero.png`
Generate: 16x16, 32x32, 180x180 (Apple touch), 192x192, 512x512
Use Next.js `icon.tsx` with the `ImageResponse` API to generate dynamically, or place static PNG files in `/public/`.
The `secondary_ascii_logo.png` can be used as the `apple-touch-icon` if the main logo is too dark at small sizes — your call based on visual inspection.

---

## 15. SHARING & EXPORT

Each major visualization on `/dossier` and `/analyst` gets:
- A small toolbar on hover: `[COPY LINK]` `[EXPORT PNG]` `[EXPORT CSV]` `[SHARE]`
- Share triggers the `@kokonutui/smooth-drawer` with social options: Twitter/X, LinkedIn, copy link
- CSV export: browser-side download using `Blob` API
- PNG export: `html-to-image` or `dom-to-image` library

---

## 16. MOBILE STRATEGY

Every section must have a dedicated mobile layout — not just scaled-down desktop.

Key mobile adaptations:
- Timeline chart: horizontal scroll with pinned axis on mobile
- Actor heatmap: vertical stack of individual actor cards instead of matrix
- Fight thread catalog: full-width single-column cards
- Left sidebar in workbench: collapses to bottom tab bar on mobile
- Landing panel zone: single column stack on mobile
- All charts: minimum 300px height, full viewport width
- Typography: Doto font at 48px max on mobile, Space Grotesk 16px body

---

## 17. IMPORTANT BEHAVIORAL RULES FOR ANTI-GRAVITY

1. **NEVER run `npm run dev` or `pnpm dev`**. The dev server is always started manually by the human. You may check if it's already running.

2. **ALWAYS use the built-in browser** to visually inspect every component before and after implementation. Desktop AND mobile viewport. Check alignment, centering, overflow, and animation behavior.

3. **Check all three MCP component libraries** (reactbits, magicuidesign, aceternityui) before building any new component from scratch.

4. **Use the `ascii-motion` MCP** for any ASCII-specific animation that needs algorithmic generation.

5. **Use NanoBanana 2 (Gemini image generation)** for any custom image or illustration needs — cyberpunk-style backgrounds, section art, decorative elements. Do not use stock art.

6. **The Google Stitch designs** (accessible via `stitch` MCP, project `Evidence Workbench`, project ID `14685015908435121720`) are **inspiration and layout reference**, not one-to-one specifications. The design system (colors, fonts, attitude) should match them as closely as possible. The actual page content has been replaced by the thesis and copy defined in this prompt.

7. **Do not commit `/data/raw/`** to git. Add to `.gitignore`.

8. **Verify before and after** every major component: screenshot in browser, check mobile, check animations fire correctly, check data loads without error.

9. **No AI slop defaults.** If you find yourself about to use a gradient from purple to blue, a glass morphism card, or a generic sans-serif font — stop and reconsider.

10. **Implementation sequence:**
    1. Clean old pages/components from `src/`
    2. Rebuild `globals.css` with design system
    3. Set up fonts (Doto + Space Grotesk + IBM Plex Mono)
    4. Build `BackgroundDecorations` component with SVG circuit animations
    5. Build landing page hero (ASCII canvas + eye overlay + panel zone)
    6. Build scroll-triggered boot sequence + persistent nav
    7. Build `/dossier` narrative sections with all visualizations
    8. Build `/analyst` workbench with data adapter
    9. Build `/method`, `/dispatch` pages
    10. Wire analytics, contact form, sharing
    11. Generate favicon
    12. Full mobile pass
    13. Performance check — lazy load heavy charts, dynamic import ASCII canvas
    14. Push to GitHub

---

## 18. STITCH MCP REFERENCE

To access the design screens for visual reference during development:

```
MCP server: stitch
Project: Evidence Workbench
Project ID: 14685015908435121720

Key screens to reference:
- Design System & Style Guide (screen: 10adafbc7ada4ed7a3b7693060cadd40)
- Landing Hero - Art Piece Edition (screen: f7604dbcdadf491386d85009dc40d7e0)
- Overview Workbench V2 (screen: ef722b5640b4493f9fb5bd8eb4b8332c)
- Timeline Workbench V2 (screen: 2efe475daee14c8eb9d9548e860f48eb)
- Users Workbench V2 (screen: 49e7fb32bcf2425eb060d60dc58b150e)
- Narratives Workbench (screen: d64c53b257dc4df9ab99bb9da0e32b51)
- Hebrew Workbench (screen: 8b0c199e554d4b2b8a7576519f9fb530)
- Charts & Analytics Workbench (screen: d2493eaa4e3a4abd8dbee1210c420977)
- Events Workbench (screen: 1d8e56efc54842f8aa17720059e673a9)
- Relationship Matrix (screen: 6dfcc00413e5490eb2b6a6b0d999d33a)
```

Use `stitch:get_screen` with the project ID and screen ID to retrieve the screenshot and HTML code for each screen.

---

## 19. ASSET REFERENCE — ALL ASSETS ARE ALREADY IN THE CODEBASE

**No files are being attached to this prompt.** All assets are already on disk at the paths below. Read them directly from the filesystem. Do not ask for uploads.

### `/public/images/brand/` — Brand assets

| File | Purpose |
|------|---------|
| `logo_and_hero.png` | **Primary logo.** Use as: (1) favicon source, (2) the image to convert into ASCII character art for the landing hero overlay, (3) OpenGraph image base |
| `secondary_ascii_logo.png` | Secondary/alternate logo. Use for Apple touch icon if primary is too dark at small sizes |
| `qr_tron.png` | Crypto donation QR code — Tron/TRX network. Display on `/dispatch` donate section |
| `qr_polygon.png` | Crypto donation QR code — Polygon/MATIC network. Display on `/dispatch` donate section |
| `support_me_on_kofi_blue.png` | Ko-fi support button image. Link to `https://ko-fi.com/poi5on`. Display on `/dispatch` donate section |

Full paths:
```
/Users/joeyq/Desktop/bromance/public/images/brand/logo_and_hero.png
/Users/joeyq/Desktop/bromance/public/images/brand/secondary_ascii_logo.png
/Users/joeyq/Desktop/bromance/public/images/brand/qr_tron.png
/Users/joeyq/Desktop/bromance/public/images/brand/qr_polygon.png
/Users/joeyq/Desktop/bromance/public/images/brand/support_me_on_kofi_blue.png
```

### `/public/images/decorations/` — Geometric wireframe SVGs

Seven SVG files of geometric wireframe / line-mesh shapes. These are the circuit-board background decoration elements described in Section 7.

```
/Users/joeyq/Desktop/bromance/public/images/decorations/lines-1.svg
/Users/joeyq/Desktop/bromance/public/images/decorations/lines-2.svg
/Users/joeyq/Desktop/bromance/public/images/decorations/lines-3.svg
/Users/joeyq/Desktop/bromance/public/images/decorations/lines-4.svg
/Users/joeyq/Desktop/bromance/public/images/decorations/lines-5.svg
/Users/joeyq/Desktop/bromance/public/images/decorations/lines-7.svg
/Users/joeyq/Desktop/bromance/public/images/decorations/lines-10.svg
```

Apply the circuit-beam animation to all of them as described in Section 7 (stroke-dashoffset animation, `#ff0080` glow, varied speed/delay per shape, placed as fixed background layer behind all content).

### `/public/images/ascii_landing_react.js` — Landing hero animation source

```
/Users/joeyq/Desktop/bromance/public/images/ascii_landing_react.js
```

This is a complete React app exported from Variant.com. It contains a canvas-based ASCII character animation with mouse reactivity.

**What to extract:** Only the canvas rendering engine — the `useEffect` that sets up the canvas, the animation loop, the cell/character logic, and the mouse tracking refs.

**What to strip out completely:**
- All demo text strings (`MATERIAL SYSTEMS`, `DIGITAL GEOGRAPHY`, `exploring the topology of interface`, all hero titles)
- The `.hero-container` and `.hero-title` and `.hero-sub` elements and their content
- The `.panel-zone` content (the three-column bottom panel text — you will replace this with the poi5on.m3 panel content described in Section 6)
- The nav overlay and its demo links
- The corner button labels (replace with poi5on.m3 labels described in Section 6)
- The `currentState` toggle logic and state A/B demo content

**What to keep:**
- Canvas rendering engine and animation loop
- `#00ff41` color scheme and `#000000` background
- Mouse reactivity / character displacement on mouse move
- The overall layout structure: 70vh canvas zone + 30vh panel zone
- The corner fixed-position button positions (top-left, top-right, bottom-left, bottom-right)
- The `SYS.TIME` UTC clock logic
- The `PING` display logic

**Then add on top of the extracted animation:**
The ASCII eye art generated from `logo_and_hero.png` — centered in the 70vh canvas, large, character-shimmer animated, layered over the background animation at a higher z-index.

### `/public/images/stitch/` — Design reference screenshots

```
/Users/joeyq/Desktop/bromance/public/images/stitch/
```

This directory may be empty. **Download all Stitch design screens into this directory** via the `stitch` MCP server (project ID: `14685015908435121720`) at the start of the build. Use them as visual reference throughout development. Key screens to pull are listed in Section 18.

---

## 20. ENV VARIABLES

`.env.local` (already exists, add/confirm these):
```
RESEND_API_KEY=[already set]
NEXT_PUBLIC_MATOMO_URL=//matomo.p5n.lol/
NEXT_PUBLIC_MATOMO_SITE_ID=8
NEXT_PUBLIC_TIANJI_URL=https://tianji.p5n.lol/tracker.js
NEXT_PUBLIC_TIANJI_SITE_ID=cmmoe88u400105fe7ozi3wgc2
```

`.env.example` — update to reflect all required variables (no values).

---

## 21. CLARIFICATION PROTOCOL

**You are authorized and encouraged to ask the human for clarification** whenever you hit a genuine ambiguity that would materially affect a design or engineering decision.

Good reasons to ask:
- A specific data field in a CSV is unclear and you need to know how to display it
- You find a file or dependency missing from the codebase that this prompt references
- A design decision has two equally valid interpretations with meaningfully different outcomes
- You're about to make an irreversible structural change and want confirmation

Bad reasons to ask (don't):
- Asking for permission on things this prompt already authorizes
- Asking about naming, wording, or design choices explicitly delegated to you
- Asking the human to re-explain anything already in this prompt

When you do ask: be specific, brief, and batch all questions into one message.

---

## FINAL NOTE

This prompt represents the complete brief. The human has handed over full creative and engineering authority. Every naming decision, design choice not explicitly specified, visual treatment not described, and UX pattern not dictated — is yours to own.

The standard is: **a work that makes a hostile reader think twice before dismissing it, and makes a curious reader unable to stop scrolling.**

Build accordingly.

███ END OF MASTER PROMPT ███
