import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import {
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { systemenumService } from "../../systemenumdata/systemenum.service";
import { SupplierService } from "../../supplier/supplier.service";
import * as _ from "lodash";
import { MessageService } from "primeng/components/common/messageservice";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "app/main/services/auth";

import Swal from "sweetalert2";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { MatDialog } from "@angular/material";
import { updateProfileFormDialogComponent } from "../../my-profile/edit-profile/update-profile/update-profile.component";
import { Observable } from "rxjs/Observable";
import { throwError } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { CRM_URL, SERVER_URL } from "app/main/services/config";

import { SettingsService } from "../../settings/settings.service";
import { p } from "@angular/core/src/render3";
import { RegisterService } from "../register/register.service";
import {
    RegisterDetail,
    PersonalDetail,
    EditCustomer,
} from "../register/register-classes";
import { ConfirmPaymentComponent } from "../register/confirm-payment/confirm-payment.component";
import { PaymentModalComponent } from "../register/payment-modal/paymentmodal.component";
import { SupplierPlanModalComponent } from "./supplier-plan/supplier-plan.component";
import domtoimage from "dom-to-image";
import { LoaderService } from "app/main/services/loader.service";

const moment = _moment;

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
    selector: "partner-register",
    templateUrl: "./partner-register.component.html",
    styleUrls: ["./partner-register.component.scss"],
    animations: fuseAnimations,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class PartnerSignupComponent implements OnInit {
    IsImage = true;
    SupplierDB: any[] = [];
    maxPercentageSupplier: any;
    IsAddCustomer = false;
    exsitingPlanGas: any;
    exsitingPlanElc: any;
    ActiveXObject: (type: string) => void;
    IsBankDetails: any = "1";
    loginForm: FormGroup;
    isLinear = false;
    sevenFormGroup: FormGroup;
    sevenFormGroupErrors: any;
    firstFormGroup: FormGroup;
    firstFormGroupErrors: any;
    partnerfifthFormGroup: any;
    bankdetails: any = "1";
    partnerfifthFormGroupErrors: any;
    partnersevenFormGroup: any;
    partnersevenFormGroupErrors: any;
    partnersixthFormGroup: any;
    partnersixthFormGroupErrors: any;
    Address = [];
    // Address = [{ value: "0", "addressAsLongString": "Enter address manually", "addressAsLongStringWithDelimiter": "Enter address manually" }];
    dialogRef: any;
    bothSupplier = true;
    bothSameSupplier: any;
    bothSameSupplierPlan: any;
    bothSamePayment: any = 45;
    selectedValue: any;
    electricityUse: any = "0";
    switchinType: any = "1";
    phone_number: any;
    dialogRef1: any;
    emailPattern:
        | string
        | RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    postCode:
        | string
        | RegExp = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
    passwordExp:
        | string
        | RegExp = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
    // get all dropdown data
    period: any[];
    email_add: any;
    typeOfHouse: any[];
    familyMember: any[];
    noOfRooms: any[];
    epmStatus: any[];
    resStatusL: any;
    timeOfCurAdd: any[];
    hearAbout: any[];
    responseForAll: any[];
    suppliers: any;
    supplierPlans: any[];
    supplierPlansboth: any[];
    supplierPlansElec: any[];
    paymentMethods: any[];
    isOptional = false;
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
    PostCode: any;
    datemask = [/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/];
    isPasswordNotMatch = false;
    dialogRefSec: any;
    isBothSupplierReq = true;
    economicMeter: any = "2";
    myModel: any;
    daynightusage = false;
    token: any;
    updatedusername: any;
    existingpostcode: any;
    currentUser: any;
    partnerreferrencedata: any;
    partneradded = false;
    referralcode: any;
    termAndCondialogRef: any;
    Isvalid: any;
    NewPlanImage: any;
    @ViewChild("myList") myList: ElementRef;
    paymentDetails: any = {
        PaymentDetails_AccountNumber: "",
        PaymentDetails_SortCode: "",
        PaymentDetails_AccountName: "",
        IBANnunber: "",
    };

    billAdd: any = {
        BillingAddress1: "",
        BillingAddress2: "",
        BillingCity: "",
        BillingPostcode: "",
    };
    IsEmail: any;
    IsPhone: any;
    regionData: any;
    dualPaymentData: any;
    paymentMethodElc: any;
    GasPaymentData: any;
    dualSupplierDefultData: any;
    ElcSupplierDefaultData: any;
    gasSupplierDefaultData: any;
    currentTariff: any;
    comparisionData: any;
    dialogRef1s: any;
    package: any;
    energy: any;
    energy1: any;
    currentEnergyGas: any;
    currentEnergyElc: any;
    settings: any;
    planDiscount: any;
    emergyType: any;
    URLvalue: any;
    IsFormDataBind = false;
    EditCustomer = false;
    ISsaveLead = false;
    IsSendEmail = 0;
    leadDataEdit: any;
    planImage: any;
    regionAddress =
        "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
        this.postCode +
        ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG";
    GasSupplier: any;
    ElecSupplier: any;
    checkedQuote: any = false;
    IsDisable = false;
    IsAltPhone: any = true;
    IsGetQuote: any;
    averageMonth: any;
    tempSupplierDB: any[] = [];
    avg: any;
    AlternativeMobileNumber: any;
    nightRate: any;
    unitRate: any;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public _allResourceService: systemenumService,
        public _supplierService: SupplierService,
        private registerService: RegisterService,
        public messageService: MessageService,
        public router: Router,
        private route: ActivatedRoute,
        public _authService: AuthService,
        public dialog: MatDialog,
        public _activeRoute: ActivatedRoute,
        public _settingService: SettingsService,
        public _settingSerivce: SettingsService,
        private loaderService: LoaderService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };

        this.firstFormGroupErrors = {
            PostCode: {},
            AddressLine1: {},
            AddressLine2: {},
            City: {},
            GasMPRNnumber: {},
            ElectricitySupplyNumber: {},
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.getSettingsList();

        this.firstFormGroup = this._formBuilder.group({
            PostCode: [
                "",
                [Validators.required, Validators.pattern(this.postCode)],
            ],
            AddressLine1: [""],
            AddressLine2: [""],
            City: ["", Validators.required],
            HouseName: ["", Validators.required],
            HouseNumber: [""],
            FlatNumber: [""],
            StreetName: [""],
            Country: [""],
            GasMPRNnumber: ["", Validators.maxLength(10)],
            ElectricitySupplyNumber: ["", Validators.maxLength(13)],
            BillingAddress1: [""],
            BillingAddress2: [""],
            BillingCity: [""],
            BillingPostcode: [""],
            EnergyTypeID: [""],
            EnergyUsageID: ["0"],
            IsElectricMeterReading: [""],
            ElectricityConsumption: ["", Validators.required],
            ElectricityConsumptionPeriodID: ["", Validators.required],
            Electricity_Day_Consumption: [""],
            Electricity_Day_ConsumptionPeriodID: [""],
            Electricity_Night_Consumption: [""],
            Electricity_Night_ConsumptionPeriodId: [""],
            GasConsumption: ["", Validators.required],
            GasConsumptionPeriodID: ["", Validators.required],
            TypeOfHome: [""],
            ElectricityCurrentPlan_SupplierID: [""],
            ElectricityCurrentPlan_PlanPaymentID: [""],
            ElectricityCurrentPlan_PlanID: [""],
            GasCurrentPlan_SupplierID: [""],
            GasCurrentPlan_PlanPaymentID: [""],
            GasCurrentPlan_PlanID: [""],
            Title: [""],
            FirstName: ["", Validators.required],
            LastName: ["", Validators.required],
            EmailAddress: ["", Validators.required],
            AlternativeMobileNumber: [""],
            DOB: [""],
            EmploymentStatusId: [""],
            ResidentalStatusId: [""],
            TimeOfCurrentAddress: [""],
            WhereDidYouhearaboutUs: [""],
            ReferralCode: [""],
            HouseTypeID: [""],
            FamilyMembersId: [""],
            NoOfRoomsId: [""],
            FullAddress: [""],
            IsBank: [""],
            middle_initial: [""],
        });
        this.getAllResourceData();
        this.getSupplierList();
        this.getPaymentmethods();
        this._activeRoute.params.forEach((params) => {
            // get suuplier id from route
            const url: any = this.route.snapshot.queryParamMap;
            this.URLvalue = url.params;
        });

        this.registerService
            .getDataByLeadId(this.URLvalue.lead_id)
            .subscribe((response) => {
                if (response.data.length == 0) {
                    let formdata = {
                        PostCode: this.URLvalue.postal_code,
                        FirstName: this.URLvalue.first_name,
                        LastName: this.URLvalue.last_name,
                        MiddleName: this.URLvalue.middle_initial,
                        DOB: this.URLvalue.date_of_birth,
                        EmailAddress: this.URLvalue.email,
                        // AlternativeMobileNumber: this.URLvalue.alt_phone
                    };
                    this.firstFormGroup.patchValue(formdata);
                    let data = {
                        EnergyTypeID: 1,
                        EnergyUsageID: 0,
                        IsElectricMeterReading: 2,
                    };

                    this.switchinType = data.EnergyTypeID;
                    this.electricityUse = data.EnergyUsageID;
                    this.economicMeter = data.IsElectricMeterReading;
                    this.firstFormGroup.patchValue(data);

                    if (!!this.URLvalue.postal_code) {
                        this.validatePostalcode();
                    }
                    if (!!this.URLvalue.email) {
                        this.validateEmail();
                    }
                    if (!!this.URLvalue.phone_number) {
                        this.AlternativeMobileNumber = decodeURIComponent(
                            this.URLvalue.phone_number
                        );

                        this.validateAltPhone();
                    }
                } else {
                    this.IsFormDataBind = true;
                    this.leadDataEdit = response.data[0];
                    if (response.data[0].IsElectricMeterReading) {
                        response.data[0].IsElectricMeterReading = 1;
                        this.economicMeter = 1;
                    } else {
                        response.data[0].IsElectricMeterReading = 2;
                        this.economicMeter = 2;
                    }
                    if (!!response.data[0].PostCode) {
                        this.validatePostalcode();

                        this.PostCode = response.data[0].PostCode;
                    }
                    // this.switchinType = response.data[0].EnergyTypeID.toString();
                    // this.electricityUse = response.data[0].EnergyUsageID.toString();
                    // this.economicMeter = response.data[0].IsElectricMeterReading.toString();
                    this.email_add = response.data[0].EmailAddress;
                    this.referralcode = response.data[0].ReferralCode;
                    if (!!this.referralcode) {
                        this.IsDisable = true;
                    }
                    this.AlternativeMobileNumber = response.data[0].Phone_No;
                    this.firstFormGroup.patchValue(response.data[0]);
                    this.firstFormGroup
                        .get("FamilyMembersId")
                        .setValue(response.data[0].FamilyMembersID);
                    if (!!response.data[0].EmailAddress) {
                        this.validateEmail();
                    }
                    if (!!response.data[0].Phone_No) {
                        this.validateAltPhone();
                    }
                    // console.log(response.data[0]);
                }
            });

        const currentuserdata = localStorage.getItem("UserDetail");
        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));

            this.firstFormGroup
                .get("ReferralCode")
                .setValue(this.currentUser.ReferralCode);
            this.referralcode = this.currentUser.ReferralCode;
        }

        this.getSupplierFromDb();
    }

    getSupplierFromDb(): any {
        const data = {
            searchText: "",
            energyTypeId: this.switchinType,
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
            } else {
                this.SupplierDB = [];
                this.tempSupplierDB = [];
            }
        });
    }
    electricityChange(event): any {
        if (event.value == 2) {
            this.firstFormGroup.get("ElectricityConsumption").setValue("");
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup
                .get("ElectricityConsumptionPeriodID")
                .setValue("");
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].updateValueAndValidity();
            this.firstFormGroup.get("GasConsumption").setValue("");
            this.firstFormGroup.controls["GasConsumption"].clearValidators();
            this.firstFormGroup.controls[
                "GasConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup.get("GasConsumptionPeriodID").setValue("");
            this.firstFormGroup.controls[
                "GasConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "GasConsumptionPeriodID"
            ].updateValueAndValidity();
        } else {
            this.firstFormGroup.get("ElectricityConsumption").setValue("");
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].setValidators(Validators.required);
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup
                .get("ElectricityConsumptionPeriodID")
                .setValue("");
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].setValidators(Validators.required);
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].updateValueAndValidity();
            this.firstFormGroup.get("GasConsumption").setValue("");
            this.firstFormGroup.controls["GasConsumption"].setValidators(
                Validators.required
            );
            this.firstFormGroup.controls[
                "GasConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup.get("GasConsumptionPeriodID").setValue("");
            this.firstFormGroup.controls[
                "GasConsumptionPeriodID"
            ].setValidators(Validators.required);
            this.firstFormGroup.controls[
                "GasConsumptionPeriodID"
            ].updateValueAndValidity();
        }
        if (this.electricityUse == 2) {
            this.firstFormGroup.controls[
                "Electricity_Day_Consumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "Electricity_Day_Consumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "Electricity_Day_ConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "Electricity_Day_ConsumptionPeriodID"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "Electricity_Night_Consumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "Electricity_Night_Consumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].updateValueAndValidity();
        }
    }
    editCustomer(): any {
        debugger;
        this.EditCustomer = true;
        this.firstFormGroup.controls["FirstName"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls["FirstName"].updateValueAndValidity();
        this.firstFormGroup.controls["LastName"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls["LastName"].updateValueAndValidity();
        this.firstFormGroup.controls["EmailAddress"].setValidators([
            Validators.required,
            Validators.pattern(this.emailPattern),
        ]);
        this.firstFormGroup.controls["EmailAddress"].updateValueAndValidity();

        this.firstFormGroup.controls["DOB"].clearValidators();
        this.firstFormGroup.controls["DOB"].updateValueAndValidity();
        this.firstFormGroup.controls["ResidentalStatusId"].clearValidators();
        this.firstFormGroup.controls[
            "ResidentalStatusId"
        ].updateValueAndValidity();
        this.firstFormGroup.controls["TimeOfCurrentAddress"].clearValidators();
        this.firstFormGroup.controls[
            "TimeOfCurrentAddress"
        ].updateValueAndValidity();
        this.firstFormGroup.controls["HouseTypeID"].clearValidators();
        this.firstFormGroup.controls["HouseTypeID"].updateValueAndValidity();
        this.firstFormGroup.controls["FamilyMembersId"].clearValidators();
        this.firstFormGroup.controls[
            "FamilyMembersId"
        ].updateValueAndValidity();
        this.firstFormGroup.controls["NoOfRoomsId"].clearValidators();
        this.firstFormGroup.controls["NoOfRoomsId"].updateValueAndValidity();
        this.firstFormGroup.controls["EmploymentStatusId"].clearValidators();
        this.firstFormGroup.controls[
            "EmploymentStatusId"
        ].updateValueAndValidity();

        if (this.economicMeter == 1) {
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].updateValueAndValidity();
        } else {
            if (this.electricityUse != 2) {
                this.firstFormGroup.controls[
                    "ElectricityConsumption"
                ].setValidators(Validators.required);
                this.firstFormGroup.controls[
                    "ElectricityConsumption"
                ].updateValueAndValidity();
                this.firstFormGroup.controls[
                    "ElectricityConsumptionPeriodID"
                ].setValidators(Validators.required);
                this.firstFormGroup.controls[
                    "ElectricityConsumptionPeriodID"
                ].updateValueAndValidity();
            }
        }
        if (this.IsGetQuote == true) {
            if (this.IsEmail == true) {
                if (this.IsPhone == true) {
                    if (this.IsAltPhone == true) {
                        if (this.firstFormGroup.valid) {
                            Swal.fire({
                                title: "Please Confirm your Personal details.",

                                html:
                                    '<br/><b style="font-size: 15px">Name:</b> <span style="font-size: 13px">' +
                                    this.firstFormGroup.controls["FirstName"]
                                        .value +
                                    " " +
                                    this.firstFormGroup.controls["LastName"]
                                        .value +
                                    "</span><br/><br/>" +
                                    '<b style="font-size: 15px">Email address:</b> <span style="font-size: 13px">' +
                                    this.firstFormGroup.controls["EmailAddress"]
                                        .value +
                                    "</span><br/><br/>" +
                                    '<b style="font-size: 15px">Phone No.:</b> <span style="font-size: 13px">' +
                                    this.phone_number +
                                    "</span><br/><br/>",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Confirm",
                            }).then((result) => {
                                if (result.value) {
                                    const height = $("#container-3").height();
                                    $("#container-3").scrollTop(height / 2);
                                    this.saveUser();
                                    // stepper.next();
                                }
                            });
                        } else {
                            Swal.fire({
                                type: "error",
                                title: "Error",
                                text: "Please enter all required data.",
                            });
                        }
                    } else {
                        if (!!this.AlternativeMobileNumber) {
                            this.IsAltPhone = false;
                        }

                        Swal.fire({
                            type: "error",
                            title: "Error",
                            text:
                                "Please enter valid Alternative phone number.",
                        });
                    }
                } else {
                    if (
                        this.phone_number == null ||
                        this.phone_number == undefined
                    ) {
                        this.IsPhone = false;
                    }
                    Swal.fire({
                        type: "error",
                        title: "Error",
                        text: "Please enter valid Phone number.",
                    });
                }
            } else {
                Swal.fire({
                    type: "error",
                    title: "Error",
                    text: "Please enter valid Email address.",
                });
            }
        } else {
            Swal.fire({
                type: "error",
                title: "Error",
                text:
                    "Please click on Get Quote; to receive the Quote in Email.",
            });
        }
    }
    getAllResourceData(): any {
        this._allResourceService.getallSystemenumdata().subscribe((result) => {
            this.responseForAll = result;
            this.period = this.responseForAll.filter((x) => x.ListID == 3);
            const typeOfHouse1 = this.responseForAll.filter(
                (x) => x.ListID == 2
            );
            this.typeOfHouse = _.sortBy(typeOfHouse1, ["Seq"]);
            const familyMember1 = this.responseForAll.filter(
                (x) => x.ListID == 4
            );
            this.familyMember = _.sortBy(familyMember1, ["Seq"]);
            const noOfRooms1 = this.responseForAll.filter((x) => x.ListID == 5);
            this.noOfRooms = _.sortBy(noOfRooms1, ["Seq"]);
            const epmStatus1 = this.responseForAll.filter((x) => x.ListID == 6);
            this.epmStatus = _.sortBy(epmStatus1, ["Seq"]);
            const resStatusL1 = this.responseForAll.filter(
                (x) => x.ListID == 7
            );
            this.resStatusL = _.sortBy(resStatusL1, ["Seq"]);
            const timeOfCurAdd1 = this.responseForAll.filter(
                (x) => x.ListID == 8
            );
            this.timeOfCurAdd = _.sortBy(timeOfCurAdd1, ["Seq"]);
            const hearAbout1 = this.responseForAll.filter((x) => x.ListID == 9);
            this.hearAbout = _.sortBy(hearAbout1, ["Seq"]);
            // const paymentMethods1 = this.responseForAll.filter(
            //     x => x.ListID == 10
            // );
            // this.paymentMethods = _.sortBy(paymentMethods1, ["Seq"]);
        });
    }

    getPaymentmethods(): any {
        this.registerService.getPaymentDetails().subscribe((response) => {
            if (!!response) {
                this.paymentMethods = JSON.parse(response);
            }
        });
    }

    // selectAddress
    validatePostalcode(): any {
        const postCode = this.PostCode;

        this.registerService
            .validatepostalcode(this.PostCode)
            .subscribe((data) => {
                if (data.data == "Postal Code is Valid.") {
                    this.getAddress();
                } else {
                    Swal.fire({
                        type: "error",
                        title: "Error",
                        text: "Invalid Post Code.",
                    });
                    this.Address = [
                        {
                            value: "0",
                            "#cdata-section": "Enter address manually",
                        },
                    ];
                }
            });
    }
    getAddress(): any {
        this.Address = [
            { value: "0", "#cdata-section": "Enter address manually" },
        ];
        if (this.firstFormGroup.controls["PostCode"].valid) {
            const postCode = this.firstFormGroup.controls["PostCode"].value;
            // let code = postCode.split(' ');
            // code = code[0] + '+' + code[1];
            this.registerService.gerAddress(postCode).subscribe((data) => {
                let response = data;
                if (data.status_code == 0) {
                    response = JSON.parse(data.data);
                }
                if (!!response) {
                    const address = response.Response;

                    for (let data of address.Address) {
                        this.Address.push(data);
                    }
                    if (this.IsFormDataBind != true) {
                        $("#mat-select").click();
                    } else {
                        if (!!this.leadDataEdit.Country) {
                            this.selectedValue = "Enter address manually";
                        } else {
                            this.selectedValue = this.leadDataEdit.AddressLine1;
                        }

                        this.selectAddress(event);
                    }
                }
            });
        } else {
            this.Address = [
                { value: "0", "#cdata-section": "Enter address manually" },
            ];
            this.selectAddress(event);
        }
    }
    selectAddress(event): any {
        if (event.value == "Enter address manually") {
            this.firstFormGroup.get("AddressLine1").setValue("");
            this.firstFormGroup.get("AddressLine2").setValue("");
            this.firstFormGroup.get("HouseNumber").setValue("");
            this.firstFormGroup.get("FlatNumber").setValue("");
            this.firstFormGroup.controls["PostCode"].setValidators(
                Validators.required
            );
            this.firstFormGroup.controls["PostCode"].updateValueAndValidity();
            this.firstFormGroup.controls["City"].setValidators(
                Validators.required
            );
            this.firstFormGroup.controls["City"].updateValueAndValidity();
            this.firstFormGroup.controls["HouseName"].setValidators(
                Validators.required
            );
            this.firstFormGroup.controls["HouseName"].updateValueAndValidity();
            this.firstFormGroup.controls["StreetName"].setValidators(
                Validators.required
            );
            this.firstFormGroup.controls["StreetName"].updateValueAndValidity();
            this.firstFormGroup.controls["Country"].setValidators(
                Validators.required
            );
            this.firstFormGroup.controls["Country"].updateValueAndValidity();
            this.firstFormGroup.controls["GasMPRNnumber"].setValidators(
                Validators.required
            );
            this.firstFormGroup.controls[
                "GasMPRNnumber"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "ElectricitySupplyNumber"
            ].setValidators(Validators.required);
            this.firstFormGroup.controls[
                "ElectricitySupplyNumber"
            ].updateValueAndValidity();
            this.regionAddress =
                "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
                this.PostCode +
                ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG";

            this.getRegion();
        } else {
            this.regionAddress =
                "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
                this.PostCode +
                ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG";

            this.getRegion();
            this.firstFormGroup.get("AddressLine1").setValue("");
            this.firstFormGroup.get("AddressLine2").setValue("");
            this.firstFormGroup.get("HouseNumber").setValue("");
            this.firstFormGroup.get("FlatNumber").setValue("");
            this.firstFormGroup.controls["PostCode"].clearValidators();
            this.firstFormGroup.controls["PostCode"].updateValueAndValidity();
            this.firstFormGroup.controls["City"].clearValidators();
            this.firstFormGroup.controls["City"].updateValueAndValidity();
            this.firstFormGroup.controls["HouseName"].clearValidators();
            this.firstFormGroup.controls["HouseName"].updateValueAndValidity();
            this.firstFormGroup.controls["StreetName"].clearValidators();
            this.firstFormGroup.controls["StreetName"].updateValueAndValidity();
            this.firstFormGroup.controls["Country"].clearValidators();
            this.firstFormGroup.controls["Country"].updateValueAndValidity();
            this.firstFormGroup.controls["GasMPRNnumber"].clearValidators();
            this.firstFormGroup.controls[
                "GasMPRNnumber"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "ElectricitySupplyNumber"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricitySupplyNumber"
            ].updateValueAndValidity();
        }
    }

    cancelUser(): any {
        this.router.navigate(["/login"]);
    }
    getRegion(): any {
        this.registerService
            .getRegionById(this.regionAddress)
            .subscribe((response) => {
                if (!!response) {
                    this.regionData = JSON.parse(response);
                    this.firstFormGroup
                        .get("ElectricityCurrentPlan_SupplierID")
                        .setValue(this.regionData.defaultSupplier);
                    this.firstFormGroup
                        .get("GasCurrentPlan_SupplierID")
                        .setValue(5);
                    this.bothSameSupplier = this.regionData.defaultSupplier;

                    this.getSupplierforAll();
                }
            });
    }

    getSupplierforAll(): any {
        let data = {
            value: this.regionData.defaultSupplier,
        };
        let gasData = {
            value: 5,
        };
        this.getSupplierElectricity(data);
        this.setSupplier(gasData);
        this.getplanforboth(data);
    }
    checkMPAN(event): any {
        const primes = [3, 5, 7, 13, 17, 19, 23, 29, 31, 37, 41, 43];
        let sum = 0;
        const m = event.toString();

        if (m.length - 1 === primes.length) {
            for (let i = 0; i < primes.length; i++) {
                sum += parseInt(m.charAt(i)) * primes[i];
            }
            return (sum % 11) % 10 === parseInt(m.charAt(12));
        } else {
            alert("Invalid MPAN Number");
        }
    }

    electricityTypeChange(event): any {
        this.getSupplierforAll();
        if (event.value == 2) {
            this.firstFormGroup.get("GasConsumption").setValue("");
            this.firstFormGroup.get("GasConsumptionPeriodID").setValue("");
            this.firstFormGroup.controls["GasConsumption"].clearValidators();
            this.firstFormGroup.controls[
                "GasConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "GasConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "GasConsumptionPeriodID"
            ].updateValueAndValidity();
        } else {
            this.firstFormGroup.controls["GasConsumption"].setValidators(
                Validators.required
            );
            this.firstFormGroup.controls[
                "GasConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "GasConsumptionPeriodID"
            ].setValidators(Validators.required);
            this.firstFormGroup.controls[
                "GasConsumptionPeriodID"
            ].updateValueAndValidity();
        }
        this.getSupplierList();
    }

    getSupplierList(): any {
        this.registerService.getSupplier().subscribe((response) => {
            let data = {};
            this.suppliers = [];
            this.ElecSupplier = [];
            this.GasSupplier = [];
            // let result = [];
            if (!!response) {
                data = JSON.parse(response);
                for (let key in data) {
                    if (key == "D") {
                        let innerArray = [];
                        innerArray = data[key];
                        innerArray.forEach((obj) => {
                            this.suppliers.push(obj);
                        });
                    }
                    if (key == "E") {
                        let innerArray = [];
                        innerArray = data[key];
                        innerArray.forEach((obj) => {
                            this.ElecSupplier.push(obj);
                        });
                    }

                    if (key == "G") {
                        let innerArray = [];
                        innerArray = data[key];
                        innerArray.forEach((obj) => {
                            this.GasSupplier.push(obj);
                        });
                    }
                }
            }
        });
    }

    radioChange(event): any {
        this.getSupplierforAll();
        if (event == 1) {
            this.daynightusage = true;
            this.firstFormGroup.controls[
                "Electricity_Day_Consumption"
            ].setValidators(Validators.required);
            this.firstFormGroup.controls[
                "Electricity_Day_Consumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "Electricity_Day_ConsumptionPeriodID"
            ].setValidators(Validators.required);
            this.firstFormGroup.controls[
                "Electricity_Day_ConsumptionPeriodID"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "Electricity_Night_Consumption"
            ].setValidators(Validators.required);
            this.firstFormGroup.controls[
                "Electricity_Night_Consumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].updateValueAndValidity();
        } else {
            this.daynightusage = false;
            this.firstFormGroup.get("Electricity_Day_Consumption").setValue("");
            this.firstFormGroup
                .get("Electricity_Day_ConsumptionPeriodID")
                .setValue("");
            this.firstFormGroup.controls[
                "Electricity_Day_Consumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "Electricity_Day_Consumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "Electricity_Day_ConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "Electricity_Day_ConsumptionPeriodID"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "Electricity_Night_Consumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "Electricity_Night_Consumption"
            ].updateValueAndValidity();
        }

        if (this.electricityUse == 2) {
            this.firstFormGroup.controls[
                "Electricity_Day_Consumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "Electricity_Day_Consumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "Electricity_Day_ConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "Electricity_Day_ConsumptionPeriodID"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "Electricity_Night_Consumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "Electricity_Night_Consumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].updateValueAndValidity();
        }
    }

    getplanforboth(event): any {
        const supplierId = event.value;
        this.bothSameSupplierPlan = null;
        let e7;
        if (this.economicMeter == 1) {
            e7 = "on";
        } else {
            e7 = false;
        }
        const getpyamentdata = {
            supplierId: supplierId,
            serviceType: "D",
            e7: e7,
        };
        this.registerService
            .getPaymentMethodsByType(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    const data = JSON.parse(response);
                    this.dualPaymentData = data;
                    this.bothSamePayment = "MDD";
                    let data12 = {
                        value: this.bothSamePayment,
                    };
                    this.getBothSupplierPlan(data12);
                }
            });
    }

    getBothSupplierPlan(event): any {
        const planName = event.value;
        let e7;

        if (this.economicMeter == 1) {
            e7 = "on";
        } else {
            e7 = false;
        }

        let serviceType;
        if (this.switchinType == 1) {
            serviceType = "D";
        } else {
            serviceType = "E";
        }
        const getpyamentdata = {
            supplierId: this.bothSameSupplier,
            regionId: this.regionData.id,
            serviceType: serviceType,
            paymentMethod: planName,
            e7: e7,
        };
        this.registerService
            .getDefaultTarrif(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    const data = JSON.parse(response);
                    this.dualSupplierDefultData = data;
                }
            });
        this.registerService
            .getPlanMethodsByType(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    const data = JSON.parse(response);
                    this.supplierPlansboth = data;
                    this.bothSameSupplierPlan = data[0];
                }
            });
    }

    getSupplierElectricity(event): any {
        const supplierId = event.value;
        let e7;
        if (this.economicMeter == 1) {
            e7 = "on";
        } else {
            e7 = false;
        }
        const getpyamentdata = {
            supplierId: supplierId,
            serviceType: "E",
            e7: e7,
        };
        this.registerService
            .getPaymentMethodsByType(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    const data = JSON.parse(response);
                    this.paymentMethodElc = data;
                    this.firstFormGroup
                        .get("ElectricityCurrentPlan_PlanPaymentID")
                        .setValue("MDD");
                    const data1 = {
                        value: "MDD",
                    };
                    this.getElecSupplierPlan(data1);
                }
            });
    }

    getElecSupplierPlan(event): any {
        const planName = event.value;
        let e7;
        if (this.economicMeter == 1) {
            e7 = true;
        } else {
            e7 = false;
        }
        const getpyamentdata = {
            supplierId: this.firstFormGroup.controls[
                "ElectricityCurrentPlan_SupplierID"
            ].value,
            regionId: this.regionData.id,
            serviceType: "E",
            paymentMethod: planName,
            e7: e7,
        };
        this.registerService
            .getDefaultTarrif(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    const data = JSON.parse(response);
                    this.ElcSupplierDefaultData = data;
                }
                this.registerService
                    .getPlanMethodsByType(getpyamentdata)
                    .subscribe((response) => {
                        if (!!response) {
                            const data = JSON.parse(response);
                            this.supplierPlansElec = data;
                            // this.firstFormGroup.get('ElectricityCurrentPlan_PlanID').setValue(this.ElcSupplierDefaultData.tariffName);
                            if (!!this.supplierPlansElec) {
                                for (let tarrifName of this.supplierPlansElec) {
                                    if (
                                        tarrifName ==
                                        this.ElcSupplierDefaultData.tariffName
                                    ) {
                                        this.firstFormGroup
                                            .get(
                                                "ElectricityCurrentPlan_PlanID"
                                            )
                                            .setValue(
                                                this.ElcSupplierDefaultData
                                                    .tariffName
                                            );
                                    } else {
                                        this.firstFormGroup
                                            .get(
                                                "ElectricityCurrentPlan_PlanID"
                                            )
                                            .setValue(data[0]);
                                    }
                                }
                            }
                        }
                    });
            });
    }

    setSupplier(event): any {
        const supplierId = event.value;

        this.getPlanListforGas(supplierId);
    }
    getPlanListforGas(id): any {
        let e7;

        e7 = false;

        const getpyamentdata = {
            supplierId: id,
            serviceType: "G",
            e7: e7,
        };

        this.registerService
            .getPaymentMethodsByType(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    const data = JSON.parse(response);
                    this.GasPaymentData = data;
                    this.firstFormGroup
                        .get("GasCurrentPlan_PlanPaymentID")
                        .setValue("MDD");
                    const data1 = {
                        value: "MDD",
                    };
                    this.getGasSupplierPlan(data1);
                }
            });
    }
    getGasSupplierPlan(event): any {
        const planName = event.value;
        let e7;

        e7 = false;

        const getpyamentdata = {
            supplierId: this.firstFormGroup.controls[
                "GasCurrentPlan_SupplierID"
            ].value,
            regionId: this.regionData.id,
            serviceType: "G",
            paymentMethod: planName,
            e7: e7,
        };
        this.registerService
            .getDefaultTarrif(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    const data = JSON.parse(response);
                    this.gasSupplierDefaultData = data;
                }
                this.registerService
                    .getPlanMethodsByType(getpyamentdata)
                    .subscribe((response) => {
                        if (!!response) {
                            const data = JSON.parse(response);
                            this.supplierPlans = data;
                            // this.firstFormGroup.get('GasCurrentPlan_PlanID').setValue(this.gasSupplierDefaultData.tariffName);
                            if (!!this.supplierPlans) {
                                for (let tarrifName of this.supplierPlans) {
                                    if (
                                        tarrifName ==
                                        this.gasSupplierDefaultData.tariffName
                                    ) {
                                        this.firstFormGroup
                                            .get("GasCurrentPlan_PlanID")
                                            .setValue(
                                                this.gasSupplierDefaultData
                                                    .tariffName
                                            );
                                    } else {
                                        this.firstFormGroup
                                            .get("GasCurrentPlan_PlanID")
                                            .setValue(data[0]);
                                    }
                                }
                            }
                        }
                    });
            });
    }

    isBothSupplier(event): any {}

    validateEmail(): any {
        this.registerService.validateEmail(this.email_add).subscribe((data) => {
            if (!!data) {
                let data1 = JSON.parse(data);
                if (data1.data.Status == "Invalid") {
                    Swal.fire({
                        type: "error",
                        title: "Error",
                        text: "Invalid Email address.",
                    });
                    data = false;
                    this.IsEmail = data;
                } else {
                    data = true;
                    this.IsEmail = data;
                }
            }
        });
    }

    validatePhone(): any {
        this.registerService.getPhoneNumber(this.phone_number).subscribe(
            (data) => {
                if (!!data) {
                    let validate = JSON.parse(data);
                    if (!!validate.errors) {
                        Swal.fire({
                            type: "error",
                            title: "Error",
                            text: "Invalid Phone number.",
                        });
                        this.IsPhone = false;
                    } else {
                        this.IsPhone = true;
                    }
                }
            },
            (err) => {}
        );
    }

    validateAltPhone(): any {
        if (!!this.AlternativeMobileNumber) {
            this.registerService
                .getPhoneNumber(this.AlternativeMobileNumber)
                .subscribe(
                    (data) => {
                        if (!!data) {
                            let validate = JSON.parse(data);
                            if (!!validate.errors) {
                                Swal.fire({
                                    type: "error",
                                    title: "Error",
                                    text: "Invalid Alternative Phone number.",
                                });
                                this.IsAltPhone = false;
                            } else {
                                this.IsAltPhone = true;
                            }
                        }
                    },
                    (err) => {}
                );
        } else {
            this.IsAltPhone = true;
        }
    }
    getSettingsList(): any {
        this._settingSerivce.getSettingsList().subscribe((response) => {
            if (response.status_code === 200) {
                this.settings = response.data;
                this.planDiscount = this.settings[5].Setting_Value;
            } else {
                this.settings = null;
            }
        });
    }

    getComparisionResults(): any {
        let payment;
        if (this.bothSupplier == true) {
            payment = this.bothSamePayment;
        } else {
            if (this.switchinType == 1) {
                payment = this.firstFormGroup.controls[
                    "GasCurrentPlan_PlanPaymentID"
                ].value;
            } else {
                payment = this.firstFormGroup.controls[
                    "ElectricityCurrentPlan_PlanPaymentID"
                ].value;
            }
        }
        let da;
        let ga;
        let eleccon;
        let gascon;
        let comfig;
        if (this.electricityUse == 0) {
            da = this.firstFormGroup.controls["ElectricityConsumptionPeriodID"]
                .value;
            ga = this.firstFormGroup.controls["GasConsumptionPeriodID"].value;

            if (da == 1170) {
                eleccon =
                    this.firstFormGroup.controls["ElectricityConsumption"]
                        .value * 12;
            } else if (da == 1171) {
                eleccon =
                    this.firstFormGroup.controls["ElectricityConsumption"]
                        .value * 4;
            } else {
                eleccon = this.firstFormGroup.controls["ElectricityConsumption"]
                    .value;
            }

            if (ga == 1170) {
                gascon =
                    this.firstFormGroup.controls["GasConsumption"].value * 12;
            } else if (ga == 1171) {
                gascon =
                    this.firstFormGroup.controls["GasConsumption"].value * 4;
            } else {
                gascon = this.firstFormGroup.controls["GasConsumption"].value;
            }

            comfig = "pound";
        } else if (this.electricityUse == 1) {
            eleccon = this.firstFormGroup.controls["GasConsumption"].value;
            gascon = this.firstFormGroup.controls["ElectricityConsumption"]
                .value;
            comfig = "kwh";
        } else if (this.electricityUse == 2) {
            let el = this.firstFormGroup.controls["TypeOfHome"].value;
            if (el == 1) {
                eleccon = 1800;
                gascon = 8000;
            } else if (el == 2) {
                eleccon = 2900;
                gascon = 12000;
            } else if (el == 3) {
                eleccon = 4300;
                gascon = 17000;
            }
            comfig = "estimate";
        }

        let serviceType;
        let data;
        let e7Usage;
        if (this.daynightusage == false) {
            e7Usage = 0;
        } else {
            e7Usage = this.firstFormGroup.controls[
                "Electricity_Night_Consumption"
            ].value;
        }
        if (this.switchinType == 1) {
            serviceType = "D";

            data = {
                agentId: "100",
                currentAddress: this.regionAddress,
                currentElectricityTariff: this.currentTariff.E,
                currentGasTariff: this.currentTariff.G,
                currentServiceType: "dfs",
                energyUsage: {
                    annualElecConsumption: eleccon,
                    annualGasConsumption: gascon,
                    consumptionFigures: comfig,
                    e7Usage: e7Usage,
                },
                features: "",
                homeMover: false,
                postcode: this.PostCode,
                preferredPaymentMethod: "MDD",
                serviceTypeToCompare: serviceType,
                showOnlyApplyTariff: "true",
            };
        } else {
            serviceType = "E";

            data = {
                agentId: "100",
                currentAddress: this.regionAddress,
                currentElectricityTariff: this.currentTariff.E,
                currentServiceType: "dfs",
                energyUsage: {
                    annualElecConsumption: eleccon,
                    annualGasConsumption: gascon,
                    consumptionFigures: comfig,
                    e7Usage: 0,
                },
                features: "",
                homeMover: false,
                postcode: this.PostCode,
                preferredPaymentMethod: "MDD",
                serviceTypeToCompare: serviceType,
                showOnlyApplyTariff: "true",
            };
        }

        this.registerService.getComparision(data).subscribe((response: any) => {
            if (!!response) {
                this.comparisionData = JSON.parse(response);
                this.maxPercentageSupplier = _.maxBy(
                    this.comparisionData.tariffs,
                    "savingPercentage"
                );
                let data1 = this.maxPercentageSupplier.tariffId;
                let elcSupplier;
                let gasSupplier;
                if (this.bothSupplier == false) {
                    elcSupplier = this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].value;
                    gasSupplier = this.firstFormGroup.controls[
                        "GasCurrentPlan_SupplierID"
                    ].value;
                } else {
                    elcSupplier = this.bothSameSupplier;
                    gasSupplier = this.bothSameSupplier;
                }
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
                this.registerService
                    .gettarrifdatabyTariffId(data1)
                    .subscribe((response: any) => {
                        if (!!response) {
                            this.IsGetQuote = true;
                            let tarrifResponse = JSON.parse(response);
                            let val = _.minBy(this.SupplierDB, "Rank");
                            tarrifResponse.supplierName = val.Name;
                            tarrifResponse.supplierId = val.ID;
                            this.maxPercentageSupplier.supplierName = val.Name;
                            this.maxPercentageSupplier.supplierId = val.ID;

                            const data = {
                                data1: this.comparisionData,
                                data2: tarrifResponse,
                                data3: this.currentTariff,
                                data4: this.switchinType,
                            };
                            this.energy1 = this.maxPercentageSupplier;
                            console.log(this.energy1);
                            this.energy = data.data2;
                            this.emergyType = data.data4;
                            this.energy.standingChargeGas =
                                this.energy.standingChargeGas / 365;
                            this.energy.standingChargeElec =
                                this.energy.standingChargeElec / 365;
                            this.nightRate = tarrifResponse.priceE7;
                            this.unitRate = tarrifResponse.price1Elec;
                            this.currentEnergyElc = data.data3.E;
                            this.currentEnergyGas = data.data3.G;
                            this.energy1.imageName =
                                "https://www.theenergyshop.com/resources/img/supplier/100/" +
                                this.energy1.imageName;
                            this.planDiscount = Number(this.planDiscount);
                            this.energy1.savingPercentage =
                                this.energy1.savingPercentage +
                                this.planDiscount;
                            let total = this.energy1.saving + this.energy1.bill;
                            if (this.planDiscount != 0) {
                                this.energy1.saving =
                                    this.energy1.saving +
                                    (this.planDiscount * total) / 100;
                                this.energy1.bill =
                                    this.energy1.bill -
                                    (this.planDiscount * total) / 100;
                            }
                            this.averageMonth = this.energy1.bill / 12;
                            let elcPeriodId;
                            if (this.daynightusage == false) {
                                elcPeriodId = this.firstFormGroup.controls[
                                    "ElectricityConsumptionPeriodID"
                                ].value;
                            } else {
                                elcPeriodId = this.firstFormGroup.controls[
                                    "Electricity_Day_ConsumptionPeriodID"
                                ].value;
                            }
                            const gasPeriodId = this.firstFormGroup.controls[
                                "GasConsumptionPeriodID"
                            ].value;
                            if (elcPeriodId == 1170) {
                                this.currentEnergyElc.bill =
                                    this.currentEnergyElc.bill / 12;
                            } else if (elcPeriodId == 1171) {
                                this.currentEnergyElc.bill =
                                    this.currentEnergyElc.bill / 12;
                            } else {
                                this.currentEnergyElc.bill =
                                    this.currentEnergyElc.bill / 12;
                            }
                            if (!!this.currentEnergyGas) {
                                if (gasPeriodId == 1170) {
                                    this.currentEnergyGas.bill =
                                        this.currentEnergyGas.bill / 12;
                                } else if (gasPeriodId == 1171) {
                                    this.currentEnergyGas.bill =
                                        this.currentEnergyGas.bill / 12;
                                } else {
                                    this.currentEnergyGas.bill =
                                        this.currentEnergyGas.bill / 12;
                                }
                            }

                            if (this.switchinType == 1) {
                                this.avg =
                                    this.currentEnergyElc.bill +
                                    this.currentEnergyGas.bill;
                                this.averageMonth = this.averageMonth;
                            } else {
                                this.avg = this.currentEnergyElc.bill;
                            }
                        }
                    });
            }
        });
    }
    uploadIMGData(): any {
        this.loaderService.display(true);
        const node = document.getElementById("supplierDetails");
        domtoimage
            .toJpeg(node, {
                quality: 0.95,
                width: node.scrollWidth,
                height: node.scrollHeight,
            })
            .then((dataUrl) => {
                this.loaderService.display(true);
                // console.log(dataUrl);
                this.UploadImage(dataUrl);
            });
    }
    UploadImage(dataUrl): any {
        let data = {
            imagedata: dataUrl,
        };
        this.loaderService.display(true);
        this._settingSerivce.uploadImage(data).subscribe((response) => {
            this.loaderService.display(true);
            if (!!response) {
                if (this.IsImage == true) {
                    this.planImage = response;
                } else {
                    this.NewPlanImage = response;
                }

                if (this.IsImage == false) {
                    this.IsImage = true;
                    $(".existing-trf").show();
                    this.addpackage();
                } else {
                    this.uploadIMGData();
                    $(".existing-trf").hide();
                    this.IsImage = false;
                }
            }
        });
    }
    getUserCurrentTariff() {
        this.firstFormGroup.controls["FirstName"].clearValidators();
        this.firstFormGroup.controls["FirstName"].updateValueAndValidity();
        this.firstFormGroup.controls["LastName"].clearValidators();
        this.firstFormGroup.controls["LastName"].updateValueAndValidity();
        this.firstFormGroup.controls["EmailAddress"].clearValidators();
        this.firstFormGroup.controls["EmailAddress"].updateValueAndValidity();

        this.Isvalid = false;
        let IsvalidGas = false;

        if (this.electricityUse != 2) {
            if (this.switchinType == 1) {
                if (this.daynightusage == false) {
                    if (
                        !!this.firstFormGroup.controls[
                            "ElectricityConsumptionPeriodID"
                        ].value &&
                        !!this.firstFormGroup.controls["GasConsumptionPeriodID"]
                            .value &&
                        !!this.firstFormGroup.controls["ElectricityConsumption"]
                            .value &&
                        !!this.firstFormGroup.controls["GasConsumptionPeriodID"]
                            .value
                    ) {
                        this.Isvalid = true;
                    }
                } else {
                    if (
                        !!this.firstFormGroup.controls[
                            "Electricity_Day_Consumption"
                        ].value &&
                        !!this.firstFormGroup.controls[
                            "Electricity_Day_ConsumptionPeriodID"
                        ].value
                    ) {
                        this.Isvalid = true;
                    }
                }
            } else {
                if (this.daynightusage == false) {
                    if (
                        !!this.firstFormGroup.controls["ElectricityConsumption"]
                            .value &&
                        !!this.firstFormGroup.controls[
                            "ElectricityConsumptionPeriodID"
                        ].value
                    ) {
                        this.Isvalid = true;
                    }
                } else {
                    if (
                        !!this.firstFormGroup.controls[
                            "Electricity_Day_Consumption"
                        ].value &&
                        !!this.firstFormGroup.controls[
                            "Electricity_Day_ConsumptionPeriodID"
                        ].value
                    ) {
                        this.Isvalid = true;
                    } else {
                    }
                }
            }
        } else {
            if (!!this.firstFormGroup.controls["TypeOfHome"].value) {
                this.Isvalid = true;
            }
        }

        if (this.Isvalid == true) {
            let elecdata;
            let e7;
            let gasdata;
            if (this.bothSupplier == true) {
                elecdata = {
                    supplierId: this.bothSameSupplier,
                    paymentMethod: this.bothSamePayment,
                    tariffName: this.bothSameSupplierPlan,
                };
                gasdata = {
                    supplierId: this.bothSameSupplier,
                    paymentMethod: this.bothSamePayment,
                    tariffName: this.bothSameSupplierPlan,
                };
            } else {
                elecdata = {
                    supplierId: this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].value,
                    paymentMethod: this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].value,
                    tariffName: this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].value,
                };
                gasdata = {
                    supplierId: this.firstFormGroup.controls[
                        "GasCurrentPlan_SupplierID"
                    ].value,
                    paymentMethod: this.firstFormGroup.controls[
                        "GasCurrentPlan_PlanPaymentID"
                    ].value,
                    tariffName: this.firstFormGroup.controls[
                        "GasCurrentPlan_PlanID"
                    ].value,
                };
            }

            if (this.economicMeter == 1) {
                e7 = true;
            } else {
                e7 = false;
            }
            let da;
            let ga;
            let eleccon;
            let gascon;
            let comfig;
            if (this.electricityUse == 0) {
                da = this.firstFormGroup.controls[
                    "ElectricityConsumptionPeriodID"
                ].value;
                ga = this.firstFormGroup.controls["GasConsumptionPeriodID"]
                    .value;

                if (da == 1170) {
                    eleccon =
                        this.firstFormGroup.controls["ElectricityConsumption"]
                            .value * 12;
                } else if (da == 1171) {
                    eleccon =
                        this.firstFormGroup.controls["ElectricityConsumption"]
                            .value * 4;
                } else {
                    eleccon = this.firstFormGroup.controls[
                        "ElectricityConsumption"
                    ].value;
                }

                if (ga == 1170) {
                    gascon =
                        this.firstFormGroup.controls["GasConsumption"].value *
                        12;
                } else if (ga == 1171) {
                    gascon =
                        this.firstFormGroup.controls["GasConsumption"].value *
                        4;
                } else {
                    gascon = this.firstFormGroup.controls["GasConsumption"]
                        .value;
                }
                comfig = "pound";
            } else if (this.electricityUse == 1) {
                eleccon = this.firstFormGroup.controls["GasConsumption"].value;
                gascon = this.firstFormGroup.controls["ElectricityConsumption"]
                    .value;
                comfig = "kwh";
            } else if (this.electricityUse == 2) {
                let el = this.firstFormGroup.controls["TypeOfHome"].value;
                if (el == 1) {
                    eleccon = 1800;
                    gascon = 8000;
                } else if (el == 2) {
                    eleccon = 2900;
                    gascon = 12000;
                } else if (el == 3) {
                    eleccon = 4300;
                    gascon = 17000;
                }
                comfig = "estimate";
            }
            let serviceType;
            if (this.switchinType == 1) {
                serviceType = "D";
            } else {
                serviceType = "E";
            }
            let e7Usage;
            if (this.daynightusage == false) {
                e7Usage = 0;
            } else {
                e7Usage = this.firstFormGroup.controls[
                    "Electricity_Night_Consumption"
                ].value;
            }
            e7Usage;
            let data = {
                currentElectricityTariff: {
                    e7: e7,
                    paymentMethod: elecdata.paymentMethod,
                    supplierId: elecdata.supplierId,
                    tariffName: elecdata.tariffName,
                    regionId: this.regionData.id,
                },
                currentGasTariff: {
                    paymentMethod: gasdata.paymentMethod,
                    regionId: this.regionData.id,
                    supplierId: gasdata.supplierId,
                    tariffName: gasdata.tariffName,
                },
                currentServiceType: "dfs",
                energyUsage: {
                    annualElecConsumption: eleccon,
                    annualGasConsumption: gascon,
                    consumptionFigures: comfig,
                    e7Usage: e7Usage,
                },
                serviceTypeToCompare: serviceType,
            };

            this.registerService
                .getUserCurrentTariff(data)
                .subscribe((response: any) => {
                    if (!!response) {
                        this.currentTariff = JSON.parse(response);
                        this.getComparisionResults();
                    }
                });
        } else {
            Swal.fire({
                type: "error",
                title: "Error",
                text: "Please enter all the data.",
            });
        }
    }
    submitCustomer = () => {
        this.EditCustomer = false;
        this.IsAddCustomer = true;
        this.firstFormGroup.controls["FirstName"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls["FirstName"].updateValueAndValidity();
        this.firstFormGroup.controls["LastName"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls["LastName"].updateValueAndValidity();
        this.firstFormGroup.controls["EmailAddress"].setValidators([
            Validators.required,
            Validators.pattern(this.emailPattern),
        ]);
        this.firstFormGroup.controls["EmailAddress"].updateValueAndValidity();
        this.firstFormGroup.controls["DOB"].setValidators(Validators.required);
        this.firstFormGroup.controls["DOB"].updateValueAndValidity();
        this.firstFormGroup.controls["ResidentalStatusId"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls[
            "ResidentalStatusId"
        ].updateValueAndValidity();
        this.firstFormGroup.controls["TimeOfCurrentAddress"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls[
            "TimeOfCurrentAddress"
        ].updateValueAndValidity();
        this.firstFormGroup.controls["HouseTypeID"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls["HouseTypeID"].updateValueAndValidity();
        this.firstFormGroup.controls["FamilyMembersId"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls[
            "FamilyMembersId"
        ].updateValueAndValidity();
        this.firstFormGroup.controls["NoOfRoomsId"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls["NoOfRoomsId"].updateValueAndValidity();
        this.firstFormGroup.controls["EmploymentStatusId"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls[
            "EmploymentStatusId"
        ].updateValueAndValidity();

        if (this.economicMeter == 1) {
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumption"
            ].updateValueAndValidity();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].clearValidators();
            this.firstFormGroup.controls[
                "ElectricityConsumptionPeriodID"
            ].updateValueAndValidity();
        } else {
            if (this.electricityUse != 2) {
                this.firstFormGroup.controls[
                    "ElectricityConsumption"
                ].setValidators(Validators.required);
                this.firstFormGroup.controls[
                    "ElectricityConsumption"
                ].updateValueAndValidity();
                this.firstFormGroup.controls[
                    "ElectricityConsumptionPeriodID"
                ].setValidators(Validators.required);
                this.firstFormGroup.controls[
                    "ElectricityConsumptionPeriodID"
                ].updateValueAndValidity();
            }
        }

        if (this.IsGetQuote == true) {
            if (this.IsEmail == true) {
                if (this.IsPhone == true) {
                    if (this.IsAltPhone == true) {
                        if (this.firstFormGroup.valid) {
                            Swal.fire({
                                title: "Please Confirm your Personal details.",

                                html:
                                    '<br/><b style="font-size: 15px">Name:</b> <span style="font-size: 13px">' +
                                    this.firstFormGroup.controls["FirstName"]
                                        .value +
                                    " " +
                                    this.firstFormGroup.controls["LastName"]
                                        .value +
                                    "</span><br/><br/>" +
                                    '<b style="font-size: 15px">Email address:</b> <span style="font-size: 13px">' +
                                    this.firstFormGroup.controls["EmailAddress"]
                                        .value +
                                    "</span><br/><br/>" +
                                    '<b style="font-size: 15px">Phone No.:</b> <span style="font-size: 13px">' +
                                    this.phone_number +
                                    "</span><br/><br/>",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Confirm",
                            }).then((result) => {
                                if (result.value) {
                                    const height = $("#container-3").height();
                                    $("#container-3").scrollTop(height / 2);
                                    this.saveUser();
                                    // stepper.next();
                                }
                            });
                        } else {
                            Swal.fire({
                                type: "error",
                                title: "Error",
                                text: "Please enter all required data.",
                            });
                        }
                    } else {
                        if (!!this.AlternativeMobileNumber) {
                            this.IsAltPhone = false;
                        }

                        Swal.fire({
                            type: "error",
                            title: "Error",
                            text:
                                "Please enter valid Alternative phone number.",
                        });
                    }
                } else {
                    if (
                        this.phone_number == null ||
                        this.phone_number == undefined
                    ) {
                        this.IsPhone = false;
                    }
                    Swal.fire({
                        type: "error",
                        title: "Error",
                        text: "Please enter valid Phone number.",
                    });
                }
            } else {
                Swal.fire({
                    type: "error",
                    title: "Error",
                    text: "Please enter valid Email address.",
                });
            }
        } else {
            Swal.fire({
                type: "error",
                title: "Error",
                text:
                    "Please click on Get Quote; to receive the Quote in Email.",
            });
        }
    };

    saveUser(): any {
        this.ISsaveLead = true;
        this.uploadIMGData();
        // this.getUserCurrentTariff();
    }

    addpackage(): any {
        let data;
        if (this.switchinType == 1) {
            data = {
                Name:
                    this.firstFormGroup.controls["FirstName"].value +
                    " " +
                    this.firstFormGroup.controls["LastName"].value,
                TypeOfHouse: this.firstFormGroup.controls["HouseTypeID"].value,
                FamilyMembers: this.firstFormGroup.controls["FamilyMembersId"]
                    .value,
                NoOfRooms: this.firstFormGroup.controls["NoOfRoomsId"].value,
                Status: 1,
                ElectricityPackageAmount: this.currentTariff.E.units,
                GasPackageAmount: this.currentTariff.G.units,
                StandingCharge: this.energy.standingChargeElec,
                NightRate: this.nightRate,
                UnitRate: this.unitRate,
            };
        } else {
            data = {
                Name:
                    this.firstFormGroup.controls["FirstName"].value +
                    " " +
                    this.firstFormGroup.controls["LastName"].value,
                TypeOfHouse: this.firstFormGroup.controls["HouseTypeID"].value,
                FamilyMembers: this.firstFormGroup.controls["FamilyMembersId"]
                    .value,
                NoOfRooms: this.firstFormGroup.controls["NoOfRoomsId"].value,
                Status: 1,
                ElectricityPackageAmount: this.currentTariff.E.units,
                StandingCharge: this.energy.standingChargeElec,
                NightRate: this.nightRate,
                UnitRate: this.unitRate,
            };
        }

        this._settingService.addPackage(data).subscribe(
            (response) => {
                if (response) {
                    this.package = response;
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

        // let supp: any = _.maxBy(this.comparisionData.tariffs, 'savingPercentage');

        let data1 = {
            SupplierId: this.maxPercentageSupplier.supplierId,
            PlanName: this.maxPercentageSupplier.tariffName,
            PlanType: 1,
            Status: 1,
            PlanData: JSON.stringify(this.maxPercentageSupplier),
            Planimage: this.planImage,
            NewPlanImage: this.NewPlanImage,
        };
        this._supplierService.addSupplierPlan(data1).subscribe(
            (response) => {
                if (response.status_code === 200) {
                    let data1 = {
                        SupplierId: this.maxPercentageSupplier.supplierId,
                        PlanName: this.maxPercentageSupplier.tariffName,
                        PlanType: 2,
                        Status: 1,
                        PlanData: JSON.stringify(this.maxPercentageSupplier),
                        Planimage: this.planImage,
                        NewPlanImage: this.NewPlanImage,
                    };

                    this._supplierService
                        .addSupplierPlan(data1)
                        .subscribe((response1) => {
                            if (response1.status_code === 200) {
                                this.firstFormGroup.controls[
                                    "ElectricityCurrentPlan_PlanID"
                                ].setValue(response.data.Id);
                                this.firstFormGroup.controls[
                                    "GasCurrentPlan_PlanID"
                                ].setValue(response1.data.Id);
                                this.bothSameSupplierPlan = response.data.Id;

                                let exisitngDataElc = {
                                    SupplierId: this.currentEnergyElc
                                        .supplierId,
                                    PlanName: this.currentEnergyElc.tariffName,
                                    PlanType: 2,
                                    Status: 1,
                                    PlanData: JSON.stringify(
                                        this.currentEnergyElc
                                    ),
                                    Planimage: this.planImage,
                                    NewPlanImage: this.NewPlanImage,
                                };
                                this._supplierService
                                    .addSupplierPlan(exisitngDataElc)
                                    .subscribe((response1) => {
                                        if (response1.status_code === 200) {
                                            this.exsitingPlanElc =
                                                response1.data;
                                            if (this.switchinType == 1) {
                                                let exisitngDataGas = {
                                                    SupplierId: this
                                                        .currentEnergyGas
                                                        .supplierId,
                                                    PlanName: this
                                                        .currentEnergyGas
                                                        .tariffName,
                                                    PlanType: 1,
                                                    Status: 1,
                                                    PlanData: JSON.stringify(
                                                        this.currentEnergyGas
                                                    ),
                                                    Planimage: this.planImage,
                                                    NewPlanImage: this
                                                        .NewPlanImage,
                                                };
                                                this._supplierService
                                                    .addSupplierPlan(
                                                        exisitngDataGas
                                                    )
                                                    .subscribe((response1) => {
                                                        if (
                                                            response1.status_code ===
                                                            200
                                                        ) {
                                                            this.exsitingPlanGas =
                                                                response1.data;
                                                            this.goCardless();
                                                        }
                                                    });
                                            } else {
                                                this.goCardless();
                                            }
                                        }
                                    });
                                //  this.goCardless();
                            }
                        });
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
    goCardless(): any {
        const userDetailToSave = new RegisterDetail();
        const person = new PersonalDetail();
        const paymentDetails = new PersonalDetail();
        Object.assign(userDetailToSave, this.firstFormGroup.value);

        Object.assign(person, this.firstFormGroup.value);

        Object.assign(paymentDetails, this.firstFormGroup.value);
        let IsManual;
        if (
            this.selectedValue == "Enter address manually" ||
            this.selectedValue == this.regionAddress
        ) {
            IsManual = true;
            userDetailToSave.FullAddress =
                userDetailToSave.HouseName +
                "," +
                userDetailToSave.StreetName +
                "," +
                userDetailToSave.City +
                "," +
                userDetailToSave.Country;
            // const string = userDetailToSave.FullAddress.slice(0,-9);
            userDetailToSave.AddressLine1 = userDetailToSave.FullAddress;

            // const string2 = userDetailToSave.FullAddress.slice(0,-9);
            userDetailToSave.AddressLine2 = userDetailToSave.FullAddress;
            // var splitcity = string.split(',');
            // userDetailToSave.City = splitcity[3];
            userDetailToSave.City = userDetailToSave.City;
        } else {
            userDetailToSave.FullAddress = this.selectedValue;
            IsManual = false;
        }
        let response;
        this.IsBankDetails;

        if (
            this.IsBankDetails == 1 &&
            this.IsAddCustomer == true &&
            this.EditCustomer != true
        ) {
            this.dialogRef = this.dialog.open(PaymentModalComponent, {
                panelClass: "app-paymentmodal",
                data: {
                    event: event,
                    data: {
                        fName: this.firstFormGroup.get("FirstName").value,
                        lname: this.firstFormGroup.get("LastName").value,
                        pcode: this.firstFormGroup.get("PostCode").value,
                        email: this.firstFormGroup.get("EmailAddress").value,
                        sCode: "",
                        accountNumber: "",
                        selectedValue: userDetailToSave.FullAddress,
                        IsManual: IsManual,
                    },
                },
            });
            this.dialogRef.afterClosed().subscribe((res1) => {
                if (!!res1) {
                    response = res1;
                    this.paymentDetails.PaymentDetails_AccountNumber =
                        response.event.accountNumber;
                    this.paymentDetails.PaymentDetails_SortCode =
                        response.event.sCode;
                    this.paymentDetails.PaymentDetails_AccountName =
                        response.event.PaymentDetails_AccountName;
                    this.paymentDetails.IBANnunber = response.event.IBAN_num;
                    this.firstFormGroup
                        .get("FirstName")
                        .setValue(response.event.fName);
                    this.firstFormGroup
                        .get("LastName")
                        .setValue(response.event.lname);
                    this.firstFormGroup
                        .get("EmailAddress")
                        .setValue(response.event.email);
                    this.billAdd.BillingAddress1 =
                        response.event.BillingAddress1;
                    this.billAdd.BillingAddress2 =
                        response.event.BillingAddress2;
                    this.billAdd.BillingCity = response.event.BillingCity;
                    this.billAdd.BillingPostcode =
                        response.event.BillingPostcode;

                    if (!!response) {
                        this.dialogRef1 = this.dialog.open(
                            ConfirmPaymentComponent,
                            {
                                panelClass: "confirm-payment",
                                data: {
                                    event: event,
                                    data: {
                                        fName: response.event.fName,
                                        lname: response.event.lname,
                                        address: userDetailToSave.FullAddress,
                                        account_name:
                                            response.event
                                                .PaymentDetails_AccountName,
                                        IBAN_NUM: response.event.IBAN_num,
                                        sort_code: response.event.sCode,
                                        account_num:
                                            response.event.accountNumber,
                                        comName: response.event.comName,
                                    },
                                },
                            }
                        );
                        this.dialogRef1.afterClosed().subscribe((res) => {
                            if (!!res) {
                                if (this.EditCustomer == true) {
                                    if (this.IsFormDataBind == true) {
                                        this.UpdateCustomer();
                                    } else {
                                        this.saveLead();
                                    }
                                } else {
                                    this.saveCustomer();
                                }
                            }
                        });
                    }
                }
            });
        } else {
            if (this.EditCustomer == true) {
                if (this.IsFormDataBind == true) {
                    this.UpdateCustomer();
                } else {
                    this.saveLead();
                }
            } else {
                this.saveCustomer();
            }
        }
    }

    saveCustomer = () => {
        this.firstFormGroup.controls["Title"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls["Title"].updateValueAndValidity();
        this.firstFormGroup.controls["DOB"].setValidators(Validators.required);
        this.firstFormGroup.controls["DOB"].updateValueAndValidity();
        this.firstFormGroup.controls["ResidentalStatusId"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls[
            "ResidentalStatusId"
        ].updateValueAndValidity();
        this.firstFormGroup.controls["TimeOfCurrentAddress"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls[
            "TimeOfCurrentAddress"
        ].updateValueAndValidity();
        this.firstFormGroup.controls["HouseTypeID"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls["HouseTypeID"].updateValueAndValidity();
        this.firstFormGroup.controls["FamilyMembersId"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls[
            "FamilyMembersId"
        ].updateValueAndValidity();
        this.firstFormGroup.controls["NoOfRoomsId"].setValidators(
            Validators.required
        );
        this.firstFormGroup.controls["NoOfRoomsId"].updateValueAndValidity();
        if (this.firstFormGroup.valid) {
            if (this.bothSupplier == true) {
                if (this.switchinType == "1") {
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                    this.firstFormGroup.controls[
                        "GasCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.firstFormGroup.controls[
                        "GasCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.firstFormGroup.controls[
                        "GasCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                } else {
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                }
            }
            if (this.switchinType == "2") {
                this.firstFormGroup.controls[
                    "GasCurrentPlan_PlanPaymentID"
                ].setValue("");
            }

            const userDetailToSave = new RegisterDetail();
            let person = new PersonalDetail();

            Object.assign(userDetailToSave, this.firstFormGroup.value);

            Object.assign(person, this.firstFormGroup.value);

            person = _.omit(person, ["EmploymentStatusId"]);
            person = _.omit(person, ["ResidentalStatusId"]);
            person = _.omit(person, ["TimeOfCurrentAddress"]);
            person = _.omit(person, ["WhereDidYouhearaboutUs"]);
            person = _.omit(person, ["ReferralCode"]);
            person.MobileNumber = this.phone_number;
            person.AlternativeMobileNumber = this.AlternativeMobileNumber;
            userDetailToSave.PackageId = this.package.Id;
            if (this.switchinType == 1) {
                userDetailToSave.Gas_OldSupplierID = this.exsitingPlanGas.SupplierId;
                userDetailToSave.Gas_OldPlanID = this.exsitingPlanGas.Id;
            }
            userDetailToSave.Electricity_OldSupplierID = this.exsitingPlanElc.SupplierId;
            userDetailToSave.Electricity_OldPlanID = this.exsitingPlanElc.Id;
            if (this.economicMeter == 1) {
                userDetailToSave.IsElectricMeterReading = true;
            } else {
                userDetailToSave.IsElectricMeterReading = false;
            }

            userDetailToSave.Economy_Elect_Meter = this.economicMeter;

            userDetailToSave.EmploymentStatusId = this.firstFormGroup.controls[
                "EmploymentStatusId"
            ].value;
            userDetailToSave.ResidentalStatusId = this.firstFormGroup.controls[
                "ResidentalStatusId"
            ].value;
            userDetailToSave.TimeOfCurrentAddress = this.firstFormGroup.controls[
                "TimeOfCurrentAddress"
            ].value;
            userDetailToSave.WhereDidYouhearaboutUs = this.firstFormGroup.controls[
                "WhereDidYouhearaboutUs"
            ].value;
            userDetailToSave.ReferralCode = this.firstFormGroup.controls[
                "ReferralCode"
            ].value;
            userDetailToSave.BillingAddress1 = this.billAdd.BillingAddress1;
            userDetailToSave.BillingAddress2 = this.billAdd.BillingAddress2;
            userDetailToSave.BillingCity = this.billAdd.BillingCity;
            userDetailToSave.BillingPostcode = this.billAdd.BillingPostcode;
            userDetailToSave.Person = person;
            const dobFormat = new Date(
                userDetailToSave.Person.DOB
            ).toLocaleString("en-US", {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            userDetailToSave.Person.DOB = dobFormat;
            if (
                this.selectedValue == "Enter address manually" ||
                this.selectedValue == this.regionAddress
            ) {
                userDetailToSave.FullAddress =
                    userDetailToSave.HouseName +
                    "," +
                    userDetailToSave.StreetName +
                    "," +
                    userDetailToSave.City +
                    "," +
                    userDetailToSave.Country;
                // const string = userDetailToSave.FullAddress.slice(0,-9);
                userDetailToSave.AddressLine1 = userDetailToSave.FullAddress;

                // const string2 = userDetailToSave.FullAddress.slice(0,-9);
                userDetailToSave.AddressLine2 = userDetailToSave.FullAddress;
                // var splitcity = string.split(',');
                // userDetailToSave.City = splitcity[3];
                userDetailToSave.City = userDetailToSave.City;
            } else {
                userDetailToSave.FullAddress = this.selectedValue;
                const string1 = userDetailToSave.FullAddress.slice(0, -9);
                userDetailToSave.AddressLine1 = string1;
                const string3 = userDetailToSave.FullAddress.slice(0, -9);
                userDetailToSave.AddressLine2 = string3;
                const splitcity1 = string3.split(",");
                userDetailToSave.City = splitcity1[3];
            }
            userDetailToSave.Person.PaymentDetails_AccountNumber = this.paymentDetails.PaymentDetails_AccountNumber;
            userDetailToSave.Person.PaymentDetails_SortCode = this.paymentDetails.PaymentDetails_SortCode;
            userDetailToSave.Person.PaymentDetails_AccountName = this.paymentDetails.PaymentDetails_AccountName;
            userDetailToSave.IBANNumber = this.paymentDetails.IBANnunber;
            this.registerService
                .addCustomer(userDetailToSave)
                .subscribe((data) => {
                    var responsedata = data;
                    if (data.status_code == 0) {
                        this.registerService
                            .flowAfterCustSignUp(data.data.ID)
                            .subscribe((res) => {
                                const data = {
                                    sortCode: this.paymentDetails
                                        .PaymentDetails_SortCode,
                                    accountNumber: this.paymentDetails
                                        .PaymentDetails_AccountNumber,
                                    userNAme:
                                        userDetailToSave.Person.FirstName +
                                        " " +
                                        userDetailToSave.Person.LastName,
                                };
                                this.updatedusername = data.userNAme;
                                jQuery.ajax({
                                    type: "POST",
                                    url: CRM_URL + "/index.php/api/signup",
                                    dataType: "json",
                                    data: {
                                        email:
                                            userDetailToSave.Person
                                                .EmailAddress,
                                        username:
                                            userDetailToSave.Person.FirstName +
                                            " " +
                                            userDetailToSave.Person.LastName,
                                        firstname:
                                            userDetailToSave.Person.FirstName,
                                        lastname:
                                            userDetailToSave.Person.LastName,
                                        password: userDetailToSave.Password,
                                    },
                                    success: function (res) {
                                        this.token = res.token;
                                        jQuery.ajax({
                                            type: "GET",
                                            url:
                                                SERVER_URL +
                                                "/UserInfo/UpdateToken?email=" +
                                                userDetailToSave.Person
                                                    .EmailAddress +
                                                "&token=" +
                                                this.token,
                                            dataType: "json",
                                            success: function (res) {},
                                        });
                                    },
                                });
                                if (this.IsBankDetails == 1) {
                                    Swal.fire({
                                        type: "success",
                                        title:
                                            "SEPA Direct Debit setup successful.",
                                        text:
                                            "LOWESTTARIFF will appear on your statement when this SEPA Direct Debit is used. Your mandate reference is " +
                                            responsedata.data.RefNo,
                                    });
                                } else {
                                    Swal.fire({
                                        type: "success",
                                        title: "Success",
                                        text: "Customer created successfully.",
                                    });
                                }

                                this.router.navigate(["/login"]);
                                // this.dialogRefSec = this.dialog.open(updateProfileFormDialogComponent, {
                                //     panelClass: "update-profile-form-dialog",
                                //     data: {
                                //         event: data
                                //     }
                                // });
                                // this.dialogRefSec.afterClosed().subscribe(data => {

                                //     if (!!res) {

                                //     }
                                // });
                            });
                    } else {
                        if (data == "Validation failed") {
                            Swal.fire({
                                type: "error",
                                title: "Error",
                                text:
                                    "Please enter valid sort code, account number or IBAN number.",
                            });
                        } else {
                            Swal.fire({
                                type: "error",
                                title: "Error",
                                text: data.message,
                            });
                        }
                    }
                });
        }
    };

    sendEmail(): any {
        this.IsSendEmail = 1;
        this.editCustomer();
    }
    saveLead = () => {
        if (this.firstFormGroup.valid && !!this.phone_number) {
            if (this.bothSupplier == true) {
                if (this.switchinType == "1") {
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                    this.firstFormGroup.controls[
                        "GasCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.firstFormGroup.controls[
                        "GasCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.firstFormGroup.controls[
                        "GasCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                } else {
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                }
            }
            if (this.switchinType == "2") {
                this.firstFormGroup.controls[
                    "GasCurrentPlan_PlanPaymentID"
                ].setValue("");
            }
        }
        const userDetailToSave = new EditCustomer();
        // let person = new PersonalDetail();

        Object.assign(userDetailToSave, this.firstFormGroup.value);

        if (this.economicMeter == 1) {
            userDetailToSave.IsElectricMeterReading = true;
        } else {
            userDetailToSave.IsElectricMeterReading = false;
        }

        userDetailToSave.Economy_Elect_Meter = this.economicMeter;

        const dobFormat = new Date(userDetailToSave.DOB).toLocaleString(
            "en-US",
            {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            }
        );
        if (
            this.selectedValue == "Enter address manually" ||
            this.selectedValue == this.regionAddress
        ) {
            userDetailToSave.FullAddress =
                userDetailToSave.HouseName +
                "," +
                userDetailToSave.StreetName +
                "," +
                userDetailToSave.City +
                "," +
                userDetailToSave.Country;
            // const string = userDetailToSave.FullAddress.slice(0,-9);
            userDetailToSave.AddressLine1 = userDetailToSave.FullAddress;

            // const string2 = userDetailToSave.FullAddress.slice(0,-9);
            userDetailToSave.AddressLine2 = userDetailToSave.FullAddress;
            // var splitcity = string.split(',');
            // userDetailToSave.City = splitcity[3];
            userDetailToSave.City = userDetailToSave.City;
        } else {
            userDetailToSave.FullAddress = this.selectedValue;
            const string1 = userDetailToSave.FullAddress.slice(0, -9);
            userDetailToSave.AddressLine1 = string1;
            const string3 = userDetailToSave.FullAddress.slice(0, -9);
            userDetailToSave.AddressLine2 = string3;
            const splitcity1 = string3.split(",");
            userDetailToSave.City = splitcity1[3];
        }

        userDetailToSave.IBANNumber = this.paymentDetails.IBANnunber;
        userDetailToSave.CustomerName =
            userDetailToSave.FirstName + " " + userDetailToSave.LastName;
        userDetailToSave.Phone_No = this.phone_number;
        userDetailToSave.AddressLine1 = userDetailToSave.FullAddress;
        userDetailToSave.MobileNumber = this.phone_number;
        userDetailToSave.PaymentDetails_AccountNumber = this.paymentDetails.PaymentDetails_AccountNumber;
        userDetailToSave.PaymentDetails_Sortcode = this.paymentDetails.PaymentDetails_SortCode;
        userDetailToSave.PaymentDetails_AccountName = this.paymentDetails.PaymentDetails_AccountName;
        userDetailToSave.Reference = userDetailToSave.ReferralCode;
        userDetailToSave.IsSendEmail = this.IsSendEmail;
        if (this.bothSupplier != true) {
            userDetailToSave.ElectricityCurrentPlan_SupplierID = this.energy.supplierId;
            if (this.switchinType == 1) {
                userDetailToSave.GasCurrentPlan_SupplierID = this.energy.supplierId;
                userDetailToSave.Gas_OldSupplierID = this.currentEnergyGas.supplierId;
            }

            userDetailToSave.Electricity_OldSupplierID = this.currentEnergyElc.supplierId;
            userDetailToSave.Gas_OldSupplierID = this.exsitingPlanGas.SupplierId;
            userDetailToSave.Gas_OldPlanID = this.exsitingPlanGas.Id;
            userDetailToSave.Electricity_OldSupplierID = this.exsitingPlanElc.SupplierId;
            userDetailToSave.Electricity_OldPlanID = this.exsitingPlanElc.Id;
        }
        this.registerService.addLead(userDetailToSave).subscribe((data) => {
            var responsedata = data;
            if (data.status_code == 0) {
                Swal.fire({
                    type: "success",
                    title: "Success",
                    text: "Lead added successfully.",
                });
                this.router.navigate(["/login"]);
            } else {
                if (data == "Validation failed") {
                    Swal.fire({
                        type: "error",
                        title: "Error",
                        text:
                            "Please enter valid sort code, account number or IBAN number.",
                    });
                } else {
                    Swal.fire({
                        type: "error",
                        title: "Error",
                        text: data.message,
                    });
                }
            }
        });
    };
    UpdateCustomer = () => {
        if (this.firstFormGroup.valid) {
            if (this.bothSupplier == true) {
                if (this.switchinType == "1") {
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                    this.firstFormGroup.controls[
                        "GasCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.firstFormGroup.controls[
                        "GasCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.firstFormGroup.controls[
                        "GasCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                } else {
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.firstFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                }
            }
            if (this.switchinType == "2") {
                this.firstFormGroup.controls[
                    "GasCurrentPlan_PlanPaymentID"
                ].setValue("");
            }
            const userDetailToSave = new EditCustomer();
            // let person = new PersonalDetail();

            Object.assign(userDetailToSave, this.firstFormGroup.value);

            if (this.economicMeter == 1) {
                userDetailToSave.IsElectricMeterReading = true;
            } else {
                userDetailToSave.IsElectricMeterReading = false;
            }

            userDetailToSave.Economy_Elect_Meter = this.economicMeter;

            userDetailToSave.Id = this.URLvalue.lead_id;

            const dobFormat = new Date(userDetailToSave.DOB).toLocaleString(
                "en-US",
                {
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                }
            );
            if (
                this.selectedValue == "Enter address manually" ||
                this.selectedValue == this.regionAddress
            ) {
                userDetailToSave.FullAddress =
                    userDetailToSave.HouseName +
                    "," +
                    userDetailToSave.StreetName +
                    "," +
                    userDetailToSave.City +
                    "," +
                    userDetailToSave.Country;
                // const string = userDetailToSave.FullAddress.slice(0,-9);
                userDetailToSave.AddressLine1 = userDetailToSave.FullAddress;

                // const string2 = userDetailToSave.FullAddress.slice(0,-9);
                userDetailToSave.AddressLine2 = userDetailToSave.FullAddress;
                // var splitcity = string.split(',');
                // userDetailToSave.City = splitcity[3];
                userDetailToSave.City = userDetailToSave.City;
            } else {
                userDetailToSave.FullAddress = this.selectedValue;
                const string1 = userDetailToSave.FullAddress.slice(0, -9);
                userDetailToSave.AddressLine1 = string1;
                const string3 = userDetailToSave.FullAddress.slice(0, -9);
                userDetailToSave.AddressLine2 = string3;
                const splitcity1 = string3.split(",");
                userDetailToSave.City = splitcity1[3];
            }
            userDetailToSave.IBANNumber = this.paymentDetails.IBANnunber;
            userDetailToSave.CustomerName =
                userDetailToSave.FirstName + " " + userDetailToSave.LastName;
            userDetailToSave.Phone_No = this.phone_number;
            userDetailToSave.AddressLine1 = userDetailToSave.FullAddress;
            userDetailToSave.MobileNumber = this.phone_number;
            userDetailToSave.PaymentDetails_AccountNumber = this.paymentDetails.PaymentDetails_AccountNumber;
            userDetailToSave.PaymentDetails_Sortcode = this.paymentDetails.PaymentDetails_SortCode;
            userDetailToSave.PaymentDetails_AccountName = this.paymentDetails.PaymentDetails_AccountName;
            userDetailToSave.IBANNumber = this.paymentDetails.IBANnunber;
            userDetailToSave.IsSendEmail = this.IsSendEmail;
            if (this.bothSupplier != true) {
                userDetailToSave.ElectricityCurrentPlan_SupplierID = this.energy.supplierId;
                if (this.switchinType == 1) {
                    userDetailToSave.GasCurrentPlan_SupplierID = this.energy.supplierId;
                    userDetailToSave.Gas_OldSupplierID = this.currentEnergyGas.supplierId;
                }
                userDetailToSave.Electricity_OldSupplierID = this.currentEnergyElc.supplierId;
                userDetailToSave.Gas_OldSupplierID = this.exsitingPlanGas.SupplierId;
                userDetailToSave.Gas_OldPlanID = this.exsitingPlanGas.Id;
                userDetailToSave.Electricity_OldSupplierID = this.exsitingPlanElc.SupplierId;
                userDetailToSave.Electricity_OldPlanID = this.exsitingPlanElc.Id;
            }
            this.registerService
                .updatePartner(userDetailToSave)
                .subscribe((data) => {
                    var responsedata = data;
                    if (data.status_code == 0) {
                        Swal.fire({
                            type: "success",
                            title: "Success",
                            text: "Lead updated successfully.",
                        });
                        this.router.navigate(["/login"]);
                    } else {
                        if (data == "Validation failed") {
                            Swal.fire({
                                type: "error",
                                title: "Error",
                                text:
                                    "Please enter valid sort code, account number or IBAN number.",
                            });
                        } else {
                            Swal.fire({
                                type: "error",
                                title: "Error",
                                text: data.message,
                            });
                        }
                    }
                });
        }
    };
}
