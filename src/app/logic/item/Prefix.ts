/**
 * Item prefix modifier
 * Represents a prefix that can be applied to items
 */

import { Affix } from './Affix';
import { ItemGenre, PrefixType, ItemRarity } from './constants';
import { Stats } from './Stats';

export class Prefix extends Affix {
  prefixType: PrefixType;

  constructor(genre: ItemGenre, prefixType: PrefixType, stats: Stats, rarity?: ItemRarity) {
    super(genre, stats, rarity);
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
  private prefixType: PrefixType | undefined;
  private stats: Stats = new Stats();
  private rarity: ItemRarity | undefined;

  setGenre(genre: ItemGenre): this {
    this.genre = genre;
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

  setRarity(rarity: ItemRarity): this {
    this.rarity = rarity;
    return this;
  }

  build(): Prefix {
    if (!this.genre || !this.prefixType) {
      throw new Error('Genre and prefixType are required to build a Prefix');
    }
    return new Prefix(this.genre, this.prefixType, this.stats, this.rarity);
  }
}
