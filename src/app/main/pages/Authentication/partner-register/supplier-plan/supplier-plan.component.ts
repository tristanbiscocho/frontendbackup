import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import * as _ from "lodash";
import { LoaderService } from "app/main/services/loader.service";
import { SettingsService } from "app/main/pages/settings/settings.service";
import domtoimage from "dom-to-image";
@Component({
    selector: "supplier-plan",
    templateUrl: "./supplier-plan.component.html",
    styleUrls: ["./supplier-plan.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SupplierPlanModalComponent implements OnInit {
    Data: any;
    dialogRef1s: any;
    IsIBAN: any = false;
    secondFormGroup: FormGroup;
    datemask = [/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/];
    //  IBANMask = '[a-zA-Z]{2}\-[0-9]{2}\-[a-zA-Z0-9]{4}\-[0-9]{7}\-([a-zA-Z0-9]?){0,16}'
    isChecked: any;
    PostCode: any;
    Address = [];
    selectedValue: any;
    postCode:
        | string
        | RegExp
        | any = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
    Isaddress: any = false;
    IsComName: any = false;
    showLoader: any;
    IsAutoFill: any = false;
    energy: any;
    energy1: any;
    currentEnergyGas: any;
    currentEnergyElc: any;
    settings: any;
    planDiscount: any;
    emergyType: any;
    eleNew: any;
    gasNew: any;
    IsEmailQuote: any;
    IsClickedEmail = false;
    requiredField: any;
    averageMonth: any;
    constructor(
        public dialogRef: MatDialogRef<SupplierPlanModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        public _settingSerivce: SettingsService
    ) {
        this.energy1 = _.maxBy(this.data.data1.tariffs, "savingPercentage");
        this.energy = this.data.data2;
        this.emergyType = this.data.data4;
        this.energy.standingChargeGas = this.energy.standingChargeGas / 365;
        this.energy.standingChargeElec = this.energy.standingChargeElec / 365;
        this.currentEnergyElc = this.data.data3.E;
        this.currentEnergyGas = this.data.data3.G;
        this.getSettingsList();
        this.energy1.imageName = this.energy1.imageName;
        this.IsEmailQuote = data.data5;
        this.requiredField = data.requiredField;
    }

    ngOnInit(): any {}
    closePopup(): any {
        if (this.IsEmailQuote == true) {
            this.sendEmailQoute();
        } else {
            this.dialogRef.close();
        }
    }
    getSettingsList(): any {
        this._settingSerivce.getSettingsList().subscribe((response) => {
            if (response.status_code === 200) {
                this.settings = response.data;
                this.planDiscount = this.settings[5].Setting_Value;
                this.energy1.savingPercentage =
                    this.energy1.savingPercentage + this.planDiscount;
                this.energy1.saving =
                    this.energy1.saving +
                    (this.planDiscount * this.energy1.saving) / 100;
                this.energy1.bill =
                    this.energy1.bill -
                    (this.planDiscount * this.energy1.bill) / 100;
                this.averageMonth = this.energy1.bill / 12;
            } else {
                this.settings = null;
            }
        });
    }

    sendEmailQoute(): any {
        if (this.requiredField == true) {
            this.IsClickedEmail = true;
            this.sendEmailQoute1();
        } else {
            Swal.fire({
                type: "error",
                title: "Error",
                text:
                    "Please enter user name, valid email and valid phone number.",
            });
        }
    }
    sendEmailQoute1(): any {
        const node = document.getElementById("supplierDetails");
        domtoimage
            .toJpeg(node, {
                quality: 0.95,
                width: node.scrollWidth,
                height: node.scrollHeight,
            })
            .then((dataUrl) => {
                this.UploadImage(dataUrl);
                // this.dialogRef.close({
                //     data: link.download
                // });
            });
    }

    UploadImage(dataUrl): any {
        let data = {
            imagedata: dataUrl,
        };
        this._settingSerivce.uploadImage(data).subscribe((response) => {
            if (!!response) {
                this.dialogRef.close({
                    data: response,
                });
            }
        });
    }
}
