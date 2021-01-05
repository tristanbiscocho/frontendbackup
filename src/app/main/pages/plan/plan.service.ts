import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { CoreHttpService } from "app/main/services/core-http.service";
const getUrl = "http://77.68.127.49:8081/api/LowestTariff/GetPlan";
const createUrl = "http://77.68.127.49:8081/api/LowestTariff/CreatePlan";
const deleteUrl = "http://77.68.127.49:8081/api/LowestTariff/DeletePlan?id=";
const editUrl = "http://77.68.127.49:8081/api/LowestTariff/UpdatePlan";
("http://77.68.127.49:8081/api/LowestTariff/GetEnergySupplier");
@Injectable()
export class PlanService {
    constructor(private _coreHttpService: CoreHttpService) {}

    getPlan(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getUrl;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    addPlan(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            createUrl,
            postdata,
            headers
        );
    }

    editPlan(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            editUrl,
            postdata,
            headers
        );
    }

    deletePlan(id): any {
        const headers = new HttpHeaders();
        const url = deleteUrl + id;
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpDeleteRequest<any, any>(url, headers);
    }
}
