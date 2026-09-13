import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AnchorIconComponent } from '../icons/anchor-icon.component';

export interface NavItem {
  label: string;
  icon: string;
  route?: string;    // internal SPA route (routerLink)
  href?: string;     // external URL (opens in a new tab)
  disabled?: boolean;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AnchorIconComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  // Internal tools — routed items get a working link,
  // items without a route (or disabled) render as "wkrótce".
  // icon: 'anchor' is a sentinel rendered via <app-anchor-icon> (PrimeIcons has no anchor glyph).
  items: NavItem[] = [
    { label: 'Kalkulator Postaci', icon: 'pi pi-calculator', route: '/calculator' },
    { label: 'Poziomy', icon: 'pi pi-chart-line', route: '/doswiadczenie' },
    { label: 'Umagi', icon: 'pi pi-star-fill', route: '/umagi' },
    { label: 'Zadania', icon: 'pi pi-book', route: '/zadania' },
    { label: 'Kuźnia Kaina', icon: 'pi pi-hammer', route: '/kuznia' },
    { label: 'Moby i exp', icon: 'pi pi-users', route: '/moby' },
    { label: 'Podróże', icon: 'pi pi-map', route: '/podroze' },
    { label: 'Symulator ekspedycji', icon: 'pi pi-send', route: '/ekspedycja' },
  ];

  // External tools — separate source/domain. Collected into a right-aligned
  // dropdown in a distinct accent colour, opening in a new tab. Add more here.
  externalItems: NavItem[] = [
    { label: 'Raporty z ekspedycji', icon: 'pi pi-chart-bar', href: 'https://bw-report-analyzer.42web.io' },
    { label: 'Tabelka Matiego', icon: 'pi pi-table', href: 'https://docs.google.com/spreadsheets/d/1U5ju3HvKkieSBx0V1ZC5YE2cfrD1zOBaXsq_g1fUKBM/edit?gid=394641403&pli=1&authuser=0#gid=394641403' },
    { label: 'Podróże Starego Nerda', icon: 'pi pi-file', href: 'https://docs.google.com/document/d/1jZtSvNYHQoS9i6bEJV1Wi1g6hnC2A-GhbKXx3ZLPH6M/edit?tab=t.0' },
    { label: 'ZdrasTool', icon: 'pi pi-wrench', href: 'https://zdrastools.neocities.org/' },
  ];

  externalOpen = false;
  mobileOpen = false;

  constructor(private el: ElementRef<HTMLElement>) { }

  toggleExternal(): void {
    this.externalOpen = !this.externalOpen;
  }

  closeExternal(): void {
    this.externalOpen = false;
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobile(): void {
    this.mobileOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target as Node)) {
      this.externalOpen = false;
      this.mobileOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.externalOpen = false;
    this.mobileOpen = false;
  }
}
