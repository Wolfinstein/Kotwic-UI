import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPEDITION_TOWERS, ExpeditionTower } from '../../data/ekspedycjaData';
import { SavedCharactersService, SavedCharacter } from '../../services/saved-characters.service';
import { rasaAvatarUrl, rasaLabel as rasaDisplayLabel } from '../../data/avatars';
import { DashboardService } from '../../services/calculate';
import { simulateExpedition, ExpeditionResult, computeCombatPreview, CombatPreview, CombatPreviewWeapon, MobStatVariant, CombatAttackLog, CombatantSummary, AddSummary } from '../../logic/expeditionCombat';
import { mobImplementationStatus, MobImplementationStatus } from '../../data/mobCombatProfiles';
import { encodeCharactersToShareCode, decodeShareCode, SharedCharacterEntry } from '../../services/character-share.util';
import { ExpeditionLogService } from '../../services/expedition-log.service';

type VolumeLevel = 'low' | 'mid' | 'high';
type ExpeditionStep = 'players' | 'towers' | 'combat';

interface BulkSimPlayerResult {
  name: string;
  survivalRate: number;
  avgDamage: number;
}

interface BulkSimResult {
  total: number;
  wins: number;
  losses: number;
  draws: number;
  players: BulkSimPlayerResult[];
}

const BULK_SIM_RUNS = 1000;
const YOG_SOTHOTH_BULK_SIM_RUNS = 50;

const VOLUME_LEVELS: VolumeLevel[] = ['low', 'mid', 'high'];
const VOLUME_VALUES: Record<VolumeLevel, number> = { low: 0.25, mid: 0.6, high: 1 };
const VOLUME_LABELS: Record<VolumeLevel, string> = { low: 'Cicho', mid: 'Średnio', high: 'Głośno' };

// Same palette used for the color dots in the Postacie list (Kalkulator Postaci).
const PLAYER_COLORS = ['#4fc3f7', '#81c784', '#ffb74d', '#f06292', '#ce93d8', '#80cbc4'];
/** Combat-log line color for every player, regardless of which one. */
const PLAYER_LOG_COLOR = '#2979ff';
/** Combat-log line color for the mob — always the same, regardless of which mob it is. */
const MOB_LOG_COLOR = '#ff1744';
/** Combat-log line color for talisman/arcane special-effect activations (Groza, Tchnienie Śmierci, ...), regardless of which player triggered it. */
const SPECIAL_EFFECT_LOG_COLOR = '#00e676';

@Component({
  selector: 'app-ekspedycja',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ekspedycja.component.html',
  styleUrl: './ekspedycja.component.css',
})
export class EkspedycjaComponent implements OnInit, OnDestroy {
  readonly towers = EXPEDITION_TOWERS;
  step: ExpeditionStep = 'players';
  players: SavedCharacter[] = [];
  selectedPlayerIds: string[] = [];
  /** null = show all; otherwise only players whose tag matches exactly. */
  playerTagFilter: string | null = null;

  selectedTower: ExpeditionTower | null = null;
  selectedMobName: string | null = null;
  combatResult: ExpeditionResult | null = null;
  combatPreview: CombatPreview | null = null;
  bulkSimResult: BulkSimResult | null = null;
  /** One losing run from the last bulk simulation, kept so the user can inspect an example defeat instead of just the win/loss tally. */
  sampleLossResult: ExpeditionResult | null = null;
  /** One winning run from the last bulk simulation, but only kept when winning is rare (≤5% of runs) — an example of how a hard-to-pull-off win actually happened is useful; when winning is already the common outcome, there's nothing notable to inspect. */
  sampleWinResult: ExpeditionResult | null = null;
  muted = true;
  volumeLevel: VolumeLevel = 'mid';

  readonly starOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  starLevel = 1;
  showStarPicker = false;
  mobVariant: MobStatVariant = 'min';

  /** Lets the user override the mob's auto-computed min/max hit damage from the preview step, to probe the real in-game formula by trial and error. */
  manualDmgOverride = false;
  manualMinDmg = 0;
  manualMaxDmg = 0;

  /** Characters decoded from a `?share=` link on load, awaiting the user's confirmation before they're saved locally.
   *  Signals (not plain fields) because this app runs zoneless — a plain field written from inside a Promise
   *  callback (the async decode below) would update the component but never schedule a re-render. */
  pendingShareImport = signal<SharedCharacterEntry[] | null>(null);
  shareImportError = signal<string | null>(null);
  /** Briefly flips to true right after a share link is copied, to flash "Skopiowano!" on the button. */
  shareLinkCopied = signal(false);
  shareLinkError = signal<string | null>(null);

