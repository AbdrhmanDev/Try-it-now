import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

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
      state('default', style({ transform: 'scale(.9)' })),
      state('hovered', style({ transform: 'scale(1.03)' })),
      transition('default <=> hovered', animate('150ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent {
  theme = signal<'light' | 'dark'>('light');
  topics = signal([
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

  hoveredCard = signal<number | null>(null);
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

  trackByTopic(index: number, topic: any): string {
    return topic.title; // Optimized *ngFor tracking
  }
}
