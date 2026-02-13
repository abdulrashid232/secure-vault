import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" (click)="close.emit()"></div>
      
      <!-- Content -->
      <div class="relative bg-sv-midnight border border-white/10 rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Header -->
        <div class="p-4 border-b border-white/5 flex items-center justify-between bg-sv-charcoal/50">
            <h3 class="font-display text-lg text-white tracking-wide flex items-center gap-2">
                <ng-content select="[header]"></ng-content>
            </h3>
            <button (click)="close.emit()" class="text-slate-400 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto">
            <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();
}
