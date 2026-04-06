import { Component, effect, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-props',
  imports: [],
  templateUrl: './props.component.html',
  styleUrl: './props.component.scss',
})
export class PropsComponent implements OnInit {
  value = input(0);
  lable = input('', { transform: this.trimString });
  ngOnInit() {
    console.log('PropsComponent initialized with value:', this.value());
  }
  constructor() {
    effect(() => {});
  }
  trimString(value: string | undefined) {
    return value?.trim() ?? '';
  }
}
