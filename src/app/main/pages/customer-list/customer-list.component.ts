import { FuseConfigService } from "@fuse/services/config.service";

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ManageProfileFormDialogComponent } from "./edit-profile/edit-profile.component";
import { CustomerService } from "./customer-list.service";
import { SupplierService } from "../supplier/supplier.service";
import { FormControl } from "@angular/forms";
import * as _ from "lodash";
import { CustomerFilterModel } from "./customer.class";
import { MessageService } from "primeng/components/common/messageservice";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
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
    selector: "customer-list",
    templateUrl: "./customer-list.component.html",
    styleUrls: ["./customer-list.component.scss"],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class CustomerListComponent implements OnInit {
    customers: any[];
    filterCustomerList: any[];
    customerList: any[];
    allCustomerList: any[] = [];

    dialogRef: any;
    event: any = 0;
    suppliers: any[];
    responseForAll: any;
    searchCustomer: any;
    searchByStartDate: any;
    sesrchByEndDate: any;
    SearchBySupplier: any;

    searchCategory = new FormControl("");
    tableOffset = 0;

    confirmDialogRef: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public _customerService: CustomerService,
        public _supplierService: SupplierService,
        private _messageService: MessageService,
        public _activeRoute: ActivatedRoute
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
        let filter = new CustomerFilterModel();
        filter.searchText = this.searchCategory.value;
        this.getCustomerList(filter);
        this.getSupplier();

        this.searchCategory = new FormControl("");
    }

    onChange(event): any {
        this.tableOffset = event.offset;
    }

    ngOnInit(): void {
        // this.searchCategory.valueChanges
        //     .subscribe(searchText => {
        //         let serachTexts = !!searchText ? searchText.toString() : "";
        //         this.customerList = FuseUtils.filterArrayByString(
        //             this.allCustomerList,
        //             serachTexts
        //         );
        //     });
        this._activeRoute.params.forEach((params) => {
            const Offset = params["OFFSET"];
            if (!!Offset) {
                this.tableOffset = Offset;
            }
        });
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
    addReadingMeter(): any {
        this.dialogRef = this.dialog.open(ManageProfileFormDialogComponent, {
            panelClass: "edit-profile-form-dialog",
            data: {
                event: this.event,
            },
        });
    }

    setValue(event): any {
        this.event = event;
    }

    getCustomerList(filter): any {
        this._customerService.getCustomer(filter).subscribe((response: any) => {
            if (response.status_code === 0) {
                this.customerList = response.data;
                this.allCustomerList = response.data;
                this.filterCustomerList = response.data;
            } else {
                this.customerList = [];
                this.allCustomerList = [];
                this.filterCustomerList = [];
            }
        });
    }

    filterCustomer = () => {
        let filter = new CustomerFilterModel();
        filter.FromDate = !!this.searchByStartDate
            ? new Date(this.searchByStartDate)
            : null;
        filter.ToDate = !!this.sesrchByEndDate
            ? new Date(this.sesrchByEndDate)
            : null;
        //    supplier option
        filter.CurrentPlanId = !!this.SearchBySupplier
            ? this.SearchBySupplier
            : 0;
        filter.searchText = this.searchCategory.value;

        if (!!filter.FromDate) {
            const d = new Date(filter.FromDate);
            d.setHours(1, 0, 0);
            filter.FromDate = !!d ? d : filter.FromDate;
        }
        if (!!filter.ToDate) {
            const d = new Date(filter.ToDate);
            d.setHours(23, 59, 59);
            filter.ToDate = !!d ? d : filter.ToDate;
        }
        this.getCustomerList(filter);
        // if (!!this.searchByStartDate && this.searchByStartDate != "" && !!this.sesrchByEndDate && this.sesrchByEndDate != "") {
        //     let start = new Date(this.searchByStartDate);
        //     let end = new Date(this.sesrchByEndDate);

        //     filterData = _.filter(this.allCustomerList, ll => {
        //         return new Date(ll.CreatedOn).getTime() >= start.getTime() && new Date(ll.CreatedOn).getTime() <= end.getTime()
        //     });
        //     if (!!this.SearchBySupplier && this.SearchBySupplier !== "") {
        //         filterData = _.filter(filterData, f => f.SupplierName == this.SearchBySupplier)
        //     }
        //     this.customerList = filterData
        // } else {
        //     filterData = _.filter(this.allCustomerList, list => {
        //         return this.getFilterRecord(this.searchByStartDate, this.sesrchByEndDate, this.SearchBySupplier, list);
        //         // return (!!this.searchByStartDate && this.searchByStartDate != "") ?
        //         //     new Date(list.CreatedOn) >= new Date() : list.CreatedOn == list.CreatedOn
        //         //         &&
        //         //         (!!this.sesrchByEndDate && this.sesrchByEndDate != "") ?
        //         //         new Date(list.CreatedOn) <= new Date() : list.CreatedOn == list.CreatedOn
        //         //             &&
        //         //             (!!this.SearchBySupplier && this.SearchBySupplier !== "") ?
        //         //             list.SupplierName == this.SearchBySupplier : list.SupplierName == list.SupplierName
        //     });
        //     this.customerList = filterData;
        // }
    };

    clearFilter(): any {
        let filter = new CustomerFilterModel();
        this.searchByStartDate = null;
        this.sesrchByEndDate = null;
        this.searchCategory = new FormControl("");
        this.SearchBySupplier = null;
        filter.FromDate = null;
        filter.ToDate = null;
        //    supplier option
        filter.CurrentPlanId = 0;
        this.getCustomerList(filter);
    }

    doSomething(event) {
        const selectedValue = event.value;
        let filter = new CustomerFilterModel();

        filter.CurrentPlanId = !!selectedValue ? selectedValue : 0;
        this.getCustomerList(filter);
    }

    getFilterRecord = (startDate, endDate, supplierName, listData) => {
        return !!startDate
            ? new Date(listData.CreatedOn) >= new Date(startDate)
            : listData.CreatedOn == listData.CreatedOn && !!startDate
            ? new Date(listData.CreatedOn) <= new Date(endDate)
            : listData.CreatedOn == listData.CreatedOn && !!supplierName
            ? listData.supplierName == supplierName
            : listData.supplierName == listData.supplierName;
    };

    blockCustomer = (id, IsBlock) => {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });

        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to block?";

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const data = {
                    CustomerId: id,
                    IsBlocked: IsBlock,
                };
                this._customerService
                    .blockCustomer(data)
                    .subscribe((data: any) => {
                        if (data.status_code === 200) {
                            this._messageService.add({
                                severity: "success",
                                summary: "success",
                                detail: "Customer Blocked successfully.",
                            });
                            this.clearFilter();
                        } else {
                            this.suppliers = [];
                        }
                    });
            }
            this.confirmDialogRef = null;
        });
    };

    unblockCustomer(id, IsBlock): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });

        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to unblock?";

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const data = {
                    CustomerId: id,
                    IsBlocked: IsBlock,
                };
                this._customerService
                    .blockCustomer(data)
                    .subscribe((data: any) => {
                        if (data.status_code === 200) {
                            this._messageService.add({
                                severity: "success",
                                summary: "success",
                                detail: "Customer unblocked successfully.",
                            });
                            this.clearFilter();
                        } else {
                            this.suppliers = [];
                        }
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
