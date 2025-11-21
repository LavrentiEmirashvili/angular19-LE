import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="app-navigation">
      <ul>
        <li>
          <a [routerLink]="['/users']" routerLinkActive="active">მომხმარებლები</a>
        </li>
        <li>
          <a [routerLink]="['/posts']" routerLinkActive="active">პოსტები</a> 
        </li>
        <li>
          <a [routerLink]="['/promo']" routerLinkActive="active">აქციები</a> 
        </li>
      </ul>
    </nav>
  `,
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {}