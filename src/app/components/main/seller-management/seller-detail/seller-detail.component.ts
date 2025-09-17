import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-seller-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './seller-detail.component.html',
  styleUrl: './seller-detail.component.css'
})
export class SellerDetailComponent {

  carId: any;
  carFeaturesList: string[] = [];

  constructor(private service: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.carId = this.route.snapshot.queryParamMap.get('id');
    this.getBuseSchedule(this.carId);
  }

  carData: any;

  getBuseSchedule(carId: any) {
    this.service.getApi(`getSingleSeller?id=${carId}`).subscribe({
      next: (resp: any) => {
        this.carData = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

}
