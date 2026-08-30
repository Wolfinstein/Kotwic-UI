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
    minDmg: 600,
    maxDmg: 900,
    attacksPerRound: 5,
    critChance: 0.85,
    critMulti: 2.5,
    unik: { biala: 0, palna: 0, dystans: 0 },
    special: { kind: 'demonicznyGniew' },
    playerLevelCap: 980,
  },
};
