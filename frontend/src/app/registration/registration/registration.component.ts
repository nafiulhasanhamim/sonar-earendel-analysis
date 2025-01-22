// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CandidateFormComponent } from '../candidate-form/candidate-form.component';
// import { InterviewerFormComponent } from '../interviewer-form/interviewer-form.component';
// import { HrFormComponent } from '../hr-form/hr-form.component';

// @Component({
//   selector: 'app-registration',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     CandidateFormComponent,
//     InterviewerFormComponent,
//     HrFormComponent,
//   ],
//   template: `
//     <div class="container mt-5 text-light">
//       <h1 class="text-center mb-4">User Registration</h1>
//       <div class="row justify-content-center">
//         <div class="col-md-6">
//           <div class="card bg-dark shadow-sm">
//             <div class="card-body">
//               <h5 class="card-title text-center mb-4 text-primary">
//                 Select Your Role
//               </h5>
//               <select
//                 [(ngModel)]="selectedRole"
//                 (ngModelChange)="onRoleChange()"
//                 class="form-select mb-4 bg-secondary text-light"
//               >
//                 <option value="">Choose a role</option>
//                 <option value="candidate">Candidate</option>
//                 <option value="interviewer">Interviewer</option>
//                 <option value="hr">HR</option>
//               </select>
//               <ng-container [ngSwitch]="selectedRole">
//                 <app-candidate-form
//                   *ngSwitchCase="'candidate'"
//                 ></app-candidate-form>
//                 <app-interviewer-form
//                   *ngSwitchCase="'interviewer'"
//                 ></app-interviewer-form>
//                 <app-hr-form *ngSwitchCase="'hr'"></app-hr-form>
//               </ng-container>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [
//     `
//       :host {
//         display: block;
//         min-height: 100vh;
//         background-color: #1a1a1a;
//         padding: 20px 0;
//       }
//       .card {
//         border-radius: 15px;
//         border: 1px solid #444;
//       }
//       .card-title {
//         color: #007bff;
//       }
//     `,
//   ],
// })
// export class RegistrationComponent {
//   selectedRole: string = '';

//   onRoleChange() {
//     console.log('Selected role:', this.selectedRole);
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormField {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="container-fluid d-flex align-items-center justify-content-center min-vh-100"
    >
      <div
        class="card border-0 shadow-sm rounded-4 p-4"
        style="max-width: 500px; width: 100%;"
      >
        <h1 class="fw-bold mb-2">Register</h1>
        <p class="text-secondary mb-4">
          Create your account based on your role
        </p>

        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="mb-4">
            <label class="form-label fw-medium">Select your role</label>
            <select
              class="form-select form-select-lg rounded-3 border-2"
              [(ngModel)]="selectedRole"
              name="role"
              (change)="onRoleChange()"
              required
            >
              <option value="" disabled selected>Select a role</option>
              <option value="hr">HR</option>
              <option value="interviewer">Interviewer</option>
              <option value="candidate">Candidate</option>
            </select>
          </div>

          <ng-container *ngIf="selectedRole">
            <div class="mb-3" *ngFor="let field of formFields">
              <label class="form-label fw-medium">{{ field.label }}</label>
              <ng-container [ngSwitch]="field.type">
                <input
                  *ngSwitchCase="'text'"
                  [type]="field.type"
                  [name]="field.name"
                  [(ngModel)]="formData[field.name]"
                  class="form-control form-control-lg rounded-3 border-2"
                  [placeholder]="field.placeholder || ''"
                  required
                />
                <input
                  *ngSwitchCase="'password'"
                  [type]="field.type"
                  [name]="field.name"
                  [(ngModel)]="formData[field.name]"
                  class="form-control form-control-lg rounded-3 border-2"
                  required
                />
                <input
                  *ngSwitchCase="'email'"
                  [type]="field.type"
                  [name]="field.name"
                  [(ngModel)]="formData[field.name]"
                  class="form-control form-control-lg rounded-3 border-2"
                  placeholder="john@example.com"
                  required
                />
                
                  <input
                    *ngSwitchCase="'file'"
                    [type]="field.type"
                    [name]="field.name"
                    [(ngModel)]="formData[field.name]"
                    class="form-control form-control-lg rounded-3 border-2"
                    [placeholder]="field.placeholder || ''"
                    required
                  />
                <select
                  *ngSwitchCase="'select'"
                  [name]="field.name"
                  [(ngModel)]="formData[field.name]"
                  class="form-select form-select-lg rounded-3 border-2"
                  required
                >
                  <option value="" disabled selected>
                    Select {{ field.label.toLowerCase() }}
                  </option>
                  <option
                    *ngFor="let option of getOptionsForField(field.name)"
                    [value]="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </ng-container>
            </div>
          </ng-container>

          <button
            type="submit"
            class="btn btn-dark w-100 btn-lg rounded-3 mt-2"
            [disabled]="!registerForm.form.valid"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        background-color: #fff;
      }

      .form-control,
      .form-select {
        padding: 0.75rem 1rem;
        font-size: 1rem;
      }

      .form-control:focus,
      .form-select:focus {
        border-color: #000;
        box-shadow: none;
      }

      .btn-dark {
        padding: 0.75rem;
        font-size: 1rem;
      }

      .card {
        width: 100%;
      }
    `,
  ],
})
export class RegistrationComponent {
  selectedRole: string = '';
  formData: any = {};
  formFields: FormField[] = [];

  onRoleChange() {
    this.formData = {};
    this.formFields = [
      { type: 'text', name: 'name', label: 'Name' },
      { type: 'email', name: 'email', label: 'Email' },
      { type: 'password', name: 'password', label: 'Password' },
      { type: 'password', name: 'confirmPassword', label: 'Confirm Password' },
    ];

    switch (this.selectedRole) {
      case 'hr':
        this.formFields.push(
          {
            type: 'text',
            name: 'department',
            label: 'Department',
            placeholder: 'Recruitment',
          },
          {
            type: 'text',
            name: 'employeeId',
            label: 'Employee ID',
            placeholder: 'HR12345',
          }
        );
        break;
      case 'interviewer':
        this.formFields.push(
          {
            type: 'text',
            name: 'expertise',
            label: 'Areas of Expertise',
            placeholder: 'Frontend, Backend, DevOps',
          },
          {
            type: 'file',
            name: 'idCard',
            label: 'work id card image',
            placeholder: 'Enter your work idCard image',
          },
          {
            type: 'file',
            name: 'workPermit',
            label: 'work permit image',
            placeholder: 'Enter your workPermit document image',
          }
        );
        break;
      case 'candidate':
        this.formFields.push(
          {
            type: 'text',
            name: 'resumeLink',
            label: 'Resume Link',
            placeholder: 'https://example.com/my-resume',
          },
          {
            type: 'text',
            name: 'skills',
            label: 'Skills (comma-separated)',
            placeholder: 'React, Node.js, TypeScript',
          }
        );
        break;
    }
  }

  getOptionsForField(fieldName: string): string[] {
    if (fieldName === 'availability') {
      return ['Morning', 'Afternoon', 'Evening', 'Flexible'];
    }
    return [];
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Handle form submission
  }
}
