import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InvoiceService } from 'app/main/pages/invoices/invoice.service';
import { PartnerService } from '../../partner/partner.service';
import { ActivatedRoute } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { CustomerService } from '../../customer-list/customer-list.service';
import { SupervisorService } from '../../supervisor-list/supervisor-list.service';
import * as _ from "lodash";
import { LoaderService } from 'app/main/services/loader.service';
@Component({
    selector: 'invoice-modern',
    templateUrl: './modern.component.html',
    styleUrls: ['./modern.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InvoiceModernComponent implements OnInit {
    invoice: any;
    partnersDetails: any;
    partnerId: any;
    getInvoiceId: any;
    invoiceDetails: any;
    getBillId: any;
    // Private
    private _unsubscribeAll: Subject<any>;
    billDetails: any;
    layoutMode = true;
    pageOffset: any;
    currentUser: any;
    customerOffset: any;
    flag: any;
    supervisorInvoiceDetails: any;
    supervisorDetail: any;
    userAccountNum: any;
    subtotal: any;
    vatTotal: any;
    constructor(
        private _invoiceService: InvoiceService,
        public _partnerSerivce: PartnerService,
        public _activeRoute: ActivatedRoute,
        public _fuseConfigService: FuseConfigService,
        public _customerService: CustomerService,
        public _superviseorService: SupervisorService,
        public _loaderService:LoaderService
    ) {
     
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: false
                },
                toolbar: {
                    hidden: false
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    
    ngOnInit(): void {
        
        
        this._loaderService.isHelp(false);

        this._activeRoute.params.forEach(params => {
            const getPartnerId = params['PARTNERID'];
            const getInvoiceId = params['INVOICEID'];
            const getBillId = params['BILLID'];
            const offset = params['PAGEOFFSET'];
            const customerOffset = params['CUSTOMERPAGEOFFSET'];
            const flag = params['FLAG'];
            if (getPartnerId !== undefined) {
                this.partnerId = getPartnerId;
                this.getPartnerById(this.partnerId);
            }
            if (getInvoiceId !== undefined){
                this.getInvoiceId = getInvoiceId;
                this.getInvoiceData(this.getInvoiceId);
            }
            if (getBillId != undefined){
                this.getBillId = getBillId;
                this.getBillData(this.getBillId);
            }
            if (!!offset){
                this.pageOffset = offset;
            }
            if (!!customerOffset){
                this.customerOffset = customerOffset;
            }
            if (!!flag){
                this.flag = flag;
            }
            
            if (!!flag && flag == 12){
                
                this._superviseorService.getInvoiceDetailbyInvoiceId(customerOffset).subscribe(
                    response => {
                        
                        if (response.status_code === 0) {
                            this.supervisorInvoiceDetails = response.data;
                        } else {
                            this.supervisorInvoiceDetails =   [];
                        }
                    });

                    this._superviseorService.getSupervisorDetail(offset).subscribe(
                        response => {
                            if (response.status_code === 0) {
                                this.supervisorDetail = response.data;
                            } else {
                                this.supervisorDetail =   [];
                            }
                        });
            }
        });
        const currentuserdata = localStorage.getItem('UserDetail');
        if (!!currentuserdata){
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }
    }

    getPartnerById(id): any {
        this._partnerSerivce.getPartnerById(id).subscribe(
            response => {
              if (response.status_code === 200) {
                this.partnersDetails = response.data;
              } else {
                this.partnersDetails = null;
              }
            });
    }

    getBillData(id): any{
        this._customerService.getCustomerBillsById(id).subscribe(
            (response: any) => {
                if (response.status_code === 0) {
                    this.billDetails = response.data;
                    const account = this.billDetails.PersonData.PaymentDetails_AccountNumber;
                    this.userAccountNum = account;

                 
                    this.vatTotal = _.sumBy(this.billDetails.BillHelperData, 'VetPercentage');
                    this.subtotal = _.sumBy(this.billDetails.BillHelperData, 'TotalAmount');
                  } else {
                    this.billDetails = null;
                  }
            }
        );
    }

    getInvoiceData(id): any {
        this._invoiceService.getInvoiceData(id).subscribe(
            response => {
              if (response.status_code === 0) {
                this.invoiceDetails = response.data;
              } else {
                this.invoiceDetails = null;
              }
            });
    }

    generateInvoice = () => {
        this.layoutMode = false;
        const elemente = document.getElementById('InvoiceButton');
        const backButton = document.getElementById('InvoiceButton1');
        elemente.style.display = "none";
        backButton.style.display = "none";
        window.print();
        elemente.style.display = "inline";
        backButton.style.display = "inline";
        this.layoutMode = true;
    }
}
