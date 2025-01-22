import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar bg-white border-end h-100">
      <div class="sidebar-header p-4 border-bottom">
        <h1 class="h5 mb-0 fw-bold">Admin</h1>
      </div>

      <nav class="sidebar-nav p-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a
              class="nav-link d-flex align-items-center gap-2"
              routerLink="/admin/overview"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              <i class="bi bi-grid"></i>
              <span>Overview</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link d-flex align-items-center gap-2"
              routerLink="/admin/candidates"
              routerLinkActive="active"
            >
              <i class="bi bi-people"></i>
              <span>Candidates</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link d-flex align-items-center gap-2"
              routerLink="/admin/hr"
              routerLinkActive="active"
            >
              <i class="bi bi-person-badge"></i>
              <span>HR</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link d-flex align-items-center gap-2"
              routerLink="/admin/interviewers"
              routerLinkActive="active"
            >
              <i class="bi bi-person-video2"></i>
              <span>Interviewers</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link d-flex align-items-center gap-2"
              routerLink="/admin/payments"
              routerLinkActive="active"
            >
              <i class="bi bi-credit-card"></i>
              <span>Payments</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link d-flex align-items-center gap-2"
              routerLink="/admin/verification"
              routerLinkActive="active"
            >
              <i class="bi bi-shield-check"></i>
              <span>Verification</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [
    `
      .sidebar {
        width: 240px;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
      }

      .nav-link {
        color: #4b5563;
        padding: 0.75rem 1rem;
        border-radius: 6px;
        font-size: 15px;
        transition: all 0.2s ease;
      }

      .nav-link:hover {
        background-color: #f3f4f6;
        color: #111827;
      }

      .nav-link.active {
        background-color: #f3f4f6;
        color: #111827;
        font-weight: 500;
        position: relative;
      }

      .nav-link.active::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 24px;
        background-color: #111827;
        border-radius: 0 2px 2px 0;
      }

      .nav-link i {
        font-size: 18px;
      }
    `,
  ],
})
export class SidebarComponent {}
