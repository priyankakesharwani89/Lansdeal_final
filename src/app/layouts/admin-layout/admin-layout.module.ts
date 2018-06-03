import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule, MatRippleModule, MatTooltipModule,} from '@angular/material';
import {RouterModule} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {PropertiesListComponent} from '../../property/properties-list/properties-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';

import {AdminLayoutRoutes} from './admin-layout.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    PropertiesListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule {
}
