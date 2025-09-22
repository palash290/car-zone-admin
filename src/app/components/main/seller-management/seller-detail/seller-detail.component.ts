import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedService } from '../../../../services/shared.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-seller-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, NgxPaginationModule],
  templateUrl: './seller-detail.component.html',
  styleUrl: './seller-detail.component.css'
})
export class SellerDetailComponent {

  carId: any;
  carFeaturesList: string[] = [];
  p: any = 1;
  data: any;

  constructor(private service: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.carId = this.route.snapshot.queryParamMap.get('id');
    this.getBuseSchedule(this.carId);
    //this.getCar();
  }

  carData: any;

  getBuseSchedule(carId: any) {
    this.service.getApi(`getSingleSeller?id=${carId}`).subscribe({
      next: (resp: any) => {
        this.carData = resp.data;
        this.data = resp.data.listings;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

  getCar() {
    const trimmedSearch = ''
    this.service.getApi(`listallCar?search=${trimmedSearch}`).subscribe({
      next: (resp: any) => {
        this.data = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }


}
