import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
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
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { SettingsService } from "app/main/pages/settings/settings.service";
import { SupplierService } from "app/main/pages/supplier/supplier.service";
import { RegisterService } from "../register.service";
import { SupplierPlanModalComponent } from "./supplier-plan.component";

@NgModule({
    declarations: [SupplierPlanModalComponent],
    imports: [
        CommonModule,
        FuseSharedModule,
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
    exports: [SupplierPlanModalComponent],
    entryComponents: [SupplierPlanModalComponent],
    providers: [SettingsService, RegisterService, SupplierService],
})
export class SupplierPlanModule {}
