import { PlanService } from "./plan.service";
import { FuseConfigService } from "@fuse/services/config.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ManageProfileFormDialogComponent } from "./edit-profile/edit-profile.component";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import { MessageService } from "primeng/components/common/messageservice";
import { ActivatedRoute } from "@angular/router";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { debounceTime } from "rxjs/operators";
import { FuseUtils } from "@fuse/utils";

@Component({
    selector: "plan",
    templateUrl: "./plan.component.html",
    styleUrls: ["./plan.component.scss"],
})
export class PlanComponent implements OnInit {
    plans: any[] = [];
    filterPlans: any[] = [];

    dialogRef: any;
    event: any = 0;
    searchPlans: FormControl;
    pageOffset: any = 0;
    confirmDialogRef: any;

    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        private _energyTypeService: PlanService,
        public messageService: MessageService,
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
        this.searchPlans = new FormControl("");
    }

    ngOnInit(): void {
        this.getPlans();
        this.searchPlans.valueChanges
            .pipe(debounceTime(400))
            .subscribe((searchText) => {
                this.plans = FuseUtils.filterArrayByString(
                    this.filterPlans,
                    searchText
                );
            });
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }

    // Get suuplier detail from api
    getPlans(data?): any {
        this._energyTypeService.getPlan().subscribe(
            (response) => {
                this.plans = response;
                this.filterPlans = response;
            },
            (error) => {
                this.plans = [];
                this.filterPlans = [];
            }
        );
    }

    addPlans(): any {
        this.dialogRef = this.dialog.open(ManageProfileFormDialogComponent, {
            panelClass: "edit-profile-form-dialog",
            data: {
                event: this.event,
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!!response) {
                this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Plan created successfully.",
                });
                const data = {
                    searchText: "",
                    energyTypeId: null,
                };
                this.getPlans(data);
            }
        });
    }

    // edit supplier detail
    editPlans(row): any {
        if (row.Status == true) {
            row.Status = 1;
        } else {
            row.Status = 0;
        }
        this.dialogRef = this.dialog.open(ManageProfileFormDialogComponent, {
            panelClass: "edit-profile-form-dialog",
            data: {
                event: this.event,
                data: row,
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!!response) {
                this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Plan updated successfully.",
                });
                this.getPlans();
            }
        });
    }

    deletePlans(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });

        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to remove record?";

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._energyTypeService.deletePlan(row.Id).subscribe(
                    (response) => {
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Plan deleted successfully.",
                        });
                        this.getPlans();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in plan.",
                        });
                    }
                );
            }
        });
    }
}
