import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent {

}
