import { Stats } from './Stats';
import { ItemRarity } from './constants/itemRarity';


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


  'laczneObrazeniaWszystkichBroni', 'obrazeniaProcentoweRuny',


  'regen', 'additionalIni'
];

/**
 * Get quality multiplier for a given rarity level (base multiplier only, excludes legendary bonus)
 */
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

/**
 * Check if a rarity level is legendary (includes the legendary bonus)
 */
function isLegendary(rarity: ItemRarity): boolean {
  return rarity.startsWith('LEGENDARNY') || rarity === ItemRarity.EPICKI;
}

/**
 * Get the epic quality multiplier (before legendary bonus)
 */
function getEpicMultiplier(rarity: ItemRarity): number {
  if (rarity === ItemRarity.EPICKI) {
    return 2.5;
  }
  return 1.0;
}

function scaleAndApply(value: number, multipliers: number[], name: string): number {

  if (value >= 1) {
    let result = value;
    for (const multiplier of multipliers) {
      result = Math.ceil(result * multiplier);
    }
    return result;
  }


  const valueStr = value.toString();
  const decimalPart = valueStr.split('.')[1];

  if (!decimalPart) {
    return value;
  }


  const scaleFactor = Math.pow(10, decimalPart.length);


  let scaled = parseInt(decimalPart, 10);


  for (const multiplier of multipliers) {
    if (name === 'mnoznikObrony') {

      scaled = scaled * multiplier;
    } else {

      scaled = Math.ceil(scaled * multiplier);
    }
  }


  if (name === 'mnoznikObrony') {
    scaled = Math.ceil(scaled);
  }


  return scaled / scaleFactor;
}

export function applyQualityMultiplier(stats: Stats, rarity: ItemRarity, playerLvl: number): Stats {
  const result = stats.clone();


  const qualityMult = getQualityMultiplier(rarity);
  const isEpic = rarity === ItemRarity.EPICKI;
  const epicMult = getEpicMultiplier(rarity);
  const isLeg = isLegendary(rarity);
  const legendaryBonus = 1.35;

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

        multipliedValue = scaleAndApply(value, [epicMult, legendaryBonus], prop);

      } else if (isLeg) {

        multipliedValue = scaleAndApply(value, [qualityMult, legendaryBonus], prop);
      } else {

        multipliedValue = scaleAndApply(value, [qualityMult], prop);
      }

      (result as any)[prop] = multipliedValue;
    }

  }


  if (result.mnoznikObrony !== null && result.mnoznikObrony > 0) {
    result.setObronaPrzedmiotow((Math.round(result.obronaAffixu) + result.obronaBazy) + Math.ceil((Math.round(result.obronaAffixu) + result.obronaBazy) * result.mnoznikObrony));
  } else {
    result.setObronaPrzedmiotow(Math.round(result.obronaAffixu + result.obronaBazy));
  }

  result.setCritMultiPalna2h(tempMultiPalna2h);
  result.setAllMinDps(tempObrazenia);
  result.setAllMaxDps(tempObrazenia);
  result.setObronaPrzedmiotow(tempObrona);
  return result;
}

function calcValue(value: number, rarity: ItemRarity, prop: string): number {


  const qualityMult = getQualityMultiplier(rarity);
  const isEpic = rarity === ItemRarity.EPICKI;
  const epicMult = getEpicMultiplier(rarity);
  const isLeg = isLegendary(rarity);
  const legendaryBonus = 1.35;

  let multipliedValue: number;

  if (isEpic) {

    multipliedValue = scaleAndApply(value, [epicMult, legendaryBonus], prop);
  } else if (isLeg) {

    multipliedValue = scaleAndApply(value, [qualityMult, legendaryBonus], prop);
  } else {

    multipliedValue = scaleAndApply(value, [qualityMult], prop);
  }
  return multipliedValue;
}
