import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { CoreHttpService } from "app/main/services/core-http.service";
import { SERVER_URL } from "app/main/services/config";
import { AppUrlsService } from "app/main/services/app-urls.service";
import { AppHttpClient } from "app/main/services/http-client.service";
@Injectable()
export class SystemUserServices {
    constructor(private _coreHttpService: CoreHttpService,    private http: AppHttpClient,
        private appUrlsService: AppUrlsService) {}
        private domain = `${this.appUrlsService.DOMAIN}`;
        private urls = {
            commissionTypeUrl: `${this.domain}api/Commission/GetAllCommissionType`,
            invoiceGenerationUrl: `${this.domain}api/Client/GetAllInvoiceGenerationType`,
            invoicePayableUrl: `${this.domain}api/Client/GetAllInvoicePayableType`,
            createClientUrl: `${this.domain}api/Client/CreateClient`,
            allClientUrl: `${this.domain}api/Client/GetAllClient`,
            deleteClientUrl: `${this.domain}api/Client/DeleteClient`,
            clientDetailsUrl: `${this.domain}api/Client/GetClientDetails`,
            clientDetailsUpdateUrl: `${this.domain}api/Client/UpdateClient`,
            supplierUrl: `${this.domain}api/SupplierInfo/GetAllSupplier`,
          };
    getAllCommission() {
        return this.http.get(`${this.urls.commissionTypeUrl}`);
      }
      getAllClient() {
        return this.http.get(`${this.urls.allClientUrl}`);
      }
      getAllSupplier() {
        return this.http.get(`${this.urls.supplierUrl}`);
      }
      getClientDetails(Id) {
        return this.http.get(`${this.urls.clientDetailsUrl}/${Id}`);
      }
      deleteClient(Id) {
        return this.http.delete(`${this.urls.deleteClientUrl}/${Id}`);
      }
      getAllInvoiceGenerationType() {
        return this.http.get(`${this.urls.invoiceGenerationUrl}`);
      }
      getAllInvoicePayable() {
        return this.http.get(`${this.urls.invoicePayableUrl}`);
      }
      creatClient(data:any) {
        return this.http.post(`${this.urls.createClientUrl}`,data);
      }
      UpdateClient(data:any,Id) {
        return this.http.post(`${this.urls.clientDetailsUpdateUrl}/${Id}`,data);
      }
    getAllAgents(): Observable<any> {
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = SERVER_URL + "/SystemUserl/GetAllUser";
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }

    addAgent(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = SERVER_URL + "/SystemUserl/CreatSystemUser";
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
      const url = SERVER_URL + "/SystemUserl/DeleteSystemUser/" + id;
      return this._coreHttpService.httpDeleteRequest<any,any>(url, reqHeaders);
  }
}
