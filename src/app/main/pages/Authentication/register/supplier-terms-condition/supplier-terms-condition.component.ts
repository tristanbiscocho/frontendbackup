import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmPaymentComponent } from '../confirm-payment/confirm-payment.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { RegisterService } from '../register.service';
import * as _ from "lodash";
import { LoaderService } from 'app/main/services/loader.service';
@Component({
  selector: 'supplier-terms-condition',
  templateUrl: './supplier-terms-condition.component.html',
  styleUrls: ['./supplier-terms-condition.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupplierTermsConditionModalComponent implements OnInit {
 Data: any;
 dialogRef1: any;
 IsIBAN: any = false; secondFormGroup: FormGroup;
 datemask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
//  IBANMask = '[a-zA-Z]{2}\-[0-9]{2}\-[a-zA-Z0-9]{4}\-[0-9]{7}\-([a-zA-Z0-9]?){0,16}'
 isChecked: any;
 PostCode: any;
 Address = [];
 selectedValue: any;
 postCode:
 | string
 | RegExp | any = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
 Isaddress: any = false;
 IsComName: any = false;
 showLoader: any;
 IsAutoFill: any = false;
 energy: any;
  constructor(public dialogRef: MatDialogRef<SupplierTermsConditionModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialog: MatDialog,   private _formBuilder: FormBuilder
    ) 
    {
       
    }

    ngOnInit(): any {
    }
}
