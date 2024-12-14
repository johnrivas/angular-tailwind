import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../services/validators.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ButtonModule,
    InputTextModule,
    Toast,
    PasswordModule,
  ],
  providers: [MessageService],
  templateUrl: './loginPage.component.html',
})
export default class LoginPageComponent implements OnDestroy {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  private subscribes: Subscription[] = [];
  private router = inject(Router);

  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorsService);

  public loginForm : FormGroup = this.fb.group({
    email: ['rivas.john@softslave.com', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['Milita123', [Validators.required]],
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
      .subscribe({
        next: () => this.router.navigate(['']),
        error: (err) => this.messageService.add({severity:'error', summary:'Error', detail: err}),
      });

    this.subscribes.push(sb);
  }

  ngOnDestroy(): void {
    this.subscribes.forEach((sb) => sb.unsubscribe());
  }
}
