import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ekspedycja-disabled',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ekspedycja-disabled.component.html',
  styleUrl: './ekspedycja-disabled.component.css',
})
export class EkspedycjaDisabledComponent {}
