import { STAR_MOBS, StarMob } from './mobsData';

export interface ExpeditionMob extends StarMob {
  imageUrl: string;
}

export interface ExpeditionTower {
  id: string;
  mobs: ExpeditionMob[];
}

// The game's asset filenames don't always match our display names 1:1.
const IMAGE_NAME_OVERRIDES: Record<string, string> = {
  Geyron: 'geryon',
  Astrate: 'astarte',
};

// Some mobs' images live under "<name>_300.jpg" instead of "<name>300.jpg".
const UNDERSCORE_SUFFIX_MOBS = new Set([
  'Agrameon', 'Glaaki', 'Andras', 'Astrate', 'Merihim', 'Bokrug', 'Zepar', 'Malphas', 'Hastur',
]);

function mobImageUrl(name: string): string {
  const slug = (IMAGE_NAME_OVERRIDES[name] ?? name).toLowerCase();
  const suffix = UNDERSCORE_SUFFIX_MOBS.has(name) ? '_300' : '300';
  return `https://r20.bloodwars.pl/gfx/cevent/mobs/${slug}${suffix}.jpg`;
}

function withImages(mobs: StarMob[]): ExpeditionMob[] {
  return mobs.map(mob => ({ ...mob, imageUrl: mobImageUrl(mob.name) }));
}

export const EXPEDITION_TOWERS: ExpeditionTower[] = [
  { id: 'tower-1', mobs: withImages([...STAR_MOBS.slice(0, 5), STAR_MOBS[5]]) },
  { id: 'tower-2', mobs: withImages([...STAR_MOBS.slice(6, 12), STAR_MOBS[12]]) },
  { id: 'tower-3', mobs: withImages([...STAR_MOBS.slice(13, 16), STAR_MOBS[16]]) },
];
