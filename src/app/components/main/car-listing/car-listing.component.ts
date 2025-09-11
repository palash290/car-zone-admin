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

  searchQuery = '';
  date: any = '';
  status: any = '';
  p: any = 1;

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.getBuseSchedule();
  }

  data: any;

  getBuseSchedule() {
    const trimmedSearch = this.searchQuery?.trim() || '';
    this.service.getApi(`listallCar?search=${trimmedSearch}&createdAt=${this.date}&isActive=${this.status}`).subscribe({
      next: (resp: any) => {
        this.data = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }


}
