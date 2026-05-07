import { Base, Stats, ItemGenre, ItemRarity, ItemType } from '../item';
import { WeaponStats, WeaponStatsBuilder } from '../item/WeaponStats';

export class BaseDictionary {
  private static bases: Base[] | null = null;

  static getBase(genre: ItemGenre, type: ItemType): Base {
    if (!BaseDictionary.bases) {
      BaseDictionary.initializeBases();
    }

    const usesRarity =
      genre === ItemGenre.RANGE_2H ||
      genre === ItemGenre.RANGE_1H ||
      genre === ItemGenre.GUN_2H ||
      genre === ItemGenre.GUN_1H;

    const found = BaseDictionary.bases!.find((b) =>
      usesRarity
        ? b.genre === genre && b.type === type 
        : b.genre === genre && b.type === type
    );

    if (!found) {
      throw new Error(`Base not found for genre: ${genre}, type: ${type}`);
    }

    return found;
  }

  private static initializeBases(): void {
    BaseDictionary.bases = [];
    const bases = BaseDictionary.bases;

    bases.push(new Base(Stats.builder().obronaBazy(1).build(), ItemGenre.HEAD, ItemType.CZAPKA));


    bases.push(new Base(Stats.builder().obronaBazy(3).build(), ItemGenre.HEAD, ItemType.KASK));


    bases.push(new Base(Stats.builder().obronaBazy(1).wplywy(2).wyglad(-5).build(), ItemGenre.HEAD, ItemType.KOMINIARKA));


    bases.push(new Base(Stats.builder().obronaBazy(2).wyglad(3).build(), ItemGenre.HEAD, ItemType.KAPELUSZ));


    bases.push(new Base(Stats.builder().obronaBazy(7).twardosc(0.01).build(), ItemGenre.HEAD, ItemType.HELM));


    bases.push(new Base(Stats.builder().obronaBazy(1).charyzma(5).build(), ItemGenre.HEAD, ItemType.OBRECZ));


    bases.push(new Base(Stats.builder().obronaBazy(2).spostrzegawczosc(3).wyglad(5).build(), ItemGenre.HEAD, ItemType.OPASKA));


    const s1 = Stats.builder().obronaBazy(4).spostrzegawczosc(1).wyglad(3).build(); s1.setAllDps(1);
    bases.push(new Base(s1, ItemGenre.HEAD, ItemType.BANDANA));


    bases.push(new Base(Stats.builder().obronaBazy(3).twardosc(0.1).build(), ItemGenre.HEAD, ItemType.MASKA));


    const q1 = Stats.builder().obronaBazy(12).charyzma(3).wplywy(3).build(); q1.setAllMaxDps(5);
    bases.push(new Base(q1, ItemGenre.HEAD, ItemType.KORONA));


    bases.push(new Base(Stats.builder().obronaBazy(2).build(), ItemGenre.CHEST, ItemType.KOSZULKA));


    bases.push(new Base(Stats.builder().obronaBazy(5).build(), ItemGenre.CHEST, ItemType.KURTKA));


    bases.push(new Base(Stats.builder().obronaBazy(2).charyzma(2).wyglad(3).build(), ItemGenre.CHEST, ItemType.MARYNARKA));


    bases.push(new Base(Stats.builder().obronaBazy(10).build(), ItemGenre.CHEST, ItemType.KAMIZELKA));


    bases.push(new Base(Stats.builder().obronaBazy(3).wplywy(2).wyglad(4).build(), ItemGenre.CHEST, ItemType.GORSET));


    bases.push(new Base(Stats.builder().obronaBazy(4).wplywy(3).wyglad(4).zwinnosc(-1).build(), ItemGenre.CHEST, ItemType.SMOKING));


    bases.push(new Base(Stats.builder().obronaBazy(15).build(), ItemGenre.CHEST, ItemType.KOLCZUGA));


    bases.push(new Base(Stats.builder().obronaBazy(0).wplywy(3).zwinnosc(2).odpornosc(2).build(), ItemGenre.CHEST, ItemType.PELERYNA));


    bases.push(new Base(Stats.builder().obronaBazy(20).twardosc(0.01).build(), ItemGenre.CHEST, ItemType.ZBROJAWARSTWOWA));


    bases.push(new Base(Stats.builder().obronaBazy(30).twardosc(0.05).build(), ItemGenre.CHEST, ItemType.PELNAZBROJA));


    bases.push(new Base(Stats.builder().obronaBazy(2).zwinnosc(2).build(), ItemGenre.LEGS, ItemType.SZORTY));


    bases.push(new Base(Stats.builder().obronaBazy(5).twardosc(0.01).build(), ItemGenre.LEGS, ItemType.SPODNIE));


    bases.push(new Base(Stats.builder().obronaBazy(1).zwinnosc(-1).wplywy(1).wyglad(2).szczescie(1).build(), ItemGenre.LEGS, ItemType.KILT));


    bases.push(new Base(Stats.builder().obronaBazy(4).zwinnosc(-2).wyglad(3).szczescie(2).build(), ItemGenre.LEGS, ItemType.SPODNICA));




    bases.push(new Base(Stats.builder().wyglad(4).build(), ItemGenre.NECK, ItemType.AMULET));


    bases.push(new Base(Stats.builder().charyzma(-1).wplywy(-1).wyglad(8).build(), ItemGenre.NECK, ItemType.NASZYJNIK));

    bases.push(new Base(Stats.builder().charyzma(1).wplywy(1).wyglad(2).build(), ItemGenre.NECK, ItemType.KRAWAT));

    bases.push(new Base(Stats.builder().charyzma(4).wyglad(3).build(), ItemGenre.NECK, ItemType.APASZKA));

    bases.push(new Base(Stats.builder().charyzma(-1).wplywy(3).build(), ItemGenre.NECK, ItemType.LANCUCH));

    bases.push(new Base(Stats.builder().wyglad(2).build(), ItemGenre.FINGER, ItemType.PIERSCIEN));

    bases.push(new Base(Stats.builder().charyzma(3).wplywy(-2).build(), ItemGenre.FINGER, ItemType.BRANSOLETA));

    bases.push(new Base(Stats.builder().wplywy(2).wyglad(1).build(), ItemGenre.FINGER, ItemType.SYGNET));


    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(4).bazaDpsMin(3).bazaDpsMax(6).atakiNaRunde(1).build(), ItemGenre.WHITE_1H, ItemType.PALKA));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(5).bazaDpsMin(5).bazaDpsMax(6).atakiNaRunde(1).build(), ItemGenre.WHITE_1H, ItemType.NOZ));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(8).bazaDpsMin(7).bazaDpsMax(8).atakiNaRunde(1).build(), ItemGenre.WHITE_1H, ItemType.SZTYLET));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(10).bazaDpsMin(7).bazaDpsMax(10).atakiNaRunde(1).build(), ItemGenre.WHITE_1H, ItemType.RAPIER));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(6).bazaDpsMin(9).bazaDpsMax(12).atakiNaRunde(1).build(), ItemGenre.WHITE_1H, ItemType.MIECZ));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(8).bazaDpsMin(6).bazaDpsMax(25).critMulti(0.10).trafienieProcentowe(0.05).ignoreVsPotwory(0.20).atakiNaRunde(1).build(), ItemGenre.WHITE_1H, ItemType.TOPOR));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-4).bazaDpsMin(2).bazaDpsMax(3).trafienieProcentowe(0.10).atakiNaRunde(2).build(), ItemGenre.WHITE_1H, ItemType.KASTET));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(14).bazaDpsMax(32).critMulti(0.10).atakiNaRunde(1).atakiVsPotwory(2).trafienieProcentowe(0.05).build(), ItemGenre.WHITE_1H, ItemType.KAMA));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-4).bazaDpsMin(10).bazaDpsMax(18).critChanceVsPotwory(0.05).atakiNaRunde(2).ignoreVsPotwory(0.15).build(), ItemGenre.WHITE_1H, ItemType.PIESCNIEBIOS));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(10).bazaDpsMin(22).bazaDpsMax(45).critMulti(0.20).atakiNaRunde(1).atakiVsPotwory(2).trafienieProcentowe(0.05).build(), ItemGenre.WHITE_1H, ItemType.WAKIZASHI));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-4).bazaDpsMin(15).bazaDpsMax(30).critChance(0.07).atakiNaRunde(1).build(), ItemGenre.WHITE_2H, ItemType.MACZUGA));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-8).bazaDpsMin(20).bazaDpsMax(35).critChance(0.08).atakiNaRunde(1).build(), ItemGenre.WHITE_2H, ItemType.LOM));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-12).bazaDpsMin(5).bazaDpsMax(40).critChance(0.09).atakiNaRunde(1).build(), ItemGenre.WHITE_2H, ItemType.PIKA));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-16).bazaDpsMin(20).bazaDpsMax(40).critChance(0.10).atakiNaRunde(1).build(), ItemGenre.WHITE_2H, ItemType.TOPORDWURECZNY));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(30).bazaDpsMax(40).critChance(0.11).atakiNaRunde(1).build(), ItemGenre.WHITE_2H, ItemType.MIECZDWURECZNY));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-24).bazaDpsMin(35).bazaDpsMax(50).critChance(0.12).atakiNaRunde(1).trafienieProcentowe(0.10).dpsVsPotwory(20).build(), ItemGenre.WHITE_2H, ItemType.KOSA));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-22).bazaDpsMin(35).bazaDpsMax(65).critChance(0.13).atakiNaRunde(1).trafienieProcentowe(0.05).critMulti(0.15).build(), ItemGenre.WHITE_2H, ItemType.KORBACZ));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-28).bazaDpsMin(40).bazaDpsMax(55).critChance(0.13).atakiNaRunde(1).trafienieProcentowe(0.05).dpsVsPotwory(40).build(), ItemGenre.WHITE_2H, ItemType.HALABARDA));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-34).bazaDpsMin(40).bazaDpsMax(65).critChance(0.14).atakiNaRunde(1).trafienieProcentowe(0.10).critMulti(0.20).build(), ItemGenre.WHITE_2H, ItemType.KATANA));

    bases.push(new Base(new WeaponStatsBuilder().bazaTrafienie(-40).bazaDpsMin(50).bazaDpsMax(70).critChance(0.15).atakiNaRunde(1).critMulti(0.25).dpsVsPotwory(40).build(), ItemGenre.WHITE_2H, ItemType.PILALANCUCHOWA));



    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(6).bazaDpsMax(12).atakiNaRunde(2).build(), ItemGenre.GUN_1H, ItemType.GLOCK));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(10).bazaDpsMax(16).atakiNaRunde(2).build(), ItemGenre.GUN_1H, ItemType.MAGNUM));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(12).bazaDpsMax(18).atakiNaRunde(2).critChanceGlobal(0.01).critMultiVsPotwory(0.25).trafienieProcentowe(0.05).build(), ItemGenre.GUN_1H, ItemType.DESERT_EAGLE));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(4).bazaDpsMax(9).atakiNaRunde(3).build(), ItemGenre.GUN_1H, ItemType.BERETTA));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(1).bazaDpsMax(15).atakiNaRunde(3).build(), ItemGenre.GUN_1H, ItemType.UZI));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(6).bazaDpsMax(18).atakiNaRunde(3).atakiVsPotwory(2).critChanceGlobal(0.02).trafienieProcentowe(0.10).build(), ItemGenre.GUN_1H, ItemType.MP5K));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(3).bazaDpsMax(12).atakiNaRunde(4).atakiVsPotwory(2).critChance(0.05).trafienieProcentowe(0.05).build(), ItemGenre.GUN_1H, ItemType.SKORPION));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(10).bazaDpsMax(20).atakiNaRunde(2).critChance(0.20).ignore(0.40).spostrzegawczosc(2).build(), ItemGenre.GUN_2H, ItemType.KARABINMYSLIWSKI));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(20).bazaDpsMax(60).atakiNaRunde(3).critChance(0.25).ignoreFlat(0.50).dodatkoweTrafienie(10).build(), ItemGenre.GUN_2H, ItemType.STRZELBA));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(15).bazaDpsMax(25).atakiNaRunde(5).critChance(0.05).build(), ItemGenre.GUN_2H, ItemType.AK47));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(15).bazaDpsMax(50).atakiNaRunde(1).critChance(0.50).critMulti(0.25).ignoreFlat(1.00).bazaTrafienie(-10).twardosc(0.05).build(), ItemGenre.GUN_2H, ItemType.MIOTACZPLOMIENI));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(30).bazaDpsMax(45).obrazeniaPerLevel(1).atakiNaRunde(3).trafienieProcentowe(0.05).critChance(0.05).build(), ItemGenre.GUN_2H, ItemType.FN_FAL));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(15).bazaDpsMax(25).atakiNaRunde(2).atakiVsPotwory(2).critChance(0.25).ignore(0.30).trafienieProcentowe(0.05).build(), ItemGenre.GUN_2H, ItemType.POLAUTOMATSNAJPERSKI));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(80).bazaDpsMax(80).atakiNaRunde(1).atakiVsPotwory(2).critChance(0.50).ignoreFlat(1.00).trafienieProcentowe(0.05).spostrzegawczosc(4).zwinnosc(-5).build(), ItemGenre.GUN_2H, ItemType.KARABINSNAJPERSKI));



    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(18).bazaDpsMax(22).atakiNaRunde(2).bazaTrafienie(3).build(), ItemGenre.RANGE_1H, ItemType.KROTKILUK));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(22).bazaDpsMax(26).atakiNaRunde(3).bazaTrafienie(-5).build(), ItemGenre.RANGE_1H, ItemType.LUK));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(27).bazaDpsMax(42).atakiNaRunde(2).build(), ItemGenre.RANGE_2H, ItemType.DLUGILUK));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(30).bazaDpsMax(50).atakiNaRunde(2).build(), ItemGenre.RANGE_2H, ItemType.OSZCZEP));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(45).bazaDpsMax(60).atakiNaRunde(2).trafienieProcentowe(0.05).build(), ItemGenre.RANGE_2H, ItemType.PILUM));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(14).bazaDpsMax(18).atakiNaRunde(3).ignoreVsPotwory(0.15).critChanceVsPotwory(0.15).critMultiVsPotwory(0.20).bazaTrafienie(5).trafienieProcentowe(0.10).build(), ItemGenre.RANGE_1H, ItemType.NOZDORZUCANIA));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(18).bazaDpsMax(24).atakiNaRunde(4).ignoreVsPotwory(0.10).critChanceVsPotwory(0.15).critMultiVsPotwory(0.30).trafienieProcentowe(0.10).build(), ItemGenre.RANGE_1H, ItemType.TOPOREKDORZUCANIA));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(20).bazaDpsMax(40).atakiNaRunde(2).ignore(0.15).critChance(0.08).critChanceVsPotwory(0.10).critMultiVsPotwory(0.25).trafienieProcentowe(0.05).build(), ItemGenre.RANGE_2H, ItemType.KUSZA));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(10).bazaDpsMax(13).dpsVsPotwory(15).atakiNaRunde(5).critChanceVsPotwory(0.18).critMultiVsPotwory(0.30).bazaTrafienie(7).trafienieProcentowe(0.10).build(), ItemGenre.RANGE_1H, ItemType.SHURIKEN));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(30).bazaDpsMax(70).atakiNaRunde(2).critChance(0.12).ignore(0.20).critChanceVsPotwory(0.10).critMultiVsPotwory(0.50).bazaTrafienie(-10).trafienieProcentowe(0.05).build(), ItemGenre.RANGE_2H, ItemType.CIEZKAKUSZA));

    bases.push(new Base(new WeaponStatsBuilder().bazaDpsMin(45).bazaDpsMax(55).atakiNaRunde(3).atakiVsPotwory(2).critMultiVsPotwory(0.35).trafienieProcentowe(0.05).build(), ItemGenre.RANGE_2H, ItemType.LUKREFLEKSYJNY));
  }
}
