import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-compact-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compact-input.component.html',
  styleUrl: './compact-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CompactInputComponent),
      multi: true
    }
  ]
})
export class CompactInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Output() valueChange = new EventEmitter<number>();

  private onChange: (value: number) => void = () => { };
  private onTouched: () => void = () => { };

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = parseFloat(input.value) || 0;
    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }

  increment(): void {
    if (this.value < this.max) {
      this.value += this.step;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    }
  }

  decrement(): void {
    if (this.value > this.min) {
      this.value -= this.step;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    }
  }

  writeValue(value: number): void {
    this.value = value ?? 0;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onBlur(): void {
    this.onTouched();
  }
}
