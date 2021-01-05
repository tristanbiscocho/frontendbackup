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
const getCustomerList = SERVER_URL + '/Admin/PoolByStatus';
const updateStatusURL = SERVER_URL + '/CustomerInfo/UpdatePoolStatus';

@Injectable()
export class VerificationService {
  constructor(private _coreHttpService: CoreHttpService) { }


  getCustomer = (customerFilter) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest(
      getCustomerList,
      customerFilter,
      headers
    );
  }

  verifyUser = (data) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = updateStatusURL + '?poolId=' + data.poolId + '&status=' + data.status;
    return this._coreHttpService.httpGetRequest(
      url,
      headers
    );
  }
  
}
