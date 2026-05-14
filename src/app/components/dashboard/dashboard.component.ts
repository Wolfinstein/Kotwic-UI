import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { CharacterService } from '../../services/character.service';
import { Character, DashboardValues } from '../../models/character';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TooltipModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  character: Character | null = null;
  dashboardValues: DashboardValues | null = null;
  floor = Math.floor;
  zizChartData: any = null;
  private themeObserver?: MutationObserver;
  zizChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 24, right: 40 } },
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx: any) => ctx.parsed.y.toLocaleString() } },
      datalabels: {
        align: 'top',
        anchor: 'end',
        color: '#abd2ffb7',
        font: { size: 10 },
        formatter: (_: any, ctx: any) => ctx.dataset.growthLabels?.[ctx.dataIndex] ?? ''
      }
    },
    scales: {
      x: { ticks: { color: '#abd2ffb7' }, grid: { color: 'rgba(106,135,171,0.1)' } },
      y: { ticks: { color: '#abd2ffb7' }, grid: { color: 'rgba(106,135,171,0.1)' } }
    }
  };

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacter$().subscribe(char => {
      this.character = char;
      this.dashboardValues = this.characterService.calculateDashboard();
      this.buildZizChart();
    });

    this.themeObserver = new MutationObserver(() => this.buildZizChart());
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  ngOnDestroy() {
    this.themeObserver?.disconnect();
  }

  private buildZizChart() {
    const rounds = this.dashboardValues?.zizAverageRounds;
    if (!rounds?.length) { this.zizChartData = null; return; }

    const color = getComputedStyle(document.documentElement).getPropertyValue('--chart-color').trim();

    const growthLabels = rounds.map((v, i) => {
      if (i === 0 || rounds[i - 1] === 0) return '';
      const pct = ((v - rounds[i - 1]) / rounds[i - 1]) * 100;
      return '+' + pct.toFixed(1) + '%';
    });

    this.zizChartOptions.plugins.datalabels.color = color;
    this.zizChartOptions.scales.x.ticks.color = color;
    this.zizChartOptions.scales.y.ticks.color = color;
    this.zizChartOptions.scales.x.grid.color = color + '22';
    this.zizChartOptions.scales.y.grid.color = color + '22';

    this.zizChartData = {
      labels: rounds.map((_, i) => `R${i + 1}`),
      datasets: [{
        data: rounds,
        growthLabels,
        borderColor: color,
        backgroundColor: color + '26',
        pointBackgroundColor: color,
        tension: 0.3,
        fill: true
      }]
    };
  }

  getAttrValue(key: string): number {
    if (!this.character) return 0;
    return (this.character.attributes as any)[key] || 0;
  }

  get zizTotal(): number {
    return (this.dashboardValues?.zizAverageRounds ?? []).reduce((sum, v) => sum + v, 0);
  }

  zizGrowth(index: number): string {
    const rounds = this.dashboardValues?.zizAverageRounds;
    if (!rounds || index === 0 || rounds[index - 1] === 0) return '';
    const pct = ((rounds[index] - rounds[index - 1]) / rounds[index - 1]) * 100;
    return '+' + pct.toFixed(1) + '%';
  }
}