  private readonly selectSound = new Audio('/mk-choose-your-destiny.mp3');
  private readonly mobSelectSound = new Audio('/mob-select.mp3');
  private readonly characterSelectSound = new Audio('/select-character.mp3');
  private readonly characterSelectBackground = new Audio('/character-select.mp3');
  private readonly towerBackground = new Audio('/ladder-select.mp3');
  private readonly fightSound = new Audio('/mk4-fight.wav');

  constructor(
    private savedCharactersService: SavedCharactersService,
    private dashboardService: DashboardService,
    private expeditionLogService: ExpeditionLogService,
  ) {
    this.characterSelectBackground.loop = true;
    this.towerBackground.loop = true;
    this.applyVolume();
  }

  ngOnInit(): void {
    this.savedCharactersService.getAll$().subscribe(players => {
      this.players = players;
      this.selectedPlayerIds = this.selectedPlayerIds.filter(id => players.some(p => p.id === id));
    });
    this.checkForSharedCharacters();
  }

  /** Reads a `?share=<code>` param dropped by another user's "Udostępnij" link, decodes it, and stages the result for confirmation instead of importing straight away — the user might not want a stranger's characters silently added to their list. */
  private checkForSharedCharacters(): void {
    const code = new URLSearchParams(window.location.search).get('share');
    if (!code) return;
    decodeShareCode(code)
      .then(entries => {
        this.pendingShareImport.set(entries);
      })
      .catch(() => {
        this.shareImportError.set('Nie udało się odczytać postaci z linku — jest uszkodzony lub pochodzi z innej wersji kalkulatora.');
      })
      .finally(() => {
        // Strip the (potentially huge) share code from the address bar once it's been read, so a refresh doesn't re-prompt and the URL stays shareable-length.
        const url = new URL(window.location.href);
        url.searchParams.delete('share');
        window.history.replaceState({}, '', url);
      });
  }

  /** Saves the decoded share-link characters locally (with fresh ids) and selects them, so the recipient can jump straight to fighting. */
  confirmShareImport(): void {
    const entries = this.pendingShareImport();
    if (!entries) return;
    const newIds = this.savedCharactersService.addMany(entries);
    this.selectedPlayerIds = [...this.selectedPlayerIds, ...newIds];
    this.pendingShareImport.set(null);
  }

  dismissShareImport(): void {
    this.pendingShareImport.set(null);
  }

  dismissShareImportError(): void {
    this.shareImportError.set(null);
  }

  /** Builds a `?share=` link out of the currently selected players and copies it to the clipboard, so someone else can open it, confirm the import, and simulate fights with the exact same characters. */
  async shareSelectedPlayers(): Promise<void> {
    if (!this.selectedPlayerIds.length) return;
    this.shareLinkError.set(null);
    const uniqueIds = Array.from(new Set(this.selectedPlayerIds));
    const entries: SharedCharacterEntry[] = uniqueIds
      .map(id => this.players.find(p => p.id === id))
      .filter((p): p is SavedCharacter => !!p)
      .map(p => ({ name: p.name, character: p.character }));
    try {
      const code = await encodeCharactersToShareCode(entries);
      const url = new URL(window.location.href);
      url.search = '';
      url.searchParams.set('share', code);
      await navigator.clipboard.writeText(url.toString());
      this.shareLinkCopied.set(true);
      setTimeout(() => { this.shareLinkCopied.set(false); }, 2000);
    } catch {
      this.shareLinkError.set('Nie udało się utworzyć linku do udostępnienia.');
    }
  }

  ngOnDestroy(): void {
    this.characterSelectBackground.pause();
    this.towerBackground.pause();
    this.fightSound.pause();
    this.muted = true;
  }

  get volumeLevelIndex(): number {
    return VOLUME_LEVELS.indexOf(this.volumeLevel);
  }

  get volumeLabel(): string {
    return VOLUME_LABELS[this.volumeLevel];
  }

  avatarUrl(rasa: string): string | null {
    return rasaAvatarUrl(rasa);
  }

  /** Hand-tracked "is this mob's combat math actually right yet" marker shown on the tower picker. */
  mobStatus(mobName: string): MobImplementationStatus {
    return mobImplementationStatus(mobName);
  }

  rasaLabel(rasa: string): string {
    return rasaDisplayLabel(rasa);
  }

