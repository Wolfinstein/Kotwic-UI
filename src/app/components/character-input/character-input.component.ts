import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CharacterService } from '../../services/character.service';
import { Character, EquipmentItem } from '../../models/character';
import { WeaponDictionary, ArmourDictionary, JewelsDictionary, BaseDictionary } from '../../logic/dictionaries';
import { ItemGenre, PrefixType, SuffixType, ItemType, ItemRarity, Stats, Base } from '../../logic/item';
import { WeaponStats } from '../../logic/item/WeaponStats';
import { applyQualityMultiplier } from '../../logic/item/qualityMultiplier';
import { applyQualityWeaponMultiplier } from '../../logic/item/qualityWeaponMultiplier';
import { CHARACTER_PRESETS, CharacterPreset } from '../../data/presets';
import { DashboardService } from '../../services/calculate';
import { ChartModule } from 'primeng/chart';
import { ACT_MOBS, STAR_MOBS, ActMob, StarMob, MobStats, StatRange } from '../../data/mobsData';
import { scaledRangeForStar, formatMobRange } from '../../data/mobStatUtils';
import { GameImportService, ImportResult } from '../../services/game-import.service';
import { SlotCategory, BaseItemDef, RARITIES, BASE_ITEMS, PREFIXES_BY_CATEGORY, SUFFIXES_BY_CATEGORY } from '../../data/equipmentDictionary';

export interface ImportStepDef {
  key: 'trening' | 'main' | 'equip' | 'enchant' | 'talizman' | 'build' | 'arenaSilver' | 'arenaGold' | 'clanbld' | 'huntClanBonus';
  label: string;
  url: string;
}

const SLOT_TO_CATEGORY: Record<string, SlotCategory> = {
  head: 'head',
  chest: 'chest',
  legs: 'legs',
  neck: 'neck',
  finger1: 'finger',
  finger2: 'finger',
  weapon1: 'weapon1h',
  weapon2: 'weapon1h',
};
@Component({
  selector: 'app-character-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    SelectModule,
    CheckboxModule,
    RadioButtonModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    InputTextModule,
    SelectButtonModule,
    ChartModule,
  ],
  templateUrl: './character-input.component.html',
  styleUrl: './character-input.component.css'
})
export class CharacterInputComponent implements OnInit {
  character: Character | null = null;
  showEquipmentModal = false;
  showRunesModal = false;
  showUmagiModal = false;
  showPresetsModal = false;
  presets = CHARACTER_PRESETS;
  selectedEquipmentSlot = '';
  weaponMode: 'dual1h' | '2h' = 'dual1h';
  draftItem: EquipmentItem = { rarity: null, prefix: null, base: null, suffix: null };
  draft2hItem: EquipmentItem = { rarity: null, prefix: null, base: null, suffix: null };
  rarities = RARITIES;
  runeOptions = ['obrazenia 1', 'obrazenia 2', 'obrazenia 3', 'obrazenia 5', 'kryt 3', 'kryt 5', 'kryt 8', 'kryt 12', 'ignore 2', 'ignore 4', 'ignore 6', 'ignore 10', 'sila 2', 'sila 3', 'sila 6', 'sila 10', 'spostrzegawczosc 2', 'spostrzegawczosc 3', 'spostrzegawczosc 6', 'spostrzegawczosc 10', 'inteligencja 2', 'inteligencja 3', 'inteligencja 6', 'inteligencja 10', 'wiedza 2', 'wiedza 3', 'wiedza 6', 'wiedza 10', 'zwinnosc 2', 'zwinnosc 3', 'zwinnosc 6', 'zwinnosc 10', 'obrona 1', 'obrona 2', 'obrona 3', 'obrona 4', 'odpornosc 2', 'odpornosc 3', 'odpornosc 6', 'odpornosc 10', 'twardosc 1', 'twardosc 2', 'twardosc 3', 'twardosc 4', 'zycie 50', 'zycie 100', 'zycie 150', 'zycie 250', 'szczescie 3', 'szczescie 4', 'szczescie 8', 'szczescie 12', 'multi 2', 'multi 4', 'multi 6', 'multi 10'];
  selectedRunes: string[] = [];
  runeFilter = '';
  selectedRuneIndex: number | null = null;
  umagiOptions = ['obrazenia 1/4', 'ignore 4', 'ignore 6', 'ignore 10', 'ignore 15', 'dodatkowyAtak', 'obrazenia 5', 'obrazenia 7', 'obrazenia 10', 'obrazenia 20', 'kryt 3', 'kryt 5', 'kryt 8', 'kryt 12', 'trafienie 5', 'trafienie 12', 'trafienie 18', 'trafienie 25', 'zycie 25', 'zycie 50', 'zycie 100', 'zycie 250', 'zycie 500', 'zycie 1000', 'obrona 3/4', 'obrona 6/4', 'unik 3', 'unik 5', 'unik 7', 'unik 11', 'obrona 20', 'obrona 30', 'obrona 50', 'obrona 75', 'szczescie 2', 'szczescie 5', 'szczescie 7', 'szczescie 10', 'szczescie 15', 'szczescie 20', 'inicjatywa 36', 'spostrzegawczosc 2', 'spostrzegawczosc 4', 'spostrzegawczosc 8', 'spostrzegawczosc 14', 'zwinnosc 2', 'zwinnosc 4', 'zwinnosc 8', 'zwinnosc 14', 'sila 2', 'sila 4', 'sila 8', 'sila 14', 'charyzma 2', 'charyzma 4', 'charyzma 8', 'charyzma 14', 'wplywy 2', 'wplywy 4', 'wplywy 8', 'wplywy 14', 'odpornosc 2', 'odpornosc 4', 'odpornosc 8', 'odpornosc 14', 'inteligencja 2', 'inteligencja 4', 'inteligencja 8', 'inteligencja 14', 'wiedza 2', 'wiedza 4', 'wiedza 8', 'wiedza 14', 'wyglad 2', 'wyglad 4', 'wyglad 8', 'wyglad 14'];
  selectedUmagi: string[] = [];
  umagiFilter = '';
  selectedUmagiIndex: number | null = null;

