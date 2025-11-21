import { Component, Input } from '@angular/core'; // ამოვიღეთ Output და EventEmitter
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Input() open: boolean = false;
  // @Output() closeNavbar = new EventEmitter<void>(); <-- ეს აღარ გვჭირდება
}