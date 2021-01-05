import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import * as _ from "lodash";
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute } from '@angular/router';
import { SupervisorService } from '../supervisor-list.service';
@Component({
    selector: 'invoice-list',
    templateUrl: './invoice-list.component.html',
    styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit{
    
    // partners
    Supervisor: any[];
    filterBySupervisor: any[];

    // var for add or edit partners
    dialogRef: any;
    event: any = 0;

    // search from list
    searchPartner: FormControl;
    minheight: any;
    pageOffset: any;
    toDate: any;
    fromDate: any;
    chooseStatus: any;
    searchUser: any;
    invoices: any;
    currentUser: any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public messageService: MessageService,
        public _activeRoute: ActivatedRoute,
        public _superviseorService: SupervisorService
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

        this._activeRoute.params.forEach(params => {
            const pageOffset = params['OFFSET'];
            if (!!pageOffset){
                this.pageOffset = pageOffset;
            }
        });

        this.searchUser =  new FormControl('');
        const currentuserdata = localStorage.getItem('UserDetail');
        if (!!currentuserdata){
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }
  
    // Start OnInit function
    ngOnInit(): void {

        this.getInvoiceLists();
      

      }
      // End onInit

      getInvoiceLists(): any {
          
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
            SupervisorId: this.currentUser.CustomerId,
            ToDate: ToDate,
            FromDate: FromDate,
            Status:this.chooseStatus,
            SearchText: this.searchUser.value
        };
        this._superviseorService.getInvoiceLists(data).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.invoices = response.data;
                } else {
                    this.invoices =   [];
                }
            });
    }


    ClearInvoiceLists(): any {
        this.fromDate = null;
        this.toDate = null;
        this.chooseStatus = null;
        this.searchUser =  new FormControl('');
        const data = {
            SupervisorId: this.currentUser.CustomerId,
            ToDate: this.toDate,
            FromDate: this.fromDate,
            Status: this.chooseStatus,
            SearchText: this.searchUser.value
        };
        this._superviseorService.getInvoiceLists(data).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.invoices = response.data;
                } else {
                    this.invoices =   [];
                }
            });
    }
 

}
