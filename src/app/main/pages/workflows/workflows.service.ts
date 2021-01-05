import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { CoreHttpService } from "app/main/services/core-http.service";
import { SERVER_URL } from "app/main/services/config";
const GetAllWorkFlowListDataURL = SERVER_URL + "/WorkFlow/GetAllWorkFlowList";
const GetAllAppObjectDataURL = SERVER_URL + "/WorkFlow/GetAllObject";
const GetAllTemplateDataURL = SERVER_URL + "/Template/SP_GetAllTemplates/";
const GetObjectDataURL = SERVER_URL + "/WorkFlow/GetAllObject";
const GetObjectFieldById =
    SERVER_URL + "/WorkFlow/GetAppObjectFeildsValueByObjectID/";
const CreateTemplteDataURL = SERVER_URL + "/Template/CreateTemplate";
const GetFieldByIdURL = SERVER_URL + "/patient/CreateDynamicField";
// const GetAllSystemEnumDataURL = SERVER_URL + '/Resource/GetAllResource';
const GetWorkFlowByIdDATAURL = SERVER_URL + "/WorkFlow/GeWorkFlowByID";
const GetSysObjectIDDATAURL = SERVER_URL + "/WorkFlow/GetSysObjId";
const GetWorkFlowActionListURL = SERVER_URL + "/Actions/GetWorkFlowActionsById";
const SP_GetAllTemplateDataURL = SERVER_URL + "/Template/SP_GetAllTemplates/";
const SaveWorkFlowDataURL = SERVER_URL + "/WorkFlow/UpdateWorkFlow";
const UpdateAppObjectFilterDataURL =
    SERVER_URL + "/WorkFlow/UpdateAppObjectFilder";
const AddWorkFlowDataURL = SERVER_URL + "/WorkFlow/CreateWorkFlow";
const AddAppObjectFilterDataURL =
    SERVER_URL + "/WorkFlow/CreateAppObjectFilter";
const AddWorkFlowCriteriaDataURL =
    SERVER_URL + "/WorkFlow/CreateWorkFlowCriteria";
const DeleteActionURL = SERVER_URL + "/Actions/RemoveAction";
const deletetemplateURL = SERVER_URL + "/Template/DeleteTemplate";
const getTemplateDATABYURL = SERVER_URL + "/Template/GetTemplate";
const EditTemplsteDataURL = SERVER_URL + "/Template/EditTemplate";
@Injectable()
export class WorkflowsService {
    constructor(
        private _coreHttpService: CoreHttpService,
        private http: HttpClient
    ) {}

    // Get workflow list - API call
    GetAllWorkFlowList(id): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = GetAllWorkFlowListDataURL + "?id=" + id;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    getAllModuleData(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpGetRequest<any>(
            GetAllAppObjectDataURL,
            headers
        );
    }

    getAllTemplatesData(id): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = GetAllTemplateDataURL + id;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    GetAllObjectData(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = GetObjectDataURL;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    getObjectFeild(id): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = GetObjectFieldById + id;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    GetFeildData(moduleId, userId): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = GetFieldByIdURL + "/" + moduleId;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    AddTemplate(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            CreateTemplteDataURL,
            data,
            headers
        );
    }

    EditTemplate(data): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest<any, any>(
            EditTemplsteDataURL,
            data,
            headers
        );
    }

    GetWorkFlowDataByID(id): Observable<any> {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = GetWorkFlowByIdDATAURL + "/" + id;
        return this._coreHttpService.httpGetRequest<any>(url, headers);
    }

    getsysobjectID(id): any {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders();
            headers.append("Content-Type", "application/json");
            this.http
                .get(GetSysObjectIDDATAURL + "?ID=" + id, { headers: headers })
                .subscribe(
                    (res) => {
                        resolve(res);
                    },
                    (err) => {
                        reject(err);
                    }
                );
        });
    }

    GetWorkFlowActionList(id): any {
        var headers = new HttpHeaders();
        headers.append(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        return this.http
            .get(GetWorkFlowActionListURL + "?id=" + id, { headers: headers })
            .map((res) => res)
            .toPromise();
    }

    SP_GetAllTemplate(id): any {
        var headers = new HttpHeaders();
        headers.append(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        return this.http
            .get(SP_GetAllTemplateDataURL + "/" + id, { headers: headers })
            .map((res) => res)
            .toPromise();
    }

    SaveWorkFlow(data): any {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("ID", data.ID);
        urlSearchParams.append("WorkFlowName", data.WorkFlowName);
        urlSearchParams.append("AppObjectID", data.Module);
        urlSearchParams.append("Description", data.Description);
        urlSearchParams.append("IsActive", data.Status);
        urlSearchParams.append("EvaluationCriteria", data.ExecutedOn);
        urlSearchParams.append("Timings", JSON.stringify(data.TimeData));
        urlSearchParams.append("Rules", JSON.stringify(data.Rules));
        let body = urlSearchParams.toString();
        var headers = new HttpHeaders();
        headers.append(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        return this.http.post(SaveWorkFlowDataURL, body, { headers: headers });
    }

    UpdateAppObjectFilter(data): any {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("ID", data.ID);
        urlSearchParams.append("Entity", data.Entity);
        urlSearchParams.append("AppObjectQuery", data.AppObjectQuery);
        let body = urlSearchParams.toString();
        var headers = new HttpHeaders();
        headers.append(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        return this.http.post(UpdateAppObjectFilterDataURL, body, {
            headers: headers,
        });
    }

    AddWorkFlow(data): any {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("WorkFlowName", data.WorkFlowName);
        urlSearchParams.append("AppObjectID", data.Module);
        urlSearchParams.append("Description", data.Description);
        urlSearchParams.append("IsActive", data.Status);
        urlSearchParams.append("EvaluationCriteria", data.ExecutedOn);
        urlSearchParams.append("OrgId", data.OrgId);
        urlSearchParams.append("Timings", JSON.stringify(data.TimeData));
        urlSearchParams.append("Rules", JSON.stringify(data.Rules));
        urlSearchParams.append("WorkFlowFor", data.WorkFlowFor);
        let body = urlSearchParams.toString();
        var headers = new HttpHeaders();
        headers.append(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        return this.http.post(AddWorkFlowDataURL, body, { headers: headers });
    }

    AddAppObjectFilter(data): any {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("Entity", data.Entity);
        urlSearchParams.append("AppObjectQuery", data.AppObjectQuery);
        let body = urlSearchParams.toString();
        var headers = new HttpHeaders();
        headers.append(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        return this.http.post(AddAppObjectFilterDataURL, body, {
            headers: headers,
        });
    }

    AddWorkFlowCriteria(data): any {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("WorkFlowID", data.WorkFlowID);
        urlSearchParams.append("AppObjectFilterID", data.AppObjectFilterID);
        let body = urlSearchParams.toString();
        var headers = new HttpHeaders();
        headers.append(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        return this.http.post(AddWorkFlowCriteriaDataURL, body, {
            headers: headers,
        });
    }

    DeleteAction(id): any {
        return this.http.get(DeleteActionURL + "/" + id);
    }

    deleteTemplate(id): any {
        return this.http.get(deletetemplateURL + "?id=" + id);
    }

    GetTemplateByID(id): any {
        const headers = new HttpHeaders();
        headers.append(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        return this.http.get(getTemplateDATABYURL + "?id=" + id, {
            headers: headers,
        });
    }
}
