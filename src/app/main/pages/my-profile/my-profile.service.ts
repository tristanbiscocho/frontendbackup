import { Injectable } from '@angular/core';
import {
  HttpHeaders
} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CoreHttpService } from 'app/main/services/core-http.service';
import { SERVER_URL, rocketchat_URL } from 'app/main/services/config';
const getCustomerDetailURL = SERVER_URL + '/CustomerInfo/GetCustomerById?customerId=';
const editUserURL = SERVER_URL + '/CustomerInfo/UpdateCustomer';
const getPartnerDetailURL = SERVER_URL + '/Partner/GetPartnerDetails/';
const updatePasswordURL = SERVER_URL + '/UserInfo/ChangePassword';
const getHistoryURL = SERVER_URL + '/CustomerInfo/GetCustomerhistory?customerId=';
const roketchatURL = rocketchat_URL;
const postAPICallURL =  SERVER_URL + '/CustomerInfo/CreateRocketChatAccount?URL=';
@Injectable()
export class MyProfileService {
  constructor(private _coreHttpService: CoreHttpService) { }


  getUserDetail = (id) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = getCustomerDetailURL + id;
    return this._coreHttpService.httpGetRequest<any>(
        url,
        headers
    );
  }


  addCustomer = (customer) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest<any, any>(
      editUserURL,
      customer,
      headers
    );
  }


  getPartnerDetail = (id) => {
    const headers = new HttpHeaders({ "No-Auth": "true" });
    const url = getPartnerDetailURL + id;
    return this._coreHttpService.httpGetRequest<any>(
        url,
        headers
    );
  }

  updatePassword = (password) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpPostRequest<any, any>(
        updatePasswordURL,
        password,
        headers
    );
  }

  getUserHistoryDetail = (id) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = getHistoryURL + id;
    return this._coreHttpService.httpGetRequest<any>(
        url,
        headers
    );
  }

  updateRocketChatPass = (data, header) => {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = roketchatURL + 'users.update' + '&Token=' + header.Token + '&userId=' + header.Id;
    const URL = postAPICallURL + url;
    return this._coreHttpService.httpPostRequest<any, any>(URL, data, headers);
  }
}
