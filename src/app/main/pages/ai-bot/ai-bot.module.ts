import { LatestReleaseComponent } from "./latest-release/latest-release.component";
import { DebugComponent } from "./debug/debug.component";
import { AlertingComponent } from "./alerting/alerting.component";
import { MonitoringComponent } from "./monitoring/monitoring.component";
import { ProductionChecklistComponent } from "./production-checklist/production-checklist.component";
import { ModulesComponent } from "./modules/modules.component";
import { LanguagesComponent } from "./languages/languages.component";
import { ServerLicenseComponent } from "./server-license/server-license.component";
import { SourceControlComponent } from "./source-control/source-control.component";
import { LogsComponent } from "./logs/logs.component";
import { BotsComponent } from "./bots/bots.component";
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
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTreeModule,
} from "@angular/material";
import { ToastModule } from "primeng/toast";
import { LayoutModule } from "@angular/cdk/layout";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TextMaskModule } from "angular2-text-mask";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { InputMaskModule } from "primeng/inputmask";
import { QuillEditorModule } from "app/shared/quill-editor/quill-editor.module";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AddBotsComponent } from "./add-bots/add-bots.component";

const routes: Routes = [
    {
        path: "",
        component: BotsComponent,
    },
    {
        path: "bots",
        component: BotsComponent,
    },
    {
        path: "add-bot",
        component: AddBotsComponent,
    },
    {
        path: "logs",
        component: LogsComponent,
    },
    {
        path: "source-control",
        component: SourceControlComponent,
    },
    {
        path: "server-license",
        component: ServerLicenseComponent,
    },
    {
        path: "languages",
        component: LanguagesComponent,
    },
    {
        path: "modules",
        component: ModulesComponent,
    },
    {
        path: "production-checklist",
        component: ProductionChecklistComponent,
    },
    {
        path: "monitoring",
        component: MonitoringComponent,
    },
    {
        path: "alerting",
        component: AlertingComponent,
    },
    {
        path: "debug",
        component: DebugComponent,
    },
    {
        path: "latest-release",
        component: LatestReleaseComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [
        BotsComponent,
        LatestReleaseComponent,
        DebugComponent,
        AlertingComponent,
        MonitoringComponent,
        ProductionChecklistComponent,
        ModulesComponent,
        LanguagesComponent,
        SourceControlComponent,
        LogsComponent,
        ServerLicenseComponent,
        AddBotsComponent,
    ],
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
        MatButtonToggleModule,
        MatTabsModule,
        TranslateModule.forRoot(),
        InternationalPhoneNumberModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        InputMaskModule,
        MatTooltipModule,
        MatSlideToggleModule,
        TextMaskModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        BsDropdownModule.forRoot(),
        QuillEditorModule,
    ],
})
export class AiBotModule {}
