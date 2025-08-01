import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { BillabilityOverview } from './components/billability-overview/billability-overview';
import { AssociateReport } from './components/associate-report/associate-report';
import { DepartmentReport } from './components/department-report/department-report';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'overview', component: BillabilityOverview },
  { path: 'associates', component: AssociateReport },
  { path: 'departments', component: DepartmentReport },
  { path: '**', redirectTo: '/dashboard' }
];
