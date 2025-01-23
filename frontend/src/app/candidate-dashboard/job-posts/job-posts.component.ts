import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="jobs-container">
      <h2>Job Posts</h2>
      <div class="search-filter-container">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (ngModelChange)="search()"
          placeholder="Search jobs..."
          class="search-input"
        />
        <select
          [(ngModel)]="selectedExperience"
          (ngModelChange)="filter()"
          class="filter-select"
        >
          <option value="">All Experience</option>
          <option value="0-2">0-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5+">5+ years</option>
        </select>
        <select
          [(ngModel)]="selectedStatus"
          (ngModelChange)="filter()"
          class="filter-select"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div class="jobs-list">
        <div *ngFor="let job of paginatedJobs" class="job-card">
          <div class="card-header">
            <h3>{{ job.position }}</h3>
            <span [class]="'status-badge ' + job.status">
              {{ job.status }}
            </span>
          </div>
          <div class="card-content">
            <div class="company-info">
              <h4>{{ job.companyName }}</h4>
              <span class="posted-date">Posted {{ job.posted }}</span>
            </div>
            <div class="detail-row">
              <i class="bi bi-briefcase"></i>
              <span>{{ job.experience }} years experience</span>
            </div>
            <div class="detail-row">
              <i class="bi bi-currency-dollar"></i>
              <span>{{ job.salary }}</span>
            </div>
            <div class="skills-list">
              <span *ngFor="let skill of job.skills" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="card-actions">
            <button
              class="apply-btn"
              [disabled]="job.status === 'closed'"
              (click)="applyForJob(job.id)"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button
          (click)="changePage(-1)"
          [disabled]="currentPage === 1"
          class="pagination-btn"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          (click)="changePage(1)"
          [disabled]="currentPage === totalPages"
          class="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .jobs-container {
        padding: 24px;
      }

      h2 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 24px;
      }

      .search-filter-container {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
      }

      .search-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        font-size: 14px;
      }

      .filter-select {
        padding: 10px;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        font-size: 14px;
        background-color: white;
      }

      .jobs-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
      }

      .job-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 16px;

        h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #333;
        }
      }

      .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
      }

      .active {
        background: #e6f4ea;
        color: #1e7e34;
      }

      .closed {
        background: #feeeee;
        color: #dc3545;
      }

      .company-info {
        margin-bottom: 16px;

        h4 {
          font-size: 16px;
          font-weight: 500;
          margin: 0 0 4px;
          color: #333;
        }

        .posted-date {
          font-size: 12px;
          color: #666;
        }
      }

      .detail-row {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;
        font-size: 14px;
        margin-bottom: 8px;

        i {
          font-size: 16px;
          color: #999;
        }
      }

      .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 16px 0;
      }

      .skill-tag {
        padding: 4px 12px;
        background: #f8f9fa;
        border-radius: 16px;
        font-size: 12px;
        color: #666;
      }

      .card-actions {
        margin-top: 20px;
      }

      .apply-btn {
        width: 100%;
        padding: 10px;
        background: #0066ff;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #0052cc;
        }

        &:disabled {
          background: #e9ecef;
          color: #666;
          cursor: not-allowed;
        }
      }

      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 24px;
        gap: 16px;
      }

      .pagination-btn {
        padding: 8px 16px;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
          background: #e9ecef;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      @media (max-width: 768px) {
        .jobs-container {
          padding: 16px;
        }

        .search-filter-container {
          flex-direction: column;
        }

        .jobs-list {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class JobPostsComponent {
  jobs: any[] = [
    {
      id: '1',
      companyName: 'Tech Corp',
      position: 'Senior Frontend Developer',
      experience: '5+',
      salary: '$120k - $150k',
      skills: ['React', 'TypeScript', 'Node.js'],
      posted: '2 days ago',
      status: 'active',
    },
    {
      id: '2',
      companyName: 'Innovation Labs',
      position: 'Full Stack Developer',
      experience: '3-5',
      salary: '$90k - $120k',
      skills: ['Angular', 'Python', 'PostgreSQL'],
      posted: '1 week ago',
      status: 'active',
    },
    // Add more mock data here...
    {
      id: '3',
      companyName: 'Acme Corp',
      position: 'Backend Developer',
      experience: '2+',
      salary: '$80k - $100k',
      skills: ['Java', 'Spring Boot', 'MySQL'],
      posted: '3 days ago',
      status: 'active',
    },
    {
      id: '4',
      companyName: 'Beta Solutions',
      position: 'Data Scientist',
      experience: '4+',
      salary: '$110k - $140k',
      skills: ['Python', 'Pandas', 'Scikit-learn'],
      posted: '1 week ago',
      status: 'closed',
    },
    {
      id: '5',
      companyName: 'Gamma Industries',
      position: 'DevOps Engineer',
      experience: '3+',
      salary: '$100k - $130k',
      skills: ['Docker', 'Kubernetes', 'AWS'],
      posted: '2 weeks ago',
      status: 'active',
    },
    {
      id: '6',
      companyName: 'Delta Technologies',
      position: 'UI/UX Designer',
      experience: '2+',
      salary: '$70k - $90k',
      skills: ['Figma', 'Sketch', 'Adobe XD'],
      posted: '1 day ago',
      status: 'active',
    },
  ];

  filteredJobs: any[] = [];
  paginatedJobs: any[] = [];
  searchTerm = '';
  selectedExperience = '';
  selectedStatus = '';
  currentPage = 1;
  pageSize = 3;
  totalPages = 1;

  ngOnInit() {
    this.filteredJobs = [...this.jobs];
    this.updatePagination();
  }

  search() {
    this.filter();
  }

  filter() {
    this.filteredJobs = this.jobs.filter(
      (job) =>
        (job.companyName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
          job.position.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          job.skills.some((skill: any) =>
            skill.toLowerCase().includes(this.searchTerm.toLowerCase())
          )) &&
        (this.selectedExperience === '' ||
          job.experience === this.selectedExperience) &&
        (this.selectedStatus === '' || job.status === this.selectedStatus)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredJobs.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedJobs = this.filteredJobs.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  changePage(delta: number) {
    this.currentPage += delta;
    this.updatePagination();
  }

  applyForJob(jobId: string) {
    // Implement apply logic
    console.log(`Applying for job ${jobId}`);
  }
}
