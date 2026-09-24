export interface Attributes {
    sila: number;
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
    szponyNocy: number;
    zycieISmierc: number;
    otchlaniCiszy: number;
    potegaMocy: number;
    furiaBestii: number;
    auraBestii: number;
    maskaWladzy: number;
    maskaStachu: number;
    cichyLowca: number;
    piesnKrwi: number;
    ziz: number;
}
export interface ArcaneLevels {
    maskaAdonisa: number,
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
    pancerz: number,
    klyPazuryKolce: number,
    gruczolyJadowe: number,
    wzmocnioneSciegna: number,
    dodatkowaKomora: number,
    krewDemona: number,
    mutacjaDna: number,
    oswiecony: number,
    szostyZmysl: number,
    absorpcja: number,
    harmonijnyRozwoj: number,
    skazenieMana: number,
    pietnoDemona: number,
    wzmocnioneMiesnie: number
}
export type ItemRarity = 'ZWYKLY' | 'DOBRY' | 'DOSKONALY' | 'LEGENDARNY' | 'LEGENDARNY_DOBRY' | 'LEGENDARNY_DOSKONALY' | 'EPICKI' | 'STAROZYTNY';
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
export interface Character {
    rasa: string;
    poziom: number;
    attributes: Attributes;
    talizmanLevels: TalizmanLevels;
    arcaneLevels: ArcaneLevels;
    huntBonuses: string[];
    eventBonus: string | null;
    oneTimeBonus: string | null;
    bonusZPolowania: string | null;
    equipment: EquipmentSlot;
    runeValues: string[];
    umagiValues: string[];
    blaszkaZaMoba: boolean;
    blaszkaZaKronosa: boolean;
    blaszkaZaHastura: boolean;
    /** Manual override for Tchnienie Śmierci's HP-threshold-gated bonuses, since the calculator has no live HP tracking. */
    tchnienieSmierciActive: boolean;
    /** Manual override for Żar Krwi's HP-threshold-gated bonuses, since the calculator has no live HP tracking. */
    zarKrwiActive: boolean;
    /** Manual override for Potęga Mocy's crit-multi bonus, since in expeditions it only applies once the mob's crit has actually been absorbed (first landed hit). */
    wyssanieMocyActive: boolean;
    evolutions: Evolutions;
    obronaPrzeciwnika: number;
    odpornoscPrzeciwnika: number;
    szczesciePrzeciwnika: number;
    /** Mob's zwinnosc — feeds hit-chance math for the player's white/melee weapons. */
    trafieniePrzeciwnikaBiala: number;
    /** Mob's spostrzegawczosc — feeds hit-chance math for the player's gun weapons. Ranged (dystans) weapons use the sum of both. */
    trafieniePrzeciwnikaPalna: number;
    mysliwy: number;
    ninja: number;
    /** Mob-imposed ceiling (in %) on the player's hit chance — e.g. Malphas's 40 turns the usual 90%+luck (max 99%) band into 40%+luck (max 40%). Unset for normal mobs. */
    maxTrafieniePrzeciwnika?: number;
    assasyn: number;
    strateg: number;
    kaplica: number;
    posredniak: number;
    domPubliczny: number;
    rzeznia: number;
    policja: number;
    schronisko: number;
    ochrona: number;
    handlarz: number;
    gazeta: number;
}
export interface WeaponDamage {
    name: string;
    minDmg: number;
    maxDmg: number;
    iloscAtakow: number;
    critChance?: number;
    /** Uncapped crit chance before the 85% cap — lets the UI flag when the cap is actually being hit. */
    rawCritChance?: number;
    critMulti?: number;
    trafienie?: number;
    ignore?: number;
    obrazeniaNaRundeAvg?: number;
    trafienieProcentowe?: number;
    critDmgMin?: number;
    critDmgMax?: number;
    genre?: string;
    estimatedHitChance?: number;
    /** Hit chance against the boss itself when it caps the hit chance (Character.maxTrafieniePrzeciwnika) — its adds still use estimatedHitChance. Unset otherwise. */
    bossHitChance?: number;
}
export interface DashboardValues {
    punktyKrwi?: number;
    punktyZycia?: number;
    effectiveHp?: number;
    szczescie?: number;
    obrona?: number;
    attributes?: Attributes;
    twardrosc?: number;
    redukcja?: number;
    unikBiala?: number;
    unikPalna?: number;
    unikDystans?: number;
    enemyCritChanceReduction?: number;
    inicjatywa?: number;
    trafienieDodatkoweDystans?: number;
    trafienieDodatkowePalna?: number;
    trafienieDodatkoweBiala?: number;
    obrazenia?: WeaponDamage[];
    regeneracja?: number;
    /** Regen per round before the Majestat/Tchnienie Śmierci halving (either one sets the same flag, so they don't stack with each other). Used by the expedition combat sim to combine that reduction additively with Bokrug's poison rather than multiplying sequentially. */
    regenBase?: number;
    /** Portion of regenBase contributed by the Krew Życia arcane investment — used by the expedition combat sim so Zepar's Aura Niewiary can strip just this share from a blocked player's regen. */
    krewZyciaRegen?: number;
    regenHalved?: boolean;
    zizAverageRounds?: number[];
    roundsPerWeapon?: { name: string; rounds: number[] }[];
};
