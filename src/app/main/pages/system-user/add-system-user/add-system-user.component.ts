import { SystemUserServices } from './../system-user.service';

import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { LoaderService } from "app/main/services/loader.service";
import { MessageService } from "primeng/components/common/messageservice";

@Component({
    selector: "app-add-system-user",
    templateUrl: "./add-system-user.component.html",
    styleUrls: ["./add-system-user.component.scss"],
})
export class AddSystemUserComponent implements OnInit {
    // quill editor placeholder
    placeholder: String = "content here...";
    currentUser: any;

    dialogTitle: string;
    type: any;

    // form group
    addAgentForm: FormGroup;
    addAgentFormErrors: any;
    agentDetail: any = undefined;
    showLoader: any;

    constructor(
        public dialogRef: MatDialogRef<AddSystemUserComponent>,
        @Inject(MAT_DIALOG_DATA) private resource: any,
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        private router: Router,
        private agentService: SystemUserServices,
        private _loaderService: LoaderService
    ) {
        if (resource && resource.data) {
            this.agentDetail = resource.data;
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
        await this.createAgentForm();
        if (this.agentDetail) {
            this.addAgentForm.patchValue(this.agentDetail);
        }
    }

    async createAgentForm(data?: any) {
        this.addAgentForm = this.formBuilder.group({
            FullName: ["", Validators.required],
            Role: ["", Validators.required],
            Password: ["", [Validators.required]],
            Email: ["", [Validators.required, Validators.email]],
        });
    }

    async submit() {
        if (this.addAgentForm.valid && this.currentUser) {
            this.agentService
                .addAgent(this.addAgentForm.value)
                .subscribe((response) => {
                    this.dialogRef.close();
                    debugger
                    if (response) {
                        this.dialogRef.close({ data: response });
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in adding Agent.",
                        });
                    }
                });
        }
    }

    async update() {
        if (this.addAgentForm.valid && this.currentUser && this.agentDetail) {
            this.agentService
                .editAgent(this.addAgentForm.value, this.agentDetail.Id)
                .subscribe((response) => {
                    if (response) {
                        this.dialogRef.close({ data: response });
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in updating Agent.",
                        });
                    }
                });
        }
    }
}
