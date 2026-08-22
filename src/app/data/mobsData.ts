// Moby (mob) data, sourced from the game's spreadsheet.
export interface StatRange {
  min: number;
  max: number;
}

export interface MobStats {
  zwinnosc: StatRange | null;
  spostrzegawczosc: StatRange | null;
  szczescie: StatRange | null;
  obrona: StatRange | null;
  odpornosc: StatRange | null;
  zycie: StatRange | null;
}

// Act-scaling mobs: stats differ across Act 1/2/3; a null act means that
// mob isn't encountered / has no data in that act (matches the sheet's N/A).
export interface ActMob {
  name: string;
  acts: [MobStats | null, MobStats | null, MobStats | null];
}

export const ACT_MOBS: ActMob[] = [
  { name: 'Biały Smok', acts: [{ zwinnosc: { min: 91, max: 105 }, spostrzegawczosc: { min: 42, max: 62 }, szczescie: { min: 0, max: 0 }, obrona: { min: 66, max: 78 }, odpornosc: { min: 24, max: 43 }, zycie: { min: 1000, max: 2500 } }, null, null] },
  { name: 'Czarny Smok', acts: [{ zwinnosc: { min: 70, max: 70 }, spostrzegawczosc: { min: 42, max: 62 }, szczescie: { min: 0, max: 0 }, obrona: { min: 156, max: 168 }, odpornosc: { min: 36, max: 48 }, zycie: { min: 2000, max: 3500 } }, { zwinnosc: { min: 93, max: 93 }, spostrzegawczosc: { min: 46, max: 67 }, szczescie: { min: 0, max: 0 }, obrona: { min: 162, max: 176 }, odpornosc: { min: 42, max: 56 }, zycie: { min: 2640, max: 4620 } }, null] },
  { name: 'Feniks', acts: [{ zwinnosc: { min: 56, max: 80 }, spostrzegawczosc: { min: 70, max: 88 }, szczescie: { min: 0, max: 0 }, obrona: { min: 66, max: 78 }, odpornosc: { min: 36, max: 48 }, zycie: { min: 3250, max: 4500 } }, { zwinnosc: { min: 73, max: 110 }, spostrzegawczosc: { min: 76, max: 98 }, szczescie: { min: 0, max: 0 }, obrona: { min: 66, max: 86 }, odpornosc: { min: 42, max: 56 }, zycie: { min: 3250, max: 5850 } }, null] },
  { name: 'Czerwony Smok', acts: [{ zwinnosc: { min: 70, max: 81 }, spostrzegawczosc: { min: 49, max: 55 }, szczescie: { min: 0, max: 0 }, obrona: { min: 96, max: 106 }, odpornosc: { min: 24, max: 36 }, zycie: { min: 3500, max: 4800 } }, { zwinnosc: { min: 108, max: 164 }, spostrzegawczosc: { min: 60, max: 86 }, szczescie: { min: 0, max: 0 }, obrona: { min: 100, max: 155 }, odpornosc: { min: 28, max: 88 }, zycie: { min: 4480, max: 6656 } }, null] },
  { name: 'Hydra', acts: [{ zwinnosc: { min: 70, max: 86 }, spostrzegawczosc: { min: 77, max: 85 }, szczescie: { min: 0, max: 0 }, obrona: { min: 90, max: 100 }, odpornosc: { min: 36, max: 48 }, zycie: { min: 4800, max: 5734 } }, { zwinnosc: { min: 80, max: 124 }, spostrzegawczosc: { min: 80, max: 97 }, szczescie: { min: 0, max: 0 }, obrona: { min: 95, max: 109 }, odpornosc: { min: 41, max: 55 }, zycie: { min: 6048, max: 8064 } }, null] },
  { name: 'Złoty Smok', acts: [{ zwinnosc: { min: 70, max: 91 }, spostrzegawczosc: { min: 70, max: 125 }, szczescie: { min: 0, max: 0 }, obrona: { min: 84, max: 96 }, odpornosc: { min: 30, max: 42 }, zycie: { min: 6000, max: 8000 } }, { zwinnosc: { min: 87, max: 149 }, spostrzegawczosc: { min: 75, max: 94 }, szczescie: { min: 0, max: 0 }, obrona: { min: 88, max: 102 }, odpornosc: { min: 34, max: 48 }, zycie: { min: 7440, max: 9920 } }, { zwinnosc: { min: 96, max: 166 }, spostrzegawczosc: { min: 77, max: 99 }, szczescie: { min: 0, max: 0 }, obrona: { min: 90, max: 102 }, odpornosc: { min: 36, max: 48 }, zycie: { min: 8058, max: 10555 } }] },
  { name: 'Golem', acts: [{ zwinnosc: { min: 35, max: 50 }, spostrzegawczosc: { min: 28, max: 40 }, szczescie: { min: 0, max: 0 }, obrona: { min: 198, max: 220 }, odpornosc: { min: 78, max: 95 }, zycie: { min: 7500, max: 8500 } }, { zwinnosc: { min: 43, max: 61 }, spostrzegawczosc: { min: 30, max: 42 }, szczescie: { min: 0, max: 0 }, obrona: { min: 207, max: 240 }, odpornosc: { min: 87, max: 120 }, zycie: { min: 9150, max: 11034 } }, { zwinnosc: { min: 47, max: 81 }, spostrzegawczosc: { min: 31, max: 53 }, szczescie: { min: 0, max: 0 }, obrona: { min: 210, max: 249 }, odpornosc: { min: 90, max: 125 }, zycie: { min: 9795, max: 12063 } }] },
  { name: 'Szlachetny Feniks', acts: [{ zwinnosc: { min: 93, max: 118 }, spostrzegawczosc: { min: 89, max: 118 }, szczescie: { min: 0, max: 0 }, obrona: { min: 77, max: 97 }, odpornosc: { min: 53, max: 73 }, zycie: { min: 9600, max: 13560 } }, { zwinnosc: { min: 95, max: 118 }, spostrzegawczosc: { min: 89, max: 118 }, szczescie: { min: 0, max: 0 }, obrona: { min: 77, max: 97 }, odpornosc: { min: 53, max: 73 }, zycie: { min: 9695, max: 13560 } }, { zwinnosc: { min: 98, max: 125 }, spostrzegawczosc: { min: 90, max: 120 }, szczescie: { min: 0, max: 0 }, obrona: { min: 79, max: 99 }, odpornosc: { min: 55, max: 75 }, zycie: { min: 10160, max: 14351 } }] },
  { name: 'Meduza', acts: [{ zwinnosc: { min: 105, max: 133 }, spostrzegawczosc: { min: 98, max: 118 }, szczescie: { min: 0, max: 0 }, obrona: { min: 114, max: 159 }, odpornosc: { min: 60, max: 105 }, zycie: { min: 9800, max: 13278 } }, { zwinnosc: { min: 124, max: 144 }, spostrzegawczosc: { min: 103, max: 147 }, szczescie: { min: 0, max: 0 }, obrona: { min: 120, max: 159 }, odpornosc: { min: 66, max: 105 }, zycie: { min: 11564, max: 16166 } }, { zwinnosc: { min: 128, max: 152 }, spostrzegawczosc: { min: 104, max: 149 }, szczescie: { min: 0, max: 0 }, obrona: { min: 122, max: 162 }, odpornosc: { min: 68, max: 108 }, zycie: { min: 11883, max: 17030 } }] },
  { name: 'Arachne', acts: [null, { zwinnosc: { min: 145, max: 171 }, spostrzegawczosc: { min: 59, max: 88 }, szczescie: { min: 0, max: 0 }, obrona: { min: 82, max: 114 }, odpornosc: { min: 46, max: 78 }, zycie: { min: 15080, max: 18560 } }, { zwinnosc: { min: 152, max: 179 }, spostrzegawczosc: { min: 60, max: 89 }, szczescie: { min: 0, max: 0 }, obrona: { min: 83, max: 116 }, odpornosc: { min: 47, max: 80 }, zycie: { min: 15808, max: 19457 } }] },
  { name: 'Romulus i Remus', acts: [null, { zwinnosc: { min: 160, max: 176 }, spostrzegawczosc: { min: 130, max: 145 }, szczescie: { min: 0, max: 0 }, obrona: { min: 78, max: 110 }, odpornosc: { min: 78, max: 110 }, zycie: { min: 14820, max: 23940 } }, { zwinnosc: { min: 167, max: 184 }, spostrzegawczosc: { min: 131, max: 147 }, szczescie: { min: 0, max: 0 }, obrona: { min: 79, max: 112 }, odpornosc: { min: 79, max: 112 }, zycie: { min: 15360, max: 24950 } }] },
  { name: 'Sfinks', acts: [null, { zwinnosc: { min: 140, max: 161 }, spostrzegawczosc: { min: 126, max: 145 }, szczescie: { min: 0, max: 0 }, obrona: { min: 130, max: 168 }, odpornosc: { min: 58, max: 96 }, zycie: { min: 16800, max: 26881 } }, { zwinnosc: { min: 146, max: 167 }, spostrzegawczosc: { min: 127, max: 146 }, szczescie: { min: 0, max: 0 }, obrona: { min: 131, max: 170 }, odpornosc: { min: 59, max: 98 }, zycie: { min: 17430, max: 27888 } }] },
  { name: 'Bazyliszek', acts: [null, { zwinnosc: { min: 124, max: 173 }, spostrzegawczosc: { min: 90, max: 108 }, szczescie: { min: 0, max: 0 }, obrona: { min: 216, max: 248 }, odpornosc: { min: 120, max: 152 }, zycie: { min: 19800, max: 29701 } }, { zwinnosc: { min: 128, max: 173 }, spostrzegawczosc: { min: 90, max: 107 }, szczescie: { min: 0, max: 0 }, obrona: { min: 150, max: 218 }, odpornosc: { min: 122, max: 154 }, zycie: { min: 20430, max: 29532 } }] },
  { name: 'Robot', acts: [null, null, { zwinnosc: { min: 39, max: 69 }, spostrzegawczosc: { min: 111, max: 173 }, szczescie: { min: 0, max: 0 }, obrona: { min: 228, max: 260 }, odpornosc: { min: 76, max: 108 }, zycie: { min: 44320, max: 55400 } }] },
  { name: 'Anubis', acts: [null, null, { zwinnosc: { min: 175, max: 218 }, spostrzegawczosc: { min: 161, max: 178 }, szczescie: { min: 0, max: 0 }, obrona: { min: 290, max: 321 }, odpornosc: { min: 138, max: 169 }, zycie: { min: 59455, max: 74995 } }] },
  { name: 'Wendigo', acts: [null, null, { zwinnosc: { min: 214, max: 243 }, spostrzegawczosc: { min: 160, max: 248 }, szczescie: { min: 0, max: 0 }, obrona: { min: 378, max: 408 }, odpornosc: { min: 198, max: 228 }, zycie: { min: 73780, max: 94860 } }] },
  { name: 'Kronos', acts: [null, null, { zwinnosc: { min: 295, max: 324 }, spostrzegawczosc: { min: 229, max: 318 }, szczescie: { min: 0, max: 0 }, obrona: { min: 484, max: 526 }, odpornosc: { min: 244, max: 286 }, zycie: { min: 87296, max: 148916 } }] },
];

