import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    HttpHeaders
} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CoreHttpService } from 'app/main/services/core-http.service';
import { SERVER_URL } from 'app/main/services/config';
const getSupervisorDashboardCountURL = SERVER_URL + '/Supervisor/GetSupervisorDashboardCount';
const getSupervisorLisrURL = SERVER_URL + '/Supervisor/GetSupervisorList';
const getSupervisorDetailURL = SERVER_URL + '/Supervisor/GetSupervisorById';
const addSupervisorURL = SERVER_URL + '/Supervisor/CreateSupervisor';
const getPartnersURL = SERVER_URL + '/Supervisor/GetSupervisorPartnerInfo';
const getPartnerbyIdURL = SERVER_URL + '/Supervisor/GetPartnersBySupervisor';
const editSupervisorURL = SERVER_URL + '/Supervisor/EditSupervisor';
const deletePartnerURL = SERVER_URL + '/Supervisor/GetRemovedPartner';
const invoiceSupervisorURL = SERVER_URL + '/Supervisor/InvoicesDetailsBySupervisor';
const getReffralCountURL = SERVER_URL + '/Supervisor/ReferralCountSupervisor';
const createInvoiceURL = SERVER_URL + '/Supervisor/GenerateSupervisorInvoice';
const editInvoiceURL = SERVER_URL + '/Supervisor/EditGeneratedSupervisorInvoice';
const getInvoiceByIdURL = SERVER_URL +'/Supervisor/GetSupervisorInvoiceById';
const getCustomerListURL = SERVER_URL + '/Supervisor/PartnerReferralCustomers';

@Injectable()
export class SupervisorService {
    constructor(private _coreHttpService: CoreHttpService) { }

    // Get supervisor dashboard count - API call
    getSupervisorDashboardCount(id): Observable<any> {
        const headers = new HttpHeaders();
        const url = getSupervisorDashboardCountURL + "?supervisorId=" + id;
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }

    getSupervisorList(): Observable<any> {
        const headers = new HttpHeaders();
        return this._coreHttpService.httpGetRequest<any>(
            getSupervisorLisrURL,
            headers
        );
    }

    getSupervisorDetail(id): Observable<any> {
        const headers = new HttpHeaders();
        const url = getSupervisorDetailURL + "?SupervisorId=" + id;
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }

    addSupervisor(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            addSupervisorURL,
            data,
            headers
        );
    }

    editSupervisor(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            editSupervisorURL,
            data,
            headers
        );
    }

    getAllPartners(): Observable<any> {
        const headers = new HttpHeaders();
        return this._coreHttpService.httpGetRequest<any>(
            getPartnersURL,
            headers
        );
    }


    getpartnerById(id): Observable<any> {
        const headers = new HttpHeaders();
        const url = getPartnerbyIdURL + '?supervisorId=' + id + '&partId=0';
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }

    deletePartnerBtId(sId, pId): Observable<any> {
        const headers = new HttpHeaders();
        const url = deletePartnerURL + '?supervisorId=' + sId + '&partId=' + pId;
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }

    getInvoiceLists(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            invoiceSupervisorURL,
            data,
            headers
        );
    }

    getInvoiceDetailbyInvoiceId(id): Observable<any> {
        const headers = new HttpHeaders();
        const url = getInvoiceByIdURL + '?id=' + id;
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
    }

    getReffralCount(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            getReffralCountURL,
            data,
            headers
        );
    }

    addInvoice(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            createInvoiceURL,
            data,
            headers
        );
    }

    updateInvoice(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            editInvoiceURL,
            data,
            headers
        );
    }


    getCustomersList(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            getCustomerListURL,
            data,
            headers
        );
    }

}
