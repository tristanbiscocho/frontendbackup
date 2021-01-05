import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { ForgotPasswordService } from "./forgot-password.service";
import { ForgotPasswordClass } from "./forgot-password-classes";
import { MessageService } from "primeng/components/common/messageservice";
import { Router } from "@angular/router";

@Component({
    selector: "forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"],
    animations: fuseAnimations,
    providers: [ForgotPasswordService],
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _ForgotPasswordService: ForgotPasswordService,
        public messageService: MessageService,
        public router: Router
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
        });
    }

    forgotPassword(): any {
        const userId = new ForgotPasswordClass();
        Object.assign(userId, this.forgotPasswordForm.value);
        this._ForgotPasswordService.forgotPassword(userId).subscribe(
            (response) => {
                if (response.status_code === 0) {
                    this.messageService.add({
                        severity: "success",
                        summary: "Success Message",
                        detail: "Please check your email, mail has been sent.",
                    });
                    this.router.navigate(["/login"]);
                } else {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "User not found.",
                    });
                }
            },
            (error) => {}
        );
    }
}
