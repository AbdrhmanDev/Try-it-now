import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss'],
})
export class HighlightsComponent {
  highlights: Highlight[] = [
    {
      icon: 'play_circle',
      title: 'Learn by Doing',
      description: 'Interactive examples for every concept',
    },
    {
      icon: 'trending_up',
      title: 'Progressive Difficulty',
      description: 'Start simple, advance at your pace',
    },
    {
      icon: 'code',
      title: 'Real World Examples',
      description: "Practical patterns you'll actually use",
    },
  ];
}
