// Ewolucje (evolution) per-level costs. Each entry in `costs` is the cost of
// that individual level (not cumulative) — total cost for a chosen level is
// the running sum of costs[0..level-1].
export interface EvolutionDef {
  key: string;
  label: string;
  costs: number[];
}

const STANDARD = [1, 2, 3, 4, 5, 2, 4, 6, 8, 10, 2, 4, 6, 8, 10];
const SKAZENIE_MANA = [300, 600, 900, 1200, 1500, 450, 900, 1350, 1800, 2250, 450, 900, 1350, 1800, 2250];
const POTEGA_LEKKOSC = [250, 500, 750, 1000, 1500, 500, 1000, 1500, 2000, 3000, 500, 1000, 1500, 2000, 3000];
const SHORT = [250, 1000, 2000, 4000, 6000];

export const EVOLUTIONS: EvolutionDef[] = [
  { key: 'skrzydla', label: 'Skrzydła', costs: STANDARD },
  { key: 'pancerz', label: 'Pancerz', costs: STANDARD },
  { key: 'klyPazuryKolce', label: 'Kły/Pazury/Kolce', costs: STANDARD },
  { key: 'gruczolyJadowe', label: 'Gruczoły jadowe', costs: STANDARD },
  { key: 'wzmocnioneSciegna', label: 'Wzmocnione ścięgna', costs: STANDARD },
  { key: 'dodatkowaKomora', label: 'Dodatkowa komora', costs: STANDARD },
  { key: 'krewDemona', label: 'Krew demona', costs: STANDARD },
  { key: 'mutacjaDna', label: 'Mutacja DNA', costs: STANDARD },
  { key: 'oswiecony', label: 'Oświecony', costs: STANDARD },
  { key: 'szostyZmysl', label: 'Szósty zmysł', costs: STANDARD },
  { key: 'absorpcja', label: 'Absorpcja', costs: STANDARD },
  { key: 'harmonijny', label: 'Harmonijny Rozwój', costs: STANDARD },
  { key: 'skazenieMana', label: 'Skażenie Maną', costs: SKAZENIE_MANA },
  { key: 'pamiecPrzodkow', label: 'Pamięć przodków', costs: STANDARD },
  { key: 'potega', label: 'Potęga', costs: POTEGA_LEKKOSC },
  { key: 'lekkoscBytu', label: 'Lekkość bytu', costs: POTEGA_LEKKOSC },
  { key: 'piromancja', label: 'Piromancja', costs: SHORT },
  { key: 'wiezZGaja', label: 'Więź z Gają', costs: SHORT },
  { key: 'hydromancja', label: 'Hydromancja', costs: SHORT },
  { key: 'formaAstralna', label: 'Forma astralna', costs: SHORT },
  { key: 'pietnoDemona', label: 'Piętno demona', costs: STANDARD },
  { key: 'wzmocnioneMiesnie', label: 'Wzmocnione mięśnie', costs: STANDARD },
];
