from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
PHASE2_DEEP = ROOT / 'phase2_outputs' / 'deep'
PHASE2 = ROOT / 'phase2_outputs'
EXTERNAL_RAW = ROOT / 'external_research' / 'raw'
OUTPUT = ROOT / 'phase2_outputs' / 'site' / 'poison_site_data.json'

HEBREW_RANGE = re.compile(r'[\u0590-\u05FF]')
ARABIC_RANGE = re.compile(r'[\u0600-\u06FF]')
TOKEN_RE = re.compile(r"[A-Za-z\u0590-\u05FF\u0600-\u06FF']+")

HEBREW_ANNOTATIONS: dict[str, dict[str, Any]] = {
    'lptqz56': {
        'english_gloss': 'Shut your mouth before you get stabbed.',
        'investigation_note': 'Direct physical threat phrased in colloquial Hebrew. High-signal because it is explicit, hostile, and upvoted.',
        'signal_tags': ['threat', 'slang', 'hostility'],
    },
    'lph0vjk': {
        'english_gloss': 'Israelis, stop entering this sub. It is not for us; let the Lebanese there speak.',
        'investigation_note': 'Mixed-language moderation by peer pressure. Useful because it explicitly acknowledges Israeli over-participation in the subreddit.',
        'signal_tags': ['meta-discourse', 'boundary-policing', 'mixed-language'],
    },
    '17ppm6s': {
        'english_gloss': 'Uses the phrase Shabbat HaShkhora / Black Sabbath for October 7 and frames grief through Jewish mourning custom.',
        'investigation_note': 'Important cross-language context anchor rather than a smoking gun. Shows how Hebrew-coded trauma language enters the subreddit frame.',
        'signal_tags': ['mourning-language', 'diaspora-tone', 'mixed-language'],
    },
    '1epmv4d': {
        'english_gloss': 'Refers readers to Hebrew book material on minorities and Shia history to explain why some Lebanese support Hezbollah.',
        'investigation_note': 'Notably reflective rather than aggressive. Included because it mixes conciliatory framing with insider Hebrew references.',
        'signal_tags': ['history-frame', 'mixed-language', 'explanatory'],
    },
    'lqukvhl': {
        'english_gloss': 'Enough already with these posts.',
        'investigation_note': 'Short Hebrew imperative inside an English moderation complaint. Useful as a tone-shift marker.',
        'signal_tags': ['meta-discourse', 'tone-shift', 'imperative'],
    },
    '1hod5ek': {
        'english_gloss': 'Uses the Jewish memorial abbreviation z"l alongside Arabic prayer wording.',
        'investigation_note': 'Cross-script blending of Arabic and Hebrew honorific language. More useful for identity-performance than for hostility.',
        'signal_tags': ['mixed-script', 'identity-performance', 'symbolic-language'],
    },
    'lptr1f8': {
        'english_gloss': 'Or just “stom” / shut up for short.',
        'investigation_note': 'Shortened Hebrew insult variant immediately following a more explicit threat. Useful as an escalation pair.',
        'signal_tags': ['insult', 'slang', 'reply-pair'],
    },
    'm1m8ok0': {
        'english_gloss': 'Peace from your Lebanese brother.',
        'investigation_note': 'Identity-performance item: explicitly presents as Lebanese while using Hebrew farewell language in a peace-branding context.',
        'signal_tags': ['peace-branding', 'identity-claim', 'mixed-language'],
    },
    'lraef56': {
        'english_gloss': 'Assuming you really are Israeli, you know how strange that sounds.',
        'investigation_note': 'Valuable because it directly questions whether another poster is truly Israeli, inside Hebrew.',
        'signal_tags': ['identity-challenge', 'meta-discourse', 'hebrew-only'],
    },
    'm1dc1ur': {
        'english_gloss': 'You are a hero!',
        'investigation_note': 'Praise in Hebrew attached to operational-safety advice for Lebanese users. Useful because OPSEC talk is one of the project’s red-flag themes.',
        'signal_tags': ['opsec', 'praise', 'mixed-language'],
    },
    '1afv85z': {
        'english_gloss': 'What do I have to do with psychopathic right-wingers? Just because we are all Jews? I prefer the Lebanese from Beirut.',
        'investigation_note': 'Strong ideological distancing from the Israeli right while romanticizing Beirut. Useful for the normalization/softening lane.',
        'signal_tags': ['normalization', 'anti-right', 'hebrew-title'],
    },
    'l8ywkbl': {
        'english_gloss': 'Search for “Promised Land of Israel patch” in Hebrew and see whether such merchandise is openly sold.',
        'investigation_note': 'Useful as territorial-expansion rhetoric bait. It explicitly points readers to Hebrew search terms rather than just making the accusation in English.',
        'signal_tags': ['territorial-rhetoric', 'search-bait', 'hebrew-keywords'],
    },
    'lzmiv56': {
        'english_gloss': 'Genius!!',
        'investigation_note': 'Simple positive reinforcement in Hebrew. Low analytical weight by itself, but useful for mapping when Hebrew appears casually in otherwise English threads.',
        'signal_tags': ['praise', 'casual-hebrew'],
    },
    'lpttgt1': {
        'english_gloss': 'Write “Dalbyob” / the transliterated insult; he will get it.',
        'investigation_note': 'Cross-language transliteration coaching. High-value for the identity-performance and coded-hostility lanes.',
        'signal_tags': ['transliteration', 'insult', 'language-coaching'],
    },
}

