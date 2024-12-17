import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { mainMenu } from '../../config';
import { printMenu } from '../../utils';



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
  public items: MenuItem[] = this.user()?printMenu(mainMenu, this.user()!.roles):[];

}
