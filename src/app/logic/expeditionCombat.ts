import { StarMob } from '../data/mobsData';
import { scaledRangeForStar } from '../data/mobStatUtils';
import { SavedCharacter } from '../services/saved-characters.service';
import { DashboardService } from '../services/calculate';
import { Character, WeaponDamage } from '../models/character';
import { MOB_COMBAT_PROFILES, MobCombatProfile, MobWeaponGenre } from '../data/mobCombatProfiles';

const ROUNDS = 10;

export type MobStatVariant = 'min' | 'max';

/** Picks the min or max end of a star-scaled stat range — lets the user preview/fight the weakest or strongest roll for a given star. */
function pickStat(range: { min: number; max: number } | null, variant: MobStatVariant): number {
  if (!range) return 0;
  return variant === 'max' ? range.max : range.min;
}

function randomInt(min: number, max: number): number {
  if (max <= min) return Math.max(0, Math.round(min));
  return Math.round(min + Math.random() * (max - min));
}

/** Mob combat-profile damage scales +60% per star above 1 (star 1 = base, star 2 = 1.6x, star 3 = 2.2x, ...). */
function mobDamageStarMultiplier(star: number): number {
  return 1 + Math.max(0, star - 1) * 0.6;
}

/** Flat amount added to both minDmg and maxDmg for the selected stat variant, applied separately from the main mobDamageStarMultiplier — 0 unless the profile sets one. */
function mobVariantDamageFlatBonus(variant: MobStatVariant, profile?: MobCombatProfile): number {
  if (!profile?.variantDamageFlatBonus) return 0;
  return variant === 'min' ? profile.variantDamageFlatBonus.min : profile.variantDamageFlatBonus.max;
}

/** The variant flat-damage bonus scales +20% per star above 1 (star 1 = base, star 2 = 1.2x, star 3 = 1.4x, ...) — independent of mobDamageStarMultiplier's own +60%/star. */
function flatBonusStarMultiplier(star: number): number {
  return 1 + Math.max(0, star - 1) * 0.2;
}

/** Player level cap scales +50% per star above 1 (star 1 = base, star 2 = 1.5x, star 3 = 2x, ...). */
function mobLevelCapForStar(baseCap: number, star: number): number {
  return Math.round(baseCap * (1 + Math.max(0, star - 1) * 0.5));
}

export interface RosterBonus {
  extraDamage: number;
  extraHitChance: number;
}

/**
 * Incomplete-roster penalty: activates when the joined players' level sum is
 * under half of the star-scaled player level cap. The mob then gets extra
 * flat damage equal to (levelCap/damageCapDivisor - joinedLevelSum) — divisor
 * defaults to 1 (full levelCap), but a mob can use a smaller reference cap for
 * its damage bonus specifically (e.g. Abaddon uses half the cap) via
 * MobCombatProfile.rosterBonusDamageCapDivisor — plus extra hit-chance points
 * scaled by how large the FULL (undivided) deficit is relative to the cap
 * (deficit²/levelCap), plus a flat +1000 hit-chance bonus when the expedition
 * is done solo. Both levelCap and the deficits scale with star. Never negative.
 */
function computeRosterBonus(levelCap: number | null, joinedLevelSum: number, playerCount: number, damageCapDivisor: number = 1): RosterBonus {
  if (!levelCap || levelCap <= 0) return { extraDamage: 0, extraHitChance: 0 };
  if (joinedLevelSum >= levelCap / 2) return { extraDamage: 0, extraHitChance: 0 };
  const deficit = Math.max(0, levelCap - joinedLevelSum);
  const damageDeficit = Math.max(0, levelCap / damageCapDivisor - joinedLevelSum);
  const soloBonus = playerCount === 1 ? 1000 : 0;
  return {
    extraDamage: damageDeficit,
    extraHitChance: Math.max(0, deficit * (deficit / levelCap) + soloBonus),
  };
}

/**
 * Talizman Lewiatan: only meaningful in real-time combat, not the static
 * calculator — each crit the player takes grants a flat obrona/odpornosc
 * buff that resets at the start of every round, plus HP regen at tier 3+.
 */
const LEWIATAN_BONUS: Record<number, { obrona: number; odpornosc: number; hpRegen: number }> = {
  1: { obrona: 5, odpornosc: 3, hpRegen: 0 },
  2: { obrona: 10, odpornosc: 6, hpRegen: 0 },
  3: { obrona: 20, odpornosc: 10, hpRegen: 40 },
  4: { obrona: 26, odpornosc: 14, hpRegen: 80 },
};

/** Szpony Nocy tier 4: each point of Nocny Łowca adds 0.5% chance to also trigger Groza in round 3, capped at 25%. */
function grozaRound3Chance(szponyNocyTier: number, nocnyLowcaPoints: number): number {
  if (szponyNocyTier !== 4) return 0;
  return Math.min(0.005 * nocnyLowcaPoints, 0.25);
}

export interface PlayerCombatState {
  id: string;
  name: string;
  maxHp: number;
  hp: number;
  alive: boolean;
  initiative: number;
  redukcja: number;
  obrona: number;
  odpornosc: number;
  /** Pancerz: boosts non-arcane odpornosc used specifically against gun (palna) attacks — the Skóra Bestii-derived portion is excluded. */
  skoraBestiiOdpornosc: number;
  pancerzGunMulti: number;
  spostrzegawczosc: number;
  szczescie: number;
  unikBiala: number;
  unikPalna: number;
  unikDystans: number;
  enemyCritChanceReduction: number;
  hasGroza: boolean;
  grozaRound3Chance: number;
  lewiatanLevel: number;
  lewiatanBonusObrona: number;
  lewiatanBonusOdpornosc: number;
  /** Tchnienie Śmierci: sticky once triggered — activates when hp/maxHp drops to/below tchnienieThreshold. */
  tchnienieLevel: number;
  tchnienieThreshold: number;
  tchnienieActive: boolean;
  weaponsActivated: WeaponDamage[];
  unikBialaActivated: number;
  unikPalnaActivated: number;
  unikDystansActivated: number;
  /** Otchłań Ciszy: on this player's first landed hit each round, the mob's CURRENT obrona/odpornosc is multiplied by (1 - otchlanReduction) — compounds every round, per qualifying player, uncapped in total. */
  otchlanReduction: number;
  /** Macki Strachu (mob special): once triggered, this player's ignoreObrony is treated as 0 for the rest of the round. */
  ignoreDisabledThisRound: boolean;
  /** Potęga Mocy: on this player's first landed hit of the whole fight, steals up to this much crit-multiplier from the mob (floored so the mob keeps at least 150%) and adds it to their own weapons. Fires once, ever. */
  potegaStealPotential: number;
  potegaTriggered: boolean;
  potegaAppliedSteal: number;
  /** Furia Bestii: chance to counterattack with every equipped weapon each time the mob crits this player, capped per round at furiaCapPercent of that round's normal weapon-attack count. */
  furiaChance: number;
  furiaCapPercent: number;
  furiaMaxCountersThisRound: number;
  furiaCountersUsedThisRound: number;
  /** Cichy Łowca: chance to immediately swing again with the same weapon after a missed/dodged attack. */
  cichyLowcaChance: number;
  /** Ziz tier 4: each of this player's own crits permanently adds to their crit-multiplier for the rest of the fight (+0.05 for a 2H weapon crit, +0.025 for 1H) — same mechanic shape as the mob's Demoniczny Gniew special, though the two scale independently. */
  zizActive: boolean;
  zizBonus: number;
  /** End-of-round HP regen (from the calculator's dashboard), capped at half of this player's own damage dealt that round. */
  regenPerRound: number;
  damageDealtThisRound: number;
  weapons: WeaponDamage[];
  // ── Post-fight summary counters (simulateExpedition only — left at 0 in the stat-preview builder). ──
  attacksMade: number;
  hitsLanded: number;
  critsLanded: number;
  attacksReceived: number;
  hitsReceived: number;
  totalDamageDealt: number;
  kills: number;
}

