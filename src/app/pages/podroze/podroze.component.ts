import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  STAT_KEYS, STAT_LABELS, StatKey, Stats,
  Enemy, Boss, LEVEL_DATA, BOSSES,
  getCostForLevel, pickNormalRoundEncounter, randomBoss, parsePastedStats,
  WAIT_DISPLAY_MINUTES, WAIT_SECONDS,
  BossSpecialAttack, randomBossSpecialAttack, specialAttackCost,
} from '../../data/podrozeData';

type Phase = 'setup' | 'normal' | 'boss' | 'miniboss' | 'victory';

interface RoundOption {
  label: string;
  enabled: boolean;
  cssClass: string;
  missingText?: string;
  action: () => void;
}

/** Per-encounter special-attack state — boss and miniboss each track their own. */
interface SpecialFightState {
  specialAttack: BossSpecialAttack | null;
  specialUsed: boolean;
  /** Persists for the rest of this fight ('costDiscountFight'). */
  fightCostMultiplier: number;
  /** One-shot, applied to the very next round of this fight then cleared. */
  queuedNextRoundCostMultiplier: number | null;
  /** Reset every round; can additionally be nudged mid-round by 'costSwing'. */
  currentRoundCostMultiplier: number;
  /** An extra usable stat unlocked for the round currently being rendered. */
  activeExtraStat: StatKey | null;
  /** Queued unlock mode, resolved into activeExtraStat when the next round starts. */
  pendingNextRoundExtraStat: 'random' | 'highest' | StatKey | null;
}

function freshFightState(): SpecialFightState {
  return {
    specialAttack: null,
    specialUsed: false,
    fightCostMultiplier: 1,
    queuedNextRoundCostMultiplier: null,
    currentRoundCostMultiplier: 1,
    activeExtraStat: null,
    pendingNextRoundExtraStat: null,
  };
}

@Component({
  selector: 'app-podroze',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './podroze.component.html',
  styleUrl: './podroze.component.css',
})
export class PodrozeComponent implements AfterViewChecked, OnDestroy {
  private static readonly LAST_LEVEL_KEY = 'podroze.lastLevel';
  private static readonly LAST_BOSS_KEY = 'podroze.lastBoss';

  readonly statKeys = STAT_KEYS;
  readonly statLabels = STAT_LABELS;
  readonly levels = Object.keys(LEVEL_DATA).map(n => parseInt(n, 10));
  readonly bosses = BOSSES;

  @ViewChild('logBox') logBoxRef?: ElementRef<HTMLDivElement>;
  private shouldScrollLog = false;

  // ── Setup screen ──
  pasteInput = '';
  parseWarning: string | null = null;
  draftStats: Partial<Stats> = {};
  selectedLevel = 1;
  selectedBoss: Boss = BOSSES[0];

  // ── Game state ──
  phase: Phase = 'setup';
  stats: Stats | null = null;
  initialStats: Stats | null = null;
  level = 1;
  boss: Boss | null = null;
  currentRound = 1;
  totalRounds = 0;
  currentBossRound = 0;
  currentMiniBossRound = 0;
  currentMiniBoss: Boss | null = null;

  currentEnemy: Enemy | null = null;
  currentOptions: RoundOption[] = [];
  log: string[] = [];

  // ── "Czekaj" wait timer (real-time WAIT_SECONDS, in-fiction WAIT_DISPLAY_MINUTES) ──
  readonly waitDisplayMinutes = WAIT_DISPLAY_MINUTES;
  isWaiting = false;
  waitSecondsLeft = 0;
  private waitIntervalId: ReturnType<typeof setInterval> | null = null;

  // ── Boss special attack (once per fight, rounds 1-3 — boss and miniboss each get their own) ──
  bossFight: SpecialFightState = freshFightState();
  miniBossFight: SpecialFightState = freshFightState();

  // ── Manual stat adjustment (ongoing journey) ──
  manualStatKey: StatKey = STAT_KEYS[0];
  manualStatValue: number | null = null;

  private fightState(isMini: boolean): SpecialFightState {
    return isMini ? this.miniBossFight : this.bossFight;
  }

