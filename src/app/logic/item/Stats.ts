
export class Stats {
  // Attributes
  sila: number = 0;
  zwinnosc: number = 0;
  odpornosc: number = 0;
  wyglad: number = 0;
  charyzma: number = 0;
  wplywy: number = 0;
  spostrzegawczosc: number = 0;
  inteligencja: number = 0;
  wiedza: number = 0;
  szczescie: number = 0;

  // Health points
  punktyKrwi: number = 0;
  punktyZycia: number = 0;

  // Defense
  obronaPrzedmiotow: number = 0;
  obronaDodatkowa: number = 0;
  redukcjaObrazen: number = 0;
  twardosc: number = 0;
  mnoznikObrony: number = 0;
  isObronaZero: boolean = false;

  // Dodge/Evasion
  unikDystans: number = 0;
  unikPalna: number = 0;
  unikBiala: number = 0;

  // Critical chance
  critChanceDystans: number = 0;
  critChancePalna1h: number = 0;
  critChancePalna2h: number = 0;
  critChanceBiala1h: number = 0;
  critChanceBiala2h: number = 0;

  // Critical multiplier
  critMultiDystans1h: number = 0;
  critMultiDystans2h: number = 0;
  critMultiPalna1h: number = 0;
  critMultiPalna2h: number = 0;
  critMultiBiala1h: number = 0;
  critMultiBiala2h: number = 0;

  // Attack count
  atakiDystans1h: number = 0;
  atakiDystans2h: number = 0;
  atakiPalna: number = 0;
  atakiBiala: number = 0;

  // Hit chance
  trafienieDystans: number = 0;
  trafieniePalna: number = 0;
  trafienieBiala: number = 0;
  trafienieProcentoweBiala: number = 0;
  trafienieProcentowePalna: number = 0;
  trafienieProcentoweDystans: number = 0;

  // Armor penetration
  ignoreObrony: number = 0;

  // Damage per second (DPS) - Ranged 1h
  minDpsDystans1h: number = 0;
  maxDpsDystans1h: number = 0;

  // Damage per second (DPS) - Ranged 2h
  minDpsDystans2h: number = 0;
  maxDpsDystans2h: number = 0;

  // Damage per second (DPS) - Gun 1h
  minDpsPalna1h: number = 0;
  maxDpsPalna1h: number = 0;

  // Damage per second (DPS) - Gun 2h
  minDpsPalna2h: number = 0;
  maxDpsPalna2h: number = 0;

  // Damage per second (DPS) - White/Melee 1h
  minDpsBiala1h: number = 0;
  maxDpsBiala1h: number = 0;

  // Damage per second (DPS) - White/Melee 2h
  minDpsBiala2h: number = 0;
  maxDpsBiala2h: number = 0;

  // Damage multipliers and totals
  laczneObrazeniaWszystkichBroni: number = 0;

  // Regeneration and initiative
  regen: number = 0;
  additionalIni: number = 0;

  /**
   * Set DPS for all weapon types
   */
  setAllDps(dps: number): void {
    this.minDpsDystans1h += dps;
    this.maxDpsDystans1h += dps;
    this.minDpsDystans2h += dps;
    this.maxDpsDystans2h += dps;
    this.minDpsPalna1h += dps;
    this.maxDpsPalna1h += dps;
    this.minDpsPalna2h += dps;
    this.maxDpsPalna2h += dps;
    this.minDpsBiala1h += dps;
    this.maxDpsBiala1h += dps;
    this.minDpsBiala2h += dps;
    this.maxDpsBiala2h += dps;
  }

  /**
   * Set DPS for all one-handed weapons
   */
  setAllDps1h(dps: number): void {
    this.minDpsPalna1h += dps;
    this.maxDpsPalna1h += dps;
    this.minDpsBiala1h += dps;
    this.maxDpsBiala1h += dps;
  }

  /**
   * Set DPS for all two-handed weapons
   */
  setAllDps2h(dps: number): void {
    this.minDpsDystans2h += dps;
    this.maxDpsDystans2h += dps;
    this.minDpsPalna2h += dps;
    this.maxDpsPalna2h += dps;
    this.minDpsBiala2h += dps;
    this.maxDpsBiala2h += dps;
    this.minDpsDystans1h += dps;
    this.maxDpsDystans1h += dps;
  }

