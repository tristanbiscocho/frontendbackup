import { EnergySupplierService } from "./energy-supplier.service";
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
import { debounceTime } from "rxjs/operators";
import { FuseUtils } from "@fuse/utils";

@Component({
    selector: "energy-supplier",
    templateUrl: "./energy-supplier.component.html",
    styleUrls: ["./energy-supplier.component.scss"],
})
export class EnergySupplierComponent implements OnInit {
    suppliers: any[] = [];
    filterSupplier: any[] = [];

    dialogRef: any;
    event: any = 0;
    searchSupplier: FormControl;
    pageOffset: any = 0;
    confirmDialogRef: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        private _energyTypeService: EnergySupplierService,
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
    }

    ngOnInit(): void {
        this.getSupplier();
        this.searchSupplier.valueChanges
            .pipe(debounceTime(400))
            .subscribe((searchText) => {
                this.suppliers = FuseUtils.filterArrayByString(
                    this.filterSupplier,
                    searchText
                );
            });
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }

    // Get suuplier detail from api
    getSupplier(): any {
        this._energyTypeService.getEnergySupplier().subscribe(
            (response) => {
                this.suppliers = response;
                this.filterSupplier = response;
            },
            (error) => {
                this.suppliers = [];
                this.filterSupplier = [];
            }
        );
    }

    addEnergySupplier(): any {
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
                    detail: "Energy Supplier created successfully.",
                });
                this.getSupplier();
            }
        });
    }

    // edit supplier detail
    editSupplier(row): any {
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
                    detail: "Energy Supplier Updated successfully.",
                });
                this.getSupplier();
            }
        });
    }

    deleteSupplier(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });

        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to remove record?";

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._energyTypeService.deleteEnergySupplier(row.Id).subscribe(
                    (response) => {
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Energy Supplier deleted successfully.",
                        });
                        this.getSupplier();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in delete energy supplier.",
                        });
                    }
                );
            }
        });
    }
}
