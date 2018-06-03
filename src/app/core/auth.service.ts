import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  userDetails: firebase.User = null;

  private usersDbPath: string = '/users'
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router,  private db: AngularFireDatabase) {
    this.user = _firebaseAuth.authState;    
  }
  checkAuthorisedUser(emailAddress: string) {
    return this.db.database.ref(
      this.usersDbPath + '/' + emailAddress.replace(/\./g, '~'));
  }

  signInWithGoogle() {
    this._firebaseAuth.auth
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        .then((user) => {
          this.userDetails = user;
         
        })
        .catch((error) => {
          console.log(error);
        })
  }
  
  signOut() {
    this._firebaseAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  getEmailAddress() {
    return this.user;
  }
}
