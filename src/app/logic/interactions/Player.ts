import { Item, Stats, SetType } from '../item';
import { MultiplicativeBonus, MultiplicativeBonusType } from './MultiplicativeBonus';
import { ItemGenre } from '../item/constants/itemGenre';
import { SetsDictionary } from '../dictionaries/SetsDictionary';
import { PrefixType } from '../item/constants/affixType';
import { Prefix } from '../item/Prefix';

export enum PlayerRasa {
  LM = 'LM',
  SSAK = 'SSAK',
  WZ = 'WZ',
  POTEP = 'POTEP',
  KULTEK = 'KULTEK',
}

export class Player {
  lvl: number;
  life: number;
  baseLife: number;
  items: Item[] = [];
  bonuses: MultiplicativeBonus[] = [];
  stats: Stats;
  ziz4: boolean = false;
  hasZar: boolean = false;
  obronaPrzeciwnika : number;
  odpornoscPrzeciwnika : number;

constructor(
    lvl: number = 1,
    life: number = 0,
    baseLife: number = 0,
    stats?: Stats,
    items?: Item[],
    bonuses?: MultiplicativeBonus[],
    ziz4?: boolean,
    hasZar?: boolean,
    obronaPrzeciwnika : number = 0,
    odpornoscPrzeciwnika : number = 0
  ) {
    this.lvl = lvl;
    this.life = life;
    this.baseLife = baseLife;
    this.stats = stats || new Stats();
    this.items = items || [];
    this.bonuses = bonuses || [];
    this.ziz4 = ziz4 || false;
    this.hasZar = hasZar || false;
    this.obronaPrzeciwnika = obronaPrzeciwnika;
    this.odpornoscPrzeciwnika = odpornoscPrzeciwnika;
  }

  static builder() {
    return new PlayerBuilder();
  }

  doMysliwy(mysliwy: number): void {
    const baseStat = (Math.floor(this.lvl / 10) * 10);
    let divisor: number;

    switch (mysliwy) {
      case 1:
        divisor = 20;
        break;
      case 2:
        divisor = 16;
        break;
      case 3:
        divisor = 14;
        break;
      case 4:
        divisor = 12;
        break;
      case 5:
        divisor = 10;
        break;
      default:
        return;
    }

    const statIncrease = baseStat / divisor;
    const lifeIncrease = statIncrease * 50;

    this.stats.sila += statIncrease;
    this.stats.zwinnosc += statIncrease;
    this.stats.odpornosc += statIncrease;
    this.stats.wyglad += statIncrease;
    this.stats.charyzma += statIncrease;
    this.stats.wplywy += statIncrease;
    this.stats.spostrzegawczosc += statIncrease;
    this.stats.inteligencja += statIncrease;
    this.stats.wiedza += statIncrease;
    this.life += lifeIncrease;
  }

  doNinja(ninja: number): void {
    switch (ninja) {
      case 1:
        this.stats.additionalIni += 15;
        break;
      case 2:
        this.stats.additionalIni += 30;
        break;
      case 3:
        this.stats.additionalIni += 45;
        break;
      case 4:
        this.stats.additionalIni += 60;
        break;
      case 5:
        this.stats.additionalIni += 75;
        break;
    }
  }

  doRasa(rasa: string): void {
    switch (rasa) {
      case 'LapaczMysli':
        this.stats.setAllUnik(0.10);
        this.stats.szczescie += 10;
        break;
      case 'Ssak':
        this.life += this.baseLife * 0.1;
        this.stats.setAllDps(5);
        break;
      case 'WladcaZwierzat':
        this.life += this.baseLife * 0.2;
        this.stats.ignoreObrony += 0.10;
        this.stats.trafienieBiala += 20;
        break;
      case 'Potepiony':
        this.stats.setAllTrafienie(30);
        break;
      case 'Kultysta':
        this.stats.szczescie += 5;
        this.stats.setAllCritChance(0.05);
        break;
    }
  }

