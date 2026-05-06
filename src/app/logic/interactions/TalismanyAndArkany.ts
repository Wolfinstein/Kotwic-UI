import { Player } from './Player';
import { MultiplicativeBonus, MultiplicativeBonusType } from './MultiplicativeBonus';
export class TalismanyAndArkany {
  aMajestat: number = 0;
  aMaskaOff: number = 0;
  aMaskaDef: number = 0;
  aKrewZycia: number = 0;
  aKocieSciezki: number = 0;
  aZar: number = 0;
  aCisza: number = 0;
  aWyssanie: number = 0;
  aMocKrwi: number = 0;
  aSkora: number = 0;
  aDziki: number = 0;
  aCienBestii: number = 0;
  aNocny: number = 0;
  aTchnienie: number = 0;
  ambicja: number = 0;
  behemot: number = 0;
  ziz: number = 0;
  kamienSpota: number = 0;
  kamienZwinki: number = 0;
  szpony: number = 0;
  zycieSmierc: number = 0;
  otchlan: number = 0;
  potega: number = 0;
  aura: number = 0;
  maskaStrachu: number = 0;
  maskaWladzy: number = 0;
  lowca: number = 0;
  piesnKrwi: number = 0;
  cichyLowca: number = 0;
  constructor(
    aMajestat: number = 0,
    aMaskaOff: number = 0,
    aMaskaDef: number = 0,
    aKrewZycia: number = 0,
    aKocieSciezki: number = 0,
    aZar: number = 0,
    aCisza: number = 0,
    aWyssanie: number = 0,
    aMocKrwi: number = 0,
    aSkora: number = 0,
    aDziki: number = 0,
    aCienBestii: number = 0,
    aNocny: number = 0,
    aTchnienie: number = 0,
    ambicja: number = 0,
    behemot: number = 0,
    ziz: number = 0,
    kamienSpota: number = 0,
    kamienZwinki: number = 0,
    szpony: number = 0,
    zycieSmierc: number = 0,
    otchlan: number = 0,
    potega: number = 0,
    aura: number = 0,
    maskaStrachu: number = 0,
    maskaWladzy: number = 0,
    lowca: number = 0,
    piesnKrwi: number = 0,
    cichyLowca: number = 0
  ) {
    this.aMajestat = aMajestat;
    this.aMaskaOff = aMaskaOff;
    this.aMaskaDef = aMaskaDef;
    this.aKrewZycia = aKrewZycia;
    this.aKocieSciezki = aKocieSciezki;
    this.aZar = aZar;
    this.aCisza = aCisza;
    this.aWyssanie = aWyssanie;
    this.aMocKrwi = aMocKrwi;
    this.aSkora = aSkora;
    this.aDziki = aDziki;
    this.aCienBestii = aCienBestii;
    this.aNocny = aNocny;
    this.aTchnienie = aTchnienie;
    this.ambicja = ambicja;
    this.behemot = behemot;
    this.ziz = ziz;
    this.kamienSpota = kamienSpota;
    this.kamienZwinki = kamienZwinki;
    this.szpony = szpony;
    this.zycieSmierc = zycieSmierc;
    this.otchlan = otchlan;
    this.potega = potega;
    this.aura = aura;
    this.maskaStrachu = maskaStrachu;
    this.maskaWladzy = maskaWladzy;
    this.lowca = lowca;
    this.piesnKrwi = piesnKrwi;
    this.cichyLowca = cichyLowca;
  }
  static builder() {
    return new TalismanyAndArkanyBuilder();
  }
  calculateTalisman(player: Player): Player {
    const p1 = this.doAmbicja(player);
    this.doBehe(p1);
    this.doZiz(p1);
    this.doKamykSpota(p1);
    this.doKamykZwinki(p1);
    this.doSzpony(p1);
    this.doZycieiSmierc(p1);
    this.doOtchlan(p1);
    this.doPotega(p1);
    this.doAura(p1);
    this.doCichyLowca(p1);
    this.doMaskaOffa(p1);
    this.doLowca(p1);
    this.doPiesnKrwi(p1);
    this.doMaskaDef(p1);
    return p1;
  }
  calculateArakny(player: Player): Player {
    const p1 = this.doMajestat(player);
    this.doKocieSciezki(p1);
    this.doZar(p1);
    this.doMocKrwi(p1);
    this.doSkora(p1);
    this.doDziki(p1);
    this.doCienBestii(p1);
    this.doaNocny(p1);
    this.doaTchnienie(p1);
    this.doKrewZycia(p1);
    this.doKaligula(p1);
    this.doWladzy(p1);
    return p1;
  }
  private doAmbicja(player: Player): Player {
    switch (this.ambicja) {
      case 1:
        player.addBonus(MultiplicativeBonus.builder()
          .licznik(1)
          .mianownik(10)
          .type(MultiplicativeBonusType.AMBICJA)
          .mnoznik(1)
          .build());
        break;
      case 2:
        player.addBonus(MultiplicativeBonus.builder()
          .licznik(1)
          .mianownik(6)
          .type(MultiplicativeBonusType.AMBICJA)
          .mnoznik(1)
          .build());
        break;
      case 3:
        player.addBonus(MultiplicativeBonus.builder()
          .licznik(1)
          .mianownik(4)
          .type(MultiplicativeBonusType.AMBICJA)
          .mnoznik(1)
          .build());
        break;
      case 4:
        player.addBonus(MultiplicativeBonus.builder()
          .licznik(1)
          .mianownik(3)
          .type(MultiplicativeBonusType.AMBICJA)
          .mnoznik(1)
          .build());
        break;
      default:
        break;
    }
    return player;
  }
  private doBehe(player: Player): Player {
    switch (this.behemot) {
      case 1:
        player.addBonus(MultiplicativeBonus.builder()
          .licznik(75)
          .mianownik(1000)
          .type(MultiplicativeBonusType.BEHE)
          .mnoznik(1)
          .build());
        break;
      case 2:
        player.addBonus(MultiplicativeBonus.builder()
          .licznik(15)
          .mianownik(100)
          .type(MultiplicativeBonusType.BEHE)
          .mnoznik(1)
          .build());
        break;
      case 3:
        player.addBonus(MultiplicativeBonus.builder()
          .licznik(25)
          .mianownik(100)
          .type(MultiplicativeBonusType.BEHE)
          .mnoznik(1)
          .build());
        break;
      case 4:
        player.addBonus(MultiplicativeBonus.builder()
          .licznik(4)
          .mianownik(10)
          .type(MultiplicativeBonusType.BEHE)
          .mnoznik(1)
          .build());
        break;
      default:
        break;
    }
    return player;
  }
  private doZiz(player: Player): Player {
    switch (this.ziz) {
      case 1:
        player.addAllCrit(-0.05);
        player.addCritMulti(0.15);
        break;
      case 2:
        player.addAllCrit(-0.10);
        player.addCritMulti(0.30);
        break;
      case 3:
        player.addAllCrit(-0.15);
        player.addCritMulti(0.45);
        break;
      case 4:
        player.addAllCrit(-0.25);
        player.addCritMulti(0.45);
        player.setZiz4(true);
        break;
      default:
        break;
    }
    return player;
  }
  private doCichyLowca(player: Player): Player {
    switch (this.cichyLowca) {
      case 1:
        player.addCritMulti(0.2);
        break;
      case 2:
        player.addCritMulti(0.40);
        break;
      case 3:
        player.addCritMulti(0.6);
        break;
      case 4:
        player.addCritMulti(0.6);
        break;
      default:
        break;
    }
    return player;
  }
  private doKamykSpota(player: Player): Player {
    switch (this.kamienSpota) {
      case 1:
        player.addSpostrzegawczosc(7);
        break;
      case 2:
        player.addSpostrzegawczosc(15);
        break;
      case 3:
        player.addSpostrzegawczosc(25);
        break;
      case 4:
        player.addSpostrzegawczosc(40);
        break;
      default:
        break;
    }
    return player;
  }
  private doKamykZwinki(player: Player): Player {
    switch (this.kamienZwinki) {
      case 1:
        player.addZwinnosc(10);
        break;
      case 2:
        player.addZwinnosc(20);
        break;
      case 3:
        player.addZwinnosc(35);
        break;
      case 4:
        player.addZwinnosc(50);
        break;
      default:
        break;
    }
    return player;
  }
  private doSzpony(player: Player): Player {
    switch (this.szpony) {
      case 1:
        player.addAllDps(Math.floor(2 * this.aNocny / 3));
        break;
      case 2:
        player.addAllDps(Math.floor(4 * this.aNocny / 3));
        break;
      case 3:
        player.addAllDps(Math.floor(6 * this.aNocny / 3));
        break;
      case 4:
        player.addAllDps(Math.floor(9 * this.aNocny / 3));
        break;
      default:
        break;
    }
    return player;
  }
  private doZycieiSmierc(player: Player): Player {
    switch (this.zycieSmierc) {
      case 1:
        player.setLife(Math.floor(player.life + (this.aTchnienie * 0.03) * player.baseLife));
        break;
      case 2:
        player.setLife(Math.floor(player.life + (this.aTchnienie * 0.04) * player.baseLife));
        break;
      case 3:
        player.setLife(Math.floor(player.life + (this.aTchnienie * 0.05) * player.baseLife));
        break;
      case 4:
        player.setLife(Math.floor(player.life + (this.aTchnienie * 0.06) * player.baseLife));
        break;
      default:
        break;
    }
    return player;
  }
  private doOtchlan(player: Player): Player {
    const multi = 0.5 * this.otchlan;
    switch (this.otchlan) {
      case 1:
      case 2:
      case 3:
      case 4:
        player.addAllTrafienie(Math.floor(this.aCisza * multi));
        break;
      default:
        break;
    }
    return player;
  }
  private doPotega(player: Player): Player {
    switch (this.potega) {
      case 1:
        player.setLife(Math.floor(player.life + (player.baseLife * (this.aWyssanie * 0.005))));
        player.addCritMulti(this.aWyssanie * 0.005);
        break;
      case 2:
        player.setLife(Math.floor(player.life + (player.baseLife * (this.aWyssanie * 0.0075))));
        player.addCritMulti(this.aWyssanie * 0.0075);
        break;
      case 3:
        player.setLife(Math.floor(player.life + (player.baseLife * (this.aWyssanie * 0.01))));
        player.addCritMulti(this.aWyssanie * 0.01);
        break;
      case 4:
        player.setLife(Math.floor(player.life + (player.baseLife * (this.aWyssanie * 0.015))));
        player.addCritMulti(this.aWyssanie * 0.015);
        break;
      default:
        break;
    }
    return player;
  }
  private doAura(player: Player): Player {
    switch (this.aura) {
      case 1:
        player.setLife(player.life + this.aSkora * 5);
        player.addIgnore(0.0015 * this.aSkora);
        break;
      case 2:
        player.setLife(player.life + this.aSkora * 10);
        player.addIgnore(0.0020 * this.aSkora);
        break;
      case 3:
        player.setLife(player.life + this.aSkora * 20);
        player.addIgnore(0.0025 * this.aSkora);
        break;
      case 4:
        player.setLife(player.life + this.aSkora * 30);
        player.setLife(player.life + this.aSkora * 10);
        player.addIgnore(0.0035 * this.aSkora);
        break;
      default:
        break;
    }
    return player;
  }
  private doMaskaOffa(player: Player): Player {
    switch (this.maskaStrachu) {
      case 1:
        player.setAllDps1h(Math.floor(this.aMaskaOff / 2 * 1));
        player.setAllDps2h(Math.floor(this.aMaskaOff / 2 * 2));
        break;
      case 2:
        player.setAllDps1h(Math.floor(this.aMaskaOff / 2 * 2));
        player.setAllDps2h(Math.floor(this.aMaskaOff / 2 * 3));
        break;
      case 3:
        player.setAllDps1h(Math.floor(this.aMaskaOff / 2 * 3));
        player.setAllDps2h(Math.floor(this.aMaskaOff / 2 * 4));
        break;
      case 4:
        player.setAllDps1h(Math.floor(this.aMaskaOff / 2 * 4));
        player.setAllDps2h(Math.floor(this.aMaskaOff / 2 * 6));
        break;
      default:
        break;
    }
    return player;
  }
  private doMaskaDef(player: Player): Player {
    switch (this.maskaWladzy) {
      case 1:
        player.setLife(player.life + this.aMaskaDef * 5);
        break;
      case 2:
        player.setLife(player.life + this.aMaskaDef * 10);
        break;
      case 3:
        player.setLife(player.life + this.aMaskaDef * 20);
        break;
      case 4:
        player.setLife(player.life + this.aMaskaDef * 30);
        break;
      default:
        break;
    }
    return player;
  }
  private doLowca(player: Player): Player {
    switch (this.lowca) {
      case 1:
        player.addCritMulti(0.2);
        break;
      case 2:
        player.addCritMulti(0.4);
        break;
      case 3:
      case 4:
        player.addCritMulti(0.6);
        break;
      default:
        break;
    }
    return player;
  }
  private doPiesnKrwi(player: Player): Player {
    switch (this.piesnKrwi) {
      case 1:
        player.addAllCritMulti1h(0.005 * this.aKrewZycia);
        player.addAllCritMulti2h(0.01 * this.aKrewZycia);
        break;
      case 2:
        player.addAllCritMulti1h(0.01 * this.aKrewZycia);
        player.addAllCritMulti2h(0.02 * this.aKrewZycia);
        break;
      case 3:
        player.addAllCritMulti1h(0.015 * this.aKrewZycia);
        player.addAllCritMulti2h(0.025 * this.aKrewZycia);
        break;
      case 4:
        player.addAllCritMulti1h(0.02 * this.aKrewZycia);
        player.addAllCritMulti2h(0.03 * this.aKrewZycia);
        break;
      default:
        break;
    }
    return player;
  }
  private doMajestat(player: Player): Player {
    player.addAllDps(this.aMajestat);
    player.setLife(Math.floor(player.life + player.baseLife * (this.aMajestat * 0.07)));
    return player;
  }
  private doKocieSciezki(player: Player): Player {
    player.addZwinnosc(this.aKocieSciezki);
    return player;
  }
  private doZar(player: Player): Player {
    if (this.aZar === 1) {
      player.setLife(Math.floor(player.life + player.baseLife * 0.4));
      player.addLaczneObrazeniaWszystkichBroni(0.35);
      player.setHasZar(true);
    }
    return player;
  }
  private doMocKrwi(player: Player): Player {
    player.addSzczescie(this.aMocKrwi * 2);
    player.addAllCrit(0.0075 * this.aMocKrwi);
    return player;
  }
  private doSkora(player: Player): Player {
    player.addOdpornosc(this.aSkora);
    return player;
  }
  private doDziki(player: Player): Player {
    player.addSila(this.aDziki);
    return player;
  }
  private doKaligula(player: Player): Player {
    player.addWplywy(this.aMaskaOff);
    return player;
  }
  private doWladzy(player: Player): Player {
    player.addCharyzma(this.aMaskaDef);
    return player;
  }
  private doCienBestii(player: Player): Player {
    if (this.aCienBestii === 1) {
      player.setLife(Math.floor(player.life + player.baseLife * 0.3));
      const ataki = Math.floor(player.lvl / 150) + 1;
      player.addAtakiBiala(ataki);
    }
    return player;
  }
  private doaNocny(player: Player): Player {
    player.addSpostrzegawczosc(this.aNocny);
    return player;
  }
  private doaTchnienie(player: Player): Player {
    player.addUnikBiala(0.02 * this.aTchnienie);
    player.addUnikDystans(0.02 * this.aTchnienie);
    player.addUnikPalna(0.02 * this.aTchnienie);
    player.addAllTrafienie(-1 * this.aTchnienie);
    player.addAllDps(5 * this.aTchnienie);
    return player;
  }
  private doKrewZycia(player: Player): Player {
    player.addRegen(this.aKrewZycia * 0.005);
    return player;
  }
}
class TalismanyAndArkanyBuilder {
  private _aMajestat: number = 0;
  private _aMaskaOff: number = 0;
  private _aMaskaDef: number = 0;
  private _aKrewZycia: number = 0;
  private _aKocieSciezki: number = 0;
  private _aZar: number = 0;
  private _aCisza: number = 0;
  private _aWyssanie: number = 0;
  private _aMocKrwi: number = 0;
  private _aSkora: number = 0;
  private _aDziki: number = 0;
  private _aCienBestii: number = 0;
  private _aNocny: number = 0;
  private _aTchnienie: number = 0;
  private _ambicja: number = 0;
  private _behemot: number = 0;
  private _ziz: number = 0;
  private _kamienSpota: number = 0;
  private _kamienZwinki: number = 0;
  private _szpony: number = 0;
  private _zycieSmierc: number = 0;
  private _otchlan: number = 0;
  private _potega: number = 0;
  private _aura: number = 0;
  private _maskaStrachu: number = 0;
  private _maskaWladzy: number = 0;
  private _lowca: number = 0;
  private _piesnKrwi: number = 0;
  aMajestat(aMajestat: number): TalismanyAndArkanyBuilder {
    this._aMajestat = aMajestat;
    return this;
  }
  aMaskaOff(aMaskaOff: number): TalismanyAndArkanyBuilder {
    this._aMaskaOff = aMaskaOff;
    return this;
  }
  aMaskaDef(aMaskaDef: number): TalismanyAndArkanyBuilder {
    this._aMaskaDef = aMaskaDef;
    return this;
  }
  aKrewZycia(aKrewZycia: number): TalismanyAndArkanyBuilder {
    this._aKrewZycia = aKrewZycia;
    return this;
  }
  aKocieSciezki(aKocieSciezki: number): TalismanyAndArkanyBuilder {
    this._aKocieSciezki = aKocieSciezki;
    return this;
  }
  aZar(aZar: number): TalismanyAndArkanyBuilder {
    this._aZar = aZar;
    return this;
  }
  aCisza(aCisza: number): TalismanyAndArkanyBuilder {
    this._aCisza = aCisza;
    return this;
  }
  aWyssanie(aWyssanie: number): TalismanyAndArkanyBuilder {
    this._aWyssanie = aWyssanie;
    return this;
  }
  aMocKrwi(aMocKrwi: number): TalismanyAndArkanyBuilder {
    this._aMocKrwi = aMocKrwi;
    return this;
  }
  aSkora(aSkora: number): TalismanyAndArkanyBuilder {
    this._aSkora = aSkora;
    return this;
  }
  aDziki(aDziki: number): TalismanyAndArkanyBuilder {
    this._aDziki = aDziki;
    return this;
  }
  aCienBestii(aCienBestii: number): TalismanyAndArkanyBuilder {
    this._aCienBestii = aCienBestii;
    return this;
  }
  aNocny(aNocny: number): TalismanyAndArkanyBuilder {
    this._aNocny = aNocny;
    return this;
  }
  aTchnienie(aTchnienie: number): TalismanyAndArkanyBuilder {
    this._aTchnienie = aTchnienie;
    return this;
  }
  ambicja(ambicja: number): TalismanyAndArkanyBuilder {
    this._ambicja = ambicja;
    return this;
  }
  behemot(behemot: number): TalismanyAndArkanyBuilder {
    this._behemot = behemot;
    return this;
  }
  ziz(ziz: number): TalismanyAndArkanyBuilder {
    this._ziz = ziz;
    return this;
  }
  kamienSpota(kamienSpota: number): TalismanyAndArkanyBuilder {
    this._kamienSpota = kamienSpota;
    return this;
  }
  kamienZwinki(kamienZwinki: number): TalismanyAndArkanyBuilder {
    this._kamienZwinki = kamienZwinki;
    return this;
  }
  szpony(szpony: number): TalismanyAndArkanyBuilder {
    this._szpony = szpony;
    return this;
  }
  zycieSmierc(zycieSmierc: number): TalismanyAndArkanyBuilder {
    this._zycieSmierc = zycieSmierc;
    return this;
  }
  otchlan(otchlan: number): TalismanyAndArkanyBuilder {
    this._otchlan = otchlan;
    return this;
  }
  potega(potega: number): TalismanyAndArkanyBuilder {
    this._potega = potega;
    return this;
  }
  aura(aura: number): TalismanyAndArkanyBuilder {
    this._aura = aura;
    return this;
  }
  maskaStrachu(maskaStrachu: number): TalismanyAndArkanyBuilder {
    this._maskaStrachu = maskaStrachu;
    return this;
  }
  maskaWladzy(maskaWladzy: number): TalismanyAndArkanyBuilder {
    this._maskaWladzy = maskaWladzy;
    return this;
  }
  lowca(lowca: number): TalismanyAndArkanyBuilder {
    this._lowca = lowca;
    return this;
  }
  piesnKrwi(piesnKrwi: number): TalismanyAndArkanyBuilder {
    this._piesnKrwi = piesnKrwi;
    return this;
  }
  build(): TalismanyAndArkany {
    return new TalismanyAndArkany(
      this._aMajestat,
      this._aMaskaOff,
      this._aMaskaDef,
      this._aKrewZycia,
      this._aKocieSciezki,
      this._aZar,
      this._aCisza,
      this._aWyssanie,
      this._aMocKrwi,
      this._aSkora,
      this._aDziki,
      this._aCienBestii,
      this._aNocny,
      this._aTchnienie,
      this._ambicja,
      this._behemot,
      this._ziz,
      this._kamienSpota,
      this._kamienZwinki,
      this._szpony,
      this._zycieSmierc,
      this._otchlan,
      this._potega,
      this._aura,
      this._maskaStrachu,
      this._maskaWladzy,
      this._lowca,
      this._piesnKrwi
    );
  }
}
