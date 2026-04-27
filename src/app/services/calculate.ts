import { Injectable } from '@angular/core';

import {Character, Attributes, TalizmanLevels, ArcaneLevels, DashboardValues, Evolutions, WeaponDamage} from '../models/character';
import {ArmourDictionary} from '../logic/dictionaries/ArmourDictionary';
import {BaseDictionary} from '../logic/dictionaries/BaseDictionary';
import {JewelsDictionary} from '../logic/dictionaries/JewelsDictionary';
import {SetsDictionary} from '../logic/dictionaries/SetsDictionary';
import {WeaponDictionary} from '../logic/dictionaries/WeaponDictionary';

import {Player, PlayerBuilder, PlayerRasa} from '../logic/interactions/Player';
import {Evolution} from '../logic/interactions/Evolution';
import {TalismanyAndArkany} from '../logic/interactions/TalismanyAndArkany';

import {Affix} from '../logic/item/Affix';
import {Base} from '../logic/item/Base';
import {Item, ItemBuilder} from '../logic/item/Item';
import {Prefix} from '../logic/item/Prefix';
import {Set} from '../logic/item/Set';
import {Stats, StatsBuilder} from '../logic/item/Stats';
import {Suffix} from '../logic/item/Suffix';

import {SuffixType, PrefixType} from '../logic/item/constants/affixType';
import {ItemRarity} from '../logic/item/constants/itemRarity';
import {ItemGenre} from '../logic/item/constants/itemGenre';
import {ItemType} from '../logic/item/constants/itemType';

@Injectable({
providedIn: 'root'
})
export class DashboardService {


calculateStuff(c: Character): DashboardValues {
      console.log(JSON.parse(JSON.stringify(c))); // ✅ deep snapshot
      let player : Player = new PlayerBuilder()
                                .lvl(c.poziom)
                                .stats(new StatsBuilder()
                                    .sila(c.attributes.sila)
                                    .zwinnosc(c.attributes.zwinnosc)
                                    .odpornosc(c.attributes.odpornosc)
                                    .wyglad(c.attributes.wyglad)
                                    .charyzma(c.attributes.charyzma)
                                    .wplywy(c.attributes.wplywy)
                                    .spostrzegawczosc(c.attributes.spostrzegawczosc)
                                    .inteligencja(c.attributes.inteligencja)
                                    .wiedza(c.attributes.wiedza)
                                    .build())
                                .obronaPrzeciwnika(c.obronaPrzeciwnika)
                                .odpornoscPrzeciwnika(c.odpornoscPrzeciwnika)
                                .items(this.mapItems(c))
                                .build();

      player.baseLife += this.calculateBaseLife(c);
      this.calculateUmagi(c, player);
      player.doMysliwy(c.mysliwy);
      player.doNinja(c.ninja);
      this.calculateKaplica(c, player);
      this.calculateBlaszki(c, player);
      this.calculateRunyZTalkow(c, player);
      player.resolveNonWeaponItems();
      player.resolveSetBonuses();
      this.calculateEwolucje(c, player);
      this.calculateRasa(c, player);
      this.calculateTalizmanyAndArkany(c, player);
      this.calculateHuntBonuses(c, player);
      this.calculateOneTimeBonus(c, player);
      this.calculateEventBonus(c, player);
      this.calculateStrateg(c, player);
      let dashboard : DashboardValues = this.buildDashboardValues(player);

      return dashboard;
    }

  calculateStrateg(c : Character, p : Player) : void {
    const strateg = c.strateg;

    switch (strateg) {
      case 1:
        p.addLaczneObrazeniaWszystkichBroni(0.03);
        break;
      case 2:
        p.addLaczneObrazeniaWszystkichBroni(0.06);
        break;
      case 3:
        p.addLaczneObrazeniaWszystkichBroni(0.09);
        break;
      case 4:
        p.addLaczneObrazeniaWszystkichBroni(0.12);
        break;
      case 5:
        p.addLaczneObrazeniaWszystkichBroni(0.15);
        break;
      default:
        console.log("Unknown status");
    }
  }

  private getPrefixTypeByName(name: string): PrefixType {
    const prefixValues = Object.values(PrefixType);
    const found = prefixValues.find(v => v === name);
    if (!found) {
      throw new Error(`Prefix type not found: ${name}`);
    }
    return name as PrefixType;
  }

  private getSuffixTypeByName(name: string): SuffixType {
    const suffixValues = Object.values(SuffixType);
    const found = suffixValues.find(v => v === name);
    if (!found) {
      throw new Error(`Suffix type not found: ${name}`);
    }
    return name as SuffixType;
  }

