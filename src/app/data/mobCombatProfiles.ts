// Per-mob combat stats for the expedition simulator. Damage values are at
// star 1 and scale linearly with the selected star level. Not every mob has
// a profile yet — mobs without one fall back to a rough placeholder in
// expeditionCombat.ts until their real numbers are supplied.
export type MobWeaponGenre = 'biala' | 'palna' | 'dystans';

export type MobSpecialAbility =
  /** Every crit the mob takes permanently raises its own crit multiplier: +2.5% per 1H crit, +5% per 2H crit. */
  { kind: 'demonicznyGniew' };

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
}

export const MOB_COMBAT_PROFILES: Record<string, MobCombatProfile> = {
  Abaddon: {
    weaponName: 'Rusznica Otchłani',
    weaponGenre: 'palna',
    minDmg: 875,
    maxDmg: 1075,
    attacksPerRound: 5,
    critChance: 0.85,
    critMulti: 2.5,
    unik: { biala: 0, palna: 0, dystans: 0 },
    special: { kind: 'demonicznyGniew' },
    playerLevelCap: 980,
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
};

export function mobImplementationStatus(mobName: string): MobImplementationStatus {
  return MOB_IMPLEMENTATION_STATUS[mobName] ?? 'red';
}
