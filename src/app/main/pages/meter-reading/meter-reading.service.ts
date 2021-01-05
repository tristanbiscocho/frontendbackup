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
const getREadingDetailURL = SERVER_URL + '/CustomerInfo/GetMeterReadingInfoById?customerId=';
const addMeterURL = SERVER_URL + '/CustomerInfo/AddMeterReadingInfo';
const meterReadingreasonURL = SERVER_URL + '/CustomerInfo/GetMeterReadingReasonList';

@Injectable()
export class MeterReadingService {
  constructor(private _coreHttpService: CoreHttpService) { }


  getReading = (id) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = getREadingDetailURL + id;
    return this._coreHttpService.httpGetRequest<any>(
        url,
        headers
    );
  }

  addMeterReading(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest<any, any>(
      addMeterURL,
      data,
      headers
    );
  }

    // Get Meter Reading Reason list - API call
    getMeterreadingreasons(data): Observable<any> {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this._coreHttpService.httpPostRequest<any,any>(
        meterReadingreasonURL,
        data,
        
      )
  }


}
