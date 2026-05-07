import { Stats } from './Stats';
import { ItemGenre } from './constants';
import { ItemRarity } from './constants/itemRarity';
import { WeaponStats } from './WeaponStats';

export function getQualityMultiplier(rarity: ItemRarity): number {
  switch (rarity) {
    case ItemRarity.ZWYKLY:
      return 1.0;
    case ItemRarity.DOBRY:
    case ItemRarity.LEGENDARNY_DOBRY:
      return 1.5;
    case ItemRarity.DOSKONALY:
    case ItemRarity.LEGENDARNY_DOSKONALY:
    case ItemRarity.EPICKI:
      return 2.0;
    case ItemRarity.LEGENDARNY:
      return 1.0;
    default:
      return 1.0;
  }
}

function isLegendary(rarity: ItemRarity): boolean {
  return rarity.startsWith('LEGENDARNY') || rarity === ItemRarity.EPICKI;
}

function getEpicMultiplier(rarity: ItemRarity): number {
  if (rarity === ItemRarity.EPICKI) {
    return 2.5;
  }
  return 1.0;
}

function scaleAndApply(value: number, multipliers: number[]): number {
  if (value >= 1) {
    let result = value;
    for (const multiplier of multipliers) {
      result = Math.ceil(result * multiplier);
    }
    return result;
  }
  let result = value;
  for (const multiplier of multipliers) {
    result = result * multiplier;
  }
  return Math.ceil(result * 100) / 100;
}

