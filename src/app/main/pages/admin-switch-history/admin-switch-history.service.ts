import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Resolve } from '@angular/router';
import { CoreHttpService } from 'app/main/services/core-http.service';
import { SERVER_URL } from 'app/main/services/config';
const switchHistoryURL = SERVER_URL + '/CustomerInfo/GetSwitchHistoryDetailByCustomer';
const switchDetailURL = SERVER_URL + '/CustomerInfo/GetCustomerSwitchHistoryDetail?customerId=';
const addSwitchDetailURL = SERVER_URL + '/CustomerInfo/SaveSwitchDetail';
const getSupplierDetailURL = SERVER_URL + '/CustomerInfo/GetSwitchPlandetailOfCustomer';
const getPlanDataByIdURL = SERVER_URL + '/Plan/GetCustomerPlanDetails?planid='
@Injectable()
export class AdminSwitchHistoryService {
  constructor(private _coreHttpService: CoreHttpService) { }

  getSwitchHistory(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest(
        switchHistoryURL,
        data,
        headers
    );
  }

  getSwitchDetail(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = switchDetailURL + id;
    return this._coreHttpService.httpGetRequest(
        url,
        headers
    );
  }

  addSwitchDetail(data): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest(
        addSwitchDetailURL,
        data,
        headers
    );
  }

  getCustomerSwitchDetail = (data) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = getSupplierDetailURL + '?customerId=' + data.id + '&userId=' + data.userId;
    return this._coreHttpService.httpGetRequest(
        url,
        headers
    );
  }

  getPlanDataById = (data) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = getPlanDataByIdURL +  data;
    return this._coreHttpService.httpGetRequest(
        url,
        headers
    );
  }
}
