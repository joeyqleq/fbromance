# Methodology and Limits

## Project Context

This research was conducted to support a public-facing investigative case study examining the Reddit subreddit **r/ForbiddenBromance**. The core objective was to build a structured, multilingual, machine-usable external event dataset that can be cross-referenced against the subreddit's archived content to test hypotheses about discourse patterns, potential coordination, and identity performance.

**Critical Clarification:** This research does NOT claim to prove coordination or propaganda. It provides the **external timeline infrastructure** necessary to rigorously test such hypotheses through later cross-referencing analysis.

---

## Research Scope

### Time Windows

**Window A: Broad Conflict Scope**
- **Start:** 2023-10-07 (Hamas attack on Israel triggering regional escalation)
- **End:** 2026-03-14 (latest events documented in current research cycle)
- **Purpose:** Capture major Lebanon-Israel escalation events, including Gaza war spillover, Hezbollah-Israel conflict, regional dynamics involving Syria/Iran, and diplomatic developments

**Window B: Daily Ceasefire-Violation Scope**
- **Start:** 2024-11-27 (ceasefire takes effect)
- **End:** 2026-03-14 (latest events documented)
- **Purpose:** Build granular log of post-ceasefire incidents, especially those reported primarily in local Lebanese sources rather than international English-language media

### Geographic Focus

Primary: Lebanon (south Lebanon border areas, Bekaa Valley, Beirut)
Secondary: Israel (northern border areas, targeted by Hezbollah)
Tertiary: Syria, Iran, Gaza (when events directly affect Lebanon-Israel dynamics)

---

## Source Discovery and Classification

### Source Types Prioritized

