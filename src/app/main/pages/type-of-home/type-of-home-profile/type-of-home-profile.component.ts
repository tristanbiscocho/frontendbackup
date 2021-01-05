import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { systemenumService } from '../../systemenumdata/systemenum.service';
import { TypeOfHouse } from '../../settings/settings-classes';
import { SettingsService } from '../../settings/settings.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/components/common/messageservice';



@Component({
    selector: 'type-of-home-profile-form-dialog',
    templateUrl: './type-of-home-profile.component.html',
    styleUrls: ['./type-of-home-profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TypeOfHomeProfileFormDialogComponent implements OnInit {

    dialogTitle: string;
    type: any;
    addTypeOfhomeForm: FormGroup;
    details: any;
    constructor(
        public dialogRef: MatDialogRef<TypeOfHomeProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public sysservice: SettingsService,
        public messageService: MessageService
    ) {
        this.type = data.event;
        this.details = data.data;
    }

    ngOnInit(): any {
        this.addTypeOfhomeForm = this.formBuilder.group({
            en: ['', [Validators.required]],
            type: [2],
            id: [''],
            parent: [],
            sequence: [''],
            IsActive: [false]
        });
        if (!!this.details) {
            this.addTypeOfhomeForm.controls['en'].setValue(this.details.Value);
            this.addTypeOfhomeForm.controls['id'].setValue(this.details.Id);
            this.addTypeOfhomeForm.controls['IsActive'].setValue(this.details.IsActive);
        }
    }

    saveHome(): any {
        const addTypeOfhome = new TypeOfHouse();
        Object.assign(addTypeOfhome, this.addTypeOfhomeForm.value);
        const data = _.omit(addTypeOfhome, ['id']);
        this.sysservice.AddSys_ListValue(data).subscribe((result) => {
            if (result.Message == 'False') {
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in adding types of home.' });
            } else {
                this.dialogRef.close({ data: result });
            }
        });

    }

    editHome(): any {
        const addTypeOfhome = new TypeOfHouse();
        Object.assign(addTypeOfhome, this.addTypeOfhomeForm.value);
        this.sysservice.EditSys_ListValue(addTypeOfhome).subscribe((result) => {
            if (result.Message == 'False') {
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in editing types of home.' });
            } else {
                this.dialogRef.close({ data: result });
            }
        });
    }
}
