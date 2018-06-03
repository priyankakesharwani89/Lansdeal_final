import {Component, OnInit} from '@angular/core';
import {User} from 'models/user';

import { DomSanitizer } from '@angular/platform-browser';

import {UserService} from '../services/user.service';
import {ChangeDetectorRef} from '@angular/core'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(private userService: UserService, private domSanitizer: DomSanitizer,
  private changeRef: ChangeDetectorRef) {}
  user: User = null;

  ngOnInit() {
    this.userService.getUser().on('value', (snapshot) => {
      this.user = snapshot.val();
      this.changeRef.detectChanges();
    }); 
  }
}
