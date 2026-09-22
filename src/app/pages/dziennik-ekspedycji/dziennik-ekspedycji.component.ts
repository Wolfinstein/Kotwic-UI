import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpeditionLogService, SavedExpeditionLog } from '../../services/expedition-log.service';
import { decodeShareCode } from '../../services/character-share.util';
import { SavedCharactersService } from '../../services/saved-characters.service';

/** Lists every expedition simulation the site has saved (see api/expedition-log.ts) and lets the exact characters that took part in any of them be imported back into this browser's saved-characters list. Password-gated — never remembers the unlock, so it re-prompts every visit. */
@Component({
  selector: 'app-dziennik-ekspedycji',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dziennik-ekspedycji.component.html',
  styleUrl: './dziennik-ekspedycji.component.css',
})
export class DziennikEkspedycjiComponent {
  password = '';
  unlocked = signal(false);
  loading = signal(false);
  passwordError = signal<string | null>(null);

  logs = signal<SavedExpeditionLog[]>([]);
  importError = signal<string | null>(null);
  importedIds = signal<Set<number>>(new Set());
  deleteError = signal<string | null>(null);
  removingIds = signal<Set<number>>(new Set());

  // ── Filters (client-side, over the already-fetched logs) ──
  filterDate = '';
  filterMob = '';
  filterStar: number | '' = '';
  filterVariant = '';

  sortDirection = signal<'asc' | 'desc'>('desc');

  constructor(
    private expeditionLogService: ExpeditionLogService,
    private savedCharactersService: SavedCharactersService,
  ) { }

  submitPassword(): void {
    if (!this.password) return;
    this.passwordError.set(null);
    this.loading.set(true);
    this.expeditionLogService.list(this.password)
      .then(logs => {
        this.logs.set(logs);
        this.unlocked.set(true);
      })
      .catch(err => {
        this.passwordError.set(err instanceof Error && err.message === 'UNAUTHORIZED'
          ? 'Nieprawidłowe hasło.'
          : 'Nie udało się pobrać zapisanych symulacji.');
      })
      .finally(() => this.loading.set(false));
  }

  get filteredLogs(): SavedExpeditionLog[] {
    const filtered = this.logs().filter(log => {
      if (this.filterDate && !log.createdAt.startsWith(this.filterDate)) return false;
      if (this.filterMob && log.mob !== this.filterMob) return false;
      if (this.filterStar !== '' && log.star !== this.filterStar) return false;
      if (this.filterVariant && log.variant !== this.filterVariant) return false;
      return true;
    });
    const dir = this.sortDirection() === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => dir * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
  }

  toggleSort(): void {
    this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
  }

  get availableMobs(): string[] {
    return Array.from(new Set(this.logs().map(l => l.mob))).sort();
  }

  get availableStars(): number[] {
    return Array.from(new Set(this.logs().map(l => l.star))).sort((a, b) => a - b);
  }

  get availableVariants(): string[] {
    return Array.from(new Set(this.logs().map(l => l.variant))).sort();
  }

  get hasActiveFilters(): boolean {
    return !!this.filterDate || !!this.filterMob || this.filterStar !== '' || !!this.filterVariant;
  }

  clearFilters(): void {
    this.filterDate = '';
    this.filterMob = '';
    this.filterStar = '';
    this.filterVariant = '';
  }

  async importCharacters(log: SavedExpeditionLog): Promise<void> {
    this.importError.set(null);
    try {
      const entries = await decodeShareCode(log.charactersCode);
      this.savedCharactersService.addMany(entries);
      this.importedIds.update(ids => new Set(ids).add(log.id));
    } catch {
      this.importError.set('Nie udało się zaimportować postaci — zapis jest uszkodzony lub pochodzi z innej wersji kalkulatora.');
    }
  }

  wasImported(id: number): boolean {
    return this.importedIds().has(id);
  }

  async removeLog(log: SavedExpeditionLog): Promise<void> {
    const when = new Date(log.createdAt).toLocaleString();
    if (!confirm(`Usunąć zapis "${log.mob}" (${when})? Tej operacji nie można cofnąć.`)) return;
    this.deleteError.set(null);
    this.removingIds.update(ids => new Set(ids).add(log.id));
    try {
      await this.expeditionLogService.remove(log.id, this.password);
      this.logs.update(logs => logs.filter(l => l.id !== log.id));
    } catch {
      this.deleteError.set('Nie udało się usunąć zapisu.');
    } finally {
      this.removingIds.update(ids => {
        const next = new Set(ids);
        next.delete(log.id);
        return next;
      });
    }
  }

  isRemoving(id: number): boolean {
    return this.removingIds().has(id);
  }
}
