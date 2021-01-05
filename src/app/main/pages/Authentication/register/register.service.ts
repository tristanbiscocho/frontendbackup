import { Injectable } from "@angular/core";

import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import {
    HttpErrorResponse,
    HttpClient,
    HttpHeaders
} from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Resolve } from "@angular/router";
import { SERVER_URL } from "../../../services/config";
import { CoreHttpService } from "app/main/services/core-http.service";
import { retry, catchError, map } from "rxjs/operators";
const registerURL = SERVER_URL + "/CustomerInfo/AddCustomer";
const redirectURL = SERVER_URL + "/CustomerInfo/GetRedirect?customerId=";
const gocardlessURL = SERVER_URL + "/CustomerInfo/creategocardlessacount";
const getAddressDataURL = SERVER_URL + "/CustomerInfo/GetAddressByPostalCode";
const validatepostalcodeURL = SERVER_URL + "/CustomerInfo/GetPostalValidation";
const gettokenURL = SERVER_URL + "/UserInfo/UpdateToken";
const customerRestflow =
    SERVER_URL + "/CustomerInfo/CustomerRestOfFlowAfterSignUp?customerId=";
const validateEmail = "https://client.myemailverifier.com/clientarea/emailverifier/index.php/verifier/validate_single?";
const validatePhone = " https://rest.messagebird.com/lookup/";
const addPackageURL = SERVER_URL + '/PackageInfo/CreatePackage';
const supplierURL = SERVER_URL + "/CustomerInfo/CallAPI?URL=";
const getLeadDataURL = SERVER_URL + "/partner/GetLeadListById";
const updatePartnerURL = SERVER_URL + "/partner/EditLead";
const updateLeadURL = SERVER_URL + "/Partner/AddNewCustomer";
@Injectable()
export class RegisterService {
    constructor(
        private _coreHttpService: CoreHttpService,
        private http: HttpClient
    ) {}

    addCustomer = customer => {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        return this._coreHttpService.httpPostRequest<any, any>(
            registerURL,
            customer,
            reqHeaders
        );
    }
    
    addPackageCustomer(data): Observable<any> {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        return this._coreHttpService.httpPostRequest<any, any>(
            addPackageURL,
            data,
            reqHeaders
        );
    }
    addLead = (postData) => {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        return this._coreHttpService.httpPostRequest<any, any>(
            updateLeadURL,
            postData,
            reqHeaders
        );
    }
    updatePartner = data => {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        return this._coreHttpService.httpPostRequest<any, any>(
            updatePartnerURL,
            data,
            reqHeaders
        );
    }

    creategocardlessacount   = customer =>{
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        return this._coreHttpService.httpPostRequest<any,any>(
            gocardlessURL,
            customer,
            reqHeaders
        );
    }

    getUserCurrentTariff = (postdata) => {
        
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        let url = SERVER_URL + '/CustomerInfo/CallpostAPI?URL=https://www.theenergyshop.com/getUserCurrentTariff';

        return this._coreHttpService.httpPostRequest<any, any>(
            url,
            postdata,
            reqHeaders
        );
    }
    getComparision = (postdata) => {
        
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        let url =  SERVER_URL + '/CustomerInfo/CallpostAPI?URL=https://www.theenergyshop.com/getComparisionResults';
        return this._coreHttpService.httpPostRequest<any, any>(
            url,
            postdata,
            reqHeaders
        );
    }
    gettarrifdatabyTariffId = (id) => {
        const reqHeaders = new HttpHeaders({"No-Auth": "true"  });
        let url ='https://www.theenergyshop.com/getTariffById?tariffId=' + id ;
        let URL = supplierURL + encodeURIComponent(url) + '&&RequestType=GET';
        return this._coreHttpService.httpGetRequest<any>(URL, reqHeaders);
    }
    getSupplier = () => {
        const reqHeaders = new HttpHeaders({"No-Auth": "true"  });
        let url = supplierURL + 'https://www.theenergyshop.com/getSuppliers&&RequestType=GET' ;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }
    getPaymentDetails = () => {
        const reqHeaders = new HttpHeaders({"No-Auth": "true"  });
        let url = supplierURL + 'https://www.theenergyshop.com/getPaymentMethods&&RequestType=GET' ;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }

