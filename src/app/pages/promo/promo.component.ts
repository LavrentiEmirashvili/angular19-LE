import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WheelComponent } from '../../shared/wheel/wheel.component';
import { LeaderboardComponent } from '../../shared/leaderboard/leaderboard.component';

@Component({
  selector: 'app-promo-page',
  standalone: true,
  imports: [CommonModule, WheelComponent, LeaderboardComponent],
  template: `
    <h2>აქციები</h2>
    
    <app-wheel />

    <hr>
    
    <app-leaderboard />
  `,
})
export class PromoComponent implements OnInit {
  ngOnInit() {}
}