  /**
   * Set max DPS for all weapons
   */
  setAllMaxDps(dps: number): void {
    this.maxDpsDystans1h += dps;
    this.maxDpsDystans2h += dps;
    this.maxDpsPalna1h += dps;
    this.maxDpsPalna2h += dps;
    this.maxDpsBiala1h += dps;
    this.maxDpsBiala2h += dps;
  }

  /**
   * Set min DPS for all weapons
   */
  setAllMinDps(dps: number): void {
    this.minDpsDystans1h += dps;
    this.minDpsDystans2h += dps;
    this.minDpsPalna1h += dps;
    this.minDpsPalna2h += dps;
    this.minDpsBiala1h += dps;
    this.minDpsBiala2h += dps;
  }

  /**
   * Set critical chance for all weapon types
   */
  setAllCritChance(crit: number): void {
    this.critChanceDystans += crit;
    this.critChancePalna1h += crit;
    this.critChancePalna2h += crit;
    this.critChanceBiala1h += crit;
    this.critChanceBiala2h += crit;
  }

  /**
   * Set hit chance for all weapon types
   */
  setAllTrafienie(trafienie: number): void {
    this.trafienieDystans += trafienie;
    this.trafieniePalna += trafienie;
    this.trafienieBiala += trafienie;
  }

  /**
   * Set dodge chance for all weapon types
   */
  setAllUnik(unik: number): void {
    this.unikBiala += unik;
    this.unikDystans += unik;
    this.unikPalna += unik;
  }

  /**
   * Set critical multiplier for all weapon types
   */
  setAllCritMulti(value: number): void {
    this.critMultiBiala1h += value;
    this.critMultiBiala2h += value;
    this.critMultiDystans1h += value;
    this.critMultiDystans2h += value;
    this.critMultiPalna1h += value;
    this.critMultiPalna2h += value;
  }

  /**
   * Set critical multiplier for all one-handed weapons
   */
  setAllCritMulti1h(value: number): void {
    this.critMultiBiala1h += value;
    this.critMultiPalna1h += value;
  }

  /**
   * Set critical multiplier for all two-handed weapons
   */
  setAllCritMulti2h(value: number): void {
    this.critMultiBiala2h += value;
    this.critMultiDystans2h += value;
    this.critMultiPalna2h += value;
    this.critMultiDystans1h += value;
  }

  /**
   * Set attack count for all weapon types
   */
  setAllAtaki(ataki: number): void {
    this.atakiBiala += ataki;
    this.atakiDystans1h += ataki;
    this.atakiDystans2h += ataki;
    this.atakiPalna += ataki;
  }

  /**
   * Set additional initiative
   */
  setAdditionalIni(value: number): void {
    this.additionalIni += value;
  }

  /**
   * Set percentage hit chance for guns
   */
  setTrafienieProcentowePalna(value: number): void {
    this.trafienieProcentowePalna += value;
  }

  /**
   * Set percentage hit chance for white/melee
   */
  setTrafienieProcentoweBiala(value: number): void {
    this.trafienieProcentoweBiala += value;
  }

  /**
   * Set percentage hit chance for ranged
   */
  setTrafienieProcentoweDystans(value: number): void {
    this.trafienieProcentoweDystans += value;
  }

  /**
   * Set total damage multiplier for all weapons
   */
  setLaczneObrazeniaWszystkichBroni(value: number): void {
    this.laczneObrazeniaWszystkichBroni += value;
  }

