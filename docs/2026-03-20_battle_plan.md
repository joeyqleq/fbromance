# March 20 Battle Plan

## Core decision

Do **not** build the next frontend as a generic Reddit dashboard.

Build it as an evidence-led political-risk / intelligence-style dossier that tests whether `r/ForbiddenBromance` functions as:

1. an organic cross-border peace forum
2. a mixed forum with agenda-heavy narrative shaping
3. a coordinated influence arena
4. a state-aligned or state-adjacent influence arena

The site should be optimized to answer that ladder honestly, not to force the top rung.

## Primary public thesis

The most defensible public thesis right now is:

`r/ForbiddenBromance` behaves less like a neutral peace forum and more like a wartime narrative-shaping arena. It mixes some genuine participants with asymmetric rhetoric, recurrent agenda pressure, event-linked framing shifts, and dense identity-conflict threads.

That is stronger than a flat "Mossad psyop" claim and harder to dismiss.

## What we can say now

- The subreddit is not well-described by a simple "peace dialogue" frame.
- The strongest signals are rhetorical mode shifts, selective softening/hardening by context, dense conflict-thread structures, and narrative pressure around anti-Hezbollah / blame-Lebanon framing.
- The current public evidence does **not** justify a clean attribution claim to Mossad or to a specific state service.
- The public case becomes stronger if it foregrounds competing hypotheses, counterevidence, and attribution thresholds.

## What we should not say

- Do not claim "this proves Mossad runs the subreddit".
- Do not treat Hebrew, Israeli identity, or pro-normalization sentiment as automatic proof of coordination.
- Do not present self-declared flair as verified identity.
- Do not flatten all Israeli participants into one actor class.

## New framing

The site should answer five questions:

1. What does the subreddit claim to be?
2. What does it actually do during wartime or escalation windows?
3. Who dominates the conversation and how do they behave across contexts?
4. Which rhetorical patterns look organic, and which look coordinated or agenda-driven?
5. What remains unproven?

## Site structure

### 1. Opening claim page

Lead with a sober claim:

`This dossier tests whether a self-described peace subreddit functions in practice as a wartime narrative-shaping arena.`

Include:

- thesis
- guardrails
- competing hypotheses
- confidence ladder

### 2. Wartime divergence page

Show how the subreddit behaves during escalation windows.

Needed evidence:

- monthly spikes
- event synchronization
- topic emphasis shifts
- "what is absent" during key real-world events

Primary framing:

`When violence intensifies, the subreddit does not simply discuss peace; it reorients blame, legitimacy, and responsibility in patterned ways.`

### 3. Actor map page

Do **not** only focus on "fake Lebanese".

Instead classify:

- high-volume Israeli / diaspora-Israeli participants
- high-volume Lebanese / diaspora-Lebanese participants
- mixed or ambiguous participants
- mod or moderator-adjacent roles
- bridge accounts active across `r/Israel`, `r/lebanon`, and `r/ForbiddenBromance`

Goal:

Show who shapes the arena, not just who is suspicious.

### 4. Rhetoric lab page

This is where the project becomes more than reporting.

Track:

- blame-Lebanon rhetoric
- anti-Hezbollah framing
- "peace" or normalization framing
- security / threat framing
- identity challenges
- historical distortion or selective memory
- silence / under-mentioning of current Israeli military actions when relevant

Frame it as:

`What narratives are repeatedly made available to participants, and which narratives are crowded out?`

### 5. Counterevidence page

This is mandatory.

Include:

- genuine peace-seeking threads
- evidence that some Lebanese-flair users are probably genuine
- places where the strongest suspicion is **not** borne out
- uncertainty and missing data

Without this page, the project will read like a predetermined accusation.

### 6. Attribution boundary page

Make the boundary explicit:

- suspicious
- coordination-like
- actor-aligned
- state-adjacent
- state-directed

Say exactly what additional evidence would be needed to move from one tier to the next.

## Data that should remain in the website repo

- `src/`
- `public/`
- `scripts/`
- `phase2_outputs/site/poison_site_data.json`
- selected `phase2_outputs/deep/*`
- selected `phase3_outputs/contradiction/*`
- analysis docs and prompts

## Data that should stay local only

- `raw/**`
- `external_research/raw/**`
- full user-history JSONL archives
- giant initial monolith downloads and chunk files

## New analytical work needed before redesign

### 1. All high-volume actor review

Do not only inspect suspected Israeli role-players.

Review all high-volume participant classes:

- Lebanese
- diaspora Lebanese
- Israeli
- diaspora Israeli
- Jewish / diaspora Jew
- unflaired / unknown

### 2. Wartime silence / omission analysis

The user's strongest current intuition is not only what gets said, but what fails to get said.

Add:

- mention rates for major escalations
- lag between real-world events and subreddit discussion
- downweighting or avoidance of Israeli responsibility language

### 3. Source ecology

Map which domains, articles, or source types get used to justify claims.

This is stronger than anecdotal outrage because it shows information supply, not just discussion volume.

### 4. Moderation and boundary-policing analysis

Track:

- who is challenged as outsider
- who gets defended
- who gets normalized
- whether moderation pressure is symmetric or asymmetric

### 5. Claim ledger

Create a structured ledger:

- claim
- evidence for
- evidence against
- confidence
- alternative explanation

That ledger should become the backbone of the new site.

## Recommended extra datasets

- conflict-event timeline data from ACLED
- media/event time series from GDELT
- official statement timeline where relevant
- domain/source map of outbound links inside the subreddit

## Neon recommendation

If Neon is used, upload only a curated analyst snapshot:

- event tables
- actor tables
- rhetoric tables
- source tables
- claim ledger
- confidence tables

Do **not** upload the full raw archive on the free tier.

## Immediate next actions

1. keep raw local and out of GitHub
2. freeze frontend redesign work until the narrative architecture is updated
3. produce a curated analyst snapshot spec
4. run a second-opinion reasoning pass with Claude or Gemini on the curated evidence pack
5. redesign the site around the dossier structure above, not around the old dashboard
