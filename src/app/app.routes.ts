import { Routes } from '@angular/router';
import { StockListComponent } from './feature/stock-list/stock-list/stock-list.component';
import { TestComponent } from './shared/components/test/test.component';
import { HomeComponent } from './feature/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: StockListComponent },
  { path: 'stock', component: StockListComponent },
  { path: 'test', component: TestComponent },
];
