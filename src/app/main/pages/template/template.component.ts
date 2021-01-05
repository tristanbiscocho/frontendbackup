import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { WorkflowsService } from '../workflows/workflows.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
    selector: 'template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
    bills: any[];

    // tab data
    getTabValue: any = 0;
    templates: any;
    confirmDialogRef: any;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public router: Router,
        public _workflowService: WorkflowsService,
        public dialog: MatDialog,
        public messageService: MessageService
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

    }

    ngOnInit(): any {
        this.getTemplateList();
    }

    goToAddpage(): any {
        if (this.getTabValue == 0) {
            this.router.navigate(['/template-add']);
        } else {
            this.router.navigate(['/pages/add-workflow']);
        }
    }

    getTemplateList(): any {
        this._workflowService.getAllTemplatesData(0).subscribe(result => {
            if (result.Message == "False") {
                this.templates = [];
            } else {
                this.templates = result;
            }
        });
    }

    deleteTemplate(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = "Are you sure want to remove record?";
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {

                this._workflowService.deleteTemplate(row.ID).then((dataresult) => {
                    if (dataresult === false) {
                        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in delete the template.' });
                    }
                    else {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Template deleted successfully.' });
                        this.getTemplateList();
                    }
                });
            }
            this.confirmDialogRef = null;
        });

    }

    openreviewdetail(data): any{
        this.router.navigate(['/template-add/' + data.ID]);
    }

    setValue(events): any {
        this.getTabValue = events;
    }
}
