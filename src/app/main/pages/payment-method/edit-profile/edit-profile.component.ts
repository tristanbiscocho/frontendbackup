import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";
import * as _ from "lodash";
import { LoaderService } from "app/main/services/loader.service";
import { PaymentMethodService } from "../payment-method.service";
import { PaymentMethodClass } from "../payment-method-classes";
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
        public _energyTypeSerivce: PaymentMethodService,
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

    saveEnergyType(): any {
        const energyType = new PaymentMethodClass();
        Object.assign(energyType, this.supplierForm.value);
        const data = _.omit(energyType, ["Id"]);
        this._energyTypeSerivce.addPaymentMethod(data).subscribe(
            (response) => {
                this.dialogRef.close({ data: response });
            },
            (error) => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Error in adding energy type.",
                });
            }
        );
    }

    editSupplier(): any {
        const supplier = new PaymentMethodClass();
        Object.assign(supplier, this.supplierForm.value);
        this._energyTypeSerivce.editPaymentMethod(supplier).subscribe(
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
