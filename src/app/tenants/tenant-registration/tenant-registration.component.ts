import {Component, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { UserService } from '../../services/user.service'; 
import { User } from 'models/user';
@Component({
  selector: 'app-tenant-registration',
  templateUrl: './tenant-registration.component.html',
  styleUrls: ['./tenant-registration.component.scss']
})
export class TenantRegistrationComponent implements OnInit {
  tenant: FormGroup
  constructor(private fb: FormBuilder, private router: Router,
  private tenantService: TenantService, private userService: UserService) {}
  user: User;
  ngOnInit() {
    this.tenant = this.fb.group({
      aadhaarNumber: [
        '',
        [
          Validators.required, Validators.maxLength(12),
          Validators.minLength(12)
        ]
      ],
      startDate: [
        '',
        [
          Validators.required,
        ]
      ],
      endDate: [
        '',
        [
          Validators.required,
        ]
      ]

    })
  }
  submit() {
    if (this.tenant.valid) {
      this.userService.getUser().on('value', (snapshot) => {
        this.user = snapshot.val(); 
        this.tenant.controls.endDate.setValue(new Date(this.tenant.controls.endDate.value).toISOString());
        this.tenant.controls.startDate.setValue(new Date(this.tenant.controls.startDate.value).toISOString());
      this.tenantService.sendData(this.tenant.value, this.user.uid).then((response) => {
           this.router.navigate(['tenants']);
      });
    });
  }
  }ß
}
