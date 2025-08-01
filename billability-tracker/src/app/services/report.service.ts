import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { DataService } from './data.service';
import { AssociateSummary } from '../models/associate.model';
import { MonthlyBillabilityReport, DepartmentBillability, AllocationSummary } from '../models/allocation.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private dataService: DataService) { }

  getAssociateBillabilitySummary(): Observable<AssociateSummary[]> {
    return combineLatest([
      this.dataService.getAssociates(),
      this.dataService.getAllocations(),
      this.dataService.getCurrentYearAllocations()
    ]).pipe(
      map(([associates, allocations, currentYearAllocations]) => {
        return associates.map(associate => {
          const associateAllocations = currentYearAllocations.filter(a => a.associateId === associate.id);
          
          const billableHours = associateAllocations
            .filter(a => a.isBillable)
            .reduce((sum, a) => sum + a.actualHours, 0);
          
          const nonBillableHours = associateAllocations
            .filter(a => !a.isBillable)
            .reduce((sum, a) => sum + a.actualHours, 0);
          
          const totalHours = billableHours + nonBillableHours;
          const billabilityPercentage = totalHours > 0 ? (billableHours / totalHours) * 100 : 0;

          return {
            associateId: associate.id,
            associateName: associate.name,
            totalHours,
            billableHours,
            nonBillableHours,
            billabilityPercentage: Math.round(billabilityPercentage * 100) / 100,
            department: associate.department
          };
        });
      })
    );
  }

  getMonthlyBillabilityReport(): Observable<MonthlyBillabilityReport[]> {
    return combineLatest([
      this.dataService.getCurrentYearAllocations(),
      this.dataService.getAssociates()
    ]).pipe(
      map(([allocations, associates]) => {
        const monthlyData = new Map<string, {
          billableHours: number;
          nonBillableHours: number;
          revenue: number;
          associateIds: Set<string>;
        }>();

        allocations.forEach(allocation => {
          const monthKey = `${allocation.startDate.getFullYear()}-${allocation.startDate.getMonth() + 1}`;
          
          if (!monthlyData.has(monthKey)) {
            monthlyData.set(monthKey, {
              billableHours: 0,
              nonBillableHours: 0,
              revenue: 0,
              associateIds: new Set()
            });
          }

          const data = monthlyData.get(monthKey)!;
          data.associateIds.add(allocation.associateId);

          if (allocation.isBillable) {
            data.billableHours += allocation.actualHours;
            data.revenue += allocation.actualHours * allocation.hourlyRate;
          } else {
            data.nonBillableHours += allocation.actualHours;
          }
        });

        return Array.from(monthlyData.entries()).map(([monthKey, data]) => {
          const [year, month] = monthKey.split('-').map(Number);
          const totalHours = data.billableHours + data.nonBillableHours;
          const averageBillabilityPercentage = totalHours > 0 ? (data.billableHours / totalHours) * 100 : 0;

          return {
            month: new Date(year, month - 1).toLocaleString('default', { month: 'long' }),
            year,
            totalBillableHours: data.billableHours,
            totalNonBillableHours: data.nonBillableHours,
            totalAssociates: data.associateIds.size,
            averageBillabilityPercentage: Math.round(averageBillabilityPercentage * 100) / 100,
            revenue: data.revenue
          };
        }).sort((a, b) => a.year - b.year || new Date(`${a.month} 1, ${a.year}`).getMonth() - new Date(`${b.month} 1, ${b.year}`).getMonth());
      })
    );
  }

  getDepartmentBillability(): Observable<DepartmentBillability[]> {
    return combineLatest([
      this.dataService.getAssociates(),
      this.dataService.getCurrentYearAllocations()
    ]).pipe(
      map(([associates, allocations]) => {
        const departmentData = new Map<string, {
          associateIds: Set<string>;
          billableHours: number;
          nonBillableHours: number;
        }>();

        associates.forEach(associate => {
          if (!departmentData.has(associate.department)) {
            departmentData.set(associate.department, {
              associateIds: new Set(),
              billableHours: 0,
              nonBillableHours: 0
            });
          }
          departmentData.get(associate.department)!.associateIds.add(associate.id);
        });

        allocations.forEach(allocation => {
          const associate = associates.find(a => a.id === allocation.associateId);
          if (associate) {
            const data = departmentData.get(associate.department)!;
            if (allocation.isBillable) {
              data.billableHours += allocation.actualHours;
            } else {
              data.nonBillableHours += allocation.actualHours;
            }
          }
        });

        return Array.from(departmentData.entries()).map(([department, data]) => {
          const totalHours = data.billableHours + data.nonBillableHours;
          const billabilityPercentage = totalHours > 0 ? (data.billableHours / totalHours) * 100 : 0;

          return {
            department,
            totalAssociates: data.associateIds.size,
            billableHours: data.billableHours,
            nonBillableHours: data.nonBillableHours,
            billabilityPercentage: Math.round(billabilityPercentage * 100) / 100
          };
        });
      })
    );
  }

  getAllocationSummary(): Observable<AllocationSummary[]> {
    return combineLatest([
      this.dataService.getCurrentYearAllocations(),
      this.dataService.getAssociates(),
      this.dataService.getProjects()
    ]).pipe(
      map(([allocations, associates, projects]) => {
        return allocations.map(allocation => {
          const associate = associates.find(a => a.id === allocation.associateId);
          const project = projects.find(p => p.id === allocation.projectId);
          
          const revenue = allocation.isBillable ? allocation.actualHours * allocation.hourlyRate : 0;
          const monthYear = `${allocation.startDate.toLocaleString('default', { month: 'short' })} ${allocation.startDate.getFullYear()}`;

          return {
            allocationId: allocation.id,
            associateName: associate?.name || 'Unknown',
            projectName: project?.name || 'Unknown',
            client: project?.client || 'Unknown',
            allocatedHours: allocation.allocatedHours,
            actualHours: allocation.actualHours,
            isBillable: allocation.isBillable,
            monthYear,
            revenue
          };
        });
      })
    );
  }

  getOverallBillabilityMetrics(): Observable<{
    totalBillableHours: number;
    totalNonBillableHours: number;
    overallBillabilityPercentage: number;
    totalRevenue: number;
    totalAssociates: number;
    averageUtilization: number;
  }> {
    return combineLatest([
      this.dataService.getCurrentYearAllocations(),
      this.dataService.getAssociates()
    ]).pipe(
      map(([allocations, associates]) => {
        const totalBillableHours = allocations
          .filter(a => a.isBillable)
          .reduce((sum, a) => sum + a.actualHours, 0);
        
        const totalNonBillableHours = allocations
          .filter(a => !a.isBillable)
          .reduce((sum, a) => sum + a.actualHours, 0);

        const totalHours = totalBillableHours + totalNonBillableHours;
        const overallBillabilityPercentage = totalHours > 0 ? (totalBillableHours / totalHours) * 100 : 0;

        const totalRevenue = allocations
          .filter(a => a.isBillable)
          .reduce((sum, a) => sum + (a.actualHours * a.hourlyRate), 0);

        const totalAssociates = associates.filter(a => a.isActive).length;

        // Assuming 2080 work hours per year per associate
        const expectedTotalHours = totalAssociates * 2080;
        const averageUtilization = expectedTotalHours > 0 ? (totalHours / expectedTotalHours) * 100 : 0;

        return {
          totalBillableHours,
          totalNonBillableHours,
          overallBillabilityPercentage: Math.round(overallBillabilityPercentage * 100) / 100,
          totalRevenue,
          totalAssociates,
          averageUtilization: Math.round(averageUtilization * 100) / 100
        };
      })
    );
  }
} 