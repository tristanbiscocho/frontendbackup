import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { TypeOfHomeProfileFormDialogComponent } from './type-of-home-profile/type-of-home-profile.component';
import { systemenumService } from '../systemenumdata/systemenum.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AuthService } from 'app/main/services/auth';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';


@Component({
    selector: 'type-of-home',
    templateUrl: './type-of-home.component.html',
    styleUrls: ['./type-of-home.component.scss']
})
export class TypeOfHomeComponent implements OnInit {
    bills: any[];
    dialogRef: any;
    event: any = 0;
    typeOfHome: any[];
    confirmDialogRef: any;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        private dialog: MatDialog,
        public _sysService: systemenumService,
        public messageService: MessageService,
        public _authService: AuthService
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

    ngOnInit(): void {
        this.getTypeOfHouse();
    }
    // popup box
    addTypeOfHome(): any {
        this.dialogRef = this.dialog.open(TypeOfHomeProfileFormDialogComponent, {
            panelClass: 'type-of-home-profile-form-dialog',
            data: {
                event: this.event
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!!response) {

                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Types of home created successfully.' });
                    this.getTypeOfHouse();

                }

            });
    }
    edithome(row): any {
        this.dialogRef = this.dialog.open(TypeOfHomeProfileFormDialogComponent, {
            panelClass: 'type-of-home-profile-form-dialog',
            data: {
                event: this.event,
                data: row
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!!response) {

                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Types of home edited Successfully.' });
                    this.getTypeOfHouse();

                }

            });
    }

    getTypeOfHouse(): any {
        this._sysService.getallSystemenumdata().subscribe((result) => {
            if (result.Message == 'False') {
                this.typeOfHome = [];
            } else {
                const response = result;
                this.typeOfHome = response.filter(x => x.ListID == 2);
                localStorage.setItem("gelAllResourceData", JSON.stringify(result));
            }
        });

    }
    setValue(event): any {
        this.event = event;
    }

    deleteHome(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = "Are you sure want to remove record?";

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._sysService.Deletelistvalue(row.Id).then((result) => {
                    if (result) {
                        this.getTypeOfHouse();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Types of home deleted successfully.' });
                    } else {
                        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in delete types of home.' });

                    }
                    this.getTypeOfHouse();
                }, err => {
                });
            }
            this.confirmDialogRef = null;
        });

    }
}
