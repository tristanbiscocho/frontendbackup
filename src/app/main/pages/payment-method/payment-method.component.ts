import { PaymentMethodService } from "./payment-method.service";
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
    selector: "payment-method",
    templateUrl: "./payment-method.component.html",
    styleUrls: ["./payment-method.component.scss"],
})
export class PaymentMethodComponent implements OnInit {
    paymentMethod: any[] = [];
    filterSupplier: any[] = [];

    dialogRef: any;
    event: any = 0;
    searchPaymentMethod: FormControl;
    EnergyType: any;
    pageOffset: any = 0;
    confirmDialogRef: any;

    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        private _energyTypeService: PaymentMethodService,
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
        // search supplier on enter
        this.searchPaymentMethod = new FormControl("");
        const data = {
            searchText: "",
            energyTypeId: null,
        };
        this.getPaymentMethod();
    }

    ngOnInit(): void {
        // search ticket
        this.searchPaymentMethod.valueChanges
            .pipe(debounceTime(400))
            .subscribe((searchText) => {
                this.paymentMethod = FuseUtils.filterArrayByString(
                    this.filterSupplier,
                    searchText
                );
            });
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }

    getPaymentMethod(data?) {
        this._energyTypeService.getPaymentMethod().subscribe((res) => {
            this.paymentMethod = res;
            this.filterSupplier = res;
        });
    }

    filterSupp(): any {
        const data = {
            searchText: this.searchPaymentMethod.value,
            energyTypeId: this.EnergyType,
        };
        this.getPaymentMethod(data);
    }

    ClearFilter(): any {
        this.searchPaymentMethod = new FormControl("");
        this.EnergyType = null;
        const data = {
            searchText: "",
            energyTypeId: this.EnergyType,
        };
        this.getPaymentMethod(data);
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
                    detail: "Payment method created successfully.",
                });
                const data = {
                    searchText: "",
                    energyTypeId: null,
                };
                this.getPaymentMethod(data);
            }
        });
    }

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
                    detail: "Payment method updated successfully.",
                });
                const data = {
                    searchText: "",
                    energyTypeId: null,
                };
                this.getPaymentMethod(data);
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
                this._energyTypeService.deletePaymentMethod(row.Id).subscribe(
                    (response) => {
                        console.log(response);
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Payment method deleted successfully.",
                        });
                        const data = {
                            searchText: "",
                            energyTypeId: null,
                        };
                        this.getPaymentMethod(data);
                    },
                    (error) => {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in delete package.",
                        });
                    }
                );
            }
        });
    }

    setValue(event): any {
        this.event = event;
    }

    filterbyEnergyType(data): any {
        this.EnergyType = data.value;
    }
}