/** Bakes an added crit-multiplier straight into a weapon's critDmgMin/Max, matching how calculate.ts derives them (minDmg/maxDmg * critMulti). */
function boostWeaponsCritMulti(weapons: WeaponDamage[], addedMulti: number): void {
  for (const weapon of weapons) {
    const newCritMulti = (weapon.critMulti ?? 1) + addedMulti;
    weapon.critMulti = newCritMulti;
    weapon.critDmgMin = Math.floor(weapon.minDmg * newCritMulti);
    weapon.critDmgMax = Math.floor(weapon.maxDmg * newCritMulti);
  }
}

/** Otchłań Ciszy tiers cap how large a single proc's reduction can be (0.5% per Cisza Krwi point, capped per tier). */
const OTCHLAN_PER_HIT_CAP: Record<number, number> = { 1: 0.10, 2: 0.15, 3: 0.20, 4: 0.25 };

/** Potęga Mocy tiers: % of each invested Wyssanie Mocy point stolen from the mob's crit multiplier. */
const POTEGA_RATE_PER_LEVEL: Record<number, number> = { 1: 0.005, 2: 0.0075, 3: 0.01, 4: 0.015 };

function potegaStealPotentialFor(potegaTier: number, wyssanieMocyPoints: number): number {
  const rate = POTEGA_RATE_PER_LEVEL[potegaTier];
  if (!rate) return 0;
  return rate * wyssanieMocyPoints;
}

/** Furia Bestii tiers: max counterattack chance, and max counterattacks per round as a % of that round's normal attack count. */
const FURIA_CHANCE_CAP: Record<number, number> = { 1: 0.45, 2: 0.55, 3: 0.65, 4: 0.75 };
const FURIA_COUNTER_CAP_PERCENT: Record<number, number> = { 1: 0.30, 2: 0.40, 3: 0.50, 4: 0.60 };

function furiaChanceFor(furiaTier: number, dzikiSzalLevel: number): number {
  const cap = FURIA_CHANCE_CAP[furiaTier];
  if (!cap) return 0;
  return Math.min(0.01 * dzikiSzalLevel, cap);
}

function otchlanReductionFor(otchlanTier: number, ciszaKrwiLevel: number): number {
  const cap = OTCHLAN_PER_HIT_CAP[otchlanTier];
  if (!cap) return 0;
  return Math.min(0.005 * ciszaKrwiLevel, cap);
}

export interface AuraBestiiTeamBonus {
  /** The 4 strongest qualifying contributors on the team, each already getting their own personal Aura Bestii tier-4 baseLife bonus (skora×30) via doAura — kept per-contributor so each player's HP-bonus share can exclude their own contribution. */
  contributors: { id: string; skoraBestii: number }[];
  critReductionBonus: number;
}

/**
 * Aura Bestii tier 4: each Skóra Bestii point a qualifying player has invested grants the REST of
 * the team +10 baseLife each — fed into each recipient's own calculateStuff() call as extraBaseLife
 * so it compounds with Życie i Śmierć × Tchnienie Śmierci, Majestat, and the Wzmocniony set's
 * punktyZycia% exactly like equipment/umagi baseLife does. A contributor doesn't also collect a
 * share of their own contribution — they already get skora×30 personally via doAura — only
 * everyone else's. Crit-chance reduction (-0.75%/point) is unaffected and applies team-wide
 * including the contributor. Only the 4 strongest such contributors on the team count. Static (team
 * composition doesn't change mid-fight), so this is computed once and applied to every player alike.
 */
function computeAuraBestiiTeamBonus(savedPlayers: SavedCharacter[]): AuraBestiiTeamBonus {
  const contributors = savedPlayers
    .filter(p => (p.character.talizmanLevels?.auraBestii ?? 0) === 4 && (p.character.arcaneLevels?.skoraBestii ?? 0) > 0)
    .map(p => ({ id: p.id, skoraBestii: p.character.arcaneLevels!.skoraBestii }))
    .sort((a, b) => b.skoraBestii - a.skoraBestii)
    .slice(0, 4);
  const totalSkoraBestii = contributors.reduce((sum, c) => sum + c.skoraBestii, 0);
  return {
    contributors,
    critReductionBonus: totalSkoraBestii * 0.0075,
  };
}

/** This player's share of the Aura Bestii team HP bonus: 10×skoraBestii from every OTHER qualifying contributor, excluding their own (already covered by their personal tier-4 bonus). */
function auraBestiiHpShareFor(bonus: AuraBestiiTeamBonus, playerId: string): number {
  return bonus.contributors.filter(c => c.id !== playerId).reduce((sum, c) => sum + c.skoraBestii, 0) * 10;
}

/** Cichy Łowca tier 4: each Kocie Ścieżki point gives 1% chance to immediately swing again after a missed or dodged attack, capped at 50%. */
function cichyLowcaChanceFor(cichyLowcaTier: number, kocieSciezkiLevel: number): number {
  if (cichyLowcaTier !== 4) return 0;
  return Math.min(0.01 * kocieSciezkiLevel, 0.50);
}

/** Macki Strachu: eligible once the mob has taken 25% of its max HP; each subsequent player attack against it then has this chance to disable that attacker's ignoreObrony for the rest of the round. */
const MACKI_STRACHU_HP_THRESHOLD = 0.75;
const MACKI_STRACHU_PROC_CHANCE = 0.30;

/** Recomputes a weapon's damage bounds as if its ignoreObrony were 0 — i.e. the mob's obrona/odpornosc is subtracted in full instead of discounted by the weapon's ignore stat, mirroring the reduction calculate.ts applies before ignore. */
function ignoreDisabledWeaponBounds(w: WeaponDamage, mobObrona: number, mobOdpornosc: number, genre: MobWeaponGenre): { minDmg: number; maxDmg: number; critDmgMin: number; critDmgMax: number } {
  const ignore = w.ignore ?? 0;
  const factor = genre === 'dystans' ? mobObrona / 4 : genre === 'biala' ? mobObrona / 2 : mobOdpornosc / 2;
  const extraReduction = Math.floor(factor) - Math.floor(factor * (1 - ignore));
  const minDmg = Math.max(1, w.minDmg - extraReduction);
  const maxDmg = Math.max(1, w.maxDmg - extraReduction);
  const critMulti = w.critMulti ?? 1;
  return {
    minDmg,
    maxDmg,
    critDmgMin: Math.max(1, Math.floor(minDmg * critMulti)),
    critDmgMax: Math.max(1, Math.floor(maxDmg * critMulti)),
  };
}

const TCHNIENIE_ACCEL_PER_LEVEL: Record<number, number> = { 1: 0.005, 2: 0.01, 3: 0.015, 4: 0.02 };

/** Życie i Śmierć tiers accelerate Tchnienie Śmierci's base 35%-hp activation threshold, capped at a combined 70%. */
function tchnienieActivationThreshold(zycieSmierciTier: number, tchnienieLevel: number): number {
  const accel = TCHNIENIE_ACCEL_PER_LEVEL[zycieSmierciTier] ?? 0;
  return 0.35 + Math.min(accel * tchnienieLevel, 0.35);
}

