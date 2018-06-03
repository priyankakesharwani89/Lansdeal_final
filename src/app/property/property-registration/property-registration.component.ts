import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Property} from 'models/property';

import {PropertyService} from '../../services/property.service'; 
import { UserService } from '../../services/user.service';
import { User } from 'models/user';
//9868505833
@Component({
  selector: 'app-property-registration',
  templateUrl: './property-registration.component.html',
  styleUrls: ['./property-registration.component.scss']
})
export class PropertyRegistrationComponent implements OnInit {
  property: Property;
  identification: FormGroup;
  address: FormGroup;
  sale: FormGroup;
  user: User;
  constructor(
      private fb: FormBuilder, private router: Router, private userService: UserService,
      private propertyService: PropertyService) {}

  ngOnInit() {
    this.property = new Property();
    this.initIdentification();
    this.initAddress();
    this.initSale();
  }

  
  initIdentification() {
    this.identification = this.fb.group({
      salesDeedNumber: ['', [Validators.required, Validators.maxLength(16)]],
      conveyanceDeedNumber:
          ['', [Validators.required, Validators.maxLength(16)]],
      propertyId: ['', [Validators.required]],

      stampDutyNumber: ['', [Validators.required, Validators.maxLength(16)]],
    });
  }

  initAddress() {
    this.address = this.fb.group({
      khasraNumber: ['', [Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  initSale() {
    this.sale = this.fb.group({
      tenantAvailable: ['', [Validators.required, Validators.maxLength(16)]],
      lastOwnerAdhaarCard: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      saleType: ['', [Validators.required]]

    });
  }
  submit() {
    this.router.navigate(['properties-list']);
    this.userService.getUser().on('value', (snapshot) => {
    this.user = snapshot.val(); 
    this.property.salesDeedNumber = this.identification.controls.salesDeedNumber.value;
    this.property.conveyanceDeedNumber = this.identification.controls.conveyanceDeedNumber.value;
    this.property.stampDutyNumber = this.identification.controls.stampDutyNumber.value;
    this.property.address = this.address.controls.address.value;
    this.property.lastOwnerAdhaarCard = this.sale.controls.lastOwnerAdhaarCard.value;
    this.property.hasTenants = this.sale.controls.tenantAvailable.value; 
    this.property.verified = 'No';
    this.propertyService.sendData(this.property, this.user.uid);
    });
  }
}
