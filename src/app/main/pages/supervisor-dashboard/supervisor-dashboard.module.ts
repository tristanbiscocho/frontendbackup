import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { ToastModule } from "primeng/toast";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
} from "@angular/material";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { MatToolbarModule, MatTooltipModule } from "@angular/material";
import { SupervisorDashboardComponent } from "./supervisor-dashboard.component";
import { SupervisorService } from "../supervisor-list/supervisor-list.service";

const routes = [
    {
        path: "",
        component: SupervisorDashboardComponent,
    },
];

@NgModule({
    declarations: [SupervisorDashboardComponent],
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
        MatCardModule,
        MatToolbarModule,
        MatTooltipModule,
    ],
    providers: [SupervisorService],
})
export class SupervisorDashboardModule {}
