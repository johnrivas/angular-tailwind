import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';

import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.api;
  private user = signal<User|null>(null);

  private http = inject(HttpClient);

  public currentUser = computed(() => this.user());

  login(email: string, password: string) : Observable<User>
  {
    return this.http.post<User>(`${this.url}auth/login`, { email, password }).pipe(
      tap((user : User) => this.user.set(user)),
      tap((user: User) => localStorage.setItem('token', user!.token)),
      catchError(err => throwError(() => err.error.message))
    );
  }

  checkAuth() : Observable<boolean>
  {
    if (!localStorage.getItem('token')) return of(false);

    return this.http.get<User>(`${this.url}auth/verify-token`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).pipe(
      tap((user: User) => this.user.set(user)),
      switchMap(() => of(true)),
      catchError(() => {
        localStorage.clear();
        return of(false)
      })
    );
  }

  logout() : void
  {
    localStorage.clear();
    this.user.set(null);
  }

  getUsers() : Observable<User[]>
  {
    return this.http.get<User[]>(`${this.url}auth/users`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  }

}
