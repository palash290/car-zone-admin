import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChfCurrencyPipe } from '../../../pipes/chf-currency.pipe';

@Component({
  selector: 'app-purches-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, NgxPaginationModule, ChfCurrencyPipe],
  templateUrl: './purches-detail.component.html',
  styleUrl: './purches-detail.component.css'
})
export class PurchesDetailComponent {
  carId: any;
  purchesData = this.service.purches
  p: any = 1;
  constructor(private service: SharedService, private route: ActivatedRoute) {
    effect(() => {
      this.purchesData = this.purchesData();
    });

    if (!this.purchesData()) {
      this.service.purches.set(JSON.parse(sessionStorage.getItem('purches') || ''));
    }
  }

  ngOnInit() {

  }

}
