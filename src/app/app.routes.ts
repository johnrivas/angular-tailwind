import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./homePage/homePage.component'),
    canActivate: [AuthGuard],
    canMatch: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./homePage/pages/dashboardPage/dashboardPage.component'),
      },
      {
        path: 'users',
        loadComponent: () => import('./homePage/pages/usersPage/usersPage.component'),
      },
      {
        path: '**',
        redirectTo: '',
      }
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./loginPage/loginPage.component'),
    canActivate: [PublicGuard],
    canMatch: [PublicGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  }
];
