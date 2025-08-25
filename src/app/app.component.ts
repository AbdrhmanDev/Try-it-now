import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { StockListComponent } from './feature/stock-list/stock-list/stock-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, StockListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Practice';
}
