import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Component, OnInit } from "@angular/core";
import { FuseConfigService } from "@fuse/services/config.service";
import { AdminDashboardService } from "./admin-dashboard.service";
import { Router } from "@angular/router";
import { SettingsService } from "../settings/settings.service";

@Component({
    selector: "admin-dashboard",
    templateUrl: "./admin-dashboard.component.html",
    styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit {
    settingsCount: any;
    counts: any;
    currentUser: any;

    constructor(
        private _fuseConfigService: FuseConfigService,
        public _adminService: AdminDashboardService,
        public _settingSerivce: SettingsService,
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

    getpaymentcount(): any {
        if (this.counts != undefined) {
            if (this.counts[0].TotalPayment == null) {
                return 0;
            } else {
                return this.counts[0].TotalPayment;
            }
        }
    }

    getSettingsCount(): any {
        this._settingSerivce.getSettingsCount().subscribe((response) => {
            if (response.status_code === 200) {
                this.settingsCount = response.data;
            } else {
                this.settingsCount = null;
            }
        });
    }

    ngOnInit(): any {
        this.getCounts();
        this.getSettingsCount();
    }

    navigate(): any {
        window.open("http://techext-002-site27.atempurl.com", "_blank");
    }

    getCounts(): any {
        this._adminService.getCount().subscribe((response) => {
            console.log(response);
            if (response.status_code === 200) {
                this.counts = response.data;
            } else {
                this.counts = null;
            }
        });
    }
}