export function applyQualityWeaponMultiplier(stats: Stats, rarity: ItemRarity, genre: ItemGenre, playerLvl: number): Stats {
  const result = stats.clone() as WeaponStats;

  if (genre == ItemGenre.GUN_1H || genre == ItemGenre.GUN_2H) {
    result.spostrzegawczosc = calcValue(result.spostrzegawczosc, rarity);
    result.zwinnosc = calcValue(result.zwinnosc, rarity);
    result.twardosc = calcValue(result.twardosc, rarity);
    result.trafieniePalna = calcValue(result.dodatkoweTrafienie, rarity);
    result.trafieniePalna += result.bazaTrafienie;
    //
    result.atakiPalna += calcValue(result.atakiNaRunde, rarity);
    result.atakiPalna += calcValue(result.atakiVsPotwory, rarity);
    result.trafienieProcentowePalna += calcValue(result.trafienieProcentowe, rarity);
    result.ignoreObrony += result.ignoreFlat;
    result.ignoreObrony += calcValue(result.ignore, rarity);

    if (genre == ItemGenre.GUN_1H) {
      result.minDpsPalna1h = calcValue(result.bazaDpsMin, rarity);
      result.maxDpsPalna1h = calcValue(result.bazaDpsMax, rarity);
      result.critMultiPalna1h += calcValue(result.critMulti, rarity);
      result.setAllCritChance(calcValue(result.critChanceGlobal, rarity)); /// TODO fix for one melee one gun
      result.critChancePalna1h += calcValue(result.critChance, rarity);
    } else {
      result.minDpsPalna2h = calcValue(result.bazaDpsMin, rarity) + (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));
      result.maxDpsPalna2h = calcValue(result.bazaDpsMax, rarity) + (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));
      result.critMultiPalna2h += calcValue(result.critMulti, rarity);
      result.critChancePalna2h += calcValue(result.critChance, rarity);
    }

  } else if (genre == ItemGenre.RANGE_1H || genre == ItemGenre.RANGE_2H) {
    result.critChanceDystans = calcValue(result.critChanceVsPotwory, rarity);
    result.critChanceDystans += calcValue(result.critChance, rarity);
    result.spostrzegawczosc = calcValue(result.spostrzegawczosc, rarity);
    result.zwinnosc = calcValue(result.zwinnosc, rarity);
    result.odpornosc = calcValue(result.odpornosc, rarity);
    result.sila = calcValue(result.sila, rarity);
    result.wplywy = calcValue(result.wplywy, rarity);
    result.szczescie = calcValue(result.szczescie, rarity);
    result.trafienieProcentoweDystans += calcValue(result.trafienieProcentowe, rarity);
    result.ignoreObrony += calcValue(result.ignore, rarity);
    result.ignoreObrony += calcValue(result.ignoreVsPotwory, rarity);
    result.trafienieDystans = calcValue(result.dodatkoweTrafienie, rarity);
    result.trafienieDystans += calcValue(result.bazaTrafienie, rarity);
    if (genre == ItemGenre.RANGE_1H) {
      result.atakiDystans1h += calcValue(result.atakiNaRunde, rarity);
      result.atakiDystans1h += calcValue(result.atakiVsPotwory, rarity);
      result.minDpsDystans1h = calcValue(result.bazaDpsMin, rarity);
      result.maxDpsDystans1h = calcValue(result.bazaDpsMax, rarity);
      result.minDpsDystans1h += calcValue(result.dpsVsPotwory, rarity);
      result.maxDpsDystans1h += calcValue(result.dpsVsPotwory, rarity);
      result.critMultiDystans1h += calcValue(result.critMulti, rarity);
      result.critMultiDystans1h += calcValue(result.critMultiVsPotwory, rarity);
      result.minDpsDystans1h += calcValue(result.dpsBroniMin, rarity);
      result.maxDpsDystans1h += calcValue(result.dpsBroniMax, rarity);
    } else {
      result.atakiDystans2h += calcValue(result.atakiNaRunde, rarity);
      result.atakiDystans2h += calcValue(result.atakiVsPotwory, rarity);
      result.minDpsDystans2h = calcValue(result.bazaDpsMin, rarity);
      result.maxDpsDystans2h = calcValue(result.bazaDpsMax, rarity);
      result.minDpsDystans2h += calcValue(result.dpsVsPotwory, rarity);
      result.maxDpsDystans2h += calcValue(result.dpsVsPotwory, rarity);
      result.critMultiDystans2h += calcValue(result.critMulti, rarity);
      result.critMultiDystans2h += calcValue(result.critMultiVsPotwory, rarity);
      result.minDpsDystans2h += calcValue(result.dpsBroniMin, rarity);
      result.maxDpsDystans2h += calcValue(result.dpsBroniMax, rarity);
    }
  } else {
    result.spostrzegawczosc = calcValue(result.spostrzegawczosc, rarity);
    result.zwinnosc = calcValue(result.zwinnosc, rarity);
    result.odpornosc = calcValue(result.odpornosc, rarity);
    result.sila = calcValue(result.sila, rarity);
    result.wplywy = calcValue(result.wplywy, rarity);
    result.wyglad = calcValue(result.wyglad, rarity);
    result.charyzma = calcValue(result.charyzma, rarity);
    result.inteligencja = calcValue(result.inteligencja, rarity);
    result.wiedza = calcValue(result.wiedza, rarity);
    result.punktyKrwi = calcValue(result.pktKrwi, rarity);
    result.punktyZycia = calcValue(result.bazoweHp, rarity);

    result.szczescie = calcValue(result.szczescie, rarity);
    result.trafienieProcentoweBiala += calcValue(result.trafienieProcentowe, rarity);
    result.ignoreObrony += calcValue(result.ignore, rarity);
    result.ignoreObrony += calcValue(result.ignoreVsPotwory, rarity);
    result.trafienieBiala = calcValue(result.dodatkoweTrafienie, rarity);
    result.trafienieBiala += result.bazaTrafienie;

    result.atakiBiala += result.atakiNaRunde == 1 ? 1 : calcValue(result.atakiNaRunde, rarity);
    result.atakiBiala += calcValue(result.atakiVsPotwory, rarity);

    result.obronaPrzedmiotow = calcValue(result.dodatkowaObrona, rarity);

    if (genre == ItemGenre.WHITE_1H) {
      result.setAllDps(calcValue(result.dpsAll, rarity));
      result.critChanceBiala1h = calcValue(result.critChanceVsPotwory, rarity);
      result.critChanceBiala1h += calcValue(result.critChance, rarity);
      result.minDpsBiala1h = calcValue(result.bazaDpsMin, rarity);
      result.maxDpsBiala1h = calcValue(result.bazaDpsMax, rarity);
      result.minDpsBiala1h += calcValue(result.dpsVsPotwory, rarity);
      result.maxDpsBiala1h += calcValue(result.dpsVsPotwory, rarity);
      result.critMultiBiala1h += calcValue(result.critMulti, rarity);
      result.critMultiBiala1h += calcValue(result.critMultiVsPotwory, rarity);
      result.minDpsBiala1h += calcValue(result.dpsBroniMin, rarity);
      result.maxDpsBiala1h += calcValue(result.dpsBroniMax, rarity);
      result.minDpsBiala1h += (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));
      result.maxDpsBiala1h += (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));

    } else {
      result.critChanceBiala2h = calcValue(result.critChanceVsPotwory, rarity);
      result.critChanceBiala2h += calcValue(result.critChance, rarity);
      result.minDpsBiala2h = calcValue(result.bazaDpsMin, rarity);
      result.maxDpsBiala2h = calcValue(result.bazaDpsMax, rarity);
      result.minDpsBiala2h += calcValue(result.dpsVsPotwory, rarity);
      result.maxDpsBiala2h += calcValue(result.dpsVsPotwory, rarity);
      result.critMultiBiala2h += calcValue(result.critMulti, rarity);
      result.critMultiBiala2h += calcValue(result.critMultiVsPotwory, rarity);
      result.minDpsBiala2h += calcValue(result.dpsBroniMin, rarity);
      result.maxDpsBiala2h += calcValue(result.dpsBroniMax, rarity);
      result.minDpsBiala2h += (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));
      result.maxDpsBiala2h += (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));
    }
  }

  return result as Stats;
}

function calcValue(value: number, rarity: ItemRarity): number {
  const qualityMult = getQualityMultiplier(rarity);
  const isEpic = rarity === ItemRarity.EPICKI;
  const epicMult = getEpicMultiplier(rarity);
  const isLeg = isLegendary(rarity);
  const legendaryBonus = 1.35;
  let multipliedValue: number;

  if (isEpic) {
    multipliedValue = scaleAndApply(value, [epicMult, legendaryBonus]);
  } else if (isLeg) {
    multipliedValue = scaleAndApply(value, [qualityMult, legendaryBonus]);
  } else {
    multipliedValue = scaleAndApply(value, [qualityMult]);
  }

  return multipliedValue;
}
