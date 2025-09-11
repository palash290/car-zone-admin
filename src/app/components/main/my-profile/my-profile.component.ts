import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  profileForm!: FormGroup;
  userDet: any;
  userEmail: any;
  first_name: any;
  last_name: any;
  phone: any;
  loading: boolean = false;
  profileImg: string | ArrayBuffer | null = null;
  pattern1 = "^[0-9_-]{8,15}";

  constructor(private service: SharedService, private toastr: NzMessageService) { }

  ngOnInit() {
    this.initForm();
    this.loadUserProfile();
  }

  initForm() {
    this.profileForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl({ value: this.userEmail, disabled: true })
    });
  }

  loadUserProfile() {
    this.service.getApi('getAdminProfile').subscribe({
      next: (resp) => {
        //debugger
        this.userEmail = resp.data[0].email;
        this.first_name = resp.data[0].firstName;
        this.last_name = resp.data[0].lastName;
        this.phone = resp.data[0].phoneNumber;
        this.profileImg = resp.data[0].profileImage;
        this.profileForm.patchValue({
          first_name: this.first_name,
          last_name: this.last_name,
          phone: this.phone,
          email: this.userEmail
        });

      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  onSubmit() {
    this.profileForm.markAllAsTouched();

    const first_name = this.profileForm.value.first_name?.trim();
    const last_name = this.profileForm.value.last_name?.trim();
    //const phone = this.profileForm.value.phone?.trim();

    if (!first_name || !last_name) {
      return;
    }

    if (this.profileForm.valid) {
      this.loading = true;
      const formURlData = new FormData();
      formURlData.append('firstName', this.profileForm.value.first_name);
      formURlData.append('lastName', this.profileForm.value.last_name);
      formURlData.append('email', this.userEmail);
      //formURlData.append('contact_no', this.profileForm.value.phone);

      if (this.selectedFile) {
        formURlData.append('profileImage', this.selectedFile);
      }

      this.service.postAPIFormData('updateProfile', formURlData).subscribe({
        next: (resp) => {
          if (resp.success == true) {
            this.toastr.success(resp.message);
            this.loading = false;
            this.service.triggerRefresh();
            this.loadUserProfile();
          } else {
            this.toastr.warning(resp.message);
            this.loading = false;
            this.loadUserProfile();
          }
        },
        error: (error) => {
          this.toastr.warning('Something went wrong.');
          console.log(error.message);
          this.loading = false;
        }
      });
    } else {
      //this.loading = false;
      this.toastr.warning('Please check all the fields!');
    }
  }

  selectedFile!: File;
  //previewImageAdd: string | ArrayBuffer | null = null;

  // Handle File Upload and Show Preview for Add and Edit Modals
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {

        this.profileImg = reader.result;

      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


}
