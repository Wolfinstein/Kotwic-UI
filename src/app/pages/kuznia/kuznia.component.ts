import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FORGE_DATA, RUNES, ForgeStep } from '../../data/forgeData';

interface CategoryDef {
  type: string;
  label: string;
  hasPref: boolean;
  hasSuf: boolean;
}

const CATEGORIES: CategoryDef[] = [
  { type: 'helmet', label: 'Głowa', hasPref: true, hasSuf: true },
  { type: 'armor', label: 'Zbroja', hasPref: true, hasSuf: true },
  { type: 'legs', label: 'Nogi', hasPref: true, hasSuf: true },
  { type: 'amulet', label: 'Amulet', hasPref: true, hasSuf: true },
  { type: 'ring', label: 'Pierścień', hasPref: true, hasSuf: true },
  { type: 'w1h', label: 'Biała 1h', hasPref: true, hasSuf: true },
  { type: 'w2h', label: 'Biała 2h', hasPref: true, hasSuf: true },
  { type: 'f1h', label: 'Palna 1h', hasPref: false, hasSuf: false },
  { type: 'f2h', label: 'Palna 2h', hasPref: false, hasSuf: false },
  { type: 'r', label: 'Dystansowa', hasPref: false, hasSuf: true },
];

interface ArmoryItem {
  name: string;
  type: string;
  item: string;
  pref?: string;
  suf?: string;
}

interface TargetItem {
  type?: string;
  pref?: string;
  item?: string;
  suf?: string;
}

interface ResultItem {
  candidate: ArmoryItem;
  coinPrice: number;
  evoPrice: number;
  runePrice: number;
  upgPref: number;
  upgItem: number;
  upgSuf: number;
  degPref: number;
  degItem: number;
  degSuf: number;
}

@Component({
  selector: 'app-kuznia',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, ButtonModule],
  templateUrl: './kuznia.component.html',
  styleUrl: './kuznia.component.css'
})
export class KuzniaComponent {
  readonly categories = CATEGORIES;
  readonly runes = RUNES;

  // ── Target item builder ──
  selectedType: string | null = null;
  selectedPref: string | null = null;
  selectedItem: string | null = null;
  selectedSuf: string | null = null;

  get prefOptions(): ForgeStep[] {
    if (!this.selectedType) return [];
    return FORGE_DATA[`${this.selectedType}_pref`] ?? [];
  }
  get itemOptions(): ForgeStep[] {
    if (!this.selectedType) return [];
    return FORGE_DATA[`${this.selectedType}_item`] ?? [];
  }
  get sufOptions(): ForgeStep[] {
    if (!this.selectedType) return [];
    return FORGE_DATA[`${this.selectedType}_suf`] ?? [];
  }

  onTypeChange(): void {
    this.selectedPref = null;
    this.selectedItem = null;
    this.selectedSuf = null;
    this.results = [];
    this.noMatchInfo = null;
  }

  get targetName(): string {
    if (!this.selectedType) return 'Musisz wybrać typ przedmiotu!';
    if (!this.selectedPref && !this.selectedItem && !this.selectedSuf) {
      return 'Musisz wybrać pref, suf, lub podstawę!';
    }
    const pref = this.selectedPref ?? '[Dowolny / Brak]';
    const item = this.selectedItem ?? '[Dowolny]';
    const suf = this.selectedSuf ?? '[Dowolny / Brak]';
    return `Epicki ${pref} ${item} ${suf}`.replace(/\s+/g, ' ').trim();
  }

  // ── Armory paste parsing ──
  armoryText = '';
  armory: ArmoryItem[] = [];

  private identifyItem(itemToIdentify: string): ArmoryItem | null {
    const categoriesToCheck = Object.keys(FORGE_DATA).filter(k => k.includes('item'));
    const possibleItems: { name: string; type: string }[] = [];

    for (const category of categoriesToCheck) {
      for (const item of FORGE_DATA[category]) {
        if (itemToIdentify.indexOf(item.name) !== -1) {
          possibleItems.push({ name: item.name, type: category.slice(0, category.indexOf('_')) });
        }
      }
    }
    if (possibleItems.length === 0) return null;

    possibleItems.sort((a, b) => b.name.length - a.name.length);
    const type = possibleItems[0].type;
    const itemName = possibleItems[0].name;
    const midIndex = itemToIdentify.indexOf(itemName);

    const identified: ArmoryItem = { name: itemToIdentify, type, item: itemName };

    const prefList = FORGE_DATA[`${type}_pref`];
    if (prefList) {
      for (const p of prefList) {
        const idx = itemToIdentify.indexOf(p.name.slice(0, -2));
        if (idx !== -1 && idx < midIndex) identified.pref = p.name;
      }
    }

    const sufList = FORGE_DATA[`${type}_suf`];
    if (sufList) {
      for (const s of sufList) {
        const idx = itemToIdentify.indexOf(s.name);
        if (idx !== -1 && idx > midIndex) identified.suf = s.name;
      }
    }

    return identified;
  }

