import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { systemenumService } from "../../systemenumdata/systemenum.service";
import { RegisterService } from "../../Authentication/register/register.service";
import { RegisterDetail } from "../../Authentication/register/register-classes";
import { AuthService } from "app/main/services/auth";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import * as _ from "lodash";

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
export class ManageProfileFormDialogComponent implements OnInit {
    dialogTitle: string;
    type: any;
    createUserForm: FormGroup;
    emailPattern:
        | string
        | RegExp = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
    constructor(
        public dialogRef: MatDialogRef<ManageProfileFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public _allResourceService: systemenumService,
        public _registerService: RegisterService,
        public _authService: AuthService
    ) {}

    ngOnInit(): void {
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
            Gender: [""],
            Status: [""],
            EmploymentStatusId: [""],
            ResidentalStatusId: [""],
            TimeOfCurrentAddress: [""],
            WhereDidYouhearaboutUs: [""],
            PaymentDetails_SortCode: [""],
            PaymentDetails_AccountNumber: [""],
            password: [""],
        });
    }

    getAllResourceData(): any {
        this.responseForAll = this._authService.getAllResourceData();
        this.period = this.responseForAll.filter((x) => x.ListID == 3);
        this.typeOfHouse = this.responseForAll.filter((x) => x.ListID == 2);
        this.familyMember = this.responseForAll.filter((x) => x.ListID == 4);
        this.noOfRooms = this.responseForAll.filter((x) => x.ListID == 5);
        this.epmStatus = this.responseForAll.filter((x) => x.ListID == 6);
        let resStatusL1 = this.responseForAll.filter((x) => x.ListID == 7);
        this.resStatusL = _.sortBy(resStatusL1, ["Seq"]);
        let timeOfCurAdd1 = this.responseForAll.filter((x) => x.ListID == 8);
        this.timeOfCurAdd = _.sortBy(timeOfCurAdd1, ["Seq"]);
        this.hearAbout = this.responseForAll.filter((x) => x.ListID == 9);
        this.paymentMethods = this.responseForAll.filter((x) => x.ListID == 10);
    }

    saveUser(): any {
        let userDetailToSave = new RegisterDetail();
        this._registerService
            .addCustomer(userDetailToSave)
            .subscribe((data) => {});
    }
}
