import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { QUEST_ZONES, Quest, QuestZone } from '../../data/questsData';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './quests.component.html',
  styleUrl: './quests.component.css'
})
export class QuestsComponent {
  zones: QuestZone[] = QUEST_ZONES;

  filterText = '';

  private openZones = new Set<number>();

  filteredQuests(zone: QuestZone): Quest[] {
    const text = this.filterText.trim().toLowerCase();
    if (!text) return zone.quests;
    return zone.quests.filter(q =>
      q.task.toLowerCase().includes(text) || q.howTo.toLowerCase().includes(text)
    );
  }

  isZoneOpen(zone: QuestZone): boolean {
    return this.filterText.trim() !== '' || this.openZones.has(zone.zone);
  }

  toggleZone(zone: QuestZone): void {
    if (this.openZones.has(zone.zone)) {
      this.openZones.delete(zone.zone);
    } else {
      this.openZones.add(zone.zone);
    }
  }
}
