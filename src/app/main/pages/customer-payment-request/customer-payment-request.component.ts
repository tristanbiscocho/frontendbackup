import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { CustomerService } from '../customer-list/customer-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../settings/settings.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { throwMatDialogContentAlreadyAttachedError, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'customer-payment-request',
    templateUrl: './customer-payment-request.component.html',
    styleUrls: ['./customer-payment-request.component.scss']
})
export class CustomerPaymentRequestComponent implements OnInit {
    bills: any;
    currentUser: any[];
    customerId: any;
    billId: any;
    packages: any;
    PackageId: any;
    packageDetails: any;
    finalBill = 0;
    packageAmount: any;
    typeOfBill = 1;
    meterReading: any;
    gasReadingValue: any;
    electryReading: any;
    pageOffset: any;
    customerPageOffset: any;
    settings: any;
    directDebitDetail: any;
    confirmDialogRef: any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _customerService: CustomerService,
        public _activeRoute: ActivatedRoute,
        public _settingSerivce: SettingsService,
        public messageService: MessageService,
        public router: Router,
        private dialog: MatDialog
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
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

        const currentuserdata = localStorage.getItem('UserDetail');
        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }
    }


    ngOnInit(): any {
        this.getPackages();
        this._activeRoute.params.forEach(params => {
            const getcustomerId = params['customerId'];
            const getBillId = params['BILLID'];
            const pageOffset = params['PAGEOFFSET'];
            const customerPageOffset = params['CUSTOMERPAGEOFFSET'];
            if (getcustomerId !== undefined) {
                this.customerId = getcustomerId;
            }
            if (getBillId !== undefined) {
                this.billId = getBillId;
            }
            if (!!pageOffset){
                this.pageOffset = pageOffset;
            }
            if (!!customerPageOffset) {
                this.customerPageOffset = customerPageOffset;
            }
        });
    }

    getCustomerBills(id): any {
        this._customerService.getCustomerBillDataByBillId(id).subscribe((response: any) => {
           if (response.status_code == 0) {
                this.bills = response.data;
                this.PackageId = this.bills.BillInfo.PackageId;
                if (!!this.bills.BillInfo.DirectDebitDetail){
                    this.directDebitDetail = JSON.parse(this.bills.BillInfo.DirectDebitDetail);
                }
                if (this.PackageId != 0 || !!this.PackageId) {
                    this.packageDetails = this.packages.find(x => x.Id == this.PackageId).Name;
                }
           } else {
                this.bills = [];
           }
        });
    }

    getPackages(): any {
        this._settingSerivce.getPackageList().subscribe(
            response => {
                if (response) {
                    this.packages = response;

                } else {
                    this.packages = null;
                }
                this.getCustomerBills(this.billId);

            });
    }
    reqPayement(): any{
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = "Are you sure?";

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const data = {
                    customerId : this.customerId,
                    billId: this.bills.BillInfo.BillNo,
                    poolId: this.bills.PoolId
                };
                this._customerService.ReqForPayment(data).subscribe((response: any) => {
                    if (response == "successfully"){
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Payment request sent successfully.' });
                        this.router.navigate(['/admin-customer-bill/' + this.customerId + '/' + this.customerPageOffset + '/' + this.pageOffset]);
                    } 
                });
            }
        });
    }
}
