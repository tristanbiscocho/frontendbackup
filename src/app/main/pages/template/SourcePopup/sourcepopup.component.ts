import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Routes, Router, RouterModule, ActivatedRoute, Params } from "@angular/router";
import { AuthService } from '../../../services/auth';

@Component({
    selector: 'template-sourcecode-dialog',
    templateUrl: './sourcepopup.component.html',
    styleUrls: ['./sourcepopup.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateSourceCodeFormDialogComponent implements OnInit
{
   // event: CalendarEvent;
    
    dialogTitle: string;
    Patientlist: string;
    sourceForm: FormGroup;
    currentLanguage: any;
    resourceData: any;
    constructor(
        public dialogRef: MatDialogRef<TemplateSourceCodeFormDialogComponent>,
        private formBuilder: FormBuilder,
        public router: Router,
        public authService: AuthService
    ){
        const currentlang = localStorage.getItem('lang');
        this.currentLanguage = currentlang == 'en' ? 0 : 1;
        const data = localStorage.getItem('resources');
        if (data != undefined && data != null) {
            this.resourceData = JSON.parse(localStorage.getItem('resources'));
        }
        if (this.resourceData == undefined) {
            // this.authService.GetAllSystemEnumData().then((result) => {

            //     if (result != "False") {
            //         this.resourceData = result;
            //         this.authService.Allresources = result;
            //     }
            //     else {
            //         this.resourceData = [];
            //     }
            // });
        }
    }
    getLanguage(key): any {

        if (key != null && key != undefined) {
            if (this.resourceData != undefined) {
                for (const English of this.resourceData) {

                    if (English.Res_Key == key && English.LanguageCode == this.currentLanguage) {
                        const keyvalue = English.Value;
                        return keyvalue;
                    }
                }
            }
        }
    }
    ngOnInit(): any
    {
        this.sourceForm = this.formBuilder.group({
            code: ['', [Validators.required]],
        });
        this.sourceForm.valueChanges.subscribe(() => {
            // this.onLoginFormValuesChanged();
        });
    }

}
