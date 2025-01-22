import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <header class="header">
        <div class="header-left">
          <h1>TalentMest</h1>
          <nav>
            <a href="#" class="active">Internal Interviews</a>
            <a href="#">Outsourced Interviews</a>
            <a href="#">Assignments</a>
            <a href="#">Analytics</a>
          </nav>
        </div>
        <div class="header-right">
          <div class="search-container">
            <input
              type="search"
              placeholder="Search candidate name, profile etc."
            />
            <i class="bi bi-search"></i>
          </div>
          <button class="icon-btn"><i class="bi bi-bell"></i></button>
          <button class="icon-btn"><i class="bi bi-gear"></i></button>
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            class="profile-img"
          />
        </div>
      </header>

      <main class="main-content">
        <div class="left-section">
          <h2>Select profile to request interviewer</h2>
          <div class="search-box">
            <input type="search" placeholder="Search profile" />
            <i class="bi bi-search"></i>
          </div>

          <div class="profiles-grid">
            <div
              class="profile-card"
              *ngFor="let profile of profiles"
              (click)="selectProfile(profile.id)"
            >
              <div class="icon-container">
                <i [class]="profile.icon"></i>
              </div>
              <span class="title">{{ profile.title }}</span>
            </div>
          </div>
        </div>

        <div class="right-section">
          <h2>Request an existing profile's interview</h2>

          <div class="existing-profiles">
            <div class="profile-item" *ngFor="let item of existingProfiles">
              <div class="profile-header">
                <h3>{{ item.title }}</h3>
                <button class="add-btn">
                  Add candidates
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              <p class="seniority">{{ item.seniority }}</p>
              <div class="profile-footer">
                <span>{{ item.domain }} • {{ item.candidates }} candidate</span>
                <a href="#" class="view-details">
                  View details
                  <i class="bi bi-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .container {
        min-height: 100vh;
        background: #fff;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        border-bottom: 1px solid #eee;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 2rem;

        h1 {
          font-size: 1.25rem;
          margin: 0;
        }

        nav {
          display: flex;
          gap: 1.5rem;

          a {
            color: #666;
            text-decoration: none;
            font-size: 0.875rem;

            &.active {
              color: #000;
            }
          }
        }
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .search-container {
        position: relative;

        input {
          padding: 0.5rem 1rem;
          padding-left: 2.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 300px;
          font-size: 0.875rem;
        }

        i {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }
      }

      .icon-btn {
        background: none;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        color: #666;
      }

      .profile-img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      .main-content {
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: 2rem;
        padding: 2rem;
      }

      .left-section {
        h2 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }
      }

      .search-box {
        position: relative;
        margin-bottom: 2rem;

        input {
          width: 100%;
          padding: 0.75rem 1rem;
          padding-left: 2.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        i {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }
      }

      .profiles-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
      }

      .profile-card {
        padding: 1.5rem;
        border: 1px solid #eee;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: #000;
          transform: translateY(-2px);
        }

        .icon-container {
          width: 48px;
          height: 48px;
          margin: 0 auto 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;

          i {
            font-size: 1.5rem;
            color: #666;
          }
        }

        .title {
          font-size: 0.875rem;
          color: #333;
        }
      }

      .right-section {
        h2 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }
      }

      .existing-profiles {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .profile-item {
        padding: 1.5rem;
        border: 1px solid #eee;
        border-radius: 8px;

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;

          h3 {
            font-size: 1rem;
            margin: 0;
          }
        }

        .add-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #000;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;

          &:hover {
            background: #333;
          }
        }

        .seniority {
          color: #666;
          font-size: 0.875rem;
          margin: 0.5rem 0;
        }

        .profile-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: #666;

          .view-details {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            color: #0066cc;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      @media (max-width: 1024px) {
        .main-content {
          grid-template-columns: 1fr;
        }

        .right-section {
          order: -1;
        }
      }

      @media (max-width: 768px) {
        .header-left nav {
          display: none;
        }

        .search-container input {
          width: 200px;
        }

        .profiles-grid {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }
      }
    `,
  ],
})
export class ProfileSelectionComponent {
  profiles = [
    { id: 'frontend', title: 'Frontend', icon: 'bi bi-window' },
    { id: 'backend', title: 'Backend', icon: 'bi bi-code-slash' },
    { id: 'architect', title: 'Architect', icon: 'bi bi-diagram-3' },
    { id: 'automation', title: 'Automation Engineering', icon: 'bi bi-gear' },
    { id: 'database', title: 'Database', icon: 'bi bi-database' },
    { id: 'analyst', title: 'Business Analyst', icon: 'bi bi-graph-up' },
    { id: 'data', title: 'Data Engineering', icon: 'bi bi-cpu' },
    { id: 'security', title: 'Cyber Security', icon: 'bi bi-shield-lock' },
  ];

  existingProfiles = [
    {
      title: 'Frontend role - e1Xve',
      seniority: 'Senior 5-8 years',
      domain: 'Frontend',
      candidates: 1,
    },
    {
      title: 'Backend role - E8-ls',
      seniority: 'Senior 2-3 years',
      domain: 'Backend',
      candidates: 1,
    },
    {
      title: 'SQA role - pDgQ4',
      seniority: 'Senior 4-5 years',
      domain: 'SQA',
      candidates: 1,
    },
  ];

  constructor(private router: Router) {}

  selectProfile(id: string) {
    this.router.navigate(['/customize', id]);
  }
}
