import {
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

interface Topic {
  title: string;
  description: string;
  route: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('cardHover', [
      state('default', style({ transform: 'scale(0.98)' })),
      state('hovered', style({ transform: 'scale(1.02)' })),
      transition('default <=> hovered', animate('200ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private subscription = new Subscription();

  theme = signal<'light' | 'dark'>('light');
  gridCols = signal(3);
  hoveredCard = signal<number | null>(null);

  topics = signal<Topic[]>([
    {
      title: 'Signals & Reactivity',
      description: 'Explore fine-grained reactivity with Angular Signals.',
      route: '/signals',
      icon: 'bolt',
      color: '#673AB7',
    },
    {
      title: 'Standalone Components',
      description: 'Build without NgModules. Simpler, faster, modern.',
      route: '/standalone',
      icon: 'extension',
      color: '#009688',
    },
    {
      title: 'Dynamic Components',
      description: 'Render components dynamically with ViewContainerRef.',
      route: '/dynamic',
      icon: 'code',
      color: '#FF5722',
    },
    {
      title: 'Custom Directives',
      description: 'Create structural and attribute directives from scratch.',
      route: '/directives',
      icon: 'build',
      color: '#2196F3',
    },
    {
      title: 'Advanced Routing',
      description: 'Lazy loading, guards, resolvers, child routes.',
      route: '/routing',
      icon: 'alt_route',
      color: '#FF9800',
    },
    {
      title: 'Animations',
      description: 'Complex sequences, transitions, and state triggers.',
      route: '/animations',
      icon: 'movie',
      color: '#E91E63',
    },
  ]);

  ngOnInit() {
    this.setupBreakpointObserver();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setupBreakpointObserver() {
    const breakpointSubscription = this.breakpointObserver
      .observe([
        '(max-width: 599.98px)', // Mobile
        '(min-width: 600px) and (max-width: 959.98px)', // Tablet
        '(min-width: 960px)', // Desktop
      ])
      .subscribe(() => {
        if (this.breakpointObserver.isMatched('(max-width: 599.98px)')) {
          this.gridCols.set(1);
        } else if (
          this.breakpointObserver.isMatched(
            '(min-width: 600px) and (max-width: 959.98px)'
          )
        ) {
          this.gridCols.set(2);
        } else {
          this.gridCols.set(3);
        }
      });

    this.subscription.add(breakpointSubscription);
  }

  // Optional: Handle window resize for additional responsiveness
  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //   // This will automatically trigger the breakpoint observer
  //   // You can add additional resize logic here if needed
  // }

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    document.body.classList.toggle('dark-theme', this.theme() === 'dark');
  }

  setHover(index: number) {
    this.hoveredCard.set(index);
  }

  clearHover() {
    this.hoveredCard.set(null);
  }

  trackByTopic(index: number, topic: Topic): string {
    return topic.title; // Optimized *ngFor tracking
  }
}
