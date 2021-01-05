import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LoginService } from "./login.service";
import { LoginComponent } from "./login.component";
import { FuseSharedModule } from "@fuse/shared.module";
import { ToastModule } from "primeng/toast";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
} from "@angular/material";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { MatToolbarModule } from "@angular/material";

const routes = [
    {
        path: "",
        component: LoginComponent,
    },
];

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FuseSharedModule,
        RouterModule.forChild(routes),
        ToastModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NgIdleKeepaliveModule.forRoot(),
        MatIconModule,
        MatToolbarModule,
    ],
    providers: [LoginService],
    exports: [LoginComponent],
})
export class SystemLoginModule {}
