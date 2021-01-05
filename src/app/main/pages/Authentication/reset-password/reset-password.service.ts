import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
    HttpHeaders,
} from "@angular/common/http";
import { SERVER_URL } from "../../../services/config";
import { CoreHttpService } from "app/main/services/core-http.service";
const forgotpassURL = SERVER_URL + "/UserInfo/ResetPassword";

@Injectable()
export class ResetPasswordService {
    constructor(private _coreHttpService: CoreHttpService) {}

    /**
     *
     *
     * @param {ForgotPasswordClass} forgotPasswordDetails
     * @returns {Observable<any>}
     * @memberof ForgotPasswordService
     */
    forgotPassword(forgotPasswordDetails, userId): Observable<any> {
        const url =
            forgotpassURL +
            "?userId=" +
            userId +
            "&password=" +
            forgotPasswordDetails.password;
        // const headers = new HttpHeaders();
        // headers.append('Content-Type', 'application/json');
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }
}
