import { ToastModule } from "primeng/toast";
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
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SupplierPlanModalComponent } from "./supplier-plan.component";
import { SettingsService } from "app/main/pages/settings/settings.service";

const routes: Routes = [
    {
        path: "",
        component: SupplierPlanModalComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [SupplierPlanModalComponent],
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
        ToastModule,
    ],
    providers: [SettingsService],
    exports: [],
})
export class SupplierPlanModule {}
