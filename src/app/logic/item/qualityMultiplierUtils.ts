import { ItemRarity } from './constants/itemRarity';

export const LEGENDARY_BONUS = 1.35;
export const EPIC_BASE_MULTIPLIER = 2.5;

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

export function isLegendary(rarity: ItemRarity): boolean {
  return rarity.startsWith('LEGENDARNY') || rarity === ItemRarity.EPICKI;
}

export function getEpicMultiplier(rarity: ItemRarity): number {
  if (rarity === ItemRarity.EPICKI) {
    return EPIC_BASE_MULTIPLIER;
  }
  return 1.0;
}

export function scaleValue(value: number, multipliers: number[], name: string = ''): number {
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
  const decimalPlaces = Math.max(decimalPart.length, 2);
  const scaleFactor = Math.pow(10, decimalPlaces);
  let scaled = Math.round(value * scaleFactor);
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
