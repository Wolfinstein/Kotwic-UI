import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
export class NavBarComponent implements OnInit {
  private static readonly THEME_STORAGE_KEY = 'colorTheme';
  private static readonly THEMES = [
    { id: 'klasyczny', label: 'Klasyczny' },
    { id: 'nanorobot', label: 'Nanorobot' },
  ];
  currentThemeLabel = 'Klasyczny';

  // Internal tools — routed items get a working link,
  // items without a route (or disabled) render as "wkrótce".
  // icon: 'anchor' is a sentinel rendered via <app-anchor-icon> (PrimeIcons has no anchor glyph).
  items: NavItem[] = [
    { label: 'Start', icon: '', route: '/home' },
    { label: 'Kalkulator Postaci', icon: 'pi pi-calculator', route: '/calculator' },
    { label: 'Poziom/Trening/Ewolucje', icon: 'pi pi-chart-line', route: '/doswiadczenie' },
    { label: 'Umagi', icon: 'pi pi-star-fill', route: '/umagi' },
    { label: 'Zadania', icon: 'pi pi-book', route: '/zadania' },
    { label: 'Kuźnia Kaina', icon: 'pi pi-hammer', route: '/kuznia' },
    { label: 'Moby i exp', icon: 'pi pi-users', route: '/moby' },
  ];

  // External tools — separate source/domain. Collected into a right-aligned
  // dropdown in a distinct accent colour, opening in a new tab. Add more here.
  externalItems: NavItem[] = [
    { label: 'Raporty z ekspedycji', icon: 'pi pi-chart-bar', href: 'https://bw-report-analyzer.42web.io' },
  ];

  externalOpen = false;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    try {
      const savedTheme = localStorage.getItem(NavBarComponent.THEME_STORAGE_KEY);
      const match = NavBarComponent.THEMES.find(t => t.id === savedTheme);
      if (match) {
        document.documentElement.setAttribute('data-theme', match.id);
        this.currentThemeLabel = match.label;
      }
    } catch { }
  }

  cycleTheme(): void {
    const themes = NavBarComponent.THEMES;
    const current = document.documentElement.getAttribute('data-theme') ?? 'klasyczny';
    const idx = themes.findIndex(t => t.id === current);
    const next = themes[(idx + 1) % themes.length];
    document.documentElement.setAttribute('data-theme', next.id);
    this.currentThemeLabel = next.label;
    try {
      localStorage.setItem(NavBarComponent.THEME_STORAGE_KEY, next.id);
    } catch { }
  }

  toggleExternal(): void {
    this.externalOpen = !this.externalOpen;
  }

  closeExternal(): void {
    this.externalOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.externalOpen && !this.el.nativeElement.contains(event.target as Node)) {
      this.externalOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.externalOpen = false;
  }
}
