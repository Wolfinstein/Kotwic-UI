import { Character } from '../models/character';

export interface CharacterPreset {
  name: string;
  description: string;
  character: Character;
}

export const CHARACTER_PRESETS: CharacterPreset[] = [
  {
    name: 'Potępiony Lv206 — Łuk',
    description: 'Potępiony, poziom 206, broń dystansowa LukRefleksyjny',
    character: {
      rasa: 'Potepiony',
      poziom: 206,
      blaszkaZaMoba: true,
      blaszkaZaKronosa: true,
      blaszkaZaHastura: false,
      attributes: {
        sila: 100,
        zwinnosc: 139,
        odpornosc: 75,
        wyglad: 69,
        charyzma: 68,
        wplywy: 68,
        spostrzegawczosc: 139,
        inteligencja: 97,
        wiedza: 97,
      },
      talizmanLevels: {
        ambicja: 0, lewiatan: 0, behemot: 3, kamienZla: 0, kamienDobra: 0,
        kamienPrzestrzeni: 0, kamienCzasu: 0, szponyNocy: 0, zycieISmierc: 3,
        otchlaniCiszy: 0, potegaMocy: 0, furiaBestii: 0, auraBestii: 0,
        maskaWladzy: 0, maskaStachu: 0, cichyLowca: 0, piesnKrwi: 0, ziz: 4,
      },
      arcaneLevels: {
        maskaAdnisa: 0, maskaKaliguli: 0, majestat: 0, krewZycia: 0,
        kocieSciezki: 0, zarKrwi: false, ciszaKrwi: 0, wyssanieMocy: 0,
        mocKrwi: 0, dzikiSzal: 0, skoraBestii: 56, cienBestii: false,
        nocnyLowca: 0, tchnienieSmierci: 60, groza: true,
      },
      evolutions: {
        skrzydla: 6, pancerz: 5, klyPazuryKolce: 0, gruczolyJadowe: 6,
        wzmocnioneSciegna: 8, dodatkowaKomora: 0, krewDemona: 0, mutacjaDna: 0,
        oswiecony: 0, szostyZmysl: 10, absorpcja: 0, harmonijnyRozwoj: 6,
        pietnoDemona: 0, wzmocnioneMiesnie: 0,
      },
      mysliwy: 5,
      ninja: 5,
      strateg: 5,
      kaplica: 6,
      posredniak: 79,
      domPubliczny: 20,
      rzeznia: 28,
      obronaPrzeciwnika: 0,
      odpornoscPrzeciwnika: 0,
      huntBonuses: [],
      eventBonus: null,
      oneTimeBonus: 'Ząb ghula',
      szczesciePrzeciwnika: 0,
      trafieniePrzeciwnika: 0,
      runeValues: [
        'obrazenia 5', 'kryt 12', 'sila 4', 'spostrzegawczosc 3',
        'spostrzegawczosc 3', 'zwinnosc 4', 'szczescie 12', 'obrona 3',
        'zycie 250', 'szczescie 8', 'multi 10', 'odpornosc 4', 'twardosc 3', 'kryt 5',
      ],
      umagiValues: [
        'zycie 1000', 'zycie 1000', 'zycie 1000', 'zycie 1000', 'zycie 1000',
        'zycie 1000', 'zycie 1000', 'zycie 1000', 'trafienie 25', 'trafienie 25',
        'zwinnosc 14', 'wiedza 14', 'dodatkowyAtak', 'dodatkowyAtak', 'wiedza 14', 'szczescie 20',
      ],
      equipment: {
        weaponMode: '2h',
        head:    { rarity: 'EPICKI', prefix: 'Tygrysi',  base: 'Bandana',       suffix: 'Wieszcza'   },
        chest:   { rarity: 'EPICKI', prefix: 'Tygrysi',  base: 'Peleryna',      suffix: 'Orchidei'   },
        legs:    { rarity: 'EPICKI', prefix: 'Tygrysi',  base: 'Szorty',        suffix: 'Nocy'       },
        neck:    { rarity: 'EPICKI', prefix: 'Spaczony', base: 'Krawat',        suffix: 'Wilkolaka'  },
        finger1: { rarity: 'EPICKI', prefix: 'Spaczony', base: 'Sygnet',        suffix: 'Madrosci'   },
        finger2: { rarity: 'EPICKI', prefix: 'Spaczony', base: 'Pierscien',     suffix: 'Wilkolaka'  },
        weapon1: { rarity: 'EPICKI', prefix: '',          base: 'LukRefleksyjny', suffix: 'Driady'   },
      },
    },
  },
];
