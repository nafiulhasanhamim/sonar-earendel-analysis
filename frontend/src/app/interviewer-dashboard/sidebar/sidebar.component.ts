import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
      <!-- Sidebar -->
      <div
        class="sidebar bg-white border-end"
        style="width: 240px; height: 100vh;"
      >
        <div class="p-4">
          <h2 class="h6 mb-4">Menu</h2>
          <nav class="nav flex-column gap-2">
            <a
              class="nav-link active px-3 py-2 rounded-2"
              routerLink="/interviewer-dashboard"
            >
              Dashboard
            </a>
            <a class="nav-link px-3 py-2 rounded-2" routerLink="/availability">
              Availability
            </a>
            <a class="nav-link px-3 py-2 rounded-2" routerLink="/upcoming">
              Upcoming Interviews
            </a>
            <a
              class="nav-link px-3 py-2 rounded-2"
              routerLink="/past-interviews"
            >
              Past Interviews
            </a>
            <a class="nav-link px-3 py-2 rounded-2" routerLink="/earnings">
              Earnings
            </a>
            <a class="nav-link px-3 py-2 rounded-2" routerLink="/profile">
              Profile
            </a>
          </nav>
        </div>
      </div>
  `,
  styles: [
    `
      .nav-link {
        color: #666;
        transition: all 0.3s;
      }
      .nav-link:hover,
      .nav-link.active {
        background-color: #f8f9fa;
        color: #000;
      }
      .card {
        transition: transform 0.2s;
      }
      .card:hover {
        transform: translateY(-2px);
      }
      .activity-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .upcoming-interviews {
        max-height: 300px;
        overflow-y: auto;
      }
    `,
  ],
})
export class SidebarComponent {}
