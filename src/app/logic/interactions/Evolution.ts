import { Player } from './Player';
import { MultiplicativeBonus, MultiplicativeBonusType } from './MultiplicativeBonus';

export class Evolution {
  private skrzylda: number = 0;
  private pancerz: number = 0;
  private klyPauzryKolce: number = 0;
  private gruczolyJadowe: number = 0;
  private wzmocnioneSciegna: number = 0;
  private krewDemona: number = 0;
  private mutacjaDna: number = 0;
  private oswiecony: number = 0;
  private szostyZmysl: number = 0;
  private absorpcja: number = 0;
  private harmonijnyRozwoj: number = 0;
  private pietnoDemona: number = 0;
  private wzmocnioneMiesnie: number = 0;

  calculate(player: Player): Player {
    this.doSkrzydla(player);
    this.doSciegna(player);
    this.doKly(player);
    this.doGruczoly(player);
    this.doKrew(player);
    this.doMutacja(player);
    this.doOswiecony(player);
    this.doSzostyZmysl(player);
    this.doAbso(player);
    this.doHarmonijny(player);
    this.doPietno(player);
    this.doMiesnie(player);
    this.doPancerz(player);
    return player;
  }

  private bonus(licznik: number, mianownik: number, type: MultiplicativeBonusType): MultiplicativeBonus {
    return MultiplicativeBonus.builder()
      .licznik(licznik)
      .mianownik(mianownik)
      .type(type)
      .mnoznik(1)
      .build();
  }

  private skrzydlaBonusTier(level: number): number {
    if (level >= 15) return 75;
    if (level >= 10) return 50;
    return 25;
  }

  private doSkrzydla(player: Player): void {
    if (this.skrzylda < 1) return;
    player.addSpostrzegawczosc(this.skrzydlaSpostrzegawczosc(this.skrzylda));
    if (this.skrzylda >= 4) {
      player.addUnikBiala(this.skrzydlaUnikBiala(this.skrzylda));
      player.addUnikDystans(this.skrzydlaUnikDystans(this.skrzylda));
    }
    if (this.skrzylda >= 5) {
      player.addBonus(this.bonus(this.skrzydlaBonusTier(this.skrzylda), 100, MultiplicativeBonusType.SKRZYDLA));
    }
    if (this.skrzylda >= 14) {
      player.addCritMulti(this.skrzylda === 15 ? 0.40 : 0.25);
    }
  }

  private skrzydlaSpostrzegawczosc(level: number): number {
    if (level <= 10) return level * 4;
    return 40 + (level - 10) * 8;
  }

  private skrzydlaUnikBiala(level: number): number {
    if (level === 4) return 0.05;
    if (level <= 8) return 0.06;
    if (level <= 13) return 0.12;
    if (level === 14) return 0.17;
    return 0.18;
  }

  private skrzydlaUnikDystans(level: number): number {
    if (level === 4) return 0.03;
    if (level <= 8) return 0.05;
    if (level <= 13) return 0.10;
    if (level === 14) return 0.13;
    return 0.15;
  }

  private doSciegna(player: Player): void {
    if (this.wzmocnioneSciegna < 1) return;
    player.addZwinnosc(this.sciegnaZwinnosc(this.wzmocnioneSciegna));
    if (this.wzmocnioneSciegna >= 4) {
      const unik = this.sciegnaUnik(this.wzmocnioneSciegna);
      player.addUnikBiala(unik);
      player.addUnikDystans(unik);
      player.addUnikPalna(unik);
    }
    if (this.wzmocnioneSciegna >= 5) {
      player.addBonus(this.bonus(this.sciegnaBonusTier(this.wzmocnioneSciegna), 100, MultiplicativeBonusType.SCIEGNA));
    }
    if (this.wzmocnioneSciegna >= 11) {
      player.addCritMulti(this.wzmocnioneSciegna === 14 ? 0.25 : 0.4);
    }
  }

