import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
    Menubar,
    BadgeModule,
    AvatarModule,
    CommonModule
  ],
  templateUrl: './homePage.component.html',
})
export default class HomePageComponent {
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
