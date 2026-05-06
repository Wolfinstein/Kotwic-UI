import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
type ContainerType = 'full' | 'constrained' | 'fluid';
@Component({
  selector: 'app-responsive-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responsive-container.component.html',
  styleUrl: './responsive-container.component.css'
})
export class ResponsiveContainerComponent {
  @Input() type: ContainerType = 'constrained';
  @Input() padding: boolean = true;
  @Input() centered: boolean = true;
}
