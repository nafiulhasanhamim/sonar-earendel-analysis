import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-hr-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          [(ngModel)]="name"
          name="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          [(ngModel)]="email"
          name="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="department" class="form-label">Department</label>
        <input
          type="text"
          class="form-control"
          id="department"
          [(ngModel)]="department"
          name="department"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">
        Register as HR
      </button>
    </form>
  `,
})
export class HrFormComponent {
  name: string = '';
  email: string = '';
  department: string = '';

  constructor(private registrationService: RegistrationService) {}

  onSubmit() {
    this.registrationService.registerHr(this.name, this.email, this.department);
  }
}
