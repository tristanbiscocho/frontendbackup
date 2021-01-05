import { SupplierDashboardComponent } from "./supplier-dashboard.component";
import { SupplierDashboardService } from "./supplier-dashboard.service";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
} from "@angular/material";

const routes: Routes = [
    {
        path: "",
        component: SupplierDashboardComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [SupplierDashboardComponent],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        MatCardModule,
    ],
    providers: [SupplierDashboardService],
    exports: [SupplierDashboardComponent],
})
export class SupplierDahsboardModule {}
