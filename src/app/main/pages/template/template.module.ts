import { CommonModule } from "@angular/common";
import { TemplateComponent } from "./template.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";
import {
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDividerModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatTooltipModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastModule } from "primeng/toast";
import { TemplateSourceCodeFormDialogComponent } from "./SourcePopup/sourcepopup.component";
import { WorkflowsService } from "../workflows/workflows.service";
import { workflowSharedModule } from "../workflows/shared-workflow.module";

const routes: Routes = [
    {
        path: "",
        component: TemplateComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [TemplateComponent, TemplateSourceCodeFormDialogComponent],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatIconModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatFormFieldModule,
        NgxDatatableModule,
        RouterModule,
        MatMenuModule,
        MatButtonModule,
        MatStepperModule,
        MatOptionModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatDividerModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        ToastModule,
        MatTooltipModule,
        workflowSharedModule
    ],
    exports: [TemplateSourceCodeFormDialogComponent],
    entryComponents: [TemplateSourceCodeFormDialogComponent],
    providers: [WorkflowsService],
})
export class TemplateModule {}
