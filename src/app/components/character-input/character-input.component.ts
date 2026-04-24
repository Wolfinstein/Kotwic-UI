import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-input.component.html',
  styleUrl: './character-input.component.css'
})
export class CharacterInputComponent implements OnInit {
  character: Character | null = null;
  showEquipmentModal = false;
  showRunesModal = false;
  showUmagiaModal = false;
  selectedEquipmentSlot = '';

  itemOptions = ['Głowa', 'Klatka piersiowa', 'Nogi', 'Szyja', 'Palec 1', 'Palec 2', 'Broń 1h', 'Broń 2h'];
  runeOptions = ['Efekt 1', 'Efekt 2', 'Efekt 3', 'Efekt 4'];
  umagiaOptions = ['Umágía 1', 'Umágía 2', 'Umágía 3', 'Umágía 4'];

  attributes = [
    { key: 'siła', label: 'Siła' },
    { key: 'zwinność', label: 'Zwinność' },
    { key: 'odporność', label: 'Odporność' },
    { key: 'wygląd', label: 'Wygląd' },
    { key: 'charyzma', label: 'Charyzma' },
    { key: 'wpływ', label: 'Wpływ' },
    { key: 'spostrzegawczość', label: 'Spostrzegawczość' },
    { key: 'inteligencja', label: 'Inteligencja' },
    { key: 'wiedza', label: 'Wiedza' }
  ];

  talizmanAttributes = [
    { key: 'ambicja', label: 'Ambicja' },
    { key: 'lewatism', label: 'Lewatism' },
    { key: 'behemot', label: 'Behemot' },
    { key: 'kamieńZła', label: 'Kamień zła' },
    { key: 'kamieńDobra', label: 'Kamień dobra' },
    { key: 'kamieńPrzestrzeni', label: 'Kamień przestrzeni' },
    { key: 'kamieńCzasu', label: 'Kamień czasu' },
    { key: 'spaonNocy', label: 'Spaon nocy' },
    { key: 'zycieIŚmierc', label: 'Zycie i śmierc' },
    { key: 'otchłaniCiszy', label: 'Otchłani ciszy' },
    { key: 'potęgaMocy', label: 'Potęga mocy' },
    { key: 'furiaBestii', label: 'Furia bestii' },
    { key: 'auraBestii', label: 'Aura bestii' },
    { key: 'maskaWładzy', label: 'Maska władzy' },
    { key: 'maskaStachu', label: 'Maska strachu' },
    { key: 'cichyŁowca', label: 'Cichy łowca' },
    { key: 'pieśnKrwi', label: 'Pieśn krwi' }
  ];

  arcaneAttributes = [
    { key: 'maskaAdonisa', label: 'Maska Adonisa', type: 'int' },
    { key: 'maskaKaliguli', label: 'Maska Kaliguli', type: 'int' },
    { key: 'majestat', label: 'Majestat', type: 'int' },
    { key: 'krewŻycia', label: 'Krew Życia', type: 'int' },
    { key: 'kocieŚcieżki', label: 'Kocie Ścieżki', type: 'int' },
    { key: 'żarKrwi', label: 'Żar krwi', type: 'boolean' },
    { key: 'ciszaKrwi', label: 'Cisza Krwi', type: 'int' },
    { key: 'wyssanieMocy', label: 'Wyssanie mocy', type: 'int' },
    { key: 'mocKrwi', label: 'Moc krwi', type: 'int' },
    { key: 'dzikiSzał', label: 'Dziki szał', type: 'int' },
    { key: 'skóraBestii', label: 'Skóra Bestii', type: 'int' },
    { key: 'cieńBestii', label: 'Cień bestii', type: 'boolean' },
    { key: 'nocnyŁowca', label: 'Nocny łowca', type: 'int' },
    { key: 'tchnienieŚmierci', label: 'Tchnienie Śmierci', type: 'int' },
    { key: 'groza', label: 'Groza', type: 'boolean' }
  ];

