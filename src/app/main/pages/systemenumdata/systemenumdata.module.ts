/// <reference path="settings/settings.component.ts" />
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule, Routes } from "@angular/router";
import { SystemEnumDataComponent } from "./systemenumdata.component";
// import { ModalModule } from "ngx-bootstrap";
import { FuseContactsContactFormDialogComponent } from "./city-form/contact-form.component";
import { SystemEnumDataSidenavComponent } from "./settings/settings.component";
import { TranslateModule } from "@ngx-translate/core";
import {
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatStepperModule,
    MatTabsModule,
} from "@angular/material";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { systemenumService } from "./systemenum.service";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FuseSharedModule } from "@fuse/shared.module";
import { ToastModule } from "primeng/toast";
import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";

const routes: Routes = [
    {
        path: "",
        component: SystemEnumDataComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [
        SystemEnumDataComponent,
        FuseContactsContactFormDialogComponent,
        SystemEnumDataSidenavComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        TranslateModule.forChild(),
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        FormsModule,
        MatTooltipModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSelectModule,
        MatOptionModule,
        MatDividerModule,
        MatButtonModule,
        FlexLayoutModule,
        FuseSharedModule,
        RouterModule,
        ToastModule,
        MatTooltipModule,
        HttpClientModule,
        InternationalPhoneNumberModule,
        MatTabsModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCardModule,
        LayoutModule,
        MatCheckboxModule,
        MatStepperModule,
    ],
    entryComponents: [FuseContactsContactFormDialogComponent],
    exports: [SystemEnumDataComponent],
    providers: [systemenumService],
})
export class SystemEnumDataModule {}
