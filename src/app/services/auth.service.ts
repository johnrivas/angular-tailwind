import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/api/';
  private user?: User;

  private http = inject(HttpClient);

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string) : Observable<User>
  {
    return this.http.post<User>(`${this.url}auth/login`, { email, password }).pipe(
      tap((user) => this.user = user),
      tap(() => localStorage.setItem('token', this.user!.token))
    );
  }

  checkAuth(): Observable<boolean>
  {
    if (!localStorage.getItem('token')) return of(false);
    return of(true);
  }

}
