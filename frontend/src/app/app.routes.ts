import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration/registration.component';
import { InterviewerDashboardComponent } from './interviewer-dashboard/interviewer-dashboard/interviewer-dashboard.component';
import { AvailabilityComponent } from './interviewer-dashboard/availability/availability.component';
import { UpcomingInterviewsComponent } from './interviewer-dashboard/upcoming-interviews/upcoming-interviews.component';
import { EarningsComponent } from './interviewer-dashboard/earnings/earnings.component';
import { ProfileComponent } from './interviewer-dashboard/profile/profile.component';
import { BackendSkillsComponent } from './hr-dashboard/backend-skills/backend-skills.component';
import { InterviewRequestComponent } from './hr-dashboard/interview-request/interview-request.component';
import { SenioritySelectComponent } from './hr-dashboard/seniority-select/seniority-select.component';
import { CustomizeInterviewComponent } from './hr-dashboard/customize/customize-interview/customize-interview.component';
import { HrDashboardComponent } from './hr-dashboard/dashboard/dashboard.component';
import { InterviewSetupComponent } from './candidate-dashboard/interview-setup/interview-setup.component';
import { LandingComponent } from './landing-page/landing/landing.component';
import { ProfileSelectionComponent } from './hr-dashboard/job-post/profile-selection/profile-selection.component';
import { TechnologySelectionComponent } from './hr-dashboard/job-post/technology-selection/technology-selection.component';
import { SenioritySelectionComponent } from './hr-dashboard/job-post/seniority-selection/seniority-selection.component';
import { CustomizedInterviewComponent } from './hr-dashboard/job-post/customize-interview/customize-interview.component';
import { AdminDashboardComponent } from './admin-dashboard/dashboard/dashboard.component';
import { CandidatesComponent } from './admin-dashboard/candidates/candidates.component';
import { HrComponent } from './admin-dashboard/hr/hr.component';
import { InterviewersComponent } from './admin-dashboard/interviewers/interviewers.component';
import { PaymentsComponent } from './admin-dashboard/payments/payments.component';
import { VerificationComponent } from './admin-dashboard/verification/verification.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },

  { path: 'settings', component: SettingsComponent },
  { path: 'candidate-dashboard', component: DashboardComponent },
  { path: 'interview-setup', component: InterviewSetupComponent },

  { path: 'register', component: RegistrationComponent },
  {
    path: 'interviewer-dashboard',
    component: InterviewerDashboardComponent,
  },

  { path: 'hr-dashboard', component: HrDashboardComponent },
  { path: 'job-post', component: ProfileSelectionComponent },
  { path: 'customize/:domain', component: TechnologySelectionComponent },
  { path: 'seniority/:domain/:tech', component: SenioritySelectionComponent },
  {
    path: 'customized/:domain/:tech/:seniority',
    component: CustomizedInterviewComponent,
  },
  // { path: 'backend-skills', component: BackendSkillsComponent },
  // { path: 'interview-request', component: InterviewRequestComponent },

  // { path: 'seniority-select', component: SenioritySelectComponent },
  // { path: 'customize-interview', component: CustomizeInterviewComponent },

  { path: 'availability', component: AvailabilityComponent },
  { path: 'upcoming', component: UpcomingInterviewsComponent },
  { path: 'earnings', component: EarningsComponent },
  { path: 'profile', component: ProfileComponent },


  {
    path: 'admin',
    children: [
      { path: 'overview', component: AdminDashboardComponent },
      { path: 'candidates', component: CandidatesComponent },
      { path: 'hr', component: HrComponent },
      { path: 'interviewers', component: InterviewersComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'verification', component: VerificationComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },

];
