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
    { label: 'Kalkulator Postaci', description: 'Zbuduj postać — trening, ekwipunek, talizmany, umagi, arkany — i policz jej "realną" siłę bojową.', icon: 'pi pi-calculator', route: '/calculator' },
    { label: 'Poziom/Trening/Ewolucje', description: 'Sprawdź ile punktów potrzeba do konkretnego poziomu, ile zainwestowałeś w trening czy ewolucje.', icon: 'pi pi-chart-line', route: '/doswiadczenie' },
    { label: 'Umagi', description: 'Lista umagicznień wraz z symulatorem i szansą na wylosowanie umagicznienia.', icon: 'pi pi-star-fill', route: '/umagi' },
    { label: 'Zadania', description: 'Lista zadań i wymagań do ich ukończenia.', icon: 'pi pi-book', route: '/zadania' },
    { label: 'Kuźnia Kaina', description: 'Plan i koszty tworzenia przedmiotów w Kuźni Kaina.', icon: 'pi pi-hammer', route: '/kuznia' },
    { label: 'Moby i exp', description: 'Statystyki przeciwników na mapach ekspedycji (M1/M2) wraz z kalkulatorem doświadczenia.', icon: 'pi pi-users', route: '/moby' },
  ];

  externalTools: HomeTool[] = [
    { label: 'Raporty z ekspedycji', description: 'Wyszukiwarka raportów z ekspedycji (aktualizowana w miare możliwości).', icon: 'pi pi-chart-bar', href: 'https://bw-report-analyzer.42web.io' },
  ];

  knownIssues: string[] = [
    'Narzędzia budowane z myślą o R20',
    'Event "Noc Bohaterów" nie jest obsługiwana.',
    'Wartości dla mobów i kalkulator doświadczenia wymaga więcej testów i uzupełnienia statycznej tabeli z mnożnikiem.',
    'Punkty krwi nie są zliczane prawidłowo.',
  ];
}
