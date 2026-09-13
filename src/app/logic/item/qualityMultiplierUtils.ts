import { ItemRarity } from './constants/itemRarity';
import { ItemType } from './constants/itemType';

export const LEGENDARY_BONUS = 1.35;
export const STAROZYTNY_BONUS = 1.5;
export const EPIC_BASE_MULTIPLIER = 2.5;

/**
 * Bazowa twardość (%/100) przedmiotów na poziomie STAROZYTNY.
 * To twardość z samej bazy — twardość z prefixów/sufixów dochodzi na wierzch.
 * Dotyczy tylko slotów HEAD / CHEST / LEGS.
 */
export const STAROZYTNY_BASE_TWARDOSC: Partial<Record<ItemType, number>> = {
  // HEAD
  [ItemType.CZAPKA]: 0.01,
  [ItemType.KASK]: 0.03,
  [ItemType.KOMINIARKA]: 0.01,
  [ItemType.KAPELUSZ]: 0.02,
  [ItemType.HELM]: 0.10,
  [ItemType.OBRECZ]: 0.01,
  [ItemType.OPASKA]: 0.02,
  [ItemType.BANDANA]: 0.03,
  [ItemType.MASKA]: 0.03,
  [ItemType.KORONA]: 0.09,
  // CHEST
  [ItemType.KOSZULKA]: 0.01,
  [ItemType.KURTKA]: 0.02,
  [ItemType.MARYNARKA]: 0.01,
  [ItemType.KAMIZELKA]: 0.04,
  [ItemType.GORSET]: 0.02,
  [ItemType.SMOKING]: 0.02,
  [ItemType.KOLCZUGA]: 0.06,
  [ItemType.PELERYNA]: 0,
  [ItemType.ZBROJAWARSTWOWA]: 0.12,
  [ItemType.PELNAZBROJA]: 0.29,
  // LEGS
  [ItemType.SZORTY]: 0.04,
  [ItemType.SPODNIE]: 0.14,
  [ItemType.KILT]: 0.03,
  [ItemType.SPODNICA]: 0.14,
};

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
    case ItemRarity.STAROZYTNY:
      return 2.0;
    case ItemRarity.LEGENDARNY:
      return 1.0;
    default:
      return 1.0;
  }
}

export function isLegendary(rarity: ItemRarity): boolean {
  return rarity.startsWith('LEGENDARNY') || rarity === ItemRarity.EPICKI || rarity === ItemRarity.STAROZYTNY;
}

export function getEpicMultiplier(rarity: ItemRarity): number {
  if (rarity === ItemRarity.EPICKI || rarity === ItemRarity.STAROZYTNY) {
    return EPIC_BASE_MULTIPLIER;
  }
  return 1.0;
}

/** Starożytny skaluje bazowo identycznie jak Epicki (mnożnik EPIC_BASE_MULTIPLIER). */
export function isEpicTier(rarity: ItemRarity): boolean {
  return rarity === ItemRarity.EPICKI || rarity === ItemRarity.STAROZYTNY;
}

/** Starożytny używa własnego (wyższego) drugiego mnożnika zamiast LEGENDARY_BONUS. */
export function getLegendaryBonus(rarity: ItemRarity): number {
  return rarity === ItemRarity.STAROZYTNY ? STAROZYTNY_BONUS : LEGENDARY_BONUS;
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
