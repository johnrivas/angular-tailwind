import { Component } from '@angular/core';

import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'loading-progress',
  imports: [
    ProgressSpinner,
  ],
  templateUrl: './loadingProgress.component.html',
})
export class LoadingProgressComponent { }
