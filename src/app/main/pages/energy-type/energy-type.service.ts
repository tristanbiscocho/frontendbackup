import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { CoreHttpService } from "app/main/services/core-http.service";
const getUrl = "http://77.68.127.49:8081/api/LowestTariff/GetEnergyType";
const createUrl = "http://77.68.127.49:8081/api/LowestTariff/CreateEnergyType";
const deleteUrl =
    "http://77.68.127.49:8081/api/LowestTariff/DeleteEnergyType?id=";
const editUrl = "http://77.68.127.49:8081/api/LowestTariff/UpdateEnergyType";

@Injectable()
export class EnergyTypeService {
    
    constructor(private _coreHttpService: CoreHttpService) {}

    getEnergyType(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getUrl;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    addEnergyType(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            createUrl,
            postdata,
            headers
        );
    }

    editEnergyType(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            editUrl,
            postdata,
            headers
        );
    }

    deleteEnergyType(id): any {
        const headers = new HttpHeaders();
        const url = deleteUrl + id;
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpDeleteRequest<any, any>(url, headers);
    }
}
