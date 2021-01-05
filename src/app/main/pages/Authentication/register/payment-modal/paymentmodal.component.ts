import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmPaymentComponent } from '../confirm-payment/confirm-payment.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { RegisterService } from '../register.service';
import * as _ from "lodash";
import { LoaderService } from 'app/main/services/loader.service';
@Component({
  selector: 'app-paymentmodal',
  templateUrl: './paymentmodal.component.html',
  styleUrls: ['./paymentmodal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentModalComponent implements OnInit {
 Data: any;
 dialogRef1: any;
 IsIBAN: any = false; secondFormGroup: FormGroup;
 datemask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
//  IBANMask = '[a-zA-Z]{2}\-[0-9]{2}\-[a-zA-Z0-9]{4}\-[0-9]{7}\-([a-zA-Z0-9]?){0,16}'
 isChecked : any;
 PostCode: any;
 Address = [
    { value: "0", "#cdata-section": "Enter address manually" }
];
 selectedValue: any;
 postCode:
 | string
 | RegExp | any = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
 Isaddress: any = false;
 IsComName: any = false;
 showLoader: any;
 IsAutoFill: any = false;
  constructor(public dialogRef: MatDialogRef<PaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialog: MatDialog,   private _formBuilder: FormBuilder,
    private registerService: RegisterService,
    private _loaderService: LoaderService
    ) 
    {
      this.Data = data.data;  
    }

    ngOnInit(): any {
         
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        this.secondFormGroup = this._formBuilder.group({
            fName: ["", Validators.required],
            lname: ["", Validators.required],
            email: ["", Validators.required],
            pcode: ["", [Validators.required, Validators.pattern(this.postCode)]],
            // PaymentDetails_AccountName: ["", Validators.required],
            accountNumber: [""],
            sCode: [''],
            IBAN_num: [''],
            BillingAddress1: [''],
            BillingAddress2: [''],
            BillingCity: [''],
            BillingPostcode: [''],
            Country: [''],
            comName: ['']
        });

        this.secondFormGroup.patchValue(this.Data);
        this.PostCode = this.Data.pcode;
        this.validatePostalcode();
        
    }

    chnagedata(event): any {
        this.isChecked = event.checked;
    }
    confirmDetails(): any {
        debugger
        let data2 = this.secondFormGroup.value;
        this.registerService.validateEmail(data2.email).subscribe(data => {
            if (!!data) {
                let data1 = JSON.parse(data);
                if (data1.data.Status == 'Invalid') {
                    Swal.fire({
                        type: "error",
                        title: "Error",
                        text:
                            "Invalid Email address."
                    });
                } else {
                    this.dialogRef.close({event: data2});
                }
            }
        });
       
       
      
    }
    IsCompanyName(): any {
        this.IsComName = !this.IsComName;
        if (this.IsComName == false) {
            this.secondFormGroup.get("comName").setValue("");
            this.secondFormGroup.controls['fName'].setValidators(Validators.required); 
            this.secondFormGroup.controls['lname'].setValidators(Validators.required);
            this.secondFormGroup.controls['comName'].clearValidators(); 
            this.secondFormGroup.controls["comName"].updateValueAndValidity();
            this.secondFormGroup.controls["fName"].updateValueAndValidity();
            this.secondFormGroup.controls["lname"].updateValueAndValidity();
        } else {
            this.secondFormGroup.get("fName").setValue("");
            this.secondFormGroup.get("lname").setValue("");
            this.secondFormGroup.controls['comName'].setValidators(Validators.required);
            this.secondFormGroup.controls['fName'].clearValidators(); 
            this.secondFormGroup.controls['lname'].clearValidators();
            this.secondFormGroup.controls["fName"].updateValueAndValidity();
            this.secondFormGroup.controls["comName"].updateValueAndValidity();
            this.secondFormGroup.controls["lname"].updateValueAndValidity();
        }
    }

  
    ibanNumber(): any {
        this.IsIBAN = !this.IsIBAN;
        if (this.IsIBAN == true) {
            this.secondFormGroup.get("sCode").setValue("");
            this.secondFormGroup.get("accountNumber").setValue("");
            this.secondFormGroup.controls['IBAN_num'].setValidators(Validators.required);
            this.secondFormGroup.controls['sCode'].clearValidators(); 
            this.secondFormGroup.controls['accountNumber'].clearValidators();
            this.secondFormGroup.controls["IBAN_num"].updateValueAndValidity();
            this.secondFormGroup.controls["sCode"].updateValueAndValidity();
            this.secondFormGroup.controls["accountNumber"].updateValueAndValidity();

        } else {
            this.secondFormGroup.get("IBAN_num").setValue("");
            this.secondFormGroup.controls['sCode'].setValidators(Validators.required); 
            this.secondFormGroup.controls['accountNumber'].setValidators(Validators.required);
            this.secondFormGroup.controls['IBAN_num'].clearValidators(); 
            this.secondFormGroup.controls["sCode"].updateValueAndValidity();
            this.secondFormGroup.controls["IBAN_num"].updateValueAndValidity();
            this.secondFormGroup.controls["accountNumber"].updateValueAndValidity();


        }
    }

    addressManuallay(): any {
        this.Isaddress = !this.Isaddress;
        this.secondFormGroup.get("pcode").setValue('');
        this.secondFormGroup.get("BillingAddress1").setValue('');
        this.secondFormGroup.get("BillingAddress2").setValue('');
        this.secondFormGroup.get("BillingCity").setValue('');
        this.secondFormGroup.get("BillingPostcode").setValue('');
        this.selectedValue = null;
        this.Data.selectedValue = null;
        this.PostCode = '';
    }
    validatePostalcode(): any {
        
        const postCode = this.PostCode;
        this.secondFormGroup.get("BillingPostcode").setValue(this.PostCode);
        this.registerService.validatepostalcode(this.PostCode).subscribe(data => {
            if(!!this.Data.selectedValue) {
                
                 this.getAddress();
                this.selectedValue = this.Data.selectedValue;
                this.Isaddress = this.Data.IsManual;
                const fullAdd = this.selectedValue;
                const string3 = fullAdd;
                let splitcity1 = string3.split(',');
                // splitcity1 = splitcity1[0].split(',');
                let sp = splitcity1[0] + ',' + splitcity1[1];
                this.secondFormGroup.get("BillingAddress1").setValue(sp);
                this.secondFormGroup.get("BillingCity").setValue(splitcity1[splitcity1.length-2]);
                if (this.Isaddress == true){
                    this.secondFormGroup.get("BillingAddress2").setValue(splitcity1[3]);
                }  else {
                    if(splitcity1.length != 4) {
                    this.secondFormGroup.get("BillingAddress2").setValue(splitcity1[2]);
                    }

                }
            } else {
                if (data.data == "Postal Code is Valid.") {
                    this.getAddress();
                    
                  
                }
                else {
                    Swal.fire({
                        type: "error",
                        title: "Error",
                        text:
                            "Invalid Post Code."
                    });
                   
                }
            }
           
        })
    }

    selectAddress(event): any {
        if (event.value) {
          
            const fullAdd = event.value;
            const string3 = fullAdd;
            let splitcity1 = string3.split(',');
            let sp = splitcity1[0] + ',' + splitcity1[1];
            this.secondFormGroup.get("BillingAddress1").setValue(sp);
            if (splitcity1.length != 4){
            this.secondFormGroup.get("BillingAddress2").setValue(splitcity1[2]);
            }
            this.secondFormGroup.get("BillingCity").setValue(splitcity1[splitcity1.length-2]);
        }
    }
    getAddress(): any {
        
        this.Address = [
            { value: "0", "#cdata-section": "Enter address manually" }
        ];
        if (this.secondFormGroup.controls["pcode"].valid) {
            const postCode = this.secondFormGroup.controls["pcode"].value;
            // let code = postCode.split(' ');
            // code = code[0] + '+' + code[1];
            
            this.registerService.gerAddress(postCode).subscribe(data => {
                let response = data;
                if (data.status_code == 0) {
                    response = JSON.parse(data.data);
                }
                if (!!response) {
                    const address = response.Response;

                    for (let data of address.Address) {
                        this.Address.push(data);
                    }
                    // $('#mat-select1').click();

                }
            });
           
        } else {
            this.Address = [
                { value: "0", "#cdata-section": "Enter address manually" }
            ];
            this.selectAddress(event);

        }
    }


    directDebit(): any {
        Swal.fire({
            text: 'Something went wrong!',
            confirmButtonText: "Done",
            customClass: 'swal-wide',
            imageUrl: 'https://pay-sandbox.gocardless.com/assets/pay/direct-debit-logo-footer-a08f0c6fd7a18cd20cd9bbc8aa7cf9ca3acff3f2d52c152ddf26c2c6874f9deb.svg',
            imageWidth: 150,
            html:
            '<p style="text-align: center"><b>Direct Debit Guarantee </b></p> <br>' +
            'The Guarantee is offered by all banks and building societies that accept instructions to pay Direct Debits.</br><br/> ' +
            'If there are any changes to the amount, date or frequency of your Direct Debit, Monti Trade BVBA t/a Lowest Tariff will notify you 7 working days in advance of your account being debited or as otherwise agreed. If you request Monti Trade BVBA t/a Lowest Tariff to collect a payment, confirmation of the amount and date will be given to you at the time of the request.</br><br> ' +
            'If an error is made in the payment of your Direct Debit, by Monti Trade BVBA t/a Lowest Tariff or your bank or building society, you are entitled to a full and immediate refund of the amount paid from your bank or building society.</br><br>' + 
            'If you receive a refund you are not entitled to, you must pay it back when Monti Trade BVBA t/a Lowest Tariff asks you to.<br/><br>' +
            'You can cancel a Direct Debit at any time by simply contacting your bank or building society. Written confirmation may be required. Please also notify Monti Trade BVBA t/a Lowest Tariff.'
          });
    }
}
