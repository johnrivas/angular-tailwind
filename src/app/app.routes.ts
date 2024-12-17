import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/homePage/homePage.component'),
    canActivate: [AuthGuard],
    canMatch: [AuthGuard],
    children: [
      {
        path: 'users',
        loadComponent: () => import('./pages/usersPage/usersPage.component'),
        canActivate: [AuthGuard],
        canMatch : [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/loginPage/loginPage.component'),
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
