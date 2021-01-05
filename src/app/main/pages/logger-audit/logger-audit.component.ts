import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { Component, OnInit } from "@angular/core";
import { FuseConfigService } from "@fuse/services/config.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl } from "@angular/forms";
import { AuditTrailFormDialogComponent } from "./audit-details/audit-details.component";
import { MatDialog } from "@angular/material";
import { CustomerService } from "../customer-list/customer-list.service";

@Component({
    selector: "logger-audit",
    templateUrl: "./logger-audit.component.html",
    styleUrls: ["./logger-audit.component.scss"],
})
export class loggerAuditComponent implements OnInit {
    tableOffset: any = 0;
    loggerList: any[];

    searchByStartDate: any;
    sesrchByEndDate: any;

    searchCategory = new FormControl();
    dialogRef: any;

    fromDate: any;
    toDate: any;

    currentUser: any;
    filterloggerlist: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public _activeRoute: ActivatedRoute,
        public dialog: MatDialog,
        public _customerService: CustomerService
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
        this.filterCustomer();
    }

    ngOnInit(): any {}

    filterCustomer(): any {
        let ToDate = null;
        if (!!this.toDate) {
            const d = new Date(this.toDate);
            d.setHours(23, 59, 59);
            ToDate = !!d ? d : ToDate;
        }
        let FromDate = null;
        if (!!this.fromDate) {
            const d = new Date(this.fromDate);
            d.setHours(12, 0, 0);
            FromDate = !!d ? d : FromDate;
        }

        const data = {
            userId: 0,
            externalId: 0,
            toDate: ToDate,
            fromDate: FromDate,
            searchText: this.searchCategory.value,
        };
        this._customerService
            .getLoggerDetails(data)
            .subscribe((response: any) => {
                if (response.status_code == 0) {
                    this.loggerList = response.data;
                    this.filterloggerlist = response.data;
                    for (let data of this.filterloggerlist) {
                        data["ActionRQDatafilter"] = JSON.parse(
                            data.ActionRQData
                        );
                    }
                }
            });
    }

    clearFilter(): any {
        this.toDate = null;
        this.fromDate = null;
        this.searchCategory = new FormControl();
        this.filterCustomer();
    }

    requestJSON(data): any {
        this.dialogRef = this.dialog.open(AuditTrailFormDialogComponent, {
            panelClass: "audit-detailsg",
            data: {
                event: data,
            },
        });
    }

    onChange = (event) => {};
}
