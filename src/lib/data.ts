import fs from 'fs';
import path from 'path';
import * as Papa from 'papaparse';

const DATA_DIR = path.join(process.cwd(), 'data');

// Types

export interface OverviewStats {
  posts: number;
  comments: number;
  hebrew_posts: number;
  hebrew_comments: number;
  downloaded_user_histories: number;
}

export interface SpikeMonth {
  month: string;
  posts: number;
  comments: number;
  total: number;
  hebrew_posts: number;
  hebrew_comments: number;
  post_zscore: number;
  comment_zscore: number;
}

export interface FlairMonth {
  month: string;
  flair: string;
  count: number;
}

export interface TopAuthor {
  month: string;
  author: string;
  flair: string;
  count: number;
}

export interface Edge {
  source: string;
  target: string;
  weight: number;
}

export interface Thread {
  id: string;
  title: string;
  comments: number;
  month: string;
  author: string;
  flair: string;
}

export interface HebrewItem {
  id: string;
  type: string;
  text: string;
  gloss: string;
  note: string;
  tags: string[];
  month: string;
}

export interface Event {
  date: string;
  description: string;
  delta: number;
  source: string;
}

export interface PersonaScore {
  actor: string;
  flair: string;
  fb_comments: number;
  total_outside: number;
  peace_fb: number;
  security_fb: number;
  anti_hezb_fb: number;
  palestine_fb: number;
  peace_out: number;
  security_out: number;
  anti_hezb_out: number;
  palestine_out: number;
  shift_score: number;
}

export interface FightThread {
  id: string;
  title: string;
  month: string;
  score: number;
  hostility_count: number;
  identity_challenge_count: number;
  author_flair: string;
  permalink: string;
  top_tags: string[];
}

export interface Signal {
  actor: string;
  flair: string;
  comment_id: string;
  text: string;
  pattern: string;
  context: string;
}

// Internal cache for the JSON file to avoid parsing it heavily
let _siteDataCash: any = null;

function getSiteData() {
  if (!_siteDataCash) {
    const filePath = path.join(DATA_DIR, 'phase2_outputs', 'site', 'poison_site_data.json');
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      _siteDataCash = JSON.parse(raw);
    } catch (e) {
      console.warn("Could not read poison_site_data.json");
      _siteDataCash = {};
    }
  }
  return _siteDataCash;
}

function parseCsv<T>(relPath: string): T[] {
  const filePath = path.join(DATA_DIR, relPath);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = Papa.parse(raw, { header: true, skipEmptyLines: true, dynamicTyping: true });
    return parsed.data as T[];
  } catch(e) {
    console.warn("Could not parse CSV: " + relPath);
    return [];
  }
}

// Accessors

export function getOverview(): OverviewStats {
  const data = getSiteData();
  if (data?.overview) return data.overview;
  return { posts: 0, comments: 0, hebrew_posts: 0, hebrew_comments: 0, downloaded_user_histories: 0 };
}

export function getSpikeMonths(): SpikeMonth[] {
  // Can be read from JSON or CSV. Reading from JSON since it has it.
  const data = getSiteData();
  if (data?.spike_months) return data.spike_months;
  return parseCsv<SpikeMonth>('phase2_outputs/deep/monthly_spikes.csv');
}

export function getFlarBreakdown(): FlairMonth[] {
  return parseCsv<FlairMonth>('phase2_outputs/deep/monthly_flair_breakdown.csv');
}

export function getTopAuthors(): TopAuthor[] {
  return parseCsv<TopAuthor>('phase2_outputs/deep/monthly_top_authors.csv');
}

export function getInteractionEdges(): Edge[] {
  return parseCsv<Edge>('phase2_outputs/deep/interaction_edges.csv');
}

export function getDenseThreads(): Thread[] {
  return parseCsv<Thread>('phase2_outputs/deep/dense_threads.csv');
}

export function getPersonaScores(): PersonaScore[] {
  return parseCsv<PersonaScore>('phase3_outputs/contradiction/persona_context_scores.csv');
}

export function getFightThreads(): FightThread[] {
  const rawData = parseCsv<any>('phase3_outputs/contradiction/fight_threads.csv');
  return rawData.map(row => ({
    ...row,
    top_tags: row.top_tags ? row.top_tags.split('|') : []
  }));
}

export function getTransliterationSignals(): Signal[] {
  return parseCsv<Signal>('phase3_outputs/contradiction/transliteration_signals.csv');
}

export function getHebrewAnnotations(): HebrewItem[] {
  const data = getSiteData();
  if (data?.hebrew_annotations) return data.hebrew_annotations;
  return [];
}

export function getEventTimeline(): Event[] {
  // If event timeline is described in event_timeline.json or site data
  const data = getSiteData();
  if (data?.event_timeline) return data.event_timeline;
  try {
    const ep = path.join(DATA_DIR, 'phase2_outputs', 'site', 'event_timeline.json');
    if (fs.existsSync(ep)) {
        const raw = fs.readFileSync(ep, 'utf8');
        return JSON.parse(raw);
    }
  } catch (e) {}
  
  // Fallback if not physically present yet (prompt provided timeline descriptions)
  return [
    { date: "2023-10-07", description: "HAMAS ATTACK / GAZA WAR BEGINS", delta: 120, source: "Historical" },
    { date: "2024-06-01", description: "HEZBOLLAH SOUTHERN FRONT INTENSIFIES", delta: 40, source: "Historical" },
    { date: "2024-08-01", description: "TARGETED ASSASSINATIONS BEGIN", delta: 80, source: "Historical" },
    { date: "2024-09-17", description: "PAGER/WALKIE-TALKIE OPERATIONS", delta: 250, source: "Historical" },
    { date: "2024-09-27", description: "NASRALLAH ASSASSINATED", delta: 400, source: "Historical" },
    { date: "2024-10-02", description: "IDF GROUND INCURSION — S. LEBANON", delta: 300, source: "Historical" },
    { date: "2024-11-27", description: "LEBANON CEASEFIRE", delta: -100, source: "Historical" }
  ];
}
