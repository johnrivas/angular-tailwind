import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanMatch, CanActivate {

  private authService = inject(AuthService);

  constructor(
    private router: Router,
  ){}

  private checkAuthStatus(): Observable<boolean> | boolean
  {
    return this.authService.checkAuth()
      .pipe(
        tap( isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigate(['/login']);
          }
        })
      );
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.checkAuthStatus();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkAuthStatus();
  }

}