  /**
   * Aggregate (add) another Stats object to this one
   * Combines all stats from the provided stats object into this object
   */
  addStats(newStats: Stats): this {
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
    this.punktyZycia += newStats.punktyZycia;
    this.redukcjaObrazen += newStats.redukcjaObrazen;

    this.unikDystans += newStats.unikDystans;
    this.unikPalna += newStats.unikPalna;
    this.unikBiala += newStats.unikBiala;

    this.critChanceDystans += newStats.critChanceDystans;
    this.critChancePalna1h += newStats.critChancePalna1h;
    this.critChancePalna2h += newStats.critChancePalna2h;
    this.critChanceBiala1h += newStats.critChanceBiala1h;
    this.critChanceBiala2h += newStats.critChanceBiala2h;

    this.critMultiDystans1h += newStats.critMultiDystans1h;
    this.critMultiDystans2h += newStats.critMultiDystans2h;
    this.critMultiPalna1h += newStats.critMultiPalna1h;
    this.critMultiPalna2h += newStats.critMultiPalna2h;
    this.critMultiBiala1h += newStats.critMultiBiala1h;
    this.critMultiBiala2h += newStats.critMultiBiala2h;

    this.atakiDystans1h += newStats.atakiDystans1h;
    this.atakiDystans2h += newStats.atakiDystans2h;
    this.atakiPalna += newStats.atakiPalna;
    this.atakiBiala += newStats.atakiBiala;

    this.trafienieDystans += newStats.trafienieDystans;
    this.trafieniePalna += newStats.trafieniePalna;
    this.trafienieBiala += newStats.trafienieBiala;

    this.ignoreObrony += newStats.ignoreObrony;

    this.minDpsDystans1h += newStats.minDpsDystans1h;
    this.maxDpsDystans1h += newStats.maxDpsDystans1h;
    this.minDpsDystans2h += newStats.minDpsDystans2h;
    this.maxDpsDystans2h += newStats.maxDpsDystans2h;

    this.minDpsPalna1h += newStats.minDpsPalna1h;
    this.maxDpsPalna1h += newStats.maxDpsPalna1h;
    this.minDpsPalna2h += newStats.minDpsPalna2h;
    this.maxDpsPalna2h += newStats.maxDpsPalna2h;

    this.minDpsBiala1h += newStats.minDpsBiala1h;
    this.maxDpsBiala1h += newStats.maxDpsBiala1h;
    this.minDpsBiala2h += newStats.minDpsBiala2h;
    this.maxDpsBiala2h += newStats.maxDpsBiala2h;

    this.regen += newStats.regen;
    this.twardosc += newStats.twardosc;

    this.trafienieProcentowePalna += newStats.trafienieProcentowePalna;
    this.trafienieProcentoweBiala += newStats.trafienieProcentoweBiala;
    this.trafienieProcentoweDystans += newStats.trafienieProcentoweDystans;

    this.laczneObrazeniaWszystkichBroni += newStats.laczneObrazeniaWszystkichBroni;
    this.obronaDodatkowa += this.obronaDodatkowa;

    // Handle armor multiplier if present
    if (newStats.mnoznikObrony !== null && newStats.mnoznikObrony !== undefined) {
      this.obronaPrzedmiotow += newStats.obronaPrzedmiotow + Math.ceil((newStats.obronaPrzedmiotow * newStats.mnoznikObrony));
    }

    // Update armor zero flag
    if (this.isObronaZero) {
      this.isObronaZero = newStats.isObronaZero;
    }

    return this;
  }

  /**
   * Create a new Stats instance from a builder
   */
  static builder(): StatsBuilder {
    return new StatsBuilder();
  }

  /**
   * Clone this Stats object
   */
  clone(): Stats {
    const cloned = new Stats();
    Object.assign(cloned, this);
    return cloned;
  }
}

/**
 * Builder class for Stats
 */
export class StatsBuilder {
  private stats: Stats = new Stats();

  sila(value: number): this {
    this.stats.sila = value;
    return this;
  }

  zwinnosc(value: number): this {
    this.stats.zwinnosc = value;
    return this;
  }

  odpornosc(value: number): this {
    this.stats.odpornosc = value;
    return this;
  }

  wyglad(value: number): this {
    this.stats.wyglad = value;
    return this;
  }

  charyzma(value: number): this {
    this.stats.charyzma = value;
    return this;
  }

  wplywy(value: number): this {
    this.stats.wplywy = value;
    return this;
  }

  spostrzegawczosc(value: number): this {
    this.stats.spostrzegawczosc = value;
    return this;
  }

  inteligencja(value: number): this {
    this.stats.inteligencja = value;
    return this;
  }

  wiedza(value: number): this {
    this.stats.wiedza = value;
    return this;
  }

  szczescie(value: number): this {
    this.stats.szczescie = value;
    return this;
  }

  twardosc(value: number): this {
    this.stats.twardosc = value;
    return this;
  }

  isObronaZero(value: boolean): this {
    this.stats.isObronaZero = value;
    return this;
  }

  ignoreObrony(value: number): this {
    this.stats.ignoreObrony = value;
    return this;
  }

  atakiDystans2h(value: number): this {
    this.stats.atakiDystans2h = value;
    return this;
  }

  atakiDystans1h(value: number): this {
    this.stats.atakiDystans1h = value;
    return this;
  }

  atakiPalna(value: number): this {
    this.stats.atakiPalna = value;
    return this;
  }

