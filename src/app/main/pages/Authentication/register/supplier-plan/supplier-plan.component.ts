import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { ConfirmPaymentComponent } from "../confirm-payment/confirm-payment.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { RegisterService } from "../register.service";
import * as _ from "lodash";
import { LoaderService } from "app/main/services/loader.service";
import { SettingsService } from "app/main/pages/settings/settings.service";
import { SupplierService } from "app/main/pages/supplier/supplier.service";
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
    SupplierDB: any[] = [];
    averageMonth: any;
    tempSupplierDB: any;
    constructor(
        public dialogRef: MatDialogRef<SupplierPlanModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        public _settingSerivce: SettingsService,
        public registerService: RegisterService,
        public _supplierService: SupplierService
    ) {
        this.data = data;
        this.currentEnergyElc = data.elecOld;
        this.currentEnergyGas = data.gasOld;

        this.registerService
            .gettarrifdatabyTariffId(data.eleNew.tariffId)
            .subscribe((response: any) => {
                this.eleNew = JSON.parse(response);
                this.eleNew.standingChargeGas =
                    this.eleNew.standingChargeGas / 365;
                this.eleNew.supplierName = "";

                this.gasNew = this.eleNew;
                this.getSupplierFromDb();
            });

        // this.energy1 = _.maxBy(this.data.data1.tariffs, 'savingPercentage');
        // this.energy = this.data.data2;
        // this.emergyType = this.data.data4;
        // this.energy.standingChargeGas = this.energy.standingChargeGas / 365;
        // this.energy.standingChargeElec = this.energy.standingChargeElec / 365;
        // this.currentEnergyElc = this.data.data3.E;
        // this.currentEnergyGas = this.data.data3.G;
        // this.getSettingsList();
        // this.energy1.imageName = "https://www.theenergyshop.com/resources/img/supplier/100/" + this.energy1.imageName;
    }

    getSupplierFromDb(): any {
        const data = {
            searchText: "",
            energyTypeId: this.emergyType,
        };
        this._supplierService.getSupplier(data).subscribe((response) => {
            if (response.status_code === 200) {
                let SupplierDB = response.data;
                let dbData = [];
                _.forEach(SupplierDB, function (value) {
                    if (value.IsCanUsedForSwitch == true) {
                        dbData.push(value);
                    }
                });
                this.SupplierDB = dbData;
                this.tempSupplierDB = dbData;
                let elcSupplier = this.currentEnergyElc.supplierId;
                let gasSupplier = this.currentEnergyGas.supplierId;
                let gasRank;
                let elecRank;
                this.SupplierDB = _.clone(this.tempSupplierDB);
                let data12 = _.forEach(this.tempSupplierDB, (value) => {
                    if (elcSupplier == value.ID) {
                        elecRank = value;
                        var a = this.SupplierDB.indexOf(value);
                        if (a > -1) {
                            this.SupplierDB.splice(a, 1);
                        }
                    }
                    if (gasSupplier == value.ID) {
                        gasRank = value;
                        var b = this.SupplierDB.indexOf(value);
                        if (b > -1) {
                            this.SupplierDB.splice(b, 1);
                        }
                    }
                });
                let val = _.minBy(this.SupplierDB, "Rank");
                this.gasNew.supplierName = val.Name;
                this.gasNew.supplierId = val.ID;
                this.eleNew.supplierName = val.Name;
                this.eleNew.supplierId = val.ID;
            } else {
                this.SupplierDB = [];
            }
        });
    }

    ngOnInit(): any {}

    getSettingsList(): any {
        this._settingSerivce.getSettingsList().subscribe((response) => {
            if (response.status_code === 200) {
                this.settings = response.data;
                this.planDiscount = this.settings[5].Setting_Value;
                this.energy1.savingPercentage =
                    this.energy1.savingPercentage + this.planDiscount;
                if (this.planDiscount != 0) {
                    this.energy1.saving =
                        this.energy1.saving +
                        (this.planDiscount * this.energy1.saving) / 100;
                    this.energy1.bill =
                        this.energy1.bill -
                        (this.planDiscount * this.energy1.bill) / 100;
                    this.averageMonth = this.energy1.bill / 12;
                }
            } else {
                this.settings = null;
            }
        });
    }
}