  private sciegnaZwinnosc(level: number): number {
    if (level <= 10) return level * 5;
    return 50 + (level - 10) * 10;
  }

  private sciegnaUnik(level: number): number {
    if (level <= 8) return 0.04;
    if (level === 9) return 0.07;
    if (level <= 13) return 0.08;
    if (level === 14) return 0.11;
    return 0.12;
  }

  private sciegnaBonusTier(level: number): number {
    if (level >= 15) return 60;
    if (level >= 10) return 40;
    return 20;
  }

  private doPancerz(player: Player): void {
    if (this.pancerz < 1) return;
    player.addOdpornosc(this.pancerzOdpornosc(this.pancerz));
    if (this.pancerz >= 4) {
      const redukcja = this.pancerz === 15 ? 0.03 : this.pancerz === 10 ? 0.02 : 0.01;
      player.addRedukcjaObrazen(redukcja);
      const lifePct = this.pancerzLifePct(this.pancerz);
      player.life += lifePct * player.baseLife;
    }
  }

  private pancerzOdpornosc(level: number): number {
    if (level <= 10) return level * 7;
    return 70 + (level - 10) * 14;
  }

  private pancerzLifePct(level: number): number {
    if (level <= 3) return 0.00;
    if (level <= 8) return 0.15;
    if (level === 9) return 0.25;
    return 0.30;
  }

  private doKly(player: Player): void {
    if (this.klyPauzryKolce < 1) return;
    this.applyKlyDamage(player, this.klyPauzryKolce);
    player.addAllTrafienie(this.klyTrafienie(this.klyPauzryKolce));
    if (this.klyPauzryKolce === 14) player.addLaczneObrazeniaWszystkichBroni(0.04);
    if (this.klyPauzryKolce === 15) player.addLaczneObrazeniaWszystkichBroni(0.10);
  }

  private applyKlyDamage(player: Player, level: number): void {
    player.addMinDpsBiala1h(level * 4);
    player.addMaxDpsBiala1h(level * 4);
    player.addMinDpsBiala2h(level * 2);
    player.addMaxDpsBiala2h(level * 2);
    player.addMinDpsPalna1h(level * 4);
    player.addMaxDpsPalna1h(level * 4);
    player.addMinDpsPalna2h(level * 3);
    player.addMaxDpsPalna2h(level * 3);
    player.addMinDpsDystans1h(level * 2);
    player.addMaxDpsDystans1h(level * 2);
    player.addMinDpsDystans2h(level * 2);
    player.addMaxDpsDystans2h(level * 2);
  }

  private klyTrafienie(level: number): number {
    if (level <= 3) return 0;
    if (level === 4) return 25;
    if (level <= 8) return 40;
    if (level === 9) return 65;
    if (level <= 13) return 80;
    if (level === 14) return 105;
    return 120;
  }

  private doGruczoly(player: Player): void {
    if (this.gruczolyJadowe < 1) return;
    player.addAllCrit(this.gruczolyJadowe * 0.05);
    player.addObronaDodatkowa(this.gruczolyObrona(this.gruczolyJadowe));
    if (this.gruczolyJadowe >= 6) {
      const scale = this.gruczolyCritMultiScale(this.gruczolyJadowe);
      player.addCritMultiBiala1h(scale * 0.2);
      player.addCritMultiBiala2h(scale * 0.6);
      player.addCritMultiPalna1h(scale * 0.2);
      player.addCritMultiPalna2h(scale * 0.4);
      player.addCritMultiDystans1h(scale * 0.2);
      player.addCritMultiDystans2h(scale * 0.6);
    }
  }

  private gruczolyObrona(level: number): number {
    if (level <= 4) return 40;
    if (level === 5) return 85;
    if (level <= 9) return 135;
    if (level === 10) return 170;
    return 255;
  }

  private gruczolyCritMultiScale(level: number): number {
    if (level === 10) return 2;
    if (level === 15) return 3;
    return 1;
  }

