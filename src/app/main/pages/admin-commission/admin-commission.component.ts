import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { AdminComissionService } from './admin-commission.service';
import { AuthService } from 'app/main/services/auth';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { ActivatedRoute } from '@angular/router';
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
    selector: 'admin-commission',
    templateUrl: './admin-commission.component.html',
    styleUrls: ['./admin-commission.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class AdminCommissionComponent implements OnInit {
    bills: any[] = [];
    currentUser: any;
    invoices: any[];
    statusData: any;
    fromDate: any;
    toDate: any;
    status: any;
    tableOffset = 0;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _adminComission: AdminComissionService,
        public _authService: AuthService,
        public _activeRoute: ActivatedRoute
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
        if (!!currentuserdata){
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }
       
    }

    ngOnInit(): any{
        this._activeRoute.params.forEach(params => {
            const Offset = params['OFFSET'];
            if(!!Offset){
                this.tableOffset = Offset;
                
            }
        });
        const sys_data = this._authService.getAllResourceData();
        this.statusData = sys_data.filter(x => x.ListID == 11);
        this.getInvoiceData(this.currentUser.CustomerId);
        
    }

    onChangePage(event): any {
        this.tableOffset = event.offset;
    }

    getInvoiceData(id): any {
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
            PartnerId: id,
            toDate: ToDate,
            fromDate: FromDate,
            status: this.status
        };
        this._adminComission.getInvoice(data).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.invoices = response.data;
                } else {
                    this.invoices = [];
                }
            });
    }

    clearInvoiceData(id): any {
        this.toDate = null;
        this.fromDate = null;
        this.status = null;
        const data = {
            PartnerId: id,
            toDate: this.toDate,
            fromDate: this.fromDate,
            status: this.status
        };
        this._adminComission.getInvoice(data).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.invoices = response.data;
                } else {
                    this.invoices = [];
                }
            });    
    }
}
