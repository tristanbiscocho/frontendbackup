import { CommonModule } from "@angular/common";
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
    MatChipsModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastModule } from "primeng/toast";
import { TemplateAddComponent } from "./template-add.component";
import { WorkflowsService } from "../workflows/workflows.service";

const routes: Routes = [
    {
        path: "",
        component: TemplateAddComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [TemplateAddComponent],
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
        MatChipsModule,
        MatInputModule,
        ToastModule,
        MatTooltipModule,
    ],
    exports: [TemplateAddComponent],
    providers: [WorkflowsService],
    entryComponents: [TemplateAddComponent],
})
export class TemplateAddModule {}
