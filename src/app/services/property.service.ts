import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Property } from 'models/property';
import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';

@Injectable()
export class PropertyService {
  propertyDataDbPath = '/properties';
  properties:Property[] = [];
  constructor(private db: AngularFireDatabase) { }
  getPropertyList(aadhaarNumber) {
    // const properties: Property[] = [
    //   {
    //     salesDeedNumber: 'aaaaa',
    //     stampDutyNumber: 'aaaaaa',
    //     propertyId: '111111',
    //     hasTenants: 'Yes',
    //     verified: 'No',
    //     localityType: 'urban',
    //     address: 'ssasasaas',
    //     typeOfSale: 'lease',
    //     conveyanceDeedNumber: 'ssssss',
    //     lastOwnerAdhaarCard: '789645213698',
    //     uid: '999900099999'
    //   },
    //   {
    //     salesDeedNumber: 'aaaaa',
    //     stampDutyNumber: 'aaaaaa',
    //     propertyId: '22222',
    //     hasTenants: 'Yes',
    //     verified: 'No',
    //     localityType: 'urban',
    //     address: 'ssasasaas',
    //     typeOfSale: 'lease',
    //     conveyanceDeedNumber: 'ssssss',
    //     lastOwnerAdhaarCard: '789645213698',
    //     uid: '999900099999'
    //   },
    //   {
    //     salesDeedNumber: 'aaaaa',
    //     stampDutyNumber: 'aaaaaa',
    //     propertyId: '1113333111',
    //     hasTenants: 'Yes',
    //     verified: 'No',
    //     localityType: 'urban',
    //     address: 'ssasasaas',
    //     typeOfSale: 'lease',
    //     conveyanceDeedNumber: 'ssssss',
    //     lastOwnerAdhaarCard: '789645213698',
    //     uid: '999900099999'

    //   },
    //   {
    //     salesDeedNumber: 'aaaaa',
    //     stampDutyNumber: 'aaaaaa',
    //     propertyId: '333331',
    //     hasTenants: 'Yes',
    //     verified: 'No',
    //     localityType: 'urban',
    //     address: 'ssasasaas',
    //     typeOfSale: 'lease',
    //     conveyanceDeedNumber: 'ssssss',
    //     lastOwnerAdhaarCard: '789645213698',
    //     uid: '999900099999'
    //   },
    //   {
    //     salesDeedNumber: 'aaaaa',
    //     stampDutyNumber: 'aaaaaa',
    //     propertyId: '2121221',
    //     hasTenants: 'Yes',
    //     verified: 'No',
    //     localityType: 'urban',
    //     address: 'ssasasaas',
    //     typeOfSale: 'lease',
    //     conveyanceDeedNumber: 'ssssss',
    //     lastOwnerAdhaarCard: '789645213698',
    //     uid: '999900099999'
    //   }
    // ];
    // return Observable.create(observer => {
    //   observer.next(properties);
    //   // call complete if you want to close this stream (like a promise)
    //   observer.complete();
    // }); 
    return this.db.database.ref()
      .child(this.propertyDataDbPath + '/' + aadhaarNumber)
  }
  sendData(property: Property, aadhaarNumber) {
    let id = 'Property_1'
    this.properties = [];
    this.getPropertyList('547039586626').on('value', (snapshot) => {
      const  json = snapshot.toJSON();
        Object.keys(json).forEach((key) =>{
          console.log('Key : ' + key + ', Value : ' + json[key])
          this.properties.push(json[key]);
        });
        if (this.properties) {
          const lastProperty = this.properties[this.properties.length - 1];
          const lastId = parseInt(lastProperty.propertyId.split('_')[1]);
          id = 'Property_' + (lastId + 1)
        }
      });

    property.propertyId = id;
    let propObj = {

    };
    propObj[property.propertyId] = property;
    this.db.list(this.propertyDataDbPath + '/' + aadhaarNumber).push(property);
    
  }
 
}
