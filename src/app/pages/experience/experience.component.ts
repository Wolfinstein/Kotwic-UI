import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { STAT_COST_TABLE } from '../../data/statCostTable';
import { EVOLUTIONS, EvolutionDef } from '../../data/evolutionsData';

interface LevelRow {
  level: number;
  requiredExp: number; // XP threshold to reach this level
  nextExp: number;     // XP threshold to reach the next level
  toNext: number;      // XP gained while at this level (delta)
}

const MAX_LEVEL = 1000;
const BASE_XP = 1000;
const GROWTH = 1.1;
// Above level 100 the 1.1 curve is bent down via a second-order recurrence:
// XP(L) = 2*XP(L-1) - XP(L-2) + ROUNDUP(34166 * 1.007^(L-101))
const BREAK_LEVEL = 100;
const SECOND_DIFF_BASE = 34166;
const SECOND_DIFF_GROWTH = 1.007;

// Stat cost is read straight from the static table (levels 1..STAT_COST_TABLE.length).
const MAX_STAT_LEVEL = STAT_COST_TABLE.length;

interface StatDef {
  key: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  readonly maxLevel = MAX_LEVEL;
  readonly maxStatLevel = MAX_STAT_LEVEL;

  selectedLevel: number | null = 1;
  current!: LevelRow;

  statDefs: StatDef[] = [
    { key: 'sila', label: 'Siła', icon: 'pi pi-bolt' },
    { key: 'zwinnosc', label: 'Zwinność', icon: 'pi pi-compass' },
    { key: 'odpornosc', label: 'Odporność', icon: 'pi pi-shield' },
    { key: 'wyglad', label: 'Wygląd', icon: 'pi pi-image' },
    { key: 'charyzma', label: 'Charyzma', icon: 'pi pi-star' },
    { key: 'wplywy', label: 'Wpływy', icon: 'pi pi-sitemap' },
    { key: 'spostrzegawczosc', label: 'Spostrzegawczość', icon: 'pi pi-eye' },
    { key: 'inteligencja', label: 'Inteligencja', icon: 'pi pi-lightbulb' },
    { key: 'wiedza', label: 'Wiedza', icon: 'pi pi-book' },
  ];
  statLevels: (number | null)[] = new Array(this.statDefs.length).fill(0);

  readonly evolutionDefs: EvolutionDef[] = EVOLUTIONS;
  evolutionLevels: (number | null)[] = new Array(this.evolutionDefs.length).fill(0);

  ngOnInit(): void {
    this.recompute();
  }

  onChange(): void {
    this.recompute();
  }

  /** Clamp the raw input to a valid level (1–maxLevel), defaulting to 1. */
  private clampLevel(): number {
    const v = Number(this.selectedLevel);
    if (!Number.isFinite(v)) return 1;
    return Math.min(this.maxLevel, Math.max(1, Math.floor(v)));
  }

  // Memoised XP thresholds; xp[L] = XP required to reach level L (index 0 unused).
  private xp: number[] = [0];

  /** Fill the memo up to the requested level (cheap, ~O(level), levels are ≤1000). */
  private computeUpTo(maxLevel: number): void {
    for (let L = this.xp.length; L <= maxLevel; L++) {
      if (L <= BREAK_LEVEL) {
        // Pure 10% growth, rounded up. Epsilon guards float noise
        // (e.g. 1.1^2 = 1.2100000000000002) from rounding up wrongly.
        this.xp[L] = Math.ceil(Math.pow(GROWTH, L - 1) * BASE_XP - 1e-6);
      } else {
        const secondDiff = Math.ceil(
          SECOND_DIFF_BASE * Math.pow(SECOND_DIFF_GROWTH, L - BREAK_LEVEL - 1) - 1e-6
        );
        this.xp[L] = 2 * this.xp[L - 1] - this.xp[L - 2] + secondDiff;
      }
    }
  }

  /** XP threshold to reach a given level. */
  private expForLevel(level: number): number {
    if (level < 1) return 0;
    this.computeUpTo(level);
    return this.xp[level];
  }

  private buildRow(level: number): LevelRow {
    const requiredExp = this.expForLevel(level);
    const nextExp = this.expForLevel(level + 1);
    return { level, requiredExp, nextExp, toNext: nextExp - requiredExp };
  }

  private recompute(): void {
    this.current = this.buildRow(this.clampLevel());
  }

  /** Cumulative exp to raise one stat to `level` (0 if not levelled), from the static table. */
  costForStat(level: number | null): number {
    const n = Math.floor(Number(level));
    if (!Number.isFinite(n) || n < 1) return 0;
    const clamped = Math.min(MAX_STAT_LEVEL, n);
    return STAT_COST_TABLE[clamped - 1];
  }

  get totalStatCost(): number {
    return this.statLevels.reduce((sum: number, lvl) => sum + this.costForStat(lvl), 0);
  }

  /** Cumulative cost to raise one evolution to `level` (sum of its per-level costs up to that level). */
  costForEvolution(evoIndex: number, level: number | null): number {
    const n = Math.floor(Number(level));
    if (!Number.isFinite(n) || n < 1) return 0;
    const costs = this.evolutionDefs[evoIndex].costs;
    const clamped = Math.min(costs.length, n);
    let sum = 0;
    for (let i = 0; i < clamped; i++) sum += costs[i];
    return sum;
  }

  get totalEvolutionCost(): number {
    return this.evolutionLevels.reduce(
      (sum: number, lvl, i) => sum + this.costForEvolution(i, lvl),
      0
    );
  }

  format(n: number): string {
    return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(n);
  }
}
