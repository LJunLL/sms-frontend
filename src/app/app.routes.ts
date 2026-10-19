import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login-page/login-page')
  },
  {
    path: '',
    loadComponent: () => import('./sms/layouts/sms-layout/sms-layout'),
    canActivate: [authGuard],
    children: [
      {
        path: 'students',
        loadComponent: () => import('./sms/pages/students-page/students-page')
      },
      { path: '', redirectTo: 'students', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
