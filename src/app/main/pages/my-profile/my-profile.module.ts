import { MyProfileComponent } from "./my-profile.component";
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
import { EditProfileFormDialogComponent } from "./edit-profile/edit-profile.component";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { InputMaskModule } from "primeng/inputmask";
import { MyProfileService } from "./my-profile.service";
import { ToastModule } from "primeng/toast";
import { EnterPasswordFormDialogComponent } from "./enter-userpassword/enter-userpassword.component";
import { SponsorProfileFormDialogComponent } from "./edit-sponsor/edit-sponsor.component";
import { TextMaskModule } from "angular2-text-mask";
import { MessageService } from "primeng/components/common/messageservice";
import { SettingsService } from "../settings/settings.service";
import { LoginService } from "../Authentication/login/login.service";
import { SupervisorService } from "../supervisor-list/supervisor-list.service";
import { CustomerService } from "../customer-list/customer-list.service";
import { PartnerService } from "../partner/partner.service";
import { LanguageChangeModule } from "app/shared/language-change/language-change.module";

const routes: Routes = [
    {
        path: "",
        component: MyProfileComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [
        MyProfileComponent,
        EditProfileFormDialogComponent,
        EnterPasswordFormDialogComponent,
        SponsorProfileFormDialogComponent,
    ],
    imports: [
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
        CommonModule,
        MatDividerModule,
        InternationalPhoneNumberModule,
        FormsModule,
        TranslateModule.forRoot(),
        RouterModule,
        HttpClientModule,
        InputMaskModule,
        ReactiveFormsModule,
        ToastModule,
        TextMaskModule,
        LanguageChangeModule,
    ],
    exports: [MyProfileComponent],
    entryComponents: [
        EditProfileFormDialogComponent,
        EnterPasswordFormDialogComponent,
        SponsorProfileFormDialogComponent,
    ],
    providers: [
        MyProfileService,
        MessageService,
        SettingsService,
        LoginService,
        SupervisorService,
        CustomerService,
        PartnerService,
    ],
})
export class MyProfileModule {}
