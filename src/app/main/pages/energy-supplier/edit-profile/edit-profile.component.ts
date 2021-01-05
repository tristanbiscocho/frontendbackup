import { EnergySupplierClass } from "./../energy-supplier-classes";
import { EnergySupplierService } from "./../energy-supplier.service";
import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";
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
        public _energyTypeSerivce: EnergySupplierService,
        public _loaderService: LoaderService
    ) {
        this.supplierDetails = data.data;
        this.supplierFormErrors = {
            Name: {},
        };
    }

    ngOnInit(): any {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        this.supplierForm = this.formBuilder.group({
            Name: ["", Validators.required],
            Id: [""],
        });
        if (!!this.supplierDetails) {
            this.supplierForm.patchValue(this.supplierDetails);
        }
    }

    saveEnergySupplier(): any {
        const energyType = new EnergySupplierClass();
        Object.assign(energyType, this.supplierForm.value);
        const data = _.omit(energyType, ["Id"]);
        this._energyTypeSerivce.addEnergySupplier(data).subscribe(
            (response) => {
                this.dialogRef.close({ data: response });
            },
            (error) => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Error in adding energy supplier.",
                });
            }
        );
    }

    editSupplier(): any {
        const supplier = new EnergySupplierClass();
        Object.assign(supplier, this.supplierForm.value);
        this._energyTypeSerivce.editEnergySupplier(supplier).subscribe(
            (response) => {
                this.dialogRef.close({ data: response });
            },
            (error) => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Error in adding supplier.",
                });
            }
        );
    }
}
