import { Prefix, Suffix, Stats, ItemGenre, PrefixType, SuffixType, ItemType } from '../item';

export class ArmourDictionary {
  private static legsInneCache: Prefix[] | null = null;
  private static armourPrefixCache: Prefix[] | null = null;
  private static armourSuffixCache: Suffix[] | null = null;

  static getLegsPrefix(
    genre: ItemGenre,
    itemType: string,
    prefixType: PrefixType
  ): Prefix {
    const list = this.initializeLegsPrefix();;

    const found = list.find(
      (p) => p.genre === genre && p.prefixType === prefixType
    );

    if (!found) {
      throw new Error(
        `Armour legs prefix not found for type: ${prefixType}`
      );
    }

    return found;
  }

  static getArmourPrefix(
    genre: ItemGenre,
    prefixType: PrefixType
  ): Prefix {
    const prefixes = this.initializeArmourPrefix();
    const found = prefixes.find(
      (p) => p.genre === genre && p.prefixType === prefixType
    );

    if (!found) {
      throw new Error(
        `Armour prefix not found for genre: ${genre}, type: ${prefixType}`
      );
    }

    return found;
  }

  static getArmourSuffix(
    genre: ItemGenre,
    suffixType: SuffixType,
    playerLvl: number
  ): Suffix {
    const suffixes = this.initializeArmourSuffix(playerLvl);
    const found = suffixes.find(
      (s) => s.genre === genre && s.suffixType === suffixType
    );

    if (!found) {
      throw new Error(
        `Armour suffix not found for genre: ${genre}, type: ${suffixType}`
      );
    }

    return found;
  }

