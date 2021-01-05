import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddPackageClass } from "../../settings/settings-classes";
import * as _ from "lodash";
import { SettingsService } from "../../settings/settings.service";
import { MessageService } from "primeng/components/common/messageservice";
import { systemenumService } from "../../systemenumdata/systemenum.service";
import { AuthService } from "app/main/services/auth";
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
    numberOfRooms: any[];
    familyMembers: any[];
    addPackage: FormGroup;
    Status: any;
    typeOfHome: any;
    filterHouse: any;

    formDetail: any;
    showLoader: any;
    IsValid: any;
    constructor(
        public dialogRef: MatDialogRef<ManageProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public _settingService: SettingsService,
        public messageService: MessageService,
        public _sysService: systemenumService,
        public _authService: AuthService,
        public _loaderService: LoaderService
    ) {
        this.formDetail = data.data;
    }

    ngOnInit(): void {
        this.addPackage = this.formBuilder.group({
            Name: ["", Validators.required],
            TypeOfHouse: ["", Validators.required],
            FamilyMembers: ["", Validators.required],
            TypeOfEnergy: ["", Validators.required],
            Status: [1, Validators.required],
            Id: [""],
            ElectricityPackageAmount: [""],
            GasPackageAmount: [""],
            PeakOffPeakCheck: [false],
            PeakElectricity: [""],
            OffPeakElectricity: [""],
        });
        this.getTypeOfHouse();
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }
    peakOffPekCost = false;
    handleSelected(event) {
        if (event.checked === true) {
            this.peakOffPekCost = true;
        } else {
            this.peakOffPekCost = false;
        }
    }
    savePackage(): any {
        const addpackage = new AddPackageClass();
        Object.assign(addpackage, this.addPackage.value);
        const data = _.omit(addpackage, ["Id"]);
        this._settingService.addPackage(data).subscribe(
            (response) => {
                if (response) {
                    this.dialogRef.close({ data: response });
                } else {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "Error in adding package.",
                    });
                }
            },
            (error) => {}
        );
    }

    editPackage(): any {
        const addpackage = new AddPackageClass();
        Object.assign(addpackage, this.addPackage.value);
        this._settingService.editPackage(addpackage).subscribe(
            (response) => {
                if (response) {
                    this.dialogRef.close({ data: response });
                } else {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "Error in edit package.",
                    });
                }
            },
            (error) => {}
        );
    }

    getTypeOfHouse(): any {
        let result = this._authService.getAllResourceData();
        this.typeOfHome = result.filter((x) => x.ListID == 2);
        this.numberOfRooms = result.filter((x) => x.ListID == 5);
        this.familyMembers = result.filter((x) => x.ListID == 4);
        if (!!this.formDetail) {
            this.formDetail.TypeOfHouse = this.typeOfHome.find((x) => {
                if (x.Value == this.formDetail.TypeOfHouse) {
                    return x.Value;
                }
            });
            this.formDetail.TypeOfHouse = this.formDetail.TypeOfHouse.Id;

            this.formDetail.FamilyMembers = this.familyMembers.find((x) => {
                if (x.Value == this.formDetail.FamilyMembers) {
                    return x.Value;
                }
            });
            this.formDetail.FamilyMembers = this.formDetail.FamilyMembers.Id;
            debugger;
            this.addPackage.patchValue(this.formDetail);
        }
    }

    ValidateInput(event): any {
        let data = event.target.value;
        if (data <= 0) {
            this.messageService.add({
                severity: "warn",
                summary: "Error",
                detail: "Please enter value greater than 0.",
            });
            this.IsValid = true;
        } else {
            this.IsValid = false;
        }
    }
}
