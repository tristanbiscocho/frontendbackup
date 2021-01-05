import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoaderService } from "app/main/services/loader.service";
import { MessageService } from "primeng/components/common/messageservice";
import { CustomerService } from "../../customer-list/customer-list.service";
import { TicketingService } from "../../tickets/ticket.service";

@Component({
    selector: "app-add-ticket-admin",
    templateUrl: "./add-ticket-admin.component.html",
    styleUrls: ["./add-ticket-admin.component.scss"],
})
export class AddTicketAdminComponent implements OnInit {
    // quill editor placeholder
    placeholder: String = "Content here...";
    currentUser: any;
    customerList: any = undefined;

    dialogTitle: string;
    type: any;

    // form group
    addTicketForm: FormGroup;
    addTicketFormErrors: any;
    ticketDetail: any = undefined;
    showLoader: any;

    constructor(
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        private router: Router,
        private ticketingService: TicketingService,
        private _customerService: CustomerService,
        private _loaderService: LoaderService
    ) {
        const currentuserdata = localStorage.getItem("UserDetail");
        if (currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));
        } else {
            this.router.navigateByUrl("/login");
        }
    }

    async ngOnInit() {
        await this.getCustomerList();
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        await this.createTicketForm();
        if (this.ticketDetail) {
            this.addTicketForm.patchValue(this.ticketDetail);
            this.addTicketForm.controls.status.patchValue(
                this.ticketDetail.Status
            );
        }
    }

    async createTicketForm(data?: any) {
        this.addTicketForm = this.formBuilder.group({
            Customer_Id: ["", Validators.required],
            Ticket_Tittle: ["", Validators.required],
            Status: ["Active", Validators.required],
            Ticket_Message: ["", Validators.required],
        });
    }

    async getCustomerList() {
        this._customerService
            .getAllCustomer()
            .subscribe(async (response: any) => {
                await response;
                if (response) {
                    this.customerList = response.data;
                } else {
                    this.customerList = [];
                }
            });
    }

    async submit() {
        console.log(this.addTicketForm);
        if (this.addTicketForm.valid && this.currentUser) {
            let data = {
                Customer_Id: 6048,
                Ticket_Tittle: "Test Ticket 2 Tahir",
                Ticket_Message: "Tahir",
                Status: "true",
            };
            this.ticketingService
                .addCustomerTicket(data)
                .subscribe((response) => {
                    if (response) {
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
