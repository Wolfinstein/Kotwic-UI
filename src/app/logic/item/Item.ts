/**
 * Main item composition model
 * An Item is composed of a base, optional prefix, and optional suffix
 */

import { Affix } from './Affix';
import { Base } from './Base';
import { ItemRarity } from './constants/itemRarity';

export class Item {
  prefix?: Affix;
  suffix?: Affix;
  base?: Base;
  rarity?: ItemRarity;

  constructor(prefix?: Affix, suffix?: Affix, base?: Base, rarity?: ItemRarity) {
    this.prefix = prefix;
    this.suffix = suffix;
    this.base = base;
    this.rarity = rarity;
  }

  getRarity(): ItemRarity {
    return this.rarity ?? ItemRarity.ZWYKLY;
  }

  /**
   * Create a new Item using the builder pattern
   */
  static builder(): ItemBuilder {
    return new ItemBuilder();
  }
}

/**
 * Builder class for Item
 */
export class ItemBuilder {
  public prefix?: Affix;
  public suffix?: Affix;
  public base?: Base;
  public rarity?: ItemRarity;

  setPrefix(prefix: Affix): this {
    this.prefix = prefix;
    return this;
  }

  setSuffix(suffix: Affix): this {
    this.suffix = suffix;
    return this;
  }

  setBase(base: Base): this {
    this.base = base;
    return this;
  }

  setRarity(rarity: ItemRarity): this {
    this.rarity = rarity;
    return this;
  }

  build(): Item {
    return new Item(this.prefix, this.suffix, this.base, this.rarity);
  }
}
