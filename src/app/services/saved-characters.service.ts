import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../models/character';

export interface SavedCharacter {
  id: string;
  name: string;
  /** Free-text label set at save time, used to filter the saved-characters list (e.g. "PVP", "farm"). */
  tag?: string;
  character: Character;
}

const STORAGE_KEY = 'kotwic_saved_characters';

@Injectable({ providedIn: 'root' })
export class SavedCharactersService {
  private characters$ = new BehaviorSubject<SavedCharacter[]>(this.load());

  getAll$ = () => this.characters$.asObservable();

  add(name: string, character: Character, tag?: string): void {
    const entry: SavedCharacter = { id: crypto.randomUUID(), name, tag: tag?.trim() || undefined, character };
    this.persist([...this.characters$.value, entry]);
  }

  /** Adds several characters at once (e.g. from an imported share link) with freshly generated ids — never reuses ids from the source, so they can't collide with anything already saved here. Returns the new ids, in the same order as `entries`. */
  addMany(entries: { name: string; character: Character; tag?: string }[]): string[] {
    const newEntries: SavedCharacter[] = entries.map(e => ({ id: crypto.randomUUID(), name: e.name, tag: e.tag?.trim() || undefined, character: e.character }));
    this.persist([...this.characters$.value, ...newEntries]);
    return newEntries.map(e => e.id);
  }

  remove(id: string): void {
    this.persist(this.characters$.value.filter(c => c.id !== id));
  }

  /** Renames and/or retags an existing entry in place (used by the inline-edit fields in the Postacie list). An empty/whitespace name is ignored — the entry keeps its old name rather than being left blank; an empty tag clears it. */
  update(id: string, patch: { name?: string; tag?: string }): void {
    this.persist(this.characters$.value.map(c => {
      if (c.id !== id) return c;
      const name = patch.name?.trim();
      const tag = patch.tag !== undefined ? (patch.tag.trim() || undefined) : c.tag;
      return { ...c, name: name || c.name, tag };
    }));
  }

  private persist(list: SavedCharacter[]): void {
    this.characters$.next(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch { }
  }

  private load(): SavedCharacter[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch { }
    return [];
  }
}
