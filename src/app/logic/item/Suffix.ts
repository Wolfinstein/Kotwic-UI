/**
 * Item suffix modifier
 * Represents a suffix that can be applied to items
 */

import { Affix } from './Affix';
import { ItemGenre, ItemRarity, SuffixType } from './constants';
import { Stats } from './Stats';

export class Suffix extends Affix {
  suffixType: SuffixType;

  constructor(genre: ItemGenre, rarity: ItemRarity, suffixType: SuffixType, stats: Stats) {
    super(genre, rarity, stats);
    this.suffixType = suffixType;
  }

  /**
   * Create a new Suffix using the builder pattern
   */
  static builder(): SuffixBuilder {
    return new SuffixBuilder();
  }
}

/**
 * Builder class for Suffix
 */
class SuffixBuilder {
  private genre: ItemGenre | undefined;
  private rarity: ItemRarity | undefined;
  private suffixType: SuffixType | undefined;
  private stats: Stats = new Stats();

  setGenre(genre: ItemGenre): this {
    this.genre = genre;
    return this;
  }

  setRarity(rarity: ItemRarity): this {
    this.rarity = rarity;
    return this;
  }

  setSuffixType(suffixType: SuffixType): this {
    this.suffixType = suffixType;
    return this;
  }

  setStats(stats: Stats): this {
    this.stats = stats;
    return this;
  }

  build(): Suffix {
    if (!this.genre || !this.rarity || !this.suffixType) {
      throw new Error('Genre, rarity, and suffixType are required to build a Suffix');
    }
    return new Suffix(this.genre, this.rarity, this.suffixType, this.stats);
  }
}
