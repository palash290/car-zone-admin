import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  profileImg: string | ArrayBuffer | null = null;
  firstName: any;
  lastName: any;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @Output() toggleEvent = new EventEmitter<boolean>();

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.service.refreshSidebar$.subscribe(() => {
      this.loadUserProfile();
    });
    this.loadUserProfile();
  }

  toggleMenu() {
    this.toggleEvent.emit(true);
  }

  loadUserProfile() {
    this.service.getApi('getAdminProfile').subscribe({
      next: (resp) => {
        this.profileImg = resp.data[0].profileImage;
        this.firstName = resp.data[0].firstName;
        this.lastName = resp.data[0].lastName;
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  logout() {
    this.closeModal.nativeElement.click();
    this.service.logout();
  }


}
