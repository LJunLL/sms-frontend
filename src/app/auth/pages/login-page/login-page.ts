import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService';
import { Login } from '../../intefaces/auth.interfaces';


@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html'
})
export default class LoginPage {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  errorMessage = signal<string | null>(null);

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    const request: Login = this.loginForm.getRawValue();

    this.authService.login(request).subscribe({
      next: () => console.log('Login correcto. Token:', this.authService.getToken()),
      error: () => this.errorMessage.set('Usuario o contraseña incorrectos')
    });
  }
}
