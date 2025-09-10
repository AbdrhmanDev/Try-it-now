import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { StockListComponent } from './feature/stock-list/stock-list/stock-list.component';
import {
  trigger,
  transition,
  query,
  style,
  animate,
} from '@angular/animations';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    StockListComponent,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // 1. Animate leaving page out
        query(
          ':leave',
          [
            style({ position: 'absolute', width: '100%', opacity: 1 }),
            animate('400ms ease-out', style({ opacity: 0 })),
          ],
          { optional: true }
        ),

        // 2. Animate entering page in (with slight delay)
        query(
          ':enter',
          [
            style({ position: 'absolute', width: '100%', opacity: 0 }),
            animate('500ms 200ms ease-in', style({ opacity: 1 })),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'Practice';
  isLoading = false; // ✅ Controls loader visibility

  constructor(private router: Router) {
    // ✅ Listen to router events to show/hide loader
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Delay hiding loader slightly for smoother UX
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
      }
    });
  }

  // ✅ Required for animation trigger to work properly
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
