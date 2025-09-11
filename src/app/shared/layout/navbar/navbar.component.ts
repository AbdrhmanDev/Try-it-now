import { AuthService } from './../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
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
  isMegaMenu?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterLink, RouterLinkActive, CommonModule], // Standalone: add imports
  standalone: true, // Required for standalone component
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(public AuthService: AuthService) {}
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
  isMobile = signal<boolean>(window.innerWidth < 768);
  private favoritesSignal = signal<string[]>(['AAPL', 'TSLA']);

  stocks = computed(() => this.stocksSignal());
  favorites = computed(() => this.favoritesSignal());

  // Navbar state
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  // Navigation items
  navItems = signal<NavItem[]>([
    { label: 'Home', path: '/', isMegaMenu: false },
    { label: 'Stock', path: '/stock' },
    { label: 'About', path: '/about' },
    {
      label: 'Services',
      path: '',
      isMegaMenu: true, // ← This will trigger the mega dropdown
    },
    { label: 'Test', path: '/test' },
    { label: 'Contact', path: '/contact' },
    { label: 'Change Detection', path: '/change-detection' },
  ]);

  megaMenuContent = [
    {
      title: 'Fundamentals',
      links: [
        { label: 'Getting Started', path: '/angular/getting-started' },
        { label: 'Components & Templates', path: '/angular/components' },
        { label: 'Directives & Pipes', path: '/angular/directives-pipes' },
        {
          label: 'Dependency Injection',
          path: '/angular/dependency-injection',
        },
      ],
    },
    {
      title: 'Advanced Topics',
      links: [
        { label: 'Change Detection', path: '/angular/change-detection' },
        { label: 'Standalone Components', path: '/angular/standalone' },
        { label: 'Signals & Reactivity', path: '/angular/signals' },
        { label: 'RxJS & Observables', path: '/angular/rxjs' },
        { label: 'Forms (Reactive & Template-driven)', path: '/angular/forms' },
      ],
    },
    {
      title: 'Architecture & State Management',
      links: [
        { label: 'Routing & Lazy Loading', path: '/angular/routing' },
        { label: 'NgRx / Signals Store', path: '/angular/state-management' },
        { label: 'Services & Providers', path: '/angular/services' },
        { label: 'Clean Architecture', path: '/angular/architecture' },
      ],
    },
    {
      title: 'Performance & Tools',
      links: [
        { label: 'OnPush Strategy', path: '/angular/onpush' },
        { label: 'Standalone API', path: '/angular/standalone-api' },
        { label: 'Angular CLI & Schematics', path: '/angular/cli' },
        { label: 'Testing (Jest/Karma)', path: '/angular/testing' },
      ],
    },
  ];

  private updateSubscription: any;
  isMegaMenuOpen = signal(false);
  isMobileMegaOpen = signal(false);
  private closeTimeout: any;
  ngOnInit() {
    // Simulate scroll
    window.addEventListener('scroll', () => {
      this.isScrolled.set(window.scrollY > 50);
    });
    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 768);
    });

    // Your existing scroll listener...
    window.addEventListener('scroll', () => {
      this.isScrolled.set(window.scrollY > 50);
    });
    // Auto-update stock prices
    this.updateSubscription = setInterval(() => {
      this.updatePrices();
    }, 3000);
  }

  toggleMegaMenu(open: boolean) {
    this.isMegaMenuOpen.set(open);
    console.log(this.isMegaMenuOpen);
  }

  toggleMobileMega() {
    if (this.isMobile()) {
      this.isMobileMegaOpen.update((v) => !v);
    }
  }
  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
    console.log('isMenuOpen:', this.isMenuOpen()); // Debug
  }
  ngOnDestroy() {
    if (this.updateSubscription) {
      clearInterval(this.updateSubscription);
    }
    window.removeEventListener('scroll', () => {});
  }
  openMegaMenu() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    this.isMegaMenuOpen.set(true);
  }
  // Menu controls
  // toggleMenu() {
  //   this.isMenuOpen.update((value) => !value);
  // }

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
  closeMenu() {
    this.isMenuOpen.set(false);
    this.isMegaMenuOpen.set(false);
  }

  closeMegaMenu() {
    this.closeTimeout = setTimeout(() => {
      this.isMegaMenuOpen.set(false);
    }, 200); // 200ms delay
  }
}