  private getGenreForItemType(itemType: ItemType): ItemGenre {
    const legTypes = [ItemType.SZORTY, ItemType.SPODNIE, ItemType.SPODNICA, ItemType.KILT];
    const chestTypes = [ItemType.KURTKA, ItemType.KAMIZELKA, ItemType.KOLCZUGA, ItemType.ZBROJAWARSTWOWA, ItemType.KOSZULKA, ItemType.MARYNARKA, ItemType.PELNAZBROJA, ItemType.PELERYNA, ItemType.GORSET, ItemType.SMOKING];
    const headTypes = [ItemType.CZAPKA, ItemType.KASK, ItemType.HELM, ItemType.MASKA, ItemType.OBRECZ, ItemType.KOMINIARKA, ItemType.KAPELUSZ, ItemType.KORONA, ItemType.OPASKA, ItemType.BANDANA];
    const ringTypes = [ItemType.PIERSCIEN, ItemType.SYGNET, ItemType.BRANSOLETA];
    const neckTypes = [ItemType.AMULET, ItemType.LANCUCH, ItemType.NASZYJNIK, ItemType.KRAWAT, ItemType.APASZKA];
    const melee1hTypes = [ItemType.PALKA, ItemType.NOZ, ItemType.SZTYLET, ItemType.RAPIER, ItemType.MIECZ, ItemType.TOPOR, ItemType.KASTET, ItemType.KAMA, ItemType.PIESCNIEBIOS, ItemType.WAKIZASHI];
    const melee2hTypes = [ItemType.MACZUGA, ItemType.LOM, ItemType.PIKA, ItemType.TOPORDWURECZNY, ItemType.MIECZDWURECZNY, ItemType.KOSA, ItemType.KORBACZ, ItemType.HALABARDA, ItemType.KATANA, ItemType.PILALANCUCHOWA];
    const gun1hTypes = [ItemType.GLOCK, ItemType.MAGNUM, ItemType.DESERT_EAGLE, ItemType.BERETTA, ItemType.UZI, ItemType.MP5K, ItemType.SKORPION];
    const gun2hTypes = [ItemType.KARABINMYSLIWSKI, ItemType.STRZELBA, ItemType.AK47, ItemType.MIOTACZPLOMIENI, ItemType.FN_FAL, ItemType.POLAUTOMATSNAJPERSKI, ItemType.KARABINSNAJPERSKI];
    const range1hTypes = [ItemType.KROTKILUK, ItemType.LUK, ItemType.DLUGILUK, ItemType.OSZCZEP, ItemType.PILUM, ItemType.NOZDORZUCANIA, ItemType.TOPOREKDORZUCANIA];
    const range2hTypes = [ItemType.KUSZA, ItemType.SHURIKEN, ItemType.CIEZKAKUSZA, ItemType.LUKREFLEKSYJNY];

    if (legTypes.includes(itemType)) return ItemGenre.LEGS;
    if (chestTypes.includes(itemType)) return ItemGenre.CHEST;
    if (headTypes.includes(itemType)) return ItemGenre.HEAD;
    if (ringTypes.includes(itemType)) return ItemGenre.FINGER;
    if (neckTypes.includes(itemType)) return ItemGenre.NECK;
    if (melee1hTypes.includes(itemType)) return ItemGenre.WHITE_1H;
    if (melee2hTypes.includes(itemType)) return ItemGenre.WHITE_2H;
    if (gun1hTypes.includes(itemType)) return ItemGenre.GUN_1H;
    if (gun2hTypes.includes(itemType)) return ItemGenre.GUN_2H;
    if (range1hTypes.includes(itemType)) return ItemGenre.RANGE_1H;
    if (range2hTypes.includes(itemType)) return ItemGenre.RANGE_2H;

    throw new Error(`Unknown item type: ${itemType}`);
  }

  private getDictionaryForGenre(genre: ItemGenre): 'weapon' | 'armour' | 'jewel' {
    const weaponGenres = [ItemGenre.WHITE_1H, ItemGenre.WHITE_2H, ItemGenre.GUN_1H, ItemGenre.GUN_2H, ItemGenre.RANGE_1H, ItemGenre.RANGE_2H];
    const armourGenres = [ItemGenre.HEAD, ItemGenre.CHEST, ItemGenre.LEGS];
    const jewelGenres = [ItemGenre.NECK, ItemGenre.FINGER];

    if (weaponGenres.includes(genre)) return 'weapon';
    if (armourGenres.includes(genre)) return 'armour';
    if (jewelGenres.includes(genre)) return 'jewel';

    throw new Error(`Unknown genre: ${genre}`);
  }

  private mapItems(c: Character): Item[] {
    const items: Item[] = [];

    for (const item of Object.values(c.equipment)) {
      if (!item || item.rarity === null || !item.base) continue;

      const itemType = item.base as ItemType;
      const genre = this.getGenreForItemType(itemType);
      const base = BaseDictionary.getBase(genre, itemType, item.rarity, c.poziom);

      const builder = new ItemBuilder().setBase(base);

      if (item.prefix) {
        const prefixType = this.getPrefixTypeByName(item.prefix);
        const dictionaryType = this.getDictionaryForGenre(genre);

        let prefix: Prefix;
        switch (dictionaryType) {
          case 'weapon':
            prefix = WeaponDictionary.getWeaponPrefix(genre, prefixType, item.rarity, c.poziom);
            break;
          case 'armour':
            if(genre == 'legs'){
              prefix = ArmourDictionary.getLegsPrefix(genre, item.base, prefixType, item.rarity);
            } else {
              prefix = ArmourDictionary.getArmourPrefix(genre, prefixType, item.rarity);
              }
          break;
          case 'jewel':
            prefix = JewelsDictionary.getJewelPrefix(genre, prefixType, item.rarity);
            break;
        }
        builder.setPrefix(prefix);
      }

      if (item.suffix) {
        const suffixType = this.getSuffixTypeByName(item.suffix);
        const dictionaryType = this.getDictionaryForGenre(genre);

        let suffix: Suffix;
        switch (dictionaryType) {
          case 'weapon':
            suffix = WeaponDictionary.getWeaponSuffix(genre, suffixType, item.rarity, c.poziom);
            break;
          case 'armour':
            suffix = ArmourDictionary.getArmourSuffix(genre, suffixType, item.rarity, c.poziom);
            break;
          case 'jewel':
            suffix = JewelsDictionary.getJewelSuffix(genre, suffixType, item.rarity);
            break;
        }
        builder.setSuffix(suffix);
      }

      items.push(builder.build());
    }

    return items;
  }



