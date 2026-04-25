export enum MultiplicativeBonusType {
  SKRZYDLA = 'SKRZYDLA',
  SCIEGNA = 'SCIEGNA',
  MIESNIE = 'MIESNIE',
  BEHE = 'BEHE',
  OSWIECONY = 'OSWIECONY',
  SZOSTY_ZMYSL = 'SZOSTY_ZMYSL',
  AMBICJA = 'AMBICJA',
  CZARNY = 'CZARNY',
  TYTAN = 'TYTAN',
  JASTRZEBI = 'JASTRZEBI',
  SLONECZNY = 'SLONECZNY',
}

export class MultiplicativeBonus {
  type: MultiplicativeBonusType;
  licznik: number;
  mianownik: number;
  mnoznik: number;

  constructor(
    type: MultiplicativeBonusType,
    licznik: number,
    mianownik: number,
    mnoznik: number = 1
  ) {
    this.type = type;
    this.licznik = licznik;
    this.mianownik = mianownik;
    this.mnoznik = mnoznik;
  }

  static builder() {
    return new MultiplicativeBonusBuilder();
  }
}

class MultiplicativeBonusBuilder {
  private _type?: MultiplicativeBonusType;
  private _licznik?: number;
  private _mianownik?: number;
  private _mnoznik: number = 1;

  type(type: MultiplicativeBonusType): MultiplicativeBonusBuilder {
    this._type = type;
    return this;
  }

  licznik(licznik: number): MultiplicativeBonusBuilder {
    this._licznik = licznik;
    return this;
  }

  mianownik(mianownik: number): MultiplicativeBonusBuilder {
    this._mianownik = mianownik;
    return this;
  }

  mnoznik(mnoznik: number): MultiplicativeBonusBuilder {
    this._mnoznik = mnoznik;
    return this;
  }

  build(): MultiplicativeBonus {
    if (!this._type || this._licznik === undefined || this._mianownik === undefined) {
      throw new Error('MultiplicativeBonus requires type, licznik, and mianownik');
    }
    return new MultiplicativeBonus(this._type, this._licznik, this._mianownik, this._mnoznik);
  }
}
