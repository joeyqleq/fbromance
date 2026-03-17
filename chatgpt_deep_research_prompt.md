You are running deep web research for a public-facing investigative case study about the Reddit subreddit `r/ForbiddenBromance`.

Your job is NOT to produce a generic prose report.
Your job is to produce a structured, multilingual, machine-usable event dataset that can later be cross-referenced against archived Reddit posts/comments, user histories, and future website visualizations.

If files are attached to this chat, read them first and use them as context. If no files are attached, still complete the web research using the context below.

## Core Objective
Build a source-backed external-event registry that helps test whether subreddit conversation spikes, topic shifts, hostility, identity performance, and possible slips in tone/language correlate with real-world events involving:
- Lebanon
- Israel
- Hezbollah
- the Lebanese state
- Christian Lebanese parties/militias and their historical narratives
- normalization / peace-branding discourse
- Palestine / Gaza / topic-suppression dynamics
- Iran / Syria / border escalation / assassinations / raids / drones / ceasefire violations

The broader hypothesis is NOT to be treated as proven fact.
Do not assume the subreddit is definitely coordinated propaganda.
Treat this as an evidence-gathering task designed to produce the cleanest possible external timeline for later cross-reference.

## Existing Local Research Context
A separate local analysis of the subreddit archive has already been done.
Known local facts:
- subreddit archive spans roughly September 2019 through March 2026
- cleaned archive contains about 4,895 posts and 88,094 comments
- a first-pass analysis found the strongest subreddit activity spikes in:
  - 2024-09
  - 2024-10
  - 2024-06
  - 2023-11
  - 2025-03
  - 2026-03
  - also earlier relevant windows: 2020-08 and 2021-05
- user flair is important but is only a self-presented identity signal, not proof of identity
- a Hebrew subset exists inside the subreddit archive, but Hebrew is not dominant overall
- major topic clusters already identified inside the subreddit include:
  1. anti-Hezbollah / anti-Shia framing
  2. pro-Christian militia / historical cooperation framing
  3. normalization / peace-branding
  4. Palestine avoidance / topic suppression
  5. anti-Iran framing
  6. anti-Lebanese-state / blame-Lebanon framing
  7. direct hostility / insults / fights

Your research must produce external data that can later be joined against those internal subreddit signals.

## Time Scope
Use TWO nested time windows.

### Window A: Broad conflict scope
Start: 2023-10-07
End: present in the data context, or the latest reliably source-backed point you can research

Purpose:
Capture the broader Lebanon-Israel / regional escalation context since October 7, 2023, including events in Gaza, Syria, Iran, and Lebanon when they plausibly affect subreddit discourse.

### Window B: Daily ceasefire-violation scope
Start: 2024-11-27
End: latest reliably source-backed point you can research

Important date context:
- ceasefire signed: 2024-11-26
- ceasefire took effect: 2024-11-27

Purpose:
Build the most detailed possible log of post-ceasefire incidents, especially local events that may NOT appear in Western or major English-language coverage.

## Source Discovery Requirements
Do NOT begin event logging until you first discover and classify relevant sources.
Before extracting events, create a source inventory across:
- Lebanese local Arabic outlets
- Lebanese French-language outlets
- Lebanese English-language outlets
- Arabic regional outlets
- international wire services / global outlets used only as a corroboration layer, not the main layer

You must prioritize local and regional reporting over English-only Western reporting for the daily violation layer.

### Source Discovery Goals
Identify outlets that are likely to report:
- drone incursions
- artillery / airstrikes
- assassinations / targeted killings
- raids / infiltrations / kidnappings
- cross-border incidents
- civilian casualties in the south
- strikes on vehicles, villages, or specific neighborhoods
- obscure militant or local political figures whose names may never appear in large global outlets
- Lebanese internal political reactions and sectarian fallout

### Source Inventory Output
Create a dataset called `SOURCE_INVENTORY` with these fields:
- source_id
- source_name
- base_url
- language
- country_or_region
- source_type
- likely_coverage_strength
- known_bias_or_positioning_if_obvious
- notes_on_relevance

`source_type` should use values like:
- local_lebanese_arabic
- local_lebanese_french
- local_lebanese_english
- arab_regional
- international_wire
- other

`likely_coverage_strength` should be a short label such as:
- high_for_daily_violations
- high_for_major_events_only
- medium
- low

## Research Method
After building the source inventory, do the research in this order:

1. Build a major-event timeline for Window A.
2. Build a daily/near-daily violation log for Window B.
3. Extract obscure names, places, militia references, neighborhoods, villages, and incident types that could later act as “cross-reference bait” if they appear on the subreddit.
4. Tag each event with the subreddit-relevant topic labels listed above.
5. Flag which kinds of events are most likely to trigger:
   - anti-Hezbollah threads
   - Christian militia nostalgia/cooperation framing
   - normalization/peace-branding
   - sectarian blame
   - fights/hostility
   - Palestine-topic avoidance or derailment

## What To Look For
Do NOT limit yourself to events explicitly framed as “Lebanon vs Israel.”
Also include events that could indirectly shape the subreddit conversation, including:
- events in Syria involving Israeli strikes or Hezbollah / IRGC-linked targets
- Gaza war developments that increase Lebanon-Israel tensions
- Iran-Israel escalations that spill into Lebanon discourse
- Christian Lebanese party politics, Lebanese Forces, Kataeb / Phalange, militia memory, civil-war references, or any historical cooperation narratives
- border talks, normalization rumors, mediation efforts, US or French diplomacy
- assassinations of obscure figures where later subreddit mentions would be unusual or revealing
- local south Lebanon security incidents that only Arabic/local outlets recorded
- anniversaries, religious holidays, funerals, memorials, speeches, or symbolic dates that might intensify sectarian or ideological framing

