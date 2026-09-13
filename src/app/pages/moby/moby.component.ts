import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ACT_MOBS, STAR_MOBS, ActMob, StarMob, MobStats, StatRange } from '../../data/mobsData';
import { scaledRangeForStar, formatMobRange } from '../../data/mobStatUtils';

interface StatDef {
  key: keyof MobStats;
  label: string;
}

const STAT_DEFS: StatDef[] = [
  { key: 'zwinnosc', label: 'Zwinność' },
  { key: 'spostrzegawczosc', label: 'Spostrzegawczość' },
  { key: 'szczescie', label: 'Szczęście' },
  { key: 'obrona', label: 'Obrona' },
  { key: 'odpornosc', label: 'Odporność' },
  { key: 'zycie', label: 'Życie' },
];

const MAX_STARS = 12;

type MapMode = 'M1' | 'M2';

interface ActTableRow {
  act: number;
  actLabel: string;
  values: (StatRange | null)[];
  sum: StatRange | null;
}

interface StarTableRow {
  star: number;
  values: (StatRange | null)[];
  sum: StatRange | null;
}

/** Zwinność + Spostrzegawczość, added/subtracted range-wise. Null if either side is missing. */
function sumRange(a: StatRange | null, b: StatRange | null): StatRange | null {
  if (!a || !b) return null;
  return { min: a.min + b.min, max: a.max + b.max };
}

// M2 (Druga Mapa) per-mob bonus, split by "duo" (exactly 2 players) vs "duo+" (more than 2).
// M1 mobs don't have this data yet — stubbed to 0 per the user's instruction.
const DUO_BONUS: Record<string, { duo: number; duoPlus: number }> = {
  'Geyron': { duo: 0.17, duoPlus: 0.17 },
  'Yig': { duo: 0.24, duoPlus: 0.24 },
  'Alastor': { duo: 0.31, duoPlus: 0.31 },
  'Rakshasa': { duo: 0.38, duoPlus: 0.38 },
  'Shabriri': { duo: 0.45, duoPlus: 0.45 },
  'Zulchequon': { duo: 0.52, duoPlus: 0.69 },
  'Abaddon': { duo: 0.87, duoPlus: 0.52 },
  'Tsathoggua': { duo: 0.97, duoPlus: 0.60 },
  'Agrameon': { duo: 0.91, duoPlus: 0.70 },
  'Glaaki': { duo: 0.80, duoPlus: 0.80 },
  'Andras': { duo: 0.90, duoPlus: 0.90 },
  'Astrate': { duo: 1.06, duoPlus: 1.00 },
  'Merihim': { duo: 1.20, duoPlus: 1.50 },
  'Bokrug': { duo: 1.20, duoPlus: 1.50 },
  'Zepar': { duo: 1.26, duoPlus: 1.60 },
  'Malphas': { duo: 1.60, duoPlus: 1.70 },
  'Hastur': { duo: 3.00, duoPlus: 3.20 },
};

// Star ("Trudność") bonus for M2 mobs only — M1 has no such concept.
const STAR_BONUS: Record<number, number> = {
  1: 0, 2: 0.33, 3: 0.66, 4: 1.00, 5: 1.33, 6: 1.66,
  7: 2.00, 8: 2.33, 9: 2.66, 10: 3.00, 11: 3.33, 12: 3.66,
};

// M1 per-mob bonus — same shape/role as DUO_BONUS above, independent of act.
const M1_DUO_BONUS: Record<string, { duo: number; duoPlus: number }> = {
  'Biały Smok': { duo: 0, duoPlus: 0 },
  'Czarny Smok': { duo: 0, duoPlus: 0 },
  'Feniks': { duo: 0, duoPlus: 0 },
  'Czerwony Smok': { duo: 0, duoPlus: 0 },
  'Hydra': { duo: 0.16, duoPlus: 0.16 },
  'Złoty Smok': { duo: 0.24, duoPlus: 0.24 },
  'Golem': { duo: 0.31, duoPlus: 0.31 },
  'Szlachetny Feniks': { duo: 0.38, duoPlus: 0.38 },
  'Meduza': { duo: 0.45, duoPlus: 0.45 },
  'Arachne': { duo: 0.52, duoPlus: 0.69 },
  'Romulus i Remus': { duo: 0.59, duoPlus: 0.83 },
  'Sfinks': { duo: 0.66, duoPlus: 0.97 },
  'Bazyliszek': { duo: 0.73, duoPlus: 1.11 },
  'Robot': { duo: 0.80, duoPlus: 1.25 },
  'Anubis': { duo: 0.87, duoPlus: 3.56 },
  'Wendigo': { duo: 1.97, duoPlus: 3.3 },
  'Kronos': { duo: 1.01, duoPlus: 4.34 },
};

