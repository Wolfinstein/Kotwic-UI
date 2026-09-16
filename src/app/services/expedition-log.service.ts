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

@Injectable({ providedIn: 'root' })
export class ExpeditionLogService {
  log(payload: ExpeditionLogPayload): void {
    fetch('/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }
}
