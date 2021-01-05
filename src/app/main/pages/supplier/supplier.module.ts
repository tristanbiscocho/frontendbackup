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
import { SupplierComponent } from "./supplier.component";
import { ManageProfileFormDialogComponent } from "./edit-profile/edit-profile.component";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SupplierService } from "./supplier.service";
import { ToastModule } from "primeng/toast";

const routes: Routes = [
    {
        path: "",
        component: SupplierComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [SupplierComponent, ManageProfileFormDialogComponent],
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
        MatTooltipModule,
    ],
    exports: [SupplierComponent],
    entryComponents: [ManageProfileFormDialogComponent],
    providers: [SupplierService],
})
export class SupplierModule {}