  mnoznikObrony(value: number): this {
    this.stats.mnoznikObrony = value;
    return this;
  }

  trafienieProcentoweBiala(value: number): this {
    this.stats.trafienieProcentoweBiala = value;
    return this;
  }

  trafienieProcentoweDystans(value: number): this {
    this.stats.trafienieProcentoweDystans = value;
    return this;
  }

  trafienieProcentowePalna(value: number): this {
    this.stats.trafienieProcentowePalna = value;
    return this;
  }

  trafienieDystans(value: number): this {
    this.stats.trafienieDystans = value;
    return this;
  }

  trafienieBiala(value: number): this {
    this.stats.trafienieBiala = value;
    return this;
  }

  trafieniePalna(value: number): this {
    this.stats.trafieniePalna = value;
    return this;
  }

  critMultiDystans1h(value: number): this {
    this.stats.critMultiDystans1h = value;
    return this;
  }

  critMultiDystans2h(value: number): this {
    this.stats.critMultiDystans2h = value;
    return this;
  }

  punktyKrwi(value: number): this {
    this.stats.punktyKrwi = value;
    return this;
  }

  atakiBiala(value: number): this {
    this.stats.atakiBiala = value;
    return this;
  }

  punktyZycia(value: number): this {
    this.stats.punktyZycia = value;
    return this;
  }

  obronaPrzedmiotow(value: number): this {
    this.stats.obronaPrzedmiotow = value;
    return this;
  }

  obronaDodatkowa(value: number): this {
    this.stats.obronaDodatkowa = value;
    return this;
  }

  redukcjaObrazen(value: number): this {
    this.stats.redukcjaObrazen = value;
    return this;
  }

  unikDystans(value: number): this {
    this.stats.unikDystans = value;
    return this;
  }

  unikPalna(value: number): this {
    this.stats.unikPalna = value;
    return this;
  }

  unikBiala(value: number): this {
    this.stats.unikBiala = value;
    return this;
  }

  minDpsBiala1h(value: number): this {
    this.stats.minDpsBiala1h = value;
    return this;
  }

  maxDpsBiala1h(value: number): this {
    this.stats.maxDpsBiala1h = value;
    return this;
  }

  minDpsBiala2h(value: number): this {
    this.stats.minDpsBiala2h = value;
    return this;
  }

  maxDpsBiala2h(value: number): this {
    this.stats.maxDpsBiala2h = value;
    return this;
  }

  minDpsPalna1h(value: number): this {
    this.stats.minDpsPalna1h = value;
    return this;
  }

  maxDpsPalna1h(value: number): this {
    this.stats.maxDpsPalna1h = value;
    return this;
  }

  minDpsPalna2h(value: number): this {
    this.stats.minDpsPalna2h = value;
    return this;
  }

  maxDpsPalna2h(value: number): this {
    this.stats.maxDpsPalna2h = value;
    return this;
  }

  minDpsDystans1h(value: number): this {
    this.stats.minDpsDystans1h = value;
    return this;
  }

  maxDpsDystans1h(value: number): this {
    this.stats.maxDpsDystans1h = value;
    return this;
  }

  minDpsDystans2h(value: number): this {
    this.stats.minDpsDystans2h = value;
    return this;
  }

  maxDpsDystans2h(value: number): this {
    this.stats.maxDpsDystans2h = value;
    return this;
  }

  critChanceDystans(value: number): this {
    this.stats.critChanceDystans = value;
    return this;
  }

  critChancePalna1h(value: number): this {
    this.stats.critChancePalna1h = value;
    return this;
  }

  critChancePalna2h(value: number): this {
    this.stats.critChancePalna2h = value;
    return this;
  }

  critChanceBiala1h(value: number): this {
    this.stats.critChanceBiala1h = value;
    return this;
  }

  critMultiBiala1h(value: number): this {
    this.stats.critMultiBiala1h = value;
    return this;
  }


  critMultiBiala2h(value: number): this {
    this.stats.critMultiBiala2h = value;
    return this;
  }

  critMultiPalna1h(value: number): this {
    this.stats.critMultiPalna1h = value;
    return this;
  }

  critMultiPalna2h(value: number): this {
    this.stats.critMultiPalna2h = value;
    return this;
  }

  critChanceBiala2h(value: number): this {
    this.stats.critChanceBiala2h = value;
    return this;
  }

  build(): Stats {
    return this.stats;
  }
}
