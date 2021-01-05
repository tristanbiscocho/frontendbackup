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
const getSettingsCountURL = SERVER_URL + '/PackageInfo/GetSettingsCount';
const getSettingsPackageURL = SERVER_URL + '/PackageInfo/GetPackageList';
const addPackageURL = SERVER_URL + '/PackageInfo/CreatePackage';
const editPackageURL = SERVER_URL + '/PackageInfo/UpdatePackage';
const deletePackageURL = SERVER_URL + '/PackageInfo/DeletePackage?ID=';
const getSettingsListURL = SERVER_URL + '/PackageInfo/GetSettingsList';
const AddSys_ListValueURL = SERVER_URL + '/SysListValue/AddSys_ListValue';
const editSettingsURL = SERVER_URL + '/PackageInfo/UpdateSettingsKeyValue';
const UpdateListValueURL = SERVER_URL + '/SysListValue/UpdateListValue';
const getSurchargeListURL = SERVER_URL + '/Admin/GetSurchargeList';
const getSurchargePriceHistoryURL =  SERVER_URL + '/Admin/GetSurchargeHistoryList';
const updateSurchargeURL = SERVER_URL + '/Admin/UpdateSurcharges';

const getFixedChargeURL = SERVER_URL + '/Admin/GetFixedChargesList';
const getFixedPriceHistoryURL =  SERVER_URL + '/Admin/GetFixedChargeHistoryList';
const updateFixedChargeURL = SERVER_URL + '/Admin/UpdateFixedPrice';

const getUnitPriceURL = SERVER_URL + '/Admin/GetUnitPriceList';
const getUnitPriceHistoryURL =  SERVER_URL + '/Admin/GetUnitPriceHistoryList';
const updateUnitPriceURL = SERVER_URL + '/Admin/UpdateUnitPrice';
const uploadImageURL = SERVER_URL + '/Customerinfo/Uploadimage';
const getSettingsPackageURLNew = "http://77.68.127.49:8081/api/LowestTariff/GetPackages";
const addPackageURLNew = "http://77.68.127.49:8081/api/LowestTariff/CreatePackages";
const deletePackageURLNew ="http://77.68.127.49:8081/api/LowestTariff/DeletePackages?id=";
@Injectable()
export class SettingsService {
    constructor(private _coreHttpService: CoreHttpService) { }

    // Get partner list - API call
    getSettingsCount(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            getSettingsCountURL,
            headers
        );
    }

    getSettingsList(): Observable<any>{
        const reqHeaders = new HttpHeaders({"No-Auth": "true"  });

        return this._coreHttpService.httpGetRequest<any>(
            getSettingsListURL,
            reqHeaders
        );
    }

    getPackageList(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            getSettingsPackageURLNew,
            headers
        );
    }
    addPackageCustomer(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            addPackageURL,
            data,
            headers
        );
    }
    addPackage(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            addPackageURLNew,
            data,
            headers
        );
    }


    editPackage(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            editPackageURL,
            data,
            headers
        );
    }

    deletePackage(id): any {
        const headers = new HttpHeaders();
        const url = deletePackageURLNew + id;
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }

    AddSys_ListValue(data): any {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Value', data.en);
        urlSearchParams.append('ListID', data.type);
        urlSearchParams.append('ParentId', data.parent);
        urlSearchParams.append('Seq', data.sequence);
        urlSearchParams.append('IsActive', data.IsActive);

        const body = {
          Value : data.en,
          ListID : data.type,
          ParentId : data.parent,
          Seq : data.sequence,
          IsActive: data.IsActive
        };
        // var headers = new Headers();
         const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
          AddSys_ListValueURL,
          body,
          headers
        );
    }


    EditSys_ListValue(configdata): any {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Id', configdata.id),
        urlSearchParams.append('Value', configdata.en);
        urlSearchParams.append('ParentId', configdata.parent);
        urlSearchParams.append('ListID', configdata.type);
        urlSearchParams.append('Seq', configdata.sequence);
        urlSearchParams.append('IsActive', configdata.IsActive);
  
      //   let body = urlSearchParams.toString();
        const body = {
          Id : configdata.id,
          Value : configdata.en,
          ParentId : configdata.parent,
          ListID : configdata.type,
          Seq : configdata.sequence,
          IsActive: configdata.IsActive
        };
  
                const headers = new HttpHeaders();
                const url = UpdateListValueURL + '/' + configdata.id;
                headers.append('Content-Type', 'application/json');
                return this._coreHttpService.httpPostRequest<any, any>(
                  url,
                  body,
                  headers
                );
    }

    editSettings(details): Observable<any>{
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const url = editSettingsURL + '?Key=' + details.Setting_Key + '&Value=' + details.Setting_Value;
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }

    GetSurchargeList(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            getSurchargeListURL,
            headers
        );
    }


    UpdateSurcharge(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            updateSurchargeURL,
            data,
            headers
        );
    }

    GetFixedPriceList(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            getFixedChargeURL,
            headers
        );
    }


    UpdateFixed(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            updateFixedChargeURL,
            data,
            headers
        );
    }

    GetUnitPriceList(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            getUnitPriceURL,
            headers
        );
    }


    UpdateUnit(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            updateUnitPriceURL,
            data,
            headers
        );
    }

    getUnitHistory(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            getUnitPriceHistoryURL,
            headers
        );
    }

    getFixedHistory(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            getFixedPriceHistoryURL,
            headers
        );
    }


    getSurchargeHistory(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(
            getSurchargePriceHistoryURL,
            headers
        );
    }

    uploadImage(data): Observable<any> {
        const reqHeaders = new HttpHeaders({"No-Auth": "true"  });
        return this._coreHttpService.httpPostRequest<any, any>(
            uploadImageURL,
            data,
            reqHeaders
        );
    }
}

