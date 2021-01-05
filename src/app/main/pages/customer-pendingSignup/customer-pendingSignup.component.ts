import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";

import { FuseConfigService } from "@fuse/services/config.service";

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { FuseUtils } from "@fuse/utils";
// filter
import * as _ from "lodash";
import { VerificationService } from "../customeremail-verification/customeremail-verification.service";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MessageService } from "primeng/components/common/messageservice";
import { SupplierService } from "../supplier/supplier.service";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
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
    selector: "customer-pendingSignup",
    templateUrl: "./customer-pendingSignup.component.html",
    styleUrls: ["./customer-pendingSignup.component.scss"],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class CustomerPendingSignUpComponent implements OnInit {
    dialogRef: any;
    event: any = 0;
    searchCustomer: any;
    customer: any[];
    filteredCustomer: any[];
    fromDate: any;
    toDate: any;
    confirmDialogRef: any;
    suppliers: any;
    SearchBySupplier: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public _verificationService: VerificationService,
        public messageService: MessageService,
        public _supplierService: SupplierService
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
        this.searchCustomer = new FormControl("");
    }

    ngOnInit(): void {
        this.getVerification();
        this.getSupplier();
        // this.searchCustomer.valueChanges
        //     .subscribe(searchText => {
        //         this.customer = FuseUtils.filterArrayByString(
        //             this.filteredCustomer,
        //             searchText
        //         );
        //     });
    }

    getSupplier(): any {
        const data = {
            searchText: "",
            energyTypeId: null,
        };
        this._supplierService.getSupplier(data).subscribe((response) => {
            if (response.status_code === 200) {
                this.suppliers = response.data;
                this.suppliers = _.filter(response.data, (d) => {
                    return d.Status == "1";
                });
            } else {
                this.suppliers = [];
            }
        });
    }

    getVerification(): any {
        let ToDate = null;
        if (!!this.toDate) {
            const d = new Date(this.toDate);
            d.setHours(23, 59, 59);
            ToDate = !!d ? d : ToDate;
        }
        let FromDate = null;
        if (!!this.fromDate) {
            const d = new Date(this.fromDate);
            d.setHours(13, 0, 0);
            FromDate = !!d ? d : FromDate;
        }
        const data = {
            Status: 2,
            ToDate: ToDate,
            FromDate: FromDate,
            CurrentPlan: this.SearchBySupplier,
            searchText: this.searchCustomer.value,
        };
        this._verificationService
            .getCustomer(data)
            .subscribe((response: any) => {
                if (response.status_code === 200) {
                    this.customer = response.data;
                    this.filteredCustomer = response.data;
                } else {
                    this.customer = [];
                    this.filteredCustomer = [];
                }
            });
    }

    clearFilter(): any {
        this.searchCustomer = new FormControl("");
        this.toDate = null;
        this.fromDate = null;
        const data = {
            Status: 2,
            ToDate: this.toDate,
            FromDate: this.fromDate,
            CurrentPlan: this.SearchBySupplier,
            searchText: this.searchCustomer.value,
        };
        this._verificationService
            .getCustomer(data)
            .subscribe((response: any) => {
                if (response.status_code === 200) {
                    this.customer = response.data;
                    this.filteredCustomer = response.data;
                } else {
                    this.customer = [];
                    this.filteredCustomer = [];
                }
            });
    }

    verifyUser(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });

        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to verify user?";

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const data = {
                    poolId: row.Id,
                    status: 3,
                };
                this._verificationService
                    .verifyUser(data)
                    .subscribe((response: any) => {
                        if (response.status_code == 200) {
                            this.messageService.add({
                                severity: "success",
                                summary: "Success",
                                detail: "User verified successfully.",
                            });
                            this.getVerification();
                        } else {
                            this.messageService.add({
                                severity: "error",
                                summary: "Error",
                                detail: "Error in verifing user.",
                            });
                        }
                    });
            }
        });
    }
}
