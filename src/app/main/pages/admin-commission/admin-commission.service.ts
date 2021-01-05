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
const InvoiceURL = SERVER_URL + '/Partner/GetPartnerInvoiceDetailByPartner';
const getCommissionURL = SERVER_URL + '/Admin/AdminTransactionDetail';

@Injectable()
export class AdminComissionService {
  constructor(private _coreHttpService: CoreHttpService) { }

  getInvoice(data): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest(
        InvoiceURL,
        data,
        headers
    );
  }

    getCommission = (data) => {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest(
            getCommissionURL,
            data,
            headers
        );
    } 
}
