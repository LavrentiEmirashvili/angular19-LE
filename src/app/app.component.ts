import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavigationComponent, FooterComponent],
  template: `
    <app-header />
    <div class="main-container">
      <app-navigation />
      <main class="content-wrapper">
        <router-outlet />
      </main>
    </div>
    <app-footer />
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CrocoAngular';
}