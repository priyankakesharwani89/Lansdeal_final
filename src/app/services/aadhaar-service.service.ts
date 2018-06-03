import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs/Observable';

var gatewayOptions = {
    company_display_name: '<<Add your company name here>>',      //(required)
    consent_purpose: '<<Add the purpose of transaction here>>',  //(required)
    front_text_color:
        'FFFFFF',  //(optional)Add the hex for colour of text of company name
    background_color:
        '2C3E50',  //(optional)Add the hex for colour to be set for gateway.
    mobile_email_required: 'Y',  //(optional) N if mobile email is not required.
    logo_url: 'https://your-square-product-logo-image-url-here.png',  //(required)
    otp_allowed: 'n',          // (optional) default value is ‘y’
    fingerprint_allowed: 'y',  //(optional) default value ‘y’
    default_device:
        'MFS100',  //(optional) If set device selection will not appear
    device_selection_allowed:
        'n'  //(optional)New config added  to control dropdown access
};


@Injectable()
export class AadhaarServiceService {
    sendOTPUrl = 'https://us-central1-lansdeal-d860e.cloudfunctions.net/sendOtp';

    adhaarAuthUrl = 'https://us-central1-lansdeal-d860e.cloudfunctions.net/auth';

    ekycUrl = 'https://ext.digio.in:444/test/otpkyc';

    constructor(private http: HttpClient) { }

    sendOTP(aadharnumber, type): Observable<any> {
        console.log('In Service', type, aadharnumber);

        let headers =
            new Headers({ 'Access-Control-Allow-Origin': 'https://localhost:4200' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.sendOTPUrl, options)
    }

    verifyOTP(otp, type): Observable<any> {
        console.log('In Service', type, otp);
        let headers =
            new Headers({ 'Access-Control-Allow-Origin': 'https://localhost:4200' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.adhaarAuthUrl, options)
    }
    getUserDetail(aadharnumber: string, otpString: string): Observable<any> {
     return this.http.post(this.ekycUrl,
            {
                "aadhaar_id": aadharnumber,
                "otp": otpString,
                "txn_id": "547039586626"
            },
            {
                headers: { 'Authorization': 'No', 'Content-type': 'application/json' }
            })
    }
}
