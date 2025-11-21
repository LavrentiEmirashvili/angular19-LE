import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Post, User } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { PopupModalComponent } from '../../shared/popup-modal/popup-modal.component';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [CommonModule, PopupModalComponent],
  template: `
    <h2>{{ userId ? 'მომხმარებლის პოსტები' : 'ყველა პოსტი' }}</h2>
    
    <div *ngIf="userId; else allPostsTable" class="post-cards-container">
      <div class="card" *ngFor="let post of posts">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body.substring(0, 100) }}...</p>
        <button (click)="openModal(post)">დეტალურად</button>
      </div>
    </div>

    <ng-template #allPostsTable>
      <table class="data-table">
        <thead>
          <tr>
            <th>მომხმარებელი</th>
            <th>პოსტის სათაური</th>
            <th>მოქმედება</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let post of posts">
            <td>{{ getUserName(post.userId) }}</td>
            <td>{{ post.title }}</td>
            <td>
              <button (click)="openModal(post)">დეტალურად</button>
            </td>
          </tr>
        </tbody>
      </table>
    </ng-template>

    <app-popup-modal 
      *ngIf="isModalOpen" 
      [title]="selectedPost!.title" 
      [body]="selectedPost!.body"
      (closeModal)="closeModal()">
    </app-popup-modal>
  `,
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  userId: number | null = null;
  isModalOpen = false;
  selectedPost: Post | null = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // მომხმარებლის ID-ის წამოღება როუტიდან
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.userId = id ? +id : null;

      // ყველა მომხმარებლის მონაცემების წამოღება (პოსტების ცხრილისთვის)
      this.dataService.getUsers().subscribe(users => this.users = users);

      if (this.userId) {
        // ფილტრაცია: კონკრეტული მომხმარებლის პოსტები (ქარდები)
        this.dataService.getPostsByUserId(this.userId).subscribe(data => {
          this.posts = data;
        });
      } else {
        // ყველა პოსტი (ცხრილი)
        this.dataService.getPosts().subscribe(data => {
          this.posts = data;
        });
      }
    });
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'უცნობი მომხმარებელი';
  }

  openModal(post: Post) {
    this.selectedPost = post;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPost = null;
  }
}