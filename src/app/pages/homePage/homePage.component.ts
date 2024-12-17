import { Component, computed, inject, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Avatar } from 'primeng/avatar';
import { BaseComponent } from 'primeng/basecomponent';
import { Menu } from 'primeng/menu';
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
    RouterOutlet,
    RouterLink,

    Avatar,
    Menubar,
    Menu,
  ],
  templateUrl: './homePage.component.html',
})
export default class HomePageComponent implements OnInit {

  private autService = inject(AuthService);
  public user = computed(() => this.autService.currentUser());
  public items: MenuItem[] = [];

  public sub = viewChild<BaseComponent>('submenu');

  userMenu: MenuItem[] = [
    {
      label: "Logout",
      icon: 'pi pi-power-off',
      command: () => {
        this.autService.logout();
      }
    }
  ]

  subMenu(): void
  {
    this.sub()!.el.nativeElement.classList.toggle('hidden');
  }

  ngOnInit(): void {
    this.items = this.user()?printMenu(mainMenu, this.user()!.roles):[];
  }

}
