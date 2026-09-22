import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpeditionLogService, SavedExpeditionLog } from '../../services/expedition-log.service';
import { decodeShareCode } from '../../services/character-share.util';
import { SavedCharactersService } from '../../services/saved-characters.service';

/** Lists every expedition simulation the site has saved (see api/expedition-log.ts) and lets the exact characters that took part in any of them be imported back into this browser's saved-characters list. */
@Component({
  selector: 'app-dziennik-ekspedycji',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dziennik-ekspedycji.component.html',
  styleUrl: './dziennik-ekspedycji.component.css',
})
export class DziennikEkspedycjiComponent implements OnInit {
  logs = signal<SavedExpeditionLog[]>([]);
  loading = signal(true);
  loadError = signal<string | null>(null);
  importError = signal<string | null>(null);
  importedIds = signal<Set<number>>(new Set());

  constructor(
    private expeditionLogService: ExpeditionLogService,
    private savedCharactersService: SavedCharactersService,
  ) { }

  ngOnInit(): void {
    this.expeditionLogService.list()
      .then(logs => this.logs.set(logs))
      .catch(() => this.loadError.set('Nie udało się pobrać zapisanych symulacji.'))
      .finally(() => this.loading.set(false));
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
}
