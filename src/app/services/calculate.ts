import { Injectable } from '@angular/core';

import {Character, Attributes, TalizmanLevels, ArcaneLevels, DashboardValues, Evolutions} from '../models/character';
import {ArmourDictionary} from '../logic/dictionaries/ArmourDictionary';
import {BaseDictionary} from '../logic/dictionaries/BaseDictionary';
import {JewelsDictionary} from '../logic/dictionaries/JewelsDictionary';
import {SetsDictionary} from '../logic/dictionaries/SetsDictionary';
import {WeaponDictionary} from '../logic/dictionaries/WeaponDictionary';

import {Player, PlayerBuilder } from '../logic/interactions/Player';

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
      console.log(c)

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
//                                .items(this.mapItems(c))
                                .build();

      this.calculateUmagi(c, player);
      player.baseLife = this.calculateBaseLife(c);
      player.doMysliwy(c.mysliwy);
      player.doNinja(c.ninja);
      this.calculateKaplica(c, player);
      this.calculateBlaszki(c, player);
      this.calculateRunyZTalkow(c, player);
      player.resolveNonWeaponItems();

      return {
        punktyZycia: 321123,
        obrona: 321
      };
    }


//  mapItems(c: Character) : Item[] {
//    let items : Item[] = []
//      for (const item of Object.values(c.equipment)) {
//        let rarity = item.rarity;
//        let prefix = item.prefix;
//        let base = item.base;
//        let suffix = item.suffix;
//
//        items.push(
//          new ItemBuilder()
//            .setBase(BaseDictionary.getBase(item.base as ItemGenre, item.type as ItemType, item.rarity as ItemRarity, c.poziom))
//            .setPrefix()
//            .setSuffix(SuffixDictionary.)
//            .build()
//        );
//      }
//
//
//    return items;
//  }


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
        let tenDigit = c.poziom / 10;
        let term2 = 5 * tenDigit * (tenDigit - 1);
        let oneDigit = c.poziom - 10 * tenDigit;
        let term3 = tenDigit * oneDigit;
        let term4 = 10 * tenDigit * (tenDigit + 1) / 2;

        return base + term1 + term2 + term3 + term4;
  }

  calculateUmagi(c : Character, p : Player) : void {
    for (const mod of c.umagiValues) {
    const parts = mod.trim().split(/\s+/);
    const key = parts[0].toLowerCase();
    const value = parts[1] !== undefined ? parseFloat(parts[1]) : NaN;

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
        p.addIgnore(value);
        break;

      case 'dodatkowyatak':
        p.addAllAtaki(1);
        break;

      case 'kryt':
        p.addAllCrit(value);
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
          p.addObronaDodatkowa(Math.floor(num / den * c.poziom));
        } else {
          p.addObronaDodatkowa(value);
        }
        break;

      case 'unik':
        p.addAllUnik(value);
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

    calculateRunyZTalkow(c : Character, p : Player) : void {
    for (const mod of c.runeValues) {
    const parts = mod.trim().split(/\s+/);
    const key = parts[0].toLowerCase();
    const value = parts[1] !== undefined ? parseFloat(parts[1]) : NaN;

    switch (key) {
      case 'obrazenia':
          p.addLaczneObrazeniaWszystkichBroni(value);
        break;

      case 'kryt':
        p.addAllCrit(value);
        break;

      case 'ignore':
        p.addIgnore(value);
        break;

      case 'sila':
        if(value <=2){
          p.addSila(Math.floor(c.poziom / 60));
        } else if (value == 3){
          p.addSila(Math.floor((c.poziom / 60) * 2));
        } else {
          p.addSila(Math.floor((c.poziom / 60) * 3));
        }
        p.addSila(value);
        break;

      case 'spostrzegawczosc':
        if(value <=2){
          p.addSpostrzegawczosc(Math.floor(c.poziom / 60));
        } else if (value == 3){
          p.addSpostrzegawczosc(Math.floor((c.poziom / 60) * 2));
        } else {
          p.addSpostrzegawczosc(Math.floor((c.poziom / 60) * 3));
        }
        p.addSpostrzegawczosc(value);
        break;

      case 'inteligencja':
        if(value <=2){
          p.addInteligencja(Math.floor(c.poziom / 60));
        } else if (value == 3){
          p.addInteligencja(Math.floor((c.poziom / 60) * 2));
        } else {
          p.addInteligencja(Math.floor((c.poziom / 60) * 3));
        }
        p.addInteligencja(value);
        break;

      case 'wiedza':
        if(value <=2){
          p.addWiedza(Math.floor(c.poziom / 60));
        } else if (value == 3){
          p.addWiedza(Math.floor((c.poziom / 60) * 2));
        } else {
          p.addWiedza(Math.floor((c.poziom / 60) * 3));
        }
        p.addWiedza(value);
        break;

      case 'zwinnosc':
        if(value <=2){
          p.addZwinnosc(Math.floor(c.poziom / 60));
        } else if (value == 3){
          p.addZwinnosc(Math.floor((c.poziom / 60) * 2));
        } else {
          p.addZwinnosc(Math.floor((c.poziom / 60) * 3));
        }
        p.addZwinnosc(value);
        break;

      case 'obrona':
        p.addObronaDodatkowa(Math.floor((c.poziom / 8) * value));
        break;

      case 'odpornosc':
        if(value <=2){
          p.addOdpornosc(Math.floor(c.poziom / 60));
        } else if (value == 3){
          p.addOdpornosc(Math.floor((c.poziom / 60) * 2));
        } else {
          p.addOdpornosc(Math.floor((c.poziom / 60) * 3));
        }
        p.addOdpornosc(value);
        break;

      case 'twardosc':
        p.addTwardosc(value);
        break;

      case 'zycie':
        if(value == 1){
          p.addLife(Math.floor(c.poziom / 60) * 50);
        } else if (value == 2){
          p.addLife(Math.floor((c.poziom / 60) * 2) * 75);
        } else if (value == 3) {
          p.addLife(Math.floor((c.poziom / 60) * 3) * 100);
        } else {
          p.addLife(Math.floor((c.poziom / 60) * 3) * 150);
        }
        p.addLife(value);
        break;

      case 'szczescie':
        p.addSzczescie(value);
        break;

      case 'multi':
        p.addCritMulti(value);
        break;

      default:
        break;
    }
  }
  }

}

