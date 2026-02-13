import { Component, input, model, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './input.html',
  styleUrls: ['./input.css']
})
export class Input {
  label = input<string>();
  placeholder = input<string>();
  type = input<string>();
  value = model<string | null>();
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.value.set(value);
    this.valueChange.emit(value);
  }
}
