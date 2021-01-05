import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { SupplierService } from '../supplier/supplier.service';
import { AdminComissionService } from '../admin-commission/admin-commission.service';
import { FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import * as _ from 'lodash';
import { ReceiptComponentComponent } from '../receipt-component/receipt-component.component';
import { MatDialog } from '@angular/material';
import { LoaderService } from 'app/main/services/loader.service';
// tslint:disable-next-line:no-duplicate-imports

const moment = _moment;


export const MY_FORMATS = {
    parse: {
      dateInput: 'L',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'DD/MM/YYYYY',
      monthYearA11yLabel: 'MMM YYYY',
    },
  };

@Component({
    selector: 'admin-tranactiondetails',
    templateUrl: './admin-transactiondetails.component.html',
    styleUrls: ['./admin-transactiondetails.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class AdminTransactionDetailsComponent implements OnInit {
    bills: any[];
    suppliers: any[];
    supplier: any;
    status: any[];
    toDate: any;
    fromDate: any;
    chooseStatus: any;
    transactions: any;
    paidby:any;
    searchUser = new FormControl("");
    filterTransaction: any;
    parsedata:any;
    dialogRef: any;
    showLoader:any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _supplierService: SupplierService,
        public _adminCommission: AdminComissionService,
        public dialog: MatDialog,
        public _loaderService:LoaderService
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

    }

    ngOnInit(): any {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        this.getSupplier();
        this.gettransactionDetail();
        // this.searchUser.valueChanges
        // .subscribe(searchText => {
        //     this.transactions = FuseUtils.filterArrayByString(
        //         this.filterTransaction,
        //         searchText
        //     );
        // });
    }

    getSupplier(): any {
        const data = {
            searchText : '',
            energyTypeId : null
        };
        this._supplierService.getSupplier(data).subscribe(
            response => {
                if (response.status_code === 200) {
                    this.suppliers = response.data;
                    if (!!response.data && response.data.length >= 1) {
                        this.suppliers = _.filter(response.data, d => {
                            return d.Status == '1';
                        });
                    }
                } else {
                    this.suppliers = [];
                }
            });
    }

    gettransactionDetail(): any {
        let ToDate = null;
        if (!!this.toDate){
            const d = new Date(this.toDate);
            d.setHours(23, 59, 59);
            ToDate = !!d ? d : ToDate;
        }
        let FromDate = null; 
        if (!!this.fromDate){
            const d = new Date(this.fromDate);
            d.setHours(12, 0, 0);
            FromDate = !!d ? d : FromDate;
        }
        const data = {
            Status: this.chooseStatus,
            CurrentPlan: this.supplier,
            ToDate: ToDate,
            FromDate: FromDate,
            searchText: this.searchUser.value,
            paidBy:this.paidby
        };
        this._adminCommission.getCommission(data).subscribe(
            (response: any) => {
                if (response.status_code === 0) {
                    this.transactions = response.data;
                    
                    for(var i=0;i<this.transactions.length;i++)
                    {
                        this.parsedata = JSON.parse(this.transactions[i].StripeChargeD);
                        
                    }
                    this.filterTransaction = response.data;
                } else {
                    this.transactions = [];
                    this.filterTransaction = [];
                }
            });
    }

    openpaymentPopup(transactions: any) {
        
        this.dialogRef = this.dialog.open(ReceiptComponentComponent, {
            panelClass: 'app-receipt-component',
            data: {
                event: event,
                data: transactions
            }

        });
        this.dialogRef.afterClosed()
            .subscribe((response) => {
                // if (!!response) {
                //     this.getPartnerDetail(this.currentUser.CustomerId);
                //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile edited successfully.' });
                // } else {

                // }

            });
    }

    clearF(){
        this.chooseStatus = null;
        this.supplier = null;
        this.toDate = null;
        this.fromDate = null;
        this.paidby=null;
        this.searchUser = new FormControl("");
        const data = {
            Status: this.chooseStatus,
            CurrentPlan: this.supplier,
            ToDate: this.toDate,
            FromDate: this.fromDate,
            searchText: this.searchUser.value,
            paidBy :this.paidby
        };
        this._adminCommission.getCommission(data).subscribe(
            (response: any) => {
                if (response.status_code === 0) {
                    this.transactions = response.data;
                    this.filterTransaction = response.data;
                } else {
                    this.transactions = [];
                    this.filterTransaction = [];
                }
            });
    }
}
