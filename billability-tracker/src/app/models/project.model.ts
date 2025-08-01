export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  isBillable: boolean;
  budget: number;
  manager: string;
  technology: string[];
}

export enum ProjectStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  ON_HOLD = 'On Hold',
  CANCELLED = 'Cancelled'
}

export interface ProjectSummary {
  projectId: string;
  projectName: string;
  client: string;
  totalAllocatedHours: number;
  isBillable: boolean;
  associateCount: number;
} 