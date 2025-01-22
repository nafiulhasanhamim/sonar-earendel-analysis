import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';

@Component({
  selector: 'app-interviewer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, OtpVerificationComponent],
  template: `
    <form (ngSubmit)="onSubmit()" class="text-light">
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input
          type="text"
          class="form-control bg-secondary text-light"
          id="name"
          [(ngModel)]="name"
          name="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Work Email</label>
        <input
          type="email"
          class="form-control bg-secondary text-light"
          id="email"
          [(ngModel)]="email"
          name="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="expertise" class="form-label">Areas of Expertise</label>
        <input
          type="text"
          class="form-control bg-secondary text-light"
          id="expertise"
          [(ngModel)]="expertise"
          name="expertise"
          required
        />
      </div>
      <div class="mb-3">
        <label for="idCard" class="form-label">ID Card</label>
        <input
          type="file"
          class="form-control bg-secondary text-light"
          id="idCard"
          (change)="onFileSelected($event, 'idCard')"
          accept="image/*,application/pdf"
          required
        />
      </div>
      <div class="mb-3">
        <label for="workPermit" class="form-label">Work Permit Document</label>
        <input
          type="file"
          class="form-control bg-secondary text-light"
          id="workPermit"
          (change)="onFileSelected($event, 'workPermit')"
          accept="image/*,application/pdf"
          required
        />
      </div>
      <div class="mb-3">
        <label for="linkedin" class="form-label">LinkedIn Profile URL</label>
        <input
          type="url"
          class="form-control bg-secondary text-light"
          id="linkedin"
          [(ngModel)]="linkedin"
          name="linkedin"
          required
        />
      </div>
      <button
        type="button"
        class="btn btn-primary w-100 mb-3"
        (click)="sendOtp()"
        [disabled]="!email"
      >
        Send OTP
      </button>
      <app-otp-verification
        *ngIf="otpSent"
        (verified)="onOtpVerified($event)"
      ></app-otp-verification>
      <button
        type="submit"
        class="btn btn-success w-100"
        [disabled]="!otpVerified"
      >
        Register as Interviewer
      </button>
    </form>
  `,
})
export class InterviewerFormComponent {
  name: string = '';
  email: string = '';
  expertise: string = '';
  linkedin: string = '';
  idCard: File | null = null;
  workPermit: File | null = null;
  otpSent: boolean = false;
  otpVerified: boolean = false;

  constructor(private registrationService: RegistrationService) {}

  onFileSelected(event: Event, fileType: 'idCard' | 'workPermit') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this[fileType] = file;
    }
  }

  sendOtp() {
    this.registrationService.sendOtp(this.email).subscribe(
      () => {
        this.otpSent = true;
        console.log('OTP sent successfully');
      },
      (error) => {
        console.error('Error sending OTP:', error);
      }
    );
  }

  onOtpVerified(verified: boolean) {
    this.otpVerified = verified;
  }

  onSubmit() {
    if (this.otpVerified) {
      this.registrationService.registerInterviewer(
        this.name,
        this.email,
        this.expertise,
        this.linkedin,
        this.idCard,
        this.workPermit
      );
    } else {
      console.error('OTP not verified');
    }
  }
}