  onArmoryInput(): void {
    let paste = this.armoryText;
    const armoryTEMP: string[] = [];

    const firstIdx = paste.indexOf('Epick');
    if (firstIdx !== -1) {
      paste = paste.slice(firstIdx);
      while (paste.indexOf('Epick') !== -1) {
        const next = paste.indexOf('Epick', 1);
        armoryTEMP.push(paste.slice(0, next === -1 ? -1 : next));
        paste = paste.slice(next === -1 ? -1 : next);
      }
    }

    armoryTEMP.forEach((item, index, arr) => {
      if (item.indexOf('Legendar') !== -1) item = item.slice(0, item.indexOf('Legendar'));
      const i = item.search(/[^A-Za-z0-9 ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\-]| {2}|- /);
      arr[index] = item.slice(0, i === -1 ? undefined : i).trim();
    });

    this.armory = [];
    armoryTEMP.forEach(item => {
      const identified = this.identifyItem(item);
      if (identified) this.armory.push(identified);
    });

    this.computeResults();
  }

  // ── Cost calculation (ported 1:1 from the original forge script) ──
  sortByCoins = true;
  results: ResultItem[] = [];
  noMatchInfo: { pref: boolean; suf: boolean; typeLabel: string } | null = null;

  setSortMode(byCoins: boolean): void {
    this.sortByCoins = byCoins;
    this.computeResults();
  }

  private get targetItem(): TargetItem {
    const t: TargetItem = {};
    if (this.selectedType) t.type = this.selectedType;
    if (this.selectedPref) t.pref = this.selectedPref;
    if (this.selectedItem) t.item = this.selectedItem;
    if (this.selectedSuf) t.suf = this.selectedSuf;
    return t;
  }

  get runeIconFor(): { url: string; lvl: number } | null {
    if (this.results.length === 0) return null;
    const type = this.results[0].candidate.type;
    const itemLadder = FORGE_DATA[`${type}_item`];
    if (!itemLadder || itemLadder.length < 2) return null;
    const ref = itemLadder[1];
    return { url: this.runes[ref.rune_type ?? ''] ?? '', lvl: ref.rune_lvl ?? 0 };
  }

