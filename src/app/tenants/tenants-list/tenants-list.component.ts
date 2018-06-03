import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Tenant} from 'models/tenant';

import {TenantService} from '../../services/tenant.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.scss']
})
export class TenantsComponent implements OnInit {
  constructor(private TenantService: TenantService, private route: Router,
  private userService: UserService, private changeRef: ChangeDetectorRef) {
  }
  dataLoading = false;
  tenants: Tenant[] =[];
  ngOnInit() {
    this.dataLoading = true;
    this.tenants = [];
    this.TenantService.getTenantList('547039586626').on('value', (snapshot) => {
    const  json = snapshot.toJSON();
    if(json) {
    Object.keys(json).forEach((key) =>{
      console.log('Key : ' + key + ', Value : ' + json[key])
      this.tenants.push(json[key]);
    });
  }
  this.dataLoading = false;
    this.changeRef.detectChanges();
    });
  }
  addNewTenant() {
    this.route.navigate(['tenant-registration']);
  }
}
