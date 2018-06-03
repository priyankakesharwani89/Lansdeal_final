import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDatepickerModule, MatInputModule, MatListModule, MatNativeDateModule, MatRadioModule, MatRippleModule, MatStepperModule, MatTooltipModule, MatProgressSpinnerModule, MatSelectModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { DocumentService } from '../../services/document.service';
//import { RegisterComponent } from '../../register/register.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DocumentsComponent } from '../../documents/documents.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PaymentsComponent } from '../../payments/payments.component';
import { PropertiesListComponent } from '../../property/properties-list/properties-list.component';
import { PropertyRegistrationComponent } from '../../property/property-registration/property-registration.component';
//import { RegistrationComponent } from '../../registration/registration.component';
import { PropertyService } from '../../services/property.service';
import { TenantService } from '../../services/tenant.service';
import { TenantRegistrationComponent } from '../../tenants/tenant-registration/tenant-registration.component';
import { TenantsComponent } from '../../tenants/tenants-list/tenants-list.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { MatFileUploadModule } from 'angular-material-fileupload';

import { UserLayoutRoutes } from './user-layout.routing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(UserLayoutRoutes), FormsModule,
    MatButtonModule, MatRippleModule, MatInputModule, MatTooltipModule,
    MatRadioModule, MatTooltipModule, MatListModule, MatStepperModule,
    ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule,
    MatProgressSpinnerModule, MatSelectModule, MatIconModule, MatProgressBarModule, MatFileUploadModule
  ],
  declarations: [
    DashboardComponent, UserProfileComponent, PropertiesListComponent,
    DocumentsComponent, TenantsComponent, PaymentsComponent, MapsComponent,
    NotificationsComponent, PropertyRegistrationComponent,
     TenantRegistrationComponent, //RegisterComponent
  ],
  providers: [PropertyService,DocumentService, TenantService],
})

export class UserLayoutModule {
}