  calculateBlaszki(c: Character, p : Player) : void {
    if(c.blaszkaZaKronosa){
      p.addIgnore(0.1);
    }
    if(c.blaszkaZaMoba){
      p.addIgnore(0.1);
    }
  }


  calculateKaplica(c: Character, p : Player) : void {
      switch (c.kaplica) {
        case 0:
          break;
        case 1:
          p.addLife(25);
          break;
        case 2:
          p.addLife(50);
          break;
        case 3:
          p.addLife(75);
          break;
        case 4:
          p.addLife(200);
          break;
        case 5:
          p.addLife(300);
          break;
        case 6:
          p.addLife(450);
          break;
        default:
          break;
}
  }

  calculateBaseLife(c: Character) : number {
        let base = 102;
        let term1 = 4 * (c.poziom - 1);
        let tenDigit = Math.floor(c.poziom / 10);
        let term2 = 5 * tenDigit * (tenDigit - 1);
        let oneDigit = c.poziom - 10 * tenDigit;
        let term3 = tenDigit * oneDigit;
        let term4 = 10 * tenDigit * (tenDigit + 1) / 2;

        return Math.floor(base + term1 + term2 + term3 + term4);
  }

  calculateUmagi(c : Character, p : Player) : void {
    for (const mod of c.umagiValues) {
    const parts = mod.trim().split(/\s+/);
    const key = parts[0].toLowerCase();
    const value = parts[1] !== undefined ? parseFloat(parts[1]) : NaN;

    const toDecimal = (num: number | string): number => Number(num) / 100;

    switch (key) {
      case 'obrazenia':
        if (parts[1]?.includes('/')) {
          p.addMinDmg(Math.floor((1 / 4 * c.poziom)));
          p.addMaxDmg(Math.floor((1 / 4 * c.poziom)));
        } else {
          p.addMinDmg(value);
          p.addMaxDmg(value);
        }
        break;

      case 'ignore':
        p.addIgnore(toDecimal(value));
        break;

      case 'dodatkowyatak':
        p.addAllAtaki(1);
        break;

      case 'kryt':
        p.addAllCrit(toDecimal(value));
        break;

      case 'trafienie':
        p.addAllTrafienie(value);
        break;

      case 'zycie':
        p.addBaseLife(value);
        break;

      case 'obrona':
        if (parts[1]?.includes('/')) {
          const [num, den] = parts[1].split('/').map(Number);
          p.addObronaDodatkowa((Math.floor(num / den) * c.poziom));
        } else {
          p.addObronaDodatkowa(value);
        }
        break;

      case 'unik':
        p.addAllUnik(toDecimal(value));
        break;

      case 'szczescie':
        p.addSzczescie(value);
        break;

      case 'inicjatywa':
        p.addAdditionalIni(value);
        break;

      case 'spostrzegawczosc':
        p.addSpostrzegawczosc(value);
        break;

      case 'zwinnosc':
        p.addZwinnosc(value);
        break;

      case 'sila':
        p.addSila(value);
        break;

      case 'charyzma':
        p.addCharyzma(value);
        break;

      case 'wplywy':
        p.addWplywy(value);
        break;

      case 'odpornosc':
        p.addOdpornosc(value);
        break;

      case 'inteligencja':
        p.addInteligencja(value);
        break;

      case 'wiedza':
        p.addWiedza(value);
        break;

      case 'wyglad':
        p.addWyglad(value);
        break;

      default:
        break;
    }
  }
  }

  calculateEwolucje(c: Character, p: Player): void {
    try {
      const evolution = Evolution.builder()
        .skrzylda(c.evolutions?.skrzydla ?? 0)
        .pancerz(c.evolutions?.pancerz ?? 0)
        .klyPauzryKolce(c.evolutions?.klyPazuryKolce ?? 0)
        .gruczolyJadowe(c.evolutions?.gruczolyJadowe ?? 0)
        .wzmocnioneSciegna(c.evolutions?.wzmocnioneSciegna ?? 0)
        .krewDemona(c.evolutions?.krewDemona ?? 0)
        .mutacjaDna(c.evolutions?.mutacjaDna ?? 0)
        .oswiecony(c.evolutions?.oswiecony ?? 0)
        .szostyZmysl(c.evolutions?.szostyZmysl ?? 0)
        .absorpcja(c.evolutions?.absorpcja ?? 0)
        .harmonijnyRozwoj(c.evolutions?.harmonijnyRozwo ?? 0)
        .pietnoDemona(c.evolutions?.pietnoDemona ?? 0)
        .wzmocnioneMiesnie(c.evolutions?.wzmocnioneMiesnie ?? 0)
        .build();

      evolution.calculate(p);
    } catch (error) {
    }
  }

  calculateRasa(c: Character, p: Player): void {
    if (!c.rasa) {
      return;
    }
      p.doRasa(c.rasa);
  }

