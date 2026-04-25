/**
 * Set dictionary
 * Contains all set bonus definitions with their stats
 */

import { Set, SetType, Stats, ItemRarity } from '../item';

export class SetsDictionary {
  /**
   * Get armour set by type and rarity
   */
  static getArmourSet(type: SetType, rarity: ItemRarity, playerLvl: number): Set {
    const sets = this.initializeArmourSets(playerLvl);
    const found = sets.find((s) => s.type === type && s.rarity === rarity);

    if (!found) {
      throw new Error(`Armour set not found for type: ${type}, rarity: ${rarity}`);
    }

    return found;
  }

  /**
   * Get jeweler set by type and rarity
   */
  static getJewelerSet(type: SetType, rarity: ItemRarity, playerLvl: number): Set {
    const sets = this.initializeJewelerSets(playerLvl);
    const found = sets.find((s) => s.type === type && s.rarity === rarity);

    if (!found) {
      throw new Error(`Jeweler set not found for type: ${type}, rarity: ${rarity}`);
    }

    return found;
  }

  private static initializeArmourSets(playerLvl: number): Set[] {
    const sets: Set[] = [];

    // Wzmocniony
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.ZWYKLY, Stats.builder().obronaDodatkowa(25).zwinnosc(-5).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.DOBRY, Stats.builder().obronaDodatkowa(31).zwinnosc(-5).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.DOSKONALY, Stats.builder().obronaDodatkowa(35).zwinnosc(-5).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.LEGENDARNY, Stats.builder().obronaDodatkowa(35 + (1 * Math.floor(playerLvl / 4))).zwinnosc(-5).punktyZycia(0.10).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaDodatkowa(46 + (2 * Math.floor(playerLvl / 4))).zwinnosc(-5).punktyZycia(0.15).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaDodatkowa(55 + (3 * Math.floor(playerLvl / 4))).zwinnosc(-5).punktyZycia(0.20).build()));
    sets.push(new Set(SetType.WZMOCNIONY, ItemRarity.EPICKI, Stats.builder().obronaDodatkowa(70 + (4 * Math.floor(playerLvl / 4))).zwinnosc(-5).punktyZycia(0.25).build()));

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

    // Runiczny
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.ZWYKLY, Stats.builder().obronaDodatkowa(20).szczescie(10).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.DOBRY, Stats.builder().obronaDodatkowa(25).szczescie(12).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.DOSKONALY, Stats.builder().obronaDodatkowa(28).szczescie(14).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.LEGENDARNY, Stats.builder().obronaDodatkowa(25).szczescie(20).sila(2).zwinnosc(2).odpornosc(2).wplywy(2).charyzma(2).spostrzegawczosc(2).inteligencja(2).wiedza(2).wyglad(2).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaDodatkowa(33).szczescie(24).sila(6).zwinnosc(6).odpornosc(6).wplywy(6).charyzma(6).spostrzegawczosc(6).inteligencja(6).wiedza(6).wyglad(6).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaDodatkowa(38).szczescie(34).sila(10).zwinnosc(10).odpornosc(10).wplywy(10).charyzma(10).spostrzegawczosc(10).inteligencja(10).wiedza(10).wyglad(10).build()));
    sets.push(new Set(SetType.RUNICZNY, ItemRarity.EPICKI, Stats.builder().obronaDodatkowa(50).szczescie(45).twardosc(0.15).sila(15).zwinnosc(15).odpornosc(15).wplywy(15).charyzma(15).spostrzegawczosc(15).inteligencja(15).wiedza(15).wyglad(15).build()));

    // Additional sets: Tygrysi, Smiercionosny, Krwawy, etc. follow similar pattern

    return sets;
  }

  private static initializeJewelerSets(playerLvl: number): Set[] {
    const sets: Set[] = [];

    // Miedziany
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.ZWYKLY, Stats.builder().charyzma(5).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.DOBRY, Stats.builder().charyzma(6).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.DOSKONALY, Stats.builder().charyzma(7).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.LEGENDARNY, Stats.builder().charyzma(5).wyglad(2).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.LEGENDARNY_DOBRY, Stats.builder().charyzma(6).wyglad(3).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(7).wyglad(4).build()));
    sets.push(new Set(SetType.MIEDZIANY, ItemRarity.EPICKI, Stats.builder().charyzma(10).wyglad(8).build()));

    // Additional jeweler sets: Szmaragdowy, Srebrny, Rubinowy, etc. follow same pattern

    return sets;
  }
}
