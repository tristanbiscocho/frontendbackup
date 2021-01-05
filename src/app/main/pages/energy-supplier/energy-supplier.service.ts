import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { CoreHttpService } from "app/main/services/core-http.service";
const getUrl = "http://77.68.127.49:8081/api/LowestTariff/GetEnergySupplier";
const createUrl =
    "http://77.68.127.49:8081/api/LowestTariff/CreateEnergySupplier";
const deleteUrl =
    "http://77.68.127.49:8081/api/LowestTariff/DeleteEnergySupplier?id=";
const editUrl =
    "http://77.68.127.49:8081/api/LowestTariff/UpdateEnergySupplier";

@Injectable()
export class EnergySupplierService {

    constructor(private _coreHttpService: CoreHttpService) {}

    getEnergySupplier(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getUrl;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    addEnergySupplier(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            createUrl,
            postdata,
            headers
        );
    }

    editEnergySupplier(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            editUrl,
            postdata,
            headers
        );
    }

    deleteEnergySupplier(id): any {
        const headers = new HttpHeaders();
        const url = deleteUrl + id;
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpDeleteRequest<any, any>(url, headers);
    }
}
