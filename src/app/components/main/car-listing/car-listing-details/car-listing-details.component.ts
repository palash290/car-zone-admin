import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedService } from '../../../../services/shared.service';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

Swiper.use([Navigation, Thumbs]);


@Component({
  selector: 'app-car-listing-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './car-listing-details.component.html',
  styleUrl: './car-listing-details.component.css'
})
export class CarListingDetailsComponent {

  carId: any;
  carFeaturesList: any[] = [];
  thumbsSwiper: any;


  constructor(private service: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.carId = this.route.snapshot.queryParamMap.get('id');
    this.getBuseSchedule(this.carId);
  }

  carData: any;
  images: any[] = [];

  getBuseSchedule(carId: any) {
    this.service.getApi(`fetchCarById?id=${carId}`).subscribe({
      next: (resp: any) => {
        this.carData = resp.data;

        this.images = resp.data.carImages.length > 0 ? resp.data.carImages : ['assets/img/no_car.png'];

        const features = resp.data.carFeatures ? resp.data.carFeatures : [];
        this.carFeaturesList = features?.split(',').map((f: string) => f.trim());
      },
      error: error => {
        console.log(error.message);
      }
    });
  }


  ngAfterViewInit() {
    // Wait for DOM and Swiper setup
    setTimeout(() => {
      this.thumbsSwiper = new Swiper('.mySwiperThumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        loop: false
      });

      new Swiper('.mySwiperMain', {
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: this.thumbsSwiper,
        },
      });
    }, 2000); // or use ngZone.runOutsideAngular if needed
  }


}
