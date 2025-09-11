import { Component } from '@angular/core';
import { SharedService } from '../../../../services/shared.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './buyer-details.component.html',
  styleUrl: './buyer-details.component.css'
})
export class BuyerDetailsComponent {

  carId: any;
  carFeaturesList: string[] = [];

  constructor(private service: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.carId = this.route.snapshot.queryParamMap.get('id');
    this.getBuseSchedule(this.carId);
  }

  carData: any;

  getBuseSchedule(carId: any) {
    this.service.getApi(`getSingleBuyer?id=${carId}`).subscribe({
      next: (resp: any) => {
        this.carData = resp.data[0];
      },
      error: error => {
        console.log(error.message);
      }
    });
  }


}
