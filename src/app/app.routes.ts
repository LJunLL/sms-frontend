import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login-page/login-page'),
  },
  {
    path: 'students',
    loadComponent: () => import('./sms/pages/students-page/students-page'),
  },


  {
    path: '**',
    redirectTo: 'login',
  }


];
