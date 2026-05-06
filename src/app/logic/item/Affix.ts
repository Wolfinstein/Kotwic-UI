import { ItemGenre, ItemRarity } from './constants';
import { Stats } from './Stats';

export abstract class Affix {
  genre: ItemGenre;
  stats: Stats;
  rarity?: ItemRarity;

  constructor(genre: ItemGenre, stats: Stats, rarity?: ItemRarity) {
    this.genre = genre;
    this.stats = stats;
    this.rarity = rarity;
  }
}
