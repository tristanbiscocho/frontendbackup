import { Component, ViewEncapsulation, OnInit, Inject, DebugElement } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormControlName } from '@angular/forms';
import { AddPartnerPlan, GetReferralCount } from '../../partner/partner-classes';
import * as _ from 'lodash';
import { PartnerService } from '../../partner/partner.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { LoaderService } from 'app/main/services/loader.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { SupervisorService } from '../supervisor-list.service';
import { AddSupervisorInvoiceClass } from '../supervisor-list-classes';
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
    selector: 'sup-generate-invoice',
    templateUrl: './sup-generate-invoice.component.html',
    styleUrls: ['./sup-generate-invoice.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})

export class SupGenInvoiceFormDialogComponent implements OnInit {

    dialogTitle: string;
    type: any;
    addInvoiceForm: FormGroup;
    addInvoiceFromErrors: any;
    partnerID: any;
    details: any;
    events: any;
    StartDate: any;
    EndDate: any;
    noofRefrence: any;
    pID: any;
    endMinValue: any;
    startMaxDateValue: any;
    showLoader: any;
    endMaxValue: any = new Date();
    IsZero: any = false;
    constructor(
        public dialogRef: MatDialogRef<SupGenInvoiceFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public _partnerSerivce: PartnerService,
        public messageService: MessageService,
        private _loaderService: LoaderService,
        public _supervisorService: SupervisorService
    ) {
        this.startMaxDateValue = new Date();
        this.details = data.details;
        this.events = data.events;
        if (this.events == 'edit') {
            this.details.comission = data.comission;
            this.partnerID = data.partnerId;
        }
        this.addInvoiceFromErrors = {
            PartnerId: {},
            StartDate: {},
            EndDate: {},
            TotalCommission: {},
            NoOfReferral: {},
            Status: {},
            TransactionId: {},
            TransactionDate: {}
        };
    }

    ngOnInit(): any {


        if (this.events == 'edit') {
            this.addInvoiceForm = this.formBuilder.group({
                SupervisorId: [this.partnerID],
                StartDate: [{ value: this.details.StartDate, disabled: true }],
                EndDate: [{ value: this.details.EndDate, disabled: true }, Validators.required],
                TotalCommission: [this.details.TotalCommission],
                NoOfReferral: [this.details.NoOfReferral],
                Status: [2],
                NoOfPartner: [''],
                TransactionId: ['', Validators.required],
                TransactionDate: ['', Validators.required],
                ID: [this.details.ID]
            });
        } else {
            this.addInvoiceForm = this.formBuilder.group({
                SupervisorId: [this.details.partnerId],
                StartDate: ['', Validators.required],
                EndDate: ['', Validators.required],
                TotalCommission: [this.details.TotalCommission],
                NoOfReferral: [this.details.NoOfReferral],
                NoOfPartner: [''],
                Status: [1],
                TransactionId: [],
                TransactionDate: [],
                ID: []
            });
        }

        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }

    addInvoice(): any {

        const partnerInvoice = new AddSupervisorInvoiceClass();
        Object.assign(partnerInvoice, this.addInvoiceForm.value);
        const data = _.omit(partnerInvoice, ['ID']);
        data.StartDate = new Date(data.StartDate).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        data.EndDate = new Date(data.EndDate).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        this._supervisorService.addInvoice(data).subscribe(
            response => {
                if (response.status_code === 200) {
                    this.dialogRef.close({ data: response });
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in adding invoice.' });
                }
            },
            error => {
            }
        );
    }

    editInvoice(): any {
        const partnerInvoice = new AddSupervisorInvoiceClass();
        Object.assign(partnerInvoice, this.addInvoiceForm.value);
        partnerInvoice.StartDate = this.addInvoiceForm.controls['StartDate'].value;
        partnerInvoice.EndDate = this.addInvoiceForm.controls['EndDate'].value;
        partnerInvoice.TransactionDate = new Date(partnerInvoice.TransactionDate).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        this._supervisorService.updateInvoice(partnerInvoice).subscribe(
            response => {
                if (response.status_code === 200) {
                    this.dialogRef.close({ data: response });
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in editing invoice.' });
                }
            },
            error => {
            }
        );
    }


    StartEvent(a, event): any {
        
        this.StartDate = event.value;
        this.EndDate = new Date();
        this.endMinValue = this.StartDate;
        this.StartDate = new Date(this.StartDate).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        this.EndDate = new Date(this.EndDate).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        if (this.events == 'edit') {
            this.pID = this.partnerID;
        } else {
            this.pID = this.details.partnerId;
        }
        const data = {
            SupervisorId: this.pID,
            StartDate: this.StartDate,
            EndDate: this.EndDate
        };
        this._supervisorService.getReffralCount(data).subscribe(
            response => {
                if (response.status_code == 0) {
                    this.details.NoOfReferral = response.data;
                    this.details.TotalCommission = this.details.NoOfReferral * this.details.comission;
                    this.addInvoiceForm.controls['NoOfReferral'].setValue(this.details.NoOfReferral);
                    this.addInvoiceForm.controls['TotalCommission'].setValue(this.details.TotalCommission);
                    if (this.details.TotalCommission != 0) {
                        this.IsZero = true;
                    } else {
                        this.IsZero = false;
                    }
                }
            },
            error => {
            }
        );

    }

    endEvent(a, event): any {
        
        this.EndDate = event.value;
        if (this.events == 'edit') {
            this.pID = this.partnerID;
        } else {
            this.pID = this.details.partnerId;
        }
        this.StartDate = new Date(this.StartDate).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        this.EndDate = new Date(this.EndDate).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        
        // this.EndDate = new Date(this.EndDate).getHours() + 6;
        this.EndDate = new Date(new Date(this.EndDate).setHours(new Date(this.EndDate).getHours() + 12));
        this.EndDate = new Date(this.EndDate).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        
        const data = {
            SupervisorId: this.pID,
            StartDate: this.StartDate,
            EndDate: this.EndDate
        };

        this._supervisorService.getReffralCount(data).subscribe(
            response => {
                if (response.status_code == 0) {
                    this.details.NoOfReferral = response.data;
                    this.details.TotalCommission = this.details.NoOfReferral * this.details.comission;
                    this.addInvoiceForm.controls['NoOfReferral'].setValue(this.details.NoOfReferral);
                    this.addInvoiceForm.controls['TotalCommission'].setValue(this.details.TotalCommission);
                    if (this.details.TotalCommission != 0) {
                        this.IsZero = true;
                    } else {
                        this.IsZero = false;
                    }
                }
            },
            error => {
            }
        );
    }
}
