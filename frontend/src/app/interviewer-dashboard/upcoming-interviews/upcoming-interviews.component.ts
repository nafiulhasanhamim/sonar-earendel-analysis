import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface Interview {
  candidate: string;
  role: string;
  company: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-upcoming-interviews',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="d-flex">
      <app-sidebar> </app-sidebar>
      <div class="container-fluid py-4">
        <h1 class="h3 mb-2">Upcoming Interviews</h1>
        <p class="text-muted mb-4">You have 5 interviews scheduled</p>

        <div class="card border-2 shadow-md">
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th class="ps-4">Candidate</th>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th class="pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let interview of interviews">
                    <td class="ps-4">{{ interview.candidate }}</td>
                    <td>{{ interview.role }}</td>
                    <td>{{ interview.company }}</td>
                    <td>{{ interview.date }}</td>
                    <td>{{ interview.time }}</td>
                    <td class="pe-4">
                      <button class="btn btn-outline-dark btn-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="border-top p-3 text-center">
              <a href="#" class="text-decoration-none text-dark"
                >View All Interviews</a
              >
            </div>
          </div>
        </div>
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
      .table {
        margin-bottom: 0;
      }
      .table th {
        border-top: none;
        border-bottom-width: 1px;
        font-weight: 500;
        text-transform: uppercase;
        font-size: 0.75rem;
        color: #6c757d;
        padding: 1rem;
      }
      .table td {
        padding: 1rem;
        vertical-align: middle;
      }
      .btn-outline-dark {
        border-color: #dee2e6;
      }
      .btn-outline-dark:hover {
        background-color: #000;
        border-color: #000;
      }
    `,
  ],
})
export class UpcomingInterviewsComponent {
  interviews: Interview[] = [
    {
      candidate: 'John Doe',
      role: 'Frontend Developer',
      company: 'TechCorp',
      date: '2023-07-20',
      time: '14:00',
    },
    {
      candidate: 'Jane Smith',
      role: 'Backend Developer',
      company: 'InnoSoft',
      date: '2023-07-21',
      time: '10:30',
    },
    {
      candidate: 'Mike Johnson',
      role: 'Full Stack Developer',
      company: 'WebWizards',
      date: '2023-07-22',
      time: '15:45',
    },
    {
      candidate: 'Emily Brown',
      role: 'DevOps Engineer',
      company: 'CloudTech',
      date: '2023-07-23',
      time: '11:00',
    },
    {
      candidate: 'Chris Lee',
      role: 'Mobile Developer',
      company: 'AppMakers',
      date: '2023-07-24',
      time: '13:30',
    },
  ];
}
