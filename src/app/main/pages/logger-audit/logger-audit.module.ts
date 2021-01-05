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
import { loggerAuditComponent } from "./logger-audit.component";
import { AuditTrailFormDialogComponent } from "./audit-details/audit-details.component";
import { CustomerService } from "../customer-list/customer-list.service";
import { NgxJsonViewerModule } from "ngx-json-viewer";

const routes = [
    {
        path: "",
        component: loggerAuditComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];
@NgModule({
    declarations: [loggerAuditComponent, AuditTrailFormDialogComponent],
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
    exports: [loggerAuditComponent],
    entryComponents: [AuditTrailFormDialogComponent],
    providers: [CustomerService],
})
export class LoggerAuditModule {}
