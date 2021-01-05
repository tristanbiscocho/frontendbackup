import { Component, OnInit } from "@angular/core";

import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FuseConfigService } from "@fuse/services/config.service";
import { CustomerService } from "../customer-list/customer-list.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SettingsService } from "../settings/settings.service";
import { MessageService } from "primeng/components/common/messageservice";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material";
import * as moment from "moment";

@Component({
    selector: "add-customer-bills",
    templateUrl: "./add-customer-bills.component.html",
    styleUrls: ["./add-customer-bills.component.scss"],
})
export class AddCustomerBillsComponent implements OnInit {
    bills: any;
    currentUser: any[];
    customerId: any;
    billId: any;
    packages: any;
    PackageId: any;
    packageDetails: any;
    finalBill = 0;
    packageAmount: any;
    typeOfBill = 1;
    meterReading: any;
    gasReadingValue: any;
    electryReading: any;
    pageOffset: any;
    customerPageOffset: any;
    settings: any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _customerService: CustomerService,
        public _activeRoute: ActivatedRoute,
        public _settingSerivce: SettingsService,
        public messageService: MessageService,
        public router: Router
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

        const currentuserdata = localStorage.getItem("UserDetail");
        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));
        }
    }

    ngOnInit(): any {
        this.getPackages();
        this.getSettingsList();
        this._activeRoute.params.forEach((params) => {
            const getcustomerId = params["customerId"];
            const getBillId = params["billId"];
            const pageOffset = params["PAGEOFFSET"];
            const customerPageOffset = params["CUSTOMERPAGEOFFSET"];
            if (getcustomerId !== undefined) {
                this.customerId = getcustomerId;
            }
            if (getBillId !== undefined) {
                this.billId = getBillId;
            }
            if (!!pageOffset) {
                this.pageOffset = pageOffset;
            }
            if (!!customerPageOffset) {
                this.customerPageOffset = customerPageOffset;
            }
        });
    }

    getSettingsList(): any {
        this._settingSerivce.getSettingsList().subscribe((response) => {
            if (response.status_code === 200) {
                this.settings = response.data;
            }
        });
    }

    getCustomerBills(id): any {
        this._customerService
            .getCustomerBills(id)
            .subscribe((response: any) => {
                if (response.status_code == 0) {
                    this.bills = response.data;
                    this.PackageId = this.bills.PackageId;
                    // this.bills.StartDate = '2019-12-24T00:00:00-07:00'
                    this.packageDetails = this.packages.filter(
                        (x) => x.Id == this.PackageId
                    );
                    let d = moment(this.bills.StartDate);
                    d.month();
                    let billMonth = d.format("MMM");

                    if (this.packageDetails.length != 0) {
                        this.packageAmount = this.bills.CustomerBillCalculatedAmount;
                        this.finalBill = this.bills.CustomerBillCalculatedAmount;
                        if (
                            billMonth == "Dec" ||
                            billMonth == "Jan" ||
                            billMonth == "Feb"
                        ) {
                            // if (this.finalBill > 0) {
                            //     this.finalBill = this.finalBill - ((this.finalBill * this.settings[2].Setting_Value) / 100);
                            // }
                        }
                    } else {
                        this.packageAmount = 0;
                        this.finalBill = 0;
                    }
                } else {
                    this.bills = [];
                }
            });
    }

    getPackages(): any {
        this._settingSerivce.getPackageList().subscribe((response) => {
            if (response) {
                this.packages = response;
            } else {
                this.packages = null;
            }
            this.getCustomerBills(this.customerId);
        });
    }

    addAmount(events): any {
        const directValue = events.currentTarget.value;
        if (!!directValue) {
            const values = Number(directValue);
            if (!isNaN(values)) {
                this.finalBill = this.packageAmount + values;
            } else {
                this.finalBill = this.packageAmount;
            }
        } else {
            const value = Number(events.key);
            if (!isNaN(value)) {
                this.finalBill = this.packageAmount + value;
            } else {
                this.finalBill = this.packageAmount;
            }
        }
    }

    generateBill(): any {
        let amount;
        if (!!this.finalBill) {
            amount = this.finalBill;
        } else {
            amount = this.packageAmount;
        }

        if (!!this.bills.CustometMeterReadingDetail.GesReadingInfo) {
            this.gasReadingValue = this.bills.CustometMeterReadingDetail.GesReadingInfo.ReadingValue;
        } else {
            this.gasReadingValue = 0;
        }
        if (!!this.bills.CustometMeterReadingDetail.ElectricityReadingInfo) {
            this.electryReading = this.bills.CustometMeterReadingDetail.ElectricityReadingInfo.ReadingValue;
        } else {
            this.electryReading = 0;
        }
        let lowData;
        if (
            !!this.bills.CustometMeterReadingDetail.ElectricityReadingInfo &&
            this.bills.CustometMeterReadingDetail.IsElectricMeterReading == true
        ) {
            lowData = this.bills.CustometMeterReadingDetail
                .ElectricityReadingInfo.LowReadingValue;
        } else {
            lowData = 0;
        }
        const data = {
            CustomerID: this.customerId,
            BillType: this.typeOfBill,
            Amount: amount,
            MeterReadingID: this.meterReading,
            StartDate: this.bills.StartDate,
            EndDate: this.bills.EndDate,
            PackageId: this.PackageId,
            CustomerGasMeterReadingId: this.gasReadingValue,
            CustomerElectricityMeterReadingId: this.electryReading,
            LowReadingValue: lowData,
        };
        this._customerService
            .addCustomerBill(data)
            .subscribe((response: any) => {
                if (response.status_code == 200) {
                    this.messageService.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Bill created successfully.",
                    });
                    this.router.navigate([
                        "/admin-customer-bill/" +
                            this.customerId +
                            "/" +
                            this.customerPageOffset +
                            "/" +
                            this.pageOffset,
                    ]);
                } else {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "Error in create bill.",
                    });
                }
            });
    }
}
