// Character avatar images, keyed by race (rasa). Sourced from the game's own asset host.
const RASA_AVATAR_INDEX: Record<string, number> = {
  LapaczMysli: 1,
  WladcaZwierzat: 2,
  Kultysta: 3,
  Ssak: 4,
  Potepiony: 5,
};

export function rasaAvatarUrl(rasa: string | null | undefined): string | null {
  if (!rasa) return null;
  const index = RASA_AVATAR_INDEX[rasa];
  return index ? `https://bloodwars.pl/gfx/awatary/${index}_1.jpg` : null;
}

// Mirrors the rasaOptions labels in character-input.component.ts.
const RASA_LABELS: Record<string, string> = {
  Potepiony: 'Potępiony',
  LapaczMysli: 'Łapacz Myśli',
  WladcaZwierzat: 'Władca Zwierząt',
  Kultysta: 'Kultysta',
  Ssak: 'Ssak',
};

export function rasaLabel(rasa: string | null | undefined): string {
  if (!rasa) return '—';
  return RASA_LABELS[rasa] ?? rasa;
}