/** Flips the sticky Tchnienie Śmierci activation once the target's hp fraction drops to/below its threshold. Returns whether it just activated. */
function tryActivateTchnienie(target: PlayerCombatState): boolean {
  if (target.tchnienieActive || target.tchnienieLevel <= 0) return false;
  if (target.hp / target.maxHp > target.tchnienieThreshold) return false;
  target.tchnienieActive = true;
  target.weapons = target.weaponsActivated;
  target.unikBiala = target.unikBialaActivated;
  target.unikPalna = target.unikPalnaActivated;
  target.unikDystans = target.unikDystansActivated;
  return true;
}

/** Skóra Bestii: reduces the mob's crit chance against this player, floored at a minimum of 1%. */
function effectiveMobCritChance(baseCritChance: number, target: PlayerCombatState): number {
  return Math.max(0.01, baseCritChance - target.enemyCritChanceReduction);
}

export interface CombatAttackLog {
  round: number;
  attackerName: string;
  attackerSide: 'players' | 'mob';
  weaponName: string;
  targetName: string;
  hit: boolean;
  dodged: boolean;
  crit: boolean;
  damage: number;
  targetHpAfter: number;
  mobHpAfter: number;
  /** When set, the UI shows this exact text instead of the normal hit/crit/dodge phrasing (e.g. a Groza activation). */
  note?: string;
  /** Set on the death-announcement line pushed the instant a player or the mob hits 0 HP — lets the UI color it by side instead of as a generic special-effect note. */
  died?: boolean;
}

export type ExpeditionOutcome = 'win' | 'loss' | 'draw';

/** Per-combatant post-fight scoreboard row (damage/kills/hp header + hit-rate detail box). */
export interface CombatantSummary {
  name: string;
  side: 'players' | 'mob';
  damageDealt: number;
  kills: number;
  hpRemaining: number;
  hpMax: number;
  attacksMade: number;
  hitsLanded: number;
  critsLanded: number;
  attacksReceived: number;
  hitsReceived: number;
}

export interface CombatSummary {
  players: CombatantSummary[];
  mob: CombatantSummary;
}

export interface ExpeditionResult {
  outcome: ExpeditionOutcome;
  attacks: CombatAttackLog[];
  players: PlayerCombatState[];
  mobName: string;
  mobMaxHp: number;
  mobHpRemaining: number;
  roundsElapsed: number;
  summary: CombatSummary;
}

function unikForGenre(target: PlayerCombatState, genre: MobWeaponGenre): number {
  if (genre === 'biala') return target.unikBiala;
  if (genre === 'dystans') return target.unikDystans;
  return target.unikPalna;
}

/** Maps a player weapon's ItemGenre (e.g. WHITE_2H, GUN_1H) to the mob-side biala/palna/dystans bucket. */
function mobGenreForWeapon(genre?: string): MobWeaponGenre {
  if (!genre) return 'biala';
  if (genre.startsWith('GUN')) return 'palna';
  if (genre.startsWith('RANGE')) return 'dystans';
  return 'biala';
}

/**
 * Resolves the mob stat that feeds a player's "Trafienie Przeciwnika" for hit-chance math,
 * mirroring the manual guidance for that field in Kalkulator Postaci: a white-weapon user
 * subtracts the mob's zwinnosc, a gun user its spostrzegawczosc, and a ranged-weapon user the
 * sum of both — driven by the player's first equipped weapon (dual 1H+1H combos use weapon1).
 * Using a single fixed stat (previously always spostrzegawczosc) regardless of weapon type
 * under- or over-counted the mob's real evasion-relevant stat and inflated hit chance for
 * white/ranged users. The genre itself is read off a throwaway calculateStuff call since the
 * ItemType→genre mapping lives in the calculator layer, not here.
 */
function resolveTrafieniePrzeciwnik(character: Character, dashboardService: DashboardService, mobZwinnosc: number, mobSpostrzegawczosc: number): number {
  const probe = dashboardService.calculateStuff({
    ...character,
    obronaPrzeciwnika: 0,
    odpornoscPrzeciwnika: 0,
    szczesciePrzeciwnika: 0,
    trafieniePrzeciwnika: 0,
    tchnienieSmierciActive: false,
  });
  const genre = mobGenreForWeapon(probe.obrazenia?.[0]?.genre);
  if (genre === 'biala') return mobZwinnosc;
  if (genre === 'palna') return mobSpostrzegawczosc;
  return mobZwinnosc + mobSpostrzegawczosc;
}

function mobUnikFor(profile: MobCombatProfile | undefined, genre: MobWeaponGenre): number {
  return profile?.unik?.[genre] ?? 0;
}

/** Pancerz evolution: boosts non-arcane odpornosc used against gun (palna) attacks — 50% at 5-8, 100% at 9-14, 150% at 15. */
function pancerzGunDefenseMultiplier(pancerzLevel: number): number {
  if (pancerzLevel >= 15) return 1.5;
  if (pancerzLevel >= 9) return 1.0;
  if (pancerzLevel >= 5) return 0.5;
  return 0;
}

/** Flat obrona/odpornosc-based reduction, applied AFTER the target's redukcja obrażeń percentage. */
function mobHitDefenseReduction(profile: MobCombatProfile, target: PlayerCombatState): number {
  const obrona = target.obrona + target.lewiatanBonusObrona;
  const odpornosc = target.odpornosc + target.lewiatanBonusOdpornosc;
  if (profile.weaponGenre === 'dystans') return Math.floor(obrona / 4);
  if (profile.weaponGenre === 'biala') return Math.floor(obrona / 2);
  // Palna (gun): Pancerz boosts the non-arcane portion of odpornosc — Skóra Bestii's contribution is excluded, then added back unmultiplied.
  const nonArcaneOdpornosc = Math.max(0, odpornosc - target.skoraBestiiOdpornosc);
  const boostedOdpornosc = nonArcaneOdpornosc * (1 + target.pancerzGunMulti) + target.skoraBestiiOdpornosc;
  return Math.floor(boostedOdpornosc / 2);
}

/** Applies the Lewiatan crit-received proc to the target: stacking obrona/odpornosc (reset each round) plus HP regen at tier 3+. Returns whether it fired. */
function applyLewiatanProc(target: PlayerCombatState): boolean {
  const bonus = LEWIATAN_BONUS[target.lewiatanLevel];
  if (!bonus) return false;
  target.lewiatanBonusObrona += bonus.obrona;
  target.lewiatanBonusOdpornosc += bonus.odpornosc;
  if (bonus.hpRegen > 0 && target.alive) {
    target.hp = Math.min(target.maxHp, target.hp + bonus.hpRegen);
  }
  return true;
}

/**
 * Same luck/skill-clamped hit-chance formula the player side already uses
 * (calculate.ts#calculateHitChance), applied with the mob as attacker:
 * - skill stat (y) depends on weapon genre: zwinność for biała, spostrzegawczość
 *   for palna, both combined for dystans.
 * - luck (szczęście) difference sets the min/max hit-chance band (90+/10+ diff/5,
 *   clamped to 20-99 / 1-65), it does not shift the raw hit chance itself.
 */
