import { NgModule } from "@angular/core";
import { MeterReadingComponent } from "./meter-reading.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import {
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltip,
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
import { AddMeterFormDialogComponent } from "./add-meter-reading/add-meter-reading.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MeterReadingService } from "./meter-reading.service";
import { ToastModule } from "primeng/toast";
import { InputMaskModule } from "primeng/inputmask";
import { NgOtpInputModule } from "ng-otp-input";
import { FormsModule } from "@angular/forms";
import { GetUserQuestionFormDialogComponent } from "./GetUserReason/GetUserReason.component";
import { RangeReasonFormDialogComponent } from "./range-reason/range-reason.component";
import { MessageService } from "primeng/components/common/messageservice";

const routes: Routes = [
    {
        path: "",
        component: MeterReadingComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [
        MeterReadingComponent,
        AddMeterFormDialogComponent,
        GetUserQuestionFormDialogComponent,
        RangeReasonFormDialogComponent,
    ],
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
        TranslateModule.forRoot(),
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastModule,
        InputMaskModule,
        NgOtpInputModule,
        FormsModule,
        MatTooltipModule,
    ],
    exports: [
        MeterReadingComponent,
        GetUserQuestionFormDialogComponent,
        RangeReasonFormDialogComponent,
    ],
    entryComponents: [
        AddMeterFormDialogComponent,
        GetUserQuestionFormDialogComponent,
        RangeReasonFormDialogComponent,
    ],
    providers: [MeterReadingService, MessageService],
})
export class MeterReadingModule {}
