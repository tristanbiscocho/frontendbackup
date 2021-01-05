import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "app/main/services/auth";
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
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
    selector     : 'enter-userpassword-form-dialog',
    templateUrl  : './enter-userpassword.component.html',
    styleUrls    : ['./enter-userpassword.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})

export class EnterPasswordFormDialogComponent implements OnInit
{
   
    dialogTitle: string;
    type: any;
    updatePasswordForm: FormGroup;
    updatePasswordFormErorrs: any;
    currentUser: any;
    constructor(
        public dialogRef: MatDialogRef<EnterPasswordFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public _authService: AuthService
    )
    {

        this.type = data.event;
        this.data = data.data;
        const currentuserdata = localStorage.getItem('UserDetail');
        if (!!currentuserdata){
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }

        this.updatePasswordFormErorrs  = {
            OldPassword: {}
        };

    }
    ngOnInit(): any
    {
        this.updatePasswordForm = this.formBuilder.group({
            OldPassword: ['', Validators.required]
        });

    }

    submit(): any{
            this.dialogRef.close(this.updatePasswordForm.value);
    }

  }
