import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { InterviewListComponent } from '../interview-list/interview-list.component';
import { MetricsComponent } from '../metrics/metrics.component';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    StatsCardsComponent,
    ActionButtonsComponent,
    InterviewListComponent,
    MetricsComponent,
  ],
  template: `
    <div class="dashboard">
      <app-navbar></app-navbar>

      <div class="container-fluid py-4">
        <app-stats-cards></app-stats-cards>
        <app-action-buttons></app-action-buttons>
        <app-interview-list></app-interview-list>
        <app-metrics></app-metrics>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        min-height: 100vh;
        background-color: #f9fafb;
      }
      .container-fluid {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    `,
  ],
})
export class HrDashboardComponent {}
