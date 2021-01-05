import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {
    HttpErrorResponse,
    HttpClient,
    HttpHeaders
} from '@angular/common/http';
import * as LoginClasses from './supplier-classes';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Resolve } from '@angular/router';
import { CoreHttpService } from 'app/main/services/core-http.service';
import { SERVER_URL } from 'app/main/services/config';
const getSupplierURL = SERVER_URL + '/SupplierInfo/GetSupplierList';
const getSupplierDetailsURL = SERVER_URL + '/SupplierInfo/GetSupplier?ID=';
const getsupplierBillsURL = SERVER_URL + '/Plan/GetPlanList?supplierId=';
const getActivePlanlistURL = SERVER_URL + '/Plan/GetActivePlanList?supplierId=';
const addSupplierURL = SERVER_URL + '/SupplierInfo/CreateSupplier';
const editSupplierURL = SERVER_URL + '/SupplierInfo/UpdateSupplier';
const addPlanURL = SERVER_URL + '/Plan/CreatePLan';
const UpdatePlanURL = SERVER_URL + '/Plan/UpdatePlan';
const getSupplierPlansURL = SERVER_URL + '/Plan/GetPlanListBySupplierIds';
const deleteSupplierURL = SERVER_URL + '/SupplierInfo/DeleteSupplier?ID=';
const deletePlanURL = SERVER_URL + '/Plan/DeletePlan?Id=';
const getSupplierURLNew = 'http://77.68.127.49:8081/api/LowestTariff/GetSupplier';
const addSupplierURLNew ="http://77.68.127.49:8081/api/LowestTariff/CreateSupplier";
const deleteSupplierURLNew = 'http://77.68.127.49:8081/api/LowestTariff/DeleteSupplier?id=';
const editSupplierURLNew ="http://77.68.127.49:8081/api/LowestTariff/UpdateSupplier";

@Injectable()
export class SupplierService {
    constructor(private _coreHttpService: CoreHttpService) { }

 // Get supplier list - API call
 getSupplierListNew(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = getSupplierURLNew;
    return this._coreHttpService.httpGetRequest<any>(
        url,
        headers
    );
}


    // Get supplier list - API call
    getSupplier(data): Observable<any> {
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });

        const url = getSupplierURL + "?searchText="  + data.searchText + "&energyTypeId=" +  data.energyTypeId;
        return this._coreHttpService.httpGetRequest<any>(
            url,
            reqHeaders
        );
    }

    // get supplier detail by supplier ID
    getSupplierDetails(supplierId): Observable<any> {
        const headers = new HttpHeaders();
        const url = getSupplierDetailsURL + supplierId;
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }

    // get bills list by supplier ID
    getActivePlanLists(supplierId): Observable<any> {  
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = getActivePlanlistURL+ supplierId;
        return this._coreHttpService.httpGetRequest<any>(
            url,
            reqHeaders
        );
    }

     // get bills list by supplier ID
     getSupplierLists(supplierId): Observable<any> {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = getsupplierBillsURL + supplierId;
        return this._coreHttpService.httpGetRequest<any>(
            url,
            reqHeaders
        );
    }
    // add suuplier - API call
    addSupplier(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            addSupplierURLNew,
            postdata,
            headers
        );
    }


    // edit supplier -API call
    editSupplier(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            editSupplierURLNew,
            postdata,
            headers
        );
    }

    addSupplierPlan(postData): Observable<any> {
        const reqHeaders = new HttpHeaders({"No-Auth": "true"  });
        // headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            addPlanURL,
            postData,
            reqHeaders
        );
    }

    editSupplierPlan(postData): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            UpdatePlanURL,
            postData,
            headers
        );
    }

    deleteSupplier(id): any {
        const headers = new HttpHeaders();
        const url = deleteSupplierURLNew + id;
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }

    deletePlan(id):any{
        const headers = new HttpHeaders();
        const url = deletePlanURL + id;
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }

   

    // get multiple supplier plan list 
    getSupplierplans(supplierId): Observable<any> {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = getSupplierPlansURL;
        const plan = {
            PlanIds: supplierId
        };
        return this._coreHttpService.httpPostRequest<any, any>(
            url,
            plan,
            reqHeaders
        );
    }
}