  private static initializeLegsPrefix(): Prefix[] {
    if (this.legsInneCache) {
      return this.legsInneCache;
    }

    const inne: Prefix[] = [];


    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.PIKOWANY, Stats.builder().obronaAffixu(3).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.WZMOCNIONY, Stats.builder().obronaAffixu(5).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.CWIEKOWANY, Stats.builder().obronaAffixu(7).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.LEKKI, Stats.builder().zwinnosc(2).obronaAffixu(2).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.KROTKIE, Stats.builder().zwinnosc(2).obronaAffixu(-1).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.AKSAMITNE, Stats.builder().wyglad(2).obronaAffixu(-6).wplywy(3).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.KOLCZE, Stats.builder().obronaAffixu(10).zwinnosc(-3).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.KULOODPORNE, Stats.builder().odpornosc(4).twardosc(0.01).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.GIETKI, Stats.builder().zwinnosc(4).obronaAffixu(-1).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.PANCERNE, Stats.builder().obronaAffixu(14).twardosc(0.01).zwinnosc(-5).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.KOMPOZYTOWE, Stats.builder().obronaAffixu(15).twardosc(0.01).zwinnosc(-4).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.ELFIE, Stats.builder().zwinnosc(6).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.RUNICZNE, Stats.builder().szczescie(5).obronaAffixu(10).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.SZAMANSKA, Stats.builder().punktyKrwi(0.05).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.TYGRYSI, Stats.builder().odpornosc(2).obronaAffixu(-3).zwinnosc(4).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.KRWAWY, Stats.builder().critMultiBiala1h(0.07).critMultiBiala2h(0.07).critMultiPalna1h(0.07).critMultiPalna2h(0.07).critMultiDystans1h(0.07).critMultiDystans2h(0.07).build()));
    inne.push(new Prefix(ItemGenre.LEGS, PrefixType.SMIERCIONOSNY, Stats.builder().odpornosc(-4).minDpsBiala2h(3).minDpsDystans1h(3).minDpsDystans2h(3).minDpsPalna1h(3).minDpsPalna2h(3).minDpsBiala1h(3).maxDpsBiala2h(3).maxDpsDystans1h(3).maxDpsDystans2h(3).maxDpsPalna1h(3).maxDpsPalna2h(3).maxDpsBiala1h(3).build()));

    this.legsInneCache = inne;

    return inne;
  }

  private static initializeArmourPrefix(): Prefix[] {
    if (this.armourPrefixCache) return this.armourPrefixCache;

    const prefixes: Prefix[] = [];


    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.OZDOBNA, Stats.builder().obronaAffixu(-2).wyglad(3).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.UTWARDZANA, Stats.builder().obronaAffixu(2).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.ELEGANCKA, Stats.builder().wyglad(5).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.POMOCNA, Stats.builder().obronaAffixu(3).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.KOSZTOWNY, Stats.builder().wyglad(8).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.WZMOCNIONY, Stats.builder().obronaAffixu(5).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.MAGNETYCZNA, Stats.builder().inteligencja(2).wiedza(-4).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.ROGATA, Stats.builder().minDpsBiala2h(5).minDpsDystans1h(5).minDpsDystans2h(5).minDpsPalna1h(5).minDpsPalna2h(5).minDpsBiala1h(5).maxDpsBiala2h(5).maxDpsDystans1h(5).maxDpsDystans2h(5).maxDpsPalna1h(5).maxDpsPalna2h(5).maxDpsBiala1h(5).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.BOJOWA, Stats.builder().obronaAffixu(10).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.ZLOSLIWA, Stats.builder().szczescie(5).punktyKrwi(0.05).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.LENIWA, Stats.builder().zwinnosc(-5).odpornosc(4).obronaAffixu(7).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.KULOODPORNE, Stats.builder().obronaAffixu(6).odpornosc(3).twardosc(0.01).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.SZTURMOWY, Stats.builder().obronaAffixu(12).twardosc(0.01).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.SZAMANSKA, Stats.builder().punktyKrwi(0.10).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.RUNICZNE, Stats.builder().szczescie(5).obronaAffixu(10).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.KRWAWY, Stats.builder().critMultiBiala1h(0.07).critMultiBiala2h(0.07).critMultiPalna1h(0.07).critMultiPalna2h(0.07).critMultiDystans1h(0.07).critMultiDystans2h(0.07).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.TYGRYSI, Stats.builder().zwinnosc(3).odpornosc(2).obronaAffixu(-8).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.SMIERCIONOSNY, Stats.builder().odpornosc(-5).minDpsBiala2h(4).minDpsDystans1h(4).minDpsDystans2h(4).minDpsPalna1h(4).minDpsPalna2h(4).minDpsBiala1h(4).maxDpsBiala2h(4).maxDpsDystans1h(4).maxDpsDystans2h(4).maxDpsPalna1h(4).maxDpsPalna2h(4).maxDpsBiala1h(4).build()));
    prefixes.push(new Prefix(ItemGenre.HEAD, PrefixType.RYTUALNY, Stats.builder().punktyKrwi(0.05).szczescie(15).build()));


    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.WZMOCNIONY, Stats.builder().obronaAffixu(3).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.WLADCZA, Stats.builder().charyzma(3).wyglad(1).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.CWIEKOWANY, Stats.builder().obronaAffixu(5).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.LEKKI, Stats.builder().zwinnosc(3).obronaAffixu(-1).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.KULOODPORNE, Stats.builder().odpornosc(5).twardosc(0.01).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.LUSKOWA, Stats.builder().obronaAffixu(8).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.GIETKI, Stats.builder().zwinnosc(6).obronaAffixu(-2).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.PLYTOWA, Stats.builder().obronaAffixu(12).twardosc(0.02).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.SZAMANSKA, Stats.builder().punktyKrwi(0.05).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.LOWIECKA, Stats.builder().spostrzegawczosc(6).wiedza(4).critMultiPalna1h(-0.24).critMultiPalna2h(-0.24).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.ELFIE, Stats.builder().zwinnosc(8).obronaAffixu(-1).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.BOJOWA, Stats.builder().szczescie(5).obronaAffixu(5).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.TYGRYSI, Stats.builder().zwinnosc(6).obronaAffixu(-4).odpornosc(3).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.SMIERCIONOSNY, Stats.builder().odpornosc(-12).minDpsBiala2h(6).minDpsDystans1h(6).minDpsDystans2h(6).minDpsPalna1h(6).minDpsPalna2h(6).minDpsBiala1h(6).maxDpsBiala2h(6).maxDpsDystans1h(6).maxDpsDystans2h(6).maxDpsPalna1h(6).maxDpsPalna2h(6).maxDpsBiala1h(6).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.KRWAWY, Stats.builder().critMultiBiala1h(0.07).critMultiBiala2h(0.07).critMultiPalna1h(0.07).critMultiPalna2h(0.07).critMultiDystans1h(0.07).critMultiDystans2h(0.07).build()));
    prefixes.push(new Prefix(ItemGenre.CHEST, PrefixType.RUNICZNE, Stats.builder().twardosc(0.01).obronaAffixu(15).szczescie(5).build()));

    this.armourPrefixCache = prefixes;
    return prefixes;
  }

  private static initializeArmourSuffix(playerLvl: number): Suffix[] {
    if (this.armourSuffixCache) return this.armourSuffixCache;

    const suffixes: Suffix[] = [];


    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.MISS, Stats.builder().sila(1).zwinnosc(1).odpornosc(1).wyglad(8).charyzma(1).wplywy(1).spostrzegawczosc(1).inteligencja(1).wiedza(1).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.MISTERA, Stats.builder().sila(1).zwinnosc(1).odpornosc(1).wyglad(8).charyzma(1).wplywy(1).spostrzegawczosc(1).inteligencja(1).wiedza(1).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.PODROZNIKA, Stats.builder().obronaAffixu(2).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.PRZEZORNOSCI, Stats.builder().spostrzegawczosc(2).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.WYTRZYMALOSCI, Stats.builder().obronaAffixu(4).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.OCHRONY, Stats.builder().obronaAffixu(6).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.ZMYSLOW, Stats.builder().spostrzegawczosc(4).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.NARKOMANA, Stats.builder().odpornosc(4).inteligencja(-6).wyglad(-5).sila(-5).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.GLADIATORA, Stats.builder().obronaAffixu(7).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.WIESZCZA, Stats.builder().spostrzegawczosc(6).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.SMOCZEJ_LUSKI, Stats.builder().obronaAffixu(9).twardosc(0.01).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.MOCY, Stats.builder().obronaAffixu(10).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.KARY, Stats.builder().build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.PASTERZA, Stats.builder().spostrzegawczosc(7).odpornosc(-4).obronaAffixu(-4).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.KRWI, Stats.builder().punktyKrwi(-0.10).obronaAffixu(0.1).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.MAGII, Stats.builder().punktyKrwi(-0.07).obronaAffixu(0.1).twardosc(0.01).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.ADRENALINY, Stats.builder().sila(4).spostrzegawczosc(-5).zwinnosc(3).build()));
    suffixes.push(new Suffix(ItemGenre.HEAD, SuffixType.PREKOGNICJI, Stats.builder().spostrzegawczosc(10).build()));


    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.NARKOMANA, Stats.builder().sila(-1).wyglad(-2).zwinnosc(-1).inteligencja(-3).odpornosc(3).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.ZLODZIEJA, Stats.builder().zwinnosc(3).obronaAffixu(2).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.STRAZNIKA, Stats.builder().obronaAffixu(3).minDpsBiala2h(2).minDpsBiala1h(2).minDpsDystans1h(2).minDpsDystans2h(2).minDpsPalna2h(2).minDpsPalna1h(2).maxDpsBiala2h(2).maxDpsBiala1h(2).maxDpsDystans1h(2).maxDpsDystans2h(2).maxDpsPalna2h(2).maxDpsPalna1h(2).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.SILACZA, Stats.builder().sila(8).zwinnosc(-6).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.GWARDZISTY, Stats.builder().obronaAffixu(5).minDpsBiala2h(5).minDpsBiala1h(5).minDpsDystans1h(5).minDpsDystans2h(5).minDpsPalna2h(5).minDpsPalna1h(5).maxDpsBiala2h(5).maxDpsBiala1h(5).maxDpsDystans1h(5).maxDpsDystans2h(5).maxDpsPalna2h(5).maxDpsPalna1h(5).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.ADEPTA, Stats.builder().mnoznikObrony(0.25).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.ADRENALINY, Stats.builder().zwinnosc(5).spostrzegawczosc(-8).sila(4).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.SKORUPYZOLWIA, Stats.builder().zwinnosc(-5).odpornosc(4).twardosc(0.01).obronaAffixu(14).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.ZABOJCY, Stats.builder().obronaAffixu(4).zwinnosc(4).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.KOBRY, Stats.builder().obronaAffixu(2).zwinnosc(5).minDpsBiala2h(5).minDpsBiala1h(5).minDpsDystans1h(5).minDpsDystans2h(5).minDpsPalna2h(5).minDpsPalna1h(5).maxDpsBiala2h(5).maxDpsBiala1h(5).maxDpsDystans1h(5).maxDpsDystans2h(5).maxDpsPalna2h(5).maxDpsPalna1h(5).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.UNIKOW, Stats.builder().obronaAffixu(10).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.CENTURIONA, Stats.builder().obronaAffixu(10).minDpsBiala2h(8).minDpsBiala1h(8).minDpsDystans1h(8).minDpsDystans2h(8).minDpsPalna2h(8).minDpsPalna1h(8).maxDpsBiala2h(8).maxDpsBiala1h(8).maxDpsDystans1h(8).maxDpsDystans2h(8).maxDpsPalna2h(8).maxDpsPalna1h(8).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.SZERMIERZA, Stats.builder().mnoznikObrony(0.50).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.KALIGULI, Stats.builder().obronaAffixu(10).minDpsBiala2h(10).minDpsBiala1h(10).minDpsDystans1h(10).minDpsDystans2h(10).minDpsPalna2h(10).minDpsPalna1h(10).maxDpsBiala2h(10).maxDpsBiala1h(10).maxDpsDystans1h(10).maxDpsDystans2h(10).maxDpsPalna2h(10).maxDpsPalna1h(10).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.ODPORNOSCI, Stats.builder().obronaAffixu(20).twardosc(0.02).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.GRABIEZCY, Stats.builder().szczescie(5).charyzma(-8).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.MISTRZA, Stats.builder().mnoznikObrony(0.75).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.ORCHIDEI, Stats.builder().obronaAffixu(-10).ignoreObrony(0.05).dps(4).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.SIEWCY_SMIERCI, Stats.builder().zwinnosc(20).obronaAffixu(5).dps(6).build()));
    suffixes.push(new Suffix(ItemGenre.CHEST, SuffixType.SZYBKOSCI, Stats.builder().atakiBiala(2).atakiDystans1h(2).atakiDystans2h(2).atakiPalna(2).critChancePalna1h(-0.40).critChancePalna2h(-0.80).critMultiSpeed(0.01).build()));


    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.NARKOMANA, Stats.builder().sila(-6).wyglad(-3).zwinnosc(-1).inteligencja(-3).odpornosc(3).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.SILACZA, Stats.builder().zwinnosc(-4).sila(4).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.RZEZIMIESZKA, Stats.builder().wplywy(3).obronaAffixu(2).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.CICHYCHRUCHOW, Stats.builder().wplywy(2).zwinnosc(2).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.SKRYTOSCI, Stats.builder().wplywy(3).zwinnosc(4).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.PRZEMYTNIKA, Stats.builder().wplywy(5).obronaAffixu(4).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.SLONCA, Stats.builder().spostrzegawczosc(2).wyglad(2).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.LOWCYCIENI, Stats.builder().zwinnosc(6).wplywy(4).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.HANDLARZABRONIA, Stats.builder().obronaAffixu(6).wplywy(7).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.INKOW, Stats.builder().odpornosc(3).wiedza(3).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.UNIKOW, Stats.builder().zwinnosc(5).unikBiala(0.02).unikDystans(0.02).unikPalna(0.02).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.WEZA, Stats.builder().wplywy(5).szczescie(5).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.PASTERZA, Stats.builder().spostrzegawczosc(3).odpornosc(-4).obronaAffixu(-4).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.TROPICIELA, Stats.builder().zwinnosc(5).obronaAffixu(5).build()));
    suffixes.push(new Suffix(ItemGenre.LEGS, SuffixType.NOCY, Stats.builder().zwinnosc(15).build()));


    this.armourSuffixCache = suffixes;
    return suffixes;
  }
}
