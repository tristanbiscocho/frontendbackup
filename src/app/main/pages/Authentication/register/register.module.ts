import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { ToastModule } from "primeng/toast";
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
import { MatNativeDateModule } from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { RegisterComponent } from "./register.component";
import { RegisterService } from "./register.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { InputMaskModule } from "primeng/inputmask";
import { updateProfileFormDialogComponent } from "../../my-profile/edit-profile/update-profile/update-profile.component";
import { NumberDirective } from "app/main/directives/numbers-only.directive";
import { TextMaskModule } from "angular2-text-mask";
import { PaymentModalComponent } from "./payment-modal/paymentmodal.component";
import { ConfirmPaymentComponent } from "./confirm-payment/confirm-payment.component";
import { ElcGasModalComponent } from "./elc-gas-details/elc-gas-details.component";
import { SupplierTermsConditionModalComponent } from "./supplier-terms-condition/supplier-terms-condition.component";
import { DiallerIframeModalComponent } from "./dialler-iframe/dialler-iframe.component";
import { CommonModule } from "@angular/common";
import { CustomerRegisterComponent } from "./customer-register/customer-register.component";
import { SupplierService } from "../../supplier/supplier.service";
import { SettingsService } from "../../settings/settings.service";
import { SupplierPlanModule } from "./supplier-plan/supplier-plan.module";
import { LanguageChangeModule } from "app/shared/language-change/language-change.module";

const routes = [
    {
        path: "customer-register",
        component: CustomerRegisterComponent,
    },
    {
        path: ":POSTCODE",
        component: RegisterComponent,
    },
    {
        path: ":ID/:FLAG",
        component: RegisterComponent,
    },
    {
        path: "",
        component: RegisterComponent,
    },
];

@NgModule({
    declarations: [
        RegisterComponent,
        updateProfileFormDialogComponent,
        DiallerIframeModalComponent,
        NumberDirective,
        SupplierTermsConditionModalComponent,
        PaymentModalComponent,
        ElcGasModalComponent,
        ConfirmPaymentComponent,
        CustomerRegisterComponent,
    ],
    imports: [
        CommonModule,
        FuseSharedModule,
        RouterModule.forChild(routes),
        ToastModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatMomentDateModule,
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
        LanguageChangeModule,
        SupplierPlanModule,
    ],
    providers: [RegisterService, SupplierService, SettingsService],
    exports: [
        RegisterComponent,
        CustomerRegisterComponent,
        updateProfileFormDialogComponent,
        PaymentModalComponent,
        DiallerIframeModalComponent,
    ],
    entryComponents: [
        updateProfileFormDialogComponent,
        PaymentModalComponent,
        ConfirmPaymentComponent,
        SupplierTermsConditionModalComponent,
        ElcGasModalComponent,
        DiallerIframeModalComponent,
    ],
})
export class RegisterModule {}
