import { Injectable } from '@angular/core';
import { Attributes } from '../models/character';
import { BaseItemDef, BASE_ITEMS, PREFIXES_BY_CATEGORY, SUFFIXES_BY_CATEGORY } from '../data/equipmentDictionary';

export interface ImportResult {
  ok: boolean;
  message: string;
  data?: Record<string, any>;
}

const TRAINING_KEY_MAP: Record<string, keyof Attributes> = {
  str: 'sila',
  dex: 'zwinnosc',
  def: 'odpornosc',
  lok: 'wyglad',
  chr: 'charyzma',
  rep: 'wplywy',
  per: 'spostrzegawczosc',
  int: 'inteligencja',
  wis: 'wiedza',
};

const RASA_MAP: Record<string, string> = {
  'POTĘPIONY': 'Potepiony',
  'ŁAPACZ MYŚLI': 'LapaczMysli',
  'WŁADCA ZWIERZĄT': 'WladcaZwierzat',
  'KULTYSTA': 'Kultysta',
  'SSAK': 'Ssak',
};

/** Known selectable "Eventy" bonus names (see character-input.component.ts dailyBonuses). */
const KNOWN_DAILY_BONUSES = [
  'Klątwa Bogów', 'Noc Długich Noży', 'Noc Starych Bogów', 'Noc poszukiwaczy', 'Dzień Vlada',
  'Dzień Gwiazd Północy', 'Świąteczna wizja Kaina', 'Świąteczna Wizja Kaina (deluxe)', 'Potrójna wizja Kaina',
  'Pożeracz serc', 'Potęga hormonów', 'Dzień neandertalczyka', 'Pisanki Kaina', 'May the 4th be with you',
  'Dzień Przemiany', 'Dzień poszukiwaczy', 'Więzy krwi', 'Krew z krwi', 'Wszyscy jesteśmy Francuzami',
  'Pierwszy gol', 'Pierwszy serwis', 'Szczęście Sprzyja Lepszym', 'Tylko Dla Orłów', 'Zwycięzca Jest Tylko Jeden',
];

/** Mirrors umagiOptions in character-input.component.ts — used to validate translated enchant tiers. */
const UMAGI_OPTIONS = ['obrazenia 1/4', 'ignore 4', 'ignore 6', 'ignore 10', 'ignore 15', 'dodatkowyAtak', 'obrazenia 5', 'obrazenia 7', 'obrazenia 10', 'obrazenia 20', 'kryt 3', 'kryt 5', 'kryt 8', 'kryt 12', 'trafienie 5', 'trafienie 12', 'trafienie 18', 'trafienie 25', 'zycie 25', 'zycie 50', 'zycie 100', 'zycie 250', 'zycie 500', 'zycie 1000', 'obrona 3/4', 'obrona 6/4', 'unik 3', 'unik 5', 'unik 7', 'unik 11', 'obrona 20', 'obrona 30', 'obrona 50', 'obrona 75', 'szczescie 2', 'szczescie 5', 'szczescie 7', 'szczescie 10', 'szczescie 15', 'szczescie 20', 'inicjatywa 36','inicjatywa 24','inicjatywa 16','inicjatywa 8','inicjatywa 4', 'spostrzegawczosc 2', 'spostrzegawczosc 4', 'spostrzegawczosc 8', 'spostrzegawczosc 14', 'zwinnosc 2', 'zwinnosc 4', 'zwinnosc 8', 'zwinnosc 14', 'sila 2', 'sila 4', 'sila 8', 'sila 14', 'charyzma 2', 'charyzma 4', 'charyzma 8', 'charyzma 14', 'wplywy 2', 'wplywy 4', 'wplywy 8', 'wplywy 14', 'odpornosc 2', 'odpornosc 4', 'odpornosc 8', 'odpornosc 14', 'inteligencja 2', 'inteligencja 4', 'inteligencja 8', 'inteligencja 14', 'wiedza 2', 'wiedza 4', 'wiedza 8', 'wiedza 14', 'wyglad 2', 'wyglad 4', 'wyglad 8', 'wyglad 14'];

