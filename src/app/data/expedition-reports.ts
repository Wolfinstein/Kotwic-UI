import { FEATURE_FLAGS } from '../config/feature-flags.generated';

/**
 * Real expedition reports, loaded lazily from Vercel Blob (EXPEDITION_REPORTS_URL, see
 * scripts/generate-feature-flags.js) or, when that isn't set, from the local
 * public/data/expedition-reports.json. Both are built by scripts/build-expedition-reports.js.
 * The file is compact (strings deduplicated, rows as positional arrays) — the field order below
 * must match that script.
 */

export interface ReportStats {
  strength: number;
  agility: number;
  resistance: number;
  looks: number;
  charisma: number;
  influence: number;
  perception: number;
  intelligence: number;
  wisdom: number;
  luck: number;
  defence: number;
}

export interface ReportPlayer extends ReportStats {
  name: string;
  level: number;
  hpMax: number;
  initiative: number;
  talismans: string[];
  evolutions: string[];
  arcanes: string[];
  huntBonuses: string[];
  silverBonuses: string[];
  goldBonuses: string[];
  race: string;
  weapons: string[];
  experience: number | null;
}

export interface ReportEnemy extends ReportStats {
  name: string;
  hpMax: number;
  initiative: number;
}

export interface ExpeditionReport {
  /** Position in the (newest-first) dataset — stable id for tracking/expansion. */
  id: number;
  date: string;
  eventName: string;
  url: string;
  location: string;
  boss: string;
  stars: number;
  difficulty: string;
  won: boolean;
  players: ReportPlayer[];
  enemies: ReportEnemy[];
}

export const REPORT_STAT_KEYS: (keyof ReportStats)[] = [
  'strength', 'agility', 'resistance', 'looks', 'charisma', 'influence',
  'perception', 'intelligence', 'wisdom', 'luck', 'defence',
];

export const REPORT_STAT_LABELS: Record<keyof ReportStats, string> = {
  strength: 'Siła', agility: 'Zwinność', resistance: 'Odporność', looks: 'Wygląd',
  charisma: 'Charyzma', influence: 'Wpływy', perception: 'Spostrz.', intelligence: 'Intel.',
  wisdom: 'Wiedza', luck: 'Szczęście', defence: 'Obrona',
};

interface CompactReports {
  v: number;
  s: string[];
  r: any[][];
}

const DATA_URL = FEATURE_FLAGS.expeditionReportsUrl || 'data/expedition-reports.json';

/**
 * The Blob copy is a .json.gz. Depending on how it's served the browser may already have
 * un-gzipped it (Content-Encoding: gzip) or hand us the raw gzip bytes, so check the gzip magic
 * number and decompress only when needed.
 */
async function readJson(res: Response): Promise<CompactReports> {
  const bytes = new Uint8Array(await res.arrayBuffer());
  if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    return new Response(stream).json();
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

function stats(row: any[], offset: number): ReportStats {
  const out = {} as ReportStats;
  REPORT_STAT_KEYS.forEach((k, i) => { out[k] = row[offset + i]; });
  return out;
}

function decode(data: CompactReports): ExpeditionReport[] {
  const s = data.s;
  const list = (ids: number[]): string[] => ids.map(i => s[i]);
  return data.r.map((r, id) => ({
    id,
    date: s[r[0]],
    eventName: s[r[1]],
    url: r[2] ? `https://r20.bloodwars.pl/showmsg.php?mid=${r[2]}&key=${s[r[3]]}` : '',
    location: s[r[4]],
    boss: s[r[5]],
    stars: r[6],
    difficulty: s[r[7]],
    won: r[8] === 1,
    players: (r[9] as any[][]).map(p => ({
      name: s[p[0]],
      level: p[1],
      hpMax: p[2],
      initiative: p[3],
      talismans: list(p[4]),
      evolutions: list(p[5]),
      arcanes: list(p[6]),
      huntBonuses: list(p[7]),
      silverBonuses: list(p[8]),
      goldBonuses: list(p[9]),
      race: s[p[10]],
      weapons: list(p[11]),
      experience: p[12],
      ...stats(p, 13),
    })),
    enemies: (r[10] as any[][]).map(e => ({
      name: s[e[0]],
      hpMax: e[1],
      initiative: e[2],
      ...stats(e, 3),
    })),
  }));
}

let cache: Promise<ExpeditionReport[]> | null = null;

/** Downloads and decodes the dataset once per session; later calls reuse the same promise. */
export function loadExpeditionReports(): Promise<ExpeditionReport[]> {
  if (!cache) {
    cache = fetch(DATA_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return readJson(res);
      })
      .then(decode)
      .catch(err => {
        cache = null; // allow a retry after a failed download
        throw err;
      });
  }
  return cache;
}
