import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";
import { SupplierClass } from "../supplier-classes";
import { SupplierService } from "../supplier.service";
import * as _ from "lodash";
import { LoaderService } from "app/main/services/loader.service";

@Component({
    selector: "edit-profile-form-dialog",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ManageProfileFormDialogComponent implements OnInit {
    dialogTitle: string;
    type: any;
    supplierForm: FormGroup;
    supplierFormErrors: any;
    supplierDetails: any;
    isRanked = false;
    showLoader: any;
    constructor(
        public dialogRef: MatDialogRef<ManageProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        public _suuplierSerivce: SupplierService,
        public _loaderService: LoaderService
    ) {
        this.supplierDetails = data.data;
        this.supplierFormErrors = {
            EnergyTypeID: {},
            PaymentTypeId: {},
            Status: {},
            Name: {},
            Rank: {},
        };
    }

    ngOnInit(): any {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        this.supplierForm = this.formBuilder.group({
            Name: ["", Validators.required],
            EnergyTypeID: [1, Validators.required],
            Status: [1, Validators.required],
            Rank: [""],
            ID: [""],
            IsCanUsedForSwitch: [""],
        });
        if (!!this.supplierDetails) {
            this.supplierForm.patchValue(this.supplierDetails);
            this.isRanked = this.supplierDetails.IsCanUsedForSwitch;
        }
    }
    IsChecked(event): any {
        if (event.checked == true) {
            this.isRanked = true;
            this.supplierForm.controls["Rank"].setValue("");
        } else {
            this.supplierForm.controls["Rank"].setValue("");

            this.isRanked = false;
        }
    }
    saveSupplier(): any {
        debugger;
        const supplier = new SupplierClass();
        Object.assign(supplier, this.supplierForm.value);
        const data = _.omit(supplier, ["ID"]);
        if (supplier.IsCanUsedForSwitch == true) {
            if (!!supplier.Rank) {
                debugger;
                this._suuplierSerivce.addSupplier(data).subscribe(
                    (response) => {
                        console.log(response);
                        if (response) {
                            this.dialogRef.close({ data: response });
                        } else {
                            this.messageService.add({
                                severity: "warn",
                                summary: "Error",
                                detail: "Error in adding supplier.",
                            });
                        }
                    },
                    (error) => {}
                );
            } else {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Please enter rank.",
                });
            }
        } else {
            this._suuplierSerivce.addSupplier(data).subscribe(
                (response) => {
                    console.log(response);
                    if (response) {
                        this.dialogRef.close({ data: response });
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in adding supplier.",
                        });
                    }
                },
                (error) => {}
            );
        }
    }

    editSupplier(): any {
        const supplier = new SupplierClass();
        Object.assign(supplier, this.supplierForm.value);
        if (supplier.IsCanUsedForSwitch == true) {
            if (!!supplier.Rank) {
                this._suuplierSerivce.editSupplier(supplier).subscribe(
                    (response) => {
                        if (response) {
                            this.dialogRef.close({ data: response });
                        } else {
                            this.messageService.add({
                                severity: "warn",
                                summary: "Error",
                                detail: "Error in adding supplier.",
                            });
                        }
                    },
                    (error) => {}
                );
            } else {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Please enter rank.",
                });
            }
        } else {
            this._suuplierSerivce.editSupplier(supplier).subscribe(
                (response) => {
                    if (response) {
                        this.dialogRef.close({ data: response });
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in adding supplier.",
                        });
                    }
                },
                (error) => {}
            );
        }
    }
}
