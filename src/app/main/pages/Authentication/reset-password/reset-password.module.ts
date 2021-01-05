import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
} from "@angular/material";
import { ResetPasswordService } from "./reset-password.service";
import { ResetPasswordComponent } from "./reset-password.component";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/components/common/messageservice";

const routes = [
    {
        path: "",
        component: ResetPasswordComponent,
    },
];

@NgModule({
    declarations: [ResetPasswordComponent],
    imports: [
        CommonModule,
        FuseSharedModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        ToastModule,
    ],
    providers: [ResetPasswordService],
    exports: [ResetPasswordComponent],
})
export class ResetPasswordModule {}
