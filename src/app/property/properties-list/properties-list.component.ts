import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Property} from 'models/property';

import {PropertyService} from '../../services/property.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit {
  constructor(private propertyService: PropertyService, private route: Router,
  private userService: UserService, private changeRef: ChangeDetectorRef) {
  }
  dataLoading = true;
  properties: Property[] =[];
  ngOnInit() {
    this.properties = [];
    this.propertyService.getPropertyList('547039586626').on('value', (snapshot) => {
    const  json = snapshot.toJSON();
    if(json) {
    Object.keys(json).forEach((key) =>{
      console.log('Key : ' + key + ', Value : ' + json[key])
      this.properties.push(json[key]);
    });
  }
  this.dataLoading = false;
    this.changeRef.detectChanges();
    });
  }
  addNewProperty() {
    this.route.navigate(['property-registration']);
  }
}
