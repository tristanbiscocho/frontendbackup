import { SupplierDashboardService } from "./supplier-dashboard.service";
import { Component, OnInit } from "@angular/core";
import { FuseConfigService } from "@fuse/services/config.service";
import { Router } from "@angular/router";

@Component({
    selector: "supplier-dashboard",
    templateUrl: "./supplier-dashboard.component.html",
    styleUrls: ["./supplier-dashboard.component.scss"],
})
export class SupplierDashboardComponent implements OnInit {
    counts: any;
    currentUser: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public _adminService: SupplierDashboardService,
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
    ngOnInit(): any {}

    navigate(): any {
        window.open("http://techext-002-site27.atempurl.com", "_blank");
    }
}
