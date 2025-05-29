import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-car-listing',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './car-listing.component.html',
  styleUrl: './car-listing.component.css'
})
export class CarListingComponent {

  searchQuery: any = '';
  date: any = '';
  status: any = '';
  p: any = 1;

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.getBuseSchedule();
  }

  data: any;

  getBuseSchedule() {
    this.service.getApi(`listallCar?search=${this.searchQuery}&createdAt=${this.date}&isActive=${this.status}`).subscribe({
      next: (resp: any) => {
        this.data = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

}