  private getRasaFromString(rasaStr: string): PlayerRasa | null {
    const rasaValue = Object.values(PlayerRasa).find((r) => r === rasaStr);
    return rasaValue ? (rasaValue as PlayerRasa) : null;
  }

  calculateTalizmanyAndArkany(c: Character, p: Player): void {
    try {
      const talizmanyArkany = TalismanyAndArkany.builder()
        .aMajestat(c.arcaneLevels?.majestat ?? 0)
        .aMaskaOff(c.arcaneLevels?.maskaAdnisa ?? 0)
        .aMaskaDef(c.arcaneLevels?.maskaKaliguli ?? 0)
        .aKrewZycia(c.arcaneLevels?.krewZycia ?? 0)
        .aKocieSciezki(c.arcaneLevels?.kocieSciezki ?? 0)
        .aZar(c.arcaneLevels?.zarKrwi ? 1 : 0)
        .aCisza(c.arcaneLevels?.ciszaKrwi ?? 0)
        .aWyssanie(c.arcaneLevels?.wyssanieMocy ?? 0)
        .aMocKrwi(c.arcaneLevels?.mocKrwi ?? 0)
        .aSkora(c.arcaneLevels?.skoraBestii ?? 0)
        .aDziki(c.arcaneLevels?.dzikiSzal ?? 0)
        .aCienBestii(c.arcaneLevels?.cienBestii ? 1 : 0)
        .aNocny(c.arcaneLevels?.nocnyLowca ?? 0)
        .aTchnienie(c.arcaneLevels?.tchnienieSmierci ?? 0)
        .ambicja(c.talizmanLevels?.ambicja ?? 0)
        .behemot(c.talizmanLevels?.behemot ?? 0)
        .ziz(p.ziz4 ? 1 : 0)
        .kamienSpota(c.talizmanLevels?.kamienDobra ?? 0)
        .kamienZwinki(c.talizmanLevels?.kamienZla ?? 0)
        .szpony(c.talizmanLevels?.spaonNocy ?? 0)
        .zycieSmierc(c.talizmanLevels?.zycieISmierc ?? 0)
        .otchlan(c.talizmanLevels?.otchlaniCiszy ?? 0)
        .potega(c.talizmanLevels?.potegaMocy ?? 0)
        .aura(c.talizmanLevels?.auraBestii ?? 0)
        .maskaStrachu(c.talizmanLevels?.maskaStachu ?? 0)
        .maskaWladzy(c.talizmanLevels?.maskaWladzy ?? 0)
        .lowca(c.talizmanLevels?.cichyLowca ?? 0)
        .piesnKrwi(c.talizmanLevels?.piesnKrwi ?? 0)
        .build();

      talizmanyArkany.calculateTalisman(p);
      talizmanyArkany.calculateArakny(p);
    } catch (error) {
    }
  }

  calculateHuntBonuses(c: Character, p: Player): void {
    if (!Array.isArray(c.huntBonuses) || c.huntBonuses.length === 0) {
      return;
    }

    for (const bonus of c.huntBonuses) {
      switch (bonus.toLowerCase()) {
        case 'Juggernaut':
          p.addTwardosc(1);
          break;
        case 'Ronin':
          p.addIgnore(0.75);
          break;
        case 'Adrenalina':
          p.baseLife = p.baseLife * 1.25;
          break;
        case 'SokoleOko':
          p.addTrafienieProcentowePalna(0.2);
          p.addTrafienieProcentoweBiala(0.2);
          p.addTrafienieProcentoweDystans(0.2);
          break;
        case 'Rzeznik':
          p.addCritMultiBiala1h(0.5);
          p.addCritMultiBiala2h(1);
          break;
      }
    }
  }

