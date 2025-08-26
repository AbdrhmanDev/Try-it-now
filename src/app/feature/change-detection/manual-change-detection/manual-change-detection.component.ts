import { ChangeDetectorRef, Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-manual-change-detection',
  imports: [],
  templateUrl: './manual-change-detection.component.html',
  styleUrl: './manual-change-detection.component.scss',
})
export class ManualChangeDetectionComponent {
  counter = 0;
  isRunning = false;

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) {
    this.cdr.detach();
  }

  startCounter() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.zone.runOutsideAngular(() => {
      const interval = setInterval(() => {
        this.counter++;
        // Note: UI won't update automatically because we're detached

        if (this.counter >= 10) {
          clearInterval(interval);
          this.isRunning = false;
        }
      }, 1000);
    });
  }

  detectChanges() {
    this.cdr.detectChanges();
  }

  reset() {
    this.counter = 0;
    this.isRunning = false;
    this.cdr.detectChanges();
  }
}
