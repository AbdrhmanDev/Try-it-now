import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionComponent } from '../change-detection.component';
import { ChildChangeDetectionComponent } from '../child-change-detection/child-change-detection.component';
import { ManualChangeDetectionComponent } from '../manual-change-detection/manual-change-detection.component';

@Component({
  selector: 'app-learning-platform',
  imports: [
    CommonModule,
    ChangeDetectionComponent,
    ChildChangeDetectionComponent,
    ManualChangeDetectionComponent,
  ],
  templateUrl: './learn-change-detection.component.html',
  styleUrls: ['./learn-change-detection.component.scss'],
})
export class LearningPlatformComponent {
  activeSection = 'overview';

  sections = [
    { id: 'overview', title: 'Overview', icon: '📚' },
    { id: 'default', title: 'Default Strategy', icon: '🔄' },
    { id: 'onpush', title: 'OnPush Strategy', icon: '⚡' },
    { id: 'manual', title: 'Manual Detection', icon: '🎛️' },
    { id: 'comparison', title: 'Comparison', icon: '📊' },
  ];

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
  }
}