  /** Collapses preview weapon rows sharing a name (e.g. the same weapon dual-wielded in both hands) into one, summing their per-round attack counts — so "Podgląd starcia" lists a weapon once instead of once per equipped copy. Other stats (dmg/crit/hit) are identical between copies of the same weapon, so the first one's values are kept as-is. */
  uniqueWeapons(weapons: CombatPreviewWeapon[]): CombatPreviewWeapon[] {
    const merged: CombatPreviewWeapon[] = [];
    for (const w of weapons) {
      const existing = merged.find(m => m.name === w.name);
      if (existing) {
        existing.attacksPerRound += w.attacksPerRound;
      } else {
        merged.push({ ...w });
      }
    }
    return merged;
  }

  isPlayerSelected(id: string): boolean {
    return this.selectedPlayerIds.includes(id);
  }

  /** How many times this player is currently selected — a player can be picked more than once, to fight the same expedition as multiple independent copies of themselves. */
  playerSelectionCount(id: string): number {
    return this.selectedPlayerIds.filter(pid => pid === id).length;
  }

  playerSelectionColor(id: string): string | null {
    const index = this.selectedPlayerIds.indexOf(id);
    if (index === -1) return null;
    return PLAYER_COLORS[index % PLAYER_COLORS.length];
  }

  /** Adds one more instance of this player to the selection — clicking a card always stacks another copy rather than deselecting. */
  togglePlayer(id: string): void {
    this.selectedPlayerIds = [...this.selectedPlayerIds, id];
    this.playCharacterSelectSound();
  }

  /** Removes a single instance of this player from the selection (the badge's own click target). */
  removePlayerInstance(id: string, event: Event): void {
    event.stopPropagation();
    const idx = this.selectedPlayerIds.lastIndexOf(id);
    if (idx === -1) return;
    this.selectedPlayerIds = [...this.selectedPlayerIds.slice(0, idx), ...this.selectedPlayerIds.slice(idx + 1)];
    this.playCharacterSelectSound();
  }

  get allPlayersSelected(): boolean {
    return this.players.length > 0 && this.selectedPlayerIds.length === this.players.length;
  }

  /** Unique tags currently in use, for the filter dropdown. */
  get availablePlayerTags(): string[] {
    return Array.from(new Set(this.players.map(p => p.tag).filter((t): t is string => !!t))).sort();
  }

  get playerTagFilterOptions(): { label: string; value: string | null }[] {
    return [{ label: 'Wszystkie', value: null }, ...this.availablePlayerTags.map(t => ({ label: t, value: t }))];
  }

  /** Players matching the active tag filter — only affects what's shown, not selection or "select all". */
  get filteredPlayers(): SavedCharacter[] {
    return this.players.filter(p => !this.playerTagFilter || p.tag === this.playerTagFilter);
  }

  setPlayerTagFilter(tag: string | null): void {
    this.playerTagFilter = tag;
  }

  toggleSelectAllPlayers(): void {
    this.selectedPlayerIds = this.allPlayersSelected ? [] : this.players.map(p => p.id);
    this.playCharacterSelectSound();
  }

  goToTowers(): void {
    if (!this.selectedPlayerIds.length) return;
    this.step = 'towers';
    this.switchBackgroundTrack();
  }

  backToPlayers(): void {
    this.step = 'players';
    this.selectedTower = null;
    this.selectedMobName = null;
    this.bulkSimResult = null;
    this.switchBackgroundTrack();
  }

  selectTower(tower: ExpeditionTower): void {
    this.selectedTower = tower;
    this.selectedMobName = null;
    this.combatPreview = null;
    this.bulkSimResult = null;
    this.playSelectSound();
  }

  selectMob(mobName: string): void {
    this.selectedMobName = mobName;
    this.bulkSimResult = null;
    this.manualDmgOverride = false;
    this.playMobSelectSound();
    this.refreshCombatPreview();
  }

  /** Duplicated selections get their own synthetic id + a "(2)"/"(3)"/... name suffix, so they fight as independent combatants instead of colliding on the same id. */
  get selectedPlayers(): SavedCharacter[] {
    const occurrences = new Map<string, number>();
    return this.selectedPlayerIds
      .map(id => {
        const base = this.players.find(p => p.id === id);
        if (!base) return null;
        const occurrence = (occurrences.get(id) ?? 0) + 1;
        occurrences.set(id, occurrence);
        return occurrence === 1 ? base : { ...base, id: `${base.id}__${occurrence}`, name: `${base.name} (${occurrence})` };
      })
      .filter((p): p is SavedCharacter => !!p);
  }

