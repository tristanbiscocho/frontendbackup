import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Resolve } from '@angular/router';
import { SERVER_URL } from '../../../services/config';

import { CoreHttpService } from 'app/main/services/core-http.service';
const forgotpassURL = SERVER_URL + '/UserInfo/ForgotePassword';

@Injectable()
export class PartnerRegisterService {
  constructor(private _coreHttpService: CoreHttpService) { }


  /**
   *
   *
   * @param {ForgotPasswordClass} forgotPasswordDetails
   * @returns {Observable<any>}
   * @memberof ForgotPasswordService
   */

}