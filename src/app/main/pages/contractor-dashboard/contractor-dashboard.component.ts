import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Component, OnInit } from "@angular/core";
import { FuseConfigService } from "@fuse/services/config.service";
import { AuthService } from "app/main/services/auth";
import { Router } from "@angular/router";
import { DiallerIframeModalComponent } from "../Authentication/register/dialler-iframe/dialler-iframe.component";
import { MatDialog } from "@angular/material";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "contractor-dashboard",
    templateUrl: "./contractor-dashboard.component.html",
    styleUrls: ["./contractor-dashboard.component.scss"],
})
export class ContractorDashboardComponent implements OnInit {
    currentUser: any;
    counts: any;
    referralcode: any;
    dialogRef1s: any;
    url: SafeResourceUrl = "https://phone17.lowesttariff.com/login.php";
    constructor(
        private _fuseConfigService: FuseConfigService,
        public _authService: AuthService,
        private router: Router,
        public dialog: MatDialog,
        public sanitizer: DomSanitizer
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
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.url +
                "?username=" +
                this.currentUser.PartnerDialerUserName +
                "&password=" +
                atob(this.currentUser.Password)
        );
    }

    ngOnInit(): any {
        this.getDashboardCount(this.currentUser.Id);
    }

    getDashboardCount(id): any {
        this._authService.getDashboardCount(id).subscribe((response) => {
            if (response.status_code === 0) {
                this.counts = response.data;
                this.referralcode = this.counts[0].ReferralCode;
                localStorage.setItem("Referralcode", this.referralcode);
            } else {
                this.counts = null;
            }
        });
    }

    gotoDialler(): any {
        this.dialogRef1s = this.dialog.open(DiallerIframeModalComponent, {
            panelClass: "dialler-iframe",
            data: "asddas",
        });
        // this._authService.createGodiallerUser(data).subscribe(
        //     response => {

        //     });
    }
}
