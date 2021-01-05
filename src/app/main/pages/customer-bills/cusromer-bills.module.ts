import { NgModule } from "@angular/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import {
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
} from "@angular/material";
import { LayoutModule } from "app/layout/layout.module";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCardModule,
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputMaskModule } from "primeng/inputmask";

import { ToastModule } from "primeng/toast";
import { CustomerBillsComponent } from "./customer-bills.component";
import { CustomerService } from "../customer-list/customer-list.service";
import { MessageService } from "primeng/components/common/messageservice";

const routes: Routes = [
    {
        path: "",
        component: CustomerBillsComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [CustomerBillsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxDatatableModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatStepperModule,
        MatOptionModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCardModule,
        LayoutModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatTabsModule,
        TranslateModule.forRoot(),
        RouterModule,
        HttpClientModule,
        InternationalPhoneNumberModule,
        FormsModule,
        MatTooltipModule,
        InputMaskModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
    ],
    exports: [],
    entryComponents: [],
    providers: [CustomerService,MessageService],
})
export class CustomerBillModule {}
