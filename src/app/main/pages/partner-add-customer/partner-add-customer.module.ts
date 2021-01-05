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
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { InputMaskModule } from "primeng/inputmask";

import { NgxJsonViewerModule } from "ngx-json-viewer";
import { PartnerAddCustomerComponent } from "./partner-add-customer.component";
import { PartnerService } from "../partner/partner.service";
import { TimepickerModule } from "ngx-bootstrap";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";

const routes = [
    {
        path: "",
        component: PartnerAddCustomerComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [PartnerAddCustomerComponent],
    imports: [
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
        InternationalPhoneNumberModule,
        CommonModule,
        TranslateModule.forRoot(),
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastModule,
        InputMaskModule,
        FormsModule,
        TimepickerModule,
        NgxJsonViewerModule,
        MatTooltipModule,
    ],
    exports: [],
    providers: [PartnerService],
})
export class PartnerAddCustomerModule {}
