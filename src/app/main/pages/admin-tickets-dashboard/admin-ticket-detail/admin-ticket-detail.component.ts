import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TicketsHistoryComponent } from "../tickets-history/tickets-history.component";

@Component({
    selector: "app-admin-ticket-detail",
    templateUrl: "./admin-ticket-detail.component.html",
    styleUrls: ["./admin-ticket-detail.component.scss"],
})
export class AdminTicketDetailComponent implements OnInit {
    dialogRef: any;

    constructor(
      public dialog: MatDialog,
    ) {}

    ngOnInit() {}

    // add ticket / save ticket
    ticketingHistory(): any {
        this.dialogRef = this.dialog.open(TicketsHistoryComponent, {
            panelClass: "ticketing-history-modal",
        });
    }
}
