import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Resolve } from "@angular/router";
import { SERVER_URL } from "../../services/config";
const GetAllResourceValueURL =
    SERVER_URL + "/SysResources/GetAllResourceValues";
const GetSys_ListDataURL = SERVER_URL + "/SysListValue/GetAllSys_List";
import { CoreHttpService } from "app/main/services/core-http.service";
const GetSP_SysListValueURL =
    SERVER_URL + "/SysListValue/GetSP_AllSys_ListValues";
const UpdateListValueURL = SERVER_URL + "/SysListValue/UpdateListValue";
const AddSys_ListValueURL = SERVER_URL + "/SysListValue/AddSys_ListValue";
const DeletelistvalueURL = SERVER_URL + "/SysListValue/RemoveListValue";

@Injectable()
export class systemenumService {
    public AllResources: any[] = [];
    constructor(
        private _coreHttpService: CoreHttpService,
        public http: HttpClient
    ) {}

    GetAllResourceValue(): any {
        const headers = new HttpHeaders();
        const URL = GetAllResourceValueURL;
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpGetRequest<any>(URL, headers);
    }

    getallSystemenumdata(): any {
        var reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const URL = GetSP_SysListValueURL;
        // headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpGetRequest<any>(URL, reqHeaders);
    }
    GetSys_ListData(): any {
        const headers = new HttpHeaders();
        const URL = GetSys_ListDataURL;
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpGetRequest<any>(URL, headers);
    }
    EditSys_ListValue(configdata): any {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append("Id", configdata.id),
            urlSearchParams.append("Value", configdata.en);
        urlSearchParams.append("ParentId", configdata.parent);
        urlSearchParams.append("ListID", configdata.type);
        urlSearchParams.append("Seq", configdata.sequence);
        urlSearchParams.append("IsActive", configdata.IsActive);
        //   let body = urlSearchParams.toString();
        const body = {
            Id: configdata.id,
            Value: configdata.en,
            ParentId: configdata.parent,
            ListID: configdata.type,
            Seq: configdata.sequence,
            IsActive: configdata.IsActive,
        };

        const headers = new HttpHeaders();
        const url = UpdateListValueURL + "/" + configdata.id;
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            url,
            body,
            headers
        );
    }
    AddSys_ListValue(configdata): any {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append("Value", configdata.en);
        urlSearchParams.append("ListID", configdata.type);
        urlSearchParams.append("ParentId", configdata.parent);
        urlSearchParams.append("Seq", configdata.sequence);
        urlSearchParams.append("IsActive", configdata.IsActive);
        const body = {
            Value: configdata.en,
            ListID: configdata.type,
            ParentId: configdata.parent,
            Seq: configdata.sequence,
            IsActive: configdata.IsActive,
        };
        // var headers = new Headers();
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            AddSys_ListValueURL,
            body,
            headers
        );
    }

    Deletelistvalue(id): any {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            this.http.get(DeletelistvalueURL + "?id=" + id).subscribe(
                (res) => {
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }
}
