import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { systemenumService } from "../../systemenumdata/systemenum.service";
import { SupplierService } from "../../supplier/supplier.service";
import { RegisterDetail, PersonalDetail } from "./register-classes";
import { RegisterService } from "./register.service";
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
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { CRM_URL, SERVER_URL } from "app/main/services/config";
import { PaymentModalComponent } from "./payment-modal/paymentmodal.component";
import { ConfirmPaymentComponent } from "./confirm-payment/confirm-payment.component";
import { SupplierTermsConditionModalComponent } from "./supplier-terms-condition/supplier-terms-condition.component";
import { SettingsService } from "../../settings/settings.service";
import { LoaderService } from "app/main/services/loader.service";
import domtoimage from "dom-to-image";
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
    selector: "register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
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
export class RegisterComponent implements OnInit {
    ActiveXObject: (type: string) => void;
    loginForm: FormGroup;
    isLinear = false;
    sevenFormGroup: FormGroup;
    sevenFormGroupErrors: any;
    firstFormGroup: FormGroup;
    firstFormGroupErrors: any;
    secondFormGroup: FormGroup;
    secondFormGroupErrors: any;
    secondupFormGroup: FormGroup;
    secondupFormGroupErrors: any;
    thirdFormGroup: FormGroup;
    thirdFormGroupErrors: any;
    fourthFormGroup: FormGroup;
    fourthFormGroupErrors: any;
    fifthFormGroup: FormGroup;
    partnerfifthFormGroup: any;
    bankdetails: any = "1";
    partnerfifthFormGroupErrors: any;
    partnersevenFormGroup: any;
    partnersevenFormGroupErrors: any;
    partnersixthFormGroup: any;
    partnerSevenFormGroup: any;
    partnersixthFormGroupErrors: any;
    fifthFormGroupErros: any;
    sixthFormGroup: FormGroup;
    sixthFormGroupErrors: any;
    IsImage = true;
    Address = [{ value: "0", "#cdata-section": "Enter address manually" }];
    // Address = [{ value: "0", "addressAsLongString": "Enter address manually", "addressAsLongStringWithDelimiter": "Enter address manually" }];
    dialogRef: any;
    bothSupplier = true;
    bothSameSupplier: any;
    bothSameSupplierPlan: any;
    bothSamePayment: any = 45;
    selectedValue: any;
    electricityUse: any;
    switchinType: any;
    houseBuild = 1;
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
    economicMeter: any = 2;
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
    regionAddress =
        "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
        this.postCode +
        ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG";
    exsitingPlanGas: any;
    exsitingPlanElc: any;
    leadID: any;
    leadData: any;
    IsFormDataBind = false;
    leadDataEdit: any;
    SupplierDB: any[] = [];
    maxPercentageSupplier: any;
    ElecSupplier: any;
    GasSupplier: any;
    averageMonth: any;
    tempSupplierDB: any[] = [];
    avg: any;
    planImage: any;
    NewPlanImage: any;
    unitRate: any;
    nightRate: any;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public _allResourceService: systemenumService,
        public _supplierService: SupplierService,
        private registerService: RegisterService,
        public messageService: MessageService,
        public router: Router,
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

        this.secondFormGroupErrors = {
            NoOfRoomsId: {},
            typeOfHousefrm: {},
            houseBuild: {},
        };
        this.secondupFormGroupErrors = {
            EnergyTypeID: {},
            EnergyUsageID: {},
            FamilyMembersId: {},
            IsElectricMeterReading: {},
        };

        this.thirdFormGroupErrors = {
            ElectricityConsumption: {},
            ElectricityConsumptionPeriodID: {},
            GasConsumption: {},
            GasConsumptionPeriodID: {},
            TypeOfHome: {},
        };

        this.fourthFormGroupErrors = {
            ElectricityCurrentPlan_SupplierID: {},
            ElectricityCurrentPlan_PlanID: {},
            ElectricityCurrentPlan_PlanPaymentID: {},
            GasCurrentPlan_SupplierID: {},
            GasCurrentPlan_PlanID: {},
            GasCurrentPlan_PlanPaymentID: {},
        };

        this.fifthFormGroupErros = {
            HouseTypeID: {},
            FamilyMembersId: {},
            NoOfRoomsId: {},
        };

        this.partnerfifthFormGroupErrors = {
            IsOtherDetails: {},
        };

        this.sixthFormGroupErrors = {
            Title: {},
            FirstName: {},
            LastName: {},
            EmailAddress: {},
            DOB: {},
            EmploymentStatusId: {},
            ResidentalStatusId: {},
            TimeOfCurrentAddress: {},
            WhereDidYouhearaboutUs: {},
            PaymentDetails_SortCode: {},
            PaymentDetails_AccountNumber: {},
            Password: {},
            confirmPassword: {},
        };

        this.partnersevenFormGroupErrors = {
            IsBankDetails: {},
        };

