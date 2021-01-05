import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Component, OnInit } from "@angular/core";
import { FuseConfigService } from "@fuse/services/config.service";
import { AuthService } from "app/main/services/auth";
import { FormBuilder, Validators } from "@angular/forms";
import { AddPartnerCustomer } from "../partner/partner-classes";
import * as _ from "lodash";
import { PartnerService } from "../partner/partner.service";
import { MessageService } from "primeng/components/common/messageservice";
import * as moment from "moment";
import { ActivatedRoute, Router } from "@angular/router";
import {
    MatDialogRef,
    DateAdapter,
    MAT_DATE_LOCALE,
    MAT_DATE_FORMATS,
} from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";

export const MY_FORMATS = {
    parse: {
        dateInput: "L",
    },
    display: {
        dateInput: "DD/MM/YYYY",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "DD/MM/YYYYY",
        monthYearA11yLabel: "MMM YYYY",
    },
};

@Component({
    selector: "partner-add-customer",
    templateUrl: "./partner-add-customer.component.html",
    styleUrls: ["./partner-add-customer.component.scss"],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class PartnerAddCustomerComponent implements OnInit {
    addcustomerFormGroup: any;
    callback: any = "1";
    mytime: Date = new Date();
    isDateshow: boolean = false;
    isTimeshow: boolean = false;
    addcustomerFormGroupErrors: any;
    isShowbutton: boolean = false;
    customerdata: any;
    status: any;
    partnerId: any;
    currentUser: any;
    IsPhone: any;
    phone_number: any;
    minDate = new Date();

    constructor(
        private _fuseConfigService: FuseConfigService,
        public _authService: AuthService,
        private fb: FormBuilder,
        public _partnerSerivce: PartnerService,
        public messageService: MessageService,
        public route: ActivatedRoute,
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

        this.addcustomerFormGroupErrors = {
            CustomerName: {},
            CustomerInformation: {},
            CallbackFlag: {},
            CallbackDate: {},
            CallbackTime: {},
        };

        this.addcustomerFormGroup = this.fb.group({
            CustomerName: ["", Validators.required],
            CustomerInformation: ["", Validators.required],
            CallbackFlag: ["1", Validators.required],
            Notes: [""],
            CallbackDate: [],
            CallbackTime: [],
        });
    }

    ngOnInit(): any {
        this.route.queryParams.subscribe((params) => {
            this.status = params.status;
            if (this.status == 1) {
                this.isShowbutton = true;
                this.customerdata = JSON.parse(
                    localStorage.getItem("customerdata")
                );
                this.phone_number = this.customerdata.Phone_No;
                this.mytime = new Date(this.customerdata.CallbackTime);
                if (this.customerdata.CallbackFlag == 2) {
                    this.isDateshow = true;
                    this.isTimeshow = true;
                } else {
                    this.isTimeshow = false;
                    this.isDateshow = false;
                }
                this.addcustomerFormGroup.patchValue({
                    CustomerName: this.customerdata.CustomerName,
                    Phone_No: this.customerdata.Phone_No,
                    CustomerInformation: this.customerdata.CustomerInformation,
                    Notes: this.customerdata.Notes,
                    CallbackTime: this.customerdata.CallbackTime,
                    CallbackDate: this.customerdata.CallbackDate,
                });
                this.callback = this.customerdata.CallbackFlag.toString();
                //this.minDate = this.customerdata.CallbackDate;
            }
        });
    }

    validatePhone(): any {
        // let url = 'https://rest.messagebird.com/lookup/'+this.phone_number;
        // let data;
        //         jQuery.ajax({
        //             type: "GET",
        //             url: url,
        //             headers: {"Authorization": "AccessKey bshqSeReD3vyJvP5FaVDdKJNu"},
        //             crossDomain: true,
        //             dataType: 'json',
        //             success: function (detail) {
        //                 if(!!detail.errors) {
        //                 if(detail.errors[0].code == 21) {
        //                     Swal.fire({
        //                         type: "error",
        //                         title: "Error",
        //                         text:
        //                             "Invalid phone number."
        //                     });
        //                     data = false;
        //                     this.IsPhone = data;
        //                 } else {
        //                     this.IsPhone = true;
        //                 }
        //             }
        //         }
        //         });

        this.IsPhone = true;
    }

    callbackchange(event): any {
        if (event.value == "2") {
            this.isDateshow = true;
            this.isTimeshow = true;
            this.addcustomerFormGroup.controls["CallbackDate"].setValidators(
                Validators.required
            );
            this.addcustomerFormGroup.controls[
                "CallbackDate"
            ].updateValueAndValidity();
            this.addcustomerFormGroup.controls["CallbackTime"].setValidators(
                Validators.required
            );
            this.addcustomerFormGroup.controls[
                "CallbackTime"
            ].updateValueAndValidity();
        } else {
            this.isDateshow = false;
            this.isTimeshow = false;
            this.addcustomerFormGroup.controls[
                "CallbackDate"
            ].clearValidators();
            this.addcustomerFormGroup.controls[
                "CallbackDate"
            ].updateValueAndValidity();
            this.addcustomerFormGroup.controls[
                "CallbackTime"
            ].clearValidators();
        }
    }

    goNotinterestedpage() {
        const data = {
            CustomerName: this.addcustomerFormGroup.get("CustomerName").value,
            Phone_No: this.phone_number,
            CustomerInformation: this.addcustomerFormGroup.get(
                "CustomerInformation"
            ).value,
            Notes: this.addcustomerFormGroup.get("Notes").value,
            CallbackTime: this.addcustomerFormGroup.get("CallbackTime").value,
            CallbackDate: null,
            CallbackFlag: this.addcustomerFormGroup.get("CallbackFlag").value,
            Id: this.customerdata.Id,
            PartnerId: this.customerdata.Id,
            Status: 1,
        };
        if (this.addcustomerFormGroup.get("CallbackFlag").value == 2) {
            const dobFormat = new Date(
                this.addcustomerFormGroup.value.CallbackDate._d
            ).toLocaleString("en-US", {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            this.addcustomerFormGroup.value.CallbackDate._d = dobFormat;
            data.CallbackDate = dobFormat;
        }

        if (!!data.CallbackTime) {
            data.CallbackTime = moment(data.CallbackTime).format("HH:mm a");
        }

        let customer = new AddPartnerCustomer();
        Object.assign(data, customer);

        this._partnerSerivce.editCustomer(data).subscribe(
            (response) => {
                if (response.status_code === 200) {
                    this.messageService.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Customer Updated successfully.",
                    });
                    this.router.navigate(["/not-interested-customers"]);
                } else {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "Error in updating customer.",
                    });
                }
            },
            (error) => {}
        );
    }

    submitCustomer() {
        if (
            this.status == 1 &&
            this.addcustomerFormGroup.valid &&
            !!this.phone_number
        ) {
            const data = {
                CustomerName: this.addcustomerFormGroup.get("CustomerName")
                    .value,
                Phone_No: this.phone_number,
                CustomerInformation: this.addcustomerFormGroup.get(
                    "CustomerInformation"
                ).value,
                Notes: this.addcustomerFormGroup.get("Notes").value,
                CallbackTime: this.addcustomerFormGroup.get("CallbackTime")
                    .value,
                CallbackDate: null,
                CallbackFlag: this.addcustomerFormGroup.get("CallbackFlag")
                    .value,
                Id: this.customerdata.Id,
                PartnerId: this.customerdata.Id,
                Status: null,
            };
            if (this.addcustomerFormGroup.get("CallbackFlag").value == 2) {
                const dobFormat = new Date(
                    this.addcustomerFormGroup.value.CallbackDate
                ).toLocaleString("en-US", {
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                });
                this.addcustomerFormGroup.value.CallbackDate = dobFormat;
                data.CallbackDate = dobFormat;
            }
            if (this.customerdata.Status == 1) {
                data.Status = 1;
            } else {
                data.Status = 2;
            }
            if (!!data.CallbackTime) {
                data.CallbackTime = moment(data.CallbackTime).format("HH:mm a");
            }

            let customer = new AddPartnerCustomer();
            Object.assign(data, customer);

            this._partnerSerivce.editCustomer(data).subscribe(
                (response) => {
                    if (response.status_code === 200) {
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Customer Updated successfully.",
                        });
                        if (data.Status == 1) {
                            this.router.navigate(["/not-interested-customers"]);
                        } else {
                            this.router.navigate(["/callback-customerlist"]);
                        }
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in updating customer.",
                        });
                    }
                },
                (error) => {}
            );
        } else {
            if (this.addcustomerFormGroup.valid && !!this.phone_number) {
                let customer = new AddPartnerCustomer();
                Object.assign(customer, this.addcustomerFormGroup.value);
                customer.CallbackTime = moment(customer.CallbackTime).format(
                    "HH:mm a"
                );
                customer.Status = 2;
                customer.PartnerId = this.currentUser.Id;
                customer.Phone_No = this.phone_number;
                if (this.addcustomerFormGroup.get("CallbackFlag").value == 2) {
                    const dobFormat = new Date(
                        this.addcustomerFormGroup.value.CallbackDate._d
                    ).toLocaleString("en-US", {
                        timeZone: Intl.DateTimeFormat().resolvedOptions()
                            .timeZone,
                    });
                    this.addcustomerFormGroup.value.CallbackDate._d = dobFormat;
                    customer.CallbackDate = dobFormat;
                }

                const data = _.omit(customer, ["Id"]);
                data.CallbackDate = customer.CallbackDate;
                data.PartnerId = this.currentUser.Id;
                data.Phone_No = this.phone_number;
                this._partnerSerivce.addCustomer(data).subscribe(
                    (response) => {
                        if (response.status_code === 0) {
                            this.router.navigate(["/callback-customerlist"]);
                            this.messageService.add({
                                severity: "success",
                                summary: "Success",
                                detail: "Customer added successfully.",
                            });
                        } else {
                            this.messageService.add({
                                severity: "warn",
                                summary: "Error",
                                detail: "Customer Not added",
                            });
                        }
                    },
                    (error) => {}
                );
            }
        }
    }
}
