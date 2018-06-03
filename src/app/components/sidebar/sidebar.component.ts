import {Component, OnInit} from '@angular/core';

import {PropertiesListComponent} from '../../property/properties-list/properties-list.component';
import {PropertyRegistrationComponent} from '../../property/property-registration/property-registration.component';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [ 
  {path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
  {
    path: '/properties-list',
    title: 'Properties',
    icon: 'content_paste',
    class: ''
  },
  {path: '/tenants', title: 'Tenants', icon: 'bubble_chart', class: ''},
  {path: '/payments', title: 'Payments', icon: 'payments', class: ''},

  {path: '/documents', title: 'Documents', icon: 'library_books', class: ''},
  {
    path: '/notifications',
    title: 'Notifications',
    icon: 'notifications',
    class: ''
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
