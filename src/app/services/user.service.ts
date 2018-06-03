import { Injectable } from '@angular/core';
import { User } from 'models/user';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database/interfaces';
 
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../core/auth.service';
@Injectable()
export class UserService {
  private user: User;
  usersDbPath = '/users';
  email: string;
  constructor(private authService: AuthService,private db: AngularFireDatabase, private _firebaseAuth: AngularFireAuth) { 
    this._firebaseAuth.authState.subscribe(auth => {      
      if(auth) {
        this.email = auth.email;
      }});
  }
  getEmail() {
    return this.email;
  }
  setEmail(email) {
    this.email = email;
  }
  createUser(kycResponse, aadharnumber, email) {
    this.user = new User(aadharnumber, kycResponse.name, kycResponse.date_of_birth, kycResponse.gender,
      kycResponse.phone, kycResponse.photo, kycResponse.email, kycResponse.address);

    return this.db.database.ref()
      .child(this.usersDbPath + '/' + email.replace(/\./g, '~'))
      .set(this.user);
  }

  getUser() {
   
    return this.db.database.ref(
      this.usersDbPath + '/' + this.getEmail().replace(/\./g, '~'));
  }
}
