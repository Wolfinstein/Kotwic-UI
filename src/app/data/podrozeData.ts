export type StatKey =
  | 'sila' | 'zwinnosc' | 'odpornosc' | 'wyglad' | 'charyzma'
  | 'wplywy' | 'spostrzegawczosc' | 'inteligencja' | 'wiedza' | 'krew';

export const STAT_KEYS: StatKey[] = [
  'sila', 'zwinnosc', 'odpornosc', 'wyglad', 'charyzma',
  'wplywy', 'spostrzegawczosc', 'inteligencja', 'wiedza', 'krew',
];

export const STAT_LABELS: Record<StatKey, string> = {
  sila: 'SIŁA',
  zwinnosc: 'ZWINNOŚĆ',
  odpornosc: 'ODPORNOŚĆ',
  wyglad: 'WYGLĄD',
  charyzma: 'CHARYZMA',
  wplywy: 'WPŁYWY',
  spostrzegawczosc: 'SPOSTRZEGAWCZOŚĆ',
  inteligencja: 'INTELIGENCJA',
  wiedza: 'WIEDZA',
  krew: 'KREW',
};

/** ASCII (diacritic-free) match aliases, used when parsing pasted text/JSON. */
export const STAT_ALIASES: Record<StatKey, string[]> = {
  sila: ['SILA', 'STR'],
  zwinnosc: ['ZWINNOSC', 'DEX'],
  odpornosc: ['ODPORNOSC', 'DEF'],
  wyglad: ['WYGLAD', 'LOK'],
  charyzma: ['CHARYZMA', 'CHR'],
  wplywy: ['WPLYWY', 'REP'],
  spostrzegawczosc: ['SPOSTRZEGAWCZOSC', 'PER'],
  inteligencja: ['INTELIGENCJA', 'INT'],
  wiedza: ['WIEDZA', 'WIS'],
  krew: ['PKT KRWI', 'KREW', 'KRWI', 'BLOOD'],
};

export type Stats = Record<StatKey, number>;

export interface Enemy {
  name: string;
  fixed: StatKey;
  /** 3 alternative options, or 'wait' for rare encounters overcome by waiting instead of a second stat. */
  random: StatKey[] | 'wait';
}

export const ENEMIES: Enemy[] = [
  { name: 'Amalgamat', fixed: 'charyzma', random: ['wyglad', 'zwinnosc', 'spostrzegawczosc'] },
  { name: 'Bandyci', fixed: 'spostrzegawczosc', random: ['sila', 'wplywy', 'zwinnosc'] },
  { name: 'Chimera', fixed: 'inteligencja', random: ['spostrzegawczosc', 'zwinnosc', 'odpornosc'] },
  { name: 'Diabelska Grzesznica', fixed: 'odpornosc', random: ['wyglad', 'wplywy', 'charyzma'] },
  { name: 'Kolekcjoner Kości', fixed: 'charyzma', random: ['wyglad', 'wiedza', 'inteligencja'] },
  { name: 'Mutant', fixed: 'wyglad', random: ['spostrzegawczosc', 'odpornosc', 'inteligencja'] },
  { name: 'Magowie Rady', fixed: 'inteligencja', random: ['sila', 'wplywy', 'charyzma'] },
  { name: 'Najemnicy Trzech Oczu', fixed: 'wplywy', random: ['wyglad', 'charyzma', 'sila'] },
  { name: 'Napromieniowane Ghule', fixed: 'sila', random: ['wiedza', 'zwinnosc', 'odpornosc'] },
  { name: 'Oddział Łowczych Rady', fixed: 'spostrzegawczosc', random: ['wplywy', 'wiedza', 'sila'] },
  { name: 'Parch', fixed: 'odpornosc', random: ['wplywy', 'wyglad', 'wiedza'] },
  { name: 'Patrol Zabójców Rady', fixed: 'wiedza', random: ['wyglad', 'zwinnosc', 'charyzma'] },
  { name: 'Plaga Szczurów', fixed: 'zwinnosc', random: ['spostrzegawczosc', 'sila', 'odpornosc'] },
  { name: 'Ranny Wilkołak', fixed: 'wiedza', random: ['charyzma', 'inteligencja', 'sila'] },
  { name: 'Skrytobójca', fixed: 'wplywy', random: ['wiedza', 'spostrzegawczosc', 'inteligencja'] },
  { name: 'Troll', fixed: 'sila', random: ['inteligencja', 'wiedza', 'zwinnosc'] },
  { name: 'Zmiennokształtny', fixed: 'wyglad', random: ['inteligencja', 'odpornosc', 'wplywy'] },
  { name: 'Zmutowany Herszt', fixed: 'zwinnosc', random: ['odpornosc', 'spostrzegawczosc', 'charyzma'] },
];

