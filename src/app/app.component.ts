import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    CommonModule, // აუცილებელია [ngClass]-სთვის
  ],
  template: `
    <app-header (sidenavToggle)="onToggleNavbar()"></app-header>
    
    <div class="main-layout">
      <app-navigation [open]="navbarOpen"></app-navigation> 
      
      <main class="content-area" [ngClass]="{'nav-open': navbarOpen}">
        <router-outlet></router-outlet>
      </main>
    </div>
    
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CrocoAngular';
  navbarOpen = false;

  onToggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    // ნავიგაცია დაიხურება/გაიხსნება იგივე ღილაკით
  }
}