import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
    HttpHeaders,
} from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { CoreHttpService } from "app/main/services/core-http.service";
const getUrl = "http://77.68.127.49:8081/api/LowestTariff/GetTariffType";
const createUrl = "http://77.68.127.49:8081/api/LowestTariff/CreateTariffType";
const deleteUrl =
    "http://77.68.127.49:8081/api/LowestTariff/DeleteTariffType?id=";
const editUrl = "http://77.68.127.49:8081/api/LowestTariff/UpdateTariffType";

@Injectable()
export class TariffTypeService {
    constructor(private _coreHttpService: CoreHttpService) {}

    getTariffType(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getUrl;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    addTariffType(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            createUrl,
            postdata,
            headers
        );
    }

    editTariffType(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            editUrl,
            postdata,
            headers
        );
    }

    deleteTariffType(id): any {
        const headers = new HttpHeaders();
        const url = deleteUrl + id;
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpDeleteRequest<any, any>(url, headers);
    }
}
