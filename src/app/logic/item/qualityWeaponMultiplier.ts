import { Stats } from './Stats';
import { ItemGenre } from './constants';
import { ItemRarity } from './constants/itemRarity';
import { ItemType } from './constants/itemType';
import { WeaponStats } from './WeaponStats';
import { getRarityMultipliers, scaleValue } from './qualityMultiplierUtils';

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
      // critChanceGlobal is scaled here but intentionally NOT folded into critChancePalna1h yet:
      // it pools across every equipped gun-1h weapon (see buildDashboardValues) before being
      // applied, so two guns each contribute their own bonus to the shared gun-crit pool.
      result.critChanceGlobal = calcValue(result.critChanceGlobal, rarity);
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
  // Ujemne cechy przedmiotu nie są zwiększane przez mnożnik jakości (np. Przeklęty -10% PŻ zostaje -10%).
  if (value < 0) {
    return value;
  }
  return scaleValue(value, getRarityMultipliers(rarity));
}

const WEAPON_DMG_FIELDS: Record<string, [keyof WeaponStats, keyof WeaponStats]> = {
  [ItemGenre.GUN_1H]: ['minDpsPalna1h', 'maxDpsPalna1h'],
  [ItemGenre.GUN_2H]: ['minDpsPalna2h', 'maxDpsPalna2h'],
  [ItemGenre.RANGE_1H]: ['minDpsDystans1h', 'maxDpsDystans1h'],
  [ItemGenre.RANGE_2H]: ['minDpsDystans2h', 'maxDpsDystans2h'],
  [ItemGenre.WHITE_1H]: ['minDpsBiala1h', 'maxDpsBiala1h'],
  [ItemGenre.WHITE_2H]: ['minDpsBiala2h', 'maxDpsBiala2h'],
};

const fmtMult = (m: number): string => '×' + String(m).replace('.', ',');

/**
 * Human-readable trace of how a weapon's own min/max damage is built from its raw (Zwykły-level)
 * stats — e.g. "22 ×2,5 → 55 ×1,5 → 83 ×2 → 166 + 8×25 (obr./poziom) → 366 ×1,1 → 403".
 * Mirrors applyQualityWeaponMultiplier step by step; returns null when the trace doesn't land on the
 * value that function actually produces, so the UI never shows a wrong explanation.
 */
export function describeWeaponDamageScaling(raw: Stats, rarity: ItemRarity, genre: ItemGenre, playerLvl: number, itemType?: ItemType): { min: string; max: string } | null {
  const fields = WEAPON_DMG_FIELDS[genre];
  if (!fields) return null;
  const actual = applyQualityWeaponMultiplier(raw, rarity, genre, playerLvl, itemType) as WeaponStats;
  const r = raw as WeaponStats;
  const twoHanded = genre == ItemGenre.WHITE_2H || genre == ItemGenre.GUN_2H || genre == ItemGenre.RANGE_2H;
  const starozytny = rarity === ItemRarity.STAROZYTNY;
  const mults = getRarityMultipliers(rarity);
  const hasPerLevel = genre == ItemGenre.WHITE_1H || genre == ItemGenre.WHITE_2H || genre == ItemGenre.GUN_2H;
  const levelSteps = Math.ceil(playerLvl / 4);
  const perLevel = hasPerLevel ? calcValue(r.obrazeniaPerLevel, rarity) : 0;
  const vsPotwory = calcValue(r.dpsVsPotwory, rarity);
  const isGun = genre == ItemGenre.GUN_1H || genre == ItemGenre.GUN_2H;

  const trace = (baza: number, broni: number, expected: number): string | null => {
    const parts: string[] = [String(baza)];
    let v = baza;
    if (v > 0) {
      for (const m of mults) {
        v = scaleValue(v, [m]);
        if (m !== 1) parts.push(`${fmtMult(m)} → ${v}`);
      }
    }
    if (starozytny) {
      const bazaMult = twoHanded ? 3 : 2;
      v *= bazaMult;
      parts.push(`${fmtMult(bazaMult)} (starożytna baza) → ${v}`);
    }
    if (perLevel) {
      v += perLevel * levelSteps;
      parts.push(`+ ${perLevel}×${levelSteps} (obr. co 4 poziomy) → ${v}`);
    }
    if (starozytny) {
      const dmgMult = twoHanded ? 1.2 : 1.1;
      v = Math.ceil(Number((v * dmgMult).toFixed(6)));
      parts.push(`${fmtMult(dmgMult)} (starożytny) → ${v}`);
    }
    const extra = vsPotwory + (isGun ? 0 : calcValue(broni, rarity));
    if (extra) {
      v += extra;
      parts.push(`+ ${extra} (obrażenia broni) → ${v}`);
    }
    return v === expected ? parts.join(' ') : null;
  };

  const min = trace(r.bazaDpsMin, r.dpsBroniMin, actual[fields[0]] as number);
  const max = trace(r.bazaDpsMax, r.dpsBroniMax, actual[fields[1]] as number);
  return min && max ? { min, max } : null;
}
