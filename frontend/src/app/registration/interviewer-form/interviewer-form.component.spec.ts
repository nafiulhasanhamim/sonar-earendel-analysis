import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerFormComponent } from './interviewer-form.component';

describe('InterviewerFormComponent', () => {
  let component: InterviewerFormComponent;
  let fixture: ComponentFixture<InterviewerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
