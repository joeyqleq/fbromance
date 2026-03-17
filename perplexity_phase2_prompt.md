# Perplexity Phase 2 Prompt

You are analyzing a cleaned Reddit archive for `r/ForbiddenBromance` covering posts and comments from 2019 onward.

## Why this analysis is being done
The requestor is Lebanese and sees this subreddit as potentially more than a casual peace forum. Their working hypothesis is that it may function as an influence environment that blends peace rhetoric, identity performance, and sectarian framing in ways that could shape Lebanese perceptions over time. This is not a fact to assume. It is the central hypothesis to test, stress, and if necessary falsify.

The requestor's lived context matters here:
- Lebanon and Israel are neighboring states with a long history of war, occupation, coercion, and propaganda efforts.
- Under Lebanese law, direct contact with Israelis is highly sensitive and in many settings illegal.
- The user believes the subreddit may specifically pressure identity boundaries by foregrounding who is `Lebanese` versus `Israeli`, including through visible user flair.
- The user is especially interested in whether the space amplifies sectarian tension, particularly anti-Shia or anti-Muslim framing, while presenting itself as dialogue or coexistence.

Treat all of that as contextual motivation and a set of search cues, not as proof.

## Files provided
- `r_ForbiddenBromance_posts.cleaned.ndjson`
- `r_ForbiddenBromance_comments.cleaned.ndjson`
- `cleaned_archive_schema.md`

## Dataset shape
- Posts rows: 4895
- Comments rows: 88094
- Posts file size: 3.0 MB
- Comments file size: 34.29 MB

## Field definitions
Posts:
- `id`, `name`, `author`, `author_flair_text`, `created_utc`, `title`, `selftext`, `score`, `num_comments`, `permalink`, `subreddit`

Comments:
- `id`, `author`, `author_flair_text`, `created_utc`, `body`, `score`, `parent_id`, `link_id`

Use `comments.link_id = posts.name` to connect comments to posts.
Use `parent_id` to reconstruct reply chains.
Use `author_flair_text` as a self-presented identity label that may be meaningful but is not automatically truthful.

## Analytical priorities
Produce a deep report on behavioral, linguistic, temporal, and event-driven patterns in this subreddit.

Focus on:
1. Topic evolution over time.
2. Activity spikes by date, week, month, and major regional event windows.
3. Correlations between subreddit discussion patterns and real-world Lebanon, Israel, and broader regional political or military events.
4. Recurrent narratives, framing patterns, and talking-point clusters.
5. Signs of coordination or inauthentic conversational structure, if supported by evidence.
6. User-level concentration patterns such as top posters, top commenters, dominant accounts, and unusual persistence around certain themes.
7. Reply-structure patterns, including whether discussions appear organic or unusually scripted.
8. Hebrew-language content and whether it materially differs in tone, candor, or topic from English-language content.
9. Flair analysis: how often accounts present as `Lebanese`, `Diaspora Lebanese`, `Israeli`, or `Diaspora Israeli`, and whether behavior differs by claimed identity.
10. Identity-claim consistency: whether language use, timing, vocabulary, rhetorical style, or cultural references create reasons for manual review of self-presented identity claims.
11. Tension-driving themes involving sectarian framing, anti-Shia framing, anti-Muslim framing, anti-Arab framing, or exclusionary rhetoric, but do not overclaim beyond what the evidence supports.
12. Specific date ranges, threads, and accounts that deserve deeper manual follow-up.

## Red flags to test rather than assume
- High-volume accounts dominating multiple spikes
- Small clusters of users replying heavily to one another across many threads
- Large event-driven topic shifts that line up unusually closely with real-world escalation windows
- Claimed Lebanese identity paired with weak Lebanese linguistic or cultural signals
- Hebrew comments or posts that are more candid, strategic, or hostile than the public-facing English discussion
- Flair usage that appears to steer discussion or to separate in-group from out-group participation
- Repeated rhetoric that frames coexistence in ethnic or sectarian rather than civic terms

## Method requirements
- Ground claims in the provided data and external sources.
- For external correlations, search the web and build a timeline of major Lebanon-Israel and broader regional events from 2019 to the present.
- Explicitly separate observed facts, statistical correlations, and speculative inferences.
- Provide source links for external events used in the timeline.
- Flag weak evidence instead of forcing a conclusion.
- Do not treat a user's flair or claimed identity as verified truth.
- Do not assume coordinated state action unless the evidence supports that level of confidence.
- Where useful, propose additional follow-up datasets that would strengthen or falsify the working hypothesis.

## Deliverables
1. Executive summary.
2. Timeline of subreddit activity versus major external events.
3. Topic and narrative analysis.
4. User, flair, and interaction analysis.
5. Evidence for or against coordinated behavior.
6. Ranked list of the strongest coincidences or correlations with exact dates.
7. Ranked list of threads or users for manual review.
8. Recommended next datasets to collect, including user-level expansion candidates.
9. Suggestions for charts and an eventual public-facing investigative dashboard.

## Important framing
This is an exploratory intelligence-style analysis of public data. Do not present unsupported accusations as proven fact. Use cautious, evidence-based language and distinguish clearly between:
- what the data directly shows
- what outside sources confirm
- what remains hypothesis or suspicion
