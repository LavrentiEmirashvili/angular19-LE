import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type WeekType = 'I' | 'II' | 'III' | 'IV';

interface LeaderboardEntry {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
}

type FilterType = WeekType | 'ALL';
const WEEKS: WeekType[] = ['I', 'II', 'III', 'IV'];
const ALL_FILTERS: FilterType[] = [...WEEKS, 'ALL'];

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements OnInit {
  leaderboardData: LeaderboardEntry[] = [];

  filteredData: LeaderboardEntry[] = [];

  filterOptions: FilterType[] = ALL_FILTERS;

  activeFilter: FilterType = 'ALL';

  ngOnInit(): void {
    this.generateLeaderboardData(40);
    this.applyFilter(this.activeFilter);
  }

  private generateRandomName(): string {
    const names = [
      'Lasha',
      'Nino',
      'Giorgi',
      'Tamuna',
      'Davit',
      'Ana',
      'Zura',
      'Ketevan',
      'Ilia',
      'Mariam',
    ];
    const randomSuffix = Math.floor(Math.random() * 9000 + 1000);
    return names[Math.floor(Math.random() * names.length)] + randomSuffix;
  }

  private generateLeaderboardData(totalEntries: number): void {
    let allEntries: LeaderboardEntry[] = [];
    let currentPlace = 1;

    for (let i = 1; i <= totalEntries; i++) {
      const weekIndex = i % WEEKS.length;
      const randomWeek = WEEKS[weekIndex];

      allEntries.push({
        customerId: Math.floor(Math.random() * 1000000),
        loginName: this.generateRandomName(),
        place: currentPlace++,
        week: randomWeek,
      });
    }

    allEntries.sort(() => Math.random() - 0.5);

    this.leaderboardData = allEntries.map((entry, index) => ({
      ...entry,
      place: index + 1,
    }));
  }

  applyFilter(filter: FilterType): void {
    this.activeFilter = filter;

    if (filter === 'ALL') {
      this.filteredData = this.leaderboardData;
    } else {
      let filtered = this.leaderboardData.filter(
        (entry) => entry.week === filter
      );

      this.filteredData = filtered
        .sort((a, b) => a.place - b.place)
        .map((entry, index) => ({
          ...entry,
          place: index + 1,
        }));
    }
  }
}