STATIC_RHETORIC = [
    'buffer zone',
    'Litani',
    'unit 504',
    'QR code',
    'death zone',
    'peace through strength',
    'natural northern border',
    'expel everyone',
    'כבדהו וחשדהו',
    'ב"מ',
    'hasbara talking points',
    'די כבר',
]


def load_json(path: Path) -> Any:
    return json.loads(path.read_text())


def load_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline='') as handle:
        reader = csv.DictReader(handle)
        rows = []
        for row in reader:
            clean = {}
            for key, value in row.items():
                if key is None:
                    continue
                clean[key.lstrip('\ufeff').strip()] = value.strip() if isinstance(value, str) else value
            rows.append(clean)
        return rows


def parse_int(value: str | None, default: int = 0) -> int:
    if not value:
        return default
    try:
        return int(float(value))
    except ValueError:
        return default


def parse_float(value: str | None, default: float = 0.0) -> float:
    if not value:
        return default
    try:
        return float(value)
    except ValueError:
        return default


def slugify(value: str) -> str:
    return re.sub(r'[^a-z0-9]+', '-', value.lower()).strip('-') or 'item'


def month_from_date(date_text: str | None) -> str:
    return (date_text or '')[:7]


def split_multi(value: str | None) -> list[str]:
    if not value:
        return []
    parts = re.split(r'[;|]', value)
    return [part.strip() for part in parts if part.strip()]


def norm_domain(url: str | None) -> str:
    if not url:
        return ''
    parsed = urlparse(url)
    return parsed.netloc.lower().removeprefix('www.')


def token_set(*values: str | None) -> set[str]:
    tokens: set[str] = set()
    for value in values:
        if not value:
            continue
        for token in TOKEN_RE.findall(value.lower()):
            if len(token) >= 3:
                tokens.add(token)
    return tokens


def same_event(a: dict[str, Any], b: dict[str, Any]) -> bool:
    if a.get('event_date') != b.get('event_date'):
        return False
    a_tokens = token_set(
        a.get('source_headline_english'),
        a.get('one_line_summary'),
        a.get('location_city_town_village_or_neighborhood'),
        a.get('people_named'),
    )
    b_tokens = token_set(
        b.get('source_headline_english'),
        b.get('one_line_summary'),
        b.get('location_city_town_village_or_neighborhood'),
        b.get('people_named'),
    )
    if not a_tokens or not b_tokens:
        return False
    intersection = len(a_tokens & b_tokens)
    union = len(a_tokens | b_tokens) or 1
    return intersection >= 2 or (intersection / union) >= 0.18


def infer_language_mode(text: str) -> str:
    has_he = bool(HEBREW_RANGE.search(text))
    has_ar = bool(ARABIC_RANGE.search(text))
    has_lat = bool(re.search(r'[A-Za-z]', text))
    if has_he and has_ar and has_lat:
        return 'hebrew-arabic-english'
    if has_he and has_lat:
        return 'mixed-hebrew-english'
    if has_he and has_ar:
        return 'mixed-hebrew-arabic'
    if has_he:
        return 'hebrew'
    if has_ar and has_lat:
        return 'arabic-english'
    return 'other'


