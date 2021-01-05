import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";
import * as _ from "lodash";
import { LoaderService } from "app/main/services/loader.service";
import { TariffTypeClass } from "../tariff-type-classes";
import { TariffTypeService } from "../tariff-type.service";
@Component({
    selector: "edit-profile-form-dialog",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ManageProfileFormDialogComponent implements OnInit {
    dialogTitle: string;

    tariffTypeForm: FormGroup;
    tariffTypeFormErrors: any;
    tariffTypeDetail: any;
    showLoader: any;

    constructor(
        public dialogRef: MatDialogRef<ManageProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        public _energyTypeSerivce: TariffTypeService,
        public _loaderService: LoaderService
    ) {
        this.tariffTypeDetail = data.data;
        this.tariffTypeFormErrors = {
            Name: {},
        };
    }

    ngOnInit(): any {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        this.tariffTypeForm = this.formBuilder.group({
            Name: ["", Validators.required],
            Id: [""],
        });
        if (!!this.tariffTypeDetail) {
            this.tariffTypeForm.patchValue(this.tariffTypeDetail);
        }
    }

    saveTariffType(): any {
        const tariffType = new TariffTypeClass();
        Object.assign(tariffType, this.tariffTypeForm.value);
        const data = _.omit(tariffType, ["Id"]);
        this._energyTypeSerivce.addTariffType(data).subscribe(
            (response) => {
                this.dialogRef.close({ data: response });
            },
            (error) => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Error in adding Tariff Type.",
                });
            }
        );
    }

    editTariffType(): any {
        const tariffType = new TariffTypeClass();
        Object.assign(tariffType, this.tariffTypeForm.value);
        this._energyTypeSerivce.editTariffType(tariffType).subscribe(
            (response) => {
                this.dialogRef.close({ data: response });
            },
            (error) => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Error in adding Tariff Type.",
                });
            }
        );
    }
}