function mobHitChance(weaponGenre: MobWeaponGenre, mobZwinnosc: number, mobSpostrzegawczosc: number, mobSzczescie: number, target: PlayerCombatState, extraHitChance = 0): number {
  const y = weaponGenre === 'biala' ? mobZwinnosc
    : weaponGenre === 'palna' ? mobSpostrzegawczosc
    : mobZwinnosc + mobSpostrzegawczosc;
  const r = target.spostrzegawczosc;

  const luckDiff = mobSzczescie - target.szczescie;
  let luckModifier = Math.floor(luckDiff / 5);
  if (luckDiff < 0) {
    const skillDiff = y - r;
    if (skillDiff > 0) {
      const reduction = Math.floor(skillDiff / 10);
      luckModifier = Math.min(luckModifier + reduction, 0);
    }
  }

  const maxHit = Math.min(Math.max(90 + luckModifier, 20), 99);
  const minHit = Math.min(Math.max(10 + luckModifier, 1), 65);
  const rawHit = 70 + 2 * y - 2 * r + extraHitChance;

  return Math.min(Math.max(rawHit, minHit), maxHit) / 100;
}

export interface CombatPreviewWeapon {
  name: string;
  minDmg: number;
  maxDmg: number;
  hitChance: number;
  critChance: number;
  critMulti: number;
  mobDodge: number;
  attacksPerRound: number;
}

export interface CombatPreviewPlayer {
  id: string;
  name: string;
  rasa: string;
  maxHp: number;
  redukcja: number;
  obrona: number;
  odpornosc: number;
  luck: number;
  initiative: number;
  dodge: number;
  mobHitChance: number;
  mobCritChance: number;
  /** Damage this specific player would take from a normal (non-crit) mob hit, after their own redukcja and flat obrona/odpornosc-based reduction. 0/0 when the mob has no combat profile. */
  mobMinDmgToPlayer: number;
  mobMaxDmgToPlayer: number;
  /** Same as above but for a crit mob hit (mob minDmg/maxDmg scaled by its critMulti first). */
  mobMinCritDmgToPlayer: number;
  mobMaxCritDmgToPlayer: number;
  weapons: CombatPreviewWeapon[];
}

export interface CombatPreviewMob {
  name: string;
  maxHp: number;
  minDmg: number;
  maxDmg: number;
  critChance: number;
  critMulti: number;
  obrona: number;
  odpornosc: number;
  luck: number;
  initiative: number;
  hasProfile: boolean;
  unikBiala: number;
  unikPalna: number;
  unikDystans: number;
  playerLevelCap: number | null;
  rosterBonus: RosterBonus;
  weaponName: string | null;
  attacksPerRound: number;
}

export interface CombatPreview {
  mob: CombatPreviewMob;
  players: CombatPreviewPlayer[];
}

/** Same scaled-stat + dashboard math as simulateExpedition, without running any rounds — for a pre-fight stat readout. */
export function computeCombatPreview(
  savedPlayers: SavedCharacter[],
  mob: StarMob,
  star: number,
  dashboardService: DashboardService,
  mobVariant: MobStatVariant = 'min',
): CombatPreview {
  const mobObrona = pickStat(scaledRangeForStar(mob, 'obrona', star), mobVariant);
  const mobOdpornosc = pickStat(scaledRangeForStar(mob, 'odpornosc', star), mobVariant);
  const mobSpostrzegawczosc = pickStat(scaledRangeForStar(mob, 'spostrzegawczosc', star), mobVariant);
  const mobSzczescie = pickStat(scaledRangeForStar(mob, 'szczescie', star), mobVariant);
  const mobZwinnosc = pickStat(scaledRangeForStar(mob, 'zwinnosc', star), mobVariant);
  const mobMaxHp = pickStat(scaledRangeForStar(mob, 'zycie', star), mobVariant) || 1;
  const mobInitiative = mobZwinnosc + mobSpostrzegawczosc;
  const profile = MOB_COMBAT_PROFILES[mob.name];
  const levelCap = profile?.playerLevelCap ? mobLevelCapForStar(profile.playerLevelCap, star) : null;
  const joinedLevelSum = savedPlayers.reduce((sum, p) => sum + (p.character.poziom ?? 0), 0);
  const rosterBonus = computeRosterBonus(levelCap, joinedLevelSum, savedPlayers.length, profile?.rosterBonusDamageCapDivisor ?? 1);
  const auraBestiiBonus = computeAuraBestiiTeamBonus(savedPlayers);

  const mobMinDmgBase = profile ? Math.round(profile.minDmg * mobDamageStarMultiplier(star) + mobVariantDamageFlatBonus(mobVariant, profile) * flatBonusStarMultiplier(star)) + rosterBonus.extraDamage : 0;
  const mobMaxDmgBase = profile ? Math.round(profile.maxDmg * mobDamageStarMultiplier(star) + mobVariantDamageFlatBonus(mobVariant, profile) * flatBonusStarMultiplier(star)) + rosterBonus.extraDamage : 0;

  const players: CombatPreviewPlayer[] = savedPlayers.map(saved => {
    const character: Character = {
      ...saved.character,
      obronaPrzeciwnika: mobObrona,
      odpornoscPrzeciwnika: mobOdpornosc,
      szczesciePrzeciwnika: mobSzczescie,
      trafieniePrzeciwnika: resolveTrafieniePrzeciwnik(saved.character, dashboardService, mobZwinnosc, mobSpostrzegawczosc),
      // Preview always shows the pre-activation (full-hp) state — the real, HP-gated activation only runs in simulateExpedition.
      tchnienieSmierciActive: false,
    };
    const dashboard = dashboardService.calculateStuff(character, auraBestiiHpShareFor(auraBestiiBonus, saved.id));
    const tchnienieLevel = saved.character.arcaneLevels?.tchnienieSmierci ?? 0;
    const target: PlayerCombatState = {
      id: saved.id,
      name: saved.name,
      maxHp: dashboard.punktyZycia ?? 1,
      hp: 0,
      alive: true,
      initiative: dashboard.inicjatywa ?? 0,
      redukcja: dashboard.redukcja ?? 0,
      obrona: dashboard.obrona ?? 0,
      odpornosc: dashboard.attributes?.odpornosc ?? 0,
      skoraBestiiOdpornosc: saved.character.arcaneLevels?.skoraBestii ?? 0,
      pancerzGunMulti: pancerzGunDefenseMultiplier(saved.character.evolutions?.pancerz ?? 0),
      spostrzegawczosc: dashboard.attributes?.spostrzegawczosc ?? 0,
      szczescie: dashboard.szczescie ?? 0,
      unikBiala: dashboard.unikBiala ?? 0,
      unikPalna: dashboard.unikPalna ?? 0,
      unikDystans: dashboard.unikDystans ?? 0,
      enemyCritChanceReduction: (dashboard.enemyCritChanceReduction ?? 0) + auraBestiiBonus.critReductionBonus,
      hasGroza: saved.character.arcaneLevels?.groza ?? false,
      grozaRound3Chance: grozaRound3Chance(saved.character.talizmanLevels?.szponyNocy ?? 0, saved.character.arcaneLevels?.nocnyLowca ?? 0),
      lewiatanLevel: saved.character.talizmanLevels?.lewiatan ?? 0,
      lewiatanBonusObrona: 0,
      lewiatanBonusOdpornosc: 0,
      tchnienieLevel,
      tchnienieThreshold: tchnienieActivationThreshold(saved.character.talizmanLevels?.zycieISmierc ?? 0, tchnienieLevel),
      tchnienieActive: false,
      weaponsActivated: [],
      unikBialaActivated: dashboard.unikBiala ?? 0,
      unikPalnaActivated: dashboard.unikPalna ?? 0,
      unikDystansActivated: dashboard.unikDystans ?? 0,
      otchlanReduction: otchlanReductionFor(saved.character.talizmanLevels?.otchlaniCiszy ?? 0, saved.character.arcaneLevels?.ciszaKrwi ?? 0),
      ignoreDisabledThisRound: false,
      potegaStealPotential: potegaStealPotentialFor(saved.character.talizmanLevels?.potegaMocy ?? 0, saved.character.arcaneLevels?.wyssanieMocy ?? 0),
      potegaTriggered: false,
      potegaAppliedSteal: 0,
      furiaChance: furiaChanceFor(saved.character.talizmanLevels?.furiaBestii ?? 0, saved.character.arcaneLevels?.dzikiSzal ?? 0),
      furiaCapPercent: FURIA_COUNTER_CAP_PERCENT[saved.character.talizmanLevels?.furiaBestii ?? 0] ?? 0,
      furiaMaxCountersThisRound: 0,
      furiaCountersUsedThisRound: 0,
      cichyLowcaChance: cichyLowcaChanceFor(saved.character.talizmanLevels?.cichyLowca ?? 0, saved.character.arcaneLevels?.kocieSciezki ?? 0),
      zizActive: (saved.character.talizmanLevels?.ziz ?? 0) === 4,
      zizBonus: 0,
      regenPerRound: dashboard.regeneracja ?? 0,
      damageDealtThisRound: 0,
      weapons: [],
      attacksMade: 0,
      hitsLanded: 0,
      critsLanded: 0,
      attacksReceived: 0,
      hitsReceived: 0,
      totalDamageDealt: 0,
      kills: 0,
    };
    const genre: MobWeaponGenre = profile?.weaponGenre ?? 'biala';
    const defenseReduction = profile ? mobHitDefenseReduction(profile, target) : 0;
    const mobCritMultiPreview = profile?.critMulti ?? 1;
    return {
      id: saved.id,
      name: saved.name,
      rasa: saved.character.rasa,
      maxHp: target.maxHp,
      redukcja: target.redukcja,
      obrona: target.obrona,
      odpornosc: target.odpornosc,
      luck: target.szczescie,
      initiative: target.initiative,
      dodge: unikForGenre(target, genre),
      mobHitChance: mobHitChance(profile?.weaponGenre ?? 'dystans', mobZwinnosc, mobSpostrzegawczosc, mobSzczescie, target, rosterBonus.extraHitChance),
      mobCritChance: profile ? effectiveMobCritChance(profile.critChance, target) : 0,
      mobMinDmgToPlayer: profile ? Math.max(0, Math.round(mobMinDmgBase * (1 - target.redukcja) - defenseReduction)) : 0,
      mobMaxDmgToPlayer: profile ? Math.max(0, Math.round(mobMaxDmgBase * (1 - target.redukcja) - defenseReduction)) : 0,
      mobMinCritDmgToPlayer: profile ? Math.max(0, Math.round(mobMinDmgBase * mobCritMultiPreview * (1 - target.redukcja) - defenseReduction)) : 0,
      mobMaxCritDmgToPlayer: profile ? Math.max(0, Math.round(mobMaxDmgBase * mobCritMultiPreview * (1 - target.redukcja) - defenseReduction)) : 0,
      weapons: (dashboard.obrazenia ?? []).map((w: WeaponDamage) => ({
        name: w.name,
        minDmg: w.minDmg,
        maxDmg: w.maxDmg,
        hitChance: w.estimatedHitChance ?? 1,
        critChance: w.critChance ?? 0,
        critMulti: w.critMulti ?? 1,
        mobDodge: mobUnikFor(profile, mobGenreForWeapon(w.genre)),
        attacksPerRound: w.iloscAtakow ?? 0,
      })),
    };
  });

  const mobPreview: CombatPreviewMob = {
    name: mob.name,
    maxHp: mobMaxHp,
    minDmg: mobMinDmgBase,
    maxDmg: mobMaxDmgBase,
    critChance: profile?.critChance ?? 0,
    critMulti: profile?.critMulti ?? 1,
    obrona: mobObrona,
    odpornosc: mobOdpornosc,
    luck: mobSzczescie,
    initiative: mobInitiative,
    unikBiala: profile?.unik?.biala ?? 0,
    unikPalna: profile?.unik?.palna ?? 0,
    unikDystans: profile?.unik?.dystans ?? 0,
    playerLevelCap: levelCap,
    rosterBonus,
    hasProfile: !!profile,
    weaponName: profile?.weaponName ?? null,
    attacksPerRound: profile?.attacksPerRound ?? 0,
  };

  return { mob: mobPreview, players };
}

