import { FuseConfigService } from "@fuse/services/config.service";

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ManageProfileFormDialogComponent } from "./edit-profile/edit-profile.component";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import { MessageService } from "primeng/components/common/messageservice";
import { ActivatedRoute } from "@angular/router";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { TariffTypeService } from "./tariff-type.service";
import { debounceTime } from "rxjs/operators";
import { FuseUtils } from "@fuse/utils";

@Component({
    selector: "tariff-type",
    templateUrl: "./tariff-type.component.html",
    styleUrls: ["./tariff-type.component.scss"],
})
export class TariffTypeComponent implements OnInit {
    tariffTypes: any[] = [];
    filterTariffTypes: any[] = [];

    dialogRef: any;
    event: any = 0;
    searchTariffType: FormControl;
    EnergyType: any;
    pageOffset: any = 0;
    confirmDialogRef: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        private _energyTypeService: TariffTypeService,
        public messageService: MessageService,
        public _activeRoute: ActivatedRoute
    ) {
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
        this.searchTariffType = new FormControl("");
    }

    ngOnInit() {
        this.getTariffType();
        this.searchTariffType.valueChanges
            .pipe(debounceTime(400))
            .subscribe((searchText) => {
                this.tariffTypes = FuseUtils.filterArrayByString(
                    this.filterTariffTypes,
                    searchText
                );
            });
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }

    async getTariffType() {
        this._energyTypeService.getTariffType().subscribe(
            (response) => {
                this.tariffTypes = response;
                this.filterTariffTypes = response;
            },
            (error) => {
                this.tariffTypes = [];
                this.filterTariffTypes = [];
            }
        );
    }

    addTariffType(): any {
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
                    detail: "Tariff type created successfully.",
                });
                const data = {
                    searchText: "",
                    energyTypeId: null,
                };
                this.getTariffType();
            }
        });
    }

    editTariffType(row): any {
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
                    detail: "Tariff type updated successfully.",
                });
                this.getTariffType();
            }
        });
    }

    deleteTariffType(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });
        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to remove record?";
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._energyTypeService.deleteTariffType(row.Id).subscribe(
                    (response) => {
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Tariff type deleted successfully.",
                        });
                        this.getTariffType();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in tariff type.",
                        });
                    }
                );
            }
        });
    }
}
