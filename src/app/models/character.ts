export interface Attributes {
  siła: number;
  zwinność: number;
  odporność: number;
  wygląd: number;
  charyzma: number;
  wpływ: number;
  spostrzegawczość: number;
  inteligencja: number;
  wiedza: number;
}

export interface TalizmanLevels {
  ambicja: number;
  lewatism: number;
  behemot: number;
  kamieńZła: number;
  kamieńDobra: number;
  kamieńPrzestrzeni: number;
  kamieńCzasu: number;
  spaonNocy: number;
  zycieIŚmierc: number;
  otchłaniCiszy: number;
  potęgaMocy: number;
  furiaBestii: number;
  auraBestii: number;
  maskaWładzy: number;
  maskaStachu: number;
  cichyŁowca: number;
  pieśnKrwi: number;
}

export interface EquipmentSlot {
  head?: string;
  chest?: string;
  legs?: string;
  neck?: string;
  finger1?: string;
  finger2?: string;
  weapon1h?: string;
  weapon2h?: string;
}

export interface Character {
  rasa: string;
  nazwa: string;
  poziom: number;
  życie: number;
  krew: number;
  szczęście: number;
  attributes: Attributes;
  talizmanLevels: TalizmanLevels;
  equipment: EquipmentSlot;
  atak: number;
  obrona: number;
  obrazenia: { min: number; max: number; modifier: string };
}

export interface DashboardValues {
  atak: number[];
  obrona: number[];
  obrazenia: { min: number; max: number; modifier: string };
}
