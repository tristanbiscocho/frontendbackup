import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { FuseConfigService } from "@fuse/services/config.service";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FuseUtils } from "@fuse/utils";
import { MessageService } from "primeng/components/common/messageservice";
import { debounceTime } from "rxjs/operators";
import { TicketingService } from "../../tickets/ticket.service";
import { AddTicketAdminComponent } from "../add-ticket-admin/add-ticket-admin.component";
import { TicketAssignAgentComponent } from "../ticket-assign-agent/ticket-assign-agent.component";

@Component({
    selector: "app-tickets-admin-list",
    templateUrl: "./tickets-admin-list.component.html",
    styleUrls: ["./tickets-admin-list.component.scss"],
})
export class TicketsAdminListComponent implements OnInit {
    // partners
    tickets: any[] = [];
    filterByTickets: any[];
    currentUser: any;
    tableOffset: any = 0;
    confirmDialogRef: any;

    // var for add or edit Tickets
    dialogRef: any;
    event: any = 0;

    // search from list
    searchTickets: FormControl;
    status: any;
    trackingId: any;
    priority: any;

    minheight: any;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        private ticketingService: TicketingService,
        private router: Router,
        public dialog: MatDialog,
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
        const currentuserdata = localStorage.getItem("UserDetail");
        if (currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));
        } else {
            this.router.navigateByUrl("/login");
        }
        // function declaration for get ticket details
        this.getTickets();
        // form control for serach ticket
        this.searchTickets = new FormControl("");
        const min = window.innerHeight - 200;
        this.minheight = min + "px";
        this._activeRoute.params.forEach((params) => {
            const tableOffset = params["OFFSET"];
            if (!!tableOffset) {
                this.tableOffset = tableOffset;
            }
        });
    }
    // END constructor

    onChangePage(event): any {
        this.tableOffset = event.offset;
    }

    // Start OnInit function
    ngOnInit(): void {
        // search ticket
        this.searchTickets.valueChanges
            .pipe(debounceTime(400))
            .subscribe((searchText) => {
                this.tickets = FuseUtils.filterArrayByString(
                    this.filterByTickets,
                    searchText
                );
            });
    }

    // function defination for get ticket details
    getTickets(): any {
        if (this.currentUser) {
            this.ticketingService
                .getTicketsByCustomerId(this.currentUser.Id)
                .subscribe((res) => {
                    if (res) {
                        this.tickets = res;
                        this.filterByTickets = res;
                    } else {
                        this.filterByTickets = [];
                        this.tickets = [];
                    }
                });
        }
    }

    setValue(event): any {
        this.event = event;
    }

    // edit ticket
    editTicket(row): any {
        
    }

    filterTickets() {}

    clearTicketsFilter() {
        this.status = null;
        this.trackingId = null;
        this.priority = null;
        this.searchTickets = new FormControl("");
    }

    delete(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });
        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to remove record?";
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.ticketingService
                    .deleteTicket(row.Id)
                    .subscribe((response) => {
                        if (response) {
                            this.messageService.add({
                                severity: "success",
                                summary: "Success",
                                detail: "Ticket deleted successfully.",
                            });
                            this.getTickets();
                        } else {
                            this.messageService.add({
                                severity: "warn",
                                summary: "Error",
                                detail: "Error in delete Ticket.",
                            });
                        }
                    });
            }
        });
    }

    assignAgent(row): any {
        if (row) {
            this.dialogRef = this.dialog.open(TicketAssignAgentComponent, {
                panelClass: "add-ticket-form-dialog",
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
                        detail: "Agent Assign to Ticket Successfully.",
                    });
                    this.getTickets();
                }
            });
        }
    }

    closeTicket(row): any {
        if (row) {
          console.log(row);
        }
    }
}
