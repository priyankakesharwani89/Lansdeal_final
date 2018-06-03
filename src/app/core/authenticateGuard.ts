import { CanActivate } from "@angular/router/src/interfaces";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router/src/router_state";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { UserService } from "../services/user.service";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService, private _firebaseAuth: AngularFireAuth, private authservice: AuthService) {}
 
    canActivate(): Observable<boolean> {
        return Observable.from(this._firebaseAuth.authState).map(state => {
          this.authservice.userDetails = state;
          if(state) {

            this.userService.setEmail(state.email);
          }
          return !!state;
        }).do(authenticated => {
      if 
        (!authenticated) this.router.navigate([ '/login' ]);
      })
    }
}