/** Mirrors runeOptions in character-input.component.ts — used to validate translated socketed runes. */
const RUNE_OPTIONS = ['obrazenia 1', 'obrazenia 2', 'obrazenia 3', 'obrazenia 5', 'kryt 3', 'kryt 5', 'kryt 8', 'kryt 12', 'ignore 2', 'ignore 4', 'ignore 6', 'ignore 10', 'sila 2', 'sila 3', 'sila 6', 'sila 10', 'spostrzegawczosc 2', 'spostrzegawczosc 3', 'spostrzegawczosc 6', 'spostrzegawczosc 10', 'inteligencja 2', 'inteligencja 3', 'inteligencja 6', 'inteligencja 10', 'wiedza 2', 'wiedza 3', 'wiedza 6', 'wiedza 10', 'zwinnosc 2', 'zwinnosc 3', 'zwinnosc 6', 'zwinnosc 10', 'obrona 1', 'obrona 2', 'obrona 3', 'obrona 4', 'odpornosc 2', 'odpornosc 4', 'odpornosc 6', 'odpornosc 10', 'twardosc 1', 'twardosc 2', 'twardosc 3', 'twardosc 4', 'zycie 50', 'zycie 100', 'zycie 150', 'zycie 250', 'szczescie 3', 'szczescie 4', 'szczescie 8', 'szczescie 12', 'multi 2', 'multi 4', 'multi 6', 'multi 10'];

const ATTR_NAME_TO_KEY: Record<string, string> = {
  'SILA': 'sila',
  'ZWINNOSC': 'zwinnosc',
  'ODPORNOSC': 'odpornosc',
  'WYGLAD': 'wyglad',
  'CHARYZMA': 'charyzma',
  'WPLYWY': 'wplywy',
  'SPOSTRZEGAWCZOSC': 'spostrzegawczosc',
  'INTELIGENCJA': 'inteligencja',
  'WIEDZA': 'wiedza',
};

const TALIZMAN_NAME_TO_KEY: Record<string, string> = {
  'AMBICJA': 'ambicja',
  'LEWIATAN': 'lewiatan',
  'BEHEMOT': 'behemot',
  'KAMIEN ZLA': 'kamienZla',
  'KAMIEN DOBRA': 'kamienDobra',
  'KAMIEN PRZESTRZENI': 'kamienPrzestrzeni',
  'KAMIEN CZASU': 'kamienCzasu',
  'SZPONY NOCY': 'szponyNocy',
  'ZYCIE I SMIERC': 'zycieISmierc',
  'OTCHLAN CISZY': 'otchlaniCiszy',
  'POTEGA MOCY': 'potegaMocy',
  'FURIA BESTII': 'furiaBestii',
  'AURA BESTII': 'auraBestii',
  'MASKA WLADZY': 'maskaWladzy',
  'MASKA STRACHU': 'maskaStachu',
  'CICHY LOWCA': 'cichyLowca',
  'PIESN KRWI': 'piesnKrwi',
  'ZIZ': 'ziz',
};

function stripDiacritics(s: string): string {
  const map: Record<string, string> = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z',
  };
  return s.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, ch => map[ch] || ch);
}

function tryOption(candidate: string, list: string[]): string | null {
  return list.includes(candidate) ? candidate : null;
}

