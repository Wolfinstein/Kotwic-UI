
import { Affix } from './Affix';
import { ItemGenre, SuffixType, ItemRarity } from './constants';
import { Stats } from './Stats';
import { WeaponStats } from './WeaponStats';
export class Suffix extends Affix {
  suffixType: SuffixType;

  constructor(genre: ItemGenre, suffixType: SuffixType, stats: Stats) {
    super(genre, stats);
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
  private _weaponStats: WeaponStats | undefined;

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
  setWeaponStats(weaponStats: WeaponStats): this {
    this._weaponStats = weaponStats;
    return this;
  }
  build(): Suffix {
    if (!this.genre || !this.suffixType) {
      throw new Error('Genre and suffixType are required to build a Suffix');
    }
    const suffix = new Suffix(this.genre, this.suffixType, this.stats);
        if (this._weaponStats) suffix.weaponStats = this._weaponStats;
        return suffix;
  }
}
