export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  sector?: string;
}
// { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 2.15 },
