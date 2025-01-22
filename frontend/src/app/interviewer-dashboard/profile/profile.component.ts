import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  template: `
    <div class="d-flex">
      <app-sidebar> </app-sidebar>
      <div class="container-fluid py-4">
        <h1 class="h3 mb-4">Your Profile</h1>

        <div class="row g-4">
          <!-- Profile Information -->
          <div class="col-md-8">
            <div class="card border-2 shadow-md">
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-4">
                  <div class="position-relative">
                    <div
                      class="rounded-circle bg-light d-flex align-items-center justify-content-center"
                      style="width: 80px; height: 80px;"
                    >
                      <span class="h3 mb-0 text-muted">S</span>
                    </div>
                  </div>
                  <div class="ms-3">
                    <h4 class="mb-1">Sarah Johnson</h4>
                    <p class="text-muted mb-0">sarah.johnson.example.com</p>
                  </div>
                </div>

                <div class="mb-4">
                  <h6 class="text-muted mb-2">Company</h6>
                  <p class="mb-0">TechCorp Inc.</p>
                </div>

                <div class="mb-4">
                  <h6 class="text-muted mb-2">Role</h6>
                  <p class="mb-0">Senior Software Engineer</p>
                </div>

                <div class="mb-4">
                  <h6 class="text-muted mb-2">Bio</h6>
                  <p class="mb-0">
                    Experienced software engineer with a passion for mentoring
                    and conducting technical interviews.
                  </p>
                </div>

                <div class="mb-4">
                  <h6 class="text-muted mb-2">Skills</h6>
                  <div class="d-flex flex-wrap gap-2">
                    <span class="badge bg-light text-dark">JavaScript</span>
                    <span class="badge bg-light text-dark">React</span>
                    <span class="badge bg-light text-dark">Node.js</span>
                    <span class="badge bg-light text-dark">Python</span>
                    <span class="badge bg-light text-dark">System Design</span>
                  </div>
                </div>

                <div class="d-flex align-items-center mb-3">
                  <div class="d-flex align-items-center text-success">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    <span>Verified Interviewer</span>
                  </div>
                </div>

                <button class="btn btn-dark">Edit Profile</button>
              </div>
            </div>
          </div>

          <!-- Wallet -->
          <div class="col-md-4">
            <div class="card border-2 shadow-md">
              <div class="card-body p-4">
                <h5 class="card-title mb-4">Wallet</h5>
                <p class="text-muted small mb-4">
                  Manage your earnings and cash out.
                </p>

                <div class="mb-4">
                  <label class="text-muted small mb-2">Available Balance</label>
                  <div class="d-flex align-items-center">
                    <h3 class="mb-0">$1250.75</h3>
                    <span class="ms-2 h5 mb-0 text-muted">USD</span>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="form-label text-muted small"
                    >Cashout Amount</label
                  >
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Enter amount"
                    />
                    <button class="btn btn-dark" type="button">Cash Out</button>
                  </div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <button
                    class="btn btn-link text-dark p-0 text-decoration-none"
                  >
                    <i class="bi bi-wallet2 me-2"></i>
                    Linked Accounts
                  </button>
                  <button
                    class="btn btn-link text-dark p-0 text-decoration-none"
                  >
                    Transaction History
                    <i class="bi bi-chevron-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .badge {
        font-weight: normal;
        padding: 0.5rem 1rem;
      }
      .btn-link:hover {
        opacity: 0.75;
      }
      .card {
        transition: transform 0.2s;
      }
      .card:hover {
        transform: translateY(-2px);
      }
    `,
  ],
})
export class ProfileComponent {}
