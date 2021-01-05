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
import { ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { InputMaskModule } from "primeng/inputmask";
import { SupervisorFormComponent } from "./manage-supervisor-profile.component";
import { TextMaskModule } from "angular2-text-mask";
import { SupervisorService } from "../supervisor-list.service";
import { SupervisorFormDialogComponent } from "../partner-list/partner-profile.component";

const routes: Routes = [
    {
        path: "",
        component: SupervisorFormComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [SupervisorFormComponent,SupervisorFormDialogComponent],
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
    exports:[SupervisorFormDialogComponent],
    entryComponents: [SupervisorFormDialogComponent],
    providers: [SupervisorService],
})
export class ManageSupervisorModule {}