function translateEffectLine(text: string, options: { obronaDivisor: boolean }, list: string[]): string | null {
  const t = stripDiacritics(text).trim();
  let m: RegExpMatchArray | null;
  if ((m = t.match(/obrona postaci\s*\+?(\d+)\s*na kazde\s*(\d+)\s*poziom/i))) {
    return options.obronaDivisor ? tryOption(`obrona ${m[1]}/${m[2]}`, list) : tryOption(`obrona ${m[1]}`, list);
  }
  if ((m = t.match(/obrona postaci\s*\+?(\d+)\s*$/i))) {
    return tryOption(`obrona ${m[1]}`, list);
  }
  if ((m = t.match(/bazowe PKT ZYCIA\s*\+?(\d+)/i)) || (m = t.match(/PKT ZYCIA\s*\+?(\d+)/i))) {
    return tryOption(`zycie ${m[1]}`, list);
  }
  if ((m = t.match(/laczne obrazenia wszystkich broni\s*\+?(\d+)\s*%/i)) || (m = t.match(/obrazenia wszystkich broni\s*\+?(\d+)/i))) {
    return tryOption(`obrazenia ${m[1]}`, list);
  }
  if ((m = t.match(/trafienie wszystkich broni\s*\+?(\d+)/i))) {
    return tryOption(`trafienie ${m[1]}`, list);
  }
  if ((m = t.match(/ignoruje\s*(\d+)\s*%/i))) {
    return tryOption(`ignore ${m[1]}`, list);
  }
  if ((m = t.match(/^unik\s*\+?(\d+)\s*%/i))) {
    return tryOption(`unik ${m[1]}`, list);
  }
  if ((m = t.match(/szansa trafienia krytycznego\s*\+?(\d+)\s*%/i))) {
    return tryOption(`kryt ${m[1]}`, list);
  }
  if ((m = t.match(/modyfikator obrazen od trafienia krytycznego\s*\+?(\d+)\s*%/i))) {
    return tryOption(`multi ${m[1]}`, list);
  }
  if ((m = t.match(/SZCZESCIE\s*\+?(\d+)/i))) {
    return tryOption(`szczescie ${m[1]}`, list);
  }
  if ((m = t.match(/^inicjatywa(\s+postaci)?\s*\+?(\d+)/i))) {
    return tryOption(`inicjatywa ${m[2]}`, list);
  }
  if ((m = t.match(/^twardosc\s*\+?(\d+)/i))) {
    return tryOption(`twardosc ${m[1]}`, list);
  }
  if ((m = t.match(/^multi\w*\s*\+?(\d+)/i))) {
    return tryOption(`multi ${m[1]}`, list);
  }
  if (/dodatkow\w*\s+atak/i.test(t)) {
    return tryOption('dodatkowyAtak', list);
  }
  if ((m = t.match(/^obrona\s*\+?(\d+)\s*$/i))) {
    return tryOption(`obrona ${m[1]}`, list);
  }
  for (const [attrName, key] of Object.entries(ATTR_NAME_TO_KEY)) {
    const re = new RegExp(`^${attrName}\\s*\\+?(\\d+)`, 'i');
    if ((m = t.match(re))) {
      return tryOption(`${key} ${m[1]}`, list);
    }
  }
  return null;
}

function baseNameToRegexSource(name: string): string {
  const spaced = name.replace(/([a-z])([A-Z])/g, '$1 $2');
  return spaced.split(' ').map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+');
}

function findBaseItem(text: string): { base: BaseItemDef; index: number; matchedText: string } | null {
  const asciiText = stripDiacritics(text);
  let best: { base: BaseItemDef; index: number; matchedText: string } | null = null;
  for (const b of BASE_ITEMS) {
    const re = new RegExp('\\b' + baseNameToRegexSource(b.name) + '\\b', 'i');
    const m = asciiText.match(re);
    if (m && m.index !== undefined && (!best || m[0].length > best.matchedText.length)) {
      best = { base: b, index: m.index, matchedText: m[0] };
    }
  }
  return best;
}

function detectItemRarity(text: string): { rarity: string; strip: RegExp | null } {
  const upper = stripDiacritics(text).toUpperCase().trim();
  if (/^STAROZYTN/.test(upper)) return { rarity: 'STAROZYTNY', strip: /^\s*staro[zż]ytn\S*\s+/i };
  if (/^EPICK/.test(upper)) return { rarity: 'EPICKI', strip: /^\s*epick\S*\s+/i };
  const hasLeg = /^LEGENDARN/.test(upper);
  if (hasLeg && /LEGENDARN\S*\s+DOSKONA/.test(upper)) return { rarity: 'LEGENDARNY_DOSKONALY', strip: /^\s*legendarn\S*\s+doskona\S*\s+/i };
  if (hasLeg && /LEGENDARN\S*\s+DOBR/.test(upper)) return { rarity: 'LEGENDARNY_DOBRY', strip: /^\s*legendarn\S*\s+dobr\S*\s+/i };
  if (hasLeg) return { rarity: 'LEGENDARNY', strip: /^\s*legendarn\S*\s+/i };
  if (/^DOSKONA/.test(upper)) return { rarity: 'DOSKONALY', strip: /^\s*doskona\S*\s+/i };
  if (/^DOBR/.test(upper)) return { rarity: 'DOBRY', strip: /^\s*dobr\S*\s+/i };
  return { rarity: 'ZWYKLY', strip: null };
}

interface ParsedItemName {
  rarity: string;
  prefix: string | null;
  base: string;
  suffix: string | null;
  prefixMatched: boolean;
  suffixMatched: boolean;
}

