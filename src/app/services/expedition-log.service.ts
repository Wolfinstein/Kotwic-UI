import { Injectable } from '@angular/core';
import { MobStatVariant } from '../logic/expeditionCombat';

export interface ExpeditionLogPayload {
  action: 'single' | 'bulk';
  tower: string;
  mob: string;
  star: number;
  variant: MobStatVariant;
  players: string[];
  runs?: number;
  /** Win/loss/draw rates from a bulk simulation, as whole percentages (0-100). */
  winPct?: number;
  lossPct?: number;
  drawPct?: number;
}

/** Strips anything that isn't URL-safe so the log path never needs percent-encoding. */
function slug(value: string): string {
  return value.replace(/[^A-Za-z0-9-]+/g, '_');
}

@Injectable({ providedIn: 'root' })
export class ExpeditionLogService {
  log(payload: ExpeditionLogPayload): void {
    const parts = [
      payload.action,
      slug(payload.tower),
      slug(payload.mob),
      String(payload.star),
      payload.variant,
      payload.players.map(slug).join('+') || 'none',
    ];
    if (payload.runs) parts.push(`runs${payload.runs}`);
    if (payload.winPct !== undefined) parts.push(`win${payload.winPct}`);
    if (payload.lossPct !== undefined) parts.push(`loss${payload.lossPct}`);
    if (payload.drawPct !== undefined) parts.push(`draw${payload.drawPct}`);
    fetch(`/api/test/${parts.join('~')}`).catch(() => {});
  }
}
