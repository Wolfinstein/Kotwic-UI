import { Component } from '@angular/core';

/**
 * PrimeIcons has no "anchor" glyph, so this renders one as an inline SVG
 * sized in `em` and colored via `currentColor`, matching the surrounding text
 * so it can drop in anywhere a `<i class="pi ...">` icon would go.
 */
@Component({
  selector: 'app-anchor-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="5" r="2.2"/>
      <line x1="12" y1="7.2" x2="12" y2="21"/>
      <line x1="7.5" y1="10" x2="16.5" y2="10"/>
      <path d="M4.5 13a7.5 7.5 0 0 0 15 0"/>
      <line x1="4.5" y1="13" x2="4.5" y2="16"/>
      <line x1="19.5" y1="13" x2="19.5" y2="16"/>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      line-height: 0;
    }
  `]
})
export class AnchorIconComponent { }
