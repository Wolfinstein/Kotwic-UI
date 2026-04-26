import { Set, SetType, Stats, ItemRarity } from '../item';

export class SetsDictionary {
private static armourSetsCache: Map<number, Set[]> = new Map();
private static jewelerSetsCache: Map<number, Set[]> = new Map();

static getArmourSet(type: SetType, rarity: ItemRarity, playerLvl: number): Set {
    const sets = this.initializeArmourSets(playerLvl);
    const found = sets.find((s) => s.type === type && s.rarity === rarity);

    if (!found) {
      throw new Error(`Armour set not found for type: ${type}, rarity: ${rarity}`);
    }

    return found;
  }

  static getJewelerSet(type: SetType, rarity: ItemRarity, playerLvl: number): Set {
    const sets = this.initializeJewelerSets(playerLvl);
    const found = sets.find((s) => s.type === type && s.rarity === rarity);

    if (!found) {
      throw new Error(`Jeweler set not found for type: ${type}, rarity: ${rarity}`);
    }

    return found;
  }

  private static initializeArmourSets(playerLvl: number): Set[] {
    if (this.armourSetsCache.has(playerLvl)) {
      return this.armourSetsCache.get(playerLvl)!;
    }

    const sets: Set[] = [];
    const lvl4 = Math.floor(playerLvl / 4);
    const lvl6 = Math.floor(playerLvl / 6);

    // Wzmocniony
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.ZWYKLY, Stats.builder().obronaDodatkowa(25).zwinnosc(-5).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.DOBRY, Stats.builder().obronaDodatkowa(31).zwinnosc(-5).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.DOSKONALY, Stats.builder().obronaDodatkowa(35).zwinnosc(-5).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.LEGENDARNY, Stats.builder().obronaDodatkowa(35 + (1 * lvl4)).zwinnosc(-5).punktyZycia(0.10).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaDodatkowa(46 + (2 * lvl4)).zwinnosc(-5).punktyZycia(0.15).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaDodatkowa(55 + (3 * lvl4)).zwinnosc(-5).punktyZycia(0.20).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.EPICKI, Stats.builder().obronaDodatkowa(70 + (4 * lvl4)).zwinnosc(-5).punktyZycia(0.25).build()));

    // Kuloodporny
    sets.push(new Set(SetType.KULOODPORNY, ItemRarity.ZWYKLY, Stats.builder().odpornosc(6).unikPalna(0.14).build()));
    sets.push(new Set(SetType.KULOODPORNY, ItemRarity.DOBRY, Stats.builder().odpornosc(7).unikPalna(0.17).build()));
    sets.push(new Set(SetType.KULOODPORNY, ItemRarity.DOSKONALY, Stats.builder().odpornosc(8).unikPalna(0.19).build()));
    sets.push(new Set(SetType.KULOODPORNY, ItemRarity.LEGENDARNY, Stats.builder().odpornosc(9).unikPalna(0.14).charyzma(5).twardosc(0.03).build()));
    sets.push(new Set(SetType.KULOODPORNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().odpornosc(12).unikPalna(0.14).charyzma(8).twardosc(0.06).build()));
    sets.push(new Set(SetType.KULOODPORNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().odpornosc(14).unikPalna(0.17).charyzma(10).twardosc(0.09).build()));
    sets.push(new Set(SetType.KULOODPORNY, ItemRarity.EPICKI, Stats.builder().odpornosc(20).unikPalna(0.25).charyzma(15).twardosc(0.20).build()));

    // Szamaski
    sets.push(new Set(SetType.SZAMASKI, ItemRarity.ZWYKLY, Stats.builder().odpornosc(10).punktyKrwi(0.30).build()));
    sets.push(new Set(SetType.SZAMASKI, ItemRarity.DOBRY, Stats.builder().odpornosc(12).punktyKrwi(0.37).build()));
    sets.push(new Set(SetType.SZAMASKI, ItemRarity.DOSKONALY, Stats.builder().odpornosc(14).punktyKrwi(0.42).build()));
    sets.push(new Set(SetType.SZAMASKI, ItemRarity.LEGENDARNY, Stats.builder().odpornosc(10).punktyKrwi(0.34).obronaDodatkowa(10).build()));
    sets.push(new Set(SetType.SZAMASKI, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().odpornosc(12).punktyKrwi(0.43).obronaDodatkowa(15).build()));
    sets.push(new Set(SetType.SZAMASKI, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().odpornosc(14).punktyKrwi(0.50).obronaDodatkowa(20).build()));
    sets.push(new Set(SetType.SZAMASKI, ItemRarity.EPICKI, Stats.builder().odpornosc(20).punktyKrwi(0.60).szczescie(15).obronaDodatkowa(30).build()));

    // Tygrysi
    sets.push(new Set(SetType.TYGRYSI, ItemRarity.ZWYKLY, Stats.builder().unikBiala(0.12).critChanceDystans(0.14).critChanceBiala1h(0.14).critChanceBiala2h(0.14).critChancePalna2h(0.14).critChancePalna1h(0.14).build()));
    sets.push(new Set(SetType.TYGRYSI, ItemRarity.DOBRY, Stats.builder().unikBiala(0.15).critChanceDystans(0.17).critChanceBiala1h(0.17).critChanceBiala2h(0.17).critChancePalna2h(0.17).critChancePalna1h(0.17).build()));
    sets.push(new Set(SetType.TYGRYSI, ItemRarity.DOSKONALY, Stats.builder().unikBiala(0.16).critChanceDystans(0.19).critChanceBiala1h(0.19).critChanceBiala2h(0.19).critChancePalna2h(0.19).critChancePalna1h(0.19).build()));
    sets.push(new Set(SetType.TYGRYSI, ItemRarity.LEGENDARNY, Stats.builder().unikBiala(0.12).critChanceDystans(0.14).critChanceBiala1h(0.14).critChanceBiala2h(0.14).critChancePalna2h(0.14).critChancePalna1h(0.14).minDpsPalna1h(1 * lvl6).minDpsPalna2h(1 * lvl6).minDpsDystans2h(1 * lvl6).minDpsDystans1h(1 * lvl6).minDpsBiala1h(1 * lvl6).minDpsBiala2h(1 * lvl6).maxDpsBiala1h(1 * lvl6).maxDpsBiala2h(1 * lvl6).maxDpsPalna1h(1 * lvl6).maxDpsPalna2h(1 * lvl6).maxDpsDystans1h(1 * lvl6).maxDpsDystans2h(1 * lvl6).build()));
    sets.push(new Set(SetType.TYGRYSI, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().unikBiala(0.15).critChanceDystans(0.17).critChanceBiala1h(0.17).critChanceBiala2h(0.17).critChancePalna2h(0.17).critChancePalna1h(0.17).minDpsPalna1h(1 * lvl4).minDpsPalna2h(1 * lvl4).minDpsDystans2h(1 * lvl4).minDpsDystans1h(1 * lvl4).minDpsBiala1h(1 * lvl4).minDpsBiala2h(1 * lvl4).maxDpsBiala1h(1 * lvl4).maxDpsBiala2h(1 * lvl4).maxDpsPalna1h(1 * lvl4).maxDpsPalna2h(1 * lvl4).maxDpsDystans1h(1 * lvl4).maxDpsDystans2h(1 * lvl4).build()));
    sets.push(new Set(SetType.TYGRYSI, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().unikBiala(0.16).critChanceDystans(0.19).critChanceBiala1h(0.19).critChanceBiala2h(0.19).critChancePalna2h(0.19).critChancePalna1h(0.19).minDpsPalna1h(2 * lvl6).minDpsPalna2h(2 * lvl6).minDpsDystans2h(2 * lvl6).minDpsDystans1h(2 * lvl6).minDpsBiala1h(2 * lvl6).minDpsBiala2h(2 * lvl6).maxDpsBiala1h(2 * lvl6).maxDpsBiala2h(2 * lvl6).maxDpsPalna1h(2 * lvl6).maxDpsPalna2h(2 * lvl6).maxDpsDystans1h(2 * lvl6).maxDpsDystans2h(2 * lvl6).build()));
    sets.push(new Set(SetType.TYGRYSI, ItemRarity.EPICKI, Stats.builder().unikBiala(0.20).critChanceDystans(0.25).critChanceBiala1h(0.25).critChanceBiala2h(0.25).critChancePalna2h(0.25).critChancePalna1h(0.25).minDpsPalna1h(2 * lvl4).minDpsPalna2h(2 * lvl4).minDpsDystans2h(2 * lvl4).minDpsDystans1h(2 * lvl4).minDpsBiala1h(2 * lvl4).minDpsBiala2h(2 * lvl4).maxDpsBiala1h(2 * lvl4).maxDpsBiala2h(2 * lvl4).maxDpsPalna1h(2 * lvl4).maxDpsPalna2h(2 * lvl4).maxDpsDystans1h(2 * lvl4).maxDpsDystans2h(2 * lvl4).trafienieProcentoweBiala(0.05).trafienieProcentoweDystans(0.05).trafienieProcentowePalna(0.05).build()));

    // Smiercionosny
    sets.push(new Set(SetType.SMIERCIONOSNY, ItemRarity.ZWYKLY, Stats.builder().minDpsPalna1h(6).minDpsPalna2h(6).minDpsDystans2h(6).minDpsDystans1h(6).minDpsBiala1h(6).minDpsBiala2h(6).maxDpsPalna1h(6).maxDpsPalna2h(6).maxDpsDystans2h(6).maxDpsDystans1h(6).maxDpsBiala2h(6).maxDpsBiala1h(6).atakiBiala(1).atakiPalna(1).atakiDystans1h(1).atakiDystans2h(1).build()));
    sets.push(new Set(SetType.SMIERCIONOSNY, ItemRarity.DOBRY, Stats.builder().minDpsPalna1h(7).minDpsPalna2h(7).minDpsDystans2h(7).minDpsDystans1h(7).minDpsBiala1h(7).minDpsBiala2h(7).maxDpsPalna1h(7).maxDpsPalna2h(7).maxDpsDystans2h(7).maxDpsDystans1h(7).maxDpsBiala2h(7).maxDpsBiala1h(7).atakiBiala(1).atakiPalna(1).atakiDystans1h(1).atakiDystans2h(1).build()));
    sets.push(new Set(SetType.SMIERCIONOSNY, ItemRarity.DOSKONALY, Stats.builder().minDpsPalna1h(8).minDpsPalna2h(8).minDpsDystans2h(8).minDpsDystans1h(8).minDpsBiala1h(8).minDpsBiala2h(8).maxDpsPalna1h(8).maxDpsPalna2h(8).maxDpsDystans2h(8).maxDpsDystans1h(8).maxDpsBiala2h(8).maxDpsBiala1h(8).atakiBiala(1).atakiPalna(1).atakiDystans1h(1).atakiDystans2h(1).build()));
    sets.push(new Set(SetType.SMIERCIONOSNY, ItemRarity.LEGENDARNY, Stats.builder().odpornosc(8).minDpsPalna1h(6).minDpsPalna2h(6).minDpsDystans2h(6).minDpsDystans1h(6).minDpsBiala1h(6).minDpsBiala2h(6).maxDpsPalna1h(6).maxDpsPalna2h(6).maxDpsDystans2h(6).maxDpsDystans1h(6).maxDpsBiala2h(6).maxDpsBiala1h(6).obronaDodatkowa(15).atakiBiala(1).atakiPalna(1).atakiDystans1h(1).atakiDystans2h(1).build()));
    sets.push(new Set(SetType.SMIERCIONOSNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().odpornosc(12).minDpsPalna1h(7).minDpsPalna2h(7).minDpsDystans2h(7).minDpsDystans1h(7).minDpsBiala1h(7).minDpsBiala2h(7).maxDpsPalna1h(7).maxDpsPalna2h(7).maxDpsDystans2h(7).maxDpsDystans1h(7).maxDpsBiala2h(7).maxDpsBiala1h(7).obronaDodatkowa(23).atakiBiala(2).atakiPalna(2).atakiDystans1h(2).atakiDystans2h(2).build()));
    sets.push(new Set(SetType.SMIERCIONOSNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().odpornosc(16).minDpsPalna1h(8).minDpsPalna2h(8).minDpsDystans2h(8).minDpsDystans1h(8).minDpsBiala1h(8).minDpsBiala2h(8).maxDpsPalna1h(8).maxDpsPalna2h(8).maxDpsDystans2h(8).maxDpsDystans1h(8).maxDpsBiala2h(8).maxDpsBiala1h(8).obronaDodatkowa(30).atakiBiala(3).atakiPalna(3).atakiDystans1h(3).atakiDystans2h(3).build()));
    sets.push(new Set(SetType.SMIERCIONOSNY, ItemRarity.EPICKI, Stats.builder().odpornosc(20).minDpsPalna1h(12).minDpsPalna2h(12).minDpsDystans2h(12).minDpsDystans1h(12).minDpsBiala1h(12).minDpsBiala2h(12).maxDpsPalna1h(12).maxDpsPalna2h(12).maxDpsDystans2h(12).maxDpsDystans1h(12).maxDpsBiala2h(12).maxDpsBiala1h(12).obronaDodatkowa(45).atakiBiala(4).atakiPalna(4).atakiDystans1h(4).atakiDystans2h(4).critMultiPalna1h(0.25).critMultiPalna2h(0.25).critMultiBiala2h(0.25).critMultiBiala1h(0.25).critMultiDystans1h(0.25).critMultiDystans2h(0.25).build()));

    // Krwawy
    sets.push(new Set(SetType.KRWAWY, ItemRarity.ZWYKLY, Stats.builder().trafienieBiala(30).spostrzegawczosc(10).build()));
    sets.push(new Set(SetType.KRWAWY, ItemRarity.DOBRY, Stats.builder().trafienieBiala(37).spostrzegawczosc(12).build()));
    sets.push(new Set(SetType.KRWAWY, ItemRarity.DOSKONALY, Stats.builder().trafienieBiala(41).spostrzegawczosc(14).build()));
    sets.push(new Set(SetType.KRWAWY, ItemRarity.LEGENDARNY, Stats.builder().trafienieBiala(30).spostrzegawczosc(12).minDpsPalna1h(8).minDpsPalna2h(8).minDpsDystans2h(8).minDpsDystans1h(8).minDpsBiala1h(8).minDpsBiala2h(8).maxDpsPalna1h(8).maxDpsPalna2h(8).maxDpsDystans2h(8).maxDpsDystans1h(8).maxDpsBiala2h(8).maxDpsBiala1h(8).build()));
    sets.push(new Set(SetType.KRWAWY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().trafienieBiala(37).spostrzegawczosc(15).minDpsPalna1h(12).minDpsPalna2h(12).minDpsDystans2h(12).minDpsDystans1h(12).minDpsBiala1h(12).minDpsBiala2h(12).maxDpsPalna1h(12).maxDpsPalna2h(12).maxDpsDystans2h(12).maxDpsDystans1h(12).maxDpsBiala2h(12).maxDpsBiala1h(12).build()));
    sets.push(new Set(SetType.KRWAWY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(41).spostrzegawczosc(18).minDpsPalna1h(16).minDpsPalna2h(16).minDpsDystans2h(16).minDpsDystans1h(16).minDpsBiala1h(16).minDpsBiala2h(16).maxDpsPalna1h(16).maxDpsPalna2h(16).maxDpsDystans2h(16).maxDpsDystans1h(16).maxDpsBiala2h(16).maxDpsBiala1h(16).build()));
    sets.push(new Set(SetType.KRWAWY, ItemRarity.EPICKI, Stats.builder().trafienieBiala(50).spostrzegawczosc(25).punktyKrwi(0.40).minDpsPalna1h(20).minDpsPalna2h(20).minDpsDystans2h(20).minDpsDystans1h(20).minDpsBiala1h(20).minDpsBiala2h(20).maxDpsPalna1h(20).maxDpsPalna2h(20).maxDpsDystans2h(20).maxDpsDystans1h(20).maxDpsBiala2h(20).maxDpsBiala1h(20).build()));

    // Runiczny
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.ZWYKLY, Stats.builder().obronaDodatkowa(20).szczescie(10).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.DOBRY, Stats.builder().obronaDodatkowa(25).szczescie(12).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.DOSKONALY, Stats.builder().obronaDodatkowa(28).szczescie(14).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.LEGENDARNY, Stats.builder().obronaDodatkowa(25).szczescie(20).sila(2).zwinnosc(2).odpornosc(2).wplywy(2).charyzma(2).spostrzegawczosc(2).inteligencja(2).wiedza(2).wyglad(2).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaDodatkowa(33).szczescie(24).sila(6).zwinnosc(6).odpornosc(6).wplywy(6).charyzma(6).spostrzegawczosc(6).inteligencja(6).wiedza(6).wyglad(6).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaDodatkowa(38).szczescie(34).sila(10).zwinnosc(10).odpornosc(10).wplywy(10).charyzma(10).spostrzegawczosc(10).inteligencja(10).wiedza(10).wyglad(10).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.EPICKI, Stats.builder().obronaDodatkowa(50).szczescie(45).twardosc(0.15).sila(15).zwinnosc(15).odpornosc(15).wplywy(15).charyzma(15).spostrzegawczosc(15).inteligencja(15).wiedza(15).wyglad(15).build()));

    this.armourSetsCache.set(playerLvl, sets);
    return sets;
  }

  private static initializeJewelerSets(playerLvl: number): Set[] {
    if (this.jewelerSetsCache.has(playerLvl)) {
      return this.jewelerSetsCache.get(playerLvl)!;
    }

    const sets: Set[] = [];
    const lvl4 = Math.floor(playerLvl / 4);
    const lvl6 = Math.floor(playerLvl / 6);

    // Miedziany
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.ZWYKLY, Stats.builder().charyzma(5).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.DOBRY, Stats.builder().charyzma(6).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.DOSKONALY, Stats.builder().charyzma(7).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(5).wyglad(2).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(6).wyglad(3).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(7).wyglad(4).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.EPICKI, Stats.builder().charyzma(10).wyglad(8).build()));

    // Szmaragdowy
    sets.push(new Set(SetType.SZMARAGDOWY, ItemRarity.ZWYKLY, Stats.builder().charyzma(5).inteligencja(5).build()));
    sets.push(new Set(SetType.SZMARAGDOWY, ItemRarity.DOBRY, Stats.builder().charyzma(6).inteligencja(6).build()));
    sets.push(new Set(SetType.SZMARAGDOWY, ItemRarity.DOSKONALY, Stats.builder().charyzma(7).inteligencja(7).build()));
    sets.push(new Set(SetType.SZMARAGDOWY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(5).inteligencja(9).wyglad(4).build()));
    sets.push(new Set(SetType.SZMARAGDOWY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(6).inteligencja(12).wyglad(6).build()));
    sets.push(new Set(SetType.SZMARAGDOWY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(7).inteligencja(15).wyglad(8).build()));
    sets.push(new Set(SetType.SZMARAGDOWY, ItemRarity.EPICKI, Stats.builder().charyzma(15).inteligencja(25).wyglad(17).sila(5).wiedza(5).spostrzegawczosc(5).odpornosc(5).wplywy(5).build()));

    // Srebrny
    sets.push(new Set(SetType.SREBRNY, ItemRarity.ZWYKLY, Stats.builder().charyzma(8).build()));
    sets.push(new Set(SetType.SREBRNY, ItemRarity.DOBRY, Stats.builder().charyzma(10).build()));
    sets.push(new Set(SetType.SREBRNY, ItemRarity.DOSKONALY, Stats.builder().charyzma(11).build()));
    sets.push(new Set(SetType.SREBRNY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(8).wyglad(4).build()));
    sets.push(new Set(SetType.SREBRNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(10).wyglad(6).build()));
    sets.push(new Set(SetType.SREBRNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(11).wyglad(8).build()));
    sets.push(new Set(SetType.SREBRNY, ItemRarity.EPICKI, Stats.builder().charyzma(15).wyglad(12).build()));

    // Rubinowy
    sets.push(new Set(SetType.RUBINOWY, ItemRarity.ZWYKLY, Stats.builder().charyzma(9).inteligencja(9).build()));
    sets.push(new Set(SetType.RUBINOWY, ItemRarity.DOBRY, Stats.builder().charyzma(11).inteligencja(11).build()));
    sets.push(new Set(SetType.RUBINOWY, ItemRarity.DOSKONALY, Stats.builder().charyzma(12).inteligencja(12).build()));
    sets.push(new Set(SetType.RUBINOWY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(9).inteligencja(9).wiedza(4).spostrzegawczosc(3).build()));
    sets.push(new Set(SetType.RUBINOWY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(11).inteligencja(11).wiedza(6).spostrzegawczosc(5).build()));
    sets.push(new Set(SetType.RUBINOWY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(12).inteligencja(12).wiedza(8).spostrzegawczosc(6).build()));
    sets.push(new Set(SetType.RUBINOWY, ItemRarity.EPICKI, Stats.builder().charyzma(15).inteligencja(25).wiedza(22).spostrzegawczosc(20).sila(10).odpornosc(10).wplywy(10).zwinnosc(10).wyglad(10).build()));

    // Zloty
    sets.push(new Set(SetType.ZLOTY, ItemRarity.ZWYKLY, Stats.builder().charyzma(12).build()));
    sets.push(new Set(SetType.ZLOTY, ItemRarity.DOBRY, Stats.builder().charyzma(15).build()));
    sets.push(new Set(SetType.ZLOTY, ItemRarity.DOSKONALY, Stats.builder().charyzma(16).build()));
    sets.push(new Set(SetType.ZLOTY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(12).wyglad(6).build()));
    sets.push(new Set(SetType.ZLOTY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(15).wyglad(8).build()));
    sets.push(new Set(SetType.ZLOTY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(16).wyglad(12).build()));
    sets.push(new Set(SetType.ZLOTY, ItemRarity.EPICKI, Stats.builder().charyzma(20).wyglad(15).spostrzegawczosc(50).build()));

    // Platynowy
    sets.push(new Set(SetType.PLATYNOWY, ItemRarity.ZWYKLY, Stats.builder().charyzma(15).build()));
    sets.push(new Set(SetType.PLATYNOWY, ItemRarity.DOBRY, Stats.builder().charyzma(18).build()));
    sets.push(new Set(SetType.PLATYNOWY, ItemRarity.DOSKONALY, Stats.builder().charyzma(21).build()));
    sets.push(new Set(SetType.PLATYNOWY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(15).wyglad(8).build()));
    sets.push(new Set(SetType.PLATYNOWY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(18).wyglad(12).build()));
    sets.push(new Set(SetType.PLATYNOWY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(21).wyglad(16).build()));
    sets.push(new Set(SetType.PLATYNOWY, ItemRarity.EPICKI, Stats.builder().charyzma(25).wyglad(20).zwinnosc(40).spostrzegawczosc(50).build()));

    // Dystyngowany
    sets.push(new Set(SetType.DYSTYNGOWANY, ItemRarity.ZWYKLY, Stats.builder().charyzma(4).build()));
    sets.push(new Set(SetType.DYSTYNGOWANY, ItemRarity.DOBRY, Stats.builder().charyzma(6).build()));
    sets.push(new Set(SetType.DYSTYNGOWANY, ItemRarity.DOSKONALY, Stats.builder().charyzma(8).build()));
    sets.push(new Set(SetType.DYSTYNGOWANY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(4).punktyKrwi(2).build()));
    sets.push(new Set(SetType.DYSTYNGOWANY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(6).punktyKrwi(3).build()));
    sets.push(new Set(SetType.DYSTYNGOWANY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(8).punktyKrwi(4).build()));
    sets.push(new Set(SetType.DYSTYNGOWANY, ItemRarity.EPICKI, Stats.builder().charyzma(12).punktyKrwi(6).szczescie(15).build()));

    // Przebiegly
    sets.push(new Set(SetType.PRZEBIEGLY, ItemRarity.ZWYKLY, Stats.builder().wplywy(4).build()));
    sets.push(new Set(SetType.PRZEBIEGLY, ItemRarity.DOBRY, Stats.builder().wplywy(6).build()));
    sets.push(new Set(SetType.PRZEBIEGLY, ItemRarity.DOSKONALY, Stats.builder().wplywy(8).build()));
    sets.push(new Set(SetType.PRZEBIEGLY, ItemRarity.LEGENDARNY, Stats.builder().wplywy(4).punktyKrwi(2).build()));
    sets.push(new Set(SetType.PRZEBIEGLY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().wplywy(6).punktyKrwi(3).build()));
    sets.push(new Set(SetType.PRZEBIEGLY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().wplywy(8).punktyKrwi(4).build()));
    sets.push(new Set(SetType.PRZEBIEGLY, ItemRarity.EPICKI, Stats.builder().wplywy(12).punktyKrwi(6).szczescie(15).build()));

    // Niedzwiedzi
    sets.push(new Set(SetType.NIEDZWIEDZI, ItemRarity.ZWYKLY, Stats.builder().sila(4).build()));
    sets.push(new Set(SetType.NIEDZWIEDZI, ItemRarity.DOBRY, Stats.builder().sila(6).build()));
    sets.push(new Set(SetType.NIEDZWIEDZI, ItemRarity.DOSKONALY, Stats.builder().sila(8).build()));
    sets.push(new Set(SetType.NIEDZWIEDZI, ItemRarity.LEGENDARNY, Stats.builder().sila(4).punktyKrwi(2).build()));
    sets.push(new Set(SetType.NIEDZWIEDZI, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().sila(6).punktyKrwi(3).build()));
    sets.push(new Set(SetType.NIEDZWIEDZI, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().sila(8).punktyKrwi(4).build()));
    sets.push(new Set(SetType.NIEDZWIEDZI, ItemRarity.EPICKI, Stats.builder().sila(12).punktyKrwi(6).szczescie(15).build()));

    // Twardy
    sets.push(new Set(SetType.TWARDY, ItemRarity.ZWYKLY, Stats.builder().odpornosc(4).build()));
    sets.push(new Set(SetType.TWARDY, ItemRarity.DOBRY, Stats.builder().odpornosc(6).build()));
    sets.push(new Set(SetType.TWARDY, ItemRarity.DOSKONALY, Stats.builder().odpornosc(8).build()));
    sets.push(new Set(SetType.TWARDY, ItemRarity.LEGENDARNY, Stats.builder().odpornosc(4).punktyKrwi(2).build()));
    sets.push(new Set(SetType.TWARDY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().odpornosc(6).punktyKrwi(3).build()));
    sets.push(new Set(SetType.TWARDY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().odpornosc(8).punktyKrwi(4).build()));
    sets.push(new Set(SetType.TWARDY, ItemRarity.EPICKI, Stats.builder().odpornosc(12).punktyKrwi(6).szczescie(15).build()));

    // Gwiezdny
    sets.push(new Set(SetType.GWIEZDNY, ItemRarity.ZWYKLY, Stats.builder().wyglad(4).build()));
    sets.push(new Set(SetType.GWIEZDNY, ItemRarity.DOBRY, Stats.builder().wyglad(6).build()));
    sets.push(new Set(SetType.GWIEZDNY, ItemRarity.DOSKONALY, Stats.builder().wyglad(8).build()));
    sets.push(new Set(SetType.GWIEZDNY, ItemRarity.LEGENDARNY, Stats.builder().wyglad(4).punktyKrwi(2).build()));
    sets.push(new Set(SetType.GWIEZDNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().wyglad(6).punktyKrwi(3).build()));
    sets.push(new Set(SetType.GWIEZDNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().wyglad(8).punktyKrwi(4).build()));
    sets.push(new Set(SetType.GWIEZDNY, ItemRarity.EPICKI, Stats.builder().wyglad(12).punktyKrwi(6).szczescie(15).build()));

    // Elastyczny
    sets.push(new Set(SetType.ELASTYCZNY, ItemRarity.ZWYKLY, Stats.builder().zwinnosc(4).build()));
    sets.push(new Set(SetType.ELASTYCZNY, ItemRarity.DOBRY, Stats.builder().zwinnosc(6).build()));
    sets.push(new Set(SetType.ELASTYCZNY, ItemRarity.DOSKONALY, Stats.builder().zwinnosc(8).build()));
    sets.push(new Set(SetType.ELASTYCZNY, ItemRarity.LEGENDARNY, Stats.builder().zwinnosc(4).punktyKrwi(2).build()));
    sets.push(new Set(SetType.ELASTYCZNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().zwinnosc(6).punktyKrwi(3).build()));
    sets.push(new Set(SetType.ELASTYCZNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().zwinnosc(8).punktyKrwi(4).build()));
    sets.push(new Set(SetType.ELASTYCZNY, ItemRarity.EPICKI, Stats.builder().zwinnosc(12).punktyKrwi(6).szczescie(15).build()));

    // Kardynalski
    sets.push(new Set(SetType.KARDYNALSKI, ItemRarity.ZWYKLY, Stats.builder().wiedza(4).build()));
    sets.push(new Set(SetType.KARDYNALSKI, ItemRarity.DOBRY, Stats.builder().wiedza(6).build()));
    sets.push(new Set(SetType.KARDYNALSKI, ItemRarity.DOSKONALY, Stats.builder().wiedza(8).build()));
    sets.push(new Set(SetType.KARDYNALSKI, ItemRarity.LEGENDARNY, Stats.builder().wiedza(4).punktyKrwi(2).build()));
    sets.push(new Set(SetType.KARDYNALSKI, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().wiedza(6).punktyKrwi(3).build()));
    sets.push(new Set(SetType.KARDYNALSKI, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().wiedza(8).punktyKrwi(4).build()));
    sets.push(new Set(SetType.KARDYNALSKI, ItemRarity.EPICKI, Stats.builder().wiedza(12).punktyKrwi(6).szczescie(15).build()));

    // Nekromancki
    sets.push(new Set(SetType.NEKROMANCKI, ItemRarity.ZWYKLY, Stats.builder().inteligencja(4).build()));
    sets.push(new Set(SetType.NEKROMANCKI, ItemRarity.DOBRY, Stats.builder().inteligencja(6).build()));
    sets.push(new Set(SetType.NEKROMANCKI, ItemRarity.DOSKONALY, Stats.builder().inteligencja(8).build()));
    sets.push(new Set(SetType.NEKROMANCKI, ItemRarity.LEGENDARNY, Stats.builder().inteligencja(4).punktyKrwi(2).build()));
    sets.push(new Set(SetType.NEKROMANCKI, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().inteligencja(6).punktyKrwi(3).build()));
    sets.push(new Set(SetType.NEKROMANCKI, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().inteligencja(8).punktyKrwi(4).build()));
    sets.push(new Set(SetType.NEKROMANCKI, ItemRarity.EPICKI, Stats.builder().inteligencja(12).punktyKrwi(6).szczescie(15).build()));

    // Plastikowy
    sets.push(new Set(SetType.PLASTIKOWY, ItemRarity.ZWYKLY, Stats.builder().punktyKrwi(0.10).unikPalna(0.12).minDpsPalna1h(16).minDpsPalna2h(16).minDpsDystans1h(16).minDpsDystans2h(16).minDpsBiala1h(16).minDpsBiala2h(16).maxDpsPalna1h(16).maxDpsPalna2h(16).maxDpsBiala1h(16).maxDpsBiala2h(16).maxDpsDystans1h(16).maxDpsDystans2h(16).build()));
    sets.push(new Set(SetType.PLASTIKOWY, ItemRarity.DOBRY, Stats.builder().punktyKrwi(0.12).unikPalna(0.15).minDpsPalna1h(20).minDpsPalna2h(20).minDpsDystans1h(20).minDpsDystans2h(20).minDpsBiala1h(20).minDpsBiala2h(20).maxDpsPalna1h(20).maxDpsPalna2h(20).maxDpsBiala1h(20).maxDpsBiala2h(20).maxDpsDystans1h(20).maxDpsDystans2h(20).build()));
    sets.push(new Set(SetType.PLASTIKOWY, ItemRarity.DOSKONALY, Stats.builder().punktyKrwi(0.14).unikPalna(0.16).minDpsPalna1h(22).minDpsPalna2h(22).minDpsDystans1h(22).minDpsDystans2h(22).minDpsBiala1h(22).minDpsBiala2h(22).maxDpsPalna1h(22).maxDpsPalna2h(22).maxDpsBiala1h(22).maxDpsBiala2h(22).maxDpsDystans1h(22).maxDpsDystans2h(22).build()));
    sets.push(new Set(SetType.PLASTIKOWY, ItemRarity.LEGENDARNY, Stats.builder().punktyKrwi(0.10).unikPalna(0.12).minDpsPalna1h(16).minDpsPalna2h(16).minDpsDystans1h(16).minDpsDystans2h(16).minDpsBiala1h(16).minDpsBiala2h(16).maxDpsPalna1h(16).maxDpsPalna2h(16).maxDpsBiala1h(16).maxDpsBiala2h(16).maxDpsDystans1h(16).maxDpsDystans2h(16).spostrzegawczosc(4).build()));
    sets.push(new Set(SetType.PLASTIKOWY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().punktyKrwi(0.12).unikPalna(0.15).minDpsPalna1h(20).minDpsPalna2h(20).minDpsDystans1h(20).minDpsDystans2h(20).minDpsBiala1h(20).minDpsBiala2h(20).maxDpsPalna1h(20).maxDpsPalna2h(20).maxDpsBiala1h(20).maxDpsBiala2h(20).maxDpsDystans1h(20).maxDpsDystans2h(20).spostrzegawczosc(6).build()));
    sets.push(new Set(SetType.PLASTIKOWY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().punktyKrwi(0.14).unikPalna(0.16).minDpsPalna1h(22).minDpsPalna2h(22).minDpsDystans1h(22).minDpsDystans2h(22).minDpsBiala1h(22).minDpsBiala2h(22).maxDpsPalna1h(22).maxDpsPalna2h(22).maxDpsBiala1h(22).maxDpsBiala2h(22).maxDpsDystans1h(22).maxDpsDystans2h(22).spostrzegawczosc(8).build()));
    sets.push(new Set(SetType.PLASTIKOWY, ItemRarity.EPICKI, Stats.builder().punktyKrwi(0.20).unikPalna(0.20).minDpsPalna1h(25).minDpsPalna2h(25).minDpsDystans1h(25).minDpsDystans2h(25).minDpsBiala1h(25).minDpsBiala2h(25).maxDpsPalna1h(25).maxDpsPalna2h(25).maxDpsBiala1h(25).maxDpsBiala2h(25).maxDpsDystans1h(25).maxDpsDystans2h(25).spostrzegawczosc(12).critChanceDystans(0.30).critChanceBiala1h(0.30).critChanceBiala2h(0.30).critChancePalna1h(0.30).critChancePalna2h(0.30).build()));

    // Tytanowy
    sets.push(new Set(SetType.TYTANOWY, ItemRarity.ZWYKLY, Stats.builder().sila(16).odpornosc(15).build()));
    sets.push(new Set(SetType.TYTANOWY, ItemRarity.DOBRY, Stats.builder().sila(22).odpornosc(18).build()));
    sets.push(new Set(SetType.TYTANOWY, ItemRarity.DOSKONALY, Stats.builder().sila(30).odpornosc(21).build()));
    sets.push(new Set(SetType.TYTANOWY, ItemRarity.LEGENDARNY, Stats.builder().sila(16).odpornosc(19).zwinnosc(3).build()));
    sets.push(new Set(SetType.TYTANOWY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().sila(22).odpornosc(24).zwinnosc(5).build()));
    sets.push(new Set(SetType.TYTANOWY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().sila(30).odpornosc(29).zwinnosc(8).build()));
    sets.push(new Set(SetType.TYTANOWY, ItemRarity.EPICKI, Stats.builder().sila(40).odpornosc(35).zwinnosc(12).twardosc(0.30).build()));

    // Diamentowy
    sets.push(new Set(SetType.DIAMENTOWY, ItemRarity.ZWYKLY, Stats.builder().charyzma(13).inteligencja(13).minDpsPalna1h(5).minDpsPalna2h(5).minDpsDystans1h(5).minDpsDystans2h(5).minDpsBiala1h(5).minDpsBiala2h(5).maxDpsPalna1h(5).maxDpsPalna2h(5).maxDpsBiala1h(5).maxDpsBiala2h(5).maxDpsDystans1h(5).maxDpsDystans2h(5).build()));
    sets.push(new Set(SetType.DIAMENTOWY, ItemRarity.DOBRY, Stats.builder().charyzma(16).inteligencja(16).minDpsPalna1h(6).minDpsPalna2h(6).minDpsDystans1h(6).minDpsDystans2h(6).minDpsBiala1h(6).minDpsBiala2h(6).maxDpsPalna1h(6).maxDpsPalna2h(6).maxDpsBiala1h(6).maxDpsBiala2h(6).maxDpsDystans1h(6).maxDpsDystans2h(6).build()));
    sets.push(new Set(SetType.DIAMENTOWY, ItemRarity.DOSKONALY, Stats.builder().charyzma(18).inteligencja(18).minDpsPalna1h(7).minDpsPalna2h(7).minDpsDystans1h(7).minDpsDystans2h(7).minDpsBiala1h(7).minDpsBiala2h(7).maxDpsPalna1h(7).maxDpsPalna2h(7).maxDpsBiala1h(7).maxDpsBiala2h(7).maxDpsDystans1h(7).maxDpsDystans2h(7).build()));
    sets.push(new Set(SetType.DIAMENTOWY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(13).inteligencja(13).wiedza(6).obronaDodatkowa(10).minDpsPalna1h(5).minDpsPalna2h(5).minDpsDystans1h(5).minDpsDystans2h(5).minDpsBiala1h(5).minDpsBiala2h(5).maxDpsPalna1h(5).maxDpsPalna2h(5).maxDpsBiala1h(5).maxDpsBiala2h(5).maxDpsDystans1h(5).maxDpsDystans2h(5).build()));
    sets.push(new Set(SetType.DIAMENTOWY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(16).inteligencja(16).wiedza(9).obronaDodatkowa(lvl4).minDpsPalna1h(6).minDpsPalna2h(6).minDpsDystans1h(6).minDpsDystans2h(6).minDpsBiala1h(6).minDpsBiala2h(6).maxDpsPalna1h(6).maxDpsPalna2h(6).maxDpsBiala1h(6).maxDpsBiala2h(6).maxDpsDystans1h(6).maxDpsDystans2h(6).build()));
    sets.push(new Set(SetType.DIAMENTOWY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(18).inteligencja(18).wiedza(12).obronaDodatkowa(2 * lvl4).minDpsPalna1h(7).minDpsPalna2h(7).minDpsDystans1h(7).minDpsDystans2h(7).minDpsBiala1h(7).minDpsBiala2h(7).maxDpsPalna1h(7).maxDpsPalna2h(7).maxDpsBiala1h(7).maxDpsBiala2h(7).maxDpsDystans1h(7).maxDpsDystans2h(7).build()));
    sets.push(new Set(SetType.DIAMENTOWY, ItemRarity.EPICKI, Stats.builder().charyzma(40).inteligencja(40).wiedza(35).wyglad(15).sila(15).spostrzegawczosc(15).odpornosc(15).wplywy(15).obronaDodatkowa(3 * lvl4).minDpsPalna1h(15).minDpsPalna2h(15).minDpsDystans1h(15).minDpsDystans2h(15).minDpsBiala1h(15).minDpsBiala2h(15).maxDpsPalna1h(15).maxDpsPalna2h(15).maxDpsBiala1h(15).maxDpsBiala2h(15).maxDpsDystans1h(15).maxDpsDystans2h(15).build()));

    // Msciwy
    sets.push(new Set(SetType.MSCIWY, ItemRarity.ZWYKLY, Stats.builder().charyzma(-8).wplywy(16).atakiDystans1h(1).atakiDystans2h(1).atakiPalna(1).atakiBiala(1).build()));
    sets.push(new Set(SetType.MSCIWY, ItemRarity.DOBRY, Stats.builder().charyzma(-8).wplywy(20).atakiDystans1h(1).atakiDystans2h(1).atakiPalna(1).atakiBiala(1).build()));
    sets.push(new Set(SetType.MSCIWY, ItemRarity.DOSKONALY, Stats.builder().charyzma(-8).wplywy(22).atakiDystans1h(1).atakiDystans2h(1).atakiPalna(1).atakiBiala(1).build()));
    sets.push(new Set(SetType.MSCIWY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(-8).wplywy(16).zwinnosc(4).atakiDystans1h(1).atakiDystans2h(1).atakiPalna(1).atakiBiala(1).build()));
    sets.push(new Set(SetType.MSCIWY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(-8).wplywy(20).zwinnosc(6).atakiDystans1h(1).atakiDystans2h(1).atakiPalna(1).atakiBiala(1).build()));
    sets.push(new Set(SetType.MSCIWY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(-8).wplywy(22).zwinnosc(8).atakiDystans1h(1).atakiDystans2h(1).atakiPalna(1).atakiBiala(1).build()));
    sets.push(new Set(SetType.MSCIWY, ItemRarity.EPICKI, Stats.builder().charyzma(-8).wplywy(30).ignoreObrony(0.30).zwinnosc(12).atakiDystans1h(1).atakiDystans2h(1).atakiPalna(1).atakiBiala(1).build()));

    // Spaczony
    sets.push(new Set(SetType.SPACZONY, ItemRarity.ZWYKLY, Stats.builder().charyzma(10).wplywy(10).zwinnosc(10).trafienieBiala(-30).build()));
    sets.push(new Set(SetType.SPACZONY, ItemRarity.DOBRY, Stats.builder().charyzma(12).wplywy(12).zwinnosc(12).trafienieBiala(-30).build()));
    sets.push(new Set(SetType.SPACZONY, ItemRarity.DOSKONALY, Stats.builder().charyzma(14).wplywy(14).zwinnosc(14).trafienieBiala(-30).build()));
    sets.push(new Set(SetType.SPACZONY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(10).wplywy(12).zwinnosc(10).spostrzegawczosc(5).trafienieBiala(-30).critMultiDystans2h(0.30).critMultiDystans1h(0.30).build()));
    sets.push(new Set(SetType.SPACZONY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(12).wplywy(15).zwinnosc(12).trafienieBiala(-30).spostrzegawczosc(8).critMultiDystans2h(0.60).critMultiDystans1h(0.60).build()));
    sets.push(new Set(SetType.SPACZONY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(14).wplywy(18).zwinnosc(14).trafienieBiala(-30).spostrzegawczosc(10).critMultiDystans2h(1.20).critMultiDystans1h(1.20).build()));
    sets.push(new Set(SetType.SPACZONY, ItemRarity.EPICKI, Stats.builder().charyzma(20).wplywy(25).zwinnosc(20).trafienieBiala(-30).spostrzegawczosc(15).critMultiDystans2h(1.50).critMultiDystans1h(1.50).critChanceDystans(0.30).critChancePalna2h(0.30).critChancePalna1h(0.30).critChanceBiala2h(0.30).critChanceBiala1h(0.30).build()));

    // Zdradziecki
    sets.push(new Set(SetType.ZDRADZIECKI, ItemRarity.ZWYKLY, Stats.builder().charyzma(-15).wplywy(19).build()));
    sets.push(new Set(SetType.ZDRADZIECKI, ItemRarity.DOBRY, Stats.builder().charyzma(-15).wplywy(23).build()));
    sets.push(new Set(SetType.ZDRADZIECKI, ItemRarity.DOSKONALY, Stats.builder().charyzma(-15).wplywy(26).build()));
    sets.push(new Set(SetType.ZDRADZIECKI, ItemRarity.LEGENDARNY, Stats.builder().charyzma(-15).wplywy(19).minDpsPalna1h(8).minDpsPalna2h(8).minDpsDystans1h(8).minDpsDystans2h(8).minDpsBiala1h(8).minDpsBiala2h(8).maxDpsPalna1h(8).maxDpsPalna2h(8).maxDpsBiala1h(8).maxDpsBiala2h(8).maxDpsDystans1h(8).maxDpsDystans2h(8).build()));
    sets.push(new Set(SetType.ZDRADZIECKI, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(-15).wplywy(23).minDpsPalna1h(12).minDpsPalna2h(12).minDpsDystans1h(12).minDpsDystans2h(12).minDpsBiala1h(12).minDpsBiala2h(12).maxDpsPalna1h(12).maxDpsPalna2h(12).maxDpsBiala1h(12).maxDpsBiala2h(12).maxDpsDystans1h(12).maxDpsDystans2h(12).build()));
    sets.push(new Set(SetType.ZDRADZIECKI, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(-15).wplywy(26).minDpsPalna1h(16).minDpsPalna2h(16).minDpsDystans1h(16).minDpsDystans2h(16).minDpsBiala1h(16).minDpsBiala2h(16).maxDpsPalna1h(16).maxDpsPalna2h(16).maxDpsBiala1h(16).maxDpsBiala2h(16).maxDpsDystans1h(16).maxDpsDystans2h(16).build()));
    sets.push(new Set(SetType.ZDRADZIECKI, ItemRarity.EPICKI, Stats.builder().charyzma(-15).wplywy(35).ignoreObrony(0.20).minDpsPalna1h(25).minDpsPalna2h(25).minDpsDystans1h(25).minDpsDystans2h(25).minDpsBiala1h(25).minDpsBiala2h(25).maxDpsPalna1h(25).maxDpsPalna2h(25).maxDpsBiala1h(25).maxDpsBiala2h(25).maxDpsDystans1h(25).maxDpsDystans2h(25).build()));

    // Archaiczny
    sets.push(new Set(SetType.ARCHAICZNY, ItemRarity.ZWYKLY, Stats.builder().inteligencja(3).wiedza(3).build()));
    sets.push(new Set(SetType.ARCHAICZNY, ItemRarity.DOBRY, Stats.builder().inteligencja(5).wiedza(5).build()));
    sets.push(new Set(SetType.ARCHAICZNY, ItemRarity.DOSKONALY, Stats.builder().inteligencja(6).wiedza(6).build()));
    sets.push(new Set(SetType.ARCHAICZNY, ItemRarity.LEGENDARNY, Stats.builder().inteligencja(3).wiedza(3).punktyKrwi(5).build()));
    sets.push(new Set(SetType.ARCHAICZNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().inteligencja(5).wiedza(5).punktyKrwi(5).build()));
    sets.push(new Set(SetType.ARCHAICZNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().inteligencja(6).wiedza(6).punktyKrwi(10).build()));
    sets.push(new Set(SetType.ARCHAICZNY, ItemRarity.EPICKI, Stats.builder().inteligencja(10).wiedza(10).punktyKrwi(0.15).szczescie(25).build()));

    // Hipnotyczny
    sets.push(new Set(SetType.HIPNOTYCZNY, ItemRarity.ZWYKLY, Stats.builder().charyzma(3).wplywy(3).build()));
    sets.push(new Set(SetType.HIPNOTYCZNY, ItemRarity.DOBRY, Stats.builder().charyzma(5).wplywy(5).build()));
    sets.push(new Set(SetType.HIPNOTYCZNY, ItemRarity.DOSKONALY, Stats.builder().charyzma(6).wplywy(6).build()));
    sets.push(new Set(SetType.HIPNOTYCZNY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(3).wplywy(3).punktyKrwi(5).build()));
    sets.push(new Set(SetType.HIPNOTYCZNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(5).wplywy(5).punktyKrwi(5).build()));
    sets.push(new Set(SetType.HIPNOTYCZNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(6).wplywy(6).punktyKrwi(10).build()));
    sets.push(new Set(SetType.HIPNOTYCZNY, ItemRarity.EPICKI, Stats.builder().charyzma(10).wplywy(10).punktyKrwi(0.15).szczescie(25).build()));

    // Tanczacy
    sets.push(new Set(SetType.TANCZACY, ItemRarity.ZWYKLY, Stats.builder().zwinnosc(3).wyglad(3).build()));
    sets.push(new Set(SetType.TANCZACY, ItemRarity.DOBRY, Stats.builder().zwinnosc(5).wyglad(5).build()));
    sets.push(new Set(SetType.TANCZACY, ItemRarity.DOSKONALY, Stats.builder().zwinnosc(6).wyglad(6).build()));
    sets.push(new Set(SetType.TANCZACY, ItemRarity.LEGENDARNY, Stats.builder().zwinnosc(3).wyglad(3).punktyKrwi(5).build()));
    sets.push(new Set(SetType.TANCZACY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().zwinnosc(5).wyglad(5).punktyKrwi(5).build()));
    sets.push(new Set(SetType.TANCZACY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().zwinnosc(6).wyglad(6).punktyKrwi(10).build()));
    sets.push(new Set(SetType.TANCZACY, ItemRarity.EPICKI, Stats.builder().zwinnosc(10).wyglad(10).punktyKrwi(0.15).szczescie(25).build()));

    // Zwierzecy
    sets.push(new Set(SetType.ZWIERZECY, ItemRarity.ZWYKLY, Stats.builder().sila(3).odpornosc(3).build()));
    sets.push(new Set(SetType.ZWIERZECY, ItemRarity.DOBRY, Stats.builder().sila(5).odpornosc(5).build()));
    sets.push(new Set(SetType.ZWIERZECY, ItemRarity.DOSKONALY, Stats.builder().sila(6).odpornosc(6).build()));
    sets.push(new Set(SetType.ZWIERZECY, ItemRarity.LEGENDARNY, Stats.builder().sila(3).odpornosc(3).punktyKrwi(5).build()));
    sets.push(new Set(SetType.ZWIERZECY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().sila(5).odpornosc(5).punktyKrwi(5).build()));
    sets.push(new Set(SetType.ZWIERZECY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().sila(6).odpornosc(6).punktyKrwi(10).build()));
    sets.push(new Set(SetType.ZWIERZECY, ItemRarity.EPICKI, Stats.builder().sila(10).odpornosc(10).punktyKrwi(0.15).szczescie(25).build()));

    // Pajeczy
    sets.push(new Set(SetType.PAJECZY, ItemRarity.ZWYKLY, Stats.builder().obronaDodatkowa(lvl4).build()));
    sets.push(new Set(SetType.PAJECZY, ItemRarity.DOBRY, Stats.builder().obronaDodatkowa(lvl4 + 10).build()));
    sets.push(new Set(SetType.PAJECZY, ItemRarity.DOSKONALY, Stats.builder().obronaDodatkowa(lvl4 + 14).build()));
    sets.push(new Set(SetType.PAJECZY, ItemRarity.LEGENDARNY, Stats.builder().obronaDodatkowa(lvl4 + 10).zwinnosc(10).twardosc(0.05).build()));
    sets.push(new Set(SetType.PAJECZY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaDodatkowa(3 * lvl4 + 25).zwinnosc(15).twardosc(0.10).build()));
    sets.push(new Set(SetType.PAJECZY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaDodatkowa(5 * lvl4 + 34).zwinnosc(20).twardosc(0.15).build()));
    sets.push(new Set(SetType.PAJECZY, ItemRarity.EPICKI, Stats.builder().obronaDodatkowa(6 * lvl4 + 50).zwinnosc(25).twardosc(0.20).redukcjaObrazen(0.03).build()));

    // Sloneczny
    sets.push(new Set(SetType.SLONECZNY, ItemRarity.ZWYKLY, Stats.builder().atakiBiala(1).atakiPalna(1).atakiDystans1h(1).atakiDystans2h(1).minDpsPalna1h(10).minDpsPalna2h(10).minDpsDystans1h(10).minDpsDystans2h(10).minDpsBiala1h(10).minDpsBiala2h(10).maxDpsPalna1h(10).maxDpsPalna2h(10).maxDpsBiala1h(10).maxDpsBiala2h(10).maxDpsDystans1h(10).maxDpsDystans2h(10).build()));
    sets.push(new Set(SetType.SLONECZNY, ItemRarity.DOBRY, Stats.builder().atakiBiala(1).atakiPalna(1).atakiDystans1h(1).atakiDystans2h(1).minDpsPalna1h(12).minDpsPalna2h(12).minDpsDystans1h(12).minDpsDystans2h(12).minDpsBiala1h(12).minDpsBiala2h(12).maxDpsPalna1h(12).maxDpsPalna2h(12).maxDpsBiala1h(12).maxDpsBiala2h(12).maxDpsDystans1h(12).maxDpsDystans2h(12).build()));
    sets.push(new Set(SetType.SLONECZNY, ItemRarity.DOSKONALY, Stats.builder().atakiBiala(1).atakiPalna(1).atakiDystans1h(1).atakiDystans2h(1).minDpsPalna1h(14).minDpsPalna2h(14).minDpsDystans1h(14).minDpsDystans2h(14).minDpsBiala1h(14).minDpsBiala2h(14).maxDpsPalna1h(14).maxDpsPalna2h(14).maxDpsBiala1h(14).maxDpsBiala2h(14).maxDpsDystans1h(14).maxDpsDystans2h(14).build()));
    sets.push(new Set(SetType.SLONECZNY, ItemRarity.LEGENDARNY, Stats.builder().atakiBiala(1).atakiPalna(1).atakiDystans2h(1).atakiDystans1h(1).odpornosc(8).minDpsPalna1h(14).minDpsPalna2h(14).minDpsDystans1h(14).minDpsDystans2h(14).minDpsBiala1h(14).minDpsBiala2h(14).maxDpsPalna1h(14).maxDpsPalna2h(14).maxDpsBiala1h(14).maxDpsBiala2h(14).maxDpsDystans1h(14).maxDpsDystans2h(14).build()));
    sets.push(new Set(SetType.SLONECZNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().atakiBiala(1).atakiPalna(1).atakiDystans2h(1).atakiDystans1h(1).odpornosc(12).minDpsPalna1h(18).minDpsPalna2h(18).minDpsDystans1h(18).minDpsDystans2h(18).minDpsBiala1h(18).minDpsBiala2h(18).maxDpsPalna1h(18).maxDpsPalna2h(18).maxDpsBiala1h(18).maxDpsBiala2h(18).maxDpsDystans1h(18).maxDpsDystans2h(18).build()));
    sets.push(new Set(SetType.SLONECZNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().atakiBiala(1).atakiPalna(1).atakiDystans2h(1).atakiDystans1h(1).odpornosc(16).minDpsPalna1h(22).minDpsPalna2h(22).minDpsDystans1h(22).minDpsDystans2h(22).minDpsBiala1h(22).minDpsBiala2h(22).maxDpsPalna1h(22).maxDpsPalna2h(22).maxDpsBiala1h(22).maxDpsBiala2h(22).maxDpsDystans1h(22).maxDpsDystans2h(22).build()));
    sets.push(new Set(SetType.SLONECZNY, ItemRarity.EPICKI, Stats.builder().atakiBiala(1).atakiPalna(1).atakiDystans2h(1).atakiDystans1h(1).odpornosc(20).minDpsPalna1h(30 + lvl6).minDpsPalna2h(30 + lvl6).minDpsDystans1h(30 + lvl6).minDpsDystans2h(30 + lvl6).minDpsBiala1h(30 + lvl6).minDpsBiala2h(30 + lvl6).maxDpsPalna1h(30 + lvl6).maxDpsPalna2h(30 + lvl6).maxDpsBiala1h(30 + lvl6).maxDpsBiala2h(30 + lvl6).maxDpsDystans1h(30 + lvl6).maxDpsDystans2h(30 + lvl6).build()));

    // Jastrzebi
    sets.push(new Set(SetType.JASTRZEBI, ItemRarity.ZWYKLY, Stats.builder().unikDystans(8).unikPalna(8).unikBiala(8).minDpsPalna1h(lvl4).minDpsPalna2h(lvl4).minDpsDystans1h(lvl4).minDpsDystans2h(lvl4).minDpsBiala1h(lvl4).minDpsBiala2h(lvl4).maxDpsPalna1h(lvl4).maxDpsPalna2h(lvl4).maxDpsBiala1h(lvl4).maxDpsBiala2h(lvl4).maxDpsDystans1h(lvl4).maxDpsDystans2h(lvl4).build()));
    sets.push(new Set(SetType.JASTRZEBI, ItemRarity.DOBRY, Stats.builder().unikDystans(10).unikPalna(10).unikBiala(10).minDpsPalna1h(lvl4).minDpsPalna2h(lvl4).minDpsDystans1h(lvl4).minDpsDystans2h(lvl4).minDpsBiala1h(lvl4).minDpsBiala2h(lvl4).maxDpsPalna1h(lvl4).maxDpsPalna2h(lvl4).maxDpsBiala1h(lvl4).maxDpsBiala2h(lvl4).maxDpsDystans1h(lvl4).maxDpsDystans2h(lvl4).build()));
    sets.push(new Set(SetType.JASTRZEBI, ItemRarity.DOSKONALY, Stats.builder().unikDystans(11).unikPalna(11).unikBiala(11).minDpsPalna1h(lvl4).minDpsPalna2h(lvl4).minDpsDystans1h(lvl4).minDpsDystans2h(lvl4).minDpsBiala1h(lvl4).minDpsBiala2h(lvl4).maxDpsPalna1h(lvl4).maxDpsPalna2h(lvl4).maxDpsBiala1h(lvl4).maxDpsBiala2h(lvl4).maxDpsDystans1h(lvl4).maxDpsDystans2h(lvl4).build()));
    sets.push(new Set(SetType.JASTRZEBI, ItemRarity.LEGENDARNY, Stats.builder().unikDystans(0.08).unikPalna(0.08).unikBiala(0.08).spostrzegawczosc(2).critChanceBiala1h(0.04).critChanceBiala2h(0.04).critChanceDystans(0.04).critChancePalna1h(0.04).critChancePalna2h(0.04).minDpsPalna1h(lvl4).minDpsPalna2h(lvl4).minDpsDystans1h(lvl4).minDpsDystans2h(lvl4).minDpsBiala1h(lvl4).minDpsBiala2h(lvl4).maxDpsPalna1h(lvl4).maxDpsPalna2h(lvl4).maxDpsBiala1h(lvl4).maxDpsBiala2h(lvl4).maxDpsDystans1h(lvl4).maxDpsDystans2h(lvl4).build()));
    sets.push(new Set(SetType.JASTRZEBI, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().unikDystans(0.10).unikPalna(0.10).unikBiala(0.10).spostrzegawczosc(3).critChanceBiala1h(0.06).critChanceBiala2h(0.06).critChanceDystans(0.06).critChancePalna1h(0.06).critChancePalna2h(0.06).minDpsPalna1h(lvl4).minDpsPalna2h(lvl4).minDpsDystans1h(lvl4).minDpsDystans2h(lvl4).minDpsBiala1h(lvl4).minDpsBiala2h(lvl4).maxDpsPalna1h(lvl4).maxDpsPalna2h(lvl4).maxDpsBiala1h(lvl4).maxDpsBiala2h(lvl4).maxDpsDystans1h(lvl4).maxDpsDystans2h(lvl4).build()));
    sets.push(new Set(SetType.JASTRZEBI, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().unikDystans(0.11).unikPalna(0.11).unikBiala(0.11).spostrzegawczosc(4).critChanceBiala1h(0.08).critChanceBiala2h(0.08).critChanceDystans(0.08).critChancePalna1h(0.08).critChancePalna2h(0.08).minDpsPalna1h(lvl4).minDpsPalna2h(lvl4).minDpsDystans1h(lvl4).minDpsDystans2h(lvl4).minDpsBiala1h(lvl4).minDpsBiala2h(lvl4).maxDpsPalna1h(lvl4).maxDpsPalna2h(lvl4).maxDpsBiala1h(lvl4).maxDpsBiala2h(lvl4).maxDpsDystans1h(lvl4).maxDpsDystans2h(lvl4).build()));
    sets.push(new Set(SetType.JASTRZEBI, ItemRarity.EPICKI, Stats.builder().unikDystans(0.13).unikPalna(0.13).unikBiala(0.13).spostrzegawczosc(6).critChanceBiala1h(0.12).critChanceBiala2h(0.12).critChanceDystans(0.12).critChancePalna1h(0.12).critChancePalna2h(0.12).minDpsPalna1h(2 * lvl6).minDpsPalna2h(2 * lvl6).minDpsDystans1h(2 * lvl6).minDpsDystans2h(2 * lvl6).minDpsBiala1h(2 * lvl6).minDpsBiala2h(2 * lvl6).maxDpsPalna1h(2 * lvl6).maxDpsPalna2h(2 * lvl6).maxDpsBiala1h(2 * lvl6).maxDpsBiala2h(2 * lvl6).maxDpsDystans1h(2 * lvl6).maxDpsDystans2h(2 * lvl6).critMultiBiala2h(0.3).critMultiBiala1h(0.3).critMultiPalna1h(0.3).critMultiPalna2h(0.3).critMultiDystans1h(0.3).critMultiDystans2h(0.3).build()));

    // Czarny
    sets.push(new Set(SetType.CZARNY, ItemRarity.ZWYKLY, Stats.builder().wplywy(5).odpornosc(10).critChanceBiala2h(0.20).ignoreObrony(0.10).build()));
    sets.push(new Set(SetType.CZARNY, ItemRarity.DOBRY, Stats.builder().wplywy(6).odpornosc(12).critChanceBiala2h(0.25).ignoreObrony(0.12).build()));
    sets.push(new Set(SetType.CZARNY, ItemRarity.DOSKONALY, Stats.builder().wplywy(7).odpornosc(14).critChanceBiala2h(0.28).ignoreObrony(0.17).build()));
    sets.push(new Set(SetType.CZARNY, ItemRarity.LEGENDARNY, Stats.builder().wplywy(14).odpornosc(10).critChanceBiala2h(0.20).ignoreObrony(0.15).zwinnosc(4).critMultiBiala2h(0.30).build()));
    sets.push(new Set(SetType.CZARNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().wplywy(18).odpornosc(12).critChanceBiala2h(0.25).ignoreObrony(0.20).zwinnosc(6).critMultiBiala2h(0.60).build()));
    sets.push(new Set(SetType.CZARNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().wplywy(24).odpornosc(14).critChanceBiala2h(0.28).ignoreObrony(0.30).zwinnosc(8).critMultiBiala2h(1.20).build()));
    sets.push(new Set(SetType.CZARNY, ItemRarity.EPICKI, Stats.builder().wplywy(30).odpornosc(20).critChanceBiala2h(0.35).ignoreObrony(0.40).zwinnosc(12).critMultiBiala2h(1.50).szczescie(25).build()));

    this.jewelerSetsCache.set(playerLvl, sets);
    return sets;
  }
}
