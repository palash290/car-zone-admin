import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-slot-request',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './slot-request.component.html',
  styleUrl: './slot-request.component.css'
})
export class SlotRequestComponent {

  searchQuery = '';
  date: any = '';
  p: any = 1;

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.getBuseSchedule();
  }

  data: any;

  getBuseSchedule() {
    // const trimmedSearch = this.searchQuery?.trim() || '';
    this.service.getApi(`getAllSlotRequests`).subscribe({
      next: (resp: any) => {
        this.data = resp.data;
        this.filterTable();
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

  filteredData: any[] = [];
  selectedStatus: string = 'ALL';

  filterTable() {
    this.p = 1;
    let filtered = this.data;

    if (this.selectedStatus != 'ALL') {
      filtered = filtered.filter((item: { status: string; }) => item.status == this.selectedStatus);
    }

    if (this.searchQuery.trim()) {
      const keyword = this.searchQuery.trim().toLowerCase();
      filtered = filtered.filter((item: { fullName: string; }) =>
        (item.fullName?.toLowerCase().includes(keyword))
      );
    }

    this.filteredData = filtered;
  }


}
