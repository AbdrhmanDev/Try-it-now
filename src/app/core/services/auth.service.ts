import { Router } from '@angular/router';
import { routes } from './../../app.routes';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  private readonly token = 'auth_token';
  isLoggedIn = signal<boolean>(!!localStorage.getItem(this.token));
  login(username: string, password: string) {
    if (username === 'admin' && password === '132') {
      localStorage.setItem(this.token, 'fake-token');
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem(this.token);
    this.isLoggedIn.set(false);
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
  getToken(): string | null {
    return localStorage.getItem(this.token);
  }
}
