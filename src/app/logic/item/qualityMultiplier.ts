import { Stats } from './Stats';
import { Base } from './Base';
import { ItemGenre } from './constants/itemGenre';
import { ItemRarity } from './constants/itemRarity';
import { LEGENDARY_BONUS, EPIC_BASE_MULTIPLIER, getQualityMultiplier, isLegendary, isEpicTier, getEpicMultiplier, scaleValue, STAROZYTNY_BASE_TWARDOSC } from './qualityMultiplierUtils';

const CORE_ATTRIBUTES: (keyof Stats)[] = [
  'sila', 'zwinnosc', 'odpornosc', 'wyglad', 'charyzma',
  'wplywy', 'spostrzegawczosc', 'inteligencja', 'wiedza',
];

export { getQualityMultiplier } from './qualityMultiplierUtils';

const MULTIPLIED_STAT_PROPERTIES: (keyof Stats)[] = [
  'sila', 'zwinnosc', 'odpornosc', 'wyglad', 'charyzma', 'wplywy',
  'spostrzegawczosc', 'inteligencja', 'wiedza', 'szczescie',
  'punktyKrwi', 'punktyZycia',
  'obronaAffixu', 'obronaBazy', 'obronaPrzedmiotow', 'obronaDodatkowa', 'redukcjaObrazen', 'twardosc', 'mnoznikObrony',
  'unikDystans', 'unikPalna', 'unikBiala',
  'critChanceDystans', 'critChancePalna1h', 'critChancePalna2h',
  'critChanceBiala1h', 'critChanceBiala2h',
  'critMultiDystans1h', 'critMultiDystans2h', 'critMultiPalna1h',
  'critMultiPalna2h', 'critMultiBiala1h', 'critMultiBiala2h', 'critMultiSpeed',
  'atakiDystans1h', 'atakiDystans2h', 'atakiPalna', 'atakiBiala',
  'trafienieDystans', 'trafieniePalna', 'trafienieBiala',
  'trafienieProcentoweBiala', 'trafienieProcentowePalna', 'trafienieProcentoweDystans',
  'ignoreObrony',
  'minDpsDystans1h', 'maxDpsDystans1h',
  'minDpsDystans2h', 'maxDpsDystans2h',
  'minDpsPalna1h', 'maxDpsPalna1h',
  'minDpsPalna2h', 'maxDpsPalna2h',
  'minDpsBiala1h', 'maxDpsBiala1h',
  'minDpsBiala2h', 'maxDpsBiala2h',
  'dps',
  'laczneObrazeniaWszystkichBroni',
  'regen', 'additionalIni'
];


export function applyQualityMultiplier(stats: Stats, rarity: ItemRarity, playerLvl: number, base?: Base): Stats {
  const result = stats.clone();
  const rawTwardosc = result.twardosc;
  const qualityMult = getQualityMultiplier(rarity);
  const isEpic = isEpicTier(rarity);
  const epicMult = getEpicMultiplier(rarity);
  const isLeg = isLegendary(rarity);
  const legendaryBonus = LEGENDARY_BONUS;
  let tempObrona = 0;
  let tempObrazenia = 0;
  let tempMultiPalna2h = 0;
  for (const prop of MULTIPLIED_STAT_PROPERTIES) {
    let value = (result as any)[prop] as number;
    if (prop === 'obronaAffixu' && value % 1 != 0) {
      let multi = calcValue(2, rarity, prop);
      tempObrona = Math.floor(multi * Math.floor(playerLvl.valueOf() / 4))
      value = Math.round(value);
    }
    if (prop == 'dps' && value > 0) {
      let multi = calcValue(2, rarity, prop);
      if (value == 4) {
        tempObrazenia = Math.floor(multi * Math.floor(playerLvl.valueOf() / 4))
      } else {
        tempObrazenia = Math.floor(multi * Math.floor(playerLvl.valueOf() / 6))
      }
    }
    if (prop == 'critMultiSpeed' && result.critMultiSpeed > 0) {
      let multi = calcValue(value, rarity, prop);
      tempMultiPalna2h = multi * Math.floor(playerLvl.valueOf() / 4)
    }
    if (value > 0 && prop != 'dps' && prop != 'critMultiSpeed') {
      let multipliedValue: number;
      if (isEpic) {
        multipliedValue = scaleValue(value, [epicMult, legendaryBonus], prop);
      } else if (isLeg) {
        multipliedValue = scaleValue(value, [qualityMult, legendaryBonus], prop);
      } else {
        multipliedValue = scaleValue(value, [qualityMult], prop);
      }
      (result as any)[prop] = multipliedValue;
    }
  }
  if (result.mnoznikObrony !== null && result.mnoznikObrony > 0) {
    result.obronaPrzedmiotow += (Math.round(result.obronaAffixu) + result.obronaBazy) + Math.ceil((Math.round(result.obronaAffixu) + result.obronaBazy) * result.mnoznikObrony);
  } else {
    result.obronaPrzedmiotow += Math.round(result.obronaAffixu + result.obronaBazy);
  }
  result.critMultiPalna2h += tempMultiPalna2h;
  result.setAllMinDps(tempObrazenia);
  result.setAllMaxDps(tempObrazenia);
  result.obronaPrzedmiotow += tempObrona;

  if (base && rarity === ItemRarity.STAROZYTNY) {
    applyStarozytnyNonWeapon(result, base, rawTwardosc);
  }

  return result;
}

/**
 * Dodatkowe efekty poziomu STAROZYTNY dla przedmiotów nie-broni.
 * Wywoływane po standardowym (epickim) skalowaniu.
 */
function applyStarozytnyNonWeapon(result: Stats, base: Base, rawTwardosc: number): void {
  const genre = base.genre;
  if (genre === ItemGenre.HEAD || genre === ItemGenre.CHEST || genre === ItemGenre.LEGS) {
    // Odporność = obrona z samej bazy (na poziomie epickim).
    result.odpornosc += Math.round(result.obronaBazy);
    // Twardość: stała z bazy + skalowana (epicko) twardość z prefixów/sufixów.
    const affixRaw = rawTwardosc - (base.stats.twardosc ?? 0);
    const scaledAffix = affixRaw > 0
      ? scaleValue(affixRaw, [EPIC_BASE_MULTIPLIER, LEGENDARY_BONUS], 'twardosc')
      : 0;
    result.twardosc = (STAROZYTNY_BASE_TWARDOSC[base.type] ?? 0) + scaledAffix;
  } else if (genre === ItemGenre.NECK || genre === ItemGenre.FINGER) {
    // Dodatnie atrybuty podstawowe podwojone względem epickich.
    for (const attr of CORE_ATTRIBUTES) {
      const value = (result as any)[attr] as number;
      if (value > 0) {
        (result as any)[attr] = value * 2;
      }
    }
  }
}

function calcValue(value: number, rarity: ItemRarity, prop: string): number {
  const qualityMult = getQualityMultiplier(rarity);
  const isEpic = isEpicTier(rarity);
  const epicMult = getEpicMultiplier(rarity);
  const isLeg = isLegendary(rarity);
  const legendaryBonus = LEGENDARY_BONUS;
  let multipliedValue: number;
  if (isEpic) {
    multipliedValue = scaleValue(value, [epicMult, legendaryBonus], prop);
  } else if (isLeg) {
    multipliedValue = scaleValue(value, [qualityMult, legendaryBonus], prop);
  } else {
    multipliedValue = scaleValue(value, [qualityMult], prop);
  }
  return multipliedValue;
}
