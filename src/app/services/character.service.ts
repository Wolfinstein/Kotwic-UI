import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character, Attributes, TalizmanLevels, DashboardValues } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private character$ = new BehaviorSubject<Character>(this.createEmptyCharacter());

  rasaOptions = ['Głowa', 'Klatka piersiowa', 'Nogi', 'Szyja', 'Palec 1', 'Palec 2', 'Broń 1h', 'Broń 2h'];
  itemOptions = ['Głowa', 'Klatka piersiowa', 'Nogi', 'Szyja', 'Palec 1', 'Palec 2', 'Broń 1h', 'Broń 2h'];
  runeOptions = ['Głowa', 'Klatka piersiowa', 'Nogi', 'Szyja', 'Palec 1', 'Palec 2', 'Broń 1h', 'Broń 2h'];
  umágiaOptions = ['Efekt 1', 'Efekt 2', 'Efekt 3', 'Efekt 4'];

  constructor() {}

  getCharacter$ = () => this.character$.asObservable();

  updateCharacter(character: Partial<Character>) {
    const current = this.character$.value;
    this.character$.next({ ...current, ...character });
  }

  updateAttributes(attributes: Partial<Attributes>) {
    const current = this.character$.value;
    this.character$.next({
      ...current,
      attributes: { ...current.attributes, ...attributes }
    });
  }

  updateTalizmanLevels(levels: Partial<TalizmanLevels>) {
    const current = this.character$.value;
    this.character$.next({
      ...current,
      talizmanLevels: { ...current.talizmanLevels, ...levels }
    });
  }

  calculateDashboard(): DashboardValues {
    const character = this.character$.value;
    const atakBonus = Math.floor((character.attributes.siła + character.attributes.zwinność) / 2);
    const obronaBonus = Math.floor((character.attributes.odporność + character.attributes.zwinność) / 2);
    const dmgMin = Math.floor(character.attributes.siła / 3);
    const dmgMax = Math.floor((character.attributes.siła * 2) / 3);

    return {
      atak: [atakBonus, atakBonus + 5, atakBonus + 10],
      obrona: [obronaBonus, obronaBonus + 5, obronaBonus + 10],
      obrazenia: {
        min: dmgMin,
        max: dmgMax,
        modifier: `${character.attributes.siła} / 3 - ${character.attributes.siła} / 2`
      }
    };
  }

  private createEmptyCharacter(): Character {
    return {
      rasa: '',
      nazwa: '',
      poziom: 0,
      życie: 0,
      krew: 0,
      szczęście: 0,
      attributes: {
        siła: 0,
        zwinność: 0,
        odporność: 0,
        wygląd: 0,
        charyzma: 0,
        wpływ: 0,
        spostrzegawczość: 0,
        inteligencja: 0,
        wiedza: 0
      },
      talizmanLevels: {
        ambicja: 0,
        lewatism: 0,
        behemot: 0,
        kamieńZła: 0,
        kamieńDobra: 0,
        kamieńPrzestrzeni: 0,
        kamieńCzasu: 0,
        spaonNocy: 0,
        zycieIŚmierc: 0,
        otchłaniCiszy: 0,
        potęgaMocy: 0,
        furiaBestii: 0,
        auraBestii: 0,
        maskaWładzy: 0,
        maskaStachu: 0,
        cichyŁowca: 0,
        pieśnKrwi: 0
      },
      equipment: {},
      atak: 0,
      obrona: 0,
      obrazenia: { min: 0, max: 0, modifier: '' }
    };
  }
}