  constructor(private cdr: ChangeDetectorRef) {
    try {
      const savedLevel = localStorage.getItem(PodrozeComponent.LAST_LEVEL_KEY);
      if (savedLevel) this.selectedLevel = parseInt(savedLevel, 10);
      const savedBoss = localStorage.getItem(PodrozeComponent.LAST_BOSS_KEY);
      if (savedBoss) {
        const match = BOSSES.find(b => b.name === savedBoss);
        if (match) this.selectedBoss = match;
      }
    } catch { }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollLog && this.logBoxRef) {
      const el = this.logBoxRef.nativeElement;
      el.scrollTop = el.scrollHeight;
      this.shouldScrollLog = false;
    }
  }

  ngOnDestroy(): void {
    this.clearWaitTimer();
  }

  private clearWaitTimer(): void {
    if (this.waitIntervalId !== null) {
      clearInterval(this.waitIntervalId);
      this.waitIntervalId = null;
    }
    this.isWaiting = false;
  }

  // ── Paste parsing ──
  parsePaste(): void {
    const result = parsePastedStats(this.pasteInput);
    this.draftStats = { ...this.draftStats, ...result.values };
    if (result.missing.length === 0) {
      this.parseWarning = null;
    } else {
      const labels = result.missing.map(k => this.statLabels[k]).join(', ');
      this.parseWarning = `Nie rozpoznano cech: ${labels}. Uzupełnij je ręcznie poniżej.`;
    }
  }

  get canStart(): boolean {
    return this.statKeys.every(k => typeof this.draftStats[k] === 'number' && !isNaN(this.draftStats[k] as number));
  }

  startGame(): void {
    if (!this.canStart) return;
    const stats = { ...this.draftStats } as Stats;
    this.stats = { ...stats };
    this.initialStats = { ...stats };
    this.level = this.selectedLevel;
    this.boss = this.selectedBoss;
    this.totalRounds = LEVEL_DATA[this.level].rounds;
    this.currentRound = 1;
    this.currentBossRound = 0;
    this.currentMiniBossRound = 0;
    this.currentMiniBoss = null;
    this.log = [];
    this.resetBossSpecialState();

    try {
      localStorage.setItem(PodrozeComponent.LAST_LEVEL_KEY, String(this.level));
      localStorage.setItem(PodrozeComponent.LAST_BOSS_KEY, this.boss.name);
    } catch { }

    this.addLog('=== ROZPOCZĘTO PODRÓŻ ===');
    this.addLog(`Poziom: ${this.level}`);
    this.addLog(`Boss: ${this.boss.name} (Akt ${this.boss.act})`);
    this.addLog(`Liczba rund do bossa: ${this.totalRounds}`);
    if (this.level >= 6) this.addLog('UWAGA: Miniboss po 3 rundach (poziom 6+)!');
    this.addLog('========================');

    this.showNextRound();
  }

  restartGame(): void {
    if (!confirm('Czy na pewno chcesz zrestartować grę? Obecny postęp zostanie utracony.')) return;
    this.clearWaitTimer();
    this.phase = 'setup';
    this.stats = null;
    this.initialStats = null;
    this.boss = null;
    this.currentEnemy = null;
    this.currentOptions = [];
    this.log = [];
    this.resetBossSpecialState();
  }

  private resetBossSpecialState(): void {
    this.bossFight = freshFightState();
    this.miniBossFight = freshFightState();
  }

  private addLog(msg: string): void {
    this.log.push(msg);
    this.shouldScrollLog = true;
  }

  private logCurrentStats(): void {
    if (!this.stats) return;
    for (const key of this.statKeys) {
      this.addLog(`${this.statLabels[key]}: ${this.stats[key]}`);
    }
  }

  // ── Core dispatcher, mirrors the Java showNextRound() state machine ──
  private showNextRound(): void {
    if (!this.stats || !this.boss) return;

    if (this.currentMiniBoss && this.currentMiniBossRound >= 1 && this.currentMiniBossRound <= 3) {
      this.enterMiniBossRound();
    } else if (this.currentMiniBoss) {
      this.currentMiniBoss = null;
      this.currentMiniBossRound = 0;
      this.addLog('✓ MINIBOSS POKONANY! Kontynuujesz podróż...');
      this.currentRound = 4;
      this.showNextRound();
    } else if (this.currentBossRound === 0 && this.currentRound <= this.totalRounds) {
      this.enterNormalRound();
    } else if (this.currentBossRound === 0) {
      this.currentBossRound = 1;
      this.bossFight = freshFightState();
      this.bossFight.specialAttack = randomBossSpecialAttack();
      this.addLog('=== BOSS FIGHT ===');
      this.addLog(`Przeciwnik: ${this.boss.name}`);
      this.addLog('Aktualne statystyki przed walką:');
      this.logCurrentStats();
      this.addLog('==================');
      this.enterBossRound();
    } else if (this.currentBossRound <= 3) {
      this.enterBossRound();
    } else {
      this.enterVictory();
    }
  }

  private advanceToNextRound(): void {
    if (this.currentBossRound > 0) {
      this.currentBossRound++;
    } else if (this.currentMiniBoss) {
      this.currentMiniBossRound++;
    } else {
      this.currentRound++;
      if (this.level >= 6 && this.currentRound === 4 && !this.currentMiniBoss) {
        this.currentRound = 3;
        this.currentMiniBoss = randomBoss();
        this.currentMiniBossRound = 1;
        this.miniBossFight = freshFightState();
        this.miniBossFight.specialAttack = randomBossSpecialAttack();
        this.addLog('=== MINIBOSS FIGHT ===');
        this.addLog('Po 3 rundach pojawia się miniboss!');
        this.addLog(`Przeciwnik: ${this.currentMiniBoss.name} (zmniejszone statystyki)`);
        this.addLog('Musisz wygrać 3 rundy!');
        this.addLog('========================');
      }
    }
    this.showNextRound();
  }

  private spend(key: StatKey, cost: number): void {
    if (!this.stats) return;
    this.stats[key] -= cost;
    this.addLog(`Użyto: ${this.statLabels[key]} (-${cost})`);
  }

  private hasEnough(key: StatKey, cost: number): boolean {
    return !!this.stats && this.stats[key] >= cost;
  }

  private missingText(key: StatKey, cost: number): string {
    const have = this.stats ? this.stats[key] : 0;
    return `[BRAK: ${have}/${cost}]`;
  }

  // ── Normal round ──
  private enterNormalRound(): void {
    this.phase = 'normal';
    this.clearWaitTimer();
    this.currentEnemy = pickNormalRoundEncounter();
    this.addLog(`RUNDA ${this.currentRound}/${this.totalRounds} - ${this.currentEnemy.name}`);

    const baseCost = getCostForLevel(this.level, this.boss!.act);
    const bloodCost = baseCost * 5;
    const enemy = this.currentEnemy;
    const options: RoundOption[] = [];

    options.push(this.buildStatOption(enemy.fixed, baseCost, 'fixed'));
    let anyStatAffordable = this.hasEnough(enemy.fixed, baseCost);

    if (enemy.random === 'wait') {
      options.push({
        label: `Czekaj (${this.waitDisplayMinutes} min)`,
        enabled: true,
        cssClass: 'opt-skip',
        action: () => this.startWait(),
      });
    } else {
      const picked = enemy.random[Math.floor(Math.random() * enemy.random.length)];
      options.push(this.buildStatOption(picked, baseCost, 'random'));
      anyStatAffordable = anyStatAffordable || this.hasEnough(picked, baseCost);
    }

    options.push(this.buildBloodOption(bloodCost, anyStatAffordable));
    this.currentOptions = options;
  }

  /**
   * Blood is only a real option in normal rounds when neither stat option is
   * affordable — if you can pay with a stat, you must, even if you also have
   * enough KREW. Boss/miniboss rounds don't use this — blood is always usable there.
   */
  private buildBloodOption(cost: number, statOptionAffordable: boolean): RoundOption {
    const hasEnoughBlood = this.hasEnough('krew', cost);
    const enabled = hasEnoughBlood && !statOptionAffordable;
    let label = `Użyj: KREW (koszt: ${cost})`;
    if (statOptionAffordable) {
      label += ' [najpierw użyj dostępnej cechy]';
    } else if (!hasEnoughBlood) {
      label += ` ${this.missingText('krew', cost)}`;
    }
    return {
      label,
      enabled,
      cssClass: 'blood',
      action: () => {
        this.spend('krew', cost);
        this.advanceToNextRound();
      },
    };
  }

  private startWait(): void {
    this.isWaiting = true;
    this.waitSecondsLeft = WAIT_SECONDS;
    this.addLog(`Czekasz, aż zagrożenie minie (${this.waitDisplayMinutes} minut)...`);
    this.waitIntervalId = setInterval(() => {
      this.waitSecondsLeft--;
      if (this.waitSecondsLeft <= 0) {
        this.clearWaitTimer();
        this.addLog('Zagrożenie minęło — kontynuujesz podróż.');
        this.advanceToNextRound();
      }
      this.cdr.detectChanges();
    }, 1000);
  }

  private buildStatOption(key: StatKey, cost: number, cssClass: string): RoundOption {
    const enabled = this.hasEnough(key, cost);
    return {
      label: `Użyj: ${this.statLabels[key]} (koszt: ${cost})${enabled ? '' : ' ' + this.missingText(key, cost)}`,
      enabled,
      cssClass,
      action: () => {
        this.spend(key, cost);
        this.advanceToNextRound();
      },
    };
  }

  // ── Boss round ──
  private enterBossRound(): void {
    this.phase = 'boss';
    this.startBossRoundState(false);
    this.addLog(`BOSS RUNDA ${this.currentBossRound}/3`);
    this.rollRoundPickedRandom(this.boss!, this.currentBossRound);
    this.renderBossRoundOptions(this.boss!, this.currentBossRound, false);
  }

  // ── Miniboss round ──
  private enterMiniBossRound(): void {
    this.phase = 'miniboss';
    this.startBossRoundState(true);
    this.addLog(`MINIBOSS RUNDA ${this.currentMiniBossRound}/3`);
    this.rollRoundPickedRandom(this.currentMiniBoss!, this.currentMiniBossRound);
    this.renderBossRoundOptions(this.currentMiniBoss!, this.currentMiniBossRound, true);
  }

  /** Resolves the per-round cost multiplier queue and any queued extra-stat unlock for this encounter. */
  private startBossRoundState(isMini: boolean): void {
    const state = this.fightState(isMini);
    state.activeExtraStat = null;
    if (state.pendingNextRoundExtraStat !== null) {
      state.activeExtraStat = this.resolveStatMode(state.pendingNextRoundExtraStat);
      state.pendingNextRoundExtraStat = null;
      this.addLog(`Dodatkowa opcja tej rundy: ${this.statLabels[state.activeExtraStat]}.`);
    }
    state.currentRoundCostMultiplier = state.queuedNextRoundCostMultiplier ?? 1;
    state.queuedNextRoundCostMultiplier = null;
  }

  private roundPickedRandom: StatKey | null = null;

  /** Rolled once per round entry so a mid-round rebuild (after using the special attack) doesn't re-roll it. */
  private rollRoundPickedRandom(source: Boss, round: number): void {
    if (round === 3) { this.roundPickedRandom = null; return; }
    const randomChoices = source.random[round - 1] as StatKey[];
    this.roundPickedRandom = randomChoices[Math.floor(Math.random() * randomChoices.length)];
  }

  /** Pure render: builds currentOptions from current state. Called at round entry and after a mid-round special-attack use. */
  private renderBossRoundOptions(source: Boss, round: number, isMini: boolean): void {
    const state = this.fightState(isMini);
    const baseCost = getCostForLevel(this.level, this.boss!.act);
    const multiplier = state.fightCostMultiplier * state.currentRoundCostMultiplier;
    const scale = (n: number) => Math.max(0, Math.floor(n * multiplier));

    const roundCost = scale(isMini ? Math.floor(baseCost * 1.5) : baseCost * 2);
    const bloodCost = scale(isMini ? Math.floor(baseCost * 7.5) : baseCost * 10);
    const options: RoundOption[] = [];
    const offeredStats = new Set<StatKey>();

    if (round === 3) {
      const [statA, statB] = source.fixed[2];
      const doubleCost = scale(isMini ? Math.ceil(baseCost * 1.125) : Math.floor(baseCost * 1.5));
      const additionalKey = source.random[2];
      offeredStats.add(statA).add(statB).add(additionalKey);

      const enabledDouble = this.hasEnough(statA, doubleCost) && this.hasEnough(statB, doubleCost);
      options.push({
        label: `Użyj: ${this.statLabels[statA]} + ${this.statLabels[statB]} (koszt: ${doubleCost} każda)`
          + (enabledDouble ? '' : ' [BRAK]'),
        enabled: enabledDouble,
        cssClass: 'opt-double',
        action: () => {
          this.spend(statA, doubleCost);
          this.spend(statB, doubleCost);
          this.addLog(`✓ Ukończono rundę używając podwójnej statystyki: ${this.statLabels[statA]} + ${this.statLabels[statB]}`);
          this.advanceToNextRound();
        },
      });

      options.push(this.buildStatOption(additionalKey, roundCost, 'opt-additional'));
    } else {
      const fixedKey = source.fixed[round - 1] as StatKey;
      offeredStats.add(fixedKey).add(this.roundPickedRandom!);
      options.push(this.buildStatOption(fixedKey, roundCost, 'fixed'));
      options.push(this.buildStatOption(this.roundPickedRandom!, roundCost, 'random'));
    }

    options.push(this.buildStatOption('krew', bloodCost, 'blood'));

    if (state.activeExtraStat && !offeredStats.has(state.activeExtraStat)) {
      options.push(this.buildStatOption(state.activeExtraStat, roundCost, 'opt-extra'));
    }

    if (state.specialAttack && !state.specialUsed) {
      options.push(this.buildSpecialAttackOption(state.specialAttack, round, isMini));
    }

    this.currentOptions = options;
  }

  private buildSpecialAttackOption(attack: BossSpecialAttack, round: number, isMini: boolean): RoundOption {
    const cost = specialAttackCost(attack, this.initialStats!, isMini);
    const enabled = this.hasEnough(attack.requiredStat, cost);
    const base = `Specjalny atak: ${attack.description} (koszt: ${cost} ${this.statLabels[attack.requiredStat]})`;
    return {
      label: enabled ? base : `${base} ${this.missingText(attack.requiredStat, cost)}`,
      enabled,
      cssClass: 'opt-special',
      action: () => this.useBossSpecialAttack(attack, cost, round, isMini),
    };
  }

  private useBossSpecialAttack(attack: BossSpecialAttack, cost: number, round: number, isMini: boolean): void {
    const state = this.fightState(isMini);
    this.spend(attack.requiredStat, cost);
    state.specialUsed = true;
    this.addLog(`✦ Specjalny atak: ${attack.description}`);

    switch (attack.effect.kind) {
      case 'costDiscountFight':
        state.fightCostMultiplier *= (1 - attack.effect.percent / 100);
        this.addLog(`Koszt użycia parametrów obniżony o ${attack.effect.percent}% do końca walki.`);
        break;
      case 'costDiscountNextRound':
        state.queuedNextRoundCostMultiplier = (state.queuedNextRoundCostMultiplier ?? 1) * (1 - attack.effect.percent / 100);
        this.addLog(`Koszt użycia parametrów w następnej rundzie obniżony o ${attack.effect.percent}%.`);
        break;
      case 'instantWinChance': {
        const won = Math.random() * 100 < attack.effect.chance;
        if (won) {
          this.addLog('✓ Runda wygrana natychmiastowo!');
          this.advanceToNextRound();
          return;
        }
        this.addLog('Nie udało się wygrać rundy natychmiastowo.');
        break;
      }
      case 'unlockStatCurrentRound': {
        const stat = this.resolveStatMode(attack.effect.mode);
        state.activeExtraStat = stat;
        this.addLog(`Odblokowano dodatkową opcję na tę rundę: ${this.statLabels[stat]}.`);
        break;
      }
      case 'unlockStatNextRound':
        state.pendingNextRoundExtraStat = attack.effect.mode;
        this.addLog('W następnej rundzie odblokujesz dodatkową opcję.');
        break;
      case 'doubleCurrentStat':
        if (this.stats) {
          this.stats[attack.effect.stat] *= 2;
          this.addLog(`Podwojono ${this.statLabels[attack.effect.stat]}: ${this.stats[attack.effect.stat]}.`);
        }
        break;
      case 'regenerateAllPercent':
        this.regenerateAllPercent(attack.effect.percent, attack.effect.exclude);
        break;
      case 'regenerateMostSpentFull':
        this.regenerateMostSpentFull(attack.effect.exclude);
        break;
      case 'costSwing':
        state.currentRoundCostMultiplier *= (1 + attack.effect.increasePercentThisRound / 100);
        state.queuedNextRoundCostMultiplier = (state.queuedNextRoundCostMultiplier ?? 1) * (1 - attack.effect.discountPercentNextRound / 100);
        this.addLog(`Koszt w tej rundzie wzrósł o ${attack.effect.increasePercentThisRound}%, w kolejnej spadnie o ${attack.effect.discountPercentNextRound}%.`);
        break;
      case 'buffRandomStats':
        this.buffRandomStats(attack.effect.count, attack.effect.percent);
        break;
    }

    const source = isMini ? this.currentMiniBoss! : this.boss!;
    this.renderBossRoundOptions(source, round, isMini);
  }

  private resolveStatMode(mode: 'random' | 'highest' | StatKey): StatKey {
    if (mode === 'random') {
      const pool = this.statKeys.filter(k => k !== 'krew');
      return pool[Math.floor(Math.random() * pool.length)];
    }
    if (mode === 'highest') return this.highestStat();
    return mode;
  }

  private highestStat(): StatKey {
    if (!this.stats) return 'sila';
    let best: StatKey = 'sila';
    for (const key of this.statKeys) {
      if (key === 'krew') continue;
      if (this.stats[key] > this.stats[best]) best = key;
    }
    return best;
  }

  private regenerateAllPercent(percent: number, exclude: StatKey): void {
    if (!this.stats || !this.initialStats) return;
    for (const key of this.statKeys) {
      if (key === exclude) continue;
      const restoreAmount = Math.floor(this.initialStats[key] * (percent / 100));
      this.stats[key] = Math.min(this.initialStats[key], this.stats[key] + restoreAmount);
    }
    this.addLog(`Zregenerowano wszystkie parametry o ${percent}% wartości początkowej (oprócz ${this.statLabels[exclude]}).`);
  }

  private regenerateMostSpentFull(exclude: StatKey): void {
    if (!this.stats || !this.initialStats) return;
    let best: StatKey | null = null;
    let bestSpent = 0;
    for (const key of this.statKeys) {
      if (key === exclude) continue;
      const spent = this.initialStats[key] - this.stats[key];
      if (spent > bestSpent) { bestSpent = spent; best = key; }
    }
    if (best) {
      this.stats[best] = this.initialStats[best];
      this.addLog(`Zregenerowano do pełna: ${this.statLabels[best]}.`);
    } else {
      this.addLog('Brak zużytego parametru do zregenerowania.');
    }
  }

  private buffRandomStats(count: number, percent: number): void {
    if (!this.stats) return;
    const pool = this.statKeys.filter(k => k !== 'krew');
    const chosen = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
    for (const key of chosen) {
      this.stats[key] += Math.floor(this.stats[key] * (percent / 100));
    }
    this.addLog(`Zwiększono o ${percent}%: ${chosen.map(k => this.statLabels[k]).join(', ')}.`);
  }

  private enterVictory(): void {
    this.phase = 'victory';
    this.addLog('=== ZWYCIĘSTWO! ===');
    this.addLog(`Gratulacje! Ukończyłeś podróż na poziomie ${this.level}!`);
    this.addLog(`Pokonałeś bossa: ${this.boss!.name}`);
    this.addLog('Pozostałe statystyki:');
    this.logCurrentStats();
  }

  // ── Display helpers ──
  statRatioClass(key: StatKey): string {
    if (!this.stats || !this.initialStats) return '';
    const current = this.stats[key];
    const initial = this.initialStats[key] || 1;
    if (current < initial * 0.3) return 'stat-low';
    if (current < initial * 0.6) return 'stat-mid';
    return '';
  }

  // ── Manual stat adjustment (ongoing journey) ──
  addSingleStat(): void {
    if (!this.stats || this.manualStatValue == null || isNaN(this.manualStatValue)) return;
    this.stats[this.manualStatKey] += this.manualStatValue;
    this.addLog(`Ręcznie dodano: ${this.statLabels[this.manualStatKey]} (${this.manualStatValue >= 0 ? '+' : ''}${this.manualStatValue})`);
  }

  addAllStats(): void {
    if (!this.stats || this.manualStatValue == null || isNaN(this.manualStatValue)) return;
    for (const key of this.statKeys) {
      this.stats[key] += this.manualStatValue;
    }
    this.addLog(`Ręcznie dodano do wszystkich cech: ${this.manualStatValue >= 0 ? '+' : ''}${this.manualStatValue}`);
  }

  fixedLabelForRound(source: Boss, round: number): string {
    if (round === 3) {
      const [a, b] = source.fixed[2];
      return `${this.statLabels[a]} + ${this.statLabels[b]}`;
    }
    return this.statLabels[source.fixed[round - 1] as StatKey];
  }
}
