
import { Affix } from './Affix';
import { ItemGenre, PrefixType, ItemRarity } from './constants';
import { Stats } from './Stats';
import { WeaponStats } from './WeaponStats';
export class Prefix extends Affix {
  prefixType: PrefixType;

  constructor(genre: ItemGenre, prefixType: PrefixType, stats: Stats) {
    super(genre, stats);
    this.prefixType = prefixType;
  }

  static builder(): PrefixBuilder {
    return new PrefixBuilder();
  }
}
class PrefixBuilder {
  private genre: ItemGenre | undefined;
  private prefixType: PrefixType | undefined;
  private stats: Stats = new Stats();
  private _weaponStats: WeaponStats | undefined;

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
  setWeaponStats(weaponStats: WeaponStats): this {
    this._weaponStats = weaponStats;
    return this;
  }
  build(): Prefix {
    if (!this.genre || !this.prefixType) {
      throw new Error('Genre and prefixType are required to build a Prefix');
    }
    const prefix = new Prefix(this.genre, this.prefixType, this.stats);
    if (this._weaponStats) prefix.weaponStats = this._weaponStats;
    return prefix;
  }
}
