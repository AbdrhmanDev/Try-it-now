import { Component, computed, inject, signal } from '@angular/core';
import { StockService } from '../../../core/services/stock.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Stock } from '../../../core/models/stock';
// import type { Stock } from '../../../shared/layout/navbar/navbar.component';

@Component({
  selector: 'app-stock-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss',
})
export class StockListComponent {
  stockService = inject(StockService);
  private updateSubscription: any;
  isScrolled = signal(false);
  isMenuOpen = signal(false);

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
  // State
  searchTerm = '';
  showFavorites = false;
  wasRecentlyToggled: string | null = null;

  // Computed values
  topGainer = computed(() => {
    const positive = this.stockService.stocks().filter((s) => s.change > 0);
    return positive.length > 0
      ? positive.reduce((a, b) => (a.change > b.change ? a : b))
      : null;
  });

  topLoser = computed(() => {
    const negative = this.stockService.stocks().filter((s) => s.change < 0);
    return negative.length > 0
      ? negative.reduce((a, b) => (a.change < b.change ? a : b))
      : null;
  });

  // Methods
  toggleFavorite(symbol: string) {
    this.stockService.toggleFavorite(symbol);
    this.wasRecentlyToggled = symbol;
    setTimeout(() => {
      this.wasRecentlyToggled = null;
    }, 500); // Match animation duration
  }

  formatChange(change: number): string {
    return change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;
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
  isPositive(change: number): boolean {
    return change >= 0;
  }

  absoluteValue(value: number): number {
    return Math.abs(value);
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }
  getChangeClass(change: number): string {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  }
  getChangeIcon(change: number): string {
    return change >= 0 ? '↗' : '↘';
  }
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
}
