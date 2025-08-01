export interface Allocation {
  id: string;
  associateId: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
  allocatedHours: number;
  actualHours: number;
  allocationPercentage: number;
  isBillable: boolean;
  hourlyRate: number;
  status: AllocationStatus;
}

export enum AllocationStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  PAUSED = 'Paused'
}

export interface AllocationSummary {
  allocationId: string;
  associateName: string;
  projectName: string;
  client: string;
  allocatedHours: number;
  actualHours: number;
  isBillable: boolean;
  monthYear: string;
  revenue: number;
}

export interface MonthlyBillabilityReport {
  month: string;
  year: number;
  totalBillableHours: number;
  totalNonBillableHours: number;
  totalAssociates: number;
  averageBillabilityPercentage: number;
  revenue: number;
}

export interface DepartmentBillability {
  department: string;
  totalAssociates: number;
  billableHours: number;
  nonBillableHours: number;
  billabilityPercentage: number;
} 