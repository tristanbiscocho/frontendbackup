import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer-list/customer-list.service';
import { FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import { MessageService } from 'primeng/components/common/messageservice';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import * as _ from 'lodash';
import { STRIPE_KEY_BY_K } from 'app/main/services/config';
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
    selector: 'admin-customer-bill',
    templateUrl: './admin-customer-bill.component.html',
    styleUrls: ['./admin-customer-bill.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class AdminCustomerBillsComponent implements OnInit {
    bills: any[];
    customerId: any;
    billId: any;
    FromDate: any;
    ToDate: any;
    otherDetails: any;
    searchCustomerBill = new FormControl("");
    filterBills: any;
    status: any;
    customerName: any;
    pageOffset: any;
    customerPageOffset: any;
    IsBlocked: any;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _activeRoute: ActivatedRoute,
        public _customerService: CustomerService,
        private _messageService: MessageService
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
        this._activeRoute.params.forEach(params => {
            const getcustomerId = params['customerId'];
            const getBillId = params['billId'];
            const pageOffset = params['PAGEOFFSET'];
            const customerPageOffset = params['CUSTOMERPAGEOFFSET'];
            if (getcustomerId !== undefined) {
                this.customerId = getcustomerId;
            }
            if (getBillId !== undefined) {
                this.billId = getBillId;
            }
            if (!!pageOffset) {
                this.pageOffset = pageOffset;
            }
            if (!!customerPageOffset) {
                this.customerPageOffset = customerPageOffset;
            }
        });
        this.getBills(this.customerId);

        // this.searchCustomerBill.valueChanges
        //     .subscribe(searchText => {
        //         this.bills = FuseUtils.filterArrayByString(
        //             this.filterBills,
        //             searchText
        //         );
        //     });
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }

    getBills(id): any {
        let toDate = undefined;
        if (!!this.ToDate) {
            const d = new Date(this.ToDate);
            d.setHours(23, 59, 59);
            toDate = !!d ? d : toDate;
        }
        const data = {
            customerId: id,
            toDate: toDate,
            fromDate: this.FromDate,
            Status: this.status,
            searchText: this.searchCustomerBill.value
        };
        this._customerService.getCustomerBillInfoById(data).subscribe((response: any) => {
            if (response.status_code == 0) {
                this.bills = response.data.CustomerBillDetails;
                this.filterBills = response.data.CustomerBillDetails;
                this.otherDetails = response.data.BillDashboard[0];
                this.customerName = response.data.CustomerName;
                this.IsBlocked = response.data.IsBlocked;
                _.each(this.bills, bill => {
                    if (!!bill.DirectDebitDetail && bill.DirectDebitDetail != "") {
                        var data = JSON.parse(bill.DirectDebitDetail);
                        bill.StatusFromDebit = data.CreatedCustomerpayment.status;
                        bill.charge_date = data.CreatedCustomerpayment.charge_date;
                    } else {
                        bill.StatusFromDebit = "Pending";
                    }
                });
            } else {
                this.bills = [];
            }
        });
    }

    filterofBills()
    {
        
        const data = {
            customerId: this.customerId,
            toDate: this.ToDate,
            fromDate: this.FromDate,
            Status: this.status,
            searchText: this.searchCustomerBill.value
        };
        this._customerService.getCustomerBillInfoById(data).subscribe((response: any) => {
            if (response.status_code == 0) {
                this.bills = response.data.CustomerBillDetails;
                this.filterBills = response.data.CustomerBillDetails;
                this.otherDetails = response.data.BillDashboard[0];
                this.customerName = response.data.CustomerName;
            } else {
                this.bills = [];
            }
        });
    }

    clearBills(): any {
        
        this.ToDate = null;
        this.FromDate = null;
        this.status = null;
        this.searchCustomerBill = new FormControl("");
        const data = {
            customerId: this.customerId,
            toDate: this.ToDate,
            fromDate: this.FromDate,
            Status: this.status,
            searchText: this.searchCustomerBill.value
        };
        this._customerService.getCustomerBillInfoById(data).subscribe((response: any) => {
            if (response.status_code == 0) {
                this.bills = response.data.CustomerBillDetails;
                this.filterBills = response.data.CustomerBillDetails;
                this.otherDetails = response.data.BillDashboard[0];
                this.customerName = response.data.CustomerName;
            } else {
                this.bills = [];
            }
        });
    }

    payBill = (id) => {
        this._customerService.pyBill(id)
            .subscribe((data: any) => {
                if (data.status_code === 200) {
                    this._messageService.add({ severity: 'success', summary: 'success', detail: 'Bill Paid successfully.' });
                    this.clearBills();
                } else {

                }
            });
    }


    

}
