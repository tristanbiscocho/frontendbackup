import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder } from "@angular/forms";




@Component({
    selector: 'update-profile-form-dialog',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class updateProfileFormDialogComponent implements OnInit {

    dialogTitle: string;
    type: any;
    Sort_code: any;
    accountNumber: any;
    User_name: any;
    datemask = [/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/];
    myModel:any;
    constructor(
        public dialogRef: MatDialogRef<updateProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    ) {
        this.type = data.event;
        this.User_name = this.type.userNAme;
        this.Sort_code = this.type.sortCode;
        this.accountNumber = this.type.accountNumber; 
    }

    ngOnInit() {
    }

    printDialog(): any {
        const elemente = document.getElementById('InvoiceButton');
        const backButton = document.getElementById('InvoiceButton1');
        elemente.style.display = "none";
        backButton.style.display = "none";
        window.print();
        elemente.style.display = "inline";
        backButton.style.display = "inline";
    }
}
