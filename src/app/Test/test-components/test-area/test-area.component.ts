import { Component, input } from '@angular/core';
import { PropsComponent } from '../props/props.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-area',
  imports: [PropsComponent, FormsModule],
  templateUrl: './test-area.component.html',
  styleUrl: './test-area.component.scss',
})
export class TestAreaComponent {
  inputValue = 42;
  textVal = '';
  updateValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.inputValue = Number(input.value);
  }
  printValue() {
    console.log('Current inputValue:', this.inputValue);
  }
  updateValueText(event: Event) {
    const input = event.target as HTMLInputElement;
    this.textVal = input.value;
  }
}
