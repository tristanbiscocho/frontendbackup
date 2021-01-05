import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer-list/customer-list.service';
import { AuthService } from 'app/main/services/auth';
import { FormControl } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { MessageService } from 'primeng/components/common/messageservice';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

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
    selector: 'admin-added-credits',
    templateUrl: './admin-added-credits.component.html',
    styleUrls: ['./admin-added-credits.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class AdminAddedCreditComponent implements OnInit
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
    isSIgnUpConfirm = 1;
    pageOffset: any;
    addCredits = new FormControl("");
    reason = new FormControl("");
    confirmDialogRef: any;
    currentUser: any;
    userId: any;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _activeRoute: ActivatedRoute,
        public _customerService: CustomerService,
        public _authService: AuthService,
        public _messageService: MessageService,
        public dialog: MatDialog
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

    ngOnInit(): any {
        const sys_data = this._authService.getAllResourceData();
        this.statusData = sys_data.filter(x => x.ListID == 11);
        this._activeRoute.params.forEach(params => {
            const getcustomerId = params['CUSTOMERID'];
            const pageOffset = params['CUSTOMEROFFSET'];
            const userId = params['USERID'];
            if (getcustomerId !== undefined) {
                this.customerId = getcustomerId;
                this.getRefferalCount(this.customerId , userId);
            }
            if (!!pageOffset) {
                this.pageOffset = pageOffset;
            }
            if(!!userId) {
                this.userId = userId;
            }
        });
    }

    getRefferalCount(id, userId): any {
       
        this._customerService.getCredit(id, userId).subscribe( (response: any) => {
            if (response.status_code == 0) {
                this.refferals = response.data;
            } else {
                this.refferals = [];
            }
        });
    }

    removeCredit(id): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = "Are you sure?";
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {

        this._customerService.removeCredit(id).subscribe( (response: any) => {
            if (response.status_code == 200) {
                this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Credit deleted successfully.' });
               this.getRefferalCount(this.customerId, this.userId);
            } else {
                this._messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in delete the credit.' });
            }
        });
    }
});
}

addCredit(): any {
    const data  = {
        Reason: this.reason.value,
        Status: '1',
        Amount: this.addCredits.value,
        CreatedOn: null,
        CustomerId: this.customerId,
    };  
    this._customerService.AddCustomerCredit(data).subscribe( (response: any) => {
        if (response.status_code == 200){
            this._messageService.add({ severity: 'success', summary: 'success', detail: 'Credit added successfully.' });
            this.getRefferalCount(this.customerId, this.userId);
            this.reason = new FormControl('');
            this.addCredits = new FormControl('');
        } else {
            this._messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in adding credit successfully.' });
        }
    }); 
}


}
