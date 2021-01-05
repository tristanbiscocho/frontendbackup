import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";

import { FuseConfigService } from "@fuse/services/config.service";

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ManageProfileFormDialogComponent } from "./edit-profile/edit-profile.component";
import { SettingsService } from "../settings/settings.service";
import { MessageService } from "primeng/components/common/messageservice";
import { AuthService } from "app/main/services/auth";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { FuseUtils } from "@fuse/utils";

@Component({
    selector: "settings-package",
    templateUrl: "./settings-package.component.html",
    styleUrls: ["./settings-package.component.scss"],
})
export class SettingsPackageComponent implements OnInit {
    customers: any[];

    dialogRef: any;
    event: any = 0;
    packages: any[];
    getAllresourceData: any;
    familyMember: any;
    typeOfHome: any;
    confirmDialogRef: any;
    searchPackage: any;
    filterPackage: any[];
    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public _settingSerivce: SettingsService,
        public messageService: MessageService,
        public _authService: AuthService
    ) {
        this.searchPackage = new FormControl("");
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: false,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    }

    ngOnInit(): any {
        this.getPackages();
        this.getAllresourceData = this._authService.getAllResourceData();
        this.familyMember = this.getAllresourceData.filter(
            (x) => x.ListID == 4
        );
        // this.noOfRooms = this.getAllresourceData.filter(x => x.ListID == 5);
        this.typeOfHome = this.getAllresourceData.filter((x) => x.ListID == 2);
        this.searchPackage.valueChanges
            .pipe(debounceTime(400))
            .subscribe((searchText) => {
                // this.packages = FuseUtils.filterArrayByString(this.filterPackage, searchText);
            });
    }

    addReadingMeter(): any {
        this.dialogRef = this.dialog.open(ManageProfileFormDialogComponent, {
            panelClass: "edit-profile-form-dialog",
            data: {
                event: this.event,
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!!response) {
                this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Package created successfully.",
                });
                this.getPackages();
            }
        });
    }

    getPackages(): any {
        this._settingSerivce.getPackageList().subscribe((response) => {
            if (response) {
                this.packages = response;
                for (let data of this.packages) {
                    if (!!data.TypeOfHouse) {
                        data.TypeOfHouse = this.typeOfHome.find((x) => {
                            if (x.Id == data.TypeOfHouse) {
                                return x.Value;
                            }
                        });
                        data.TypeOfHouse = data.TypeOfHouse.Value;
                    }
                    if (!!data.FamilyMembers) {
                        data.FamilyMembers = this.familyMember.find((x) => {
                            if (x.Id == data.FamilyMembers) {
                                return x.Value;
                            }
                        });
                        data.FamilyMembers = data.FamilyMembers.Value;
                    }
                }
                this.filterPackage = this.packages;
            } else {
                this.packages = [];
            }
        });
    }

    editPackage(row): any {
        debugger;
        if (row.Status == "True") {
            row.Status = 1;
        } else {
            row.Status = 0;
        }
        if (row.PeakOffPeakCheck == "True") {
            row.PeakOffPeakCheck = true;
        } else {
            row.PeakOffPeakCheck = false;
        }
        // row.TypeOfEnergy=parseInt(row.TypeOfEnergy);
        this.dialogRef = this.dialog.open(ManageProfileFormDialogComponent, {
            panelClass: "edit-profile-form-dialog",
            data: {
                event: this.event,
                data: row,
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!!response) {
                this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Package edited successfully.",
                });
            }
            this.getPackages();
        });
    }
    deletePackage(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });

        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to remove record?";

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._settingSerivce
                    .deletePackage(row.Id)
                    .subscribe((response) => {
                        if (response) {
                            this.messageService.add({
                                severity: "success",
                                summary: "Success",
                                detail: "Package deleted successfully.",
                            });
                            this.getPackages();
                        } else {
                            this.messageService.add({
                                severity: "warn",
                                summary: "Error",
                                detail: "Error in delete package.",
                            });
                        }
                    });
            }
        });
    }
    setValue(event): any {
        this.event = event;
    }
}