  silverBonuses = ['Silver Bonus 1', 'Silver Bonus 2', 'Silver Bonus 3'];
  goldBonuses = ['Gold Bonus 1', 'Gold Bonus 2', 'Gold Bonus 3'];
  huntBonuses = ['Hunt Bonus 1', 'Hunt Bonus 2', 'Hunt Bonus 3'];
  dailyBonuses = ['Daily Bonus 1', 'Daily Bonus 2', 'Daily Bonus 3'];
  kaplicaBonuses = ['Kaplica Bonus 1', 'Kaplica Bonus 2', 'Kaplica Bonus 3'];
  oneTimeBonuses = ['One Time Bonus 1', 'One Time Bonus 2', 'One Time Bonus 3'];

  expandedBonuses: { [key: string]: boolean } = {
    silver: false,
    gold: false,
    hunt: false,
    daily: false,
    kaplica: false,
    oneTime: false
  };

  selectedBonuses: { [key: string]: string[] } = {
    silver: [],
    gold: [],
    hunt: [],
    daily: [],
    kaplica: [],
    oneTime: []
  };

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService.getCharacter$().subscribe(char => {
      this.character = char;
    });
  }

  getAttrValue(key: string): number {
    if (!this.character) return 0;
    return (this.character.attributes as any)[key] || 0;
  }

  setAttrValue(key: string, value: number) {
    this.characterService.updateAttributes({ [key]: value } as any);
  }

  getTalizmanValue(key: string): number {
    if (!this.character) return 0;
    return (this.character.talizmanLevels as any)[key] || 0;
  }

  setTalizmanValue(key: string, value: number) {
    this.characterService.updateTalizmanLevels({ [key]: value } as any);
  }

  getArcaneValue(key: string): any {
    if (!this.character) return null;
    return (this.character as any)[key] || null;
  }

  setArcaneValue(key: string, value: any) {
    if (this.character) {
      this.characterService.updateCharacter({
        ...this.character,
        [key]: value
      });
    }
  }

  updateCharacterField(field: string, value: any) {
    if (this.character) {
      this.characterService.updateCharacter({
        ...this.character,
        [field]: value
      });
    }
  }

  openEquipmentModal(slot: string) {
    this.selectedEquipmentSlot = slot;
    this.showEquipmentModal = true;
  }

  selectEquipment(item: string) {
    if (this.character) {
      const updatedEquipment = { ...this.character.equipment, [this.selectedEquipmentSlot]: item };
      this.characterService.updateCharacter({
        ...this.character,
        equipment: updatedEquipment
      });
    }
    this.showEquipmentModal = false;
  }

  openRunesModal() {
    this.showRunesModal = true;
  }

  openUmagiaModal() {
    this.showUmagiaModal = true;
  }

  closeModal() {
    this.showEquipmentModal = false;
    this.showRunesModal = false;
    this.showUmagiaModal = false;
  }

  calculateDashboard() {
    const dashboard = this.characterService.calculateDashboard();
    console.log('Dashboard calculated:', dashboard);
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
          this.characterService.updateCharacter(imported);
          console.log('Character imported:', imported);
        } catch (error) {
          console.error('Error importing character:', error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  exportCharacter() {
    if (!this.character) return;
    const dataStr = JSON.stringify(this.character, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `character-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  toggleBonusExpand(bonusType: string) {
    this.expandedBonuses[bonusType] = !this.expandedBonuses[bonusType];
  }

  toggleBonusSelection(bonusType: string, bonus: string, isOneTime: boolean = false) {
    const selected = this.selectedBonuses[bonusType];
    const index = selected.indexOf(bonus);

    if (isOneTime) {
      this.selectedBonuses[bonusType] = index >= 0 ? [] : [bonus];
    } else {
      if (index >= 0) {
        selected.splice(index, 1);
      } else {
        selected.push(bonus);
      }
    }
  }

  isBonusSelected(bonusType: string, bonus: string): boolean {
    return this.selectedBonuses[bonusType].includes(bonus);
  }
}
