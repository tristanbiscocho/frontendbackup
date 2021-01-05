import { Component, ViewEncapsulation, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormControlName } from '@angular/forms';
import { AddPartnerClass } from '../partner-classes';
import * as _ from 'lodash';
import { PartnerService } from '../partner.service';
import { MessageService } from 'primeng/components/common/messageservice';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import Swal from "sweetalert2";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoaderService } from 'app/main/services/loader.service';
import { DialerURL } from 'app/main/services/config';
import { rocketChatAdminID } from 'app/main/services/config';
import { rocketChatPassID } from 'app/main/services/config';
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
    selector: 'partner-profile-form-dialog',
    templateUrl: './partner-profile.component.html',
    styleUrls: ['./partner-profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})

export class ManageProfileFormDialogComponent implements OnInit {

    dialogTitle: string;
    type: any;
    Titles =  [ 
        {'value': '1', 'name': 'Mr' },
        {'value': '2', 'name': 'Miss' },
        {'value': '3', 'name': 'Mrs' }
    ];

    rocketchatData: any;
    // form group
    addPartner: FormGroup;
    addPartnerFormErrors: any;
    emailPattern: string | RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    passwordRGEX: string | RegExp = "^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$";
    phone_number: any; 
    partnerDetail: any;
    currentUser: any;
    IsDisable = false;
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
    myModel:any;
    showLoader: any;
    datemask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    constructor(
        public dialogRef: MatDialogRef<ManageProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private changeDetectorRefs: ChangeDetectorRef,
        public _partnerSerivce: PartnerService,
        public messageService: MessageService,
        private _loaderService: LoaderService
    ) {
      this.partnerDetail = data.data;
        if(this.partnerDetail != null)
        {
          this.myModel = this.partnerDetail.SortCode;
        }
        
     
        // console.log("gdg",this.myModel);
        
        
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
          if (!!currentuserdata){
              this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
          }
         if (this.currentUser.RoleType == 1 || this.currentUser.RoleType == 5){
            this.IsDisable = false;
         } else {
             this.IsDisable = true;
         }
    }

    ngOnInit(): any {
      this._loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;
    });
        if (this.currentUser.RoleType == 1 || this.currentUser.RoleType == 5){
            this.addPartner = this.formBuilder.group({
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
                AccountNUmber: ['[]', [Validators.required]],
                ComissionPercentage: ['', Validators.required],
                ID: ['']
                
              });
        } else {
            
            this.addPartner = this.formBuilder.group({
                Title: [{value: '', disabled: this.IsDisable}, Validators.required],
                FirstName: [{value: '', disabled: this.IsDisable}, Validators.required],
                LastName: [{value: '', disabled: this.IsDisable}, Validators.required],
                PhoneNo: [''],
                EmailId: [{value: '', disabled: this.IsDisable}, [Validators.required, Validators.pattern(this.emailPattern)]],
                AddressLine1: ['', Validators.required],
                AddressLine2: [''],
                City: ['', Validators.required],
                PostCode: ['', Validators.required],
                SortCode: ['',Validators.required],
                DOB: [{value: '', disabled: this.IsDisable}, Validators.required],
                AccountNUmber: ['[]',Validators.required],
                ComissionPercentage: ['', Validators.required],
                ID: ['']
                
              });
        }
          if (!!this.partnerDetail){
            this.addPartner.patchValue(this.partnerDetail);
            this.phone_number = this.partnerDetail.PhoneNo;
          }
          this.addPartner.valueChanges.subscribe(() => {
            this.onAddPartnerFormValuesChanged();
          });
          this.changeDetectorRefs.detectChanges();
          if(this.addPartner.controls['SortCode'].value != null)
          {
            this.myModel= this.addPartner.controls['SortCode'].value;
          }
          
          
          
          
    }

    onAddPartnerFormValuesChanged(): any  {

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

      savePartner(): any {
        let partner = new AddPartnerClass();
        Object.assign(partner, this.addPartner.value);
        partner.PhoneNo = this.phone_number;
        let data1 = _.omit(partner, ['ID']);
        data1 = _.omit(data1, ['Rocketchatuserid']);
        partner.DOB = moment(partner.DOB).format("YYYY/MM/DD HH:mm:ss");
        data1.DOB = partner.DOB;
        partner.SortCode = this.addPartner.controls['SortCode'].value;
      //  partner.SortCode = this.myModel;
        partner.AccountNUmber = this.addPartner.controls['AccountNUmber'].value;
        const SortCodearray = partner.SortCode.split('-');
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
        else if(partner.AccountNUmber.toString().length < 8)
        {
          Swal.fire({
            type: "error",
            title: "Error",
            text: 'Please enter valid sort code and account number'
        });
        }
        else
        {
         
          this._partnerSerivce.addPartner(data1).subscribe(
            response => {
             if (response.status_code === 200){
        
                jQuery.ajax({
                  type: "POST",
                  url: DialerURL,
                  dataType: 'json',
                  data : {
                          goUser: 'goAPI',
                          goPass: 'KToB93bzjGd1RS4mDqePJ6Uk.jgNRrK',
                          responsetype: 'json',
                          session_user: 'goadmin',
                          goAction: 'goAddUser',
                          user: data1.FirstName+response.data.Id,
                          pass: atob(response.data.Password),
                          full_name: data1.FirstName,
                          active: 'Y',
                          user_group: 'AGENTS',
                          user_level: 8,
                      },
                  success: function (res) {
                     
                    
                  }
              });

              
              // const loginRocketChat = {"user": "bhavik.thakkar@techextensor.com", "password": "Smiley@9277"};
              const loginRocketChat = {"user": rocketChatAdminID, "password": rocketChatPassID};
              let authdata;
              this._partnerSerivce.LogintoRocketChat(loginRocketChat).subscribe(
                (loginAuthResponse: any) => {
                  debugger
                  if (!!loginAuthResponse) {
                    authdata = JSON.parse(loginAuthResponse);
                    if (authdata.status == 'success') {
                      const headerData = {
                        'Token' : authdata.data.authToken,
                        'Id' : authdata.data.userId
                      };

                      const userData =  {
                       
                        "username": data1.FirstName + response.data.Id,
                        "password": atob(response.data.Password),
                        "name": data1.FirstName,
                        "email": response.data.EmailId
                     
                    };
                      this._partnerSerivce.createRocketChatUser(userData, headerData).subscribe(
                        (rocketchatUser: any) => {
                          debugger
                          this.partnerDetail = response.data;
                          const rocketChat = JSON.parse(rocketchatUser);
                          this.rocketchatData = rocketChat;
                       
                          this._partnerSerivce.UpdatePartnerRocketChat(this.partnerDetail.Id, this.rocketchatData.user._id).subscribe(
                            (updateIdRes: any) => {
                                debugger
                                this.dialogRef.close({data: updateIdRes});
                            });
                        });
                    }
                   
                  }
                });


             
             } else {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'Email already exist.'});
             }
            },
            error => {
              }
            );
        }
        //partner.DOB = new Date(partner.DOB).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        
      }


      editPartner(): any {
        const partner = new AddPartnerClass();
        Object.assign(partner, this.addPartner.value);

        if(this.addPartner.valid)
        {
          if (this.currentUser.RoleType == 3 || this.currentUser.RoleType == 6){
            partner.ID = this.partnerDetail.Id;
         } 
         partner.Title = this.addPartner.controls['Title'].value;
         partner.FirstName = this.addPartner.controls['FirstName'].value;
         partner.LastName = this.addPartner.controls['LastName'].value;
         partner.EmailId = this.addPartner.controls['EmailId'].value;
         partner.DOB = this.addPartner.controls['DOB'].value;
         partner.DOB = new Date(partner.DOB).toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
          partner.PhoneNo = this.phone_number;
         
         //partner.SortCode = this.addPartner.controls['SortCode'].value;
         partner.SortCode = this.myModel;
        //  partner.RocketChatUserID = this.rocketchatData.user._id;
          partner.AccountNUmber = this.addPartner.controls['AccountNUmber'].value;
          const SortCodearray = partner.SortCode.split('-');
          const array1 = SortCodearray[0];
          const array2 = SortCodearray[1];
          const array3 = SortCodearray[2];
          const value =""
          if(array1  == "__"|| array2 == "__" || array3 == "__")
          {
            Swal.fire({
              type: "error",
              title: "Error",
              text: 'Please enter valid sort code and account number'
          });  
          }
          else if(partner.AccountNUmber.toString().length < 8)
          {
            Swal.fire({
              type: "error",
              title: "Error",
              text: 'Please enter valid sort code and account number'
          });
          }
          else
          {
            this._partnerSerivce.updatePartner(partner).subscribe(
              response => {
               if (response.status_code === 200){
                  
                  this.dialogRef.close({data: response});
               } else {
                  this.messageService.add({severity: 'warn', summary: 'Error', detail: 'Email already exist.'});
               }
              },
              error => {
                }
              );
          }
        }
    
       
      }
}

