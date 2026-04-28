/**
 * Item set definition
 * Represents a set bonus that can be applied to multiple items
 */

import { ItemRarity } from './constants';
import { Stats } from './Stats';
import { MultiplicativeBonus as InteractionBonus } from '../interactions/MultiplicativeBonus';

export type MultiplicativeBonus = InteractionBonus | { [key: string]: number };

export enum SetType {
  WZMOCNIONY = 'Wzmocniony',
  KULOODPORNY = 'Kuloodroprny',
  SZAMASKI = 'Szamaski',
  RUNICZNY = 'Runiczny',
  KRWAWY = 'Krwawy',
  TYGRYSI = 'Tygrysi',
  SMIERCIONOSNY = 'Smiercionosny',
  MIEDZIANY = 'Miedziany',
  SREBRNY = 'Srebrny',
  SZMARAGDOWY = 'Szmaragdowy',
  ZLOTY = 'Zloty',
  PLATYNOWY = 'Platynowy',
  RUBINOWY = 'Rubinowy',
  DYSTYNGOWANY = 'Dystyngowany',
  PRZEBIEGLY = 'Przebiegly',
  NIEDZWIEDZI = 'Niedzwiedzi',
  TWARDY = 'Twardy',
  GWIEZDNY = 'Gwiezdny',
  ELASTYCZNY = 'Elastyczny',
  KARDYNALSKI = 'Kardynalski',
  NEKROMANCKI = 'Nekromancki',
  PLASTIKOWY = 'Plastikowy',
  TYTANOWY = 'Tytanowy',
  DIAMENTOWY = 'Diamentowy',
  MSCIWY = 'Msciwy',
  SPACZONY = 'Spaczony',
  ZDRADZIECKI = 'Zdradziecki',
  ARCHAICZNY = 'Archaiczny',
  HIPNOTYCZNY = 'Hipnotyczny',
  TANCZACY = 'Tanczacy',
  ZWIERZECY = 'Zwierzecy',
  JASTRZEBI = 'Jastrzebi',
  PAJECZY = 'Pajeczy',
  SLONECZNY = 'Sloneczny',
  CZARNY = 'Czarny'
}

export class Set {
  type: SetType;
  rarity: ItemRarity;
  stats: Stats;
  bonusList?: MultiplicativeBonus[];

  constructor(type: SetType, rarity: ItemRarity, stats: Stats, bonusList?: MultiplicativeBonus[]) {
    this.type = type;
    this.rarity = rarity;
    this.stats = stats;
    this.bonusList = bonusList;
  }

  /**
   * Create a new Set using the builder pattern
   */
  static builder(): SetBuilder {
    return new SetBuilder();
  }
}

/**
 * Builder class for Set
 */
class SetBuilder {
  private type: SetType | undefined;
  private rarity: ItemRarity | undefined;
  private stats: Stats = new Stats();
  private bonusList?: MultiplicativeBonus[];

  setType(type: SetType): this {
    this.type = type;
    return this;
  }

  setRarity(rarity: ItemRarity): this {
    this.rarity = rarity;
    return this;
  }

  setStats(stats: Stats): this {
    this.stats = stats;
    return this;
  }

  setBonusList(bonusList: MultiplicativeBonus[]): this {
    this.bonusList = bonusList;
    return this;
  }

  build(): Set {
    if (!this.type || !this.rarity) {
      throw new Error('Type and rarity are required to build a Set');
    }
    return new Set(this.type, this.rarity, this.stats, this.bonusList);
  }
}
