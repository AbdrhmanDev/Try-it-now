import { Stock } from './../models/stock';
import { computed, effect, Injectable, signal } from '@angular/core';

import { single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  // Signal holding stock list
  private _stocks = signal<Stock[]>([]);

  // Expose as readonly
  stocks = computed(() => this._stocks());

  // Favorites (stored in localStorage)
  private _favorites = signal<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  favorites = computed(() => this._favorites());

  constructor() {
    // Effect to auto-save favorites to localStorage
    effect(() => {
      localStorage.setItem('favorites', JSON.stringify(this._favorites()));
    });

    // Simulate stock updates
    this.simulateStockUpdates();
  }

  private simulateStockUpdates() {
    const mockStocks: Stock[] = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 180.45,
        change: 2.15,
        sector: 'Technology',
      },
      {
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 220.3,
        change: -8.7,
        sector: 'Automotive & Energy',
      },
      {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 140.88,
        change: 3.42,
        sector: 'E-Commerce & Cloud',
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc. (Google)',
        price: 158.67,
        change: 1.92,
        sector: 'Technology & AI',
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 378.91,
        change: 5.23,
        sector: 'Software & Cloud',
      },
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 875.23,
        change: 18.45,
        sector: 'Semiconductors & AI',
      },
      {
        symbol: 'META',
        name: 'Meta Platforms, Inc.',
        price: 331.5,
        change: -4.1,
        sector: 'Social Media & Tech',
      },
      {
        symbol: 'NFLX',
        name: 'Netflix, Inc.',
        price: 445.7,
        change: 6.8,
        sector: 'Entertainment & Streaming',
      },
      {
        symbol: 'JPM',
        name: 'JPMorgan Chase & Co.',
        price: 184.33,
        change: -1.25,
        sector: 'Financial Services',
      },
      {
        symbol: 'V',
        name: 'Visa Inc.',
        price: 268.4,
        change: 2.75,
        sector: 'Financial & Payments',
      },
      {
        symbol: 'WMT',
        name: 'Walmart Inc.',
        price: 154.2,
        change: 0.8,
        sector: 'Retail & E-Commerce',
      },
      {
        symbol: 'DIS',
        name: 'The Walt Disney Company',
        price: 98.65,
        change: -3.2,
        sector: 'Media & Entertainment',
      },
      {
        symbol: 'PFE',
        name: 'Pfizer Inc.',
        price: 26.8,
        change: 1.1,
        sector: 'Healthcare & Pharmaceuticals',
      },
      {
        symbol: 'XOM',
        name: 'Exxon Mobil Corporation',
        price: 112.4,
        change: -0.6,
        sector: 'Energy & Oil',
      },
      {
        symbol: 'NKE',
        name: 'Nike, Inc.',
        price: 89.55,
        change: -2.45,
        sector: 'Apparel & Lifestyle',
      },
      {
        symbol: 'ADBE',
        name: 'Adobe Inc.',
        price: 467.8,
        change: 4.3,
        sector: 'Software & Creative Tools',
      },
      {
        symbol: 'INTC',
        name: 'Intel Corporation',
        price: 32.1,
        change: -0.9,
        sector: 'Semiconductors',
      },
      {
        symbol: 'BA',
        name: 'The Boeing Company',
        price: 188.75,
        change: 7.2,
        sector: 'Aerospace & Defense',
      },
      {
        symbol: 'GE',
        name: 'General Electric Company',
        price: 158.9,
        change: 5.4,
        sector: 'Industrial & Energy',
      },
      {
        symbol: 'SBUX',
        name: 'Starbucks Corporation',
        price: 92.3,
        change: 1.5,
        sector: 'Consumer Goods & Food',
      },
    ];
    this._stocks.set(mockStocks);

    setInterval(() => {
      this._stocks.update((stocks) =>
        stocks.map((s) => {
          const variation = (Math.random() - 0.5) * 2;
          return {
            ...s,
            price: +(s.price + variation).toFixed(2),
            change: +variation.toFixed(2),
          };
        })
      );
    }, 2000);
  }

  toggleFavorite(symbol: string) {
    this._favorites.update((favs) =>
      favs.includes(symbol)
        ? favs.filter((f) => f !== symbol)
        : [...favs, symbol]
    );
  }
}
