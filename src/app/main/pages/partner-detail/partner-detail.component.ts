import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog } from '@angular/material';
import { AddPlanFormDialogComponent } from './add-plan/add-plan.component';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../supplier/supplier.service';
import { PartnerService } from '../partner/partner.service';
import { AdminComissionService } from '../admin-commission/admin-commission.service';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
    selector: 'partner-detail',
    templateUrl: './partner-detail.component.html',
    styleUrls: ['./partner-detail.component.scss']
})
export class PartnerDetailsComponent implements OnInit {
    bills: any[];
    dialogRef: any;

    // partner details
    partnerId: any;
    partnerDetails: any;
    partnersDetails: any;
    invoices: any;
    partnerOffset: any;
    pageOffset: any;
    IsSupervisor = false;
    currentUser: any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public _activeRoute: ActivatedRoute,
        public _partnerSerivce: PartnerService,
        public _adminComission: AdminComissionService,
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

    }


    ngOnInit(): void {
        this._activeRoute.params.forEach(params => {
            // get suuplier id from route
            const getPartnerId = params['PARTNERID'];
            const partnerOffset = params['PARTNEROFFSET'];
            const pageOffset = params['OFFSET'];
            if (getPartnerId !== undefined) {
                this.partnerId = getPartnerId;
            }
            if (partnerOffset !== undefined) {
                this.partnerOffset = partnerOffset;
            }
            if (pageOffset !== undefined) {
                this.pageOffset = pageOffset;
            }
            if (!!pageOffset && pageOffset == 'supervisor'){
                this.pageOffset = 0;
                this.IsSupervisor = true;
                const currentuserdata = localStorage.getItem('UserDetail');
                if (!!currentuserdata){
                    this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
                }
            }
        });
        this.getPartnerById(this.partnerId);
        this.getInvoiceData(this.partnerId);
    }

    addPlan(): any {
        const totalCommission = this.partnersDetails.ComissionPercentage * this.partnersDetails.NoOfReferralcount;
        const data = {
            partnerId       : this.partnerId,
            comission       : this.partnersDetails.ComissionPercentage,
            NoOfReferral    : this.partnersDetails.NoOfReferralcount,
            TotalCommission : totalCommission,
        };
        this.dialogRef = this.dialog.open(AddPlanFormDialogComponent, {
            panelClass: 'add-plan',
            data: {
                events   :   'add',
                details :   data
            }
        });
        this.dialogRef.afterClosed()
        .subscribe(response => {
          if (!!response) {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Invoice added successfully.'});
            this.getInvoiceData(this.partnerId);
          } else {
              return;
          }
         
        });
    }
    onChange(event): any {
        this.pageOffset = event.offset;
    }
    editInvoice(row): any {
        this.dialogRef = this.dialog.open(AddPlanFormDialogComponent, {
            panelClass: 'add-plan',
            data: {
                events       :   'edit',
                details     :   row,
                comission   :   this.partnersDetails.ComissionPercentage,
                partnerId   :   this.partnerId
            }
        });
        this.dialogRef.afterClosed()
        .subscribe(response => {
          if (!!response) {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Invoice updated successfully.'});
            this.getInvoiceData(this.partnerId);
          } else {
              return;
          }
         
        });
    }

    getPartnerById(id): any {
        this._partnerSerivce.getPartnerById(id).subscribe(
            response => {
              if (response.status_code === 200) {
                this.partnersDetails = response.data;
                
              } else {
                this.partnersDetails = null;
              }
            });
    }


    getInvoiceData(id): any {
        var data = {
            PartnerId: id,
            toDate: null,
            fromDate: null,
            status: null
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
