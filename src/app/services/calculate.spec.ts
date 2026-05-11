import { DashboardService } from './calculate';
import { Character } from '../models/character';

const CHARACTER: Character = {
  rasa: 'Potepiony',
  poziom: 189,
  blaszkaZaMoba: true,
  blaszkaZaKronosa: true,
  blaszkaZaHastura: false,
  attributes: {
    sila: 96,
    zwinnosc: 125,
    odpornosc: 72,
    wyglad: 64,
    charyzma: 145,
    wplywy: 93,
    spostrzegawczosc: 133,
    inteligencja: 93,
    wiedza: 93,
  },
  talizmanLevels: {
    ambicja: 0,
    lewiatan: 0,
    behemot: 3,
    kamienZla: 0,
    kamienDobra: 0,
    kamienPrzestrzeni: 0,
    kamienCzasu: 0,
    szponyNocy: 0,
    zycieISmierc: 3,
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
    skoraBestii: 57,
    cienBestii: false,
    nocnyLowca: 0,
    tchnienieSmierci: 55,
    groza: true,
  },
  evolutions: {
    skrzydla: 2,
    pancerz: 5,
    klyPazuryKolce: 0,
    gruczolyJadowe: 6,
    wzmocnioneSciegna: 7,
    dodatkowaKomora: 0,
    krewDemona: 0,
    mutacjaDna: 0,
    oswiecony: 0,
    szostyZmysl: 10,
    absorpcja: 5,
    harmonijnyRozwoj: 4,
    pietnoDemona: 0,
    wzmocnioneMiesnie: 0,
  },
  mysliwy: 5,
  ninja: 5,
  strateg: 5,
  kaplica: 6,
  obronaPrzeciwnika: 905,
  odpornoscPrzeciwnika: 905,
  szczesciePrzeciwnika: 0,
  trafieniePrzeciwnika: 0,
  huntBonuses: [],
  eventBonus: null,
  oneTimeBonus: 'Ząb ghula',
  runeValues: [
    'obrazenia 5',
    'kryt 12',
    'sila 4',
    'spostrzegawczosc 3',
    'spostrzegawczosc 3',
    'zwinnosc 4',
    'szczescie 12',
    'multi 6',
    'kryt 5',
    'odpornosc 3',
    'odpornosc 3',
    'obrona 3',
    'zycie 250',
    'szczescie 8',
  ],
  umagiValues: [
    'zycie 1000',
    'zycie 1000',
    'zycie 1000',
    'zycie 1000',
    'zycie 1000',
    'zycie 1000',
    'zycie 1000',
    'zycie 1000',
    'trafienie 25',
    'trafienie 25',
    'zwinnosc 14',
    'wiedza 14',
    'dodatkowyAtak',
    'dodatkowyAtak',
    'wiedza 14',
    'szczescie 20',
  ],
  equipment: {
    weaponMode: '2h',
    head:    { rarity: 'EPICKI', prefix: 'Tygrysi', base: 'Bandana',      suffix: 'Wieszcza'  },
    chest:   { rarity: 'EPICKI', prefix: 'Tygrysi', base: 'Peleryna',     suffix: 'Orchidei'  },
    legs:    { rarity: 'EPICKI', prefix: 'Tygrysi', base: 'Szorty',       suffix: 'Nocy'      },
    neck:    { rarity: 'EPICKI', prefix: 'Spaczony', base: 'Krawat',      suffix: 'Wilkolaka' },
    finger1: { rarity: 'EPICKI', prefix: 'Spaczony', base: 'Sygnet',      suffix: 'Madrosci'  },
    finger2: { rarity: 'EPICKI', prefix: 'Spaczony', base: 'Pierscien',   suffix: 'Wilkolaka' },
    weapon1: { rarity: 'EPICKI', prefix: '',          base: 'LukRefleksyjny', suffix: 'Driady' },
  },
};

describe('DashboardService – Potepiony lvl 189', () => {
  let service: DashboardService;
  let result: ReturnType<DashboardService['calculateStuff']>;

  beforeAll(() => {
    service = new DashboardService();
    result = service.calculateStuff(CHARACTER);
  });

  it('returns a result object (smoke test)', () => {
    expect(result).toBeDefined();
    expect(result.punktyZycia).toBeGreaterThan(0);
  });

  describe('hit points', () => {
    it('punktyZycia', () => {
      expect(result.punktyZycia).toBe(53113);
    });

    it('effectiveHp', () => {
      expect(result.effectiveHp).toBe(65860);
    });
  });

  describe('defence', () => {
    it('obrona', () => {
      expect(result.obrona).toBe(441);
    });

    it('redukcja', () => {
      expect(result.redukcja).toBeCloseTo(0.24, 5);
    });

    it('twardrosc', () => {
      expect(result.twardrosc).toBe(0);
    });

    it('unikBiala', () => {
      expect(result.unikBiala).toBeCloseTo(1.34, 5);
    });

    it('unikPalna', () => {
      expect(result.unikPalna).toBeCloseTo(1.14, 5);
    });

    it('unikDystans', () => {
      expect(result.unikDystans).toBeCloseTo(1.14, 5);
    });
  });

  describe('attributes', () => {
    it('sila', () => {
      expect(result.attributes?.sila).toBe(132);
    });

    it('zwinnosc', () => {
      expect(result.attributes?.zwinnosc).toBe(358);
    });

    it('spostrzegawczosc', () => {
      expect(result.attributes?.spostrzegawczosc).toBe(236);
    });

    it('charyzma', () => {
      expect(result.attributes?.charyzma).toBe(228);
    });
  });

  describe('misc stats', () => {
    it('szczescie', () => {
      expect(result.szczescie).toBe(40);
    });

    it('inicjatywa', () => {
      expect(result.inicjatywa).toBe(669);
    });

    it('regeneracja', () => {
      expect(result.regeneracja).toBe(0);
    });
  });

  describe('weapon damage (LukRefleksyjny EPICKI + Driady)', () => {
    it('produces exactly one weapon entry', () => {
      expect(result.obrazenia).toHaveLength(1);
    });

    it('weapon name contains base and suffix', () => {
      expect(result.obrazenia?.[0].name).toContain('LukRefleksyjny');
      expect(result.obrazenia?.[0].name).toContain('Driady');
    });

    it('minDmg', () => {
      expect(result.obrazenia?.[0].minDmg).toBe(1164);
    });

    it('maxDmg', () => {
      expect(result.obrazenia?.[0].maxDmg).toBe(1214);
    });

    it('iloscAtakow', () => {
      expect(result.obrazenia?.[0].iloscAtakow).toBe(22);
    });

    it('critChance', () => {
      expect(result.obrazenia?.[0].critChance).toBeCloseTo(0.93, 5);
    });

    it('critMulti', () => {
      expect(result.obrazenia?.[0].critMulti).toBeCloseTo(7.85, 5);
    });

    it('trafienie', () => {
      expect(result.obrazenia?.[0].trafienie).toBe(1043);
    });
  });

  describe('hit bonuses', () => {
    it('trafienieDodatkoweDystans', () => {
      expect(result.trafienieDodatkoweDystans).toBe(52);
    });
  });
});