  addBonus(bonus: MultiplicativeBonus): void {
    this.bonuses.push(bonus);
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  addSpostrzegawczosc(value: number): void {
    this.stats.spostrzegawczosc += value;
  }

  addWiedza(value: number): void {
    this.stats.wiedza += value;
  }

  addInteligencja(value: number): void {
    this.stats.inteligencja += value;
  }

  addWplywy(value: number): void {
    this.stats.wplywy += value;
  }

  addCharyzma(value: number): void {
    this.stats.charyzma += value;
  }

  addOdpornosc(value: number): void {
    this.stats.odpornosc += value;
  }

  addSila(value: number): void {
    this.stats.sila += value;
  }

  addZwinnosc(value: number): void {
    this.stats.zwinnosc += value;
  }

  addWyglad(value: number): void {
    this.stats.wyglad += value;
  }

  addUnikBiala(value: number): void {
    this.stats.unikBiala += value;
  }

  addUnikDystans(value: number): void {
    this.stats.unikDystans += value;
  }

  addUnikPalna(value: number): void {
    this.stats.unikPalna += value;
  }

  addAllUnik(value: number) :void {
      this.addUnikPalna(value)
      this.addUnikDystans(value)
      this.addUnikBiala(value)
  }

  addRedukcjaObrazen(value: number): void {
    this.stats.redukcjaObrazen += value;
  }

  addObronaDodatkowa(value: number): void {
    this.stats.obronaDodatkowa += value;
  }

  addBaseLife(value: number): void {
    this.baseLife += value;
  }

  addLife(value: number): void {
    this.life += value;
  }

  addIgnore(value: number): void {
    this.stats.ignoreObrony += value;
  }

  addCritMulti(value: number): void {
    this.stats.setAllCritMulti(value);
  }

  resolveNonWeaponItems(): void {
    const nonWeapon = this.items.filter(
      (a) =>
        a.base &&
        a.base.genre !== ItemGenre.GUN_1H &&
        a.base.genre !== ItemGenre.GUN_2H &&
        a.base.genre !== ItemGenre.RANGE_1H &&
        a.base.genre !== ItemGenre.RANGE_2H &&
        a.base.genre !== ItemGenre.WHITE_1H &&
        a.base.genre !== ItemGenre.WHITE_2H
    );

    if (!nonWeapon || nonWeapon.length === 0) {
    //  console.log('Nie ma itemów');
      return;
    }

    let itemStats = this.stats;
    for (const a of nonWeapon) {
      const temp = new Stats();
      if (a.base) temp.addStats(a.base.stats);
      if (a.prefix) temp.addStats(a.prefix.stats);
      if (a.suffix) temp.addStats(a.suffix.stats);
      itemStats.addStats(temp);
    }

    if (this.stats.isObronaZero) {
      itemStats.obronaPrzedmiotow = 0;
    }

    this.stats = itemStats;
  }

    resolveWeaponItem(a : Item): void {

    let itemStats = this.stats;
      const temp = new Stats();
      if (a.base) temp.addStats(a.base.stats);
      if (a.prefix) temp.addStats(a.prefix.stats);
      if (a.suffix) temp.addStats(a.suffix.stats);
      itemStats.addStats(temp);

    if (this.stats.isObronaZero) {
      itemStats.obronaPrzedmiotow = 0;
    }

    this.stats = itemStats;
  }

  resolveSetBonuses(): void {
    const itemsWithPrefix = this.items.filter((item) => item.prefix);

    if (!itemsWithPrefix || itemsWithPrefix.length < 3) {
      return;
    }

    const armorGenres = [ItemGenre.HEAD, ItemGenre.CHEST, ItemGenre.LEGS];
    const jewelryGenres = [ItemGenre.NECK, ItemGenre.FINGER];

    this.applySetBonusForGroup(
      itemsWithPrefix.filter((item) => armorGenres.includes(item.prefix!.genre)),
      (type, rarity) => SetsDictionary.getArmourSet(type, rarity, this.lvl)
    );

    this.applySetBonusForGroup(
      itemsWithPrefix.filter((item) => jewelryGenres.includes(item.prefix!.genre)),
      (type, rarity) => SetsDictionary.getJewelerSet(type, rarity, this.lvl)
    );
  }

  private applySetBonusForGroup(
    groupItems: Item[],
    getSetFn: (type: SetType, rarity: any) => any
  ): void {
    if (groupItems.length < 3) {
      return;
    }

    const prefixTypeMap = new Map<string, Item[]>();

    for (const item of groupItems) {
      if (!(item.prefix instanceof Prefix)) continue;
      const prefixType = (item.prefix as Prefix).prefixType;
      if (!prefixType) continue;

      const key = prefixType;
      if (!prefixTypeMap.has(key)) {
        prefixTypeMap.set(key, []);
      }
      prefixTypeMap.get(key)!.push(item);
    }

    const rarityHierarchy = [
      'ZWYKLY',
      'DOBRY',
      'DOSKONALY',
      'LEGENDARNY',
      'LEGENDARNY_DOBRY',
      'LEGENDARNY_DOSKONALY',
      'EPICKI'
    ];

    for (const [prefixType, items] of prefixTypeMap.entries()) {
      if (items.length < 3) {
        continue;
      }

      const setType = this.getSetTypeFromPrefixType(prefixType as PrefixType);
      if (!setType) {
        continue;
      }

      let minRarity = items[0].base?.rarity;
      for (const item of items) {
        const itemRarity = item.base?.rarity;
        if (!itemRarity || !minRarity) continue;

        const minIndex = rarityHierarchy.indexOf(minRarity as string);
        const itemIndex = rarityHierarchy.indexOf(itemRarity as string);

        if (itemIndex < minIndex) {
          minRarity = itemRarity;
        }
      }

      try {
        const set = getSetFn(setType, minRarity);
        if (set) {
          this.stats.addStats(set.stats);

          if (set.bonusList && set.bonusList.length > 0) {
            for (const bonus of set.bonusList) {
              this.addBonus(bonus as MultiplicativeBonus);
            }
          }
        }
      } catch (error) {
      }
    }
  }

  private getSetTypeFromPrefixType(prefixType: PrefixType): SetType | null {
    const setTypeEntries = Object.entries(SetType);
    const prefixTypeStr = prefixType as string;
    for (const [, setTypeValue] of setTypeEntries) {
      if ((setTypeValue as string) === prefixTypeStr) {
        return setTypeValue as SetType;
      }
    }
    return null;
  }

  addAllCrit(value: number): void {
    this.stats.setAllCritChance(value);
  }

  addCritChancePalna(value: number): void {
    this.stats.setCritChancePalna(value);
  }

  addPunktyKrwi(value: number): void {
    this.stats.setPunktyKrwi(value);
  }

  addAllTrafienie(value: number): void {
    this.stats.setAllTrafienie(value);
  }

  addAllAtaki(value: number): void {
    this.stats.setAllAtaki(value);
  }

  addAllDps(value: number): void {
    this.stats.setAllDps(value);
  }

  addSzczescie(value: number): void {
    this.stats.szczescie += value;
  }

  addCritMultiBiala1h(value: number): void {
    this.stats.critMultiBiala1h += value;
  }

  addCritMultiBiala2h(value: number): void {
    this.stats.critMultiBiala2h += value;
  }

  addCritMultiDystans1h(value: number): void {
    this.stats.critMultiDystans1h += value;
  }

  addCritMultiDystans2h(value: number): void {
    this.stats.critMultiDystans2h += value;
  }

  addCritMultiPalna2h(value: number): void {
    this.stats.critMultiPalna2h += value;
  }

  addCritMultiPalna1h(value: number): void {
    this.stats.critMultiPalna1h += value;
  }

  addMinDpsBiala1h(value: number): void {
    this.stats.minDpsBiala1h += value;
  }

  addMinDpsBiala2h(value: number): void {
    this.stats.minDpsBiala2h += value;
  }

  addMaxDpsBiala1h(value: number): void {
    this.stats.maxDpsBiala1h += value;
  }

  addMaxDpsBiala2h(value: number): void {
    this.stats.maxDpsBiala2h += value;
  }

  addMinDpsPalna1h(value: number): void {
    this.stats.minDpsPalna1h += value;
  }

  addMinDpsPalna2h(value: number): void {
    this.stats.minDpsPalna2h += value;
  }

  addMaxDpsPalna1h(value: number): void {
    this.stats.maxDpsPalna1h += value;
  }

  addMaxDpsPalna2h(value: number): void {
    this.stats.maxDpsPalna2h += value;
  }

  addMinDpsDystans1h(value: number): void {
    this.stats.minDpsDystans1h += value;
  }

  addMinDpsDystans2h(value: number): void {
    this.stats.minDpsDystans2h += value;
  }

  addMaxDpsDystans1h(value: number): void {
    this.stats.maxDpsDystans1h += value;
  }

  addMaxDpsDystans2h(value: number): void {
    this.stats.maxDpsDystans2h += value;
  }

  addRegen(value: number): void {
    this.stats.regen += value;
  }

  addAtakiBiala(value: number): void {
    this.stats.atakiBiala += value;
  }

  addAtakiDystans1h(value: number): void {
    this.stats.atakiDystans1h += value;
  }

  addAtakiDystans2h(value: number): void {
    this.stats.atakiDystans2h += value;
  }

  addAllCritMulti1h(value: number): void {
    this.stats.setAllCritMulti1h(value);
  }

  addAllCritMulti2h(value: number): void {
    this.stats.setAllCritMulti2h(value);
  }

  setAllDps1h(dps: number): void {
    this.stats.setAllDps1h(dps);
  }

  setAllDps2h(dps: number): void {
    this.stats.setAllDps2h(dps);
  }

  addTwardosc(t: number): void {
    this.stats.twardosc += t;
  }

  addAdditionalIni(value: number): void {
    this.stats.additionalIni += value;
  }

  addTrafienieProcentowePalna(value: number): void {
    this.stats.trafienieProcentowePalna += value;
  }

  addTrafienieProcentoweBiala(value: number): void {
    this.stats.trafienieProcentoweBiala += value;
  }

  addTrafienieProcentoweDystans(value: number): void {
    this.stats.trafienieProcentoweDystans += value;
  }

  addLaczneObrazeniaWszystkichBroni(value: number): void {
    this.stats.laczneObrazeniaWszystkichBroni += value;
  }

  addObrazeniaProcentoweRuny(value: number): void {
    this.stats.obrazeniaProcentoweRuny += value;
  }

  addMinDmg(value: number): void {
    this.stats.setAllMinDps(value);
  }

  addMaxDmg(value: number): void {
    this.stats.setAllMaxDps(value);
  }

  addRegeneration(value: number): void {
    this.stats.setRegeneration(value);
  }

  setLife(life: number): void {
    this.life = life;
  }

  setObronaPrzeciwnika(obronaPrzeciwnika: number): void {
    this.obronaPrzeciwnika = obronaPrzeciwnika;
  }

  setOdpornoscPrzeciwnika(odpornoscPrzeciwnika: number): void {
    this.odpornoscPrzeciwnika = odpornoscPrzeciwnika;
  }

  setHasZar(hasZar: boolean): void {
    this.hasZar = hasZar;
  }

  setZiz4(ziz4: boolean): void {
    this.ziz4 = ziz4;
  }
}

export  class PlayerBuilder {
  private _lvl: number = 1;
  private _life: number = 0;
  private _baseLife: number = 0;
  private _items?: Item[];
  private _bonuses?: MultiplicativeBonus[];
  private _stats?: Stats;
  private _ziz4: boolean = false;
  private _hasZar: boolean = false;
  private _obronaPrzeciwnika : number = 0;
  private _odpornoscPrzeciwnika : number = 0;