  calculateOneTimeBonus(c: Character, p: Player): void {
    if (!c.oneTimeBonus) {
      return;
    }

    const bonus = c.oneTimeBonus.toLowerCase();

    switch (bonus) {
      case 'krew wilka':
        p.addSila(3);
        p.addSpostrzegawczosc(-2);
        p.addZwinnosc(2);
        p.addWiedza(-2);
        break;

      case 'jabłko żelaznego drzewa':
        p.addOdpornosc(3);
        p.life += Math.floor(p.baseLife * 1.07);
        break;

      case 'płetwa rekina':
        p.addMinDmg(2);
        p.addMaxDmg(3);
        p.addCharyzma(-2);
        break;

      case 'eliksir zmysłów':
        p.addSila(-1);
        p.addCharyzma(2);
        p.addWyglad(-2);
        p.addSpostrzegawczosc(4);
        p.addZwinnosc(-2);
        p.addOdpornosc(-2);
        p.addInteligencja(1);
        p.addWiedza(1);
        break;

      case 'święcona woda':
        p.addOdpornosc(4);
        p.addZwinnosc(-1);
        break;

      case 'łza feniksa':
        p.addWplywy(-2);
        p.addRegeneration(15);
        break;

      case 'magiczna pieczęć':
        p.addSila(2);
        p.addCharyzma(-2);
        p.addWplywy(-2);
        p.addOdpornosc(2);
        p.addSzczescie(4);
        break;

      case 'serce nietoperza':
        p.addMinDmg(-2);
        p.addMaxDmg(-2);
        p.addObronaDodatkowa(14);
        break;

      case 'kwiat lotosu':
        p.addCharyzma(-6);
        p.addWplywy(-5);
        p.addWyglad(6);
        p.addSzczescie(7);
        break;

      case 'jad wielkopchły':
        p.addMaxDmg(7);
        p.addSpostrzegawczosc(-1);
        p.addZwinnosc(-1);
        p.addOdpornosc(-5);
        break;

      case 'serum oświecenia':
        p.addSpostrzegawczosc(-2);
        p.addZwinnosc(-2);
        p.addInteligencja(4);
        p.addWiedza(6);
        break;

      case 'wywar z czarnego kota':
        p.addSzczescie(10);
        break;

      case 'węgiel':
        p.addCharyzma(-2);
        p.addWplywy(6);
        break;

      case 'sierść kreta':
        p.addCharyzma(2);
        break;

      case 'saletra':
        p.addSpostrzegawczosc(-1);
        p.addZwinnosc(-1);
        p.addAllCrit(0.04);
        break;

      case 'sok z żuka':
        p.addIgnore(0.03);
        p.addCritChancePalna(-0.10);
        break;

      case 'esencja młodości':
        p.addSila(4);
        p.addSpostrzegawczosc(-4);
        p.addZwinnosc(2);
        p.addWiedza(-3);
        break;

      case 'paznokieć trolla':
        p.addZwinnosc(-2);
        p.addOdpornosc(4);
        p.addInteligencja(-1);
        p.life += Math.floor(p.baseLife * 1.10);
        break;

      case 'wilcza jagoda':
        p.addMinDmg(4);
        p.addMaxDmg(4);
        p.addCharyzma(-4);
        break;

      case 'oko kota':
        p.addSila(-2);
        p.addCharyzma(2);
        p.addWyglad(-3);
        p.addSpostrzegawczosc(6);
        p.addZwinnosc(-3);
        p.addOdpornosc(-4);
        p.addInteligencja(2);
        p.addWiedza(2);
        break;

      case 'absynt':
        p.addOdpornosc(6);
        p.addZwinnosc(-2);
        break;

      case 'łuski salamandry':
        p.addWplywy(-4);
        p.addRegeneration(80);
        break;

      case 'woda źródlana':
        p.addSila(2);
        p.addCharyzma(-3);
        p.addWplywy(-3);
        p.addOdpornosc(2);
        p.addSzczescie(7);
        break;

      case 'kość męczennika':
        p.addMinDmg(-5);
        p.addMaxDmg(-5);
        p.addObronaDodatkowa(27);
        break;

      case 'napój miłosny':
        p.addCharyzma(-10);
        p.addWplywy(-8);
        p.addWyglad(8);
        p.addSzczescie(10);
        break;

      case 'jad skorpiona':
        p.addMaxDmg(10);
        p.addSila(-1);
        p.addSpostrzegawczosc(-2);
        p.addZwinnosc(-2);
        p.addOdpornosc(-8);
        break;

      case 'korzeń mandragory':
        p.addSpostrzegawczosc(-4);
        p.addZwinnosc(-4);
        p.addInteligencja(6);
        p.addWiedza(6);
        break;

      case 'gwiezdny pył':
        p.addSzczescie(15);
        break;

      case 'fiolka kwasu':
        p.addCharyzma(-4);
        p.addWplywy(8);
        break;

      case 'siarka':
        p.addCharyzma(4);
        break;

      case 'czarny diament':
        p.addSpostrzegawczosc(-2);
        p.addZwinnosc(-2);
        p.addAllCrit(0.07);
        break;

      case 'oko topielca':
        p.addIgnore(0.06);
        p.addCritChancePalna(-0.15);
        break;

      case 'boska łza':
        p.addSila(6);
        p.addSpostrzegawczosc(-2);
        p.addZwinnosc(4);
        break;

      case 'ząb ghula':
        p.addOdpornosc(8);
        p.addZwinnosc(-3);
        p.addInteligencja(-4);
        p.life += Math.floor(p.baseLife * 0.14);
        break;

      case 'wywar z koralowca':
        p.addMinDmg(5);
        p.addMaxDmg(7);
        p.addCharyzma(-8);
        break;

      case 'serce proroka':
        p.addSpostrzegawczosc(10);
        p.addCharyzma(4);
        p.addWiedza(4);
        p.addSila(-4);
        p.addZwinnosc(-6);
        p.addWyglad(-6);
        break;

      case 'pazur bazyliszka':
        p.addOdpornosc(14);
        p.addZwinnosc(-4);
        break;

      case 'łuski demona':
        p.addWplywy(4);
        p.addOdpornosc(-4);
        p.addRegeneration(140);
        break;

      case 'skrzydła chrząszcza':
        p.addSila(4);
        p.addOdpornosc(4);
        p.addCharyzma(-5);
        p.addWplywy(-5);
        p.addSzczescie(10);
        break;

      case 'maska gargulca':
        p.addMinDmg(-6);
        p.addMaxDmg(-6);
        p.addObronaDodatkowa(60);
        break;

      case 'sok z modliszki':
        p.addWyglad(14);
        p.addSzczescie(14);
        p.addCharyzma(-10);
        p.addWplywy(-6);
        break;

      case 'oddech smoka':
        p.addMaxDmg(17);
        p.addSila(-2);
        p.addZwinnosc(-2);
        p.addOdpornosc(-6);
        p.addSpostrzegawczosc(-2);
        break;

      case 'ząb wiedźmy':
        p.addInteligencja(7);
        p.addWiedza(8);
        p.addSpostrzegawczosc(-2);
        p.addZwinnosc(-2);
        break;

      case 'grimoire':
        p.addSzczescie(20);
        break;

      case 'czarna żółć':
        p.addWplywy(14);
        p.addCharyzma(-6);
        break;

      case 'palec kowala':
        p.addCharyzma(10);
        break;

      case 'kwiat bzu':
        p.addZwinnosc(-3);
        p.addSpostrzegawczosc(-3);
        p.addAllCrit(0.10);
        break;

      case 'ogień z serca ziemi':
        p.addIgnore(0.10);
        p.addCritChancePalna(-0.25);
        break;
    }
  }

