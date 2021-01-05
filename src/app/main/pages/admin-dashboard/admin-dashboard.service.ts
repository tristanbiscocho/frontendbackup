import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Resolve } from '@angular/router';
import { CoreHttpService } from 'app/main/services/core-http.service';
import { SERVER_URL } from 'app/main/services/config';
const countURL = SERVER_URL + '/Admin/GetAdmindashboardCount';

@Injectable()
export class AdminDashboardService {
  constructor(private _coreHttpService: CoreHttpService) { }

  getCount(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpGetRequest<any>(
        countURL,
      headers
    );
  }
}
