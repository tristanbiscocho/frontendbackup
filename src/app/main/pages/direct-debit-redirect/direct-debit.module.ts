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
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastModule } from "primeng/toast";
import { DirectDebitComponent } from "./debit-handle.component";
import { CustomerService } from "../customer-list/customer-list.service";

const routes: Routes = [
    {
        path: "",
        component: DirectDebitComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [DirectDebitComponent],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatIconModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
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
    exports: [DirectDebitComponent],
    providers: [CustomerService],
})
export class DirectDebitModule {}
