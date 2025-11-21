import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Todo } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>TODO List</h2>
    <div class="todo-list">
      <div *ngFor="let todo of todos" 
           class="todo-item" 
           [class.completed]="todo.completed">
        {{ todo.title }}
      </div>
    </div>
  `,
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  userId: number | null = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.userId = id ? +id : null;

      if (this.userId) {
        this.dataService.getTodosByUserId(this.userId).subscribe(data => {
          this.todos = data;
        });
      }
    });
  }
}