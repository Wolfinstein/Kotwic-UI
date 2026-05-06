import { Prefix, Suffix, Stats, ItemGenre, PrefixType, SuffixType } from '../item';
export class JewelsDictionary {
  static getJewelPrefix(
    genre: ItemGenre,
    prefixType: PrefixType
  ): Prefix {
    const prefixes = this.initializePrefixes();
    const found = prefixes.find(
      (p) => p.genre === genre && p.prefixType === prefixType
    );
    if (!found) {
      throw new Error(
        `Jewel prefix not found for genre: ${genre}, type: ${prefixType}`
      );
    }
    return found;
  }
  static getJewelSuffix(
    genre: ItemGenre,
    suffixType: SuffixType
  ): Suffix {
    const suffixes = this.initializeSuffixes();
    const found = suffixes.find(
      (s) => s.genre === genre && s.suffixType === suffixType
    );
    if (!found) {
      throw new Error(
        `Jewel suffix not found for genre: ${genre}, type: ${suffixType}`
      );
    }
    return found;
  }
  private static initializePrefixes(): Prefix[] {
    const prefixes: Prefix[] = [];
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.MIEDZIANY, Stats.builder().wyglad(2).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.SREBRNY, Stats.builder().wyglad(3).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.SZMARAGDOWY, Stats.builder().wyglad(1).charyzma(2).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.ZLOTY, Stats.builder().wyglad(5).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.PLATYNOWY, Stats.builder().wyglad(7).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.RUBINOWY, Stats.builder().wyglad(4).charyzma(3).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.DYSTYNGOWANY, Stats.builder().punktyKrwi(-0.10).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.PRZEBIEGLY, Stats.builder().punktyKrwi(-0.10).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.NIEDZWIEDZI, Stats.builder().punktyKrwi(-0.10).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.TWARDY, Stats.builder().punktyKrwi(-0.10).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.GWIEZDNY, Stats.builder().punktyKrwi(-0.10).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.ELASTYCZNY, Stats.builder().punktyKrwi(-0.10).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.KARDYNALSKI, Stats.builder().punktyKrwi(-0.10).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.NEKROMANCKI, Stats.builder().punktyKrwi(-0.10).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.PLASTIKOWY, Stats.builder().wyglad(2).charyzma(3).wplywy(-4).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.TYTANOWY, Stats.builder().sila(3).charyzma(4).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.DIAMENTOWY, Stats.builder().charyzma(6).wyglad(5).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.MSCIWY, Stats.builder().wyglad(-3).wplywy(6).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.SPACZONY, Stats.builder().charyzma(4).wplywy(3).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.ZDRADZIECKI, Stats.builder().wyglad(-5).wplywy(8).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.ARCHAICZNY, Stats.builder().punktyKrwi(-0.20).szczescie(5).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.HIPNOTYCZNY, Stats.builder().punktyKrwi(-0.20).szczescie(5).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.TANCZACY, Stats.builder().punktyKrwi(-0.20).szczescie(5).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.ZWIERZECY, Stats.builder().punktyKrwi(-0.20).szczescie(5).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.JASTRZEBI, Stats.builder().spostrzegawczosc(4).wplywy(3).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.PAJECZY, Stats.builder().zwinnosc(4).odpornosc(3).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.SLONECZNY, Stats.builder().spostrzegawczosc(3).wyglad(3).build()));
    prefixes.push(new Prefix(ItemGenre.NECK, PrefixType.CZARNY, Stats.builder().wyglad(-5 - 3).wplywy(12).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.MIEDZIANY, Stats.builder().wyglad(1).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.SZMARAGDOWY, Stats.builder().wyglad(1).charyzma(1).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.SREBRNY, Stats.builder().wyglad(2).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.RUBINOWY, Stats.builder().wyglad(3).charyzma(3).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.ZLOTY, Stats.builder().wyglad(4).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.PLATYNOWY, Stats.builder().wyglad(6).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.DYSTYNGOWANY, Stats.builder().punktyKrwi(-0.05).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.PRZEBIEGLY, Stats.builder().punktyKrwi(-0.05).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.NIEDZWIEDZI, Stats.builder().punktyKrwi(-0.05).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.TWARDY, Stats.builder().punktyKrwi(-0.05).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.GWIEZDNY, Stats.builder().punktyKrwi(-0.05).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.ELASTYCZNY, Stats.builder().punktyKrwi(-0.05).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.KARDYNALSKI, Stats.builder().punktyKrwi(-0.05).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.NEKROMANCKI, Stats.builder().punktyKrwi(-0.05).szczescie(2).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.PLASTIKOWY, Stats.builder().wyglad(2).charyzma(2).wplywy(-3).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.TYTANOWY, Stats.builder().sila(2).charyzma(2).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.DIAMENTOWY, Stats.builder().charyzma(5).wyglad(5).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.MSCIWY, Stats.builder().wyglad(-3).wplywy(5).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.SPACZONY, Stats.builder().charyzma(3).wplywy(3).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.ZDRADZIECKI, Stats.builder().wyglad(-3 - 2).wplywy(7).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.ARCHAICZNY, Stats.builder().punktyKrwi(-0.10).szczescie(5).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.HIPNOTYCZNY, Stats.builder().punktyKrwi(-0.10).szczescie(5).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.TANCZACY, Stats.builder().punktyKrwi(-0.10).szczescie(5).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.ZWIERZECY, Stats.builder().punktyKrwi(-0.10).szczescie(5).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.PAJECZY, Stats.builder().odpornosc(4).zwinnosc(3).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.SLONECZNY, Stats.builder().spostrzegawczosc(2).wyglad(4).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.JASTRZEBI, Stats.builder().spostrzegawczosc(3).wplywy(3).build()));
    prefixes.push(new Prefix(ItemGenre.FINGER, PrefixType.CZARNY, Stats.builder().wyglad(-3 - 5).wplywy(10).build()));
    return prefixes;
  }
  private static initializeSuffixes(): Suffix[] {
    const suffixes: Suffix[] = [];
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.URODY, Stats.builder().wyglad(3).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.WLADZY, Stats.builder().charyzma(3).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.WYSTEPKU, Stats.builder().wplywy(5).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.MLODOSCI, Stats.builder().wplywy(2).wyglad(2).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.SILY, Stats.builder().sila(3).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.GENIUSZU, Stats.builder().inteligencja(3).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.MADROSCI, Stats.builder().wiedza(3).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.TWARDEJSKORY, Stats.builder().odpornosc(5).zwinnosc(-1).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.PIELGRZYMA, Stats.builder().odpornosc(3).wiedza(2).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.CELNOSCI, Stats.builder().zwinnosc(3).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.PRZEBIEGLOSCI, Stats.builder().charyzma(4).wplywy(2).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.SZTUKI, Stats.builder().wplywy(-9).inteligencja(3).szczescie(8).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.WILKOLAKA, Stats.builder().redukcjaObrazen(0.03).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.SZALENCA, Stats.builder().wplywy(3).wiedza(2).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.KONCENTRACJI, Stats.builder().wiedza(4).inteligencja(4).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.LEWITACJI, Stats.builder().sila(4).zwinnosc(4).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.KRWI, Stats.builder().punktyKrwi(0.10).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.ZDOLNOSCI, Stats.builder().trafienieBiala(1).trafienieDystans(1).trafieniePalna(1).wyglad(1).charyzma(1).wplywy(1).spostrzegawczosc(1).odpornosc(1).inteligencja(1).wiedza(1).szczescie(1).build()));
    suffixes.push(new Suffix(ItemGenre.NECK, SuffixType.SZCZESCIA, Stats.builder().szczescie(10).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.URODY, Stats.builder().wyglad(2).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.WLADZY, Stats.builder().charyzma(2).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.WYSTEPKU, Stats.builder().wplywy(3).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.SILY, Stats.builder().sila(2).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.GENIUSZU, Stats.builder().inteligencja(2).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.MADROSCI, Stats.builder().wiedza(2).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.LISA, Stats.builder().wiedza(2).wplywy(3).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.TWARDEJSKORY, Stats.builder().zwinnosc(-1).odpornosc(3).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.SZTUKI, Stats.builder().wplywy(4).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.MLODOSCI, Stats.builder().zwinnosc(2).sila(3).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.CELNOSCI, Stats.builder().zwinnosc(2).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.PRZEBIEGLOSCI, Stats.builder().wplywy(3).charyzma(3).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.WILKOLAKA, Stats.builder().redukcjaObrazen(0.02).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.KONCENTRACJI, Stats.builder().inteligencja(3).wiedza(3).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.LEWITACJI, Stats.builder().sila(3).zwinnosc(3).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.NIETOPERZA, Stats.builder().wyglad(-13).spostrzegawczosc(3).zwinnosc(3).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.KRWI, Stats.builder().punktyKrwi(0.05).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.SZALENCA, Stats.builder().szczescie(5).inteligencja(4).wplywy(-6).build()));
    suffixes.push(new Suffix(ItemGenre.FINGER, SuffixType.SZCZESCIA, Stats.builder().szczescie(5).build()));
    return suffixes;
  }
}
