// src/app/shared/popup-modal/popup-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ensure CommonModule is imported

@Component({
  selector: 'app-popup-modal',
  standalone: true, // This is crucial for standalone component usage
  imports: [CommonModule],
  templateUrl: './popup-modal.component.html', // Use templateUrl for external HTML
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