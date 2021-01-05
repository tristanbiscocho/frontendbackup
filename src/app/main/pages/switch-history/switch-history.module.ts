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
import { SwitchHistoryComponent } from "./switch-history.component";
import { AdminSwitchHistoryService } from "../admin-switch-history/admin-switch-history.service";
import { SupplierPlanModule } from "../Authentication/register/supplier-plan/supplier-plan.module";
import { LanguageChangeModule } from "app/shared/language-change/language-change.module";

const routes: Routes = [
    {
        path: "",
        component: SwitchHistoryComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [SwitchHistoryComponent],
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
        LanguageChangeModule,
        SupplierPlanModule
    ],
    providers: [AdminSwitchHistoryService],
})
export class SwitchModule {}
