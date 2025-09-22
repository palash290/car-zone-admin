import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { RouterLink } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import localeDeCH from '@angular/common/locales/de-CH';

registerLocaleData(localeDeCH);

@Component({
  selector: 'app-trx-history',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './trx-history.component.html',
  styleUrl: './trx-history.component.css'
})
export class TrxHistoryComponent {

  searchQuery = '';
  date: any = '';
  p: any = 1;
  data: any;

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.getTrx();
  }

  getTrx() {
    this.service.getApi(`getTransaction-slot-summary`).subscribe({
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
      filtered = filtered.filter((item: { username: string; }) =>
        (item.username?.toLowerCase().includes(keyword))
      );
    }
    this.filteredData = filtered;
  }


}
