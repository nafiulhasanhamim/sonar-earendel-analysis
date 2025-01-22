import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  registerCandidate(name: string, email: string, skills: string) {
    console.log('Registering candidate:', { name, email, skills });
    // Here you would typically make an API call to register the candidate
  }

  sendOtp(email: string): Observable<boolean> {
    console.log('Sending OTP to:', email);
    // Simulate OTP sending (replace with actual API call)
    return of(true).pipe(delay(1000));
  }

  verifyOtp(otp: string): Observable<boolean> {
    console.log('Verifying OTP:', otp);
    // Simulate OTP verification (replace with actual API call)
    return of(otp === '123456').pipe(delay(1000));
  }

  registerInterviewer(
    name: string,
    email: string,
    expertise: string,
    linkedin: string,
    idCard: File | null,
    workPermit: File | null
  ) {
    console.log('Registering interviewer:', {
      name,
      email,
      expertise,
      linkedin,
    });
    console.log('ID Card:', idCard);
    console.log('Work Permit:', workPermit);
    // Here you would typically make an API call to register the interviewer and upload the files
  }

  registerHr(name: string, email: string, department: string) {
    console.log('Registering HR:', { name, email, department });
    // Here you would typically make an API call to register the HR
  }
}
