import { Base, Stats, ItemGenre, ItemRarity, ItemType } from '../item';

export class BaseDictionary {
private static bases: Base[] | null = null;

/**
* Get a base item by genre, type, and rarity
*/
static getBase(genre: ItemGenre, type: ItemType, rarity: ItemRarity, playerLvl: number): Base {
    if (!BaseDictionary.bases) {
      BaseDictionary.initializeBases(playerLvl);
    }

    const found = BaseDictionary.bases!.find(
      (b) => b.genre === genre && b.type === type && b.rarity === rarity
    );

    if (!found) {
      throw new Error(`Base not found for genre: ${genre}, type: ${type}, rarity: ${rarity}`);
    }

    return found;
  }

  private static initializeBases(playerLvl: number = 0): void {
    BaseDictionary.bases = [];
    const bases = BaseDictionary.bases;

    // ── HEAD ─────────────────────────────────────────────────────────────────

    // Czapka
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(1).build(),                         ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(2).build(),                         ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(2).build(),                         ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(2).build(),                         ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(3).build(),                         ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(3).build(),                      ItemGenre.HEAD, ItemType.CZAPKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(5).build(),                         ItemGenre.HEAD, ItemType.CZAPKA));

    // Kask
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(3).build(),                         ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(5).build(),                         ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(6).build(),                         ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(5).build(),                         ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(7).build(),                         ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(9).build(),                      ItemGenre.HEAD, ItemType.KASK));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(11).build(),                        ItemGenre.HEAD, ItemType.KASK));

    // Kominiarka
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(1).wplywy(2).wyglad(-5).build(),    ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(2).wplywy(3).wyglad(-5).build(),    ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(2).wplywy(4).wyglad(-5).build(),    ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(2).wplywy(3).wyglad(-5).build(),    ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(3).wplywy(5).wyglad(-5).build(),    ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(3).wplywy(6).wyglad(-5).build(), ItemGenre.HEAD, ItemType.KOMINIARKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(5).wplywy(7).wyglad(-5).build(),    ItemGenre.HEAD, ItemType.KOMINIARKA));

    // Kapelusz
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(2).wyglad(3).build(),               ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(3).wyglad(5).build(),               ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(4).wyglad(6).build(),               ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(3).wyglad(5).build(),               ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(5).wyglad(6).build(),               ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(6).wyglad(7).build(),            ItemGenre.HEAD, ItemType.KAPELUSZ));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(7).wyglad(11).build(),              ItemGenre.HEAD, ItemType.KAPELUSZ));

    // Helm
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(7).twardosc(0.01).build(),          ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(11).twardosc(0.02).build(),         ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(14).twardosc(0.02).build(),         ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(10).twardosc(0.02).build(),         ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(15).twardosc(0.03).build(),         ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(19).twardosc(0.03).build(),      ItemGenre.HEAD, ItemType.HELM));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(25).twardosc(0.05).build(),         ItemGenre.HEAD, ItemType.HELM));

    // Obrecz
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(1).charyzma(5).build(),             ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(2).charyzma(8).build(),             ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(2).charyzma(10).build(),            ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(2).charyzma(7).build(),             ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(3).charyzma(11).build(),            ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(3).charyzma(14).build(),         ItemGenre.HEAD, ItemType.OBRECZ));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(5).charyzma(18).build(),            ItemGenre.HEAD, ItemType.OBRECZ));

    // Opaska
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(2).spostrzegawczosc(3).wyglad(5).build(),   ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(3).spostrzegawczosc(5).wyglad(8).build(),   ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(4).spostrzegawczosc(6).wyglad(10).build(),  ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(3).spostrzegawczosc(7).wyglad(5).build(),   ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(5).spostrzegawczosc(7).wyglad(11).build(),  ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(6).spostrzegawczosc(9).wyglad(14).build(), ItemGenre.HEAD, ItemType.OPASKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(7).spostrzegawczosc(11).wyglad(18).build(), ItemGenre.HEAD, ItemType.OPASKA));

    // Bandana
    const s1 = Stats.builder().obronaPrzedmiotow(4).spostrzegawczosc(1).wyglad(3).build(); s1.setAllDps(1);
    bases.push(new Base(ItemRarity.ZWYKLY, s1, ItemGenre.HEAD, ItemType.BANDANA));
    const s2 = Stats.builder().obronaPrzedmiotow(6).spostrzegawczosc(2).wyglad(5).build(); s2.setAllDps(2);
    bases.push(new Base(ItemRarity.DOBRY, s2, ItemGenre.HEAD, ItemType.BANDANA));
    const s3 = Stats.builder().obronaPrzedmiotow(8).spostrzegawczosc(2).wyglad(6).build(); s3.setAllDps(2);
    bases.push(new Base(ItemRarity.DOSKONALY, s3, ItemGenre.HEAD, ItemType.BANDANA));
    const s4 = Stats.builder().obronaPrzedmiotow(6).spostrzegawczosc(2).wyglad(5).build(); s4.setAllDps(2);
    bases.push(new Base(ItemRarity.LEGENDARNY, s4, ItemGenre.HEAD, ItemType.BANDANA));
    const s5 = Stats.builder().obronaPrzedmiotow(9).spostrzegawczosc(3).wyglad(7).build(); s5.setAllDps(3);
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, s5, ItemGenre.HEAD, ItemType.BANDANA));
    const s6 = Stats.builder().obronaPrzedmiotow(11).spostrzegawczosc(3).wyglad(9).build(); s6.setAllDps(3);
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, s6, ItemGenre.HEAD, ItemType.BANDANA));
    const s7 = Stats.builder().obronaPrzedmiotow(14).spostrzegawczosc(5).wyglad(11).build(); s7.setAllDps(5);
    bases.push(new Base(ItemRarity.EPICKI, s7, ItemGenre.HEAD, ItemType.BANDANA));

    // Maska
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(3).twardosc(0.1).build(),           ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(5).twardosc(0.15).build(),          ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(6).twardosc(0.2).build(),           ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(5).twardosc(0.14).build(),          ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(7).twardosc(0.21).build(),          ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(9).twardosc(0.27).build(),       ItemGenre.HEAD, ItemType.MASKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(11).twardosc(0.34).build(),         ItemGenre.HEAD, ItemType.MASKA));

    // Korona
    const q1 = Stats.builder().obronaPrzedmiotow(12).charyzma(3).wplywy(3).build(); q1.setAllMaxDps(5);
    bases.push(new Base(ItemRarity.ZWYKLY, q1, ItemGenre.HEAD, ItemType.KORONA));
    const q2 = Stats.builder().obronaPrzedmiotow(18).charyzma(5).wplywy(5).build(); q2.setAllMaxDps(8);
    bases.push(new Base(ItemRarity.DOBRY, q2, ItemGenre.HEAD, ItemType.KORONA));
    const q3 = Stats.builder().obronaPrzedmiotow(24).charyzma(6).wplywy(6).build(); q3.setAllMaxDps(10);
    bases.push(new Base(ItemRarity.DOSKONALY, q3, ItemGenre.HEAD, ItemType.KORONA));
    const q4 = Stats.builder().obronaPrzedmiotow(17).charyzma(5).wplywy(5).build(); q4.setAllMaxDps(7);
    bases.push(new Base(ItemRarity.LEGENDARNY, q4, ItemGenre.HEAD, ItemType.KORONA));
    const q5 = Stats.builder().obronaPrzedmiotow(25).charyzma(7).wplywy(7).build(); q5.setAllMaxDps(11);
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY, q5, ItemGenre.HEAD, ItemType.KORONA));
    const q6 = Stats.builder().obronaPrzedmiotow(33).charyzma(9).wplywy(9).build(); q6.setAllMaxDps(14);
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, q6, ItemGenre.HEAD, ItemType.KORONA));
    const q7 = Stats.builder().obronaPrzedmiotow(41).charyzma(11).wplywy(11).build(); q7.setAllMaxDps(18);
    bases.push(new Base(ItemRarity.EPICKI, q7, ItemGenre.HEAD, ItemType.KORONA));

    // ── CHEST ────────────────────────────────────────────────────────────────

    // Koszulka
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(2).build(),  ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(3).build(),  ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(4).build(),  ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(3).build(),  ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(5).build(),  ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(6).build(), ItemGenre.CHEST, ItemType.KOSZULKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(7).build(),  ItemGenre.CHEST, ItemType.KOSZULKA));

    // Kurtka
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(5).build(),  ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(8).build(),  ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(10).build(), ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(7).build(),  ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(11).build(), ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(14).build(), ItemGenre.CHEST, ItemType.KURTKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(18).build(), ItemGenre.CHEST, ItemType.KURTKA));

    // Marynarka
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(2).charyzma(2).wyglad(3).build(),  ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(3).charyzma(3).wyglad(5).build(),  ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(4).charyzma(4).wyglad(6).build(),  ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(3).charyzma(3).wyglad(5).build(),  ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(5).charyzma(5).wyglad(7).build(),  ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(6).charyzma(6).wyglad(9).build(), ItemGenre.CHEST, ItemType.MARYNARKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(7).charyzma(7).wyglad(11).build(), ItemGenre.CHEST, ItemType.MARYNARKA));

    // Kamizelka
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(10).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(15).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(20).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(14).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(21).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(27).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(34).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));

    // Gorset
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(3).wplywy(2).wyglad(4).build(),   ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(5).wplywy(3).wyglad(6).build(),   ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(6).wplywy(4).wyglad(8).build(),   ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(5).wplywy(3).wyglad(6).build(),   ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(7).wplywy(5).wyglad(9).build(),   ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(9).wplywy(6).wyglad(11).build(), ItemGenre.CHEST, ItemType.GORSET));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(11).wplywy(7).wyglad(14).build(), ItemGenre.CHEST, ItemType.GORSET));

    // Smoking
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(4).wplywy(3).wyglad(4).zwinnosc(-1).build(),   ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(6).wplywy(5).wyglad(6).zwinnosc(-1).build(),   ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(8).wplywy(6).wyglad(8).zwinnosc(-1).build(),   ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(6).wplywy(5).wyglad(6).zwinnosc(-1).build(),   ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(9).wplywy(7).wyglad(9).zwinnosc(-1).build(),   ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(11).wplywy(9).wyglad(11).zwinnosc(-1).build(), ItemGenre.CHEST, ItemType.SMOKING));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(14).wplywy(11).wyglad(14).zwinnosc(-1).build(), ItemGenre.CHEST, ItemType.SMOKING));

    // Kolczuga
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(15).build(),  ItemGenre.CHEST, ItemType.KOLCZUGA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(23).build(),  ItemGenre.CHEST, ItemType.KOLCZUGA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(30).build(),  ItemGenre.CHEST, ItemType.KOLCZUGA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(21).build(),  ItemGenre.CHEST, ItemType.KOLCZUGA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(32).build(),  ItemGenre.CHEST, ItemType.KOLCZUGA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(41).build(), ItemGenre.CHEST, ItemType.KOLCZUGA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(52).build(),  ItemGenre.CHEST, ItemType.KOLCZUGA));

    // Peleryna
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(0).wplywy(3).zwinnosc(2).odpornosc(2).build(),  ItemGenre.CHEST, ItemType.PELERYNA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(0).wplywy(5).zwinnosc(3).odpornosc(3).build(),  ItemGenre.CHEST, ItemType.PELERYNA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(0).wplywy(6).zwinnosc(4).odpornosc(4).build(),  ItemGenre.CHEST, ItemType.PELERYNA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(0).wplywy(5).zwinnosc(3).odpornosc(3).build(),  ItemGenre.CHEST, ItemType.PELERYNA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(0).wplywy(7).zwinnosc(5).odpornosc(5).build(),  ItemGenre.CHEST, ItemType.PELERYNA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(0).wplywy(9).zwinnosc(6).odpornosc(6).build(), ItemGenre.CHEST, ItemType.PELERYNA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(0).wplywy(11).zwinnosc(7).odpornosc(7).build(), ItemGenre.CHEST, ItemType.PELERYNA));

    // ZbrojaWarstwowa
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(20).twardosc(0.01).build(),  ItemGenre.CHEST, ItemType.ZBROJAWARSTWOWA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(30).twardosc(0.02).build(),  ItemGenre.CHEST, ItemType.ZBROJAWARSTWOWA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(40).twardosc(0.02).build(),  ItemGenre.CHEST, ItemType.ZBROJAWARSTWOWA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(27).twardosc(0.02).build(),  ItemGenre.CHEST, ItemType.ZBROJAWARSTWOWA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(41).twardosc(0.03).build(),  ItemGenre.CHEST, ItemType.ZBROJAWARSTWOWA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(52).twardosc(0.03).build(), ItemGenre.CHEST, ItemType.ZBROJAWARSTWOWA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(68).twardosc(0.5).build(),   ItemGenre.CHEST, ItemType.ZBROJAWARSTWOWA));

    // PelnaZbroja
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(30).twardosc(0.05).build(),  ItemGenre.CHEST, ItemType.PELNAZBROJA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(45).twardosc(0.08).build(),  ItemGenre.CHEST, ItemType.PELNAZBROJA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(60).twardosc(0.10).build(),  ItemGenre.CHEST, ItemType.PELNAZBROJA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(41).twardosc(0.07).build(),  ItemGenre.CHEST, ItemType.PELNAZBROJA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(61).twardosc(0.11).build(),  ItemGenre.CHEST, ItemType.PELNAZBROJA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(82).twardosc(0.14).build(), ItemGenre.CHEST, ItemType.PELNAZBROJA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(102).twardosc(0.18).build(), ItemGenre.CHEST, ItemType.PELNAZBROJA));

    // ── LEGS ─────────────────────────────────────────────────────────────────

    // Szorty
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(2).zwinnosc(2).build(),  ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(3).zwinnosc(3).build(),  ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(4).zwinnosc(4).build(),  ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(3).zwinnosc(3).build(),  ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(5).zwinnosc(5).build(),  ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(6).zwinnosc(6).build(), ItemGenre.LEGS, ItemType.SZORTY));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(7).zwinnosc(7).build(),  ItemGenre.LEGS, ItemType.SZORTY));

    // Spodnie
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(5).twardosc(0.01).build(),  ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(8).twardosc(0.02).build(),  ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(10).twardosc(0.02).build(), ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(7).twardosc(0.02).build(),  ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(11).twardosc(0.03).build(), ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(14).twardosc(0.03).build(), ItemGenre.LEGS, ItemType.SPODNIE));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(18).twardosc(0.05).build(), ItemGenre.LEGS, ItemType.SPODNIE));

    // Kilt
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(1).zwinnosc(-1).wplywy(1).wyglad(2).szczescie(1).build(),  ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(2).zwinnosc(-1).wplywy(2).wyglad(3).szczescie(2).build(),  ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(2).zwinnosc(-1).wplywy(2).wyglad(4).szczescie(2).build(),  ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(2).zwinnosc(-1).wplywy(2).wyglad(3).szczescie(2).build(),  ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(3).zwinnosc(-1).wplywy(3).wyglad(5).szczescie(3).build(),  ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(3).zwinnosc(-1).wplywy(3).wyglad(6).szczescie(3).build(), ItemGenre.LEGS, ItemType.KILT));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(5).zwinnosc(-1).wplywy(5).wyglad(7).szczescie(5).build(),  ItemGenre.LEGS, ItemType.KILT));

    // Spodnica
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().obronaPrzedmiotow(4).zwinnosc(-2).wyglad(3).szczescie(2).build(),   ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().obronaPrzedmiotow(6).zwinnosc(-2).wyglad(5).szczescie(3).build(),   ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().obronaPrzedmiotow(8).zwinnosc(-2).wyglad(6).szczescie(4).build(),   ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().obronaPrzedmiotow(6).zwinnosc(-2).wyglad(5).szczescie(3).build(),   ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().obronaPrzedmiotow(9).zwinnosc(-2).wyglad(7).szczescie(5).build(),   ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().obronaPrzedmiotow(11).zwinnosc(-2).wyglad(9).szczescie(6).build(), ItemGenre.LEGS, ItemType.SPODNICA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().obronaPrzedmiotow(14).zwinnosc(-2).wyglad(11).szczescie(7).build(), ItemGenre.LEGS, ItemType.SPODNICA));

    // ── NECK ─────────────────────────────────────────────────────────────────

    // Amulet
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().wyglad(4).build(),   ItemGenre.NECK, ItemType.AMULET));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().wyglad(6).build(),   ItemGenre.NECK, ItemType.AMULET));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().wyglad(8).build(),   ItemGenre.NECK, ItemType.AMULET));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().wyglad(6).build(),   ItemGenre.NECK, ItemType.AMULET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().wyglad(9).build(),   ItemGenre.NECK, ItemType.AMULET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().wyglad(11).build(), ItemGenre.NECK, ItemType.AMULET));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().wyglad(14).build(),  ItemGenre.NECK, ItemType.AMULET));

    // Naszyjnik
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().charyzma(-1).wplywy(-1).wyglad(8).build(),   ItemGenre.NECK, ItemType.NASZYJNIK));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().charyzma(-1).wplywy(-1).wyglad(12).build(),  ItemGenre.NECK, ItemType.NASZYJNIK));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().charyzma(-1).wplywy(-1).wyglad(16).build(),  ItemGenre.NECK, ItemType.NASZYJNIK));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().charyzma(-1).wplywy(-1).wyglad(11).build(),  ItemGenre.NECK, ItemType.NASZYJNIK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().charyzma(-1).wplywy(-1).wyglad(17).build(),  ItemGenre.NECK, ItemType.NASZYJNIK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(-1).wplywy(-1).wyglad(22).build(), ItemGenre.NECK, ItemType.NASZYJNIK));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().charyzma(-1).wplywy(-1).wyglad(27).build(),  ItemGenre.NECK, ItemType.NASZYJNIK));

    // Krawat
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().charyzma(1).wplywy(1).wyglad(2).build(),  ItemGenre.NECK, ItemType.KRAWAT));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().charyzma(1).wplywy(1).wyglad(3).build(),  ItemGenre.NECK, ItemType.KRAWAT));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().charyzma(1).wplywy(1).wyglad(4).build(),  ItemGenre.NECK, ItemType.KRAWAT));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().charyzma(1).wplywy(1).wyglad(3).build(),  ItemGenre.NECK, ItemType.KRAWAT));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().charyzma(1).wplywy(1).wyglad(5).build(),  ItemGenre.NECK, ItemType.KRAWAT));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(1).wplywy(1).wyglad(6).build(), ItemGenre.NECK, ItemType.KRAWAT));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().charyzma(1).wplywy(1).wyglad(7).build(),  ItemGenre.NECK, ItemType.KRAWAT));

    // Apaszka
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().charyzma(4).wyglad(3).build(),   ItemGenre.NECK, ItemType.APASZKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().charyzma(6).wyglad(5).build(),   ItemGenre.NECK, ItemType.APASZKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().charyzma(8).wyglad(6).build(),   ItemGenre.NECK, ItemType.APASZKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().charyzma(6).wyglad(5).build(),   ItemGenre.NECK, ItemType.APASZKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().charyzma(9).wyglad(7).build(),   ItemGenre.NECK, ItemType.APASZKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(11).wyglad(9).build(), ItemGenre.NECK, ItemType.APASZKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().charyzma(14).wyglad(11).build(), ItemGenre.NECK, ItemType.APASZKA));

    // Lancuch
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().charyzma(-1).wplywy(3).build(),   ItemGenre.NECK, ItemType.LANCUCH));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().charyzma(-1).wplywy(5).build(),   ItemGenre.NECK, ItemType.LANCUCH));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().charyzma(-1).wplywy(6).build(),   ItemGenre.NECK, ItemType.LANCUCH));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().charyzma(-1).wplywy(5).build(),   ItemGenre.NECK, ItemType.LANCUCH));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().charyzma(-1).wplywy(7).build(),   ItemGenre.NECK, ItemType.LANCUCH));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(-1).wplywy(9).build(), ItemGenre.NECK, ItemType.LANCUCH));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().charyzma(-1).wplywy(11).build(),  ItemGenre.NECK, ItemType.LANCUCH));

    // ── FINGER ───────────────────────────────────────────────────────────────

    // Pierscien
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().wyglad(2).build(),  ItemGenre.FINGER, ItemType.PIERSCIEN));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().wyglad(3).build(),  ItemGenre.FINGER, ItemType.PIERSCIEN));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().wyglad(4).build(),  ItemGenre.FINGER, ItemType.PIERSCIEN));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().wyglad(3).build(),  ItemGenre.FINGER, ItemType.PIERSCIEN));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().wyglad(5).build(),  ItemGenre.FINGER, ItemType.PIERSCIEN));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().wyglad(6).build(), ItemGenre.FINGER, ItemType.PIERSCIEN));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().wyglad(7).build(),  ItemGenre.FINGER, ItemType.PIERSCIEN));

    // Bransoleta
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().charyzma(3).wplywy(-2).build(),   ItemGenre.FINGER, ItemType.BRANSOLETA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().charyzma(5).wplywy(-2).build(),   ItemGenre.FINGER, ItemType.BRANSOLETA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().charyzma(6).wplywy(-2).build(),   ItemGenre.FINGER, ItemType.BRANSOLETA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().charyzma(5).wplywy(-2).build(),   ItemGenre.FINGER, ItemType.BRANSOLETA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().charyzma(7).wplywy(-2).build(),   ItemGenre.FINGER, ItemType.BRANSOLETA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().charyzma(9).wplywy(-2).build(), ItemGenre.FINGER, ItemType.BRANSOLETA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().charyzma(11).wplywy(-2).build(),  ItemGenre.FINGER, ItemType.BRANSOLETA));

    // Sygnet
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().wplywy(2).wyglad(1).build(),  ItemGenre.FINGER, ItemType.SYGNET));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().wplywy(3).wyglad(2).build(),  ItemGenre.FINGER, ItemType.SYGNET));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().wplywy(4).wyglad(2).build(),  ItemGenre.FINGER, ItemType.SYGNET));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().wplywy(3).wyglad(2).build(),  ItemGenre.FINGER, ItemType.SYGNET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().wplywy(5).wyglad(3).build(),  ItemGenre.FINGER, ItemType.SYGNET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().wplywy(6).wyglad(3).build(), ItemGenre.FINGER, ItemType.SYGNET));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().wplywy(7).wyglad(5).build(),  ItemGenre.FINGER, ItemType.SYGNET));

    // ── WHITE 1H ─────────────────────────────────────────────────────────────

    // Palka
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(4).minDpsBiala1h(3).maxDpsBiala1h(6).atakiBiala(1).build(),     ItemGenre.WHITE_1H, ItemType.PALKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(6).minDpsBiala1h(5).maxDpsBiala1h(9).atakiBiala(1).build(),     ItemGenre.WHITE_1H, ItemType.PALKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(8).minDpsBiala1h(6).maxDpsBiala1h(12).atakiBiala(1).build(),    ItemGenre.WHITE_1H, ItemType.PALKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(6).minDpsBiala1h(5).maxDpsBiala1h(9).atakiBiala(1).build(),     ItemGenre.WHITE_1H, ItemType.PALKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(9).minDpsBiala1h(7).maxDpsBiala1h(13).atakiBiala(1).build(),    ItemGenre.WHITE_1H, ItemType.PALKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(11).minDpsBiala1h(9).maxDpsBiala1h(17).atakiBiala(1).build(), ItemGenre.WHITE_1H, ItemType.PALKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(14).minDpsBiala1h(11).maxDpsBiala1h(21).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.PALKA));

    // Noz
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(5).minDpsBiala1h(5).maxDpsBiala1h(6).atakiBiala(1).build(),     ItemGenre.WHITE_1H, ItemType.NOZ));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(8).minDpsBiala1h(8).maxDpsBiala1h(9).atakiBiala(1).build(),     ItemGenre.WHITE_1H, ItemType.NOZ));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(10).minDpsBiala1h(10).maxDpsBiala1h(12).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.NOZ));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(7).minDpsBiala1h(7).maxDpsBiala1h(9).atakiBiala(1).build(),     ItemGenre.WHITE_1H, ItemType.NOZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(11).minDpsBiala1h(11).maxDpsBiala1h(13).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.NOZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(14).minDpsBiala1h(14).maxDpsBiala1h(17).atakiBiala(1).build(), ItemGenre.WHITE_1H, ItemType.NOZ));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(18).minDpsBiala1h(18).maxDpsBiala1h(21).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.NOZ));

    // Sztylet
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(8).minDpsBiala1h(7).maxDpsBiala1h(8).atakiBiala(1).build(),     ItemGenre.WHITE_1H, ItemType.SZTYLET));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(12).minDpsBiala1h(11).maxDpsBiala1h(12).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.SZTYLET));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(16).minDpsBiala1h(14).maxDpsBiala1h(16).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.SZTYLET));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(11).minDpsBiala1h(10).maxDpsBiala1h(11).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.SZTYLET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(17).minDpsBiala1h(15).maxDpsBiala1h(17).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.SZTYLET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(22).minDpsBiala1h(19).maxDpsBiala1h(22).atakiBiala(1).build(), ItemGenre.WHITE_1H, ItemType.SZTYLET));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(27).minDpsBiala1h(25).maxDpsBiala1h(27).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.SZTYLET));

    // Rapier
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(10).minDpsBiala1h(7).maxDpsBiala1h(10).atakiBiala(1).build(),   ItemGenre.WHITE_1H, ItemType.RAPIER));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(15).minDpsBiala1h(11).maxDpsBiala1h(15).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.RAPIER));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(20).minDpsBiala1h(14).maxDpsBiala1h(20).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.RAPIER));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(14).minDpsBiala1h(10).maxDpsBiala1h(14).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.RAPIER));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(21).minDpsBiala1h(15).maxDpsBiala1h(21).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.RAPIER));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(27).minDpsBiala1h(19).maxDpsBiala1h(27).atakiBiala(1).build(), ItemGenre.WHITE_1H, ItemType.RAPIER));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(34).minDpsBiala1h(25).maxDpsBiala1h(34).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.RAPIER));

    // Miecz
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(6).minDpsBiala1h(9).maxDpsBiala1h(12).atakiBiala(1).build(),    ItemGenre.WHITE_1H, ItemType.MIECZ));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(9).minDpsBiala1h(14).maxDpsBiala1h(18).atakiBiala(1).build(),   ItemGenre.WHITE_1H, ItemType.MIECZ));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(12).minDpsBiala1h(18).maxDpsBiala1h(24).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.MIECZ));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(9).minDpsBiala1h(13).maxDpsBiala1h(17).atakiBiala(1).build(),   ItemGenre.WHITE_1H, ItemType.MIECZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(13).minDpsBiala1h(19).maxDpsBiala1h(25).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.MIECZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(17).minDpsBiala1h(25).maxDpsBiala1h(33).atakiBiala(1).build(), ItemGenre.WHITE_1H, ItemType.MIECZ));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(21).minDpsBiala1h(32).maxDpsBiala1h(41).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.MIECZ));

    // Topor
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(8).minDpsBiala1h(6).maxDpsBiala1h(25).critMultiBiala1h(0.10).trafienieProcentoweBiala(0.05).ignoreObrony(0.20).atakiBiala(1).build(),   ItemGenre.WHITE_1H, ItemType.TOPOR));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(12).minDpsBiala1h(9).maxDpsBiala1h(38).critMultiBiala1h(0.15).trafienieProcentoweBiala(0.08).ignoreObrony(0.30).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.TOPOR));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(16).minDpsBiala1h(12).maxDpsBiala1h(50).critMultiBiala1h(0.20).trafienieProcentoweBiala(0.10).ignoreObrony(0.40).atakiBiala(1).build(), ItemGenre.WHITE_1H, ItemType.TOPOR));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(11).minDpsBiala1h(9).maxDpsBiala1h(34).critMultiBiala1h(0.14).trafienieProcentoweBiala(0.07).ignoreObrony(0.27).atakiBiala(1).build(),  ItemGenre.WHITE_1H, ItemType.TOPOR));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(17).minDpsBiala1h(13).maxDpsBiala1h(52).critMultiBiala1h(0.21).trafienieProcentoweBiala(0.11).ignoreObrony(0.41).atakiBiala(1).build(), ItemGenre.WHITE_1H, ItemType.TOPOR));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(22).minDpsBiala1h(17).maxDpsBiala1h(68).critMultiBiala1h(0.27).trafienieProcentoweBiala(0.14).ignoreObrony(0.54).atakiBiala(1).build(), ItemGenre.WHITE_1H, ItemType.TOPOR));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(27).minDpsBiala1h(21).maxDpsBiala1h(86).critMultiBiala1h(0.34).trafienieProcentoweBiala(0.18).ignoreObrony(0.68).atakiBiala(1).build(), ItemGenre.WHITE_1H, ItemType.TOPOR));

    // Kastet
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-4).minDpsBiala1h(2).maxDpsBiala1h(3).trafienieProcentoweBiala(0.10).atakiBiala(2).build(),  ItemGenre.WHITE_1H, ItemType.KASTET));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-4).minDpsBiala1h(3).maxDpsBiala1h(5).trafienieProcentoweBiala(0.15).atakiBiala(3).build(),  ItemGenre.WHITE_1H, ItemType.KASTET));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-4).minDpsBiala1h(4).maxDpsBiala1h(6).trafienieProcentoweBiala(0.20).atakiBiala(4).build(),  ItemGenre.WHITE_1H, ItemType.KASTET));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-4).minDpsBiala1h(3).maxDpsBiala1h(5).trafienieProcentoweBiala(0.14).atakiBiala(3).build(),  ItemGenre.WHITE_1H, ItemType.KASTET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-4).minDpsBiala1h(5).maxDpsBiala1h(7).trafienieProcentoweBiala(0.21).atakiBiala(5).build(),  ItemGenre.WHITE_1H, ItemType.KASTET));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-4).minDpsBiala1h(6).maxDpsBiala1h(9).trafienieProcentoweBiala(0.27).atakiBiala(6).build(), ItemGenre.WHITE_1H, ItemType.KASTET));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-4).minDpsBiala1h(7).maxDpsBiala1h(11).trafienieProcentoweBiala(0.34).atakiBiala(7).build(), ItemGenre.WHITE_1H, ItemType.KASTET));

    // Kama
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsBiala1h(14).maxDpsBiala1h(32).critMultiBiala1h(0.10).atakiBiala(3).trafienieProcentoweBiala(0.05).build(),  ItemGenre.WHITE_1H, ItemType.KAMA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsBiala1h(21).maxDpsBiala1h(48).critMultiBiala1h(0.15).atakiBiala(4).trafienieProcentoweBiala(0.08).build(),  ItemGenre.WHITE_1H, ItemType.KAMA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsBiala1h(28).maxDpsBiala1h(64).critMultiBiala1h(0.20).atakiBiala(5).trafienieProcentoweBiala(0.10).build(),  ItemGenre.WHITE_1H, ItemType.KAMA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsBiala1h(19).maxDpsBiala1h(44).critMultiBiala1h(0.14).atakiBiala(4).trafienieProcentoweBiala(0.07).build(),  ItemGenre.WHITE_1H, ItemType.KAMA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsBiala1h(29).maxDpsBiala1h(68).critMultiBiala1h(0.21).atakiBiala(6).trafienieProcentoweBiala(0.11).build(),  ItemGenre.WHITE_1H, ItemType.KAMA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsBiala1h(38).maxDpsBiala1h(87).critMultiBiala1h(0.27).atakiBiala(7).trafienieProcentoweBiala(0.14).build(), ItemGenre.WHITE_1H, ItemType.KAMA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsBiala1h(48).maxDpsBiala1h(108).critMultiBiala1h(0.34).atakiBiala(8).trafienieProcentoweBiala(0.18).build(), ItemGenre.WHITE_1H, ItemType.KAMA));

    // PiescNiebios
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-4).minDpsBiala1h(10).maxDpsBiala1h(18).critChanceBiala1h(0.05).atakiBiala(2).ignoreObrony(0.15).build(),   ItemGenre.WHITE_1H, ItemType.PIESCNIEBIOS));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-4).minDpsBiala1h(15).maxDpsBiala1h(27).critChanceBiala1h(0.08).atakiBiala(3).ignoreObrony(0.23).build(),   ItemGenre.WHITE_1H, ItemType.PIESCNIEBIOS));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-4).minDpsBiala1h(20).maxDpsBiala1h(36).critChanceBiala1h(0.10).atakiBiala(4).ignoreObrony(0.3).build(),    ItemGenre.WHITE_1H, ItemType.PIESCNIEBIOS));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-4).minDpsBiala1h(14).maxDpsBiala1h(25).critChanceBiala1h(0.07).atakiBiala(3).ignoreObrony(0.21).build(),   ItemGenre.WHITE_1H, ItemType.PIESCNIEBIOS));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-4).minDpsBiala1h(21).maxDpsBiala1h(37).critChanceBiala1h(0.11).atakiBiala(5).ignoreObrony(0.32).build(),   ItemGenre.WHITE_1H, ItemType.PIESCNIEBIOS));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-4).minDpsBiala1h(27).maxDpsBiala1h(49).critChanceBiala1h(0.14).atakiBiala(6).ignoreObrony(0.41).build(), ItemGenre.WHITE_1H, ItemType.PIESCNIEBIOS));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-4).minDpsBiala1h(34).maxDpsBiala1h(61).critChanceBiala1h(0.18).atakiBiala(7).ignoreObrony(0.52).build(),   ItemGenre.WHITE_1H, ItemType.PIESCNIEBIOS));

    // Wakizashi
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(10).minDpsBiala1h(22).maxDpsBiala1h(45).critMultiBiala1h(0.20).atakiBiala(3).trafienieProcentoweBiala(0.05).build(),  ItemGenre.WHITE_1H, ItemType.WAKIZASHI));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(15).minDpsBiala1h(33).maxDpsBiala1h(68).critMultiBiala1h(0.30).atakiBiala(4).trafienieProcentoweBiala(0.08).build(),  ItemGenre.WHITE_1H, ItemType.WAKIZASHI));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(20).minDpsBiala1h(44).maxDpsBiala1h(90).critMultiBiala1h(0.40).atakiBiala(5).trafienieProcentoweBiala(0.10).build(),  ItemGenre.WHITE_1H, ItemType.WAKIZASHI));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(14).minDpsBiala1h(30).maxDpsBiala1h(61).critMultiBiala1h(0.28).atakiBiala(4).trafienieProcentoweBiala(0.07).build(),  ItemGenre.WHITE_1H, ItemType.WAKIZASHI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(21).minDpsBiala1h(45).maxDpsBiala1h(92).critMultiBiala1h(0.42).atakiBiala(6).trafienieProcentoweBiala(0.11).build(),  ItemGenre.WHITE_1H, ItemType.WAKIZASHI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(27).minDpsBiala1h(60).maxDpsBiala1h(122).critMultiBiala1h(0.54).atakiBiala(7).trafienieProcentoweBiala(0.14).build(), ItemGenre.WHITE_1H, ItemType.WAKIZASHI));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(34).minDpsBiala1h(75).maxDpsBiala1h(153).critMultiBiala1h(0.68).atakiBiala(8).trafienieProcentoweBiala(0.18).build(),  ItemGenre.WHITE_1H, ItemType.WAKIZASHI));

    // ── WHITE 2H ─────────────────────────────────────────────────────────────

    // Maczuga
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-4).minDpsBiala2h(15).maxDpsBiala2h(30).critChanceBiala2h(0.07).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.MACZUGA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-4).minDpsBiala2h(23).maxDpsBiala2h(45).critChanceBiala2h(0.11).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.MACZUGA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-4).minDpsBiala2h(30).maxDpsBiala2h(60).critChanceBiala2h(0.14).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.MACZUGA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-4).minDpsBiala2h(21).maxDpsBiala2h(41).critChanceBiala2h(0.10).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.MACZUGA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-4).minDpsBiala2h(32).maxDpsBiala2h(61).critChanceBiala2h(0.15).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.MACZUGA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-4).minDpsBiala2h(41).maxDpsBiala2h(81).critChanceBiala2h(0.19).atakiBiala(1).build(), ItemGenre.WHITE_2H, ItemType.MACZUGA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-4).minDpsBiala2h(52).maxDpsBiala2h(102).critChanceBiala2h(0.25).atakiBiala(1).build(),  ItemGenre.WHITE_2H, ItemType.MACZUGA));

    // Lom
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-8).minDpsBiala2h(20).maxDpsBiala2h(35).critChanceBiala2h(0.08).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.LOM));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-8).minDpsBiala2h(30).maxDpsBiala2h(53).critChanceBiala2h(0.12).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.LOM));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-8).minDpsBiala2h(40).maxDpsBiala2h(70).critChanceBiala2h(0.16).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.LOM));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-8).minDpsBiala2h(27).maxDpsBiala2h(48).critChanceBiala2h(0.11).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.LOM));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-8).minDpsBiala2h(41).maxDpsBiala2h(72).critChanceBiala2h(0.17).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.LOM));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-8).minDpsBiala2h(54).maxDpsBiala2h(95).critChanceBiala2h(0.22).atakiBiala(1).build(), ItemGenre.WHITE_2H, ItemType.LOM));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-8).minDpsBiala2h(68).maxDpsBiala2h(119).critChanceBiala2h(0.27).atakiBiala(1).build(),  ItemGenre.WHITE_2H, ItemType.LOM));

    // Pika
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-12).minDpsBiala2h(5).maxDpsBiala2h(40).critChanceBiala2h(0.09).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.PIKA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-12).minDpsBiala2h(8).maxDpsBiala2h(60).critChanceBiala2h(0.14).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.PIKA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-12).minDpsBiala2h(10).maxDpsBiala2h(80).critChanceBiala2h(0.18).atakiBiala(1).build(),  ItemGenre.WHITE_2H, ItemType.PIKA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-12).minDpsBiala2h(7).maxDpsBiala2h(54).critChanceBiala2h(0.13).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.PIKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-12).minDpsBiala2h(11).maxDpsBiala2h(81).critChanceBiala2h(0.19).atakiBiala(1).build(),  ItemGenre.WHITE_2H, ItemType.PIKA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-12).minDpsBiala2h(14).maxDpsBiala2h(108).critChanceBiala2h(0.25).atakiBiala(1).build(), ItemGenre.WHITE_2H, ItemType.PIKA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-12).minDpsBiala2h(18).maxDpsBiala2h(135).critChanceBiala2h(0.32).atakiBiala(1).build(),  ItemGenre.WHITE_2H, ItemType.PIKA));

    // ToporDwureczny
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-16).minDpsBiala2h(20).maxDpsBiala2h(40).critChanceBiala2h(0.10).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.TOPORDWURECZNY));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-16).minDpsBiala2h(30).maxDpsBiala2h(60).critChanceBiala2h(0.15).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.TOPORDWURECZNY));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-16).minDpsBiala2h(40).maxDpsBiala2h(80).critChanceBiala2h(0.20).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.TOPORDWURECZNY));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-16).minDpsBiala2h(27).maxDpsBiala2h(54).critChanceBiala2h(0.14).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.TOPORDWURECZNY));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-16).minDpsBiala2h(41).maxDpsBiala2h(81).critChanceBiala2h(0.21).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.TOPORDWURECZNY));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-16).minDpsBiala2h(54).maxDpsBiala2h(108).critChanceBiala2h(0.27).atakiBiala(1).build(), ItemGenre.WHITE_2H, ItemType.TOPORDWURECZNY));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-16).minDpsBiala2h(68).maxDpsBiala2h(135).critChanceBiala2h(0.34).atakiBiala(1).build(),  ItemGenre.WHITE_2H, ItemType.TOPORDWURECZNY));

    // MieczDwureczny
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsBiala2h(30).maxDpsBiala2h(40).critChanceBiala2h(0.11).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.MIECZDWURECZNY));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsBiala2h(45).maxDpsBiala2h(60).critChanceBiala2h(0.17).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.MIECZDWURECZNY));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsBiala2h(60).maxDpsBiala2h(80).critChanceBiala2h(0.22).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.MIECZDWURECZNY));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsBiala2h(41).maxDpsBiala2h(54).critChanceBiala2h(0.15).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.MIECZDWURECZNY));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsBiala2h(61).maxDpsBiala2h(81).critChanceBiala2h(0.23).atakiBiala(1).build(),   ItemGenre.WHITE_2H, ItemType.MIECZDWURECZNY));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsBiala2h(81).maxDpsBiala2h(108).critChanceBiala2h(0.30).atakiBiala(1).build(), ItemGenre.WHITE_2H, ItemType.MIECZDWURECZNY));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsBiala2h(102).maxDpsBiala2h(135).critChanceBiala2h(0.38).atakiBiala(1).build(),  ItemGenre.WHITE_2H, ItemType.MIECZDWURECZNY));

    // Kosa
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-24).minDpsBiala2h(55).maxDpsBiala2h(70).critChanceBiala2h(0.12).atakiBiala(1).trafienieProcentoweBiala(0.10).build(),   ItemGenre.WHITE_2H, ItemType.KOSA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-24).minDpsBiala2h(83).maxDpsBiala2h(105).critChanceBiala2h(0.18).atakiBiala(1).trafienieProcentoweBiala(0.15).build(),  ItemGenre.WHITE_2H, ItemType.KOSA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-24).minDpsBiala2h(110).maxDpsBiala2h(140).critChanceBiala2h(0.24).atakiBiala(1).trafienieProcentoweBiala(0.20).build(), ItemGenre.WHITE_2H, ItemType.KOSA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-24).minDpsBiala2h(75).maxDpsBiala2h(95).critChanceBiala2h(0.17).atakiBiala(1).trafienieProcentoweBiala(0.14).build(),   ItemGenre.WHITE_2H, ItemType.KOSA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-24).minDpsBiala2h(113).maxDpsBiala2h(143).critChanceBiala2h(0.25).atakiBiala(1).trafienieProcentoweBiala(0.21).build(), ItemGenre.WHITE_2H, ItemType.KOSA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-24).minDpsBiala2h(149).maxDpsBiala2h(189).critChanceBiala2h(0.33).atakiBiala(1).trafienieProcentoweBiala(0.27).build(), ItemGenre.WHITE_2H, ItemType.KOSA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-24).minDpsBiala2h(187).maxDpsBiala2h(237).critChanceBiala2h(0.41).atakiBiala(1).trafienieProcentoweBiala(0.34).build(),  ItemGenre.WHITE_2H, ItemType.KOSA));

    // Korbacz
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-22).minDpsBiala2h(35).maxDpsBiala2h(65).critChanceBiala2h(0.13).atakiBiala(1).trafienieProcentoweBiala(0.05).critMultiBiala2h(0.15).build(),   ItemGenre.WHITE_2H, ItemType.KORBACZ));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-22).minDpsBiala2h(53).maxDpsBiala2h(98).critChanceBiala2h(0.20).atakiBiala(1).trafienieProcentoweBiala(0.08).critMultiBiala2h(0.23).build(),   ItemGenre.WHITE_2H, ItemType.KORBACZ));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-22).minDpsBiala2h(70).maxDpsBiala2h(130).critChanceBiala2h(0.26).atakiBiala(1).trafienieProcentoweBiala(0.10).critMultiBiala2h(0.30).build(),  ItemGenre.WHITE_2H, ItemType.KORBACZ));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-22).minDpsBiala2h(48).maxDpsBiala2h(88).critChanceBiala2h(0.18).atakiBiala(1).trafienieProcentoweBiala(0.07).critMultiBiala2h(0.21).build(),   ItemGenre.WHITE_2H, ItemType.KORBACZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-22).minDpsBiala2h(72).maxDpsBiala2h(133).critChanceBiala2h(0.27).atakiBiala(1).trafienieProcentoweBiala(0.11).critMultiBiala2h(0.32).build(),  ItemGenre.WHITE_2H, ItemType.KORBACZ));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-22).minDpsBiala2h(95).maxDpsBiala2h(176).critChanceBiala2h(0.36).atakiBiala(1).trafienieProcentoweBiala(0.14).critMultiBiala2h(0.41).build(), ItemGenre.WHITE_2H, ItemType.KORBACZ));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-22).minDpsBiala2h(119).maxDpsBiala2h(221).critChanceBiala2h(0.45).atakiBiala(1).trafienieProcentoweBiala(0.18).critMultiBiala2h(0.52).build(), ItemGenre.WHITE_2H, ItemType.KORBACZ));

    // Halabarda
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-28).minDpsBiala2h(80).maxDpsBiala2h(95).critChanceBiala2h(0.13).atakiBiala(1).trafienieProcentoweBiala(0.05).build(),   ItemGenre.WHITE_2H, ItemType.HALABARDA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-28).minDpsBiala2h(120).maxDpsBiala2h(143).critChanceBiala2h(0.20).atakiBiala(1).trafienieProcentoweBiala(0.08).build(), ItemGenre.WHITE_2H, ItemType.HALABARDA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-28).minDpsBiala2h(160).maxDpsBiala2h(190).critChanceBiala2h(0.26).atakiBiala(1).trafienieProcentoweBiala(0.10).build(), ItemGenre.WHITE_2H, ItemType.HALABARDA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-28).minDpsBiala2h(108).maxDpsBiala2h(129).critChanceBiala2h(0.18).atakiBiala(1).trafienieProcentoweBiala(0.07).build(), ItemGenre.WHITE_2H, ItemType.HALABARDA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-28).minDpsBiala2h(162).maxDpsBiala2h(194).critChanceBiala2h(0.28).atakiBiala(1).trafienieProcentoweBiala(0.11).build(), ItemGenre.WHITE_2H, ItemType.HALABARDA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-28).minDpsBiala2h(216).maxDpsBiala2h(257).critChanceBiala2h(0.36).atakiBiala(1).trafienieProcentoweBiala(0.14).build(), ItemGenre.WHITE_2H, ItemType.HALABARDA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-28).minDpsBiala2h(270).maxDpsBiala2h(322).critChanceBiala2h(0.45).atakiBiala(1).trafienieProcentoweBiala(0.18).build(),  ItemGenre.WHITE_2H, ItemType.HALABARDA));

    // Katana
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-34).minDpsBiala2h(40).maxDpsBiala2h(65).critChanceBiala2h(0.14).atakiBiala(1).trafienieProcentoweBiala(0.10).critMultiBiala2h(0.20).build(),   ItemGenre.WHITE_2H, ItemType.KATANA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-34).minDpsBiala2h(60).maxDpsBiala2h(98).critChanceBiala2h(0.21).atakiBiala(1).trafienieProcentoweBiala(0.15).critMultiBiala2h(0.30).build(),   ItemGenre.WHITE_2H, ItemType.KATANA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-34).minDpsBiala2h(80).maxDpsBiala2h(130).critChanceBiala2h(0.28).atakiBiala(1).trafienieProcentoweBiala(0.20).critMultiBiala2h(0.40).build(),  ItemGenre.WHITE_2H, ItemType.KATANA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-34).minDpsBiala2h(54).maxDpsBiala2h(88).critChanceBiala2h(0.19).atakiBiala(1).trafienieProcentoweBiala(0.14).critMultiBiala2h(0.27).build(),   ItemGenre.WHITE_2H, ItemType.KATANA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-34).minDpsBiala2h(81).maxDpsBiala2h(133).critChanceBiala2h(0.29).atakiBiala(1).trafienieProcentoweBiala(0.21).critMultiBiala2h(0.41).build(),  ItemGenre.WHITE_2H, ItemType.KATANA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-34).minDpsBiala2h(108).maxDpsBiala2h(176).critChanceBiala2h(0.38).atakiBiala(1).trafienieProcentoweBiala(0.27).critMultiBiala2h(0.54).build(), ItemGenre.WHITE_2H, ItemType.KATANA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-34).minDpsBiala2h(135).maxDpsBiala2h(221).critChanceBiala2h(0.48).atakiBiala(1).trafienieProcentoweBiala(0.34).critMultiBiala2h(0.68).build(),  ItemGenre.WHITE_2H, ItemType.KATANA));

    // PilaLancuchowa
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().trafienieBiala(-40).minDpsBiala2h(90).maxDpsBiala2h(110).critChanceBiala2h(0.15).atakiBiala(1).critMultiBiala2h(0.25).build(),   ItemGenre.WHITE_2H, ItemType.PILALANCUCHOWA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().trafienieBiala(-40).minDpsBiala2h(135).maxDpsBiala2h(165).critChanceBiala2h(0.23).atakiBiala(1).critMultiBiala2h(0.38).build(),  ItemGenre.WHITE_2H, ItemType.PILALANCUCHOWA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().trafienieBiala(-40).minDpsBiala2h(180).maxDpsBiala2h(220).critChanceBiala2h(0.30).atakiBiala(1).critMultiBiala2h(0.50).build(),  ItemGenre.WHITE_2H, ItemType.PILALANCUCHOWA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().trafienieBiala(-40).minDpsBiala2h(122).maxDpsBiala2h(149).critChanceBiala2h(0.21).atakiBiala(1).critMultiBiala2h(0.34).build(),  ItemGenre.WHITE_2H, ItemType.PILALANCUCHOWA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().trafienieBiala(-40).minDpsBiala2h(183).maxDpsBiala2h(223).critChanceBiala2h(0.32).atakiBiala(1).critMultiBiala2h(0.52).build(),  ItemGenre.WHITE_2H, ItemType.PILALANCUCHOWA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().trafienieBiala(-40).minDpsBiala2h(243).maxDpsBiala2h(297).critChanceBiala2h(0.41).atakiBiala(1).critMultiBiala2h(0.68).build(), ItemGenre.WHITE_2H, ItemType.PILALANCUCHOWA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().trafienieBiala(-40).minDpsBiala2h(304).maxDpsBiala2h(372).critChanceBiala2h(0.52).atakiBiala(1).critMultiBiala2h(0.86).build(),  ItemGenre.WHITE_2H, ItemType.PILALANCUCHOWA));

    // ── GUN 1H ───────────────────────────────────────────────────────────────

    // Glock
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna1h(6).maxDpsPalna1h(12).atakiPalna(2).build(),   ItemGenre.GUN_1H, ItemType.GLOCK));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna1h(9).maxDpsPalna1h(18).atakiPalna(3).build(),   ItemGenre.GUN_1H, ItemType.GLOCK));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna1h(12).maxDpsPalna1h(24).atakiPalna(4).build(),  ItemGenre.GUN_1H, ItemType.GLOCK));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna1h(9).maxDpsPalna1h(17).atakiPalna(3).build(),   ItemGenre.GUN_1H, ItemType.GLOCK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna1h(13).maxDpsPalna1h(25).atakiPalna(5).build(),  ItemGenre.GUN_1H, ItemType.GLOCK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna1h(17).maxDpsPalna1h(33).atakiPalna(6).build(), ItemGenre.GUN_1H, ItemType.GLOCK));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna1h(21).maxDpsPalna1h(41).atakiPalna(7).build(),  ItemGenre.GUN_1H, ItemType.GLOCK));

    // Magnum
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna1h(10).maxDpsPalna1h(16).atakiPalna(2).build(),  ItemGenre.GUN_1H, ItemType.MAGNUM));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna1h(15).maxDpsPalna1h(24).atakiPalna(3).build(),  ItemGenre.GUN_1H, ItemType.MAGNUM));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna1h(20).maxDpsPalna1h(32).atakiPalna(4).build(),  ItemGenre.GUN_1H, ItemType.MAGNUM));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna1h(14).maxDpsPalna1h(22).atakiPalna(3).build(),  ItemGenre.GUN_1H, ItemType.MAGNUM));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna1h(21).maxDpsPalna1h(33).atakiPalna(5).build(),  ItemGenre.GUN_1H, ItemType.MAGNUM));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna1h(27).maxDpsPalna1h(44).atakiPalna(6).build(), ItemGenre.GUN_1H, ItemType.MAGNUM));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna1h(34).maxDpsPalna1h(54).atakiPalna(7).build(),  ItemGenre.GUN_1H, ItemType.MAGNUM));

    // DesertEagle
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna1h(12).maxDpsPalna1h(18).atakiPalna(2).critChancePalna1h(0.01).critMultiPalna1h(0.25).trafienieProcentowePalna(0.05).build(),  ItemGenre.GUN_1H, ItemType.DESERT_EAGLE));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna1h(18).maxDpsPalna1h(27).atakiPalna(3).critChancePalna1h(0.02).critMultiPalna1h(0.38).trafienieProcentowePalna(0.08).build(),  ItemGenre.GUN_1H, ItemType.DESERT_EAGLE));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna1h(24).maxDpsPalna1h(36).atakiPalna(4).critChancePalna1h(0.02).critMultiPalna1h(0.50).trafienieProcentowePalna(0.10).build(),  ItemGenre.GUN_1H, ItemType.DESERT_EAGLE));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna1h(17).maxDpsPalna1h(25).atakiPalna(3).critChancePalna1h(0.02).critMultiPalna1h(0.34).trafienieProcentowePalna(0.07).build(),  ItemGenre.GUN_1H, ItemType.DESERT_EAGLE));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna1h(25).maxDpsPalna1h(37).atakiPalna(5).critChancePalna1h(0.03).critMultiPalna1h(0.52).trafienieProcentowePalna(0.11).build(),  ItemGenre.GUN_1H, ItemType.DESERT_EAGLE));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna1h(33).maxDpsPalna1h(49).atakiPalna(6).critChancePalna1h(0.03).critMultiPalna1h(0.68).trafienieProcentowePalna(0.14).build(), ItemGenre.GUN_1H, ItemType.DESERT_EAGLE));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna1h(41).maxDpsPalna1h(61).atakiPalna(7).critChancePalna1h(0.05).critMultiPalna1h(0.86).trafienieProcentowePalna(0.18).build(),  ItemGenre.GUN_1H, ItemType.DESERT_EAGLE));

    // Beretta
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna1h(4).maxDpsPalna1h(9).atakiPalna(3).build(),    ItemGenre.GUN_1H, ItemType.BERETTA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna1h(6).maxDpsPalna1h(14).atakiPalna(5).build(),   ItemGenre.GUN_1H, ItemType.BERETTA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna1h(8).maxDpsPalna1h(18).atakiPalna(6).build(),   ItemGenre.GUN_1H, ItemType.BERETTA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna1h(6).maxDpsPalna1h(13).atakiPalna(5).build(),   ItemGenre.GUN_1H, ItemType.BERETTA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna1h(9).maxDpsPalna1h(19).atakiPalna(7).build(),   ItemGenre.GUN_1H, ItemType.BERETTA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna1h(11).maxDpsPalna1h(25).atakiPalna(9).build(), ItemGenre.GUN_1H, ItemType.BERETTA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna1h(14).maxDpsPalna1h(32).atakiPalna(11).build(), ItemGenre.GUN_1H, ItemType.BERETTA));

    // Uzi
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna1h(1).maxDpsPalna1h(15).atakiPalna(3).build(),   ItemGenre.GUN_1H, ItemType.UZI));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna1h(2).maxDpsPalna1h(23).atakiPalna(5).build(),   ItemGenre.GUN_1H, ItemType.UZI));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna1h(2).maxDpsPalna1h(30).atakiPalna(6).build(),   ItemGenre.GUN_1H, ItemType.UZI));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna1h(2).maxDpsPalna1h(21).atakiPalna(5).build(),   ItemGenre.GUN_1H, ItemType.UZI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna1h(3).maxDpsPalna1h(32).atakiPalna(7).build(),   ItemGenre.GUN_1H, ItemType.UZI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna1h(3).maxDpsPalna1h(41).atakiPalna(9).build(), ItemGenre.GUN_1H, ItemType.UZI));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna1h(5).maxDpsPalna1h(52).atakiPalna(11).build(),  ItemGenre.GUN_1H, ItemType.UZI));

    // Mp5k
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna1h(6).maxDpsPalna1h(18).atakiPalna(3).critChancePalna1h(0.02).trafienieProcentowePalna(0.10).build(),   ItemGenre.GUN_1H, ItemType.MP5K));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna1h(9).maxDpsPalna1h(27).atakiPalna(5).critChancePalna1h(0.03).trafienieProcentowePalna(0.15).build(),   ItemGenre.GUN_1H, ItemType.MP5K));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna1h(12).maxDpsPalna1h(36).atakiPalna(6).critChancePalna1h(0.04).trafienieProcentowePalna(0.20).build(),  ItemGenre.GUN_1H, ItemType.MP5K));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna1h(9).maxDpsPalna1h(25).atakiPalna(5).critChancePalna1h(0.03).trafienieProcentowePalna(0.14).build(),   ItemGenre.GUN_1H, ItemType.MP5K));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna1h(13).maxDpsPalna1h(37).atakiPalna(7).critChancePalna1h(0.05).trafienieProcentowePalna(0.21).build(),  ItemGenre.GUN_1H, ItemType.MP5K));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna1h(17).maxDpsPalna1h(49).atakiPalna(9).critChancePalna1h(0.06).trafienieProcentowePalna(0.27).build(), ItemGenre.GUN_1H, ItemType.MP5K));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna1h(21).maxDpsPalna1h(61).atakiPalna(18).trafienieProcentowePalna(0.34).critChancePalna1h(0.07).build(),  ItemGenre.GUN_1H, ItemType.MP5K));

    // Skorpion
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna1h(3).maxDpsPalna1h(12).atakiPalna(4).critChancePalna1h(0.05).trafienieProcentowePalna(0.05).build(),   ItemGenre.GUN_1H, ItemType.SKORPION));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna1h(5).maxDpsPalna1h(18).atakiPalna(6).critChancePalna1h(0.08).trafienieProcentowePalna(0.08).build(),   ItemGenre.GUN_1H, ItemType.SKORPION));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna1h(6).maxDpsPalna1h(24).atakiPalna(8).critChancePalna1h(0.10).trafienieProcentowePalna(0.10).build(),   ItemGenre.GUN_1H, ItemType.SKORPION));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna1h(5).maxDpsPalna1h(17).atakiPalna(6).critChancePalna1h(0.07).trafienieProcentowePalna(0.07).build(),   ItemGenre.GUN_1H, ItemType.SKORPION));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna1h(7).maxDpsPalna1h(25).atakiPalna(9).critChancePalna1h(0.11).trafienieProcentowePalna(0.11).build(),   ItemGenre.GUN_1H, ItemType.SKORPION));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna1h(9).maxDpsPalna1h(33).atakiPalna(11).critChancePalna1h(0.14).trafienieProcentowePalna(0.14).build(), ItemGenre.GUN_1H, ItemType.SKORPION));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna1h(11).maxDpsPalna1h(41).atakiPalna(21).critChancePalna1h(0.18).trafienieProcentowePalna(0.18).build(),  ItemGenre.GUN_1H, ItemType.SKORPION));

    // ── GUN 2H ───────────────────────────────────────────────────────────────

    // KarabinMysliwski
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna2h(10).maxDpsPalna2h(20).atakiPalna(2).critChancePalna2h(0.20).ignoreObrony(0.40).spostrzegawczosc(2).build(),   ItemGenre.GUN_2H, ItemType.KARABINMYSLIWSKI));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna2h(15).maxDpsPalna2h(30).atakiPalna(3).critChancePalna2h(0.30).ignoreObrony(0.60).spostrzegawczosc(3).build(),   ItemGenre.GUN_2H, ItemType.KARABINMYSLIWSKI));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna2h(20).maxDpsPalna2h(40).atakiPalna(4).critChancePalna2h(0.40).ignoreObrony(0.80).spostrzegawczosc(4).build(),   ItemGenre.GUN_2H, ItemType.KARABINMYSLIWSKI));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna2h(14).maxDpsPalna2h(27).atakiPalna(3).critChancePalna2h(0.27).ignoreObrony(0.54).spostrzegawczosc(3).build(),   ItemGenre.GUN_2H, ItemType.KARABINMYSLIWSKI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna2h(21).maxDpsPalna2h(41).atakiPalna(5).critChancePalna2h(0.41).ignoreObrony(0.81).spostrzegawczosc(5).build(),   ItemGenre.GUN_2H, ItemType.KARABINMYSLIWSKI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna2h(27).maxDpsPalna2h(54).atakiPalna(6).critChancePalna2h(0.54).ignoreObrony(1.08).spostrzegawczosc(6).build(), ItemGenre.GUN_2H, ItemType.KARABINMYSLIWSKI));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna2h(34).maxDpsPalna2h(68).atakiPalna(7).critChancePalna2h(0.68).ignoreObrony(1.35).spostrzegawczosc(7).build(),   ItemGenre.GUN_2H, ItemType.KARABINMYSLIWSKI));

    // Strzelba
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna2h(20).maxDpsPalna2h(60).atakiPalna(3).critChancePalna2h(0.25).ignoreObrony(0.50).trafieniePalna(10).build(),   ItemGenre.GUN_2H, ItemType.STRZELBA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna2h(30).maxDpsPalna2h(90).atakiPalna(4).critChancePalna2h(0.38).ignoreObrony(0.50).trafieniePalna(15).build(),   ItemGenre.GUN_2H, ItemType.STRZELBA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna2h(40).maxDpsPalna2h(120).atakiPalna(5).critChancePalna2h(0.50).ignoreObrony(0.50).trafieniePalna(20).build(),  ItemGenre.GUN_2H, ItemType.STRZELBA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna2h(27).maxDpsPalna2h(81).atakiPalna(4).critChancePalna2h(0.34).ignoreObrony(0.50).trafieniePalna(14).build(),   ItemGenre.GUN_2H, ItemType.STRZELBA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna2h(41).maxDpsPalna2h(122).atakiPalna(6).critChancePalna2h(0.52).ignoreObrony(0.50).trafieniePalna(21).build(),  ItemGenre.GUN_2H, ItemType.STRZELBA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna2h(54).maxDpsPalna2h(162).atakiPalna(7).critChancePalna2h(0.68).ignoreObrony(0.50).trafieniePalna(27).build(), ItemGenre.GUN_2H, ItemType.STRZELBA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna2h(68).maxDpsPalna2h(203).atakiPalna(8).critChancePalna2h(0.86).ignoreObrony(0.50).trafieniePalna(34).build(),  ItemGenre.GUN_2H, ItemType.STRZELBA));

    // AK47
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna2h(15).maxDpsPalna2h(25).atakiPalna(5).build(),   ItemGenre.GUN_2H, ItemType.AK47));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna2h(23).maxDpsPalna2h(38).atakiPalna(8).build(),   ItemGenre.GUN_2H, ItemType.AK47));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna2h(30).maxDpsPalna2h(50).atakiPalna(10).build(),  ItemGenre.GUN_2H, ItemType.AK47));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna2h(21).maxDpsPalna2h(34).atakiPalna(7).build(),   ItemGenre.GUN_2H, ItemType.AK47));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna2h(32).maxDpsPalna2h(52).atakiPalna(11).build(),  ItemGenre.GUN_2H, ItemType.AK47));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna2h(41).maxDpsPalna2h(68).atakiPalna(14).build(), ItemGenre.GUN_2H, ItemType.AK47));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna2h(52).maxDpsPalna2h(86).atakiPalna(18).critChancePalna2h(0.18).build(), ItemGenre.GUN_2H, ItemType.AK47));

    // MiotaczPlomieni
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna2h(15).maxDpsPalna2h(50).atakiPalna(1).critChancePalna2h(0.50).critMultiPalna2h(0.25).ignoreObrony(1.00).trafieniePalna(-10).twardosc(0.05).build(),  ItemGenre.GUN_2H, ItemType.MIOTACZPLOMIENI));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna2h(23).maxDpsPalna2h(75).atakiPalna(1).critChancePalna2h(0.75).critMultiPalna2h(0.38).ignoreObrony(1.00).trafieniePalna(-10).twardosc(0.08).build(),  ItemGenre.GUN_2H, ItemType.MIOTACZPLOMIENI));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna2h(30).maxDpsPalna2h(100).atakiPalna(1).critChancePalna2h(1.00).critMultiPalna2h(0.50).ignoreObrony(1.00).trafieniePalna(-10).twardosc(0.10).build(), ItemGenre.GUN_2H, ItemType.MIOTACZPLOMIENI));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna2h(21).maxDpsPalna2h(68).atakiPalna(1).critChancePalna2h(0.68).critMultiPalna2h(0.34).ignoreObrony(1.00).trafieniePalna(-10).twardosc(0.07).build(),  ItemGenre.GUN_2H, ItemType.MIOTACZPLOMIENI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna2h(32).maxDpsPalna2h(102).atakiPalna(1).critChancePalna2h(1.02).critMultiPalna2h(0.52).ignoreObrony(1.00).trafieniePalna(-10).twardosc(0.11).build(), ItemGenre.GUN_2H, ItemType.MIOTACZPLOMIENI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna2h(41).maxDpsPalna2h(135).atakiPalna(1).critChancePalna2h(1.35).critMultiPalna2h(0.68).ignoreObrony(1.00).trafieniePalna(-10).twardosc(0.14).build(), ItemGenre.GUN_2H, ItemType.MIOTACZPLOMIENI));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna2h(52).maxDpsPalna2h(169).atakiPalna(1).critChancePalna2h(1.69).critMultiPalna2h(0.86).ignoreObrony(1.00).trafieniePalna(-10).twardosc(0.18).build(),  ItemGenre.GUN_2H, ItemType.MIOTACZPLOMIENI));

    // FnFal (playerLvl-scaling)
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna2h(30 + Math.floor(playerLvl / 4)).maxDpsPalna2h(45 + Math.floor(playerLvl / 4)).atakiPalna(3).trafienieProcentowePalna(0.05).critChancePalna2h(0.05).build(),                     ItemGenre.GUN_2H, ItemType.FN_FAL));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna2h(45 + Math.floor(playerLvl * 2 / 4)).maxDpsPalna2h(68 + Math.floor(playerLvl * 2 / 4)).atakiPalna(5).trafienieProcentowePalna(0.08).critChancePalna2h(0.08).build(),             ItemGenre.GUN_2H, ItemType.FN_FAL));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna2h(60 + Math.floor(playerLvl * 2 / 4)).maxDpsPalna2h(90 + Math.floor(playerLvl * 2 / 4)).atakiPalna(6).trafienieProcentowePalna(0.10).critChancePalna2h(0.10).build(),             ItemGenre.GUN_2H, ItemType.FN_FAL));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna2h(41 + Math.floor(playerLvl * 2 / 4)).maxDpsPalna2h(61 + Math.floor(playerLvl * 2 / 4)).atakiPalna(5).trafienieProcentowePalna(0.07).critChancePalna2h(0.07).build(),             ItemGenre.GUN_2H, ItemType.FN_FAL));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna2h(61 + Math.floor(playerLvl * 3 / 4)).maxDpsPalna2h(92 + Math.floor(playerLvl * 3 / 4)).atakiPalna(7).trafienieProcentowePalna(0.11).critChancePalna2h(0.11).build(),             ItemGenre.GUN_2H, ItemType.FN_FAL));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna2h(81 + Math.floor(playerLvl * 3 / 4)).maxDpsPalna2h(122 + Math.floor(playerLvl * 3 / 4)).atakiPalna(9).trafienieProcentowePalna(0.14).critChancePalna2h(0.14).build(),          ItemGenre.GUN_2H, ItemType.FN_FAL));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna2h(102 + Math.floor(playerLvl * 5 / 4)).maxDpsPalna2h(153 + Math.floor(playerLvl * 5 / 4)).atakiPalna(11).trafienieProcentowePalna(0.18).critChancePalna2h(0.18).build(),           ItemGenre.GUN_2H, ItemType.FN_FAL));

    // PolautomatSnajperski
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna2h(15).maxDpsPalna2h(25).atakiPalna(4).critChancePalna2h(0.25).ignoreObrony(0.30).trafienieProcentowePalna(0.05).build(),   ItemGenre.GUN_2H, ItemType.POLAUTOMATSNAJPERSKI));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna2h(23).maxDpsPalna2h(38).atakiPalna(6).critChancePalna2h(0.38).ignoreObrony(0.45).trafienieProcentowePalna(0.08).build(),   ItemGenre.GUN_2H, ItemType.POLAUTOMATSNAJPERSKI));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna2h(30).maxDpsPalna2h(50).atakiPalna(8).critChancePalna2h(0.50).ignoreObrony(0.60).trafienieProcentowePalna(0.10).build(),   ItemGenre.GUN_2H, ItemType.POLAUTOMATSNAJPERSKI));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna2h(21).maxDpsPalna2h(34).atakiPalna(6).critChancePalna2h(0.35).ignoreObrony(0.51).trafienieProcentowePalna(0.07).build(),   ItemGenre.GUN_2H, ItemType.POLAUTOMATSNAJPERSKI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna2h(32).maxDpsPalna2h(52).atakiPalna(10).critChancePalna2h(0.52).ignoreObrony(0.61).trafienieProcentowePalna(0.11).build(),  ItemGenre.GUN_2H, ItemType.POLAUTOMATSNAJPERSKI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna2h(41).maxDpsPalna2h(68).atakiPalna(12).critChancePalna2h(0.68).ignoreObrony(0.81).trafienieProcentowePalna(0.14).build(), ItemGenre.GUN_2H, ItemType.POLAUTOMATSNAJPERSKI));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna2h(52).maxDpsPalna2h(86).atakiPalna(14).critChancePalna2h(0.86).ignoreObrony(1.02).trafienieProcentowePalna(0.18).build(),  ItemGenre.GUN_2H, ItemType.POLAUTOMATSNAJPERSKI));

    // KarabinSnajperski
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsPalna2h(80).maxDpsPalna2h(80).atakiPalna(2).critChancePalna2h(0.50).ignoreObrony(1.00).trafienieProcentowePalna(0.05).spostrzegawczosc(4).zwinnosc(-5).build(),   ItemGenre.GUN_2H, ItemType.KARABINSNAJPERSKI));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsPalna2h(120).maxDpsPalna2h(120).atakiPalna(3).critChancePalna2h(0.75).ignoreObrony(1.00).trafienieProcentowePalna(0.08).spostrzegawczosc(6).zwinnosc(-5).build(),  ItemGenre.GUN_2H, ItemType.KARABINSNAJPERSKI));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsPalna2h(160).maxDpsPalna2h(160).atakiPalna(4).critChancePalna2h(1.00).ignoreObrony(1.00).trafienieProcentowePalna(0.10).spostrzegawczosc(8).zwinnosc(-5).build(), ItemGenre.GUN_2H, ItemType.KARABINSNAJPERSKI));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsPalna2h(108).maxDpsPalna2h(108).atakiPalna(3).critChancePalna2h(0.68).ignoreObrony(1.00).trafienieProcentowePalna(0.07).spostrzegawczosc(6).zwinnosc(-5).build(), ItemGenre.GUN_2H, ItemType.KARABINSNAJPERSKI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsPalna2h(162).maxDpsPalna2h(162).atakiPalna(5).critChancePalna2h(1.02).ignoreObrony(1.00).trafienieProcentowePalna(0.11).spostrzegawczosc(9).zwinnosc(-5).build(), ItemGenre.GUN_2H, ItemType.KARABINSNAJPERSKI));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsPalna2h(216).maxDpsPalna2h(216).atakiPalna(6).critChancePalna2h(1.35).ignoreObrony(1.00).trafienieProcentowePalna(0.14).spostrzegawczosc(11).zwinnosc(-5).build(), ItemGenre.GUN_2H, ItemType.KARABINSNAJPERSKI));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsPalna2h(270).maxDpsPalna2h(270).atakiPalna(8).critChancePalna2h(1.69).ignoreObrony(1.00).trafienieProcentowePalna(0.18).spostrzegawczosc(14).zwinnosc(-5).build(), ItemGenre.GUN_2H, ItemType.KARABINSNAJPERSKI));

    // ── RANGE 1H ─────────────────────────────────────────────────────────────

    // KrotkiLuk
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans1h(18).maxDpsDystans1h(22).atakiDystans1h(2).trafienieDystans(3).build(),   ItemGenre.RANGE_1H, ItemType.KROTKILUK));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans1h(27).maxDpsDystans1h(33).atakiDystans1h(3).trafienieDystans(5).build(),   ItemGenre.RANGE_1H, ItemType.KROTKILUK));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans1h(36).maxDpsDystans1h(44).atakiDystans1h(4).trafienieDystans(6).build(),   ItemGenre.RANGE_1H, ItemType.KROTKILUK));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans1h(25).maxDpsDystans1h(30).atakiDystans1h(3).trafienieDystans(5).build(),   ItemGenre.RANGE_1H, ItemType.KROTKILUK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans1h(37).maxDpsDystans1h(45).atakiDystans1h(5).trafienieDystans(7).build(),   ItemGenre.RANGE_1H, ItemType.KROTKILUK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans1h(49).maxDpsDystans1h(60).atakiDystans1h(6).trafienieDystans(9).build(), ItemGenre.RANGE_1H, ItemType.KROTKILUK));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans1h(61).maxDpsDystans1h(75).atakiDystans1h(7).trafienieDystans(11).build(),  ItemGenre.RANGE_1H, ItemType.KROTKILUK));

    // Luk
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans1h(22).maxDpsDystans1h(26).atakiDystans1h(3).trafienieDystans(-5).build(),  ItemGenre.RANGE_1H, ItemType.LUK));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans1h(33).maxDpsDystans1h(39).atakiDystans1h(5).trafienieDystans(-5).build(),  ItemGenre.RANGE_1H, ItemType.LUK));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans1h(44).maxDpsDystans1h(52).atakiDystans1h(6).trafienieDystans(-5).build(),  ItemGenre.RANGE_1H, ItemType.LUK));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans1h(30).maxDpsDystans1h(36).atakiDystans1h(5).trafienieDystans(-5).build(),  ItemGenre.RANGE_1H, ItemType.LUK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans1h(45).maxDpsDystans1h(53).atakiDystans1h(7).trafienieDystans(-5).build(),  ItemGenre.RANGE_1H, ItemType.LUK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans1h(60).maxDpsDystans1h(71).atakiDystans1h(9).trafienieDystans(-5).build(), ItemGenre.RANGE_1H, ItemType.LUK));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans1h(75).maxDpsDystans1h(88).atakiDystans1h(11).trafienieDystans(-5).build(), ItemGenre.RANGE_1H, ItemType.LUK));

    // NozDoRzucania
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans1h(14).maxDpsDystans1h(18).atakiDystans1h(3).ignoreObrony(0.15).critChanceDystans(0.15).critMultiDystans1h(0.20).trafienieDystans(10).trafienieProcentoweDystans(0.10).build(),  ItemGenre.RANGE_1H, ItemType.NOZDORZUCANIA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans1h(21).maxDpsDystans1h(27).atakiDystans1h(5).ignoreObrony(0.23).critChanceDystans(0.23).critMultiDystans1h(0.30).trafienieDystans(8).trafienieProcentoweDystans(0.15).build(),   ItemGenre.RANGE_1H, ItemType.NOZDORZUCANIA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans1h(28).maxDpsDystans1h(36).atakiDystans1h(6).ignoreObrony(0.30).critChanceDystans(0.30).critMultiDystans1h(0.40).trafienieDystans(10).trafienieProcentoweDystans(0.2).build(),   ItemGenre.RANGE_1H, ItemType.NOZDORZUCANIA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans1h(19).maxDpsDystans1h(25).atakiDystans1h(5).ignoreObrony(0.21).critChanceDystans(0.21).critMultiDystans1h(0.27).trafienieDystans(7).trafienieProcentoweDystans(0.14).build(),   ItemGenre.RANGE_1H, ItemType.NOZDORZUCANIA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans1h(29).maxDpsDystans1h(37).atakiDystans1h(7).ignoreObrony(0.32).critChanceDystans(0.32).critMultiDystans1h(0.41).trafienieDystans(11).trafienieProcentoweDystans(0.21).build(),  ItemGenre.RANGE_1H, ItemType.NOZDORZUCANIA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans1h(38).maxDpsDystans1h(49).atakiDystans1h(9).ignoreObrony(0.51).critChanceDystans(0.41).critMultiDystans1h(0.54).trafienieDystans(14).trafienieProcentoweDystans(0.27).build(), ItemGenre.RANGE_1H, ItemType.NOZDORZUCANIA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans1h(48).maxDpsDystans1h(61).atakiDystans1h(11).ignoreObrony(0.52).critChanceDystans(0.52).critMultiDystans1h(0.68).trafienieDystans(18).trafienieProcentoweDystans(0.34).build(),  ItemGenre.RANGE_1H, ItemType.NOZDORZUCANIA));

    // ToporekDoRzucania
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans1h(18).maxDpsDystans1h(24).atakiDystans1h(4).ignoreObrony(0.10).critChanceDystans(0.15).critMultiDystans1h(0.30).trafienieProcentoweDystans(0.10).build(),                        ItemGenre.RANGE_1H, ItemType.TOPOREKDORZUCANIA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans1h(27).maxDpsDystans1h(36).atakiDystans1h(6).ignoreObrony(0.15).critChanceDystans(0.23).critMultiDystans1h(0.45).trafienieProcentoweDystans(0.15).build(),                        ItemGenre.RANGE_1H, ItemType.TOPOREKDORZUCANIA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans1h(36).maxDpsDystans1h(48).atakiDystans1h(8).ignoreObrony(0.20).critChanceDystans(0.30).critMultiDystans1h(0.60).trafienieDystans(10).trafienieProcentoweDystans(0.2).build(),   ItemGenre.RANGE_1H, ItemType.TOPOREKDORZUCANIA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans1h(25).maxDpsDystans1h(33).atakiDystans1h(6).ignoreObrony(0.14).critChanceDystans(0.21).critMultiDystans1h(0.41).trafienieDystans(7).trafienieProcentoweDystans(0.14).build(),   ItemGenre.RANGE_1H, ItemType.TOPOREKDORZUCANIA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans1h(37).maxDpsDystans1h(49).atakiDystans1h(9).ignoreObrony(0.21).critChanceDystans(0.32).critMultiDystans1h(0.61).trafienieDystans(11).trafienieProcentoweDystans(0.21).build(),  ItemGenre.RANGE_1H, ItemType.TOPOREKDORZUCANIA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans1h(49).maxDpsDystans1h(65).atakiDystans1h(11).ignoreObrony(0.27).critChanceDystans(0.41).critMultiDystans1h(0.81).trafienieDystans(14).trafienieProcentoweDystans(0.27).build(), ItemGenre.RANGE_1H, ItemType.TOPOREKDORZUCANIA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans1h(61).maxDpsDystans1h(81).atakiDystans1h(14).ignoreObrony(0.34).critChanceDystans(0.52).critMultiDystans1h(1.02).trafienieDystans(18).trafienieProcentoweDystans(0.34).build(),  ItemGenre.RANGE_1H, ItemType.TOPOREKDORZUCANIA));

    // Shuriken
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans1h(25).maxDpsDystans1h(28).atakiDystans1h(5).critChanceDystans(0.18).critMultiDystans1h(0.30).trafienieDystans(7).trafienieProcentoweDystans(0.10).build(),   ItemGenre.RANGE_1H, ItemType.SHURIKEN));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans1h(38).maxDpsDystans1h(43).atakiDystans1h(8).critChanceDystans(0.27).critMultiDystans1h(0.45).trafienieDystans(11).trafienieProcentoweDystans(0.15).build(),  ItemGenre.RANGE_1H, ItemType.SHURIKEN));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans1h(50).maxDpsDystans1h(56).atakiDystans1h(10).critChanceDystans(0.36).critMultiDystans1h(0.60).trafienieDystans(14).trafienieProcentoweDystans(0.2).build(),  ItemGenre.RANGE_1H, ItemType.SHURIKEN));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans1h(35).maxDpsDystans1h(39).atakiDystans1h(7).critChanceDystans(0.14).critMultiDystans1h(0.51).trafienieDystans(10).trafienieProcentoweDystans(0.14).build(),  ItemGenre.RANGE_1H, ItemType.SHURIKEN));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans1h(53).maxDpsDystans1h(59).atakiDystans1h(11).critChanceDystans(0.21).critMultiDystans1h(0.61).trafienieDystans(15).trafienieProcentoweDystans(0.21).build(), ItemGenre.RANGE_1H, ItemType.SHURIKEN));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans1h(68).maxDpsDystans1h(77).atakiDystans1h(14).critChanceDystans(0.27).critMultiDystans1h(0.81).trafienieDystans(19).trafienieProcentoweDystans(0.27).build(), ItemGenre.RANGE_1H, ItemType.SHURIKEN));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans1h(86).maxDpsDystans1h(97).atakiDystans1h(18).critChanceDystans(0.34).critMultiDystans1h(1.02).trafienieDystans(25).trafienieProcentoweDystans(0.34).build(),  ItemGenre.RANGE_1H, ItemType.SHURIKEN));

    // ── RANGE 2H ─────────────────────────────────────────────────────────────

    // DlugiLuk
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans2h(27).maxDpsDystans2h(42).atakiDystans2h(2).build(),  ItemGenre.RANGE_2H, ItemType.DLUGILUK));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans2h(41).maxDpsDystans2h(63).atakiDystans2h(3).build(),  ItemGenre.RANGE_2H, ItemType.DLUGILUK));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans2h(54).maxDpsDystans2h(84).atakiDystans2h(4).build(),  ItemGenre.RANGE_2H, ItemType.DLUGILUK));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans2h(37).maxDpsDystans2h(57).atakiDystans2h(3).build(),  ItemGenre.RANGE_2H, ItemType.DLUGILUK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans2h(56).maxDpsDystans2h(86).atakiDystans2h(5).build(),  ItemGenre.RANGE_2H, ItemType.DLUGILUK));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans2h(73).maxDpsDystans2h(114).atakiDystans2h(6).build(), ItemGenre.RANGE_2H, ItemType.DLUGILUK));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans2h(92).maxDpsDystans2h(142).atakiDystans2h(7).build(), ItemGenre.RANGE_2H, ItemType.DLUGILUK));

    // Oszczep
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans2h(30).maxDpsDystans2h(50).atakiDystans2h(2).build(),   ItemGenre.RANGE_2H, ItemType.OSZCZEP));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans2h(45).maxDpsDystans2h(75).atakiDystans2h(3).build(),   ItemGenre.RANGE_2H, ItemType.OSZCZEP));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans2h(60).maxDpsDystans2h(100).atakiDystans2h(4).build(),  ItemGenre.RANGE_2H, ItemType.OSZCZEP));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans2h(41).maxDpsDystans2h(68).atakiDystans2h(3).build(),   ItemGenre.RANGE_2H, ItemType.OSZCZEP));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans2h(61).maxDpsDystans2h(102).atakiDystans2h(5).build(),  ItemGenre.RANGE_2H, ItemType.OSZCZEP));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans2h(81).maxDpsDystans2h(135).atakiDystans2h(6).build(), ItemGenre.RANGE_2H, ItemType.OSZCZEP));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans2h(102).maxDpsDystans2h(169).atakiDystans2h(7).build(), ItemGenre.RANGE_2H, ItemType.OSZCZEP));

    // Pilum
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans2h(45).maxDpsDystans2h(60).atakiDystans2h(2).trafienieProcentoweDystans(0.05).build(),   ItemGenre.RANGE_2H, ItemType.PILUM));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans2h(68).maxDpsDystans2h(90).atakiDystans2h(3).trafienieProcentoweDystans(0.08).build(),   ItemGenre.RANGE_2H, ItemType.PILUM));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans2h(90).maxDpsDystans2h(120).atakiDystans2h(4).trafienieProcentoweDystans(0.10).build(),  ItemGenre.RANGE_2H, ItemType.PILUM));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans2h(61).maxDpsDystans2h(81).atakiDystans2h(3).trafienieProcentoweDystans(0.07).build(),   ItemGenre.RANGE_2H, ItemType.PILUM));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans2h(92).maxDpsDystans2h(122).atakiDystans2h(5).trafienieProcentoweDystans(0.11).build(),  ItemGenre.RANGE_2H, ItemType.PILUM));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans2h(122).maxDpsDystans2h(162).atakiDystans2h(6).trafienieProcentoweDystans(0.14).build(), ItemGenre.RANGE_2H, ItemType.PILUM));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans2h(153).maxDpsDystans2h(203).atakiDystans2h(7).trafienieProcentoweDystans(0.18).build(),  ItemGenre.RANGE_2H, ItemType.PILUM));

    // Kusza
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans2h(20).maxDpsDystans2h(40).atakiDystans2h(2).ignoreObrony(0.15).critChanceDystans(0.18).critMultiDystans2h(0.25).trafienieProcentoweDystans(0.05).build(),   ItemGenre.RANGE_2H, ItemType.KUSZA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans2h(30).maxDpsDystans2h(60).atakiDystans2h(3).ignoreObrony(0.23).critChanceDystans(0.27).critMultiDystans2h(0.38).trafienieProcentoweDystans(0.08).build(),   ItemGenre.RANGE_2H, ItemType.KUSZA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans2h(40).maxDpsDystans2h(80).atakiDystans2h(4).ignoreObrony(0.30).critChanceDystans(0.36).critMultiDystans2h(0.50).trafienieProcentoweDystans(0.10).build(),   ItemGenre.RANGE_2H, ItemType.KUSZA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans2h(27).maxDpsDystans2h(54).atakiDystans2h(3).ignoreObrony(0.21).critChanceDystans(0.25).critMultiDystans2h(0.34).trafienieProcentoweDystans(0.07).build(),   ItemGenre.RANGE_2H, ItemType.KUSZA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans2h(41).maxDpsDystans2h(81).atakiDystans2h(5).ignoreObrony(0.32).critChanceDystans(0.38).critMultiDystans2h(0.52).trafienieProcentoweDystans(0.11).build(),   ItemGenre.RANGE_2H, ItemType.KUSZA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans2h(54).maxDpsDystans2h(108).atakiDystans2h(6).ignoreObrony(0.51).critChanceDystans(0.49).critMultiDystans2h(0.68).trafienieProcentoweDystans(0.14).build(), ItemGenre.RANGE_2H, ItemType.KUSZA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans2h(68).maxDpsDystans2h(135).atakiDystans2h(7).ignoreObrony(0.52).critChanceDystans(0.61).critMultiDystans2h(0.86).trafienieProcentoweDystans(0.18).build(),  ItemGenre.RANGE_2H, ItemType.KUSZA));

    // CiezkaKusza
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans2h(30).maxDpsDystans2h(70).atakiDystans2h(2).ignoreObrony(0.20).critChanceDystans(0.22).critMultiDystans2h(0.50).trafienieDystans(-10).trafienieProcentoweDystans(0.05).build(),   ItemGenre.RANGE_2H, ItemType.CIEZKAKUSZA));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans2h(45).maxDpsDystans2h(105).atakiDystans2h(3).ignoreObrony(0.30).critChanceDystans(0.33).critMultiDystans2h(0.75).trafienieDystans(-10).trafienieProcentoweDystans(0.08).build(),  ItemGenre.RANGE_2H, ItemType.CIEZKAKUSZA));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans2h(60).maxDpsDystans2h(140).atakiDystans2h(4).ignoreObrony(0.40).critChanceDystans(0.44).critMultiDystans2h(1.00).trafienieDystans(-10).trafienieProcentoweDystans(0.10).build(),  ItemGenre.RANGE_2H, ItemType.CIEZKAKUSZA));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans2h(41).maxDpsDystans2h(95).atakiDystans2h(3).ignoreObrony(0.27).critChanceDystans(0.31).critMultiDystans2h(0.68).trafienieDystans(-10).trafienieProcentoweDystans(0.07).build(),   ItemGenre.RANGE_2H, ItemType.CIEZKAKUSZA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans2h(61).maxDpsDystans2h(142).atakiDystans2h(5).ignoreObrony(0.41).critChanceDystans(0.46).critMultiDystans2h(1.02).trafienieDystans(-10).trafienieProcentoweDystans(0.11).build(),  ItemGenre.RANGE_2H, ItemType.CIEZKAKUSZA));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans2h(81).maxDpsDystans2h(189).atakiDystans2h(6).ignoreObrony(0.54).critChanceDystans(0.60).critMultiDystans2h(1.35).trafienieDystans(-10).trafienieProcentoweDystans(0.14).build(), ItemGenre.RANGE_2H, ItemType.CIEZKAKUSZA));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans2h(102).maxDpsDystans2h(237).atakiDystans2h(7).ignoreObrony(0.68).critChanceDystans(0.75).critMultiDystans2h(1.69).trafienieDystans(-10).trafienieProcentoweDystans(0.18).build(),  ItemGenre.RANGE_2H, ItemType.CIEZKAKUSZA));

    // LukRefleksyjny
    bases.push(new Base(ItemRarity.ZWYKLY,            Stats.builder().minDpsDystans2h(45).maxDpsDystans2h(55).atakiDystans2h(5).critMultiDystans2h(0.35).trafienieProcentoweDystans(0.05).build(),   ItemGenre.RANGE_2H, ItemType.LUKREFLEKSYJNY));
    bases.push(new Base(ItemRarity.DOBRY,             Stats.builder().minDpsDystans2h(68).maxDpsDystans2h(83).atakiDystans2h(8).critMultiDystans2h(0.53).trafienieProcentoweDystans(0.08).build(),   ItemGenre.RANGE_2H, ItemType.LUKREFLEKSYJNY));
    bases.push(new Base(ItemRarity.DOSKONALY,         Stats.builder().minDpsDystans2h(90).maxDpsDystans2h(110).atakiDystans2h(10).critMultiDystans2h(0.70).trafienieProcentoweDystans(0.10).build(),  ItemGenre.RANGE_2H, ItemType.LUKREFLEKSYJNY));
    bases.push(new Base(ItemRarity.LEGENDARNY,        Stats.builder().minDpsDystans2h(61).maxDpsDystans2h(75).atakiDystans2h(7).critMultiDystans2h(0.48).trafienieProcentoweDystans(0.07).build(),   ItemGenre.RANGE_2H, ItemType.LUKREFLEKSYJNY));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOBRY,  Stats.builder().minDpsDystans2h(92).maxDpsDystans2h(113).atakiDystans2h(11).critMultiDystans2h(0.72).trafienieProcentoweDystans(0.11).build(),  ItemGenre.RANGE_2H, ItemType.LUKREFLEKSYJNY));
    bases.push(new Base(ItemRarity.LEGENDARNY_DOSKONALY, Stats.builder().minDpsDystans2h(122).maxDpsDystans2h(149).atakiDystans2h(14).critMultiDystans2h(0.95).trafienieProcentoweDystans(0.14).build(), ItemGenre.RANGE_2H, ItemType.LUKREFLEKSYJNY));
    bases.push(new Base(ItemRarity.EPICKI,            Stats.builder().minDpsDystans2h(153).maxDpsDystans2h(187).atakiDystans2h(18).critMultiDystans2h(1.19).trafienieProcentoweDystans(0.18).build(),  ItemGenre.RANGE_2H, ItemType.LUKREFLEKSYJNY));
  }
}
