import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../core/auth.service';

import { UserService } from '../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: any;
  isLogging = true;
  showErrorMessage= false;
  constructor(private authService: AuthService, 
    private userService: UserService,
    private _firebaseAuth: AngularFireAuth,
     private router: Router, 
     private activatedRoute: ActivatedRoute) { 
    this._firebaseAuth.authState.subscribe(auth => {      
      if(auth) {
       
        this.authService.checkAuthorisedUser(auth.email)
        .on('value', (snapshot) => {
          this.isLogging = false;
          const email = snapshot.val(); 
          authService.userDetails = auth;
          this.showErrorMessage = false; 
          if (email) {
            this.router.navigate(['/user-profile']);
          } else { 
           this.router.navigateByUrl('/register');
          }
        });
      } else {
        this.isLogging = false;
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnInit() { 
  }
  login() {
    this.isLogging = true;
    this.authService.signInWithGoogle();
  }
 
}