interface CalcResult {
  min: number;
  max: number;
  formulaMin: string;
  formulaMax: string;
}

@Component({
  selector: 'app-moby',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, InputNumberModule],
  templateUrl: './moby.component.html',
  styleUrl: './moby.component.css'
})
export class MobyComponent {
  readonly statDefs = STAT_DEFS;

  readonly mapOptions = [
    { label: 'M1 — Akt 1-3', value: 'M1' },
    { label: 'M2 — Gwiazdki', value: 'M2' },
  ];

  readonly actMobOptions = ACT_MOBS.map(m => ({ label: m.name, value: m.name }));
  readonly starMobOptions = STAR_MOBS.map(m => ({ label: m.name, value: m.name }));

  mapMode: MapMode | null = null;
  selectedActMobName: string | null = null;
  selectedStarMobName: string | null = null;

  // The record picked from the currently displayed table, used in the formula below.
  selectedAct: number | null = null;
  selectedStar: number | null = null;

  onMapModeChange(): void {
    this.selectedActMobName = null;
    this.selectedStarMobName = null;
    this.selectedAct = null;
    this.selectedStar = null;
  }

  onMobChange(): void {
    this.selectedAct = null;
    this.selectedStar = null;
  }

  selectActRow(act: number): void {
    this.selectedAct = act;
  }

  selectStarRow(star: number): void {
    this.selectedStar = star;
  }

  // ── Expedition parameters ──
  playerCount: number | null = 1;
  founderLevel: number | null = 1;
  levelSum: number | null = 1;
  huntingBonus: number | null = 0;

  readonly erudytaOptions = [0, 0.05, 0.15, 0.25, 0.35, 0.50].map(v => ({ label: `${v}`, value: v }));
  readonly bystrzakOptions = [0, 0.20].map(v => ({ label: `${v}`, value: v }));
  readonly filozofOptions = [0, 1, 1.02, 1.04, 1.06, 1.08, 1.10].map(v => ({ label: `${v}`, value: v }));
  readonly potegaOptions = [0, 0.07, 0.14, 0.20, 0.25, 0.30, 0.37, 0.44, 0.50, 0.55, 0.60, 0.67, 0.74, 0.80, 0.85, 0.90]
    .map(v => ({ label: `${v}`, value: v }));

  erudyta: number | null = 0;
  bystrzak: number | null = 0;
  filozof: number | null = 1;
  potega: number | null = 0;

  get selectedActMob(): ActMob | null {
    return ACT_MOBS.find(m => m.name === this.selectedActMobName) ?? null;
  }

  get selectedStarMob(): StarMob | null {
    return STAR_MOBS.find(m => m.name === this.selectedStarMobName) ?? null;
  }

  formatRange(r: StatRange | null): string {
    return formatMobRange(r);
  }

  /** Table rows for the selected act mob — one row per act it actually has data for. */
  get actTableRows(): ActTableRow[] {
    const mob = this.selectedActMob;
    if (!mob) return [];
    const rows: ActTableRow[] = [];
    mob.acts.forEach((act, i) => {
      if (!act) return;
      rows.push({
        act: i + 1,
        actLabel: `Akt ${i + 1}`,
        values: this.statDefs.map(s => act[s.key]),
        sum: sumRange(act.zwinnosc, act.spostrzegawczosc),
      });
    });
    return rows;
  }

