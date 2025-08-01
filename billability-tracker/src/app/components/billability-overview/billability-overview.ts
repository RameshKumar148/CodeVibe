import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-billability-overview',
  imports: [CommonModule],
  templateUrl: './billability-overview.html',
  styleUrl: './billability-overview.scss'
})
export class BillabilityOverview implements OnInit {
  private reportService = inject(ReportService);
  
  monthlyData: any[] = [];
  loading = true;
  protected readonly currentYear = new Date().getFullYear();

  ngOnInit() {
    this.loadOverviewData();
  }

  private loadOverviewData() {
    this.reportService.getMonthlyBillabilityReport().subscribe(data => {
      this.monthlyData = data;
      this.loading = false;
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
