/**
 * Base item representation
 * Contains the foundational properties of an item (rarity, stats, genre, type)
 */

import { ItemGenre, ItemRarity, ItemType } from './constants';
import { Stats } from './Stats';

export class Base {
  rarity: ItemRarity;
  stats: Stats;
  genre: ItemGenre;
  type: ItemType;

  constructor(rarity: ItemRarity, stats: Stats, genre: ItemGenre, type: ItemType) {
    this.rarity = rarity;
    this.stats = stats;
    this.genre = genre;
    this.type = type;
  }

  /**
   * Create a new Base using the builder pattern
   */
  static builder(): BaseBuilder {
    return new BaseBuilder();
  }
}

/**
 * Builder class for Base
 */
class BaseBuilder {
  private rarity: ItemRarity | undefined;
  private stats: Stats = new Stats();
  private genre: ItemGenre | undefined;
  private type: ItemType | undefined;

  setRarity(rarity: ItemRarity): this {
    this.rarity = rarity;
    return this;
  }

  setStats(stats: Stats): this {
    this.stats = stats;
    return this;
  }

  setGenre(genre: ItemGenre): this {
    this.genre = genre;
    return this;
  }

  setType(type: ItemType): this {
    this.type = type;
    return this;
  }

  build(): Base {
    if (!this.rarity || !this.genre || !this.type) {
      throw new Error('Rarity, genre, and type are required to build a Base');
    }
    return new Base(this.rarity, this.stats, this.genre, this.type);
  }
}