    getPaymentMethodsByType = (getpyamentdata) => {
        const reqHeaders = new HttpHeaders({"No-Auth": "true"  });
        let url ='https://www.theenergyshop.com/getSupplierPaymentMethods?supplierId=' + getpyamentdata.supplierId + '&serviceType=' + getpyamentdata.serviceType + '&e7=' + getpyamentdata.e7;
        let URL = supplierURL + encodeURIComponent(url) + '&&RequestType=GET';
        return this._coreHttpService.httpGetRequest<any>(URL, reqHeaders);
    }
    getRegionById = (address) => {
        const reqHeaders = new HttpHeaders({"No-Auth": "true"  });
        let url = supplierURL + 'https://www.theenergyshop.com/getRegionByAddress?addressAsStr=' + address + '&&RequestType=GET';
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }
  
    getPlanMethodsByType = (getPlandata) => {
        const reqHeaders = new HttpHeaders({"No-Auth": "true"  });
        let url =' https://www.theenergyshop.com/getSupplierTariffs?supplierId=' + getPlandata.supplierId + '&regionId=' + getPlandata.regionId + '&serviceType=' + getPlandata.serviceType + '&paymentMethod=' + getPlandata.paymentMethod + '&e7='  + getPlandata.e7;
        let URL = supplierURL + encodeURIComponent(url) + '&&RequestType=GET';
        return this._coreHttpService.httpGetRequest<any>(URL, reqHeaders);
    }

    getDefaultTarrif = (getPlandata) => {
        const reqHeaders = new HttpHeaders({"No-Auth": "true"  });
        let url =' https://www.theenergyshop.com/getSupplierDefaultTariff?supplierId=' + getPlandata.supplierId + '&serviceType=' + getPlandata.serviceType + '&paymentMethod=' + getPlandata.paymentMethod + '&e7='  + getPlandata.e7;
        let URL = supplierURL + encodeURIComponent(url) + '&&RequestType=GET';
        return this._coreHttpService.httpGetRequest<any>(URL, reqHeaders);
    }

    getPhoneNumber = (getPlandata) => {
        const reqHeaders = new HttpHeaders({"Authorization": "AccessKey bshqSeReD3vyJvP5FaVDdKJNu", "No-Auth": "true" });
        let url ='https://rest.messagebird.com/lookup/' +getPlandata;
        let URL = supplierURL + encodeURIComponent(url) + '&&RequestType=GET&header=true';
        return this._coreHttpService.httpGetRequest<any>(URL, reqHeaders);
    }
    getRedirectUrl = customerId => {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        let url = redirectURL + customerId;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }
    validateEmail(email): any {
        const reqHeaders = new HttpHeaders({ "Authorization": "true", "No-Auth": "true"  });
        let url = validateEmail + 'email=' + email + '&apikey=GJ808512029499633198';
        let URL = supplierURL + encodeURIComponent(url) + '&&RequestType=GET&header=true';
        return this._coreHttpService.httpGetRequest<any>(URL, reqHeaders);
    }

    validatePhone = phone => {
        const reqHeaders = new HttpHeaders({ "Authorization": "AccessKey bshqSeReD3vyJvP5FaVDdKJNu" });
        let url = validatePhone + phone ;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }

    flowAfterCustSignUp  = customerId => {
        
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        let url = customerRestflow + customerId;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }

    getAddressData = postCode => {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        // const url = getAddressDataURL + "?PostalCode=" + postCode;
        const url = supplierURL + 'https://www.theenergyshop.com/addressLookup?postcode=' + postCode + '&&RequestType=GET';
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }
    gerAddress = postCode => {
        
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = getAddressDataURL + "?PostalCode=" + postCode;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }
    // getPaymentmethods()
    // {
    //     
    //     const reqHeaders = new HttpHeaders({"No-Auth":"true",});
    //     reqHeaders.append( 'Access-Control-Allow-Origin','*');
    //     const url = paymentmethodURL; 
    //     return this._coreHttpService.httpGetRequest<any>(url,reqHeaders);
    // }

    validatepostalcode = postCode => {  
        const reqHeaders = new HttpHeaders({ "No-Auth": "true"});
        reqHeaders.append( 'Access-Control-Allow-Origin','*');
         const url = validatepostalcodeURL + "?PostalCode=" + postCode;
        return this._coreHttpService.httpGetRequest<any>(url,reqHeaders);
       
    }

    inserttoken (data) {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        return this._coreHttpService.httpPostRequest<any, any>(gettokenURL,reqHeaders,data);
    }

    getDataByLeadId(id) {
        const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
        const url = getLeadDataURL + "?leadId=" + id;
        return this._coreHttpService.httpGetRequest<any>(url, reqHeaders);
    }

   
}
