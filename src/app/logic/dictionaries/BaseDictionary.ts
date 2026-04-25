/**
 * Base item dictionary
 * Contains all base item definitions with their stats by rarity, type, and genre
 */

import { Base, Stats, ItemGenre, ItemRarity, ItemType } from '../item';

export class BaseDictionary {
  private static bases: Base[] | null = null;

  /**
   * Get a base item by genre, type, and rarity
   */
  static getBase(genre: ItemGenre, type: ItemType, rarity: ItemRarity, playerLvl: number): Base {
    if (!BaseDictionary.bases) {
      BaseDictionary.initializeBases();
    }

    const found = BaseDictionary.bases!.find(
      (b) => b.genre === genre && b.type === type && b.rarity === rarity
    );

    if (!found) {
      throw new Error(`Base not found for genre: ${genre}, type: ${type}, rarity: ${rarity}`);
    }

    return found;
  }

  private static initializeBases(): void {
    BaseDictionary.bases = [];
    const bases = BaseDictionary.bases;

    // HEAD - Czapka
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(1).build(), ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(2).build(), ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(2).build(), ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(2).build(), ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(3).build(), ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(3).build(), ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(5).build(), ItemGenre.HEAD, ItemType.CZAPKA));

    // HEAD - Kask
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(3).build(), ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(5).build(), ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(6).build(), ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(5).build(), ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(7).build(), ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(9).build(), ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(11).build(), ItemGenre.HEAD, ItemType.KASK));

    // HEAD - Kominiarka
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(1).wplywy(2).wyglad(-5).build(), ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(2).wplywy(3).wyglad(-5).build(), ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(2).wplywy(4).wyglad(-5).build(), ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(2).wplywy(3).wyglad(-5).build(), ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(3).wplywy(5).wyglad(-5).build(), ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(3).wplywy(6).wyglad(-5).build(), ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(5).wplywy(7).wyglad(-5).build(), ItemGenre.HEAD, ItemType.KOMINIARKA));

    // HEAD - Kapelusz
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(2).wyglad(3).build(), ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(3).wyglad(5).build(), ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(4).wyglad(6).build(), ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(3).wyglad(5).build(), ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(5).wyglad(6).build(), ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(6).wyglad(7).build(), ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(7).wyglad(11).build(), ItemGenre.HEAD, ItemType.KAPELUSZ));

    // HEAD - Helm
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(7).twardosc(0.01).build(), ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(11).twardosc(0.02).build(), ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(14).twardosc(0.02).build(), ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(10).twardosc(0.02).build(), ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(15).twardosc(0.03).build(), ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(19).twardosc(0.03).build(), ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(25).twardosc(0.05).build(), ItemGenre.HEAD, ItemType.HELM));

    // HEAD - Obrecz
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(1).charyzma(5).build(), ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(2).charyzma(8).build(), ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(2).charyzma(10).build(), ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(2).charyzma(7).build(), ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(3).charyzma(11).build(), ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(3).charyzma(14).build(), ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(5).charyzma(18).build(), ItemGenre.HEAD, ItemType.OBRECZ));

    // HEAD - Opaska
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(2).spostrzegawczosc(3).wyglad(5).build(), ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(3).spostrzegawczosc(5).wyglad(8).build(), ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(4).spostrzegawczosc(6).wyglad(10).build(), ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(3).spostrzegawczosc(7).wyglad(5).build(), ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(5).spostrzegawczosc(7).wyglad(11).build(), ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(6).spostrzegawczosc(9).wyglad(14).build(), ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(7).spostrzegawczosc(11).wyglad(18).build(), ItemGenre.HEAD, ItemType.OPASKA));

    // HEAD - Bandana (requires special stats assembly)
    const s1 = Stats.builder().obronaPrzedmiotow(4).spostrzegawczosc(1).wyglad(3).build();
    s1.setAllDps(1);
    bases.push(new Base(ItemRarity.ZWYKLY, s1, ItemGenre.HEAD, ItemType.BANDANA));

    const s2 = Stats.builder().obronaPrzedmiotow(6).spostrzegawczosc(2).wyglad(5).build();
    s2.setAllDps(2);
    bases.push(new Base(ItemRarity.DOBRY, s2, ItemGenre.HEAD, ItemType.BANDANA));

    const s3 = Stats.builder().obronaPrzedmiotow(8).spostrzegawczosc(2).wyglad(6).build();
    s3.setAllDps(2);
    bases.push(new Base(ItemRarity.DOSKONALY, s3, ItemGenre.HEAD, ItemType.BANDANA));

    const s4 = Stats.builder().obronaPrzedmiotow(6).spostrzegawczosc(2).wyglad(5).build();
    s4.setAllDps(2);
    bases.push(new Base(ItemRarity.LEGENDARNY, s4, ItemGenre.HEAD, ItemType.BANDANA));

    const s5 = Stats.builder().obronaPrzedmiotow(9).spostrzegawczosc(3).wyglad(7).build();
    s5.setAllDps(3);
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, s5, ItemGenre.HEAD, ItemType.BANDANA));

    const s6 = Stats.builder().obronaPrzedmiotow(11).spostrzegawczosc(3).wyglad(9).build();
    s6.setAllDps(3);
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, s6, ItemGenre.HEAD, ItemType.BANDANA));

    const s7 = Stats.builder().obronaPrzedmiotow(14).spostrzegawczosc(5).wyglad(11).build();
    s7.setAllDps(5);
    bases.push(new Base(ItemRarity.EPICKI, s7, ItemGenre.HEAD, ItemType.BANDANA));

    // HEAD - Maska
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(3).twardosc(0.1).build(), ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(5).twardosc(0.15).build(), ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(6).twardosc(0.2).build(), ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(5).twardosc(0.14).build(), ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(7).twardosc(0.21).build(), ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(9).twardosc(0.27).build(), ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(11).twardosc(0.34).build(), ItemGenre.HEAD, ItemType.MASKA));

    // HEAD - Korona (requires special stats assembly)
    const q1 = Stats.builder().obronaPrzedmiotow(12).charyzma(3).wplywy(3).build();
    q1.setAllMaxDps(5);
    bases.push(new Base(ItemRarity.ZWYKLY, q1, ItemGenre.HEAD, ItemType.KORONA));

    const q2 = Stats.builder().obronaPrzedmiotow(18).charyzma(5).wplywy(5).build();
    q2.setAllMaxDps(8);
    bases.push(new Base(ItemRarity.DOBRY, q2, ItemGenre.HEAD, ItemType.KORONA));

    const q3 = Stats.builder().obronaPrzedmiotow(24).charyzma(6).wplywy(6).build();
    q3.setAllMaxDps(10);
    bases.push(new Base(ItemRarity.DOSKONALY, q3, ItemGenre.HEAD, ItemType.KORONA));

    const q4 = Stats.builder().obronaPrzedmiotow(17).charyzma(5).wplywy(5).build();
    q4.setAllMaxDps(7);
    bases.push(new Base(ItemRarity.LEGENDARNY, q4, ItemGenre.HEAD, ItemType.KORONA));

    const q5 = Stats.builder().obronaPrzedmiotow(25).charyzma(7).wplywy(7).build();
    q5.setAllMaxDps(11);
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, q5, ItemGenre.HEAD, ItemType.KORONA));

    const q6 = Stats.builder().obronaPrzedmiotow(33).charyzma(9).wplywy(9).build();
    q6.setAllMaxDps(14);
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, q6, ItemGenre.HEAD, ItemType.KORONA));

    const q7 = Stats.builder().obronaPrzedmiotow(41).charyzma(11).wplywy(11).build();
    q7.setAllMaxDps(18);
    bases.push(new Base(ItemRarity.EPICKI, q7, ItemGenre.HEAD, ItemType.KORONA));

    // CHEST - Koszulka
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(2).build(), ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(3).build(), ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(4).build(), ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(3).build(), ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(5).build(), ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(6).build(), ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(7).build(), ItemGenre.CHEST, ItemType.KOSZULKA));

    // CHEST - Kurtka
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(5).build(), ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(8).build(), ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(10).build(), ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(7).build(), ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(11).build(), ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(14).build(), ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(18).build(), ItemGenre.CHEST, ItemType.KURTKA));

    // CHEST - Marynarka
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(2).charyzma(2).wyglad(3).build(), ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(3).charyzma(3).wyglad(5).build(), ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(4).charyzma(4).wyglad(6).build(), ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(3).charyzma(3).wyglad(5).build(), ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(5).charyzma(5).wyglad(7).build(), ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(6).charyzma(6).wyglad(9).build(), ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(7).charyzma(7).wyglad(11).build(), ItemGenre.CHEST, ItemType.MARYNARKA));

    // CHEST - Kamizelka
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(10).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(15).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(20).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(14).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(21).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(27).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(34).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));

    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(2).zwinnosc(2).build(), ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(3).zwinnosc(3).build(), ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(4).zwinnosc(4).build(), ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(3).zwinnosc(3).build(), ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(5).zwinnosc(5).build(), ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(6).zwinnosc(6).build(), ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(7).zwinnosc(7).build(), ItemGenre.LEGS, ItemType.SZORTY));

    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(5).twardosc(0.01).build(), ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(8).twardosc(0.02).build(), ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(10).twardosc(0.02).build(), ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(7).twardosc(0.02).build(), ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(11).twardosc(0.03).build(), ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(14).twardosc(0.03).build(), ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(18).twardosc(0.05).build(), ItemGenre.LEGS, ItemType.SPODNIE));

    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(1).zwinnosc(-1).wplywy(1).wyglad(2).szczescie(1).build(), ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(2).zwinnosc(-1).wplywy(2).wyglad(3).szczescie(2).build(), ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(2).zwinnosc(-1).wplywy(2).wyglad(4).szczescie(2).build(), ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(2).zwinnosc(-1).wplywy(2).wyglad(3).szczescie(2).build(), ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(3).zwinnosc(-1).wplywy(3).wyglad(5).szczescie(3).build(), ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(3).zwinnosc(-1).wplywy(3).wyglad(6).szczescie(3).build(), ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(5).zwinnosc(-1).wplywy(5).wyglad(7).szczescie(5).build(), ItemGenre.LEGS, ItemType.KILT));

    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(4).zwinnosc(-2).wyglad(3).szczescie(2).build(), ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(6).zwinnosc(-2).wyglad(5).szczescie(3).build(), ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(8).zwinnosc(-2).wyglad(6).szczescie(4).build(), ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(6).zwinnosc(-2).wyglad(5).szczescie(3).build(), ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(9).zwinnosc(-2).wyglad(7).szczescie(5).build(), ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(11).zwinnosc(-2).wyglad(9).szczescie(6).build(), ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(14).zwinnosc(-2).wyglad(11).szczescie(7).build(), ItemGenre.LEGS, ItemType.SPODNICA));

    // CHEST - Gorset
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(3).wplywy(2).wyglad(4).build(), ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(5).wplywy(3).wyglad(6).build(), ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(6).wplywy(4).wyglad(8).build(), ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(5).wplywy(3).wyglad(6).build(), ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(7).wplywy(5).wyglad(9).build(), ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(9).wplywy(6).wyglad(11).build(), ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(11).wplywy(7).wyglad(14).build(), ItemGenre.CHEST, ItemType.GORSET));

    // CHEST - Smoking
    bases.push(new Base(ItemRarity.ZWYKLY, Stats.builder().obronaPrzedmiotow(4).wplywy(3).wyglad(4).zwinnosc(-1).build(), ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.DOBRY, Stats.builder().obronaPrzedmiotow(6).wplywy(5).wyglad(6).zwinnosc(-1).build(), ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.DOSKONALY, Stats.builder().obronaPrzedmiotow(8).wplywy(6).wyglad(8).zwinnosc(-1).build(), ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.LEGENDARNY, Stats.builder().obronaPrzedmiotow(6).wplywy(5).wyglad(6).zwinnosc(-1).build(), ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, Stats.builder().obronaPrzedmiotow(8).wplywy(7).wyglad(8).zwinnosc(-1).build(), ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(11).wplywy(9).wyglad(11).zwinnosc(-1).build(), ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.EPICKI, Stats.builder().obronaPrzedmiotow(14).wplywy(11).wyglad(14).zwinnosc(-1).build(), ItemGenre.CHEST, ItemType.SMOKING));
  }
}
