import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { UsersComponent } from './pages/users/users.component';
import { PostsComponent } from './pages/posts/posts.component';
import { TodosComponent } from './pages/todos/todos.component';
import { PromoComponent } from './pages/promo/promo.component';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostsComponent },
  { path: 'todos/:id', component: TodosComponent },
  { path: 'promo', component: PromoComponent },
  { path: '**', redirectTo: 'users' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // HTTP მოდულის პროვაიდერი
  ]
};