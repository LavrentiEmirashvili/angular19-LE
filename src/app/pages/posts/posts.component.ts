import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Post, User } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { PopupModalComponent } from '../../shared/popup-modal/popup-modal.component';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [CommonModule, PopupModalComponent,],
  templateUrl: './posts.component.html'
  ,
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