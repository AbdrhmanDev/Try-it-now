import { Component, computed, inject } from '@angular/core';
import { StockService } from '../../../core/services/stock.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss',
})
export class StockListComponent {
  // Services
  stockService = inject(StockService);

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

  isPositive(change: number): boolean {
    return change >= 0;
  }

  absoluteValue(value: number): number {
    return Math.abs(value);
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }
}
