import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
@Injectable()
export class AppHttpClient {
  helper: JwtHelperService;
  constructor(private _http: HttpClient, private router: Router) {
    this.helper = new JwtHelperService();
  }

  createHeaders() {
    if (this.helper.isTokenExpired(localStorage.getItem("token"))) {
      this.router.navigate(["/sso/login"]);
    } 
    let token = localStorage.getItem("token");

    if (token != null && token != undefined) {
      return new HttpHeaders().set("x-auth-token", `${token}`);
    }

    return new HttpHeaders();
  }

  get(url) {
    return this._http.get(url, {
      // headers: this.createHeaders(),
      observe: "response"
    });
  }
  getImage(imageUrl: string) {
    return this._http
        .get(imageUrl,{responseType: "blob", headers: this.createHeaders(),
        observe: "response"})
}
getFile(imageUrl: string) {
  return this._http
      .get(imageUrl,{responseType: "blob", headers: this.createHeaders(),
      observe: "response"})
}
  getwityout(url) {
    return this._http.get(url, {
      observe: "response"
    });
  }

  post(url, data) {
    return this._http.post(url, data, {
      // headers: this.createHeaders(),
      observe: "response"
    });
  }
  postwithout(url, data) {
    debugger;
    return this._http.post(url, data, {
      observe: "response"
    });
  }

  put(url, data) {
    return this._http.put(url, data, {
      headers: this.createHeaders(),
      observe: "response"
    });
  }
  delete(url) {
    return this._http.delete(url, {
      // headers: this.createHeaders(),
      observe: "response"
    });
  }
  deleteWithou(url) {
    return this._http.delete(url, {
      observe: "response"
    });
  }
}
