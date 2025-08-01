import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Associate } from '../models/associate.model';
import { Project, ProjectStatus } from '../models/project.model';
import { Allocation, AllocationStatus } from '../models/allocation.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private associates: Associate[] = [
    {
      id: 'EMP001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      department: 'DE',
      role: 'Senior Developer',
      joiningDate: new Date('2022-03-15'),
      isActive: true,
      skills: ['Angular', 'TypeScript', 'Node.js'],
      billableRate: 75
    },
    {
      id: 'EMP002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'DE',
      role: 'Full Stack Developer',
      joiningDate: new Date('2023-01-10'),
      isActive: true,
      skills: ['React', 'Python', 'AWS'],
      billableRate: 70
    },
    {
      id: 'EMP003',
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      department: 'QE & A',
      role: 'QA Engineer',
      joiningDate: new Date('2021-11-20'),
      isActive: true,
      skills: ['Selenium', 'Manual Testing', 'API Testing'],
      billableRate: 60
    },
    {
      id: 'EMP004',
      name: 'Emily Chen',
      email: 'emily.chen@company.com',
      department: 'AIA',
      role: 'AI/ML Engineer',
      joiningDate: new Date('2022-08-05'),
      isActive: true,
      skills: ['Python', 'TensorFlow', 'Data Analytics'],
      billableRate: 85
    },
    {
      id: 'EMP005',
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@company.com',
      department: 'DE',
      role: 'DevOps Engineer',
      joiningDate: new Date('2021-09-12'),
      isActive: true,
      skills: ['Docker', 'Kubernetes', 'Jenkins'],
      billableRate: 80
    },
    {
      id: 'EMP006',
      name: 'Lisa Wang',
      email: 'lisa.wang@company.com',
      department: 'ADM',
      role: 'Project Manager',
      joiningDate: new Date('2020-05-18'),
      isActive: true,
      skills: ['Project Management', 'Agile', 'Stakeholder Management'],
      billableRate: 65
    },
    {
      id: 'EMP007',
      name: 'David Brown',
      email: 'david.brown@company.com',
      department: 'QE & A',
      role: 'Senior QA Analyst',
      joiningDate: new Date('2021-02-14'),
      isActive: true,
      skills: ['Test Automation', 'Performance Testing', 'Security Testing'],
      billableRate: 65
    },
    {
      id: 'EMP008',
      name: 'Maria Garcia',
      email: 'maria.garcia@company.com',
      department: 'AIA',
      role: 'Data Scientist',
      joiningDate: new Date('2023-04-12'),
      isActive: true,
      skills: ['Machine Learning', 'Python', 'Statistical Analysis'],
      billableRate: 90
    },
    {
      id: 'EMP009',
      name: 'Robert Wilson',
      email: 'robert.wilson@company.com',
      department: 'ADM',
      role: 'Business Analyst',
      joiningDate: new Date('2022-11-03'),
      isActive: true,
      skills: ['Business Analysis', 'Requirements Gathering', 'Process Optimization'],
      billableRate: 60
    },
    {
      id: 'EMP010',
      name: 'Jennifer Taylor',
      email: 'jennifer.taylor@company.com',
      department: 'DE',
      role: 'Frontend Developer',
      joiningDate: new Date('2023-06-20'),
      isActive: true,
      skills: ['React', 'JavaScript', 'UI/UX'],
      billableRate: 68
    }
  ];

  private projects: Project[] = [
    { id: '1', name: 'E-Commerce Platform', description: 'Modern e-commerce solution', startDate: new Date('2024-01-15'), endDate: new Date('2024-12-31'), budget: 500000, client: 'RetailCorp', status: ProjectStatus.ACTIVE, manager: 'EMP006', isBillable: true, technology: ['Angular', 'Node.js', 'MongoDB'] },
    { id: '2', name: 'Mobile Banking App', description: 'Secure mobile banking application', startDate: new Date('2024-03-01'), endDate: new Date('2024-11-30'), budget: 750000, client: 'FinanceBank', status: ProjectStatus.ACTIVE, manager: 'EMP006', isBillable: true, technology: ['React Native', 'Node.js', 'PostgreSQL'] },
    { id: '3', name: 'Data Analytics Dashboard', description: 'Business intelligence dashboard', startDate: new Date('2024-02-01'), endDate: new Date('2024-08-31'), budget: 300000, client: 'DataCorp', status: ProjectStatus.ACTIVE, manager: 'EMP009', isBillable: true, technology: ['Python', 'React', 'PostgreSQL'] },
    { id: '4', name: 'AI Recommendation Engine', description: 'Machine learning recommendation system', startDate: new Date('2024-04-01'), endDate: new Date('2024-12-15'), budget: 600000, client: 'TechStart', status: ProjectStatus.ACTIVE, manager: 'EMP006', isBillable: true, technology: ['Python', 'TensorFlow', 'AWS'] },
    { id: '5', name: 'Internal Process Automation', description: 'Company internal process automation', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), budget: 200000, client: 'Internal', status: ProjectStatus.ACTIVE, manager: 'EMP009', isBillable: false, technology: ['Python', 'Django', 'React'] },
    { id: '6', name: 'Training and Development', description: 'Employee skill development program', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), budget: 150000, client: 'Internal', status: ProjectStatus.ACTIVE, manager: 'EMP006', isBillable: false, technology: ['Various'] }
  ];

  private allocations: Allocation[] = [
    // John Smith (DE) - High billability (85%)
    { id: '1', associateId: 'EMP001', projectId: '1', startDate: new Date('2024-01-15'), endDate: new Date('2024-12-31'), allocatedHours: 1600, actualHours: 1530, allocationPercentage: 80, isBillable: true, hourlyRate: 75, status: AllocationStatus.ACTIVE },
    { id: '2', associateId: 'EMP001', projectId: '5', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 300, actualHours: 270, allocationPercentage: 15, isBillable: false, hourlyRate: 75, status: AllocationStatus.ACTIVE },
    { id: '3', associateId: 'EMP001', projectId: '6', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 100, actualHours: 90, allocationPercentage: 5, isBillable: false, hourlyRate: 75, status: AllocationStatus.ACTIVE },
    
    // Sarah Johnson (DE) - Excellent billability (92%)
    { id: '4', associateId: 'EMP002', projectId: '2', startDate: new Date('2024-03-01'), endDate: new Date('2024-11-30'), allocatedHours: 1520, actualHours: 1480, allocationPercentage: 95, isBillable: true, hourlyRate: 70, status: AllocationStatus.ACTIVE },
    { id: '5', associateId: 'EMP002', projectId: '5', startDate: new Date('2024-02-01'), endDate: new Date('2024-08-31'), allocatedHours: 80, actualHours: 120, allocationPercentage: 5, isBillable: false, hourlyRate: 70, status: AllocationStatus.ACTIVE },
    
    // Mike Davis (QE & A) - Good billability (75%)
    { id: '6', associateId: 'EMP003', projectId: '1', startDate: new Date('2024-01-15'), endDate: new Date('2024-12-31'), allocatedHours: 800, actualHours: 750, allocationPercentage: 40, isBillable: true, hourlyRate: 60, status: AllocationStatus.ACTIVE },
    { id: '7', associateId: 'EMP003', projectId: '2', startDate: new Date('2024-03-01'), endDate: new Date('2024-11-30'), allocatedHours: 700, actualHours: 680, allocationPercentage: 35, isBillable: true, hourlyRate: 60, status: AllocationStatus.ACTIVE },
    { id: '8', associateId: 'EMP003', projectId: '5', startDate: new Date('2024-02-01'), endDate: new Date('2024-08-31'), allocatedHours: 300, actualHours: 320, allocationPercentage: 20, isBillable: false, hourlyRate: 60, status: AllocationStatus.ACTIVE },
    { id: '9', associateId: 'EMP003', projectId: '6', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 100, actualHours: 110, allocationPercentage: 5, isBillable: false, hourlyRate: 60, status: AllocationStatus.ACTIVE },
    
    // Emily Chen (AIA) - Excellent billability (88%)
    { id: '10', associateId: 'EMP004', projectId: '4', startDate: new Date('2024-04-01'), endDate: new Date('2024-12-15'), allocatedHours: 1440, actualHours: 1410, allocationPercentage: 90, isBillable: true, hourlyRate: 85, status: AllocationStatus.ACTIVE },
    { id: '11', associateId: 'EMP004', projectId: '5', startDate: new Date('2024-01-15'), endDate: new Date('2024-12-31'), allocatedHours: 160, actualHours: 190, allocationPercentage: 10, isBillable: false, hourlyRate: 85, status: AllocationStatus.ACTIVE },
    
    // Alex Rodriguez (DE) - Good billability (72%)
    { id: '12', associateId: 'EMP005', projectId: '1', startDate: new Date('2024-01-15'), endDate: new Date('2024-12-31'), allocatedHours: 600, actualHours: 580, allocationPercentage: 30, isBillable: true, hourlyRate: 80, status: AllocationStatus.ACTIVE },
    { id: '13', associateId: 'EMP005', projectId: '2', startDate: new Date('2024-03-01'), endDate: new Date('2024-11-30'), allocatedHours: 800, actualHours: 770, allocationPercentage: 40, isBillable: true, hourlyRate: 80, status: AllocationStatus.ACTIVE },
    { id: '14', associateId: 'EMP005', projectId: '5', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 600, actualHours: 650, allocationPercentage: 30, isBillable: false, hourlyRate: 80, status: AllocationStatus.ACTIVE },
    
    // Lisa Wang (ADM) - Average billability (45%)
    { id: '15', associateId: 'EMP006', projectId: '1', startDate: new Date('2024-01-15'), endDate: new Date('2024-12-31'), allocatedHours: 400, actualHours: 380, allocationPercentage: 20, isBillable: true, hourlyRate: 65, status: AllocationStatus.ACTIVE },
    { id: '16', associateId: 'EMP006', projectId: '2', startDate: new Date('2024-03-01'), endDate: new Date('2024-11-30'), allocatedHours: 500, actualHours: 520, allocationPercentage: 25, isBillable: true, hourlyRate: 65, status: AllocationStatus.ACTIVE },
    { id: '17', associateId: 'EMP006', projectId: '5', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 800, actualHours: 850, allocationPercentage: 40, isBillable: false, hourlyRate: 65, status: AllocationStatus.ACTIVE },
    { id: '18', associateId: 'EMP006', projectId: '6', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 300, actualHours: 290, allocationPercentage: 15, isBillable: false, hourlyRate: 65, status: AllocationStatus.ACTIVE },
    
    // David Brown (QE & A) - Good billability (68%)
    { id: '19', associateId: 'EMP007', projectId: '2', startDate: new Date('2024-03-01'), endDate: new Date('2024-11-30'), allocatedHours: 900, actualHours: 880, allocationPercentage: 45, isBillable: true, hourlyRate: 65, status: AllocationStatus.ACTIVE },
    { id: '20', associateId: 'EMP007', projectId: '4', startDate: new Date('2024-04-01'), endDate: new Date('2024-12-15'), allocatedHours: 460, actualHours: 450, allocationPercentage: 25, isBillable: true, hourlyRate: 65, status: AllocationStatus.ACTIVE },
    { id: '21', associateId: 'EMP007', projectId: '5', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 400, actualHours: 420, allocationPercentage: 20, isBillable: false, hourlyRate: 65, status: AllocationStatus.ACTIVE },
    { id: '22', associateId: 'EMP007', projectId: '6', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 200, actualHours: 190, allocationPercentage: 10, isBillable: false, hourlyRate: 65, status: AllocationStatus.ACTIVE },
    
    // Maria Garcia (AIA) - Excellent billability (94%)
    { id: '23', associateId: 'EMP008', projectId: '3', startDate: new Date('2024-02-01'), endDate: new Date('2024-08-31'), allocatedHours: 1200, actualHours: 1180, allocationPercentage: 60, isBillable: true, hourlyRate: 90, status: AllocationStatus.ACTIVE },
    { id: '24', associateId: 'EMP008', projectId: '4', startDate: new Date('2024-04-01'), endDate: new Date('2024-12-15'), allocatedHours: 680, actualHours: 670, allocationPercentage: 34, isBillable: true, hourlyRate: 90, status: AllocationStatus.ACTIVE },
    { id: '25', associateId: 'EMP008', projectId: '5', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 120, actualHours: 130, allocationPercentage: 6, isBillable: false, hourlyRate: 90, status: AllocationStatus.ACTIVE },
    
    // Robert Wilson (ADM) - Poor billability (35%)
    { id: '26', associateId: 'EMP009', projectId: '3', startDate: new Date('2024-02-01'), endDate: new Date('2024-08-31'), allocatedHours: 400, actualHours: 380, allocationPercentage: 20, isBillable: true, hourlyRate: 60, status: AllocationStatus.ACTIVE },
    { id: '27', associateId: 'EMP009', projectId: '4', startDate: new Date('2024-04-01'), endDate: new Date('2024-12-15'), allocatedHours: 300, actualHours: 320, allocationPercentage: 15, isBillable: true, hourlyRate: 60, status: AllocationStatus.ACTIVE },
    { id: '28', associateId: 'EMP009', projectId: '5', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 800, actualHours: 850, allocationPercentage: 40, isBillable: false, hourlyRate: 60, status: AllocationStatus.ACTIVE },
    { id: '29', associateId: 'EMP009', projectId: '6', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), allocatedHours: 500, actualHours: 490, allocationPercentage: 25, isBillable: false, hourlyRate: 60, status: AllocationStatus.ACTIVE },
    
    // Jennifer Taylor (DE) - Average billability (58%)
    { id: '30', associateId: 'EMP010', projectId: '1', startDate: new Date('2024-06-20'), endDate: new Date('2024-12-31'), allocatedHours: 800, actualHours: 760, allocationPercentage: 50, isBillable: true, hourlyRate: 68, status: AllocationStatus.ACTIVE },
    { id: '31', associateId: 'EMP010', projectId: '2', startDate: new Date('2024-07-01'), endDate: new Date('2024-11-30'), allocatedHours: 200, actualHours: 180, allocationPercentage: 15, isBillable: true, hourlyRate: 68, status: AllocationStatus.ACTIVE },
    { id: '32', associateId: 'EMP010', projectId: '5', startDate: new Date('2024-06-20'), endDate: new Date('2024-12-31'), allocatedHours: 400, actualHours: 420, allocationPercentage: 25, isBillable: false, hourlyRate: 68, status: AllocationStatus.ACTIVE },
    { id: '33', associateId: 'EMP010', projectId: '6', startDate: new Date('2024-06-20'), endDate: new Date('2024-12-31'), allocatedHours: 200, actualHours: 190, allocationPercentage: 10, isBillable: false, hourlyRate: 68, status: AllocationStatus.ACTIVE }
  ];

  constructor() { }

  getAssociates(): Observable<Associate[]> {
    return of(this.associates);
  }

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getAllocations(): Observable<Allocation[]> {
    return of(this.allocations);
  }

  getCurrentYearAllocations(): Observable<Allocation[]> {
    const currentYear = new Date().getFullYear();
    const currentYearAllocations = this.allocations.filter(allocation => 
      allocation.startDate.getFullYear() === currentYear || 
      allocation.endDate.getFullYear() === currentYear
    );
    return of(currentYearAllocations);
  }

  getAssociateById(id: string): Observable<Associate | undefined> {
    const associate = this.associates.find(a => a.id === id);
    return of(associate);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }
} 