        this.partnersixthFormGroupErrors = {
            Title: {},
            FirstName: {},
            LastName: {},
            EmailAddress: {},
            DOB: {},
            EmploymentStatusId: {},
            ResidentalStatusId: {},
            TimeOfCurrentAddress: {},
            WhereDidYouhearaboutUs: {},
            PaymentDetails_SortCode: {},
            PaymentDetails_AccountNumber: {},
        };

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
    }

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

    homeSelection;

    selectHomeType(value) {
        this.homeSelection = value;
        this.secondFormGroup.get("typeOfHousefrm").setValue(value);
    }

    ngOnInit(): void {
        this._activeRoute.queryParams.subscribe((params) => {
            if (params.addedbypartner == "true") {
                this.partneradded = true;
            } else {
                this.partneradded = false;
            }
            this.referralcode = localStorage.getItem("Referralcode");
        });
        const currentuserdata = localStorage.getItem("UserDetail");
        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));
        }
        this.getSupplierFromDb();
        this._activeRoute.params.forEach((params) => {
            const getpostcode = params["POSTCODE"];
            if (getpostcode !== undefined) {
                this.existingpostcode = getpostcode;
                this.PostCode = this.existingpostcode;
                this.validatePostalcode();
            }
        });

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
            FullAddress: [""],
        });
        this.secondFormGroup = this._formBuilder.group({
            EnergyTypeID: ["", Validators.required],
            EnergyUsageID: ["", Validators.required],
            IsElectricMeterReading: ["", Validators.required],
            NoOfRoomsId: ["", Validators.required],
            typeOfHousefrm: ["", Validators.required],
            houseBuild: [""],
        });
        this.secondupFormGroup = this._formBuilder.group({
            EnergyTypeID: [""],
            EnergyUsageID: [""],
            IsElectricMeterReading: ["1", Validators.required],
            FamilyMembersId: ["", Validators.required],
        });
        this.thirdFormGroup = this._formBuilder.group({
            ElectricityConsumption: ["", Validators.required],
            ElectricityConsumptionPeriodID: ["", Validators.required],
            GasConsumption: ["", Validators.required],
            GasConsumptionPeriodID: ["", Validators.required],
            TypeOfHome: [],
        });
        this.fourthFormGroup = this._formBuilder.group({
            ElectricityCurrentPlan_SupplierID: [""],
            ElectricityCurrentPlan_PlanID: [""],
            ElectricityCurrentPlan_PlanPaymentID: [""],
            GasCurrentPlan_SupplierID: [""],
            GasCurrentPlan_PlanID: [""],
            GasCurrentPlan_PlanPaymentID: [""],
        });
        // HouseTypeID: ["", Validators.required],
        this.fifthFormGroup = this._formBuilder.group({
            HouseTypeID: [""],
            FamilyMembersId: ["", Validators.required],
            NoOfRoomsId: ["", Validators.required],
        });

        this.partnerfifthFormGroup = this._formBuilder.group({
            IsOtherDetails: ["1", Validators.required],
        });

        this.partnersevenFormGroup = this._formBuilder.group({
            IsBankDetails: ["1", Validators.required],
        });

        this.sixthFormGroup = this._formBuilder.group({
            Title: [""],
            FirstName: [""],
            LastName: [""],
            EmailAddress: ["", Validators.pattern(this.emailPattern)],
            DOB: [""],
            EmploymentStatusId: [""],
            ResidentalStatusId: [""],
            TimeOfCurrentAddress: [""],
            WhereDidYouhearaboutUs: [""],

            Password: [
                "",
                [Validators.required, Validators.pattern(this.passwordExp)],
            ],
            confirmPassword: ["", [Validators.required]],
            ReferralCode: [""],
        });

        this.partnersixthFormGroup = this._formBuilder.group({
            Title: [""],
            FirstName: [""],
            LastName: [""],
            EmailAddress: ["", Validators.pattern(this.emailPattern)],
            DOB: [""],
            EmploymentStatusId: [""],
            ResidentalStatusId: [""],
            TimeOfCurrentAddress: [""],
            WhereDidYouhearaboutUs: [""],
            ReferralCode: [""],
            Password: ["", [Validators.required]],
            confirmPassword: ["", [Validators.required]],
        });

        this.sevenFormGroup = this._formBuilder.group({
            PaymentDetails_SortCode: [""],
            PaymentDetails_AccountNumber: [""],
            PaymentDetails_AccountName: [""],
        });
        this.getAllResourceData();
        this.getSupplierList();
        this.getPaymentmethods();
        this._activeRoute.params.forEach((params) => {
            const leadId = params["ID"];
            const FLAG = params["FLAG"];
            if (!!FLAG) {
                if (!!leadId) {
                    this.leadID = Number(leadId);
                    this.registerService
                        .getDataByLeadId(this.leadID)
                        .subscribe((response) => {
                            if (response.data.length > 0) {
                                this.IsFormDataBind = true;

                                if (response.data[0].IsElectricMeterReading) {
                                    response.data[0].IsElectricMeterReading = 1;
                                    this.economicMeter = 1;
                                } else {
                                    response.data[0].IsElectricMeterReading = 2;
                                    this.economicMeter = 2;
                                }
                                this.PostCode = response.data[0].PostCode;

                                // this.switchinType = response.data[0].EnergyTypeID.toString();
                                // this.electricityUse = response.data[0].EnergyUsageID.toString();
                                // this.economicMeter = response.data[0].IsElectricMeterReading.toString();
                                this.email_add = response.data[0].EmailAddress;
                                this.referralcode =
                                    response.data[0].ReferralCode;

                                this.phone_number = response.data[0].Phone_No;

                                this.leadDataEdit = response.data[0];
                                this.firstFormGroup.patchValue(
                                    this.leadDataEdit
                                );
                                this.secondFormGroup.patchValue(
                                    this.leadDataEdit
                                );
                                this.sixthFormGroup.patchValue(
                                    this.leadDataEdit
                                );
                                this.fifthFormGroup.patchValue(
                                    this.leadDataEdit
                                );
                                this.fourthFormGroup.patchValue(
                                    this.leadDataEdit
                                );
                                this.thirdFormGroup.patchValue(
                                    this.leadDataEdit
                                );
                                this.fifthFormGroup
                                    .get("FamilyMembersId")
                                    .setValue(response.data[0].FamilyMembersID);
                                this.validatePostalcode();
                                if (!!response.data[0].EmailAddress) {
                                    this.validateEmail();
                                }
                                if (!!this.leadDataEdit.EnergyTypeID) {
                                    let event = {
                                        value: this.leadDataEdit.EnergyTypeID,
                                    };
                                    this.electricityTypeChange(event);
                                }
                                if (!!response.data[0].Phone_No) {
                                    this.validatePhone();
                                }
                            }
                        });
                } else {
                    let data = {
                        EnergyTypeID: 1,
                        EnergyUsageID: 0,
                        IsElectricMeterReading: 2,
                    };

                    this.switchinType = data.EnergyTypeID;
                    this.electricityUse = data.EnergyUsageID;
                    this.economicMeter = data.IsElectricMeterReading;
                    this.secondFormGroup.patchValue(data);
                }
            } else {
                let data = {
                    EnergyTypeID: 1,
                    EnergyUsageID: 0,
                    IsElectricMeterReading: 2,
                };

                this.switchinType = data.EnergyTypeID;
                this.electricityUse = data.EnergyUsageID;
                this.economicMeter = data.IsElectricMeterReading;
                this.secondFormGroup.patchValue(data);
            }
        });
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

    getPaymentmethods(): any {
        this.registerService.getPaymentDetails().subscribe((response) => {
            if (!!response) {
                this.paymentMethods = JSON.parse(response);
            }
        });
    }

    getPlanDetails(): any {
        let data = {
            supplierId: this.regionData.defaultSupplier,
            regionId: 3,
            serviceType: "E",
            paymentMethod: "MDD",
            e7: false,
        };
    }

    getSupplierDefault(): any {}

    selectAddress(event): any {
        if (
            event.value == "Enter address manually" ||
            event.value ==
                "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
                    this.PostCode +
                    ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG"
        ) {
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
            this.getRegion();
            if (
                event.value ==
                "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
                    this.PostCode +
                    ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG"
            ) {
                this.selectedValue = event.value;
                this.getRegion();
            }
        } else {
            this.getRegion();
            this.selectedValue = event.value;
            this.firstFormGroup.get("HouseName").setValue("");
            this.firstFormGroup.get("StreetName").setValue("");
            this.firstFormGroup.get("HouseNumber").setValue("");
            this.firstFormGroup.get("Country").setValue("");
            this.firstFormGroup.get("City").setValue("");
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

    bankdetailschange(value): any {
        if (value == 1) {
            this.bankdetails = value;
        } else {
            this.bankdetails = value;
        }
    }

    termsAndCondition(): any {
        this.termAndCondialogRef = this.dialog.open(
            SupplierTermsConditionModalComponent,
            {
                panelClass: "supplier-terms-condition",
                data: {},
            }
        );
    }

    goCardless(): any {
        const userDetailToSave = new RegisterDetail();
        const person = new PersonalDetail();
        const paymentDetails = new PersonalDetail();
        Object.assign(userDetailToSave, this.firstFormGroup.value);

        Object.assign(person, this.sixthFormGroup.value);

        Object.assign(paymentDetails, this.sevenFormGroup.value);
        let IsManual;
        if (
            this.selectedValue == "Enter address manually" ||
            this.selectedValue ==
                "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
                    this.PostCode +
                    ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG"
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
        this.dialogRef = this.dialog.open(PaymentModalComponent, {
            panelClass: "app-paymentmodal",
            data: {
                event: event,
                data: {
                    fName: this.sixthFormGroup.get("FirstName").value,
                    lname: this.sixthFormGroup.get("LastName").value,
                    pcode: this.firstFormGroup.get("PostCode").value,
                    email: this.sixthFormGroup.get("EmailAddress").value,
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

                this.sixthFormGroup
                    .get("EmailAddress")
                    .setValue(response.event.email);
                this.billAdd.BillingAddress1 = response.event.BillingAddress1;
                this.billAdd.BillingAddress2 = response.event.BillingAddress2;
                this.billAdd.BillingCity = response.event.BillingCity;
                this.billAdd.BillingPostcode = response.event.BillingPostcode;
                if (response.event.fName != "" && response.event.lname != "") {
                    this.sixthFormGroup
                        .get("FirstName")
                        .setValue(response.event.fName);
                    this.sixthFormGroup
                        .get("LastName")
                        .setValue(response.event.lname);
                }
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
                                    account_num: response.event.accountNumber,
                                    comName: response.event.comName,
                                },
                            },
                        }
                    );
                    this.dialogRef1.afterClosed().subscribe((res) => {
                        if (!!res) {
                            this.saveCustomer();
                        }
                    });
                }
            }
        });
    }

    partnergoCardless(): any {
        if (this.bankdetails == 1) {
            const userDetailToSave = new RegisterDetail();
            const person = new PersonalDetail();
            const paymentDetails = new PersonalDetail();
            Object.assign(userDetailToSave, this.firstFormGroup.value);

            Object.assign(person, this.partnersixthFormGroup.value);
            Object.assign(paymentDetails, this.sevenFormGroup.value);
            let IsManual;
            if (
                this.selectedValue == "Enter address manually" ||
                this.selectedValue ==
                    "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
                        this.PostCode +
                        ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG"
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
            this.dialogRef = this.dialog.open(PaymentModalComponent, {
                panelClass: "app-paymentmodal",
                data: {
                    event: event,
                    data: {
                        fName: this.partnersixthFormGroup.get("FirstName")
                            .value,
                        lname: this.partnersixthFormGroup.get("LastName").value,
                        pcode: this.firstFormGroup.get("PostCode").value,
                        email: this.partnersixthFormGroup.get("EmailAddress")
                            .value,
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
                    this.sixthFormGroup
                        .get("FirstName")
                        .setValue(response.event.fName);
                    this.sixthFormGroup
                        .get("LastName")
                        .setValue(response.event.lname);
                    this.sixthFormGroup
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
                                this.partnersaveCustomer();
                            }
                        });
                    }
                }
            });
        } else {
            const userDetailToSave = new RegisterDetail();
            const person = new PersonalDetail();
            const paymentDetails = new PersonalDetail();
            Object.assign(userDetailToSave, this.firstFormGroup.value);

            Object.assign(person, this.partnersixthFormGroup.value);
            Object.assign(paymentDetails, this.sevenFormGroup.value);
            let IsManual;
            if (
                this.selectedValue == "Enter address manually" ||
                this.selectedValue ==
                    "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
                        this.PostCode +
                        ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG"
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
                this.partnersaveCustomer();
            } else {
                userDetailToSave.FullAddress = userDetailToSave.FullAddress;
                IsManual = false;
                this.partnersaveCustomer();
            }
        }
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
                        let event = {
                            value: this.selectedValue,
                        };
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

    updateHouseBuild(event) {
        this.houseBuild = event.value;
    }

    electricityTypeChange(event): any {
        if (event.value == 2) {
            if (this.daynightusage == false) {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: ["", Validators.required],
                    ElectricityConsumptionPeriodID: ["", Validators.required],
                    GasConsumption: [""],
                    GasConsumptionPeriodID: [""],
                    TypeOfHome: [],
                    Electricity_Day_Consumption: [""],
                    Electricity_Night_Consumption: [""],
                    Electricity_Day_ConsumptionPeriodID: [""],
                    Electricity_Night_ConsumptionPeriodId: [""],
                });
            } else {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: ["", Validators.required],
                    ElectricityConsumptionPeriodID: ["", Validators.required],
                    GasConsumption: [""],
                    GasConsumptionPeriodID: [""],
                    TypeOfHome: [],
                    Electricity_Day_Consumption: ["", Validators.required],
                    Electricity_Night_Consumption: ["", Validators.required],
                    Electricity_Day_ConsumptionPeriodID: [""],
                    Electricity_Night_ConsumptionPeriodId: [""],
                });
            }

            this.getSupplierList();
        } else {
            if (this.daynightusage == true) {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: ["", Validators.required],
                    ElectricityConsumptionPeriodID: ["", Validators.required],
                    GasConsumption: [""],
                    GasConsumptionPeriodID: [""],
                    TypeOfHome: [],
                    Electricity_Day_Consumption: ["", Validators.required],
                    Electricity_Night_Consumption: ["", Validators.required],
                    Electricity_Day_ConsumptionPeriodID: [
                        "",
                        Validators.required,
                    ],
                    Electricity_Night_ConsumptionPeriodId: [""],
                });
            } else {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: ["", Validators.required],
                    ElectricityConsumptionPeriodID: ["", Validators.required],
                    GasConsumption: [""],
                    GasConsumptionPeriodID: [""],
                    TypeOfHome: [],
                    Electricity_Day_Consumption: [""],
                    Electricity_Night_Consumption: [""],
                    Electricity_Day_ConsumptionPeriodID: [""],
                    Electricity_Night_ConsumptionPeriodId: [""],
                });
            }
            this.getSupplierList();
        }
        if (!!this.leadDataEdit) {
            this.thirdFormGroup.patchValue(this.leadDataEdit);
        }
    }

    isBothSupplier(event): any {
        if (this.bothSupplier == false && this.switchinType == 1) {
            this.bothSameSupplier = null;
            this.bothSameSupplierPlan = null;
            this.fourthFormGroup = this._formBuilder.group({
                ElectricityCurrentPlan_SupplierID: ["", Validators.required],
                ElectricityCurrentPlan_PlanID: ["", Validators.required],
                ElectricityCurrentPlan_PlanPaymentID: ["", Validators.required],
                GasCurrentPlan_SupplierID: ["", Validators.required],
                GasCurrentPlan_PlanID: ["", Validators.required],
                GasCurrentPlan_PlanPaymentID: ["", Validators.required],
            });
            this.isBothSupplierReq = false;
        } else if (this.switchinType == 2) {
            this.isBothSupplierReq = true;
        } else if (this.bothSupplier == true && this.switchinType == 1) {
            this.fourthFormGroup = this._formBuilder.group({
                ElectricityCurrentPlan_SupplierID: [""],
                ElectricityCurrentPlan_PlanID: [""],
                ElectricityCurrentPlan_PlanPaymentID: [""],
                GasCurrentPlan_SupplierID: [""],
                GasCurrentPlan_PlanID: [""],
                GasCurrentPlan_PlanPaymentID: [""],
            });
            this.isBothSupplierReq = true;
        }
    }

    electricityChange(event): any {
        if (event.value == 1) {
            if (this.daynightusage == true) {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: ["", Validators.required],
                    ElectricityConsumptionPeriodID: ["", Validators.required],
                    GasConsumption: [""],
                    GasConsumptionPeriodID: [""],
                    TypeOfHome: ["0"],
                    Electricity_Day_Consumption: ["", Validators.required],
                    Electricity_Night_Consumption: ["", Validators.required],
                    Electricity_Day_ConsumptionPeriodID: [
                        "",
                        Validators.required,
                    ],
                    Electricity_Night_ConsumptionPeriodId: [""],
                });
            } else {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: ["", Validators.required],
                    ElectricityConsumptionPeriodID: ["", Validators.required],
                    GasConsumption: [""],
                    GasConsumptionPeriodID: [""],
                    TypeOfHome: ["0"],
                    Electricity_Day_Consumption: [""],
                    Electricity_Night_Consumption: [""],
                    Electricity_Day_ConsumptionPeriodID: [""],
                    Electricity_Night_ConsumptionPeriodId: [""],
                });
            }
        } else {
            if (this.switchinType == 1) {
                if (this.daynightusage == true) {
                    this.thirdFormGroup.get("TypeOfHome").setValue("");
                    this.thirdFormGroup = this._formBuilder.group({
                        ElectricityConsumption: ["", Validators.required],
                        ElectricityConsumptionPeriodID: [
                            "",
                            Validators.required,
                        ],
                        GasConsumption: ["", Validators.required],
                        GasConsumptionPeriodID: ["", Validators.required],
                        TypeOfHome: [],
                        Electricity_Day_Consumption: ["", Validators.required],
                        Electricity_Night_Consumption: [
                            "",
                            Validators.required,
                        ],
                        Electricity_Day_ConsumptionPeriodID: [
                            "",
                            Validators.required,
                        ],
                        Electricity_Night_ConsumptionPeriodId: [""],
                    });
                } else {
                    this.thirdFormGroup = this._formBuilder.group({
                        ElectricityConsumption: ["", Validators.required],
                        ElectricityConsumptionPeriodID: [
                            "",
                            Validators.required,
                        ],
                        GasConsumption: ["", Validators.required],
                        GasConsumptionPeriodID: ["", Validators.required],
                        TypeOfHome: [],
                        Electricity_Day_Consumption: [""],
                        Electricity_Night_Consumption: [""],
                        Electricity_Day_ConsumptionPeriodID: [""],
                        Electricity_Night_ConsumptionPeriodId: [""],
                    });
                }
            } else {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: ["", Validators.required],
                    ElectricityConsumptionPeriodID: ["", Validators.required],
                    GasConsumption: [""],
                    GasConsumptionPeriodID: [""],
                    TypeOfHome: [],
                });
            }
        }
    }

    goForward(stepper): any {
        if (this.isBothSupplierReq == true) {
            if (!!this.bothSameSupplier && !!this.bothSameSupplierPlan) {
                stepper.next();
            }
        } else if (this.switchinType == "2") {
            if (!!this.bothSameSupplier && !!this.bothSameSupplierPlan) {
                stepper.next();
            }
        }
    }

    getAllResourceData(): any {
        this._allResourceService.getallSystemenumdata().subscribe((result) => {
            this.responseForAll = result;
            this.period = this.responseForAll.filter((x) => x.ListID == 3);
            const typeOfHouse1 = this.responseForAll.filter(
                (x) => x.ListID == 2
            );
            typeOfHouse1.map((house, index: number) => {
                if (house.Value == "Flat") {
                    typeOfHouse1[index].icon = "apartment.png";
                }
                if (house.Value == "TOWN HOUSE") {
                    typeOfHouse1[index].icon = "town-house.png";
                }
                if (house.Value == "SEMI DETACHED HOUSE") {
                    typeOfHouse1[index].icon = "semi-detached.png";
                }
                if (house.Value == "detached HOUSE") {
                    typeOfHouse1[index].icon = "detached-house.png";
                }
            });
            console.log(typeOfHouse1);
            this.typeOfHouse = _.sortBy(typeOfHouse1, ["Seq"]);
            this.homeSelection = this.typeOfHouse[0].Id;
            this.secondFormGroup
                .get("typeOfHousefrm")
                .setValue(this.typeOfHouse[0].Id);
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

    submitCustomer = (stepper) => {
        debugger;
        if (this.IsEmail == true) {
            if (this.IsPhone == true) {
                if (
                    this.partnersixthFormGroup.valid &&
                    this.isPasswordNotMatch == false
                ) {
                    Swal.fire({
                        title: "Please Confirm your Personal details.",

                        html:
                            '<br/><b style="font-size: 15px">Name:</b> <span style="font-size: 13px">' +
                            this.partnersixthFormGroup.controls["FirstName"]
                                .value +
                            " " +
                            this.partnersixthFormGroup.controls["LastName"]
                                .value +
                            "</span><br/><br/>" +
                            '<b style="font-size: 15px">Email address:</b> <span style="font-size: 13px">' +
                            this.partnersixthFormGroup.controls["EmailAddress"]
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
                            this.saveUser();
                            const height = $("#container-3").height();
                            $("#container-3").scrollTop(height / 2);
                            // this.goCardless();
                            //stepper.next();
                        }
                    });
                }
            } else {
                this.IsPhone = false;
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
    };

    saveUser(): any {
        debugger;
        let data;
        if (this.switchinType == 1) {
            data = {
                Name:
                    this.partnersixthFormGroup.controls["FirstName"].value +
                    " " +
                    this.partnersixthFormGroup.controls["LastName"].value,
                TypeOfHouse: this.fifthFormGroup.controls["HouseTypeID"].value,
                FamilyMembers: this.fifthFormGroup.controls["FamilyMembersId"]
                    .value,
                NoOfRooms: this.fifthFormGroup.controls["NoOfRoomsId"].value,
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
                    this.partnersixthFormGroup.controls["FirstName"].value +
                    " " +
                    this.partnersixthFormGroup.controls["LastName"].value,
                TypeOfHouse: this.fifthFormGroup.controls["HouseTypeID"].value,
                FamilyMembers: this.fifthFormGroup.controls["FamilyMembersId"]
                    .value,
                NoOfRooms: this.fifthFormGroup.controls["NoOfRoomsId"].value,
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

        // this.maxPercentageSupplier = _.maxBy(this.comparisionData.tariffs, 'savingPercentage');
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
                                this.fourthFormGroup.controls[
                                    "ElectricityCurrentPlan_PlanID"
                                ].setValue(response.data.Id);
                                this.fourthFormGroup.controls[
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
                                                            //    this.goCardless();
                                                            this.saveCustomer();
                                                        }
                                                    });
                                            } else {
                                                // this.goCardless();
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
        // this.goCardless();
    }

    partnersubmitCustomer = (steeper) => {
        debugger;
        if (this.IsEmail == true) {
            if (this.IsPhone == true) {
                if (this.partnersixthFormGroup.valid) {
                    Swal.fire({
                        title: "Please Confirm your Personal details.",
                        html:
                            '<br/><b style="font-size: 15px">Name:</b> <span style="font-size: 13px">' +
                            this.partnersixthFormGroup.controls["FirstName"]
                                .value +
                            " " +
                            this.partnersixthFormGroup.controls["LastName"]
                                .value +
                            "</span><br/><br/>" +
                            '<b style="font-size: 15px">Email address:</b> <span style="font-size: 13px">' +
                            this.partnersixthFormGroup.controls["EmailAddress"]
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
                        }
                    });
                }
            } else {
                this.IsPhone = false;
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
    };

    NextStepper(stepper): any {
        this.uploadIMGData(stepper);
        const height = $("#container-3").height();
        $("#container-3").scrollTop(height / 2);
    }

    uploadIMGData(stepper): any {
        this.loaderService.display(true);
        const node = document.getElementById("supplierDetails");
        domtoimage
            .toJpeg(node, {
                quality: 0.95,
                width: node.scrollWidth,
                height: node.scrollHeight,
            })
            .then((dataUrl) => {
                this.loaderService.display(false);
                this.UploadImage(dataUrl, stepper);
            });
    }

    UploadImage(dataUrl, stepper): any {
        let data = {
            imagedata: dataUrl,
        };
        this.loaderService.display(true);
        this._settingSerivce.uploadImage(data).subscribe((response) => {
            this.loaderService.display(false);
            if (!!response) {
                if (this.IsImage == true) {
                    this.planImage = response;
                } else {
                    this.NewPlanImage = response;
                }
                if (this.IsImage == false) {
                    this.IsImage = true;
                    stepper.next();
                    $(".existing-trf").show();
                    const height = $("#container-3").height();
                    $("#container-3").scrollTop(height / 2);
                } else {
                    this.uploadIMGData(stepper);
                    $(".existing-trf").hide();
                    this.IsImage = false;
                }
            }
        });
    }

    partnersaveCustomer = () => {
        if (this.sevenFormGroup.valid) {
            if (this.bothSupplier == true) {
                if (this.switchinType == "1") {
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                    this.fourthFormGroup.controls[
                        "GasCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.fourthFormGroup.controls[
                        "GasCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.fourthFormGroup.controls[
                        "GasCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                } else {
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                }
            }
            if (this.switchinType == "2") {
                this.fourthFormGroup.controls[
                    "GasCurrentPlan_PlanPaymentID"
                ].setValue("");
            }
            const userDetailToSave = new RegisterDetail();
            let person = new PersonalDetail();
            // let paymentDetails = new PersonalDetail();
            Object.assign(
                userDetailToSave,
                this.firstFormGroup.value,
                this.secondFormGroup.value,
                this.thirdFormGroup.value,
                this.fourthFormGroup.value,
                this.fifthFormGroup.value
            );

            Object.assign(person, this.partnersixthFormGroup.value);
            // Object.assign(this.paymentDetails, this.sevenFormGroup.value);
            // person = _.omit(person, ["Password"]);
            // person = _.omit(person, ["confirmPassword"]);
            person = _.omit(person, ["EmploymentStatusId"]);
            person = _.omit(person, ["ResidentalStatusId"]);
            person = _.omit(person, ["TimeOfCurrentAddress"]);
            person = _.omit(person, ["WhereDidYouhearaboutUs"]);
            person = _.omit(person, ["ReferralCode"]);
            person.MobileNumber = this.phone_number;
            userDetailToSave.PackageId = this.package.Id;
            // this.dialogRef = this.dialog.open(PaymentModalComponent, {
            //     panelClass: 'app-paymentmodal',
            //     data: {
            //         event: event,
            //         data: {
            //             fName: person.FirstName,
            //             lname: person.LastName,
            //             pcode: userDetailToSave.PostCode,
            //             email: person.EmailAddress,
            //             sCode: person.PaymentDetails_SortCode,
            //             accountNumber: person.PaymentDetails_AccountNumber
            //         }
            //     }

            // });
            // this.dialogRef.afterClosed()
            //     .subscribe((response) => {

            //     });
            if (this.economicMeter == 1) {
                userDetailToSave.IsElectricMeterReading = true;
            } else {
                userDetailToSave.IsElectricMeterReading = false;
            }
            // userDetailToSave.ElectricityCurrentPlan_PlanPaymentID = 45;
            // userDetailToSave.GasCurrentPlan_PlanPaymentID = 45;
            userDetailToSave.Economy_Elect_Meter = this.economicMeter;

            // userDetailToSave.Password = this.partnersixthFormGroup.controls[
            //     "Password"
            // ].value;
            userDetailToSave.EmploymentStatusId = this.partnersixthFormGroup.controls[
                "EmploymentStatusId"
            ].value;
            userDetailToSave.ResidentalStatusId = this.partnersixthFormGroup.controls[
                "ResidentalStatusId"
            ].value;
            userDetailToSave.TimeOfCurrentAddress = this.partnersixthFormGroup.controls[
                "TimeOfCurrentAddress"
            ].value;
            userDetailToSave.WhereDidYouhearaboutUs = this.partnersixthFormGroup.controls[
                "WhereDidYouhearaboutUs"
            ].value;
            userDetailToSave.ReferralCode = this.partnersixthFormGroup.controls[
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
                this.selectedValue ==
                    "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
                        this.PostCode +
                        ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG"
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
                    this.partnerreferrencedata = data;
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
                                            userDetailToSave.Person
                                                .EmailAddress,
                                        password: userDetailToSave.Password,
                                        firstname:
                                            userDetailToSave.Person.FirstName,
                                        lastname:
                                            userDetailToSave.Person.LastName,
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
                                if (
                                    userDetailToSave.BillingAddress1 == "" ||
                                    userDetailToSave.BillingAddress2 == "" ||
                                    userDetailToSave.BillingCity == "" ||
                                    userDetailToSave.BillingPostcode == ""
                                ) {
                                    Swal.fire({
                                        type: "success",
                                        title: "Success",
                                        text: "Customer Created Successfully.",
                                    });
                                } else {
                                    Swal.fire({
                                        type: "success",
                                        title:
                                            "SEPA Direct Debit setup successful.",
                                        text:
                                            "LOWESTTARIFF will appear on your statement when this SEPA Direct Debit is used. Your mandate reference is " +
                                            this.partnerreferrencedata.data
                                                .RefNo,
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

    saveCustomer = () => {
        if (this.sevenFormGroup.valid) {
            if (this.bothSupplier == true) {
                if (this.switchinType == "1") {
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                    this.fourthFormGroup.controls[
                        "GasCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.fourthFormGroup.controls[
                        "GasCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.fourthFormGroup.controls[
                        "GasCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                } else {
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_SupplierID"
                    ].setValue(this.bothSameSupplier);
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_PlanID"
                    ].setValue(this.bothSameSupplierPlan);
                    this.fourthFormGroup.controls[
                        "ElectricityCurrentPlan_PlanPaymentID"
                    ].setValue(this.bothSamePayment);
                }
            }
            if (this.switchinType == "2") {
                this.fourthFormGroup.controls[
                    "GasCurrentPlan_PlanPaymentID"
                ].setValue("");
            }
            const userDetailToSave = new RegisterDetail();
            let person = new PersonalDetail();

            // let paymentDetails = new PersonalDetail();
            Object.assign(
                userDetailToSave,
                this.firstFormGroup.value,
                this.secondFormGroup.value,
                this.thirdFormGroup.value,
                this.fourthFormGroup.value,
                this.fifthFormGroup.value
            );

            Object.assign(person, this.sixthFormGroup.value);
            // Object.assign(this.paymentDetails, this.sevenFormGroup.value);
            person = _.omit(person, ["Password"]);
            person = _.omit(person, ["confirmPassword"]);
            person = _.omit(person, ["EmploymentStatusId"]);
            person = _.omit(person, ["ResidentalStatusId"]);
            person = _.omit(person, ["TimeOfCurrentAddress"]);
            person = _.omit(person, ["WhereDidYouhearaboutUs"]);
            person = _.omit(person, ["ReferralCode"]);
            person.MobileNumber = this.phone_number;
            userDetailToSave.PackageId = this.package.Id;
            if (this.switchinType == 1) {
                userDetailToSave.Gas_OldSupplierID = this.exsitingPlanGas.SupplierId;
                userDetailToSave.Gas_OldPlanID = this.exsitingPlanGas.Id;
            }

            userDetailToSave.Electricity_OldSupplierID = this.exsitingPlanElc.SupplierId;
            userDetailToSave.Electricity_OldPlanID = this.exsitingPlanElc.Id;

            // this.dialogRef = this.dialog.open(PaymentModalComponent, {
            //     panelClass: 'app-paymentmodal',
            //     data: {
            //         event: event,
            //         data: {
            //             fName: person.FirstName,
            //             lname: person.LastName,
            //             pcode: userDetailToSave.PostCode,
            //             email: person.EmailAddress,
            //             sCode: person.PaymentDetails_SortCode,
            //             accountNumber: person.PaymentDetails_AccountNumber
            //         }
            //     }

            // });
            // this.dialogRef.afterClosed()
            //     .subscribe((response) => {

            //     });
            if (this.economicMeter == 1) {
                userDetailToSave.IsElectricMeterReading = true;
            } else {
                userDetailToSave.IsElectricMeterReading = false;
            }
            // userDetailToSave.ElectricityCurrentPlan_PlanPaymentID = 45;
            // userDetailToSave.GasCurrentPlan_PlanPaymentID = 45;
            userDetailToSave.Economy_Elect_Meter = this.economicMeter;

            userDetailToSave.Password = this.sixthFormGroup.controls[
                "Password"
            ].value;
            userDetailToSave.EmploymentStatusId = this.sixthFormGroup.controls[
                "EmploymentStatusId"
            ].value;
            userDetailToSave.ResidentalStatusId = this.sixthFormGroup.controls[
                "ResidentalStatusId"
            ].value;
            userDetailToSave.TimeOfCurrentAddress = this.sixthFormGroup.controls[
                "TimeOfCurrentAddress"
            ].value;
            userDetailToSave.WhereDidYouhearaboutUs = this.sixthFormGroup.controls[
                "WhereDidYouhearaboutUs"
            ].value;
            userDetailToSave.ReferralCode = this.sixthFormGroup.controls[
                "ReferralCode"
            ].value;
            userDetailToSave.BillingAddress1 = this.billAdd.BillingAddress1;
            userDetailToSave.BillingAddress2 = this.billAdd.BillingAddress2;
            userDetailToSave.BillingCity = this.billAdd.BillingCity;
            userDetailToSave.BillingPostcode = this.billAdd.BillingPostcode;
            userDetailToSave.Person = person;
            userDetailToSave.ElectricityCurrentPlan_SupplierID = this.energy.supplierId;
            if (this.switchinType == 1) {
                userDetailToSave.GasCurrentPlan_SupplierID = this.energy.supplierId;
                userDetailToSave.Gas_OldSupplierID = this.currentEnergyGas.supplierId;
            }
            userDetailToSave.Electricity_OldSupplierID = this.currentEnergyElc.supplierId;

            const dobFormat = new Date(
                userDetailToSave.Person.DOB
            ).toLocaleString("en-US", {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            userDetailToSave.Person.DOB = dobFormat;
            if (
                this.selectedValue == "Enter address manually" ||
                this.selectedValue ==
                    "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
                        this.PostCode +
                        ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG"
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
                const string1 = userDetailToSave.FullAddress;
                userDetailToSave.AddressLine1 = string1;
                const string3 = userDetailToSave.FullAddress;
                userDetailToSave.AddressLine2 = string3;
                const splitcity1 = string3;
                userDetailToSave.City = splitcity1;
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
                                            userDetailToSave.Person
                                                .EmailAddress,
                                        password: userDetailToSave.Password,
                                        firstname:
                                            userDetailToSave.Person.FirstName,
                                        lastname:
                                            userDetailToSave.Person.LastName,
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
                                Swal.fire({
                                    type: "success",
                                    title: "Account setup successful.",
                                    text:
                                        "LOWESTTARIFF will appear on your statement. Your mandate reference is " +
                                        responsedata.data.RefNo,
                                });

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

    getSupplierList(): any {
        // const data = {
        //     searchText: "",
        //     energyTypeId: null
        // };
        // this._supplierService.getSupplier(data).subscribe(response => {
        //     if (response.status_code === 200) {
        //         const suppliers = response.data;
        //         if (this.switchinType == 1) {
        //             this.suppliers = suppliers.filter(x => x.EnergyTypeID == 1);
        //             const data = this.suppliers;
        //             if (!!response.data && response.data.length >= 1) {
        //                 this.suppliers = _.filter(data, d => {
        //                     return d.Status == "1";
        //                 });
        //             }
        //         } else {
        //             this.suppliers = suppliers;
        //             if (!!response.data && response.data.length >= 1) {
        //                 this.suppliers = _.filter(response.data, d => {
        //                     return d.Status == "1";
        //                 });
        //             }
        //         }
        //     } else {
        //         this.suppliers = [];
        //     }
        // });

        this.registerService.getSupplier().subscribe((response) => {
            let data = {};
            this.suppliers = [];
            this.ElecSupplier = [];
            this.GasSupplier = [];
            let result = [];
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

    getUserCurrentTariff(stepper) {
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
                supplierId: this.fourthFormGroup.controls[
                    "ElectricityCurrentPlan_SupplierID"
                ].value,
                paymentMethod: this.fourthFormGroup.controls[
                    "ElectricityCurrentPlan_PlanPaymentID"
                ].value,
                tariffName: this.fourthFormGroup.controls[
                    "ElectricityCurrentPlan_PlanID"
                ].value,
            };
            gasdata = {
                supplierId: this.fourthFormGroup.controls[
                    "GasCurrentPlan_SupplierID"
                ].value,
                paymentMethod: this.fourthFormGroup.controls[
                    "GasCurrentPlan_PlanPaymentID"
                ].value,
                tariffName: this.fourthFormGroup.controls[
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
        if (this.daynightusage == false) {
            da = this.thirdFormGroup.controls["ElectricityConsumptionPeriodID"]
                .value;
        } else {
            da = this.thirdFormGroup.controls[
                "Electricity_Day_ConsumptionPeriodID"
            ].value;
        }
        let e7Usage;
        if (this.daynightusage == false) {
            e7Usage = 0;
        } else {
            e7Usage = this.thirdFormGroup.controls[
                "Electricity_Night_Consumption"
            ].value;
        }
        ga = this.thirdFormGroup.controls["GasConsumptionPeriodID"].value;
        if (this.electricityUse == 0) {
            if (this.daynightusage == false) {
                if (da == 1170) {
                    eleccon =
                        this.thirdFormGroup.controls["ElectricityConsumption"]
                            .value * 12;
                } else if (da == 1171) {
                    eleccon =
                        this.thirdFormGroup.controls["ElectricityConsumption"]
                            .value * 4;
                } else {
                    eleccon = this.thirdFormGroup.controls[
                        "ElectricityConsumption"
                    ].value;
                }
            } else {
                if (da == 1170) {
                    eleccon =
                        this.thirdFormGroup.controls[
                            "Electricity_Day_Consumption"
                        ].value * 12;
                } else if (da == 1171) {
                    eleccon =
                        this.thirdFormGroup.controls[
                            "Electricity_Day_Consumption"
                        ].value * 4;
                } else {
                    eleccon = this.thirdFormGroup.controls[
                        "Electricity_Day_Consumption"
                    ].value;
                }
            }

            if (ga == 1170) {
                gascon =
                    this.thirdFormGroup.controls["GasConsumption"].value * 12;
            } else if (ga == 1171) {
                gascon =
                    this.thirdFormGroup.controls["GasConsumption"].value * 4;
            } else {
                gascon = this.thirdFormGroup.controls["GasConsumption"].value;
            }
            comfig = "pound";
        } else if (this.electricityUse == 1) {
            if (this.daynightusage == false) {
                if (da == 1170) {
                    eleccon =
                        this.thirdFormGroup.controls["ElectricityConsumption"]
                            .value * 12;
                } else if (da == 1171) {
                    eleccon =
                        this.thirdFormGroup.controls["ElectricityConsumption"]
                            .value * 4;
                } else {
                    eleccon = this.thirdFormGroup.controls[
                        "ElectricityConsumption"
                    ].value;
                }
            } else {
                if (da == 1170) {
                    eleccon =
                        this.thirdFormGroup.controls[
                            "Electricity_Day_Consumption"
                        ].value * 12;
                } else if (da == 1171) {
                    eleccon =
                        this.thirdFormGroup.controls[
                            "Electricity_Day_Consumption"
                        ].value * 4;
                } else {
                    eleccon = this.thirdFormGroup.controls[
                        "Electricity_Day_Consumption"
                    ].value;
                }
            }

            if (ga == 1170) {
                gascon =
                    this.thirdFormGroup.controls["GasConsumption"].value * 12;
            } else if (ga == 1171) {
                gascon =
                    this.thirdFormGroup.controls["GasConsumption"].value * 4;
            } else {
                gascon = this.thirdFormGroup.controls["GasConsumption"].value;
            }
            comfig = "kwh";
        } else if (this.electricityUse == 2) {
            if (this.economicMeter == 1) {
                eleccon = 1800;
                gascon = 8000;
            } else if (this.economicMeter == 2) {
                eleccon = 2900;
                gascon = 12000;
            } else if (this.economicMeter == 3) {
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

        let data = {
            currentElectricityTariff: {
                e7: e7,
                paymentMethod: elecdata.paymentMethod,
                supplierId: elecdata.supplierId,
                tariffName: elecdata.tariffName,
                regionId: 3,
            },
            currentGasTariff: {
                paymentMethod: gasdata.paymentMethod,
                regionId: 3,
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
                    this.getComparisionResults(stepper);
                }
            });
    }

    getComparisionResults(stepper): any {
        let payment;
        if (this.bothSupplier == true) {
            payment = this.bothSamePayment;
        } else {
            if (this.switchinType == 1) {
                payment = this.fourthFormGroup.controls[
                    "GasCurrentPlan_PlanPaymentID"
                ].value;
            } else {
                payment = this.fourthFormGroup.controls[
                    "ElectricityCurrentPlan_PlanPaymentID"
                ].value;
            }
        }
        let da;
        let ga;
        let eleccon;
        let gascon;
        let comfig;
        let e7Usage;
        if (this.daynightusage == false) {
            e7Usage = 0;
        } else {
            e7Usage = this.thirdFormGroup.controls[
                "Electricity_Night_Consumption"
            ].value;
        }
        if (this.daynightusage == false) {
            da = this.thirdFormGroup.controls["ElectricityConsumptionPeriodID"]
                .value;
        } else {
            da = this.thirdFormGroup.controls[
                "Electricity_Day_ConsumptionPeriodID"
            ].value;
        }
        ga = this.thirdFormGroup.controls["GasConsumptionPeriodID"].value;
        if (this.electricityUse == 0) {
            if (this.daynightusage == false) {
                if (da == 1170) {
                    eleccon =
                        this.thirdFormGroup.controls["ElectricityConsumption"]
                            .value * 12;
                } else if (da == 1171) {
                    eleccon =
                        this.thirdFormGroup.controls["ElectricityConsumption"]
                            .value * 4;
                } else {
                    eleccon = this.thirdFormGroup.controls[
                        "ElectricityConsumption"
                    ].value;
                }
            } else {
                if (da == 1170) {
                    eleccon =
                        this.thirdFormGroup.controls[
                            "Electricity_Day_Consumption"
                        ].value * 12;
                } else if (da == 1171) {
                    eleccon =
                        this.thirdFormGroup.controls[
                            "Electricity_Day_Consumption"
                        ].value * 4;
                } else {
                    eleccon = this.thirdFormGroup.controls[
                        "Electricity_Day_Consumption"
                    ].value;
                }
            }

            if (ga == 1170) {
                gascon =
                    this.thirdFormGroup.controls["GasConsumption"].value * 12;
            } else if (ga == 1171) {
                gascon =
                    this.thirdFormGroup.controls["GasConsumption"].value * 4;
            } else {
                gascon = this.thirdFormGroup.controls["GasConsumption"].value;
            }

            comfig = "pound";
        } else if (this.electricityUse == 1) {
            if (this.daynightusage == false) {
                if (da == 1170) {
                    eleccon =
                        this.thirdFormGroup.controls["ElectricityConsumption"]
                            .value * 12;
                } else if (da == 1171) {
                    eleccon =
                        this.thirdFormGroup.controls["ElectricityConsumption"]
                            .value * 4;
                } else {
                    eleccon = this.thirdFormGroup.controls[
                        "ElectricityConsumption"
                    ].value;
                }
            } else {
                if (da == 1170) {
                    eleccon =
                        this.thirdFormGroup.controls[
                            "Electricity_Day_Consumption"
                        ].value * 12;
                } else if (da == 1171) {
                    eleccon =
                        this.thirdFormGroup.controls[
                            "Electricity_Day_Consumption"
                        ].value * 4;
                } else {
                    eleccon = this.thirdFormGroup.controls[
                        "Electricity_Day_Consumption"
                    ].value;
                }
            }

            if (ga == 1170) {
                gascon =
                    this.thirdFormGroup.controls["GasConsumption"].value * 12;
            } else if (ga == 1171) {
                gascon =
                    this.thirdFormGroup.controls["GasConsumption"].value * 4;
            } else {
                gascon = this.thirdFormGroup.controls["GasConsumption"].value;
            }
            comfig = "kwh";
        } else if (this.electricityUse == 2) {
            if (this.economicMeter == 1) {
                eleccon = 1800;
                gascon = 8000;
            } else if (this.economicMeter == 2) {
                eleccon = 2900;
                gascon = 12000;
            } else if (this.economicMeter == 3) {
                eleccon = 4300;
                gascon = 17000;
            }
            comfig = "estimate";
        }

        let serviceType;
        let data;
        if (this.switchinType == 1) {
            serviceType = "D";
            this.regionAddress =
                "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
                this.PostCode +
                ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG";
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
                    e7Usage: e7Usage,
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
                if (this.comparisionData.tariffs.length > 0) {
                    this.maxPercentageSupplier = _.maxBy(
                        this.comparisionData.tariffs,
                        "savingPercentage"
                    );
                    let data = this.maxPercentageSupplier.tariffId;
                    let elcSupplier;
                    let gasSupplier;
                    if (this.bothSupplier == false) {
                        elcSupplier = this.fourthFormGroup.controls[
                            "ElectricityCurrentPlan_SupplierID"
                        ].value;
                        gasSupplier = this.fourthFormGroup.controls[
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
                        .gettarrifdatabyTariffId(data)
                        .subscribe((response: any) => {
                            if (!!response) {
                                let tarrifResponse = JSON.parse(response);

                                // jdsfjksdfjk

                                let val = _.minBy(this.SupplierDB, "Rank");
                                tarrifResponse.supplierName = val.Name;
                                tarrifResponse.supplierId = val.ID;
                                this.maxPercentageSupplier.supplierName =
                                    val.Name;
                                this.maxPercentageSupplier.supplierId = val.ID;

                                let data = {
                                    data1: this.comparisionData,
                                    data2: tarrifResponse,
                                    data3: this.currentTariff,
                                    data4: this.switchinType,
                                };
                                // this.dialogRef1s = this.dialog.open(SupplierPlanModalComponent, {
                                //     panelClass: 'supplier-plan',
                                //     data:
                                //     {
                                //         data1: this.comparisionData,
                                //         data2: JSON.parse(response),
                                //         data3: this.currentTariff,
                                //         data4: this.switchinType
                                //     }
                                // });
                                //         this.dialogRef1s.afterClosed()
                                // .subscribe(() => {
                                this.energy1 = this.maxPercentageSupplier;
                                this.energy = data.data2;
                                this.emergyType = data.data4;

                                this.currentEnergyElc = data.data3.E;
                                this.currentEnergyGas = data.data3.G;
                                this.energy1.imageName =
                                    "https://www.theenergyshop.com/resources/img/supplier/100/" +
                                    this.energy1.imageName;
                                this.energy.standingChargeGas =
                                    this.energy.standingChargeGas / 365;
                                this.energy.standingChargeElec =
                                    this.energy.standingChargeElec / 365;
                                this.nightRate = tarrifResponse.priceE7;
                                this.unitRate = tarrifResponse.price1Elec;
                                this.getSettingsList();
                                // if (this.isBothSupplierReq == true) {
                                //     if (!!this.bothSameSupplier && !!this.bothSameSupplierPlan) {
                                stepper.next();
                                //     }
                                // } else if (this.switchinType == "2") {
                                //     if (!!this.bothSameSupplier && !!this.bothSameSupplierPlan) {
                                //         stepper.next();
                                //     }
                                //     // }
                                // });
                            }
                        });
                } else {
                    Swal.fire({
                        type: "error",
                        title: "Error",
                        text: "No result found.",
                    });
                }

                // this.compareSupplier(stepper, data);
            }
        });
    }

    scroll(): any {
        debugger;
    }
    selectedIndex: number = 0;

    setIndex(event) {
        // this.selectedIndex = event.selectedIndex;
    }

    triggerClick() {
        if (this.selectedIndex == 5) {
            const height = $("#container-3").height();
            $("#container-3").scrollTop(height / 2);
        }
    }

    getSettingsList(): any {
        this._settingSerivce.getSettingsList().subscribe((response) => {
            if (response.status_code === 200) {
                this.settings = response.data;

                this.planDiscount = Number(this.settings[5].Setting_Value);
                this.energy1.savingPercentage =
                    this.energy1.savingPercentage + this.planDiscount;
                if (this.planDiscount != 0) {
                    let total = this.energy1.saving + this.energy1.bill;
                    this.energy1.saving =
                        this.energy1.saving + (this.planDiscount * total) / 100;
                    this.energy1.bill =
                        this.energy1.bill - (this.planDiscount * total) / 100;
                }
                this.averageMonth = this.energy1.bill / 12;

                let elcPeriodId;
                if (this.daynightusage == false) {
                    elcPeriodId = this.thirdFormGroup.controls[
                        "ElectricityConsumptionPeriodID"
                    ].value;
                } else {
                    elcPeriodId = this.thirdFormGroup.controls[
                        "Electricity_Day_ConsumptionPeriodID"
                    ].value;
                }
                const gasPeriodId = this.thirdFormGroup.controls[
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
                        this.currentEnergyElc.bill + this.currentEnergyGas.bill;
                    this.averageMonth = this.averageMonth;
                } else {
                    this.avg = this.currentEnergyElc.bill;
                }
            } else {
                this.settings = null;
            }
        });
    }

    //     elecGasData(): any {
    //         let data = _.maxBy(this.comparisionData.tariffs, 'savingPercentage');
    //         this.registerService.gettarrifdatabyTariffId(data).subscribe((response: any) => {
    //
    //             if (!!response) {
    //         this.dialogRef = this.dialog.open(ElcGasModalComponent, {
    //             panelClass: 'elc-gas-details',
    //             data: JSON.parse(response)
    //         });

    //     }
    // });
    //     }

    getRegion(): any {
        this.regionAddress =
            "NotListed;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;" +
            this.PostCode +
            ";NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG;NULLFLAG";
        this.registerService
            .getRegionById(this.regionAddress)
            .subscribe((response) => {
                if (!!response) {
                    this.regionData = JSON.parse(response);
                    this.fourthFormGroup
                        .get("ElectricityCurrentPlan_SupplierID")
                        .setValue(this.regionData.defaultSupplier);
                    this.fourthFormGroup
                        .get("GasCurrentPlan_SupplierID")
                        .setValue(5);
                    this.bothSameSupplier = this.regionData.defaultSupplier;
                }
            });
    }

    getSupplierforAll(): any {
        // this.regionData.defaultSupplier
        let data = {
            value: 68,
        };
        let gasData = {
            value: 5,
        };
        this.getSupplierElectricity(data);
        this.setSupplier(gasData);
        this.getplanforboth(data);
    }

    // get plan list by supplier id
    setSupplier(data): any {
        const supplierId = data.value;
        this.getPlanListforGas(supplierId);
    }

    getPlanListforGas(id): any {
        let e7;

        e7 = false;

        let getpyamentdata = {
            supplierId: id,
            serviceType: "G",
            e7: e7,
        };

        this.registerService
            .getPaymentMethodsByType(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    let data = JSON.parse(response);
                    console.log(data);
                    this.GasPaymentData = data;
                    this.fourthFormGroup
                        .get("GasCurrentPlan_PlanPaymentID")
                        .setValue("MDD");
                    let data1 = {
                        value: "MDD",
                    };
                    this.getGasSupplierPlan(data1);
                }
            });
    }

    bankchange(value): any {}

    getBothSupplierPlan(data): any {
        const planName = data.value;
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
        let getpyamentdata = {
            supplierId: this.bothSameSupplier,
            regionId: 3,
            serviceType: serviceType,
            paymentMethod: planName,
            e7: e7,
        };
        this.registerService
            .getDefaultTarrif(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    let data = JSON.parse(response);
                    this.dualSupplierDefultData = data;
                }
                this.registerService
                    .getPlanMethodsByType(getpyamentdata)
                    .subscribe((response) => {
                        if (!!response) {
                            let data = JSON.parse(response);
                            console.log(data);
                            this.supplierPlansboth = data;
                            this.bothSameSupplierPlan = data[0];
                        }
                    });
            });
    }

    getElecSupplierPlan(data): any {
        const planName = data.value;
        let e7;
        if (this.economicMeter == 1) {
            e7 = "on";
        } else {
            e7 = false;
        }

        let getpyamentdata = {
            supplierId: this.fourthFormGroup.controls[
                "ElectricityCurrentPlan_SupplierID"
            ].value,
            regionId: 3,
            serviceType: "E",
            paymentMethod: "MDD",
            e7: e7,
        };
        this.registerService
            .getDefaultTarrif(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    let data = JSON.parse(response);
                    this.ElcSupplierDefaultData = data;
                }
                this.registerService
                    .getPlanMethodsByType(getpyamentdata)
                    .subscribe((response) => {
                        if (!!response) {
                            let data = JSON.parse(response);
                            this.supplierPlansElec = data;
                            console.log(data);
                            // this.fourthFormGroup.get('ElectricityCurrentPlan_PlanID').setValue(this.ElcSupplierDefaultData.tariffName);
                            if (!!this.supplierPlansElec) {
                                for (let tarrifName of this.supplierPlansElec) {
                                    if (
                                        tarrifName ==
                                        this.ElcSupplierDefaultData.tariffName
                                    ) {
                                        this.fourthFormGroup
                                            .get(
                                                "ElectricityCurrentPlan_PlanID"
                                            )
                                            .setValue(
                                                this.ElcSupplierDefaultData
                                                    .tariffName
                                            );
                                    } else {
                                        this.fourthFormGroup
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

    getGasSupplierPlan(data): any {
        const planName = data.value;
        let e7;

        e7 = false;

        let getpyamentdata = {
            supplierId: this.fourthFormGroup.controls[
                "GasCurrentPlan_SupplierID"
            ].value,
            regionId: 3,
            serviceType: "G",
            paymentMethod: planName,
            e7: e7,
        };
        // this.regionData.id
        this.registerService
            .getDefaultTarrif(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    let data = JSON.parse(response);
                    this.gasSupplierDefaultData = data;
                }
                this.registerService
                    .getPlanMethodsByType(getpyamentdata)
                    .subscribe((response) => {
                        if (!!response) {
                            let data = JSON.parse(response);
                            this.supplierPlans = data;
                            if (!!this.supplierPlans) {
                                for (let tarrifName of this.supplierPlans) {
                                    if (
                                        tarrifName ==
                                        this.gasSupplierDefaultData.tariffName
                                    ) {
                                        this.fourthFormGroup
                                            .get("GasCurrentPlan_PlanID")
                                            .setValue(
                                                this.gasSupplierDefaultData
                                                    .tariffName
                                            );
                                    } else {
                                        this.fourthFormGroup
                                            .get("GasCurrentPlan_PlanID")
                                            .setValue(data[0]);
                                    }
                                }
                            }
                        }
                    });
            });
    }

    getplanforboth(data): any {
        let serviceType;
        if (this.switchinType == 1) {
            serviceType = "D";
        } else {
            serviceType = "E";
        }
        const supplierId = data.value;
        this.bothSameSupplierPlan = null;
        // this._supplierService
        //     .getActivePlanLists(supplierId)
        //     .subscribe(response => {
        //         if (response.status_code === 200) {
        //             this.supplierPlansboth = response.data;
        //         } else {
        //             this.supplierPlansboth = null;
        //         }
        //     });
        let e7;
        if (this.economicMeter == 1) {
            e7 = "on";
        } else {
            e7 = false;
        }

        let getpyamentdata = {
            supplierId: supplierId,
            serviceType: serviceType,
            e7: e7,
        };

        this.registerService
            .getPaymentMethodsByType(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    let data = JSON.parse(response);
                    this.dualPaymentData = data;
                    this.bothSamePayment = "MDD";
                    let data12 = {
                        value: this.bothSamePayment,
                    };
                    this.getBothSupplierPlan(data12);
                }
            });
    }

    // navigate()
    // {
    //     if(this.currentUser && this.currentUser.RoleType == 2)
    //     {
    //         var url = CRM_URL +'/index.php/login?username='+this.currentUser.UserName+'&password='+this.currentUser.CrmToken;
    //         window.open(url)
    //     }
    //     else
    //     {
    //         var url = CRM_URL;
    //         window.open(url)
    //     }

    // }
    checked = false;

    handleSelected(event) {
        if (event.checked === true) {
            this.checked = true;
        } else {
            this.checked = false;
        }
    }

    getSupplierElectricity(data): any {
        const supplierId = data.value;
        // this.fourthFormGroup.get("ElectricityCurrentPlan_PlanID").setValue("");
        // this._supplierService
        //     .getSupplierLists(supplierId)
        //     .subscribe(response => {
        //         if (response.status_code === 200) {
        //             this.supplierPlansElec = response.data;
        //         } else {
        //             this.supplierPlansElec = null;
        //         }
        //     });

        let e7;
        if (this.economicMeter == 1) {
            e7 = "on";
        } else {
            e7 = false;
        }
        let getpyamentdata = {
            supplierId: supplierId,
            serviceType: "E",
            e7: e7,
        };
        this.registerService
            .getPaymentMethodsByType(getpyamentdata)
            .subscribe((response) => {
                if (!!response) {
                    let data = JSON.parse(response);
                    console.log(data);
                    this.paymentMethodElc = data;
                    this.fourthFormGroup
                        .get("ElectricityCurrentPlan_PlanPaymentID")
                        .setValue("MDD");
                    let data1 = {
                        value: "MDD",
                    };
                    this.getElecSupplierPlan(data1);
                }
            });
    }

    confirmPassword(): any {
        const Password = this.sixthFormGroup.controls["Password"].value;
        const confirmPassword = this.sixthFormGroup.controls["confirmPassword"]
            .value;
        if (!Password || !confirmPassword) {
            return;
        }

        if (confirmPassword === "") {
            this.isPasswordNotMatch = false;
        }

        if (Password !== confirmPassword) {
            this.isPasswordNotMatch = true;
        } else {
            this.isPasswordNotMatch = false;
        }
    }

    checkMPAN(value): any {
        const primes = [3, 5, 7, 13, 17, 19, 23, 29, 31, 37, 41, 43];
        let sum = 0;
        const m = value.toString();

        if (m.length - 1 === primes.length) {
            for (let i = 0; i < primes.length; i++) {
                sum += parseInt(m.charAt(i)) * primes[i];
            }
            return (sum % 11) % 10 === parseInt(m.charAt(12));
        } else {
            alert("Invalid MPAN Number");
        }
    }

    otherdetailsChange(value): any {}
    peakOffPeakType = 2;
    radioChange(value): any {
        this.peakOffPeakType = value;
        if (value == 1) {
            this.daynightusage = true;
            if (this.switchinType == 1) {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: [""],
                    ElectricityConsumptionPeriodID: [""],
                    GasConsumption: [""],
                    GasConsumptionPeriodID: [""],
                    TypeOfHome: [],
                    Electricity_Day_Consumption: [""],
                    Electricity_Night_Consumption: [""],
                    Electricity_Day_ConsumptionPeriodID: [""],
                    Electricity_Night_ConsumptionPeriodId: [""],
                });
            } else {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: [""],
                    ElectricityConsumptionPeriodID: [""],
                    GasConsumption: [""],
                    GasConsumptionPeriodID: [""],
                    TypeOfHome: [],
                    Electricity_Day_Consumption: [""],
                    Electricity_Night_Consumption: [""],
                    Electricity_Day_ConsumptionPeriodID: [""],
                    Electricity_Night_ConsumptionPeriodId: [""],
                });
            }
        } else {
            this.daynightusage = false;
            if (this.switchinType == 1) {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: ["", Validators.required],
                    ElectricityConsumptionPeriodID: ["", Validators.required],
                    GasConsumption: ["", Validators.required],
                    GasConsumptionPeriodID: ["", Validators.required],
                    TypeOfHome: [],
                    Electricity_Day_Consumption: [""],
                    Electricity_Night_Consumption: [""],
                    Electricity_Day_ConsumptionPeriodID: [""],
                    Electricity_Night_ConsumptionPeriodId: [""],
                });
            } else {
                this.thirdFormGroup = this._formBuilder.group({
                    ElectricityConsumption: ["", Validators.required],
                    ElectricityConsumptionPeriodID: ["", Validators.required],
                    GasConsumption: [""],
                    GasConsumptionPeriodID: [""],
                    TypeOfHome: [],
                    Electricity_Day_Consumption: [""],
                    Electricity_Night_Consumption: [""],
                    Electricity_Day_ConsumptionPeriodID: [""],
                    Electricity_Night_ConsumptionPeriodId: [""],
                });
            }
        }
    }
}
