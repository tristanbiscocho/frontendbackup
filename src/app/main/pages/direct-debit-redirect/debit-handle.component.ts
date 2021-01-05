import { FuseConfigService } from "@fuse/services/config.service";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { MessageService } from "primeng/components/common/messageservice";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "../customer-list/customer-list.service";
import Swal from "sweetalert2";

@Component({
    selector: "debit-handle",
    templateUrl: "./debit-handle.component.html",
    styleUrls: ["./debit-handle.component.html"],
})
export class DirectDebitComponent {
    customerId?: number | any;
    redirectionFlowID?: String = "";

    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public messageService: MessageService,
        public _activeRoute: ActivatedRoute,
        public _customerService: CustomerService,
        private router: Router
    ) {
        this._activeRoute.params.forEach((params) => {
            this.customerId = Number(params["ID"]);
        });
        this._activeRoute.queryParams.subscribe((params) => {
            this.redirectionFlowID = params["redirect_flow_id"];
            if (
                !!this.customerId &&
                !!this.redirectionFlowID &&
                this.customerId !== "" &&
                this.redirectionFlowID !== ""
            ) {
                this._customerService
                    .completeRedirectionFlow(
                        this.customerId,
                        this.redirectionFlowID
                    )
                    .subscribe((data: any) => {
                        if (
                            !!data &&
                            data == "Customer Created Successfully."
                        ) {
                            Swal.fire({
                                type: "success",
                                title: "Success",
                                text: "Customer created successfully.",
                            });
                            this.router.navigate(["/login"]);
                        } else {
                            Swal.fire({
                                type: "warning",
                                title: "Warning",
                                text:
                                    "Customer created successfully, but something went wrong with GoCardless.",
                            });
                            this.router.navigate(["/login"]);
                        }
                    });
            } else {
                Swal.fire({
                    type: "warning",
                    title: "Warning",
                    text:
                        "Customer Created Successfully.but some thing went rong with gocarless.",
                });
                this.router.navigate(["/login"]);
            }
        });

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
    }
}