/**
 * Rare "wait it out" encounters, drawn from a separate pool during normal rounds
 * (never during boss/miniboss rounds) at SPECIAL_ENCOUNTER_CHANCE.
 */
export const SPECIAL_ENCOUNTERS: Enemy[] = [
  { name: 'Burza piaskowa', fixed: 'odpornosc', random: 'wait' },
  { name: 'Wataha Piekielnych Ogarów', fixed: 'wplywy', random: 'wait' },
  { name: 'Trzęsienie Ziemi', fixed: 'zwinnosc', random: 'wait' },
];

export const SPECIAL_ENCOUNTER_CHANCE = 0.05;
/** In-fiction wait duration shown to the player. */
export const WAIT_DISPLAY_MINUTES = 5;
/** Actual real-time seconds the "Czekaj" option takes. */
export const WAIT_SECONDS = 5;

export interface Boss {
  name: string;
  act: 1 | 2 | 3;
  /** Round 1/2: single stat. Round 3: "STAT + STAT" double-cost combo. */
  fixed: [StatKey, StatKey, [StatKey, StatKey]];
  /** Round 1/2: single stat, or a '/'-separated list of alternatives. Round 3: single additional stat. */
  random: [StatKey[], StatKey[], StatKey];
}

export const BOSSES: Boss[] = [
  {
    name: 'Wściekły Wilkołak', act: 1,
    fixed: ['wplywy', 'zwinnosc', ['sila', 'wiedza']],
    random: [['wyglad', 'charyzma', 'zwinnosc'], ['wplywy', 'wyglad'], 'wplywy'],
  },
  {
    name: 'Troll King', act: 1,
    fixed: ['sila', 'zwinnosc', ['sila', 'zwinnosc']],
    random: [['zwinnosc', 'inteligencja', 'wyglad'], ['wiedza', 'inteligencja'], 'inteligencja'],
  },
  {
    name: 'Billy Kid', act: 1,
    fixed: ['spostrzegawczosc', 'wiedza', ['wplywy', 'inteligencja']],
    random: [['wiedza'], ['spostrzegawczosc', 'sila'], 'spostrzegawczosc'],
  },
  {
    name: 'Piaskowy Ifrit', act: 2,
    fixed: ['wiedza', 'inteligencja', ['odpornosc', 'wyglad']],
    random: [['inteligencja', 'sila', 'charyzma'], ['wplywy', 'sila'], 'sila'],
  },
  {
    name: 'Zmutowany Wódz', act: 2,
    fixed: ['wyglad', 'spostrzegawczosc', ['charyzma', 'wplywy']],
    random: [['spostrzegawczosc', 'odpornosc', 'charyzma'], ['inteligencja', 'odpornosc'], 'wyglad'],
  },
  {
    name: 'Zniekształcony Prezydent', act: 2,
    fixed: ['charyzma', 'wyglad', ['odpornosc', 'sila']],
    random: [['odpornosc', 'wiedza', 'wplywy'], ['wplywy', 'charyzma'], 'charyzma'],
  },
  {
    name: 'Większa Mumia', act: 3,
    fixed: ['wplywy', 'spostrzegawczosc', ['inteligencja', 'charyzma']],
    random: [['odpornosc', 'zwinnosc', 'wiedza'], ['wiedza', 'odpornosc'], 'odpornosc'],
  },
  {
    name: 'Grobowy Skorpion', act: 3,
    fixed: ['zwinnosc', 'inteligencja', ['odpornosc', 'spostrzegawczosc']],
    random: [['odpornosc', 'inteligencja', 'wiedza'], ['zwinnosc', 'wiedza'], 'sila'],
  },
  {
    name: 'Fałszywy Prorok', act: 3,
    fixed: ['wyglad', 'wiedza', ['charyzma', 'odpornosc']],
    random: [['charyzma', 'zwinnosc', 'spostrzegawczosc'], ['wyglad', 'spostrzegawczosc'], 'spostrzegawczosc'],
  },
];

/**
 * A boss's special attack: a once-per-fight extra action available in any of the
 * 3 main-boss rounds (not miniboss). Costs 25% of the player's STARTING (pre-podróż)
 * value of `requiredStat`, paid from the current pool.
 */
export type SpecialEffect =
  | { kind: 'costDiscountFight'; percent: number }
  | { kind: 'costDiscountNextRound'; percent: number }
  | { kind: 'instantWinChance'; chance: number }
  | { kind: 'unlockStatCurrentRound'; mode: 'random' | 'highest' }
  | { kind: 'unlockStatNextRound'; mode: 'random' | 'highest' | StatKey }
  | { kind: 'doubleCurrentStat'; stat: StatKey }
  | { kind: 'regenerateAllPercent'; percent: number; exclude: StatKey }
  | { kind: 'regenerateMostSpentFull'; exclude: StatKey }
  | { kind: 'costSwing'; increasePercentThisRound: number; discountPercentNextRound: number }
  | { kind: 'buffRandomStats'; count: number; percent: number };

