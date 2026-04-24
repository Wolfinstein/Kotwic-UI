import { ExpeditionReport, normalizeReportBoss } from '../data/expedition-reports';
import { MobStatVariant } from './expeditionCombat';

const MAX_SUGGESTIONS = 3;

/** Report "Trudność" that corresponds to the simulator's MIN/MAX mob variant. "Losowy" matches neither. */
export const VARIANT_DIFFICULTY: Record<MobStatVariant, string> = {
  min: 'Najsłabszy',
  max: 'Najsilniejszy',
};

export interface ReportSuggestion {
  report: ExpeditionReport;
  /** Ways this report breaks an exact-match rule (★, team size, mob variant) — empty for an exact match. */
  differences: string[];
  /** Average relative level difference between the paired players (0.12 = 12%). Informational only — not part of an exact match. */
  levelDiff: number;
}

export interface ReportSuggestionResult {
  /** True when the best suggestion is an exact match: same mob, ★, team size and mob variant (MIN ↔ Najsłabszy, MAX ↔ Najsilniejszy). */
  exact: boolean;
  suggestions: ReportSuggestion[];
  /** How many reports exist for this boss at all. */
  bossReportCount: number;
  /** All exact-match reports — the basis for a real-world win rate. */
  similar: { total: number; wins: number };
}

/**
 * Relative level distance between the simulated team and a report's team. Equal-sized teams are
 * compared strongest-to-strongest, weakest-to-weakest; otherwise the average levels are compared.
 */
function levelDistance(simLevels: number[], reportLevels: number[]): number {
  const rel = (a: number, b: number) => Math.abs(a - b) / Math.max(a, b, 1);
  if (simLevels.length === reportLevels.length) {
    const a = [...simLevels].sort((x, y) => y - x);
    const b = [...reportLevels].sort((x, y) => y - x);
    return a.reduce((sum, lvl, i) => sum + rel(lvl, b[i]), 0) / a.length;
  }
  const avg = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;
  return rel(avg(simLevels), avg(reportLevels));
}

const playersLabel = (n: number) => `${n} ${n === 1 ? 'gracz' : 'graczy'}`;

/**
 * Finds the real reports closest to a simulated expedition. The boss must match. An exact match
 * also needs the same ★, team size and mob variant. Reports are ranked by how many of those rules
 * they break (star difference weighs most, then team size, then variant); among equally close
 * reports the newest win, since the game gets rebalanced over time. Player levels don't affect
 * the ranking — they're only reported for information. The picked reports come back newest first.
 */
export function suggestReports(reports: ExpeditionReport[], mobName: string, star: number, variant: MobStatVariant, simLevels: number[]): ReportSuggestionResult {
  const forBoss = reports.filter(r => normalizeReportBoss(r.boss) === mobName);
  const empty: ReportSuggestionResult = { exact: false, suggestions: [], bossReportCount: forBoss.length, similar: { total: 0, wins: 0 } };
  if (!forBoss.length || !simLevels.length) return empty;

  const wantedDifficulty = VARIANT_DIFFICULTY[variant];
  const scored = forBoss.map(report => {
    const reportLevels = report.players.map(p => p.level);
    const starDiff = Math.abs(report.stars - star);
    const countDiff = Math.abs(reportLevels.length - simLevels.length);
    const variantMismatch = report.difficulty !== wantedDifficulty;
    const levelDiff = levelDistance(simLevels, reportLevels);
    const score = starDiff * 3 + countDiff * 2 + (variantMismatch ? 1.5 : 0);
    const exact = starDiff === 0 && countDiff === 0 && !variantMismatch;
    return { report, reportLevels, starDiff, countDiff, variantMismatch, levelDiff, score, exact };
  });
  // Closest first; among equally close reports, newest first (dates sort lexicographically).
  scored.sort((a, b) => a.score - b.score || b.report.date.localeCompare(a.report.date));

  const exactMatches = scored.filter(s => s.exact);

  const picked = scored.slice(0, MAX_SUGGESTIONS).sort((a, b) => b.report.date.localeCompare(a.report.date));
  const suggestions: ReportSuggestion[] = picked.map(s => {
    const differences: string[] = [];
    if (s.starDiff) differences.push(`★ ${s.report.stars} zamiast ${star}`);
    if (s.countDiff) differences.push(`${playersLabel(s.reportLevels.length)} zamiast ${simLevels.length}`);
    if (s.variantMismatch) differences.push(`${s.report.difficulty} zamiast ${wantedDifficulty}`);
    return { report: s.report, differences, levelDiff: s.levelDiff };
  });

  return {
    exact: exactMatches.length > 0,
    suggestions,
    bossReportCount: forBoss.length,
    similar: { total: exactMatches.length, wins: exactMatches.filter(s => s.report.won).length },
  };
}
