import { AdminRefferallistComponent } from "./admin-refferallist.component";
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
import { AdminComissionService } from "../admin-commission/admin-commission.service";
import { SupplierService } from "../supplier/supplier.service";
import { CustomerService } from "../customer-list/customer-list.service";

const routes: Routes = [
    {
        path: "",
        component: AdminRefferallistComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [AdminRefferallistComponent],
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
    providers: [CustomerService],
    exports: [AdminRefferallistComponent],
})
export class AdminRefferalistModule {}