  private doKrew(player: Player): void {
    const szczescie = this.krewSzczescie(this.krewDemona);
    if (szczescie > 0) player.addSzczescie(szczescie);
  }

  private krewSzczescie(level: number): number {
    switch (level) {
      case 1: return 2;
      case 2: return 4;
      case 3: return 6;
      case 4: return 10;
      case 5: return 15;
      case 15: return 45;
      default: return 0;
    }
  }

  private doMutacja(player: Player): void {
    if (this.mutacjaDna < 1) return;
    const unik = this.mutacjaDna * 0.01;
    player.addUnikBiala(unik);
    player.addUnikDystans(unik);
    player.addUnikPalna(unik);
    const statBonus = this.mutacjaStatBonus(this.mutacjaDna);
    if (statBonus > 0) {
      player.addSpostrzegawczosc(statBonus);
      player.addZwinnosc(statBonus);
    }
  }

  private mutacjaStatBonus(level: number): number {
    if (level === 4) return 2;
    if (level <= 8) return 4;
    if (level === 9) return 6;
    if (level === 10) return 8;
    return 0;
  }

  private doOswiecony(player: Player): void {
    if (this.oswiecony < 1) return;
    player.addWiedza(this.oswieconyWiedza(this.oswiecony));
    this.applyPalnaDamage(player, this.oswieconyPalnaDmg(this.oswiecony));
    const bonusTier = this.oswieconyBonusTier(this.oswiecony);
    if (bonusTier) {
      player.addBonus(this.bonus(bonusTier[0], bonusTier[1], MultiplicativeBonusType.OSWIECONY));
    }
    if (this.oswiecony === 14) player.addTrafienieProcentowePalna(0.04);
    if (this.oswiecony === 15) player.addTrafienieProcentowePalna(0.10);
  }

  private oswieconyWiedza(level: number): number {
    if (level <= 13) return level * 2;
    if (level === 14) return 36;
    return 40;
  }

  private oswieconyPalnaDmg(level: number): number {
    if (level <= 3) return level * 2;
    if (level === 4) return 5;
    if (level <= 8) return 7;
    if (level === 9) return 12;
    if (level === 10) return 14;
    if (level === 14) return 19;
    return 21;
  }

  private oswieconyBonusTier(level: number): number[] | null {
    if (level >= 14) return [3, 3];
    if (level >= 9) return [2, 3];
    if (level >= 4) return [1, 3];
    return null;
  }

  private applyPalnaDamage(player: Player, dmg: number): void {
    player.addMinDpsPalna1h(dmg);
    player.addMaxDpsPalna1h(dmg);
    player.addMinDpsPalna2h(dmg);
    player.addMaxDpsPalna2h(dmg);
  }

  private doSzostyZmysl(player: Player): void {
    if (this.szostyZmysl < 1) return;
    const dmg = this.szostyZmysl * 10;
    player.addMinDpsDystans1h(dmg);
    player.addMinDpsDystans2h(dmg);
    player.addMaxDpsDystans1h(dmg);
    player.addMaxDpsDystans2h(dmg);
    if (this.szostyZmysl >= 4) {
      player.addTrafienieProcentoweDystans(this.szostyZmyslTrafienie(this.szostyZmysl));
    }
    if (this.szostyZmysl >= 5) {
      const ataki = this.szostyZmyslAtaki(this.szostyZmysl);
      player.addAtakiDystans1h(ataki[0]);
      player.addAtakiDystans2h(ataki[1]);
    }
  }

  private szostyZmyslTrafienie(level: number): number {
    if (level <= 8) return 0.08;
    if (level <= 13) return 0.16;
    return 0.24;
  }

  private szostyZmyslAtaki(level: number): number[] {
    if (level <= 8) return [2, 1];
    if (level <= 13) return [4, 2];
    if (level === 14) return [4, 2];
    return [6, 3];
  }

