import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export interface Topic {
  title: string;
  description: string;
  route: string;
  icon: string;
  color: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

@Component({
  selector: 'app-topics-list',
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './topics-list.component.html',
  styleUrl: './topics-list.component.scss',
  animations: [
    trigger('cardHover', [
      state('default', style({ transform: 'scale(0.98)' })),
      state('hovered', style({ transform: 'scale(1.02)' })),
      transition('default <=> hovered', animate('200ms ease-in-out')),
    ]),
  ],
})
export class TopicsListComponent {
  // Input signals for data
  topics = input.required<Topic[]>();
  currentFilter = input.required<string>();
  gridCols = input.required<number>();
  theme = input.required<'light' | 'dark'>();

  // Output signals for events
  topicHovered = output<number>();
  topicLeave = output();
  themeToggle = output();

  // Local state
  hoveredCard: number | null = null;

  // Public methods for template
  setHover(index: number) {
    this.hoveredCard = index;
    this.topicHovered.emit(index);
  }

  clearHover() {
    this.hoveredCard = null;
    this.topicLeave.emit();
  }

  trackByTopic(index: number, topic: Topic): string {
    return topic.title;
  }
  getTopicId(route: string): string {
    // Remove leading slash from route to get the ID
    return route.replace(/^\//, '');
  }
  getButtonColor(level: string): string {
    switch (level) {
      case 'beginner':
        return 'primary';
      case 'intermediate':
        return 'accent';
      case 'advanced':
        return 'warn';
      default:
        return 'primary';
    }
  }

  onThemeToggle() {
    this.themeToggle.emit();
  }
}
