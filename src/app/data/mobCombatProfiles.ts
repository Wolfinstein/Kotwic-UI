// Per-mob combat stats for the expedition simulator. Damage values are at
// star 1 and scale linearly with the selected star level. Not every mob has
// a profile yet — mobs without one fall back to a rough placeholder in
// expeditionCombat.ts until their real numbers are supplied.
export type MobWeaponGenre = 'biala' | 'palna' | 'dystans';

export type MobSpecialAbility =
  /** Every crit the mob takes permanently raises its own crit multiplier by +25%, regardless of weapon type. */
  | { kind: 'demonicznyGniew' }
  /**
   * Once the party has dealt 25% of the mob's max HP, every subsequent player attack against
   * it has a ~30% chance to disable that attacker's ignoreObrony (defense-ignore stat) for the
   * rest of the round, starting with their NEXT attack — verified against real battle logs
   * (Bloodwars r20, Aug 2026): first proc consistently landed right after cumulative damage
   * crossed 25%, and mean attacks-to-proc across 57 samples was ~3.3 (⇒ p≈30%).
   */
  | { kind: 'mackiStrachu' };

export interface MobCombatProfile {
  weaponName: string;
  weaponGenre: MobWeaponGenre;
  minDmg: number;
  maxDmg: number;
  attacksPerRound: number;
  critChance: number;
  critMulti: number;
  /** Boss's own dodge chance against incoming player attacks, keyed by the player weapon's genre. */
  unik?: Partial<Record<MobWeaponGenre, number>>;
  special?: MobSpecialAbility;
  /** Max player level allowed to fight this mob, at star 1. Scales +50% per star above 1. */
  playerLevelCap?: number;
  /** Flat amount added to minDmg/maxDmg per stat variant (MIN and MAX otherwise deal identical damage), scaled by its own +20%/star curve — see flatBonusStarMultiplier. */
  variantDamageFlatBonus?: { min: number; max: number };
  /** Divides playerLevelCap for the incomplete-roster damage bonus specifically (extraDamage = levelCap/divisor - joinedLevelSum), leaving the activation threshold and hit-chance bonus on the full cap. Defaults to 1 (full cap). */
  rosterBonusDamageCapDivisor?: number;
}

export const MOB_COMBAT_PROFILES: Record<string, MobCombatProfile> = {
  Abaddon: {
    weaponName: 'Rusznica Otchłani',
    weaponGenre: 'palna',
    minDmg: 600,
    maxDmg: 900,
    attacksPerRound: 5,
    critChance: 0.85,
    critMulti: 2,
    unik: { biala: 0, palna: 0, dystans: 0 },
    special: { kind: 'demonicznyGniew' },
    playerLevelCap: 980,
    // MAX-variant adds a flat +30 on top of the shared minDmg/maxDmg range.
    variantDamageFlatBonus: { min: 0, max: 30 },
    // Incomplete-roster damage bonus uses half the level cap instead of the full cap.
    rosterBonusDamageCapDivisor: 2,
  },
  Agrameon: {
    weaponName: 'Bicz grozy',
    weaponGenre: 'biala',
    minDmg: 1000,
    maxDmg: 1300,
    attacksPerRound: 8,
    critChance: 0.7,
    critMulti: 6,
    unik: { biala: 0, palna: 0, dystans: 0 },
    special: { kind: 'mackiStrachu' },
    playerLevelCap: 1190,
    // MAX-variant adds a flat +450 on top of the shared minDmg/maxDmg range.
    variantDamageFlatBonus: { min: 0, max: 450 },
  },
};

/**
 * Manually-tracked implementation status per mob, shown as a colored marker on the tower select
 * screen. Red = not implemented yet (falls back to the generic placeholder combat math). Yellow =
 * in progress (has a combat profile, but numbers/abilities are still being tuned). Green = fully
 * implemented and verified against the real game. Defaults to red for any mob without an entry.
 */
export type MobImplementationStatus = 'red' | 'yellow' | 'green';

export const MOB_IMPLEMENTATION_STATUS: Record<string, MobImplementationStatus> = {
  Abaddon: 'yellow',
  Agrameon: 'yellow',
};

export function mobImplementationStatus(mobName: string): MobImplementationStatus {
  return MOB_IMPLEMENTATION_STATUS[mobName] ?? 'red';
}
