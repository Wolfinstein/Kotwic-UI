import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { Character, DashboardValues } from '../../models/character';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  character: Character | null = null;
  dashboardValues: DashboardValues | null = null;

  constructor(private characterService: CharacterService) {}

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
}
