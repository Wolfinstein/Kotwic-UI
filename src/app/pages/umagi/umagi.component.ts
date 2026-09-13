import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { UMAGI_TABLE, UmagDef } from '../../data/umagiTable';

// The two effects that can never appear together in the same combo.
const EXCLUSIVE_A = 'obrażenia wszystkich broni +1 na każde 4 poziomy postaci';
const EXCLUSIVE_B = 'ilość dodatkowych ataków każdą bronią: 1';

const MAX_LPC = 24999;
const DEFAULT_P2 = 30;
const DEFAULT_P3 = 5;

@Component({
  selector: 'app-umagi',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, SliderModule, SelectModule, ButtonModule],
  templateUrl: './umagi.component.html',
  styleUrl: './umagi.component.css'
})
export class UmagiComponent {
  readonly maxLpc = MAX_LPC;

  lpc: number = 0;

  p2: number | null = DEFAULT_P2;
  p3: number | null = DEFAULT_P3;

  lastRoll: UmagDef[] | null = null;
  rolledWithNoPool = false;

  manualSlot1: UmagDef | null = null;
  manualSlot2: UmagDef | null = null;
  manualSlot3: UmagDef | null = null;

  onLpcChange(): void {
    this.manualSlot1 = null;
    this.manualSlot2 = null;
    this.manualSlot3 = null;
  }

  onSlot1Change(): void {
    this.manualSlot2 = null;
    this.manualSlot3 = null;
  }

  onSlot2Change(): void {
    this.manualSlot3 = null;
  }

  get availablePool(): UmagDef[] {
    return this.availableFor(this.lpc);
  }

  private availableFor(lpc: number): UmagDef[] {
    return UMAGI_TABLE.filter(u => u.value > lpc);
  }

  private isExclusivePair(a: UmagDef, b: UmagDef): boolean {
    const pair = [a.effect, b.effect];
    return pair.includes(EXCLUSIVE_A) && pair.includes(EXCLUSIVE_B);
  }

  private conflictsWithAny(candidate: UmagDef, chosen: UmagDef[]): boolean {
    return chosen.some(c => this.isExclusivePair(candidate, c));
  }

  /** Entries from `pool` that are still legal to pick given what's already `chosen`. */
  private poolExcluding(pool: UmagDef[], chosen: UmagDef[]): UmagDef[] {
    return pool.filter(u => !chosen.includes(u) && !this.conflictsWithAny(u, chosen));
  }

  private toOption(u: UmagDef): { label: string; value: UmagDef } {
    return { label: `${this.format(u.value)} — ${u.effect}`, value: u };
  }

  get slot1Options(): { label: string; value: UmagDef }[] {
    return this.availablePool.map(u => this.toOption(u));
  }

  // Only the 1st umag's pool is gated by LPC. The 2nd/3rd bonus rolls draw
  // from the entire table, regardless of current LPC — only the no-duplicate
  // and exclusivity rules apply to them.
  get slot2Options(): { label: string; value: UmagDef }[] {
    if (!this.manualSlot1) return [];
    return this.poolExcluding(UMAGI_TABLE, [this.manualSlot1]).map(u => this.toOption(u));
  }

  get slot3Options(): { label: string; value: UmagDef }[] {
    if (!this.manualSlot1 || !this.manualSlot2) return [];
    return this.poolExcluding(UMAGI_TABLE, [this.manualSlot1, this.manualSlot2]).map(u => this.toOption(u));
  }

  /** Exact % chance of drawing this precise sequence, chaining roll-2/roll-3 odds. */
  private comboProbabilityPercent(chosen: UmagDef[]): number {
    const pool1 = this.availablePool;
    if (chosen.length === 0 || pool1.length === 0) return 0;
    const p2 = (this.p2 ?? 0) / 100;
    const p3 = (this.p3 ?? 0) / 100;

    let prob = 1 / pool1.length;
    if (chosen.length >= 2) {
      const pool2 = this.poolExcluding(UMAGI_TABLE, [chosen[0]]);
      prob *= p2 * (1 / pool2.length);
    }
    if (chosen.length >= 3) {
      const pool3 = this.poolExcluding(UMAGI_TABLE, [chosen[0], chosen[1]]);
      prob *= p3 * (1 / pool3.length);
    }
    return prob * 100;
  }

  get manualProbabilityPercent(): number | null {
    if (!this.manualSlot1) return null;
    const chosen = [this.manualSlot1, this.manualSlot2, this.manualSlot3].filter(
      (x): x is UmagDef => x !== null
    );
    return this.comboProbabilityPercent(chosen);
  }

  /** Recomputed live against the currently selected LPC, not frozen at roll time. */
  get lastRollProbabilityPercent(): number | null {
    if (!this.lastRoll) return null;
    return this.comboProbabilityPercent(this.lastRoll);
  }

  private pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private rollChance(percent: number | null): boolean {
    return Math.random() * 100 < (percent ?? 0);
  }

  rollUmagi(): void {
    const pool1 = this.availablePool;
    if (pool1.length === 0) {
      this.lastRoll = null;
      this.rolledWithNoPool = true;
      return;
    }
    this.rolledWithNoPool = false;

    const chosen: UmagDef[] = [this.pickRandom(pool1)];

    if (this.rollChance(this.p2)) {
      const pool2 = this.poolExcluding(UMAGI_TABLE, chosen);
      if (pool2.length > 0) {
        chosen.push(this.pickRandom(pool2));
        if (this.rollChance(this.p3)) {
          const pool3 = this.poolExcluding(UMAGI_TABLE, chosen);
          if (pool3.length > 0) {
            chosen.push(this.pickRandom(pool3));
          }
        }
      }
    }

    this.lastRoll = chosen;
  }

  formatPercent(p: number | null): string {
    if (p === null) return '—';
    if (p === 0) return '0%';
    if (p >= 1) return p.toFixed(2) + '%';
    if (p >= 0.01) return p.toFixed(4) + '%';
    if (p >= 0.0001) return p.toFixed(6) + '%';
    return p.toExponential(3) + '%';
  }

  format(n: number): string {
    return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(n);
  }
}
