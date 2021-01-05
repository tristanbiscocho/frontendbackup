import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";


@Injectable()
export class AuthIntersaptors implements HttpInterceptor {
    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            
        if (req.headers.get('No-Auth') == "true") {
            return next.handle(req.clone());
        }
        if (localStorage.getItem("Token") !== null && localStorage.getItem("Token") !== undefined) {
            // code for request with authorization token
            const colneReq = req.clone({
                headers: req.headers.set("Token", localStorage.getItem("Token"))
            });
            return next.handle(colneReq)
                .do(
                    success => {
                    },
                    err => {
                        if (err.status === 401) {
                            this.router.navigateByUrl("/login");
                        }
                    }
                )
        }
        else {
            this.router.navigateByUrl("/login");
        }
    }

}