  /** Full 1-12 star table for the selected star mob. */
  get starTableRows(): StarTableRow[] {
    const mob = this.selectedStarMob;
    if (!mob) return [];
    const rows: StarTableRow[] = [];
    for (let star = 1; star <= MAX_STARS; star++) {
      rows.push({
        star,
        values: this.statDefs.map(s => scaledRangeForStar(mob, s.key, star)),
        sum: sumRange(scaledRangeForStar(mob, 'zwinnosc', star), scaledRangeForStar(mob, 'spostrzegawczosc', star)),
      });
    }
    return rows;
  }

  /** Życie range of the currently selected record (act row for M1, star row for M2). */
  get selectedZycie(): StatRange | null {
    if (this.mapMode === 'M1' && this.selectedActMob && this.selectedAct) {
      return this.selectedActMob.acts[this.selectedAct - 1]?.zycie ?? null;
    }
    if (this.mapMode === 'M2' && this.selectedStarMob && this.selectedStar) {
      return scaledRangeForStar(this.selectedStarMob, 'zycie', this.selectedStar);
    }
    return null;
  }

  /**
   * "Mnożnik dla potwora" — duo/duo+ bonus, gated purely by player count
   * (2 → duo, >2 → duo+, solo → 0) and the selected mob. Act/star played has
   * no bearing on this value — M1 uses M1_DUO_BONUS, M2 uses DUO_BONUS.
   */
  get monsterBonus(): number {
    const players = this.playerCount ?? 1;

    const table = this.mapMode === 'M2' ? DUO_BONUS
      : this.mapMode === 'M1' ? M1_DUO_BONUS
      : null;
    const mobName = this.mapMode === 'M2' ? this.selectedStarMob?.name
      : this.mapMode === 'M1' ? this.selectedActMob?.name
      : null;
    if (!table || !mobName) return 0;

    const entry = table[mobName];
    if (!entry) return 0;
    if (players === 2) return entry.duo;
    if (players > 2) return entry.duoPlus;
    return 0;
  }

  /** "Bonus z gwiazdek" — star difficulty. Only applies to M2; M1 has no such concept. */
  get starBonus(): number {
    if (this.mapMode !== 'M2' || !this.selectedStar) return 0;
    return STAR_BONUS[this.selectedStar] ?? 0;
  }

  get canCompute(): boolean {
    return !!this.selectedZycie && !!this.founderLevel && !!this.levelSum;
  }

  private compute(zycie: number): number {
    const poziom = this.founderLevel ?? 0;
    const suma = this.levelSum || 1;
    const mnoznik = this.monsterBonus;
    const erud = this.erudyta ?? 0;
    const byst = this.bystrzak ?? 0;
    const pot = this.potega ?? 0;
    const polowanie = this.huntingBonus ?? 0;
    const gwiazdki = this.starBonus;
    const filozof = this.filozof ?? 0;

    return (
      ((zycie * poziom) / suma) *
      (1 + mnoznik) *
      (1 + erud + byst + pot + polowanie) *
      (1 + gwiazdki) *
      2 *
      4 *
      filozof
    );
  }

  private buildFormula(zycie: number): string {
    const poziom = this.founderLevel ?? 0;
    const suma = this.levelSum || 1;
    const mnoznik = this.monsterBonus;
    const erud = this.erudyta ?? 0;
    const byst = this.bystrzak ?? 0;
    const pot = this.potega ?? 0;
    const polowanie = this.huntingBonus ?? 0;
    const gwiazdki = this.starBonus;
    const filozof = this.filozof ?? 0;

    return `((${zycie} × ${poziom}) / ${suma}) × (1 + ${mnoznik}) × (1 + ${erud} + ${byst} + ${pot} + ${polowanie}) × (1 + ${gwiazdki}) × 2 × 4 × ${filozof}`;
  }

  get result(): CalcResult | null {
    const zycie = this.selectedZycie;
    if (!zycie || !this.founderLevel || !this.levelSum) return null;
    return {
      min: Math.ceil(this.compute(zycie.min)),
      max: Math.ceil(this.compute(zycie.max)),
      formulaMin: this.buildFormula(zycie.min),
      formulaMax: this.buildFormula(zycie.max),
    };
  }

  formatNumber(n: number): string {
    return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(n);
  }
}
