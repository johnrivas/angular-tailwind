import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './loginPage.component.html',
})
export default class LoginPageComponent implements OnDestroy {
  private authService = inject(AuthService);
  private subscribes: Subscription[] = [];

  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorsService);

  constructor(
    private router: Router,
  ) {}

  public loginForm : FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', [Validators.required]],
  });

  isValidField(field: string)
  {
    return this.validatorService.isValidField(this.loginForm, field);
  }

  login(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const sb = this.authService.login(email, password)
      .subscribe((user) => {
        this.router.navigate(['']);
      });

    this.subscribes.push(sb);
  }

  ngOnDestroy(): void {
    this.subscribes.forEach((sb) => sb.unsubscribe());
  }
}
