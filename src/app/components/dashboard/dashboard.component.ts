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

  attrKeys = [
    { key: 'siła', label: 'Sila' },
    { key: 'zwinność', label: 'Zwinnosc' },
    { key: 'odporność', label: 'Odpornosc' },
    { key: 'wygląd', label: 'Wyglad' },
    { key: 'charyzma', label: 'Charyzma' },
    { key: 'wpływ', label: 'Wplyw' },
    { key: 'spostrzegawczość', label: 'Spostrzegawczosc' },
    { key: 'inteligencja', label: 'Inteligencja' },
    { key: 'wiedza', label: 'Wiedza' }
  ];

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
