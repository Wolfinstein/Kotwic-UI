import { Injectable } from '@angular/core';
import { MobStatVariant } from '../logic/expeditionCombat';

export interface ExpeditionLogPayload {
  action: 'single' | 'bulk';
  tower: string;
  mob: string;
  star: number;
  variant: MobStatVariant;
  players: string[];
  /** Share-code-encoded characters that took part in the run (see character-share.util.ts) — lets the exact builds be re-imported later from the Dziennik page. */
  charactersCode: string;
  runs?: number;
  /** Win/loss/draw rates from a bulk simulation, as whole percentages (0-100). */
  winPct?: number;
  lossPct?: number;
  drawPct?: number;
}

export interface SavedExpeditionLog {
  id: number;
  createdAt: string;
  action: 'single' | 'bulk';
  tower: string;
  mob: string;
  star: number;
  variant: MobStatVariant;
  players: string[];
  charactersCode: string;
  runs: number | null;
  winPct: number | null;
  lossPct: number | null;
  drawPct: number | null;
}

@Injectable({ providedIn: 'root' })
export class ExpeditionLogService {
  /** Fire-and-forget — a failed save should never interrupt the simulation the player is looking at. */
  log(payload: ExpeditionLogPayload): void {
    fetch('/api/expedition-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  /** Throws an Error whose message is 'UNAUTHORIZED' on a wrong password, so the Dziennik page can tell that apart from a generic fetch failure. */
  async list(password: string): Promise<SavedExpeditionLog[]> {
    const res = await fetch('/api/expedition-log', { headers: { 'x-dziennik-key': password } });
    if (res.status === 401) throw new Error('UNAUTHORIZED');
    if (!res.ok) throw new Error('Nie udało się pobrać zapisanych symulacji.');
    return res.json();
  }

  /** Throws an Error whose message is 'UNAUTHORIZED' on a wrong password. */
  async remove(id: number, password: string): Promise<void> {
    const res = await fetch(`/api/expedition-log?id=${id}`, {
      method: 'DELETE',
      headers: { 'x-dziennik-key': password },
    });
    if (res.status === 401) throw new Error('UNAUTHORIZED');
    if (!res.ok) throw new Error('Nie udało się usunąć zapisu.');
  }
}
