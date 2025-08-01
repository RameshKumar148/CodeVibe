import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { AssociateSummary } from '../../models/associate.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-associate-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './associate-report.html',
  styleUrl: './associate-report.scss'
})
export class AssociateReport implements OnInit {
  private reportService = inject(ReportService);
  
  associateData: AssociateSummary[] = [];
  filteredAssociateData: AssociateSummary[] = [];
  loading = true;
  searchTerm = '';
  searchBy: 'id' | 'name' = 'id';
  selectedAssociate: AssociateSummary | null = null;
  protected readonly currentYear = new Date().getFullYear();

  ngOnInit() {
    this.loadAssociateData();
  }

  private loadAssociateData() {
    this.reportService.getAssociateBillabilitySummary().subscribe(data => {
      this.associateData = data;
      this.filteredAssociateData = data;
      this.loading = false;
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredAssociateData = this.associateData;
      this.selectedAssociate = null;
      return;
    }

    const searchValue = this.searchTerm.toLowerCase().trim();
    
    if (this.searchBy === 'id') {
      this.filteredAssociateData = this.associateData.filter(associate => 
        associate.associateId.toLowerCase().includes(searchValue)
      );
    } else {
      this.filteredAssociateData = this.associateData.filter(associate => 
        associate.associateName.toLowerCase().includes(searchValue)
      );
    }

    // If exactly one result, auto-select it
    if (this.filteredAssociateData.length === 1) {
      this.selectedAssociate = this.filteredAssociateData[0];
    } else {
      this.selectedAssociate = null;
    }
  }

  onClearSearch() {
    this.searchTerm = '';
    this.filteredAssociateData = this.associateData;
    this.selectedAssociate = null;
  }

  selectAssociate(associate: AssociateSummary) {
    this.selectedAssociate = associate;
  }

  downloadExcel() {
    if (this.filteredAssociateData.length === 0) {
      alert('No data available to download');
      return;
    }

    // Prepare data for Excel export
    const excelData = this.filteredAssociateData.map(associate => ({
      'Associate ID': associate.associateId,
      'Associate Name': associate.associateName,
      'Department': associate.department,
      'Total Hours': associate.totalHours,
      'Billable Hours': associate.billableHours,
      'Non-Billable Hours': associate.nonBillableHours,
      'Billability Percentage': `${associate.billabilityPercentage.toFixed(1)}%`
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 15 }, // Associate ID
      { wch: 25 }, // Associate Name
      { wch: 15 }, // Department
      { wch: 12 }, // Total Hours
      { wch: 15 }, // Billable Hours
      { wch: 18 }, // Non-Billable Hours
      { wch: 20 }  // Billability Percentage
    ];
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Associates Report');

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `Associates_Billability_Report_${currentDate}.xlsx`;

    // Download the file
    XLSX.writeFile(workbook, filename);
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
  }

  getBillabilityClass(percentage: number): string {
    if (percentage >= 80) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 60) return 'average';
    return 'poor';
  }

  getAverageBillability(): string {
    if (this.filteredAssociateData.length === 0) return '0.0';
    const total = this.filteredAssociateData.reduce((sum, a) => sum + a.billabilityPercentage, 0);
    return (total / this.filteredAssociateData.length).toFixed(1);
  }

  getTotalHours(): number {
    return this.filteredAssociateData.reduce((sum, a) => sum + a.totalHours, 0);
  }

  getPerformanceIcon(percentage: number): string {
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '✅';
    if (percentage >= 60) return '⚠️';
    return '❌';
  }
}
