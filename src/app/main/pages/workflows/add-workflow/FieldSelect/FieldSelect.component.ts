import { Component, Inject, ViewChild, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'FieldSelect',
    templateUrl: './FieldSelect.component.html',
    styleUrls: ['./FieldSelect.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FieldSelectDialogComponent implements OnInit{


    action: string;
    disabled = true;
    dialogTitle: string;
    resourceForm: FormGroup;
    resourceFormErrors: any;
    FileUp: any;
    file: any;    emailsdata: any;
    typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
    constructor(
        public dialogRef: MatDialogRef<FieldSelectDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    ) {
        this.action = data.action;
        this.emailsdata = data.FieldData;

        if (this.action === 'edit') {

        }
        else {
            this.dialogTitle = 'Select Field';
            this.disabled = false;

        }

        this.resourceFormErrors = {
            field: {}
        };
    }
    changeListener($event): void {
        // this.readThis($event.target);
    }
    // readThis(inputValue: any): void {
    // let file: File = inputValue.files[0];
    //     let myReader: FileReader = new FileReader();
    //     this.file = file.name;
    //     myReader.onloadend = (e) => {

    //         let image = myReader.result;
    //         this.FileUp = image;
    //         // this.authService.binarydata = null;
    //         // this.authService.binarydata = image;


    //     let files = image;
    //     };
    //     myReader.readAsDataURL(file);
    // }
    ngOnInit() {
        this.resourceForm = this.formBuilder.group({
            field: ['', Validators.required]
        });
        this.resourceForm.valueChanges.subscribe(() => {
        });

    }


}
