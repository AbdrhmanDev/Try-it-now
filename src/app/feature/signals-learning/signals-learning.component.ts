import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
  active: boolean;
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

@Component({
  selector: 'app-signals-learning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signals-learning.component.html',
  styleUrls: ['./signals-learning.component.scss'],
})
export class SignalsLearningComponent {
  // Interactive examples with signals
  counter = signal(0);
  name = signal('Angular Developer');
  items = signal(['Learn Signals', 'Build Reactive Apps', 'Master Angular']);

  // Stock example signals
  stocksSignal = signal<Stock[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.15 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.52, change: -15.23 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 5.67 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: -8.91 },
  ]);

  favoritesSignal = signal<string[]>(['AAPL', 'TSLA']);

  // Computed signals for reactive calculations
  doubleCounter = computed(() => this.counter() * 2);
  greeting = computed(() => `Hello, ${this.name()}!`);
  itemCount = computed(() => this.items().length);

  // Stock computed signals
  topGainer = computed(() => {
    const positive = this.stocksSignal().filter((s) => s.change > 0);
    return positive.length > 0
      ? positive.reduce((a, b) => (a.change > b.change ? a : b))
      : null;
  });

  topLoser = computed(() => {
    const negative = this.stocksSignal().filter((s) => s.change < 0);
    return negative.length > 0
      ? negative.reduce((a, b) => (a.change < b.change ? a : b))
      : null;
  });

  favoriteStocks = computed(() =>
    this.stocksSignal().filter((stock) =>
      this.favoritesSignal().includes(stock.symbol)
    )
  );

  // Form inputs for interactive examples
  newName = signal('');
  newItem = signal('');

  // Learning progress tracking
  currentSection = signal(0);
  completedSections = signal<number[]>([]);

  // Example sections
  sections = signal([
    { id: 'intro', title: 'What are Angular Signals?', completed: false },
    { id: 'basic', title: 'Basic Signal Usage', completed: false },
    { id: 'computed', title: 'Computed Signals', completed: false },
    { id: 'effects', title: 'Effects and Side Effects', completed: false },
    { id: 'practical', title: 'Stock Dashboard Example', completed: false },
  ]);

  // Progress calculation
  progress = computed(() => {
    const completed = this.completedSections().length;
    const total = this.sections().length;
    return Math.round((completed / total) * 100);
  });

  constructor() {
    // Effect to log counter changes
    effect(() => {
      console.log(`[Signals Learning] Counter changed to: ${this.counter()}`);
    });

    // Effect to save progress
    effect(() => {
      const progress = this.progress();
      if (progress > 0) {
        localStorage.setItem('signals-learning-progress', progress.toString());
      }
    });

    // Effect to track favorite changes
    effect(() => {
      console.log(
        `[Signals Learning] Favorites updated:`,
        this.favoritesSignal()
      );
    });
  }

  // Interactive methods
  incrementCounter() {
    this.counter.update((count) => count + 1);
  }

  decrementCounter() {
    this.counter.update((count) => Math.max(0, count - 1));
  }

  resetCounter() {
    this.counter.set(0);
  }

  updateName() {
    if (this.newName().trim()) {
      this.name.set(this.newName());
      this.newName.set('');
    }
  }

  addItem() {
    if (this.newItem().trim()) {
      this.items.update((items) => [...items, this.newItem()]);
      this.newItem.set('');
    }
  }

  removeItem(index: number) {
    this.items.update((items) => items.filter((_, i) => i !== index));
  }

  // Stock methods
  toggleFavorite(symbol: string) {
    this.favoritesSignal.update((favorites) =>
      favorites.includes(symbol)
        ? favorites.filter((f) => f !== symbol)
        : [...favorites, symbol]
    );
  }

  updateStockPrice(symbol: string) {
    this.stocksSignal.update((stocks) =>
      stocks.map((stock) =>
        stock.symbol === symbol
          ? { ...stock, price: stock.price * (1 + (Math.random() - 0.5) * 0.1) }
          : stock
      )
    );
  }

  // Navigation methods
  goToSection(index: number) {
    this.currentSection.set(index);
  }

  markSectionComplete(index: number) {
    const completed = this.completedSections();
    if (!completed.includes(index)) {
      this.completedSections.update((sections) => [...sections, index]);
    }
  }

  nextSection() {
    const current = this.currentSection();
    const next = Math.min(current + 1, this.sections().length - 1);
    this.currentSection.set(next);
    this.markSectionComplete(current);
  }

  previousSection() {
    const current = this.currentSection();
    const prev = Math.max(current - 1, 0);
    this.currentSection.set(prev);
  }

  // Code examples
  getCodeExample(type: string): string {
    const examples: { [key: string]: string } = {
      basic: `// Creating a signal
const counter = signal(0);

// Reading signal value
console.log(counter()); // 0

// Updating signal
counter.set(5);
counter.update(value => value + 1);`,

      computed: `// Computed signals are reactive
const counter = signal(0);
const doubled = computed(() => counter() * 2);

console.log(doubled()); // 0
counter.set(5);
console.log(doubled()); // 10`,

      effect: `// Effects run when signals change
const counter = signal(0);

effect(() => {
  console.log('Counter:', counter());
});

counter.set(1); // Logs: "Counter: 1"`,

      template: `<!-- Using signals in templates -->
<div>
  <p>Counter: {{ counter() }}</p>
  <p>Doubled: {{ doubled() }}</p>
  <button (click)="increment()">+</button>
</div>`,

      stock: `// Stock dashboard with signals
stocksSignal = signal<Stock[]>([...]);
favoritesSignal = signal<string[]>([]);

// Computed values
topGainer = computed(() => {
  const positive = this.stocksSignal()
    .filter(s => s.change > 0);
  return positive.reduce((a, b) =>
    a.change > b.change ? a : b);
});

favoriteStocks = computed(() =>
  this.stocksSignal().filter(stock =>
    this.favoritesSignal().includes(stock.symbol)
  )
);`,
    };
    return examples[type] || '';
  }
}