interface ShotQueueEntry {
  side: 'player' | 'mob';
  player?: PlayerCombatState;
  /** Index into the player's CURRENT `weapons` array, resolved live at attack time — not a snapshot — so a
   *  mid-round Tchnienie Śmierci activation (which swaps `player.weapons` to the boosted set) immediately
   *  applies to this player's still-queued shots for the rest of the round, instead of only from next round. */
  weaponIndex?: number;
}

/**
 * v2 expedition simulation: real per-attack RNG (hit / crit / damage rolls),
 * individual attacks interleaved across all combatants by initiative
 * (round-robin — highest initiative fires first each cycle, repeating until
 * everyone's attacks for the round are used), maxed at 10 rounds. Combat
 * stops the instant either side is fully emptied, not just at round end.
 *
 * Player-side hit/crit/damage uses the exact same weapon math as the
 * calculator (WeaponDamage.estimatedHitChance / critChance / min-max /
 * critDmgMin-Max), plus the boss's own per-weapon-genre dodge chance
 * (MobCombatProfile.unik). Mob-side damage uses its MobCombatProfile where
 * one exists (falls back to a rough placeholder otherwise); incoming damage
 * is first reduced by the target's redukcja obrażeń percentage, then by the
 * usual flat obrona/odpornosc-based genre reduction on what's left, with
 * target dodge chance pulled from the same unik stats already computed for
 * the player.
 */
