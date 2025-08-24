import { Routes } from '@angular/router';
import { StockListComponent } from './feature/stock-list/stock-list/stock-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: StockListComponent },
];
