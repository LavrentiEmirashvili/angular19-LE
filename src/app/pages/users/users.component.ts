import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, User } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>მომხმარებლები</h2>

    <div class="search-bar">
      <input type="text" [(ngModel)]="searchTerm" (input)="filterUsers()" placeholder="ძებნა: სახელი, მეილი">
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>სახელი</th>
          <th>მეილი</th>
          <th>ტელეფონი</th>
          <th>კომპანია</th>
          <th>მოქმედება</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of filteredUsers">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.company.name }}</td>
          <td class="actions">
            <button class="action-btn" (click)="viewUserPosts(user.id)">
              პოსტები
            </button>
            <button class="action-btn" (click)="viewUserTodos(user.id)">
              TODO List
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = this.users;
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  viewUserPosts(userId: number) {
    // გადასვლა პოსტების გვერდზე მომხმარებლის ID-ით
    this.router.navigate(['/posts', userId]);
  }

  viewUserTodos(userId: number) {
     // გადასვლა TODO-ების გვერდზე მომხმარებლის ID-ით
     this.router.navigate(['/todos', userId]);
  }
}