import { SupplierService } from 'app/main/pages/supplier/supplier.service';
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
import { AdminSwitchHistoryService } from "./admin-switch-history.service";
import { AdminSwitchHistoryComponent } from "./admin-switch-history.component";

const routes: Routes = [
    {
        path: "",
        component: AdminSwitchHistoryComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [AdminSwitchHistoryComponent],
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
    providers: [AdminSwitchHistoryService,SupplierService],
    exports: [AdminSwitchHistoryComponent],
})
export class AdminSwitchModule {}
