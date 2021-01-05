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
import { ContractorDashboardComponent } from "./contractor-dashboard.component";

const routes: Routes = [
    {
        path: "",
        component: ContractorDashboardComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [ContractorDashboardComponent],
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
    providers: [],
})
export class ContractorDahsboardModule {}
