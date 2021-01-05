
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutModule } from "@angular/cdk/layout";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
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
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
} from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TextMaskModule } from "angular2-text-mask";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { InputMaskModule } from "primeng/inputmask";
import { ToastModule } from "primeng/toast";
import { QuillEditorModule } from "app/shared/quill-editor/quill-editor.module";
import { SystemUserComponent } from "./system-user/system-user.component";
import { AddSystemUserComponent } from "./add-system-user/add-system-user.component";
import { SystemUserServices } from "./system-user.service";
import { CreateComponent } from "./create/create.component";
import { ManagerComponent } from "./manager/manager.component";
import { CreateManagerComponent } from "./create-manager/create-manager.component";
const routes: Routes = [
    {
        path: "",
        component: SystemUserComponent,
    },
    {
        path: "admin",
        component: CreateComponent,
    },
    {
        path: "Manager",
        component: ManagerComponent,
    },
    {
        path: "create",
        component: CreateComponent,
    },
    {
        path: "create-manager",
        component: CreateManagerComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    imports: [
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
    declarations: [SystemUserComponent, AddSystemUserComponent,CreateComponent,ManagerComponent,CreateManagerComponent],
    providers: [SystemUserServices],
    entryComponents: [AddSystemUserComponent],
})
export class SystemUserModule {}