def build_source_inventory() -> list[dict[str, Any]]:
    source_files = [
        EXTERNAL_RAW / 'chatgpt_5.4-extended_pro_SOURCE_INVENTORY.csv',
        EXTERNAL_RAW / 'perplexity_pro_claude_46_SOURCE_INVENTORY.csv',
    ]
    merged: dict[str, dict[str, Any]] = {}
    for path in source_files:
        vendor = 'chatgpt_5_4' if 'chatgpt' in path.name else 'perplexity_claude_46'
        for row in load_csv(path):
            key = norm_domain(row.get('base_url')) or slugify(row.get('source_name', 'unknown-source'))
            existing = merged.setdefault(
                key,
                {
                    'source_id': row.get('source_id') or key,
                    'source_name': row.get('source_name') or key,
                    'base_url': row.get('base_url') or '',
                    'language': row.get('language') or '',
                    'country_or_region': row.get('country_or_region') or '',
                    'source_type': row.get('source_type') or 'other',
                    'likely_coverage_strength': row.get('likely_coverage_strength') or 'medium',
                    'known_bias_or_positioning_if_obvious': row.get('known_bias_or_positioning_if_obvious') or '',
                    'notes_on_relevance': row.get('notes_on_relevance') or '',
                    'vendors': [],
                },
            )
            if vendor not in existing['vendors']:
                existing['vendors'].append(vendor)
            if len((row.get('notes_on_relevance') or '')) > len(existing['notes_on_relevance']):
                existing['notes_on_relevance'] = row.get('notes_on_relevance') or existing['notes_on_relevance']
            if len((row.get('known_bias_or_positioning_if_obvious') or '')) > len(existing['known_bias_or_positioning_if_obvious']):
                existing['known_bias_or_positioning_if_obvious'] = row.get('known_bias_or_positioning_if_obvious') or existing['known_bias_or_positioning_if_obvious']
    rows = []
    for item in merged.values():
        item['vendor_count'] = len(item['vendors'])
        rows.append(item)
    rows.sort(key=lambda row: (-row['vendor_count'], row['source_name']))
    return rows


@dataclass
class EventBundle:
    primary: list[dict[str, str]]
    secondary: list[dict[str, str]]
    kind: str


def normalize_event(row: dict[str, str], vendor: str, kind: str, matched_vendors: list[str] | None = None) -> dict[str, Any]:
    date = row.get('event_date') or row.get('publication_date') or ''
    headline = row.get('source_headline_english') or row.get('source_headline_original') or row.get('one_line_summary') or 'Unnamed event'
    return {
        'id': row.get('event_id') or f"{kind}-{slugify(headline)}-{date}",
        'kind': kind,
        'event_date': date,
        'month': month_from_date(date),
        'publication_date': row.get('publication_date') or '',
        'source_name': row.get('source_name') or 'Unknown source',
        'source_language': row.get('source_language') or '',
        'source_url': row.get('source_url') or '',
        'headline_original': row.get('source_headline_original') or '',
        'headline_english': headline,
        'label': headline,
        'summary': row.get('one_line_summary') or '',
        'location': row.get('location_city_town_village_or_neighborhood') or row.get('location_region_or_governorate') or '',
        'region': row.get('location_region_or_governorate') or '',
        'parties_involved': split_multi(row.get('parties_involved')),
        'incident_type': row.get('incident_type') or 'other',
        'violation_type': row.get('violation_type_if_applicable') or '',
        'people_named': split_multi(row.get('people_named')),
        'organizations_named': split_multi(row.get('organizations_named')),
        'casualties': row.get('casualties_if_stated') or '',
        'target_type': row.get('target_type') or '',
        'cross_border_relevance': row.get('cross_border_relevance') or '',
        'topic_labels': split_multi(row.get('topic_labels')),
        'subreddit_relevance_score': parse_int(row.get('subreddit_relevance_score'), 0),
        'likely_trigger_reason': row.get('likely_subreddit_trigger_reason') or '',
        'corroboration_level': row.get('corroboration_level') or '',
        'confidence_notes': row.get('confidence_notes') or '',
        'vendors': [vendor, *(matched_vendors or [])],
        'vendor_count': len({vendor, *(matched_vendors or [])}),
    }


