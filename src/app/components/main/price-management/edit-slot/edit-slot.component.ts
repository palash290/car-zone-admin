import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedService } from '../../../../services/shared.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-slot',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './edit-slot.component.html',
  styleUrl: './edit-slot.component.css'
})
export class EditSlotComponent {

  carId: any;
  carFeaturesList: string[] = [];
  loading: boolean = false;

  constructor(private service: SharedService, private route: ActivatedRoute, private toastr: NzMessageService) { }

  ngOnInit() {
    this.carId = this.route.snapshot.queryParamMap.get('id');
  }


}
