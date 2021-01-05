import { TicketingService } from "./../../tickets/ticket.service";
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
import { AgentService } from "../../agent/agent.service";

@Component({
    selector: "app-ticket-assign-agent",
    templateUrl: "./ticket-assign-agent.component.html",
    styleUrls: ["./ticket-assign-agent.component.scss"],
})
export class TicketAssignAgentComponent implements OnInit {
    // quill editor placeholder
    placeholder: String = "Content here...";
    currentUser: any;

    dialogTitle: string;
    type: any;
    agents: any = undefined;
    // form group
    assignAgentForm: FormGroup;
    assignAgentFormErrors: any;
    ticketDetail: any = undefined;
    showLoader: any;

    constructor(
        public dialogRef: MatDialogRef<TicketAssignAgentComponent>,
        @Inject(MAT_DIALOG_DATA) private resource: any,
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        private agentService: AgentService,
        private ticketingService: TicketingService,
        private router: Router,
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
        await this.getAgents();
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        await this.assignAgentToTicketForm();
        if (this.ticketDetail) {
            this.assignAgentForm.patchValue(this.ticketDetail);
        }
    }

    async assignAgentToTicketForm(data?: any) {
        this.assignAgentForm = this.formBuilder.group({
            Id: ["", Validators.required],
            agent_Id: ["", Validators.required],
        });
    }

    getAgents(): any {
        if (this.currentUser) {
            this.agentService.getAllAgents().subscribe((res) => {
                this.agents = res;
            });
        }
    }

    assign() {
        if (
            this.assignAgentForm.valid &&
            this.currentUser &&
            this.ticketDetail
        ) {
            let params = `${
                "ticketId=" +
                this.assignAgentForm.value.Id +
                "&agentId=" +
                this.assignAgentForm.value.agent_Id
            }`;
            this.ticketingService.assignAgent(params).subscribe((response) => {
                if (response) {
                    this.dialogRef.close({ data: response });
                } else {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "Error in Assigning Agent.",
                    });
                }
            });
        }
    }
}
