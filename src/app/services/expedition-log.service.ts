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
    fetch(`/api/test/${parts.join('~')}`).catch(() => {});
  }
}
