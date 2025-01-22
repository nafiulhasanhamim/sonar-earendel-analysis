import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PaginationComponent } from '../pagination/pagination.component';

interface Candidate {
  name: string;
  email: string;
  status: 'Active' | 'Pending' | 'Inactive';
  interviews: number;
}

@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [CommonModule, SidebarComponent, PaginationComponent],
  template: `
    <div class="d-flex">
      <app-sidebar></app-sidebar>

      <main class="main-content bg-light">
        <div class="p-4">
          <h1 class="h4 mb-4">HR List</h1>

          <div class="card border-0 shadow-sm">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="bg-light">
                  <tr>
                    <th class="border-0 px-4 py-3">Name</th>
                    <th class="border-0 px-4 py-3">Email</th>
                    <th class="border-0 px-4 py-3">Status</th>
                    <th class="border-0 px-4 py-3">Interviews</th>
                    <th class="border-0 px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let candidate of paginatedCandidates">
                    <td class="px-4 py-3">{{ candidate.name }}</td>
                    <td class="px-4 py-3">{{ candidate.email }}</td>
                    <td class="px-4 py-3">
                      <span [class]="getStatusClass(candidate.status)">
                        {{ candidate.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3">{{ candidate.interviews }}</td>
                    <td class="px-4 py-3">
                      <div class="d-flex gap-2">
                        <button
                          class="btn btn-link p-0 text-decoration-none"
                          (click)="editCandidate(candidate)"
                        >
                          Edit
                        </button>
                        <button
                          class="btn btn-link p-0 text-decoration-none text-danger"
                          (click)="deleteCandidate(candidate)"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <app-pagination
                [currentPage]="currentPage"
                [pageSize]="pageSize"
                [totalItems]="candidates.length"
                (pageChange)="onPageChange($event)"
              ></app-pagination>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background-color: #f9fafb;
      }

      .main-content {
        margin-left: 240px;
        width: calc(100% - 240px);
        min-height: 100vh;
      }

      .card {
        border-radius: 8px;
      }

      .table {
        margin-bottom: 0;
      }

      .table th {
        font-weight: 500;
        font-size: 14px;
        color: #6b7280;
      }

      .table td {
        font-size: 14px;
        vertical-align: middle;
      }

      .status-badge {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 500;
      }

      .status-active {
        background-color: #ecfdf5;
        color: #059669;
      }

      .status-pending {
        background-color: #fef3c7;
        color: #d97706;
      }

      .status-inactive {
        background-color: #fee2e2;
        color: #dc2626;
      }

      .btn-link {
        font-size: 14px;
      }

      @media (max-width: 991.98px) {
        .main-content {
          margin-left: 0;
          width: 100%;
        }
      }
    `,
  ],
})
export class HrComponent {
  currentPage = 1;
  pageSize = 10;

  candidates: Candidate[] = Array(25)
    .fill(null)
    .map((_, index) => ({
      name: `Candidate ${index + 1}`,
      email: `candidate${index + 1}@example.com`,
      status: ['Active', 'Pending', 'Inactive'][
        Math.floor(Math.random() * 3)
      ] as any,
      interviews: Math.floor(Math.random() * 10),
    }));

  get paginatedCandidates(): Candidate[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.candidates.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getStatusClass(status: string): string {
    const baseClass = 'status-badge';
    switch (status) {
      case 'Active':
        return `${baseClass} status-active`;
      case 'Pending':
        return `${baseClass} status-pending`;
      case 'Inactive':
        return `${baseClass} status-inactive`;
      default:
        return baseClass;
    }
  }

  editCandidate(candidate: Candidate) {
    console.log('Edit candidate:', candidate);
  }

  deleteCandidate(candidate: Candidate) {
    console.log('Delete candidate:', candidate);
  }
}
