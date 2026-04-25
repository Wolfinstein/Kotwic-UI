/**
 * Abstract base class for item modifiers (Prefix and Suffix)
 */

import { ItemGenre, ItemRarity } from './constants';
import { Stats } from './Stats';

export abstract class Affix {
  genre: ItemGenre;
  rarity: ItemRarity;
  stats: Stats;

  constructor(genre: ItemGenre, rarity: ItemRarity, stats: Stats) {
    this.genre = genre;
    this.rarity = rarity;
    this.stats = stats;
  }
}