/**
 * Polish adjectives (prefixes) agree in grammatical gender with their base noun,
 * so the same prefix shows up as e.g. "Tygrysi" (masc.), "Tygrysia" (fem.),
 * "Tygrysie" (neut.) depending on the item. The canonical dictionary only stores
 * one form, so we fuzzy-match: two normalized words are considered the same word
 * if they agree everywhere except (at most) their last couple of characters —
 * enough to absorb gender-ending variance without conflating genuinely different words.
 */
function fuzzyMatchWord(raw: string, candidates: string[]): { match: string; exact: boolean } | null {
  const normRaw = stripDiacritics(raw).toLowerCase().trim();
  if (!normRaw) return null;
  let best: { candidate: string; score: number; exact: boolean } | null = null;
  for (const candidate of candidates) {
    const normCandidate = stripDiacritics(candidate).toLowerCase().trim();
    if (normCandidate === normRaw) {
      return { match: candidate, exact: true };
    }
    let lcp = 0;
    while (lcp < normRaw.length && lcp < normCandidate.length && normRaw[lcp] === normCandidate[lcp]) lcp++;
    const maxLen = Math.max(normRaw.length, normCandidate.length);
    const minLen = Math.min(normRaw.length, normCandidate.length);
    if (lcp >= 3 && lcp >= minLen - 2 && lcp >= maxLen - 2) {
      const score = lcp / maxLen;
      if (!best || score > best.score) best = { candidate, score, exact: false };
    }
  }
  return best ? { match: best.candidate, exact: best.exact } : null;
}

function parseItemFullName(full: string): ParsedItemName | null {
  const rarityInfo = detectItemRarity(full);
  let rest = full;
  if (rarityInfo.strip) rest = rest.replace(rarityInfo.strip, '');
  const found = findBaseItem(rest);
  if (!found) return null;
  const before = rest.slice(0, found.index).trim();
  const after = rest.slice(found.index + found.matchedText.length).trim();

  let prefix = before || null;
  let prefixMatched = !prefix;
  if (prefix) {
    const candidates = PREFIXES_BY_CATEGORY[found.base.category] ?? [];
    const matched = fuzzyMatchWord(prefix, candidates);
    if (matched) {
      prefix = matched.match;
      prefixMatched = true;
    }
  }

  let suffix = after || null;
  let suffixMatched = !suffix;
  if (suffix) {
    const candidates = SUFFIXES_BY_CATEGORY[found.base.category] ?? [];
    const matched = fuzzyMatchWord(suffix, candidates);
    if (matched) {
      suffix = matched.match;
      suffixMatched = true;
    }
  }

  return { rarity: rarityInfo.rarity, prefix, base: found.base.name, suffix, prefixMatched, suffixMatched };
}

type EquipCategory = 'head' | 'chest' | 'legs' | 'neck' | 'finger' | 'weapon';

function categorizeEquipLabel(label: string): EquipCategory | null {
  const t = stripDiacritics(label).toLowerCase().trim();
  if (t.startsWith('helm')) return 'head';
  if (t.startsWith('zbroja')) return 'chest';
  if (t.startsWith('spodnie')) return 'legs';
  if (t.startsWith('amulet')) return 'neck';
  if (t.startsWith('pierscien')) return 'finger';
  if (t.startsWith('bron')) return 'weapon';
  return null;
}

@Injectable({ providedIn: 'root' })
export class GameImportService {

  /** ?a=training — reads the `baseStats` JS object embedded in the page. */
  parseTraining(html: string): ImportResult {
    const match = html.match(/var\s+baseStats\s*=\s*(\{[^;]*\})\s*;/);
    if (!match) {
      return { ok: false, message: 'Nie znaleziono danych treningu (zmiennej "baseStats") w podanym HTML. Upewnij się, że wklejono źródło strony ?a=training.' };
    }
    let raw: Record<string, number>;
    try {
      raw = JSON.parse(match[1]);
    } catch {
      return { ok: false, message: 'Znaleziono dane treningu, ale nie udało się ich odczytać (błąd formatu).' };
    }
    const attributes: Partial<Attributes> = {};
    let count = 0;
    for (const [gameKey, attrKey] of Object.entries(TRAINING_KEY_MAP)) {
      if (typeof raw[gameKey] === 'number') {
        attributes[attrKey] = raw[gameKey];
        count++;
      }
    }
    if (count === 0) {
      return { ok: false, message: 'Dane treningu miały nieoczekiwany format — nie udało się odczytać żadnej cechy.' };
    }
    return {
      ok: true,
      message: `Zaimportowano ${count}/9 cech treningu.`,
      data: { attributes },
    };
  }

