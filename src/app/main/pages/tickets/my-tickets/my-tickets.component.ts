import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseConfigService } from "@fuse/services/config.service";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FuseUtils } from "@fuse/utils";
import { MessageService } from "primeng/components/common/messageservice";
import { debounceTime } from "rxjs/operators";
import { AddTicketComponent } from "../add-ticket/add-ticket.component";
import { TicketingService } from "../ticket.service";

@Component({
    selector: "my-tickets",
    templateUrl: "./my-tickets.component.html",
    styleUrls: ["./my-tickets.component.scss"],
})
export class MyTicketsComponent implements OnInit {
    // partners
    tickets: any[] = [];
    filterByTickets: any[];
    currentUser: any;
    tableOffset: any = 0;

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

    // add ticket / save ticket
    addTicket(): any {
        this.dialogRef = this.dialog.open(AddTicketComponent, {
            panelClass: "add-ticket-form-dialog",
            data: {
                event: this.event,
            },
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!!response) {
                this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Ticket created successfully.",
                });
                this.getTickets();
            }
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
        if (row) {
            this.dialogRef = this.dialog.open(AddTicketComponent, {
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
                        detail: "Ticket Updated Successfully.",
                    });
                    this.getTickets();
                }
            });
        }
    }

    filterTickets() {}

    clearTicketsFilter() {
        this.status = null;
        this.trackingId = null;
        this.priority = null;
        this.searchTickets = new FormControl("");
    }
}
