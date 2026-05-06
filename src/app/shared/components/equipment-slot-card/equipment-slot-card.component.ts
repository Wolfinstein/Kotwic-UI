import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-equipment-slot-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment-slot-card.component.html',
  styleUrl: './equipment-slot-card.component.css'
})
export class EquipmentSlotCardComponent {
  @Input() slotName: string = '';
  @Input() itemName: string = '';
  @Input() itemRarity: string = '';
  @Input() icon: string = '';
  @Output() openEquipment = new EventEmitter<void>();
  @Output() clearEquipment = new EventEmitter<void>();
  onOpenClick(): void {
    this.openEquipment.emit();
  }
  onClearClick(event: Event): void {
    event.stopPropagation();
    this.clearEquipment.emit();
  }
}
