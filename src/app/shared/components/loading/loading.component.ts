import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  lines = [
    'Compiling advanced Angular module...',
    'Optimizing signals and reactivity graph...',
    'Bundling standalone components...',
    'Injecting dynamic directives...',
    'Warming up animation engine...',
    'Preparing route transitions...',
    'Almost ready... 🚀',
  ];
}
