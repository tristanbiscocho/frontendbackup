import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { MessageService } from "primeng/components/common/messageservice";
import { LoginService } from "./login.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "app/main/services/auth";
import * as LoginClasses from "./login-classes";
import { LoaderService } from "app/main/services/loader.service";
import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material";
import { truncateSync } from "fs";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    animations: fuseAnimations,
    providers: [MessageService, LoginService],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFormErrors: any;
    currentUser: any;
    idleState = "Not started.";
    timedOut = false;
    dialogRef: any;
    emailPattern:
        | string
        | RegExp = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        public messageService: MessageService,
        private formBuilder: FormBuilder,
        private _loginService: LoginService,
        public router: Router,
        public authService: AuthService,
        public route: ActivatedRoute,
        public loaderService: LoaderService,
        private idle: Idle,
        public dialog: MatDialog
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

        this.loginFormErrors = {
            email: {},
            password: {},
        };

        this.route.data.subscribe((data) => {
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
            localStorage.setItem(
                "gelAllResourceData",
                JSON.stringify(data.gelAllResourceData)
            );
        });
    }
   
    StartTime() {
        this.idle.setIdle(600);
        this.idle.setTimeout(1);
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        this.reset();
    }

    ngOnInit(): void {
        const currentuserdata = localStorage.getItem("UserDetail");
        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));
        }
        this.idle.onTimeout.subscribe((res) => {
            this.idleState = "Timed out!";
            this.timedOut = true;
            Swal.fire({
                type: "error",
                title: "Sorry you've timed out.",
                text:
                    "As your account has been inactive for 10 minutes we've logged you out. We do this to help protect your details. ",
            }).then((res) => {
                localStorage.clear();
                this.router.navigate(["login"]);
            });
        });
        this.loginForm = this.formBuilder.group({
            email: [
                "",
                [Validators.required],
            ],
            password: ["", Validators.required],
        });
        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    reset() {
        this.idle.watch();
        this.idleState = "Started.";
        this.timedOut = false;
    }

    onLoginFormValuesChanged(): any {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }
            this.loginFormErrors[field] = {};
            const control = this.loginForm.get(field);
            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    userLogin(): any {
        const loginUser = new LoginClasses.LoginDetails();
        Object.assign(loginUser, this.loginForm.value);
        this._loginService.login(loginUser).subscribe(
            (response) => {
                if (response.status_code != 200) {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "Please check your Email address and password.",
                    });
                } else {
                    this.StartTime();
                    if (!!response && !!response.data) {
                        let token = response.data.Token;
                        if (!!token && token !== "") {
                            localStorage.setItem("Token", token);
                        }
                        localStorage.setItem(
                            "UserDetail",
                            JSON.stringify(response.data)
                        );
                        if (
                            response.data.RoleType == "1" ||
                            response.data.RoleType == "5"
                        ) {
                            this.router.navigate(["/admin-dashboard"]);
                            this.loaderService.isCustomer(false);
                        } else if (response.data.RoleType == "2") {
                            if (response.data.PendingBankdetails == true) {
                                this.router.navigate(["/dashboard"]);
                            } else {
                                this.router.navigate(["/dashboard"]);
                            }
                        } else if (response.data.RoleType == "3") {
                            this.loaderService.isCustomer(false);
                            this.router.navigate(["/contractor-dashboard"]);
                        } else if (response.data.RoleType == "6") {
                            this.router.navigate(["/contractor-dashboard"]);
                        } else if (response.data.RoleType == "7") {
                            this.router.navigate(["/supervisor-dashboard"]);
                        } else {
                            this.router.navigate(["/supervisor-dashboard"]);
                        }
                    }
                }
            },
            (error) => {}
        );
    }
}
