# Methodology and Limits

## What this dataset is for
This package is an **external-event registry**, not a claim that any subreddit is coordinated or deceptive.
It is built to help later analysis test whether changes in subreddit timing, topic mix, hostility, self-presentation, Hebrew usage, or identity performance correlate with real-world events.

## Inputs used
I used:
- the uploaded local archive context files for **window selection and downstream join design**
- multilingual web research across Lebanese, regional Arabic, and international sources for **event extraction**

The uploaded local files were treated as **contextual priors** only, not as proof of any hypothesis.

## Research order
1. Build a source inventory first.
2. Extract a major-event timeline for the broad conflict window.
3. Build a denser post-ceasefire incident registry.
4. Extract obscure names, villages, organizations, roads, and historical references for later cross-reference.
5. Write matching logic for downstream analysis.

## Time windows
### Window A
- Start: 2023-10-07
- End: 2026-03-14

Purpose:
Capture the broader conflict context: Gaza-war triggers, Hezbollah-Israel escalation, Syria spillover, Iran spillover, assassinations, diplomacy, and Lebanese internal political rhetoric.

### Window B
- Start: 2024-11-27
- End: 2026-03-14

Purpose:
Track post-ceasefire incidents in as much local detail as practical, especially lower-visibility village-level or named-person events.

## Source strategy
Priority order for the ceasefire-violation layer:
1. Lebanese local Arabic
2. Lebanese local French
3. Lebanese local English
4. Arabic regional outlets
5. International wires

Reason:
Small incidents, named villages, named detainees, and village-level military actions are often preserved only in local or regional reporting.

International wires were used mainly for:
- major shocks
- diplomacy
- broad casualty benchmarks
- regional spillover confirmation

## Normalization rules
- Original headline was preserved where practical.
- An English gloss was added for Arabic and French headlines.
- Unknown details were left blank or generalized rather than guessed.
- `topic_labels` were restricted to the user-provided fixed set.
- `people_named`, `organizations_named`, and location fields were kept as semicolon-delimited strings for easier later splitting.
- Transliteration variation was preserved in notes or watchlist logic where it mattered for downstream matching.

## What counts as an event here
This package includes both:
- kinetic incidents (strike, drone, artillery, kidnapping, ground activity)
- discourse-relevant events (speech, political statement, border-talk signal, ceasefire complaint, tally benchmark)

That is intentional.
The target use case is not military chronology alone; it is **discourse correlation**.

## Confidence and corroboration
`corroboration_level` is a practical field, not a mathematical proof score.

General interpretation:
- `single_source`: mostly local-only or retrospective detail
- `locally_repeated`: repeated across Lebanese local coverage
- `regionally_confirmed`: confirmed beyond Lebanon by regional Arabic/English reporting
- `wire_confirmed`: solid wire confirmation
- `strongly_multi_sourced`: broad confirmation across source classes

## Important limitations
1. **Not exhaustive**
   - The post-ceasefire layer is dense, but it is still a curated registry, not a perfect day-by-day war diary.

2. **Liveblog compression**
   - Some rows compress several same-day incidents from a single local live report into one structured event row.
   - This was done when the source itself bundled those incidents together and splitting them would require guessing unsupported details.

3. **Retrospective detainee rows**
   - Several abduction/detention events were documented in retrospective local reporting.
   - Event dates are retained, but publication dates may be blank where the retrospective article date was not normalized in this package.

4. **Casualty totals move**
   - Same-day casualty figures often changed later.
   - Where the source clearly gave a same-day figure, that figure was preserved in the row and not silently overwritten.

5. **Bias is source context, not a disqualifier**
   - Known editorial positioning was noted in the source inventory only when it was obvious and analytically relevant.
   - Source bias does not automatically invalidate an incident, but it affects how much corroboration is needed.

6. **Obscure-name matches are leads, not proof**
   - If a later subreddit post/comment mentions an obscure detainee, village, or organization from local reporting, that is a meaningful lead.
   - It is **not** proof of coordination, state affiliation, or identity fraud by itself.

7. **Topic labels include analytical inference**
   - Fields such as `likely_subreddit_trigger_reason` and labels like `palestine_topic_suppression_or_avoidance_relevance` are analytic flags for later testing.
   - They should not be mistaken for proof of intent.

## Recommended next step
Join this registry against the subreddit archive on:
- exact date
- +/- 1 day
- +/- 3 days
- month
- named person
- village/location
- organization
- incident type
- topic label
- anniversary/holiday markers

Then compare:
- posting/comment spikes
- Hebrew-bearing content frequency
- flair shifts
- author bursts
- hostility density
- normalization / anti-Hezbollah / Christian-historical framing shifts

## Publication note
Before public release on a website, do one final QA pass for:
- transliteration harmonization
- duplicate-near-duplicate village names
- source URL accessibility
- whether any single-source row should be visually flagged as lower confidence
