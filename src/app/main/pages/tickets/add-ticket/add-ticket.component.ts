import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { LoaderService } from "app/main/services/loader.service";
import { MessageService } from "primeng/components/common/messageservice";
import { TicketingService } from "../ticket.service";

@Component({
    selector: "add-ticket",
    templateUrl: "./add-ticket.component.html",
    styleUrls: ["./add-ticket.component.scss"],
})
export class AddTicketComponent implements OnInit {
    // quill editor placeholder
    placeholder: String = "content here...";
    currentUser: any;

    dialogTitle: string;
    type: any;

    // form group
    addTicketForm: FormGroup;
    addTicketFormErrors: any;
    ticketDetail: any = undefined;
    showLoader: any;

    constructor(
        public dialogRef: MatDialogRef<AddTicketComponent>,
        @Inject(MAT_DIALOG_DATA) private resource: any,
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        private router: Router,
        private ticketingService: TicketingService,
        private _loaderService: LoaderService
    ) {
        if (resource && resource.data) {
            this.ticketDetail = resource.data;
        }
        const currentuserdata = localStorage.getItem("UserDetail");
        if (currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));
        } else {
            this.router.navigateByUrl("/login");
            this.dialogRef.close();
        }
    }

    async ngOnInit() {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        await this.createTicketForm();
        if (this.ticketDetail) {
            this.addTicketForm.patchValue(this.ticketDetail);
        }
    }

    async createTicketForm(data?: any) {
        this.addTicketForm = this.formBuilder.group({
            Customer_Id: [
                this.currentUser ? this.currentUser.Id : undefined,
                Validators.required,
            ],
            Ticket_Tittle: ["", Validators.required],
            status: ["Active", Validators.required],
            Ticket_Message: ["", Validators.required],
        });
    }

    async submit() {
        if (this.addTicketForm.valid && this.currentUser) {
            this.ticketingService
                .addCustomerTicket(this.addTicketForm.value)
                .subscribe((response) => {
                    if (response) {
                        this.dialogRef.close({ data: response });
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in adding Ticket.",
                        });
                    }
                });
        }
    }

    async update() {
        if (this.addTicketForm.valid && this.currentUser && this.ticketDetail) {
            this.addTicketForm.addControl(
                "LastUpdate",
                new FormControl(new Date())
            );
            this.ticketingService
                .editCustomerTicket(
                    this.addTicketForm.value,
                    this.ticketDetail.Id
                )
                .subscribe((response) => {
                    if (response) {
                        this.dialogRef.close({ data: response });
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in updating Ticket.",
                        });
                    }
                });
        }
    }
}
