import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SidebarComponent } from "../sidebar/sidebar.component"
import { PaginationComponent } from "../pagination/pagination.component"

interface HRPayment {
  company: string
  amount: number
  date: string
  status: "Paid" | "Pending"
}

interface InterviewerPayment {
  interviewer: string
  amount: number
  date: string
  status: "Completed" | "Pending"
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, SidebarComponent, PaginationComponent],
  template: `
    <div class="d-flex">
      <app-sidebar></app-sidebar>
      
      <main class="main-content bg-light">
        <div class="p-4">
          <h1 class="h4 mb-4">Payments</h1>

          <!-- HR Payments Section -->
          <div class="mb-5">
            <h2 class="h5 mb-4">HR Payments</h2>
            <div class="card border-0 shadow-sm">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="bg-light">
                    <tr>
                      <th class="border-0 px-4 py-3">Company</th>
                      <th class="border-0 px-4 py-3">Amount</th>
                      <th class="border-0 px-4 py-3">Date</th>
                      <th class="border-0 px-4 py-3">Status</th>
                      <th class="border-0 px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let payment of paginatedHRPayments">
                      <td class="px-4 py-3">{{ payment.company }}</td>
                      <td class="px-4 py-3">$ {{ payment.amount }}</td>
                      <td class="px-4 py-3">{{ payment.date }}</td>
                      <td class="px-4 py-3">
                        <span [class]="getStatusClass(payment.status)">
                          {{ payment.status }}
                        </span>
                      </td>
                      <td class="px-4 py-3">
                        <button class="btn btn-link p-0 text-decoration-none" (click)="viewDetails(payment)">
                          View Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <app-pagination
                [currentPage]="currentHRPage"
                [pageSize]="pageSize"
                [totalItems]="hrPayments.length"
                (pageChange)="onHRPageChange($event)"
              ></app-pagination>
            </div>
          </div>
          
          <!-- Interviewer Disbursements Section -->
          <div>
            <h2 class="h5 mb-4">Interviewer Disbursements</h2>
            <div class="card border-0 shadow-sm">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="bg-light">
                    <tr>
                      <th class="border-0 px-4 py-3">Interviewer</th>
                      <th class="border-0 px-4 py-3">Amount</th>
                      <th class="border-0 px-4 py-3">Date</th>
                      <th class="border-0 px-4 py-3">Status</th>
                      <th class="border-0 px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let payment of paginatedInterviewerPayments">
                      <td class="px-4 py-3">{{ payment.interviewer }}</td>
                      <td class="px-4 py-3">$ {{ payment.amount }}</td>
                      <td class="px-4 py-3">{{ payment.date }}</td>
                      <td class="px-4 py-3">
                        <span [class]="getInterviewerStatusClass(payment.status)">
                          {{ payment.status }}
                        </span>
                      </td>
                      <td class="px-4 py-3">
                        <button class="btn btn-link p-0 text-decoration-none" (click)="processPayment(payment)">
                          Process
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <app-pagination
                [currentPage]="currentInterviewerPage"
                [pageSize]="pageSize"
                [totalItems]="interviewerPayments.length"
                (pageChange)="onInterviewerPageChange($event)"
              ></app-pagination>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #F9FAFB;
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
      color: #6B7280;
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

    .status-paid {
      background-color: #ECFDF5;
      color: #059669;
    }

    .status-pending {
      background-color: #FEF3C7;
      color: #D97706;
    }

    .status-completed {
      background-color: #ECFDF5;
      color: #059669;
    }

    .btn-link {
      font-size: 14px;
      color: #2563EB;
    }

    .btn-link:hover {
      color: #1D4ED8;
    }

    @media (max-width: 991.98px) {
      .main-content {
        margin-left: 0;
        width: 100%;
      }
    }
  `]
})
export class PaymentsComponent {
  hrPayments: HRPayment[] = [
    {
      company: "TechCorp",
      amount: 5000,
      date: "2023-07-01",
      status: "Paid",
    },
    {
      company: "InnoSoft",
      amount: 3000,
      date: "2023-07-05",
      status: "Pending",
    },
    {
      company: "DataDynamics",
      amount: 7000,
      date: "2023-07-10",
      status: "Paid",
    },
  ]

  interviewerPayments: InterviewerPayment[] = [
    {
      interviewer: "Alex Johnson",
      amount: 500,
      date: "2023-07-15",
      status: "Pending",
    },
    {
      interviewer: "Samantha Lee",
      amount: 750,
      date: "2023-07-14",
      status: "Completed",
    },
    {
      interviewer: "Chris Taylor",
      amount: 600,
      date: "2023-07-16",
      status: "Pending",
    },
    {
      interviewer: "Rachel Green",
      amount: 450,
      date: "2023-07-13",
      status: "Completed",
    },
  ]

  currentHRPage = 1
  currentInterviewerPage = 1
  pageSize = 10

  get paginatedHRPayments(): HRPayment[] {
    const start = (this.currentHRPage - 1) * this.pageSize
    const end = start + this.pageSize
    return this.hrPayments.slice(start, end)
  }

  get paginatedInterviewerPayments(): InterviewerPayment[] {
    const start = (this.currentInterviewerPage - 1) * this.pageSize
    const end = start + this.pageSize
    return this.interviewerPayments.slice(start, end)
  }

  getStatusClass(status: string): string {
    const baseClass = "status-badge"
    return `${baseClass} status-${status.toLowerCase()}`
  }

  getInterviewerStatusClass(status: string): string {
    const baseClass = "status-badge"
    return `${baseClass} status-${status.toLowerCase()}`
  }

  viewDetails(payment: HRPayment) {
    console.log("View details:", payment)
  }

  processPayment(payment: InterviewerPayment) {
    console.log("Process payment:", payment)
  }

  onHRPageChange(page: number): void {
    this.currentHRPage = page
  }

  onInterviewerPageChange(page: number): void {
    this.currentInterviewerPage = page
  }
}