1. **Local Lebanese Arabic outlets** (National News Agency / NNA, Al Jadeed, Al Manar, MTV Lebanon, LBCI)
2. **Local Lebanese French-language outlets** (L'Orient-Le Jour, Le Commerce du Levant)
3. **Local Lebanese English-language outlets** (The Daily Star, The National News Lebanon)
4. **Arabic regional outlets** (Al Jazeera Arabic, Al Arabiya, Al Mayadeen)
5. **International wire services** (Associated Press, Reuters, Agence France-Presse, Anadolu Agency)
6. **International English outlets** (Al Jazeera English, BBC, CNN, The Guardian)
7. **Specialized security/military sources** (Long War Journal, Institute for the Study of War)
8. **Official sources** (UN OHCHR, UNIFIL reports, government statements)

### Source Inventory Output

A complete **SOURCE_INVENTORY.csv** was generated with 40 sources classified by:
- Language (Arabic, English, French)
- Source type (local Lebanese, regional Arab, international wire, specialized)
- Coverage strength (high for daily violations, high for major events only, medium, low)
- Known positioning/bias where obvious

**Key Finding:** Local Lebanese Arabic sources (especially NNA) provide the most granular coverage of daily violations, obscure village incidents, and targeted killings that rarely make international English-language headlines.

---

## Event Extraction Methodology

### Major Events Timeline (Window A)

**Selection Criteria:**
- High regional impact
- Direct Lebanon-Israel military activity
- Major escalations (assassinations of senior figures, ground invasions, mass casualty events)
- Diplomatic milestones (ceasefire signing, direct talks announcement)
- Events with documented subreddit activity spikes

**18 major events extracted** spanning Oct 2023 - March 2026, including:
- Hamas attack and Hezbollah front opening (Oct 2023)
- Senior commander assassinations (Hajj Abu Taleb June 2024, Nasrallah Sept 2024)
- Pager/walkie-talkie attacks (Sept 2024)
- Ground invasion start (Oct 2024)
- Ceasefire signing and implementation (Nov 2024)
- Direct Lebanon-Israel talks announcement (March 2025)
- Major post-ceasefire strikes (Dec 2024, March 2025, March 2026)

### Post-Ceasefire Violation Log (Window B)

**Selection Criteria:**
- Any Israeli military activity in Lebanese territory post-Nov 27 2024
- Drone overflights, airstrikes, artillery shelling, home demolitions, bulldozing
- Targeted killings of individuals (Hezbollah members or civilians)
- Occupation presence beyond ceasefire withdrawal deadline
- Incidents reported primarily in NNA or local Lebanese sources

**27 violation events extracted** spanning Nov 2024 - March 2026, including:
- Daily drone overflights and surveillance
- Vehicle/motorcycle strikes in obscure villages
- Home demolitions and infrastructure destruction
- Artillery shelling of border villages
- Major strikes (Haris/Tallousa Dec 2024, Ain al-Hilweh refugee camp Nov 2025, Beirut suburbs March 2026)
- Occupation violations (failure to withdraw from Khiam and other areas)

**Critical Design Choice:** Included small-scale, locally-reported incidents that never became international headlines. These are the "bait" for detecting unusual subreddit knowledge patterns.

---

## Field Standardization

### Required Fields for All Events

- **event_id:** Unique identifier (MAJ_NNN for major events, VIOL_NNN for violations)
- **event_date:** Date of incident (YYYY-MM-DD)
- **publication_date:** Date source published report
- **date_precision:** exact_day / approximate_day / date_range
- **source_id, source_name, source_language, source_url:** Source attribution
- **source_headline_original, source_headline_english:** Original + English translation
- **one_line_summary:** Concise event description
- **location_country, location_region_or_governorate, location_city_town_village_or_neighborhood:** Geographic hierarchy
- **parties_involved:** Who participated (Israel, Hezbollah, LAF, etc.)
- **incident_type:** Controlled vocabulary (strike, drone, assassination, diplomacy, etc.)
- **violation_type_if_applicable:** Ceasefire-specific types (drone_overflight, targeted_killing, occupation_presence, etc.)
- **people_named, organizations_named:** Entities mentioned
- **casualties_if_stated:** Death/injury counts when available
- **target_type:** What was targeted (vehicle, home, refugee camp, etc.)
- **cross_border_relevance:** Why this matters for Lebanon-Israel dynamics
- **topic_labels:** Controlled vocabulary tags (see below)
- **subreddit_relevance_score:** 1-5 scale of likelihood to trigger discussion
- **likely_subreddit_trigger_reason:** Hypothesis about discourse impact
- **corroboration_level:** single_source / locally_repeated / regionally_confirmed / wire_confirmed / strongly_multi_sourced
- **confidence_notes:** Source quality and verification notes

### Topic Labels Controlled Vocabulary

Every event tagged with one or more labels from fixed list:
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

These labels enable systematic matching between event types and subreddit discourse patterns.

---

## Obscure Watchlist Logic

### Purpose

Capture names, villages, organizations, and locations whose mention on the subreddit would be **notable** because they are:
1. Rarely covered in English/international media
2. Primarily documented in Arabic/local Lebanese sources
3. Obscure enough that casual observers would not know them

### Watchlist Categories

- **People (8 entries):** Hezbollah members, commanders, IRGC officials killed in strikes
- **Villages (20 entries):** Border villages, strike locations, occupation sites
- **Neighborhoods (2 entries):** Dahieh (Beirut), Ain al-Hilweh refugee camp
- **Organizations (2 entries):** Hezbollah Nasr Unit, IRGC
- **Roads/locations (1 entry):** Specific road names between villages

**Total: 33 watchlist items**

### Detection Logic

If subreddit mentions watchlist item:
- **Within 24 hours of NNA-only reporting:** HIGH SUSPICION (suggests organized monitoring)
- **With correct Arabic transliteration:** MEDIUM SUSPICION (suggests Arabic source access)
- **Multiple obscure names in one post:** HIGH SUSPICION (suggests insider knowledge)
- **Celebration of obscure Hezbollah member death:** HIGH SUSPICION (suggests systematic tracking)

---

## Cross-Reference Framework

### Temporal Join Keys

- **Exact date match:** Event date = subreddit post date
- **± 1 day window:** Catch immediate reactions accounting for time zones
- **± 3 day window:** Catch discussion waves and follow-up threads
- **Monthly aggregation:** Correlate monthly event density with activity spikes

### Entity Join Keys

- **Named persons:** Match people_named field to subreddit text (fuzzy)
- **Villages/locations:** Match location fields to subreddit text (CRITICAL for obscure watchlist detection)
- **Organizations:** Match organizations_named to subreddit mentions
- **Incident types:** Semantic match between event types and subreddit topics

### Hypothesis Testing Framework

**Priority 1: Obscure village mentions**
- If subreddit mentions Haris, Tallousa, Majdalzoun, Khirbet Selm, Jmeijmeh, Kfartebnit, Bazouriye, Blida, Burj Al-Muluk within 24-48 hours of NNA-only reporting → FLAG

**Priority 2: Celebration of obscure deaths**
- If subreddit celebrates killing of Mohammad Ali Zreik, Muhammad Hussein Sabra, Ali Salim Sufan, or other obscure figures → FLAG

**Priority 3: Violation pattern correlation**
- Test whether daily violations correlate with anti-Hezbollah discourse spikes

**Priority 4: Palestine-topic suppression**
- Test whether Ain al-Hilweh refugee camp strike (11 children killed) was absent from or suppressed in subreddit discussion

**Priority 5: Normalization discourse timing**
- Test whether ceasefire signing (Nov 26 2024) and direct talks announcement (March 11 2025) triggered peace-branding/normalization posts

**Priority 6-10:** See CROSS_REFERENCE_RULES.json for complete priority list

---

## Limitations and Constraints

### 1. Language Barriers

**Arabic Source Access:** Research conducted primarily in English with Arabic source headlines translated. Some nuance may be lost. Arabic-language social media (Twitter/X, Telegram) and detailed Arabic reporting beyond major outlets were not systematically monitored due to resource constraints.

**Mitigation:** Prioritized outlets with English editions (Al Jazeera, NNA English) and relied on international wire services for corroboration.

### 2. Source Verification Challenges

**Single-Source Events:** Some obscure village incidents documented only by NNA. Cannot always verify through independent second source.

**Mitigation:** Corroboration levels explicitly documented. Single-source events flagged but included when source is official (NNA = Lebanese state news agency).

### 3. Incomplete Violation Count

**Daily violations:** Research captured 27 specific violation events, but actual violation count is much higher. Anadolu Agency reported 285 violations by Dec 21 2024 alone (25 days post-ceasefire). Full systematic daily logging would require dedicated monitoring infrastructure.

**Mitigation:** Focused on **illustrative sample** covering different violation types, locations, and time periods. Sample includes enough obscure incidents to serve as cross-reference "bait."

### 4. Casualty Count Uncertainties

**Conflicting numbers:** Different sources report different casualty figures. Lebanese Health Ministry figures often differ from Israeli military claims.

**Mitigation:** Reported "casualties_if_stated" as documented by specific source, noting conflicts in confidence_notes field. Did not adjudicate disputed numbers.

### 5. Attribution Ambiguity

**"Hezbollah operative" claims:** Israeli military often claims targeted individuals were Hezbollah operatives. Lebanese sources sometimes dispute this or report victims as civilians.

**Mitigation:** Recorded both Israeli claims and Lebanese reporting without adjudicating. Marked target_type based on source claims, flagged contradictions.

### 6. Temporal Coverage Gaps

**Not continuous:** Research does not provide day-by-day coverage for entire Window B period. Some weeks/months have sparse entries.

**Mitigation:** Prioritized highest-activity periods documented in existing subreddit analysis (Sept 2024, Nov 2024, March 2025, March 2026). Included representative samples from quieter periods.

### 7. Subreddit Context Dependent

**Hypothesis testing requires subreddit data:** This external dataset is only useful when joined against actual r/ForbiddenBromance archive. Standalone, it is just an event timeline.

**Mitigation:** Designed field structure and join logic explicitly for cross-referencing. CROSS_REFERENCE_RULES.json provides detailed downstream analysis guidance.

### 8. No Hezbollah Internal Sources

**One-sided sourcing:** Research relies on public reporting (Lebanese government, international media, Israeli military statements). No access to Hezbollah internal communications or non-public intelligence.

**Mitigation:** Not attempting to prove Hezbollah actions, only to document publicly reported events that could influence subreddit discourse.

### 9. Evolving Situation

**Dynamic conflict:** Lebanon-Israel situation continues evolving. Events after March 2026 not captured.

**Mitigation:** Dataset is timestamped and versioned. Future updates can extend timeline.

### 10. Bias and Framing

**Source bias:** All sources have political perspectives. Israeli military sources frame events as counter-terrorism; Lebanese/Arab sources may emphasize sovereignty violations; international wire services seek balance but vary.

**Mitigation:** 
- Documented source_id and corroboration_level for every event
- Included multiple source types (local Lebanese, regional Arab, international)
- Used original headlines + English translations
- Did not editorialize in one_line_summary field

---

## Validation Performed

### Data Quality Checks

✓ All event_ids unique
✓ All dates in YYYY-MM-DD format
✓ All topic_labels from controlled vocabulary
✓ All source_urls accessible at time of research
✓ All watchlist event_ids exist in event datasets
✓ Watchlist names match event fields (people_named, location fields)
✓ No duplicate events (same date, location, incident type)

### Corroboration Verification

- 18 major events: 16 wire_confirmed or strongly_multi_sourced, 2 locally_repeated
- 27 violation events: 6 wire_confirmed/strongly_multi_sourced, 21 locally_repeated
- No single-source events without explicit flagging

---

## Ethical Considerations

### 1. Public Information Only

All events extracted from publicly available news sources. No private communications, hacked materials, or non-public intelligence used.

### 2. No Doxxing

People named in events are public figures (military commanders, politicians) or individuals whose names were published in credible news sources in context of public incidents. No private individuals doxxed.

### 3. Civilian Casualty Sensitivity

Civilian deaths documented respectfully without sensationalism. Focus on factual reporting of numbers and circumstances as stated by sources.

### 4. Hypothesis vs Proof

Research does not claim to prove subreddit is coordinated propaganda. It provides infrastructure to **test** such hypotheses rigorously through later cross-referencing. Maintains epistemic humility.

### 5. Transparency

Methodology documented in detail. Source attributions complete. Limitations acknowledged. Anyone can replicate research using provided source list.

---

## Output Files Generated

1. **perplexity_pro_claude_46_SOURCE_INVENTORY.csv** (40 sources)
2. **perplexity_pro_claude_46_MAJOR_EVENT_TIMELINE.csv** (18 events)
3. **perplexity_pro_claude_46_POST_CEASEFIRE_VIOLATION_LOG.csv** (27 events)
4. **perplexity_pro_claude_46_OBSCURE_WATCHLIST.csv** (33 items)
5. **perplexity_pro_claude_46_CROSS_REFERENCE_RULES.json** (analysis framework)
6. **perplexity_pro_claude_46_METHODOLOGY_AND_LIMITS.md** (this document)

---

## Recommended Next Steps

### Phase 1: Data Loading
- Import all CSVs into SQL database or pandas dataframes
- Validate field types and create indexes on event_date, location fields, people_named

### Phase 2: Subreddit Data Preparation
- Load r/ForbiddenBromance archive (posts + comments)
- Extract post dates, comment dates, flair information, text content
- Apply topic modeling or keyword extraction to categorize discourse

### Phase 3: Temporal Correlation Analysis
- Join events to subreddit activity using temporal windows (exact, ±1 day, ±3 days, monthly)
- Calculate activity spikes around major events
- Test whether documented spike periods (Sept 2024, Nov 2024, March 2025/2026) align with event timeline

### Phase 4: Obscure Name Detection
- Search subreddit text for watchlist items (case-insensitive, fuzzy matching)
- Flag mentions within 24-48 hours of NNA-only reporting
- Analyze flair patterns of users mentioning obscure names

### Phase 5: Topic Correlation
- Match event topic_labels to subreddit discourse patterns
- Test anti_hezbollah events → anti-Hezbollah posts correlation
- Test palestine_or_gaza_context events → Palestine-topic suppression pattern

### Phase 6: Source Language Analysis
- Identify subreddit posts citing specific sources
- Test whether users show knowledge only available in Arabic sources
- Compare timing of posts to source publication dates (English vs Arabic)

### Phase 7: Identity Consistency Analysis
- Test whether users with "Lebanese" flair show knowledge patterns inconsistent with claimed location
- Test whether users celebrate obscure deaths that casual Lebanese observers wouldn't track
- Test whether Israeli-flair and Lebanese-flair users show suspiciously aligned timing/framing

### Phase 8: Reporting
- Generate visualizations (timelines, correlation charts, network graphs)
- Write public-facing report with evidence-backed findings
- Maintain strict standards: claim only what data supports, flag uncertainties

---

## Final Notes

This external event dataset is **infrastructure, not proof**. It provides:
- A clean, source-backed timeline of real-world events
- A structured framework for hypothesis testing
- A watchlist of "bait" items whose mention would be notable
- Explicit join logic for rigorous cross-referencing

What it does NOT provide:
- Proof of coordination (requires cross-referencing)
- Complete violation count (sample-based)
- Perfect source verification (acknowledged limitations)
- Answers about subreddit behavior (requires subreddit data)

The strength of this approach is **falsifiability**. If cross-referencing shows NO correlation between obscure events and subreddit activity, hypothesis is weakened. If it shows STRONG correlation, hypothesis is strengthened. Either way, the methodology is transparent and replicable.

---

**Research conducted:** March 2026  
**Dataset version:** 1.0  
**Tools used:** Web research, Perplexity Pro, Claude, Python/pandas
**License:** Public domain / CC0 (external event data from public sources)
