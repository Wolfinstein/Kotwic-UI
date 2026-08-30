import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPEDITION_TOWERS, ExpeditionTower } from '../../data/ekspedycjaData';
import { SavedCharactersService, SavedCharacter } from '../../services/saved-characters.service';
import { rasaAvatarUrl } from '../../data/avatars';
import { DashboardService } from '../../services/calculate';
import { simulateExpedition, ExpeditionResult, computeCombatPreview, CombatPreview, MobStatVariant } from '../../logic/expeditionCombat';

type VolumeLevel = 'low' | 'mid' | 'high';
type ExpeditionStep = 'players' | 'towers' | 'combat';

interface BulkSimResult {
  total: number;
  wins: number;
  losses: number;
  draws: number;
}

const BULK_SIM_RUNS = 100;

const VOLUME_LEVELS: VolumeLevel[] = ['low', 'mid', 'high'];
const VOLUME_VALUES: Record<VolumeLevel, number> = { low: 0.25, mid: 0.6, high: 1 };
const VOLUME_LABELS: Record<VolumeLevel, string> = { low: 'Cicho', mid: 'Średnio', high: 'Głośno' };

// Same palette used for the color dots in the Postacie list (Kalkulator Postaci).
const PLAYER_COLORS = ['#4fc3f7', '#81c784', '#ffb74d', '#f06292', '#ce93d8', '#80cbc4'];

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

  selectedTower: ExpeditionTower | null = null;
  selectedMobName: string | null = null;
  combatResult: ExpeditionResult | null = null;
  combatPreview: CombatPreview | null = null;
  bulkSimResult: BulkSimResult | null = null;
  muted = true;
  volumeLevel: VolumeLevel = 'mid';

  readonly starOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  starLevel = 1;
  showStarPicker = false;
  mobVariant: MobStatVariant = 'min';

  private readonly selectSound = new Audio('/mk-choose-your-destiny.mp3');
  private readonly mobSelectSound = new Audio('/mob-select.mp3');
  private readonly characterSelectSound = new Audio('/select-character.mp3');
  private readonly characterSelectBackground = new Audio('/character-select.mp3');
  private readonly towerBackground = new Audio('/ladder-select.mp3');
  private readonly fightSound = new Audio('/mk4-fight.wav');

  constructor(
    private savedCharactersService: SavedCharactersService,
    private dashboardService: DashboardService,
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

  isPlayerSelected(id: string): boolean {
    return this.selectedPlayerIds.includes(id);
  }

  playerSelectionNumber(id: string): number {
    return this.selectedPlayerIds.indexOf(id) + 1;
  }

  playerSelectionColor(id: string): string | null {
    const index = this.selectedPlayerIds.indexOf(id);
    if (index === -1) return null;
    return PLAYER_COLORS[index % PLAYER_COLORS.length];
  }

  togglePlayer(id: string): void {
    if (this.isPlayerSelected(id)) {
      this.selectedPlayerIds = this.selectedPlayerIds.filter(pid => pid !== id);
    } else {
      this.selectedPlayerIds = [...this.selectedPlayerIds, id];
    }
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
    this.playMobSelectSound();
    this.refreshCombatPreview();
  }

  get selectedPlayers(): SavedCharacter[] {
    return this.selectedPlayerIds
      .map(id => this.players.find(p => p.id === id))
      .filter((p): p is SavedCharacter => !!p);
  }

  startCombat(): void {
    if (!this.selectedTower || !this.selectedMobName) return;
    const mob = this.selectedTower.mobs.find(m => m.name === this.selectedMobName);
    if (!mob) return;
    this.characterSelectBackground.pause();
    this.towerBackground.pause();
    this.playFightSound();
    this.combatResult = simulateExpedition(this.selectedPlayers, mob, this.starLevel, this.dashboardService, this.mobVariant);
    this.step = 'combat';
  }

  backToTowers(): void {
    this.combatResult = null;
    this.step = 'towers';
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
    this.refreshCombatPreview();
  }

  toggleMobVariant(): void {
    this.mobVariant = this.mobVariant === 'min' ? 'max' : 'min';
    this.bulkSimResult = null;
    this.refreshCombatPreview();
  }

  runBulkSimulation(): void {
    if (!this.selectedTower || !this.selectedMobName) return;
    const mob = this.selectedTower.mobs.find(m => m.name === this.selectedMobName);
    if (!mob) return;
    let wins = 0;
    let losses = 0;
    let draws = 0;
    for (let i = 0; i < BULK_SIM_RUNS; i++) {
      const result = simulateExpedition(this.selectedPlayers, mob, this.starLevel, this.dashboardService, this.mobVariant);
      if (result.outcome === 'win') wins++;
      else if (result.outcome === 'loss') losses++;
      else draws++;
    }
    this.bulkSimResult = { total: BULK_SIM_RUNS, wins, losses, draws };
  }

  private refreshCombatPreview(): void {
    if (!this.selectedTower || !this.selectedMobName) return;
    const mob = this.selectedTower.mobs.find(m => m.name === this.selectedMobName);
    this.combatPreview = mob
      ? computeCombatPreview(this.selectedPlayers, mob, this.starLevel, this.dashboardService, this.mobVariant)
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