## Required Event Labels
Every logged event must include one or more `topic_labels` chosen from this fixed list:
- anti_hezbollah
- anti_shia_or_sectarian_tension
- christian_militias_or_historical_cooperation
- normalization_or_peace_branding
- palestine_or_gaza_context
- palestine_topic_suppression_or_avoidance_relevance
- anti_iran
- anti_lebanese_state_or_state_failure
- direct_hostility_trigger
- civilian_harm
- assassination_or_targeted_strike
- drone_or_airspace_violation
- border_incursion_or_ground_activity
- raid_or_kidnapping
- diplomacy_or_mediation
- syria_spillover
- iran_spillover
- rhetoric_or_speech_trigger
- obscure_name_watchlist

## Event Extraction Rules
For every event, extract and normalize the following fields:
- event_id
- event_date
- publication_date
- date_precision
- source_id
- source_name
- source_language
- source_url
- source_headline_original
- source_headline_english
- one_line_summary
- location_country
- location_region_or_governorate
- location_city_town_village_or_neighborhood
- parties_involved
- incident_type
- violation_type_if_applicable
- people_named
- organizations_named
- casualties_if_stated
- target_type
- cross_border_relevance
- topic_labels
- subreddit_relevance_score
- likely_subreddit_trigger_reason
- corroboration_level
- confidence_notes

### Field Guidance
- `date_precision`: exact_day / approximate_day / date_range
- `incident_type`: strike / drone / artillery / rocket / assassination / raid / kidnapping / speech / mediation / political_statement / funeral / protest / military_movement / other
- `violation_type_if_applicable`: use only for ceasefire-window incidents; examples include drone_overflight, airstrike, targeted_killing, incursion, occupation_presence, detention_or_kidnapping, shelling, surveillance, ground_raid, other
- `subreddit_relevance_score`: 1 to 5
- `corroboration_level`: single_source / locally_repeated / regionally_confirmed / wire_confirmed / strongly_multi_sourced

## Daily Violation Layer Requirements
For Window B (from 2024-11-27 onward), be aggressive about collecting local reporting.
This layer is especially important.

You are trying to capture the “small but meaningful” events that could later matter if the subreddit references them.
Examples:
- a drone strike on a car in a village
- a named or unnamed civilian killed in the south
- a low-level Hezbollah or local figure targeted
- an incursion or kidnapping in a border village
- a local mayor or TV station describing repeated overflights or violations
- persistent occupation or withdrawal failures

Do NOT discard an event just because it did not become international headline news.
If it is source-backed and relevant, log it.

## Obscure Name / Obscure Place Watchlist
Create a separate dataset called `OBSCURE_WATCHLIST`.
Purpose:
Capture names and places whose appearance later on the subreddit would be notable because they were relatively obscure and mainly documented in local/regional reporting.

Fields:
- watch_id
- name_or_place
- type
- event_id
- date
- why_it_is_notable
- likely_reason_it_might_surface_on_subreddit
- source_url

`type` should be one of:
- person
- village
- neighborhood
- road_or_border_point
- organization
- militia_reference
- political_reference
- historical_reference

## Deliverable Format
Do NOT return only a narrative report.
Return machine-usable outputs first.

### Preferred Output Order
1. `SOURCE_INVENTORY.csv`
2. `MAJOR_EVENT_TIMELINE.csv`
3. `POST_CEASEFIRE_VIOLATION_LOG.csv`
4. `OBSCURE_WATCHLIST.csv`
5. `CROSS_REFERENCE_RULES.json`
6. `METHODOLOGY_AND_LIMITS.md`
7. short human-readable executive summary

If the full datasets are too large for one answer, split them into clearly labeled batches by time period.
For example:
- `POST_CEASEFIRE_VIOLATION_LOG_part_1_2024-11_to_2025-03.csv`
- `POST_CEASEFIRE_VIOLATION_LOG_part_2_2025-04_to_2025-09.csv`
- etc.

If necessary, prioritize completeness of the ceasefire-violation layer over elegance of prose.

## CROSS_REFERENCE_RULES.json Requirements
Create a JSON object that explains how later analysis should match your event data against subreddit data.
Include:
- priority_windows
- event_types_most_likely_to_trigger_subreddit_spikes
- topic_labels_most_likely_to_map_to_each event type
- obscure_name_logic
- local_vs_global_source_weighting_logic
- suggested_join_keys for future downstream analysis

Suggested join keys should include fields like:
- exact_date
- +/- 1 day
- +/- 3 days
- month
- named person
- village/location
- organization
- incident_type
- rhetoric/topic label
- holiday/anniversary marker

## Methodological Constraints
- Be multilingual: Arabic, English, French.
- Prefer original local headlines when possible, but always add an English gloss or translation.
- Do not hallucinate missing details.
- If a detail is unknown, leave it blank or mark it explicitly as unknown.
- Distinguish facts from inference.
- Flag contradictions between sources.
- Avoid ideological editorializing.
- Be skeptical but thorough.
- Do not collapse all incidents into a single political narrative.
- Preserve enough structure that the outputs could later feed a website, a database, or a RAG/QA system.

## Important Analytical Intent
This research is being used to support a public-facing data project that investigates whether online discourse in a specific subreddit moves in suspiciously synchronized ways with real-world events and whether some participants may be misrepresenting themselves.

Again:
- do not claim proof you do not have
- do not diagnose coordination without evidence
- do produce the richest possible external timeline so that later cross-referencing can test those hypotheses rigorously

## Final Instruction
Your default instinct may be to write a polished essay. Do NOT do that.
Start by building the source inventory.
Then build the event datasets.
Then the watchlist.
Then the cross-reference rules.
Only after that, write a concise methodological summary.dee
Preceed the file names of any file you export with "gemini_"
