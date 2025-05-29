import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet, CommonModule],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent {

  isMenuActive = false;

  openMenu(isMenuActive: boolean) {
    this.isMenuActive = isMenuActive;
  }

  closeMenu(isMenuActive: boolean) {
    this.isMenuActive = isMenuActive;
  }

}
