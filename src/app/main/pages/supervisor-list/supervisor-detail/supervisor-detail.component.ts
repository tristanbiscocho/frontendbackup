import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { SupGenInvoiceFormDialogComponent } from '../sup-generate-invoice/sup-generate-invoice.component';
import { SupervisorService } from '../supervisor-list.service';


@Component({
    selector: 'supervisor-detail',
    templateUrl: './supervisor-detail.component.html',
    styleUrls: ['./supervisor-detail.component.scss']
})
export class SupervisorDetailsComponent implements OnInit {
    bills: any[];
    dialogRef: any;

    // partner details
    partnerId: any;
    partnerDetails: any;
    partnersDetails: any;
    invoices: any;
    partnerOffset: any;
    pageOffset: any;
    Supervisor: any;
    invoice: any;
    getTabPosition: any;
    supervisorDetail: any;
    currentUser: any;
    superviosrId: any;
    invoiceDetails: any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public _activeRoute: ActivatedRoute,
        public messageService: MessageService,
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
        const currentuserdata = localStorage.getItem('UserDetail');
        if (!!currentuserdata){
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }
    }


    ngOnInit(): void {
        this._activeRoute.params.forEach(params => {
            // get suuplier id from route
            const getSuperviosrId = params['USERID'];
            const partnerOffset = params['OFFSET'];
            if (getSuperviosrId !== undefined) {
                this.superviosrId = getSuperviosrId;
                this.getPartnersById(this.superviosrId);
                const data = {
                    SupervisorId: this.superviosrId,
                    ToDate: null,
                    FromDate: null,
                    Status: null,
                    SearchText: null
                };
                this.getInvoiceLists(data);
            }
            if (partnerOffset !== undefined) {
                this.partnerOffset = partnerOffset;
            }
        });
        this.getSupervisorDetail();
    }


    onChange(event): any {
        this.pageOffset = event.offset;
    }

    setValue(events): any {
        this.getTabPosition = events;
    }

    addSupervisorDetail(): any {
        if (this.getTabPosition == 0){
        } else {
            
            const data = {
                partnerId       : this.supervisorDetail.ID,
                comission       : this.supervisorDetail.Comission,
                NoOfReferral    : 0,
                TotalCommission : 0,
            };
            this.dialogRef = this.dialog.open(SupGenInvoiceFormDialogComponent, {
                panelClass: 'sup-generate-invoice',
                data: {
                    events   :   'add',
                    details :   data
                }
            });
            this.dialogRef.afterClosed()
            .subscribe(response => {
              if (!!response) {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Invoice added successfully.'});
                const data = {
                    SupervisorId: this.superviosrId,
                    ToDate: null,
                    FromDate: null,
                    Status: null,
                    SearchText: null
                };
                this.getInvoiceLists(data);
              } else {
                  return;
              }
             
            });
        }
    }


    editInvoice(row): any {
        this.dialogRef = this.dialog.open(SupGenInvoiceFormDialogComponent, {
            panelClass: 'sup-generate-invoice',
            data: {
                events      :   'edit',
                details     :   row,
                comission   :   this.supervisorDetail.Comission,
                partnerId   :   this.supervisorDetail.ID,
            }
        });
        this.dialogRef.afterClosed()
        .subscribe(response => {
          if (!!response) {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Invoice updated successfully.'});
            const data = {
                SupervisorId: this.superviosrId,
                ToDate: null,
                FromDate: null,
                Status: null,
                SearchText: null
            };
            this.getInvoiceLists(data);
          } else {
              return;
          }
         
        });
    }


    getSupervisorDetail(): any {

        this._superviseorService.getSupervisorDetail(this.superviosrId).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.supervisorDetail = response.data;
                } else {
                    this.supervisorDetail =   [];
                }
            });
    }

    getPartnersById(id): any{
        this._superviseorService.getpartnerById(id).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.Supervisor = response.data;
                    for(let data of this.Supervisor){
                        data['total'] = data.CompletedReferralCount + data.FailReferralCount + data.PendingReferralCount;
                    }
                } else {
                    this.Supervisor =   [];
                }
            });
    }

    getInvoiceLists(data): any {
        this._superviseorService.getInvoiceLists(data).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.invoices = response.data;
                } else {
                    this.invoices =   [];
                }
            });
    }

    getInvoiceDetailbyInvoiceId(id): any {
        this._superviseorService.getInvoiceDetailbyInvoiceId(id).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.invoiceDetails = response.data;
                } else {
                    this.invoiceDetails =   [];
                }
            });
    }
}
