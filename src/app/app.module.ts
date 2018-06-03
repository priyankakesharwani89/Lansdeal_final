import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatRippleModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {environment} from 'environments/environment.prod';

import { AuthenticatedGuard } from './core/authenticateGuard';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {UserLayoutComponent} from './layouts/user-layout/user-layout.component';
import {LoginComponent} from './login/login.component';
import {AadhaarServiceService} from './services/aadhaar-service.service';
import {UserService} from './services/user.service';
import { AuthService } from './core/auth.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'}),
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [
    AppComponent, AdminLayoutComponent, UserLayoutComponent, LoginComponent, RegisterComponent

  ],
  providers: [AuthenticatedGuard, AadhaarServiceService,AngularFireAuth, AuthService,UserService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule {
}
