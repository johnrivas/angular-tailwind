import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, inject } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';
import { Card } from 'primeng/card';
import { Message } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ProgressSpinner } from 'primeng/progressspinner';

import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-users-page',
    imports: [
      CommonModule,

      Card,
      Message,
      TableModule,
      ProgressSpinner,
    ],
    templateUrl: './usersPage.component.html',
})
export default class UsersPageComponent implements OnInit {
  users = signal<User[] | null>(null);
  isLoading = signal<boolean>(false);
  private authService = inject(AuthService);

  loadUsersLazy(e: any)
  {
    const event = e as LazyLoadEvent;
    console.log(event.rows);
  }

  ngOnInit()
  {
    this.isLoading.set(true);
    this.authService.getUsers().subscribe({
      next: (users) => {
        this.isLoading.set(false);
        this.users.set(users)
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error(err)
      },
    });
  }

}
