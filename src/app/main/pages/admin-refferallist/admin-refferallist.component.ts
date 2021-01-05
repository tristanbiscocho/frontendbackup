import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer-list/customer-list.service';
import { AuthService } from 'app/main/services/auth';
import { FormControl, FormControlDirective } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { MessageService } from 'primeng/components/common/messageservice';
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
    selector: 'ferallist',
    templateUrl: './admin-refferallist.component.html',
    styleUrls: ['./admin-refferallist.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class AdminRefferallistComponent implements OnInit
{
    refferals: any[];
    customerId: any;
    statusData: any;
    fromDate: any;
    endDate: any;
    status: any;
    total: any = 0;
    filterRefferal: any;
    searchReffreal = new FormControl("");
    isSIgnUpConfirm = 10;
    pageOffset: any;
    addCredits = new FormControl("");
    reason = new FormControl("");

    tableOffset = 0;
    userCustomerId: any;
    userId: any;
    customername:any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _activeRoute: ActivatedRoute,
        public _customerService: CustomerService,
        public _authService: AuthService,
        public _messageService: MessageService
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

    onChange(event): any {
        this.tableOffset = event.offset;
    }

    ngOnInit(): any {
        const sys_data = this._authService.getAllResourceData();
        this.statusData = sys_data.filter(x => x.ListID == 11);
        this._activeRoute.params.forEach(params => {
            const getcustomerId = params['userId'];
            const pageOffset = params['OFFSET'];
            const customerId = params['CUSTOMERID'];
            const userId = params['USERID'];
            if (getcustomerId !== undefined) {
                this.customerId = getcustomerId;
            }
            if (!!customerId){
                this.userCustomerId = customerId;
            }
            if (!!pageOffset) {
                this.pageOffset = pageOffset;
            }
            if (!!userId){
                this.userId = userId;
            }
        });
        // this.searchReffreal.valueChanges
        // .subscribe(searchText => {
        //     this.refferals = FuseUtils.filterArrayByString(
        //         this.filterRefferal,
        //         searchText
        //     );
        // });
        this.getRefferalCount(this.customerId);

    }

    getRefferalCount(id): any {
        
        this.total = 0;
        let ToDate = null;
        let FromDate = null; 
        if (!!this.fromDate){
            const d = new Date(this.fromDate);
            d.setHours(12, 0, 0);
            FromDate = !!d ? d : FromDate;
        }
        if (!!this.endDate){
            const d = new Date(this.endDate);
            d.setHours(23, 59, 59);
            ToDate = !!d ? d : ToDate;
        }
        const data = {
            userId: id,
            FromDate: FromDate,
            ToDate: ToDate,
            isSignUpConfirmation: this.isSIgnUpConfirm,
            searchText : this.searchReffreal.value,
            Status: this.status,
            CustomerId : this.userCustomerId
            
        };
        this._customerService.getCustomerRefferalList(data).subscribe( (response: any) => {
                   
            if (response.status_code == 0) {
                this.refferals = response.data.CustomerReferralList;
                this.customername = response.data.CustomerName;
                this.filterRefferal = response.data.CustomerReferralList;
                const total = response.data.TotalCredit;
                if (this.refferals.length > 0) {
                    for (const ref of this.refferals) {
                        if(ref.CustomStatus == "Payment Done")
                        {
                            this.total = ref.ReferralBonus + this.total; 
                        } 
                    }
                    this.total = this.total + total;
                    
                } else {
                    this.total = total;
                    
                }
               
            } else {
                this.refferals = [];
            }
        });
    }

    clearFilter(id): any {
        this.total = 0;
        this.searchReffreal = new FormControl("");
        const data = {
            userId: id,
            FromDate: null,
            ToDate: null,
            isSignUpConfirmation: 1,
            searchText : this.searchReffreal.value,
            Status : null,
            CustomerId: this.userCustomerId
        };
        this.fromDate = null;
            this.endDate = null;
            this.status = null;
        this._customerService.getCustomerRefferalList(data).subscribe( (response: any) => {
            if (response.status_code == 0) {
                this.refferals = response.data.CustomerReferralList;
                this.total = response.data.TotalCredit;
                
                
            } else {
                this.refferals = [];
            }
        });
    }

    addCredit(): any {
        const data  = {
            Reason: this.reason.value,
            Status: '1',
            Amount: this.addCredits.value,
            CreatedOn: null,
            CustomerId: this.userCustomerId,
        };  
        this._customerService.AddCustomerCredit(data).subscribe( (response: any) => {
            if (response.status_code == 200){
                this._messageService.add({ severity: 'success', summary: 'success', detail: 'Credit added successfully.' });
                this.getRefferalCount(this.customerId);
                this.reason = new FormControl('');
                this.addCredits = new FormControl('');
            } else {
                this._messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in adding credit successfully.' });
            }
        }); 
    }
}