  computeResults(): void {
    this.results = [];
    this.noMatchInfo = null;

    const target = this.targetItem;
    if (!target.type || this.armory.length === 0) return;
    const targetType = target.type;

    const typeCompatible = this.armory.filter(item => item.type === targetType);
    const prefCompatible = typeCompatible.filter(item => (item.pref && target.pref) || !target.pref);
    const sufCompatible = prefCompatible.filter(item => (item.suf && target.suf) || !target.suf);

    if (sufCompatible.length === 0) {
      const cat = CATEGORIES.find(c => c.type === targetType);
      this.noMatchInfo = { pref: !!target.pref, suf: !!target.suf, typeLabel: cat?.label ?? targetType };
      return;
    }

    const finalArr: ResultItem[] = [];

    for (const candidate of sufCompatible) {
      let coinPrice = 0, evoPrice = 0, runePrice = 0;
      let upgPref = 0, upgItem = 0, upgSuf = 0;
      let degPref = 0, degItem = 0, degSuf = 0;
      let prefNeedsDegrade = false, itemNeedsDegrade = false, sufNeedsDegrade = false;

      if (target.pref) {
        let candidateReached = false, targetReached = false;
        for (const pref of FORGE_DATA[`${targetType}_pref`]) {
          if (pref.name === target.pref) targetReached = true;
          if (targetReached && !candidateReached && candidate.pref !== target.pref) {
            prefNeedsDegrade = true;
            break;
          }
          if (candidateReached) {
            coinPrice += pref.coins ?? 0;
            evoPrice += pref.evo ?? 0;
            runePrice += pref.rune_amount ?? 0;
            upgPref++;
          }
          if (pref.name === candidate.pref) candidateReached = true;
          if (targetReached) break;
        }
      }

      if (target.item) {
        let candidateReached = false, targetReached = false;
        for (const item of FORGE_DATA[`${targetType}_item`]) {
          if (item.name === target.item) targetReached = true;
          if (targetReached && !candidateReached && candidate.item !== target.item) {
            itemNeedsDegrade = true;
            break;
          }
          if (candidateReached) {
            coinPrice += item.coins ?? 0;
            evoPrice += item.evo ?? 0;
            runePrice += item.rune_amount ?? 0;
            upgItem++;
          }
          if (item.name === candidate.item) candidateReached = true;
          if (targetReached) break;
        }
      }

      if (target.suf) {
        let candidateReached = false, targetReached = false;
        for (const suf of FORGE_DATA[`${targetType}_suf`]) {
          if (suf.name === target.suf) targetReached = true;
          if (targetReached && !candidateReached && candidate.suf !== target.suf) {
            sufNeedsDegrade = true;
            break;
          }
          if (candidateReached) {
            coinPrice += suf.coins ?? 0;
            evoPrice += suf.evo ?? 0;
            runePrice += suf.rune_amount ?? 0;
            upgSuf++;
          }
          if (suf.name === candidate.suf) candidateReached = true;
          if (targetReached) break;
        }
      }

      if (prefNeedsDegrade) {
        const prefs = FORGE_DATA[`${targetType}_pref`];
        const candPosition = prefs.findIndex(p => p.name === candidate.pref);
        const targPosition = prefs.findIndex(p => p.name === target.pref);
        prefs.slice(targPosition + 1, candPosition + 1).forEach(p => {
          coinPrice += p.coins ?? 0;
          evoPrice += p.evo ?? 0;
          runePrice += p.rune_amount ?? 0;
          degPref++;
        });
      }

      if (itemNeedsDegrade) {
        const items = FORGE_DATA[`${targetType}_item`];
        const candPosition = items.findIndex(i => i.name === candidate.item);
        const targPosition = items.findIndex(i => i.name === target.item);
        items.slice(targPosition + 1, candPosition + 1).forEach(i => {
          coinPrice += i.coins ?? 0;
          evoPrice += i.evo ?? 0;
          runePrice += i.rune_amount ?? 0;
          degItem++;
        });
      }

      if (sufNeedsDegrade) {
        const sufs = FORGE_DATA[`${targetType}_suf`];
        const candPosition = sufs.findIndex(s => s.name === candidate.suf);
        const targPosition = sufs.findIndex(s => s.name === target.suf);
        sufs.slice(targPosition + 1, candPosition + 1).forEach(s => {
          coinPrice += s.coins ?? 0;
          evoPrice += s.evo ?? 0;
          runePrice += s.rune_amount ?? 0;
          degSuf++;
        });
      }

      finalArr.push({ candidate, coinPrice, evoPrice, runePrice, upgPref, upgItem, upgSuf, degPref, degItem, degSuf });
    }

    if (this.sortByCoins) {
      finalArr.sort((a, b) => (a.coinPrice !== b.coinPrice ? a.coinPrice - b.coinPrice : a.evoPrice - b.evoPrice));
    } else {
      finalArr.sort((a, b) => (a.evoPrice !== b.evoPrice ? a.evoPrice - b.evoPrice : a.coinPrice - b.coinPrice));
    }

    this.results = finalArr;
  }

  // ── Drabinka (ladder) viewer ──
  ladderType: string | null = null;
  ladderSlot: 'pref' | 'item' | 'suf' = 'item';

  get ladderSteps(): ForgeStep[] {
    if (!this.ladderType) return [];
    return FORGE_DATA[`${this.ladderType}_${this.ladderSlot}`] ?? [];
  }

  onLadderTypeChange(): void {
    const cat = CATEGORIES.find(c => c.type === this.ladderType);
    if (!cat) return;
    if (this.ladderSlot === 'pref' && !cat.hasPref) this.ladderSlot = 'item';
    if (this.ladderSlot === 'suf' && !cat.hasSuf) this.ladderSlot = 'item';
  }

  setLadderSlot(slot: 'pref' | 'item' | 'suf'): void {
    this.ladderSlot = slot;
  }

  get ladderCategory(): CategoryDef | undefined {
    return CATEGORIES.find(c => c.type === this.ladderType);
  }

  format(n: number): string {
    return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(n);
  }
}
