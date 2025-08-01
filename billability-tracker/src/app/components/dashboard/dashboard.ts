import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private reportService = inject(ReportService);

  overallMetrics: any = null;
  monthlyData: any[] = [];
  departmentData: any[] = [];
  protected readonly currentYear = new Date().getFullYear();

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    // Load overall metrics
    this.reportService.getOverallBillabilityMetrics().subscribe(metrics => {
      this.overallMetrics = metrics;
    });

    // Load monthly data
    this.reportService.getMonthlyBillabilityReport().subscribe(data => {
      this.monthlyData = data;
    });

    // Load department data
    this.reportService.getDepartmentBillability().subscribe(data => {
      this.departmentData = data;
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
  }
}
