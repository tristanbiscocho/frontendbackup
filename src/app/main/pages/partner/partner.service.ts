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
import { rocketchat_URL } from 'app/main/services/config';
const getPartnerURL = SERVER_URL + '/Partner/GetPartnerList';
const addPartnerURL = SERVER_URL + '/Partner/CreatePartner';
const editPartnerURL = SERVER_URL + '/Partner/UpdatePartner';
const getPartnerByIdURL = SERVER_URL + '/Partner/GetPartnerDetails/';
const addInvoiceURL = SERVER_URL + '/Partner/AddPartnerCommission';
const editInvoiceURL = SERVER_URL + '/Partner/UpdatePartnerCommission';
const getReffralCountURL = SERVER_URL + '/Partner/GetNoOfreferral';
const addCustomerURL = SERVER_URL + '/Partner/AddNewCustomer';
const getCustomerURL = SERVER_URL + '/Partner/GetCustomerList';
const deleteCustomerURL = SERVER_URL + '/Partner/DeleteCustomer?Id=';
const getNotInterestedCustomerURL = SERVER_URL + '/Partner/GetNotInterestedCustomerList';
const editCustomerURL = SERVER_URL + '/Partner/EditCustomer';
const partnersignupURL = SERVER_URL + '/Partner/PartnerSignup';
const postAPICallURL =  SERVER_URL + '/CustomerInfo/CreateRocketChatAccount?URL=';
const callAPIGETURL = SERVER_URL + "/CustomerInfo/CallAPI?URL=";
const updateUserRocketChatDataURL = SERVER_URL + "/Partner/UpdatePartnerRocketChat";
// const roketchatURL = "http://chat.techextensor.com:4000/api/v1/      'https://api.lowesttariff.com:4430/api'"
const roketchatURL = rocketchat_URL;
@Injectable()
export class PartnerService {
  constructor(private _coreHttpService: CoreHttpService) {}

  // Get partner list - API call
  getPartner(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpGetRequest<any>(
      getPartnerURL,
      headers
    );
  }

 //get All Customer list - API call
 getCustomer(data,partnerid): Observable<any> {
  const headers = new HttpHeaders();
  const reqHeaders = new HttpHeaders({ "No-Auth": "true" });

  const url = getCustomerURL + "?status="  + data.status + "&partnerid=" + partnerid;
  return this._coreHttpService.httpGetRequest<any>(
      url,
      reqHeaders
  );
}

//get Not Interested Customers
getNotInterestedCustomer(data,partnerid):Observable<any>{
const headers = new HttpHeaders();
const reqHeaders = new HttpHeaders({ "No-Auth": "true" });

const url = getNotInterestedCustomerURL + "?status="  + data.status + "&partnerid=" + partnerid;
return this._coreHttpService.httpGetRequest<any>(
    url,
    reqHeaders
);
}


deleteCustomer(id): any {
  const headers = new HttpHeaders();
  const url = deleteCustomerURL + id;
  headers.append('Content-Type', 'application/json');
  return this._coreHttpService.httpGetRequest<any>(
      url,
      headers
  );
}


   // add partner - API call
   addPartner(postdata: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest<any, any>(
      addPartnerURL,
      postdata,
      headers
    );
  }

  signupPartner(postdata:any) :Observable<any>{
    const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
    return this._coreHttpService.httpPostRequest<any,any>(
      partnersignupURL,
      postdata,reqHeaders
    )
  }


  addCustomer(data:any): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest<any, any>(
      addCustomerURL,
      data,
      headers
    );
  }

  editCustomer(data):Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest<any, any>(
        editCustomerURL,
        data,
        headers
    );
  }


  // edit partner - API call
  updatePartner(postdata: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest<any, any>(
      editPartnerURL,
      postdata,
      headers
    );
    }

    getPartnerById(id): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const url = getPartnerByIdURL + id;
        return this._coreHttpService.httpGetRequest<any>(
            url,
            headers
        );
      }

    addInvoice(postdata): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            addInvoiceURL,
            postdata,
            headers
        );
    }

    updateInvoice(postdata): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            editInvoiceURL,
            postdata,
            headers
        );
    }


    getReffralCount(postdata): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this._coreHttpService.httpPostRequest<any, any>(
            getReffralCountURL,
            postdata,
            headers
        );
    }

    LogintoRocketChat = (data) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      let url = roketchatURL + 'login' ;
      let URL = postAPICallURL + url;
      return this._coreHttpService.httpPostRequest<any, any>(URL, data, headers);
  }


  createRocketChatUser = (data, header) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = roketchatURL + 'users.create' + '&Token=' + header.Token + '&userId=' + header.Id;
    const URL = postAPICallURL + url;
    return this._coreHttpService.httpPostRequest<any, any>(URL, data, headers);
  }

  UpdatePartnerRocketChat = (data, id) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = updateUserRocketChatDataURL + '?partnerid=' + data + "&Rocketchatuserid=" + id;
    return this._coreHttpService.httpGetRequest<any>(
        url,
        headers
    );
  }
}
