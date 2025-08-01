import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-department-report',
  imports: [CommonModule],
  templateUrl: './department-report.html',
  styleUrl: './department-report.scss'
})
export class DepartmentReport implements OnInit {
  private reportService = inject(ReportService);
  
  departmentData: any[] = [];
  loading = true;
  protected readonly currentYear = new Date().getFullYear();

  ngOnInit() {
    this.loadDepartmentData();
  }

  private loadDepartmentData() {
    this.reportService.getDepartmentBillability().subscribe(data => {
      this.departmentData = data;
      this.loading = false;
    });
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
  }

  getDepartmentClass(percentage: number): string {
    if (percentage >= 80) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 60) return 'average';
    return 'poor';
  }
}