  calculateEventBonus(c: Character, p: Player): void {
    if (!c.eventBonus) {
      return;
    }

    const bonus = c.eventBonus.toLowerCase();

    switch (bonus) {
      case 'klątwa bogów':
      //  p.addMinDmg(); /// TODO fill
        break;

      case 'noc długich noży':
        p.addCritMulti(1.20);
        break;

      case 'noc starych bogów':
        p.addRedukcjaObrazen(0.20);
        break;

      case 'noc poszukiwaczy':
        p.addSzczescie(50);
        break;

      case 'dzień poszukiwaczy':
        p.addSzczescie(100);
        break;

      case 'dzień vlada':
      //  p.addPunktyKrwi(1); /// TODO fill
        break;

      case 'dzień gwiazd północy':
        p.addAllAtaki(2);
        break;

      case 'świąteczna wizja kaina':
        p.addSzczescie(50);
        break;

      case 'świąteczna wizja kaina (deluxe)':
        p.addSzczescie(50);
        break;

      case 'potrójna wizja kaina':
        p.addSzczescie(50);
        break;

      case 'pożeracz serc':
        const luckFromAppearance = Math.floor(p.stats.wyglad / 2);
        p.addSzczescie(luckFromAppearance);
        break;

      case 'potęga hormonów':
        p.addLaczneObrazeniaWszystkichBroni(c.poziom);
        break;

      case 'dzień neandertalczyka':
        p.addLaczneObrazeniaWszystkichBroni(c.poziom);
        break;

      case 'pisanki kaina':
        p.addSzczescie(50);
        break;

      case 'may the 4th be with you':
        p.addCritMulti(1.0);
        break;

      case 'dzień przemiany':
        p.addLife(700);
        break;

      case 'więzy krwi':
        p.addSzczescie(100);
        break;

      case 'krew z krwi':
        p.addSzczescie(50);
        break;

      case 'wszyscy jesteśmy francuzami':
        p.addSzczescie(100);
        break;

      case 'pierwszy gol':
        p.addSzczescie(20);
        break;

      case 'pierwszy serwis':
        p.addSzczescie(20);
        break;

      case 'szczęście sprzyja lepszym':
        p.addSzczescie(30);
        break;

      case 'tylko dla orłów':
        p.addSzczescie(40);
        break;

      case 'zwycięzca jest tylko jeden':
        p.addSzczescie(50);
        break;
    }
  }

    calculateRunyZTalkow(c : Character, p : Player) : void {
      for (const mod of c.runeValues) {
        const parts = mod.trim().split(/\s+/);
        const key = parts[0].toLowerCase();
        const value = parts[1] !== undefined ? parseFloat(parts[1]) : NaN;

        const toDecimal = (num: number | string): number => Number(num) / 100;
        switch (key) {
          case 'obrazenia':
              p.addLaczneObrazeniaWszystkichBroni(toDecimal(value));
            break;

          case 'kryt':
            p.addAllCrit(toDecimal(value));
            break;

          case 'ignore':
            p.addIgnore(toDecimal(value));
            break;

          case 'sila':
            if(value <= 2){
              p.addSila(Math.floor(c.poziom / 60));
            } else if (value == 3){
              p.addSila(Math.floor(c.poziom / 60) * 2);
            } else {
              p.addSila(Math.floor(c.poziom / 60) * 3);
            }
            p.addSila(value);
            break;

          case 'spostrzegawczosc':
            if(value <= 2){
              p.addSpostrzegawczosc(Math.floor(c.poziom / 60));
            } else if (value == 3){
              p.addSpostrzegawczosc(Math.floor(c.poziom / 60) * 2);
            } else {
              p.addSpostrzegawczosc(Math.floor(c.poziom / 60) * 3);
            }
            p.addSpostrzegawczosc(value);
            break;

          case 'inteligencja':
            if(value <= 2){
              p.addInteligencja(Math.floor(c.poziom / 60));
            } else if (value == 3){
              p.addInteligencja(Math.floor(c.poziom / 60) * 2);
            } else {
              p.addInteligencja(Math.floor(c.poziom / 60) * 3);
            }
            p.addInteligencja(value);
            break;

          case 'wiedza':
            if(value <= 2){
              p.addWiedza(Math.floor(c.poziom / 60));
            } else if (value == 3){
              p.addWiedza(Math.floor(c.poziom / 60) * 2);
            } else {
              p.addWiedza(Math.floor(c.poziom / 60) * 3);
            }
            p.addWiedza(value);
            break;

          case 'zwinnosc':
            if(value <= 2){
              p.addZwinnosc(Math.floor(c.poziom / 60));
            } else if (value == 3){
              p.addZwinnosc(Math.floor(c.poziom / 60) * 2);
            } else {
              p.addZwinnosc(Math.floor(c.poziom / 60) * 3);
            }
            p.addZwinnosc(value);
            break;

          case 'obrona':
            p.addObronaDodatkowa(Math.floor(c.poziom / 8) * value);
            break;

          case 'odpornosc':
            if(value <= 2){
              p.addOdpornosc(Math.floor(c.poziom / 60));
            } else if (value == 3){
              p.addOdpornosc(Math.floor(c.poziom / 60) * 2);
            } else {
              p.addOdpornosc(Math.floor(c.poziom / 60) * 3);
            }
            p.addOdpornosc(value);
            break;

          case 'twardosc':
            p.addTwardosc(toDecimal(value));
            break;

          case 'zycie':
            if(value == 50){
              p.addLife((Math.floor(c.poziom / 60)) * 50);
            } else if (value == 100){
              p.addLife(Math.floor(c.poziom / 60)  * 75);
            } else if (value == 150) {
              p.addLife(Math.floor(c.poziom / 60)  * 100);
            } else {
              p.addLife(Math.floor(c.poziom / 60)  * 150);
            }
            p.addLife(value);
            break;

          case 'szczescie':
            p.addSzczescie(value);
            break;

          case 'multi':
            p.addCritMulti(toDecimal(value));
            break;

          default:
            break;
        }
      }
  }

