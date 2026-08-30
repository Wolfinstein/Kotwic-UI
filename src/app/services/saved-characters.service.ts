import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../models/character';

export interface SavedCharacter {
  id: string;
  name: string;
  character: Character;
}

const STORAGE_KEY = 'kotwic_saved_characters';

@Injectable({ providedIn: 'root' })
export class SavedCharactersService {
  private characters$ = new BehaviorSubject<SavedCharacter[]>(this.load());

  getAll$ = () => this.characters$.asObservable();

  add(name: string, character: Character): void {
    const entry: SavedCharacter = { id: crypto.randomUUID(), name, character };
    this.persist([...this.characters$.value, entry]);
  }

  remove(id: string): void {
    this.persist(this.characters$.value.filter(c => c.id !== id));
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
