import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpeditionReport, REPORT_STAT_KEYS, REPORT_STAT_LABELS, loadExpeditionReports } from '../../data/expedition-reports';
import { ACT_MOBS, STAR_MOBS } from '../../data/mobsData';

const PAGE_SIZE = 50;
/** Filter value for reports fought outside any server event. */
export const NO_EVENT = '__none__';

/** Report boss names that are spelled differently in mobsData. */
const BOSS_ALIASES: Record<string, string> = { Geryon: 'Geyron', Astarte: 'Astrate', Romulus: 'Romulus i Remus', Remus: 'Romulus i Remus' };
const normalizeBoss = (name: string): string => BOSS_ALIASES[name] ?? name;
const M1_ORDER = ACT_MOBS.map(m => m.name);
const M2_ORDER = STAR_MOBS.map(m => m.name);

interface LocationOption {
  name: string;
  count: number;
}

/** Searchable list of real expedition reports (see data/expedition-reports.ts). Everything is filtered in memory; only one page is rendered at a time. */
@Component({
  selector: 'app-raporty-ekspedycji',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './raporty-ekspedycji.component.html',
  styleUrl: './raporty-ekspedycji.component.css',
})
export class RaportyEkspedycjiComponent implements OnInit {
  readonly statKeys = REPORT_STAT_KEYS;
  readonly statLabels = REPORT_STAT_LABELS;

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
  minLevel = signal<number | null>(null);
  maxLevel = signal<number | null>(null);
  season = signal<number | ''>('');

  sortDesc = signal(true);
  page = signal(0);
  expanded = signal<Set<number>>(new Set());

  /**
   * Locations split by map: M1 (act bosses) first, then M2 (star bosses). A location counts as M2
   * when any of its bosses is a star mob. Within each map, locations follow the mob list order
   * (mobsData) of their earliest boss.
   */
  locationGroups = computed(() => {
    const info = new Map<string, { count: number; bosses: Set<string> }>();
    for (const r of this.reports()) {
      const entry = info.get(r.location) ?? { count: 0, bosses: new Set<string>() };
      entry.count++;
      entry.bosses.add(normalizeBoss(r.boss));
      info.set(r.location, entry);
    }
    const m1: (LocationOption & { order: number })[] = [];
    const m2: (LocationOption & { order: number })[] = [];
    for (const [name, { count, bosses }] of info) {
      const starIdx = [...bosses].map(b => M2_ORDER.indexOf(b)).filter(i => i >= 0);
      if (starIdx.length) {
        m2.push({ name, count, order: Math.min(...starIdx) });
      } else {
        const actIdx = [...bosses].map(b => M1_ORDER.indexOf(b)).filter(i => i >= 0);
        m1.push({ name, count, order: actIdx.length ? Math.min(...actIdx) : Number.MAX_SAFE_INTEGER });
      }
    }
    const byOrder = (a: { order: number; name: string }, b: { order: number; name: string }) =>
      a.order - b.order || a.name.localeCompare(b.name, 'pl');
    return [
      { label: 'M1 — Akt 1-3', locations: m1.sort(byOrder) },
      { label: 'M2 — Gwiazdki', locations: m2.sort(byOrder) },
    ].filter(g => g.locations.length);
  });

  /** Bosses ordered by how many reports they have, so the common ones are on top. Narrowed to the picked location. */
  bosses = computed(() => {
    const location = this.location();
    const counts = new Map<string, number>();
    for (const r of this.reports()) {
      if (location && r.location !== location) continue;
      counts.set(r.boss, (counts.get(r.boss) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  });

  starOptions = computed(() => {
    const boss = this.boss();
    const location = this.location();
    const set = new Set<number>();
    for (const r of this.reports()) {
      if ((!boss || r.boss === boss) && (!location || r.location === location)) set.add(r.stars);
    }
    return [...set].sort((a, b) => a - b);
  });

  readonly noEvent = NO_EVENT;

  /** Server events ordered by how many reports they have; reports without one are counted separately. */
  events = computed(() => {
    const counts = new Map<string, number>();
    let none = 0;
    for (const r of this.reports()) {
      if (r.eventName) counts.set(r.eventName, (counts.get(r.eventName) ?? 0) + 1);
      else none++;
    }
    return {
      none,
      list: [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
    };
  });

  /** Seasons that have reports, newest first, with report counts. */
  seasons = computed(() => {
    const counts = new Map<number, number>();
    for (const r of this.reports()) counts.set(r.season, (counts.get(r.season) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[0] - a[0]).map(([season, count]) => ({ season, count }));
  });

  difficulties = computed(() => [...new Set(this.reports().map(r => r.difficulty))].sort());

  filtered = computed(() => {
    const location = this.location();
    const event = this.event();
    const boss = this.boss();
    const stars = this.stars();
    const difficulty = this.difficulty();
    const result = this.result();
    const q = this.search().trim().toLowerCase();
    const minLvl = this.minLevel();
    const maxLvl = this.maxLevel();
    const season = this.season();

    const list = this.reports().filter(r => {
      if (location && r.location !== location) return false;
      if (event && (event === NO_EVENT ? !!r.eventName : r.eventName !== event)) return false;
      if (boss && r.boss !== boss) return false;
      if (stars !== '' && r.stars !== stars) return false;
      if (difficulty && r.difficulty !== difficulty) return false;
      if (result && (result === 'W') !== r.won) return false;
      if (season !== '' && r.season !== season) return false;
      if (minLvl != null && !r.players.some(p => p.level >= minLvl)) return false;
      if (maxLvl != null && !r.players.some(p => p.level <= maxLvl)) return false;
      if (q && !r.players.some(p =>
        p.name.toLowerCase().includes(q) || p.weapons.some(w => w.toLowerCase().includes(q)))) return false;
      return true;
    });
    // Dataset is stored newest-first.
    return this.sortDesc() ? list : [...list].reverse();
  });

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
      this.minLevel() != null || this.maxLevel() != null || this.season() !== ''));

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
    // Drop boss/star filters that don't exist at the new location.
    if (this.boss() && !this.bosses().some(b => b.name === this.boss())) this.boss.set('');
    if (this.stars() !== '' && !this.starOptions().includes(this.stars() as number)) this.stars.set('');
    this.page.set(0);
  }

  setBoss(boss: string): void {
    this.boss.set(boss);
    // Keep the star filter only if that boss has reports at that star level.
    if (this.stars() !== '' && !this.starOptions().includes(this.stars() as number)) this.stars.set('');
    this.page.set(0);
  }

  parseLevel(value: string): number | null {
    const n = parseInt(value, 10);
    return Number.isFinite(n) ? n : null;
  }

  clearFilters(): void {
    this.location.set('');
    this.event.set('');
    this.boss.set('');
    this.stars.set('');
    this.difficulty.set('');
    this.result.set('');
    this.search.set('');
    this.minLevel.set(null);
    this.maxLevel.set(null);
    this.season.set('');
    this.page.set(0);
  }

  toggleSort(): void {
    this.sortDesc.update(v => !v);
    this.page.set(0);
  }

  goToPage(page: number): void {
    this.page.set(Math.min(Math.max(page, 0), this.pageCount() - 1));
  }

  toggle(id: number): void {
    this.expanded.update(set => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  isExpanded(id: number): boolean {
    return this.expanded().has(id);
  }

  hasBonuses(p: ExpeditionReport['players'][number]): boolean {
    return !!(p.talismans.length || p.evolutions.length || p.arcanes.length || p.huntBonuses.length || p.silverBonuses.length || p.goldBonuses.length);
  }
}
