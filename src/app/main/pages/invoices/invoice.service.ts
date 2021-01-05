import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    HttpErrorResponse,
    HttpClient,
    HttpHeaders
  } from '@angular/common/http';

import { SERVER_URL } from 'app/main/services/config';
import { CoreHttpService } from 'app/main/services/core-http.service';
const getInvoiceDetails = SERVER_URL + '/Partner/GetPartnerInvoiceDetailsByInvoiceId?invoiceId=';

@Injectable()
export class InvoiceService implements Resolve<any>
{
    invoice: any;
    invoiceOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _coreHttpService: CoreHttpService
    )
    {
        
        this.invoiceOnChanged = new BehaviorSubject({});
    }

   
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getInvoice()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

  
    getInvoice(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/invoice')
                .subscribe((timeline: any) => {
                    this.invoice = timeline;
                    this.invoiceOnChanged.next(this.invoice);
                    resolve(this.invoice);
                }, reject);
        });
    }

    getInvoiceData = (id) => {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const url = getInvoiceDetails + id;
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }
}
