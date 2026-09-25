import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpeditionReport, REPORT_STAT_KEYS, REPORT_STAT_LABELS, loadExpeditionReports } from '../../data/expedition-reports';

const PAGE_SIZE = 50;

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
  boss = signal('');
  stars = signal<number | ''>('');
  difficulty = signal('');
  result = signal<'' | 'W' | 'L'>('');
  search = signal('');
  minLevel = signal<number | null>(null);
  maxLevel = signal<number | null>(null);
  dateFrom = signal('');
  dateTo = signal('');

  sortDesc = signal(true);
  page = signal(0);
  expanded = signal<Set<number>>(new Set());

  /** Bosses ordered by how many reports they have, so the common ones are on top. */
  bosses = computed(() => {
    const counts = new Map<string, number>();
    for (const r of this.reports()) counts.set(r.boss, (counts.get(r.boss) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  });

  starOptions = computed(() => {
    const boss = this.boss();
    const set = new Set<number>();
    for (const r of this.reports()) if (!boss || r.boss === boss) set.add(r.stars);
    return [...set].sort((a, b) => a - b);
  });

  difficulties = computed(() => [...new Set(this.reports().map(r => r.difficulty))].sort());

  filtered = computed(() => {
    const boss = this.boss();
    const stars = this.stars();
    const difficulty = this.difficulty();
    const result = this.result();
    const q = this.search().trim().toLowerCase();
    const minLvl = this.minLevel();
    const maxLvl = this.maxLevel();
    const from = this.dateFrom();
    // Inclusive end date: compare against the start of the following day.
    const to = this.dateTo() ? this.dateTo() + ' 99' : '';

    const list = this.reports().filter(r => {
      if (boss && r.boss !== boss) return false;
      if (stars !== '' && r.stars !== stars) return false;
      if (difficulty && r.difficulty !== difficulty) return false;
      if (result && (result === 'W') !== r.won) return false;
      if (from && r.date < from) return false;
      if (to && r.date > to) return false;
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
    !!(this.boss() || this.stars() !== '' || this.difficulty() || this.result() || this.search() ||
      this.minLevel() != null || this.maxLevel() != null || this.dateFrom() || this.dateTo()));

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
    this.boss.set('');
    this.stars.set('');
    this.difficulty.set('');
    this.result.set('');
    this.search.set('');
    this.minLevel.set(null);
    this.maxLevel.set(null);
    this.dateFrom.set('');
    this.dateTo.set('');
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
