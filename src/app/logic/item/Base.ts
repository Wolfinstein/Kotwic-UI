
import { ItemGenre, ItemType, ItemRarity } from './constants';
import { Stats } from './Stats';
export class Base {
  stats: Stats;
  genre: ItemGenre;
  type: ItemType;
  rarity?: ItemRarity;
  constructor(stats: Stats, genre: ItemGenre, type: ItemType, rarity?: ItemRarity) {
    this.stats = stats;
    this.genre = genre;
    this.type = type;
    this.rarity = rarity;
  }
  static builder(): BaseBuilder {
    return new BaseBuilder();
  }
}
class BaseBuilder {
  private stats: Stats = new Stats();
  private genre: ItemGenre | undefined;
  private type: ItemType | undefined;
  private rarity: ItemRarity | undefined;
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
  setRarity(rarity: ItemRarity): this {
    this.rarity = rarity;
    return this;
  }
  build(): Base {
    if (!this.genre || !this.type) {
      throw new Error('Genre and type are required to build a Base');
    }
    return new Base(this.stats, this.genre, this.type, this.rarity);
  }
}
