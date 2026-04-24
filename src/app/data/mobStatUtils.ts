// Shared mob-stat scaling helpers, used by both the Moby page and any other
// place that needs to reference a mob's stats (e.g. Kalkulator Postaci's
// "Przeciwnik" lookup). Keeping this in one place avoids the star-scaling
// math drifting between call sites.
import { StarMob, MobStats, StatRange, STAR_MULTIPLIERS } from './mobsData';

const MAX_STARS = 12;

export function multiplierForStar(star: number): { stat: number; hp: number } {
  if (star <= 1) return { stat: 1, hp: 1 };
  return STAR_MULTIPLIERS[Math.min(star, MAX_STARS)] ?? { stat: 1, hp: 1 };
}

/** Scaled stat range for a star mob's given stat key at a given star level. Luck is never scaled. */
export function scaledRangeForStar(mob: StarMob, key: keyof MobStats, star: number): StatRange | null {
  const base = mob.base[key];
  if (!base) return null;
  if (key === 'szczescie') return base;
  const mult = key === 'zycie' ? multiplierForStar(star).hp : multiplierForStar(star).stat;
  return { min: Math.round(base.min * mult), max: Math.round(base.max * mult) };
}

export function formatMobRange(r: StatRange | null): string {
  if (!r) return '—';
  return r.min === r.max ? `${r.min}` : `${r.min}-${r.max}`;
}
