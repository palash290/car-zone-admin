import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { NzMessageService } from 'ng-zorro-antd/message';

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

  constructor(private service: SharedService, private toastr: NzMessageService) { }

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

  onEmfStatusChange(id: number, overrideStatus: string | null, originalStatus?: string): void {
    const statusToUse = overrideStatus || originalStatus;

    if (!statusToUse) {
      this.toastr.warning('Please select a valid status');
      return;
    }

    const statusLabels: any = {
      valid: 'Valid',
      due_soon: 'Due Soon',
      overdue: 'Overdue',
      no_data: 'No Data'
    };

    Swal.fire({
      title: 'Are you sure?',
      text: `You want to change EMF Car Status to "${statusLabels[statusToUse]}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          id: id,
          status: statusToUse
        };

        this.service.putAPI('changeMfkCarStatus', body).subscribe({
          next: (resp: any) => {
            this.toastr.success(resp.message || 'Status updated successfully!');
          },
          error: (err) => {
            this.toastr.warning('Failed to update EMF Car Status');
          }
        });
      } else {
        this.toastr.warning('Action cancelled');
      }
    });
  }


}
