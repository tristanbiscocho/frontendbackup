import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { CoreHttpService } from "app/main/services/core-http.service";
import { SERVER_URL } from "app/main/services/config";

@Injectable()
export class TicketingService {
    constructor(private _coreHttpService: CoreHttpService) {}

    getTicketsByCustomerId(id): Observable<any> {
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = SERVER_URL + "/TicketDesk/GetAllCustomerTickets/" + id;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }

    addCustomerTicket(postdata: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = SERVER_URL + "/TicketDesk/CreteTicket";
        return this._coreHttpService.httpPostRequest<any, any>(
            url,
            postdata,
            headers
        );
    }

    editCustomerTicket(editData: any, id): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = SERVER_URL + "/TicketDesk/UpdateTicket/" + id;
        return this._coreHttpService.httpPostRequest<any, any>(
            url,
            editData,
            headers
        );
    }

    deleteTicket(id): Observable<any> {
        const headers = new HttpHeaders();
        const url = SERVER_URL + "/TicketDesk/DeleteTicket/" + id;
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpDeleteRequest<any, any>(url, headers);
    }

    assignAgent(params): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = SERVER_URL + "/TicketDesk/TicketAssignToAgent?" + params;
        return this._coreHttpService.httpPostRequest<any, any>(url, headers);
    }
}