// Star-scaling mobs ("Druga Mapa"): a single base (1-star) stat line, scaled
// by the star multiplier table below. Luck (szczescie) is never multiplied.
export interface StarMob {
  name: string;
  base: MobStats;
}

export const STAR_MOBS: StarMob[] = [
  { name: 'Geyron', base: { zwinnosc: { min: 129, max: 177 }, spostrzegawczosc: { min: 90, max: 105 }, szczescie: { min: 0, max: 0 }, obrona: { min: 147, max: 205 }, odpornosc: { min: 75, max: 135 }, zycie: { min: 8500, max: 11500 } } },
  { name: 'Yig', base: { zwinnosc: { min: 169, max: 236 }, spostrzegawczosc: { min: 98, max: 116 }, szczescie: { min: 0, max: 0 }, obrona: { min: 140, max: 203 }, odpornosc: { min: 60, max: 83 }, zycie: { min: 12050, max: 14500 } } },
  { name: 'Alastor', base: { zwinnosc: { min: 147, max: 205 }, spostrzegawczosc: { min: 105, max: 125 }, szczescie: { min: 0, max: 0 }, obrona: { min: 340, max: 440 }, odpornosc: { min: 210, max: 270 }, zycie: { min: 21250, max: 25000 } } },
  { name: 'Rakshasa', base: { zwinnosc: { min: 227, max: 265 }, spostrzegawczosc: { min: 178, max: 215 }, szczescie: { min: 0, max: 0 }, obrona: { min: 297, max: 441 }, odpornosc: { min: 165, max: 213 }, zycie: { min: 27750, max: 36750 } } },
  { name: 'Shabriri', base: { zwinnosc: { min: 255, max: 316 }, spostrzegawczosc: { min: 192, max: 238 }, szczescie: { min: 0, max: 0 }, obrona: { min: 240, max: 474 }, odpornosc: { min: 324, max: 330 }, zycie: { min: 52500, max: 77766 } } },
  { name: 'Zulchequon', base: { zwinnosc: { min: 308, max: 350 }, spostrzegawczosc: { min: 224, max: 251 }, szczescie: { min: 0, max: 0 }, obrona: { min: 468, max: 666 }, odpornosc: { min: 240, max: 330 }, zycie: { min: 80375, max: 110000 } } },
  { name: 'Abaddon', base: { zwinnosc: { min: 273, max: 315 }, spostrzegawczosc: { min: 266, max: 301 }, szczescie: { min: 0, max: 0 }, obrona: { min: 486, max: 610 }, odpornosc: { min: 210, max: 300 }, zycie: { min: 104260, max: 130000 } } },
  { name: 'Tsathoggua', base: { zwinnosc: { min: 280, max: 336 }, spostrzegawczosc: { min: 251, max: 280 }, szczescie: { min: 0, max: 0 }, obrona: { min: 816, max: 1092 }, odpornosc: { min: 390, max: 510 }, zycie: { min: 140000, max: 170000 } } },
  { name: 'Agrameon', base: { zwinnosc: { min: 244, max: 329 }, spostrzegawczosc: { min: 196, max: 235 }, szczescie: { min: 0, max: 0 }, obrona: { min: 630, max: 780 }, odpornosc: { min: 630, max: 780 }, zycie: { min: 180000, max: 250000 } } },
  { name: 'Glaaki', base: { zwinnosc: { min: 343, max: 385 }, spostrzegawczosc: { min: 294, max: 364 }, szczescie: { min: 50, max: 50 }, obrona: { min: 360, max: 600 }, odpornosc: { min: 180, max: 300 }, zycie: { min: 225000, max: 300000 } } },
  { name: 'Andras', base: { zwinnosc: { min: 224, max: 244 }, spostrzegawczosc: { min: 308, max: 398 }, szczescie: { min: 30, max: 50 }, obrona: { min: 420, max: 640 }, odpornosc: { min: 360, max: 420 }, zycie: { min: 265000, max: 340000 } } },
  { name: 'Astrate', base: { zwinnosc: { min: 259, max: 297 }, spostrzegawczosc: { min: 224, max: 267 }, szczescie: { min: 50, max: 75 }, obrona: { min: 360, max: 510 }, odpornosc: { min: 210, max: 270 }, zycie: { min: 320000, max: 380000 } } },
  { name: 'Merihim', base: { zwinnosc: { min: 503, max: 595 }, spostrzegawczosc: { min: 140, max: 210 }, szczescie: { min: 80, max: 140 }, obrona: { min: 402, max: 612 }, odpornosc: { min: 132, max: 192 }, zycie: { min: 340000, max: 420000 } } },
  { name: 'Bokrug', base: { zwinnosc: { min: 434, max: 546 }, spostrzegawczosc: { min: 196, max: 282 }, szczescie: { min: 45, max: 85 }, obrona: { min: 480, max: 732 }, odpornosc: { min: 180, max: 282 }, zycie: { min: 400000, max: 520000 } } },
  { name: 'Zepar', base: { zwinnosc: { min: 294, max: 308 }, spostrzegawczosc: { min: 315, max: 406 }, szczescie: { min: 65, max: 120 }, obrona: { min: 510, max: 524 }, odpornosc: { min: 300, max: 420 }, zycie: { min: 800000, max: 1120000 } } },
  { name: 'Malphas', base: { zwinnosc: { min: 609, max: 749 }, spostrzegawczosc: { min: 237, max: 322 }, szczescie: { min: 85, max: 130 }, obrona: { min: 377, max: 500 }, odpornosc: { min: 226, max: 312 }, zycie: { min: 1050000, max: 1575000 } } },
  { name: 'Hastur', base: { zwinnosc: { min: 364, max: 475 }, spostrzegawczosc: { min: 266, max: 350 }, szczescie: { min: 85, max: 140 }, obrona: { min: 332, max: 539 }, odpornosc: { min: 210, max: 360 }, zycie: { min: 1250000, max: 1500000 } } },
];

export interface StarMultiplier {
  stat: number;
  hp: number;
}

// Star 1 is the base line (multiplier 1/1, implied — not stored here).
export const STAR_MULTIPLIERS: Record<number, StarMultiplier> = {
  2: { stat: 1.2, hp: 1.8 },
  3: { stat: 1.4, hp: 2.6 },
  4: { stat: 1.6, hp: 3.4 },
  5: { stat: 1.8, hp: 4.2 },
  6: { stat: 2, hp: 5 },
  7: { stat: 2.2, hp: 5.8 },
  8: { stat: 2.4, hp: 6.6 },
  9: { stat: 2.6, hp: 7.4 },
  10: { stat: 2.8, hp: 8.2 },
  11: { stat: 3, hp: 9 },
  12: { stat: 3.2, hp: 9.8 },
};
