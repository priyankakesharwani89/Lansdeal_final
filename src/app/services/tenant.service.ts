import {Injectable} from '@angular/core';
import {Tenant} from 'models/tenant';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireList} from 'angularfire2/database/interfaces';

@Injectable()
export class TenantService {
  tenantDataDbPath = '/tenants';
  tenants:Tenant[] = [];
  constructor(private db: AngularFireDatabase) { }
  getTenantList(aadhaarNumber) {
    // const tenants = [
    //   {
    //     name: 'Kumar Agarwal',
    //     startDate: '2017-10-04',
    //     adhaarNumber: '999999990026',
    //     tenantId: '77777777',
    //     tenantId:'23456'
    //   },
    //   {
    //     name: 'Fatima Bedi',
    //     startDate: '2016-11-04',
    //     adhaarNumber: '999999990042',
    //     tenantId: '788888',
    //     tenantId:'56786'
    //   }
    // ];
    // return Observable.create(observer => {
    //   observer.next(tenants);
    //   // call complete if you want to close this stream (like a promise)
    //   observer.complete();
    // });
    return this.db.database.ref()
    .child(this.tenantDataDbPath + '/' + aadhaarNumber);
}
  
  
  sendData(tenant: Tenant, aadhaarNumber) { 
    let id = 'Tenant_1'
    this.tenants = [];
    this.getTenantList('547039586626').on('value', (snapshot) => {
      const  json = snapshot.toJSON();
        Object.keys(json).forEach((key) =>{
          console.log('Key : ' + key + ', Value : ' + json[key])
          this.tenants.push(json[key]);
        });
        if (this.tenants) {
          const lastTenant = this.tenants[this.tenants.length - 1];
          const lastId = parseInt(lastTenant.tenantId.split('_')[1]);
          id = 'Tenant_' + (lastId + 1)
        }
      });

    tenant.tenantId = id;
    let propObj = {

    };
    propObj[tenant.tenantId] = tenant;
    return this.db.list(this.tenantDataDbPath + '/' + aadhaarNumber).push(tenant);
}
}
