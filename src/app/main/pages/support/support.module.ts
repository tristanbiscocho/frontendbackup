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
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastModule } from "primeng/toast";
import { SupportComponent } from "./support.component";

const routes: Routes = [
    {
        path: "",
        component: SupportComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [SupportComponent],
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
    ],
    exports: [SupportComponent],
    providers: [],
})
export class SupportModule {}
