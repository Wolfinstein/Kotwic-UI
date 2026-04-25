export interface Attributes {
sila:number;
zwinnosc: number;
odpornosc: number;
wyglad: number;
charyzma: number;
wplywy: number;
spostrzegawczosc: number;
inteligencja: number;
wiedza: number;
}

export interface TalizmanLevels {
ambicja: number;
lewiatan: number;
behemot: number;
kamienZla: number;
kamienDobra: number;
kamienPrzestrzeni: number;
kamienCzasu: number;
spaonNocy: number;
zycieISmierc: number;
otchlaniCiszy: number;
potegaMocy: number;
furiaBestii: number;
auraBestii: number;
maskaWladzy: number;
maskaStachu: number;
cichyLowca: number;
piesnKrwi: number;
}

export interface ArcaneLevels {
maskaAdnisa: number,
maskaKaliguli: number,
majestat: number,
krewZycia: number,
kocieSciezki: number,
zarKrwi: boolean,
ciszaKrwi: number,
wyssanieMocy: number,
mocKrwi: number,
dzikiSzal: number,
skoraBestii: number,
cienBestii: boolean,
nocnyLowca: number,
tchnienieSmierci: number,
groza: boolean
}

export interface Evolutions {
skrzydla: number,
pancerz : number,
klyPazuryKolce : number,
gruczolyJadowe : number,
wzmocnioneSciegna : number,
dodatkowaKomora: number,
krewDemona : number,
mutacjaDna : number,
oswiecony: number,
szostyZmysl : number,
absorpcja: number,
harmonijnyRozwo: number,
pietnoDemona: number,
wzmocnioneMiesnie : number
}

export type ItemRarity = 'ZWYKLY' | 'DOBRY' | 'DOSKONALY' | 'LEGENDARNY' | 'LEGENDARNY_DOBRY' | 'LEGENDARNY_DOSKONALY' | 'EPICKI';

export interface EquipmentItem {
rarity: ItemRarity | null;
prefix: string | null;
base: string | null;
suffix: string | null;
}

export interface EquipmentSlot {
head?: EquipmentItem;
chest?: EquipmentItem;
legs?: EquipmentItem;
neck?: EquipmentItem;
finger1?: EquipmentItem;
finger2?: EquipmentItem;
weapon1?: EquipmentItem;
weapon2?: EquipmentItem;
weaponMode?: 'dual1h' | '2h';
}

export interface BonusValues{
hunt?: string[];
daily?: string[];
oneTime?: string[];
}

export interface Character {
rasa: string;
poziom: number;
zycie: number;
szczescie: number;
attributes: Attributes;
talizmanLevels: TalizmanLevels;
arcaneLevels: ArcaneLevels;
bonusValues: BonusValues;
equipment: EquipmentSlot;
runeValues: string[];
umagiValues: string[];
blaszkaZaMoba: boolean;
blaszkaZaKronosa: boolean;
blaszkaZaHastura: boolean;
evolutions : Evolutions;
mysliwy: number;
ninja: number;
strateg: number;
kaplica: number;
}

export interface WeaponDamage{
minDmg: number;
maxDmg: number;
iloscAtakow: number;
critChance?: number;
critMulti?: number;
trafienie?: number;
ignore?: number;
obrazeniaNaRundeAvg?: number;
critDmgMin?: number;
critDmgMax?: number;
}

export interface DashboardValues {
punktyZycia?: number;
szczescie?: number;
obrona?: number;
attributes?: Attributes;
twardrosc?: number;
redukcja?: number;
unikBiala? :number;
unikPalna?: number;
unikDystans?: number;
inicjatywa?: number;
obrazenia?: WeaponDamage[];
regeneracja?: number;
zizAverageRounds?: []
};
