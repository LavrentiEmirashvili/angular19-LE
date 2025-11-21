import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Post, User } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { PopupModalComponent } from '../../shared/popup-modal/popup-modal.component';
import { FormsModule } from '@angular/forms'; // Required for ngModel on pagination select

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [CommonModule, PopupModalComponent, FormsModule], // Add FormsModule
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  allPosts: Post[] = []; // Store all posts for pagination
  posts: Post[] = [];    // Posts currently displayed on the page
  users: User[] = [];
  userId: number | null = null;
  
  isModalOpen = false;
  selectedPost: Post | null = null;

  // Pagination properties
  currentPage: number = 1;
  postsPerPage: number = 10;
  totalPages: number = 0;
  pages: number[] = []; // Array to hold page numbers

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.userId = id ? +id : null;

      this.dataService.getUsers().subscribe(users => this.users = users);

      if (this.userId) {
        this.dataService.getPostsByUserId(this.userId).subscribe(data => {
          this.allPosts = data;
          this.initializePagination();
        });
      } else {
        this.dataService.getPosts().subscribe(data => {
          this.allPosts = data;
          this.initializePagination();
        });
      }
    });
  }

  initializePagination() {
    this.totalPages = Math.ceil(this.allPosts.length / this.postsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.goToPage(1); // Go to the first page initially
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.posts = this.allPosts.slice(startIndex, endIndex);
  }

  onPostsPerPageChange() {
    this.initializePagination(); // Re-initialize pagination when postsPerPage changes
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'უცნობი მომხმარებელი';
  }

  openModal(post: Post) {
    this.selectedPost = post;
    this.isModalOpen = true;
    document.body.classList.add('modal-open'); // Add class to body to prevent scrolling
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPost = null;
    document.body.classList.remove('modal-open'); // Remove class from body
  }
}