import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ExpeditionReport, ReportEnemy, ReportStats, REPORT_STAT_KEYS, loadExpeditionReports, normalizeReportBoss } from '../../data/expedition-reports';
import { ACT_MOBS, STAR_MOBS } from '../../data/mobsData';

const PAGE_SIZE = 50;
/** Filter value for reports fought outside any server event. */
export const NO_EVENT = '__none__';

/** Stats that decide a fight — listed first in the hover details; the rest follow. */
const KEY_STATS: (keyof ReportStats)[] = ['agility', 'perception', 'strength', 'resistance', 'defence', 'luck'];
const STAT_LABELS: Record<keyof ReportStats, string> = {
  strength: 'Siła', agility: 'Zwinność', resistance: 'Odporność', looks: 'Wygląd', charisma: 'Charyzma', influence: 'Wpływy',
  perception: 'Spostrzegawczość', intelligence: 'Inteligencja', wisdom: 'Wiedza', luck: 'Szczęście', defence: 'Obrona',
};

const M1_ORDER = ACT_MOBS.map(m => m.name);
const M2_ORDER = STAR_MOBS.map(m => m.name);

interface LocationOption {
  name: string;
  count: number;
}

type FilterKey = 'location' | 'event' | 'boss' | 'stars' | 'difficulty' | 'result' | 'season' | 'playerCount';

const byTotalDesc = (a: { total: number }, b: { total: number }) => b.total - a.total;

/** Searchable list of real expedition reports (see data/expedition-reports.ts). Everything is filtered in memory; only one page is rendered at a time. */
@Component({
  selector: 'app-raporty-ekspedycji',
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipModule],
  templateUrl: './raporty-ekspedycji.component.html',
  styleUrl: './raporty-ekspedycji.component.css',
})
export class RaportyEkspedycjiComponent implements OnInit {
  /** Combat stats first, then the rest. */
  readonly statOrder = [...KEY_STATS, ...REPORT_STAT_KEYS.filter(k => !KEY_STATS.includes(k))];
  readonly statLabels = STAT_LABELS;

  loading = signal(true);
  loadError = signal<string | null>(null);
  reports = signal<ExpeditionReport[]>([]);

  // ── Filters ──
  location = signal('');
  event = signal('');
  boss = signal('');
  stars = signal<number | ''>('');
  difficulty = signal('');
  result = signal<'' | 'W' | 'L'>('');
  search = signal('');
  season = signal<number | ''>('');
  playerCount = signal<number | ''>('');

  sortDesc = signal(true);
  page = signal(0);

