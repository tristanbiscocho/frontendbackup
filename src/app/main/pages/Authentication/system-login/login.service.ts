import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
    HttpHeaders,
} from "@angular/common/http";
import * as LoginClasses from "./login-classes";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Resolve } from "@angular/router";
import { SERVER_URL } from "../../../services/config";
import { CoreHttpService } from "app/main/services/core-http.service";
import { systemenumService } from "../../systemenumdata/systemenum.service";
import { FuseConfigService } from "@fuse/services/config.service";
const loginURL = SERVER_URL + "/UserInfo/ValidateUser";

@Injectable()
export class LoginService {
    constructor(
        private _coreHttpService: CoreHttpService,
        public _fuseConfigService: FuseConfigService
    ) {}
    /**
     *
     *
     * @param {LoginClasses.LoginDetails} loginDetails
     * @returns {Observable<LoginClasses.LoginResponse>}
     * @memberof LoginService
     */

    login(loginDetails: LoginClasses.LoginDetails): Observable<any> {
        // const headers = new HttpHeaders();
        var reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        var email = decodeURIComponent(loginDetails.email);
        const URL =
            loginURL +
            "?username=" +
            email +
            "&password=" +
            loginDetails.password;
        return this._coreHttpService.httpGetRequest<any>(URL, reqHeaders);
    }
}

@Injectable()
export class GetAllDetailsResolver implements Resolve<any> {
    constructor(
        public _sysService: systemenumService,
        private _fuseConfigService: FuseConfigService
    ) {}
    resolve(): any {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: false,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
        return this._sysService.getallSystemenumdata();
    }
}
