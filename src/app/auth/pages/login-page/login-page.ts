import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/auth.interfaces';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export default class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  errorMessage = signal<string | null>(null);

  infoMessage = signal<string | null>(
  this.route.snapshot.queryParamMap.get('reason') === 'expired'
    ? 'Your session has expired or is no longer valid. Please log in again.'
    : null
);

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    const request: Login = this.loginForm.getRawValue();

    this.authService.login(request).subscribe({
      next: () => this.router.navigate(['/students']),
      error: (err) => this.errorMessage.set(err.error?.message ?? 'Login failed'),
    });
  }
}
