import { Component, ViewEncapsulation, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormControlName } from '@angular/forms';
import * as _ from 'lodash';
import { MessageService } from 'primeng/components/common/messageservice';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { SupervisorService } from '../../supervisor-list/supervisor-list.service';
import { AddSupervisorClass } from '../../supervisor-list/supervisor-list-classes';
import { LoaderService } from 'app/main/services/loader.service';

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
    selector: 'edit-sponsor-form-dialog',
    templateUrl: './edit-sponsor.component.html',
    styleUrls: ['./edit-sponsor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})

export class SponsorProfileFormDialogComponent implements OnInit {

    dialogTitle: string;
    type: any;
    // form group
    addPartner: FormGroup;
    addPartnerFormErrors: any;
    emailPattern: string | RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    passwordRGEX: string | RegExp = "^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$";
    phone_number: any;
    partnerDetail: any;
    currentUser: any;
    IsDisable = false;
    showLoader:any;
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
    constructor(
        public dialogRef: MatDialogRef<SponsorProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private changeDetectorRefs: ChangeDetectorRef,
        public _supervisorService: SupervisorService,
        public messageService: MessageService,
        public _loaderService:LoaderService
    ) {

        this.partnerDetail = data.data;
        this.addPartnerFormErrors = {
            Title: {},
            FirstName: {},
            LastName: {},
            PhoneNo: {},
            EmailId: {},
            AddressLine1: {},
            AddressLine2: {},
            City: {},
            PostCode: {},
            SortCode: {},
            DOB: {},
            AccountNUmber: {},
            ComissionPercentage: {},
            ID: {}
        };
        const currentuserdata = localStorage.getItem('UserDetail');
        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }
        if (this.currentUser.RoleType == 1 || this.currentUser.RoleType == 5) {
            this.IsDisable = false;
        } else {
            this.IsDisable = true;
        }
    }

    ngOnInit(): any {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        this.addPartner = this.formBuilder.group({
            Title: [{ value: '', disabled: this.IsDisable }, Validators.required],
            FirstName: [{ value: '', disabled: this.IsDisable }, Validators.required],
            LastName: [{ value: '', disabled: this.IsDisable }, Validators.required],
            PhoneNo: [''],
            EmailId: [{ value: '', disabled: this.IsDisable }, [Validators.required, Validators.pattern(this.emailPattern)]],
            AddressLine1: ['', Validators.required],
            AddressLine2: [''],
            City: ['', Validators.required],
            PostCode: ['', Validators.required],
            SortCode: [''],
            DOB: [{ value: '', disabled: this.IsDisable }, Validators.required],
            AccountNUmber: [''],
            Comission: ['', Validators.required],
            ID: ['']
        });

        if (!!this.partnerDetail) {
            this.addPartner.patchValue(this.partnerDetail);
            this.phone_number = this.partnerDetail.PhoneNo;
        }
        this.addPartner.valueChanges.subscribe(() => {
            this.onAddPartnerFormValuesChanged();
        });
        this.changeDetectorRefs.detectChanges();

    }

    onAddPartnerFormValuesChanged(): any {
        for (const field in this.addPartnerFormErrors) {
            if (!this.addPartnerFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.addPartnerFormErrors[field] = {};

            // Get the control
            const control = this.addPartner.get(field);

            if (control && control.dirty && !control.valid) {
                this.addPartnerFormErrors[field] = control.errors;
            }
        }
    }

    editPartner(): any {
    
        const partner = new AddSupervisorClass();
        Object.assign(partner, this.addPartner.value);
        if(this.addPartner.valid)
        {
            partner.Title = this.addPartner.controls['Title'].value;
            partner.FirstName = this.addPartner.controls['FirstName'].value;
            partner.LastName = this.addPartner.controls['LastName'].value;
            partner.EmailId = this.addPartner.controls['EmailId'].value;
            partner.DOB = this.addPartner.controls['DOB'].value;
            partner.PartnerIds = this.partnerDetail.PartnerIds;
            partner.DOB = new Date(partner.DOB).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
            partner.PhoneNo = this.phone_number;
            this._supervisorService.editSupervisor(partner).subscribe(
                response => {
                    if (response.status_code === 200) {
    
                        this.dialogRef.close({ data: response });
                    } else {
                        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Email already exist.' });
                    }
                },
                error => {
                }
            );
        }
      
    }
}

