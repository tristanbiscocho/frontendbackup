import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as _ from "lodash";
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';
import { SupervisorFormDialogComponent } from '../partner-list/partner-profile.component';
import { AddSupervisorClass } from '../supervisor-list-classes';
import { SupervisorService } from '../supervisor-list.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { resolve } from 'path';
import Swal from 'sweetalert2';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
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
    selector: 'manage-supervisor-profile',
    templateUrl: './manage-supervisor-profile.component.html',
    styleUrls: ['./manage-supervisor-profile.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class SupervisorFormComponent implements OnInit {

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
    addSupervisor: FormGroup;
    addPartnerFormErrors: any;
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 20));
    phone_number: any;
    partnerList: any;
    selectedPartners: any[] = [];
    emailPattern: string | RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   // emailPattern: string | RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    hasNumber = /\d/;
    userId: any;
    supervisorDetail: any;
    confirmDialogRef: any;
    LocalSelectedData: any;
    myModel:any;
    datemask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public messageService: MessageService,
        public _activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        public _supervisorService: SupervisorService,
        public router: Router,
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
            ID: {},
            Comission: {}
        };

        this._activeRoute.params.forEach(params => {
            const pageOffset = params['OFFSET'];
            if (!!pageOffset) {
                this.pageOffset = pageOffset;
            }
            const userId = params['USERID'];
            if (!!userId) {
                this.userId = userId;

                this._superviseorService.getSupervisorDetail(this.userId).subscribe(
                    response => {
                        if (response.status_code === 0) {
                            
                            this.supervisorDetail = response.data;
                            
                            this.addSupervisor.patchValue(this.supervisorDetail);
                            this.phone_number = this.supervisorDetail.PhoneNo;
                            this.selectedPartners = this.supervisorDetail.Partners;
                        } else {
                            this.supervisorDetail = [];
                        }
                    });
            }

        });


    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }

    // Start OnInit function
    ngOnInit(): void {
        this.addSupervisor = this.formBuilder.group({
            ID: [''],
            Title: ['', Validators.required],
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            PhoneNo: [''],
            EmailId: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            AddressLine1: ['', Validators.required],
            AddressLine2: [''],
            City: ['', Validators.required],
            PostCode: ['', Validators.required],
            SortCode: ['', [Validators.required]],
            DOB: ['', Validators.required],
            ReferrerCode: [''],
            AccountNUmber: ['', Validators.required],
            Comission: ['', Validators.required]
        });
        this.getPartnerData();
        this.myModel= this.addSupervisor.controls['SortCode'].value;
    }

    getPartnerData(): any {
        this._supervisorService.getAllPartners().subscribe(
            response => {
                if (response.status_code === 0) {
                    this.partnerList = response.data;
                    
                    
                } else {
                    this.partnerList = [];
                }
            });
        }


    seletcPartner(): any {
        const data = {
            event: this.event,
            data : this.LocalSelectedData
        };
        this.dialogRef = this.dialog.open(SupervisorFormDialogComponent, {
            panelClass: 'partner-profile-form-dialog',
            data: {
                event: this.event,
                data: this.selectedPartners
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!!response){
                    
                    this.LocalSelectedData = response;
                for (let data of response) {
                    this.selectedPartners.push(data);
                }
                
            }
                
        });
    }

    // End onInit

    removePartnerById(i, Id): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = "Are you sure you want to remove this partner??";
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.selectedPartners.splice(i, 1);
                this._supervisorService.deletePartnerBtId(this.supervisorDetail.ID, Id).subscribe(data => {
                });
            }
            this.confirmDialogRef = null;
        });
    }

    removePartner(i): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = "Are you sure you want to remove this partner??";
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.LocalSelectedData.splice(i,1);
                this.selectedPartners.splice(i, 1);
            }
            this.confirmDialogRef = null;
        });

    }

    addSupervisorData(): any {
        if (!!this.selectedPartners) {
            if (this.selectedPartners.length != 0) {
                if (!!this.phone_number) {
                    let DOB = this.addSupervisor.controls['DOB'].value;
                    DOB = new Date(DOB).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
                    let addSupervisorData = new AddSupervisorClass();
                    Object.assign(addSupervisorData, this.addSupervisor.value);
                    addSupervisorData.DOB = DOB;
                    addSupervisorData.PhoneNo = this.phone_number;
                    addSupervisorData.PartnerIds = _.map(this.selectedPartners, "PartnerId");
                    const data = _.omit(addSupervisorData, ['ID']);
                    addSupervisorData.SortCode = this.addSupervisor.controls['SortCode'].value;
                    addSupervisorData.AccountNUmber = this.addSupervisor.controls['AccountNUmber'].value;
                    const SortCodearray = addSupervisorData.SortCode.split('-');
                    const array1 = SortCodearray[0];
                    const array2 = SortCodearray[1];
                    const array3 = SortCodearray[2];
                    if(array1  == "__"|| array2 == "__" || array3 == "__")
                    {
                      Swal.fire({
                        type: "error",
                        title: "Error",
                        text: 'Please enter valid sort code and account number'
                    });  
                    }
                    else if(addSupervisorData.AccountNUmber.toString().length < 8)
                    {
                      Swal.fire({
                        type: "error",
                        title: "Error",
                        text: 'Please enter valid sort code and account number'
                    });
                }
                else
                {
                    this._supervisorService.addSupervisor(data).subscribe(data => {
                        if (data.status_code == 200) {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Supervisor added successfully.' });
                            this.router.navigate(['/supervisor-list/' + this.pageOffset]);
                        }else if (data.status_code == 412){
                            Swal.fire({
                                type: 'warning',
                                title: 'Warning',
                                text: 'User is already exist.',
                            });
                         } else {
                            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in adding Supervisor.' });
                        }
                    }); 
                }   
            } else {
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please Enter Phone Number.' });
            }
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please select Partner.' });
        }

    }
    
    }
    editSupervisor(): any {
            if (!!this.selectedPartners) {
                if (this.selectedPartners.length != 0) {
                    if (!!this.phone_number) {
                        let DOB = this.addSupervisor.controls['DOB'].value;
                        DOB = new Date(DOB).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
                        let addSupervisorData = new AddSupervisorClass();
                        Object.assign(addSupervisorData, this.addSupervisor.value);
                        addSupervisorData.DOB = DOB;
                        addSupervisorData.PhoneNo = this.phone_number;
                        addSupervisorData.PartnerIds = _.map(this.selectedPartners, "Id");
                        addSupervisorData.PhoneNo = this.phone_number;
                        // addSupervisorData.PartnerIds = _.map(this.selectedPartners, "PartnerId");
                        const data = _.omit(addSupervisorData, ['ID']);
                        addSupervisorData.SortCode = this.addSupervisor.controls['SortCode'].value;
                        addSupervisorData.AccountNUmber = this.addSupervisor.controls['AccountNUmber'].value;
                        const SortCodearray = addSupervisorData.SortCode.split('-');
                        const array1 = SortCodearray[0];
                        const array2 = SortCodearray[1];
                        const array3 = SortCodearray[2];
                        if(array1  == "__"|| array2 == "__" || array3 == "__")
                        {
                          Swal.fire({
                            type: "error",
                            title: "Error",
                            text: 'Please enter valid sort code and account number'
                        });  
                        }
                        else if(addSupervisorData.AccountNUmber.toString().length < 8)
                        {
                          Swal.fire({
                            type: "error",
                            title: "Error",
                            text: 'Please enter valid sort code and account number'
                        });
                        }
                        else
                        {
                            this._supervisorService.editSupervisor(addSupervisorData).subscribe(data => {
                            
                                if (data.status_code == 200) {
                                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Supervisor edited successfully.' });
                                    this.router.navigate(['/supervisor-list/' + this.pageOffset]);
                                } else if (data.status_code == 412){
                                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'User is already exist.' });
                                } else {
                                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in edit Supervisor.' });
                                }
                            });
                        }
                       
                    } else {
                        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please Enter Phone Number.' });
                    }
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please select Partner.' });
                }
            } else {
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please select Partner.' });
            }
    
    }
}
