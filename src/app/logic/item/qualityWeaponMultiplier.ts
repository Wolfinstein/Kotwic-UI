import { Stats } from './Stats';
import { ItemGenre } from './constants';
import { ItemRarity } from './constants/itemRarity';
import { ItemType } from './constants/itemType';
import { WeaponStats } from './WeaponStats';
import { getQualityMultiplier, isLegendary, isEpicTier, getEpicMultiplier, getLegendaryBonus, scaleValue } from './qualityMultiplierUtils';

export { getQualityMultiplier } from './qualityMultiplierUtils';

// Te bronie mają stałą (nieskalowaną rzadkością) liczbę ataków na rundę — skaluje się tylko atakiVsPotwory.
const FIXED_ATAKI_NA_RUNDE: ItemType[] = [ItemType.MIOTACZPLOMIENI, ItemType.KARABINSNAJPERSKI, ItemType.STRZELBA];

export function applyQualityWeaponMultiplier(stats: Stats, rarity: ItemRarity, genre: ItemGenre, playerLvl: number, itemType?: ItemType): Stats {
  const result = stats.clone() as WeaponStats;
  const scaleAtakiNaRunde = (value: number): number =>
    itemType && FIXED_ATAKI_NA_RUNDE.includes(itemType) ? value : calcValue(value, rarity);

  // STAROZYTNY: bazowe obrażenia ×2 (jednoręczne) / ×3 (dwuręczne) — mnożone PO skalowaniu rzadkości.
  const twoHanded = genre == ItemGenre.WHITE_2H || genre == ItemGenre.GUN_2H || genre == ItemGenre.RANGE_2H;
  const bazaMult = rarity === ItemRarity.STAROZYTNY ? (twoHanded ? 3 : 2) : 1;
  const bazaDps = (value: number): number => calcValue(value, rarity) * bazaMult;
  // STAROZYTNY: dodatkowy mnożnik obrażeń ×1.1 (1h/dystans 1h) / ×1.2 (2h) — nałożony PO zsumowaniu bazy, prefixów i sufixów.
  const starozytnyDmgMult = rarity === ItemRarity.STAROZYTNY ? (twoHanded ? 1.2 : 1.1) : 1;
  // Number(...toFixed(6)) usuwa szum zmiennoprzecinkowy (np. 90*1.1=99.00000000000001) przed zaokrągleniem w górę.
  const applyDmgMult = (value: number): number => Math.ceil(Number((value * starozytnyDmgMult).toFixed(6)));
  // dpsVsPotwory oraz dpsBroniMin/Max (np. z sufixu Samobojcy) doliczane PO mnożniku STAROZYTNY — nie podlegają ×1.1/×1.2.
  let extraDpsVsPotwory = 0;
  let extraDpsBroniMin = 0;
  let extraDpsBroniMax = 0;

  if (genre == ItemGenre.GUN_1H || genre == ItemGenre.GUN_2H) {
    result.spostrzegawczosc = calcValue(result.spostrzegawczosc, rarity);
    result.zwinnosc = calcValue(result.zwinnosc, rarity);
    result.twardosc = calcValue(result.twardosc, rarity);
    result.trafieniePalna = calcValue(result.dodatkoweTrafienie, rarity);
    result.trafieniePalna += result.bazaTrafienie;
    //
    result.atakiPalna += scaleAtakiNaRunde(result.atakiNaRunde);
    result.atakiPalna += calcValue(result.atakiVsPotwory, rarity);
    result.trafienieProcentowePalna += calcValue(result.trafienieProcentowe, rarity);
    result.ignoreObrony += result.ignoreFlat;
    result.ignoreObrony += calcValue(result.ignore, rarity);

    extraDpsVsPotwory = calcValue(result.dpsVsPotwory, rarity);

    if (genre == ItemGenre.GUN_1H) {
      result.minDpsPalna1h = bazaDps(result.bazaDpsMin);
      result.maxDpsPalna1h = bazaDps(result.bazaDpsMax);
      result.critMultiPalna1h += calcValue(result.critMulti, rarity);
      result.setAllCritChance(calcValue(result.critChanceGlobal, rarity)); /// TODO fix for one melee one gun
      result.critChancePalna1h += calcValue(result.critChance, rarity);
    } else {
      result.minDpsPalna2h = bazaDps(result.bazaDpsMin) + (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));
      result.maxDpsPalna2h = bazaDps(result.bazaDpsMax) + (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));
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
    result.trafienieProcentoweDystans = calcValue(result.trafienieProcentowe, rarity);
    result.ignoreObrony += calcValue(result.ignore, rarity);
    result.ignoreObrony += calcValue(result.ignoreVsPotwory, rarity);
    result.trafienieDystans = calcValue(result.dodatkoweTrafienie, rarity);
    result.trafienieDystans += calcValue(result.bazaTrafienie, rarity);
    extraDpsVsPotwory = calcValue(result.dpsVsPotwory, rarity);
    extraDpsBroniMin = calcValue(result.dpsBroniMin, rarity);
    extraDpsBroniMax = calcValue(result.dpsBroniMax, rarity);
    if (genre == ItemGenre.RANGE_1H) {
      result.atakiDystans1h += calcValue(result.atakiNaRunde, rarity);
      result.atakiDystans1h += calcValue(result.atakiVsPotwory, rarity);
      result.minDpsDystans1h = bazaDps(result.bazaDpsMin);
      result.maxDpsDystans1h = bazaDps(result.bazaDpsMax);
      result.critMultiDystans1h += calcValue(result.critMulti, rarity);
      result.critMultiDystans1h += calcValue(result.critMultiVsPotwory, rarity);
    } else {
      result.atakiDystans2h += calcValue(result.atakiNaRunde, rarity);
      result.atakiDystans2h += calcValue(result.atakiVsPotwory, rarity);
      result.minDpsDystans2h = bazaDps(result.bazaDpsMin);
      result.maxDpsDystans2h = bazaDps(result.bazaDpsMax);
      result.critMultiDystans2h += calcValue(result.critMulti, rarity);
      result.critMultiDystans2h += calcValue(result.critMultiVsPotwory, rarity);
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
    result.trafienieBiala += calcValue(result.bazaTrafienie, rarity);

    result.atakiBiala += result.atakiNaRunde == 1 ? 1 : calcValue(result.atakiNaRunde, rarity);
    result.atakiBiala += calcValue(result.atakiVsPotwory, rarity);

    result.obronaPrzedmiotow = calcValue(result.dodatkowaObrona, rarity);
    extraDpsVsPotwory = calcValue(result.dpsVsPotwory, rarity);
    extraDpsBroniMin = calcValue(result.dpsBroniMin, rarity);
    extraDpsBroniMax = calcValue(result.dpsBroniMax, rarity);

    if (genre == ItemGenre.WHITE_1H) {
      result.setAllDps(calcValue(result.dpsAll, rarity));
      result.critChanceBiala1h = calcValue(result.critChanceVsPotwory, rarity);
      result.critChanceBiala1h += calcValue(result.critChance, rarity);
      result.minDpsBiala1h = bazaDps(result.bazaDpsMin);
      result.maxDpsBiala1h = bazaDps(result.bazaDpsMax);
      result.critMultiBiala1h += calcValue(result.critMulti, rarity);
      result.critMultiBiala1h += calcValue(result.critMultiVsPotwory, rarity);
      result.minDpsBiala1h += (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));
      result.maxDpsBiala1h += (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));

    } else {
      result.critChanceBiala2h = calcValue(result.critChanceVsPotwory, rarity);
      result.critChanceBiala2h += calcValue(result.critChance, rarity);
      result.minDpsBiala2h = bazaDps(result.bazaDpsMin);
      result.maxDpsBiala2h = bazaDps(result.bazaDpsMax);
      result.critMultiBiala2h += calcValue(result.critMulti, rarity);
      result.critMultiBiala2h += calcValue(result.critMultiVsPotwory, rarity);
      result.minDpsBiala2h += (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));
      result.maxDpsBiala2h += (calcValue(result.obrazeniaPerLevel, rarity) * Math.ceil(playerLvl / 4));
    }
  }

  if (starozytnyDmgMult !== 1) {
    switch (genre) {
      case ItemGenre.GUN_1H:
        result.minDpsPalna1h = applyDmgMult(result.minDpsPalna1h);
        result.maxDpsPalna1h = applyDmgMult(result.maxDpsPalna1h);
        break;
      case ItemGenre.GUN_2H:
        result.minDpsPalna2h = applyDmgMult(result.minDpsPalna2h);
        result.maxDpsPalna2h = applyDmgMult(result.maxDpsPalna2h);
        break;
      case ItemGenre.RANGE_1H:
        result.minDpsDystans1h = applyDmgMult(result.minDpsDystans1h);
        result.maxDpsDystans1h = applyDmgMult(result.maxDpsDystans1h);
        break;
      case ItemGenre.RANGE_2H:
        result.minDpsDystans2h = applyDmgMult(result.minDpsDystans2h);
        result.maxDpsDystans2h = applyDmgMult(result.maxDpsDystans2h);
        break;
      case ItemGenre.WHITE_1H:
        result.minDpsBiala1h = applyDmgMult(result.minDpsBiala1h);
        result.maxDpsBiala1h = applyDmgMult(result.maxDpsBiala1h);
        break;
      case ItemGenre.WHITE_2H:
        result.minDpsBiala2h = applyDmgMult(result.minDpsBiala2h);
        result.maxDpsBiala2h = applyDmgMult(result.maxDpsBiala2h);
        break;
    }
  }

  // Doliczone PO mnożniku STAROZYTNY, by ×1.1/×1.2 go nie obejmował.
  switch (genre) {
    case ItemGenre.GUN_1H:
      result.minDpsPalna1h += extraDpsVsPotwory;
      result.maxDpsPalna1h += extraDpsVsPotwory;
      break;
    case ItemGenre.GUN_2H:
      result.minDpsPalna2h += extraDpsVsPotwory;
      result.maxDpsPalna2h += extraDpsVsPotwory;
      break;
    case ItemGenre.RANGE_1H:
      result.minDpsDystans1h += extraDpsVsPotwory + extraDpsBroniMin;
      result.maxDpsDystans1h += extraDpsVsPotwory + extraDpsBroniMax;
      break;
    case ItemGenre.RANGE_2H:
      result.minDpsDystans2h += extraDpsVsPotwory + extraDpsBroniMin;
      result.maxDpsDystans2h += extraDpsVsPotwory + extraDpsBroniMax;
      break;
    case ItemGenre.WHITE_1H:
      result.minDpsBiala1h += extraDpsVsPotwory + extraDpsBroniMin;
      result.maxDpsBiala1h += extraDpsVsPotwory + extraDpsBroniMax;
      break;
    case ItemGenre.WHITE_2H:
      result.minDpsBiala2h += extraDpsVsPotwory + extraDpsBroniMin;
      result.maxDpsBiala2h += extraDpsVsPotwory + extraDpsBroniMax;
      break;
  }

  return result as Stats;
}

function calcValue(value: number, rarity: ItemRarity): number {
  const qualityMult = getQualityMultiplier(rarity);
  const isEpic = isEpicTier(rarity);
  const epicMult = getEpicMultiplier(rarity);
  const isLeg = isLegendary(rarity);
  const legendaryBonus = getLegendaryBonus(rarity);
  let multipliedValue: number;

  if (isEpic) {
    multipliedValue = scaleValue(value, [epicMult, legendaryBonus]);
  } else if (isLeg) {
    multipliedValue = scaleValue(value, [qualityMult, legendaryBonus]);
  } else {
    multipliedValue = scaleValue(value, [qualityMult]);
  }

  return multipliedValue;
}
