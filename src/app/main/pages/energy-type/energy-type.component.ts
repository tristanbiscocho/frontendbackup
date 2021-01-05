import { FuseConfigService } from "@fuse/services/config.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ManageProfileFormDialogComponent } from "./edit-profile/edit-profile.component";
import { EnergyTypeService } from "./energy-type.service";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import { MessageService } from "primeng/components/common/messageservice";
import { ActivatedRoute } from "@angular/router";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { debounceTime } from "rxjs/operators";
import { FuseUtils } from "@fuse/utils";

@Component({
    selector: "energy-type",
    templateUrl: "./energy-type.component.html",
    styleUrls: ["./energy-type.component.scss"],
})
export class EnergyTypeComponent implements OnInit {
    energyTypes: any[] = [];
    filterEnergyTypes: any[] = [];

    dialogRef: any;
    event: any = 0;
    searchEnergyTypes: FormControl;
    pageOffset: any = 0;
    confirmDialogRef: any;

    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        private _energyTypeService: EnergyTypeService,
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
        this.searchEnergyTypes = new FormControl("");
    }

    ngOnInit(): void {
        this.searchEnergyTypes.valueChanges
            .pipe(debounceTime(400))
            .subscribe((searchText) => {
                this.energyTypes = FuseUtils.filterArrayByString(
                    this.filterEnergyTypes,
                    searchText
                );
            });
        this._energyTypeService.getEnergyType().subscribe((res) => {
            this.energyTypes = res;
        });
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }

    // Get suuplier detail from api
    getEnergyType(): any {
        this._energyTypeService.getEnergyType().subscribe((response) => {
            this.energyTypes = response;
            this.filterEnergyTypes = response;
        });
    }

    addEnergyType(): any {
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
                    detail: "Energy Type created successfully.",
                });
                this.getEnergyType();
            }
        });
    }

    // edit supplier detail
    editEnergyType(row): any {
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
                    detail: "Energy Type updated successfully.",
                });
                const data = {
                    searchText: "",
                    energyTypeId: null,
                };
                this.getEnergyType();
            }
        });
    }

    deleteEnergyTypes(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });
        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to remove record?";
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._energyTypeService.deleteEnergyType(row.Id).subscribe(
                    (response) => {
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Energy Type deleted successfully.",
                        });
                        this.getEnergyType();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in delete Energy Type.",
                        });
                    }
                );
            }
        });
    }

    setValue(event): any {
        this.event = event;
    }
}
