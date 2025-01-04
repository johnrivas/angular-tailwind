import { Component } from '@angular/core';

import { Card } from 'primeng/card';

@Component({
    selector: 'app-dashboard-page',
    imports: [
      Card,
    ],
    templateUrl: './dashboardPage.component.html'
})
export default class DashboardPageComponent { }
