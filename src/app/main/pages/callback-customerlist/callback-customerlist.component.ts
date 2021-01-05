import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthService } from 'app/main/services/auth';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService } from '../partner/partner.service';
import { MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MessageService } from 'primeng/components/common/messageservice';
import * as _ from 'lodash'; // tslint:disable-next-line:no-duplicate-imports



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
    selector: 'callback-customerlist',
    templateUrl: './callback-customerlist.component.html',
    styleUrls: ['./callback-customerlist.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class CallbackCustomerList implements OnInit {
    tableOffset = 0;
    customers:any=[];
    confirmDialogRef: any;
    currentUser:any;
    finalDate:any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _authService: AuthService,
        public _activeRoute: ActivatedRoute,
        public _partnerService:PartnerService,
        public dialog: MatDialog,
        public _messageService:MessageService,
        private router:Router
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
        this.getCustomerdata();
       
        
    }

    onChangePage(event): any {
        this.tableOffset = event.offset;
    }

    editCustomer(row)
    {
        this.router.navigate(['/partner-add-customer'], { queryParams: { status: 1 } });
        let editcustomer = row;
        localStorage.setItem("customerdata",JSON.stringify(editcustomer))
        
        
    }
    
    getCustomerdata()
    {
        
        const data = {
            status:2,
            
        };
        this._partnerService.getCustomer(data,this.currentUser.Id).subscribe(
            response => {
                if (response.status_code === 200) {
                    this.customers = response.data;                    
                    this.customers = _.orderBy(this.customers,['Id'],['desc']);
                } else {
                    this.customers = [];
                }
            });
    }
    
    deleteCustomer(row):any{
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = "Are you sure you want to remove record?";
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
        this._partnerService.deleteCustomer(row.Id).subscribe(
            response => {
                if (response.status_code === 200) {
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer deleted successfully.' });
                     this.getCustomerdata();
                    
                } else {
                    this._messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in delete customer.' });
                }
            });
        }
        });

    }
}
