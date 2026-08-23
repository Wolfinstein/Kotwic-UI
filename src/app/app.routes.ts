import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('./pages/calculator/calculator.component').then(m => m.CalculatorComponent)
  },
  {
    path: 'doswiadczenie',
    loadComponent: () =>
      import('./pages/experience/experience.component').then(m => m.ExperienceComponent)
  },
  {
    path: 'umagi',
    loadComponent: () =>
      import('./pages/umagi/umagi.component').then(m => m.UmagiComponent)
  },
  {
    path: 'zadania',
    loadComponent: () =>
      import('./pages/quests/quests.component').then(m => m.QuestsComponent)
  },
  {
    path: 'kuznia',
    loadComponent: () =>
      import('./pages/kuznia/kuznia.component').then(m => m.KuzniaComponent)
  },
  {
    path: 'moby',
    loadComponent: () =>
      import('./pages/moby/moby.component').then(m => m.MobyComponent)
  },
  { path: '**', redirectTo: 'home' }
];