  startCombat(): void {
    if (!this.selectedTower || !this.selectedMobName) return;
    const mob = this.selectedTower.mobs.find(m => m.name === this.selectedMobName);
    if (!mob) return;
    this.expeditionLogService.log({
      action: 'single',
      tower: this.selectedTower.id,
      mob: this.selectedMobName,
      star: this.starLevel,
      variant: this.mobVariant,
      players: this.selectedPlayers.map(p => p.name),
    });
    this.characterSelectBackground.pause();
    this.towerBackground.pause();
    this.playFightSound();
    this.combatResult = simulateExpedition(this.selectedPlayers, mob, this.starLevel, this.dashboardService, this.mobVariant, this.dmgOverride);
    this.step = 'combat';
  }

  backToTowers(): void {
    this.combatResult = null;
    this.step = 'towers';
  }

  /** Combat-log line color: special-effect notes are always bright green, mob attacks always red, and every player is blue. */
  attackerColor(attack: CombatAttackLog): string {
    if (attack.note) return SPECIAL_EFFECT_LOG_COLOR;
    if (attack.attackerSide === 'mob') return MOB_LOG_COLOR;
    return PLAYER_LOG_COLOR;
  }

  /** Same red/blue scheme as the log, for the post-fight summary scoreboard. */
  summaryColor(c: CombatantSummary): string {
    return c.side === 'mob' ? MOB_LOG_COLOR : PLAYER_LOG_COLOR;
  }

  /** Cannon-fodder adds share the mob's red — dimmed to gray once dead, so a cleared wave reads at a glance. */
  addColor(add: AddSummary): string {
    return add.alive ? MOB_LOG_COLOR : '#888888';
  }

  /** Rounded hit-rate percentage for the summary boxes — 0 when there's nothing to divide by. */
  percent(part: number, total: number): number {
    return total > 0 ? Math.round((part / total) * 100) : 0;
  }

  toggleMute(): void {
    this.muted = !this.muted;
    if (this.muted) {
      this.characterSelectBackground.pause();
      this.towerBackground.pause();
    } else {
      this.switchBackgroundTrack();
    }
  }

  cycleVolume(): void {
    const nextIndex = (this.volumeLevelIndex + 1) % VOLUME_LEVELS.length;
    this.volumeLevel = VOLUME_LEVELS[nextIndex];
    this.applyVolume();
  }

  toggleStarPicker(): void {
    this.showStarPicker = !this.showStarPicker;
  }

  selectStar(star: number): void {
    this.starLevel = star;
    this.showStarPicker = false;
    this.bulkSimResult = null;
    this.sampleLossResult = null;
    this.sampleWinResult = null;
    this.refreshCombatPreview();
  }

  toggleMobVariant(): void {
    this.mobVariant = this.mobVariant === 'min' ? 'max' : 'min';
    this.bulkSimResult = null;
    this.sampleLossResult = null;
    this.sampleWinResult = null;
    this.refreshCombatPreview();
  }

  /** Yog-Sothoth's fight is much heavier to simulate (36 attacks/round, 10 rounds) — run fewer iterations for him. */
  get bulkSimRunCount(): number {
    return this.selectedMobName === 'Yog-Sothoth' ? YOG_SOTHOTH_BULK_SIM_RUNS : BULK_SIM_RUNS;
  }

  runBulkSimulation(): void {
    if (!this.selectedTower || !this.selectedMobName) return;
    const mob = this.selectedTower.mobs.find(m => m.name === this.selectedMobName);
    if (!mob) return;
    const runCount = this.bulkSimRunCount;
    this.expeditionLogService.log({
      action: 'bulk',
      tower: this.selectedTower.id,
      mob: this.selectedMobName,
      star: this.starLevel,
      variant: this.mobVariant,
      players: this.selectedPlayers.map(p => p.name),
      runs: runCount,
    });
    let wins = 0;
    let losses = 0;
    let draws = 0;
    const survivalCount: Record<string, number> = {};
    const totalDamage: Record<string, number> = {};
    for (const p of this.selectedPlayers) {
      survivalCount[p.id] = 0;
      totalDamage[p.id] = 0;
    }
    this.sampleLossResult = null;
    this.sampleWinResult = null;
    for (let i = 0; i < runCount; i++) {
      const result = simulateExpedition(this.selectedPlayers, mob, this.starLevel, this.dashboardService, this.mobVariant, this.dmgOverride);
      if (result.outcome === 'win') {
        wins++;
        if (!this.sampleWinResult) this.sampleWinResult = result;
      } else if (result.outcome === 'loss') {
        losses++;
        if (!this.sampleLossResult) this.sampleLossResult = result;
      } else draws++;
      for (const p of result.players) {
        if (p.alive) survivalCount[p.id]++;
        totalDamage[p.id] += p.totalDamageDealt;
      }
    }
    // Only surface the sample win when winning is rare — otherwise it's just the unremarkable common case.
    if (wins / runCount > 0.05) this.sampleWinResult = null;
    const players: BulkSimPlayerResult[] = this.selectedPlayers.map(p => ({
      name: p.name,
      survivalRate: survivalCount[p.id] / runCount,
      avgDamage: totalDamage[p.id] / runCount,
    }));
    this.bulkSimResult = { total: runCount, wins, losses, draws, players };
  }

