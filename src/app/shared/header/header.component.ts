import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']   // << fixed
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();  // << fixed

  currentDateTime: Date = new Date();

  constructor(private dateTimeService: DateTimeService) {}

  onToggleSidenav() {
    this.sidenavToggle.emit();  // << fixed missing brace
  }

  ngOnInit() {
    this.dateTimeService.dateTime$.subscribe(date => {
      this.currentDateTime = date;
    });
  }
}