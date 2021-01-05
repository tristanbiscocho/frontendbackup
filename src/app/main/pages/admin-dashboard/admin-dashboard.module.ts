import { SettingsService } from "./../settings/settings.service";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";

import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
} from "@angular/material";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { AdminDashboardService } from "./admin-dashboard.service";

const routes: Routes = [
    {
        path: "",
        component: AdminDashboardComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [AdminDashboardComponent],
    imports: [
        FuseSharedModule,
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        MatCardModule,
    ],
    providers: [AdminDashboardService, SettingsService],
    exports: [AdminDashboardComponent],
})
export class AdminDahsboardModule {}
