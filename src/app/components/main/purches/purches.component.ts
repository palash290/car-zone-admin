import { Component, signal } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purches',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './purches.component.html',
  styleUrl: './purches.component.css'
})
export class PurchesComponent {
  searchQuery: any = '';
  date: any = '';
  status: any = '';
  p: any = 1;

  constructor(private service: SharedService, private toastr: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.getBuseSchedule();
  }

  data: any;

  getBuseSchedule() {
    const trimmedSearch = this.searchQuery?.trim() || '';
    this.service.getApi(`getAllPurchases?search=${trimmedSearch}`).subscribe({
      next: (resp: any) => {
        this.data = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }


  userImg1: any;

  showImg(url: any) {
    this.userImg1 = url;
  }

  showDetail(item: any) {
    sessionStorage.setItem('purches', JSON.stringify(item))
    this.service.purches.set(item)
    this.router.navigate(['/home/payment-detail'])
  }
}
