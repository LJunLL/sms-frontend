import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {
  private router = inject(Router);
  public authService = inject(AuthService);

  userInitial = computed(
    () => this.authService.currentUser()?.username.charAt(0).toUpperCase() ?? '',
  );

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
