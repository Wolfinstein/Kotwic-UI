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
  | { kind: 'mackiStrachu' }
  /**
   * Merihim's two abilities:
   * - Pasożyty: starting round 2, permanently strips 50 percentage points of crit chance and 1.0
   *   crit multi from every player's weapons (floored at 0% / 1.0x). Applied once, not reapplied
   *   each round.
   * - Pocałunek: starting round 3, each round has a 20% chance to instantly kill one random
   *   living player, independent of Pasożyty.
   */
  | { kind: 'merihim' }
  /**
   * Bokrug's abilities:
   * - Kolce Jadowe (passive poison, unblockable by Groza — it isn't part of his regular attack
   *   queue): each round, at the start, players already poisoned from an earlier round first take
   *   5% of their own max HP each; then he stings one not-yet-poisoned living player for 25% of
   *   their max HP (floored at 1 HP — this hit alone can never kill), poisoning them — their
   *   regen is permanently cut 75% and the 5% tick starts hitting them from the following round.
   *   At most one sting per player for the whole fight. This 75% cut adds to (rather than
   *   multiplies with) any Majestat/Tchnienie Śmierci regen halving the victim already has: the
   *   fractions sum first (e.g. 50% + 75% = 125%, capped at 100%) and only then are applied to
   *   their un-reduced base regen as a single multiplier.
   * - Round 3: heals 15% of his max HP once, at the start of the round.
   * - Tsunami: the first time he'd be reduced to 0 HP, he doesn't die — instead any of his own
   *   still-queued attacks this round land immediately, he heals 25% of his max HP, and the party
   *   loses the rest of their queued attacks for the round. The fight then continues normally into
   *   the next round.
   */
  | { kind: 'bokrug' }
  /**
   * Zepar's abilities:
   * - Aura Niewiary: once, at the very start of round 1, blocks the arcana of 1-3 random players
   *   (picked once, for the whole fight) — their purely-arcane abilities (Groza, Żar Krwi, Tchnienie
   *   Śmierci, and the personal Skóra Bestii odporność bonus) stop working entirely. Anything that's
   *   really a TALIZMAN ability that merely scales off an arcane investment (Otchłań Ciszy, Potęga
   *   Mocy, Furia Bestii, Cichy Łowca, Szpony Nocy's round-3 Groza chance, Aura Bestii's team bonus,
   *   Ziz) is unaffected — the talizman itself still works the same way.
   * - Cannon fodder: same "Słudzy Plagi" adds as Merihim/Bokrug. Additionally, the first time he
   *   drops to 50% max HP or below, he summons 8 more of them at the start of the FOLLOWING round
   *   (on top of whatever's still alive from the initial wave).
   */
  | { kind: 'zepar' }
  /**
   * Malphas's abilities:
   * - Cannon fodder: same "Słudzy Plagi" adds as Zepar — an initial wave, plus the one-time
   *   8-add reinforcement wave the round after he first drops to 50% HP. No Aura Niewiary.
   * - Players' max hit chance against him is 40% + luck bonus, up to 49% (instead of 90% + luck,
   *   up to 99%) — see MobCombatProfile.playerMaxHitChance.
   */
  | { kind: 'malphas' }
  /**
   * Hastur's abilities:
   * - Cannon fodder: the same initial "Słudzy Plagi" wave as Zepar/Malphas, but no reinforcement
   *   wave at 50% HP.
   * - Widmowa postać: from the start of the fight until players have dealt 50% of his max HP, he
   *   takes 25% less damage from player attacks.
   * - Prawdziwa forma: the moment he drops to 50% HP (even mid-round), the damage reduction ends and
   *   his attacks always hit and can't be dodged for the rest of the fight.
   * - Kometa: from round 2 on, kills one random living player at the start of every round. A Groza
   *   holder with higher initiative than Hastur still casts it even if the comet kills them; one
   *   with lower initiative doesn't get to cast it if the comet kills them.
   * - Żółty Znak: cast right after the comet (Groza doesn't stop it) — always in round 2; from round 3
   *   on, 50% chance per round, but only once he's in Prawdziwa forma. For that round only, doubles
   *   his zwinność, spostrzegawczość, szczęście, obrona and odporność, and his attacks deal 13%
   *   more damage.
   */
  | { kind: 'hastur' };

