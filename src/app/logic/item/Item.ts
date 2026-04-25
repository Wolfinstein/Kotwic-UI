/**
 * Main item composition model
 * An Item is composed of a base, optional prefix, and optional suffix
 */

import { Affix } from './Affix';
import { Base } from './Base';

export class Item {
  prefix?: Affix;
  suffix?: Affix;
  base?: Base;

  constructor(prefix?: Affix, suffix?: Affix, base?: Base) {
    this.prefix = prefix;
    this.suffix = suffix;
    this.base = base;
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
  public  prefix?: Affix;
  public  suffix?: Affix;
  public  base?: Base;

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

  build(): Item {
    return new Item(this.prefix, this.suffix, this.base);
  }
}
