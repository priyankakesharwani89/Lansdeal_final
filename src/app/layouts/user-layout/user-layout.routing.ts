import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {DocumentsComponent} from '../../documents/documents.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {PaymentsComponent} from '../../payments/payments.component';
import {PropertiesListComponent} from '../../property/properties-list/properties-list.component';
import {PropertyRegistrationComponent} from '../../property/property-registration/property-registration.component';
//import {RegistrationComponent} from '../../registration/registration.component';
import {TenantRegistrationComponent} from '../../tenants/tenant-registration/tenant-registration.component';
import {TenantsComponent} from '../../tenants/tenants-list/tenants-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import { RegisterComponent } from '../../register/register.component';
import { AuthenticatedGuard } from '../../core/authenticateGuard';

export const UserLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
 
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthenticatedGuard]},
  {
    path: 'properties-list',
    component: PropertiesListComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'property-registration',
    component: PropertyRegistrationComponent,
    canActivate: [AuthenticatedGuard]
  },
  {path: 'tenants', component: TenantsComponent, canActivate: [AuthenticatedGuard]},
  {path: 'tenant-registration', component: TenantRegistrationComponent, canActivate: [AuthenticatedGuard]},
  {path: 'payments', component: PaymentsComponent, canActivate: [AuthenticatedGuard]},
  {path: 'documents', component: DocumentsComponent,canActivate: [AuthenticatedGuard]},
  {path: 'maps', component: MapsComponent, canActivate: [AuthenticatedGuard]},
  {path: 'notifications', component: NotificationsComponent, canActivate: [AuthenticatedGuard]},
];
