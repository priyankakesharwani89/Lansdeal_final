import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'models/user';

import { AadhaarServiceService } from '../services/aadhaar-service.service';
import { UserService } from '../services/user.service';


var gatewayOptions = {
  company_display_name: 'codekul',  //(required)
  consent_purpose: 'testing',       //(required)
  front_text_color:
    'FFFFFF',  //(optional)Add the hex for colour of text of company name
  background_color:
    '2C3E50',  //(optional)Add the hex for colour to be set for gateway.
  mobile_email_required: 'Y',  //(optional) N if mobile email is not required.
  logo_url:
    'https://media.licdn.com/media/AAEAAQAAAAAAAAgLAAAAJGU1NTQyM2FmLTdlYmItNGZhOS1iMTA0LWQ1NjI0YTI2ZmQ3Yw.png',  //(required)
  otp_allowed: 'y',          // (optional) default value is ‘y’
  fingerprint_allowed: 'n',  //(optional) default value ‘y’
  default_device: '',  //(optional) If set device selection will not appear
  device_selection_allowed:
    'n'  //(optional)New config added  to control dropdown access
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showOTP = false;
  opencrd = false;
  dataLoading = false;
  //  closeResult: string;
  type1 = 'ekyc';
  type2 = 'otp';
  aadharOTP: string;
  aadharNumber: string;
  loginForm: NgForm;
  emailAddress:string;
  constructor(
    private aadharService: AadhaarServiceService,
    private userService: UserService, private router: Router) { }
     
  sendOTP(aadhar, loginForm) {
    if (loginForm.valid) {
      this.dataLoading = true;
      this.aadharService.sendOTP(aadhar, this.type1).subscribe(response => {
        const parseJson = JSON.parse(response);
        this.dataLoading = false;
        if (parseJson.OtpRes.ret == 'y') {
          this.showOTP = true;
        }
      });
    }
  }

  verifyOTP(loginForm) {
    if (loginForm.valid) {
      this.dataLoading = true;
      this.aadharService.verifyOTP(this.aadharOTP, this.type2)
        .subscribe(response => {
          console.log(response);
          if (response.AuthRes.ret == 'y') {
            this.aadharService.getUserDetail(this.aadharNumber, this.aadharOTP).subscribe(response => {
              this.userService.createUser(
                response.kyc_data, this.aadharNumber, this.emailAddress );
              this.router.navigate(['/user-profile']);
            });
          }
        });
    }
  }
  OnClear() {
    this.aadharNumber = '';
    this.aadharOTP = '';
    this.opencrd = false;
    this.showOTP = false;
  }



  // open(content) {
  //     openAadhaarGateway(this.myAadhaarGateway);
  //     this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  ngOnInit() { 
    this.emailAddress =  this.userService.getEmail();
  }
}
