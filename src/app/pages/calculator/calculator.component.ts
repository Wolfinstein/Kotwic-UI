import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterInputComponent } from '../../components/character-input/character-input.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, CharacterInputComponent, DashboardComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  activeMobileTab: 'form' | 'results' = 'form';
}