export function simulateExpedition(
  savedPlayers: SavedCharacter[],
  mob: StarMob,
  star: number,
  dashboardService: DashboardService,
  mobVariant: MobStatVariant = 'min',
): ExpeditionResult {
  const mobObrona = pickStat(scaledRangeForStar(mob, 'obrona', star), mobVariant);
  const mobOdpornosc = pickStat(scaledRangeForStar(mob, 'odpornosc', star), mobVariant);
  const mobSpostrzegawczosc = pickStat(scaledRangeForStar(mob, 'spostrzegawczosc', star), mobVariant);
  const mobSzczescie = pickStat(scaledRangeForStar(mob, 'szczescie', star), mobVariant);
  const mobZwinnosc = pickStat(scaledRangeForStar(mob, 'zwinnosc', star), mobVariant);
  const mobMaxHp = pickStat(scaledRangeForStar(mob, 'zycie', star), mobVariant) || 1;
  const mobInitiative = mobZwinnosc + mobSpostrzegawczosc;

  const profile = MOB_COMBAT_PROFILES[mob.name];
  let mobCritMulti = profile?.critMulti ?? 1;
  const placeholderDamagePerAttack = Math.max(1, Math.round((mobObrona + mobZwinnosc) / 2));

  const levelCap = profile?.playerLevelCap ? mobLevelCapForStar(profile.playerLevelCap, star) : null;
  const joinedLevelSum = savedPlayers.reduce((sum, p) => sum + (p.character.poziom ?? 0), 0);
  const rosterBonus = computeRosterBonus(levelCap, joinedLevelSum, savedPlayers.length, profile?.rosterBonusDamageCapDivisor ?? 1);
  const auraBestiiBonus = computeAuraBestiiTeamBonus(savedPlayers);

  const players: PlayerCombatState[] = savedPlayers.map(saved => {
    const characterBase: Character = {
      ...saved.character,
      obronaPrzeciwnika: mobObrona,
      odpornoscPrzeciwnika: mobOdpornosc,
      szczesciePrzeciwnika: mobSzczescie,
      trafieniePrzeciwnika: resolveTrafieniePrzeciwnik(saved.character, dashboardService, mobZwinnosc, mobSpostrzegawczosc),
      // The real activation is HP-gated below, not the manual calculator toggle — combat always starts un-activated.
      tchnienieSmierciActive: false,
    };
    const dashboard = dashboardService.calculateStuff(characterBase, auraBestiiHpShareFor(auraBestiiBonus, saved.id));
    const maxHp = dashboard.punktyZycia ?? 1;
    const tchnienieLevel = saved.character.arcaneLevels?.tchnienieSmierci ?? 0;
    const dashboardActivated = tchnienieLevel > 0
      ? dashboardService.calculateStuff({ ...characterBase, tchnienieSmierciActive: true })
      : dashboard;
    return {
      id: saved.id,
      name: saved.name,
      maxHp,
      hp: maxHp,
      alive: true,
      initiative: dashboard.inicjatywa ?? 0,
      redukcja: dashboard.redukcja ?? 0,
      obrona: dashboard.obrona ?? 0,
      odpornosc: dashboard.attributes?.odpornosc ?? 0,
      skoraBestiiOdpornosc: saved.character.arcaneLevels?.skoraBestii ?? 0,
      pancerzGunMulti: pancerzGunDefenseMultiplier(saved.character.evolutions?.pancerz ?? 0),
      spostrzegawczosc: dashboard.attributes?.spostrzegawczosc ?? 0,
      szczescie: dashboard.szczescie ?? 0,
      unikBiala: dashboard.unikBiala ?? 0,
      unikPalna: dashboard.unikPalna ?? 0,
      unikDystans: dashboard.unikDystans ?? 0,
      enemyCritChanceReduction: (dashboard.enemyCritChanceReduction ?? 0) + auraBestiiBonus.critReductionBonus,
      hasGroza: saved.character.arcaneLevels?.groza ?? false,
      grozaRound3Chance: grozaRound3Chance(saved.character.talizmanLevels?.szponyNocy ?? 0, saved.character.arcaneLevels?.nocnyLowca ?? 0),
      lewiatanLevel: saved.character.talizmanLevels?.lewiatan ?? 0,
      lewiatanBonusObrona: 0,
      lewiatanBonusOdpornosc: 0,
      tchnienieLevel,
      tchnienieThreshold: tchnienieActivationThreshold(saved.character.talizmanLevels?.zycieISmierc ?? 0, tchnienieLevel),
      tchnienieActive: false,
      weaponsActivated: dashboardActivated.obrazenia ?? [],
      unikBialaActivated: dashboardActivated.unikBiala ?? 0,
      unikPalnaActivated: dashboardActivated.unikPalna ?? 0,
      unikDystansActivated: dashboardActivated.unikDystans ?? 0,
      otchlanReduction: otchlanReductionFor(saved.character.talizmanLevels?.otchlaniCiszy ?? 0, saved.character.arcaneLevels?.ciszaKrwi ?? 0),
      ignoreDisabledThisRound: false,
      potegaStealPotential: potegaStealPotentialFor(saved.character.talizmanLevels?.potegaMocy ?? 0, saved.character.arcaneLevels?.wyssanieMocy ?? 0),
      potegaTriggered: false,
      potegaAppliedSteal: 0,
      furiaChance: furiaChanceFor(saved.character.talizmanLevels?.furiaBestii ?? 0, saved.character.arcaneLevels?.dzikiSzal ?? 0),
      furiaCapPercent: FURIA_COUNTER_CAP_PERCENT[saved.character.talizmanLevels?.furiaBestii ?? 0] ?? 0,
      furiaMaxCountersThisRound: 0,
      furiaCountersUsedThisRound: 0,
      cichyLowcaChance: cichyLowcaChanceFor(saved.character.talizmanLevels?.cichyLowca ?? 0, saved.character.arcaneLevels?.kocieSciezki ?? 0),
      zizActive: (saved.character.talizmanLevels?.ziz ?? 0) === 4,
      zizBonus: 0,
      regenPerRound: dashboard.regeneracja ?? 0,
      damageDealtThisRound: 0,
      weapons: dashboard.obrazenia ?? [],
      attacksMade: 0,
      hitsLanded: 0,
      critsLanded: 0,
      attacksReceived: 0,
      hitsReceived: 0,
      totalDamageDealt: 0,
      kills: 0,
    };
  });

  // Otchłań Ciszy: each qualifying player's first landed hit per round multiplies the mob's
  // CURRENT obrona/odpornosc by (1 - their own reduction) — compounds every round, uncapped
  // in total (only the per-proc reduction itself is capped, per talisman tier).
  let mobObronaCurrent = mobObrona;
  let mobOdpornoscCurrent = mobOdpornosc;

  /** Rebuilds every player's weapon stats against the mob's current (post-debuff) obrona/odpornosc, preserving each player's own Tchnienie Śmierci activation state. */
  function refreshWeaponsForMobDebuff(): void {
    const effObrona = mobObronaCurrent;
    const effOdpornosc = mobOdpornoscCurrent;
    players.forEach((p, i) => {
      const saved = savedPlayers[i];
      const characterBase: Character = {
        ...saved.character,
        obronaPrzeciwnika: effObrona,
        odpornoscPrzeciwnika: effOdpornosc,
        szczesciePrzeciwnika: mobSzczescie,
        trafieniePrzeciwnika: resolveTrafieniePrzeciwnik(saved.character, dashboardService, mobZwinnosc, mobSpostrzegawczosc),
        tchnienieSmierciActive: false,
      };
      const dashboardBase = dashboardService.calculateStuff(characterBase);
      p.weaponsActivated = p.tchnienieLevel > 0
        ? dashboardService.calculateStuff({ ...characterBase, tchnienieSmierciActive: true }).obrazenia ?? []
        : dashboardBase.obrazenia ?? [];
      p.weapons = p.tchnienieActive ? p.weaponsActivated : (dashboardBase.obrazenia ?? []);
      // Rebuilding from scratch loses any already-triggered Potęga Mocy crit-multi steal and any accumulated Ziz bonus — reapply them.
      const reapplyBonus = p.potegaAppliedSteal + p.zizBonus;
      if (reapplyBonus > 0) {
        boostWeaponsCritMulti(p.weapons, reapplyBonus);
        if (p.weaponsActivated !== p.weapons) {
          boostWeaponsCritMulti(p.weaponsActivated, reapplyBonus);
        }
      }
    });
  }

  const attacks: CombatAttackLog[] = [];
  let mobHp = mobMaxHp;
  let outcome: ExpeditionOutcome = 'draw';
  let roundsElapsed = 0;
  // ── Post-fight summary counters for the mob side ──
  let mobAttacksMade = 0;
  let mobHitsLanded = 0;
  let mobCritsLanded = 0;
  let mobTotalDamageDealt = 0;
  let mobKills = 0;
  /** First selected player is the expedition organizer — their death cuts the whole team's damage output by 10%. */
  const organizer = players[0];
  /** Otchłań Ciszy triggers on each qualifying player's own first landed hit per round — reset fresh every round. */
  let otchlanProcdThisRound = new Set<string>();

  /** Logs a standalone announcement line (no numbers) for a talisman/arcane activation. */
  function pushNote(attackerName: string, text: string, roundNum: number): void {
    attacks.push({
      round: roundNum,
      attackerName,
      attackerSide: 'players',
      weaponName: '',
      targetName: mob.name,
      hit: true,
      dodged: false,
      crit: false,
      damage: 0,
      targetHpAfter: mobHp,
      mobHpAfter: mobHp,
      note: text,
    });
  }

  /** Logs the death-announcement line the instant a combatant's HP hits 0. */
  function pushDeath(name: string, side: 'players' | 'mob', roundNum: number): void {
    attacks.push({
      round: roundNum,
      attackerName: name,
      attackerSide: side,
      weaponName: '',
      targetName: mob.name,
      hit: true,
      dodged: false,
      crit: false,
      damage: 0,
      targetHpAfter: mobHp,
      mobHpAfter: mobHp,
      note: side === 'mob' ? 'zostaje pokonany!' : 'ginie!',
      died: true,
    });
  }

  /** Resolves one player attack (normal shot or Furia Bestii counterattack) against the mob: dodge/hit/crit/damage, plus the Otchłań Ciszy and Potęga Mocy first-hit triggers. Returns whether the mob died. */
  function resolvePlayerAttack(attacker: PlayerCombatState, w: WeaponDamage, weaponLabel: string, roundNum: number): boolean {
    attacker.attacksMade++;
    const dodgedByMob = Math.random() < mobUnikFor(profile, mobGenreForWeapon(w.genre));
    const hit = !dodgedByMob && Math.random() < (w.estimatedHitChance ?? 1);
    let crit = false;
    let dmg = 0;
    let otchlanProced = false;
    let potegaSteal = 0;
    const effBounds = attacker.ignoreDisabledThisRound
      ? ignoreDisabledWeaponBounds(w, mobObronaCurrent, mobOdpornoscCurrent, mobGenreForWeapon(w.genre))
      : { minDmg: w.minDmg, maxDmg: w.maxDmg, critDmgMin: w.critDmgMin ?? w.minDmg, critDmgMax: w.critDmgMax ?? w.maxDmg };
    if (hit) {
      attacker.hitsLanded++;
      crit = Math.random() < (w.critChance ?? 0);
      if (crit) attacker.critsLanded++;
      dmg = crit
        ? randomInt(effBounds.critDmgMin, effBounds.critDmgMax)
        : randomInt(effBounds.minDmg, effBounds.maxDmg);
      if (organizer && !organizer.alive) {
        dmg = Math.round(dmg * 0.9);
      }
      mobHp = Math.max(0, mobHp - dmg);
      attacker.damageDealtThisRound += dmg;
      attacker.totalDamageDealt += dmg;
      if (crit && profile?.special?.kind === 'demonicznyGniew') {
        mobCritMulti += 0.25;
      }
      if (crit && attacker.zizActive) {
        const zizDelta = w.genre?.endsWith('2H') ? 0.05 : 0.025;
        attacker.zizBonus += zizDelta;
        boostWeaponsCritMulti(attacker.weapons, zizDelta);
        if (attacker.weaponsActivated !== attacker.weapons) {
          boostWeaponsCritMulti(attacker.weaponsActivated, zizDelta);
        }
      }
      if (attacker.otchlanReduction > 0 && !otchlanProcdThisRound.has(attacker.id)) {
        otchlanProcdThisRound.add(attacker.id);
        mobObronaCurrent *= (1 - attacker.otchlanReduction);
        mobOdpornoscCurrent *= (1 - attacker.otchlanReduction);
        refreshWeaponsForMobDebuff();
        otchlanProced = true;
      }
      if (attacker.potegaStealPotential > 0 && !attacker.potegaTriggered) {
        attacker.potegaTriggered = true;
        const actualSteal = Math.min(attacker.potegaStealPotential, Math.max(0, mobCritMulti - 1.5));
        if (actualSteal > 0) {
          mobCritMulti -= actualSteal;
          attacker.potegaAppliedSteal = actualSteal;
          boostWeaponsCritMulti(attacker.weapons, actualSteal);
          if (attacker.weaponsActivated !== attacker.weapons) {
            boostWeaponsCritMulti(attacker.weaponsActivated, actualSteal);
          }
          potegaSteal = actualSteal;
        }
      }
    }
    let mackiStrachuProced = false;
    if (profile?.special?.kind === 'mackiStrachu' && !attacker.ignoreDisabledThisRound
      && mobHp <= mobMaxHp * MACKI_STRACHU_HP_THRESHOLD && Math.random() < MACKI_STRACHU_PROC_CHANCE) {
      attacker.ignoreDisabledThisRound = true;
      mackiStrachuProced = true;
    }
    attacks.push({
      round: roundNum,
      attackerName: attacker.name,
      attackerSide: 'players',
      weaponName: weaponLabel,
      targetName: mob.name,
      hit,
      dodged: dodgedByMob,
      crit,
      damage: dmg,
      targetHpAfter: mobHp,
      mobHpAfter: mobHp,
    });
    if (otchlanProced) {
      pushNote(attacker.name, `${attacker.name} aktywuje Otchłań Ciszy`, roundNum);
    }
    if (potegaSteal > 0) {
      pushNote(attacker.name, `${attacker.name} aktywuje Potęgę Mocy`, roundNum);
    }
    if (mackiStrachuProced) {
      pushNote(attacker.name, `Macki Strachu napełniają serce ${attacker.name} grozą — jego ataki tracą na skuteczności do końca rundy`, roundNum);
    }
    if (mobHp <= 0) {
      attacker.kills++;
      pushDeath(mob.name, 'mob', roundNum);
      return true;
    }
    // Cichy Łowca: a missed or dodged swing has a chance to immediately swing again with the same weapon.
    if ((dodgedByMob || !hit) && attacker.cichyLowcaChance > 0 && Math.random() < attacker.cichyLowcaChance) {
      pushNote(attacker.name, `${attacker.name} aktywuje Cichego Łowcę`, roundNum);
      return resolvePlayerAttack(attacker, w, `${weaponLabel} (dodatkowy atak)`, roundNum);
    }
    return false;
  }

  roundLoop:
  for (let r = 0; r < ROUNDS; r++) {
    roundsElapsed = r + 1;
    for (const p of players) {
      p.lewiatanBonusObrona = 0;
      p.lewiatanBonusOdpornosc = 0;
      p.damageDealtThisRound = 0;
      p.ignoreDisabledThisRound = false;
    }
    otchlanProcdThisRound = new Set<string>();
    const alivePlayers = players.filter(p => p.alive);
    if (!alivePlayers.length) {
      outcome = 'loss';
      break;
    }

    // Build this round's shot queues, ordered by initiative (mob slotted in by its own).
    const queues: { initiative: number; shots: ShotQueueEntry[] }[] = [];
    for (const p of alivePlayers) {
      const shots: ShotQueueEntry[] = [];
      let totalWeaponAttacks = 0;
      p.weapons.forEach((w, weaponIndex) => {
        const count = Math.max(0, Math.round(w.iloscAtakow ?? 0));
        totalWeaponAttacks += count;
        for (let i = 0; i < count; i++) shots.push({ side: 'player', player: p, weaponIndex });
      });
      if (shots.length) queues.push({ initiative: p.initiative, shots });
      // Furia Bestii: this round's counterattack budget is a % of this round's normal attack count.
      p.furiaMaxCountersThisRound = Math.floor(p.furiaCapPercent * totalWeaponAttacks);
      p.furiaCountersUsedThisRound = 0;
    }
    // Groza: guaranteed to block the mob's regular attack in round 2 if any player has it;
    // Szpony Nocy tier 4 gives each Groza-carrying player an independent (non-stacking) chance
    // to also block round 3. This only zeroes out the regular attack queue — a mob's passive
    // special abilities aren't a separate attack shot in this model, so nothing else to preserve.
    const playersWithGroza = alivePlayers.filter(p => p.hasGroza);
    const grozaTriggeredBy = r === 1
      ? playersWithGroza
      : r === 2
        ? playersWithGroza.filter(p => Math.random() < p.grozaRound3Chance)
        : [];
    const grozaBlocksRound = grozaTriggeredBy.length > 0;
    for (const p of grozaTriggeredBy) {
      pushNote(p.name, `${p.name} używa grozy`, r + 1);
    }

    const mobShots: ShotQueueEntry[] = grozaBlocksRound
      ? []
      : profile
        ? Array.from({ length: profile.attacksPerRound }, () => ({ side: 'mob' as const }))
        : [{ side: 'mob' as const }];
    queues.push({ initiative: mobInitiative, shots: mobShots });
    queues.sort((a, b) => b.initiative - a.initiative);

    while (queues.some(q => q.shots.length)) {
      for (const q of queues) {
        if (!q.shots.length) continue;
        const shot = q.shots.shift()!;

        if (shot.side === 'player') {
          if (!shot.player!.alive) continue;
          const w = shot.player!.weapons[shot.weaponIndex!];
          if (!w) continue;
          const mobDied = resolvePlayerAttack(shot.player!, w, w.name, r + 1);
          if (mobDied) {
            outcome = 'win';
            break roundLoop;
          }
        } else {
          const targetPool = players.filter(p => p.alive);
          if (!targetPool.length) {
            outcome = 'loss';
            break roundLoop;
          }
          const target = targetPool[Math.floor(Math.random() * targetPool.length)];
          const genre: MobWeaponGenre = profile?.weaponGenre ?? 'biala';
          const dodged = Math.random() < unikForGenre(target, genre);
          const hit = !dodged && Math.random() < mobHitChance(profile?.weaponGenre ?? 'dystans', mobZwinnosc, mobSpostrzegawczosc, mobSzczescie, target, rosterBonus.extraHitChance);
          mobAttacksMade++;
          target.attacksReceived++;
          let crit = false;
          let dmg = 0;
          if (hit) {
            mobHitsLanded++;
            target.hitsReceived++;
            if (profile) {
              crit = Math.random() < effectiveMobCritChance(profile.critChance, target);
              if (crit) mobCritsLanded++;
              const variantFlatBonus = mobVariantDamageFlatBonus(mobVariant, profile) * flatBonusStarMultiplier(star);
              const raw = randomInt(profile.minDmg, profile.maxDmg) * mobDamageStarMultiplier(star) * (crit ? mobCritMulti : 1) + rosterBonus.extraDamage + variantFlatBonus;
              const afterRedukcja = raw * (1 - target.redukcja);
              const defenseReduction = mobHitDefenseReduction(profile, target);
              dmg = Math.max(0, Math.round(afterRedukcja - defenseReduction));
            } else {
              dmg = Math.max(0, Math.round(placeholderDamagePerAttack * (1 - target.redukcja)));
            }
            target.hp = Math.max(0, target.hp - dmg);
            mobTotalDamageDealt += dmg;
            if (target.hp <= 0 && target.alive) {
              target.alive = false;
              mobKills++;
            }
          }
          attacks.push({
            round: r + 1,
            attackerName: mob.name,
            attackerSide: 'mob',
            weaponName: profile?.weaponName ?? mob.name,
            targetName: target.name,
            hit,
            dodged,
            crit,
            damage: dmg,
            targetHpAfter: target.hp,
            mobHpAfter: mobHp,
          });
          if (!target.alive) {
            pushDeath(target.name, 'players', r + 1);
          }
          if (hit) {
            if (crit && applyLewiatanProc(target)) {
              pushNote(target.name, `${target.name} aktywuje Lewiatana`, r + 1);
            }
            if (tryActivateTchnienie(target)) {
              const dmgBonus = 5 * target.tchnienieLevel;
              const trafPenalty = target.tchnienieLevel;
              const unikBonus = 2 * target.tchnienieLevel;
              pushNote(target.name, `${target.name} aktywuje Tchnienie Śmierci (obrażenia wszystkich broni +${dmgBonus}, trafienie wszystkich broni -${trafPenalty}, unik +${unikBonus}%)`, r + 1);
            }
            if (crit && target.alive && target.furiaChance > 0
              && target.furiaCountersUsedThisRound < target.furiaMaxCountersThisRound
              && Math.random() < target.furiaChance) {
              pushNote(target.name, `${target.name} aktywuje Furię Bestii`, r + 1);
              for (const cw of target.weapons) {
                if (target.furiaCountersUsedThisRound >= target.furiaMaxCountersThisRound) break;
                target.furiaCountersUsedThisRound += 1;
                const mobDiedFromCounter = resolvePlayerAttack(target, cw, `${cw.name} (kontratak)`, r + 1);
                if (mobDiedFromCounter) {
                  outcome = 'win';
                  break roundLoop;
                }
              }
            }
          }
          if (!players.some(p => p.alive)) {
            outcome = 'loss';
            break roundLoop;
          }
        }
      }
    }

    // End-of-round regen: only for players who survived the round, capped at half of their own damage dealt this round.
    for (const p of players) {
      if (!p.alive || p.regenPerRound <= 0) continue;
      const regenAmount = Math.min(p.regenPerRound, p.damageDealtThisRound / 2);
      if (regenAmount > 0) {
        const healed = Math.min(p.maxHp - p.hp, Math.floor(regenAmount));
        p.hp += healed;
        if (healed > 0) {
          pushNote(p.name, `${p.name} regeneruje ${healed} PKT ŻYCIA`, r + 1);
        }
      }
    }
  }

  const summary: CombatSummary = {
    players: players.map(p => ({
      name: p.name,
      side: 'players',
      damageDealt: p.totalDamageDealt,
      kills: p.kills,
      hpRemaining: p.hp,
      hpMax: p.maxHp,
      attacksMade: p.attacksMade,
      hitsLanded: p.hitsLanded,
      critsLanded: p.critsLanded,
      attacksReceived: p.attacksReceived,
      hitsReceived: p.hitsReceived,
    })),
    mob: {
      name: mob.name,
      side: 'mob',
      damageDealt: mobTotalDamageDealt,
      kills: mobKills,
      hpRemaining: mobHp,
      hpMax: mobMaxHp,
      attacksMade: mobAttacksMade,
      hitsLanded: mobHitsLanded,
      critsLanded: mobCritsLanded,
      attacksReceived: players.reduce((sum, p) => sum + p.attacksMade, 0),
      hitsReceived: players.reduce((sum, p) => sum + p.hitsLanded, 0),
    },
  };

  return { outcome, attacks, players, mobName: mob.name, mobMaxHp, mobHpRemaining: mobHp, roundsElapsed, summary };
}
