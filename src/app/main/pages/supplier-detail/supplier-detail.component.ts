import { Component, OnInit } from "@angular/core";

import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FuseConfigService } from "@fuse/services/config.service";
import { MatDialog } from "@angular/material";
import { AddPlanFormDialogComponent } from "./add-plan/add-plan.component";
import { ActivatedRoute } from "@angular/router";
import { SupplierService } from "../supplier/supplier.service";
import { MessageService } from "primeng/components/common/messageservice";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";

@Component({
    selector: "supplier-detail",
    templateUrl: "./supplier-detail.component.html",
    styleUrls: ["./supplier-detail.component.scss"],
})
export class SupplierDetailsComponent implements OnInit {
    bills: any[];
    dialogRef: any;

    // supplier details
    supplierId: any;
    supplierDetails: any;
    pageOffset: any;
    supplierOffset: any;
    confirmDialogRef: any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public _activeRoute: ActivatedRoute,
        private _supplierService: SupplierService,
        public messageService: MessageService
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
        this._activeRoute.params.forEach((params) => {
            // get suuplier id from route
            const getSupplierId = params["SupplierId"];
            const pageOffset = params["OFFSET"];
            const supplierOffset = params["SUPPLIEROFFSET"];
            if (!!pageOffset) {
                this.pageOffset = pageOffset;
            }
            if (!!supplierOffset) {
                this.supplierOffset = supplierOffset;
            }
            if (getSupplierId !== undefined) {
                this.supplierId = getSupplierId;

                // function declaration for get supplier details
                this.getSupplierDetails();
                // function declaration for get bill list
                this.getBillsList();
            }
        });
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }

    // function defination for get supplier details
    getSupplierDetails(): any {
        this._supplierService
            .getSupplierDetails(this.supplierId)
            .subscribe((response) => {
                if (response.status_code === 200) {
                    this.supplierDetails = response.data;
                } else {
                    this.supplierDetails = null;
                }
            });
    }

    // function defination for get supplier details
    getBillsList(): any {
        this._supplierService
            .getSupplierLists(this.supplierId)
            .subscribe((response) => {
                if (response.status_code === 200) {
                    this.bills = response.data;
                } else {
                    this.bills = null;
                }
            });
    }

    addPlan(): any {
        this.dialogRef = this.dialog.open(AddPlanFormDialogComponent, {
            panelClass: "add-plan",
            data: {
                event: event,
                supplierId: this.supplierId,
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!!response) {
                this.messageService.add({
                    severity: "success",
                    summary: "success",
                    detail: "Supplier plan created successfully.",
                });
                this.getBillsList();
            }
        });
    }

    editPlan(row): any {
        this.dialogRef = this.dialog.open(AddPlanFormDialogComponent, {
            panelClass: "add-plan",
            data: {
                event: event,
                supplierId: this.supplierId,
                details: row,
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!!response) {
                this.messageService.add({
                    severity: "success",
                    summary: "success",
                    detail: "Supplier plan edited successfully.",
                });
                this.getBillsList();
            }
        });
    }

    deletePlan(row: any) {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });

        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to remove record?";
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._supplierService
                    .deletePlan(row.Id)
                    .subscribe((response) => {
                        if (response.status_code === 200) {
                            this.messageService.add({
                                severity: "success",
                                summary: "Success",
                                detail: "Plan deleted successfully.",
                            });

                            this.getBillsList();
                        } else {
                            this.messageService.add({
                                severity: "warn",
                                summary: "Error",
                                detail: "Error in delete plan.",
                            });
                        }
                    });
            }
        });
    }
}
