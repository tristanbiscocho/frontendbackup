import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RegisterService } from "../register.service";
import * as _ from "lodash";
import { SettingsService } from "app/main/pages/settings/settings.service";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
@Component({
    selector: "dialler-iframe",
    templateUrl: "./dialler-iframe.component.html",
    styleUrls: ["./dialler-iframe.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class DiallerIframeModalComponent implements OnInit {
    Data: any;
    dialogRef1s: any;
    currentUser: any;
    url: SafeResourceUrl = "https://phone17.lowesttariff.com/login.php";
    constructor(
        public dialogRef: MatDialogRef<DiallerIframeModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        public _settingSerivce: SettingsService,
        public registerService: RegisterService,
        public sanitizer: DomSanitizer
    ) {
        const currentuserdata = localStorage.getItem("UserDetail");
        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));
        }

        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.url +
                "?username=" +
                this.currentUser.FirstName +
                this.currentUser.CustomerId +
                "&password=" +
                atob(this.currentUser.Password)
        );
    }

    ngOnInit(): any {}
}
