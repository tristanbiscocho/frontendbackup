import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer-list/customer-list.service';
import { AuthService } from 'app/main/services/auth';
import { FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
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
    selector: 'partner-refferallist',
    templateUrl: './partner-refferallist.component.html',
    styleUrls: ['./partner-refferallist.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class PartnerRefferallistComponent implements OnInit
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
    offset: any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _activeRoute: ActivatedRoute,
        public _customerService: CustomerService,
        public _authService: AuthService
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
        const sys_data = this._authService.getAllResourceData();
        this.statusData = sys_data.filter(x => x.ListID == 11);
        this._activeRoute.params.forEach(params => {
            const getcustomerId = params['userId'];
            const offset = params['OFFSET'];
            if (getcustomerId !== undefined) {
                this.customerId = getcustomerId;
                this.getRefferalCount(this.customerId);
            }
            if(!!offset){
                this.offset = offset;
            }
        });
        // this.searchReffreal.valueChanges
        // .subscribe(searchText => {
        //     this.refferals = FuseUtils.filterArrayByString(
        //         this.filterRefferal,
        //         searchText
        //     );
        // });
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
            Status: this.status,
            searchText : this.searchReffreal.value,
            isSignUpConfirmation: 10,
            CustomerId: id
        };
        this._customerService.getPartnerRefferalist(data).subscribe( (response: any) => {
            if (response.status_code == 0) {
                this.refferals = response.data;
            
                this.filterRefferal = response.data;
                for (let ref of this.refferals){
                    this.total = ref.ReferralBonus + this.total;
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
            Status: null,
            searchText : this.searchReffreal.value,
            isSignUpConfirmation: 10,
            CustomerId: id
        };
        this.fromDate = null;
            this.endDate = null;
            this.status = null;
        this._customerService.getPartnerRefferalist(data).subscribe( (response: any) => {
            if (response.status_code == 0) {
                this.refferals = response.data;
                for (let ref of this.refferals){
                    this.total = ref.ReferralBonus + this.total;
                }
            } else {
                this.refferals = [];
            }
        });
    }
}
