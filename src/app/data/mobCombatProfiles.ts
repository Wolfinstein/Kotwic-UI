// Per-mob combat stats for the expedition simulator. Damage values are at
// star 1 and scale linearly with the selected star level. Not every mob has
// a profile yet — mobs without one fall back to a rough placeholder in
// expeditionCombat.ts until their real numbers are supplied.
export type MobWeaponGenre = 'biala' | 'palna' | 'dystans';

export type MobSpecialAbility =
  /** Every crit the mob takes permanently raises its own crit multiplier: +2.5% per 1H crit, +5% per 2H crit. */
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
  /**
   * Overrides the default MIN/MAX stat-variant damage multipliers (min ×0.95, max ×1 — i.e. minDmg/maxDmg
   * are themselves the MAX-variant numbers by default). Set this when minDmg/maxDmg are specifically the
   * MIN-variant numbers instead, so the MAX variant needs its own (larger) multiplier.
   */
  variantDamageMultiplier?: { min: number; max: number };
}

export const MOB_COMBAT_PROFILES: Record<string, MobCombatProfile> = {
  Abaddon: {
    weaponName: 'Rusznica Otchłani',
    weaponGenre: 'palna',
    minDmg: 875,
    maxDmg: 1075,
    attacksPerRound: 5,
    critChance: 0.85,
    critMulti: 2,
    unik: { biala: 0, palna: 0, dystans: 0 },
    special: { kind: 'demonicznyGniew' },
    playerLevelCap: 980,
  },
  Agrameon: {
    weaponName: 'Bicz grozy',
    weaponGenre: 'biala',
    minDmg: 1300,
    maxDmg: 1650,
    attacksPerRound: 8,
    critChance: 0.7,
    critMulti: 6,
    unik: { biala: 0, palna: 0, dystans: 0 },
    special: { kind: 'mackiStrachu' },
    playerLevelCap: 1190,
    // minDmg/maxDmg above are the MIN-variant numbers; MAX-variant is 25% higher.
    variantDamageMultiplier: { min: 1, max: 1.25 },
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
