import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-3">
      <label for="otp" class="form-label">Enter OTP</label>
      <input
        type="text"
        class="form-control bg-secondary text-light"
        id="otp"
        [(ngModel)]="otp"
        name="otp"
        required
      />
    </div>
    <button type="button" class="btn btn-primary w-100" (click)="verifyOtp()">
      Verify OTP
    </button>
  `,
})
export class OtpVerificationComponent {
  @Output() verified = new EventEmitter<boolean>();
  otp: string = '';

  constructor(private registrationService: RegistrationService) {}

  verifyOtp() {
    this.registrationService.verifyOtp(this.otp).subscribe(
      (result) => {
        this.verified.emit(result);
        if (result) {
          console.log('OTP verified successfully');
        } else {
          console.error('Invalid OTP');
        }
      },
      (error) => {
        console.error('Error verifying OTP:', error);
        this.verified.emit(false);
      }
    );
  }
}