export interface MobCombatProfile {
  weaponName: string;
  weaponGenre: MobWeaponGenre;
  /** Per-attack damage roll range for the MIN stat variant, as "min-max" (e.g. "600-900") — scales with star via the shared dmgStarMulti, same as maxMobDmg. */
  minMobDmg: string;
  /** Per-attack damage roll range for the MAX stat variant, as "min-max" (e.g. "900-1200") — an independent range, not derived from minMobDmg by any flat/percent formula. */
  maxMobDmg: string;
  attacksPerRound: number;
  critChance: number;
  critMulti: number;
  /** Boss's own dodge chance against incoming player attacks, keyed by the player weapon's genre. */
  unik?: Partial<Record<MobWeaponGenre, number>>;
  special?: MobSpecialAbility;
  /** Max player level allowed to fight this mob, at star 1. Scales +50% per star above 1 unless levelCapScalesWithStar is set to false. */
  playerLevelCap?: number;
  /** Set to false to keep playerLevelCap fixed at every star instead of the default +50%/star scaling. Defaults to true (scales). */
  levelCapScalesWithStar?: boolean;
  /** Divides playerLevelCap for the incomplete-roster damage bonus specifically (extraDamage = levelCap/divisor - joinedLevelSum), leaving the activation threshold and hit-chance bonus on the full cap. Defaults to 1 (full cap). */
  rosterBonusDamageCapDivisor?: number;
  /** Flat amount added to both ends of maxMobDmg (MAX stat variant only) per star above 1 — e.g. 90 means star 1 uses maxMobDmg as-is, star 2 adds +90, star 3 adds +180, etc. Added on top of the shared dmgStarMulti scaling, not multiplied by it. 0/unset means no per-star growth beyond dmgStarMulti. */
  maxDmgFlatPerStar?: number;
  /** Same as maxDmgFlatPerStar, but for minMobDmg (MIN stat variant). */
  minDmgFlatPerStar?: number;
  /**
   * Low-level-party damage bonus: while the party's summed levels are below threshold + thresholdPerStar × (star-1),
   * both ends of the per-attack range gain perLevel × (that threshold - levelSum), BEFORE dmgStarMulti (so it scales
   * with star like the base range). Unlike the incomplete-roster bonus, it's continuous and has no activation gate.
   */
  levelSumDmgBonus?: { perLevel: number; threshold: number; thresholdPerStar: number };
  /** Mob's own ignorowanie obrony against players: scales down the flat obrona/odpornosc reduction by (1 - ignoreObrony), same as the player-side formula. 1+ means player defense is ignored entirely. Defaults to 0. */
  ignoreObrony?: number;
  /** Cap (in %) on players' hit chance against this mob itself (not its adds): the max-hit band becomes (cap - 9)% + luck bonus up to cap% instead of 90% + luck up to 99%, and the min-hit band's 65% cap drops to it too. Unset means the normal band. */
  playerMaxHitChance?: number;
}

