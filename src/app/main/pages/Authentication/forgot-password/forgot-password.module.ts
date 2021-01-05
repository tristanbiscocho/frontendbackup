import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { ForgotPasswordService } from "./forgot-password.service";
import { ForgotPasswordComponent } from "./forgot-password.component";

import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
} from "@angular/material";
import { ToastModule } from "primeng/toast";

const routes = [
    {
        path: "",
        component: ForgotPasswordComponent,
    },
];
@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [
        CommonModule,
        FuseSharedModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ToastModule,
    ],
    providers: [ForgotPasswordService],
    exports: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}
