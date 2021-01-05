import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { ChartsModule } from "ng2-charts";

import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
} from "@angular/material";
import { ToastModule } from "primeng/toast";
import { LayoutModule } from "@angular/cdk/layout";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TextMaskModule } from "angular2-text-mask";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { InputMaskModule } from "primeng/inputmask";
import { EmailOptionsComponent } from "./email-options/email-options.component";

const routes: Routes = [
    {
        path: "",
        component: EmailOptionsComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [EmailOptionsComponent],
    imports: [
        FuseSharedModule,
        ChartsModule,
        RouterModule.forChild(routes),
        CommonModule,
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
        InternationalPhoneNumberModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        InputMaskModule,
        MatTooltipModule,
        TextMaskModule,
    ],
})
export class EmailOptionsModule {}