export interface BossSpecialAttack {
  id: string;
  description: string;
  requiredStat: StatKey;
  effect: SpecialEffect;
}

/**
 * Shared pool every boss currently draws its (single, once-per-fight) special
 * attack from at random. BossSpecialAttack/SpecialEffect are already shaped to
 * support giving each boss its own curated list later — see `Boss.specials`.
 */
export const BOSS_SPECIAL_ATTACKS: BossSpecialAttack[] = [
  { id: 'costDown20Wyglad', description: 'Obniża koszt użycia parametrów o 20% do końca walki.', requiredStat: 'wyglad', effect: { kind: 'costDiscountFight', percent: 20 } },
  { id: 'swapNextRoundHighestInt', description: 'W następnej rundzie możesz użyć parametru, którego Twoja postać będzie mieć najwięcej.', requiredStat: 'inteligencja', effect: { kind: 'unlockStatNextRound', mode: 'highest' } },
  { id: 'instantWinOdpornosc', description: '20% szans na natychmiastowe wygranie rundy.', requiredStat: 'odpornosc', effect: { kind: 'instantWinChance', chance: 20 } },
  { id: 'costDown30Wiedza', description: 'Obniża koszt użycia parametrów o 30% do końca walki.', requiredStat: 'wiedza', effect: { kind: 'costDiscountFight', percent: 30 } },
  { id: 'costDown40NextSpost', description: 'Obniża koszt użycia parametrów o 40% w następnej rundzie.', requiredStat: 'spostrzegawczosc', effect: { kind: 'costDiscountNextRound', percent: 40 } },
  { id: 'doubleSpostWiedza', description: 'Podwaja bieżącą liczbę punktów SPOSTRZEGAWCZOŚCI.', requiredStat: 'wiedza', effect: { kind: 'doubleCurrentStat', stat: 'spostrzegawczosc' } },
  { id: 'regenAll20Charyzma', description: 'Regeneruje wszystkie parametry o 20% wartości z początku Podróży (oprócz CHARYZMY).', requiredStat: 'charyzma', effect: { kind: 'regenerateAllPercent', percent: 20, exclude: 'charyzma' } },
  { id: 'unlockRandomCurrentInt', description: 'Umożliwia użycie innego, losowego parametru.', requiredStat: 'inteligencja', effect: { kind: 'unlockStatCurrentRound', mode: 'random' } },
  { id: 'costDown25Wplywy', description: 'Obniża koszt użycia parametrów o 25% do końca walki.', requiredStat: 'wplywy', effect: { kind: 'costDiscountFight', percent: 25 } },
  { id: 'unlockZwinnoscNext', description: 'Pozwala użyć ZWINNOŚCI w następnej rundzie.', requiredStat: 'zwinnosc', effect: { kind: 'unlockStatNextRound', mode: 'zwinnosc' } },
  { id: 'regenMostSpentSila', description: 'Regeneruje do pełna parametr, którego zużyto najwięcej (oprócz SIŁY).', requiredStat: 'sila', effect: { kind: 'regenerateMostSpentFull', exclude: 'sila' } },
  { id: 'unlockHighestCurrentSpost', description: 'Pozwala użyć w bieżącej rundzie parametru, którego masz najwięcej.', requiredStat: 'spostrzegawczosc', effect: { kind: 'unlockStatCurrentRound', mode: 'highest' } },
  { id: 'costSwingOdpornosc', description: 'Zwiększa koszt użycia parametrów w obecnej rundzie o 20% ale zmniejsza o 50% w kolejnej rundzie.', requiredStat: 'odpornosc', effect: { kind: 'costSwing', increasePercentThisRound: 20, discountPercentNextRound: 50 } },
  { id: 'buff3RandomSpost', description: 'Zwiększa 3 losowe parametry o 50%', requiredStat: 'spostrzegawczosc', effect: { kind: 'buffRandomStats', count: 3, percent: 50 } },
];

export function randomBossSpecialAttack(): BossSpecialAttack {
  return BOSS_SPECIAL_ATTACKS[Math.floor(Math.random() * BOSS_SPECIAL_ATTACKS.length)];
}

/** 25% of the starting stat for a boss special attack, 20% for a miniboss one. */
export function specialAttackCost(attack: BossSpecialAttack, initialStats: Stats, isMini: boolean): number {
  const percent = isMini ? 0.2 : 0.25;
  return Math.floor(initialStats[attack.requiredStat] * percent);
}

export interface LevelData {
  rounds: number;
  act1Cost: number;
  act2Cost: number;
  act3Cost: number;
}

