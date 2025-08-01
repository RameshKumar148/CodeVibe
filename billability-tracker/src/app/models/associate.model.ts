export interface Associate {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  joiningDate: Date;
  isActive: boolean;
  skills: string[];
  billableRate: number;
}

export interface AssociateSummary {
  associateId: string;
  associateName: string;
  totalHours: number;
  billableHours: number;
  nonBillableHours: number;
  billabilityPercentage: number;
  department: string;
} 