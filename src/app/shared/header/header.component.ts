import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="app-header">
      <button class="sidebar-toggle">texttest</button>
      <div class="site-title">
        <a [routerLink]="['/users']">Croco Angular App</a>
      </div>
      <div class="current-datetime">{{ currentDateTime | date:'yyyy-MM-dd HH:mm:ss' }}</div>
    </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentDateTime: Date = new Date();

  constructor(private dateTimeService: DateTimeService) {}

  ngOnInit() {
    // დროის განახლება ყოველ წამში
    this.dateTimeService.dateTime$.subscribe(date => {
      this.currentDateTime = date;
    });
  }
}