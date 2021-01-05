import { SupplierPlanModule } from "./../register/supplier-plan/supplier-plan.module";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
// import { ForgotPasswordClass } from './forgot-password-classes';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatToolbarModule,
} from "@angular/material";
import { ToastModule } from "primeng/toast";
import { PartnerSignupComponent } from "./partner-register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { InputMaskModule } from "primeng/inputmask";
import { TextMaskModule } from "angular2-text-mask";

import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { SettingsService } from "../../settings/settings.service";
import { SupplierService } from "../../supplier/supplier.service";
import { systemenumService } from "../../systemenumdata/systemenum.service";
import { RegisterService } from "../register/register.service";

const routes = [
    {
        path: "",
        component: PartnerSignupComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [PartnerSignupComponent],
    imports: [
        FuseSharedModule,
        RouterModule.forChild(routes),
        ToastModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatStepperModule,
        RouterModule,
        MatOptionModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatCheckboxModule,
        InternationalPhoneNumberModule,
        MatDatepickerModule,
        InputMaskModule,
        ToastModule,
        MatIconModule,
        MatToolbarModule,
        TextMaskModule,
        HttpClientModule,
        CommonModule,
        SupplierPlanModule,
    ],
    exports: [PartnerSignupComponent],
    providers:[systemenumService,SupplierService,RegisterService,SettingsService]
})
export class PartnerSignupModule {}