def merge_events(bundle: EventBundle) -> list[dict[str, Any]]:
    secondary_unused = set(range(len(bundle.secondary)))
    merged: list[dict[str, Any]] = []
    for primary_row in bundle.primary:
        matches: list[int] = []
        for idx in list(secondary_unused):
            if same_event(primary_row, bundle.secondary[idx]):
                matches.append(idx)
        for idx in matches:
            secondary_unused.discard(idx)
        merged.append(normalize_event(primary_row, 'chatgpt_5_4', bundle.kind, ['perplexity_claude_46'] if matches else []))
    for idx in sorted(secondary_unused):
        merged.append(normalize_event(bundle.secondary[idx], 'perplexity_claude_46', bundle.kind))
    merged.sort(key=lambda row: (row['event_date'], -row['subreddit_relevance_score'], row['label']))
    return merged


def merge_watchlist() -> list[dict[str, Any]]:
    rows = []
    inputs = [
        ('chatgpt_5_4', load_csv(EXTERNAL_RAW / 'chatgpt_5.4-extended_pro_OBSCURE_WATCHLIST.csv')),
        ('perplexity_claude_46', load_csv(EXTERNAL_RAW / 'perplexity_pro_claude_46_OBSCURE_WATCHLIST.csv')),
    ]
    merged: dict[tuple[str, str], dict[str, Any]] = {}
    for vendor, source_rows in inputs:
        for row in source_rows:
            key = ((row.get('name_or_place') or '').lower(), row.get('type') or '')
            item = merged.setdefault(
                key,
                {
                    'watch_id': row.get('watch_id') or slugify(row.get('name_or_place', 'watch')),
                    'name_or_place': row.get('name_or_place') or '',
                    'type': row.get('type') or 'other',
                    'event_id': row.get('event_id') or '',
                    'date': row.get('date') or '',
                    'why_it_is_notable': row.get('why_it_is_notable') or '',
                    'likely_reason_it_might_surface_on_subreddit': row.get('likely_reason_it_might_surface_on_subreddit') or '',
                    'source_url': row.get('source_url') or '',
                    'vendors': [],
                },
            )
            if vendor not in item['vendors']:
                item['vendors'].append(vendor)
            if len((row.get('why_it_is_notable') or '')) > len(item['why_it_is_notable']):
                item['why_it_is_notable'] = row.get('why_it_is_notable') or item['why_it_is_notable']
            if len((row.get('likely_reason_it_might_surface_on_subreddit') or '')) > len(item['likely_reason_it_might_surface_on_subreddit']):
                item['likely_reason_it_might_surface_on_subreddit'] = row.get('likely_reason_it_might_surface_on_subreddit') or item['likely_reason_it_might_surface_on_subreddit']
    rows = list(merged.values())
    for row in rows:
        row['vendor_count'] = len(row['vendors'])
    rows.sort(key=lambda row: (-row['vendor_count'], row['date'], row['name_or_place']))
    return rows


