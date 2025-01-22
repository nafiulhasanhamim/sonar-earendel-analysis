import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  template: `
    <div class="d-flex">
      <app-sidebar> </app-sidebar>

      <div class="container-fluid py-4">
        <h1 class="h3 mb-2">Set Your Availability</h1>
        <p class="text-muted mb-4">
          Select the dates and times when you're available to conduct
          interviews. This helps us match you with potential candidates.
        </p>

        <div class="row g-4">
          <!-- Calendar Section -->
          <div class="col-md-6">
            <div class="card border-2 shadow-md">
              <div class="card-body">
                <h5 class="card-title mb-4">Select Dates</h5>
                <p class="text-muted small mb-3">
                  Choose the dates you're available for interviews
                </p>

                <div class="calendar">
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <button
                      class="btn btn-link text-dark p-0"
                      (click)="previousMonth()"
                    >
                      <i class="bi bi-chevron-left"></i>
                    </button>
                    <h6 class="mb-0">{{ currentMonth }} {{ currentYear }}</h6>
                    <button
                      class="btn btn-link text-dark p-0"
                      (click)="nextMonth()"
                    >
                      <i class="bi bi-chevron-right"></i>
                    </button>
                  </div>

                  <div class="calendar-grid">
                    <!-- Days of week -->
                    <div class="calendar-header">
                      <div
                        *ngFor="let day of daysOfWeek"
                        class="text-muted small"
                      >
                        {{ day }}
                      </div>
                    </div>

                    <!-- Calendar days -->
                    <div class="calendar-body">
                      <div
                        *ngFor="let week of calendarDays"
                        class="calendar-week"
                      >
                        <div
                          *ngFor="let day of week"
                          class="calendar-day"
                          [class.text-muted]="!day.isCurrentMonth"
                          [class.selected]="isDateSelected(day.date)"
                          (click)="toggleDate(day.date)"
                        >
                          {{ day.dayNumber }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Availability Settings -->
          <div class="col-md-4">
            <div class="card border-2 shadow-md">
              <div class="card-body">
                <h5 class="card-title mb-4">Set Availability</h5>
                <p class="text-muted small mb-3">
                  Set your availability for the selected date
                </p>

                <div class="mb-3">
                  <div
                    class="d-flex align-items-center justify-content-between mb-3"
                  >
                    <div class="dropdown">
                      <button
                        class="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        id="timeSlotDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {{ selectedTimeSlot }}
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="timeSlotDropdown"
                      >
                        <li *ngFor="let slot of timeSlots">
                          <a
                            class="dropdown-item"
                            (click)="selectTimeSlot(slot)"
                            >{{ slot }}</a
                          >
                        </li>
                      </ul>
                    </div>

                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="availabilityToggle"
                        [(ngModel)]="isAvailable"
                      />
                      <label class="form-check-label" for="availabilityToggle"
                        >Available</label
                      >
                    </div>
                  </div>
                </div>

                <button class="btn btn-dark w-15" (click)="saveAvailability()">
                  Save Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  styles: [
    `
      .nav-link {
        color: #666;
        transition: all 0.3s;
      }
      .nav-link:hover,
      .nav-link.active {
        background-color: #f8f9fa;
        color: #000;
      }
      .card {
        transition: transform 0.2s;
      }
      .card:hover {
        transform: translateY(-2px);
      }
      .activity-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .upcoming-interviews {
        max-height: 300px;
        overflow-y: auto;
      }

      .calendar {
        user-select: none;
      }
      .calendar-grid {
        display: grid;
        gap: 1rem;
      }
      .calendar-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        font-weight: 500;
      }
      .calendar-week {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;
      }
      .calendar-day {
        padding: 0.5rem;
        text-align: center;
        cursor: pointer;
        border-radius: 0.25rem;
        transition: all 0.2s;
      }
      .calendar-day:hover {
        background-color: #f8f9fa;
      }
      .calendar-day.selected {
        background-color: #000;
        color: #fff;
      }
      .calendar-day.text-muted {
        opacity: 0.5;
      }
      .form-check-input:checked {
        background-color: #000;
        border-color: #000;
      }
      .dropdown-item {
        cursor: pointer;
      }
      .dropdown-item:active {
        background-color: #000;
      }
    `,
  ],
})
export class AvailabilityComponent {
  daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  currentMonth = 'January';
  currentYear = 2025;
  selectedDates: Date[] = [];
  timeSlots = [
    'Morning (9AM)',
    'Late Morning (11AM)',
    'Afternoon (2PM)',
    'Late Afternoon (4PM)',
  ];
  selectedTimeSlot = 'Morning (9AM)';
  isAvailable = false;

  calendarDays = this.generateCalendarDays();

  generateCalendarDays() {
    // This is a simplified version. In a real implementation,
    // you would generate actual calendar days based on the current month
    return Array(5)
      .fill(null)
      .map((_, weekIndex) =>
        Array(7)
          .fill(null)
          .map((_, dayIndex) => ({
            date: new Date(2025, 0, weekIndex * 7 + dayIndex + 1),
            dayNumber: weekIndex * 7 + dayIndex + 1,
            isCurrentMonth: true,
          }))
      );
  }

  previousMonth() {
    // Implementation for navigating to previous month
    console.log('Navigate to previous month');
  }

  nextMonth() {
    // Implementation for navigating to next month
    console.log('Navigate to next month');
  }

  isDateSelected(date: Date) {
    return this.selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );
  }

  toggleDate(date: Date) {
    const index = this.selectedDates.findIndex(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    if (index === -1) {
      this.selectedDates.push(date);
    } else {
      this.selectedDates.splice(index, 1);
    }
  }

  selectTimeSlot(slot: string) {
    this.selectedTimeSlot = slot;
  }

  saveAvailability() {
    console.log('Saving availability:', {
      dates: this.selectedDates,
      timeSlot: this.selectedTimeSlot,
      isAvailable: this.isAvailable,
    });
    // Here you would implement the API call to save the availability
  }
}