export const LEVEL_DATA: Record<number, LevelData> = {
  1: { rounds: 3, act1Cost: 10, act2Cost: 25, act3Cost: 50 },
  2: { rounds: 4, act1Cost: 13, act2Cost: 30, act3Cost: 57 },
  3: { rounds: 4, act1Cost: 16, act2Cost: 35, act3Cost: 64 },
  4: { rounds: 5, act1Cost: 19, act2Cost: 40, act3Cost: 71 },
  5: { rounds: 5, act1Cost: 22, act2Cost: 45, act3Cost: 78 },
  6: { rounds: 5, act1Cost: 25, act2Cost: 50, act3Cost: 85 },
  7: { rounds: 6, act1Cost: 28, act2Cost: 55, act3Cost: 92 },
  8: { rounds: 6, act1Cost: 31, act2Cost: 60, act3Cost: 99 },
  9: { rounds: 7, act1Cost: 34, act2Cost: 65, act3Cost: 106 },
};

export function getCostForLevel(level: number, act: 1 | 2 | 3): number {
  const data = LEVEL_DATA[level];
  return act === 1 ? data.act1Cost : act === 2 ? data.act2Cost : data.act3Cost;
}

export function randomEnemy(): Enemy {
  return ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
}

/** Normal-round enemy pick: SPECIAL_ENCOUNTER_CHANCE odds of a rare "wait it out" encounter. */
export function pickNormalRoundEncounter(): Enemy {
  if (Math.random() < SPECIAL_ENCOUNTER_CHANCE) {
    return SPECIAL_ENCOUNTERS[Math.floor(Math.random() * SPECIAL_ENCOUNTERS.length)];
  }
  return randomEnemy();
}

export function randomBoss(): Boss {
  return BOSSES[Math.floor(Math.random() * BOSSES.length)];
}

function stripDiacritics(s: string): string {
  const map: Record<string, string> = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z',
  };
  return s.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, ch => map[ch] || ch);
}

export interface ParsedStats {
  values: Partial<Stats>;
  found: StatKey[];
  missing: StatKey[];
}

/**
 * Accepts a JSON object ({"sila": 50, ...}), a tabular in-game paste
 * ("ZWINNOŚĆ\tZWINNOŚĆ\t328 / 328", one stat per line, label possibly
 * duplicated, value as "current / max"), or freeform text with lines like
 * "SIŁA: 50", "sila=50", "Siła - 50", possibly comma-separated.
 * Diacritics, case, and separator are all forgiven. "PKT KRWI" / "KRWI" fill KREW.
 */
export function parsePastedStats(raw: string): ParsedStats {
  const values: Partial<Stats> = {};
  const text = raw.trim();

  // 1. JSON object
  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      for (const [rawKey, rawVal] of Object.entries(parsed)) {
        const normKey = stripDiacritics(String(rawKey)).toUpperCase().replace(/[^A-Z]/g, '');
        const num = typeof rawVal === 'number' ? rawVal : parseInt(String(rawVal), 10);
        if (Number.isNaN(num)) continue;
        for (const key of STAT_KEYS) {
          if (values[key] !== undefined) continue;
          if (STAT_ALIASES[key].some(alias => alias.replace(/\s+/g, '') === normKey)) {
            values[key] = num;
          }
        }
      }
    }
  } catch {
    // not JSON — fall through to line/regex parsing below
  }

  // 2. Line-by-line — handles the tabular in-game paste, where each stat has its
  // own line, the label may be duplicated, and the value is "current / max".
  for (const line of text.split(/\r?\n/)) {
    const normLine = stripDiacritics(line).toUpperCase();
    for (const key of STAT_KEYS) {
      if (values[key] !== undefined) continue;
      for (const alias of STAT_ALIASES[key]) {
        const pattern = alias.replace(/\s+/g, '\\s+');
        if (new RegExp('\\b' + pattern + '\\b').test(normLine)) {
          const numMatch = normLine.match(/-?\d+/);
          if (numMatch) values[key] = parseInt(numMatch[0], 10);
          break;
        }
      }
    }
  }

  // 3. Whole-text fallback — handles compact single-line pastes like "SIŁA:50, ZWINNOŚĆ:50".
  const normalizedText = stripDiacritics(text).toUpperCase();
  for (const key of STAT_KEYS) {
    if (values[key] !== undefined) continue;
    for (const alias of STAT_ALIASES[key]) {
      const pattern = alias.replace(/\s+/g, '\\s+');
      const re = new RegExp('\\b' + pattern + '\\w*\\D{0,3}(-?\\d+)');
      const m = normalizedText.match(re);
      if (m) {
        values[key] = parseInt(m[1], 10);
        break;
      }
    }
  }

  const found = STAT_KEYS.filter(k => values[k] !== undefined);
  const missing = STAT_KEYS.filter(k => values[k] === undefined);
  return { values, found, missing };
}
