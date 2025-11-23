import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import {
  Topic,
  TopicsListComponent,
} from '../topics-list/topics-list.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule, MatIconModule, TopicsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private subscription = new Subscription();

  theme = signal<'light' | 'dark'>('light');
  gridCols = signal(3);
  hoveredCard = signal<number | null>(null);

  topics = signal<Topic[]>([
    // 🟢 BEGINNER LEVEL
    {
      title: 'Components & Templates',
      description:
        'Learn the fundamentals of Angular components and template syntax.',
      route: '/components',
      icon: 'widgets',
      color: '#4CAF50',
      level: 'beginner',
    },
    {
      title: 'Data Binding',
      description: 'Master interpolation, property binding, and event binding.',
      route: '/data-binding',
      icon: 'link',
      color: '#8BC34A',
      level: 'beginner',
    },
    {
      title: 'Directives Overview',
      description:
        'Understand built-in directives like *ngIf, *ngFor, and [ngClass].',
      route: '/directives-basic',
      icon: 'tune',
      color: '#CDDC39',
      level: 'beginner',
    },
    {
      title: 'Services & Dependency Injection',
      description:
        'Create services and understand Angulars dependency injection system.',
      route: '/services',
      icon: 'business_center',
      color: '#FFC107',
      level: 'beginner',
    },

    // 🟡 INTERMEDIATE LEVEL
    {
      title: 'Standalone Components',
      description: 'Build without NgModules. Simpler, faster, modern.',
      route: '/standalone',
      icon: 'extension',
      color: '#009688',
      level: 'intermediate',
    },
    {
      title: 'Signals & Reactivity',
      description: 'Explore fine-grained reactivity with Angular Signals.',
      route: '/signals',
      icon: 'bolt',
      color: '#673AB7',
      level: 'intermediate',
    },
    // ... include all your other topics
  ]);

  filteredTopics = signal<Topic[]>(this.topics());
  currentFilter = signal<string>('all');

  ngOnInit() {
    this.setupBreakpointObserver();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setupBreakpointObserver() {
    const breakpointSubscription = this.breakpointObserver
      .observe([
        '(max-width: 599.98px)',
        '(min-width: 600px) and (max-width: 959.98px)',
        '(min-width: 960px)',
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

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    document.body.classList.toggle('dark-theme', this.theme() === 'dark');
  }

  filterTopics(level: string) {
    this.currentFilter.set(level);
    if (level === 'all') {
      this.filteredTopics.set(this.topics());
    } else {
      this.filteredTopics.set(
        this.topics().filter((topic) => topic.level === level)
      );
    }
  }

  // Event handlers for topics-list component
  onTopicHovered(index: number) {
    this.hoveredCard.set(index);
  }

  onTopicLeave() {
    this.hoveredCard.set(null);
  }

  onThemeToggle() {
    this.toggleTheme();
  }
  // Add to your existing home component
  stats = signal([
    {
      icon: 'school',
      value: this.getTotalTopics() + '+',
      label: 'Learning Topics',
      color: '#4CAF50',
    },
    {
      icon: 'schedule',
      value: '3 Levels',
      label: 'Learning Path',
      color: '#2196F3',
    },
    {
      icon: 'trending_up',
      value: 'Modern',
      label: 'Angular 19 Features',
      color: '#FF9800',
    },
    {
      icon: 'code',
      value: 'Hands-on',
      label: 'Interactive Examples',
      color: '#9C27B0',
    },
  ]);

  getTotalTopics(): number {
    return this.topics().length;
  }

  getTopicCount(level: string): number {
    return this.topics().filter((topic) => topic.level === level).length;
  }
}
