import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { WorkflowsService } from '../workflows/workflows.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateSourceCodeFormDialogComponent } from '../template/SourcePopup/sourcepopup.component';
import { MatDialog } from '@angular/material';


@Component({
    selector: 'template-add',
    templateUrl: './template-add.component.html',
    styleUrls: ['./template-add.component.scss']
})
export class TemplateAddComponent implements OnInit {
    bills: any[];
    objects: any;
    objectsFields: any;
    firstFormGroup: FormGroup;

    Name: any;
    Objval: any;
    Type: any;
    searchInput;
    Patient: any;
    removable = true;
    selectable = true;
    htmlContent: any;

    currentUser: any;
    dialogRef: any;
    templateid: any;
    TemplateData: any;

    removepatientListtag(patientListtags: any): void {
        const index = this.objectsFields.indexOf(patientListtags);

        if (index >= 0) {
            this.objectsFields.splice(index, 1);
        }
    }

    onchip(patientListtags: any): any {
        const index = this.objectsFields.indexOf(patientListtags);
        const ExistingContent = this.htmlContent;
        this.htmlContent = ExistingContent + "[" + patientListtags.FieldID + "]";
    }
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _workflowService: WorkflowsService,
        public formBuilder: FormBuilder,
        public router: Router,
        public dialog: MatDialog,
        public route: ActivatedRoute
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: false
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.searchInput = new FormControl('');
        const currentuserdata = localStorage.getItem('UserDetail');
        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }
    }

    ngOnInit(): any {

        this.route.params
            .forEach((params) => {
                var data = (params['ID']);
                if (data != undefined) {
                    this.templateid = JSON.parse(params['ID']);

                    this._workflowService.GetTemplateByID(this.templateid).then((result) => {
                        this.TemplateData = result;
                        if (this.TemplateData != undefined) {
                            this.Name = this.TemplateData.Name;
                            this.Type = this.TemplateData.Type;
                            this.Objval = this.TemplateData.Event;
                            this.htmlContent = this.TemplateData.MailContent;
                            this.getModuledata();
                            const objdata = {
                                value: this.TemplateData.Event
                            };
                            this.getobjectfeild(objdata);
                        }
                    });
                }
            });

        this.getModuledata();
        this.firstFormGroup = this.formBuilder.group({
            type: ['', Validators.required],
            object: ['', Validators.required],
            name: ['', Validators.required]
        });

        this.searchInput.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchText => {
                this.objectsFields = FuseUtils.filterArrayByString(this.objectsFields, searchText);
            });
    }

    getModuledata(): any {
        this._workflowService.GetAllObjectData().subscribe(result => {
            if (result.Message == "False") {
                this.objects = [];
            } else {
                this.objects = result;
            }
        });
    }

    getobjectfeild(event): any {
        const data = event.value;
        this._workflowService.getObjectFeild(data).subscribe(result => {
            if (result.Message == "False") {
                this.objectsFields = [];
            } else {
                this.objectsFields = result;
            }
        });
    }


    saveTemplate(): any {

        const Data =
        {
            Name: this.Name,
            Type: this.Type,
            Event: this.Objval,
            MailContent: this.htmlContent,
            CreateBy: this.currentUser.CustomerId,
            OrgId: '',
            CurrentLanguage: 1
        };
        this._workflowService.AddTemplate(Data).subscribe((result) => {
            this.router.navigate(['/template']);
        });


    }


    opendialog(): any {
        this.dialogRef = this.dialog.open(TemplateSourceCodeFormDialogComponent, {
            panelClass: 'template-sourcecode-dialog',
            data: {
                action: 'new'
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                const data = response.value.code;
                this.htmlContent = response.value.code;
            });
    }

    editTemplate(): any {
        const Data =
        {
            Name: this.Name,
            Type: this.Type,
            Event: this.Objval,
            MailContent: this.htmlContent,
            CreateBy: this.currentUser.CustomerId,
            OrgId: '',
            CurrentLanguage: 1,
            ID: this.templateid,
            ResKey: this.TemplateData.ResKey
        };
        this._workflowService.EditTemplate(Data).subscribe((result) => {
            this.router.navigate(['template']);
        });
    }
}