  lvl(lvl: number): PlayerBuilder {
    this._lvl = lvl;
    return this;
  }

  life(life: number): PlayerBuilder {
    this._life = life;
    return this;
  }

  obronaPrzeciwnika(obronaPrzeciwnika: number): PlayerBuilder {
    this._obronaPrzeciwnika = obronaPrzeciwnika;
    return this;
  }

  odpornoscPrzeciwnika(odpornoscPrzeciwnika: number): PlayerBuilder {
    this._odpornoscPrzeciwnika = odpornoscPrzeciwnika;
    return this;
  }

  baseLife(baseLife: number): PlayerBuilder {
    this._baseLife = baseLife;
    return this;
  }

  items(items: Item[]): PlayerBuilder {
    this._items = items;
    return this;
  }

  bonuses(bonuses: MultiplicativeBonus[]): PlayerBuilder {
    this._bonuses = bonuses;
    return this;
  }

  stats(stats: Stats): PlayerBuilder {
    this._stats = stats;
    return this;
  }

  ziz4(ziz4: boolean): PlayerBuilder {
    this._ziz4 = ziz4;
    return this;
  }

  hasZar(hasZar: boolean): PlayerBuilder {
    this._hasZar = hasZar;
    return this;
  }

  build(): Player {
    return new Player(
      this._lvl,
      this._life,
      this._baseLife,
      this._stats,
      this._items,
      this._bonuses,
      this._ziz4,
      this._hasZar,
      this._obronaPrzeciwnika,
      this._odpornoscPrzeciwnika
    );
  }
}
