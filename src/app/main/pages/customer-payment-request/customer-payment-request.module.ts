import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";
import {
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDividerModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatTooltipModule,
    MatCardModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastModule } from "primeng/toast";
import { CustomerPaymentRequestComponent } from "./customer-payment-request.component";
import { CustomerService } from "../customer-list/customer-list.service";
import { SettingsService } from "../settings/settings.service";

const routes: Routes = [
    {
        path: "",
        component: CustomerPaymentRequestComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [CustomerPaymentRequestComponent],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatIconModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatTabsModule,
        MatFormFieldModule,
        NgxDatatableModule,
        RouterModule,
        MatMenuModule,
        MatButtonModule,
        MatStepperModule,
        MatOptionModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatDividerModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        ToastModule,
        MatTooltipModule,
    ],
    exports: [CustomerPaymentRequestComponent],
    providers: [CustomerService,SettingsService],
})
export class CustomerPaymentRequestModule {}
