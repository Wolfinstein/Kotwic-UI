import { Prefix, Suffix, Stats, ItemGenre, ItemRarity, PrefixType, SuffixType } from '../item';
import { WeaponStatsBuilder } from '../item/WeaponStats';
export class WeaponDictionary {
  static getWeaponPrefix(
    genre: ItemGenre,
    prefixType: PrefixType
  ): Prefix {
    const prefixes = this.initializePrefixes();
    const found = prefixes.find(
      (p) => p.genre === genre && p.prefixType === prefixType 
    );
    if (!found) {
      throw new Error(
        `Weapon prefix not found for genre: ${genre}, type: ${prefixType}`
      );
    }
    return found;
  }
  static getWeaponSuffix(
    genre: ItemGenre,
    suffixType: SuffixType
  ): Suffix {
    const suffixes = this.initializeSuffixes();
    const found = suffixes.find(
      (s) => s.genre === genre && s.suffixType === suffixType
    );
    if (!found) {
      throw new Error(
        `Weapon suffix not found for genre: ${genre}, type: ${suffixType}`
      );
    }
    return found;
  }
  private static initializePrefixes(): Prefix[] {
    const prefixes: Prefix[] = [];
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.OSTRY, new WeaponStatsBuilder().dpsBroniMin(2).dpsBroniMax(2).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.KASAJACY, new WeaponStatsBuilder().critChance(0.01).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.OKRUTNY, new WeaponStatsBuilder().dpsBroniMin(5).dpsBroniMax(5).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.KRYSZTALOWY, new WeaponStatsBuilder().dpsAll(6).wyglad(3).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.PRZYJACIELSKI, new WeaponStatsBuilder().charyzma(3).wplywy(2).bazoweHp(0.07).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.JADOWITY, new WeaponStatsBuilder().critChance(0.03).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.LEKKI, new WeaponStatsBuilder().zwinnosc(5).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.ZEBATY, new WeaponStatsBuilder().dpsBroniMin(8).dpsBroniMax(8).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.WZMACNIAJACY, new WeaponStatsBuilder().bazoweHp(.10).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.OPIEKUNCZY, new WeaponStatsBuilder().bazoweHp(.15).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.MISTYCZNY, new WeaponStatsBuilder().dpsAll(5).inteligencja(2).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.SWIECACY, new WeaponStatsBuilder().spostrzegawczosc(2).odpornosc(2).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.KOSCIANY, new WeaponStatsBuilder().pktKrwi(0.05).odpornosc(2).dpsAll(-4).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.ZATRUTY, new WeaponStatsBuilder().critChance(0.05).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.ANTYCZNY, new WeaponStatsBuilder().dpsBroniMin(5).dpsBroniMax(5).zwinnosc(10).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.ZABOJCZY, new WeaponStatsBuilder().dpsBroniMin(12).dpsBroniMax(12).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.ZWINNY, new WeaponStatsBuilder().atakiVsPotwory(1).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.PRZEKLETY, new WeaponStatsBuilder().dpsBroniMin(30).dpsBroniMax(30).obrazeniaPerLevel(2).bazoweHp(-0.10).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.SZYBKI, new WeaponStatsBuilder().atakiVsPotwory(2).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_1H, PrefixType.DEMONICZNY, new WeaponStatsBuilder().obrazeniaPerLevel(2).zwinnosc(10).build()));

    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.OSTRY, new WeaponStatsBuilder().dpsBroniMin(2).dpsBroniMax(2).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.KASAJACY, new WeaponStatsBuilder().critChance(0.05).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.KOSZTOWNY, new WeaponStatsBuilder().wplywy(4).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.WZMACNIAJACY, new WeaponStatsBuilder().bazoweHp(0.15).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.LEKKI, new WeaponStatsBuilder().zwinnosc(7).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.OKRUTNY, new WeaponStatsBuilder().dpsBroniMin(7).dpsBroniMax(7).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.JADOWITY, new WeaponStatsBuilder().critChance(0.10).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.SWIECACY, new WeaponStatsBuilder().odpornosc(4).spostrzegawczosc(3).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.KRYSZTALOWY, new WeaponStatsBuilder().charyzma(4).wplywy(3).bazoweHp(0.09).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.CIEZKI, new WeaponStatsBuilder().dpsBroniMin(15).dpsBroniMax(15).bazaTrafienie(-5).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.SZEROKI, new WeaponStatsBuilder().dpsBroniMin(8).dpsBroniMax(8).bazaTrafienie(8).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.OPIEKUNCZY, new WeaponStatsBuilder().bazoweHp(0.20).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.MISTYCZNY, new WeaponStatsBuilder().inteligencja(4).dpsBroniMin(9).dpsBroniMax(9).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.NAPROMIENIOWANY, new WeaponStatsBuilder().odpornosc(-10).critChance(0.10).pktKrwi(-0.05).sila(3).dpsBroniMin(10).dpsBroniMax(10).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.ANTYCZNY, new WeaponStatsBuilder().dpsBroniMin(7).dpsBroniMax(7).zwinnosc(15).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.ZEBATY, new WeaponStatsBuilder().critChance(0.03).dpsBroniMin(13).dpsBroniMax(13).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.ZATRUTY, new WeaponStatsBuilder().critChance(0.15).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.ZABOJCZY, new WeaponStatsBuilder().critChance(0.05).ignore(0.20).dpsBroniMin(17).dpsBroniMax(17).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.PRZEKLETY, new WeaponStatsBuilder().dpsBroniMin(2).obrazeniaPerLevel(2).ignore(0.07).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.ZWINNY, new WeaponStatsBuilder().atakiVsPotwory(3).build()));
    prefixes.push(new Prefix(ItemGenre.WHITE_2H, PrefixType.DEMONICZNY, new WeaponStatsBuilder().obrazeniaPerLevel(2).zwinnosc(13).ignore(0.10).build()));
    return prefixes;
  }
  private static initializeSuffixes(): Suffix[] {
    const suffixes: Suffix[] = [];
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.SEKTY, new WeaponStatsBuilder().charyzma(-3).wplywy(2).dodatkoweTrafienie(5).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.ZDOBYWCY, new WeaponStatsBuilder().wplywy(3).wiedza(2).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.MOCY, new WeaponStatsBuilder().dpsBroniMin(5).dpsBroniMax(5).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.DOWODCY, new WeaponStatsBuilder().charyzma(3).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.ZWINNOSCI, new WeaponStatsBuilder().zwinnosc(3).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.TRAFIENIA, new WeaponStatsBuilder().zwinnosc(5).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.KONTUZJI, new WeaponStatsBuilder().wiedza(3).zwinnosc(-5).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.WLADZY, new WeaponStatsBuilder().charyzma(5).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.BOLU, new WeaponStatsBuilder().zwinnosc(-5).dpsBroniMin(10).dpsBroniMax(10).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.ODWAGI, new WeaponStatsBuilder().charyzma(3).zwinnosc(4).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.PRECYZJI, new WeaponStatsBuilder().zwinnosc(8).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.KRWI, new WeaponStatsBuilder().pktKrwi(-0.10).dpsBroniMax(8).dpsBroniMin(8).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.PRZODKOW, new WeaponStatsBuilder().charyzma(8).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.ZARAZY, new WeaponStatsBuilder().dodatkowaObrona(-8).dpsBroniMin(10).dpsBroniMax(10).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.DRAKULI, new WeaponStatsBuilder().dpsBroniMax(8).dpsBroniMin(8).pktKrwi(0.05).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.ZEMSTY, new WeaponStatsBuilder().dpsBroniMin(20).dpsBroniMax(10).isObronaZero(true).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.MESTWA, new WeaponStatsBuilder().charyzma(6).zwinnosc(7).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.KLANU, new WeaponStatsBuilder().charyzma(2).wplywy(3).spostrzegawczosc(1).odpornosc(2).szczescie(2).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.PODKOWY, new WeaponStatsBuilder().bazoweHp(0.05).szczescie(4).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.BIEGLOSCI, new WeaponStatsBuilder().zwinnosc(12).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.SAMOBOJCY, new WeaponStatsBuilder().zwinnosc(6).dpsBroniMax(4).isObronaZero(true).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_1H, SuffixType.IMPERATORA, new WeaponStatsBuilder().zwinnosc(10).charyzma(7).build()));

    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.PODSTEPU, new WeaponStatsBuilder().dpsBroniMin(-4).wplywy(3).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.HAZARDZISTY, new WeaponStatsBuilder().dpsBroniMin(-4).wplywy(5).dpsBroniMax(4).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.OLOWIU, new WeaponStatsBuilder().odpornosc(3).dpsBroniMax(6).dpsBroniMin(6).bazaTrafienie(-10).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.MOCY, new WeaponStatsBuilder().dpsBroniMax(9).dpsBroniMin(9).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.ZDRADY, new WeaponStatsBuilder().dpsBroniMax(9).dpsBroniMin(9).wplywy(3).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.WLADZY, new WeaponStatsBuilder().charyzma(9).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.ZDOBYWCY, new WeaponStatsBuilder().wplywy(3).wiedza(2).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.BOLU, new WeaponStatsBuilder().dpsBroniMax(17).dpsBroniMin(17).zwinnosc(-5).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.KRWIOPIJCY, new WeaponStatsBuilder().sila(2).odpornosc(2).bazoweHp(0.08).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.INKWIZYTORA, new WeaponStatsBuilder().wplywy(9).dpsBroniMax(8).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.KRWI, new WeaponStatsBuilder().pktKrwi(-0.20).dpsBroniMax(14).dpsBroniMin(14).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.DRAKULI, new WeaponStatsBuilder().pktKrwi(0.10).dpsBroniMax(18).dpsBroniMin(18).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.ZARAZY, new WeaponStatsBuilder().dodatkowaObrona(-12).dpsBroniMax(22).dpsBroniMin(18).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.ZEMSTY, new WeaponStatsBuilder().isObronaZero(true).dpsBroniMax(27).dpsBroniMin(27).critMulti(0.25).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.PODKOWY, new WeaponStatsBuilder().szczescie(5).bazoweHp(0.05).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.BAZYLISZKA, new WeaponStatsBuilder().zwinnosc(2).critChance(0.05).wplywy(10).dpsBroniMax(20).dpsBroniMin(20).critMulti(0.10).ignore(0.10).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.AUTOKRATY, new WeaponStatsBuilder().zwinnosc(2).critChance(0.03).wplywy(7).dpsBroniMax(33).dpsBroniMin(20).critMulti(0.15).ignore(0.10).build()));
    suffixes.push(new Suffix(ItemGenre.WHITE_2H, SuffixType.SAMOBOJCY, new WeaponStatsBuilder().zwinnosc(12).dpsBroniMax(8).isObronaZero(true).critMulti(0.35).build()));

    suffixes.push(new Suffix(ItemGenre.RANGE_1H, SuffixType.DALEKIEGOZASIEGU, new WeaponStatsBuilder().sila(2).dodatkoweTrafienie(10).dpsBroniMin(8).dpsBroniMax(8).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_2H, SuffixType.DALEKIEGOZASIEGU, new WeaponStatsBuilder().sila(2).dodatkoweTrafienie(10).dpsBroniMin(8).dpsBroniMax(8).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_2H, SuffixType.PRECYZJI, new WeaponStatsBuilder().zwinnosc(8).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_1H, SuffixType.PRECYZJI, new WeaponStatsBuilder().zwinnosc(8).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_1H, SuffixType.DRIADY, new WeaponStatsBuilder().wplywy(5).spostrzegawczosc(4).zwinnosc(6).odpornosc(-4).dodatkoweTrafienie(8).dpsBroniMin(6).dpsBroniMax(6).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_2H, SuffixType.DRIADY, new WeaponStatsBuilder().wplywy(5).spostrzegawczosc(4).zwinnosc(6).odpornosc(-4).dodatkoweTrafienie(8).dpsBroniMin(6).dpsBroniMax(6).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_2H, SuffixType.ZEMSTY, new WeaponStatsBuilder().isObronaZero(true).dpsBroniMin(15).dpsBroniMax(15).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_1H, SuffixType.ZEMSTY, new WeaponStatsBuilder().isObronaZero(true).dpsBroniMin(15).dpsBroniMax(15).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_2H, SuffixType.SZYBKOSTRZELNOSCI, new WeaponStatsBuilder().atakiNaRunde(1).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_1H, SuffixType.SZYBKOSTRZELNOSCI, new WeaponStatsBuilder().atakiNaRunde(1).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_1H, SuffixType.WILKA, new WeaponStatsBuilder().zwinnosc(7).spostrzegawczosc(7).odpornosc(5).dodatkoweTrafienie(15).dpsBroniMin(6).dpsBroniMax(6).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_2H, SuffixType.WILKA, new WeaponStatsBuilder().zwinnosc(7).spostrzegawczosc(7).odpornosc(5).dodatkoweTrafienie(15).dpsBroniMin(6).dpsBroniMax(6).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_2H, SuffixType.DOSKONALOSCI, new WeaponStatsBuilder().szczescie(5).dodatkoweTrafienie(10).dpsBroniMin(10).dpsBroniMax(10).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_1H, SuffixType.DOSKONALOSCI, new WeaponStatsBuilder().szczescie(5).dodatkoweTrafienie(10).dpsBroniMin(10).dpsBroniMax(10).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_1H, SuffixType.REAKCJI, new WeaponStatsBuilder().spostrzegawczosc(4).zwinnosc(5).dodatkoweTrafienie(6).critChance(0.08).dpsBroniMin(8).dpsBroniMax(8).build()));
    suffixes.push(new Suffix(ItemGenre.RANGE_2H, SuffixType.REAKCJI, new WeaponStatsBuilder().spostrzegawczosc(4).zwinnosc(5).dodatkoweTrafienie(6).critChance(0.08).dpsBroniMin(8).dpsBroniMax(8).build()));
    return suffixes;
  }
}