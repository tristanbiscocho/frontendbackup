import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { systemenumService } from '../systemenum.service'

//import { Contact } from '../contact.model';

@Component({
    selector: 'fuse-contacts-contact-form-dialog',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FuseContactsContactFormDialogComponent implements OnInit {
    event: CalendarEvent;
    cityFormErrors: any;
    dialogTitle: string;
    savecityForm: FormGroup;
    action: any;
    isnew: string;
    rows = [];
    selected = [];
    temp = [];
    AllState: any;
    ID: string;
    en: string;
    fr: string;
    type: string;
    typeid: string;
    parentval: any;
    public regions: any;
    public systemenum: any;
    public Name: any;
    public FrenchName: any;
    hideid: boolean = true;
    public systemenumdata: any;
    public isparentshow: boolean = false;
    alldata: any;
    currentLanguage: any;
    resourceData: any;
    sequenceVal: any;
    sequence: any;
    // contact: Contact;

    constructor(
        public dialogRef: MatDialogRef<FuseContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private emenumservice: systemenumService

    ) {
        var lan = localStorage.getItem('lang');
        if (lan == null) {
            localStorage.setItem('lang', 'en');
        }
        var currentlang = localStorage.getItem('lang');
        this.currentLanguage = currentlang == 'en' ? 0 : 1;
        var Rdata = localStorage.getItem('resources');
        if (Rdata != undefined && Rdata != null) {
            this.resourceData = JSON.parse(localStorage.getItem('resources'));
        }
        if (this.resourceData == undefined) {

            this.emenumservice.GetAllResourceValue().subscribe((result) => {
                if (result != "False") {
                    localStorage.setItem('resources', JSON.stringify(result));
                    this.resourceData = result;
                    this.emenumservice.AllResources = result;

                }
                else {
                    this.resourceData = [];

                }
            });
        }
        this.hideid = true;
        this.dialogTitle = "Add Data";
        this.action = data.action;
        this.isnew = data.action;
        this.alldata = data.alldata;
        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Data';
            this.getchangeparenttype(data.listdata.ListID)
            this.systemenum = data.listdata.ListID;
            this.Name = data.listdata.Value
            this.parentval = data.listdata.ParentId
            //this.FrenchName = data.listdata.FrenchName;           
            this.ID = data.listdata.Id;
            this.sequenceVal = data.listdata.Seq;
        }
        else {
            this.dialogTitle = 'Add Data';
            // this.contact = new Contact({});
        }

        this.cityFormErrors = {
            en: {},
            fr: {},
            type: {},
            parent: {},
            sequence: {}

        };



        this.emenumservice.GetSys_ListData().subscribe((data) => {
            this.systemenumdata = data;

        });
    }
    getLanguage(key) {
        if (key != null && key != undefined) {
            if (this.resourceData != undefined) {
                for (let English of this.resourceData) {
                    if (English.Res_Key == key && English.LanguageCode == this.currentLanguage) {
                        var keyvalue = English.Value
                        return keyvalue;
                    }
                }
            }
        }
    }
    AllowState(systemenum) {
        if (systemenum == 1011) {
            this.isparentshow = true;
            if (this.alldata != undefined) {
                var FilteredData = [];
                for (let data of this.alldata) {
                    if (data.ListID == 1)
                        FilteredData.push(data);
                }
                this.AllState = FilteredData;
            }
        }
        else {
            this.isparentshow = false;
        }
    }
    getchangeparenttype(id) {

        if (id == 1011) {
            this.isparentshow = true;
            if (this.alldata != undefined) {
                var FilteredData = [];
                for (let data of this.alldata) {
                    if (data.ListID == 1)
                        FilteredData.push(data);
                }
                this.AllState = FilteredData;
                
            }
        }
        else {
            this.isparentshow = false;
        }


    }
    ngOnInit() {
        this.savecityForm = this.formBuilder.group({
            en: ['', [Validators.required]],
            type: ['', [Validators.required]],
            //fr: ['', [Validators.required]],     
            id: [''],
            parent: [],
            sequence: [''],
            IsActive: [true]
        });

        this.savecityForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }


    onLoginFormValuesChanged() {
        for (const field in this.cityFormErrors) {
            if (!this.cityFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.cityFormErrors[field] = {};

            // Get the control
            const control = this.savecityForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.cityFormErrors[field] = control.errors;
            }
        }
    }
    createContactForm() {
        //return this.formBuilder.group({
        //    id      : [this.contact.id],
        //    name    : [this.contact.name],
        //    lastName: [this.contact.lastName],
        //    avatar  : [this.contact.avatar],
        //    nickname: [this.contact.nickname],
        //    company : [this.contact.company],
        //    jobTitle: [this.contact.jobTitle],
        //    email   : [this.contact.email],
        //    phone   : [this.contact.phone],
        //    address : [this.contact.address],
        //    birthday: [this.contact.birthday],
        //    notes   : [this.contact.notes]
        //});
    }

}
