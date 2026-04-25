/**
 * Item prefix modifier
 * Represents a prefix that can be applied to items
 */

import { Affix } from './Affix';
import { ItemGenre, ItemRarity, PrefixType } from './constants';
import { Stats } from './Stats';

export class Prefix extends Affix {
  prefixType: PrefixType;

  constructor(genre: ItemGenre, rarity: ItemRarity, prefixType: PrefixType, stats: Stats) {
    super(genre, rarity, stats);
    this.prefixType = prefixType;
  }

  /**
   * Create a new Prefix using the builder pattern
   */
  static builder(): PrefixBuilder {
    return new PrefixBuilder();
  }
}

/**
 * Builder class for Prefix
 */
class PrefixBuilder {
  private genre: ItemGenre | undefined;
  private rarity: ItemRarity | undefined;
  private prefixType: PrefixType | undefined;
  private stats: Stats = new Stats();

  setGenre(genre: ItemGenre): this {
    this.genre = genre;
    return this;
  }

  setRarity(rarity: ItemRarity): this {
    this.rarity = rarity;
    return this;
  }

  setPrefixType(prefixType: PrefixType): this {
    this.prefixType = prefixType;
    return this;
  }

  setStats(stats: Stats): this {
    this.stats = stats;
    return this;
  }

  build(): Prefix {
    if (!this.genre || !this.rarity || !this.prefixType) {
      throw new Error('Genre, rarity, and prefixType are required to build a Prefix');
    }
    return new Prefix(this.genre, this.rarity, this.prefixType, this.stats);
  }
}
