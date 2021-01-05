import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
} from "@angular/material";
import { AdminCommissionComponent } from "./admin-commission.component";
import { AdminComissionService } from "./admin-commission.service";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

const routes: Routes = [
    {
        path: "",
        component: AdminCommissionComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [AdminCommissionComponent],
    imports: [
        CommonModule,
        FuseSharedModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        MatCardModule,
        MatDatepickerModule,
        MatOptionModule,
        MatSelectModule,
        NgxDatatableModule,
        MatIconModule,
        MatTooltipModule,
    ],
    providers: [AdminComissionService],
    exports: [AdminCommissionComponent],
})
export class AdminCommissionModule {}
