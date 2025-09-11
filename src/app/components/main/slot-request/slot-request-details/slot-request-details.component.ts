import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedService } from '../../../../services/shared.service';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-slot-request-details',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './slot-request-details.component.html',
  styleUrl: './slot-request-details.component.css'
})
export class SlotRequestDetailsComponent {

  carId: any;
  carFeaturesList: string[] = [];
  loading: boolean = false;
  form!: FormGroup;
  carData: any;
  @ViewChild('closeModalAccept') closeModalAccept!: ElementRef;
  @ViewChild('closeModalReject') closeModalReject!: ElementRef;

  constructor(private service: SharedService, private route: ActivatedRoute, private toastr: NzMessageService
  ) { }

  ngOnInit() {
    this.carId = this.route.snapshot.queryParamMap.get('id');
    this.getDetails();
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[+]?\d+(\.\d+)?$/),
        Validators.min(0.01)
      ]),
      message: new FormControl('', Validators.required)
    });
  }

  getDetails() {
    this.service.getApi(`getSlotRequestsById/${this.carId}`).subscribe({
      next: (resp: any) => {
        this.carData = resp.data;
      },
      error: error => {
        console.log(error.message);
      }
    });
  }

  accept() {
    this.form.markAllAsTouched();
    const price = this.form.value.price?.trim();
    const message = this.form.value.message?.trim();

    if (!price || !message) {
      return;
    }
    if (this.form.invalid) {
      return
    }
    this.loading = true;
    const formURlData = new URLSearchParams();
    formURlData.set('action', 'approved');
    formURlData.set('adminMessage', this.form.value.message);
    formURlData.set('price', this.form.value.price);
    formURlData.set('planType', 'custom');
    this.service.putAPI(`updateSlotRequestStatus/${this.carId}`, formURlData.toString()).subscribe({
      next: (resp: any) => {
        if (resp.success == true) {
          this.toastr.success(resp.message);
          this.loading = false;
          //this.router.navigateByUrl('');
          this.closeModalAccept.nativeElement.click();
        } else {
          this.toastr.warning(resp.message);
          this.loading = false;
        }
      },
      error: (error) => {
        this.loading = false;
        if (error.error.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error('Something went wrong!');
        }
      }
    });
  }

  reject() {
    this.loading = true;
    const formURlData = new URLSearchParams();
    formURlData.set('action', 'rejected');
    formURlData.set('planType', 'custom');
    this.service.putAPI(`updateSlotRequestStatus/${this.carId}`, formURlData.toString()).subscribe({
      next: (resp: any) => {
        if (resp.success == true) {
          this.toastr.success(resp.message);
          this.loading = false;
          this.getDetails();
          this.closeModalReject.nativeElement.click();
        } else {
          this.toastr.warning(resp.message);
          this.loading = false;
        }
      },
      error: (error) => {
        this.loading = false;
        if (error.error.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error('Something went wrong!');
        }
      }
    });
  }

  userImg1: any;

  showImg(url: any) {
    this.userImg1 = url;
  }


}
