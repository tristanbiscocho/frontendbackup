import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { CoreHttpService } from "app/main/services/core-http.service";
import { SERVER_URL } from "app/main/services/config";

@Injectable()
export class ArticleService {
    constructor(private _coreHttpService: CoreHttpService) {}

    getAllArticles(filterType): Observable<any> {
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = SERVER_URL + "/Article/GetAllArticles?filter=" + filterType;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }

    searchArticleByColumn(columnName, filterType): Observable<any> {
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url =
            SERVER_URL +
            "/Article/SearchArticleList?columnName=" +
            columnName +
            "&searchFilter=" +
            filterType;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }

    articleById(id): Observable<any> {
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = SERVER_URL + "/Article/GetArticleById?id=" + id;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }

    createArticle(data): Observable<any> {
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = SERVER_URL + "/api/Article/CreateArticle";
        return this._coreHttpService.httpPostRequest<any, any>(url, data);
    }

    deleteArticle(data): Observable<any> {
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = SERVER_URL + "/api/Article/CreateArticle";
        return this._coreHttpService.httpPostRequest<any, any>(url, data);
    }

    updateArticle(data): Observable<any> {
        const headers = new HttpHeaders();
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = SERVER_URL + "/api/Article/CreateArticle";
        return this._coreHttpService.httpPostRequest<any, any>(url, data);
    }
}