  // ── Przeciwnik reference lookup (Moby) — display only, filled in manually ──
  readonly refMapOptions = [
    { label: 'M1 — Akt 1-3', value: 'M1' },
    { label: 'M2 — Gwiazdki', value: 'M2' },
  ];
  readonly refActMobOptions = ACT_MOBS.map(m => ({ label: m.name, value: m.name }));
  readonly refStarMobOptions = STAR_MOBS.map(m => ({ label: m.name, value: m.name }));
  readonly refStarOptions = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));
  readonly refStatDefs: { key: keyof MobStats; label: string }[] = [
    { key: 'obrona', label: 'Obrona' },
    { key: 'odpornosc', label: 'Odporność' },
    { key: 'zwinnosc', label: 'Zwinność' },
    { key: 'spostrzegawczosc', label: 'Spostrzegawczość' },
    { key: 'szczescie', label: 'Szczęście' },
  ];

  refMapMode: 'M1' | 'M2' | null = null;
  refActMobName: string | null = null;
  refStarMobName: string | null = null;
  refAct: number | null = null;
  refStar: number | null = null;

  attributes = [
    { key: 'sila', label: 'Siła' },
    { key: 'zwinnosc', label: 'Zwinność' },
    { key: 'odpornosc', label: 'Odpornoćć' },
    { key: 'wyglad', label: 'Wygląd' },
    { key: 'charyzma', label: 'Charyzma' },
    { key: 'wplywy', label: 'Wpływy' },
    { key: 'spostrzegawczosc', label: 'Spostrzegawczość' },
    { key: 'inteligencja', label: 'Inteligencja' },
    { key: 'wiedza', label: 'Wiedza' },
  ];
  evolutions = [
    { key: 'skrzydla', label: 'Skrzydła' },
    { key: 'pancerz', label: 'Pancerz' },
    { key: 'klyPazuryKolce', label: 'Kły/Pazury/Kolce' },
    { key: 'gruczolyJadowe', label: 'Gruczoły jadowe' },
    { key: 'wzmocnioneSciegna', label: 'Wzmocnione scięgna' },
    { key: 'dodatkowaKomora', label: 'Dodatkowa komora' },
    { key: 'krewDemona', label: 'Krew demona' },
    { key: 'mutacjaDna', label: 'Mutacja DNA' },
    { key: 'oswiecony', label: 'Oświecony' },
    { key: 'szostyZmysl', label: 'Szósty zmysl' },
    { key: 'absorpcja', label: 'Absorpcja' },
    { key: 'harmonijnyRozwoj', label: 'Harmonijny rozwój' },
    { key: 'pietnoDemona', label: 'Piętno demona' },
    { key: 'wzmocnioneMiesnie', label: 'Wzmocnione mięsnie' },
  ];
  talizmanAttributes = [
    // Row 1
    { key: 'ambicja', label: 'Ambicja' },
    { key: 'lewiatan', label: 'Lewiatan' },
    { key: 'behemot', label: 'Behemot' },
    { key: 'ziz', label: 'Ziz' },
    { key: 'kamienZla', label: 'Kamień Zła' },
    { key: 'kamienDobra', label: 'Kamień Dobra' },
    { key: 'kamienPrzestrzeni', label: 'Kamień Przestrzeni' },
    { key: 'kamienCzasu', label: 'Kamień Czasu' },
    { key: 'szponyNocy', label: 'Szpony Nocy' },
    // Row 2
    { key: 'zycieISmierc', label: 'Życie i Śmierć' },
    { key: 'otchlaniCiszy', label: 'Otchlań Ciszy' },
    { key: 'potegaMocy', label: 'Potęga Mocy' },
    { key: 'furiaBestii', label: 'Furia Bestii' },
    { key: 'auraBestii', label: 'Aura Bestii' },
    { key: 'maskaWladzy', label: 'Maska Władzy' },
    { key: 'maskaStachu', label: 'Maska Strachu' },
    { key: 'cichyLowca', label: 'Cichy Łowca' },
    { key: 'piesnKrwi', label: 'Pieśń Krwi' },
  ];
  arcaneAttributes = [
    { key: 'maskaAdonisa', label: 'Maska Adonisa', type: 'int', cost: 10 },
    { key: 'maskaKaliguli', label: 'Maska Kaliguli', type: 'int', cost: 10 },
    { key: 'majestat', label: 'Majestat', type: 'int', cost: 50 },
    { key: 'krewZycia', label: 'Krew Życia', type: 'int', cost: 20 },
    { key: 'kocieSciezki', label: 'Kocie Ścieżki', type: 'int', cost: 15 },
    { key: 'zarKrwi', label: 'Żar Krwi', type: 'boolean', cost: 210 },
    { key: 'ciszaKrwi', label: 'Cisza Krwi', type: 'int', cost: 15 },
    { key: 'wyssanieMocy', label: 'Wyssanie Mocy', type: 'int', cost: 30 },
    { key: 'mocKrwi', label: 'Moc Krwi', type: 'int', cost: 30 },
    { key: 'dzikiSzal', label: 'Dziki Szal', type: 'int', cost: 13 },
    { key: 'skoraBestii', label: 'Skóra Bestii', type: 'int', cost: 14 },
    { key: 'cienBestii', label: 'Cień Bestii', type: 'boolean', cost: 200 },
    { key: 'nocnyLowca', label: 'Nocny Łowca', type: 'int', cost: 20 },
    { key: 'tchnienieSmierci', label: 'Tchnienie Śmierci', type: 'int', cost: 40 },
    { key: 'groza', label: 'Groza', type: 'boolean', cost: 225 },
  ];

  get arcaneTotalCost(): number {
    if (!this.character) return 0;
    return this.arcaneAttributes.reduce((sum, arcane) => {
      const value = this.getArcaneValue(arcane.key);
      const levels = typeof value === 'boolean' ? (value ? 1 : 0) : (value ?? 0);
      return sum + levels * arcane.cost;
    }, 0);
  }
  rasaOptions = [
    { label: 'Potępiony', value: 'Potepiony' },
    { label: 'Łapacz Myśli', value: 'LapaczMysli' },
    { label: 'Władca Zwierząt', value: 'WladcaZwierzat' },
    { label: 'Kultysta', value: 'Kultysta' },
    { label: 'Ssak', value: 'Ssak' },
  ];
  weaponModeOptions = [
    { label: '1H+1H', value: 'dual1h' },
    { label: '2H', value: '2h' },
  ];
  huntBonuses = ['Juggernaut', 'Ronin', 'Adrenalina', 'SokoleOko', 'Rzeźnik'];
  dailyBonuses = ['Brak', 'Klątwa Bogów', 'Noc Długich Noży', 'Noc Starych Bogów', 'Noc poszukiwaczy', 'Dzień Vlada', 'Dzień Gwiazd Północy', 'Świąteczna wizja Kaina', 'Świąteczna Wizja Kaina (deluxe)', 'Potrójna wizja Kaina', 'Pożeracz serc', 'Potęga hormonów', 'Dzień neandertalczyka', 'Pisanki Kaina', 'May the 4th be with you', 'Dzień Przemiany', 'Dzień poszukiwaczy', 'Świąteczna wizja Kaina (deluxe)', 'Więzy krwi', 'Krew z krwi', 'Wszyscy jesteśmy Francuzami', 'Pierwszy gol', 'Pierwszy serwis', 'Szczęście Sprzyja Lepszym', 'Tylko Dla Orłów', 'Zwycięzca Jest Tylko Jeden'];
  oneTimeBonuses = ['Brak', 'Krew wilka', 'Jabłko żelaznego drzewa', 'Płetwa rekina', 'Eliksir zmysłów', 'Święcona woda', 'Łza feniksa', 'Magiczna pieczęć', 'Serce nietoperza', 'Kwiat lotosu', 'Jad Wielkopchły', 'Serum oświecenia', 'Wywar z czarnego kota', 'Węgiel', 'Sierść kreta', 'Saletra', 'Sok z żuka', 'Esencja młodości', 'Paznokieć trolla', 'Wilcza jagoda', 'Oko kota', 'Absynt', 'Łuski salamandry', 'Woda źródlana', 'Kość męczennika', 'Napój miłosny', 'Jad skorpiona', 'Korzeń mandragory', 'Gwiezdny pył', 'Fiolka kwasu', 'Siarka', 'Czarny diament', 'Oko topielca', 'Boska łza', 'Ząb ghula', 'Wywar z koralowca', 'Serce proroka', 'Pazur bazyliszka', 'Łuski demona', 'Skrzydła chrząszcza', 'Maska gargulca', 'Sok z modliszki', 'Oddech smoka', 'Ząb wiedźmy', 'Grimoire', 'Czarna żółć', 'Palec kowala', 'Kwiat bzu', 'Ogień z serca ziemi'];
  private static readonly EXPANDED_STORAGE_KEY = 'expandedBonuses';
  private static readonly IMPORT_PROMPT_SHOWN_KEY = 'importChoicePromptShown';
  private static readonly EXPANDED_DEFAULTS: { [key: string]: boolean } = {
    silver: false, gold: false, hunt: true, daily: false, kaplica: false, oneTime: true,
    trening: true, talizmany: true, arkany: true, runy: true, umagi: true, blaszka: true, ewolucje: true,
    przeciwnik: true, inne: true, budynki: true,
    importTab: true, manualTab: true,
  };
  expandedBonuses: { [key: string]: boolean } = { ...CharacterInputComponent.EXPANDED_DEFAULTS };
  selectedHuntBonuses: string[] = [];
  selectedEventBonus: string | null = null;
  selectedOneTimeBonus: string | null = null;
  presetChartData: any = null;
  presetChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#ccc' } } },
    scales: {
      x: { title: { display: true, text: 'Runda', color: '#aaa' }, ticks: { color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.08)' } },
      y: { title: { display: true, text: 'Obrażenia', color: '#aaa' }, ticks: { color: '#aaa', stepSize: 50000 }, grid: { color: 'rgba(255,255,255,0.08)' } },
    },
  };
  readonly CHART_COLORS = ['#4fc3f7','#81c784','#ffb74d','#f06292','#ce93d8','#80cbc4'];
  presetSelections: boolean[] = [];
  readonly emptyChartData = { labels: Array.from({ length: 10 }, (_, i) => `R${i + 1}`), datasets: [] };

  // ── Import z gry ──
  showImportChoiceModal = false;
  readonly importSteps: ImportStepDef[] = [
    { key: 'trening', label: 'Trening', url: 'https://r20.bloodwars.pl/?a=training' },
    { key: 'main', label: 'Poziom / Rasa / Event', url: 'https://r20.bloodwars.pl/?a=main' },
    { key: 'equip', label: 'Ekwipunek', url: 'https://r20.bloodwars.pl/?a=equip' },
    { key: 'enchant', label: 'Umagicznienia', url: 'https://r20.bloodwars.pl/?a=enchant' },
    { key: 'talizman', label: 'Talizmany i Runy', url: 'https://r20.bloodwars.pl/?a=talizman' },
    { key: 'build', label: 'Budynki', url: 'https://r20.bloodwars.pl/?a=build' },
    { key: 'arenaSilver', label: 'Myśliwy / Ninja', url: 'https://r20.bloodwars.pl/?a=newarena&cat=4&t=silver' },
    { key: 'arenaGold', label: 'Strateg', url: 'https://r20.bloodwars.pl/?a=newarena&cat=4&t=gold' },
    { key: 'clanbld', label: 'Kaplica', url: 'https://r20.bloodwars.pl/?a=clanbld' },
    { key: 'huntClanBonus', label: 'Polowanie', url: 'https://r20.bloodwars.pl/?a=hunt&do=clanBonus' },
  ];
  importResults: Partial<Record<ImportStepDef['key'], ImportResult>> = {};
  importedSections: Record<string, boolean> = {
    trening: false, main: false, equip: false, enchant: false, talizman: false,
    build: false, arenaSilver: false, arenaGold: false, clanbld: false, huntClanBonus: false,
  };

  get importSummary(): { key: string; label: string; result: ImportResult | null }[] {
    return this.importSteps.map(s => ({ key: s.key, label: s.label, result: this.importResults[s.key] ?? null }));
  }
  /** ok, but the message flags unrecognized/skipped items — shown as a warning rather than a clean success. */
  isPartialImportResult(result: ImportResult | null | undefined): boolean {
    return !!result?.ok && result.message.includes('Uwaga:');
  }
  chooseManualImport() {
    this.showImportChoiceModal = false;
  }
  private runParserForKey(key: ImportStepDef['key'], html: string): ImportResult {
    switch (key) {
      case 'trening': return this.gameImportService.parseTraining(html);
      case 'main': return this.gameImportService.parseMain(html);
      case 'equip': return this.gameImportService.parseEquip(html);
      case 'enchant': return this.gameImportService.parseEnchant(html);
      case 'talizman': return this.gameImportService.parseTalizman(html);
      case 'build': return this.gameImportService.parseBuild(html);
      case 'arenaSilver': return this.gameImportService.parseArenaSilver(html);
      case 'arenaGold': return this.gameImportService.parseArenaGold(html);
      case 'clanbld': return this.gameImportService.parseClanBld(html);
      case 'huntClanBonus': return this.gameImportService.parseHuntClanBonus(html);
    }
  }

  // ── Import z gry: wklejenie jednego zbiorczego JSON-a (np. ze skryptu Tampermonkey) ──
  showImportBulkModal = false;
  importBulkInput = '';
  importBulkError: string | null = null;
  private clearForBulkImport() {
    this.characterService.clearCharacter();
    this.importedSections = {
      trening: false, main: false, equip: false, enchant: false, talizman: false,
      build: false, arenaSilver: false, arenaGold: false, clanbld: false, huntClanBonus: false,
    };
    this.importResults = {};
    this.importBulkInput = '';
    this.importBulkError = null;
  }
  chooseBulkImport() {
    this.showImportChoiceModal = false;
    this.clearForBulkImport();
    this.showImportBulkModal = true;
  }
  reopenImportBulkModal() {
    if (!confirm('To wyczyści bieżącą postać przed wklejeniem nowych danych. Kontynuować?')) return;
    this.clearForBulkImport();
    this.showImportBulkModal = true;
  }
  parseBulkImport() {
    this.importBulkError = null;
    const raw = this.importBulkInput.trim();
    if (!raw) {
      this.importBulkError = 'Nie wklejono żadnych danych.';
      return;
    }
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      this.importBulkError = 'Nie udało się odczytać wklejonego tekstu jako JSON. Upewnij się, że skopiowano całą zawartość ze skryptu (przycisk "Skopiowano do schowka").';
      return;
    }
    const pages = parsed?.pages ?? parsed;
    if (!pages || typeof pages !== 'object') {
      this.importBulkError = 'Wklejony JSON nie ma oczekiwanej struktury ({ pages: { ... } }).';
      return;
    }
    let anyApplied = false;
    for (const step of this.importSteps) {
      const page = pages[step.key];
      if (!page) continue;
      const html: string | undefined = typeof page === 'string' ? page : page.html;
      if (!html) {
        this.importResults[step.key] = { ok: false, message: page?.error ? `Skrypt zgłosił błąd pobierania: ${page.error}` : 'Brak danych HTML dla tej strony w pliku.' };
        continue;
      }
      const result = this.runParserForKey(step.key, html);
      this.importResults[step.key] = result;
      if (result.ok && result.data) {
        this.applyImportData(result.data);
        this.importedSections[step.key] = true;
        anyApplied = true;
      }
    }
    if (!anyApplied) {
      this.importBulkError = 'Nie udało się zaimportować żadnej sekcji — sprawdź podsumowanie poniżej dla szczegółów.';
    }
  }
  finishBulkImport() {
    this.showImportBulkModal = false;
  }
  private applyImportData(data: { [key: string]: any }) {
    if (!this.character) return;
    const patch: any = {};
    const fields = [
      'attributes', 'poziom', 'rasa', 'eventBonus', 'equipment', 'talizmanLevels', 'arcaneLevels',
      'runeValues', 'umagiValues', 'posredniak', 'domPubliczny', 'rzeznia', 'ninja', 'mysliwy',
      'strateg', 'kaplica', 'huntBonuses',
    ];
    for (const field of fields) {
      if (data[field] !== undefined) patch[field] = data[field];
    }
    if (Object.keys(patch).length) {
      this.characterService.updateCharacter(patch);
    }
    if (data['eventBonus'] !== undefined) this.selectedEventBonus = data['eventBonus'];
    if (data['runeValues']) this.selectedRunes = data['runeValues'];
    if (data['umagiValues']) this.selectedUmagi = data['umagiValues'];
    if (data['huntBonuses']) this.selectedHuntBonuses = data['huntBonuses'];
    if (data['equipment']?.weaponMode) this.weaponMode = data['equipment'].weaponMode;
  }
  constructor(private characterService: CharacterService, private ngZone: NgZone, private cdr: ChangeDetectorRef, private dashboardService: DashboardService, private gameImportService: GameImportService) { }

  openPresetsModal() {
    if (!this.presetSelections.length) {
      this.presetSelections = this.presets.map(() => true);
    }
    this.buildAllPresetsChart();
    this.showPresetsModal = true;
  }

  togglePresetSelection(index: number) {
    this.presetSelections[index] = !this.presetSelections[index];
    this.buildAllPresetsChart();
  }

  private buildAllPresetsChart() {
    const datasets = this.presets
      .map((preset, i) => {
        const perWeapon = this.dashboardService.calculateStuff(preset.character).roundsPerWeapon ?? [];
        const rounds = perWeapon.length
          ? perWeapon[0].rounds.map((_, r) => perWeapon.reduce((sum, w) => sum + (w.rounds[r] ?? 0), 0))
          : [];
        return { preset, i, rounds };
      })
      .filter(({ i, rounds }) => this.presetSelections[i] && rounds.length > 0)
      .map(({ preset, i, rounds }) => ({
        label: preset.name,
        data: rounds,
        borderColor: this.CHART_COLORS[i % this.CHART_COLORS.length],
        backgroundColor: this.CHART_COLORS[i % this.CHART_COLORS.length] + '33',
        tension: 0.3,
        fill: false,
        pointRadius: 4,
      }));

    if (!datasets.length) { this.presetChartData = null; return; }
    const roundCount = datasets[0].data.length;
    this.presetChartData = {
      labels: Array.from({ length: roundCount }, (_, i) => `R${i + 1}`),
      datasets,
    };
  }
  ngOnInit() {
    try {
      const saved = localStorage.getItem(CharacterInputComponent.EXPANDED_STORAGE_KEY);
      if (saved) {
        this.expandedBonuses = { ...CharacterInputComponent.EXPANDED_DEFAULTS, ...JSON.parse(saved) };
      }
    } catch { }
    this.characterService.getCharacter$().subscribe(char => {
      this.character = char;
      if (char) {
        this.selectedHuntBonuses = [...(char.huntBonuses || [])];
        this.selectedEventBonus = char.eventBonus || null;
        this.selectedOneTimeBonus = char.oneTimeBonus || null;
      }
      if (char?.runeValues) {
        this.selectedRunes = [...char.runeValues];
      }
      if ((char as any)?.umagiValues) {
        this.selectedUmagi = [...(char as any).umagiValues];
      }
      if (char?.equipment?.weaponMode) {
        this.weaponMode = char.equipment.weaponMode;
      }
    });
    try {
      if (!sessionStorage.getItem(CharacterInputComponent.IMPORT_PROMPT_SHOWN_KEY)) {
        sessionStorage.setItem(CharacterInputComponent.IMPORT_PROMPT_SHOWN_KEY, '1');
        this.showImportChoiceModal = true;
      }
    } catch {
      this.showImportChoiceModal = true;
    }
  }

  private getSlotCategory(slot: string): SlotCategory {
    if (slot === 'weapon1' || slot === 'weapon2') {
      return this.weaponMode === '2h' ? 'weapon2h' : 'weapon1h';
    }
    return SLOT_TO_CATEGORY[slot] ?? 'head';
  }
  baseItemsForSlot(slot: string): BaseItemDef[] {
    const cat = this.getSlotCategory(slot);
    return BASE_ITEMS.filter(b => b.category === cat);
  }
  get baseItems2h(): BaseItemDef[] {
    return BASE_ITEMS.filter(b => b.category === 'weapon2h');
  }
  prefixesForDraft(draft: EquipmentItem, slot: string): string[] {
    if (!draft.base) return [];
    const def = BASE_ITEMS.find(b => b.name === draft.base);
    if (!def || !def.hasPrefix) return [];
    return PREFIXES_BY_CATEGORY[def.category] ?? [];
  }
  suffixesForDraft(draft: EquipmentItem, slot: string): string[] {
    if (!draft.base) return [];
    const def = BASE_ITEMS.find(b => b.name === draft.base);
    if (!def || !def.hasSuffix) return [];
    return SUFFIXES_BY_CATEGORY[def.category] ?? [];
  }
  draftHasPrefix(draft: EquipmentItem): boolean {
    if (!draft.base) return false;
    return !!BASE_ITEMS.find(b => b.name === draft.base)?.hasPrefix;
  }
  draftHasSuffix(draft: EquipmentItem): boolean {
    if (!draft.base) return false;
    return !!BASE_ITEMS.find(b => b.name === draft.base)?.hasSuffix;
  }
  onBaseChange(draft: EquipmentItem) {
    draft.prefix = null;
    draft.suffix = null;
  }
  buildItemLabel(item: EquipmentItem | undefined | null): string {
    if (!item || !item.base) return '';
    const parts: string[] = [];
    if (item.rarity) parts.push(item.rarity);
    if (item.prefix) parts.push(item.prefix);
    parts.push(item.base);
    if (item.suffix) parts.push(item.suffix);
    return parts.join(' ');
  }
  slotButtonLabel(slot: string): string {
    if (!this.character) return this.defaultSlotLabel(slot);
    const item = (this.character.equipment as any)[slot] as EquipmentItem | undefined;
    if (item && item.base) {
      if (item.prefix == null) {
        item.prefix = ''
      }
      if (item.suffix == null) {
        item.suffix = ''
      }
      return item.prefix + ' ' + item.base + ' ' + item.suffix;
    }
    return this.defaultSlotLabel(slot);
  }
  defaultSlotLabel(slot: string): string {
    const labels: Record<string, string> = {
      head: 'Głowa', chest: 'Tułów', legs: 'Nogi',
      neck: 'Szyja', finger1: 'Palec 1', finger2: 'Palec 2',
      weapon1: '1H Lewy', weapon2: this.weaponMode === '2h' ? '2H' : '1H Prawy',
    };
    return labels[slot] ?? slot;
  }
  getEquipmentTooltip(slot: string, playerLvl: number): string {
    const item = (this.character?.equipment as any)?.[slot] as EquipmentItem | undefined;
    if (!item || !item.base) return '';
    try {
      const itemType = item.base as ItemType;
      const playerLvl = this.character?.poziom || 1;
      const rarity = (item.rarity || 'ZWYKLY') as ItemRarity;
      const genre = this.getGenreForItemType(itemType);
      const isWeapon = [ItemGenre.RANGE_1H, ItemGenre.RANGE_2H, ItemGenre.WHITE_1H, ItemGenre.WHITE_2H, ItemGenre.GUN_1H, ItemGenre.GUN_2H].includes(genre);
      let combinedStats: Stats = isWeapon ? new WeaponStats() : new Stats();
      let base: Base | undefined;
      try {
        base = BaseDictionary.getBase(genre, itemType);
        if (isWeapon) {
          (combinedStats as WeaponStats).addWeaponStats(base.stats as WeaponStats);
        } else {
          combinedStats.addStats(base.stats);
        }
      } catch (e) {
      }
      if (item.prefix && item.prefix.trim()) {
        try {
          const prefixType = this.getPrefixTypeByName(item.prefix);
          const dictionaryType = this.getDictionaryForGenre(genre);
          let prefixStats: any = null;
          switch (dictionaryType) {
            case 'weapon':
              prefixStats = WeaponDictionary.getWeaponPrefix(genre, prefixType);
              break;
            case 'armour':
              if (genre === ItemGenre.LEGS) {
                prefixStats = ArmourDictionary.getLegsPrefix(genre, itemType, prefixType);
              } else {
                prefixStats = ArmourDictionary.getArmourPrefix(genre, prefixType);
              }
              break;
            case 'jewel':
              prefixStats = JewelsDictionary.getJewelPrefix(genre, prefixType);
              break;
          }
          if (prefixStats) {
            if (isWeapon) {
              (combinedStats as WeaponStats).addWeaponStats(prefixStats.stats as WeaponStats);
            } else {
              combinedStats.addStats(prefixStats.stats);
            }
          }
        } catch (e) {
        }
      }
      if (item.suffix && item.suffix.trim()) {
        try {
          const suffixType = this.getSuffixTypeByName(item.suffix);
          const dictionaryType = this.getDictionaryForGenre(genre);
          let suffixStats: any = null;
          switch (dictionaryType) {
            case 'weapon':
              suffixStats = WeaponDictionary.getWeaponSuffix(genre, suffixType);
              break;
            case 'armour':
              suffixStats = ArmourDictionary.getArmourSuffix(genre, suffixType, playerLvl);
              break;
            case 'jewel':
              suffixStats = JewelsDictionary.getJewelSuffix(genre, suffixType);
              break;
          }
          if (suffixStats) {
            if (isWeapon) {
              (combinedStats as WeaponStats).addWeaponStats(suffixStats.stats as WeaponStats);
            } else {
              combinedStats.addStats(suffixStats.stats);
            }
          }
        } catch (e) {
        }
      }
      if (genre == ItemGenre.RANGE_1H || genre == ItemGenre.RANGE_2H || genre == ItemGenre.WHITE_1H || genre == ItemGenre.WHITE_2H || genre == ItemGenre.GUN_2H || genre == ItemGenre.GUN_1H) {
        const multipliedStats = applyQualityWeaponMultiplier(combinedStats, rarity, genre, playerLvl);
        return JSON.stringify(this.extractStats(multipliedStats), null, 2);
      } else {
        const multipliedStats = applyQualityMultiplier(combinedStats, rarity, playerLvl, base);
        return JSON.stringify(this.extractStats(multipliedStats), null, 2);
      }
    } catch (error) {
      return '';
    }
  }
  private getPrefixTypeByName(name: string): PrefixType {
    const normalized = name.replace(/\s+/g, '').toLowerCase();
    const found = Object.values(PrefixType).find(v => v.replace(/\s+/g, '').toLowerCase() === normalized);
    if (!found) {
      throw new Error(`Prefix type not found: ${name}`);
    }
    return found;
  }
  private getSuffixTypeByName(name: string): SuffixType {
    const normalized = name.replace(/\s+/g, '').toLowerCase();
    const found = Object.values(SuffixType).find(v => v.replace(/\s+/g, '').toLowerCase() === normalized);
    if (!found) {
      throw new Error(`Suffix type not found: ${name}`);
    }
    return found;
  }
  private getGenreForItemType(itemType: ItemType): ItemGenre {
    const legTypes = [ItemType.SZORTY, ItemType.SPODNIE, ItemType.SPODNICA, ItemType.KILT];
    const chestTypes = [ItemType.KURTKA, ItemType.KAMIZELKA, ItemType.KOLCZUGA, ItemType.ZBROJAWARSTWOWA, ItemType.KOSZULKA, ItemType.MARYNARKA, ItemType.PELNAZBROJA, ItemType.PELERYNA, ItemType.GORSET, ItemType.SMOKING];
    const headTypes = [ItemType.CZAPKA, ItemType.KASK, ItemType.HELM, ItemType.MASKA, ItemType.OBRECZ, ItemType.KOMINIARKA, ItemType.KAPELUSZ, ItemType.KORONA, ItemType.OPASKA, ItemType.BANDANA];
    const ringTypes = [ItemType.PIERSCIEN, ItemType.SYGNET, ItemType.BRANSOLETA];
    const neckTypes = [ItemType.AMULET, ItemType.LANCUCH, ItemType.NASZYJNIK, ItemType.KRAWAT, ItemType.APASZKA];
    const melee1hTypes = [ItemType.PALKA, ItemType.NOZ, ItemType.SZTYLET, ItemType.RAPIER, ItemType.MIECZ, ItemType.TOPOR, ItemType.KASTET, ItemType.KAMA, ItemType.PIESCNIEBIOS, ItemType.WAKIZASHI];
    const melee2hTypes = [ItemType.MACZUGA, ItemType.LOM, ItemType.PIKA, ItemType.TOPORDWURECZNY, ItemType.MIECZDWURECZNY, ItemType.KOSA, ItemType.KORBACZ, ItemType.HALABARDA, ItemType.KATANA, ItemType.PILALANCUCHOWA];
    const gun1hTypes = [ItemType.GLOCK, ItemType.MAGNUM, ItemType.DESERT_EAGLE, ItemType.BERETTA, ItemType.UZI, ItemType.MP5K, ItemType.SKORPION];
    const gun2hTypes = [ItemType.KARABINMYSLIWSKI, ItemType.STRZELBA, ItemType.AK47, ItemType.MIOTACZPLOMIENI, ItemType.FN_FAL, ItemType.POLAUTOMATSNAJPERSKI, ItemType.KARABINSNAJPERSKI];
    const range1hTypes = [ItemType.KROTKILUK, ItemType.LUK, ItemType.DLUGILUK, ItemType.NOZDORZUCANIA, ItemType.TOPOREKDORZUCANIA, ItemType.SHURIKEN];
    const range2hTypes = [ItemType.KUSZA, ItemType.CIEZKAKUSZA, ItemType.LUKREFLEKSYJNY, ItemType.OSZCZEP, ItemType.PILUM];
    if (legTypes.includes(itemType)) return ItemGenre.LEGS;
    if (chestTypes.includes(itemType)) return ItemGenre.CHEST;
    if (headTypes.includes(itemType)) return ItemGenre.HEAD;
    if (ringTypes.includes(itemType)) return ItemGenre.FINGER;
    if (neckTypes.includes(itemType)) return ItemGenre.NECK;
    if (melee1hTypes.includes(itemType)) return ItemGenre.WHITE_1H;
    if (melee2hTypes.includes(itemType)) return ItemGenre.WHITE_2H;
    if (gun1hTypes.includes(itemType)) return ItemGenre.GUN_1H;
    if (gun2hTypes.includes(itemType)) return ItemGenre.GUN_2H;
    if (range1hTypes.includes(itemType)) return ItemGenre.RANGE_1H;
    if (range2hTypes.includes(itemType)) return ItemGenre.RANGE_2H;
    throw new Error(`Unknown item type: ${itemType}`);
  }
  private getDictionaryForGenre(genre: ItemGenre): 'weapon' | 'armour' | 'jewel' {
    const weaponGenres = [ItemGenre.WHITE_1H, ItemGenre.WHITE_2H, ItemGenre.GUN_1H, ItemGenre.GUN_2H, ItemGenre.RANGE_1H, ItemGenre.RANGE_2H];
    const armourGenres = [ItemGenre.HEAD, ItemGenre.CHEST, ItemGenre.LEGS];
    const jewelGenres = [ItemGenre.NECK, ItemGenre.FINGER];
    if (weaponGenres.includes(genre)) return 'weapon';
    if (armourGenres.includes(genre)) return 'armour';
    if (jewelGenres.includes(genre)) return 'jewel';
    throw new Error(`Unknown genre: ${genre}`);
  }
  private extractStats(stats: any): Record<string, any> {
    const result: Record<string, any> = {};
    if (!stats) return result;
    const statProps = [
      'trafienieBiala', 'atakiBiala', 'minDpsBiala1h', 'maxDpsBiala1h', 'minDpsBiala2h', 'maxDpsBiala2h',
      'critChanceBiala1h', 'critChanceBiala2h', 'critMultiBiala1h', 'unikBiala',
      'atakiPalna', 'trafieniePalna', 'minDpsPalna1h', 'maxDpsPalna1h', 'minDpsPalna2h', 'maxDpsPalna2h',
      'critChancePalna1h', 'critChancePalna2h', 'ignoreObrony',
      'atakiDystans1h', 'atakiDystans2h', 'trafienieDystans', 'minDpsDystans1h', 'maxDpsDystans1h', 'minDpsDystans2h', 'maxDpsDystans2h',
      'critChanceDystans', 'unikDystans',
      'obronaPrzedmiotow', 'obronaDodatkowa', 'twardosc', 'redukcjaObrazen', 'mnoznikObrony', 'odpornosc',
      'sila', 'zwinnosc', 'spostrzegawczosc', 'inteligencja', 'wiedza', 'wyglad', 'charyzma', 'wplywy',
      'punktyZycia', 'punktyKrwi', 'szczescie',
      'critMultiDystans1h',
      'critMultiDystans2h',
      'critMultiPalna1h',
      'critMultiPalna2h',
      'critMultiBiala2h',
      'trafienieProcentoweDystans',
      'trafienieProcentowePalna',
      'trafienieProcentoweBiala',
    ];
    statProps.forEach(prop => {
      if (stats[prop] !== undefined && stats[prop] !== null && stats[prop] !== 0) {
        result[prop] = stats[prop];
      }
    });
    return result;
  }
  get weapon2Locked(): boolean {
    return this.weaponMode === '2h';
  }
  openEquipmentModal(slot: string) {
    if (slot === 'weapon2' && this.weaponMode === '2h') return;
    this.selectedEquipmentSlot = slot;
    const existing = this.character?.equipment
      ? (this.character.equipment as any)[slot] as EquipmentItem | undefined
      : undefined;
    this.draftItem = existing
      ? { ...existing }
      : { rarity: null, prefix: null, base: null, suffix: null };
    this.showEquipmentModal = true;
  }
  toggleWeaponMode() {
    this.weaponMode = this.weaponMode === 'dual1h' ? '2h' : 'dual1h';
    this.applyWeaponMode(this.weaponMode);
  }
  onWeaponModeChange(newMode: 'dual1h' | '2h') {
    this.applyWeaponMode(newMode);
  }
  private applyWeaponMode(mode: 'dual1h' | '2h') {
    if (!this.character) return;
    const updated: any = { ...this.character.equipment, weaponMode: mode };
    if (mode === '2h') updated.weapon2 = undefined;
    this.characterService.updateCharacter({ ...this.character, equipment: updated });
  }
  saveEquipmentItem() {
    if (!this.character) return;
    const updated = {
      ...this.character.equipment,
      [this.selectedEquipmentSlot]: { ...this.draftItem },
      weaponMode: this.weaponMode,
    };
    this.characterService.updateCharacter({ ...this.character, equipment: updated });
    this.showEquipmentModal = false;
  }

  getAttrValue(key: string): number {
    if (!this.character) return 0;
    return (this.character.attributes as any)[key] || 0;
  }
  setAttrValue(key: string, value: number) {
    this.characterService.updateAttributes({ [key]: value } as any);
  }
  getEvoValue(key: string): number {
    if (!this.character) return 0;
    return (this.character.evolutions as any)[key] || 0;
  }
  setEvoValue(key: string, value: number) {
    this.characterService.updateEvolutions({ [key]: value } as any);
  }
  getTalizmanValue(key: string): number {
    if (!this.character) return 0;
    return (this.character.talizmanLevels as any)[key] || 0;
  }
  setTalizmanValue(key: string, value: number) {
    this.characterService.updateTalizmanLevels({ [key]: value } as any);
  }
  getArcaneValue(key: string): any {
    if (!this.character) return 0;
    return (this.character.arcaneLevels as any)[key] || 0;
  }
  setArcaneValue(key: string, value: any) {
    this.characterService.updateArcaneLevels({ [key]: value } as any);
  }
  updateCharacterField(field: string, value: any) {
    if (this.character) {
      this.characterService.updateCharacter({ ...this.character, [field]: value });
    }
  }
  closeModal() {
    this.showEquipmentModal = false;
    this.showRunesModal = false;
    this.showUmagiModal = false;
  }
  importCharacter() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const imported = JSON.parse(event.target.result);
          this.ngZone.run(() => {
            if (imported?.bonusValues && !imported?.huntBonuses) {
              imported.huntBonuses = imported.bonusValues.hunt || [];
              imported.eventBonus = imported.bonusValues.daily || null;
              imported.oneTimeBonus = imported.bonusValues.oneTime || null;
              delete imported.bonusValues;
            }
            this.characterService.updateCharacter(imported);
            if (imported) {
              this.selectedHuntBonuses = imported.huntBonuses || [];
              this.selectedEventBonus = imported.eventBonus || null;
              this.selectedOneTimeBonus = imported.oneTimeBonus || null;
            }
            if (imported?.runeValues) {
              this.selectedRunes = imported.runeValues;
            }
            if (imported?.umagiValues) {
              this.selectedUmagi = imported.umagiValues;
            }
            if (imported?.equipment?.weaponMode) {
              this.weaponMode = imported.equipment.weaponMode;
            }
            this.cdr.detectChanges();
          });
        } catch (error) {
          console.error('Error importing character:', error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
  clearSession() {
    if (!confirm('Czy na pewno chcesz zresetować postać?')) return;
    this.characterService.clearCharacter();
    this.importedSections = {
      trening: false, main: false, equip: false, enchant: false, talizman: false,
      build: false, arenaSilver: false, arenaGold: false, clanbld: false, huntClanBonus: false,
    };
    this.importResults = {};
  }
  loadPreset(preset: CharacterPreset) {
    this.characterService.updateCharacter(preset.character);
    this.weaponMode = preset.character.equipment?.weaponMode ?? 'dual1h';
    this.showPresetsModal = false;
  }
  async exportCharacter() {
    if (!this.character) return;
    const dataStr = JSON.stringify(this.character, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: `character-${Date.now()}.json`,
          types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(dataBlob);
        await writable.close();
      } catch (e: any) {
        if (e.name !== 'AbortError') throw e;
      }
    } else {
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `character-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  toggleBonusExpand(bonusType: string) {
    this.expandedBonuses[bonusType] = !this.expandedBonuses[bonusType];
    localStorage.setItem(CharacterInputComponent.EXPANDED_STORAGE_KEY, JSON.stringify(this.expandedBonuses));
  }
  toggleBonusSelection(bonusType: string, bonus: string, isSingleSelect = false) {
    if (bonusType === 'hunt') {
      const index = this.selectedHuntBonuses.indexOf(bonus);
      if (index >= 0) this.selectedHuntBonuses.splice(index, 1);
      else this.selectedHuntBonuses.push(bonus);
    } else if (bonusType === 'daily') {
      this.selectedEventBonus = this.selectedEventBonus === bonus ? null : bonus;
    } else if (bonusType === 'oneTime') {
      this.selectedOneTimeBonus = this.selectedOneTimeBonus === bonus ? null : bonus;
    }
    if (this.character) {
      this.characterService.updateCharacter({
        ...this.character,
        huntBonuses: this.selectedHuntBonuses,
        eventBonus: this.selectedEventBonus,
        oneTimeBonus: this.selectedOneTimeBonus
      });
    }
  }
  onEventBonusChange(value: string): void {
    this.selectedEventBonus = value === 'Brak' ? null : value;
    if (this.character) {
      this.characterService.updateCharacter({ ...this.character, eventBonus: this.selectedEventBonus });
    }
  }
  onOneTimeBonusChange(value: string): void {
    this.selectedOneTimeBonus = value === 'Brak' ? null : value;
    if (this.character) {
      this.characterService.updateCharacter({ ...this.character, oneTimeBonus: this.selectedOneTimeBonus });
    }
  }
  isBonusSelected(bonusType: string, bonus: string): boolean {
    if (bonusType === 'hunt') {
      return this.selectedHuntBonuses.includes(bonus);
    } else if (bonusType === 'daily') {
      return this.selectedEventBonus === bonus;
    } else if (bonusType === 'oneTime') {
      return this.selectedOneTimeBonus === bonus;
    }
    return false;
  }

  /** Whether a collapsible section currently holds non-default data, for the "filled tab" indicator. */
  isSectionFilled(key: string): boolean {
    if (!this.character) return false;
    switch (key) {
      case 'main':
        return this.character.poziom > 0 || !!this.character.rasa;
      case 'trening':
        return this.attributes.some(a => this.getAttrValue(a.key) > 0);
      case 'talizmany':
        return this.talizmanAttributes.some(t => this.getTalizmanValue(t.key) > 0);
      case 'arkany':
        return this.arcaneAttributes.some(a => {
          const v = this.getArcaneValue(a.key);
          return typeof v === 'boolean' ? v : v > 0;
        });
      case 'ewolucje':
        return this.evolutions.some(e => this.getEvoValue(e.key) > 0);
      case 'runy':
        return (this.character.runeValues?.length ?? 0) > 0;
      case 'umagi':
        return (this.character.umagiValues?.length ?? 0) > 0;
      case 'equip':
        return !!(this.character.equipment?.head?.base || this.character.equipment?.chest?.base
          || this.character.equipment?.legs?.base || this.character.equipment?.neck?.base
          || this.character.equipment?.finger1?.base || this.character.equipment?.finger2?.base
          || this.character.equipment?.weapon1?.base || this.character.equipment?.weapon2?.base);
      case 'przeciwnik':
        return this.character.obronaPrzeciwnika > 0 || this.character.odpornoscPrzeciwnika > 0
          || this.character.trafieniePrzeciwnika > 0 || this.character.szczesciePrzeciwnika > 0;
      case 'inne':
        return this.character.ninja > 0 || this.character.mysliwy > 0
          || this.character.strateg > 0 || this.character.kaplica > 0 || !!this.character.eventBonus
          || this.character.poziom > 0 || !!this.character.rasa;
      case 'budynki':
        return this.character.posredniak > 0 || this.character.domPubliczny > 0 || this.character.rzeznia > 0;
      case 'hunt':
        return (this.character.huntBonuses?.length ?? 0) > 0;
      case 'daily':
        return !!this.character.eventBonus;
      case 'oneTime':
        return !!this.character.oneTimeBonus;
      case 'blaszka':
        return !!(this.character.blaszkaZaMoba || this.character.blaszkaZaKronosa || this.character.blaszkaZaHastura);
      default:
        return false;
    }
  }

  get filteredRuneOptions(): string[] {
    if (!this.runeFilter.trim()) return this.runeOptions;
    const f = this.runeFilter.toLowerCase();
    return this.runeOptions.filter(r => r.toLowerCase().includes(f));
  }
  openRunesModal() {
    this.selectedRunes = this.character?.runeValues ? [...this.character.runeValues] : [];
    this.runeFilter = '';
    this.selectedRuneIndex = null;
    this.showRunesModal = true;
  }
  addRune(rune: string) { this.selectedRunes = [...this.selectedRunes, rune]; }
  removeRuneAt(index: number) {
    this.selectedRunes = this.selectedRunes.filter((_, i) => i !== index);
    if (this.selectedRuneIndex === index) this.selectedRuneIndex = null;
    else if (this.selectedRuneIndex !== null && this.selectedRuneIndex > index) this.selectedRuneIndex--;
  }
  moveRuneUp(index: number) {
    if (index === 0) return;
    const r = [...this.selectedRunes];
    [r[index - 1], r[index]] = [r[index], r[index - 1]];
    this.selectedRunes = r;
    this.selectedRuneIndex = index - 1;
  }
  moveRuneDown(index: number) {
    if (index >= this.selectedRunes.length - 1) return;
    const r = [...this.selectedRunes];
    [r[index], r[index + 1]] = [r[index + 1], r[index]];
    this.selectedRunes = r;
    this.selectedRuneIndex = index + 1;
  }
  saveRunes() {
    if (this.character) {
      this.characterService.updateCharacter({ ...this.character, runeValues: [...this.selectedRunes] });
    }
    this.showRunesModal = false;
  }
  getRuneCount(rune: string): number { return this.selectedRunes.filter(r => r === rune).length; }

  get filteredUmagiOptions(): string[] {
    if (!this.umagiFilter.trim()) return this.umagiOptions;
    const f = this.umagiFilter.toLowerCase();
    return this.umagiOptions.filter(u => u.toLowerCase().includes(f));
  }
  openUmagiModal() {
    this.selectedUmagi = (this.character as any)?.umagiValues ? [...(this.character as any).umagiValues] : [];
    this.umagiFilter = '';
    this.selectedUmagiIndex = null;
    this.showUmagiModal = true;
  }
  addUmagi(umagi: string) { this.selectedUmagi = [...this.selectedUmagi, umagi]; }
  removeUmagiAt(index: number) {
    this.selectedUmagi = this.selectedUmagi.filter((_, i) => i !== index);
    if (this.selectedUmagiIndex === index) this.selectedUmagiIndex = null;
    else if (this.selectedUmagiIndex !== null && this.selectedUmagiIndex > index) this.selectedUmagiIndex--;
  }
  moveUmagiUp(index: number) {
    if (index === 0) return;
    const list = [...this.selectedUmagi];
    [list[index - 1], list[index]] = [list[index], list[index - 1]];
    this.selectedUmagi = list;
    this.selectedUmagiIndex = index - 1;
  }
  moveUmagiDown(index: number) {
    if (index >= this.selectedUmagi.length - 1) return;
    const list = [...this.selectedUmagi];
    [list[index], list[index + 1]] = [list[index + 1], list[index]];
    this.selectedUmagi = list;
    this.selectedUmagiIndex = index + 1;
  }
  saveUmagi() {
    if (this.character) {
      this.characterService.updateCharacter({ ...this.character, umagiValues: [...this.selectedUmagi] } as any);
    }
    this.showUmagiModal = false;
  }
  getUmagiCount(umagi: string): number { return this.selectedUmagi.filter(u => u === umagi).length; }

  // ── Przeciwnik reference lookup ──
  onRefMapModeChange(): void {
    this.refActMobName = null;
    this.refStarMobName = null;
    this.refAct = null;
    this.refStar = null;
  }

  onRefMobChange(): void {
    this.refAct = null;
    this.refStar = null;
  }

  get refActMob(): ActMob | null {
    return ACT_MOBS.find(m => m.name === this.refActMobName) ?? null;
  }

  get refStarMob(): StarMob | null {
    return STAR_MOBS.find(m => m.name === this.refStarMobName) ?? null;
  }

  /** Acts the currently picked M1 mob actually has data for. */
  get refActOptions(): { label: string; value: number }[] {
    const mob = this.refActMob;
    if (!mob) return [];
    return mob.acts
      .map((a, i) => (a ? { label: `Akt ${i + 1}`, value: i + 1 } : null))
      .filter((o): o is { label: string; value: number } => o !== null);
  }

  /** The 5 reference stats for the currently selected mob + act/star, or null if nothing picked yet. */
  get refStats(): MobStats | null {
    if (this.refMapMode === 'M1' && this.refActMob && this.refAct) {
      return this.refActMob.acts[this.refAct - 1] ?? null;
    }
    if (this.refMapMode === 'M2' && this.refStarMob && this.refStar) {
      const star = this.refStar;
      const mob = this.refStarMob;
      return {
        obrona: scaledRangeForStar(mob, 'obrona', star),
        odpornosc: scaledRangeForStar(mob, 'odpornosc', star),
        zwinnosc: scaledRangeForStar(mob, 'zwinnosc', star),
        spostrzegawczosc: scaledRangeForStar(mob, 'spostrzegawczosc', star),
        szczescie: scaledRangeForStar(mob, 'szczescie', star),
        zycie: null,
      };
    }
    return null;
  }

  formatRefRange(r: StatRange | null): string {
    return formatMobRange(r);
  }
}
