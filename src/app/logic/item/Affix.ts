import { ItemGenre, ItemRarity } from './constants';
import { Stats } from './Stats';
import { WeaponStats } from './WeaponStats';
export abstract class Affix {
  genre: ItemGenre;
  stats: Stats;
  rarity?: ItemRarity;
  weaponStats? : WeaponStats;
  constructor(genre: ItemGenre, stats: Stats) {
    this.genre = genre;
    this.stats = stats;
  }
}
