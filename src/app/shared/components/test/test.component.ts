import { Component, signal } from '@angular/core';
import { single } from 'rxjs';
import {
  NgClass,
  NgForOf,
} from '../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-test',
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  // 🔢 Signal for counter
  count = signal(0);

  // 📦 Signal for items list
  items = signal<string[]>(['apple', 'banana']);

  // Methods to update signals
  increment() {
    this.count.update((val) => val + 1);
    console.log('Counter updated:', this.count());
  }

  settime() {
    this.count.set(10);
    console.log('Counter set to 10');
  }

  addItem() {
    this.items.update((arr) => [...arr, `new item ${arr.length + 1}`]);
    console.log('New item added:', this.items());
  }
}
