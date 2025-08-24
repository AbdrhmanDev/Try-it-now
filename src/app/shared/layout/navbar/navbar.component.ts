import { Component, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  previousPrice?: number;
}

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterLink, RouterLinkActive], // Standalone: add imports
  standalone: true, // Required for standalone component
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Reactive state
  private stocksSignal = signal<Stock[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.15 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.52, change: -15.23 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 5.67 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: -8.91 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3127.78, change: 12.45 },
    { symbol: 'META', name: 'Meta Platforms', price: 331.26, change: 4.82 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 18.73 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 445.87, change: -3.21 },
  ]);

  private favoritesSignal = signal<string[]>(['AAPL', 'TSLA']);

  stocks = computed(() => this.stocksSignal());
  favorites = computed(() => this.favoritesSignal());

  // Navbar state
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  // Navigation items
  navItems = signal<NavItem[]>([
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ]);

  private updateSubscription: any;

  ngOnInit() {
    // Simulate scroll
    window.addEventListener('scroll', () => {
      this.isScrolled.set(window.scrollY > 50);
    });

    // Auto-update stock prices
    this.updateSubscription = setInterval(() => {
      this.updatePrices();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      clearInterval(this.updateSubscription);
    }
    window.removeEventListener('scroll', () => {});
  }

  // Menu controls
  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  isActive(path: string): boolean {
    return window.location.pathname === path;
  }

  // Favorites
  toggleFavorite(symbol: string) {
    const current = this.favoritesSignal();
    if (current.includes(symbol)) {
      this.favoritesSignal.set(current.filter((fav) => fav !== symbol));
    } else {
      this.favoritesSignal.set([...current, symbol]);
    }
  }

  private updatePrices() {
    const updated = this.stocksSignal().map((stock) => {
      const changePercent = (Math.random() - 0.5) * 0.05; // ±2.5%
      const newPrice = parseFloat(
        (stock.price * (1 + changePercent)).toFixed(2)
      );
      const change = newPrice - stock.price;
      return { ...stock, price: newPrice, change };
    });
    this.stocksSignal.set(updated);
  }

  getChangeClass(change: number): string {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  }

  getChangeIcon(change: number): string {
    return change >= 0 ? '↗' : '↘';
  }
  absoluteValue(value: number): number {
    return Math.abs(value);
  }
}
