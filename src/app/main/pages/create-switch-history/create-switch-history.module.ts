import { SupplierService } from "app/main/pages/supplier/supplier.service";
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
import { CreateSwitchHistoryComponent } from "./create-switch-history.component";
import { ToastModule } from "primeng/toast";
import { AdminSwitchHistoryService } from "../admin-switch-history/admin-switch-history.service";
import { SettingsService } from "../settings/settings.service";
import { MessageService } from "primeng/components/common/messageservice";

const routes: Routes = [
    {
        path: "",
        component: CreateSwitchHistoryComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [CreateSwitchHistoryComponent],
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
    providers: [
        CreateSwitchHistoryComponent,
        SupplierService,
        AdminSwitchHistoryService,
        MessageService,
        SettingsService
    ],
})
export class CreateSwitchHistoryModule {}
