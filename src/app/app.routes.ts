import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login-page/login-page'),
  },
  {
    path: 'students',
    loadComponent: () => import('./sms/pages/students-page/students-page'),
    canActivate: [authGuard]
  },


  {
    path: '**',
    redirectTo: 'login',
  }


];
