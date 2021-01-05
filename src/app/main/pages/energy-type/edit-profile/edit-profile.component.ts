import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";
import * as _ from "lodash";
import { LoaderService } from "app/main/services/loader.service";
import { EnergyTypeService } from "../energy-type.service";
import { EnergyTypeClass } from "../energy-type-classes";

@Component({
    selector: "edit-profile-form-dialog",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ManageProfileFormDialogComponent implements OnInit {
    dialogTitle: string;
    type: any;
    energyTypeForm: FormGroup;
    energyTypeFormErrors: any;
    energyTypeDetails: any;
    isRanked = false;
    showLoader: any;
    constructor(
        public dialogRef: MatDialogRef<ManageProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        public _energyTypeSerivce: EnergyTypeService,
        public _loaderService: LoaderService
    ) {
        this.energyTypeDetails = data.data;
        this.energyTypeFormErrors = {
            Name: {},
        };
    }

    ngOnInit(): any {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        this.energyTypeForm = this.formBuilder.group({
            Name: ["", Validators.required],
            Id: [""],
        });
        if (!!this.energyTypeDetails) {
            this.energyTypeForm.patchValue(this.energyTypeDetails);
        }
    }

    saveEnergyType(): any {
        const energyType = new EnergyTypeClass();
        Object.assign(energyType, this.energyTypeForm.value);
        const data = _.omit(energyType, ["Id"]);
        this._energyTypeSerivce.addEnergyType(data).subscribe(
            (response) => {
                this.dialogRef.close({ data: response });
            },
            (error) => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Error in adding Energy Type.",
                });
            }
        );
    }

    editEnergyType(): any {
        const energyType = new EnergyTypeClass();
        Object.assign(energyType, this.energyTypeForm.value);
        this._energyTypeSerivce.editEnergyType(energyType).subscribe(
            (response) => {
                this.dialogRef.close({ data: response });
            },
            (error) => {
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail: "Error in adding Energy Type.",
                });
            }
        );
    }
}
