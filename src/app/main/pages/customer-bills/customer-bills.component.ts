import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { CustomerService } from '../customer-list/customer-list.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { STRIPE_KEY_BY_K } from 'app/main/services/config';
import { BillToStripeModel } from './customer-bill.class';
import { ReceiptComponentComponent } from '../receipt-component/receipt-component.component';
import { MatDialog } from '@angular/material';
// tslint:disable-next-line:no-duplicate-imports
//import { ToastrService } from '../../../node_modules/ngx-toastr';
import { MessageService } from 'primeng/components/common/messageservice';


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
    selector: 'customer-bills',
    templateUrl: './customer-bills.component.html',
    styleUrls: ['./customer-bills.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class CustomerBillsComponent implements OnInit {
    bills: any[];
    currentUser: any;
    FromDate: any;
    ToDate: any;
    tableOffset: any = 0;
    dialogRef: any;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _customerService: CustomerService,
        public _activeRoute: ActivatedRoute,
        public dialog: MatDialog,
        public messageService: MessageService
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
        this._activeRoute.params.forEach(params => {
            const Offset = params['OFFSET'];
            if (!!Offset) {
                this.tableOffset = Offset;
            }
        });
        this.getBills(this.currentUser.CustomerId);
    }
    onChangePage(event): any {
        this.tableOffset = event.offset;
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
            Status: null,
            searchText: ''
        };
        this._customerService.getCustomerBillInfoById(data).subscribe((response: any) => {
            if (response.status_code == 0) {
                this.bills = response.data.CustomerBillDetails;


            } else {
                this.bills = [];
            }
        });
    }

    clearBills(id): any {
        this.ToDate = null;
        this.FromDate = null;
        const data = {
            customerId: id,
            toDate: this.ToDate,
            fromDate: this.FromDate,
            Status: null,
            searchText: ''
        };
        this._customerService.getCustomerBillInfoById(data).subscribe((response: any) => {
            if (response.status_code == 0) {
                this.bills = response.data.CustomerBillDetails;
            } else {
                this.bills = [];
            }
        });
    }


    openCheckout(data: any) {
        
        let objectTpSentInB = new BillToStripeModel();
        objectTpSentInB.BillId = data.Id;
        objectTpSentInB.CustomerId = data.CustomerID;
        objectTpSentInB.Amount = data.Amount;

        var email = !!localStorage.getItem("UserDetail") ? JSON.parse(localStorage.getItem("UserDetail")).UserName : "";
        var handler = (<any>window).StripeCheckout.configure({
            key: STRIPE_KEY_BY_K,
            locale: 'auto',
            email: email,
            token: (token: any) => {
                //Here is the calliong the backend api for paymnet ....
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                if (!!token && !!token.id) {
                    objectTpSentInB.Stoken = token.id;
                    objectTpSentInB.TokenObject = JSON.stringify(token);

                    this._customerService.Stripeprpcess(objectTpSentInB)
                        .subscribe((data: any) => {
                            if (!!data) {
                                if (data == "Failed") {
                                    
                                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Payment Failed.' });
                                    this.getBills(objectTpSentInB.CustomerId)

                                    //error popups
                                } else {
                                    
                                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Payment Done Successfully.' });
                                    this.getBills(objectTpSentInB.CustomerId)
                                    //call or refresh data ;
                                }
                            }
                        });
                } else {
                }
            }
        });

        handler.open({
            name: 'Lowest tariff',
            description: 'Customer Payment',
            amount: objectTpSentInB.Amount * 100,
            currency: 'GBP'
        });
    }

    openpaymentPopup(bills: any) {
        this.dialogRef = this.dialog.open(ReceiptComponentComponent, {
            panelClass: 'app-receipt-component',
            data: {
                event: event,
                data: bills
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

}
