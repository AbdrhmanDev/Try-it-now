import { Router } from '@angular/router';
import { Injectable, signal } from '@angular/core';

// Add user interface
export interface User {
  name?: string;
  email?: string;
  username?: string;
  // add other properties as needed
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  private readonly token = 'auth_token';
  private readonly userKey = 'user_data'; // Key for storing user data

  isLoggedIn = signal<boolean>(!!localStorage.getItem(this.token));

  // Add user signal
  currentUser = signal<User | null>(this.getStoredUser());

  login(username: string, password: string) {
    if (username === 'admin' && password === '132') {
      localStorage.setItem(this.token, 'fake-token');

      // Create and store user data
      const user: User = {
        name: 'Admin User',
        username: username,
        email: 'admin@example.com',
      };
      localStorage.setItem(this.userKey, JSON.stringify(user));

      this.isLoggedIn.set(true);
      this.currentUser.set(user);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.userKey);
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  // Helper method to get stored user data
  private getStoredUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Optional: Method to update user data
  updateUser(userData: Partial<User>): void {
    const currentUser = this.currentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
      this.currentUser.set(updatedUser);
    }
  }
}