  buildDashboardValues(player: Player): DashboardValues {
    try {
      const weapons = player.items.filter(item =>
        item.base && (
          item.base.genre === ItemGenre.WHITE_1H ||
          item.base.genre === ItemGenre.WHITE_2H ||
          item.base.genre === ItemGenre.GUN_1H ||
          item.base.genre === ItemGenre.GUN_2H ||
          item.base.genre === ItemGenre.RANGE_1H ||
          item.base.genre === ItemGenre.RANGE_2H
        )
      );

      const obrazenia: WeaponDamage[] = [];

      for (const weapon of weapons) {
        const damage = this.calculateWeaponDamage(weapon, player);
        if (damage) {
          obrazenia.push(damage);
        }
      }

      const attributes: Attributes = {
        sila: player.stats.sila,
        zwinnosc: player.stats.zwinnosc,
        odpornosc: player.stats.odpornosc,
        wyglad: player.stats.wyglad,
        charyzma: player.stats.charyzma,
        wplywy: player.stats.wplywy,
        spostrzegawczosc: player.stats.spostrzegawczosc,
        inteligencja: player.stats.inteligencja,
        wiedza: player.stats.wiedza
      };

      const regen = Math.floor(player.life * player.stats.regen);

      return {
        punktyZycia: player.life + player.baseLife,
        punktyKrwi : 0,
        szczescie: player.stats.szczescie,
        obrona: player.stats.obronaDodatkowa + player.stats.obronaPrzedmiotow + player.stats.odpornosc,
        attributes: attributes,
        twardrosc: player.stats.twardosc,
        redukcja: player.stats.redukcjaObrazen + Math.floor((player.stats.obronaDodatkowa + player.stats.obronaPrzedmiotow + player.stats.odpornosc) / 75) * 0.01,
        unikBiala: player.stats.unikBiala,
        unikPalna: player.stats.unikPalna,
        unikDystans: player.stats.unikDystans,
        inicjatywa: player.stats.spostrzegawczosc + player.stats.zwinnosc + player.stats.additionalIni,
        obrazenia: obrazenia,
        regeneracja: regen,
        zizAverageRounds: []
      };
    } catch (error) {
      return {
        punktyZycia: 0,
        obrona: 0
      };
    }
  }

  private constructWeaponName(weapon: Item): string {
    const parts: string[] = [];

    if (weapon.base?.rarity) {
      parts.push(weapon.base.rarity);
    }

    if (weapon.prefix) {
      const prefix = weapon.prefix as Prefix;
      if (prefix.prefixType) {
        parts.push(prefix.prefixType);
      }
    }

    if (weapon.base?.type) {
      parts.push(weapon.base.type);
    }

    if (weapon.suffix) {
      const suffix = weapon.suffix as Suffix;
      if (suffix.suffixType) {
        parts.push(suffix.suffixType);
      }
    }

    return parts.join(' ');
  }

