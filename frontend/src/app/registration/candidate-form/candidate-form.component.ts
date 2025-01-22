import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-candidate-form',
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
        <label for="skills" class="form-label">Skills</label>
        <input
          type="text"
          class="form-control"
          id="skills"
          [(ngModel)]="skills"
          name="skills"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">
        Register as Candidate
      </button>
    </form>
  `,
})
export class CandidateFormComponent {
  name: string = '';
  email: string = '';
  skills: string = '';

  constructor(private registrationService: RegistrationService) {}

  onSubmit() {
    this.registrationService.registerCandidate(
      this.name,
      this.email,
      this.skills
    );
  }
}