  /** Classification of every location into M1/M2 plus its display order — static, taken from all reports. */
  private locationOrder = computed(() => {
    const bossesByLocation = new Map<string, Set<string>>();
    for (const r of this.reports()) {
      const set = bossesByLocation.get(r.location) ?? new Set<string>();
      set.add(normalizeReportBoss(r.boss));
      bossesByLocation.set(r.location, set);
    }
    const out: { name: string; map: 'M1' | 'M2'; order: number }[] = [];
    for (const [name, bosses] of bossesByLocation) {
      const starIdx = [...bosses].map(b => M2_ORDER.indexOf(b)).filter(i => i >= 0);
      if (starIdx.length) {
        out.push({ name, map: 'M2', order: Math.min(...starIdx) });
      } else {
        const actIdx = [...bosses].map(b => M1_ORDER.indexOf(b)).filter(i => i >= 0);
        out.push({ name, map: 'M1', order: actIdx.length ? Math.min(...actIdx) : Number.MAX_SAFE_INTEGER });
      }
    }
    return out.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'pl'));
  });

  /**
   * Locations split by map: M1 (act bosses) first, then M2 (star bosses). A location counts as M2
   * when any of its bosses is a star mob. Within each map, locations follow the mob list order
   * (mobsData) of their earliest boss. Counts respect every other active filter.
   */
  locationGroups = computed(() => {
    const counts = this.facet('location', r => r.location);
    const selected = this.location();
    const pick = (map: 'M1' | 'M2'): LocationOption[] => this.locationOrder()
      .filter(l => l.map === map)
      .map(l => ({ name: l.name, count: counts.get(l.name) ?? 0 }))
      .filter(l => l.count > 0 || l.name === selected);
    return [
      { label: 'M1 — Akt 1-3', locations: pick('M1') },
      { label: 'M2 — Gwiazdki', locations: pick('M2') },
    ].filter(g => g.locations.length);
  });

  /** Bosses in order of their overall report count, with counts under the other active filters. */
  bosses = computed(() => this.options('boss', r => r.boss, this.boss(), byTotalDesc));

  starOptions = computed(() => this.options('stars', r => r.stars, this.stars(), (a, b) => a.value - b.value));

  readonly noEvent = NO_EVENT;

  /** Server events in order of their overall report count; reports without one are the NO_EVENT option. */
  events = computed(() => {
    const all = this.options('event', r => r.eventName || NO_EVENT, this.event(), byTotalDesc);
    return {
      none: all.find(o => o.value === NO_EVENT) ?? null,
      list: all.filter(o => o.value !== NO_EVENT),
    };
  });

  /** Seasons newest first. */
  seasons = computed(() => this.options('season', r => r.season, this.season(), (a, b) => b.value - a.value));

  /** Team sizes, smallest first. */
  playerCounts = computed(() => this.options('playerCount', r => r.players.length, this.playerCount(), (a, b) => a.value - b.value));

  difficulties = computed(() => this.options('difficulty', r => r.difficulty, this.difficulty(), (a, b) => a.value.localeCompare(b.value, 'pl')));

  results = computed(() => {
    const counts = this.facet('result', r => (r.won ? 'W' : 'L'));
    return { W: counts.get('W') ?? 0, L: counts.get('L') ?? 0 };
  });

  filtered = computed(() => {
    const list = this.reports().filter(r => this.matches(r));
    // Dataset is stored newest-first.
    return this.sortDesc() ? list : [...list].reverse();
  });

  /** Overall count of every boss/event — used only to keep option order stable while filters change. */
  private totals = computed(() => {
    const t = new Map<string, number>();
    for (const r of this.reports()) {
      for (const key of ['boss:' + r.boss, 'event:' + (r.eventName || NO_EVENT)]) t.set(key, (t.get(key) ?? 0) + 1);
    }
    return t;
  });

  /**
   * Whether a report passes the active filters. `skip` leaves one filter out — that's how each
   * dropdown's counts show "how many reports you'd get if you picked this", given everything else.
   */
  private matches(r: ExpeditionReport, skip?: FilterKey): boolean {
    const location = this.location();
    const event = this.event();
    const boss = this.boss();
    const stars = this.stars();
    const difficulty = this.difficulty();
    const result = this.result();
    const season = this.season();
    const playerCount = this.playerCount();
    const q = this.search().trim().toLowerCase();

    if (skip !== 'location' && location && r.location !== location) return false;
    if (skip !== 'event' && event && (event === NO_EVENT ? !!r.eventName : r.eventName !== event)) return false;
    if (skip !== 'boss' && boss && r.boss !== boss) return false;
    if (skip !== 'stars' && stars !== '' && r.stars !== stars) return false;
    if (skip !== 'difficulty' && difficulty && r.difficulty !== difficulty) return false;
    if (skip !== 'result' && result && (result === 'W') !== r.won) return false;
    if (skip !== 'season' && season !== '' && r.season !== season) return false;
    if (skip !== 'playerCount' && playerCount !== '' && r.players.length !== playerCount) return false;
    if (q && !r.players.some(p =>
      p.name.toLowerCase().includes(q) || p.weapons.some(w => w.toLowerCase().includes(q)))) return false;
    return true;
  }

  /** Counts reports per value of `key`, under every active filter except `skip`. */
  private facet<V>(skip: FilterKey, key: (r: ExpeditionReport) => V): Map<V, number> {
    const counts = new Map<V, number>();
    for (const r of this.reports()) {
      if (!this.matches(r, skip)) continue;
      const v = key(r);
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    return counts;
  }

  /**
   * Options for one dropdown: every value that has reports under the other filters (plus the
   * currently selected one, even at 0, so a selection never silently disappears).
   */
  private options<V extends string | number>(
    skip: FilterKey,
    key: (r: ExpeditionReport) => V,
    selected: V | '',
    order: (a: { value: V; total: number }, b: { value: V; total: number }) => number,
  ): { value: V; count: number }[] {
    const counts = this.facet(skip, key);
    const allValues = new Set<V>(this.reports().map(key));
    const totals = this.totals();
    return [...allValues]
      .map(value => ({ value, count: counts.get(value) ?? 0, total: totals.get(skip + ':' + value) ?? 0 }))
      .filter(o => o.count > 0 || o.value === selected)
      .sort(order)
      .map(({ value, count }) => ({ value, count }));
  }

  summary = computed(() => {
    const list = this.filtered();
    const wins = list.filter(r => r.won).length;
    return { total: list.length, wins, winPct: list.length ? Math.round((wins / list.length) * 100) : 0 };
  });

  pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));
  pageItems = computed(() => {
    const start = this.page() * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  hasActiveFilters = computed(() =>
    !!(this.location() || this.event() || this.boss() || this.stars() !== '' || this.difficulty() || this.result() || this.search() ||
      this.season() !== '' || this.playerCount() !== ''));

  ngOnInit(): void {
    loadExpeditionReports()
      .then(list => this.reports.set(list))
      .catch(() => this.loadError.set('Nie udało się wczytać raportów. Odśwież stronę, aby spróbować ponownie.'))
      .finally(() => this.loading.set(false));
  }

  /** Every filter change goes back to page 1. */
  setFilter<T>(target: { set(value: T): void }, value: T): void {
    target.set(value);
    this.page.set(0);
  }

  setLocation(location: string): void {
    this.location.set(location);
    // Drop boss/star filters that have no reports at the new location.
    if (this.boss() && !this.bosses().some(b => b.value === this.boss() && b.count > 0)) this.boss.set('');
    if (this.stars() !== '' && !this.starOptions().some(o => o.value === this.stars() && o.count > 0)) this.stars.set('');
    this.page.set(0);
  }

  setBoss(boss: string): void {
    this.boss.set(boss);
    // Keep the star filter only if that boss has reports at that star level.
    if (this.stars() !== '' && !this.starOptions().some(o => o.value === this.stars() && o.count > 0)) this.stars.set('');
    this.page.set(0);
  }

  clearFilters(): void {
    this.location.set('');
    this.event.set('');
    this.boss.set('');
    this.stars.set('');
    this.difficulty.set('');
    this.result.set('');
    this.search.set('');
    this.season.set('');
    this.playerCount.set('');
    this.page.set(0);
  }

  toggleSort(): void {
    this.sortDesc.update(v => !v);
    this.page.set(0);
  }

  goToPage(page: number): void {
    this.page.set(Math.min(Math.max(page, 0), this.pageCount() - 1));
  }

  /**
   * Enemies with identical adds folded together ("Nałożnica", "Nałożnica 2", ... with the same
   * stats → one "Nałożnica ×6" card). Adds whose stats differ stay separate. Boss first.
   */
  enemyGroups(r: ExpeditionReport): { enemy: ReportEnemy; name: string; count: number; isBoss: boolean }[] {
    const groups = new Map<string, { enemy: ReportEnemy; name: string; count: number; isBoss: boolean }>();
    for (const e of r.enemies) {
      const isBoss = e.name === r.boss;
      const baseName = isBoss ? e.name : e.name.replace(/ \d+$/, '');
      const key = baseName + '|' + e.hpMax + '|' + e.initiative + '|' + REPORT_STAT_KEYS.map(k => e[k]).join(',');
      const group = groups.get(key);
      if (group) group.count++;
      else groups.set(key, { enemy: e, name: baseName, count: 1, isBoss });
    }
    return [...groups.values()].sort((a, b) => Number(b.isBoss) - Number(a.isBoss));
  }

  /** 1..n, for rendering star icons. */
  starArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  /** Talismans, evolutions, arcana and bonuses as label/value rows for the hover table. */
  bonusRows(p: ExpeditionReport['players'][number]): { label: string; value: string }[] {
    const groups: [string, string[]][] = [
      ['Talizmany', p.talismans], ['Ewolucje', p.evolutions], ['Arkana', p.arcanes],
      ['Polowanie', p.huntBonuses], ['Srebrne', p.silverBonuses], ['Złote', p.goldBonuses],
    ];
    return groups.filter(([, list]) => list.length).map(([label, list]) => ({ label, value: list.join(', ') }));
  }

  /** Reports store races in capitals ("ŁAPACZ MYŚLI") — show them as "Łapacz Myśli". */
  raceLabel(race: string): string {
    return race.toLocaleLowerCase('pl').replace(/(^|\s)(\S)/g, (_, space, ch) => space + ch.toLocaleUpperCase('pl'));
  }

}
