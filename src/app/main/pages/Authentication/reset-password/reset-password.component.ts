import { Component, OnDestroy, OnInit } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { Subject } from "rxjs";
import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { ResetPasswordClass } from "./reset-password-classes";
import { ResetPasswordService } from "./reset-password.service";
import { MessageService } from "primeng/components/common/messageservice";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.scss"],
    animations: fuseAnimations,
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    resetPasswordForm: FormGroup;
    userId: any;
    // Private
    private _unsubscribeAll: Subject<any>;
    isPasswordNotMatch?: boolean = false;
    passwordExp:
        | string
        | RegExp = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public _ResetPasswordService: ResetPasswordService,
        public messageService: MessageService,
        public router: Router,
        public _activeRoute: ActivatedRoute
    ) {
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

        this._unsubscribeAll = new Subject();
        this._activeRoute.params.forEach((params) => {
            const getSupplierId = params["ID"];
            if (getSupplierId !== undefined) {
                this.userId = getSupplierId;
            }
        });
    }

    ngOnInit(): void {
        this.resetPasswordForm = this._formBuilder.group({
            password: [
                "",
                [Validators.required, Validators.pattern(this.passwordExp)],
            ],
            passwordConfirm: ["", [Validators.required]],
        });
    }

    resetPassword(): any {
        const userId = new ResetPasswordClass();
        Object.assign(userId, this.resetPasswordForm.value);
        this._ResetPasswordService
            .forgotPassword(userId, this.userId)
            .subscribe(
                (response) => {
                    if (response.status_code === 200) {
                        this.messageService.add({
                            severity: "success",
                            summary: "Success Message",
                            detail: "Your password has been updated.",
                        });
                        this.router.navigate(["/login"]);
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in update password.",
                        });
                    }
                },
                (error) => {}
            );
    }

    confirmPassword(): any {
        const Password = this.resetPasswordForm.controls["password"].value;
        const confirmPassword = this.resetPasswordForm.controls[
            "passwordConfirm"
        ].value;
        if (!Password || !confirmPassword) {
            return;
        }

        if (confirmPassword === "") {
            this.isPasswordNotMatch = false;
        }

        if (Password !== confirmPassword) {
            this.isPasswordNotMatch = true;
        } else {
            this.isPasswordNotMatch = false;
        }
    }
   
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get("password");
    const passwordConfirm = control.parent.get("passwordConfirm");

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === "") {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
