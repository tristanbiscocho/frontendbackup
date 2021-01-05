import { Injectable } from "@angular/core";
import { AppUrlsService } from "app/main/services/app-urls.service";
import { AppHttpClient } from "app/main/services/http-client.service";
@Injectable()
export class ClientsDataService {
  private domain = `${this.appUrlsService.DOMAIN}`;
  //private domain="http://192.168.11.19:8080/concillium-user-management-service-0.0.1/";

  private urls = {
    commissionTypeUrl: `${this.domain}api/Commission/GetAllCommissionType`,
    invoiceGenerationUrl: `${this.domain}api/Client/GetAllInvoiceGenerationType`,
    invoicePayableUrl: `${this.domain}api/Client/GetAllInvoicePayableType`,
    createClientUrl: `${this.domain}api/Client/CreateClient`,
    allClientUrl: `${this.domain}api/Client/GetAllClient`,
    deleteClientUrl: `${this.domain}api/Client/DeleteClient`,
    clientDetailsUrl: `${this.domain}api/Client/GetClientDetails`,
    clientDetailsUpdateUrl: `${this.domain}api/Client/UpdateClient`,
    supplierUrl: `${this.domain}api/SupplierInfo/GetAllSupplier`,
  };

  constructor(
    private http: AppHttpClient,
    private appUrlsService: AppUrlsService
  ) {}

  getAllCommission() {
    return this.http.get(`${this.urls.commissionTypeUrl}`);
  }
  getAllClient() {
    return this.http.get(`${this.urls.allClientUrl}`);
  }
  getAllSupplier() {
    return this.http.get(`${this.urls.supplierUrl}`);
  }
  getClientDetails(Id) {
    return this.http.get(`${this.urls.clientDetailsUrl}/${Id}`);
  }
  deleteClient(Id) {
    return this.http.delete(`${this.urls.deleteClientUrl}/${Id}`);
  }
  getAllInvoiceGenerationType() {
    return this.http.get(`${this.urls.invoiceGenerationUrl}`);
  }
  getAllInvoicePayable() {
    return this.http.get(`${this.urls.invoicePayableUrl}`);
  }
  creatClient(data:any) {
    return this.http.post(`${this.urls.createClientUrl}`,data);
  }
  UpdateClient(data:any,Id) {
    return this.http.post(`${this.urls.clientDetailsUpdateUrl}/${Id}`,data);
  }
}