def build_cross_reference() -> dict[str, Any]:
    chatgpt = load_json(EXTERNAL_RAW / 'chatgpt_5.4-extended_pro_CROSS_REFERENCE_RULES.json')
    perplexity = load_json(EXTERNAL_RAW / 'perplexity_pro_claude_46_CROSS_REFERENCE_RULES.json')

    def window_rows(payload: dict[str, Any]) -> list[dict[str, Any]]:
        raw = payload.get('priority_windows', [])
        if isinstance(raw, dict):
            raw = raw.get('windows', [])
        if isinstance(raw, list):
            return [item for item in raw if isinstance(item, dict)]
        return []

    def flatten_join_keys(payload: dict[str, Any]) -> list[str]:
        raw = payload.get('suggested_join_keys', [])
        flattened: list[str] = []
        if isinstance(raw, list):
            for item in raw:
                if isinstance(item, str):
                    flattened.append(item)
        elif isinstance(raw, dict):
            for value in raw.values():
                if isinstance(value, list):
                    for item in value:
                        if isinstance(item, str):
                            flattened.append(item)
                        elif isinstance(item, dict):
                            for sub_key, sub_value in item.items():
                                if isinstance(sub_value, str) and sub_key in {'join_type', 'method'}:
                                    flattened.append(sub_value)
                elif isinstance(value, str):
                    flattened.append(value)
        # preserve order while deduplicating
        return list(dict.fromkeys(flattened))

    def extract_trigger_map(payload: dict[str, Any]) -> list[dict[str, Any]]:
        raw = payload.get('event_types_most_likely_to_trigger_subreddit_spikes', [])
        rows: list[dict[str, Any]] = []
        if isinstance(raw, list):
            for item in raw:
                if isinstance(item, dict):
                    rows.append(
                        {
                            'event_type': item.get('event_type') or item.get('incident_type') or 'unknown',
                            'why': item.get('why') or item.get('expected_response') or '',
                            'tier': item.get('tier') or 'primary',
                        }
                    )
        elif isinstance(raw, dict):
            for tier, items in raw.items():
                if not isinstance(items, list):
                    continue
                for item in items:
                    if isinstance(item, dict):
                        rows.append(
                            {
                                'event_type': item.get('event_type') or item.get('incident_type') or 'unknown',
                                'why': item.get('why') or item.get('expected_response') or '',
                                'tier': tier,
                            }
                        )
        return rows

    def collect_list_values(payload: dict[str, Any], key: str) -> list[str]:
        raw = payload.get(key, [])
        if isinstance(raw, list):
            return [item for item in raw if isinstance(item, str)]
        if isinstance(raw, dict):
            values: list[str] = []
            for value in raw.values():
                if isinstance(value, list):
                    values.extend(item for item in value if isinstance(item, str))
                elif isinstance(value, str):
                    values.append(value)
            return values
        return []

    priority_windows = []
    for item in window_rows(chatgpt):
        priority_windows.append({
            'window_month': item.get('window_month') or item.get('month') or month_from_date(item.get('start')) or '',
            'start': item.get('start') or '',
            'end': item.get('end') or '',
            'label': item.get('window_name') or item.get('window_id') or '',
            'why': item.get('why') or item.get('reason') or item.get('notes') or '',
            'priority': item.get('join_priority') or item.get('priority') or '',
        })
    seen = {row['window_month'] for row in priority_windows}
    for item in window_rows(perplexity):
        month = item.get('window_month') or item.get('month') or month_from_date(item.get('start')) or month_from_date(item.get('date_range')) or ''
        if not month and isinstance(item.get('date_range'), str):
            month = month_from_date(item.get('date_range', '').split(' to ')[0])
        if month and month not in seen:
            priority_windows.append({
                'window_month': month,
                'start': item.get('start') or (item.get('date_range', '').split(' to ')[0] if isinstance(item.get('date_range'), str) and ' to ' in item.get('date_range', '') else ''),
                'end': item.get('end') or (item.get('date_range', '').split(' to ')[1] if isinstance(item.get('date_range'), str) and ' to ' in item.get('date_range', '') else ''),
                'label': item.get('window_name') or item.get('window_id') or '',
                'why': item.get('why') or item.get('reason') or item.get('rationale') or '',
                'priority': item.get('join_priority') or item.get('priority') or '',
            })
            seen.add(month)

    join_keys = []
    for key in flatten_join_keys(chatgpt):
        join_keys.append(key)
    for key in flatten_join_keys(perplexity):
        if key not in join_keys:
            join_keys.append(key)

    heuristics = []
    for key in ['matching_heuristics', 'analysis_priorities', 'validation_checks']:
        values = collect_list_values(chatgpt, key)
        heuristics.extend(values)
    for key in ['validation_checks', 'analysis_priorities']:
        values = collect_list_values(perplexity, key)
        for value in values:
            if value not in heuristics:
                heuristics.append(value)

    source_weighting: list[Any] = []
    for item in [chatgpt.get('local_vs_global_source_weighting_logic'), perplexity.get('local_vs_global_source_weighting_logic')]:
        if item:
            source_weighting.append(item)

    trigger_map = []
    for row in extract_trigger_map(chatgpt):
        trigger_map.append(row)
    seen_triggers = {(row['event_type'], row['tier']) for row in trigger_map}
    for row in extract_trigger_map(perplexity):
        key = (row['event_type'], row['tier'])
        if key not in seen_triggers:
            trigger_map.append(row)
            seen_triggers.add(key)

    return {
        'priority_windows': priority_windows,
        'join_keys': join_keys,
        'matching_heuristics': heuristics,
        'source_weighting_logic': source_weighting,
        'obscure_name_logic': [item for item in [chatgpt.get('obscure_name_logic'), perplexity.get('obscure_name_logic')] if item],
        'event_trigger_map': trigger_map,
    }


