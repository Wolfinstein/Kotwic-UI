import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnchorIconComponent } from '../../components/icons/anchor-icon.component';

export interface HomeTool {
  label: string;
  description: string;
  icon: string;
  route?: string;
  href?: string;
  disabled?: boolean;
  accent?: string;
  size?: 'lg' | 'wide';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, AnchorIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tools: HomeTool[] = [
    { label: 'Kalkulator Postaci', description: 'Zbuduj postać — trening, ekwipunek, talizmany, umagi, arkany — i policz jej "realną" siłę bojową.', icon: 'pi pi-calculator', route: '/calculator', accent: 'teal', size: 'lg' },
    { label: 'Poziomy', description: 'Koszty poziomów, treningu i ewolucji.', icon: 'pi pi-chart-line', route: '/doswiadczenie', accent: 'slate' },
    { label: 'Kuźnia Kaina', description: 'Plan i koszty tworzenia przedmiotów w Kuźni Kaina.', icon: 'pi pi-hammer', route: '/kuznia', accent: 'amber' },
    { label: 'Umagi', description: 'Lista umagicznień wraz z symulatorem.', icon: 'pi pi-star-fill', route: '/umagi', accent: 'orange' },
    { label: 'Zadania', description: 'Lista zadań i wymagań do ich ukończenia.', icon: 'pi pi-book', route: '/zadania', accent: 'purple' },
    { label: 'Symulator ekspedycji', description: 'Symulator ekspedycji.', icon: 'pi pi-send', route: '/ekspedycja', accent: 'plum', size: 'wide' },
    { label: 'Moby i exp', description: 'Statystyki przeciwników wraz z kalkulatorem doświadczenia.', icon: 'pi pi-users', route: '/moby', accent: 'ash' },
    { label: 'Podróże', description: 'Symulator podróży', icon: 'pi pi-map', route: '/podroze', accent: 'rose' },
  ];

  externalTools: HomeTool[] = [
    { label: 'Raporty z ekspedycji', description: 'Wyszukiwarka raportów z ekspedycji (aktualizowana w miare możliwości).', icon: 'pi pi-chart-bar', href: 'https://bw-report-analyzer.42web.io' },
    { label: 'Tabelka Matiego', description: 'Arkusz kalkulacyjny Google Sheets.', icon: 'pi pi-table', href: 'https://docs.google.com/spreadsheets/d/1U5ju3HvKkieSBx0V1ZC5YE2cfrD1zOBaXsq_g1fUKBM/edit?gid=394641403&pli=1&authuser=0#gid=394641403' },
    { label: 'Podróże Starego Nerda', description: 'Dokument Google Docs.', icon: 'pi pi-file', href: 'https://docs.google.com/document/d/1jZtSvNYHQoS9i6bEJV1Wi1g6hnC2A-GhbKXx3ZLPH6M/edit?tab=t.0' },
    { label: 'ZdrasTool', description: 'Zewnętrzne narzędzie.', icon: 'pi pi-wrench', href: 'https://zdrastools.neocities.org/' },
  ];

  knownIssues: string[] = [
    'Jakieś na pewno są'
  ];

  issuesOpen = false;

  toggleIssues(): void {
    this.issuesOpen = !this.issuesOpen;
  }
}