  /** Auto-computed min/max damage at the moment the override was switched on — kept separately because once the override is active, combatPreview.mob.minDmg/maxDmg reflect the OVERRIDDEN values, not the original auto ones the slider ranges should be centered on. */
  private autoMinDmgAtToggle = 0;
  private autoMaxDmgAtToggle = 0;

  /** Slider bounds span from a third of the mob's auto-computed damage to three times it, so the range stays centered on a sane default instead of an arbitrary fixed scale. */
  get minSliderRange(): { min: number; max: number } {
    return this.sliderRangeFor(this.autoMinDmgAtToggle);
  }

  get maxSliderRange(): { min: number; max: number } {
    return this.sliderRangeFor(this.autoMaxDmgAtToggle);
  }

  private sliderRangeFor(auto: number): { min: number; max: number } {
    if (auto <= 0) return { min: 0, max: 100 };
    return { min: Math.round(auto / 3), max: Math.round(auto * 3) };
  }

  /** Only meaningful once a preview exists — sliders are hidden until then, and disabled again once toggled off. */
  private get dmgOverride(): { min: number; max: number } | null {
    return this.manualDmgOverride ? { min: this.manualMinDmg, max: this.manualMaxDmg } : null;
  }

  /** Turning the override on seeds both sliders from the currently displayed (auto-computed) range, so the user nudges from a sane starting point instead of 0. */
  toggleManualDmgOverride(): void {
    this.manualDmgOverride = !this.manualDmgOverride;
    if (this.manualDmgOverride && this.combatPreview) {
      this.autoMinDmgAtToggle = this.combatPreview.mob.minDmg;
      this.autoMaxDmgAtToggle = this.combatPreview.mob.maxDmg;
      this.manualMinDmg = this.autoMinDmgAtToggle;
      this.manualMaxDmg = this.autoMaxDmgAtToggle;
    }
    this.refreshCombatPreview();
  }

  onManualMinDmgChange(value: number): void {
    this.manualMinDmg = Math.min(value, this.manualMaxDmg);
    this.refreshCombatPreview();
  }

  onManualMaxDmgChange(value: number): void {
    this.manualMaxDmg = Math.max(value, this.manualMinDmg);
    this.refreshCombatPreview();
  }

  private refreshCombatPreview(): void {
    if (!this.selectedTower || !this.selectedMobName) return;
    const mob = this.selectedTower.mobs.find(m => m.name === this.selectedMobName);
    this.combatPreview = mob
      ? computeCombatPreview(this.selectedPlayers, mob, this.starLevel, this.dashboardService, this.mobVariant, this.dmgOverride)
      : null;
  }

  private get currentBackground(): HTMLAudioElement {
    return this.step === 'players' ? this.characterSelectBackground : this.towerBackground;
  }

  private switchBackgroundTrack(): void {
    this.characterSelectBackground.pause();
    this.towerBackground.pause();
    if (this.muted) return;
    const track = this.currentBackground;
    track.currentTime = 0;
    track.play().catch(() => {});
  }

  private applyVolume(): void {
    const value = VOLUME_VALUES[this.volumeLevel];
    this.selectSound.volume = value;
    this.mobSelectSound.volume = value;
    this.characterSelectSound.volume = value;
    this.fightSound.volume = value;
    this.characterSelectBackground.volume = value * 0.75;
    this.towerBackground.volume = value * 0.75;
  }

  private playSelectSound(): void {
    if (this.muted) return;
    this.selectSound.currentTime = 0;
    this.selectSound.play().catch(() => {});
  }

  private playCharacterSelectSound(): void {
    if (this.muted) return;
    this.characterSelectSound.currentTime = 0;
    this.characterSelectSound.play().catch(() => {});
  }

  private playMobSelectSound(): void {
    if (this.muted) return;
    this.mobSelectSound.currentTime = 0;
    this.mobSelectSound.play().catch(() => {});
  }

  private playFightSound(): void {
    if (this.muted) return;
    this.fightSound.currentTime = 0;
    this.fightSound.play().catch(() => {});
  }
}