def build_hebrew_highlights() -> list[dict[str, Any]]:
    rows = load_csv(PHASE2_DEEP / 'hebrew_priority_review.csv')
    highlights = []
    for row in rows[:18]:
        source_text = row.get('text') or ''
        title = row.get('title') or ''
        combined = '\n\n'.join([value for value in [title, source_text] if value])
        annotation = HEBREW_ANNOTATIONS.get(row['id'], {})
        highlights.append({
            'id': row['id'],
            'kind': row.get('kind') or 'comment',
            'month': row.get('month') or '',
            'created_utc': parse_int(row.get('created_utc')),
            'author': row.get('author') or '',
            'author_flair_text': row.get('author_flair_text') or 'Unflaired/Unknown',
            'score': parse_int(row.get('score')),
            'link_id': row.get('link_id') or '',
            'parent_id': row.get('parent_id') or '',
            'title': title,
            'text': source_text,
            'language_mode': infer_language_mode(combined),
            'english_gloss': annotation.get('english_gloss') or 'Original preserved for bilingual review; translation/gloss pending manual pass.',
            'investigation_note': annotation.get('investigation_note') or 'Preserved as a high-score Hebrew or mixed-language item for later close reading.',
            'signal_tags': annotation.get('signal_tags') or ['hebrew-review'],
        })
    return highlights


def build_month_rollups(major_events: list[dict[str, Any]], ceasefire_events: list[dict[str, Any]]) -> list[dict[str, Any]]:
    buckets: dict[str, dict[str, Any]] = defaultdict(lambda: {'month': '', 'major_events': 0, 'ceasefire_events': 0, 'high_relevance_events': 0})
    for row in major_events:
        bucket = buckets[row['month']]
        bucket['month'] = row['month']
        bucket['major_events'] += 1
        if row['subreddit_relevance_score'] >= 4:
            bucket['high_relevance_events'] += 1
    for row in ceasefire_events:
        bucket = buckets[row['month']]
        bucket['month'] = row['month']
        bucket['ceasefire_events'] += 1
        if row['subreddit_relevance_score'] >= 4:
            bucket['high_relevance_events'] += 1
    return sorted(buckets.values(), key=lambda row: row['month'])


def build_source_summaries(source_inventory: list[dict[str, Any]]) -> dict[str, list[dict[str, Any]]]:
    by_type = Counter(item['source_type'] for item in source_inventory)
    by_language = Counter()
    for item in source_inventory:
        for language in [part.strip() for part in item['language'].split(',') if part.strip()]:
            by_language[language] += 1
    return {
        'by_type': [{'label': key, 'count': value} for key, value in by_type.most_common()],
        'by_language': [{'label': key, 'count': value} for key, value in by_language.most_common()],
    }


def load_base_dashboard() -> dict[str, Any]:
    return load_json(PHASE2_DEEP / 'dashboard_data.json')


