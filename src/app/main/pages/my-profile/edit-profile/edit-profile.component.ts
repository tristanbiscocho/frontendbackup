import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { systemenumService } from "../../systemenumdata/systemenum.service";
import {
    RegisterDetail,
    PersonalDetail,
    UpdatePassword,
} from "../my-profile-classes";
import * as _ from "lodash";
import { MyProfileService } from "../my-profile.service";
import { MessageService } from "primeng/components/common/messageservice";
import { AuthService } from "app/main/services/auth";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { LoaderService } from "app/main/services/loader.service";
import {
    DialerURL,
    rocketChatAdminID,
    rocketChatPassID,
} from "app/main/services/config";
import { PartnerService } from "../../partner/partner.service";
// tslint:disable-next-line:no-duplicate-imports
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
    selector: "edit-profile-form-dialog",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["./edit-profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class EditProfileFormDialogComponent implements OnInit {
    dialogTitle: string;
    type: any;
    createUserForm: FormGroup;
    otherDetailsForm: FormGroup;
    updatePasswordForm: FormGroup;
    updatePasswordFormErorrs: any;
    createUserFormErrors: any;
    emailPattern:
        | string
        | RegExp = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    maxDate = new Date();
    dialogRefSec: any;
    phone_number: any;
    // drop down values
    responseForAll: any[];
    period: any[];
    typeOfHouse: any[];
    familyMember: any[];
    noOfRooms: any[];
    epmStatus: any[];
    resStatusL: any[];
    timeOfCurAdd: any[];
    hearAbout: any[];
    paymentMethods: any[];
    shortCode: any;
    accountNumber: any;
    accountName: any;
    userId: any;
    IsDisable = false;
    currentUser: any;
    currentUserId: any;
    userName: any;
    today = moment(new Date()).format("YYYY");
    date = this.today;
    maxYear = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
    showLoader: any;
    isPasswordNotMatch?: boolean = false;
    passwordPAttern: string | RegExp = /^[a-zA-Z0-9_.-]*$/;
    constructor(
        public dialogRef: MatDialogRef<EditProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public _allResourceService: systemenumService,
        public _MyProfileService: MyProfileService,
        public messageService: MessageService,
        public dialog: MatDialog,
        public _authService: AuthService,
        private _loaderService: LoaderService,
        public _partnerSerivce: PartnerService
    ) {
        this.type = data.event;
        this.data = data.data;
        this.userId = data.userId;
        if (!!this.userId) {
            this.IsDisable = false;
        } else {
            this.IsDisable = true;
        }

        const currentuserdata = localStorage.getItem("UserDetail");
        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));
        }

        if (this.currentUser.RoleType == 2) {
            this.currentUserId = this.data.Person.UserId;
        } else {
            this.currentUserId = this.data.Id;
        }

        this.updatePasswordFormErorrs = {
            OldPassword: {},
            NewPassword: {},
            confirmPassword: {},
            UserId: {},
        };

        this.createUserFormErrors = {
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
            PaymentDetails_AccountName: {},
            AddressId: {},
            UserId: {},
            Id: {},
        };
    }

    ngOnInit(): any {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        this.getAllResourceData();

        this.createUserForm = this.formBuilder.group({
            Title: ["", Validators.required],
            FirstName: ["", Validators.required],
            LastName: ["", Validators.required],
            EmailAddress: [
                "",
                [Validators.required, Validators.pattern(this.emailPattern)],
            ],
            DOB: ["", Validators.required],
            EmploymentStatusId: [""],
            ResidentalStatusId: [""],
            TimeOfCurrentAddress: [""],
            WhereDidYouhearaboutUs: [""],
            PaymentDetails_SortCode: [""],
            PaymentDetails_AccountNumber: [""],
            PaymentDetails_AccountName: [""],
            AddressId: [""],
            UserId: [""],
            Id: [""],
            IsElectricMeterReading: [""],
        });

        this.updatePasswordForm = this.formBuilder.group({
            OldPassword: ["", Validators.required],
            NewPassword: [
                "",
                [Validators.required, Validators.pattern(this.passwordPAttern)],
            ],
            confirmPassword: ["", [Validators.required]],
            UserId: [this.currentUser.Id],
        });

        this.otherDetailsForm = this.formBuilder.group({
            AddressLine1: [""],
            AddressLine2: [""],
            City: [""],
            ElectricityConsumption: [""],
            ElectricityConsumptionPeriodID: [""],
            ElectricityCurrentPlan_PlanID: [""],
            ElectricityCurrentPlan_PlanPaymentID: [""],
            ElectricityCurrentPlan_SupplierID: [""],
            EnergyTypeID: [""],
            EnergyUsageID: [""],
            FamilyMembersId: [""],
            GasConsumption: [""],
            GasConsumptionPeriodID: [""],
            GasCurrentPlan_PlanID: [""],
            GasCurrentPlan_PlanPaymentID: [""],
            GasCurrentPlan_SupplierID: [""],
            HouseTypeID: [""],
            NoOfRoomsId: [""],
            Password: [""],
            PersonID: [""],
            PostCode: [""],
            RegsitrationDate: [""],
            TitleId: [""],
        });

        this.otherDetailsForm.patchValue(this.data);
        if (!!this.data.Person) {
            this.createUserForm.patchValue(this.data.Person);
            this.createUserForm
                .get("EmploymentStatusId")
                .setValue(this.data.EmploymentStatusId);
            this.createUserForm
                .get("ResidentalStatusId")
                .setValue(this.data.ResidentalStatusId);
            this.createUserForm
                .get("TimeOfCurrentAddress")
                .setValue(this.data.TimeOfCurrentAddress);
            this.createUserForm
                .get("WhereDidYouhearaboutUs")
                .setValue(this.data.WhereDidYouhearaboutUs);
            this.createUserForm
                .get("IsElectricMeterReading")
                .setValue(this.data.IsElectricMeterReading);
            this.phone_number = this.data.Person.MobileNumber;
        }
    }

    confirmPassword(): any {
        const Password = this.updatePasswordForm.controls["NewPassword"].value;
        const confirmPassword = this.updatePasswordForm.controls[
            "confirmPassword"
        ].value;
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

    getAllResourceData(): any {
        this.responseForAll = this._authService.getAllResourceData();
        this.period = this.responseForAll.filter((x) => x.ListID == 3);
        this.typeOfHouse = this.responseForAll.filter((x) => x.ListID == 2);
        this.familyMember = this.responseForAll.filter((x) => x.ListID == 4);
        this.noOfRooms = this.responseForAll.filter((x) => x.ListID == 5);
        let epmStatus1 = this.responseForAll.filter((x) => x.ListID == 6);
        this.epmStatus = _.sortBy(epmStatus1, ["Seq"]);
        this.resStatusL = this.responseForAll.filter((x) => x.ListID == 7);
        this.timeOfCurAdd = this.responseForAll.filter((x) => x.ListID == 8);
        this.hearAbout = this.responseForAll.filter((x) => x.ListID == 9);
        this.paymentMethods = this.responseForAll.filter((x) => x.ListID == 10);
    }

    updatePassword(): any {
        const passwordDetails = new UpdatePassword();
        Object.assign(passwordDetails, this.updatePasswordForm.value);
        const password = _.omit(passwordDetails, ["confirmPassword"]);
        this._MyProfileService.updatePassword(password).subscribe((data) => {
            if (data.status_code == 0) {
                this.dialogRef.close({ data });
                if (this.currentUser.RoleType == 3) {
                    jQuery.ajax({
                        type: "POST",
                        url: DialerURL,
                        dataType: "json",
                        data: {
                            goUser: "goAPI",
                            goPass: "KToB93bzjGd1RS4mDqePJ6Uk.jgNRrK",
                            responsetype: "json",
                            session_user: "goadmin",
                            goAction: "goEditUser",
                            user:
                                this.currentUser.FirstName +
                                this.currentUser.CustomerId,
                            pass: passwordDetails.NewPassword,
                            full_name: this.currentUser.FirstName,
                            active: "Y",
                            user_group: "AGENTS",
                            user_level: 8,
                        },
                        success: function (res) {},
                    });

                    this.currentUser.Password = btoa(
                        passwordDetails.NewPassword
                    );
                    localStorage.setItem(
                        "UserDetail",
                        JSON.stringify(this.currentUser)
                    );

                    const loginRocketChat = {
                        user: rocketChatAdminID,
                        password: rocketChatPassID,
                    };
                    let authdata;
                    this._partnerSerivce
                        .LogintoRocketChat(loginRocketChat)
                        .subscribe((loginAuthResponse: any) => {
                            if (!!loginAuthResponse) {
                                authdata = JSON.parse(loginAuthResponse);
                                if (authdata.status == "success") {
                                    const headerData = {
                                        Token: authdata.data.authToken,
                                        Id: authdata.data.userId,
                                    };

                                    const userData = {
                                        userId: this.data.RocketChatUserID,
                                        data: {
                                            password:
                                                passwordDetails.NewPassword,
                                        },
                                    };

                                    this._MyProfileService
                                        .updateRocketChatPass(
                                            userData,
                                            headerData
                                        )
                                        .subscribe((updatePassRes) => {});
                                }
                            }
                        });
                }
            } else {
                this.dialogRef.close();
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail:
                        "Old password incorrect. You have entered wrong password.",
                });
            }
        });
    }

    saveUser(): any {
        // tslint:disable-next-line:no-debugger
        const userDetailToSave = new RegisterDetail();
        let personInfo = new PersonalDetail();
        Object.assign(userDetailToSave, this.otherDetailsForm.value);
        Object.assign(personInfo, this.createUserForm.value);
        personInfo = _.omit(personInfo, ["EmploymentStatusId"]);
        personInfo = _.omit(personInfo, ["ResidentalStatusId"]);
        personInfo = _.omit(personInfo, ["TimeOfCurrentAddress"]);
        personInfo = _.omit(personInfo, ["WhereDidYouhearaboutUs"]);
        personInfo = _.omit(personInfo, ["IsElectricMeterReading"]);
        personInfo.MobileNumber = this.phone_number;
        this.userName = personInfo.FirstName + " " + personInfo.LastName;

        personInfo.DOB = moment(personInfo.DOB).format("YYYY/MM/DD HH:mm:ss");
        userDetailToSave.EmploymentStatusId = this.createUserForm.controls[
            "EmploymentStatusId"
        ].value;
        userDetailToSave.ResidentalStatusId = this.createUserForm.controls[
            "ResidentalStatusId"
        ].value;
        userDetailToSave.TimeOfCurrentAddress = this.createUserForm.controls[
            "TimeOfCurrentAddress"
        ].value;
        userDetailToSave.WhereDidYouhearaboutUs = this.createUserForm.controls[
            "WhereDidYouhearaboutUs"
        ].value;
        userDetailToSave.IsElectricMeterReading = this.createUserForm.controls[
            "IsElectricMeterReading"
        ].value;
        userDetailToSave.Id = this.data.Id;
        userDetailToSave.PersonInfo = personInfo;
        this.shortCode = this.createUserForm.controls[
            "PaymentDetails_SortCode"
        ].value;
        this.accountNumber = this.createUserForm.controls[
            "PaymentDetails_AccountNumber"
        ].value;
        this.accountName = this.createUserForm.controls[
            "PaymentDetails_AccountName"
        ].value;
        this._MyProfileService
            .addCustomer(userDetailToSave)
            .subscribe((data) => {
                if (data.status_code == 0) {
                    this.dialogRef.close({ data });
                    //   localStorage.setItem("UserDetail", JSON.stringify(response.data));
                    this.currentUser = JSON.parse(
                        localStorage.getItem("UserDetail")
                    );
                    this.currentUser.FirstName = personInfo.FirstName;
                    this.currentUser.LastName = personInfo.LastName;
                    localStorage.setItem(
                        "UserDetail",
                        JSON.stringify(this.currentUser)
                    );
                    this._authService.editNavigationName(this.userName);
                } else {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "Error in editing details.",
                    });
                }
            });
    }
}
