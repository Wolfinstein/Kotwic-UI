import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { CharacterService } from '../../services/character.service';
import { Character, DashboardValues } from '../../models/character';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  character: Character | null = null;
  dashboardValues: DashboardValues | null = null;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacter$().subscribe(char => {
      this.character = char;
      this.dashboardValues = this.characterService.calculateDashboard();
    });
  }

  getAttrValue(key: string): number {
    if (!this.character) return 0;
    return (this.character.attributes as any)[key] || 0;
  }

  get zizTotal(): number {
    return (this.dashboardValues?.zizAverageRounds ?? []).reduce((sum, v) => sum + v, 0);
  }

  zizGrowth(index: number): string {
    const rounds = this.dashboardValues?.zizAverageRounds;
    if (!rounds || index === 0 || rounds[index - 1] === 0) return '';
    const pct = ((rounds[index] - rounds[index - 1]) / rounds[index - 1]) * 100;
    return '+' + pct.toFixed(1) + '%';
  }
}
