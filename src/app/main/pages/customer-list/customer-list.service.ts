import { Injectable } from "@angular/core";

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import {
    HttpErrorResponse,
    HttpClient,
    HttpHeaders,
} from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Resolve } from "@angular/router";
import { CoreHttpService } from "app/main/services/core-http.service";
import { SERVER_URL } from "app/main/services/config";
const getCustomerList = SERVER_URL + "/CustomerInfo/GetAllCustomer";
const getCustomerBillsURL =
    SERVER_URL + "/CustomerInfo/GetCustomerBillInfo?customerId=";
const getCustomerBlockURL =
    SERVER_URL + "/CustomerInfo/BlockCustomer?customerId=";
const getBillPayURL =
    SERVER_URL + "/CustomerInfo/ChangeStatusToPayBill?billId=";
const getCustomerBillInfoByIdURL =
    SERVER_URL + "/CustomerInfo/GetBillInfoByCustomerId";
const addBillsURL = SERVER_URL + "/CustomerInfo/GenerateBillInfo";
const getRefferalListURL = SERVER_URL + "/CustomerInfo/GetCustomerReferralList";
const getCustomerBillsByIdURL = SERVER_URL + "/CustomerInfo/GetBillInfoByIds";
const redirectionFLowCompleteURL =
    SERVER_URL + "/CustomerInfo/CompleteRedirection?CustomerId=";
const getCustomerBillDataByBillIdURL =
    SERVER_URL + "/CustomerInfo/GetBillById?billId=";
const reqForPaymentURL =
    SERVER_URL + "/CustomerInfo/CustomerNewRquestForPayinGoCard";

const addCreditURL = SERVER_URL + "/CustomerInfo/AddCustomerCredit";
const getCreditListURL =
    SERVER_URL + "/CustomerInfo/GetCustomerReferralAndCredit";
const removeCreditURL = SERVER_URL + "/CustomerInfo/RemoveCreditOfCustomer";

const getLoggerURL = SERVER_URL + "/CustomerInfo/GetAllLoggers";
const getRefferalListPartnerURL =
    SERVER_URL + "/CustomerInfo/GetPartnerReferrralList";
const stripeURL = SERVER_URL + "/CustomerInfo/Stripeprpcess";
const getcustomerinfoURL =
    SERVER_URL + "/CustomerInfo/GetCustomerAllDetailsbyId";
const getpaymentinfoURL =
    SERVER_URL +
    "/CustomerInfo/GetCustomerPaymentsFromGoCaByCustomer?customerId=";
@Injectable()
export class CustomerService {
    constructor(private _coreHttpService: CoreHttpService) {}

    getAllCustomer = () => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest(getCustomerList, headers);
    };

    getCustomer = (customerFilter) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest(
            getCustomerList,
            customerFilter,
            headers
        );
    };

    getCustomerBills = (id) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getCustomerBillsURL + id;
        return this._coreHttpService.httpGetRequest(url, headers);
    };

    getCustomerBillInfoById = (data) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest(
            getCustomerBillInfoByIdURL,
            data,
            headers
        );
    };

    getCustomerBillsById = (id) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getCustomerBillsByIdURL + "?id=" + id;
        return this._coreHttpService.httpGetRequest(url, headers);
    };

    addCustomerBill = (billData) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest(
            addBillsURL,
            billData,
            headers
        );
    };

    getCustomerRefferalList = (data) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest(
            getRefferalListURL,
            data,
            headers
        );
    };

    getPartnerRefferalist = (data) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest(
            getRefferalListPartnerURL,
            data,
            headers
        );
    };

    blockCustomer = (blockCust) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getCustomerBlockURL;
        return this._coreHttpService.httpPostRequest(url, blockCust, headers);
    };

    pyBill = (id) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getBillPayURL + id;
        return this._coreHttpService.httpGetRequest(url, headers);
    };

    completeRedirectionFlow = (customerId, rtedirectionUrlId) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url =
            redirectionFLowCompleteURL +
            customerId +
            "&redirect_flow_id=" +
            rtedirectionUrlId;
        return this._coreHttpService.httpGetRequest(url, headers);
    };

    // get bill data by bill ID
    getCustomerBillDataByBillId = (id) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getCustomerBillDataByBillIdURL + id;
        return this._coreHttpService.httpGetRequest(url, headers);
    };

    ReqForPayment = (data) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url =
            reqForPaymentURL +
            "?customerId=" +
            data.customerId +
            "&billId=" +
            data.billId;
        return this._coreHttpService.httpGetRequest(url, headers);
    };

    AddCustomerCredit = (data) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = addCreditURL;
        return this._coreHttpService.httpPostRequest(url, data, headers);
    };

    getCredit = (id, uID) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getCreditListURL + "?CustomerId=" + id + "&userId=" + uID;
        return this._coreHttpService.httpGetRequest(url, headers);
    };

    removeCredit = (id) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = removeCreditURL + "?id=" + id;
        return this._coreHttpService.httpGetRequest(url, headers);
    };

    getLoggerDetails = (data) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest(
            getLoggerURL,
            data,
            headers
        );
    };

    getCustomerInfo = (custDetailFilterModel) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");

        return this._coreHttpService.httpPostRequest(
            getcustomerinfoURL,
            custDetailFilterModel,
            headers
        );
    };

    Stripeprpcess = (stripeInfo) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._coreHttpService.httpPostRequest(
            stripeURL,
            stripeInfo,
            headers
        );
    };

    getpaymentinformation = (id) => {
        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        const url = getpaymentinfoURL + id;
        return this._coreHttpService.httpGetRequest(url, headers);
    };
}
