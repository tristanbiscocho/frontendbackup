import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { CoreHttpService } from "app/main/services/core-http.service";
import { SERVER_URL } from "app/main/services/config";

@Injectable()
export class AgentService {
    constructor(private _coreHttpService: CoreHttpService) {}

    getAllAgents(): Observable<any> {
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = SERVER_URL + "/Agent/GetAllAgent";
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }

    addAgent(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = SERVER_URL + "/Agent/CreateAgent";
        return this._coreHttpService.httpPostRequest<any, any>(
            url,
            postdata,
            headers
        );
    }

    editAgent(editData: any, id): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = SERVER_URL + "/Agent/UpdateAgent/" + id;
        return this._coreHttpService.httpPostRequest<any, any>(
            url,
            editData,
            headers
        );
    }

    deleteAgent(id): Observable<any> {
      const headers = new HttpHeaders();
      const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
      const url = SERVER_URL + "/Agent/DeletAgent/" + id;
      return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
  }
}
