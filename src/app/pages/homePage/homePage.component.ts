import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
    CommonModule,

    AvatarModule,
    BadgeModule,
    Menubar,
  ],
  templateUrl: './homePage.component.html',
})
export default class HomePageComponent {

  private autService = inject(AuthService);

  public user = computed(() => this.autService.currentUser());

  items: MenuItem[] = [
    {
      label: 'File',
      items: [
        {
          label: 'New',
        },
        {
          label: 'Open',
        },
        {
          label: 'Quit',
        },
      ],
    },
  ];
}
