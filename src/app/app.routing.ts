import {CommonModule,} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {UserLayoutComponent} from './layouts/user-layout/user-layout.component';
import {LoginComponent} from './login/login.component'; 
import { RegisterComponent } from './register/register.component';
import { AuthenticatedGuard } from './core/authenticateGuard';
const routes: Routes = [
  {path: 'login', component: LoginComponent}, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {path: 'register', component: RegisterComponent, canActivate: [AuthenticatedGuard]}, {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: '',
    component: UserLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/user-layout/user-layout.module#UserLayoutModule'
    }]
  }  
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {
}
