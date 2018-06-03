import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatToolbarModule],
  declarations:
      [FooterComponent, NavbarComponent, SidebarComponent, HeaderComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, HeaderComponent]
})
export class ComponentsModule {
}
