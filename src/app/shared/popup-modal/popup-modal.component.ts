import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close()">X</button>
        <h3>{{ title }}</h3>
        <p>{{ body }}</p>
      </div>
    </div>
  `,
  styleUrl: './popup-modal.component.css'
})
export class PopupModalComponent {
  @Input() title: string = '';
  @Input() body: string = '';
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}