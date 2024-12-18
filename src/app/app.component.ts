import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject( AuthService );
  private router = inject( Router );

  public authStatusChangedEffect = effect(() => {
    if (this.authService.currentUser() === null) {
      this.router.navigateByUrl('/login');
    }
  });
}
