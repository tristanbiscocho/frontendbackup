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

import { CustomerService } from "../customer-list/customer-list.service";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { MeterReadingForReasonComponent } from "./meter-reading-for-reason.component";
import { ReasonDialogComponent } from "./reason-dialog/reason-dialog.component";
import { MeterReadingService } from "../meter-reading/meter-reading.service";

const routes = [
    {
        path: "",
        component: MeterReadingForReasonComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [ReasonDialogComponent, MeterReadingForReasonComponent],
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
        ReactiveFormsModule,
        ToastModule,
        InputMaskModule,
        FormsModule,
        NgxJsonViewerModule,
        MatTooltipModule,
    ],
    exports: [],
    entryComponents: [ReasonDialogComponent],
    providers: [MeterReadingService, CustomerService],
})
export class MeterReadingForReasonModule {}
