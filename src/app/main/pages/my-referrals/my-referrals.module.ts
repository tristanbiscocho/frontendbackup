import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import {
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
    MatToolbarModule,
    MatTabsModule,
    MatDividerModule,
} from "@angular/material";
import { NgModule } from "@angular/core";
import { LayoutModule } from "@angular/cdk/layout";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { InputMaskModule } from "primeng/inputmask";
import { ToastModule } from "primeng/toast";
import { MyReferralsService } from "./my-referrals.service";
import { MyReferralsComponent } from "./my-referrals.component";
import { MessageService } from "primeng/components/common/messageservice";
import { SettingsService } from "../settings/settings.service";
import { LanguageChangeModule } from "app/shared/language-change/language-change.module";

const routes: Routes = [
    {
        path: "",
        component: MyReferralsComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];
@NgModule({
    declarations: [MyReferralsComponent],
    imports: [
        CommonModule,
        NgxDatatableModule,
        RouterModule.forChild(routes),
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
        MatDividerModule,
        InternationalPhoneNumberModule,
        FormsModule,
        TranslateModule.forRoot(),
        RouterModule,
        HttpClientModule,
        InputMaskModule,
        ReactiveFormsModule,
        LanguageChangeModule,
        ToastModule,
    ],
    exports: [MyReferralsComponent],
    providers: [MyReferralsService, SettingsService, MessageService],
})
export class MyReferralModule {}
