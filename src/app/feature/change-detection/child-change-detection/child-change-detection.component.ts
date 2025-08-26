import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-change-detection',
  templateUrl: './child-change-detection.component.html',
  styleUrls: ['./child-change-detection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildChangeDetectionComponent {
  @Input() user!: { name: string };
}
