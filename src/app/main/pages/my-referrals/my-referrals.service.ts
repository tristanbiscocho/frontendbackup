import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Resolve } from '@angular/router';
import { CoreHttpService } from 'app/main/services/core-http.service';
import { SERVER_URL } from 'app/main/services/config';
const getRefferalCountURL = SERVER_URL + '/CustomerInfo/GetMyReferralCount?customerId=';
const addReffralURL = SERVER_URL + '/CustomerInfo/SendReferralCodeViaMail';

@Injectable()
export class MyReferralsService {
  constructor(private _coreHttpService: CoreHttpService) { }


  getReffralCount = (id) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = getRefferalCountURL + id;
    return this._coreHttpService.httpGetRequest<any>(
        url,
        headers
    );
  }


  addReferrals = (data) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest<any, any>(
      addReffralURL,
      data,
      headers
    );
  }

}
