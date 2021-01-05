import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
    HttpHeaders,
} from "@angular/common/http";
import { SERVER_URL } from "../../../services/config";
import { ForgotPasswordClass } from "./forgot-password-classes";
import { CoreHttpService } from "app/main/services/core-http.service";
const forgotpassURL = SERVER_URL + "/UserInfo/ForgotePassword";

@Injectable()
export class ForgotPasswordService {
    constructor(private _coreHttpService: CoreHttpService) {}

    /**
     *
     *
     * @param {ForgotPasswordClass} forgotPasswordDetails
     * @returns {Observable<any>}
     * @memberof ForgotPasswordService
     */
    forgotPassword(
        forgotPasswordDetails: ForgotPasswordClass
    ): Observable<any> {
        const url = forgotpassURL + "?email=" + forgotPasswordDetails.email;
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }
}
