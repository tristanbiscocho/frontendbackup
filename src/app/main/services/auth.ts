import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SERVER_URL } from "./config";
import { CoreHttpService } from "./core-http.service";

const getContractorCountURL =
    SERVER_URL + "/Partner/GetPartnerdashboardCount?userId=";
const createDiallerURL = "http://77.68.89.120/goAPIv2/goUsers/goAPI.php";
@Injectable()
export class AuthService {
    public currentuser: any;
    getAllResources: any;
    public userPrefferName = new BehaviorSubject<string>("");
    public currentUserName = new BehaviorSubject<string>("");
    cast = this.currentUserName.asObservable();

    constructor(
        private http: HttpClient,
        public translate: TranslateService,
        public _coreHttpService: CoreHttpService
    ) {}

    SetCurrentUser(response): any {
        localStorage.setItem("UserDetail", JSON.stringify(response));
        this.currentuser = response;
        this.userPrefferName.next(this.currentuser.FirstName);
    }
    userValueforNavigation(): any {
        this.currentuser = JSON.parse(localStorage.getItem("UserDetail"));
        if (
            this.currentuser != undefined &&
            this.currentuser != null &&
            this.currentuser != ""
        ) {
            // this.currentuser = JSON.parse(localStorage.getItem('userinfo'));
            const user =
                this.currentuser.FirstName + " " + this.currentuser.LastName;
            this.userPrefferName.next(user);
        }
    }
    userDatachange(): any {
        this.currentuser = JSON.parse(localStorage.getItem("UserDetail"));
        if (!!this.currentuser.LastName) {
            const user =
                this.currentuser.FirstName + " " + this.currentuser.LastName;
            this.userPrefferName.next(user);
        } else {
            this.userPrefferName.next(this.currentuser.FirstName);
        }
    }
    editNavigationName(prefferName): any {
        this.userPrefferName.next(prefferName);
    }
    getPrefferedName(): any {
        return this.userPrefferName.asObservable();
    }

    getAllResourceData(): any {
        const getAllResources = localStorage.getItem("gelAllResourceData");
        if (!!getAllResources) {
            this.getAllResources = JSON.parse(
                localStorage.getItem("gelAllResourceData")
            );
            return this.getAllResources;
        } else {
            return null;
        }
    }

    getDashboardCount = (id) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getContractorCountURL + id;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    };

    createGodiallerUser = (data) => {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        let url =
            SERVER_URL +
            "/CustomerInfo/CallpostAPI?URL=https://phone17.lowesttariff.com/goAPIv2/goUsers/goAPI.php";
        return this._coreHttpService.httpPostRequest<any, any>(
            url,
            data,
            reqHeaders
        );
    };
}
