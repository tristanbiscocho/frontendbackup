import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
    HttpHeaders,
} from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { CoreHttpService } from "app/main/services/core-http.service";
const getUrl = "http://77.68.127.49:8081/api/LowestTariff/GetPaymentMethod";
const createUrl =
    "http://77.68.127.49:8081/api/LowestTariff/CreatePaymentMethod";
const deleteUrl =
    "http://77.68.127.49:8081/api/LowestTariff/DeletePaymentMethod?id=";
const editUrl = "http://77.68.127.49:8081/api/LowestTariff/UpdatePaymentMethod";

@Injectable()
export class PaymentMethodService {
    constructor(private _coreHttpService: CoreHttpService) {}

    getPaymentMethod(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getUrl;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    addPaymentMethod(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            createUrl,
            postdata,
            headers
        );
    }

    editPaymentMethod(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            editUrl,
            postdata,
            headers
        );
    }

    deletePaymentMethod(id): any {
        const headers = new HttpHeaders();
        const url = deleteUrl + id;
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpDeleteRequest<any, any>(url, headers);
    }
}