  private doAbso(player: Player): void {
    if (this.absorpcja < 1) return;
    player.life += this.absoFlatLife(this.absorpcja);
    if (this.absorpcja >= 11) {
      player.baseLife += this.absoBaseLifeBonus(this.absorpcja);
    }
    if (this.absorpcja === 14) {
      player.baseLife *= 1.3;
    }
    if (this.absorpcja === 15) {
      player.life += player.baseLife * 1.5;
    }
  }

  private absoFlatLife(level: number): number {
    if (level <= 3) return level * 150;
    if (level === 4) return 950;
    if (level === 5) return 1550;
    if (level === 6) return 1700;
    if (level === 7) return 1850;
    if (level === 8) return 2000;
    if (level === 9) return 2500;
    return 3100;
  }

  private absoBaseLifeBonus(level: number): number {
    if (level === 11) return 150;
    if (level === 12) return 300;
    if (level === 13) return 450;
    if (level === 14) return 950;
    return 1550;
  }

  private doHarmonijny(player: Player): void {
    const stat = this.harmonijnyStatValue(this.harmonijnyRozwoj);
    if (stat <= 0) return;
    player.addSila(stat);
    player.addZwinnosc(stat);
    player.addOdpornosc(stat);
    player.addWyglad(stat);
    player.addCharyzma(stat);
    player.addWplywy(stat);
    player.addSpostrzegawczosc(stat);
    player.addInteligencja(stat);
    player.addWiedza(stat);
  }

  private harmonijnyStatValue(level: number): number {
    switch (level) {
      case 1: return 1;
      case 2: return 2;
      case 3: return 3;
      case 4: return 5;
      case 5: return 7;
      case 6: return 8;
      case 7: return 9;
      case 8: return 10;
      case 9: return 12;
      case 10: return 14;
      case 11: return 16;
      case 12: return 18;
      case 13: return 20;
      case 14: return 24;
      case 15: return 28;
      default: return 0;
    }
  }

  private doPietno(player: Player): void {
    const ignore = this.pietnoIgnore(this.pietnoDemona);
    if (ignore > 0) player.addIgnore(ignore);
  }

  private pietnoIgnore(level: number): number {
    switch (level) {
      case 1: return 0.03;
      case 2: return 0.06;
      case 3: return 0.10;
      case 4: return 0.15;
      case 5: return 0.25;
      case 6: return 0.28;
      case 7: return 0.31;
      case 8: return 0.35;
      case 9: return 0.40;
      case 10: return 0.50;
      case 11: return 0.53;
      case 12: return 0.56;
      case 13: return 0.60;
      case 14: return 0.65;
      case 15: return 0.75;
      default: return 0.0;
    }
  }

  private doMiesnie(player: Player): void {
    if (this.wzmocnioneMiesnie < 1) return;
    player.addSila(this.miesnieSila(this.wzmocnioneMiesnie));
    const dmg1h = this.miesnieDmg1h(this.wzmocnioneMiesnie);
    const dmg2h = this.wzmocnioneMiesnie >= 4 ? this.miesnieDmg2h(this.wzmocnioneMiesnie) : 0;
    player.addMinDpsBiala1h(dmg1h);
    player.addMaxDpsBiala1h(dmg1h);
    if (dmg2h > 0) {
      player.addMinDpsBiala2h(dmg2h);
      player.addMaxDpsBiala2h(dmg2h);
    }
    if (this.wzmocnioneMiesnie >= 4) {
      player.addBonus(this.bonus(this.miesnieBonusTier(this.wzmocnioneMiesnie), 3, MultiplicativeBonusType.MIESNIE));
    }
    if (this.wzmocnioneMiesnie === 14) player.addTrafienieProcentoweBiala(0.04);
    if (this.wzmocnioneMiesnie === 15) player.addTrafienieProcentoweBiala(0.10);
  }

  private miesnieSila(level: number): number {
    if (level <= 10) return level * 2;
    if (level === 11) return 24;
    if (level === 12) return 28;
    if (level === 13) return 32;
    if (level === 14) return 36;
    return 40;
  }

