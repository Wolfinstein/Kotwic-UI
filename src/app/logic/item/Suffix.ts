
import { Affix } from './Affix';
import { ItemGenre, SuffixType, ItemRarity } from './constants';
import { Stats } from './Stats';
export class Suffix extends Affix {
  suffixType: SuffixType;
  constructor(genre: ItemGenre, suffixType: SuffixType, stats: Stats, rarity?: ItemRarity) {
    super(genre, stats, rarity);
    this.suffixType = suffixType;
  }
  static builder(): SuffixBuilder {
    return new SuffixBuilder();
  }
}
class SuffixBuilder {
  private genre: ItemGenre | undefined;
  private suffixType: SuffixType | undefined;
  private stats: Stats = new Stats();
  setGenre(genre: ItemGenre): this {
    this.genre = genre;
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
    if (!this.genre || !this.suffixType) {
      throw new Error('Genre and suffixType are required to build a Suffix');
    }
    return new Suffix(this.genre, this.suffixType, this.stats);
  }
}
