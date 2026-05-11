import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character, Attributes, TalizmanLevels, ArcaneLevels, DashboardValues, Evolutions } from '../models/character';
import { DashboardService } from './calculate'

const STORAGE_KEY = 'kotwic_character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private character$ = new BehaviorSubject<Character>(this.loadCharacter());
  constructor(private dashboardService: DashboardService) {
    this.character$.subscribe(c => localStorage.setItem(STORAGE_KEY, JSON.stringify(c)));
  }
  getCharacter$ = () => this.character$.asObservable();
  updateCharacter(character: Partial<Character>) {
    const current = this.character$.value;
    const updated: Character = {
      ...current,
      ...character,
      attributes: { ...current.attributes, ...(character.attributes || {}) },
      talizmanLevels: { ...current.talizmanLevels, ...(character.talizmanLevels || {}) },
      arcaneLevels: { ...current.arcaneLevels, ...(character.arcaneLevels || {}) },
      evolutions: { ...current.evolutions, ...(character.evolutions || {}) },
      equipment: { ...current.equipment, ...(character.equipment || {}) }
    };
    this.character$.next(updated);
  }
  updateAttributes(attributes: Partial<Attributes>) {
    const current = this.character$.value;
    this.character$.next({
      ...current,
      attributes: { ...current.attributes, ...attributes }
    });
  }
  updateEvolutions(evolutions: Partial<Evolutions>) {
    const current = this.character$.value;
    this.character$.next({
      ...current,
      evolutions: { ...current.evolutions, ...evolutions }
    });
  }
  updateTalizmanLevels(levels: Partial<TalizmanLevels>) {
    const current = this.character$.value;
    this.character$.next({
      ...current,
      talizmanLevels: { ...current.talizmanLevels, ...levels }
    });
  }
  updateArcaneLevels(levels: Partial<ArcaneLevels>) {
    const current = this.character$.value;
    this.character$.next({
      ...current,
      arcaneLevels: { ...current.arcaneLevels, ...levels }
    });
  }
  private loadCharacter(): Character {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...this.createEmptyCharacter(), ...JSON.parse(saved) };
    } catch { }
    return this.createEmptyCharacter();
  }
  private createEmptyCharacter(): Character {
    return {
      rasa: '',
      poziom: 0,
      blaszkaZaMoba: false,
      blaszkaZaKronosa: false,
      blaszkaZaHastura: false,
      attributes: {
        sila: 0,
        zwinnosc: 0,
        odpornosc: 0,
        wyglad: 0,
        charyzma: 0,
        wplywy: 0,
        spostrzegawczosc: 0,
        inteligencja: 0,
        wiedza: 0
      },
      talizmanLevels: {
        ambicja: 0,
        lewiatan: 0,
        behemot: 0,
        kamienZla: 0,
        kamienDobra: 0,
        kamienPrzestrzeni: 0,
        kamienCzasu: 0,
        szponyNocy: 0,
        zycieISmierc: 0,
        otchlaniCiszy: 0,
        potegaMocy: 0,
        furiaBestii: 0,
        auraBestii: 0,
        maskaWladzy: 0,
        maskaStachu: 0,
        cichyLowca: 0,
        piesnKrwi: 0,
        ziz: 0
      },
      arcaneLevels: {
        maskaAdnisa: 0,
        maskaKaliguli: 0,
        majestat: 0,
        krewZycia: 0,
        kocieSciezki: 0,
        zarKrwi: false,
        ciszaKrwi: 0,
        wyssanieMocy: 0,
        mocKrwi: 0,
        dzikiSzal: 0,
        skoraBestii: 0,
        cienBestii: false,
        nocnyLowca: 0,
        tchnienieSmierci: 0,
        groza: false
      },
      evolutions: {
        skrzydla: 0,
        pancerz: 0,
        klyPazuryKolce: 0,
        gruczolyJadowe: 0,
        wzmocnioneSciegna: 0,
        dodatkowaKomora: 0,
        krewDemona: 0,
        mutacjaDna: 0,
        oswiecony: 0,
        szostyZmysl: 0,
        absorpcja: 0,
        harmonijnyRozwoj: 0,
        pietnoDemona: 0,
        wzmocnioneMiesnie: 0
      },
      mysliwy: 0,
      ninja: 0,
      strateg: 0,
      kaplica: 0,
      posredniak: 0,
      domPubliczny: 0,
      rzeznia: 0,
      obronaPrzeciwnika: 0,
      odpornoscPrzeciwnika: 0,
      huntBonuses: [],
      eventBonus: '',
      oneTimeBonus: '',
      szczesciePrzeciwnika: 0,
      trafieniePrzeciwnika: 0,
      runeValues: [],
      umagiValues: [],
      equipment: {}
    };
  }
  clearCharacter() {
    localStorage.removeItem(STORAGE_KEY);
    this.character$.next(this.createEmptyCharacter());
  }
  calculateDashboard(): DashboardValues {
    const char = this.character$.value
    return this.dashboardService.calculateStuff(char)
  };
}
