import { Stats } from "./Stats";

export class WeaponStats extends Stats {

  bazaDpsMin: number = 0;
  bazaDpsMax: number = 0;
  dpsBroniMin: number = 0;
  dpsBroniMax: number = 0;
  bazoweHp: number = 0;
  pktKrwi: number = 0;
  dpsAll: number = 0;
  dpsVsPotwory : number = 0;
  bazaTrafienie: number = 0;
  dodatkoweTrafienie: number = 0;
  atakiNaRunde: number = 0;
  atakiVsPotwory: number = 0;
  critMulti: number = 0;
  critMultiVsPotwory: number = 0;
  critChance: number = 0;
  critChanceGlobal : number = 0;
  critChanceVsPotwory: number = 0;
  trafienieProcentowe: number = 0;
  ignoreVsPotwory: number = 0;
  ignore: number = 0;
  ignoreFlat: number = 0;
  obrazeniaPerLevel: number = 0;
  dodatkowaObrona: number = 0;
  

  addWeaponStats(newStats: WeaponStats): this {
  this.sila += newStats.sila;
  this.zwinnosc += newStats.zwinnosc;
  this.odpornosc += newStats.odpornosc;
  this.wyglad += newStats.wyglad;
  this.charyzma += newStats.charyzma;
  this.wplywy += newStats.wplywy;
  this.spostrzegawczosc += newStats.spostrzegawczosc;
  this.inteligencja += newStats.inteligencja;
  this.wiedza += newStats.wiedza;
  this.szczescie += newStats.szczescie;

  this.bazaDpsMin += newStats.bazaDpsMin;
  this.bazaDpsMax += newStats.bazaDpsMax;
  this.dpsBroniMin += newStats.dpsBroniMin;
  this.dpsBroniMax += newStats.dpsBroniMax;

  this.bazoweHp += newStats.bazoweHp;
  this.pktKrwi += newStats.pktKrwi;

  this.dpsAll += newStats.dpsAll;
  this.dpsVsPotwory += newStats.dpsVsPotwory;

  this.bazaTrafienie += newStats.bazaTrafienie;
  this.dodatkoweTrafienie += newStats.dodatkoweTrafienie;

  this.atakiNaRunde += newStats.atakiNaRunde;
  this.atakiVsPotwory += newStats.atakiVsPotwory;

  this.critMulti += newStats.critMulti;
  this.critMultiVsPotwory += newStats.critMultiVsPotwory;

  this.critChance += newStats.critChance;
  this.critChanceVsPotwory += newStats.critChanceVsPotwory;
  this.critChanceGlobal += newStats.critChanceGlobal;
  this.trafienieProcentowe += newStats.trafienieProcentowe;

  this.ignoreVsPotwory += newStats.ignoreVsPotwory;
  this.ignore += newStats.ignore;
  this.ignoreFlat += newStats.ignoreFlat;

  this.twardosc += newStats.twardosc;
  this.obrazeniaPerLevel += newStats.obrazeniaPerLevel;

  this.dodatkowaObrona += newStats.dodatkowaObrona;

  if (this.isObronaZero) {
    this.isObronaZero = newStats.isObronaZero;
  }

  return this;
}

override clone(): WeaponStats {
  const cloned = new WeaponStats();
  Object.assign(cloned, this);
  return cloned;
}

}

export class WeaponStatsBuilder {
  private stats: WeaponStats = new WeaponStats();

  bazaDpsMin(value: number): this { this.stats.bazaDpsMin = value; return this; }
  bazaDpsMax(value: number): this { this.stats.bazaDpsMax = value; return this; }
  dpsBroniMin(value: number): this { this.stats.dpsBroniMin = value; return this; }
  dpsBroniMax(value: number): this { this.stats.dpsBroniMax = value; return this; }
  bazoweHp(value: number): this { this.stats.bazoweHp = value; return this; }
  pktKrwi(value: number): this { this.stats.pktKrwi = value; return this; }
  dpsAll(value: number): this { this.stats.dpsAll = value; return this; }
  dpsVsPotwory(value: number): this { this.stats.dpsVsPotwory = value; return this; }
  bazaTrafienie(value: number): this { this.stats.bazaTrafienie = value; return this; }
  dodatkoweTrafienie(value: number): this { this.stats.dodatkoweTrafienie = value; return this; }
  atakiNaRunde(value: number): this { this.stats.atakiNaRunde = value; return this; }
  atakiVsPotwory(value: number): this { this.stats.atakiVsPotwory = value; return this; }
  critMulti(value: number): this { this.stats.critMulti = value; return this; }
  critMultiVsPotwory(value: number): this { this.stats.critMultiVsPotwory = value; return this; }
  critChance(value: number): this { this.stats.critChance = value; return this; }
  critChanceGlobal(value: number): this { this.stats.critChanceGlobal = value; return this; }
  critChanceVsPotwory(value: number): this { this.stats.critChanceVsPotwory = value; return this; }
  trafienieProcentowe(value: number): this { this.stats.trafienieProcentowe = value; return this; }
  ignoreVsPotwory(value: number): this { this.stats.ignoreVsPotwory = value; return this; }
  ignore(value: number): this { this.stats.ignore = value; return this; }
  ignoreFlat(value: number): this { this.stats.ignoreFlat = value; return this; }
  twardosc(value: number): this { this.stats.twardosc = value; return this; }
  obrazeniaPerLevel(value: number): this { this.stats.obrazeniaPerLevel = value; return this; }
  dodatkowaObrona(value: number): this { this.stats.dodatkowaObrona = value; return this; }

  sila(value: number): this { this.stats.sila = value; return this; }
  zwinnosc(value: number): this { this.stats.zwinnosc = value; return this; }
  odpornosc(value: number): this { this.stats.odpornosc = value; return this; }
  wyglad(value: number): this { this.stats.wyglad = value; return this; }
  charyzma(value: number): this { this.stats.charyzma = value; return this; }
  wplywy(value: number): this { this.stats.wplywy = value; return this; }
  spostrzegawczosc(value: number): this { this.stats.spostrzegawczosc = value; return this; }
  inteligencja(value: number): this { this.stats.inteligencja = value; return this; }
  wiedza(value: number): this { this.stats.wiedza = value; return this; }
  szczescie(value: number): this { this.stats.szczescie = value; return this; }
  isObronaZero(value: boolean): this { this.stats.isObronaZero = value; return this; }

  build(): WeaponStats { return this.stats; }
}
