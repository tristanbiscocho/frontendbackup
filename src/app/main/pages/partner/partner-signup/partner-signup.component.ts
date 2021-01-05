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
import Swal from "sweetalert2";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoaderService } from 'app/main/services/loader.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { RegisterService } from '../../Authentication/register/register.service';

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
    selector: 'partner-signup',
    templateUrl: './partner-signup.component.html',
    styleUrls: ['./partner-signup.component.scss'],
    animations: fuseAnimations
  
})

export class PartnerRegisterComponent implements OnInit {
    type: any;
    Titles =  [ 
        {'value': '1', 'name': 'Mr' },
        {'value': '2', 'name': 'Miss' },
        {'value': '3', 'name': 'Mrs' }
    ];

    // form group
    addPartner: FormGroup;
    email_add:any;
    addPartnerFormErrors: any;
    passwordExp: | string
    | RegExp = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
    emailPattern: string | RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    passwordRGEX: string | RegExp = "^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$";
    phone_number: any; 
    currentUser: any;
    IsDisable = false;
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
    myModel:any;
    IsEmail:any;
    IsPhone:any;
    showLoader: any;
    myvariable:any;
    minheight: any;
    datemask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    constructor(
        // public dialogRef: MatDialogRef<PartnerRegisterComponent>,
        // @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private changeDetectorRefs: ChangeDetectorRef,
        public _partnerSerivce: PartnerService,
        public messageService: MessageService,
        private _loaderService: LoaderService,
        private router:Router,
        private _fuseConfigService: FuseConfigService,
        public registerService: RegisterService
    ) {
      this._fuseConfigService.config = {
        layout: {
            navbar: {
                hidden: true
            },
            toolbar: {
                hidden: true
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
            ID: {}
          };
    }

    ngOnInit(): any {
  

      this._loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;
    });
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
                Password: ["", [Validators.required, Validators.pattern(this.passwordExp)]],                ID: ['']
                
              });
      
          this.addPartner.valueChanges.subscribe(() => {
            this.onAddPartnerFormValuesChanged();
          });
          this.changeDetectorRefs.detectChanges();
          
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

      validateEmail(): any {
        let email = this.email_add;
        let url = 'https://client.myemailverifier.com/clientarea/emailverifier/index.php/verifier/validate_single?email=' + email + '&apikey=GJ808512029499633198';
        let data;
        // jQuery.ajax({
        //     type: "GET",
        //     url: url,
        //     crossDomain: true,
        //     dataType: 'json',
        //     success: function (detail) {
        //         if (detail.data.Status == 'Invalid') {
        //             Swal.fire({
        //                 type: "error",
        //                 title: "Error",
        //                 text:
        //                     "Invalid Email address."
        //             });
        //             data = false;
        //         this.IsEmail = data;
                    
        //         } else {
        //            data = true;
        //         this.IsEmail = data;

        //         }
        //     }
        // });

        this.registerService.validateEmail(this.email_add).subscribe(data => {
            if(!!data) {
                let data1 = JSON.parse(data);
                if(data1.data.Status == 'Invalid'){
                                Swal.fire({
                                    type: "error",
                                    title: "Error",
                                    text:
                                        "Invalid Email address."
                                });
                                data = false;
                            this.IsEmail = data;
                                
                            } else {
                               data = true;
                            this.IsEmail = data;
            
                            }
            }
        });
    }

    
    validatePhone(): any {
        this.registerService.getPhoneNumber(this.phone_number).subscribe(data => {
            if (!!data) {
               let validate =  JSON.parse(data);
               if(!!validate.errors) {
                   Swal.fire({
                       type: "error",
                       title: "Error",
                       text:
                           "Invalid Phone number."
                   });
                   this.IsPhone = false;
               } else {
                   this.IsPhone = true;
               }
            }
       }, err => {
         });
       
       
    }
      savePartner(): any {
        let partner = new AddPartnerClass();
        Object.assign(partner, this.addPartner.value);
        partner.PhoneNo = this.phone_number;
        const data = _.omit(partner, ['ID']);
        partner.DOB = moment(partner.DOB).format("YYYY/MM/DD HH:mm:ss");
        data.DOB = partner.DOB;
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
            
          if(this.IsEmail == true && this.IsPhone == true)
          {
            this._partnerSerivce.signupPartner(data).subscribe(data => {
              if (data.status_code == 200) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Partner added successfully.' });
                  this.router.navigate(['/login']);
  
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
          else
          {
            Swal.fire({
                      type: "error",
                      title: "Error",
                      text:
                          "Please enter valid phone number and Email address."
                  });
          }
       
        }        
      }
      


    
}

