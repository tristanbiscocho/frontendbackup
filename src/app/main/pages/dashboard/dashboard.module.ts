import { DashboardComponent } from "./dashboard.component";
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
import { LanguageChangeModule } from "app/shared/language-change/language-change.module";

const routes = [
    {
        path: "",
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [DashboardComponent],
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
        LanguageChangeModule,
        MatTooltipModule,
    ],
    exports: [DashboardComponent],
})
export class DashboardModule {}
