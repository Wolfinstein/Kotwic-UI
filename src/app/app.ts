import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterInputComponent } from './components/character-input/character-input.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CharacterInputComponent, DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