  /** ?a=main — level, race, and (best-effort) current server event. */
  parseMain(html: string): ImportResult {
    const data: Record<string, any> = {};
    const found: string[] = [];
    const problems: string[] = [];

    const levelMatch = html.match(/id="main-playerLvl">\s*<span>POZIOM<\/span>\s*<span class="value">(\d+)/)
      ?? html.match(/CAPTION,\s*'POZIOM\s*(\d+)'/);
    if (levelMatch) {
      data['poziom'] = parseInt(levelMatch[1], 10);
      found.push(`Poziom (${data['poziom']})`);
    } else {
      problems.push('nie znaleziono poziomu postaci');
    }

    const raceMatch = html.match(/<td>RASA<\/td>\s*<td><b>\s*([^<]+?)\s*(?:<|$)/i);
    if (raceMatch) {
      const label = raceMatch[1].trim().toUpperCase().replace(/\s+/g, ' ');
      const value = RASA_MAP[label];
      if (value) {
        data['rasa'] = value;
        found.push(`Rasa (${label})`);
      } else {
        problems.push(`znaleziono rasę "${raceMatch[1].trim()}", ale nie rozpoznano jej na liście dostępnych ras`);
      }
    } else {
      problems.push('nie znaleziono rasy postaci');
    }

    const eventImg = html.match(/class="server-event">[\s\S]*?onmouseout="nd\(\);"\s*alt="([^"]+)"/);
    if (eventImg) {
      const eventName = eventImg[1].trim();
      const known = KNOWN_DAILY_BONUSES.find(b => b.toLowerCase() === eventName.toLowerCase());
      if (known) {
        data['eventBonus'] = known;
        found.push(`Event (${known})`);
      } else {
        problems.push(`wykryto aktywny event serwerowy "${eventName}", ale nie ma go na liście dostępnych bonusów dziennych — ustaw go ręcznie w sekcji "Eventy", jeśli powinien być zaznaczony`);
      }
    }

