import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-buyer-management',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './buyer-management.component.html',
  styleUrl: './buyer-management.component.css'
})
export class BuyerManagementComponent {

  searchQuery: any = '';
  date: any = '';
  status: any = '';
  p: any = 1;

  constructor(private service: SharedService, private toastr: NzMessageService) { }

  ngOnInit() {
    this.getBuseSchedule();
  }

  data: any;

  getBuseSchedule() {
    const trimmedSearch = this.searchQuery?.trim() || '';
    this.service.getApi(`getSellerAndBuyer?search=${trimmedSearch}&role=buyer`).subscribe({
      next: (resp: any) => {
        this.data = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

  handleCheckboxChange(row: any) {
    if (row.isBlocked == 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to unblock this buyer!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          const formURlData = new URLSearchParams();
          //console.log()
          formURlData.set('user_id', row.id);
          formURlData.set('role', 'buyer');
          formURlData.set('isBlocked', '0');
          this.service.postAPI(`blocked`, formURlData).subscribe({
            next: resp => {
              this.toastr.success(resp.message);
              this.getBuseSchedule();
            }
          })
        } else {
          //this.toastr.warning('Something went wrong!');
          this.getBuseSchedule();
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to block this buyer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          const formURlData = new URLSearchParams();
          formURlData.set('user_id', row.id);
          formURlData.set('role', 'buyer');
          formURlData.set('isBlocked', '1');
          this.service.postAPI(`blocked`, formURlData).subscribe({
            next: resp => {
              this.toastr.success(resp.message);
              this.getBuseSchedule();
            }
          })
        } else {
          //this.toastr.warning('Something went wrong!');
          this.getBuseSchedule();
        }
      });
    }
  }

  userImg1: any;

  showImg(url: any) {
    this.userImg1 = url;
  }


}