export const MOB_COMBAT_PROFILES: Record<string, MobCombatProfile> = {
  Abaddon: {
    weaponName: 'Rusznica Otchłani',
    weaponGenre: 'palna',
    minMobDmg: '600-825',
    maxMobDmg: '600-825',
    attacksPerRound: 5,
    critChance: 0.85,
    critMulti: 2,
    unik: { biala: 0, palna: 0, dystans: 0 },
    special: { kind: 'demonicznyGniew' },
    playerLevelCap: 980,
    // Level cap stays fixed at 980 regardless of star — no +50%/star scaling for Abaddon.
    levelCapScalesWithStar: false,
    // MAX variant's damage range grows an extra flat +30 (both ends) per star above 1.
    maxDmgFlatPerStar: 30,
  },
  Agrameon: {
    weaponName: 'Bicz grozy',
    weaponGenre: 'biala',
    minMobDmg: '675-1000',
    maxMobDmg: '675-1000',
    attacksPerRound: 8,
    critChance: 0.7,
    critMulti: 6,
    unik: { biala: 0, palna: 0, dystans: 0 },
    special: { kind: 'mackiStrachu' },
    playerLevelCap: 1190,
    // MAX variant's damage range grows an extra flat +90 (both ends) per star above 1.
    maxDmgFlatPerStar: 90,
    // MIN variant's damage range grows an extra flat +45 (both ends) per star above 1.
    minDmgFlatPerStar: 18,
  },
  'Yog-Sothoth': {
    weaponName: 'Klucz Nieskończoności',
    weaponGenre: 'biala',
    minMobDmg: '5000-7500',
    maxMobDmg: '5000-7500',
    // Unused placeholder — his real attack count (playerCount × 2, confirmed from real logs) is
    // computed dynamically in expeditionCombat.ts, since it isn't a fixed per-mob constant.
    attacksPerRound: 1,
    critChance: 0.85,
    // 6.5 on normal rounds; overridden to a flat 4.5 during "Zakrzywienie czasu" (rounds 7-9) in expeditionCombat.ts.
    critMulti: 6,
    // No unik (no dodge) and no playerLevelCap, per spec — both already default to "none" by omission.
  },
  Merihim: {
    weaponName: 'Wielkie Ostrze Plagi',
    weaponGenre: 'biala',
    minMobDmg: '600-850',
    maxMobDmg: '700-950',
    attacksPerRound: 12,
    critChance: 1.7,
    critMulti: 6.5,
    unik: { biala: 0, palna: 0, dystans: 0 },
    special: { kind: 'merihim' },
    playerLevelCap: 2144,
  },
  Bokrug: {
    weaponName: 'Kolce Jadowe',
    weaponGenre: 'dystans',
    minMobDmg: '1350-1600',
    maxMobDmg: '1400-1700',
    attacksPerRound: 10,
    critChance: 1.25,
    critMulti: 6.5,
    unik: { biala: 0.1, palna: 0.1, dystans: 0.1 },
    special: { kind: 'bokrug' },
    playerLevelCap: 2326 / 3.5,
        // Level cap stays fixed at 2326 regardless of star — no +50%/star scaling for Abaddon.
    levelCapScalesWithStar: true,
  },
  Zepar: {
    weaponName: 'Pejcz Gromów',
    weaponGenre: 'palna',
    minMobDmg: '1150-1350',
    maxMobDmg: '1200-1400',
    attacksPerRound: 28,
    critChance: 2,
    critMulti: 4,
    unik: { biala: 0.15, palna: 0.15, dystans: 0.15 },
    special: { kind: 'zepar' },
    playerLevelCap: 2500 / 2.3,
  },
  Malphas: {
    weaponName: 'Ostrze Mgły',
    weaponGenre: 'biala',
    minMobDmg: '2320-3055',
    maxMobDmg: '2450-3195',
    levelSumDmgBonus: { perLevel: 0.48, threshold: 1670, thresholdPerStar: 124 },
    attacksPerRound: 50,
    critChance: 1,
    critMulti: 7.5,
    unik: { biala: 0.2, palna: 0.2, dystans: 0.2 },
    special: { kind: 'malphas' },
    playerLevelCap: 1,
    ignoreObrony: 1.0,
    playerMaxHitChance: 49,
  },
  Hastur: {
    weaponName: 'Macki',
    weaponGenre: 'dystans',
    minMobDmg: '1660-2480',
    maxMobDmg: '1660-2480',
    levelSumDmgBonus: { perLevel: 0.51, threshold: 3430, thresholdPerStar: 0 },
    attacksPerRound: 50,
    critChance: 1.7,
    critMulti: 4.9,
    unik: { biala: 0.2, palna: 0.2, dystans: 0.2 },
    special: { kind: 'hastur' },
    playerLevelCap: 3750 / 2.5,
    levelCapScalesWithStar: true,
    rosterBonusDamageCapDivisor: Infinity,
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
  'Yog-Sothoth': 'red',
  Merihim: 'yellow',
  Bokrug: 'yellow',
  Zepar: 'yellow',
  Malphas: 'yellow',
  Hastur: 'yellow',
};

export function mobImplementationStatus(mobName: string): MobImplementationStatus {
  return MOB_IMPLEMENTATION_STATUS[mobName] ?? 'red';
}

/** Red (not implemented) mobs can't be picked for combat yet. */
export function isMobSelectable(mobName: string): boolean {
  return mobImplementationStatus(mobName) !== 'red';
}