    if (found.length === 0) {
      return { ok: false, message: `Nie udało się odczytać danych ze strony głównej: ${problems.join('; ')}.` };
    }
    const message = problems.length
      ? `Zaimportowano: ${found.join(', ')}. Uwaga: ${problems.join('; ')}.`
      : `Zaimportowano: ${found.join(', ')}.`;
    return { ok: true, message, data };
  }

  /** ?a=equip — currently equipped items (the "EKWIPUNEK" section), one per slot. */
  parseEquip(html: string): ImportResult {
    const legendIdx = html.indexOf('EKWIPUNEK');
    if (legendIdx === -1) {
      return { ok: false, message: 'Nie znaleziono sekcji EKWIPUNEK w podanym HTML. Upewnij się, że wklejono źródło strony ?a=equip.' };
    }
    const endIdx = html.indexOf('</fieldset>', legendIdx);
    const slice = endIdx !== -1 ? html.substring(legendIdx, endIdx) : html.substring(legendIdx);

    const categories = [...slice.matchAll(/<div><b><i>([\s\S]*?)<\/i><\/b><\/div>/g)]
      .map(m => m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim());
    const names = [...slice.matchAll(/([^<>]+)<\/span>\s*\n<\/div>/g)].map(m => m[1].trim());

    if (names.length === 0) {
      return { ok: false, message: 'Nie znaleziono żadnych wyekwipowanych przedmiotów w podanym HTML.' };
    }

    const equipment: Record<string, any> = {};
    const found: string[] = [];
    const problems: string[] = [];
    let weaponMode: 'dual1h' | '2h' = 'dual1h';
    let weaponSlotsFilled = 0;
    let fingerSlotsFilled = 0;

    const count = Math.min(categories.length, names.length);
    if (categories.length !== names.length) {
      problems.push(`liczba kategorii (${categories.length}) i nazw przedmiotów (${names.length}) się nie zgadza — część przedmiotów mogła zostać pominięta`);
    }

    for (let i = 0; i < count; i++) {
      const label = categories[i];
      const fullName = names[i];
      const cat = categorizeEquipLabel(label);
      if (!cat) {
        problems.push(`nie rozpoznano typu slotu dla "${fullName}" (etykieta: "${label}")`);
        continue;
      }
      const parsed = parseItemFullName(fullName);
      if (!parsed) {
        problems.push(`nie rozpoznano bazowego przedmiotu dla "${fullName}"`);
        continue;
      }
      if (!parsed.prefixMatched) {
        problems.push(`nie rozpoznano prefiksu "${parsed.prefix}" dla "${fullName}" — zapisano tak, jak wystąpił w grze`);
      }
      if (!parsed.suffixMatched) {
        problems.push(`nie rozpoznano sufiksu "${parsed.suffix}" dla "${fullName}" — zapisano tak, jak wystąpił w grze`);
      }
      const item = { rarity: parsed.rarity, prefix: parsed.prefix, base: parsed.base, suffix: parsed.suffix };
      let slotKey: string | null = null;
      switch (cat) {
        case 'head': slotKey = 'head'; break;
        case 'chest': slotKey = 'chest'; break;
        case 'legs': slotKey = 'legs'; break;
        case 'neck': slotKey = 'neck'; break;
        case 'finger':
          slotKey = fingerSlotsFilled === 0 ? 'finger1' : fingerSlotsFilled === 1 ? 'finger2' : null;
          fingerSlotsFilled++;
          break;
        case 'weapon': {
          const is2h = /dwureczn/i.test(stripDiacritics(label));
          if (is2h) {
            weaponMode = '2h';
            slotKey = weaponSlotsFilled === 0 ? 'weapon1' : null;
          } else {
            slotKey = weaponSlotsFilled === 0 ? 'weapon1' : weaponSlotsFilled === 1 ? 'weapon2' : null;
          }
          weaponSlotsFilled++;
          break;
        }
      }
      if (!slotKey) {
        problems.push(`za dużo przedmiotów typu "${cat}" — pominięto "${fullName}"`);
        continue;
      }
      equipment[slotKey] = item;
      found.push(fullName);
    }
    equipment['weaponMode'] = weaponMode;

    if (found.length === 0) {
      return { ok: false, message: `Nie udało się zaimportować żadnego przedmiotu. ${problems.join('; ')}` };
    }
    const message = problems.length
      ? `Zaimportowano ${found.length} przedmiotów ekwipunku. Uwaga: ${problems.join('; ')}.`
      : `Zaimportowano ${found.length} przedmiotów ekwipunku.`;
    return { ok: true, message, data: { equipment } };
  }

  /** ?a=enchant — currently equipped umagicznienia across all locations, translated to umagiValues tiers. */
  parseEnchant(html: string): ImportResult {
    const frameRe = /<div class="enchantDetailsFrame equipped">[\s\S]*?<ul>([\s\S]*?)<\/ul>/g;
    const lines: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = frameRe.exec(html))) {
      const lis = [...m[1].matchAll(/<li[^>]*>(.*?)<\/li>/g)].map(x => x[1].replace(/<[^>]+>/g, '').trim());
      lines.push(...lis);
    }
    if (lines.length === 0) {
      return { ok: false, message: 'Nie znaleziono żadnych aktywnych umagicznień w podanym HTML. Upewnij się, że wklejono źródło strony ?a=enchant.' };
    }
    const umagiValues: string[] = [];
    const unmatched: string[] = [];
    for (const line of lines) {
      const translated = translateEffectLine(line, { obronaDivisor: true }, UMAGI_OPTIONS);
      if (translated) umagiValues.push(translated);
      else unmatched.push(line);
    }
    if (umagiValues.length === 0) {
      return { ok: false, message: `Znaleziono ${lines.length} efektów umagicznień, ale żadnego nie udało się dopasować do listy dostępnych opcji.` };
    }
    const message = unmatched.length
      ? `Zaimportowano ${umagiValues.length} umagicznień. Nie rozpoznano ${unmatched.length} efektów: ${unmatched.join('; ')} — dodaj je ręcznie.`
      : `Zaimportowano ${umagiValues.length} umagicznień.`;
    return { ok: true, message, data: { umagiValues } };
  }

  /** ?a=talizman — talizman levels and socketed runes. */
  parseTalizman(html: string): ImportResult {
    const talizmanMatches = [...html.matchAll(/class="talIconImg" src="[^"]*" alt="([^"]+?) poz\. (\d+)"/g)];
    const talizmanLevels: Record<string, number> = {};
    const talizmanFound: string[] = [];
    const talizmanUnmatched: string[] = [];
    for (const m of talizmanMatches) {
      const name = stripDiacritics(m[1]).toUpperCase().replace(/\s+/g, ' ').trim();
      const key = TALIZMAN_NAME_TO_KEY[name];
      if (key) {
        talizmanLevels[key] = parseInt(m[2], 10);
        talizmanFound.push(`${m[1]} (${m[2]})`);
      } else {
        talizmanUnmatched.push(m[1]);
      }
    }

    const runeMatches = [...html.matchAll(/<img src="gfx\/talizman\/srune_\d+\.png"\s*\n?\s*alt="[^"]+? poz\. \d+" onmouseover="return overlib\('([\s\S]*?)',CAPTION/g)];
    const runeValues: string[] = [];
    const runeUnmatched: string[] = [];
    for (const m of runeMatches) {
      const desc = m[1].replace(/<br\/>/g, ' ').replace(/\\r/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const translated = translateEffectLine(desc, { obronaDivisor: false }, RUNE_OPTIONS);
      if (translated) runeValues.push(translated);
      else runeUnmatched.push(desc.split(/,| Kliknij/i)[0].trim());
    }

    const totalFound = talizmanFound.length + runeValues.length;
    if (totalFound === 0) {
      return { ok: false, message: 'Nie znaleziono żadnych talizmanów ani run w podanym HTML. Upewnij się, że wklejono źródło strony ?a=talizman.' };
    }
    const problems: string[] = [];
    if (talizmanUnmatched.length) problems.push(`nierozpoznane talizmany: ${talizmanUnmatched.join(', ')}`);
    if (runeUnmatched.length) problems.push(`nierozpoznane runy (${runeUnmatched.length}): ${runeUnmatched.join('; ')}`);
    const message = problems.length
      ? `Zaimportowano ${talizmanFound.length} poziomów talizmanów i ${runeValues.length} run. Uwaga: ${problems.join('; ')}.`
      : `Zaimportowano ${talizmanFound.length} poziomów talizmanów i ${runeValues.length} run.`;
    return { ok: true, message, data: { talizmanLevels, runeValues } };
  }

  /** ?a=build — Pośredniak / Dom Publiczny / Rzeźnia building levels. */
  parseBuild(html: string): ImportResult {
    const buildings: { name: string; field: string }[] = [
      { name: 'POŚREDNIAK', field: 'posredniak' },
      { name: 'DOM PUBLICZNY', field: 'domPubliczny' },
      { name: 'RZEŹNIA', field: 'rzeznia' },
    ];
    const data: Record<string, any> = {};
    const found: string[] = [];
    const problems: string[] = [];
    for (const b of buildings) {
      const nameAscii = stripDiacritics(b.name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`<span class="bldheader">\\s*${nameAscii}\\s*<\\/span>\\s*POZIOM&nbsp;<b>(\\d+)<\\/b>`, 'i');
      const m = html.match(re) ?? html.match(new RegExp(`<span class="bldheader">\\s*${b.name}\\s*<\\/span>\\s*POZIOM&nbsp;<b>(\\d+)<\\/b>`, 'i'));
      if (m) {
        data[b.field] = parseInt(m[1], 10);
        found.push(`${b.name} (${m[1]})`);
      } else {
        problems.push(`nie znaleziono budynku "${b.name}"`);
      }
    }
    if (found.length === 0) {
      return { ok: false, message: 'Nie znaleziono żadnych budynków w podanym HTML. Upewnij się, że wklejono źródło strony ?a=build.' };
    }
    const message = problems.length
      ? `Zaimportowano: ${found.join(', ')}. Uwaga: ${problems.join('; ')}.`
      : `Zaimportowano: ${found.join(', ')}.`;
    return { ok: true, message, data };
  }

  /** Shared logic for ?a=newarena&cat=4&t=silver|gold — reads the "Aktywny poziom" tier for named bonuses. */
  private parseArenaBonuses(html: string, wanted: { name: string; field: string }[]): ImportResult {
    const data: Record<string, any> = {};
    const found: string[] = [];
    const problems: string[] = [];
    const headerRe = /<td colspan="6"[^>]*>([^<]+)<\/td>/g;
    const headers = [...html.matchAll(headerRe)];
    for (const w of wanted) {
      const idx = headers.findIndex(h => stripDiacritics(h[1]).trim().toLowerCase() === stripDiacritics(w.name).toLowerCase());
      if (idx === -1) {
        problems.push(`nie znaleziono premii "${w.name}"`);
        continue;
      }
      const startPos = headers[idx].index! + headers[idx][0].length;
      const endPos = idx + 1 < headers.length ? headers[idx + 1].index! : html.length;
      const block = html.substring(startPos, endPos);
      const rowMatch = block.match(/Aktywny poziom<\/td>([\s\S]*?)<\/tr>/i);
      if (!rowMatch) {
        problems.push(`nie znaleziono wiersza "Aktywny poziom" dla "${w.name}"`);
        continue;
      }
      const levelMatch = rowMatch[1].match(/<b>(\d+)<\/b>/);
      const level = levelMatch ? parseInt(levelMatch[1], 10) : 0;
      data[w.field] = level;
      found.push(`${w.name} (${level})`);
    }
    if (found.length === 0) {
      return { ok: false, message: `Nie udało się odczytać żadnej premii areny. ${problems.join('; ')}` };
    }
    const message = problems.length
      ? `Zaimportowano: ${found.join(', ')}. Uwaga: ${problems.join('; ')}.`
      : `Zaimportowano: ${found.join(', ')}.`;
    return { ok: true, message, data };
  }

  /** ?a=newarena&cat=4&t=silver — Myśliwy / Ninja active tier. */
  parseArenaSilver(html: string): ImportResult {
    return this.parseArenaBonuses(html, [
      { name: 'Ninja', field: 'ninja' },
      { name: 'Myśliwy', field: 'mysliwy' },
    ]);
  }

  /** ?a=newarena&cat=4&t=gold — Strateg active tier. */
  parseArenaGold(html: string): ImportResult {
    return this.parseArenaBonuses(html, [
      { name: 'Strateg', field: 'strateg' },
    ]);
  }

  /** ?a=clanbld — Kaplica building level. */
  parseClanBld(html: string): ImportResult {
    const m = html.match(/KAPLICA poziom (\d+)/i);
    if (!m) {
      return { ok: false, message: 'Nie znaleziono poziomu Kaplicy w podanym HTML. Upewnij się, że wklejono źródło strony ?a=clanbld.' };
    }
    return { ok: true, message: `Zaimportowano: Kaplica (${m[1]}).`, data: { kaplica: parseInt(m[1], 10) } };
  }

  /**
   * ?a=hunt&do=clanBonus — currently active clan hunt bonuses.
   * Best-effort: no sample with an active bonus was available while building this,
   * so it looks for common "already active" markers; if none are found, it reports
   * zero active bonuses rather than failing (which may simply be correct).
   */
  parseHuntClanBonus(html: string): ImportResult {
    const NAME_TO_OPTION: Record<string, string> = {
      'JUGGERNAUT': 'Juggernaut',
      'RONIN': 'Ronin',
      'ADRENALINA': 'Adrenalina',
      'SOKOLE OKO': 'SokoleOko',
      'RZEŹNIK': 'Rzeźnik',
    };
    const blocks = [...html.matchAll(/<div class="singleBonusContainer">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g)];
    const huntBonuses: string[] = [];
    const seenNames: string[] = [];
    for (const b of blocks) {
      const nameMatch = b[1].match(/<div class="name">([^<]+)<\/div>/);
      if (!nameMatch) continue;
      const rawName = nameMatch[1].trim();
      seenNames.push(rawName);
      const isActive = /aktywny|aktywne do|pozostał/i.test(b[1]) && !/AKTYWUJ DO PÓŁNOCY/i.test(b[1]);
      if (isActive) {
        const key = stripDiacritics(rawName).toUpperCase();
        const option = NAME_TO_OPTION[key];
        if (option) huntBonuses.push(option);
      }
    }
    if (seenNames.length === 0) {
      return { ok: false, message: 'Nie znaleziono żadnych bonusów klanowych w podanym HTML. Upewnij się, że wklejono źródło strony ?a=hunt&do=clanBonus.' };
    }
    const message = huntBonuses.length
      ? `Zaimportowano ${huntBonuses.length} aktywnych bonusów klanowych: ${huntBonuses.join(', ')}.`
      : `Nie wykryto żadnych aktualnie AKTYWNYCH bonusów klanowych spośród ${seenNames.length} znalezionych (${seenNames.join(', ')}). Jeśli to niepoprawne, sprawdź ręcznie w sekcji "Polowanie" — wykrywanie stanu "aktywny" nie zostało jeszcze zweryfikowane na przykładzie z realnie aktywnym bonusem.`;
    return { ok: huntBonuses.length > 0, message, data: huntBonuses.length ? { huntBonuses } : undefined };
  }
}
