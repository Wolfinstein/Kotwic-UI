
import { ItemGenre, ItemType, ItemRarity } from './constants';
import { Stats } from './Stats';
import { WeaponStats } from './WeaponStats';
export class Base {
  stats: Stats;
  genre: ItemGenre;
  type: ItemType;
  rarity?: ItemRarity;
  weaponStats? : WeaponStats;
  constructor(stats: Stats, genre: ItemGenre, type: ItemType) {
    this.stats = stats;
    this.genre = genre;
    this.type = type;
  }
  static builder(): BaseBuilder {
    return new BaseBuilder();
  }
}
class BaseBuilder {
  private stats: Stats = new Stats();
  private genre: ItemGenre | undefined;
  private type: ItemType | undefined;
  private _weaponStats: WeaponStats | undefined;
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
  setWeaponStats(weaponStats: WeaponStats): this {
    this._weaponStats = weaponStats;
    return this;
  }
  build(): Base {
    if (!this.genre || !this.type) {
      throw new Error('Genre and type are required to build a Base');
    }
    const base = new Base(this.stats, this.genre, this.type);
    if (this._weaponStats) base.weaponStats = this._weaponStats;
    return base;
  }
}
