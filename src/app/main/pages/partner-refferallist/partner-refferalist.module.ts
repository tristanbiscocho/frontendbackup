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
import { FormsModule } from "@angular/forms";
import { PartnerRefferallistComponent } from "./partner-refferallist.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";
import { ToastModule } from "primeng/toast";
import { InputMaskModule } from "primeng/inputmask";
import { TextMaskModule } from "angular2-text-mask";
import { PartnerService } from "../partner/partner.service";
import { CustomerService } from "../customer-list/customer-list.service";

const routes: Routes = [
    {
        path: "",
        component: PartnerRefferallistComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [PartnerRefferallistComponent],
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
        CommonModule,
        TranslateModule.forRoot(),
        RouterModule,
        HttpClientModule,
        InternationalPhoneNumberModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        InputMaskModule,
        MatTooltipModule,
        TextMaskModule,
    ],
    exports: [PartnerRefferallistComponent],
    providers: [PartnerService, MessageService,CustomerService],
})
export class PartnerRefferalListModule {}
