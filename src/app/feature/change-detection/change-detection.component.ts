import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildChangeDetectionComponent } from './child-change-detection/child-change-detection.component';
import { ManualChangeDetectionComponent } from './manual-change-detection/manual-change-detection.component';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  imports: [
    CommonModule,
    ChildChangeDetectionComponent,
    ManualChangeDetectionComponent,
  ],
  templateUrl: './change-detection.component.html',
  styleUrls: ['./change-detection.component.scss'],
})
export class ChangeDetectionComponent {
  counter = 0;

  increment() {
    this.counter++;
  }

  asyncIncrement() {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  }

  user = { name: 'Ali' };

  changeName() {
    this.user = { name: 'Abderrahman' };
  }

  mutateName() {
    this.user.name = 'Khaled';
  }
}