  private miesnieDmg1h(level: number): number {
    if (level <= 3) return level * 2;
    if (level === 4) return 5;
    if (level === 5) return 7;
    if (level === 6) return 9;
    if (level === 7) return 11;
    if (level === 8) return 13;
    if (level === 9) return 12;
    if (level === 10) return 14;
    if (level === 11) return 16;
    if (level === 12) return 18;
    if (level === 13) return 20;
    if (level === 14) return 19;
    return 21;
  }

  private miesnieDmg2h(level: number): number {
    if (level <= 3) return 0;
    if (level === 4) return 5;
    if (level === 5) return 7;
    if (level <= 8) return 7;
    if (level === 9) return 12;
    if (level === 10) return 14;
    if (level <= 13) return 14;
    if (level === 14) return 19;
    return 21;
  }

  private miesnieBonusTier(level: number): number {
    if (level >= 14) return 3;
    if (level >= 9) return 2;
    return 1;
  }

  static builder(): EvolutionBuilder {
    return new EvolutionBuilder();
  }
}

class EvolutionBuilder {
  private _skrzylda: number = 0;
  private _pancerz: number = 0;
  private _klyPauzryKolce: number = 0;
  private _gruczolyJadowe: number = 0;
  private _wzmocnioneSciegna: number = 0;
  private _krewDemona: number = 0;
  private _mutacjaDna: number = 0;
  private _oswiecony: number = 0;
  private _szostyZmysl: number = 0;
  private _absorpcja: number = 0;
  private _harmonijnyRozwoj: number = 0;
  private _pietnoDemona: number = 0;
  private _wzmocnioneMiesnie: number = 0;

  skrzylda(value: number): EvolutionBuilder { this._skrzylda = value; return this; }
  pancerz(value: number): EvolutionBuilder { this._pancerz = value; return this; }
  klyPauzryKolce(value: number): EvolutionBuilder { this._klyPauzryKolce = value; return this; }
  gruczolyJadowe(value: number): EvolutionBuilder { this._gruczolyJadowe = value; return this; }
  wzmocnioneSciegna(value: number): EvolutionBuilder { this._wzmocnioneSciegna = value; return this; }
  krewDemona(value: number): EvolutionBuilder { this._krewDemona = value; return this; }
  mutacjaDna(value: number): EvolutionBuilder { this._mutacjaDna = value; return this; }
  oswiecony(value: number): EvolutionBuilder { this._oswiecony = value; return this; }
  szostyZmysl(value: number): EvolutionBuilder { this._szostyZmysl = value; return this; }
  absorpcja(value: number): EvolutionBuilder { this._absorpcja = value; return this; }
  harmonijnyRozwoj(value: number): EvolutionBuilder { this._harmonijnyRozwoj = value; return this; }
  pietnoDemona(value: number): EvolutionBuilder { this._pietnoDemona = value; return this; }
  wzmocnioneMiesnie(value: number): EvolutionBuilder { this._wzmocnioneMiesnie = value; return this; }

  build(): Evolution {
    const evo = new Evolution();
    evo['skrzylda'] = this._skrzylda;
    evo['pancerz'] = this._pancerz;
    evo['klyPauzryKolce'] = this._klyPauzryKolce;
    evo['gruczolyJadowe'] = this._gruczolyJadowe;
    evo['wzmocnioneSciegna'] = this._wzmocnioneSciegna;
    evo['krewDemona'] = this._krewDemona;
    evo['mutacjaDna'] = this._mutacjaDna;
    evo['oswiecony'] = this._oswiecony;
    evo['szostyZmysl'] = this._szostyZmysl;
    evo['absorpcja'] = this._absorpcja;
    evo['harmonijnyRozwoj'] = this._harmonijnyRozwoj;
    evo['pietnoDemona'] = this._pietnoDemona;
    evo['wzmocnioneMiesnie'] = this._wzmocnioneMiesnie;
    return evo;
  }
}
