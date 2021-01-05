import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../supplier/supplier.service';
import { AdminSwitchHistoryService } from './admin-switch-history.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
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
    selector: 'admin-switch-history',
    templateUrl: './admin-switch-history.component.html',
    styleUrls: ['./admin-switch-history.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class AdminSwitchHistoryComponent implements OnInit {
    bills: any[];
    customerId: any;
    toDate: any;
    fromDate: any;
    currentPlan: any;
    suppliers: any;
    historyData: any[];
    filterHistory: any[];
    searchSwitch: any;
    customerDetails: any;
    customerUId: any;
    pageOffset: any;
    customerPageOffset: any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _activeRoute: ActivatedRoute,
        public _supplierService: SupplierService,
        public _switchHistory: AdminSwitchHistoryService
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
        this.searchSwitch = new FormControl('');  
        this.historyData = [];
    }

    ngOnInit(): void {
        this._activeRoute.params.forEach(params => {
            const getcustomerId = params['userId'];
            if (getcustomerId !== undefined) {
                this.customerId = getcustomerId;
            }
        });
        this._activeRoute.params.forEach(params =>{
            const getCustomerUid = params['customerId'];
            const pageOffset = params['PAGEOFFSET'];
            const customerPageOffset = params['CUSTOMERPAGEOFFSET'];
            if (!!getCustomerUid){
                this.customerUId =  getCustomerUid;
            }
            if (!!pageOffset){
                this.pageOffset = pageOffset;
            }
            if (!!customerPageOffset) {
                this.customerPageOffset = customerPageOffset;
            }
        });

        this.getSwitchHistory();
        this.getSuppliers();
        // this.searchSwitch.valueChanges
        //     .pipe(debounceTime(400))
        //     .subscribe(searchText => {
        //     this.historyData = FuseUtils.filterArrayByString(this.filterHistory, searchText);
        //   });
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }

    getSwitchHistory(): any {

        let toDate = undefined;
        if (!!this.toDate){
            const d = new Date(this.toDate);
            d.setHours(23, 59, 59);
            toDate = !!d ? d : toDate;
        }
        // let fromDate = undefined;
        // if (!!this.fromDate){
        //     const d = new Date(this.fromDate);
        //     d.setHours(15, 59, 59);
        //     toDate = !!d ? d : fromDate;
        // }
        const data = {
            customerId: this.customerId,
            toDate: toDate,
            fromDate: this.fromDate,
            currentPlan: this.currentPlan,  
            searchText: this.searchSwitch.value
        };
        this._switchHistory.getSwitchHistory(data).subscribe( response => {
            if (response.status_code == 0){
                this.customerDetails = response.data;
                this.historyData = response.data.SwitchHistoryList;
                    
                this.filterHistory = response.data.SwitchHistoryList;
            } else {
                this.historyData = [];
                this.filterHistory = [];
            }
        });
    }

    clearF() {
        this.fromDate = null;
        this.toDate = null;
        this.currentPlan = null;
        this.searchSwitch =  new FormControl('');
        const data = {
            customerId: this.customerId,
            toDate: this.toDate,
            fromDate: this.fromDate,
            currentPlan: this.currentPlan,
            searchText: this.searchSwitch.value
        };
        this._switchHistory.getSwitchHistory(data).subscribe( response => {
            if (response.status_code == 0){
                this.customerDetails = response.data;
                this.historyData = response.data.SwitchHistoryList;
                this.filterHistory = response.data.SwitchHistoryList;
            } else {
                this.historyData = [];
                this.filterHistory = [];
            }
        });
    }
    getSuppliers(): any {
        const data = {
            searchText : '',
            energyTypeId : null
        };
        this._supplierService.getSupplier(data).subscribe(
            response => {
              if (response.status_code === 200) {
                this.suppliers = response.data;
              } else {
                this.suppliers = [];
              }
            });
    }

}