def main() -> None:
    dashboard = load_base_dashboard()
    keyword_series = [{**row, **{key: parse_int(value) if key != 'month' else value for key, value in row.items()}} for row in load_csv(PHASE2 / 'keyword_time_series.csv')]
    hebrew_activity = [{**row, 'hebrew_posts': parse_int(row.get('hebrew_posts')), 'hebrew_comments': parse_int(row.get('hebrew_comments'))} for row in load_csv(PHASE2 / 'hebrew_activity.csv')]
    top_authors = [{**row, 'posts': parse_int(row.get('posts')), 'comments': parse_int(row.get('comments')), 'total': parse_int(row.get('total')), 'hebrew_items': parse_int(row.get('hebrew_items'))} for row in load_csv(PHASE2 / 'top_authors.csv')[:20]]
    monthly_top_authors = [{**row, 'items': parse_int(row.get('items')), 'hebrew_items': parse_int(row.get('hebrew_items'))} for row in load_csv(PHASE2_DEEP / 'monthly_top_authors.csv')[:36]]
    user_history_summary = [
        {
            **row,
            'all_total': parse_int(row.get('all_total')),
            'fb_total': parse_int(row.get('fb_total')),
            'manual_review_score': parse_int(row.get('manual_review_score')),
            'outside_israel_related_comments': parse_int(row.get('outside_israel_related_comments')),
            'outside_lebanon_related_comments': parse_int(row.get('outside_lebanon_related_comments')),
            'outside_hebrew_items': parse_int(row.get('outside_hebrew_items')),
            'fb_focus_ratio': parse_float(row.get('fb_focus_ratio')),
        }
        for row in load_csv(PHASE2_DEEP / 'user_history_summary.csv')[:18]
    ]

    source_inventory = build_source_inventory()
    major_events = merge_events(
        EventBundle(
            primary=load_csv(EXTERNAL_RAW / 'chatgpt_5.4-extended_pro_MAJOR_EVENT_TIMELINE.csv'),
            secondary=load_csv(EXTERNAL_RAW / 'perplexity_pro_claude_46_MAJOR_EVENT_TIMELINE.csv'),
            kind='major',
        )
    )
    ceasefire_events = merge_events(
        EventBundle(
            primary=load_csv(EXTERNAL_RAW / 'chatgpt_5.4-extended_pro_POST_CEASEFIRE_VIOLATION_LOG_part_1_2024-11_to_2025-06.csv')
            + load_csv(EXTERNAL_RAW / 'chatgpt_5.4-extended_pro_POST_CEASEFIRE_VIOLATION_LOG_part_2_2025-07_to_2026-03.csv'),
            secondary=load_csv(EXTERNAL_RAW / 'perplexity_pro_claude_46_POST_CEASEFIRE_VIOLATION_LOG.csv'),
            kind='ceasefire',
        )
    )
    watchlist = merge_watchlist()
    source_summaries = build_source_summaries(source_inventory)
    event_month_rollup = build_month_rollups(major_events, ceasefire_events)
    cross_reference = build_cross_reference()
    hebrew_highlights = build_hebrew_highlights()

    rhetoric_watchwords = list(dict.fromkeys(STATIC_RHETORIC + [row['name_or_place'] for row in watchlist[:18]]))

    evidence_ledger = [
        {'artifact': 'Cleaned subreddit posts', 'status': 'ready', 'note': 'analysis-preserving export retained in NDJSON'},
        {'artifact': 'Cleaned subreddit comments', 'status': 'ready', 'note': 'thread linkage and flair preserved'},
        {'artifact': 'User-history intake', 'status': 'ready', 'note': 'Arctic Shift batch downloaded and summarized'},
        {'artifact': 'Merged external event registry', 'status': 'ready', 'note': 'ChatGPT and Perplexity structured outputs normalized into one site dataset'},
        {'artifact': 'Hebrew review lens', 'status': 'ready', 'note': 'priority Hebrew items surfaced with English glosses and signal tags'},
        {'artifact': 'Cross-reference rules', 'status': 'ready', 'note': 'join windows, obscure-name logic, and source weighting preserved'},
    ]

    site_data = {
        **dashboard,
        'keyword_series': keyword_series,
        'hebrew_activity': hebrew_activity,
        'top_authors': top_authors,
        'monthly_top_authors': monthly_top_authors,
        'user_history_summary': user_history_summary,
        'hebrew_highlights': hebrew_highlights,
        'source_inventory': source_inventory,
        'source_summaries': source_summaries,
        'major_events': major_events,
        'ceasefire_events': ceasefire_events,
        'event_month_rollup': event_month_rollup,
        'watchlist': watchlist,
        'cross_reference': cross_reference,
        'rhetoric_watchwords': rhetoric_watchwords,
        'evidence_ledger': evidence_ledger,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(site_data, ensure_ascii=False, indent=2))
    print(f'Wrote {OUTPUT}')


if __name__ == '__main__':
    main()
