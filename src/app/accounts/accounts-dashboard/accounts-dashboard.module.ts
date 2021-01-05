import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
} from "@angular/material";
import { AdminDashboardService } from "app/main/pages/admin-dashboard/admin-dashboard.service";
import { AccountDashboardComponent } from "./accounts-dashboard/account-dashboard.component";
import { ChartsModule } from "ng2-charts";
import { FuseWidgetModule } from "@fuse/components";
const routes: Routes = [
    {
        path: "",
        component: AccountDashboardComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [AccountDashboardComponent],
    imports: [
        FuseSharedModule,
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        ChartsModule,
        MatIconModule,
        NgxChartsModule,
        MatInputModule,
        RouterModule,
        FuseWidgetModule,
        MatCardModule,
    ],
    providers: [AdminDashboardService],
    exports: [AccountDashboardComponent],
})
export class AccountsDashboardModule {}
