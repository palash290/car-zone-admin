import { Component } from '@angular/core';
import { SharedService } from '../../../../services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-trx',
  standalone: true,
  imports: [],
  templateUrl: './view-trx.component.html',
  styleUrl: './view-trx.component.css'
})
export class ViewTrxComponent {

  trxData: any;
  id: any;

  constructor(private service: SharedService, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.getDetails();
  }

  getDetails() {
    this.service.getApi(`getSlotDetail/${this.id}`).subscribe({
      next: (resp: any) => {
        this.trxData = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }


}
