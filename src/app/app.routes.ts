import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth-guard';
import { guestGuard } from './auth/guards/guest-guard';
import { adminGuard } from './auth/guards/admin-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login-page/login-page'),
    canActivate: [guestGuard]
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
      {
        path: 'students/new',
        loadComponent: () => import('./sms/pages/student-form-page/student-form-page'),
        canActivate: [adminGuard]
      },
      {
        path: 'students/:id/edit',
        loadComponent: () => import('./sms/pages/student-form-page/student-form-page'),
        canActivate: [adminGuard]
      },
      { path: '', redirectTo: 'students', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