 private calculateWeaponDamage(weapon: Item, player: Player): WeaponDamage | null {
    try {
      const genre = weapon.base?.genre;

      let minDmg = 0;
      let maxDmg = 0;
      let ataki = 0;
      let trafienie = 0;
      let critChance = 0;
      let critMulti = 1;

      player.resolveWeaponItem(weapon);

      if (genre === ItemGenre.WHITE_2H) {
        minDmg = player.stats.minDpsBiala2h + player.stats.sila;
        maxDmg = player.stats.maxDpsBiala2h + player.stats.sila;
        ataki = player.stats.atakiBiala;
        trafienie = (player.stats.trafienieBiala + player.stats.zwinnosc * 2) * (1 + player.stats.trafienieProcentoweBiala);
        critChance = player.stats.critChanceBiala2h;
        critMulti = player.stats.critMultiBiala2h + 4;
      } else if (genre === ItemGenre.WHITE_1H) {
        minDmg = player.stats.minDpsBiala1h + player.stats.sila;
        maxDmg = player.stats.maxDpsBiala1h + player.stats.sila;
        ataki = player.stats.atakiBiala;
        trafienie = (player.stats.trafienieBiala + player.stats.zwinnosc * 2) * (1 + player.stats.trafienieProcentoweBiala);
        critChance = player.stats.critChanceBiala1h;
        critMulti = player.stats.critMultiBiala1h + 2;
      } else if (genre === ItemGenre.GUN_1H) {
        minDmg = player.stats.minDpsPalna1h + Math.floor(player.stats.wiedza / 3);
        maxDmg = player.stats.maxDpsPalna1h + Math.floor(player.stats.wiedza / 3);
        ataki = player.stats.atakiPalna;
        trafienie = (player.stats.trafieniePalna + player.stats.spostrzegawczosc * 2) * (1 + player.stats.trafienieProcentowePalna);
        critChance = player.stats.critChancePalna1h;
        critMulti = player.stats.critMultiPalna1h + 1.5;
      } else if (genre === ItemGenre.GUN_2H) {
        minDmg = player.stats.minDpsPalna2h + Math.floor(player.stats.wiedza / 3);
        maxDmg = player.stats.maxDpsPalna2h + Math.floor(player.stats.wiedza / 3);
        ataki = player.stats.atakiPalna;
        trafienie = (player.stats.trafieniePalna + player.stats.spostrzegawczosc * 2) * (1 + player.stats.trafienieProcentowePalna);
        critChance = player.stats.critChancePalna2h;
        critMulti = player.stats.critMultiPalna2h + 2.0;
      } else if (genre === ItemGenre.RANGE_1H) {
        minDmg = player.stats.minDpsDystans1h + Math.floor(player.stats.sila / 4);
        maxDmg = player.stats.maxDpsDystans1h + Math.floor(player.stats.sila / 4);
        ataki = player.stats.atakiDystans1h;
        trafienie = (player.stats.trafienieDystans + player.stats.sila + player.stats.spostrzegawczosc * 2 + player.stats.zwinnosc * 2) * (1 + player.stats.trafienieProcentoweDystans);
        critChance = player.stats.critChanceDystans;
        critMulti = player.stats.critMultiDystans1h + 3.5;
      } else if (genre === ItemGenre.RANGE_2H) {
        minDmg = player.stats.minDpsDystans2h + Math.floor(player.stats.sila / 2);
        maxDmg = player.stats.maxDpsDystans2h + Math.floor(player.stats.sila / 2);
        ataki = player.stats.atakiDystans2h;
        trafienie = (player.stats.trafienieDystans + Math.floor(player.stats.sila / 2) + player.stats.spostrzegawczosc * 2 + player.stats.zwinnosc * 2) * (1 + player.stats.trafienieProcentoweDystans);
        critChance = player.stats.critChanceDystans;
        critMulti = player.stats.critMultiDystans2h + 3.5;
      }

      if (critChance > 0.85) {
        critChance = 0.85;
      }

      // Apply global damage multiplier
      minDmg = Math.floor((1 + player.stats.laczneObrazeniaWszystkichBroni) * Math.floor(minDmg));
      maxDmg = Math.floor((1 + player.stats.laczneObrazeniaWszystkichBroni) * Math.floor(maxDmg));

      // Apply defense reduction
      if (player.stats.ignoreObrony < 1) {
        if (genre === ItemGenre.RANGE_1H || genre === ItemGenre.RANGE_2H) {
          console.log(minDmg + ' ' + player.obronaPrzeciwnika + ' ' + player.stats.ignoreObrony);
          minDmg = Math.trunc(minDmg - (1 / 4 * player.obronaPrzeciwnika) * (1 - player.stats.ignoreObrony));
          maxDmg = Math.trunc(maxDmg - (1 / 4 * player.obronaPrzeciwnika) * (1 - player.stats.ignoreObrony));
        } else if (genre === ItemGenre.WHITE_1H || genre === ItemGenre.WHITE_2H) {
          minDmg = Math.trunc(minDmg - (1 / 2 * player.obronaPrzeciwnika) * (1 - player.stats.ignoreObrony));
          maxDmg = Math.trunc(maxDmg - (1 / 2 * player.obronaPrzeciwnika) * (1 - player.stats.ignoreObrony));
        } else {
          minDmg = Math.trunc(minDmg - (1 / 2 * player.odpornoscPrzeciwnika) * (1 - player.stats.ignoreObrony));
          maxDmg = Math.trunc(maxDmg - (1 / 2 * player.odpornoscPrzeciwnika) * (1 - player.stats.ignoreObrony));
        }
      }

      const critDmgMin = Math.floor(minDmg * critMulti);
      const critDmgMax = Math.floor(maxDmg * critMulti);
      const avgDmg = Math.floor((minDmg + maxDmg) / 2);
      const avgCritDmg = Math.floor((critDmgMin + critDmgMax) / 2);
      const obrazeniaNaRundeAvg = Math.floor(critChance * ataki * avgCritDmg + (1 - critChance) * ataki * avgDmg);

      return {
        name: this.constructWeaponName(weapon),
        minDmg,
        maxDmg,
        iloscAtakow: ataki,
        trafienie: Math.floor(trafienie / 2),
        ignore: player.stats.ignoreObrony,
        critChance,
        critMulti,
        critDmgMin,
        critDmgMax,
        obrazeniaNaRundeAvg
      };
    } catch (error) {
      return null;
    }
  }

}

