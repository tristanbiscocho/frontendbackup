import { ToastModule } from 'primeng/toast';
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
import { AdminAddedCreditComponent } from "./admin-added-credits.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CustomerService } from '../customer-list/customer-list.service';

const routes: Routes = [
    {
        path: "",
        component: AdminAddedCreditComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [AdminAddedCreditComponent],
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
        ToastModule
    ],
    providers: [CustomerService],
    exports: [AdminAddedCreditComponent],
})
export class AdminAddedCreditsModule {}
